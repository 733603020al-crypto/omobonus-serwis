'use client'

import { useEffect, useState } from 'react'

// Stack carousel for the /uslugi/naprawa-drukarek hero: reuses the same
// category hero images already used on their own service pages (no new
// assets). Only transform + opacity are animated (GPU-friendly, no reflow),
// advance interval is paused entirely under prefers-reduced-motion.
const SLIDES = [
  '/images/04_serwis-drukarek-laserowych.webp',
  '/images/05_serwis-drukarek-atramentowych.webp',
  '/images/07_serwis-drukarek-iglowych.webp',
  '/images/06_serwis-drukarek-termicznych.webp',
  '/images/08_serwis-ploterow.webp',
  '/images/Serwis_i_Naprawa_Drukarek_3D.webp',
]

const ADVANCE_MS = 3800
const SLIDE_COUNT = SLIDES.length

// Loads only the active slide eagerly (LCP candidate); the other 5 are
// fetched in the background after the page finishes loading (window "load"
// + requestIdleCallback, so they never compete with the LCP image or main
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

export function HeroPrinterCarousel({ alt }: { alt: string }) {
  const [active, setActive] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    let idleHandle: number | undefined

    const runPreload = () => {
      preloadImages(SLIDES.slice(1)).then(() => {
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
  }, [])

  useEffect(() => {
    if (!ready) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDE_COUNT)
    }, ADVANCE_MS)
    return () => clearInterval(id)
  }, [ready])

  return (
    // Outer "bleed" box: purely a wider, non-clipping paint-containment
    // boundary (content-visibility:auto needs an ancestor box big enough to
    // hold everything it contains, or it clips at its own edge). Sized in
    // service-hero.css from the exact overflow math below — does not affect
    // the inner carousel's own size, so slide sizing/position/speed stay
    // identical to before.
    <div className="hero-printer-carousel-bleed">
      <div className="hero-printer-carousel" role="img" aria-label={alt}>
        {SLIDES.map((src, i) => {
          // Before preloading finishes, active stays 0 (the interval below is
          // gated on `ready`), so only the first slide needs to be in the DOM —
          // it renders exactly like a normal hero image, full priority, no wait.
          if (i !== 0 && !ready) return null

          // Forward-only queue position (0 = active, 1/2 = next two waiting
          // in the stack, 3+ = further back, invisible). Unlike a symmetric
          // left/right carousel, there's no separate "previous" side: on
          // advance, delta=0 jumps straight to the back of the queue
          // (delta=SLIDE_COUNT-1), so the 900ms transition below carries it
          // from front-center out to the hidden back position by itself —
          // exactly the "current slides out and shrinks" motion, with no
          // extra exit state needed.
          const delta = ((i - active) % SLIDE_COUNT + SLIDE_COUNT) % SLIDE_COUNT
          // Active: same 1.54x used by the previous carousel (0.78*1.54=1.2012
          // of the zone, matching serwis-drukarek-laserowych's visual size).
          // The two behind it now step back-left (not straight behind) so they
          // read as a queue: each translateX solved against the active slide's
          // own left edge (-0.6006 of the container, from 0.78*1.54/2) so that
          // roughly 35-50% of its own width stays clear of the active slide —
          // delta=1 at -68% leaves ~39% visible, delta=2 at -76% (smaller, so
          // less overlap despite the bigger shift) leaves ~48% visible.
          const scale = delta === 0 ? 1.54 : delta === 1 ? 0.8 : delta === 2 ? 0.64 : 0.5
          const opacity = delta === 0 ? 1 : delta === 1 ? 0.85 : delta === 2 ? 0.65 : 0
          const translateX = delta === 0 ? 0 : delta === 1 ? -68 : delta === 2 ? -76 : -95
          const translateY = delta === 0 ? 0 : delta === 1 ? -8 : delta === 2 ? -16 : -24
          const zIndex = delta === 0 ? 16 : delta === 1 ? 15 : delta === 2 ? 14 : 13

          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              className="hero-printer-carousel-slide"
              style={{
                transform: `translate(-50%, -50%) translateX(${translateX}%) translateY(${translateY}%) scale(${scale})`,
                opacity,
                zIndex,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
