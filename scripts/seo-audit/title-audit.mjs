// Повторная проверка Title и сборка SEO-панели (localhost:4100).
// Правила: docs/seo/title-standard.md · решения: docs/seo/title-decisions.json
// История: docs/seo/audit-history.json
//
//   node scripts/seo-audit/title-audit.mjs          — проверить, записать в историю, собрать панель
//   node scripts/seo-audit/title-audit.mjs --dry    — без записи в историю
//   node scripts/seo-audit/serve.mjs               — отдать панель на http://localhost:4100
//
// Нужен работающий dev-сервер на localhost:3000. Сайт скрипт не меняет.
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, HISTORY, PANEL, SITE, siteUrls, parse, unesc, fmt, diff, saveTab, countTodo, record, writePanel } from './build-panel.mjs'

const DECISIONS = path.join(ROOT, 'docs/seo/title-decisions.json')
const DRY = process.argv.includes('--dry')

const dec = JSON.parse(fs.readFileSync(DECISIONS, 'utf8'))
const hist = JSON.parse(fs.readFileSync(HISTORY, 'utf8'))

// 1. Область проверки: главная и /uslugi/* на PL/UK/RU — из sitemap
const urls = await siteUrls()

// 2. Текущие Title с сайта
const current = {}
for (const u of urls) {
  const html = await (await fetch(SITE + u)).text()
  current[u] = unesc((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '')
}

// 3. Сравнение с утверждёнными решениями
const names = dec.names || {}
const known = new Set(dec.groups.flatMap(([, s]) => s))
const groups = [...dec.groups]
const fresh = [...new Set(urls.map((u) => parse(u).s).filter((s) => !known.has(s)))]
if (fresh.length) groups.push(['Новые страницы', fresh])

const rows = urls.map((u) => {
  const { l, s } = parse(u)
  const t = current[u]
  const suffix = dec.suffix[l]
  const base = t.endsWith(suffix) ? t.slice(0, -suffix.length) : t
  const a = dec.approved[u]
  const rv = dec.pending.review[u] || null
  const rj = (dec.rejected[u] || []).at(-1)
  const was = a?.history.length > 1 ? a.history.at(-2).title : null
  return {
    s, l, u, t, len: [...t].length, base, suffix,
    name: names[s] || s,
    isNew: !a,
    exc: rv?.exc ?? a?.exception ?? dec.pending.proposals[u]?.exc ?? null,
    review: rv,
    appr: a
      ? { base: a.title.endsWith(suffix) ? a.title.slice(0, -suffix.length) : a.title, applied: t === a.title, was, date: fmt(a.date), stage: `этап ${a.stage}` }
      : null,
    rej: rj ? { t: rj.title, date: fmt(rj.date) } : null,
    prop: dec.pending.proposals[u]?.title ?? null,
  }
})
const missing = Object.keys(dec.approved).filter((u) => !urls.includes(u))

// 4. Изменения с прошлой проверки, подсчёт, история, панель
const changes = diff(hist.snapshot.title, current, urls)
saveTab('title', { rows, groups, missing })
const problems = await countTodo('title', hist)
if (!DRY) record(hist, 'title', { pages: urls.length, problems, changes, current })
writePanel(hist)

console.log(`Страниц: ${urls.length} · требуют решения: ${problems ?? '?'} · изменений с прошлой проверки: ${changes.length}` +
  (fresh.length ? ` · новые разделы: ${fresh.join(', ')}` : '') + (missing.length ? ` · пропали: ${missing.join(', ')}` : ''))
for (const c of changes) console.log(' ', c.type || 'changed', c.u, c.from ? `«${c.from}» →` : '', c.to ? `«${c.to}»` : '')
console.log(`Панель: ${PANEL}${DRY ? ' (без записи в историю)' : ''}`)
