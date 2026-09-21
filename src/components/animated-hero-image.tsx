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

// Progressive loading for a heavy animated-WebP hero, same on every screen size:
// - Everyone (mobile and desktop) starts on the lightweight static first-frame
//   fallback (fast LCP, small transfer), then swaps to the animated file only
//   after window "load", so it never competes with the page's own
//   critical-path loading.
// - prefers-reduced-motion: keeps the static frame and never fetches the
//   animation at all, on any screen size.
// - If the animated file fails to load, the static frame simply stays put.
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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={staticSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      fetchPriority="high"
    />
  )
}
