'use client'

import { useEffect, useRef } from 'react'

interface AnimatedHeroImageProps {
  animatedSrc: string
  staticSrc: string
  alt: string
  width: number
  height: number
  className: string
}

// Mobile-first progressive loading for a heavy animated-WebP hero:
// - Desktop (>=768px) gets the animated file directly via <picture><source>,
//   fetched immediately at the browser level — identical to a plain <img>,
//   no JS gating, no flash.
// - Mobile starts on the lightweight static first-frame fallback (fast LCP),
//   then swaps to the animated file only after window "load", so it never
//   competes with the page's own critical-path loading.
// - prefers-reduced-motion: mobile keeps the static frame and never fetches
//   the animation at all.
export function AnimatedHeroImage({
  animatedSrc,
  staticSrc,
  alt,
  width,
  height,
  className,
}: AnimatedHeroImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (window.matchMedia('(min-width: 768px)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    const swap = () => {
      const preload = new window.Image()
      preload.onload = () => {
        if (!cancelled && imgRef.current) imgRef.current.src = animatedSrc
      }
      preload.src = animatedSrc
    }

    if (document.readyState === 'complete') {
      swap()
      return () => {
        cancelled = true
      }
    }

    window.addEventListener('load', swap, { once: true })
    return () => {
      cancelled = true
      window.removeEventListener('load', swap)
    }
  }, [animatedSrc])

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={animatedSrc} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={staticSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        fetchPriority="high"
      />
    </picture>
  )
}
