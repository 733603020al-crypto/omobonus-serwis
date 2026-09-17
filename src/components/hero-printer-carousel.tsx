'use client'

import { useEffect, useState } from 'react'

// Center-active carousel for the /uslugi/naprawa-drukarek hero: reuses the
// same category hero images already used on their own service pages (no new
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

export function HeroPrinterCarousel({ alt }: { alt: string }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDE_COUNT)
    }, ADVANCE_MS)
    return () => clearInterval(id)
  }, [])

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
          const raw = i - active
          let delta = ((raw % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT
          if (delta > SLIDE_COUNT / 2) delta -= SLIDE_COUNT
          const abs = Math.abs(delta)
          // Active slide only: 1.54x matches the ~1.2x-of-zone visual size
          // used on e.g. serwis-drukarek-laserowych (0.78 * 1.54 = 1.2012),
          // now that the carousel's bleed box (service-hero.css) is allowed
          // to extend vertically too, same principle as that page's own
          // hero wrap overflowing its zone. Side slides are left untouched.
          const scale = delta === 0 ? 1.54 : abs === 1 ? 0.62 : 0.42
          const opacity = delta === 0 ? 1 : abs === 1 ? 0.55 : 0
          // 77% (was 65%): own box is 78% of the container, center's rendered
          // half-width is 0.78*1.54/2=0.6006, side's rendered half-width is
          // 0.78*0.62/2=0.2418 — solving shift-0.2418 = 0.6006-0.2418 (edges
          // meet at the midpoint of the side slide) gives shift=0.6006, i.e.
          // t=0.6006/0.78=0.77, for exactly 50% of each side slide visible.
          const translateX = delta * 77

          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              className="hero-printer-carousel-slide"
              style={{
                transform: `translate(-50%, -50%) translateX(${translateX}%) scale(${scale})`,
                opacity,
                zIndex: 10 - abs,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
