// Синхронизация приватной папки Omobonus Workspace с GitHub (все данные папки, не только журнал задач).
// Работает ТОЛЬКО с omobonus-workspace, ветка main, remote через отдельный deploy key.
// Никогда: force push, rebase, перезапись чужих изменений, действия с репозиторием сайта, выполнение задач.
// Включается только явно: OMOBONUS_SYNC=on (по умолчанию выключено — только индикатор «Сохранено»).
import fs from 'node:fs'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { WORKSPACE, mainRoot } from '../deferred-tasks/store.mjs'

const ENABLED = process.env.OMOBONUS_SYNC === 'on'
const REMOTE = process.env.OMOBONUS_SYNC_REMOTE || 'git@github-omobonus-workspace:733603020al-crypto/omobonus-workspace.git'
const BRANCH = 'main'
const DELAY = +process.env.OMOBONUS_SYNC_DELAY_MS || 20000 // пауза после последней правки
const PERIOD = 5 * 60 * 1000 // проверка изменений на GitHub
const MAX_FILE = 5 * 1024 * 1024

// Файлы и содержимое, которые никогда не уходят в Git (проверка не отключается)
const BAD_NAME = /(^|\/)(\.env[^/]*|id_[a-z0-9_]+|[^/]+\.(pem|key|p12|pfx|ppk))$/i
const BAD_TEXT = /-----BEGIN [A-Z ]*PRIVATE KEY-----|ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,}|AIza[0-9A-Za-z_-]{35}|sk-[A-Za-z0-9_-]{20,}|xox[abp]-[A-Za-z0-9-]{10,}/

export const status = { enabled: ENABLED, state: ENABLED ? 'synced' : 'off', message: '', savedAt: null, syncedAt: null, head: '' }

const same = (a, b) => path.resolve(a).toLowerCase() === path.resolve(b).toLowerCase()
const set = (state, message = '') => Object.assign(status, { state, message })

function git(args, ok = [0]) {
  return new Promise((resolve, reject) =>
    execFile(
      'git',
      ['-C', WORKSPACE, ...args],
      { encoding: 'utf8', timeout: 60000, windowsHide: true, env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GIT_SSH_COMMAND: 'ssh -o BatchMode=yes' } },
      (err, stdout, stderr) => {
        const code = err ? (typeof err.code === 'number' ? err.code : 1) : 0
        if (ok.includes(code)) resolve(stdout.trim())
        else reject(Object.assign(new Error((stderr || err?.message || '').trim()), { code }))
      },
    ),
  )
}

class SyncError extends Error {}

// Защита: только эта папка, только main, только разрешённый remote, никаких незавершённых слияний
async function guard() {
  if (!fs.existsSync(WORKSPACE)) throw new SyncError(`Нет папки Workspace: ${WORKSPACE}`)
  const top = await git(['rev-parse', '--show-toplevel'])
  if (!same(top, WORKSPACE)) throw new SyncError('Папка Workspace не является корнем своего Git-репозитория')
  if (same(top, mainRoot())) throw new SyncError('Отказ: это репозиторий сайта, синхронизация запрещена')
  if ((await git(['branch', '--show-current'])) !== BRANCH) throw new SyncError(`Workspace не на ветке ${BRANCH}`)
  for (const kind of [[], ['--push']]) {
    const url = await git(['remote', 'get-url', ...kind, 'origin'])
    if (url !== REMOTE) throw new SyncError(`Неожиданный адрес GitHub (${url}) — отправка запрещена`)
  }
  const gitDir = await git(['rev-parse', '--absolute-git-dir'])
  for (const f of ['MERGE_HEAD', 'rebase-merge', 'rebase-apply', 'CHERRY_PICK_HEAD'])
    if (fs.existsSync(path.join(gitDir, f))) throw new SyncError('В Workspace не завершено слияние — нужна ручная проверка, автосинхронизация остановлена')
}

async function scanStaged() {
  const files = (await git(['diff', '--cached', '--name-only', '--diff-filter=AM', '-z'])).split('\0').filter(Boolean)
  for (const f of files) {
    const p = path.join(WORKSPACE, f)
    const big = fs.statSync(p).size > MAX_FILE
    if (BAD_NAME.test(f) || big || BAD_TEXT.test(fs.readFileSync(p, 'utf8'))) {
      await git(['reset', '-q']) // только снять с индекса, файлы не трогаются
      throw new SyncError(`Файл «${f}» похож на секрет или слишком большой — в Git не отправлен. Уберите его из папки Workspace.`)
    }
  }
  return files
}

let running = false
let again = false
let timer = null

export async function syncNow() {
  if (!ENABLED) return status
  if (running) return ((again = true), status)
  running = true
  set('syncing')
  try {
    await guard()
    if (await git(['status', '--porcelain'])) {
      await git(['add', '-A'])
      await scanStaged()
      const all = (await git(['diff', '--cached', '--name-only'])).split('\n').filter(Boolean)
      if (all.length) await git(['commit', '-q', '-m', `Workspace: автосохранение — ${all.slice(0, 5).join(', ')}${all.length > 5 ? ` и ещё ${all.length - 5}` : ''}`])
    }
    try {
      await git(['fetch', '-q', 'origin', BRANCH])
    } catch (e) {
      throw new SyncError('Нет связи с GitHub — данные сохранены локально, повторю позже. ' + e.message.split('\n')[0])
    }
    const [, behind] = (await git(['rev-list', '--left-right', '--count', `HEAD...origin/${BRANCH}`])).split(/\s+/).map(Number)
    if (behind > 0) {
      try {
        await git(['merge', '-q', '--no-edit', `origin/${BRANCH}`])
      } catch {
        await git(['merge', '--abort'], [0, 128]).catch(() => {})
        status.head = await git(['rev-parse', '--short', 'HEAD'])
        return set('conflict', 'На GitHub есть изменения, которые пересекаются с вашими. Ничего не перезаписано и не отправлено: ваши данные сохранены локально. Нужна ручная проверка.'), status
      }
    }
    const [ahead] = (await git(['rev-list', '--left-right', '--count', `HEAD...origin/${BRANCH}`])).split(/\s+/).map(Number)
    if (ahead > 0) {
      try {
        await git(['push', '-q', 'origin', `HEAD:refs/heads/${BRANCH}`]) // без --force
      } catch (e) {
        throw new SyncError('GitHub не принял отправку — данные сохранены локально, повторю позже. ' + e.message.split('\n')[0])
      }
    }
    status.head = await git(['rev-parse', '--short', 'HEAD'])
    status.syncedAt = new Date().toISOString()
    set('synced')
  } catch (e) {
    set('error', e instanceof SyncError ? e.message : 'Ошибка Git: ' + e.message.split('\n')[0])
  } finally {
    running = false
    if (again) ((again = false), schedule())
  }
  return status
}

function schedule() {
  clearTimeout(timer)
  timer = setTimeout(syncNow, DELAY)
}

function changed(file) {
  if (!file) return
  const f = String(file).replace(/\\/g, '/')
  if (f === '.git' || f.startsWith('.git/') || /\.(lock|tmp)$|\.lock\//.test(f)) return
  status.savedAt = new Date().toISOString()
  if (!ENABLED) return set('off', 'Сохранено локально. Синхронизация с GitHub пока выключена.')
  if (running) return void (again = true) // изменение во время синхронизации — ещё один проход после неё
  // При конфликте автоповторов нет: ждём ручной проверки (кнопка «Повторить» в панели)
  if (status.state !== 'conflict') (set('saved'), schedule())
}

export function start() {
  if (!fs.existsSync(WORKSPACE)) return set('error', `Нет папки Workspace: ${WORKSPACE}`)
  fs.watch(WORKSPACE, { recursive: true }, (_e, file) => changed(file))
  if (!ENABLED) return set('off', 'Сохранено локально. Синхронизация с GitHub пока выключена.')
  setTimeout(syncNow, 3000)
  setInterval(() => status.state !== 'conflict' && syncNow(), PERIOD).unref()
}
