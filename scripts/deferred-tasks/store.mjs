// Общий журнал отложенных задач Omobonus (не только SEO).
// Один файл на все ветки и рабочие папки: tasks/deferred-tasks.json в приватной папке omobonus-workspace
// рядом с ОСНОВНОЙ папкой сайта (той, где лежит .git). Из любого worktree путь находится через git.
// Записи не удаляются: только закрываются/открываются снова; у каждой — история изменений.
// Задачи из журнала НИКОГДА не выполняются автоматически — только по отдельному разрешению пользователя.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))

export const PRIORITIES = { high: 'Высокий', medium: 'Средний', low: 'Низкий' }
export const STATUSES = { deferred: 'Отложено', approved: 'Разрешено к работе', in_progress: 'В работе', closed: 'Закрыто' }
const TEXT_FIELDS = ['title', 'area', 'why', 'todo', 'risks', 'research']
const EDITABLE = [...TEXT_FIELDS, 'priority', 'status']

export class TaskError extends Error {
  constructor(code, message, extra = {}) {
    super(message)
    this.code = code
    Object.assign(this, extra)
  }
}

// Основная папка репозитория — общая для всех worktree
export function mainRoot(from = HERE) {
  try {
    const common = execFileSync('git', ['rev-parse', '--path-format=absolute', '--git-common-dir'], { cwd: from, encoding: 'utf8' }).trim()
    return path.dirname(common)
  } catch {
    return path.resolve(HERE, '../..')
  }
}

// Данные Workspace — в отдельном ПРИВАТНОМ репозитории рядом с сайтом (C:/Users/Andrii/omobonus-workspace),
// чтобы не попасть в публичный репозиторий сайта. Переопределить: OMOBONUS_WORKSPACE или DEFERRED_TASKS_FILE.
export const WORKSPACE = process.env.OMOBONUS_WORKSPACE || path.join(path.dirname(mainRoot()), 'omobonus-workspace')
export const FILE = process.env.DEFERRED_TASKS_FILE || path.join(WORKSPACE, 'tasks', 'deferred-tasks.json')
const BACKUPS = path.join(os.tmpdir(), 'omobonus-deferred-tasks-backups')
const LOCK = FILE + '.lock'
const now = () => new Date().toISOString().slice(0, 19).replace('T', ' ')

function currentBranch() {
  try {
    return execFileSync('git', ['branch', '--show-current'], { cwd: process.cwd(), encoding: 'utf8' }).trim()
  } catch {
    return ''
  }
}

// ---------- чтение / запись ----------

export function read() {
  if (!fs.existsSync(FILE)) {
    throw new TaskError('NO_FILE', `Журнал не найден: ${FILE}. Новый пустой журнал сам не создаётся — восстановите файл (git или копия в ${BACKUPS}).`)
  }
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'))
  if (!Array.isArray(data.tasks)) throw new TaskError('BAD_FILE', 'Журнал повреждён: нет списка tasks')
  return data
}

function lock() {
  const until = Date.now() + 5000
  for (;;) {
    try {
      fs.mkdirSync(LOCK)
      return () => fs.rmSync(LOCK, { recursive: true, force: true })
    } catch {
      // Зависшая блокировка (процесс упал) — старше 30 с
      try {
        if (Date.now() - fs.statSync(LOCK).mtimeMs > 30000) fs.rmSync(LOCK, { recursive: true, force: true })
      } catch {}
      if (Date.now() > until) throw new TaskError('LOCKED', 'Журнал сейчас записывает другая сессия, повторите через пару секунд')
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 50)
    }
  }
}

function backup() {
  if (!fs.existsSync(FILE)) return
  fs.mkdirSync(BACKUPS, { recursive: true })
  fs.copyFileSync(FILE, path.join(BACKUPS, `deferred-tasks-${Date.now()}.json`))
  const old = fs.readdirSync(BACKUPS).filter((f) => f.endsWith('.json')).sort()
  for (const f of old.slice(0, Math.max(0, old.length - 50))) fs.rmSync(path.join(BACKUPS, f), { force: true })
}

// Изменение журнала: блокировка → свежее чтение → правка → проверки → копия → атомарная запись
function mutate(fn) {
  const unlock = lock()
  try {
    const data = read()
    const before = data.tasks.length
    const ids = new Set(data.tasks.map((t) => t.id))
    const result = fn(data)
    if (data.tasks.length < before || [...ids].some((id) => !data.tasks.some((t) => t.id === id))) {
      throw new TaskError('LOSS', 'Отказ: запись привела бы к потере существующих задач')
    }
    data.rev = (data.rev || 0) + 1
    data.updated = now()
    backup()
    const tmp = `${FILE}.${process.pid}.tmp`
    fs.writeFileSync(tmp, JSON.stringify(data, null, 1) + '\n')
    fs.renameSync(tmp, FILE)
    return result
  } finally {
    unlock()
  }
}

// ---------- проверки ----------

const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3)
    .map((w) => w.slice(0, 6))

// Похожие задачи (в т.ч. закрытые) по названию
export function findSimilar(title, tasks = read().tasks, exceptId) {
  const a = new Set(norm(title))
  if (!a.size) return []
  return tasks
    .filter((t) => t.id !== exceptId)
    .map((t) => {
      const b = new Set(norm(t.title))
      const common = [...a].filter((w) => b.has(w)).length
      const score = common / Math.min(a.size, b.size || 1)
      return { id: t.id, title: t.title, status: t.status, score }
    })
    .filter((x) => x.score >= 0.6)
    .sort((x, y) => y.score - x.score)
}

function clean(fields, { partial }) {
  const out = {}
  for (const k of EDITABLE) {
    if (!(k in fields)) continue
    out[k] = typeof fields[k] === 'string' ? fields[k].trim() : fields[k]
  }
  if (!partial || 'title' in out) {
    if (!out.title) throw new TaskError('INVALID', 'Нужно короткое название задачи')
    if (out.title.length > 120) throw new TaskError('INVALID', 'Название длиннее 120 знаков — сократите, подробности — в описании')
  }
  if ('priority' in out && !(out.priority in PRIORITIES)) throw new TaskError('INVALID', `Приоритет: ${Object.keys(PRIORITIES).join(' | ')}`)
  if ('status' in out && !(out.status in STATUSES)) throw new TaskError('INVALID', `Статус: ${Object.keys(STATUSES).join(' | ')}`)
  if (out.status === 'closed') throw new TaskError('INVALID', 'Закрывать — отдельным действием «закрыть» (с причиной)')
  return out
}

const nextId = (tasks) => 'T-' + String(tasks.reduce((m, t) => Math.max(m, +t.id.slice(2) || 0), 0) + 1).padStart(3, '0')
const who = (by) => by || `claude (${currentBranch() || 'без ветки'})`

function find(data, id) {
  const t = data.tasks.find((x) => x.id === id)
  if (!t) throw new TaskError('NOT_FOUND', `Задача ${id} не найдена`)
  return t
}
function checkRev(t, expectedRev) {
  if (expectedRev != null && +expectedRev !== t.rev) {
    throw new TaskError('CONFLICT', `Задачу ${t.id} уже изменили (версия ${t.rev}, у вас ${expectedRev}). Обновите и повторите.`, { task: t })
  }
}

// ---------- действия ----------

export function addTask(fields, { by, force = false, note = '' } = {}) {
  const f = clean(fields, { partial: false })
  return mutate((data) => {
    const similar = findSimilar(f.title, data.tasks)
    if (similar.length && !force) {
      throw new TaskError('DUPLICATE', `Похожая задача уже есть: ${similar.map((s) => `${s.id} «${s.title}»`).join(', ')}`, { similar })
    }
    const t = {
      id: nextId(data.tasks),
      title: f.title,
      priority: f.priority || 'medium',
      status: f.status || 'deferred',
      area: f.area || '',
      why: f.why || '',
      todo: f.todo || '',
      risks: f.risks || '',
      research: f.research || '',
      created: now(),
      updated: now(),
      rev: 1,
      history: [{ date: now(), by: who(by), action: 'created', note }],
    }
    data.tasks.push(t)
    return t
  })
}

export function updateTask(id, fields, { by, expectedRev, note = '' } = {}) {
  const f = clean(fields, { partial: true })
  return mutate((data) => {
    const t = find(data, id)
    checkRev(t, expectedRev)
    if (t.status === 'closed' && 'status' in f) throw new TaskError('INVALID', 'Задача закрыта — сначала откройте её снова')
    if ('title' in f) {
      const similar = findSimilar(f.title, data.tasks, id)
      if (similar.length && !fields.force) throw new TaskError('DUPLICATE', `Похожая задача уже есть: ${similar.map((s) => `${s.id} «${s.title}»`).join(', ')}`, { similar })
    }
    const changes = {}
    for (const [k, v] of Object.entries(f)) if (t[k] !== v) changes[k] = { from: t[k], to: v }
    if (!Object.keys(changes).length && !note) return t
    for (const [k, c] of Object.entries(changes)) t[k] = c.to
    t.rev += 1
    t.updated = now()
    t.history.push({ date: now(), by: who(by), action: 'edited', changes, note })
    return t
  })
}

export function closeTask(id, { by, expectedRev, note = '' } = {}) {
  if (!String(note).trim()) throw new TaskError('INVALID', 'Укажите причину закрытия')
  return mutate((data) => {
    const t = find(data, id)
    checkRev(t, expectedRev)
    if (t.status === 'closed') throw new TaskError('INVALID', 'Задача уже закрыта')
    t.history.push({ date: now(), by: who(by), action: 'closed', changes: { status: { from: t.status, to: 'closed' } }, note })
    t.status = 'closed'
    t.rev += 1
    t.updated = now()
    return t
  })
}

export function reopenTask(id, { by, expectedRev, note = '' } = {}) {
  return mutate((data) => {
    const t = find(data, id)
    checkRev(t, expectedRev)
    if (t.status !== 'closed') throw new TaskError('INVALID', 'Задача не закрыта')
    t.history.push({ date: now(), by: who(by), action: 'reopened', changes: { status: { from: 'closed', to: 'deferred' } }, note })
    t.status = 'deferred'
    t.rev += 1
    t.updated = now()
    return t
  })
}
