'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

// Depth-map spotlight over the active hero-carousel slide (desktop hover only).
// Shader adapted from jh3y's "Product Spotlight" pen (MIT): the depth map
// gives per-pixel relief, so the light that follows the cursor casts soft
// shadows/highlights on the machine itself. The canvas sits exactly on top
// of the slide <img> (same class + inline style, object-fit: contain) and is
// invisible until the pointer enters the hero; nothing loads before that.
// Skipped on touch screens and under prefers-reduced-motion.

const P = {
  lightHeight: 2.2,
  shadowStrength: 0.5,
  shadowSoftness: 0.1,
  shadowLength: 1.2,
  minBrightness: 0.55,
  normalStrength: 1.2,
  aoStrength: 0.2,
  lightBoost: 0.7,
  highlight: 1.9,
  spotRadius: 0.55,
  spotFloor: 0.55,
  spotFalloff: 0.7,
  spotColor: [1, 0.812, 0.478] as const, // #ffcf7a
  trackingSpeed: 80,
  returnSpeed: 600,
  fadeIn: 150,
  fadeOut: 500,
}
// Slide change: the new active slide is still moving into place (900ms
// transition), so the light fades out quickly and waits until it has settled.
const SETTLE_MS = 950
const FAST_FADE_MS = 120

const V = `attribute vec2 aPos;attribute vec2 aTex;varying vec2 vUv;
void main(){vUv=aTex;gl_Position=vec4(aPos,0.,1.);}`

const F = `precision highp float;
uniform sampler2D uImage,uDepth;uniform vec2 uMouse,uRes;
uniform float uLightH,uStrength,uSoft,uMinBri,uNorm,uAO,uHover,uSpotR,uSpotFloor,uShadLen,uBoost,uHighlight,uSpotFalloff;
uniform vec3 uSpotColor;varying vec2 vUv;
vec3 getNormal(vec2 uv,vec2 tx){
  float l=texture2D(uDepth,uv-vec2(tx.x,0.)).r,r=texture2D(uDepth,uv+vec2(tx.x,0.)).r;
  float u=texture2D(uDepth,uv+vec2(0.,tx.y)).r,d=texture2D(uDepth,uv-vec2(0.,tx.y)).r;
  return normalize(vec3((l-r)*uNorm,(d-u)*uNorm,1.));}
float traceShadow(vec2 uv,float depth,vec2 lp,float lH,float soft,float sLen){
  vec3 o=vec3(uv,depth),ray=(vec3(lp,lH)-o)*sLen;float pen=1e5;
  for(int i=2;i<=24;i++){float t=float(i)/24.;vec3 p=o+ray*t;
    if(p.x<0.||p.x>1.||p.y<0.||p.y>1.)break;
    float diff=texture2D(uDepth,p.xy).r-p.z;if(diff>.008)pen=min(pen,soft*float(i)/diff);}
  return clamp(pen,0.,1.);}
float calcAO(vec2 uv,vec2 tx){float c=texture2D(uDepth,uv).r,s=0.;
  for(int i=0;i<8;i++){float a=float(i)*.7854;s+=max(c-texture2D(uDepth,uv+vec2(cos(a),sin(a))*tx*3.).r,0.);}
  return clamp(1.-s*uAO*12./8.,0.,1.);}
void main(){
  vec2 tx=1./uRes;vec2 uv=vUv;
  vec4 col=texture2D(uImage,uv);float d=texture2D(uDepth,uv).r;
  vec3 N=getNormal(uv,tx);float ao=calcAO(uv,tx);
  vec3 L=normalize(vec3(uMouse,uLightH)-vec3(uv,d));float NdotL=max(dot(N,L),0.);
  float dist=length(vec3(uMouse,uLightH)-vec3(uv,d));float atten=1./(1.+dist*dist*1.5);
  float light=NdotL*atten*traceShadow(uv,d,uMouse,uLightH,uSoft,uShadLen)*ao;
  float factor=min(mix(1.,mix(uMinBri,1.,light),uStrength),1.);
  float sDist=length((uMouse-uv)*vec2(uRes.x/uRes.y,1.));float spot=exp(-sDist*sDist/(uSpotR*uSpotR));
  float ld=texture2D(uDepth,clamp(uMouse,.001,.999)).r;
  spot*=mix(1.,1.-smoothstep(0.,.25,max(ld-d,0.)),.8);spot=pow(spot,uSpotFalloff);
  float spotMul=mix(uSpotFloor,uHighlight,spot);vec3 boost=uSpotColor*spot*light*uBoost;
  col.rgb=col.rgb*mix(1.,max(factor*spotMul,uSpotFloor),uHover)+col.rgb*boost*uHover;
  gl_FragColor=col;}`

// Lit source + depth map for a carousel slide. Static renders
// (*-carousel-vN-NN.webp) have *-depth.webp next to them; the looping
// animated heroes freeze on a lit still frame (*-still.webp, frame 0) while
// the cursor is over them and resume playing when it leaves.
const ANIMATED_WITH_STILL = /\/(Serwis_i_Naprawa_Drukarek_3D|serwis-laptopow-hero-animated|02_serwis-komputerow-stacjonarnych)\.webp$/
export const spotlightFor = (src: string) =>
  /-carousel-v\d+-\d+\.webp$/.test(src)
    ? { src, depth: src.replace(/\.webp$/, '-depth.webp') }
    : ANIMATED_WITH_STILL.test(src)
      ? { src: src.replace(/\.webp$/, '-still.webp'), depth: src.replace(/\.webp$/, '-still-depth.webp') }
      : undefined

const lerpFactor = (ms: number) => (ms <= 0 ? 1 : 1 - Math.exp(-3 / ((ms / 1000) * 60)))

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export function HeroSpotlight({
  src,
  depth,
  className,
  style,
  hide = 'img[data-tier="0"]',
  live,
}: {
  src: string
  depth: string
  className: string
  style: CSSProperties
  // What the lit canvas replaces inside its parent: the carousel's active
  // slide by default; single-image heroes pass 'img' (every image in the wrap).
  hide?: string
  // Optional video to light instead of the still `src` (slide-0 print clip):
  // its current frame is re-uploaded every frame while lit. `src` must be a
  // frame of the same size; the hidden set is re-queried, as the clip mounts late.
  live?: () => HTMLVideoElement | null
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const liveRef = useRef(live)
  liveRef.current = live

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = canvas?.closest('.service-hero-image-wrap') as HTMLElement | null
    if (!canvas || !wrap) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let gl: WebGLRenderingContext | null = null
    let uni: Record<string, WebGLUniformLocation | null> = {}
    let setup: Promise<boolean> | null = null
    let raf = 0
    let disposed = false
    const mouse = { x: 0.5, y: 0.5 }
    const sm = { x: 0.5, y: 0.5 }
    let hover = false
    let hm = 0
    let hiddenSlides: HTMLElement[] | null = null
    let imageTex: WebGLTexture | null = null
    const blockedUntil = performance.now() + SETTLE_MS

    const init = () =>
      (setup ??= Promise.all([loadImage(src), loadImage(depth)]).then(([img, dep]) => {
        if (disposed) return false
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        gl = canvas.getContext('webgl', { premultipliedAlpha: false })
        if (!gl) return false
        const g = gl
        const prog = g.createProgram()!
        for (const [type, code] of [[g.VERTEX_SHADER, V], [g.FRAGMENT_SHADER, F]] as const) {
          const sh = g.createShader(type)!
          g.shaderSource(sh, code)
          g.compileShader(sh)
          g.attachShader(prog, sh)
        }
        g.linkProgram(prog)
        if (!g.getProgramParameter(prog, g.LINK_STATUS)) return false
        g.useProgram(prog)
        g.bindBuffer(g.ARRAY_BUFFER, g.createBuffer())
        g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 0, 1, 1, -1, 1, 1, -1, 1, 0, 0, 1, 1, 1, 0]), g.STATIC_DRAW)
        for (const [name, offset] of [['aPos', 0], ['aTex', 8]] as const) {
          const a = g.getAttribLocation(prog, name)
          g.enableVertexAttribArray(a)
          g.vertexAttribPointer(a, 2, g.FLOAT, false, 16, offset)
        }
        for (const n of ['uImage', 'uDepth', 'uMouse', 'uRes', 'uLightH', 'uStrength', 'uSoft', 'uMinBri', 'uNorm', 'uAO', 'uHover', 'uSpotR', 'uSpotFloor', 'uShadLen', 'uBoost', 'uHighlight', 'uSpotFalloff', 'uSpotColor'])
          uni[n] = g.getUniformLocation(prog, n)
        ;[img, dep].forEach((el, unit) => {
          g.activeTexture(g.TEXTURE0 + unit)
          const tex = g.createTexture()
          if (unit === 0) imageTex = tex
          g.bindTexture(g.TEXTURE_2D, tex)
          g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE)
          g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE)
          g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR)
          g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR)
          g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, el)
        })
        g.uniform1i(uni.uImage, 0)
        g.uniform1i(uni.uDepth, 1)
        g.viewport(0, 0, canvas.width, canvas.height)
        g.uniform2f(uni.uRes, canvas.width, canvas.height)
        g.uniform1f(uni.uLightH, P.lightHeight)
        g.uniform1f(uni.uStrength, P.shadowStrength)
        g.uniform1f(uni.uSoft, P.shadowSoftness)
        g.uniform1f(uni.uMinBri, P.minBrightness)
        g.uniform1f(uni.uNorm, P.normalStrength)
        g.uniform1f(uni.uAO, P.aoStrength)
        g.uniform1f(uni.uSpotR, P.spotRadius)
        g.uniform1f(uni.uSpotFloor, P.spotFloor)
        g.uniform1f(uni.uShadLen, P.shadowLength)
        g.uniform1f(uni.uBoost, P.lightBoost)
        g.uniform1f(uni.uHighlight, P.highlight)
        g.uniform1f(uni.uSpotFalloff, P.spotFalloff)
        g.uniform3f(uni.uSpotColor, ...P.spotColor)
        return true
      }).catch(() => false))

    const frame = () => {
      raf = 0
      const g = gl
      if (!g || disposed) return
      const now = performance.now()
      const active = hover && now >= blockedUntil
      const tx = active ? mouse.x : 0.5
      const ty = active ? mouse.y : 0.5
      const lr = lerpFactor(active ? P.trackingSpeed : P.returnSpeed)
      sm.x += (tx - sm.x) * lr
      sm.y += (ty - sm.y) * lr
      hm += ((active ? 1 : 0) - hm) * lerpFactor(active ? P.fadeIn : now < blockedUntil ? FAST_FADE_MS : P.fadeOut)
      const settled = !active && hm < 1e-3
      if (settled) hm = 0
      // The slide files are semi-transparent (soft baked glow), so the canvas
      // must replace the slide image, not sit over it — stacking both doubles
      // the alpha and shows the image's box as a dark rectangle.
      const lit = hm > 0
      canvas.style.opacity = lit ? '1' : '0'
      if (liveRef.current) hiddenSlides = null
      hiddenSlides ??= Array.from(canvas.parentElement?.querySelectorAll<HTMLElement>(hide) ?? [])
      for (const el of hiddenSlides) el.style.visibility = lit ? 'hidden' : ''
      const video = lit ? liveRef.current?.() : null
      if (video && video.readyState >= 2) {
        g.activeTexture(g.TEXTURE0)
        g.bindTexture(g.TEXTURE_2D, imageTex)
        g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, video)
      }
      g.uniform2f(uni.uMouse, sm.x, sm.y)
      g.uniform1f(uni.uHover, hm)
      g.drawArrays(g.TRIANGLE_STRIP, 0, 4)
      // keep ticking while hovering during the settle wait, so the light starts on its own
      if (!settled || hover) raf = requestAnimationFrame(frame)
    }
    const wake = () => {
      if (!raf && gl) raf = requestAnimationFrame(frame)
    }

    // Pointer position in the image's own UV space: the canvas box is
    // object-fit: contain, so find the letterboxed content rect inside it.
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const ar = canvas.width && canvas.height ? canvas.width / canvas.height : r.width / r.height
      const cw = Math.min(r.width, r.height * ar)
      const ch = cw / ar
      mouse.x = (e.clientX - (r.left + (r.width - cw) / 2)) / cw
      mouse.y = (e.clientY - (r.top + (r.height - ch) / 2)) / ch
      hover = true
      if (gl) wake()
      else init().then((ok) => ok && wake())
    }
    const onLeave = () => {
      hover = false
      wake()
    }
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    return () => {
      disposed = true
      hiddenSlides?.forEach((el) => (el.style.visibility = ''))
      if (raf) cancelAnimationFrame(raf)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      ;(gl as WebGLRenderingContext | null)?.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [src, depth, hide])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ ...style, opacity: 0, transition: 'filter 300ms ease', animation: 'none' }}
    />
  )
}
