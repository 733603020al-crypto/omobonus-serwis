'use client'

import { useState, useSyncExternalStore } from 'react'
import { HeroPrinterCarousel } from '@/components/hero-printer-carousel'
import { AnimatedPart, type HeroMid } from '@/components/sections/home-hero-showcase'

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

export function PrinterHubCarousel({ alt, slides }: { alt: string; slides: string[] }) {
  return <HeroPrinterCarousel alt={alt} variant="home" slides={slides} onActiveChange={(i) => setCurrent(Math.max(i, 0))} />
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
  return (
    <>
      <AnimatedPart text={mid.parts[0]} mode={shown.mode} />
      <AnimatedPart text={second} mode={shown.mode} delay={shown.mode === 'letters' ? firstLen * 32 : 0} />
    </>
  )
}
