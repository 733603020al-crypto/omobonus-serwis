// Map picture for the "Koszt dojazdu" window in a given site language.
// Run from the site folder:  node scripts/maps/mapa-koszt-dojazdu.mjs <lang>   (e.g. de)
// Writes public/images/koszt-dojazdu/mapa-<lang>.webp in the same view as mapa-pl.webp
// and checks the result against mapa-pl.webp (the view must match, only labels differ).
import { createRequire } from 'module'
import path from 'path'
import os from 'os'

const require = createRequire(path.join(process.cwd(), 'package.json'))
const { loadEnvConfig } = require('@next/env')
const sharp = require('sharp')

const lang = process.argv[2]
if (!/^[a-z]{2}$/.test(lang || '')) { console.log('Użycie: node scripts/maps/mapa-koszt-dojazdu.mjs <język, np. de>'); process.exit(1) }

loadEnvConfig(process.cwd())
const key = process.env.GOOGLE_MAPS_API_KEY
if (!key) { console.log('Brak klucza GOOGLE_MAPS_API_KEY'); process.exit(1) }

// service address -> map centre so that the service sits at 38% / 60% of a 600x420 picture, zoom 12
const g = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent('Marcina Bukowskiego 174, 52-418 Wrocław')}&key=${key}`).then(r => r.json())
const { lat, lng } = g.results[0].geometry.location
const z = 12, T = 256 * 2 ** z
const wx = l => (l + 180) / 360 * T
const wy = la => { const s = Math.sin(la * Math.PI / 180); return (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * T }
const cx = wx(lng) + 72, cy = wy(lat) - 42
const lngC = cx / T * 360 - 180
const latC = 180 / Math.PI * Math.atan(Math.sinh(Math.PI - 2 * Math.PI * cy / T))

async function shot(l, out) {
  const url = `https://maps.googleapis.com/maps/api/staticmap?size=600x420&scale=2&maptype=roadmap&language=${l}&region=PL&center=${latC.toFixed(6)},${lngC.toFixed(6)}&zoom=${z}&key=${key}`
  const r = await fetch(url)
  if (!r.ok) { console.log('Błąd Google', r.status); process.exit(1) }
  await sharp(Buffer.from(await r.arrayBuffer())).webp({ quality: 85 }).toFile(out)
}

// check: a fresh Polish picture must match the existing mapa-pl.webp (same view)
const check = path.join(os.tmpdir(), 'mapa-check-pl.webp')
await shot('pl', check)
const a = await sharp('public/images/koszt-dojazdu/mapa-pl.webp').raw().toBuffer()
const b = await sharp(check).raw().toBuffer()
let d = 0
for (let i = 0; i < a.length; i++) d += Math.abs(a[i] - b[i])
const diff = d / a.length
if (a.length !== b.length || diff > 5) { console.log(`Widok nie zgadza się z mapa-pl.webp (różnica ${diff.toFixed(1)}) — sprawdź adres serwisu`); process.exit(1) }

await shot(lang, `public/images/koszt-dojazdu/mapa-${lang}.webp`)
console.log(`Gotowe: public/images/koszt-dojazdu/mapa-${lang}.webp`)
