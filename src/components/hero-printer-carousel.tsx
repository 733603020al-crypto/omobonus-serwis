'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { HeroSpotlight, spotlightFor } from '@/components/hero-spotlight'
import '@/app/styles/hero-intro-video.css'

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
// media query — desktop scale stays exactly as before. A page can give a
// slide its own phone coefficient (mobileSizeCoefficients) instead of the cap.
const MOBILE_MAX_COEF = 0.78
const fitVars = (coef: number, mobileCoef?: number) =>
  ({ '--mobile-fit': (mobileCoef !== undefined ? mobileCoef / coef : Math.min(1, MOBILE_MAX_COEF / coef)).toFixed(4) }) as CSSProperties

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
// First next-up animation (see ANIMATED_STILLS) is requested this long after the
// initial preload, so it doesn't compete with the first screen; still leaves
// ~4s before the first advance.
const ANIM_DELAY_MS = 1500
// Slide-0 print clip still not playable this long after it started loading:
// fall back to the static image and the regular timer.
const INTRO_FAIL_MS = 10000

// Animated slides (looping animated WebP) -> their static frame 0. Such a slide
// shows the still everywhere in the queue and plays only while it is in front:
// on reaching the front it gets a fresh copy of the animation (new object URL,
// so it always starts from frame 0), and on leaving it drops back to the still.
// The rotation keeps its regular 5.5s cadence (no waiting for the loop's end).
const ANIMATED_STILLS: Record<string, string> = {
  '/images/serwis-laptopow-hero-animated.webp': '/images/serwis-laptopow-hero-animated-still.webp',
  '/images/02_serwis-komputerow-stacjonarnych.webp': '/images/02_serwis-komputerow-stacjonarnych-static.webp',
  '/images/Serwis_i_Naprawa_Drukarek_3D.webp': '/images/Serwis_i_Naprawa_Drukarek_3D-static.webp',
}

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
  mobileSizeCoefficients,
  verticalBias,
  posterSrc,
  slidePosters,
  mobileSlideAnims,
  mobileStills,
  opening,
  onActiveChange,
  introVideo,
  animationSlideIndex = 0,
  advanceOnSecondReady,
}: {
  slides: string[]
  alt: string
  variant?: CarouselVariant
  // Optional per-slide adjustments (index-matched to `slides`). Left
  // undefined by every caller except serwis-drukarek-atramentowych, so all
  // other carousels keep their exact previous scale/position.
  sizeCoefficients?: number[]
  // Optional phone-only coefficient per slide (<768px), replacing the
  // MOBILE_MAX_COEF cap for that slide; undefined entries keep the cap.
  mobileSizeCoefficients?: (number | undefined)[]
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
  // queue; the animated file is fetched only when that slide is next up (the
  // rotation holds until it is cached) and plays only while the slide is in
  // front — see ANIMATED_STILLS, which covers the other animated slides.
  slidePosters?: (string | undefined)[]
  // Optional smaller animated files for phones (index-matched, only for slides
  // with a poster): same frames and timing, lower resolution. Chosen once, when
  // the animation is requested, on screens narrower than md.
  mobileSlideAnims?: (string | undefined)[]
  // Optional static files for phones (index-matched, never slide 0): on screens
  // narrower than md the slide is fetched and shown as this file instead of its
  // animated one (serwis-laptopow: frame 0 of the broken-screen animation).
  // Chosen once, at the first request; desktop keeps `slides` as is.
  mobileStills?: (string | undefined)[]
  // Optional one-time opening slide (home hero): shown in front of slide 0 on
  // the first paint only. Slide 0's file starts loading right after mount; the
  // intro leaves (normal advance motion) once minMs has passed since mount AND
  // slide 0 plus the next slides are cached, then never comes back — the
  // regular rotation starts from slide 0. onActiveChange reports -1 meanwhile.
  opening?: { src: string; minMs: number }
  // Optional: reports the active slide index (home hero uses it to swap the
  // matching word in the H1 line in sync with the slide change).
  onActiveChange?: (index: number) => void
  // Optional print clip (transparent WebM) in place of slide `animationSlideIndex`
  // (serwis-drukarek-atramentowych: 0, home hero: 3). `poster` = the clip's own
  // frame 0 (same frame size), painted until the clip plays; the clip loads after
  // window "load" once the slide is in the DOM, and plays from frame 0 as soon as
  // the slide is in front, then stays on its last frame. The carousel advances on
  // `ended` (not the 5.5s timer) and never moves onto the slide while the clip
  // is still loading; on the next visit the clip is rewound and played again.
  // Paused while the hero is off screen. Apple WebKit (no WebM alpha), reduced
  // motion and a failed clip (error, rejected play, or not playable
  // INTRO_FAIL_MS after the slide shows up in the stack) keep the slide's static
  // image on the timer. `box` = the printer's bbox in the frame (fractions
  // x0,y0,x1,y1), mapped onto the slide's contained image (`photoAspect` = its
  // width/height); `depth` = depth map in the frame's geometry for the hover light.
  introVideo?: {
    src: string
    poster: string
    depth: string
    frame: readonly [number, number]
    photoAspect: number
    box: readonly [number, number, number, number]
  }
  animationSlideIndex?: number
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
  // Fetched animation per slide (desktop or mobile variant), see ANIMATED_STILLS.
  const animBlobRef = useRef<(Blob | undefined)[]>([])
  // Animation playing on the front slide: a fresh object URL of its blob.
  const [frontAnim, setFrontAnim] = useState<{ i: number; url: string } | null>(null)
  const [inView, setInView] = useState(true)
  const [slide0Ready, setSlide0Ready] = useState(!posterSrc)
  // Entrance animation only for slides shown by an advance, never on the
  // first paint (keeps the LCP slide visible immediately).
  const [advanced, setAdvanced] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const config = VARIANT_CONFIG[variant]
  const slideCount = slides.length
  // Slide replaced by the print clip (see introVideo); -1 = none.
  const clipAt = introVideo ? animationSlideIndex % slideCount : -1
  const lookahead = Math.min(LOOKAHEAD, slideCount - 1)
  const aheadLoaded = (from: number, flags: boolean[]) => {
    for (let k = 1; k <= lookahead; k++) if (!flags[(from + k) % slideCount]) return false
    return true
  }
  // Latches true once the first window is cached (flags never go back).
  const ready = aheadLoaded(0, loaded)

  // Phone stand-in of slide i (see mobileStills); slides join the DOM only
  // after a client-side preload, so this never runs during SSR.
  const mobileStillsRef = useRef<(string | undefined)[] | null>(null)
  const stillFor = (i: number) => {
    if (!mobileStills?.[i]) return undefined
    mobileStillsRef.current ??= window.matchMedia('(max-width: 767px)').matches ? mobileStills : []
    return mobileStillsRef.current[i]
  }
  // Static frame of an animated slide (shown whenever it is not in front).
  const stillOf = (i: number) => slidePosters?.[i] ?? ANIMATED_STILLS[slides[i]]
  // Animation file of slide i, or undefined when it never animates (static
  // slide, or a phone stand-in from mobileStills).
  const animSrcFor = (i: number) => {
    if (!stillOf(i) || stillFor(i)) return undefined
    return mobileSlideAnims?.[i] && window.matchMedia('(max-width: 767px)').matches ? mobileSlideAnims[i] : slides[i]
  }

  const requestAhead = (from: number) => {
    for (let k = 1; k <= lookahead; k++) {
      const i = (from + k) % slideCount
      if (requestedRef.current.has(i)) continue
      requestedRef.current.add(i)
      // Clip slide: its frame-0 poster, not the static image (the fallback
      // fetches that one itself).
      const src = i === clipAt && introRef.current !== 'off' ? introVideo!.poster : stillFor(i) ?? stillOf(i) ?? slides[i]
      preloadImages([src]).then(() =>
        setLoaded((prev) => {
          if (prev[i]) return prev
          const next = [...prev]
          next[i] = true
          return next
        })
      )
    }
  }

  // Animation of an animated slide; fetched (after window "load") when it is
  // next up or in front. Reduced motion keeps the still.
  const requestAnim = (i: number) => {
    if (animRequestedRef.current.has(i)) return
    const animSrc = animSrcFor(i)
    if (!animSrc || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    animRequestedRef.current.add(i)
    const done = () =>
      setAnimReady((prev) => {
        if (prev[i]) return prev
        const next = [...prev]
        next[i] = true
        return next
      })
    const run = () =>
      fetch(animSrc)
        .then((r) => (r.ok ? r.blob() : Promise.reject()))
        .then((blob) => {
          animBlobRef.current[i] = blob
        })
        // Failed fetch: no blob, the slide simply stays on its still (the
        // rotation is not held for it).
        .catch(() => {})
        .finally(done)
    if (document.readyState === 'complete') run()
    else window.addEventListener('load', run, { once: true })
  }
  const animPending = (i: number) =>
    !!animSrcFor(i) && !animReadyRef.current[i] &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Print clip on slide `clipAt`: wait (poster, clip loading) -> ready (cached,
  // waits for the front + visible hero) -> playing -> ended (last frame; the
  // carousel advances) -> rewound to ready once the slide is hidden at the back.
  // 'off' = no clip (static slide image, regular timer).
  const [intro, setIntro] = useState<'wait' | 'ready' | 'playing' | 'ended' | 'off'>(introVideo ? 'wait' : 'off')
  const introOn = intro !== 'off'
  const introRef = useRef(intro)
  introRef.current = intro
  const [introLoad, setIntroLoad] = useState(false)
  // First real playback; the poster is hidden for good from then on.
  const [introStarted, setIntroStarted] = useState(false)
  const introStartedRef = useRef(introStarted)
  introStartedRef.current = introStarted
  const introLeftRef = useRef(false)
  const introFailTimerRef = useRef<number | undefined>(undefined)
  const videoRef = useRef<HTMLVideoElement>(null)
  // Timer restart after the clip-driven advance, so the next slide gets its full 5.5s.
  const [timerKick, setTimerKick] = useState(0)
  // Queue position of the clip slide (0 = front; +1 while the opening slide is there).
  const clipDelta = ((clipAt - active) % slideCount + slideCount) % slideCount + (openingOn ? 1 : 0)

  // Clip unavailable: switch to the static image once it's cached (no empty frame).
  const introFail = () => {
    if (introRef.current === 'off') return
    preloadImages([slides[clipAt]]).then(() => setIntro('off'))
  }

  useEffect(() => {
    if (!introVideo) return
    const ua = navigator.userAgent
    if ((/AppleWebKit/.test(ua) && !/(Chrome|Chromium|Android)/.test(ua)) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIntro('off')
      return
    }
    const start = () => setIntroLoad(true)
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => {
      window.removeEventListener('load', start)
      window.clearTimeout(introFailTimerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Stall guard, counted from when the slide shows up in the visible stack (not
  // from page load): still not playable INTRO_FAIL_MS later -> static image.
  useEffect(() => {
    if (!introLoad || intro !== 'wait' || clipDelta > 2 || introFailTimerRef.current !== undefined) return
    introFailTimerRef.current = window.setTimeout(() => {
      if (introRef.current === 'wait') introFail()
    }, INTRO_FAIL_MS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introLoad, intro, clipDelta])

  // Play as soon as the clip is ready, its slide is in front and the hero is
  // on screen; pause when it scrolls away, resume from the same spot on return.
  useEffect(() => {
    const v = videoRef.current
    if (!v || active !== clipAt) return
    if (intro === 'ready') {
      if (inView) setIntro('playing')
      return
    }
    if (intro !== 'playing') return
    if (!inView) {
      v.pause()
      return
    }
    if (v.paused) v.play().catch((e: DOMException) => {
      if (e?.name !== 'AbortError') introFail()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intro, inView, active])

  // Rewind once the clip slide sits hidden at the back of the queue (not while
  // it is still sliding out), so it re-enters on frame 0 and plays again.
  useEffect(() => {
    if (intro !== 'ended') return
    if (active === clipAt) {
      if (!introLeftRef.current) return
    } else {
      introLeftRef.current = true
      if (clipDelta < 3 || clipDelta === slideCount - 1) return
    }
    introLeftRef.current = false
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
    setIntro('ready')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intro, active])

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
      if (!opening) animTimer = window.setTimeout(() => requestAnim(1 % slideCount), ANIM_DELAY_MS)
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
      // An animated slide 0 joins as its still (it animates via frontAnim).
      preloadImages([stillOf(0) ?? slides[0]]).then(() => {
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
    preloadImages([stillOf(0) ?? slides[0]]).then(() =>
      setLoaded((prev) => (prev[0] ? prev : [true, ...prev.slice(1)]))
    )
    // Slide 0 is next up behind the intro; its animation (if any) is fetched
    // after window "load" so it can start as soon as the slide is in front.
    requestAnim(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Intro -> slide 0: not before minMs, and only once slide 0 and its animation
  // are cached — the slides queued behind may still be loading (slow network:
  // the intro simply stays longer).
  useEffect(() => {
    if (!opening || !openingOn || !loaded[0] || !inView) return
    if (animPending(0)) return
    const wait = Math.max(0, mountedAtRef.current + opening.minMs - performance.now())
    const id = window.setTimeout(() => {
      setOpeningState('leaving')
      setAdvanced(true)
      requestAnim(1 % slideCount)
    }, wait)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openingOn, loaded, inView, animReady])

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
    requestAnim(1)
    preloadImages([stillFor(1) ?? stillOf(1) ?? slides[1]]).then(() =>
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
    // ...and its animation, so it starts the moment the slide is in front.
    if (animPending(1)) return
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
  }, [loaded, active, quickAdvanced, animReady])

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
    // Front slide's own animation (normally already fetched as next-up; slide 0
    // on the first paint waits for window "load" inside requestAnim).
    if (!openingOn) requestAnim(active)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, openingOn])

  // Start the front slide's animation from frame 0: a fresh object URL of its
  // blob, decoded before the swap so the still is replaced without a gap.
  // Any other slide (and the front one once it leaves) shows its still.
  useEffect(() => {
    const i = openingOn ? -1 : active
    const blob = i >= 0 && animReady[i] ? animBlobRef.current[i] : undefined
    if (!blob) {
      setFrontAnim(null)
      return
    }
    if (frontAnim?.i === i) return
    if (frontAnim) setFrontAnim(null)
    let cancelled = false
    const url = URL.createObjectURL(blob)
    const img = new window.Image()
    img.src = url
    img.decode().catch(() => {}).then(() => {
      if (cancelled) URL.revokeObjectURL(url)
      else setFrontAnim({ i, url })
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, openingOn, animReady])

  // Release the previous animation copy once its slide has switched back.
  useEffect(() => {
    if (!frontAnim) return
    const { url } = frontAnim
    return () => {
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    }
  }, [frontAnim])

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

  // Clip finished: advance right away (hover, off-screen and uncached next
  // slides hold it, like the regular tick).
  useEffect(() => {
    if (intro !== 'ended' || active !== clipAt || !ready || !inView || openingOn || hoverPaused) return
    if (!aheadLoaded(clipAt, loaded)) return
    const go = () => {
      setActive((clipAt + 1) % slideCount)
      setAdvanced(true)
      setTimerKick((k) => k + 1)
    }
    if (!document.hidden) {
      go()
      return
    }
    const onVisible = () => {
      if (!document.hidden) go()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intro, active, ready, inView, openingOn, hoverPaused, loaded])

  // A tick already wanted to bring the clip slide in but its clip was still
  // loading: move on the moment it becomes playable instead of waiting out
  // another 5.5s. Hover / off-screen / hidden tab leave it to the regular timer.
  const clipHeldRef = useRef(false)
  useEffect(() => {
    clipHeldRef.current = false
  }, [active])
  useEffect(() => {
    if (intro !== 'ready' || !clipHeldRef.current) return
    clipHeldRef.current = false
    if ((activeRef.current + 1) % slideCount !== clipAt) return
    if (!ready || !inView || openingOn || hoverPaused || document.hidden) return
    if (!aheadLoaded(activeRef.current, loadedRef.current)) return
    setActive(clipAt)
    setAdvanced(true)
    setTimerKick((k) => k + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intro])

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
      // The print-clip slide leaves on the clip's end, not on the timer...
      if (activeRef.current === clipAt && introRef.current !== 'off') return
      // ...and is not moved to the front while its clip is still loading
      // (the switch is caught up as soon as the clip is ready, see clipHeldRef).
      if ((activeRef.current + 1) % slideCount === clipAt && introRef.current === 'wait') {
        clipHeldRef.current = true
        return
      }
      // Slow connection: hold the current slide until the incoming ones are cached.
      if (!aheadLoaded(activeRef.current, loadedRef.current)) return
      // ...and until the incoming slide's animation (if it has a poster) is cached.
      if (animPending((activeRef.current + 1) % slideCount)) return
      setActive((prev) => (prev + 1) % slideCount)
      setAdvanced(true)
    }
    id = window.setTimeout(tick, Math.max(0, ADVANCE_MS - (Date.now() - countdownStartRef.current)))
    return () => clearTimeout(id)
    // quick first advance / clip-driven advance: restart the countdown so the
    // next slide gets its full 5.5s
  }, [ready, inView, slideCount, openingOn, hoverPaused, quickAdvanced, timerKick])

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

  // Poster / clip box inside the clip slide (see introVideo): the static image's
  // object-contain width is --intro-cw; the frame is scaled so its printer
  // bbox spans that width and centred on it.
  const introMedia: CSSProperties | undefined = introVideo && (() => {
    const [fw, fh] = introVideo.frame
    const [x0, y0, x1, y1] = introVideo.box
    const kw = 1 / (x1 - x0)
    const kh = (kw * fh) / fw
    return {
      width: `calc(var(--intro-cw) * ${kw})`,
      height: `calc(var(--intro-cw) * ${kh})`,
      transform: `translate(-50%, -50%) translate(calc(var(--intro-cw) * ${(0.5 - (x0 + x1) / 2) * kw}), calc(var(--intro-cw) * ${(0.5 - (y0 + y1) / 2) * kh}))`,
    }
  })()

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
              ...fitVars(sizeCoefficients?.[0] ?? 1, mobileSizeCoefficients?.[0]),
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
              ...fitVars(coef(0), mobileSizeCoefficients?.[0]),
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
          const opacity = config.opacity[tier]
          const translateX = peekX(tier, coef(i))
          const translateY = config.translateY[tier] + (verticalBias?.[i] ?? 0)
          const zIndex = config.zIndex[tier]
          const stateClass =
            tier === 0 && 'activeClass' in config
              ? ` ${config.activeClass}${advanced ? ` ${config.enterClass}` : ''}`
              : ''
          const slideTransform = `translate(-50%, -50%) translateX(${translateX}%) translateY(${translateY}%) scale(calc(${scale} * var(--slide-fit, 1)))`

          if (i === clipAt && introVideo && introMedia) {
            // Print-clip slide: the slot moves through the queue like
            // any slide; inside it the poster (clip frame 0) and the clip share
            // one CSS-computed box, so the hand-over is pixel-exact. The static
            // image is only for Apple WebKit / reduced motion (CSS, from the
            // first paint) and a failed clip (data-vid="off").
            return (
              <div
                key={src}
                className={config.slideClass + stateClass + ' hero-intro-slide'}
                data-tier={tier}
                data-vid={introOn ? undefined : 'off'}
                data-started={introStarted ? '' : undefined}
                style={{
                  transform: slideTransform,
                  opacity,
                  zIndex,
                  ...fitVars(sizeCoefficients?.[i] ?? 1, mobileSizeCoefficients?.[i]),
                  ['--intro-cw' as string]: `min(100cqw, ${introVideo.photoAspect} * 100cqh)`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" aria-hidden="true" loading="lazy" className="hero-intro-photo" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={introVideo.poster}
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                  className="hero-intro-media hero-intro-poster"
                  style={introMedia}
                />
                {introLoad && introOn && (
                  <video
                    ref={videoRef}
                    src={introVideo.src}
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    className="hero-intro-media"
                    style={introMedia}
                    onCanPlayThrough={() => setIntro((s) => (s === 'wait' ? 'ready' : s))}
                    onPlaying={() => setIntroStarted(true)}
                    onEnded={() => setIntro('ended')}
                    onError={introFail}
                  />
                )}
                {tier === 0 && introOn && !openingOn && (
                  <HeroSpotlight
                    src={introVideo.poster}
                    depth={introVideo.depth}
                    className="hero-intro-media"
                    style={introMedia}
                    hide=".hero-intro-poster, video"
                    live={() => (introStartedRef.current ? videoRef.current : null)}
                  />
                )}
              </div>
            )
          }

          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={frontAnim?.i === i ? frontAnim.url : stillFor(i) ?? stillOf(i) ?? src}
              alt=""
              aria-hidden="true"
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              className={config.slideClass + stateClass}
              data-tier={tier}
              style={{
                transform: slideTransform,
                opacity,
                zIndex,
                ...fitVars(sizeCoefficients?.[i] ?? 1, mobileSizeCoefficients?.[i]),
              }}
            />
          )
        })}
        {spotlights[active] && !openingOn && !(active === 0 && posterSrc && !slide0Ready) &&
          !(active === clipAt && introOn) && (
          <HeroSpotlight
            key={active}
            src={spotlights[active]!.src}
            depth={spotlights[active]!.depth}
            hide={active === clipAt ? '[data-tier="0"] .hero-intro-photo' : undefined}
            className={config.slideClass + ('activeClass' in config ? ` ${config.activeClass}` : '')}
            style={{
              transform: `translate(-50%, -50%) translateX(${peekX(0, coef(active))}%) translateY(${
                config.translateY[0] + (verticalBias?.[active] ?? 0)
              }%) scale(calc(${config.scale[0] * coef(active)} * var(--slide-fit, 1)))`,
              zIndex: config.zIndex[0] + 1,
              ...fitVars(coef(active), mobileSizeCoefficients?.[active]),
            }}
          />
        )}
      </div>
    </div>
  )
}
