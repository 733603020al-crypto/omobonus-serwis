'use client'

import { useEffect, useState } from 'react'

// Stack carousel used in service-page hero zones (originally built for
// /uslugi/naprawa-drukarek, now also reused for /uslugi/serwis-laptopow via
// the `variant` prop below). Only transform + opacity are animated
// (GPU-friendly, no reflow), advance interval is paused entirely under
// prefers-reduced-motion. `slides` is supplied by the caller so this
// component holds no page-specific image list itself.
const ADVANCE_MS = 3800

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
    opacity: [1, 0.85, 0.65, 0],
    translateX: [0, -68, -76, -95],
    translateY: [0, -8, -16, -24],
    zIndex: [16, 15, 14, 13],
  },
  laptop: {
    bleedClass: 'hero-laptop-carousel-bleed',
    boxClass: 'hero-laptop-carousel',
    slideClass: 'hero-laptop-carousel-slide',
    scale: [1, 0.52, 0.42, 0.32],
    opacity: [1, 0.85, 0.65, 0],
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
}: {
  slides: string[]
  alt: string
  variant?: CarouselVariant
}) {
  const [active, setActive] = useState(0)
  const [ready, setReady] = useState(false)
  const config = VARIANT_CONFIG[variant]
  const slideCount = slides.length

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

  useEffect(() => {
    if (!ready) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % slideCount)
    }, ADVANCE_MS)
    return () => clearInterval(id)
  }, [ready, slideCount])

  return (
    // Outer "bleed" box: purely a wider, non-clipping paint-containment
    // boundary (content-visibility:auto needs an ancestor box big enough to
    // hold everything it contains, or it clips at its own edge). Sized in
    // service-hero.css from the exact overflow math below — does not affect
    // the inner carousel's own size, so slide sizing/position/speed stay
    // identical to before.
    <div className={config.bleedClass}>
      <div className={config.boxClass} role="img" aria-label={alt}>
        {slides.map((src, i) => {
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
          const scale = config.scale[tier]
          const opacity = config.opacity[tier]
          const translateX = config.translateX[tier]
          const translateY = config.translateY[tier]
          const zIndex = config.zIndex[tier]

          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              className={config.slideClass}
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
