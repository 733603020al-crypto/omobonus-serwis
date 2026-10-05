#!/usr/bin/env node
// Baseline общего аккордеона услуг (ServiceAccordion) — фиксирует поведение, геометрию,
// скриншоты и производительность ДО переделки, и сравнивает с ними ПОСЛЕ.
// Ничего не добавляет на сайт: работает только с уже существующими страницами.
//
// Запуск (сервер должен отвечать на --base):
//   node tests/accordion-baseline/accordion-baseline.mjs --base http://localhost:3001
//   node tests/accordion-baseline/accordion-baseline.mjs --base http://localhost:3001 --compare <папка baseline>
// Опции: --out <папка> (по умолчанию ~/omobonus-baseline/accordion/<дата-время>)
//        --pages serwis-laptopow,uk/serwis-laptopow   --vp 390,768,1440   --no-trace
//        --compare-only <папка текущего прогона> --compare <папка baseline>  (без нового прогона)
// Результат: results.json, report.html, shots/*.png, traces/*.json.gz (открываются в DevTools → Performance).

import { chromium } from 'playwright'
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import zlib from 'node:zlib'
import { execSync } from 'node:child_process'

const args = process.argv.slice(2)
const arg = (name, def) => { const i = args.indexOf('--' + name); return i < 0 ? def : (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true) }
const BASE = arg('base', 'http://localhost:3000').replace(/\/$/, '')
const stamp = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 16)
const OUT = path.resolve(arg('out', path.join(os.homedir(), 'omobonus-baseline', 'accordion', stamp)))
const COMPARE = arg('compare', null)
const COMPARE_ONLY = arg('compare-only', null)
const DO_TRACE = !args.includes('--no-trace')

const ALL_PAGES = [
  'serwis-laptopow',          // эталон repair-layout: Diagnoza/Dojazd/Konserwacja/Naprawy(7 подкатегорий)/FAQ
  'outsourcing-it',
  'druk-3d-na-zamowienie',
  'wynajem-drukarek',         // подкатегории с таблицами характеристик
  'drukarka-zastepcza',
  'uk/serwis-laptopow',       // UK-версия общего шаблона
]
const pages = (arg('pages', null) ? String(arg('pages')).split(',') : ALL_PAGES)
const pageUrl = p => p.startsWith('uk/') || p.startsWith('ru/') ? `/${p.slice(0, 2)}/uslugi/${p.slice(3)}` : `/uslugi/${p}`
const VPS = { 390: { width: 390, height: 844, isMobile: true, hasTouch: true }, 768: { width: 768, height: 1024, isMobile: true, hasTouch: true }, 1440: { width: 1440, height: 900, isMobile: false, hasTouch: false } }
const vps = (arg('vp', null) ? String(arg('vp')).split(',') : ['390', '768', '1440']).map(Number)

// Допуски сравнения «после переделки» относительно baseline
const TOL = {
  px: 2,                 // координаты шапки/контента/цен, высоты блоков, высота страницы
  openMsFactor: 2, openMsAbs: 200,   // одно открытие: не больше max(base*2, base+200мс) (разовые выбросы)
  openMedFactor: 1.3, openMedAbs: 30, // медиана открытий на странице: не больше base*1.3+30мс
  forcedExtra: 1,        // forced layout в трейсе: не больше base+1 (шум ±1)
  settleMsAbs: 250,      // время до полной остановки высоты/прокрутки
  cls: 0.01,             // прирост CLS за одно открытие
  shotPxDelta: 24,       // пиксель считается изменённым, если канал отличается больше чем на 24/255
  shotRatioViewport: 0.01, shotRatioClip: 0.005, // доля изменённых пикселей: 1% экран, 0.5% блок
  traceFactor: 1.5, traceAbsMs: 20,
}

// ─────────────────────────── код внутри страницы ───────────────────────────
const INIT = () => {
  const AB = window.__AB = { shifts: [], events: [], longtasks: [], t0: null }
  const po = (type, fn, extra = {}) => { try { new PerformanceObserver(l => l.getEntries().forEach(fn)).observe({ type, buffered: true, ...extra }) } catch { } }
  po('layout-shift', e => AB.shifts.push({ t: e.startTime, v: e.value, input: e.hadRecentInput }))
  po('event', e => AB.events.push({ t: e.startTime, name: e.name, d: e.duration }), { durationThreshold: 16 })
  po('longtask', e => AB.longtasks.push({ t: e.startTime, d: e.duration }))
  for (const ev of ['pointerdown', 'mousedown', 'touchstart', 'keydown']) document.addEventListener(ev, e => { if (AB.t0 == null) AB.t0 = e.timeStamp }, { capture: true })

  const ITEM = '[data-slot="accordion-item"]', TRIG = '[data-slot="accordion-trigger"]'
  const wait = ms => new Promise(r => setTimeout(r, ms))
  AB.tops = () => [...document.querySelectorAll(`[data-main-accordion] ${ITEM}`)].filter(e => !e.parentElement.closest(ITEM))
  AB.nested = top => [...top.querySelectorAll(ITEM)].filter(e => e.parentElement.closest(ITEM) === top)
  AB.item = (ti, ni) => { const t = AB.tops()[ti]; return t && (ni == null ? t : AB.nested(t)[ni]) }
  AB.vis = el => {
    if (!el || !el.isConnected) return false
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return false
    for (let x = el; x && x !== document.body; x = x.parentElement) { const s = getComputedStyle(x); if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity < 0.02) return false }
    return true
  }
  AB.trigs = it => [...it.querySelectorAll(TRIG)].filter(t => t.closest(ITEM) === it)
  AB.trig = it => { const all = AB.trigs(it); return all.find(AB.vis) || all[0] }
  // видимая шапка пункта: split-шапка открытой секции или сам триггер
  AB.head = it => {
    const c = [...it.querySelectorAll('[data-top-level-service-header]')].filter(x => x.closest(ITEM) === it && AB.vis(x))
    return c[0] || AB.trig(it)
  }
  AB.body = it => {
    const split = [...it.querySelectorAll('section[data-open-header-split-content]')].find(x => x.closest(ITEM) === it && AB.vis(x))
    if (split) return split
    return [...it.querySelectorAll('[data-slot="accordion-content"]')].find(x => x.closest(ITEM) === it && AB.vis(x)) || null
  }
  AB.R = r => ({ top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), h: Math.round(r.height), w: Math.round(r.width) })
  AB.hdrBottom = () => { const h = document.querySelector('header'); return h ? Math.round(h.getBoundingClientRect().bottom) : 0 }
  AB.arrow = it => { const t = AB.trig(it); const svgs = t ? [...t.querySelectorAll('svg')].filter(AB.vis) : []; const s = svgs[svgs.length - 1]; if (!s) return null; const cs = getComputedStyle(s); return cs.transform + '|' + cs.rotate + '|' + (s.getAttribute('class') || '').length }
  AB.topOf = el => { let x = el && el.closest(ITEM); while (x && x.parentElement.closest(ITEM)) x = x.parentElement.closest(ITEM); return x ? AB.tops().indexOf(x) : -1 }

  // точка внутри триггера, где реальный клик/тап попадёт именно в триггер (не в ссылку/кнопку цены и не под header)
  AB.point = (ti, ni) => {
    const it = AB.item(ti, ni); const t = AB.trig(it); if (!t) return null
    const r = t.getBoundingClientRect(), hb = AB.hdrBottom()
    for (const fy of [0.5, 0.3, 0.7]) for (let fx = 0.06; fx < 0.95; fx += 0.04) {
      const x = r.left + r.width * fx, y = r.top + r.height * fy
      if (y <= hb + 2 || y >= innerHeight - 70 || x < 1 || x > innerWidth - 1) continue
      const el = document.elementFromPoint(x, y); if (!el || el.closest(TRIG) !== t) continue
      const ctl = el.closest('a,button,[role="button"],input,select,textarea'); if (ctl && ctl !== t) continue
      return { x: Math.round(x), y: Math.round(y) }
    }
    return null
  }

  AB.prep = async (ti, ni, { noScroll = false } = {}) => {
    let it = AB.item(ti, ni); if (!it) return { err: 'no item' }
    if (!noScroll) { const r = AB.head(it).getBoundingClientRect(); window.scrollTo({ top: Math.max(0, r.top + scrollY - innerHeight * 0.4), behavior: 'instant' }) }
    await wait(350)
    it = AB.item(ti, ni)
    AB.t0 = null; AB.stateAt = null
    if (AB.mo) AB.mo.disconnect()
    AB.mo = new MutationObserver(() => { if (AB.stateAt == null) AB.stateAt = performance.now() })
    AB.mo.observe(it, { attributes: true, attributeFilter: ['data-state'] })
    const head = AB.head(it)
    AB.before = { state: it.dataset.state, y: Math.round(scrollY), docH: document.documentElement.scrollHeight, itemH: Math.round(it.getBoundingClientRect().height), shiftN: AB.shifts.length, evN: AB.events.length, ltN: AB.longtasks.length, arrow: AB.arrow(it), path: location.pathname, head: AB.R(head.getBoundingClientRect()) }
    return AB.before
  }
  AB.focus = (ti, ni) => { const t = AB.trig(AB.item(ti, ni)); t.focus({ preventScroll: true }); return document.activeElement === t }
  AB.progClick = (ti, ni) => { const t = AB.trig(AB.item(ti, ni)); AB.t0 = performance.now(); t.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); t.click() }

  // кадры до стабилизации высоты/прокрутки
  AB.watch = (ti, ni, maxMs = 3000) => new Promise(res => {
    const samples = []; let last = null, stable = performance.now(); const start = performance.now()
    const f = () => {
      const now = performance.now(), it = AB.item(ti, ni)
      const s = { t: Math.round(now), y: Math.round(scrollY), h: it ? Math.round(it.getBoundingClientRect().height) : -1, top: it ? Math.round(AB.head(it).getBoundingClientRect().top) : -1, dh: document.documentElement.scrollHeight }
      samples.push(s)
      if (last && (s.y !== last.y || s.h !== last.h || s.dh !== last.dh || s.top !== last.top)) stable = now
      last = s
      if ((now - stable > 400 && now - start > 350) || now - start > maxMs) return res({ samples, stableAt: stable })
      requestAnimationFrame(f)
    }
    requestAnimationFrame(f)
  })

  AB.leaves = root => [...root.querySelectorAll('p,li,td,th,img,table,button,a,h1,h2,h3,h4,h5,span,div')].filter(el => (el.tagName === 'IMG' || el.tagName === 'TABLE' || [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) && !el.closest('[aria-hidden="true"]') && AB.vis(el))
  AB.overlaps = root => {
    const els = []
    for (const el of AB.leaves(root)) {
      let kind = el.tagName === 'IMG' ? 'img' : el.tagName === 'TABLE' ? 'table' : 'text'
      if (kind === 'img' && (el.alt === '' || getComputedStyle(el).position === 'absolute')) continue // декоративные подложки
      let r = el.getBoundingClientRect()
      if (kind === 'text') { const rg = document.createRange(); rg.selectNodeContents(el); r = rg.getBoundingClientRect() }
      if (r.width < 2 || r.height < 2) continue
      els.push({ el, kind, r })
    }
    const hits = []
    for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) {
      const a = els[i], b = els[j]
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue
      const ox = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left), oy = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top)
      if (ox > 2 && oy > 2) hits.push(`${a.kind}:${(a.el.textContent || a.el.alt || '').trim().slice(0, 24)} × ${b.kind}:${(b.el.textContent || b.el.alt || '').trim().slice(0, 24)}`)
    }
    return { n: hits.length, sample: hits.slice(0, 6), checked: els.length }
  }
  const PRICE_RX = /(cena|ceny|ціна|цена|czas|termin|термін|срок|час|zł|pln)/i
  AB.prices = (it, head) => {
    const h0 = head.getBoundingClientRect().top
    const set = new Set([...it.querySelectorAll('[data-price],[data-subcategory-price],[data-dz-price-header],th,[role="columnheader"]')])
    for (const el of AB.leaves(it)) if (el.children.length === 0 && PRICE_RX.test(el.textContent) && el.textContent.length < 40) set.add(el)
    return [...set].filter(AB.vis).slice(0, 16).map(el => { const r = el.getBoundingClientRect(); return { txt: el.textContent.trim().slice(0, 30), dy: Math.round(r.top - h0), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) } })
  }

  AB.after = async (ti, ni) => {
    const w = await AB.watch(ti, ni)
    await wait(120)
    const b = AB.before, t0 = AB.t0 ?? w.samples[0].t
    const it = AB.item(ti, ni), hb = AB.hdrBottom()
    const open = it.dataset.state === 'open'
    const sibs = ni == null ? AB.tops() : AB.nested(AB.tops()[ti])
    const openIdx = sibs.map((s, k) => s.dataset.state === 'open' ? k : -1).filter(k => k >= 0)
    const head = AB.head(it), hr = AB.R(head.getBoundingClientRect())
    const body = open ? AB.body(it) : null, br = body ? AB.R(body.getBoundingClientRect()) : null
    const ir = AB.R(it.getBoundingClientRect())
    const anchorEl = document.elementFromPoint(innerWidth / 2, hb + 4)
    // высота по кадрам: провалы (уменьшение во время открытия) и максимальный шаг
    const hs = w.samples.map(s => s.h); let dip = 0, step = 0, yRev = 0, lastDir = 0
    for (let k = 1; k < hs.length; k++) { const d = hs[k] - hs[k - 1]; step = Math.max(step, Math.abs(d)); if (open && d < 0) dip = Math.max(dip, -d); if (!open && d > 0) dip = Math.max(dip, d) }
    for (let k = 1; k < w.samples.length; k++) { const d = Math.sign(w.samples[k].y - w.samples[k - 1].y); if (d && lastDir && d !== lastDir) yRev++; if (d) lastDir = d }
    const firstChange = w.samples.find(s => s.h !== b.itemH)
    const shifts = AB.shifts.slice(b.shiftN), evs = AB.events.slice(b.evN), lts = AB.longtasks.slice(b.ltN)
    let gap = null
    if (body) { const lv = AB.leaves(body); const mb = lv.length ? Math.max(...lv.map(e => e.getBoundingClientRect().bottom)) : br.top; gap = Math.round(br.bottom - mb) }
    const y1 = Math.round(scrollY); await wait(500); const y2 = Math.round(scrollY)
    const headTop2 = Math.round(AB.head(AB.item(ti, ni)).getBoundingClientRect().top)
    const docW = document.documentElement.scrollWidth
    return {
      open, openIdx, onlyOne: open ? openIdx.length === 1 && openIdx[0] === (ni ?? ti) : !openIdx.includes(ni ?? ti),
      path: location.pathname, navigated: location.pathname !== b.path,
      hdrBottom: hb, head: hr, body: br, item: ir,
      headDy: hr.top - b.head.top, headUnderHeader: hr.top < hb - 1,
      bodyBelowHead: br ? br.top >= hr.bottom - 8 : null, bodyGapToHead: br ? br.top - hr.bottom : null,
      anchorTop: AB.topOf(anchorEl), scrollY: y1, scrollStable: y1 === y2 && headTop2 === hr.top,
      docHBefore: b.docH, docHAfter: document.documentElement.scrollHeight,
      overflowX: Math.max(0, docW - document.documentElement.clientWidth),
      arrowChanged: b.arrow != null ? AB.arrow(it) !== b.arrow : null,
      openMs: AB.stateAt != null ? Math.round(AB.stateAt - t0) : null,
      firstFrameMs: firstChange ? Math.round(firstChange.t - t0) : null,
      settleMs: Math.round(w.stableAt - t0),
      frames: w.samples.length, heightDip: dip, heightMaxStep: step, scrollReversals: yRev,
      clsAll: +shifts.reduce((a, s) => a + s.v, 0).toFixed(4), clsNoInput: +shifts.filter(s => !s.input).reduce((a, s) => a + s.v, 0).toFixed(4),
      inputDelayMs: evs.length ? Math.round(Math.max(...evs.map(e => e.d))) : '<16',
      longTasks: lts.length, longTaskMaxMs: lts.length ? Math.round(Math.max(...lts.map(l => l.d))) : 0,
      overlaps: open ? AB.overlaps(it) : null, emptyGapBottom: gap,
      prices: open ? AB.prices(it, head) : null,
      brokenImgs: [...it.querySelectorAll('img')].filter(i => i.complete && i.naturalWidth === 0 && i.getAttribute('src')).map(i => i.getAttribute('src')),
      links: open ? [...it.querySelectorAll('a[href]')].filter(AB.vis).map(a => a.getAttribute('href')) : [],
    }
  }

  // кнопки внутри открытого пункта (кроме триггеров): «Zobacz cennik», подсказки цен и т.п.
  AB.ctrls = (ti, ni) => {
    const it = AB.item(ti, ni)
    return [...it.querySelectorAll('button,[role="button"]')].filter(b => !b.matches(TRIG) && b.closest(ITEM) === it && AB.vis(b)).slice(0, 2).map(b => {
      const r = b.getBoundingClientRect(); return { txt: (b.textContent || b.getAttribute('aria-label') || '').trim().slice(0, 30), x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), top: r.top }
    })
  }
  AB.popup = () => [...document.querySelectorAll('[data-radix-popper-content-wrapper],[role="dialog"],[role="tooltip"],[data-slot="popover-content"],[data-slot="tooltip-content"]')].some(AB.vis)
  AB.state = (ti, ni) => AB.item(ti, ni)?.dataset.state
  AB.pageInfo = () => ({ docH: document.documentElement.scrollHeight, overflowX: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth), cls: +AB.shifts.filter(s => !s.input).reduce((a, s) => a + s.v, 0).toFixed(4), broken: [...document.images].filter(i => i.complete && i.naturalWidth === 0 && i.getAttribute('src')).map(i => i.getAttribute('src')), tops: AB.tops().map(t => ({ title: (AB.trig(t)?.textContent || '').trim().slice(0, 40), nested: AB.nested(t).length })), hdr: AB.hdrBottom() })
}

// ─────────────────────────── прогон ───────────────────────────
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a)
const MASK = ['.service-hero-image-wrap', '.review-parchment', 'video', 'canvas']

async function shot(p, file, clip) {
  const full = path.join(OUT, 'shots', file)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  const mask = MASK.map(s => p.locator(s))
  if (clip) await p.screenshot({ path: full, fullPage: true, clip, animations: 'disabled', caret: 'hide', mask })
  else await p.screenshot({ path: full, animations: 'disabled', caret: 'hide', mask })
  return 'shots/' + file
}

async function act(p, vp, ti, ni, how) {
  if (how === 'tap' || how === 'click') {
    const pt = await p.evaluate(([a, b]) => __AB.point(a, b), [ti, ni])
    if (!pt) { await p.evaluate(([a, b]) => __AB.progClick(a, b), [ti, ni]); return 'programmatic' }
    if (VPS[vp].hasTouch) await p.touchscreen.tap(pt.x, pt.y); else await p.mouse.click(pt.x, pt.y)
    return VPS[vp].hasTouch ? 'tap' : 'click'
  }
  const focused = await p.evaluate(([a, b]) => __AB.focus(a, b), [ti, ni])
  await p.keyboard.press(how === 'space' ? ' ' : how === 'enter' ? 'Enter' : 'Escape')
  return how + (focused ? '' : '(no-focus)')
}

async function step(p, ctx, vp, pg, st, { kind, ti, ni = null, how = 'tap', noScroll = false, shots = null }) {
  const before = await p.evaluate(([a, b, o]) => __AB.prep(a, b, o), [ti, ni, { noScroll }])
  if (before.err) { st.push({ kind, ti, ni, err: before.err }); return null }
  const base = `${vp}/${pg.replace('/', '_')}/${kind}-${ti}${ni != null ? '-' + ni : ''}`
  const rec = { kind, ti, ni, how, before: { state: before.state, headTop: before.head.top, docH: before.docH, itemH: before.itemH } }
  if (shots) rec.shotBefore = await shot(p, base + '-before.png')
  rec.input = await act(p, vp, ti, ni, how)
  Object.assign(rec, await p.evaluate(([a, b]) => __AB.after(a, b), [ti, ni]))
  if (rec.navigated) { log('  ! навигация', rec.path); await p.goBack({ waitUntil: 'load' }).catch(() => { }); await p.waitForTimeout(1500) }
  if (shots) {
    rec.shotAfter = await shot(p, base + '-after.png')
    if (shots === 'full' && rec.open) {
      const c = await p.evaluate(([a, b]) => { const r = __AB.item(a, b).getBoundingClientRect(); return { x: 0, y: Math.round(r.top + scrollY), width: innerWidth, height: Math.min(6000, Math.round(r.height)) } }, [ti, ni])
      if (c.height > 0) rec.shotFull = await shot(p, base + '-full.png', c)
    }
  }
  st.push(rec)
  const bad = []
  if (rec.open !== !/close/.test(kind)) bad.push('state')
  if (!rec.onlyOne) bad.push('onlyOne')
  if (rec.open && rec.bodyBelowHead === false) bad.push('bodyAboveHead')
  if (rec.headUnderHeader) bad.push('headUnderHeader')
  if (rec.overflowX) bad.push('overflowX')
  if (rec.navigated) bad.push('navigated')
  if (!rec.scrollStable) bad.push('scrollNotStable')
  if (rec.brokenImgs.length) bad.push('brokenImg')
  if (!rec.open && ni == null && Math.abs(rec.docHAfter - (st.docHClosed ?? rec.docHAfter)) > TOL.px) bad.push('heightNotRestored')
  rec.fails = bad
  log(`  ${kind} ${ti}${ni != null ? '.' + ni : ''} ${rec.input} open=${rec.open} ${rec.openMs}ms settle=${rec.settleMs} headTop=${rec.head.top} dy=${rec.headDy} ${bad.join(',')}`)
  return rec
}

async function runPage(browser, vp, pg) {
  const cfg = VPS[vp]
  const ctx = await browser.newContext({ viewport: { width: cfg.width, height: cfg.height }, isMobile: cfg.isMobile, hasTouch: cfg.hasTouch, deviceScaleFactor: 1 })
  await ctx.addInitScript(INIT)
  const p = await ctx.newPage()
  const R = { vp, page: pg, url: pageUrl(pg), console: [], pageErrors: [], failed: [], httpErrors: [], steps: [] }
  p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') R.console.push(`${m.type()}: ${m.text().slice(0, 300)}`) })
  p.on('pageerror', e => R.pageErrors.push(String(e).slice(0, 300)))
  p.on('requestfailed', r => { const f = r.failure()?.errorText || ''; if (!/ERR_ABORTED/.test(f)) R.failed.push(`${f} ${r.url()}`) })
  p.on('response', r => { if (r.status() >= 400) R.httpErrors.push(`${r.status()} ${r.url()}`) })
  const t = Date.now()
  await p.goto(BASE + R.url, { waitUntil: 'load', timeout: 180000 })
  await p.waitForTimeout(2500)
  R.loadMs = Date.now() - t
  R.load = await p.evaluate(() => __AB.pageInfo())
  const st = R.steps; st.docHClosed = R.load.docH
  const n = R.load.tops.length
  log(`${vp} ${pg}: ${n} категорий`, R.load.tops.map(x => x.nested).join('/'))

  for (let i = 0; i < n; i++) {
    const o = await step(p, ctx, vp, pg, st, { kind: 'open', ti: i, shots: 'full' })
    if (!o) continue
    // кнопки/подсказки внутри открытой категории + Escape
    const ctrls = await p.evaluate(([a]) => __AB.ctrls(a, null), [i])
    o.buttons = []
    for (const c of ctrls) {
      if (c.top < R.load.hdr + 2 || c.y > cfg.height - 70) continue
      if (cfg.hasTouch) await p.touchscreen.tap(c.x, c.y); else await p.mouse.click(c.x, c.y)
      await p.waitForTimeout(500)
      const opened = await p.evaluate(() => __AB.popup())
      const stateKept = (await p.evaluate(([a]) => __AB.state(a, null), [i])) === 'open'
      await p.keyboard.press('Escape'); await p.waitForTimeout(400)
      const escClosed = !(await p.evaluate(() => __AB.popup()))
      o.buttons.push({ txt: c.txt, opened, stateKept, escClosed })
      if (!escClosed) { await p.keyboard.press('Escape'); await p.waitForTimeout(300) }
      if (!stateKept) await step(p, ctx, vp, pg, st, { kind: 'reopen', ti: i })
    }
    // подкатегории / вопросы FAQ
    const nn = (await p.evaluate(([a]) => __AB.nested(__AB.tops()[a]).length, [i]))
    for (let j = 0; j < nn; j++) {
      await step(p, ctx, vp, pg, st, { kind: 'sub-open', ti: i, ni: j, shots: j === 0 ? 'full' : null })
      await step(p, ctx, vp, pg, st, { kind: 'sub-close', ti: i, ni: j })
    }
    // переключение: при открытой категории i открыть следующую i+1
    if (i + 1 < n) { await step(p, ctx, vp, pg, st, { kind: 'switch', ti: i + 1, shots: 'view' }); await step(p, ctx, vp, pg, st, { kind: 'close', ti: i + 1 }) }
    else await step(p, ctx, vp, pg, st, { kind: 'close', ti: i })
    // если после switch категория i осталась открытой — это уже зафиксировано в onlyOne
  }

  // клавиатура: Enter/Space/Escape на первой категории, первой подкатегории и FAQ
  const kbTargets = [[0, null]]
  const withNested = R.load.tops.findIndex((x, k) => k > 0 && x.nested > 0)
  const faq = R.load.tops.findIndex(x => /FAQ/i.test(x.title))
  for (const k of new Set([withNested, faq].filter(k => k >= 0))) kbTargets.push([k, 'first-nested'])
  if (faq >= 0) kbTargets.push([faq, null])
  for (const [ti, sub] of kbTargets) {
    let ni = null
    if (sub) { await step(p, ctx, vp, pg, st, { kind: 'open', ti, how: 'enter' }); ni = 0 }
    await step(p, ctx, vp, pg, st, { kind: 'kb-open', ti, ni, how: 'enter' })
    await step(p, ctx, vp, pg, st, { kind: 'kb-close', ti, ni, how: 'enter', noScroll: true })
    await step(p, ctx, vp, pg, st, { kind: 'kb-open', ti, ni, how: 'space', noScroll: true })
    await step(p, ctx, vp, pg, st, { kind: 'kb-esc', ti, ni, how: 'escape', noScroll: true })
    await step(p, ctx, vp, pg, st, { kind: 'kb-close', ti, ni, how: 'space', noScroll: true })
    if (sub) await step(p, ctx, vp, pg, st, { kind: 'close', ti, how: 'enter' })
  }
  // kb-esc: у Radix Accordion Escape не закрывает раздел — фиксируем фактическое поведение как норму
  for (const s of st) if (s.kind === 'kb-esc') s.fails = s.fails.filter(f => f !== 'state')

  R.end = await p.evaluate(() => __AB.pageInfo())
  // ссылки внутри аккордеона: отвечают ли
  const links = [...new Set(st.flatMap(s => s.links || []))].filter(h => h.startsWith('/'))
  R.links = []
  for (const h of links.slice(0, 40)) { const r = await p.request.get(BASE + h).catch(e => ({ status: () => String(e).slice(0, 60) })); R.links.push({ href: h, status: r.status() }) }
  await ctx.close()
  return R
}

// ─────────────────────────── CPU-трейс открытия ───────────────────────────
function analyzeTrace(evts) {
  const tn = evts.filter(e => e.name === 'thread_name' && e.args?.name === 'CrRendererMain')
  const disp = evts.filter(e => e.name === 'EventDispatch' && ['click', 'pointerup', 'touchend', 'keydown'].includes(e.args?.data?.type)).sort((a, b) => a.ts - b.ts)
  const cnt = new Map(); for (const e of evts) if (e.ph === 'X') cnt.set(e.pid + ':' + e.tid, (cnt.get(e.pid + ':' + e.tid) || 0) + 1)
  // клик на самом загруженном потоке рендера (не в iframe сторонних скриптов)
  const click = [...disp].sort((a, b) => (cnt.get(b.pid + ':' + b.tid) || 0) - (cnt.get(a.pid + ':' + a.tid) || 0) || a.ts - b.ts)[0]; if (!click) return { err: 'no click in trace' }
  const { pid, tid } = click
  const t0 = click.ts, t1 = t0 + 2e6
  const M = evts.filter(e => e.pid === pid && e.tid === tid && e.ph === 'X' && e.ts >= t0 - 50e3 && e.ts <= t1)
  const ms = us => +(us / 1000).toFixed(1)
  const sum = (a) => a.reduce((x, e) => x + (e.dur || 0), 0)
  const tasks = evts.filter(e => e.pid === pid && e.tid === tid && e.ph === 'X' && e.name === 'RunTask' && e.ts + e.dur >= t0 && e.ts <= t1)
  const SCRIPT = ['FunctionCall', 'EventDispatch', 'TimerFire', 'FireAnimationFrame', 'RunMicrotasks', 'v8.callFunction', 'FireIdleCallback']
  const scripts = M.filter(e => SCRIPT.includes(e.name))
  const inside = (l) => scripts.some(s => l.ts >= s.ts && l.ts + l.dur <= s.ts + s.dur)
  const layouts = M.filter(e => e.name === 'Layout'), styles = M.filter(e => e.name === 'UpdateLayoutTree')
  const forced = layouts.filter(inside), forcedStyle = styles.filter(inside)
  const topScripts = scripts.filter(s => !scripts.some(o => o !== s && s.ts >= o.ts && s.ts + s.dur <= o.ts + o.dur))
  const stacks = [...new Set(forced.flatMap(l => (l.args?.beginData?.stackTrace || []).slice(0, 2).map(f => `${f.functionName || '(anon)'} ${String(f.url).split('/').pop()}:${f.lineNumber}`)))].slice(0, 8)
  const paint = M.filter(e => ['Paint', 'Commit', 'PrePaint'].includes(e.name) && e.ts > click.ts + click.dur).sort((a, b) => a.ts - b.ts)[0]
  // CPU-профиль: самые затратные функции в окне 2 с после клика
  const prof = evts.find(e => e.name === 'Profile' && e.pid === pid && e.tid === tid)
  const top = []
  if (prof) {
    const nodes = new Map(); const samples = []; const deltas = []
    for (const e of evts.filter(e => e.name === 'ProfileChunk' && e.id === prof.id)) {
      const d = e.args?.data || {}; for (const nd of d.cpuProfile?.nodes || []) nodes.set(nd.id, nd)
      samples.push(...(d.cpuProfile?.samples || [])); deltas.push(...(d.timeDeltas || []))
    }
    let t = prof.args?.data?.startTime || 0; const self = new Map()
    for (let k = 0; k < samples.length; k++) {
      t += deltas[k] || 0; const dt = deltas[k + 1] || 0
      if (t < t0 || t > t1) continue
      const cf = nodes.get(samples[k])?.callFrame; if (!cf) continue
      const key = `${cf.functionName || '(anonymous)'} ${String(cf.url || '').split('/').pop().slice(0, 50)}:${cf.lineNumber}`
      self.set(key, (self.get(key) || 0) + dt)
    }
    for (const [k, v] of [...self].sort((a, b) => b[1] - a[1]).filter(([k]) => !/^\(idle\)/.test(k)).slice(0, 12)) top.push({ fn: k, selfMs: ms(v) })
  }
  return {
    clickHandlerMs: ms(click.dur), busyMs: ms(sum(tasks)), longestTaskMs: ms(Math.max(0, ...tasks.map(e => e.dur))),
    scriptingMs: ms(sum(topScripts)), layoutCount: layouts.length, layoutMs: ms(sum(layouts)), styleMs: ms(sum(styles)),
    forcedLayouts: forced.length, forcedLayoutMs: ms(sum(forced)), forcedStyle: forcedStyle.length, forcedStacks: stacks,
    firstPaintAfterClickMs: paint ? ms(paint.ts - t0) : null, cpuTop: top, threads: tn.length,
  }
}

async function traceOpen(browser, vp, pg, ti, label, throttle) {
  const cfg = VPS[vp]
  const ctx = await browser.newContext({ viewport: { width: cfg.width, height: cfg.height }, isMobile: cfg.isMobile, hasTouch: cfg.hasTouch, deviceScaleFactor: 1 })
  await ctx.addInitScript(INIT)
  const p = await ctx.newPage()
  await p.goto(BASE + pageUrl(pg), { waitUntil: 'load', timeout: 180000 }); await p.waitForTimeout(2500)
  const cdp = await ctx.newCDPSession(p)
  if (throttle > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: throttle })
  await p.evaluate(([a]) => __AB.prep(a, null), [ti])
  const evts = []; cdp.on('Tracing.dataCollected', e => evts.push(...e.value))
  const done = new Promise(r => cdp.once('Tracing.tracingComplete', r))
  await cdp.send('Tracing.start', { categories: ['devtools.timeline', 'disabled-by-default-devtools.timeline', 'disabled-by-default-devtools.timeline.stack', 'disabled-by-default-v8.cpu_profiler', 'v8.execute', 'blink.user_timing', 'latencyInfo', '__metadata'].join(','), options: 'sampling-frequency=10000' })
  const input = await act(p, vp, ti, null, 'tap')
  const m = await p.evaluate(([a]) => __AB.after(a, null), [ti])
  await cdp.send('Tracing.end'); await done
  const file = `traces/${vp}-${pg.replace('/', '_')}-${label}-cpu${throttle}x.json.gz`
  fs.mkdirSync(path.join(OUT, 'traces'), { recursive: true })
  fs.writeFileSync(path.join(OUT, file), zlib.gzipSync(JSON.stringify({ traceEvents: evts })))
  await ctx.close()
  const a = analyzeTrace(evts)
  log(`trace ${vp} ${pg} ${label} ${throttle}x: busy=${a.busyMs}ms layout=${a.layoutCount}/${a.layoutMs}ms forced=${a.forcedLayouts}`)
  return { vp, page: pg, ti, label, cpuThrottle: throttle, input, file, openMs: m.openMs, settleMs: m.settleMs, ...a }
}

// ─────────────────────────── сравнение ───────────────────────────
async function diffPng(a, b, outFile) {
  const [A, B] = await Promise.all([a, b].map(f => sharp(f).ensureAlpha().raw().toBuffer({ resolveWithObject: true })))
  if (A.info.width !== B.info.width || A.info.height !== B.info.height) return { sizeChanged: `${A.info.width}×${A.info.height} → ${B.info.width}×${B.info.height}`, ratio: 1 }
  const n = A.info.width * A.info.height, out = Buffer.alloc(n * 4); let bad = 0
  for (let i = 0; i < n; i++) {
    const o = i * 4, d = Math.max(Math.abs(A.data[o] - B.data[o]), Math.abs(A.data[o + 1] - B.data[o + 1]), Math.abs(A.data[o + 2] - B.data[o + 2]))
    if (d > TOL.shotPxDelta) { bad++; out[o] = 255; out[o + 3] = 255 } else { const g = (B.data[o] + B.data[o + 1] + B.data[o + 2]) / 9; out[o] = out[o + 1] = out[o + 2] = g; out[o + 3] = 255 }
  }
  const ratio = bad / n
  if (outFile && bad) { fs.mkdirSync(path.dirname(outFile), { recursive: true }); await sharp(out, { raw: { width: A.info.width, height: A.info.height, channels: 4 } }).png().toFile(outFile) }
  return { ratio: +ratio.toFixed(5), changedPx: bad }
}

const stepKey = (R, s, k) => `${R.vp}|${R.page}|${k}|${s.kind}|${s.ti}|${s.ni ?? ''}|${s.how}`
function indexSteps(results) {
  const m = new Map()
  for (const R of results.pages) { const cnt = {}; for (const s of R.steps) { const b = `${s.kind}|${s.ti}|${s.ni}|${s.how}`; cnt[b] = (cnt[b] || 0) + 1; m.set(stepKey(R, s, cnt[b]), s) } }
  return m
}

async function compare(curDir, baseDir) {
  const cur = JSON.parse(fs.readFileSync(path.join(curDir, 'results.json'), 'utf8'))
  const base = JSON.parse(fs.readFileSync(path.join(baseDir, 'results.json'), 'utf8'))
  const fails = [], notes = []
  const F = (key, what, b, c) => fails.push({ key, what, base: b, cur: c })
  const bi = indexSteps(base), ci = indexSteps(cur)
  const near = (a, b) => a == null || b == null || Math.abs(a - b) <= TOL.px
  // сравниваем только те ширины/страницы, которые есть в текущем прогоне (можно гонять подмножество)
  const ran = new Set(cur.pages.map(p => `${p.vp}|${p.page}`))
  for (const [key, b] of bi) {
    if (!ran.has(key.split("|").slice(0, 2).join("|"))) continue
    const c = ci.get(key); if (!c) { F(key, 'шаг отсутствует', 'есть', 'нет'); continue }
    for (const flag of ['open', 'onlyOne', 'bodyBelowHead', 'scrollStable', 'arrowChanged']) if (b[flag] === true && c[flag] !== true) F(key, flag, b[flag], c[flag])
    for (const flag of ['headUnderHeader', 'navigated']) if (b[flag] === false && c[flag] !== false) F(key, flag, b[flag], c[flag])
    if (c.overflowX > b.overflowX) F(key, 'горизонтальный overflow', b.overflowX, c.overflowX)
    if (!near(b.head?.top, c.head?.top)) F(key, 'верх шапки (px от окна)', b.head?.top, c.head?.top)
    if (!near(b.head?.h, c.head?.h)) F(key, 'высота шапки', b.head?.h, c.head?.h)
    if (!near(b.body?.top, c.body?.top)) F(key, 'верх открытого контента', b.body?.top, c.body?.top)
    if (!near(b.item?.h, c.item?.h)) F(key, 'высота пункта', b.item?.h, c.item?.h)
    if (!near(b.docHAfter, c.docHAfter)) F(key, 'высота страницы после', b.docHAfter, c.docHAfter)
    if (!near(b.scrollY, c.scrollY)) F(key, 'позиция прокрутки после', b.scrollY, c.scrollY)
    if (b.anchorTop !== c.anchorTop) F(key, 'пункт под фикс. header (якорь)', b.anchorTop, c.anchorTop)
    if ((b.prices || []).length !== (c.prices || []).length) F(key, 'кол-во цен/сроков', (b.prices || []).length, (c.prices || []).length)
    else (b.prices || []).forEach((p, k) => { const q = c.prices[k]; if (!near(p.dy, q.dy) || !near(p.x, q.x)) F(key, `цена/срок «${p.txt}»`, `${p.dy},${p.x}`, `${q.dy},${q.x}`) })
    if ((c.overlaps?.n || 0) > (b.overlaps?.n || 0)) F(key, 'наложения текста/картинок/таблиц', b.overlaps?.n, c.overlaps?.n)
    if (b.emptyGapBottom != null && c.emptyGapBottom > b.emptyGapBottom + TOL.px) F(key, 'пустое место внизу', b.emptyGapBottom, c.emptyGapBottom)
    if (c.heightDip > b.heightDip + TOL.px) F(key, 'скачок высоты (провал)', b.heightDip, c.heightDip)
    if (c.brokenImgs.length > b.brokenImgs.length) F(key, 'битые картинки', b.brokenImgs.length, c.brokenImgs.length)
    if (b.openMs != null && c.openMs > Math.max(b.openMs * TOL.openMsFactor, b.openMs + TOL.openMsAbs)) F(key, 'время открытия, мс', b.openMs, c.openMs)
    if (c.settleMs > b.settleMs + TOL.settleMsAbs) F(key, 'время до остановки, мс', b.settleMs, c.settleMs)
    if (c.clsNoInput > b.clsNoInput + TOL.cls) F(key, 'CLS без ввода', b.clsNoInput, c.clsNoInput)
    for (const [k, bb] of (b.buttons || []).entries()) { const cb = (c.buttons || [])[k]; if (!cb) F(key, `кнопка «${bb.txt}» пропала`, 'есть', 'нет'); else for (const f of ['opened', 'stateKept', 'escClosed']) if (bb[f] && !cb[f]) F(key, `кнопка «${bb.txt}» ${f}`, true, false) }
    for (const sh of ['shotBefore', 'shotAfter', 'shotFull']) if (b[sh]) {
      const fa = path.join(baseDir, b[sh]), fb = path.join(curDir, c[sh] || b[sh])
      if (!fs.existsSync(fb)) { F(key, `скриншот ${sh} отсутствует`, b[sh], null); continue }
      const d = await diffPng(fa, fb, path.join(curDir, 'diff', b[sh].replace(/^shots\//, '')))
      const lim = sh === 'shotFull' ? TOL.shotRatioClip : TOL.shotRatioViewport
      if (d.sizeChanged || d.ratio > lim) F(key, `скриншот ${sh} отличается`, `≤${lim * 100}%`, d.sizeChanged || `${(d.ratio * 100).toFixed(2)}% → diff/${b[sh].replace(/^shots\//, '')}`)
    }
  }
  for (const bp of base.pages) {
    const cp = cur.pages.find(x => x.vp === bp.vp && x.page === bp.page); if (!cp) continue
    const med = P => { const a = P.steps.filter(s => s.open && /open|switch/.test(s.kind) && s.openMs != null).map(s => s.openMs).sort((x, y) => x - y); return a.length ? a[Math.floor(a.length / 2)] : 0 }
    if (med(cp) > med(bp) * TOL.openMedFactor + TOL.openMedAbs) F(`${bp.vp}|${bp.page}`, 'медиана времени открытия, мс', med(bp), med(cp))
    const k = `${bp.vp}|${bp.page}`
    for (const f of ['console', 'pageErrors', 'failed', 'httpErrors']) if (cp[f].length > bp[f].length) F(k, f, bp[f].length, cp[f].length + ': ' + cp[f].slice(0, 3).join(' ; '))
    if (cp.end.broken.length > bp.end.broken.length) F(k, 'битые картинки на странице', bp.end.broken.length, cp.end.broken.length)
    if (cp.load.cls > bp.load.cls + TOL.cls) F(k, 'CLS загрузки', bp.load.cls, cp.load.cls)
    if (!near(bp.load.docH, cp.load.docH)) F(k, 'высота страницы (всё закрыто)', bp.load.docH, cp.load.docH)
    for (const l of cp.links) { const bl = bp.links.find(x => x.href === l.href); if (l.status >= 400 && (!bl || bl.status < 400)) F(k, 'ссылка не открывается', l.href, l.status) }
  }
  for (const bt of base.traces || []) {
    const ct = (cur.traces || []).find(x => x.vp === bt.vp && x.page === bt.page && x.label === bt.label); if (!ct) { notes.push(`трейс ${bt.vp} ${bt.label} не снят`); continue }
    const k = `trace ${bt.vp} ${bt.page} ${bt.label}`
    if (ct.forcedLayouts > bt.forcedLayouts + TOL.forcedExtra) F(k, 'forced layout (шт)', bt.forcedLayouts, ct.forcedLayouts)
    for (const f of ['busyMs', 'layoutMs', 'scriptingMs', 'longestTaskMs']) if (ct[f] > Math.max(bt[f] * TOL.traceFactor, bt[f] + TOL.traceAbsMs)) F(k, f, bt[f], ct[f])
  }
  return { fails, notes, base: baseDir, cur: curDir }
}

// ─────────────────────────── отчёт ───────────────────────────
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
function norms(res) {
  const rows = []
  for (const vp of [...new Set(res.pages.map(p => p.vp))]) {
    const st = res.pages.filter(p => p.vp === vp).flatMap(p => p.steps)
    const opens = st.filter(s => s.open && /open|switch/.test(s.kind))
    const v = (a) => a.filter(x => typeof x === 'number')
    const mx = a => v(a).length ? Math.max(...v(a)) : null, med = a => { const s = v(a).sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : null }
    rows.push({
      vp, steps: st.length, failedSteps: st.filter(s => s.fails?.length).length,
      openMsMed: med(opens.map(s => s.openMs)), openMsMax: mx(opens.map(s => s.openMs)),
      settleMsMed: med(opens.map(s => s.settleMs)), settleMsMax: mx(opens.map(s => s.settleMs)),
      clsNoInputMax: mx(st.map(s => s.clsNoInput)), clsAllMax: mx(st.map(s => s.clsAll)),
      headTopAfterOpen: [...new Set(opens.filter(s => s.ni == null).map(s => s.head.top))].sort((a, b) => a - b).join(', '),
      bodyGapToHead: [...new Set(opens.map(s => s.bodyGapToHead).filter(x => x != null))].sort((a, b) => a - b).join(', '),
      overflowXMax: mx(st.map(s => s.overflowX)), overlapsMax: mx(opens.map(s => s.overlaps?.n)), heightDipMax: mx(st.map(s => s.heightDip)),
      emptyGapMax: mx(opens.map(s => s.emptyGapBottom)), longTasks: st.reduce((a, s) => a + (s.longTasks || 0), 0),
    })
  }
  return rows
}

function report(res, cmp) {
  const N = norms(res)
  const tbl = (rows, cols) => `<table><tr>${cols.map(c => `<th>${esc(c[1])}</th>`).join('')}</tr>${rows.map(r => `<tr>${cols.map(c => `<td>${typeof c[0] === 'function' ? c[0](r) : esc(r[c[0]])}</td>`).join('')}</tr>`).join('')}</table>`
  let h = `<!doctype html><html lang="ru"><meta charset="utf-8"><title>Accordion baseline</title><style>
  :root{--bg:#faf8f3;--fg:#222;--mut:#666;--bd:#ddd;--bad:#b00020;--ok:#1b7a3a}
  @media (prefers-color-scheme:dark){:root{--bg:#161616;--fg:#eee;--mut:#aaa;--bd:#333;--bad:#ff6b7f;--ok:#6fd08c}}
  body{background:var(--bg);color:var(--fg);font:14px/1.45 system-ui,sans-serif;margin:0 auto;max-width:1400px;padding:16px}
  table{border-collapse:collapse;margin:8px 0 20px;display:block;overflow-x:auto}td,th{border:1px solid var(--bd);padding:3px 6px;text-align:left;vertical-align:top;white-space:nowrap}
  th{background:rgba(128,128,128,.12)}.bad{color:var(--bad);font-weight:600}.ok{color:var(--ok)}.mut{color:var(--mut)}img.th{max-width:180px;max-height:140px;border:1px solid var(--bd)}
  details{margin:6px 0}summary{cursor:pointer;font-weight:600}</style>
  <h1>Accordion baseline</h1><p class="mut">${esc(res.meta.date)} · ${esc(res.meta.base)} · commit ${esc(res.meta.commit)} · ${esc(res.meta.mode)}</p>`
  if (cmp) h += `<h2>Сравнение с baseline: ${cmp.fails.length ? `<span class="bad">${cmp.fails.length} отличий</span>` : '<span class="ok">отличий нет</span>'}</h2><p class="mut">baseline: ${esc(cmp.base)}</p>` + (cmp.fails.length ? tbl(cmp.fails, [['key', 'шаг'], ['what', 'что'], ['base', 'было'], ['cur', 'стало']]) : '') + cmp.notes.map(n => `<p class="mut">${esc(n)}</p>`).join('')
  h += `<h2>Нормы (по ширине экрана)</h2>` + tbl(N, [['vp', 'ширина'], ['steps', 'шагов'], [r => r.failedSteps ? `<span class="bad">${r.failedSteps}</span>` : '<span class="ok">0</span>', 'шагов с замечаниями'], ['openMsMed', 'открытие, мс (медиана)'], ['openMsMax', 'открытие, мс (макс)'], ['settleMsMed', 'до остановки, мс (мед)'], ['settleMsMax', 'до остановки (макс)'], ['clsNoInputMax', 'CLS без ввода (макс)'], ['clsAllMax', 'сдвиг при клике (макс)'], ['headTopAfterOpen', 'верх шапки после открытия, px'], ['bodyGapToHead', 'шапка→контент, px'], ['overflowXMax', 'overflow-x'], ['overlapsMax', 'наложений (макс)'], ['heightDipMax', 'провал высоты, px'], ['emptyGapMax', 'пусто внизу, px (макс)'], ['longTasks', 'long tasks']])
  h += `<p class="mut">Допуски сравнения: координаты/высоты ±${TOL.px}px; открытие ≤ max(×${TOL.openMsFactor}, +${TOL.openMsAbs}мс), медиана ≤ ×${TOL.openMedFactor}+${TOL.openMedAbs}мс; остановка +${TOL.settleMsAbs}мс; CLS +${TOL.cls}; скриншоты: пиксель отличается при Δ>${TOL.shotPxDelta}/255, порог ${TOL.shotRatioViewport * 100}% экран / ${TOL.shotRatioClip * 100}% блок; трейс ×${TOL.traceFactor} или +${TOL.traceAbsMs}мс; forced layout — не больше, чем было +${TOL.forcedExtra}.</p>`
  if (res.traces?.length) h += `<h2>CPU-трейсы открытия</h2>` + tbl(res.traces, [['vp', 'ширина'], ['page', 'страница'], ['label', 'пункт'], ['cpuThrottle', 'CPU ×'], ['openMs', 'открытие мс'], ['clickHandlerMs', 'обработчик клика мс'], ['busyMs', 'занят поток мс'], ['longestTaskMs', 'самая длинная задача'], ['scriptingMs', 'JS мс'], ['layoutCount', 'layout шт'], ['layoutMs', 'layout мс'], ['styleMs', 'стили мс'], ['forcedLayouts', 'forced layout'], ['forcedLayoutMs', 'forced мс'], ['firstPaintAfterClickMs', 'первая отрисовка мс'], [r => esc(r.forcedStacks?.join(' | ')), 'где forced'], [r => `<a href="${esc(r.file)}">trace</a>`, 'файл']]) + res.traces.map(t => `<details><summary>CPU top: ${esc(t.vp)} ${esc(t.page)} ${esc(t.label)}</summary>${tbl(t.cpuTop || [], [['fn', 'функция'], ['selfMs', 'self мс']])}</details>`).join('')
  for (const R of res.pages) {
    const bad = R.steps.filter(s => s.fails?.length)
    h += `<h2>${esc(R.vp)}px · ${esc(R.url)}</h2><p>загрузка ${R.loadMs} мс · CLS загрузки ${R.load.cls} · высота (всё закрыто) ${R.load.docH}px · overflow-x ${R.load.overflowX} · категорий ${R.load.tops.length} (${R.load.tops.map(t => t.nested).join('/')}) · шагов ${R.steps.length}, с замечаниями <span class="${bad.length ? 'bad' : 'ok'}">${bad.length}</span></p>`
    h += `<p>console: ${R.console.length} · pageerror: ${R.pageErrors.length} · failed: ${R.failed.length} · HTTP≥400: ${R.httpErrors.length} · битых картинок: ${R.end.broken.length} · ссылок проверено: ${R.links.length} (ошибок ${R.links.filter(l => !(l.status < 400)).length})</p>`
    const errs = [...R.console, ...R.pageErrors, ...R.failed, ...R.httpErrors, ...R.end.broken.map(b => 'broken ' + b)]
    if (errs.length) h += `<details><summary>ошибки (${errs.length})</summary><pre>${esc(errs.join('\n'))}</pre></details>`
    h += `<details${bad.length ? ' open' : ''}><summary>шаги</summary>` + tbl(R.steps, [['kind', 'шаг'], [r => `${r.ti}${r.ni != null ? '.' + r.ni : ''}`, '№'], ['input', 'ввод'], [r => r.open ? 'открыт' : 'закрыт', 'итог'], [r => r.fails?.length ? `<span class="bad">${esc(r.fails.join(', '))}</span>` : '<span class="ok">ok</span>', 'проверки'], ['openMs', 'откр мс'], ['settleMs', 'стоп мс'], [r => `${r.head?.top}→${r.head?.bottom}`, 'шапка верх→низ'], [r => r.body ? r.body.top : '', 'контент верх'], ['headDy', 'сдвиг шапки'], ['anchorTop', 'под header'], [r => `${r.docHBefore}→${r.docHAfter}`, 'высота стр.'], ['clsNoInput', 'CLS'], ['heightDip', 'провал'], ['emptyGapBottom', 'пусто'], [r => r.overlaps ? r.overlaps.n : '', 'налож.'], [r => (r.prices || []).slice(0, 4).map(p => `${esc(p.txt)}@${p.dy},${p.x}`).join('<br>'), 'цена/срок (dy,x)'], [r => (r.buttons || []).map(b => `${esc(b.txt)}: ${b.opened ? 'откр' : '—'}/${b.escClosed ? 'Esc✓' : 'Esc✗'}`).join('<br>'), 'кнопки'], [r => ['shotBefore', 'shotAfter', 'shotFull'].filter(k => r[k]).map(k => `<a href="${esc(r[k])}"><img class="th" loading="lazy" src="${esc(r[k])}"></a>`).join(' '), 'скриншоты']]) + `</details>`
  }
  return h + '</html>'
}

// ─────────────────────────── main ───────────────────────────
;(async () => {
  if (COMPARE_ONLY) {
    const res = JSON.parse(fs.readFileSync(path.join(COMPARE_ONLY, 'results.json'), 'utf8'))
    const cmp = await compare(COMPARE_ONLY, COMPARE)
    fs.writeFileSync(path.join(COMPARE_ONLY, 'compare.json'), JSON.stringify(cmp, null, 1))
    fs.writeFileSync(path.join(COMPARE_ONLY, 'report.html'), report(res, cmp))
    log(`сравнение: ${cmp.fails.length} отличий → ${path.join(COMPARE_ONLY, 'report.html')}`); process.exit(cmp.fails.length ? 1 : 0)
  }
  fs.mkdirSync(OUT, { recursive: true })
  let commit = '?'; try { commit = execSync('git rev-parse --short HEAD').toString().trim() + (execSync('git status --porcelain -- src').toString().trim() ? ' + незакоммиченные правки в src' : '') } catch { }
  const res = { meta: { date: new Date().toISOString(), base: BASE, commit, mode: BASE.includes(':3000') ? 'dev-сервер' : 'production-сборка', tol: TOL }, pages: [], traces: [] }
  const browser = await chromium.launch()
  for (const vp of vps) for (const pg of pages) {
    try { res.pages.push(await runPage(browser, vp, pg)) } catch (e) { log('ОШИБКА', vp, pg, e.message); res.pages.push({ vp, page: pg, url: pageUrl(pg), fatal: String(e.message), console: [], pageErrors: [], failed: [], httpErrors: [], steps: [], load: { tops: [] }, end: { broken: [] }, links: [] }) }
    fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(res, null, 1))
  }
  if (DO_TRACE) {
    const tp = pages.includes('serwis-laptopow') ? 'serwis-laptopow' : pages[0]
    for (const [vp, thr] of [[390, 4], [1440, 1]]) {
      const P = res.pages.find(p => p.vp === vp && p.page === tp) || res.pages.find(p => p.page === tp)
      const tops = P?.load.tops || []
      // «длинная» категория — самая высокая в открытом виде (кроме FAQ)
      const long = (P?.steps || []).filter(s => s.kind === 'open' && s.ni == null && s.open && !/FAQ/i.test(tops[s.ti]?.title)).sort((a, b) => b.item.h - a.item.h)[0]?.ti ?? 0
      const faq = tops.findIndex(t => /FAQ/i.test(t.title))
      for (const [ti, label] of [[0, 'first'], [long, 'long'], [faq, 'faq']]) if (ti >= 0) {
        try { res.traces.push(await traceOpen(browser, vp, tp, ti, label, thr)) } catch (e) { log('trace error', e.message) }
      }
    }
  }
  await browser.close()
  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(res, null, 1))
  let cmp = null
  if (COMPARE) { cmp = await compare(OUT, COMPARE); fs.writeFileSync(path.join(OUT, 'compare.json'), JSON.stringify(cmp, null, 1)) }
  fs.writeFileSync(path.join(OUT, 'report.html'), report(res, cmp))
  log('готово →', path.join(OUT, 'report.html'))
  if (cmp) process.exit(cmp.fails.length ? 1 : 0)
})()
