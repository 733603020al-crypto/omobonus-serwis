'use client'

import { useState, useRef, useEffect } from 'react'
import { useNearViewport } from '@/lib/use-near-viewport'
import { ORIENT_CLASSES, EDGE_CLASSES, CORNER_CLASSES } from './services-card-classes'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FadeSlideP } from '@/components/ui/fade-slide-p'
import Image from 'next/image'
import type { ServiceData } from '@/lib/services-data'
import { serviceIconSrc as CARD_ICON_SRC, serviceCardBaked as CARD_BAKED } from '@/lib/services-meta-shared'
import manifest from '@/config/KANONICZNY_MANIFEST.json'

// "Wszystkie usługi ↓" / "Zwiń ↑": GŁÓWNE USŁUGI label text styles, 0.06em tracking, thin 1px line (text colour) 6px below; hover: block +3px right, arrow +3px more, line widens slightly.
const TEXT_CTA = "relative inline-flex items-baseline gap-[6px] bg-transparent border-0 px-0 pt-0 pb-[6px] m-0 cursor-pointer whitespace-nowrap text-sm font-inter font-semibold tracking-[0.06em] uppercase text-[#bfa76a] transition-transform duration-[250ms] ease-[ease] hover:translate-x-[3px] after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-current after:transition-transform after:duration-[250ms] after:ease-[ease] hover:after:scale-x-[1.08]"

// Home cards only: larger, tightly cropped renders of each service's own
// hero image (trimmed to the visible device, no transparent margins), with
// their natural size and the geometry class that places them on the card.
// Services without one fall back to the shared 160px card icon.
const CARD_DEVICE: Record<string, { src: string; w: number; h: number; cls: string }> = {
  'serwis-laptopow': { src: '/images/serwis-laptopow-card-device.webp', w: 399, h: 345, cls: 'tech-laptop' },
  'serwis-komputerow-stacjonarnych': { src: '/images/serwis-komputerow-stacjonarnych-card-device.webp', w: 321, h: 400, cls: 'tech-desktop' },
  'naprawa-drukarek': { src: '/images/naprawa-drukarek-card-device.webp', w: 400, h: 390, cls: 'tech-printer' },
  'serwis-drukarek-3d': { src: '/images/serwis-drukarek-3d-card-device.webp', w: 394, h: 398, cls: 'tech-3d' },
  'serwis-drukarek-termicznych': { src: '/images/serwis-drukarek-termicznych-card-device.webp', w: 400, h: 303, cls: 'tech-label' },
  'serwis-plotterow': { src: '/images/serwis-plotterow-card-device.webp', w: 400, h: 283, cls: 'tech-plotter' },
  'serwis-drukarek-laserowych': { src: '/images/serwis-drukarek-laserowych-card-device.webp', w: 400, h: 355, cls: 'tech-printer' },
  'serwis-drukarek-atramentowych': { src: '/images/serwis-drukarek-atramentowych-card-device.webp', w: 399, h: 306, cls: 'tech-printer' },
  'serwis-drukarek-iglowych': { src: '/images/serwis-drukarek-iglowych-card-device.webp', w: 400, h: 272, cls: 'tech-printer' },
  'wynajem-drukarek': { src: '/images/wynajem-drukarek-card-device.webp', w: 400, h: 311, cls: 'tech-printer' },
  'drukarka-zastepcza': { src: '/images/drukarka-zastepcza-card-device.webp', w: 400, h: 255, cls: 'tech-printer' },
}

// Homepage-only display order (doesn't touch services-data.ts, so sitemap,
// header dropdown and the related-services widget keep their own order).
const HOME_ORDER = [
  'serwis-laptopow',
  'serwis-komputerow-stacjonarnych',
  'naprawa-drukarek',
  'serwis-drukarek-3d',
  'serwis-drukarek-termicznych',
  'serwis-plotterow',
]
// Fixed (non-random) edge+orientation+corner assignment for the 10 cards,
// indexed by position in the 3-column grid (0,1,2 / 3,4,5 / 6,7,8 / 9).
// Rules satisfied: no (edge, orientation, corner) triple repeats anywhere;
// no two horizontally- or vertically-adjacent cards share an edge; no two
// horizontally- or vertically-adjacent cards share a real (non-"none")
// corner direction; no corner direction used more than twice; exactly 4
// cards use corner-none.
const CARD_STYLE: { edgeIdx: number; orientIdx: number; cornerIdx: number }[] = [
  { edgeIdx: 0, orientIdx: 0, cornerIdx: 3 }, // 0 laptopów:   edge-a + normal    + corner-bl
  { edgeIdx: 1, orientIdx: 1, cornerIdx: 0 }, // 1 komputery:  edge-b + flipX     + none
  { edgeIdx: 2, orientIdx: 3, cornerIdx: 2 }, // 2 outsourcing: edge-c + rotate180 + corner-tr
  { edgeIdx: 3, orientIdx: 2, cornerIdx: 1 }, // 3 naprawa:    edge-d + flipY     + corner-tl
  { edgeIdx: 4, orientIdx: 0, cornerIdx: 0 }, // 4 plotery:    edge-e + normal    + none
  { edgeIdx: 5, orientIdx: 1, cornerIdx: 4 }, // 5 etykiety:   edge-f + flipX     + corner-br
  { edgeIdx: 6, orientIdx: 3, cornerIdx: 0 }, // 6 drukarki3D: edge-g + rotate180 + none
  { edgeIdx: 7, orientIdx: 2, cornerIdx: 3 }, // 7 druk3D:     edge-h + flipY     + corner-bl
  { edgeIdx: 2, orientIdx: 1, cornerIdx: 2 }, // 8 wynajem:    edge-c + flipX     + corner-tr
  { edgeIdx: 5, orientIdx: 3, cornerIdx: 0 }, // 9 zastępcza:  edge-f + rotate180 + none
]

// The card grid only needs these three fields. Keeping the prop this narrow
// matters: Services is a client component, so everything passed in is
// serialized into the page HTML (the full services dataset was ~145 KB there).
export type ServiceCardData = Pick<ServiceData, 'slug' | 'title' | 'icon'>

interface ServicesT {
  sectionLabel: string
  subheading: string
  tagline: string
  cardLabels: Record<string, string>
  viewAllLabel?: string
  collapseLabel?: string
  moreLabel?: string
}

const PL: ServicesT = {
  sectionLabel: 'GŁÓWNE USŁUGI',
  subheading: 'Serwis i naprawa',
  tagline: 'Oferujemy serwis komputerów, laptopów i drukarek oraz wsparcie techniczne dla domu i biura we Wrocławiu',
  cardLabels: {
    'serwis-laptopow': 'Laptopów',
    'serwis-komputerow-stacjonarnych': 'Komputerów stacjonarnych',
    'naprawa-drukarek': 'Drukarek i kserokopiarek',
    'serwis-drukarek-3d': 'Drukarek 3D',
    'serwis-drukarek-termicznych': 'Drukarek etykiet',
    'serwis-plotterow': 'Ploterów',
    'serwis-drukarek-laserowych': 'Drukarek laserowych',
    'serwis-drukarek-atramentowych': 'Drukarek atramentowych',
    'serwis-drukarek-iglowych': 'Drukarek igłowych',
    'druk-3d-na-zamowienie': 'Druk 3D na zamówienie',
    'serwis-niszczarek': 'Niszczarek',
    'wynajem-drukarek': 'Wynajem (dzierżawa) drukarek',
    'drukarka-zastepcza': 'Drukarka zastępcza',
  },
  viewAllLabel: 'Wszystkie usługi ↓',
  collapseLabel: 'Zwiń ↑',
  moreLabel: 'Zobacz więcej',
}

export function Services({
  servicesData,
  basePath = '/uslugi',
  t,
  bare = false,
  extraServices,
}: {
  servicesData?: ServiceCardData[]
  basePath?: string
  t?: ServicesT
  bare?: boolean
  extraServices?: string[]
} = {}) {
  const services = servicesData ?? []
  const d = t ?? PL
  const [expanded, setExpanded] = useState(false)
  const dividerRef = useRef<HTMLDivElement>(null)
  // Baked card pictures sit below the first screen: fetched only on approach.
  const sectionRef = useRef<HTMLElement>(null)
  const bgNear = useNearViewport(sectionRef)
  useEffect(() => {
    const el = dividerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('fade-slide-animate')
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [expanded])

  const mainServices = services
    .filter(
      (service) =>
        ![
          'serwis-drukarek-laserowych',
          'serwis-drukarek-atramentowych',
          'serwis-drukarek-iglowych',
          'outsourcing-it',
          'wynajem-drukarek',
          'drukarka-zastepcza',
          'druk-3d-na-zamowienie',
          'serwis-niszczarek',
          'serwis-drukarek-do-kart-plastikowych',
          'serwis-drukarek-dtg', 'serwis-drukarek-sublimacyjnych',
        ].includes(service.slug)
    )
    .sort((a, b) => HOME_ORDER.indexOf(a.slug) - HOME_ORDER.indexOf(b.slug))

  const extraList = (extraServices ?? [])
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is ServiceCardData => Boolean(service))

  const canExpand = extraList.length > 0 && Boolean(d.viewAllLabel)

  const renderCard = (service: ServiceCardData, style: { edgeIdx: number; orientIdx: number; cornerIdx: number }) => {
    return (
      <Link
        key={service.slug}
        href={`${basePath}/${service.slug}`}
        prefetch={false}
        className={`
    group
    relative
    [container-type:inline-size]
    min-h-[168px]
    py-4 pl-8 md:pl-10 pr-3
    flex
    items-center
    text-left
    w-full
    zakres-paper-card
    services-home-card
    services-card-hover
    isolate
    ${CARD_BAKED[service.slug] ? 'services-card-baked' : ''}
    ${EDGE_CLASSES[style.edgeIdx]}
    ${ORIENT_CLASSES[style.orientIdx]}
    ${CORNER_CLASSES[style.cornerIdx]}
  `}
        style={CARD_BAKED[service.slug] && bgNear ? ({ '--baked-d': `url(${CARD_BAKED[service.slug].d})`, '--baked-m': `url(${CARD_BAKED[service.slug].m})` } as React.CSSProperties) : undefined}
      >
        {/* Treść — name at the left edge, small "Zobacz więcej →" under it. */}
        <div className="relative z-[4] flex-none max-w-[48%] flex flex-col items-start">
          <h2 className="font-cormorant font-bold text-[#24160B] leading-[1.05] text-[26px] md:text-[length:min(28px,8.05cqi)]">
            {d.cardLabels[service.slug] ?? service.title}
          </h2>
          {/* Same as the closed-section "Zobacz cennik" link on the service pages. */}
          <span className="flex items-center gap-2 text-xs font-cormorant font-normal leading-[1.2] text-[#3A2817] group-hover:translate-x-1 transition-transform">
            <span>{d.moreLabel ?? 'Zobacz więcej'}</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Technika — layers over the parchment (0): brown patch (1), gold
            glow (2), device (3); text is on top (4). Nothing here clips, so
            the glow and shadow may spill past the parchment. */}
        {!CARD_BAKED[service.slug] && (
        <div className="tech-wrap">
          <Image
            src={CARD_DEVICE[service.slug]?.src ?? CARD_ICON_SRC[service.slug] ?? service.icon}
            alt={`${service.title} Wrocław - ikona usługi serwisowej`}
            width={CARD_DEVICE[service.slug]?.w ?? 160}
            height={CARD_DEVICE[service.slug]?.h ?? 160}
            sizes="(max-width: 768px) 50vw, 200px"
            className={`tech-image ${CARD_DEVICE[service.slug]?.cls ?? 'tech-printer'}`}
          />
        </div>
        )}
      </Link>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="uslugi"
      className="relative pt-7 pb-7 md:pt-12 md:pb-10 text-center text-white overflow-hidden"
    >

      {/* Tło */}
      {!bare && (
        <div className="absolute inset-0">
          <Image
            src={manifest.services_background}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Zawartość */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Nagłówek w stylu „Dlaczego Omobonus / Uczciwość i szacunek do klienta” z /o-nas (advantages.tsx) */}
        <div className="text-center mt-[10px]">
          <FadeSlideP className="brush-underline text-sm font-inter font-semibold tracking-widest uppercase text-[#bfa76a] mb-[12px]">
            {d.sectionLabel}
          </FadeSlideP>
          {/* Same size/weight/line-height as "Serwis i naprawa" in the home hero H1 (0.93em of its 60px / clamp). */}
          <h2
            className="font-cormorant font-bold text-[hsl(45_25%_95%)] leading-[1.15] mx-auto mb-[24px] max-w-full whitespace-normal break-words text-[calc(0.93*clamp(28px,8.4vw,46px))] md:whitespace-nowrap md:max-w-none md:text-[55.8px]"
            style={{ letterSpacing: '0.2px', textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
          >
            {d.subheading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {mainServices.map((service, i) => renderCard(service, CARD_STYLE[i % CARD_STYLE.length]))}
        </div>

        {canExpand && !expanded && (
          <>
            {/* Previous line-based CTA — hidden, not removed (kept for possible future use) */}
            <div className="hidden text-center mt-8 md:mt-10">
              <FadeSlideP className="brush-underline brush-underline-center-glow block w-full text-sm font-inter font-semibold tracking-widest uppercase text-[#bfa76a]">
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="bg-transparent border-0 p-0 m-0 cursor-pointer"
                >
                  {d.viewAllLabel}
                </button>
                <span aria-hidden="true" className="brush-underline-spark" />
              </FadeSlideP>
            </div>

            {/* Plain-text CTA (no parchment button) flanked by the golden line in two
                segments (existing .brush-divider-row / .divider-line pattern, reused
                1:1 from contact-actions.tsx / "Skąd nazwa" underline). */}
            <div ref={dividerRef} className="brush-divider-row flex items-center justify-center gap-[18px] mt-[28px]">
              {/* Text CTA: no pill/border/background; hover — light underline, arrow drops 3px. */}
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className={`group ${TEXT_CTA}`}
              >
                <span>
                  {d.viewAllLabel?.replace(/\s*↓$/, '')}
                </span>
                <span aria-hidden="true" className="inline-block transition-transform duration-[250ms] ease-[ease] group-hover:translate-x-[3px]">↓</span>
              </button>
            </div>
          </>
        )}

        {canExpand && expanded && (
          <>
            <div className="fade-slide-animate grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start mt-4">
              {extraList.map((service, i) => renderCard(service, CARD_STYLE[(mainServices.length + i) % CARD_STYLE.length]))}
            </div>

            <div className="brush-divider-row flex items-center gap-[18px] mt-[22px]">
              <div
                className="divider-line divider-line-left flex-1"
                style={{ height: '2px', background: 'linear-gradient(to right, transparent 0%, rgba(191,167,106,0.35) 30%, rgba(230,204,130,0.95) 100%)', boxShadow: '0 0 10px rgba(230,204,130,0.45)' }}
              />
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className={`group ${TEXT_CTA}`}
              >
                <span>
                  {(d.collapseLabel ?? 'Zwiń ↑').replace(/\s*↑$/, '')}
                </span>
                <span aria-hidden="true" className="inline-block transition-transform duration-[250ms] ease-[ease] group-hover:translate-x-[3px]">↑</span>
              </button>
              <div
                className="divider-line divider-line-right flex-1"
                style={{ height: '2px', background: 'linear-gradient(to left, transparent 0%, rgba(191,167,106,0.35) 30%, rgba(230,204,130,0.95) 100%)', boxShadow: '0 0 10px rgba(230,204,130,0.45)' }}
              />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
