'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'

// Stack carousel used in service-page hero zones (originally built for
// /uslugi/naprawa-drukarek, now also reused for /uslugi/serwis-laptopow via
// the `variant` prop below). Only transform + opacity are animated
// (GPU-friendly, no reflow), advance interval is paused entirely under
// prefers-reduced-motion. `slides` is supplied by the caller so this
// component holds no page-specific image list itself.
const ADVANCE_MS = 5500

// Phone hero (service pages, <768px): the slide's size coefficient is capped
// here so big machines (plotter, floor MFP) never outgrow the zone. Applied
// only through --slide-fit, which service-hero.css sets inside the mobile
// media query — desktop scale stays exactly as before.
const MOBILE_MAX_COEF = 0.78
const fitVars = (coef: number) =>
  ({ '--mobile-fit': Math.min(1, MOBILE_MAX_COEF / coef).toFixed(4) }) as CSSProperties

// Per-delta geometry (scale/opacity/translate/zIndex) is variant-specific so
// a new page can get its own stack proportions without touching the
// printer carousel's existing numbers.
// - printer: active slide intentionally overflows its box (1.54x) — the
//   hero-printer-carousel-bleed box in service-hero.css is sized to let it
//   spill past the zone, matching the previous single-image hero.
// - laptop: active slide stays at 1x (no overflow) so the whole stack stays
//   inside the left hero column, per the no-crop/no-spill requirement for
//   /uslugi/serwis-laptopow. Same translateX/Y/opacity/zIndex shape as
//   printer so the queue effect itself still reads the same.
const VARIANT_CONFIG = {
  printer: {
    bleedClass: 'hero-printer-carousel-bleed',
    boxClass: 'hero-printer-carousel',
    slideClass: 'hero-printer-carousel-slide',
    scale: [1.54, 0.8, 0.64, 0.5],
    // Tier1 (immediate next-up) stays fully opaque so it fully hides tier2
    // behind it — tier2's own 0.65 was showing through tier1's old 0.85,
    // reading as a ghosting/see-through artifact. Tier2 keeps its partial
    // opacity (it's mostly covered by tier1 anyway, just a depth cue at the
    // edge), tier3 stays invisible.
    opacity: [1, 1, 0.65, 0],
    translateX: [0, -68, -76, -95],
    translateY: [0, -8, -16, -24],
    zIndex: [16, 15, 14, 13],
  },
  // Home hero: printer geometry, but the waiting slides are tucked behind the
  // active one so only `peek` (share of the next-up's width) shows past its
  // left edge; translateX for tiers 1-3 is computed per slide from `peek`.
  home: {
    bleedClass: 'hero-printer-carousel-bleed',
    boxClass: 'hero-printer-carousel',
    slideClass: 'hero-printer-carousel-slide',
    scale: [1.54, 0.8, 0.64, 0.5],
    opacity: [1, 1, 0.65, 0],
    peek: 0.15,
    // Active slide: hover glow target; after the first advance also the
    // entrance (fade + slight grow/slide-in). Styles in home-hero-words.css.
    activeClass: 'hero-home-slide-active',
    enterClass: 'hero-home-slide-enter',
    translateX: [0, -68, -76, -95],
    translateY: [0, -8, -16, -24],
    zIndex: [16, 15, 14, 13],
  },
  laptop: {
    bleedClass: 'hero-laptop-carousel-bleed',
    boxClass: 'hero-laptop-carousel',
    slideClass: 'hero-laptop-carousel-slide',
    scale: [1, 0.52, 0.42, 0.32],
    opacity: [1, 1, 0.65, 0],
    translateX: [0, -68, -76, -95],
    translateY: [0, -8, -16, -24],
    zIndex: [16, 15, 14, 13],
  },
} as const

type CarouselVariant = keyof typeof VARIANT_CONFIG

// Loads only the active slide eagerly (LCP candidate); the rest are fetched
// in the background after the page finishes loading (window "load" +
// requestIdleCallback, so they never compete with the LCP image or main
// bundle for bandwidth), then the carousel only starts once they're cached.
function preloadImages(srcs: string[]): Promise<void> {
  return Promise.all(
    srcs.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new window.Image()
          img.onload = () => resolve()
          img.onerror = () => resolve()
          img.src = src
        })
    )
  ).then(() => undefined)
}

export function HeroPrinterCarousel({
  slides,
  alt,
  variant = 'printer',
  sizeCoefficients,
  verticalBias,
  posterSrc,
  onActiveChange,
  introVideo,
}: {
  slides: string[]
  alt: string
  variant?: CarouselVariant
  // Optional per-slide adjustments (index-matched to `slides`). Left
  // undefined by every caller except serwis-drukarek-atramentowych, so all
  // other carousels keep their exact previous scale/position.
  sizeCoefficients?: number[]
  verticalBias?: number[]
  // Optional lightweight static stand-in for slide 0, used only when slide 0
  // itself is a heavy file (e.g. serwis-laptopow's animated-WebP laptop,
  // ~530KB). When set: the poster paints immediately (fetchPriority high,
  // small transfer) and slide 0's real file is fetched in the background
  // only after window "load", then swapped in once cached — same
  // static-first-then-animate contract as AnimatedHeroImage, adapted for the
  // carousel. Every other caller leaves this undefined, so their slide 0
  // keeps loading exactly as before (no behavior change).
  posterSrc?: string
  // Optional: reports the active slide index (home hero uses it to swap the
  // matching word in the H1 line in sync with the slide change).
  onActiveChange?: (index: number) => void
  // Optional one-time intro video over slide 0 (transparent WebM). Slide 0's
  // static image paints first; the video loads after window "load", plays
  // once when ready, then fades back to the static image and never plays
  // again. `box` = the printer's bbox in the video frame (fractions x0,y0,x1,y1),
  // mapped onto slide 0's image. Skipped on Apple WebKit (no WebM alpha) and
  // under prefers-reduced-motion.
  introVideo?: { src: string; box: readonly [number, number, number, number] }
}) {
  const [active, setActive] = useState(0)
  const [ready, setReady] = useState(false)
  const [inView, setInView] = useState(true)
  const [slide0Ready, setSlide0Ready] = useState(!posterSrc)
  // Entrance animation only for slides shown by an advance, never on the
  // first paint (keeps the LCP slide visible immediately).
  const [advanced, setAdvanced] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const config = VARIANT_CONFIG[variant]
  const slideCount = slides.length

  // Intro video: idle -> loading (hidden <video> buffering) -> playing
  // (video shown, static slide 0 hidden) -> ending (fade back) -> done.
  const [intro, setIntro] = useState<'idle' | 'loading' | 'playing' | 'ending' | 'done'>('idle')
  const slide0Ref = useRef<HTMLImageElement | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [introMeta, setIntroMeta] = useState(false)
  const [introStarted, setIntroStarted] = useState(false)
  const [introGeo, setIntroGeo] = useState<{ w: number; h: number; dx: number; dy: number; ox: number; oy: number } | null>(null)

  useEffect(() => {
    if (!introVideo) return
    const ua = navigator.userAgent
    if (/AppleWebKit/.test(ua) && !/(Chrome|Chromium|Android)/.test(ua)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const start = () => setIntro((s) => (s === 'idle' ? 'loading' : s))
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => window.removeEventListener('load', start)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Size/offset of the video so the printer inside its frame lands exactly
  // on slide 0's image (object-contain rect of the static file).
  useEffect(() => {
    const img = slide0Ref.current
    if (!introVideo || intro === 'idle' || intro === 'done' || !img) return
    const measure = () => {
      const bw = img.offsetWidth
      const bh = img.offsetHeight
      const vid = videoRef.current
      if (!bw || !bh || !img.naturalWidth || !vid?.videoWidth) return
      const ar = img.naturalWidth / img.naturalHeight
      const cw = bw / bh > ar ? bh * ar : bw
      const [x0, y0, x1, y1] = introVideo.box
      const w = cw / (x1 - x0)
      const h = (w * vid.videoHeight) / vid.videoWidth
      const cx = (x0 + x1) / 2
      const cy = (y0 + y1) / 2
      setIntroGeo({ w, h, dx: (0.5 - cx) * w, dy: (0.5 - cy) * h, ox: cx * 100, oy: cy * 100 })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(img)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intro, introMeta])

  // Slide 0 left the front while the video was still on: finish the intro.
  useEffect(() => {
    if (active !== 0 && (intro === 'loading' || intro === 'playing')) setIntro(intro === 'loading' ? 'done' : 'ending')
  }, [active, intro])

  useEffect(() => {
    if (intro !== 'ending') return
    const id = window.setTimeout(() => setIntro('done'), 450)
    return () => window.clearTimeout(id)
  }, [intro])

  // Stops the rotation once less than half of the hero is on screen — no
  // point rotating slides nobody really sees; resumes on scroll back.
  useEffect(() => {
    const node = boxRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio >= 0.5), {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let cancelled = false
    let idleHandle: number | undefined

    const runPreload = () => {
      preloadImages(slides.slice(1)).then(() => {
        if (!cancelled) setReady(true)
      })
    }

    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleHandle = window.requestIdleCallback(runPreload, { timeout: 3000 })
      } else {
        idleHandle = window.setTimeout(runPreload, 300)
      }
    }

    if (document.readyState === 'complete') {
      schedule()
    } else {
      window.addEventListener('load', schedule, { once: true })
    }

    return () => {
      cancelled = true
      window.removeEventListener('load', schedule)
      if (idleHandle !== undefined) {
        if (typeof window.cancelIdleCallback === 'function') {
          window.cancelIdleCallback(idleHandle)
        } else {
          window.clearTimeout(idleHandle)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Poster -> real slide-0 swap, mirrors AnimatedHeroImage: only runs when a
  // posterSrc was supplied. Fetches slide 0's own file after window "load"
  // (so it never competes with the LCP paint or the main bundle), then swaps
  // once it's cached, so the visible transition is instant. Skipped entirely
  // under prefers-reduced-motion — the poster (a static first frame) stays
  // put, saving the animated-file transfer for users who opted out of motion.
  useEffect(() => {
    if (!posterSrc) return
    let cancelled = false

    const swap = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      preloadImages([slides[0]]).then(() => {
        if (!cancelled) setSlide0Ready(true)
      })
    }

    if (document.readyState === 'complete') {
      swap()
    } else {
      window.addEventListener('load', swap, { once: true })
    }

    return () => {
      cancelled = true
      window.removeEventListener('load', swap)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    onActiveChange?.(active)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  useEffect(() => {
    if (!ready || !inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setInterval(() => {
      // Tab in the background: skip the tick instead of tearing the
      // interval down, so it resumes on the same cadence once it's focused
      // again rather than restarting the 5.5s countdown from zero.
      if (document.hidden) return
      setActive((prev) => (prev + 1) % slideCount)
      setAdvanced(true)
    }, ADVANCE_MS)
    return () => clearInterval(id)
    // intro video started: restart the countdown so slide 0 holds for the whole clip
  }, [ready, inView, slideCount, introStarted])

  return (
    // Outer "bleed" box: purely a wider, non-clipping paint-containment
    // boundary (content-visibility:auto needs an ancestor box big enough to
    // hold everything it contains, or it clips at its own edge). Sized in
    // service-hero.css from the exact overflow math below — does not affect
    // the inner carousel's own size, so slide sizing/position/speed stay
    // identical to before.
    <div className={config.bleedClass}>
      <div className={config.boxClass} role="img" aria-label={alt} ref={boxRef}>
        {posterSrc && !slide0Ready && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={posterSrc}
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            className={config.slideClass}
            style={{
              transform: `translate(-50%, -50%) translateX(${config.translateX[0]}%) translateY(${
                config.translateY[0] + (verticalBias?.[0] ?? 0)
              }%) scale(calc(${config.scale[0] * (sizeCoefficients?.[0] ?? 1)} * var(--slide-fit, 1)))`,
              opacity: config.opacity[0],
              zIndex: config.zIndex[0],
              ...fitVars(sizeCoefficients?.[0] ?? 1),
            }}
          />
        )}
        {slides.map((src, i) => {
          // Slide 0 stays out of the DOM until its real file is cached when a
          // posterSrc is in play (the poster above stands in for it) — this
          // is what keeps the heavy animated file off the critical path.
          if (i === 0 && posterSrc && !slide0Ready) return null

          // Before preloading finishes, active stays 0 (the interval below is
          // gated on `ready`), so only the first slide needs to be in the DOM —
          // it renders exactly like a normal hero image, full priority, no wait.
          if (i !== 0 && !ready) return null

          // Forward-only queue position (0 = active, 1/2 = next two waiting
          // in the stack, 3+ = further back, invisible). Unlike a symmetric
          // left/right carousel, there's no separate "previous" side: on
          // advance, delta=0 jumps straight to the back of the queue
          // (delta=slideCount-1), so the 900ms transition below carries it
          // from front-center out to the hidden back position by itself —
          // exactly the "current slides out and shrinks" motion, with no
          // extra exit state needed.
          const delta = ((i - active) % slideCount + slideCount) % slideCount
          const tier = delta === 0 ? 0 : delta === 1 ? 1 : delta === 2 ? 2 : 3
          // Coefficient/bias apply to every tier of this slide, not just the
          // active one, so its relative size stays consistent through its
          // whole time in the queue.
          const scale = config.scale[tier] * (sizeCoefficients?.[i] ?? 1)
          const opacity = i === 0 && intro === 'playing' ? 0 : config.opacity[tier]
          let translateX: number = config.translateX[tier]
          if ('peek' in config && tier > 0) {
            // Left edges in slide-box widths: active, then next-up = active − peek.
            const coef = (k: number) => sizeCoefficients?.[k % slideCount] ?? 1
            const activeLeft = -config.scale[0] * coef(active) / 2
            const nextLeft = activeLeft - config.peek * config.scale[1] * coef(active + 1)
            const half = config.scale[tier] * coef(i) / 2
            translateX = 100 * (tier === 1 ? nextLeft + half : nextLeft + half + 0.02)
          }
          const translateY = config.translateY[tier] + (verticalBias?.[i] ?? 0)
          const zIndex = config.zIndex[tier]
          const stateClass =
            tier === 0 && 'activeClass' in config
              ? ` ${config.activeClass}${advanced ? ` ${config.enterClass}` : ''}`
              : ''

          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              ref={i === 0 ? slide0Ref : undefined}
              src={src}
              alt=""
              aria-hidden="true"
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              className={config.slideClass + stateClass}
              data-tier={tier}
              style={{
                transform: `translate(-50%, -50%) translateX(${translateX}%) translateY(${translateY}%) scale(calc(${scale} * var(--slide-fit, 1)))`,
                opacity,
                zIndex,
                ...fitVars(sizeCoefficients?.[i] ?? 1),
              }}
            />
          )
        })}
        {introVideo && intro !== 'idle' && intro !== 'done' && (
          <video
            ref={videoRef}
            src={introVideo.src}
            muted
            playsInline
            autoPlay={false}
            preload="auto"
            aria-hidden="true"
            className={config.slideClass + ('activeClass' in config ? ` ${config.activeClass}` : '')}
            onLoadedMetadata={() => setIntroMeta(true)}
            onCanPlayThrough={(e) => {
              if (intro !== 'loading' || active !== 0) return
              e.currentTarget.play().then(() => { setIntro('playing'); setIntroStarted(true) }, () => setIntro('done'))
            }}
            onEnded={() => setIntro('ending')}
            style={{
              width: introGeo?.w,
              height: introGeo?.h,
              // global preflight caps video at max-width:100% — that squeezed the
              // 16:9 frame (printer shrank/shifted); the transparent frame may overhang
              maxWidth: 'none',
              maxHeight: 'none',
              objectFit: 'fill',
              objectPosition: '50% 50%',
              overflow: 'visible',
              transformOrigin: introGeo ? `${introGeo.ox}% ${introGeo.oy}%` : undefined,
              transform: introGeo
                ? `translate(-50%, -50%) translate(${introGeo.dx}px, ${introGeo.dy}px) scale(calc(${config.scale[0] * (sizeCoefficients?.[0] ?? 1)} * var(--slide-fit, 1)))`
                : undefined,
              ...fitVars(sizeCoefficients?.[0] ?? 1),
              visibility: introGeo ? undefined : 'hidden',
              // no transform transition: the clip must sit still on slide 0, only fade
              transition: 'opacity 450ms ease, filter 300ms ease',
              opacity: intro === 'playing' && introGeo ? 1 : 0,
              zIndex: config.zIndex[0] + 1,
            }}
          />
        )}
      </div>
    </div>
  )
}
