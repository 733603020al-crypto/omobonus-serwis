// Karta „Koszt dojazdu” do maila klienta (PNG) — dokładnie ta sama karta, co w oknie na stronie /kontakt.
// Skrypt robi zrzut lokalnej strony /dev/koszt-dojazdu (dev-serwer musi działać na localhost:3000).
// Użycie:
//   node .claude/skills/odpowiedzi-klientom/karta-trasy.mjs "Osobowicka 127, Wrocław" [--baza 25] [--stawka 2] [--lang pl|uk|ru] [--out plik.png]
// --baza   cena za pierwsze 5 km całej trasy (tam i z powrotem) ze strony usługi (domyślnie 25 zł netto)
// --stawka dopłata za każdy km całej trasy ponad 5 km (domyślnie 2 zł netto)
// --lang   język karty: pl / uk / ru (inne języki → pl)
// Wynik: PNG + JSON (adres, km, koszt) na stdout. Klucz Google czyta sam dev-serwer, skrypt go nie zna.
import os from 'node:os'
import path from 'node:path'
import { chromium } from 'playwright'

const args = process.argv.slice(2)
const opt = { baza: '25', stawka: '2', lang: 'pl', out: '', host: 'http://localhost:3000' }
const adresParts = []
for (let i = 0; i < args.length; i++) {
  const a = args[i]
  if (a.startsWith('--')) opt[a.slice(2)] = args[++i]
  else adresParts.push(a)
}
const adres = adresParts.join(' ').trim()
if (!adres) { console.error('Podaj adres klienta'); process.exit(1) }
const lang = ['pl', 'uk', 'ru'].includes(opt.lang) ? opt.lang : 'pl'

const out = path.resolve(opt.out || path.join(os.tmpdir(), `karta-trasy-${Date.now()}.png`))

// 1. trasa (Google pyta dev-serwer), 2. zrzut karty
const dane = await fetch(`${opt.host}/dev/koszt-dojazdu/dane?` + new URLSearchParams({ adres, lang }))
  .then(r => r.json()).catch(() => ({ error: `dev-serwer nie odpowiada na ${opt.host}` }))
if (!dane.id) { console.error(`Trasa: ${dane.error} (not_found = nie znaleziono adresu)`); process.exit(1) }
const url = `${opt.host}/dev/koszt-dojazdu?` + new URLSearchParams({ id: dane.id, lang, baza: opt.baza, stawka: opt.stawka })

const browser = await chromium.launch()
try {
  // szerokość jak okno na komputerze (karta max 900 px), zrzut w 2× dla ostrości w mailu
  const page = await browser.newPage({ viewport: { width: 960, height: 900 }, deviceScaleFactor: 2 })
  const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 })
  if (!res || !res.ok()) throw new Error(`Strona karty: HTTP ${res?.status()} — czy dev-serwer działa na ${opt.host}?`)
  const wynik = JSON.parse(await page.locator('#wynik').getAttribute('data-wynik'))
  // bez przycisku zamknięcia i bez animacji — w mailu karta jest obrazkiem
  await page.addStyleTag({ content: '[data-koszt-dojazdu] button{display:none!important} *{animation:none!important;transition:none!important}' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(500)
  await page.locator('[data-koszt-dojazdu]').screenshot({ path: out })
  console.log(JSON.stringify({ png: out, ...wynik }, null, 2))
} catch (e) {
  console.error(e.message)
  process.exitCode = 1
} finally {
  await browser.close()
}
