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
          const scale = delta === 0 ? 1.54 : delta === 1 ? 0.86 : delta === 2 ? 0.7 : 0.55
          const opacity = delta === 0 ? 1 : delta === 1 ? 0.8 : delta === 2 ? 0.55 : 0
          const translateX = delta === 0 ? 0 : delta === 1 ? 30 : delta === 2 ? 50 : 62
          const translateY = delta === 0 ? 0 : delta === 1 ? -6 : delta === 2 ? -11 : -15
          const zIndex = delta === 0 ? 16 : delta === 1 ? 15 : delta === 2 ? 14 : 13

          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
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
