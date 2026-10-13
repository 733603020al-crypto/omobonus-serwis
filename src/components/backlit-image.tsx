'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

// Golden back light for a device picture inside a card (ported 1:1 from the
// public/_dev-backlight test page, values tuned there by the user).
// Two layers, both drawn once the picture has loaded:
//  - glow canvas behind the card content (clipped by the card): warm ambient,
//    a silhouette-shaped halo + core (weaker towards the top), a wide low light
//    behind the base, a floor pool and a contact shadow;
//  - the picture re-rendered with a rim light (edge from alpha + normals from
//    the depth map, `<src>-depth.webp`); it replaces the <img> once drawn.
// The card must be `relative isolate` (the glow sits at -z-10 inside it).
// Skipped where canvas filters are unsupported (the halo needs blur).

export const BACKLIGHT = {
  color: '#e8801a',
  coreColor: '#ffc555',
  haloI: 0.6,
  haloBlur: 85,
  haloSpread: 1.1,
  haloY: -0.03,
  coreI: 0.3,
  coreBlur: 24,
  vTop: 0.6,
  baseI: 1.1,
  baseW: 0.85,
  baseH: 0.45,
  baseY: 0.72,
  rimI: 0.7,
  rimW: 3,
  rimDir: 0.5,
  depthRim: 0.5,
  dark: 0.15,
  floorI: 0.45,
  floorW: 0.8,
  shadowI: 0.7,
  ambI: 0.07,
}
const P = BACKLIGHT
// Blur radii above are in px for a 634px-wide object (the test page).
const REF_OBJECT_W = 634
const MAX_GLOW_PX = 1600
const FADE_MS = 400

const V = `attribute vec2 aPos;attribute vec2 aTex;varying vec2 vUv;void main(){vUv=aTex;gl_Position=vec4(aPos,0.,1.);}`
const F = `precision highp float;
uniform sampler2D uImage,uDepth,uBlur;uniform vec2 uRes,uLight;uniform vec3 uColor;
uniform float uRim,uDir,uDepthRim,uDark;varying vec2 vUv;
void main(){
  vec2 tx=1./uRes;vec4 col=texture2D(uImage,vUv);float a=col.a;
  float ba=texture2D(uBlur,vUv).r;
  float edge=clamp((a-ba)*2.2,0.,1.);
  vec2 g=vec2(texture2D(uBlur,vUv+vec2(tx.x*2.,0.)).r-texture2D(uBlur,vUv-vec2(tx.x*2.,0.)).r,
              texture2D(uBlur,vUv+vec2(0.,tx.y*2.)).r-texture2D(uBlur,vUv-vec2(0.,tx.y*2.)).r);
  vec2 outN=length(g)>1e-5?-normalize(g):vec2(0.);
  float facing=mix(1.,smoothstep(-.2,1.,dot(outN,uLight)),uDir);
  float l=texture2D(uDepth,vUv-vec2(tx.x,0.)).r,r=texture2D(uDepth,vUv+vec2(tx.x,0.)).r;
  float u=texture2D(uDepth,vUv+vec2(0.,tx.y)).r,d=texture2D(uDepth,vUv-vec2(0.,tx.y)).r;
  vec3 N=normalize(vec3((l-r)*6.,(u-d)*6.,1.));
  float dr=pow(1.-N.z,1.5)*max(dot(normalize(N.xy+1e-5),uLight),0.);
  float rim=edge*facing*uRim+dr*uDepthRim;
  col.rgb=col.rgb*(1.-uDark)+uColor*rim*smoothstep(.05,.5,a);
  gl_FragColor=col;}`

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// Solid white silhouette (the pictures are partly translucent, so threshold alpha).
function makeMask(img: HTMLImageElement) {
  const c = document.createElement('canvas')
  c.width = img.naturalWidth
  c.height = img.naturalHeight
  const x = c.getContext('2d')!
  x.drawImage(img, 0, 0)
  const d = x.getImageData(0, 0, c.width, c.height)
  const p = d.data
  for (let i = 0; i < p.length; i += 4) {
    const m = Math.min(1, Math.max(0, (p[i + 3] / 255 - 0.12) / 0.3))
    p[i] = p[i + 1] = p[i + 2] = 255
    p[i + 3] = m * 255
  }
  x.putImageData(d, 0, 0)
  return c
}

function tinted(src: HTMLCanvasElement, color: string) {
  const c = document.createElement('canvas')
  c.width = src.width
  c.height = src.height
  const x = c.getContext('2d')!
  x.drawImage(src, 0, 0)
  x.globalCompositeOperation = 'source-in'
  x.fillStyle = color
  x.fillRect(0, 0, c.width, c.height)
  return c
}

const backlightSupported = () =>
  typeof document !== 'undefined' && typeof document.createElement('canvas').getContext('2d')?.filter === 'string'

// Draw after the page has loaded and the browser is idle (keeps LCP untouched).
function whenIdle(cb: () => void) {
  let cancelled = false
  let idle = 0
  const run = () => {
    const ric = window.requestIdleCallback
    if (ric) idle = ric(() => !cancelled && cb(), { timeout: 800 })
    else idle = window.setTimeout(() => !cancelled && cb(), 50)
  }
  if (document.readyState === 'complete') run()
  else window.addEventListener('load', run, { once: true })
  return () => {
    cancelled = true
    window.removeEventListener('load', run)
    if (window.cancelIdleCallback) window.cancelIdleCallback(idle)
    clearTimeout(idle)
  }
}

type Rect = { ox: number; oy: number; ow: number; oh: number }

// Glow on a transparent canvas; box = the picture's rect in layout px, k = backing scale.
function drawGlow(cv: HTMLCanvasElement, img: HTMLImageElement, box: Rect, k: number) {
  const W = Math.round(cv.offsetWidth * k)
  const H = Math.round(cv.offsetHeight * k)
  cv.width = W
  cv.height = H
  const ctx = cv.getContext('2d')!
  const ox = box.ox * k
  const oy = box.oy * k
  const ow = box.ow * k
  const oh = box.oh * k
  const bs = ow / REF_OBJECT_W
  const [r, g, b] = hex(P.color)
  const [cr, cg, cb] = hex(P.coreColor)
  const mask = makeMask(img)

  // floor light pool + contact shadow
  ctx.save()
  ctx.translate(ox + ow / 2, oy + oh * 0.96)
  ctx.scale(1, 0.16)
  const fw = ow * P.floorW
  let gr = ctx.createRadialGradient(0, 0, 0, 0, 0, fw)
  gr.addColorStop(0, `rgba(${r},${g},${b},${P.floorI})`)
  gr.addColorStop(1, `rgba(${r},${g},${b},0)`)
  ctx.globalCompositeOperation = 'lighter'
  ctx.fillStyle = gr
  ctx.fillRect(-fw, -fw, fw * 2, fw * 2)
  ctx.globalCompositeOperation = 'source-over'
  const sw = ow * 0.52
  gr = ctx.createRadialGradient(0, 0, 0, 0, 0, sw)
  gr.addColorStop(0, `rgba(0,0,0,${P.shadowI})`)
  gr.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = gr
  ctx.fillRect(-sw, -sw, sw * 2, sw * 2)
  ctx.restore()

  // warm ambient light around the object
  const acx = ox + ow / 2
  const acy = oy + oh * 0.45
  const ar = ow * 0.95
  const ag = ctx.createRadialGradient(acx, acy, 0, acx, acy, ar)
  ag.addColorStop(0, `rgba(${r},${g},${b},${P.ambI})`)
  ag.addColorStop(1, `rgba(${r},${g},${b},0)`)
  ctx.globalCompositeOperation = 'lighter'
  ctx.fillStyle = ag
  ctx.fillRect(acx - ar, acy - ar, ar * 2, ar * 2)

  // halo: silhouette-shaped glow — wide amber layer + tight gold core,
  // weaker towards the top (vTop)
  const gc = document.createElement('canvas')
  gc.width = W
  gc.height = H
  const gx = gc.getContext('2d')!
  const hw = ow * P.haloSpread
  const hh = oh * P.haloSpread
  const hx = ox - (hw - ow) / 2
  const hy = oy - (hh - oh) / 2 + P.haloY * oh
  gx.globalCompositeOperation = 'lighter'
  const lay = (tc: HTMLCanvasElement, blur: number, a: number, x: number, y: number, w: number, h: number) => {
    gx.filter = `blur(${blur * bs}px)`
    for (let n = a; n > 0; n--) {
      gx.globalAlpha = Math.min(n, 1)
      gx.drawImage(tc, x, y, w, h)
    }
  }
  lay(tinted(mask, P.color), P.haloBlur, P.haloI, hx, hy, hw, hh)
  lay(tinted(mask, P.coreColor), P.coreBlur, P.coreI, ox, oy - oh * 0.015, ow, oh)
  gx.filter = 'none'
  gx.globalAlpha = 1
  gx.globalCompositeOperation = 'destination-in'
  const vgr = gx.createLinearGradient(0, oy, 0, oy + oh * 0.9)
  vgr.addColorStop(0, `rgba(0,0,0,${P.vTop})`)
  vgr.addColorStop(1, '#000')
  gx.fillStyle = vgr
  gx.fillRect(0, 0, W, H)
  ctx.drawImage(gc, 0, 0)

  // low back light: a wide glow at floor level behind the base
  ctx.save()
  ctx.translate(ox + ow / 2, oy + oh * P.baseY)
  ctx.scale(1, P.baseH)
  const bwR = ow * P.baseW
  const bgr = ctx.createRadialGradient(0, 0, 0, 0, 0, bwR)
  bgr.addColorStop(0, `rgba(${cr},${cg},${cb},${Math.min(P.baseI, 1)})`)
  bgr.addColorStop(0.3, `rgba(${r},${g},${b},${Math.min(P.baseI * 0.6, 1)})`)
  bgr.addColorStop(0.65, `rgba(${r},${g},${b},${P.baseI * 0.18})`)
  bgr.addColorStop(1, `rgba(${r},${g},${b},0)`)
  ctx.fillStyle = bgr
  ctx.fillRect(-bwR, -bwR, bwR * 2, bwR * 2)
  ctx.restore()
  ctx.globalCompositeOperation = 'source-over'
}

// Picture with the rim light, at the image's natural size (CSS scales it).
function drawObject(cv: HTMLCanvasElement, img: HTMLImageElement, dep: HTMLImageElement) {
  cv.width = img.naturalWidth
  cv.height = img.naturalHeight
  const g = cv.getContext('webgl', { premultipliedAlpha: false })
  if (!g) return null
  const prog = g.createProgram()!
  for (const [type, code] of [[g.VERTEX_SHADER, V], [g.FRAGMENT_SHADER, F]] as const) {
    const sh = g.createShader(type)!
    g.shaderSource(sh, code)
    g.compileShader(sh)
    g.attachShader(prog, sh)
  }
  g.linkProgram(prog)
  if (!g.getProgramParameter(prog, g.LINK_STATUS)) return null
  g.useProgram(prog)
  g.bindBuffer(g.ARRAY_BUFFER, g.createBuffer())
  g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 0, 1, 1, -1, 1, 1, -1, 1, 0, 0, 1, 1, 1, 0]), g.STATIC_DRAW)
  for (const [name, offset] of [['aPos', 0], ['aTex', 8]] as const) {
    const a = g.getAttribLocation(prog, name)
    g.enableVertexAttribArray(a)
    g.vertexAttribPointer(a, 2, g.FLOAT, false, 16, offset)
  }
  // silhouette blurred by rimW: the rim is where the blur falls off
  const blur = document.createElement('canvas')
  blur.width = img.naturalWidth
  blur.height = img.naturalHeight
  const bx = blur.getContext('2d')!
  bx.fillStyle = '#000'
  bx.fillRect(0, 0, blur.width, blur.height)
  bx.filter = `blur(${P.rimW}px)`
  bx.drawImage(makeMask(img), 0, 0)
  ;[img, dep, blur].forEach((el, unit) => {
    g.activeTexture(g.TEXTURE0 + unit)
    g.bindTexture(g.TEXTURE_2D, g.createTexture())
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE)
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE)
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR)
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR)
    g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, el)
  })
  const U = (n: string) => g.getUniformLocation(prog, n)
  g.uniform1i(U('uImage'), 0)
  g.uniform1i(U('uDepth'), 1)
  g.uniform1i(U('uBlur'), 2)
  g.viewport(0, 0, cv.width, cv.height)
  g.uniform2f(U('uRes'), cv.width, cv.height)
  g.uniform2f(U('uLight'), 0, -1)
  g.uniform3f(U('uColor'), ...(hex(P.color).map((v) => v / 255) as [number, number, number]))
  g.uniform1f(U('uRim'), P.rimI)
  g.uniform1f(U('uDir'), P.rimDir)
  g.uniform1f(U('uDepthRim'), P.depthRim)
  g.uniform1f(U('uDark'), P.dark)
  g.clearColor(0, 0, 0, 0)
  g.clear(g.COLOR_BUFFER_BIT)
  g.drawArrays(g.TRIANGLE_STRIP, 0, 4)
  return g
}

type Props = { src: string; alt: string; width: number; height: number; className: string }

export function BacklitImage({ src, alt, width, height, className }: Props) {
  const glowRef = useRef<HTMLCanvasElement>(null)
  const objRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    const obj = objRef.current
    const wrap = wrapRef.current
    if (!glow || !obj || !wrap || !backlightSupported()) return
    let disposed = false
    let gl: WebGLRenderingContext | null = null
    let ro: ResizeObserver | null = null
    let raf = 0
    const pic = () => wrap.querySelector('img')
    const stop = whenIdle(() =>
      Promise.all([loadImage(src), loadImage(src.replace(/\.webp$/, '-depth.webp'))]).then(([img, dep]) => {
        if (disposed) return
        const draw = () => {
          const el = pic()
          const bw = glow.offsetWidth
          const bh = glow.offsetHeight
          if (!el || !bw || !bh) return
          // object-fit: contain rect of the picture in the card's layout px
          // (the pop-up may still be scaling in, so divide by its scale)
          const cr = glow.getBoundingClientRect()
          const ir = el.getBoundingClientRect()
          const s = cr.width / bw
          const ar = img.naturalWidth / img.naturalHeight
          const ew = ir.width / s
          const eh = ir.height / s
          const ow = Math.min(ew, eh * ar)
          const oh = ow / ar
          const box = { ox: (ir.left - cr.left) / s + (ew - ow) / 2, oy: (ir.top - cr.top) / s + (eh - oh) / 2, ow, oh }
          const k = Math.min(s * Math.min(window.devicePixelRatio || 1, 2), MAX_GLOW_PX / Math.max(bw, bh))
          drawGlow(glow, img, box, k)
          glow.style.opacity = '1'
        }
        draw()
        gl = drawObject(obj, img, dep)
        if (gl) {
          obj.style.opacity = '1'
          const el = pic()
          if (el) el.style.visibility = 'hidden'
        }
        ro = new ResizeObserver(() => {
          cancelAnimationFrame(raf)
          raf = requestAnimationFrame(draw)
        })
        ro.observe(glow)
        ro.observe(wrap)
      }).catch(() => {})
    )
    return () => {
      disposed = true
      stop()
      ro?.disconnect()
      cancelAnimationFrame(raf)
      glow.style.opacity = '0'
      obj.style.opacity = '0'
      const el = pic()
      if (el) el.style.visibility = ''
      ;(gl as WebGLRenderingContext | null)?.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [src])

  const fade = `opacity ${FADE_MS}ms ease`
  return (
    <>
      <canvas
        ref={glowRef}
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full pointer-events-none"
        style={{ opacity: 0, transition: fade }}
      />
      <span ref={wrapRef} className="relative inline-block leading-none">
        <Image src={src} alt={alt} width={width} height={height} className={className} unoptimized />
        <canvas
          ref={objRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain pointer-events-none"
          style={{ opacity: 0, transition: fade }}
        />
      </span>
    </>
  )
}
