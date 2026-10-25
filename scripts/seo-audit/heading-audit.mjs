// Проверка заголовков H1–H4 и сборка вкладок H1–H4 SEO-панели (Omobonus Workspace, localhost:5180/seo?tab=h1).
// Предложения и решения: docs/seo/heading-decisions.json · история: docs/seo/audit-history.json
//
//   node scripts/seo-audit/heading-audit.mjs        — проверить, записать в историю, собрать панель
//   node scripts/seo-audit/heading-audit.mjs --dry  — без записи в историю
//
// Скрипт только читает сайт (localhost:3000) и сверяет каждое предложение с тем, что сейчас на странице:
// «как в аудите» / «уже внедрено» / «изменилось» / «не найдено». Сайт и решения не меняет.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { ROOT, HISTORY, PANEL, SITE, unesc, diff, saveTab, record, writePanel } from './build-panel.mjs'

const DECISIONS = path.join(ROOT, 'docs/seo/heading-decisions.json')
const TITLES = path.join(ROOT, 'docs/seo/title-decisions.json')
const LEVELS = ['h1', 'h2', 'h3', 'h4']
const PAGE_NAMES = { '': 'Главная', 'o-nas': 'O nas', kontakt: 'Kontakt', 'polityka-prywatnosci': 'Polityka prywatności', regulamin: 'Regulamin' }

const txt = (s) => unesc(s.replace(/<br\s*\/?>/g, ' | ').replace(/<[^>]+>/g, '').replace(/&nbsp;| /g, ' '))
const isH = (t) => /^h[1-6]$/.test(t)

// Заголовки, строки прайса и видимый текст страницы
export function extract(html) {
  const body = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '')
  const heads = [], rows = []
  const re = /<(h[1-4])\b([^>]*)>([\s\S]*?)<\/\1>|<div class="service-description-text[^"]*"><div class="[^"]*">([\s\S]*?)<\/div>/g
  let m, sec = '', sub = ''
  while ((m = re.exec(body))) {
    if (m[1]) {
      const x = txt(m[3])
      heads.push({ t: m[1], x, cls: (m[2].match(/class="([^"]*)"/) || [])[1] || '', i: m.index })
      if (!/faq/i.test(m[0])) { if (m[1] === 'h2') { sec = x; sub = '' } else if (m[1] === 'h3') sub = x }
    } else rows.push({ sec, sub, x: txt(m[4]), i: m.index })
  }
  const at = (text) => body.indexOf(text) // место в разметке — только для порядка строк в панели
  const plain = ' ' + unesc(body.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;| /g, ' ')) + ' '
  return { heads, rows, plain, at }
}

// Каким тегом текст сейчас стоит на странице: h1–h4, 'div' (обычный текст) или null (не найден)
export function liveTag(page, text) {
  const h = page.heads.find((x) => x.x === text || text.startsWith(x.x + ' (')) // строка прайса: в H4 уйдёт название без подписи в скобках
  if (h) return h.t
  if (page.rows.some((r) => r.x === text) || page.plain.includes(' ' + text.replace(/ \| /g, ' ') + ' ')) return 'div'
  return null
}
// Место элемента на странице (для порядка строк в панели): заголовок, строка прайса или первое вхождение текста
function posOf(page, text) {
  if (!page) return 1e9
  const h = page.heads.find((x) => x.x === text) || page.rows.find((r) => r.x === text)
  if (h) return h.i
  for (const t of [text.split(' | ')[0], text.slice(0, 20)]) for (const v of [t, t.replace(/'/g, '&#x27;')]) { const i = page.at(v); if (i >= 0) return i }
  return 1e9
}
// Состояние элемента предложения на сайте
function liveState(page, item, propTag) {
  const t = page && liveTag(page, item.text)
  if (!t) return 'missing'
  if (t === item.tag || (!isH(t) && !isH(item.tag))) return 'same'
  if (isH(t)) return t === propTag ? 'applied' : 'changed'
  return isH(propTag) ? 'changed' : 'applied'
}

export async function sitePages() {
  const sm = await (await fetch(`${SITE}/sitemap.xml`)).text()
  const urls = [...new Set([...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\/$/, '') || '/'))]
  const P = {}
  for (const u of urls) P[u] = extract(await (await fetch(SITE + u)).text())
  return { urls, P }
}
export function pageInfo(u, names = {}) {
  const m = u.match(/^(?:\/(uk|ru|en))?(?:\/(.*))?$/)
  const s = m[2] || ''
  const slug = s.replace(/^uslugi\//, '')
  return { u, l: m[1] || 'pl', s, name: names[slug] || PAGE_NAMES[s] || slug }
}

async function main() {
  const DRY = process.argv.includes('--dry')
  const dec = JSON.parse(fs.readFileSync(DECISIONS, 'utf8'))
  const { names = {} } = JSON.parse(fs.readFileSync(TITLES, 'utf8'))
  const hist = JSON.parse(fs.readFileSync(HISTORY, 'utf8'))
  const { urls, P } = await sitePages()
  const info = urls.map((u) => pageInfo(u, names))

  const rows = dec.proposals.map((p) => {
    const pages = p.pages.map((pg) => ({
      ...pageInfo(pg.u, names),
      items: pg.items.map((it) => ({ ...it, now: liveState(P[pg.u], it, p.prop.tag), pos: posOf(P[pg.u], it.text) })),
    }))
    const counts = {}
    for (const pg of pages) for (const it of pg.items) counts[it.now] = (counts[it.now] || 0) + 1
    // Подпись предложения: решение в панели действует только для этой редакции предложения
    const sig = crypto.createHash('md5').update(JSON.stringify([p.status, p.history.length, p.cur, p.prop])).digest('hex').slice(0, 10)
    return { ...p, pages, counts, sig }
  })

  let total = 0
  for (const k of LEVELS) {
    const tabRows = rows.filter((r) => r.tab === k || (r.partOf && rows.find((x) => x.id === r.partOf)?.tab === k))
    const live = {}, livePos = {}
    for (const u of urls) {
      const hs = P[u].heads.filter((h) => h.t === k)
      live[u] = hs.map((h) => h.x)
      livePos[u] = hs.map((h) => h.i)
    }
    saveTab(k, { rows: tabRows, groups: [], extra: { keep: dec.verified.filter((v) => v.tab === k), live, livePos, pages: info, stages: dec.stages } })
    const problems = tabRows.filter((r) => r.status === 'proposed' && !r.partOf).length
    total += problems
    // Снимок: тексты заголовков уровня по странице (длинные — счётчик и отпечаток, чтобы история не разрасталась)
    const current = {}
    for (const u of urls) {
      const j = live[u].join(' ¦ ')
      current[u] = j.length <= 400 ? j : `${live[u].length} заголовков · ${crypto.createHash('md5').update(j).digest('hex').slice(0, 8)}`
    }
    const first = !hist.snapshot[k]
    const changes = first ? [] : diff(hist.snapshot[k], current, urls)
    if (!DRY) {
      record(hist, k, { pages: urls.length, problems, changes, current })
      if (first) {
        hist.tabs[k].at(-1).note = 'Первичный аудит H1–H4: журнал omobonus-seo-h1-h4-audit.md перенесён в docs/seo/heading-decisions.json, все предложения — «Предложено»'
        fs.writeFileSync(HISTORY, JSON.stringify(hist, null, 1) + '\n')
      }
    }
  }
  writePanel(hist)

  const cnt = {}
  for (const r of rows) for (const [s, n] of Object.entries(r.counts)) cnt[s] = (cnt[s] || 0) + n
  console.log(`Страниц: ${urls.length} · предложений на решении: ${total} · элементов: ${JSON.stringify(cnt)}`)
  console.log(`Панель: ${PANEL}${DRY ? ' (без записи в историю)' : ''}`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main()
