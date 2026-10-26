// Karta „Koszt dojazdu” do maila klienta (PNG) — dokładnie ta sama karta, co w oknie na stronie /kontakt.
// Skrypt robi zrzut lokalnej strony /dev/koszt-dojazdu (dev-serwer musi działać na localhost:3000).
// Użycie:
//   node .claude/skills/odpowiedzi-klientom/karta-trasy.mjs "Osobowicka 127, Wrocław" [--baza 25] [--stawka 2] [--lang pl|uk|ru] [--out plik.png]
// --baza   cena za pierwsze 5 km całej trasy (tam i z powrotem) ze strony usługi (domyślnie 25 zł netto)
// --stawka dopłata za każdy km całej trasy ponad 5 km (domyślnie 2 zł netto)
// --lang   język karty: pl / uk / ru (inne języki → pl)
// --zrodlo gmaps (domyślnie) — trasa i obrazek z ZWYKŁEJ strony Google Maps w przeglądarce: 0 zapytań do Google API,
//          limit API zostaje dla klientów liczących dojazd na stronie. Działa tylko na komputerze (w chmurze Google zablokowany).
//          api — stary sposób przez Google API dev-serwera (3 zapytania) — gdy Google Maps nie da się odczytać.
// --pokaz 1 — otworzyć widoczne okno przeglądarki (gdy Google pokazuje zgodę/captcha albo do sprawdzenia)
// Wynik: PNG + JSON (adres, km, koszt) na stdout. Klucz Google czyta sam dev-serwer, skrypt go nie zna.
import os from 'node:os'
import path from 'node:path'
import { chromium } from 'playwright'

const args = process.argv.slice(2)
const opt = { baza: '25', stawka: '2', lang: 'pl', out: '', host: 'http://localhost:3000', zrodlo: 'gmaps', pokaz: '' }
const SERWIS = 'Marcina Bukowskiego 174, 52-418 Wrocław'
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

const browser = await chromium.launch({ headless: !opt.pokaz })
try {
  // 1. trasa: zwykła strona Google Maps (domyślnie) albo Google API przez dev-serwer
  const dane = opt.zrodlo === 'api'
    ? await fetch(`${opt.host}/dev/koszt-dojazdu/dane?` + new URLSearchParams({ adres, lang }))
        .then(r => r.json()).catch(() => ({ error: `dev-serwer nie odpowiada na ${opt.host}` }))
    : await zGoogleMaps(browser, adres)
  if (!dane.id) throw new Error(`Trasa: ${dane.error} (not_found = nie znaleziono adresu)`)
  const url = `${opt.host}/dev/koszt-dojazdu?` + new URLSearchParams({ id: dane.id, lang, baza: opt.baza, stawka: opt.stawka })

  // szeroki ekran (1440 px) — karta jak na komputerze klienta: mapa szeroka, tej samej wysokości co rozliczenie; zrzut w 2× dla ostrości
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 })
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

// Trasa samochodem z serwisu do Klienta ze zwykłej strony Google Maps (oficjalny link „Maps URLs”, bez klucza).
// Odczytuje km i czas pierwszej (proponowanej) trasy, adres, który znalazł Google, i robi zrzut samej mapy.
async function zGoogleMaps(browser, adres) {
  // część z mapą (na prawo od panelu, ok. 790×560) ma proporcje mapy w karcie na szerokim ekranie (ok. 1,45 : 1),
  // więc Google sam dopasowuje trasę do tego obszaru i karta niczego nie obcina (oba punkty widoczne)
  const VW = 1200, VH = 560
  const page = await browser.newPage({ viewport: { width: VW, height: VH }, locale: 'pl-PL' })
  try {
    await page.goto('https://www.google.com/maps/dir/?' + new URLSearchParams({ api: '1', origin: SERWIS, destination: adres, travelmode: 'driving', hl: 'pl' }), { waitUntil: 'domcontentloaded', timeout: 60000 })
    // okno zgody na cookies (pierwsze uruchomienie) — odrzucamy, mapa działa i bez nich
    if (page.url().includes('consent.')) {
      await page.locator('button:has-text("Odrzuć wszystko"), button:has-text("Reject all")').first().click({ timeout: 15000 })
      await page.waitForURL(u => !String(u).includes('consent.'), { timeout: 30000 })
    }
    const trip = page.locator('[id^="section-directions-trip-0"]').first()
    await trip.waitFor({ timeout: 45000 })
    await page.waitForTimeout(3000) // dorysowanie trasy na mapie
    const txt = await trip.innerText()
    const km = txt.match(/(\d+(?:[,.]\d+)?)\s*km/)
    const m = txt.match(/\d+\s*m(?!in)\b/) // trasy < 1 km Google podaje w metrach
    const metry = km ? Math.round(parseFloat(km[1].replace(',', '.')) * 1000) : m ? parseInt(m[0]) : 0
    const godz = txt.match(/(\d+)\s*godz/), min = txt.match(/(\d+)\s*min/)
    const czasMin = (godz ? +godz[1] * 60 : 0) + (min ? +min[1] : 0)
    const klientAdres = (await page.locator('#directions-searchbox-1 input').first().inputValue().catch(() => '')) || adres
    if (!metry) return { error: 'not_found' }
    // zrzut mapy: część okna na prawo od panelu z trasą
    const panel = await page.locator('[role="main"]').first().boundingBox()
    const x = Math.round(panel ? panel.x + panel.width : 430)
    const clip = { x, y: 0, width: VW - x, height: VH }
    const png = (await page.screenshot({ clip })).toString('base64')
    const r = await fetch(`${opt.host}/dev/koszt-dojazdu/dane`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ klientAdres, metry, czasMin, png, width: clip.width, height: clip.height }),
    }).then(x => x.json()).catch(() => ({ error: `dev-serwer nie odpowiada na ${opt.host}` }))
    return r
  } catch (e) {
    return { error: `Google Maps: ${e.message.split('\n')[0]} — spróbuj z --pokaz 1 albo --zrodlo api` }
  } finally {
    await page.close()
  }
}
