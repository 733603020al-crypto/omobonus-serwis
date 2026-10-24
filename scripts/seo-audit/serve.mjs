// Отдаёт SEO-панель на http://localhost:4100 (файл перечитывается при каждом запросе).
// Сначала собрать панель: node scripts/seo-audit/title-audit.mjs
// Дополнительно: раздел «Отложенные задачи» (общий журнал Omobonus, scripts/deferred-tasks/)
// подключается к панели при отдаче, шаблон аудита не меняется.
import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as tasks from '../deferred-tasks/store.mjs'
import * as sync from '../workspace/sync.mjs'

const PANEL = path.join(os.tmpdir(), 'omobonus-seo-panel.html')
const UI_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../deferred-tasks')
const INJECT = '<link rel="stylesheet" href="/deferred-tasks/ui.css"><script src="/deferred-tasks/ui.js" defer></script>'
const SHELL = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SEO-панель Omobonus</title>
<style>body{margin:0;background:#f6f1e7;font:14px/1.45 system-ui,sans-serif}header{background:#2b2118;color:#f3e7cf;padding:10px 16px;display:flex;gap:10px;align-items:center}header h1{font-size:17px;margin:0;font-weight:600}.empty{padding:16px}</style>
</head><body><header id="hdr"><h1>SEO-панель</h1></header><div id="empty" class="empty">Панель аудита не собрана: node scripts/seo-audit/title-audit.mjs</div></body></html>`

const send = (res, code, body, type = 'application/json; charset=utf-8') => {
  res.writeHead(code, { 'content-type': type, 'cache-control': 'no-store' })
  res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body))
}
const body = (req) =>
  new Promise((ok, fail) => {
    let s = ''
    req.on('data', (c) => (s += c))
    req.on('end', () => {
      try {
        ok(s ? JSON.parse(s) : {})
      } catch {
        fail(new tasks.TaskError('INVALID', 'Неверный JSON'))
      }
    })
  })
const HTTP_CODE = { NOT_FOUND: 404, DUPLICATE: 409, CONFLICT: 409, INVALID: 400, LOCKED: 423, NO_FILE: 500, BAD_FILE: 500, LOSS: 500 }

// Запись — только с этого компьютера и только из панели (свой заголовок не пошлёт чужой сайт)
const writeAllowed = (req) => ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(req.socket.remoteAddress) && req.headers['x-omobonus-panel'] === '1'

// Индикатор синхронизации Workspace: GET — состояние, POST /now — повторить сейчас
async function syncApi(req, res, url) {
  if (url.pathname === '/api/sync' && req.method === 'GET') return send(res, 200, sync.status)
  if (url.pathname === '/api/sync/now' && req.method === 'POST') {
    if (!writeAllowed(req)) return send(res, 403, { error: 'Только из панели на этом компьютере' })
    return send(res, 200, await sync.syncNow())
  }
  return send(res, 404, { error: 'Нет такого адреса' })
}

async function api(req, res, url) {
  if (req.method !== 'GET' && !writeAllowed(req)) return send(res, 403, { error: 'Запись только из панели на этом компьютере' })
  const m = url.pathname.match(/^\/api\/tasks(?:\/(T-\d+))?(?:\/(close|reopen))?$/)
  if (!m) return send(res, 404, { error: 'Нет такого адреса' })
  const [, id, action] = m
  try {
    if (req.method === 'GET' && !id) {
      const d = tasks.read()
      return send(res, 200, { tasks: d.tasks, rev: d.rev, file: tasks.FILE, priorities: tasks.PRIORITIES, statuses: tasks.STATUSES })
    }
    const b = await body(req)
    const by = 'пользователь (панель)'
    if (req.method === 'POST' && !id && url.searchParams.has('check')) return send(res, 200, { similar: tasks.findSimilar(b.title) })
    if (req.method === 'POST' && !id) return send(res, 201, tasks.addTask(b.task || {}, { by, force: !!b.force, note: b.note || '' }))
    if (req.method === 'PUT' && id && !action) return send(res, 200, tasks.updateTask(id, { ...(b.changes || {}), force: !!b.force }, { by, expectedRev: b.rev, note: b.note || '' }))
    if (req.method === 'POST' && action === 'close') return send(res, 200, tasks.closeTask(id, { by, expectedRev: b.rev, note: b.note || '' }))
    if (req.method === 'POST' && action === 'reopen') return send(res, 200, tasks.reopenTask(id, { by, expectedRev: b.rev, note: b.note || '' }))
    return send(res, 405, { error: 'Действие не поддерживается' })
  } catch (e) {
    return send(res, HTTP_CODE[e.code] || 500, { error: e.message, code: e.code, similar: e.similar, task: e.task })
  }
}

http
  .createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost')
    if (url.pathname.startsWith('/api/tasks')) return api(req, res, url)
    if (url.pathname.startsWith('/api/sync')) return syncApi(req, res, url)
    const asset = url.pathname.match(/^\/deferred-tasks\/(ui\.js|ui\.css)$/)
    if (asset) return send(res, 200, fs.readFileSync(path.join(UI_DIR, asset[1])), asset[1].endsWith('.js') ? 'text/javascript; charset=utf-8' : 'text/css; charset=utf-8')
    const html = fs.existsSync(PANEL) ? fs.readFileSync(PANEL, 'utf8') : SHELL
    send(res, 200, html.replace('</body>', () => INJECT + '</body>'), 'text/html; charset=utf-8')
  })
  // Только этот компьютер: другие устройства в сети панель не видят
  .listen(+process.env.PANEL_PORT || 4100, '127.0.0.1', function () {
    const p = this.address().port
    sync.start()
    console.log(`SEO-панель: http://localhost:${p} · отложенные задачи: http://localhost:${p}/#zadania (журнал: ${tasks.FILE}; синхронизация с GitHub: ${sync.status.enabled ? 'включена' : 'выключена'})`)
  })
