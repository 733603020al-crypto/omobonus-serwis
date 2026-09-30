'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { HeroSpotlight, spotlightFor } from '@/components/hero-spotlight'

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

// Loads only the active slide eagerly (LCP candidate). After the page finishes
// loading (window "load" + requestIdleCallback, so nothing competes with the
// LCP image or main bundle) only the next LOOKAHEAD slides are fetched — the
// ones the stack shows (tiers 1-2) plus the hidden tier-3 one that slides in
// next. The carousel starts once those are cached; every advance then fetches
// the one new slide entering the hidden tier, ~5.5s before it becomes visible.
// A tick is skipped if that slide isn't cached yet, so nothing appears empty.
const LOOKAHEAD = 3
// First next-up animation (slidePosters) is requested this long after the
// initial preload, so it doesn't compete with the first screen; still leaves
// ~4s before the first advance.
const ANIM_DELAY_MS = 1500

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
  slidePosters,
  mobileSlideAnims,
  opening,
  onActiveChange,
  introVideo,
  advanceOnSecondReady,
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
  // Optional per-slide static stand-ins (index-matched to `slides`) for heavy
  // animated slides (home hero). The poster takes the slide's place in the
  // queue; the animated file is fetched only when that slide is next up and
  // swapped in once cached — the rotation holds until it is, so the slide is
  // already animated when it comes to the front.
  slidePosters?: (string | undefined)[]
  // Optional smaller animated files for phones (index-matched, only for slides
  // with a poster): same frames and timing, lower resolution. Chosen once, when
  // the animation is requested, on screens narrower than md.
  mobileSlideAnims?: (string | undefined)[]
  // Optional one-time opening slide (home hero): shown in front of slide 0 on
  // the first paint only. Slide 0's file starts loading right after mount; the
  // intro leaves (normal advance motion) once minMs has passed since mount AND
  // slide 0 plus the next slides are cached, then never comes back — the
  // regular rotation starts from slide 0. onActiveChange reports -1 meanwhile.
  opening?: { src: string; minMs: number }
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
  // Optional (serwis-laptopow): slide 0 is only a light stand-in for the
  // animated slide 1. Slide 1 is fetched right after mount and the carousel
  // moves to it as soon as it is fully cached, instead of waiting for the
  // regular 5.5s tick and the whole lookahead window.
  advanceOnSecondReady?: boolean
}) {
  // Desktop hover light over the active slide (see HeroSpotlight).
  const spotlights = slides.map(spotlightFor)
  const hasSpotlight = spotlights.some(Boolean)
  const [active, setActive] = useState(0)
  // Per-slide "cached" flags; slide 0 is the eager one (or covered by the poster).
  const [loaded, setLoaded] = useState<boolean[]>(() => slides.map((_, i) => i === 0 && !opening))
  const [openingState, setOpeningState] = useState<'on' | 'leaving' | 'off'>(opening ? 'on' : 'off')
  const openingOn = openingState === 'on'
  const mountedAtRef = useRef(0)
  const reportedRef = useRef<number | null>(null)
  const loadedRef = useRef(loaded)
  loadedRef.current = loaded
  const requestedRef = useRef<Set<number>>(new Set([0]))
  const activeRef = useRef(active)
  activeRef.current = active
  const [animReady, setAnimReady] = useState<boolean[]>(() => slides.map(() => false))
  const animReadyRef = useRef(animReady)
  animReadyRef.current = animReady
  const animRequestedRef = useRef<Set<number>>(new Set())
  // Animated file actually requested per slide (desktop or mobile variant).
  const animSrcRef = useRef<(string | undefined)[]>([])
  const [inView, setInView] = useState(true)
  const [slide0Ready, setSlide0Ready] = useState(!posterSrc)
  // Entrance animation only for slides shown by an advance, never on the
  // first paint (keeps the LCP slide visible immediately).
  const [advanced, setAdvanced] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const config = VARIANT_CONFIG[variant]
  const slideCount = slides.length
  const lookahead = Math.min(LOOKAHEAD, slideCount - 1)
  const aheadLoaded = (from: number, flags: boolean[]) => {
    for (let k = 1; k <= lookahead; k++) if (!flags[(from + k) % slideCount]) return false
    return true
  }
  // Latches true once the first window is cached (flags never go back).
  const ready = aheadLoaded(0, loaded)

  const requestAhead = (from: number) => {
    for (let k = 1; k <= lookahead; k++) {
      const i = (from + k) % slideCount
      if (requestedRef.current.has(i)) continue
      requestedRef.current.add(i)
      preloadImages([slidePosters?.[i] ?? slides[i]]).then(() =>
        setLoaded((prev) => {
          if (prev[i]) return prev
          const next = [...prev]
          next[i] = true
          return next
        })
      )
    }
  }

  // Animated file of a slide that has a poster; fetched only when it is next up.
  const requestAnim = (i: number) => {
    if (!slidePosters?.[i] || animRequestedRef.current.has(i)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    animRequestedRef.current.add(i)
    const animSrc = mobileSlideAnims?.[i] && window.matchMedia('(max-width: 767px)').matches ? mobileSlideAnims[i] : slides[i]
    animSrcRef.current[i] = animSrc
    preloadImages([animSrc]).then(() =>
      setAnimReady((prev) => {
        if (prev[i]) return prev
        const next = [...prev]
        next[i] = true
        return next
      })
    )
  }
  const animPending = (i: number) =>
    !!slidePosters?.[i] && !animReadyRef.current[i] &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Intro video: idle -> loading (hidden <video> buffering) -> playing
  // (video shown, static slide 0 hidden) -> ending (fade back) -> done.
  const [intro, setIntro] = useState<'idle' | 'loading' | 'playing' | 'ending' | 'done'>('idle')
  const slide0Ref = useRef<HTMLImageElement | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [introMeta, setIntroMeta] = useState(false)
  const [introStarted, setIntroStarted] = useState(false)
  const [introGeo, setIntroGeo] = useState<{ w: number; h: number; dx: number; dy: number; ox: number; oy: number } | null>(null)
  const introRef = useRef(intro)
  introRef.current = intro

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
    let idleHandle: number | undefined
    let animTimer: number | undefined

    const runPreload = () => {
      requestAhead(0)
      if (slidePosters && !opening) animTimer = window.setTimeout(() => requestAnim(1 % slideCount), ANIM_DELAY_MS)
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
      window.removeEventListener('load', schedule)
      window.clearTimeout(animTimer)
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

  // Intro: slide 0 starts loading right after the first paint (mount).
  useEffect(() => {
    if (!opening) return
    mountedAtRef.current = performance.now()
    preloadImages([slides[0]]).then(() =>
      setLoaded((prev) => (prev[0] ? prev : [true, ...prev.slice(1)]))
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Intro -> slide 0: not before minMs, and only once slide 0 and the next
  // slides are cached (slow network: the intro simply stays longer).
  useEffect(() => {
    if (!opening || !openingOn || !ready || !loaded[0] || !inView) return
    const wait = Math.max(0, mountedAtRef.current + opening.minMs - performance.now())
    const id = window.setTimeout(() => {
      setOpeningState('leaving')
      setAdvanced(true)
      requestAnim(1 % slideCount)
    }, wait)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openingOn, ready, loaded, inView])

  // The intro slides out to the back like any advanced slide, then unmounts.
  useEffect(() => {
    if (openingState !== 'leaving') return
    const id = window.setTimeout(() => setOpeningState('off'), 900)
    return () => window.clearTimeout(id)
  }, [openingState])

  // advanceOnSecondReady: fetch slide 1 right after mount (slide 0 is already
  // painted by then), outside the load/idle-gated lookahead window.
  const [quickAdvanced, setQuickAdvanced] = useState(false)
  useEffect(() => {
    if (!advanceOnSecondReady || slideCount < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    requestedRef.current.add(1)
    preloadImages([slides[1]]).then(() =>
      setLoaded((prev) => {
        if (prev[1]) return prev
        const next = [...prev]
        next[1] = true
        return next
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ...and move to it as soon as it is cached. It is rendered in the next-up
  // position first, so the advance animates like a normal one; the double rAF
  // lets that position paint before the move starts.
  useEffect(() => {
    if (!advanceOnSecondReady || quickAdvanced || !loaded[1] || active !== 0) return
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setActive(1)
        setAdvanced(true)
        setQuickAdvanced(true)
      })
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, active, quickAdvanced])

  useEffect(() => {
    const shown = openingOn ? -1 : active
    if (reportedRef.current !== shown) {
      reportedRef.current = shown
      onActiveChange?.(shown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, openingOn])

  useEffect(() => {
    // The first window is requested by the load/idle effect above.
    if (active !== 0 || requestedRef.current.size > 1) requestAhead(active)
    // Next-up animation; the very first one waits for the timer in the load effect.
    if (active !== 0 || animRequestedRef.current.size > 0) requestAnim((active + 1) % slideCount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  // Spotlight carousels hold the current slide while the pointer is over the
  // hero, so the light isn't cut off by an advance. Hover time still counts
  // toward the 5.5s: on leave only the remainder is waited, or the carousel
  // advances right away if the slide has already been up that long.
  const [hoverPaused, setHoverPaused] = useState(false)
  const countdownStartRef = useRef(0)
  const resumeFromHoverRef = useRef(false)
  useEffect(() => {
    if (!hasSpotlight) return
    const wrap = boxRef.current?.closest('.service-hero-image-wrap')
    if (!wrap || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const enter = () => setHoverPaused(true)
    const leave = () => {
      resumeFromHoverRef.current = true
      setHoverPaused(false)
    }
    wrap.addEventListener('pointerenter', enter)
    wrap.addEventListener('pointerleave', leave)
    return () => {
      wrap.removeEventListener('pointerenter', enter)
      wrap.removeEventListener('pointerleave', leave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!ready || !inView || openingOn || hoverPaused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const fromHover = resumeFromHoverRef.current
    resumeFromHoverRef.current = false
    if (!fromHover) countdownStartRef.current = Date.now()
    let id: number
    const tick = () => {
      countdownStartRef.current = Date.now()
      id = window.setTimeout(tick, ADVANCE_MS)
      // Tab in the background: skip the tick instead of tearing the
      // timer down, so it resumes on the same cadence once it's focused
      // again rather than restarting the 5.5s countdown from zero.
      if (document.hidden) return
      // Intro clip still playing: let it finish, advance on a later tick.
      if (introRef.current === 'playing') return
      // Slow connection: hold the current slide until the incoming ones are cached.
      if (!aheadLoaded(activeRef.current, loadedRef.current)) return
      // ...and until the incoming slide's animation (if it has a poster) is cached.
      if (animPending((activeRef.current + 1) % slideCount)) return
      setActive((prev) => (prev + 1) % slideCount)
      setAdvanced(true)
    }
    id = window.setTimeout(tick, Math.max(0, ADVANCE_MS - (Date.now() - countdownStartRef.current)))
    return () => clearTimeout(id)
    // intro video started: restart the countdown so slide 0 holds for the whole clip
    // quick first advance: restart the countdown so slide 1 gets its full 5.5s
  }, [ready, inView, slideCount, introStarted, openingOn, hoverPaused, quickAdvanced])

  const coef = (k: number) => sizeCoefficients?.[((k % slideCount) + slideCount) % slideCount] ?? 1
  // Front / next-up slide coefficients (the opening slide stands in front of slide 0).
  const frontCoef = coef(openingOn ? 0 : active)
  const nextCoef = coef(openingOn ? 0 : active + 1)
  const peekX = (tier: number, c: number): number => {
    if (!('peek' in config) || tier === 0) return config.translateX[tier]
    // Left edges in slide-box widths: active, then next-up = active − peek.
    const activeLeft = -config.scale[0] * frontCoef / 2
    const nextLeft = activeLeft - config.peek * config.scale[1] * nextCoef
    const half = config.scale[tier] * c / 2
    return 100 * (tier === 1 ? nextLeft + half : nextLeft + half + 0.02)
  }

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
        {opening && openingState !== 'off' && (
          // One-time opening slide: front while on, then the back of the queue
          // (hidden tier 3) during the 900ms move, then unmounted.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key="opening"
            src={opening.src}
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            className={config.slideClass + (openingOn && 'activeClass' in config ? ` ${config.activeClass}` : '')}
            data-tier={openingOn ? 0 : 3}
            style={{
              transform: `translate(-50%, -50%) translateX(${peekX(openingOn ? 0 : 3, coef(0))}%) translateY(${
                config.translateY[openingOn ? 0 : 3] + (verticalBias?.[0] ?? 0)
              }%) scale(calc(${config.scale[openingOn ? 0 : 3] * coef(0)} * var(--slide-fit, 1)))`,
              opacity: config.opacity[openingOn ? 0 : 3],
              zIndex: config.zIndex[openingOn ? 0 : 3],
              ...fitVars(coef(0)),
            }}
          />
        )}
        {slides.map((src, i) => {
          // Slide 0 stays out of the DOM until its real file is cached when a
          // posterSrc is in play (the poster above stands in for it) — this
          // is what keeps the heavy animated file off the critical path.
          if (i === 0 && posterSrc && !slide0Ready) return null
          // Opening slide in front: slide 0 joins (as next-up) once cached.
          if (i === 0 && opening && !loaded[0]) return null

          // Before the first window is cached, active stays 0 (the interval is
          // gated on `ready`), so only the first slide needs to be in the DOM —
          // it renders exactly like a normal hero image, full priority, no wait.
          // Later slides join the DOM once cached, while still in the hidden
          // tier 3, so their move into the visible stack animates as before.
          // (advanceOnSecondReady: slide 1 joins as soon as it alone is cached.)
          if (i !== 0 && (!(ready || (advanceOnSecondReady && i === 1)) || !loaded[i])) return null

          // Forward-only queue position (0 = active, 1/2 = next two waiting
          // in the stack, 3+ = further back, invisible). Unlike a symmetric
          // left/right carousel, there's no separate "previous" side: on
          // advance, delta=0 jumps straight to the back of the queue
          // (delta=slideCount-1), so the 900ms transition below carries it
          // from front-center out to the hidden back position by itself —
          // exactly the "current slides out and shrinks" motion, with no
          // extra exit state needed.
          // (+1 while the opening slide holds the front position.)
          const delta = ((i - active) % slideCount + slideCount) % slideCount + (openingOn ? 1 : 0)
          const tier = delta === 0 ? 0 : delta === 1 ? 1 : delta === 2 ? 2 : 3
          // Coefficient/bias apply to every tier of this slide, not just the
          // active one, so its relative size stays consistent through its
          // whole time in the queue.
          const scale = config.scale[tier] * (sizeCoefficients?.[i] ?? 1)
          const opacity = i === 0 && intro === 'playing' ? 0 : config.opacity[tier]
          const translateX = peekX(tier, coef(i))
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
              src={slidePosters?.[i] ? (animReady[i] ? animSrcRef.current[i] ?? src : slidePosters[i]) : src}
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
        {spotlights[active] && !openingOn && !(active === 0 && posterSrc && !slide0Ready) &&
          !(active === 0 && (intro === 'loading' || intro === 'playing' || intro === 'ending')) && (
          <HeroSpotlight
            key={active}
            src={spotlights[active]!.src}
            depth={spotlights[active]!.depth}
            className={config.slideClass + ('activeClass' in config ? ` ${config.activeClass}` : '')}
            style={{
              transform: `translate(-50%, -50%) translateX(${peekX(0, coef(active))}%) translateY(${
                config.translateY[0] + (verticalBias?.[active] ?? 0)
              }%) scale(calc(${config.scale[0] * coef(active)} * var(--slide-fit, 1)))`,
              zIndex: config.zIndex[0] + 1,
              ...fitVars(coef(active)),
            }}
          />
        )}
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
