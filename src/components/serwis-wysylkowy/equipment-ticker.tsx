'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { SERVICE_CATEGORIES, type ServiceLocale as Locale } from '@/config/service-categories'

const ORDER = [
  'serwis-laptopow',
  'serwis-komputerow-stacjonarnych',
  'serwis-drukarek-laserowych',
  'serwis-drukarek-atramentowych',
  'serwis-drukarek-iglowych',
  'serwis-drukarek-termicznych',
  'serwis-drukarek-3d',
  'serwis-drukarek-sublimacyjnych',
  'serwis-drukarek-dtf',
  'serwis-drukarek-dtg',
  'serwis-drukarek-spozywczych',
  'serwis-drukarek-do-kart-plastikowych',
  'serwis-niszczarek',
  'naprawa-zasilaczy-ups',
  'naprawa-projektorow',
  'serwis-ekspresow-do-kawy',
] as const

const LABELS_OLD: Record<(typeof ORDER)[number], string> = {
  'serwis-laptopow': 'Laptopów',
  'serwis-komputerow-stacjonarnych': 'Komputerów stacjonarnych',
  'serwis-drukarek-laserowych': 'Drukarek laserowych',
  'serwis-drukarek-atramentowych': 'Drukarek atramentowych',
  'serwis-drukarek-iglowych': 'Drukarek igłowych',
  'serwis-drukarek-termicznych': 'Drukarek etykiet termicznych',
  'serwis-drukarek-3d': 'Drukarek 3D',
  'serwis-drukarek-sublimacyjnych': 'Drukarek sublimacyjnych',
  'serwis-drukarek-dtf': 'Drukarek DTF',
  'serwis-drukarek-dtg': 'Drukarek DTG',
  'serwis-drukarek-spozywczych': 'Drukarek spożywczych',
  'serwis-drukarek-do-kart-plastikowych': 'Drukarek do kart plastikowych',
  'serwis-niszczarek': 'Niszczarki',
  'naprawa-zasilaczy-ups': 'Zasilaczy UPS',
  'naprawa-projektorow': 'Projektorów',
  'serwis-ekspresow-do-kawy': 'Ekspresów do kawy',
}

const LABELS: Record<(typeof ORDER)[number], string> = {
  'serwis-laptopow': 'Laptop\u00F3w',
  'serwis-komputerow-stacjonarnych': 'Komputer\u00F3w stacjonarnych',
  'serwis-drukarek-laserowych': 'Drukarek laserowych',
  'serwis-drukarek-atramentowych': 'Drukarek atramentowych',
  'serwis-drukarek-iglowych': 'Drukarek ig\u0142owych',
  'serwis-drukarek-termicznych': 'Drukarek etykiet termicznych',
  'serwis-drukarek-3d': 'Drukarek 3D',
  'serwis-drukarek-sublimacyjnych': 'Drukarek sublimacyjnych',
  'serwis-drukarek-dtf': 'Drukarek DTF',
  'serwis-drukarek-dtg': 'Drukarek DTG',
  'serwis-drukarek-spozywczych': 'Drukarek spo\u017Cywczych',
  'serwis-drukarek-do-kart-plastikowych': 'Drukarek do kart plastikowych',
  'serwis-niszczarek': 'Niszczarek',
  'naprawa-zasilaczy-ups': 'Zasilaczy UPS',
  'naprawa-projektorow': 'Projektor\u00F3w',
  'serwis-ekspresow-do-kawy': 'Ekspres\u00F3w do kawy',
}

const ITEMS = SERVICE_CATEGORIES
  .flatMap(category => [...category.items, ...(category.subgroup?.items ?? [])])
  .filter(item => ORDER.includes(item.href.split('/').pop() as (typeof ORDER)[number]))
  .sort((a, b) => ORDER.indexOf(a.href.split('/').pop() as (typeof ORDER)[number]) - ORDER.indexOf(b.href.split('/').pop() as (typeof ORDER)[number]))

const TARGET_SPEED_PX_PER_SEC = 24
const GAP = 48

function EquipmentGroup({ compact, ariaHidden, locale }: { compact?: boolean; ariaHidden?: boolean; locale: Locale }) {
  return (
    <>
      {ITEMS.map(item => {
        const slug = item.href.split('/').pop() as (typeof ORDER)[number]
        const label = locale === 'pl' ? LABELS[slug] : item.label[locale]
        const Icon = typeof item.icon === 'string' ? null : item.icon
        return (
          <div
            key={item.href}
            aria-hidden={ariaHidden}
            className={`inline-flex shrink-0 items-center gap-3 h-[78px] px-1 transition-opacity duration-300 ${compact ? 'md:h-[56px]' : 'md:h-[68px]'}${ariaHidden ? '' : ' brand-ticker-logo-muted'}`}
          >
            {Icon ? (
              <Icon size={42} className="shrink-0 text-[#bfa76a]" />
            ) : (
              <Image
                src={item.icon as string}
                alt={ariaHidden ? '' : label}
                width={42}
                height={42}
                className="h-[42px] w-[42px] object-contain"
                unoptimized
              />
            )}
            <span className="whitespace-nowrap font-cormorant text-[24px] font-semibold leading-none text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]">
              {label}
            </span>
          </div>
        )
      })}
    </>
  )
}

export default function EquipmentTicker({ compact, locale = 'pl' }: { compact?: boolean; locale?: Locale } = {}) {
  const copies = Math.max(2, Math.ceil(4000 / (ITEMS.length * 200)) + 1)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const hoverRef = useRef<HTMLDivElement | null>(null)
  const [durationSec, setDurationSec] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    const section = sectionRef.current
    const hover = hoverRef.current
    if (!track || !section) return

    const updateDuration = () => {
      const groupWidth = track.scrollWidth / copies
      if (groupWidth > 0) setDurationSec(groupWidth / TARGET_SPEED_PX_PER_SEC)
    }
    updateDuration()
    const resizeObserver = new ResizeObserver(updateDuration)
    resizeObserver.observe(track)

    let isVisible = false
    let isHovered = false
    const applyPlayState = () => {
      track.style.animationPlayState = isVisible && !document.hidden && !isHovered ? 'running' : 'paused'
    }
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.intersectionRatio >= 0.5
      applyPlayState()
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] })
    observer.observe(section)
    const onVisibilityChange = () => applyPlayState()
    const onEnter = () => { isHovered = true; applyPlayState() }
    const onLeave = () => { isHovered = false; applyPlayState() }
    document.addEventListener('visibilitychange', onVisibilityChange)
    hover?.addEventListener('mouseenter', onEnter)
    hover?.addEventListener('mouseleave', onLeave)

    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      hover?.removeEventListener('mouseenter', onEnter)
      hover?.removeEventListener('mouseleave', onLeave)
    }
  }, [copies])

  const trackStyle = {
    gap: `${GAP}px`,
    width: 'max-content',
    willChange: 'transform',
    animationDuration: `${durationSec}s`,
    '--brand-ticker-shift': `-${100 / copies}%`,
    '--brand-ticker-play': durationSec > 0 ? 'running' : 'paused',
  } as CSSProperties

  return (
    <section ref={sectionRef} className={`relative z-10 h-[78px] w-full -mt-[39px] -mb-[39px] overflow-hidden ${compact ? 'md:h-[56px]' : 'md:h-[68px]'}`}>
      <div ref={hoverRef} className="brand-ticker-hover-pause relative z-10 -mx-[calc((100vw-100%)/2)] w-screen overflow-visible">
        <div ref={trackRef} className="brand-ticker-track flex items-center" style={trackStyle}>
          {Array.from({ length: copies }).map((_, index) => (
            <EquipmentGroup key={index} compact={compact} ariaHidden={index > 0} locale={locale} />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,0.22) 0%, transparent 72%)' }} />
    </section>
  )
}
