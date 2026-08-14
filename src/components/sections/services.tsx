'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { FadeSlideP } from '@/components/ui/fade-slide-p'
import Image from 'next/image'
import { services as defaultServices, HOME_EXTRA_SERVICES } from '@/lib/services-data'
import type { ServiceData } from '@/lib/services-data'
import manifest from '@/config/KANONICZNY_MANIFEST.json'

// Written out as literal strings (not built via template interpolation) so
// Tailwind's static content scanner can actually find them — a class name
// assembled as `zakres-edge-${x}` is invisible to that scanner and the
// whole custom @layer utilities rule gets silently purged from the CSS
// build even though the DOM ends up with the right class name.
const ORIENT_CLASSES = [
  'zakres-orient-normal',
  'zakres-orient-flipx',
  'zakres-orient-flipy',
  'zakres-orient-rotate180',
]
const EDGE_CLASSES = [
  'zakres-edge-a',
  'zakres-edge-b',
  'zakres-edge-c',
  'zakres-edge-d',
  'zakres-edge-e',
  'zakres-edge-f',
  'zakres-edge-g',
  'zakres-edge-h',
]
// '' = corner-none (no ::after at all — 4 of the 10 cards use this)
const CORNER_CLASSES = [
  '',
  'zakres-corner-tl',
  'zakres-corner-tr',
  'zakres-corner-bl',
  'zakres-corner-br',
]
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

interface ServicesT {
  sectionLabel: string
  subheading: string
  tagline: string
  cardLabels: Record<string, string>
  viewAllLabel?: string
  collapseLabel?: string
}

const PL: ServicesT = {
  sectionLabel: 'GŁÓWNE USŁUGI',
  subheading: 'SERWIS I NAPRAWA',
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
    'wynajem-drukarek': 'Wynajem (dzierżawa) drukarek',
    'drukarka-zastepcza': 'Drukarka zastępcza',
  },
  viewAllLabel: 'Zobacz wszystkie usługi ↓',
  collapseLabel: 'Zwiń ↑',
}

export function Services({
  servicesData,
  basePath = '/uslugi',
  t,
  bare = false,
  extraServices,
}: {
  servicesData?: ServiceData[]
  basePath?: string
  t?: ServicesT
  bare?: boolean
  extraServices?: string[]
} = {}) {
  const services = servicesData ?? defaultServices
  const d = t ?? PL
  const [expanded, setExpanded] = useState(false)
  const dividerRef = useRef<HTMLDivElement>(null)
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
        ].includes(service.slug)
    )
    .sort((a, b) => HOME_ORDER.indexOf(a.slug) - HOME_ORDER.indexOf(b.slug))

  const extraList = (extraServices ?? [])
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is ServiceData => Boolean(service))

  const canExpand = extraList.length > 0 && Boolean(d.viewAllLabel)

  const renderCard = (service: ServiceData, style: { edgeIdx: number; orientIdx: number; cornerIdx: number }) => {
    const isPlotter = service.slug === 'serwis-plotterow'
    const isEtykiety = service.slug === 'serwis-drukarek-termicznych'
    const isDrukarki3D = service.slug === 'serwis-drukarek-3d'
    const isLaptopy = service.slug === 'serwis-laptopow'
    const isKomputery = service.slug === 'serwis-komputerow-stacjonarnych'
    const isLaserowych = service.slug === 'serwis-drukarek-laserowych'
    const isDruk3DZamowienie = service.slug === 'druk-3d-na-zamowienie'
    const isWynajem = service.slug === 'wynajem-drukarek'
    const isZastepcza = service.slug === 'drukarka-zastepcza'
    return (
      <Link
        key={service.slug}
        href={`${basePath}/${service.slug}`}
        prefetch={false}
        className={`
    group
    relative
    min-h-[152px]
    py-4 px-6
    flex
    items-center
    text-left
    w-full
    zakres-paper-card
    services-card-hover
    ${EDGE_CLASSES[style.edgeIdx]}
    ${ORIENT_CLASSES[style.orientIdx]}
    ${CORNER_CLASSES[style.cornerIdx]}
  `}
      >
        {/* Ikona — centered within its own zone (no left/right push). */}
        <div className={`z-10 h-[120px] flex-shrink-0 ${isPlotter || isDrukarki3D || isLaptopy || isLaserowych || isWynajem || isZastepcza ? 'w-[60%]' : 'w-[50%]'}`}>
          <div
            className={`relative w-full h-full ${isPlotter ? 'scale-[1.15] origin-right' : isEtykiety ? 'scale-[0.9] origin-center' : isDrukarki3D || isKomputery || isLaserowych || isDruk3DZamowienie || isWynajem || isZastepcza ? 'origin-center' : ''}`}
            style={
              isDrukarki3D ? { transform: 'scale(1.067)' }
                : isKomputery ? { transform: 'scale(1.05)' }
                : isLaserowych ? { transform: 'scale(1.17)' }
                : isDruk3DZamowienie ? { transform: 'scale(0.89)' }
                : isWynajem ? { transform: 'scale(1.06)' }
                : isZastepcza ? { transform: 'translate(3px, -8px) scale(1.05)' }
                : undefined
            }
          >
          <Image
            src={
              service.slug === 'serwis-komputerow-stacjonarnych'
                ? '/images/02_serwis-komputerow-stacjonarnych-home-icon.webp'
                : service.slug === 'serwis-laptopow'
                  ? '/images/01_serwis-laptopow-home-icon.webp'
                  : service.slug === 'outsourcing-it'
                    ? '/images/03_outsourcing-it-icon.webp'
                    : service.slug === 'serwis-drukarek-laserowych'
                      ? '/images/04_serwis-drukarek-laserowych-icon.webp'
                      : service.slug === 'serwis-drukarek-atramentowych'
                        ? '/images/05_serwis-drukarek-atramentowych-icon.webp'
                        : service.slug === 'serwis-drukarek-3d'
                          ? '/images/Serwis_i_Naprawa_Drukarek_3D-home-icon.webp'
                          : service.slug === 'serwis-plotterow'
                            ? '/images/08_serwis-ploterow-home-icon.webp'
                            : service.slug === 'serwis-drukarek-termicznych'
                              ? '/images/06_serwis-drukarek-termicznych-home-icon.webp'
                              : service.slug === 'serwis-drukarek-iglowych'
                                ? '/images/07_serwis-drukarek-iglowych-icon.webp'
                                : service.slug === 'wynajem-drukarek'
                                  ? '/images/10_wynajem-drukarek-icon.webp'
                                  : service.slug === 'drukarka-zastepcza'
                                    ? '/images/11_drukarka-zastepcza-icon.webp'
                                    : service.slug === 'naprawa-drukarek'
                                      ? '/images/Serwis_Drukarek-home-icon.webp'
                                      : service.slug === 'druk-3d-na-zamowienie'
                                        ? '/images/09_druk-3d-na-zamowienie-icon.webp'
                                      : service.icon
            }
            alt={`${service.title} Wrocław - ikona usługi serwisowej`}
            fill
            sizes="(max-width: 768px) 35vw, 180px"
            className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
          />
          </div>
        </div>

        {/* Treść — text pulled toward the left edge of its own zone
            (close to the image), not centered in the half. */}
        <div className={`relative z-10 h-[120px] flex items-center pl-[15px] ${isPlotter || isDrukarki3D || isLaptopy || isLaserowych || isWynajem || isZastepcza ? 'w-[40%]' : 'w-[50%]'}`}>
          <h2 className="font-cormorant font-semibold text-[#3A2817] leading-[1.25]" style={{ fontSize: '25.4px' }}>
            {d.cardLabels[service.slug] ?? service.title}
          </h2>
        </div>
      </Link>
    )
  }

  return (
    <section
      id="uslugi"
      className="relative pt-7 pb-14 md:pt-12 md:pb-20 text-center text-white overflow-hidden"
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

      {/* Ciemna winieta u samej góry sekcji — niezależna od tła (bare/nie-bare),
          zawsze zaczyna się od górnej krawędzi sekcji. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 md:h-28 lg:h-32 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />

      {/* Zawartość */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-[20px]">
          <h2 className="services-heading-text whitespace-nowrap font-cormorant font-bold leading-[1.1] tracking-[0.04em] text-[29px] md:text-[36px] lg:text-[43px]">
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
            <div ref={dividerRef} className="brush-divider-row flex items-center gap-[18px] mt-[22px]">
              <div
                className="divider-line divider-line-left flex-1"
                style={{ height: '2px', background: 'linear-gradient(to right, transparent 0%, rgba(191,167,106,0.35) 30%, rgba(230,204,130,0.95) 100%)', boxShadow: '0 0 10px rgba(230,204,130,0.45)' }}
              />
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="inline-flex items-center justify-center min-w-[165px] px-[27px] py-[13px] whitespace-nowrap zakres-paper-card services-card-hover zakres-edge-a zakres-orient-normal zakres-corner-bl"
              >
                <span className="relative z-10 font-cormorant font-semibold text-[#3A2817] leading-[1.25]" style={{ fontSize: '18px' }}>
                  {d.viewAllLabel}
                </span>
              </button>
              <div
                className="divider-line divider-line-right flex-1"
                style={{ height: '2px', background: 'linear-gradient(to left, transparent 0%, rgba(191,167,106,0.35) 30%, rgba(230,204,130,0.95) 100%)', boxShadow: '0 0 10px rgba(230,204,130,0.45)' }}
              />
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
                className="inline-flex items-center justify-center min-w-[165px] px-[27px] py-[13px] whitespace-nowrap zakres-paper-card services-card-hover zakres-edge-a zakres-orient-normal zakres-corner-bl"
              >
                <span className="relative z-10 font-cormorant font-semibold text-[#3A2817] leading-[1.25]" style={{ fontSize: '18px' }}>
                  {d.collapseLabel ?? 'Zwiń ↑'}
                </span>
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
