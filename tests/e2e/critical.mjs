// Browser regression check of the critical interactions (not just types/build).
// Usage: node tests/e2e/critical.mjs [baseUrl]   (default http://localhost:3000; npm run check:e2e)
// Exit code 1 on any failure. Headless Playwright, own profile; the user's Chrome is never touched.
import { chromium } from 'playwright'

const BASE = (process.argv[2] || process.env.E2E_BASE || 'http://localhost:3000').replace(/\/$/, '')
const LOCALES = ['', '/uk', '/ru', '/en']
const SLUGS = ['serwis-laptopow', 'serwis-ekspresow-do-kawy']
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844, isMobile: true, hasTouch: true },
]
const failures = []
let passed = 0
const check = (ok, label, detail = '') => {
  if (ok) passed++
  else { failures.push(`${label} ${detail}`.trim()); console.log('FAIL', label, detail) }
}

const browser = await chromium.launch({ channel: 'chrome', headless: true }).catch(() => chromium.launch({ headless: true }))

async function open(vp, path) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.isMobile, hasTouch: !!vp.hasTouch })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => { if (!/cookieyes/i.test(e.message)) errors.push(e.message) }) // CookieYes complains on non-production hosts
  const res = await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => ({ status: () => 0 }))
  await page.waitForTimeout(1200)
  return { ctx, page, errors, status: res.status() }
}

// 1. Scope switch "we Wrocławiu | cała Polska" on service pages (all locales, both viewports)
for (const vp of VIEWPORTS) for (const loc of LOCALES) for (const slug of SLUGS) {
  const tag = `[switch ${vp.name} ${loc || 'pl'}/${slug}]`
  const { ctx, page, errors, status } = await open(vp, `${loc}/uslugi/${slug}`)
  check(status === 200, tag, `status ${status}`)
  check(!errors.length, tag + ' js errors', errors.join(' | '))
  const h1 = await page.locator('h1').first().innerText().catch(() => '')
  check(h1.trim().length > 5, tag + ' H1 empty')
  const sw = page.locator('.scope-switch')
  check((await sw.count()) === 1, tag + ' switch missing')
  if (await sw.count()) {
    const zones = page.locator('.scope-switch-zone')
    const hrefs = await zones.evaluateAll((els) => els.map((a) => a.getAttribute('href')))
    check(hrefs.length === 2 && /\/kontakt$/.test(hrefs[0]) && hrefs[1].includes('/serwis-wysylkowy?from=' + slug), tag + ' hrefs', JSON.stringify(hrefs))
    // gold animations start only after load + idle (data-anim-ready, GoldAnimationPause) and pause off-screen
    await page.waitForFunction(() => document.documentElement.hasAttribute('data-anim-ready'), null, { timeout: 8000 }).catch(() => {})
    const anim = await page.evaluate(() => {
      const p = document.querySelector('.scope-switch-pill')
      return p ? getComputedStyle(p, '::before').animationPlayState : 'none'
    })
    check(anim === 'running', tag + ' gold animation not running', anim)
    if (loc === '' && vp.name === 'desktop') {
      const p0 = await sw.getAttribute('data-pos')
      const moved = await page.waitForFunction((p) => document.querySelector('.scope-switch')?.dataset.pos !== p, p0, { timeout: 9000 }).then(() => true).catch(() => false)
      check(moved, tag + ' switch does not slide on its own')
    }
    const box = await sw.boundingBox()
    check(box && box.width > 200 && box.x >= 0 && box.x + box.width <= vp.width, tag + ' switch geometry', JSON.stringify(box))
    // left half scrolls to the contact block (or opens /kontakt), right half opens the shipping service
    await zones.nth(0).click()
    await page.waitForTimeout(1200)
    check(page.url().includes('/kontakt') || (await page.evaluate(() => window.scrollY)) > 300, tag + ' left click did nothing')
    await page.goto(BASE + `${loc}/uslugi/${slug}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    await page.locator('.scope-switch-zone').nth(1).click()
    await page.waitForURL(/serwis-wysylkowy/, { timeout: 25000 }).catch(() => {})
    check(page.url().includes('/serwis-wysylkowy'), tag + ' right click did not open shipping', page.url())
    check(((await page.locator('h1').first().innerText().catch(() => '')).trim().length) > 5, tag + ' shipping H1 empty')
  }
  await ctx.close()
}

// 2. Home: switch exists and its carousel-driven position moves (desktop)
{
  const { ctx, page, errors } = await open(VIEWPORTS[0], '/')
  check(!errors.length, '[home] js errors', errors.join(' | '))
  check(((await page.locator('h1').first().innerText()).trim().length) > 10, '[home] H1 empty')
  const pos0 = await page.locator('.scope-switch').getAttribute('data-pos')
  const moved = await page.waitForFunction((p) => document.querySelector('.scope-switch')?.dataset.pos !== p, pos0, { timeout: 25000 }).then(() => true).catch(() => false)
  check(moved, '[home] scope switch does not move with the carousel')
  await ctx.close()
}

// 3. /serwis-wysylkowy: step windows open inside the viewport and close; FAQ accordion toggles
for (const vp of VIEWPORTS) {
  const { ctx, page, errors } = await open(vp, '/serwis-wysylkowy')
  const tag = `[wysylkowy ${vp.name}]`
  check(!errors.length, tag + ' js errors', errors.join(' | '))
  const steps = page.locator('article[data-step][role="button"]')
  const n = await steps.count()
  check(n >= 4, tag + ' step cards', String(n))
  for (let i = 0; i < n; i++) {
    await page.evaluate(() => window.scrollTo(0, 0))
    await steps.nth(i).scrollIntoViewIfNeeded()
    await steps.nth(i).click({ timeout: 5000 }).catch(() => {})
    const dlg = page.locator('[data-diagnosis-modal-backdrop] [role="dialog"]').first()
    const visible = await dlg.waitFor({ state: 'visible', timeout: 4000 }).then(() => true).catch(() => false)
    check(visible, `${tag} step ${i} window did not open`)
    if (visible) {
      await page.waitForTimeout(500)
      const b = await dlg.boundingBox()
      check(b && b.y >= -1 && b.y + b.height <= vp.height + 1 && b.height > 150, `${tag} step ${i} window off-screen`, JSON.stringify(b))
      // close with the cross (aria-label of the close button), the way a visitor does
      await page.locator('[data-diagnosis-modal-backdrop] button[aria-label]').first().click({ timeout: 3000 }).catch(() => {})
      let closed = await dlg.waitFor({ state: 'hidden', timeout: 3000 }).then(() => true).catch(() => false)
      check(closed, `${tag} step ${i} window did not close`)
      if (!closed) await page.reload({ waitUntil: 'networkidle' })
    }
  }
  const faq = page.locator('button[aria-expanded]', { hasText: /Ile kosztuje diagnoza/ }).first()
  if (await faq.count()) {
    await faq.scrollIntoViewIfNeeded()
    await faq.click()
    await page.waitForTimeout(500)
    check((await faq.getAttribute('aria-expanded')) === 'true', tag + ' FAQ accordion does not open')
  } else check(false, tag + ' FAQ item missing')
  await ctx.close()
}

// 4. Service page: price accordion opens; header links resolve; mobile menu opens
{
  const { ctx, page } = await open(VIEWPORTS[0], '/uslugi/serwis-laptopow')
  const acc = page.locator('button[aria-expanded]', { hasText: /Diagnoza i wycena/ }).first()
  await acc.scrollIntoViewIfNeeded()
  await acc.click()
  await page.waitForTimeout(600)
  check((await acc.getAttribute('aria-expanded')) === 'true', '[service] price accordion does not open')
  const hrefs = await page.evaluate(() => [...new Set([...document.querySelectorAll('header a[href^="/"]')].map((a) => a.getAttribute('href').split('#')[0]).filter(Boolean))])
  for (const h of hrefs) {
    const r = await ctx.request.get(BASE + h, { maxRedirects: 3 })
    check(r.status() < 400, `[header link] ${h}`, String(r.status()))
  }
  await ctx.close()
}
{
  const { ctx, page, errors } = await open(VIEWPORTS[1], '/')
  check(!errors.length, '[mobile home] js errors', errors.join(' | '))
  await page.locator('[aria-label="Open menu"]').first().click()
  const link = page.locator('a[href="/uslugi/serwis-laptopow"]:visible').first()
  check(await link.waitFor({ state: 'visible', timeout: 4000 }).then(() => true).catch(() => false), '[mobile menu] does not open')
  await ctx.close()
}

await browser.close()
console.log(`\ncritical e2e: ${passed} passed, ${failures.length} failed (${BASE})`)
process.exit(failures.length ? 1 : 0)
