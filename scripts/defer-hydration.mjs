// Post-build step (runs after `next build`): in the prerendered HTML of the
// service pages and /kontakt (PL/UK/RU), Next's async <script src> chunks (and their preload links)
// are replaced by one tiny inline loader that requests them only after the
// first paint.
// The first screen is fully server-rendered, so nothing changes visually —
// the browser just paints it before spending the main thread on JS
// (hydration starts a moment later). Client-side navigation (.rsc) is
// untouched. Usage: node scripts/defer-hydration.mjs [scope=uslugi|all]
import fs from 'fs'
import path from 'path'

const root = path.join(process.cwd(), '.next', 'server', 'app')
const scope = process.argv[2] || 'uslugi'
const SCRIPT_RE = /<script src="(\/_next\/static\/chunks\/[^"]+\.js)"( id="([^"]+)")? async=""><\/script>/g

function loader(list) {
  // FCP entry arrives right after the first frame is on screen; the timeout
  // covers browsers without Paint Timing and pages opened in a background tab.
  return `<script>(function(){var s=${JSON.stringify(list)},d=document,r=0;function go(){if(r)return;r=1;for(var i=0;i<s.length;i++){var e=d.createElement('script');e.src=s[i][0];e.async=true;if(s[i][1])e.id=s[i][1];d.head.appendChild(e)}}function later(){requestAnimationFrame(function(){setTimeout(go,0)})}try{new PerformanceObserver(function(l,o){if(l.getEntriesByName('first-contentful-paint').length){o.disconnect();later()}}).observe({type:'paint',buffered:true})}catch(e){later()}setTimeout(go,3000)})()</script>`
}

// Inline CSS (experimental.inlineCss) reaches the browser twice: as the <style>
// in <head> and again as text rows of the RSC payload. On hydration React finds
// the existing <style data-href> and never reads that text, so each copy is
// replaced by a single space — about a quarter less HTML to download.
const PUSH_RE = /<script>self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)<\/script>/g
const LEN_TAGS = new Set('TAOoUSsLlGgMmV'.split('').map((c) => c.charCodeAt(0)))
const enc = (s) => JSON.stringify(s).replace(/&/g, '\\u0026').replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')

function stripCssCopy(html) {
  const pushes = [...html.matchAll(PUSH_RE)]
  const chunks = pushes.map((m) => Buffer.from(JSON.parse(m[1]), 'utf8'))
  if (!chunks.length || pushes.some((m, i) => enc(chunks[i].toString('utf8')) !== m[1])) return html
  const ids = new Set([...Buffer.concat(chunks).toString('utf8').matchAll(/"precedence":"[^"]+","href":"[^"]+\.css","children":"\$([0-9a-f]+)"/g)].map((m) => m[1]))
  if (!ids.size) return html
  // Walk the rows exactly like React's flight client and note the CSS text rows.
  const all = Buffer.concat(chunks), starts = []
  for (let i = 0, o = 0; i < chunks.length; o += chunks[i++].length) starts.push(o)
  const edits = []
  for (let i = 0; i < all.length;) {
    let id = ''
    while (i < all.length && all[i] !== 58) id += String.fromCharCode(all[i++])
    i++
    const tag = all[i]
    if (LEN_TAGS.has(tag)) {
      i++
      const lenStart = i
      while (i < all.length && all[i] !== 44) i++
      const len = parseInt(all.subarray(lenStart, i).toString(), 16)
      i++
      if (tag === 84 && ids.has(id) && len > 1) edits.push([lenStart, i - 1, '1'], [i, i + len, ' '])
      i += len
    } else {
      const nl = all.indexOf(10, i)
      i = nl < 0 ? all.length : nl + 1
    }
  }
  if (!edits.length) return html
  // The row header and its text usually sit in different push() chunks, so
  // edits are byte ranges of the whole stream, cut out chunk by chunk.
  const out = chunks.map((b, c) => {
    const s = starts[c], e = s + b.length, parts = []
    let pos = s
    for (const [from, to, put] of edits) {
      if (to <= s || from >= e) continue
      parts.push(b.subarray(pos - s, Math.max(from, s) - s))
      if (from >= s) parts.push(Buffer.from(put))
      pos = Math.min(to, e)
    }
    parts.push(b.subarray(pos - s))
    return Buffer.concat(parts)
  })
  let k = 0
  return html.replace(PUSH_RE, () => `<script>self.__next_f.push([1,${enc(out[k++].toString('utf8'))}])</script>`)
}

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name)
    if (f.isDirectory()) walk(p, out)
    else if (f.name.endsWith('.html')) out.push(p)
  }
  return out
}

let changed = 0
for (const file of walk(root)) {
  const rel = path.relative(root, file).replace(/\\/g, '/')
  if (scope === 'uslugi' && !/(^|\/)(uslugi\/|kontakt\.html$)/.test(rel)) continue
  const raw = fs.readFileSync(file, 'utf8')
  const html = stripCssCopy(raw)
  if (html.includes('data-deferred-hydration')) {
    if (html !== raw) { fs.writeFileSync(file, html); changed++ }
    continue
  }
  const list = []
  const out = html.replace(SCRIPT_RE, (_, src, _i, id) => {
    list.push(id ? [src, id] : [src])
    return list.length === 1 ? '%%LOADER%%' : ''
  })
  if (!list.length) {
    if (html !== raw) { fs.writeFileSync(file, html); changed++ }
    continue
  }
  // Downloads also start after the first paint: anything fetched before it is
  // counted against the first screen, even if it executes later.
  const final = out
    .replace(/<link rel="preload"[^>]*\/_next\/static\/chunks\/[^>]*\/>/g, '')
    .replace('%%LOADER%%', loader(list).replace('<script>', '<script data-deferred-hydration="">'))
  fs.writeFileSync(file, final)
  changed++
}
console.log(`defer-hydration: ${changed} HTML files updated (scope: ${scope})`)
