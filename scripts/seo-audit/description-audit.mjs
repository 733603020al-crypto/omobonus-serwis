// Проверка meta description и сборка вкладки Description SEO-панели (Omobonus Workspace, localhost:5180/seo?tab=description).
// Правила: docs/seo/description-standard.md · решения: docs/seo/description-decisions.json · история: docs/seo/audit-history.json
//
//   node scripts/seo-audit/description-audit.mjs        — проверить, записать в историю, собрать панель
//   node scripts/seo-audit/description-audit.mjs --dry  — без записи в историю
//
// Нужен работающий dev-сервер на localhost:3000. Сайт скрипт не меняет.
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, HISTORY, PANEL, SITE, INFO_PAGES, siteUrls, parse, unesc, fmt, diff, saveTab, countTodo, record, writePanel } from './build-panel.mjs'

const DECISIONS = path.join(ROOT, 'docs/seo/description-decisions.json')
const TITLES = path.join(ROOT, 'docs/seo/title-decisions.json')
const DRY = process.argv.includes('--dry')

const dec = JSON.parse(fs.readFileSync(DECISIONS, 'utf8'))
const { names: titleNames = {}, groups: titleGroups } = JSON.parse(fs.readFileSync(TITLES, 'utf8'))
const names = { 'o-nas': 'O nas', kontakt: 'Kontakt', ...titleNames }
const baseGroups = [...titleGroups, ['O firmie', INFO_PAGES]]
const hist = JSON.parse(fs.readFileSync(HISTORY, 'utf8'))

// Description проверяются и на страницах фирмы (/o-nas, /kontakt) — у них утверждённые тексты-исключения
// Страница, которая не открылась, не считается проверенной — остаётся в «пропавших»
const failed = []
const urls = []
const current = {}
for (const u of await siteUrls({ info: true })) {
  const res = await fetch(SITE + u)
  if (!res.ok) {
    failed.push(`${u} (${res.status})`)
    continue
  }
  urls.push(u)
  const html = await res.text()
  const m = html.match(/<meta\s+name="description"\s+content="([^"]*)"/) || html.match(/<meta\s+content="([^"]*)"\s+name="description"/)
  current[u] = unesc(m ? m[1] : '')
}

const known = new Set(baseGroups.flatMap(([, s]) => s))
const groups = [...baseGroups]
const fresh = [...new Set(urls.map((u) => parse(u).s).filter((s) => !known.has(s)))]
if (fresh.length) groups.push(['Новые страницы', fresh])

const rows = urls.map((u) => {
  const { l, s } = parse(u)
  const t = current[u]
  const a = dec.approved[u]
  const p = dec.pending.proposals[u]
  const rj = (dec.rejected[u] || []).at(-1)
  return {
    s, l, u, t, len: [...t].length, base: t, suffix: '',
    name: names[s] || s,
    exc: dec.pending.review[u]?.exc ?? a?.exception ?? p?.exc ?? null,
    excPending: a?.exceptionPending ?? null,
    review: dec.pending.review[u] || null,
    appr: a ? { base: a.description, applied: t === a.description, date: fmt(a.date), stage: a.agreed ? 'согласовано сразу' : a.stage ? `этап ${a.stage}` : '', was: a.history?.at(-1)?.description ?? null } : null,
    rej: rj ? { t: rj.description, date: fmt(rj.date) } : null,
    prop: p?.description ?? null,
    why: p?.why ?? null,
    works: p?.works ?? null,
    evidence: p?.evidence ?? null,
    warnings: p?.warnings ?? null,
  }
})
const missing = Object.keys(dec.approved).filter((u) => !urls.includes(u))

const changes = diff(hist.snapshot.description, current, urls)
saveTab('description', { rows, groups, missing })
const problems = await countTodo('description', hist)
if (!DRY) record(hist, 'description', { pages: urls.length, problems, changes, current })
writePanel(hist)

console.log(`Страниц: ${urls.length} · требуют решения: ${problems ?? '?'} · изменений с прошлой проверки: ${changes.length}`)
if (failed.length) console.warn(`Не открылись: ${failed.join(', ')}`)
console.log(`Панель: ${PANEL}${DRY ? ' (без записи в историю)' : ''}`)
