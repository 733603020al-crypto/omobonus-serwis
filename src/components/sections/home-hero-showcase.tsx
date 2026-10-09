'use client'

import '@/app/styles/service-hero.css'
import '@/app/styles/home-hero-words.css'
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { HeroPrinterCarousel } from '@/components/hero-printer-carousel'
import { GOLD_CTA, GOLD_CTA_SIZE_HERO } from '@/components/ui/gold-cta'
import { ATRAMENT_PRINT_CLIP } from '@/lib/atrament-print-clip'

// Home hero: the same stack carousel as the service pages (image left, text
// right), fed with the first slide of each service page. The middle H1 line
// swaps its words in sync with the active slide.

// Order: laptop, desktop PC, laser, inkjet, dot-matrix, label, 3D, plotter,
// plastic-card printer, shredder, UPS.
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
  '/images/karty-carousel-v1-03.webp',
  '/images/niszczarki-carousel-v2-06.webp',
  '/images/ups-carousel-v1-01.webp',
]
// Same on-screen size as on each service page (its own HERO_SCALE box and
// slide-0 coefficient), recalculated for this 1.2 box.
const SIZE_COEFFICIENTS = [0.87, 0.69, 0.85, 0.72, 0.85, 0.85, 0.73, 0.97, 0.85, 0.95, 0.74]
const VERTICAL_BIAS = [0, 0, 4, 0, 4, 4, 4, 0, 4, 13, 0]
// Desktop PC: static picture holds the slide's place, the animation loads only
// when that slide is next up (see HeroPrinterCarousel).
const SLIDE_POSTERS = [undefined, '/images/02_serwis-komputerow-stacjonarnych-static.webp']
// Phones get the same PC animation at 483×600 (~450KB instead of ~650KB).
const MOBILE_SLIDE_ANIMS = [undefined, '/images/02_serwis-komputerow-stacjonarnych-mobile.webp']
// First open only: light cracked-screen laptop (slide 1 of /uslugi/serwis-laptopow)
// in front, empty middle H1 line; no fixed minimum: as soon as the page and the laptop animation are
// cached it gives way to slide 0 and never returns.
const OPENING = { src: '/images/laptop-carousel/laptop-carousel-v2-01.webp', minMs: 0 }
const OPENING_MID: HeroMid = { group: 'opening', parts: [' ', ''] }
// Inkjet slide plays the print clip from /uslugi/serwis-drukarek-atramentowych
// (its static image stays only as the Safari / failed-clip fallback) and the
// carousel moves on at the clip's end instead of the 5.5s timer.
const INKJET_SLIDE = 3
// Service page opened by a click on the picture or the heading, per slide.
const SLUGS = [
  'serwis-laptopow',
  'serwis-komputerow-stacjonarnych',
  'serwis-drukarek-laserowych',
  'serwis-drukarek-atramentowych',
  'serwis-drukarek-iglowych',
  'serwis-drukarek-termicznych',
  'serwis-drukarek-3d',
  'serwis-plotterow',
  'serwis-drukarek-do-kart-plastikowych',
  'serwis-niszczarek',
  'naprawa-zasilaczy-ups',
]

export interface HeroMid {
  /** Device group — a group change animates the whole line letter by letter,
      a change inside the group only swaps the part that differs. */
  group: string
  parts: readonly [string, string]
}

type Mode = 'letters' | 'cycle'

export function AnimatedPart({ text, mode, delay = 0, fit = 1 }: { text: string; mode: Mode; delay?: number; fit?: number }) {
  const [shown, setShown] = useState({ cur: text, prev: null as string | null, gen: 0, mode })
  const [width, setWidth] = useState<number | undefined>(undefined)
  const inRef = useRef<HTMLSpanElement>(null)

  if (text !== shown.cur) {
    setShown({ cur: text, prev: shown.cur, gen: shown.gen + 1, mode })
  }

  useLayoutEffect(() => {
    if (inRef.current) setWidth(inRef.current.offsetWidth)
  }, [shown.cur, fit])

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
  basePath = '/uslugi',
  cta,
}: {
  /** Full H1 text for search engines/screen readers (unchanged SEO heading). */
  h1: string
  line1: string
  line3: string
  mids: readonly HeroMid[]
  alt: string
  /** Locale prefix of the service pages, e.g. /uk/uslugi. */
  basePath?: string
  /** "Szybki kontakt" button under the H1 — same as the home CTA section, ~10% larger. */
  cta?: { label: ReactNode; href: string }
}) {
  // -1 = the one-time opening slide (see OPENING)
  const [active, setActive] = useState(-1)
  const [prevGroup, setPrevGroup] = useState(OPENING_MID.group)
  const [mode, setMode] = useState<Mode>('cycle')
  const mid = active < 0 ? OPENING_MID : mids[active % mids.length]

  const onActiveChange = (i: number) => {
    const next = i < 0 ? OPENING_MID : mids[i % mids.length]
    setMode(next.group === prevGroup ? 'cycle' : 'letters')
    setPrevGroup(next.group)
    setActive(i)
  }

  const second = mid.parts[1] ? ` ${mid.parts[1]}` : ''
  const firstLen = Array.from(mid.parts[0]).length

  // Long middle lines (plastic-card printers, UPS — mostly UK/RU) shrink to fit:
  // max 720px on desktop (≈ the widest older line), the text column's width on phones.
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
    const max = window.innerWidth >= 768 ? 720 : column.clientWidth
    setFit(Math.min(1, max / el.offsetWidth))
  }, [mid, vw])
  // Plain link without prefetch — nothing extra is loaded until the click.
  const href = `${basePath}/${SLUGS[Math.max(active, 0) % SLUGS.length]}`
  const labelMid = active < 0 ? mids[0] : mid
  const label = `${line1} ${labelMid.parts[0]}${labelMid.parts[1] ? ` ${labelMid.parts[1]}` : ''}`

  return (
    <div className="container max-w-4xl mx-auto px-4 md:px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
        <div className="service-hero-zone flex justify-center items-center h-[300px] md:h-[400px] md:self-center">
          <Link href={href} prefetch={false} aria-label={label} className="service-hero-image-wrap home-hero-carousel-wrap service-hero-carousel relative shrink-0 block cursor-pointer" style={{ width: '120%', height: '120%' }}>
            <HeroPrinterCarousel
              alt={alt}
              variant="home"
              slides={SLIDES}
              sizeCoefficients={SIZE_COEFFICIENTS}
              verticalBias={VERTICAL_BIAS}
              slidePosters={SLIDE_POSTERS}
              mobileSlideAnims={MOBILE_SLIDE_ANIMS}
              opening={OPENING}
              introVideo={ATRAMENT_PRINT_CLIP}
              animationSlideIndex={INKJET_SLIDE}
              onActiveChange={onActiveChange}
            />
          </Link>
        </div>
        <div className="text-center flex flex-col items-center justify-center relative z-10 order-first md:order-none">
          <h1 className="font-cormorant font-bold text-[#ffffff] max-w-[90vw] md:max-w-none md:w-[470px] text-[clamp(28px,10.6vw,47px)] md:text-[60px] leading-[1.15] max-md:leading-[1.05]">
            <span className="sr-only">{h1}</span>
            <Link href={href} prefetch={false} tabIndex={-1} aria-hidden="true" className="block cursor-pointer">
              <span className="block w-full text-center whitespace-nowrap text-[0.93em] md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)]">{line1}</span>
              <span className="block w-full text-center whitespace-nowrap md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)]" style={fit < 1 ? { fontSize: `${fit}em` } : undefined}>
                <AnimatedPart text={mid.parts[0]} mode={mode} fit={fit} />
                <AnimatedPart text={second} mode={mode} delay={mode === 'letters' ? firstLen * 32 : 0} fit={fit} />
              </span>
              <span ref={measureRef} aria-hidden="true" className="fixed left-0 top-0 invisible whitespace-nowrap pointer-events-none">{mid.parts[0]}{second}</span>
              <span className="block w-full text-center whitespace-nowrap text-[0.78em] md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)]">{line3}</span>
            </Link>
          </h1>
          {cta && (
            <Link
              href={cta.href}
              prefetch={false}
              className={`max-md:!hidden mt-4 md:mt-8 ${GOLD_CTA} ${GOLD_CTA_SIZE_HERO}`}
            >
              <span className="gold-text-sweep">{cta.label}</span>
              <ChevronRight className="w-[18px] h-[18px]" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
