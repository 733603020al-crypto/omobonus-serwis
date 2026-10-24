// Журнал отложенных задач из командной строки — для сессий Claude из любой ветки/папки.
// Запуск из любого места: node C:/Users/Andrii/omobonus-serwis/scripts/deferred-tasks/cli.mjs <команда>
//   list [--all]                      открытые задачи (--all — с закрытыми)
//   show T-001                        полное описание и история
//   add --json task.json [--force]    новая задача (поля: title, priority, status, area, why, todo, risks, research)
//   add --title "…" --priority low --why "…" --todo "…" --risks "…" --research "…" [--force]
//   update T-001 (--json f.json | --поле "…") [--note "…"] [--rev N]
//   close T-001 --note "причина"      закрыть
//   reopen T-001 [--note "…"]         открыть снова
//   check "название"                  поиск похожих перед добавлением
//   path                              где лежит журнал
// Перед add всегда идёт проверка дубликатов; --force — только если это точно другая задача.
// Задачи НЕ выполнять без отдельного разрешения пользователя.
import fs from 'node:fs'
import { FILE, PRIORITIES, STATUSES, TaskError, addTask, closeTask, findSimilar, read, reopenTask, updateTask } from './store.mjs'

const [cmd, ...rest] = process.argv.slice(2)
const pos = []
const opt = {}
for (let i = 0; i < rest.length; i++) {
  const a = rest[i]
  if (a.startsWith('--')) {
    const k = a.slice(2)
    if (k === 'force' || k === 'all') opt[k] = true
    else opt[k] = rest[++i]
  } else pos.push(a)
}
const fields = () => {
  const f = opt.json ? JSON.parse(fs.readFileSync(opt.json, 'utf8')) : {}
  for (const k of ['title', 'priority', 'status', 'area', 'why', 'todo', 'risks', 'research']) if (opt[k] != null) f[k] = opt[k]
  return f
}
const line = (t) => `${t.id}  [${PRIORITIES[t.priority]}] [${STATUSES[t.status]}]  ${t.title}  (v${t.rev}, ${t.updated})`
function full(t) {
  const sec = (h, v) => (v ? `\n## ${h}\n${v}\n` : '')
  return `${line(t)}\nОбласть: ${t.area || '—'}\n${sec('Зачем', t.why)}${sec('Что сделать', t.todo)}${sec('Риски', t.risks)}${sec('Что уже исследовано', t.research)}\n## История\n` +
    t.history.map((h) => `- ${h.date} ${h.by}: ${h.action}${h.changes ? ' ' + Object.keys(h.changes).join(', ') : ''}${h.note ? ' — ' + h.note : ''}`).join('\n')
}

try {
  const by = opt.by
  const rev = opt.rev != null ? +opt.rev : undefined
  switch (cmd) {
    case 'path':
      console.log(FILE)
      break
    case 'list': {
      const ts = read().tasks.filter((t) => opt.all || t.status !== 'closed')
      console.log(ts.length ? ts.map(line).join('\n') : 'Задач нет')
      break
    }
    case 'show': {
      const t = read().tasks.find((x) => x.id === pos[0])
      if (!t) throw new TaskError('NOT_FOUND', `Задача ${pos[0]} не найдена`)
      console.log(full(t))
      break
    }
    case 'check': {
      const s = findSimilar(pos.join(' '))
      console.log(s.length ? s.map((x) => `${x.id} «${x.title}» [${STATUSES[x.status]}]`).join('\n') : 'Похожих нет')
      break
    }
    case 'add':
      console.log('Добавлено:', line(addTask(fields(), { by, force: !!opt.force, note: opt.note || '' })))
      break
    case 'update':
      console.log('Изменено:', line(updateTask(pos[0], { ...fields(), force: !!opt.force }, { by, expectedRev: rev, note: opt.note || '' })))
      break
    case 'close':
      console.log('Закрыто:', line(closeTask(pos[0], { by, expectedRev: rev, note: opt.note || '' })))
      break
    case 'reopen':
      console.log('Открыто снова:', line(reopenTask(pos[0], { by, expectedRev: rev, note: opt.note || '' })))
      break
    default:
      console.log(fs.readFileSync(new URL(import.meta.url), 'utf8').split('\n').filter((l) => l.startsWith('//')).join('\n'))
  }
} catch (e) {
  console.error(`Ошибка (${e.code || 'ERROR'}): ${e.message}`)
  process.exit(1)
}
