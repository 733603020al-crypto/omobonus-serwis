'use client'

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { HeroPrinterCarousel } from '@/components/hero-printer-carousel'
import { AnimatedPart, type HeroMid } from '@/components/sections/home-hero-showcase'
import { ATRAMENT_PRINT_CLIP } from '@/lib/atrament-print-clip'

// /uslugi/naprawa-drukarek hero: the carousel (image column) and the middle H1
// line (text column) live in different parts of the server template, so the
// active slide index is shared through this tiny module-level store. The word
// swap itself is the home hero's AnimatedPart — same look, speed and group logic.

let current = 0
const listeners = new Set<() => void>()
const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
const setCurrent = (i: number) => {
  current = i
  listeners.forEach((l) => l())
}

// Slide 1 (inkjet) plays the print clip from /uslugi/serwis-drukarek-atramentowych;
// its static image stays only as the Safari / failed-clip fallback.
const INKJET_SLIDE = 1

export function PrinterHubCarousel({ alt, slides }: { alt: string; slides: string[] }) {
  return (
    <HeroPrinterCarousel
      alt={alt}
      variant="home"
      slides={slides}
      introVideo={ATRAMENT_PRINT_CLIP}
      animationSlideIndex={INKJET_SLIDE}
      onActiveChange={(i) => setCurrent(Math.max(i, 0))}
    />
  )
}

export function PrinterHubMid({ mids }: { mids: readonly HeroMid[] }) {
  const active = useSyncExternalStore(subscribe, () => current, () => 0)
  const [shown, setShown] = useState({ i: active, mode: 'cycle' as 'letters' | 'cycle' })
  if (shown.i !== active) {
    const same = mids[active % mids.length].group === mids[shown.i % mids.length].group
    setShown({ i: active, mode: same ? 'cycle' : 'letters' })
  }
  const mid = mids[active % mids.length]
  const second = mid.parts[1] ? ` ${mid.parts[1]}` : ''
  const firstLen = Array.from(mid.parts[0]).length

  // Phones only: a line wider than the text column (plastic-card printers)
  // shrinks to fit; desktop keeps the full size, as on the home hero.
  const [fit, setFit] = useState(1)
  const [vw, setVw] = useState(0)
  const measureRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize)
    document.fonts?.ready.then(onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  useLayoutEffect(() => {
    const el = measureRef.current
    const column = el?.closest('h1')?.parentElement
    if (!el || !column) return
    setFit(window.innerWidth >= 768 ? 1 : Math.min(1, column.clientWidth / el.offsetWidth))
  }, [mid, vw])

  return (
    <>
      <span style={fit < 1 ? { fontSize: `${fit}em` } : undefined}>
        <AnimatedPart text={mid.parts[0]} mode={shown.mode} fit={fit} />
        <AnimatedPart text={second} mode={shown.mode} delay={shown.mode === 'letters' ? firstLen * 32 : 0} fit={fit} />
      </span>
      <span ref={measureRef} aria-hidden="true" className="fixed left-0 top-0 invisible whitespace-nowrap pointer-events-none">{mid.parts[0]}{second}</span>
    </>
  )
}
