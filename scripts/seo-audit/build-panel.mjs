// Общая сборка SEO-панели: данные всех вкладок (%TEMP%\omobonus-seo-<вкладка>.json)
// + история (docs/seo/audit-history.json) → %TEMP%\omobonus-seo-panel.html.
// Вызывается из title-audit.mjs и description-audit.mjs.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
export const HISTORY = path.join(ROOT, 'docs/seo/audit-history.json')
export const PANEL = path.join(os.tmpdir(), 'omobonus-seo-panel.html')
const TEMPLATE = path.join(ROOT, 'scripts/seo-audit/panel-template.html')
const TABS = ['title', 'description']
export const SITE = process.env.SEO_SITE || 'http://localhost:3000'
export const today = () => new Date().toLocaleDateString('sv-SE') // YYYY-MM-DD
const tabFile = (k) => path.join(os.tmpdir(), `omobonus-seo-${k}.json`)

// Адреса проверки: главная и /uslugi/* на PL/UK/RU — из sitemap
export async function siteUrls() {
  const sm = await (await fetch(`${SITE}/sitemap.xml`)).text()
  return [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname.replace(/\/$/, '') || '/')
    .filter((u) => u === '/' || /^(\/(uk|ru))?(\/uslugi\/[^/]+)?$/.test(u))
}
export const parse = (u) => {
  const m = (u === '/' ? '' : u).match(/^(?:\/(uk|ru))?(?:\/uslugi\/([^/]+))?$/)
  return { l: m[1] || 'pl', s: m[2] || '' }
}
export const unesc = (s) =>
  s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim()
export const fmt = (d) => d.split('-').reverse().join('.')

// Изменения с прошлой проверки по снимку вкладки
export function diff(snap = {}, current, urls) {
  const changes = []
  for (const u of urls) {
    if (!(u in snap)) changes.push({ u, type: 'new', to: current[u] })
    else if (snap[u] !== current[u]) changes.push({ u, from: snap[u], to: current[u] })
  }
  for (const u of Object.keys(snap)) if (!urls.includes(u)) changes.push({ u, type: 'removed', from: snap[u] })
  return changes
}

export function saveTab(key, data) {
  fs.writeFileSync(tabFile(key), JSON.stringify(data))
}

function html(hist) {
  const DATA = {}, MISSING = {}
  for (const k of TABS) {
    if (!fs.existsSync(tabFile(k))) continue
    const d = JSON.parse(fs.readFileSync(tabFile(k), 'utf8'))
    DATA[k] = { rows: d.rows, groups: d.groups }
    MISSING[k] = d.missing || []
  }
  return fs.readFileSync(TEMPLATE, 'utf8').replace('/*DATA*/', () =>
    `const DATA=${JSON.stringify(DATA)};const HIST=${JSON.stringify(hist.tabs)};const MISSING=${JSON.stringify(MISSING)};`)
}

// Сколько строк вкладки требуют решения — считается в браузере так же, как в панели
export async function countTodo(key, hist) {
  try {
    const { chromium } = await import('playwright')
    const b = await chromium.launch()
    const p = await b.newPage()
    await p.setContent(html(hist))
    const n = await p.evaluate((k) => SHEETS.find((s) => s[0] === k)[2].TODO.length, key)
    await b.close()
    return n
  } catch (e) {
    console.warn('Подсчёт без браузера невозможен:', e.message)
    return null
  }
}

// Запись проверки в историю вкладки (повторный запуск в тот же день без изменений запись не плодит)
export function record(hist, key, { pages, problems, changes, current }) {
  const list = (hist.tabs[key] = hist.tabs[key] || [])
  const d = today()
  if (list.at(-1)?.date === d && !changes.length) list[list.length - 1] = { ...list.at(-1), pages, problems: problems ?? 0 }
  else list.push({ date: d, pages, problems: problems ?? 0, changes })
  hist.snapshot[key] = current
  fs.writeFileSync(HISTORY, JSON.stringify(hist, null, 1) + '\n')
}

export function writePanel(hist) {
  fs.writeFileSync(PANEL, html(hist))
}
