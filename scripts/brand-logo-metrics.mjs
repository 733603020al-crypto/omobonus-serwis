// Mierzy logo z paska marek (public/images/brands) i zapisuje dla każdego:
// ink — jaka część prostokąta logo jest zamalowana (0–1),
// ratio — proporcje samego rysunku, pad — pusty margines pionowy w pliku.
// Z tego brand-ticker.tsx liczy rozmiar automatycznie (autoSize).
// Użycie: node scripts/brand-logo-metrics.mjs  → nadpisuje src/lib/brand-logo-metrics.ts.
import sharp from 'sharp'
import { readdirSync, writeFileSync } from 'node:fs'

const dir = 'public/images/brands/'
const files = readdirSync(dir).filter(f => /\.(svg|webp|png)$/.test(f))
const out = {}
for (const f of files) {
  const name = f.replace(/\.(svg|webp|png)$/, '')
  const { data, info } = await sharp(dir + f, { density: 300 })
    .resize({ height: 200 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { width: w, height: h } = info
  let x0 = w, y0 = h, x1 = -1, y1 = -1
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (data[(y * w + x) * 4 + 3] > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y }
  }
  let ink = 0
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) ink += data[(y * w + x) * 4 + 3] / 255
  const bw = x1 - x0 + 1, bh = y1 - y0 + 1
  out[name] = { ink: +(ink / (bw * bh)).toFixed(3), ratio: +(bw / bh).toFixed(3), pad: +((h - bh) / h).toFixed(3) }
}
const NL = '\r\n'
const body = Object.entries(out).map(([k, v]) => `  ${JSON.stringify(k)}: { ink: ${v.ink}, ratio: ${v.ratio}, pad: ${v.pad} },`).join(NL)
writeFileSync('src/lib/brand-logo-metrics.ts',
  '// Wygenerowane przez scripts/brand-logo-metrics.mjs — nie edytować ręcznie.' + NL +
  'export const LOGO_METRICS: Record<string, { ink: number; ratio: number; pad: number }> = {' + NL +
  body + NL + '}' + NL)
console.log(Object.keys(out).length + ' logo')
