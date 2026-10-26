// Karta „Koszt dojazdu” z ŻYWEJ strony /kontakt (bez lokalnego dev-serwera i bez klucza Google).
// Dla chmury (Claude Code Web) i gdy localhost:3000 nie działa. Ta sama karta, co widzi klient.
// Użycie: node .claude/skills/odpowiedzi-klientom/karta-trasy-live.mjs "ul. Nowa 2A, Nowa Wieś Wrocławska" [--out karta.png] [--lang pl|uk|ru|en]
// Wynik: PNG + tekst karty (adres znaleziony przez Google, km, koszt) na stdout.
// Uwaga: karta liczy według ogólnego cennika dojazdu (25 zł + 2 zł/km); usługi z inną stawką — liczyć osobno.
import path from 'node:path'
import { createRequire } from 'node:module'
// require: działa i z node_modules projektu, i z globalnej instalacji (chmura)
const { chromium } = createRequire(import.meta.url)('playwright')

const args = process.argv.slice(2)
const opt = { out: 'koszt-dojazdu.png', lang: 'pl' }
const adresParts = []
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) opt[args[i].slice(2)] = args[++i]
  else adresParts.push(args[i])
}
const adres = adresParts.join(' ').trim()
if (!adres) { console.error('Podaj adres klienta'); process.exit(1) }
const prefix = { pl: '', uk: '/uk', ru: '/ru', en: '/en' }[opt.lang] ?? ''
const out = path.resolve(opt.out)

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 960, height: 1000 }, deviceScaleFactor: 2 })
  await page.goto(`https://serwis.omobonus.com.pl${prefix}/kontakt`, { waitUntil: 'networkidle', timeout: 90000 })
  await page.waitForTimeout(1500)
  await page.locator('.contact-icon-link').filter({ has: page.locator('img[src*="koszt-dojazdu-ikona"]') }).first().click()
  const input = page.locator('[role=dialog] input').first()
  await input.waitFor({ timeout: 15000 })
  await input.fill(adres)
  await page.waitForTimeout(2500)
  await input.press('Enter')
  await page.waitForTimeout(800)
  await page.locator('[role=dialog] button').last().click()
  const karta = page.locator('[data-koszt-dojazdu]').first()
  await page.waitForFunction(() => /netto/.test(document.querySelector('[data-koszt-dojazdu]')?.textContent || ''), null, { timeout: 30000 })
  await page.addStyleTag({ content: '[data-koszt-dojazdu] button{display:none!important} *{animation:none!important;transition:none!important}' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(800)
  await karta.screenshot({ path: out })
  console.log(`PNG: ${out}\n` + (await karta.innerText()))
} catch (e) {
  console.error('Błąd:', e.message)
  process.exitCode = 1
} finally {
  await browser.close()
}
