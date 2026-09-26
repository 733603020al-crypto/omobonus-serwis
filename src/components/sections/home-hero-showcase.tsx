'use client'

import '@/app/styles/service-hero.css'
import '@/app/styles/home-hero-words.css'
import { useLayoutEffect, useRef, useState } from 'react'
import { HeroPrinterCarousel } from '@/components/hero-printer-carousel'

// Home hero: the same stack carousel as the service pages (image left, text
// right), fed with the first slide of each service page. The middle H1 line
// swaps its words in sync with the active slide.

// Order: laptop, desktop PC, laser, inkjet, dot-matrix, label, 3D, plotter.
// Slides 0/1/6 are the animated heroes from their own service pages.
const SLIDES = [
  '/images/serwis-laptopow-hero-animated.webp',
  '/images/02_serwis-komputerow-stacjonarnych.webp',
  '/images/laser-carousel-v3-01.webp',
  '/images/atrament-carousel-v3-01.webp',
  '/images/iglowe-carousel-v3-01.webp',
  '/images/termiczne-carousel-v3-01.webp',
  '/images/Serwis_i_Naprawa_Drukarek_3D.webp',
  '/images/plotter-carousel-v3-00.webp',
]
// Same on-screen size as on each service page (its own HERO_SCALE box and
// slide-0 coefficient), recalculated for this 1.2 box.
const SIZE_COEFFICIENTS = [0.87, 0.69, 0.85, 0.72, 0.85, 0.85, 0.73, 0.97]
const VERTICAL_BIAS = [0, 0, 4, 0, 4, 4, 4, 0]
const LAPTOP_POSTER = '/images/serwis-laptopow-hero-static-v2.webp'

export interface HeroMid {
  /** Device group — a group change animates the whole line letter by letter,
      a change inside the group only swaps the part that differs. */
  group: string
  parts: readonly [string, string]
}

type Mode = 'letters' | 'cycle'

function AnimatedPart({ text, mode, delay = 0 }: { text: string; mode: Mode; delay?: number }) {
  const [shown, setShown] = useState({ cur: text, prev: null as string | null, gen: 0, mode })
  const [width, setWidth] = useState<number | undefined>(undefined)
  const inRef = useRef<HTMLSpanElement>(null)

  if (text !== shown.cur) {
    setShown({ cur: text, prev: shown.cur, gen: shown.gen + 1, mode })
  }

  useLayoutEffect(() => {
    if (inRef.current) setWidth(inRef.current.offsetWidth)
  }, [shown.cur])

  const letters = (t: string, cls: string, step: number) =>
    Array.from(t).map((ch, i) => (
      <span key={i} className={cls} style={{ animationDelay: `${delay + i * step}ms` }}>
        {ch === ' ' ? ' ' : ch}
      </span>
    ))

  return (
    <span className="hero-word" style={width !== undefined ? { width } : undefined}>
      {shown.prev !== null && (
        <span key={`out-${shown.gen}`} className="hero-word-out" aria-hidden="true">
          {shown.mode === 'letters'
            ? letters(shown.prev, 'hero-letter-out', 18)
            : <span className="hero-cycle-out">{shown.prev.replace(/ /g, ' ')}</span>}
        </span>
      )}
      <span key={`in-${shown.gen}`} ref={inRef} className="hero-word-in">
        {shown.gen === 0
          ? shown.cur.replace(/ /g, ' ')
          : shown.mode === 'letters'
            ? letters(shown.cur, 'hero-letter-in', 32)
            : <span className="hero-cycle-in">{shown.cur.replace(/ /g, ' ')}</span>}
      </span>
    </span>
  )
}

export function HomeHeroShowcase({
  h1,
  line1,
  line3,
  mids,
  alt,
}: {
  /** Full H1 text for search engines/screen readers (unchanged SEO heading). */
  h1: string
  line1: string
  line3: string
  mids: readonly HeroMid[]
  alt: string
}) {
  const [active, setActive] = useState(0)
  const [prevGroup, setPrevGroup] = useState(mids[0].group)
  const [mode, setMode] = useState<Mode>('cycle')
  const mid = mids[active % mids.length]

  const onActiveChange = (i: number) => {
    const next = mids[i % mids.length]
    setMode(next.group === prevGroup ? 'cycle' : 'letters')
    setPrevGroup(next.group)
    setActive(i)
  }

  const second = mid.parts[1] ? ` ${mid.parts[1]}` : ''
  const firstLen = Array.from(mid.parts[0]).length

  return (
    <div className="container max-w-4xl mx-auto px-4 md:px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
        <div className="flex justify-center items-center h-[300px] md:h-[400px] md:self-center">
          <div className="service-hero-image-wrap relative shrink-0" style={{ width: '120%', height: '120%' }}>
            <HeroPrinterCarousel
              alt={alt}
              slides={SLIDES}
              sizeCoefficients={SIZE_COEFFICIENTS}
              verticalBias={VERTICAL_BIAS}
              posterSrc={LAPTOP_POSTER}
              onActiveChange={onActiveChange}
            />
          </div>
        </div>
        <div className="text-center flex flex-col items-center justify-center relative z-10 mt-14 md:mt-0">
          <h1 className="font-cormorant font-bold text-[#ffffff] md:w-[470px] text-[clamp(26px,8vw,40px)] md:text-[52px] leading-[1.15]">
            <span className="sr-only">{h1}</span>
            <span aria-hidden="true">
              <span className="block w-full text-center whitespace-nowrap md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)]">{line1}</span>
              <span className="block w-full text-center whitespace-nowrap md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)]">
                <AnimatedPart text={mid.parts[0]} mode={mode} />
                <AnimatedPart text={second} mode={mode} delay={mode === 'letters' ? firstLen * 32 : 0} />
              </span>
              <span className="block w-full text-center whitespace-nowrap md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)]">{line3}</span>
            </span>
          </h1>
        </div>
      </div>
    </div>
  )
}
