'use client'

import { useEffect, useRef } from 'react'

const ANIM_DELAY_MS = 2500

interface OutsourcingItHeroProps {
  // Static-first, same as AnimatedHeroImage: the page paints a single
  // lightweight first frame (staticSrc = clean background + the orbit dots
  // exactly as in overlay frame 0). After window "load" the clean background
  // (baseSrc, no moving dots/trails) and the transparent 40-frame overlay with
  // only the moving dots/arcs are preloaded and decoded, then both are swapped
  // in within the same task, so the picture continues from frame 0 without a
  // jump and without doubled dots. prefers-reduced-motion keeps the static
  // frame and never fetches the animation; on any load error it stays put too.
  staticSrc: string
  baseSrc: string
  overlaySrc: string
  alt: string
  width: number
  height: number
  className: string
}

export function OutsourcingItHero({
  staticSrc,
  baseSrc,
  overlaySrc,
  alt,
  width,
  height,
  className,
}: OutsourcingItHeroProps) {
  const baseRef = useRef<HTMLImageElement>(null)
  const overlayRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    const preload = (src: string) => {
      const img = new window.Image()
      img.src = src
      return img.decode()
    }
    const swap = () => {
      Promise.all([preload(baseSrc), preload(overlaySrc)])
        .then(() => {
          if (cancelled || !baseRef.current || !overlayRef.current) return
          baseRef.current.src = baseSrc
          overlayRef.current.src = overlaySrc
          overlayRef.current.hidden = false
        })
        .catch(() => {})
    }
    // Every screen size: the static frame alone is the whole first screen; the ~430KB of
    // base + overlay wait until the browser is idle after "load" plus
    // ANIM_DELAY_MS, so they never share the first seconds with the page.
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
  }, [baseSrc, overlaySrc])

  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={baseRef}
        src={staticSrc}
        alt={alt}
        width={width}
        height={height}
        className="absolute inset-0 w-full h-full object-contain"
        fetchPriority="high"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={overlayRef}
        alt=""
        aria-hidden="true"
        hidden
        width={width}
        height={height}
        className="absolute inset-0 w-full h-full object-contain"
      />
    </div>
  )
}
