'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useNearViewport } from '@/lib/use-near-viewport'
import { ORIENT_CLASSES, EDGE_CLASSES, CORNER_CLASSES } from './services-card-classes'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import type { ServiceData } from '@/lib/services-data'
import { serviceIconSrc as CARD_ICON_SRC, serviceCardBaked as CARD_BAKED } from '@/lib/services-meta-shared'
import manifest from '@/config/KANONICZNY_MANIFEST.json'
import { SERVICE_CATEGORIES, type ServiceLocale } from '@/config/service-categories'

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
  subheading: string
  tagline: string
  cardLabels: Record<string, string>
  moreLabel?: string
}

const PL: ServicesT = {
  subheading: 'Serwis i naprawa',
  tagline: 'Oferujemy serwis komputerów, laptopów i drukarek oraz wsparcie techniczne dla domu i biura we Wrocławiu',
  cardLabels: {
    'serwis-laptopow': 'Laptopów',
    'serwis-komputerow-stacjonarnych': 'Komputerów stacjonarnych',
    'outsourcing-it': 'Outsourcing IT',
    'naprawa-drukarek': 'Drukarek i kserokopiarek',
    'serwis-drukarek-3d': 'Drukarek 3D',
    'serwis-drukarek-termicznych': 'Drukarek etykiet',
    'serwis-plotterow': 'Ploterów',
    'serwis-drukarek-laserowych': 'Drukarek laserowych',
    'serwis-drukarek-atramentowych': 'Drukarek atramentowych',
    'serwis-drukarek-iglowych': 'Drukarek igłowych',
    'serwis-drukarek-sublimacyjnych': 'Drukarek sublimacyjnych',
    'serwis-drukarek-dtf': 'Drukarek DTF',
    'serwis-drukarek-dtg': 'Drukarek DTG',
    'serwis-drukarek-spozywczych': 'Drukarek spożywczych',
    'druk-3d-na-zamowienie': 'Druk 3D na zamówienie',
    'serwis-niszczarek': 'Niszczarek',
    'naprawa-zasilaczy-ups': 'Zasilaczy UPS',
    'serwis-drukarek-do-kart-plastikowych': 'Drukarek do kart plastikowych',
    'wynajem-drukarek': 'Wynajem (dzierżawa) drukarek',
    'drukarka-zastepcza': 'Drukarka zastępcza',
  },
  moreLabel: 'Zobacz więcej',
}

// Category tabs: one cell per category, thin gold dividers between them —
// a single row from lg, a 2×2 grid on tablets, one full-width row per
// category on phones (no horizontal overflow).
// Active tab: user's parchment as a 9-slice — burnt edges and curled corners
// keep their proportions, only the plain middle adapts. Phones use the same
// wide picture as desktop (full-width row has the desktop tab's shape).
const PARCHMENT = '[border-image:url(/images/services-tab-parchment.webp)_26_fill/9px_stretch] bg-[url(/images/services-tab-parchment.webp)] p-[5px] bg-[length:100%_100%] bg-no-repeat bg-clip-content'
// Same dark brown as the card names on the parchment cards below.
const ACTIVE_INK = '#24160B'
// Gold of the "Skąd nazwa" / "Święty Omobonus XII wieku" headings (about.tsx).
const IDLE_INK = '#bfa76a'
// Tab-only mask copies of two menu icons: their dark inner lines are cut out,
// so a one-colour fill keeps the printer details and the cube edges.
const TAB_ICON_MASK: Record<string, string> = {
  '/images/menu-icon-drukarki-laserowe.webp': '/images/services-tab-mask-drukarki-laserowe.webp',
  '/images/menu-icon-drukarki-3d.webp': '/images/services-tab-mask-drukarki-3d.webp',
}
// Active tab hover = the parchment cards' hover (.services-card-hover in
// globals.css): same lift + scale, shadow, 180ms curve, mouse-only.
const CARD_HOVER_MOVE = 'transition-all duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:[transform:translateY(-4px)_scale(1.04)]'
const CARD_HOVER_SHADOW = '[@media(hover:hover)_and_(pointer:fine)]:group-hover:shadow-[0_12px_20px_rgba(35,18,8,0.50)]'

export function Services({
  servicesData,
  basePath = '/uslugi',
  t,
  bare = false,
  locale = 'pl',
}: {
  servicesData?: ServiceCardData[]
  basePath?: string
  t?: ServicesT
  bare?: boolean
  locale?: ServiceLocale
} = {}) {
  const services = servicesData ?? []
  const d = t ?? PL
  const [active, setActive] = useState(0)
  // Phones only: a second tap on the open category folds it (no panel shown).
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767.98px)')
    const onChange = () => { if (!mq.matches) setCollapsed(false) }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const idBase = useId()
  // Baked card pictures sit below the first screen: fetched only on approach.
  const sectionRef = useRef<HTMLElement>(null)
  const bgNear = useNearViewport(sectionRef)

  // Only the active category's cards are rendered; every service link is
  // still in the HTML through the header's hidden menu list.
  const activeCards = SERVICE_CATEGORIES[active].items
    .filter((item) => !item.menuOnly && (!item.locales || item.locales.includes(locale)))
    .map((item) => {
      const slug = item.href.split('/').pop() as string
      return services.find((service) => service.slug === slug) ?? { slug, title: item.label[locale], icon: item.icon }
    })

  const selectTab = (index: number) => {
    const count = SERVICE_CATEGORIES.length
    const next = (index + count) % count
    setActive(next)
    setCollapsed(false)
    tabRefs.current[next]?.focus()
  }

  // Phones: after switching, the open category may have jumped up past the
  // fixed header (the previous panel above it closed) — bring it back in view.
  const openTab = (index: number) => {
    if (!window.matchMedia('(max-width: 767.98px)').matches) {
      setActive(index)
      return
    }
    if (index === active && !collapsed) {
      setCollapsed(true)
      return
    }
    setActive(index)
    setCollapsed(false)
    requestAnimationFrame(() => {
      const top = tabRefs.current[index]?.getBoundingClientRect().top ?? 0
      const header = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0
      if (top < header + 8) window.scrollBy({ top: top - header - 8 })
    })
  }

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === 'ArrowRight') selectTab(index + 1)
    else if (e.key === 'ArrowLeft') selectTab(index - 1)
    else if (e.key === 'Home') selectTab(0)
    else if (e.key === 'End') selectTab(SERVICE_CATEGORIES.length - 1)
    else return
    e.preventDefault()
  }

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
    ${CARD_BAKED[service.slug] ? 'md:min-h-[168px]' : 'min-h-[168px]'}
    py-4 pl-6 md:pl-8 pr-3
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
        <div className="relative z-[4] flex-none max-w-[49%] flex flex-col items-start">
          <h2 className="font-cormorant font-bold text-[#24160B] leading-[1.05] text-[24px] md:text-[length:min(28px,8.05cqi)]">
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
        <div className="text-center mt-[10px]">
          {/* Same weight/line-height as "Serwis i naprawa" in the home hero H1; desktop 0.93em of its 60px,
              phones ~18% larger than before (was 0.93*clamp(28px,8.4vw,46px)). */}
          <h2
            className="font-cormorant font-bold text-[hsl(45_25%_95%)] leading-[1.1] md:leading-[1.15] mx-auto mb-[24px] max-w-full whitespace-normal break-words text-[calc(1.09*clamp(33px,9.9vw,54px))] md:whitespace-nowrap md:max-w-none md:text-[55.8px]"
            style={{ letterSpacing: '0.2px', textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
          >
            {d.subheading}
          </h2>
        </div>

        {/* Phones: a vertical accordion — the tablist is display:contents, so its cells
            and the one card panel are flex items here, ordered by --m-order: the
            panel sits right below the open category. Tablet/desktop: plain tabs. */}
        <div className="max-md:flex max-md:flex-col max-md:gap-[6px]">
        {/* Category panel (same dark plate + gold hairline as the header menu). */}
        <div
          role="tablist"
          aria-label={d.subheading}
          className="max-md:contents md:mb-6 md:grid md:grid-cols-2 md:gap-[6px] lg:grid-cols-[repeat(4,auto)]"
        >
          {SERVICE_CATEGORIES.map((category, i) => {
            // Folded (phones only): the category looks and reads as closed.
            const selected = i === active && !collapsed
            return (
              <div key={category.title.pl} role="presentation" className="group relative max-md:[order:var(--m-order)]" style={{ '--m-order': i <= active ? i : i + 1 } as React.CSSProperties}>
                {/* Active parchment fills the whole cell (not just the button inside it). */}
                {selected && <span aria-hidden="true" className={`pointer-events-none absolute inset-0 border border-solid will-change-transform ${CARD_HOVER_MOVE} ${CARD_HOVER_SHADOW} ${PARCHMENT}`} />}
                <button
                  ref={(el) => { tabRefs.current[i] = el }}
                  type="button"
                  role="tab"
                  id={`${idBase}-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`${idBase}-panel`}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => openTab(i)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className={`relative flex h-full min-h-[52px] w-full flex-row items-center justify-start gap-3 rounded-md border px-4 py-2 text-left font-cormorant text-[18px] font-semibold leading-tight hyphens-auto md:min-h-0 md:px-3 md:py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6cc82] md:text-[20px] ${
                    selected
                      ? `border-transparent text-[#24160B] ${CARD_HOVER_MOVE}`
                      : // Same hover as the items of the header Usługi menu; thin gold ring of the
                        // Szybki kontakt button: closed frame at rest, its glint runs only while hovered.
                        // Hover glow only from md: on phones a tap just switches the category.
                        'gold-border-flow !border-[#bfa76a]/80 bg-black/55 before:opacity-0 before:![animation-play-state:paused] md:hover:before:opacity-100 md:hover:before:![animation-play-state:running] text-white transition-all duration-300 ease-out md:hover:-translate-y-0.5 md:hover:border-[#bfa76a]/80 md:hover:bg-gradient-to-r md:hover:from-[#bfa76a]/40 md:hover:via-[#bfa76a]/20 md:hover:to-transparent md:hover:text-[#f3df9a] md:hover:shadow-[0_0_30px_rgba(191,167,106,0.45)] md:hover:[text-shadow:0_0_12px_rgba(191,167,106,0.65)] md:[&:hover_img]:opacity-100'
                  }`}
                >
                  {/* Same icon shape, filled with one colour: card-name brown when active,
                      gold of the "Skąd nazwa" headings otherwise. */}
                  <span
                    aria-hidden="true"
                    className="h-[22px] w-[28px] flex-shrink-0 md:h-[27px] md:w-[34px]"
                    style={{
                      backgroundColor: selected ? ACTIVE_INK : IDLE_INK,
                      maskImage: `url(${TAB_ICON_MASK[category.icon] ?? category.icon})`,
                      WebkitMaskImage: `url(${TAB_ICON_MASK[category.icon] ?? category.icon})`,
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                    }}
                  />
                  {category.titleMobile ? (
                    <>
                      <span className="md:hidden">{category.titleMobile[locale]}</span>
                      <span className="max-md:hidden">{(category.homeTitle ?? category.title)[locale]}</span>
                    </>
                  ) : (
                    <span>{(category.homeTitle ?? category.title)[locale]}</span>
                  )}
                  {/* Phones: accordion arrow (same chevron as the mobile menu's Usługi). */}
                  <ChevronDown aria-hidden="true" className={`ml-auto h-5 w-5 flex-shrink-0 transition-transform duration-200 md:hidden ${selected ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`${idBase}-panel`}
          aria-labelledby={`${idBase}-tab-${active}`}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start max-md:[order:var(--m-order)] max-md:pb-[6px] ${collapsed ? 'max-md:hidden' : ''}`}
          style={{ '--m-order': active + 1 } as React.CSSProperties}
        >
          {activeCards.map((service, i) => renderCard(service, CARD_STYLE[i % CARD_STYLE.length]))}
        </div>
        </div>
      </div>
    </section>
  )
}
