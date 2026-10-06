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
  const html = fs.readFileSync(file, 'utf8')
  if (html.includes('data-deferred-hydration')) continue
  const list = []
  const out = html.replace(SCRIPT_RE, (_, src, _i, id) => {
    list.push(id ? [src, id] : [src])
    return list.length === 1 ? '%%LOADER%%' : ''
  })
  if (!list.length) continue
  // Downloads also start after the first paint: anything fetched before it is
  // counted against the first screen, even if it executes later.
  const final = out
    .replace(/<link rel="preload"[^>]*\/_next\/static\/chunks\/[^>]*\/>/g, '')
    .replace('%%LOADER%%', loader(list).replace('<script>', '<script data-deferred-hydration="">'))
  fs.writeFileSync(file, final)
  changed++
}
console.log(`defer-hydration: ${changed} HTML files updated (scope: ${scope})`)
