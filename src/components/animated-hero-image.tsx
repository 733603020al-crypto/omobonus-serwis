'use client'

import { useEffect, useRef } from 'react'

const ANIM_DELAY_MS = 2500

interface AnimatedHeroImageProps {
  animatedSrc: string
  // Optional smaller animated file for phones (same frames/timing), used on
  // screens narrower than md.
  mobileAnimatedSrc?: string
  staticSrc: string
  alt: string
  width: number
  height: number
  className: string
}

// Progressive loading for a heavy animated-WebP hero, same on every screen size:
// - Everyone (mobile and desktop) starts on the lightweight static first-frame
//   fallback (fast LCP, small transfer), then swaps to the animated file only
//   once the browser is idle after window "load" plus ANIM_DELAY_MS (same
//   timing as OutsourcingItHero), so it never competes with the page's own
//   critical-path loading or hydration.
// - prefers-reduced-motion: keeps the static frame and never fetches the
//   animation at all, on any screen size.
// - If the animated file fails to load, the static frame simply stays put.
export function AnimatedHeroImage({
  animatedSrc,
  mobileAnimatedSrc,
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
      const src = mobileAnimatedSrc && window.matchMedia('(max-width: 767px)').matches ? mobileAnimatedSrc : animatedSrc
      const preload = new window.Image()
      preload.onload = () => {
        if (!cancelled && imgRef.current) imgRef.current.src = src
      }
      preload.src = src
    }

    let timer = 0
    let idle = 0
    const start = () => {
      const later = () => {
        timer = window.setTimeout(swap, ANIM_DELAY_MS)
      }
      if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(later, { timeout: 3000 })
      else later()
    }

    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => {
      cancelled = true
      window.removeEventListener('load', start)
      window.clearTimeout(timer)
      if (idle) window.cancelIdleCallback(idle)
    }
  }, [animatedSrc, mobileAnimatedSrc])

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
