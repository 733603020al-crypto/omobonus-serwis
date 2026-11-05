// Rasterize the actual document, including live controls, local fonts and images.
// No form values are persisted or sent anywhere by this module.
import { checkCancelled, idleTask } from './idle'
const assetCache = new Map<string, Promise<string>>()
function dataURL(url: string): Promise<string> {
  if (url.startsWith('data:')) return Promise.resolve(url)
  let task = assetCache.get(url)
  if (!task) {
    // force-cache: reuse the already shown image/fonts instead of revalidating them.
    task = fetch(url, url.startsWith('blob:') ? undefined : { cache: 'force-cache' }).then(r => { if (!r.ok) throw new Error('Snapshot asset'); return r.blob() })
      .then(blob => new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result))
        reader.onerror = reject
        reader.readAsDataURL(blob)
      }))
    // Blob URLs may contain customer attachments: never cache them.
    if (!url.startsWith('blob:')) assetCache.set(url, task)
    task.catch(() => assetCache.delete(url))
  }
  return task
}

async function fontCSS(families: Set<string>) {
  const rules: { text: string; base: string }[] = []
  const visit = (list: CSSRuleList, base: string) => {
    for (const rule of Array.from(list)) {
      if (rule instanceof CSSFontFaceRule && families.has(rule.style.fontFamily.replace(/["']/g, '').trim())) rules.push({ text: rule.cssText, base })
      else if ('cssRules' in rule) visit((rule as CSSGroupingRule).cssRules, base)
    }
  }
  for (const sheet of Array.from(document.styleSheets)) {
    try { visit(sheet.cssRules, sheet.href || location.href) } catch { /* Cross-origin fonts are not used by the form. */ }
  }
  return (await Promise.all(rules.map(async ({ text: rule, base }) => {
    for (const m of Array.from(rule.matchAll(/url\(["']?([^"')]+)["']?\)/g))) {
      rule = rule.replace(m[0], `url("${await dataURL(new URL(m[1], base).href)}")`)
    }
    return rule
  }))).join('\n')
}

// Only paint/layout properties are needed in the inert snapshot. Copying every
// browser property (hundreds per node) makes SVG decoding needlessly expensive.
const paintProperties = (`display position box-sizing width height min-width min-height max-width max-height
  top right bottom left z-index float clear overflow overflow-x overflow-y
  margin padding border-top border-right border-bottom border-left border-radius
  background-color background-image background-size background-position background-repeat
  color font-family font-size font-weight font-style font-stretch font-variant
  font-feature-settings font-variation-settings line-height letter-spacing text-align
  text-indent text-transform text-decoration text-shadow white-space word-break overflow-wrap vertical-align
  align-items align-content align-self justify-content justify-items justify-self
  flex-direction flex-wrap flex-grow flex-shrink flex-basis order gap
  grid-template-columns grid-template-rows grid-auto-flow grid-row grid-column
  transform transform-origin opacity filter box-shadow object-fit object-position aspect-ratio`).split(/\s+/)

export async function snapshotDocument(root: HTMLElement, scale: number, signal?: AbortSignal): Promise<HTMLCanvasElement> {
  await document.fonts.ready
  const rect = root.getBoundingClientRect()
  const width = rect.width, height = rect.height
  const clone = root.cloneNode(true) as HTMLElement
  const originals = [root, ...Array.from(root.querySelectorAll<HTMLElement>('*'))]
  const copies = [clone, ...Array.from(clone.querySelectorAll<HTMLElement>('*'))]
  const pending: Promise<void>[] = []
  const families = new Set<string>()
  for (let i = 0; i < originals.length; i++) {
    if (signal && i % 8 === 0) await idleTask(signal)
    const source = originals[i]
    const copy = copies[i]
    const style = getComputedStyle(source)
    copy.style.cssText = paintProperties.map(p => `${p}:${style.getPropertyValue(p)};`).join('')
    style.fontFamily.split(',').forEach(f => families.add(f.replace(/["']/g, '').trim()))
    copy.style.visibility = 'visible'
    copy.style.animation = 'none'
    // The sheet's CSS drop-shadow must not be baked into the texture: it would be clipped to the document box (rectangular darkening) and feed the WebGL shadow mask.
    if (source.classList.contains('contact-form-paper-shadow')) copy.style.filter = 'none'
    copy.style.transition = 'none'
    copy.removeAttribute('id')
    if (source.dataset.paperCaptureSkip !== undefined || source.getAttribute('name') === 'company') {
      copy.style.display = 'none'
    }
    if (source.dataset.paperSeal !== undefined) copy.style.visibility = 'visible'
    if (source instanceof HTMLImageElement) {
      const src = source.currentSrc || source.src
      copy.removeAttribute('srcset')
      const asset = dataURL(src).then(data => { (copy as HTMLImageElement).src = data })
      // Idle yields can outlive a failed fetch. Attach its rejection handler now;
      // Promise.all below still propagates the failure into the form fallback.
      void asset.catch(() => {})
      pending.push(asset)
    }
    if (source instanceof HTMLSourceElement) copy.remove()
    if (source instanceof HTMLInputElement || source instanceof HTMLTextAreaElement) {
      if (source.type === 'file' || source.type === 'hidden') { copy.style.display = 'none'; continue }
      const box = document.createElement('div')
      box.style.cssText = copy.style.cssText
      const bounds = source.getBoundingClientRect()
      box.style.width = `${bounds.width}px`
      box.style.height = `${bounds.height}px`
      box.style.whiteSpace = source instanceof HTMLTextAreaElement ? 'pre-wrap' : 'pre'
      box.style.overflowWrap = 'break-word'
      box.style.overflow = 'hidden'
      const text = document.createElement('span')
      text.textContent = source.value || source.placeholder
      if (!source.value) {
        const placeholder = getComputedStyle(source, '::placeholder')
        for (const property of ['color', 'font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'opacity']) {
          text.style.setProperty(property, placeholder.getPropertyValue(property))
        }
      }
      if (source.scrollTop || source.scrollLeft) {
        text.style.display = 'block'
        text.style.transform = `translate(${-source.scrollLeft}px, ${-source.scrollTop}px)`
      }
      box.append(text)
      copy.replaceWith(box)
    }
    // The disabled seal must look like the normal document in the texture.
    if (source.matches('button[type="submit"]')) copy.style.opacity = '1'
  }
  clone.style.position = 'relative'
  clone.style.inset = 'auto'
  clone.style.width = `${width}px`
  clone.style.height = `${height}px`
  clone.style.margin = '0'
  clone.style.transform = 'none'
  clone.style.opacity = '1'
  const [fonts] = await Promise.all([fontCSS(families), ...pending])
  if (signal) { checkCancelled(signal); await idleTask(signal) }
  const body = new XMLSerializer().serializeToString(clone)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>${fonts}</style>${body}</div></foreignObject></svg>`
  const image = new Image()
  // A data URL keeps the self-contained SVG origin-clean in Chrome.
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  await image.decode()
  if (signal) { checkCancelled(signal); await idleTask(signal) }
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(width * scale)
  canvas.height = Math.round(height * scale)
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Snapshot canvas unavailable')
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
  // Detect a tainted/unsupported snapshot before replacing the usable HTML form.
  context.getImageData(0, 0, 1, 1)
  return canvas
}
