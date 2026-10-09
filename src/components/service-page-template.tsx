import '@/app/styles/accordion.css'
import '@/app/styles/service-hero.css'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image, { getImageProps } from 'next/image'
import type { ReactNode, ComponentProps } from 'react'
import { Header } from '@/components/header'
import { AnimatedHeroImage } from '@/components/animated-hero-image'
import { OutsourcingItHero } from '@/components/outsourcing-it-hero'
import { HeroPrinterCarousel } from '@/components/hero-printer-carousel'
import { HeroSpotlight } from '@/components/hero-spotlight'
import { ATRAMENT_PRINT_CLIP } from '@/lib/atrament-print-clip'
import PrintedPartsTicker from '@/components/printed-parts-ticker'
import type { ServiceData } from '@/lib/services-data'
import { REPAIR_ACCORDION_LAYOUT_SLUGS } from '@/lib/services-data'
import { getServiceDisplayPricing } from '@/lib/services-pricing'
import { serviceAccordionI18n } from '@/lib/i18n/service-accordion'
import GoogleReviews from '@/components/google-reviews'
import { serviceCardBaked as CARD_BAKED, relatedServiceSlugs } from '@/lib/services-meta-shared'
import { PrinterHubCarousel, PrinterHubMid } from '@/components/printer-hub-hero'

// Below-fold: split into separate chunks, same pattern as HomePageTemplate.
// No ssr:false — content still renders server-side, only the JS bundle is split.
// GoogleReviews (imported above) reads data/reviews.json directly on the server
// and is rendered as a plain Server Component — no dynamic() needed.
const Footer = dynamic(() => import('@/components/footer').then(m => ({ default: m.Footer })))
const ServiceAccordion = dynamic(() => import('@/components/service-accordion'))
const BrandTicker = dynamic(() => import('@/components/brand-ticker'))

// Per-service hero image scale relative to the fixed 400px/300px zone
// (object-contain already caps at 100%; this intentionally overflows the zone).
const serviceBgCommon = { alt: 'Omobonus serwis', fill: true, sizes: '100vw', priority: true } as const
const { props: { srcSet: serviceBgDesktopSrcSet } } = getImageProps({ ...serviceBgCommon, src: '/images/omobonus-hero2-desktop.webp', quality: 32 })
const { props: serviceBgMobileProps } = getImageProps({ ...serviceBgCommon, src: '/images/omobonus-hero2.webp', quality: 60 })

// Desktop hover light for single-image heroes (the carousels get theirs from
// HeroPrinterCarousel): lit source + depth map. Animated heroes use a still
// frame 0, so the picture freezes while lit and plays on after.
const SINGLE_HERO_SPOTLIGHT: Record<string, { src: string; depth: string }> = {
  'serwis-komputerow-stacjonarnych': {
    src: '/images/02_serwis-komputerow-stacjonarnych-still.webp',
    depth: '/images/02_serwis-komputerow-stacjonarnych-still-depth.webp',
  },
  'outsourcing-it': {
    src: '/images/03_outsourcing-it-v3-static.webp',
    depth: '/images/03_outsourcing-it-v3-static-depth.webp',
  },
  'druk-3d-na-zamowienie': {
    src: '/images/Druk_3D_animation-still.webp',
    depth: '/images/Druk_3D_animation-still-depth.webp',
  },
  'wynajem-drukarek': { src: '/images/10_wynajem-drukarek.webp', depth: '/images/10_wynajem-drukarek-depth.webp' },
  'drukarka-zastepcza': { src: '/images/11_drukarka-zastepcza.webp', depth: '/images/11_drukarka-zastepcza-depth.webp' },
}

const HERO_SCALE: Record<string, number> = {
  'serwis-laptopow': 1.4,
  'outsourcing-it': 1.4,
  'serwis-plotterow': 1.2,
  'wynajem-drukarek': 1.4,
  'drukarka-zastepcza': 1.4,
  'serwis-drukarek-termicznych': 1.2,
  'serwis-drukarek-iglowych': 1.2,
  'serwis-drukarek-atramentowych': 1.2,
  'serwis-drukarek-laserowych': 1.2,
  'serwis-niszczarek': 1.2,
  'serwis-drukarek-do-kart-plastikowych': 1.2,
  'naprawa-zasilaczy-ups': 1.2,
  'serwis-drukarek-dtg': 1.2,
  'serwis-drukarek-dtf': 1.2,
  'serwis-drukarek-sublimacyjnych': 1.2,
  'serwis-drukarek-spozywczych': 1.2,
}
const FadeSlideP = dynamic(() => import('@/components/ui/fade-slide-p').then(m => ({ default: m.FadeSlideP })))

// naprawa-drukarek: the four office-printer categories (same as the cards
// below and the "Drukarki biurowe" home tab), each its own page's hero image.
// Same order as PRINTER_HERO_MIDS (middle H1 line, PL).
const PRINTER_HERO_SLIDES = [
  '/images/laser-carousel-v3-01.webp',
  '/images/atrament-carousel-v3-01.webp',
  '/images/iglowe-carousel-v3-01.webp',
  '/images/termiczne-carousel-v3-01.webp',
]
const PRINTER_HERO_MIDS = [
  { group: 'printer', parts: ['drukarek', 'laserowych'] },
  { group: 'printer', parts: ['drukarek', 'atramentowych'] },
  { group: 'printer', parts: ['drukarek', 'igłowych'] },
  { group: 'printer', parts: ['drukarek', 'etykiet'] },
] as const
// "Zobacz więcej →" under the card names (as on the home cards).
const MORE_LABEL = { pl: 'Zobacz więcej', uk: 'Детальніше', ru: 'Подробнее' } as const

// serwis-drukarek-atramentowych: 6 inkjet-printer renders (slides 1–6),
// each cropped to its own alpha bbox and downscaled to max 512px.
const ATRAMENT_HERO_SLIDES = [
  '/images/atrament-carousel-v3-01.webp',
  '/images/atrament-carousel-v3-02.webp',
  '/images/atrament-carousel-v3-03.webp',
  '/images/atrament-carousel-v3-04.webp',
  '/images/atrament-carousel-v3-05.webp',
  '/images/atrament-carousel-v3-06.webp',
]

// Per-slide real-world size category (small/small, medium/medium,
// large/large, matching ATRAMENT_HERO_SLIDES order 1:1) — applied to every
// tier's scale, not just the active slide, so a small desktop printer never
// reads as big as a floor-standing machine while queued.
const ATRAMENT_SIZE_COEFFICIENTS = [0.72, 0.76, 0.82, 0.88, 0.95, 0.95]
// Graduated downward nudge — small stays centered (0), medium gets a light
// nudge, large gets more — so top overflow shrinks for every category that
// had any, while large still shifts furthest toward the logo strip below.
// Values differ per slide, not one shared bottom line for all six.
const ATRAMENT_VERTICAL_BIAS = [0, 0, 5, 3, 13, 13]

// serwis-drukarek-iglowych: 7 dot-matrix printer renders (slides 0–6),
// each cropped to its own alpha bbox and downscaled to max 512px.
const IGLOWE_HERO_SLIDES = [
  '/images/iglowe-carousel-v3-01.webp',
  '/images/iglowe-carousel-v3-02.webp',
  '/images/iglowe-carousel-v3-03.webp',
  '/images/iglowe-carousel-v3-04.webp',
  '/images/iglowe-carousel-v3-05.webp',
  '/images/iglowe-carousel-v3-06.webp',
  '/images/iglowe-carousel-v3-07.webp',
]
// Per-slide size category (medium/small/small/medium/medium/large/large,
// matching IGLOWE_HERO_SLIDES order 1:1) — same bands and nudges as LASER.
const IGLOWE_SIZE_COEFFICIENTS = [0.85, 0.74, 0.76, 0.85, 0.88, 0.95, 0.95]
const IGLOWE_VERTICAL_BIAS = [4, 0, 0, 4, 4, 13, 13]

// serwis-drukarek-termicznych: 7 label/thermal printer renders (slides 0–6),
// each cropped to its own alpha bbox and downscaled to max 512px.
const TERMICZNE_HERO_SLIDES = [
  '/images/termiczne-carousel-v3-01.webp',
  '/images/termiczne-carousel-v3-02.webp',
  '/images/termiczne-carousel-v3-03.webp',
  '/images/termiczne-carousel-v3-04.webp',
  '/images/termiczne-carousel-v3-05.webp',
  '/images/termiczne-carousel-v3-06.webp',
  '/images/termiczne-carousel-v3-07.webp',
]
// Per-slide size category (medium/small/small/small/small/large/large,
// matching TERMICZNE_HERO_SLIDES order 1:1) — same bands as LASER/IGLOWE.
const TERMICZNE_SIZE_COEFFICIENTS = [0.85, 0.74, 0.76, 0.74, 0.76, 0.95, 0.95]
const TERMICZNE_VERTICAL_BIAS = [4, 0, 0, 0, 0, 13, 13]

// serwis-drukarek-laserowych: 7 laser-printer/MFP renders (slides 1–7),
// each cropped to its own alpha bbox and downscaled to max 512px.
const LASER_HERO_SLIDES = [
  '/images/laser-carousel-v3-01.webp',
  '/images/laser-carousel-v3-02.webp',
  '/images/laser-carousel-v3-03.webp',
  '/images/laser-carousel-v3-04.webp',
  '/images/laser-carousel-v3-05.webp',
  '/images/laser-carousel-v3-06.webp',
  '/images/laser-carousel-v3-07.webp',
]

// Per-slide real-world size category (medium/small/small/medium/medium/
// large/large, matching LASER_HERO_SLIDES order 1:1) — same coefficient
// bands as ATRAMENT_SIZE_COEFFICIENTS above.
const LASER_SIZE_COEFFICIENTS = [0.85, 0.74, 0.76, 0.765, 0.88, 0.95, 0.95]
// Phone: slide 4 (white HP MFP) also ~10% smaller — 0.9 × the 0.78 phone cap
// it was held at before (the cap alone hid the desktop reduction on phones).
const LASER_MOBILE_SIZE_COEFFICIENTS = [undefined, undefined, undefined, 0.702]
// Same graduated downward nudge as ATRAMENT_VERTICAL_BIAS: small stays
// centered, medium gets a light nudge, large gets more.
const LASER_VERTICAL_BIAS = [4, 0, 0, 4, 4, 13, 13]

// serwis-plotterow: main plotter render (slide 0, same on-screen size as the
// previous static hero at HERO_SCALE 1.4) + small/small, medium/medium,
// large renders (see public/images/plotter-carousel-v3-*.webp).
const PLOTTER_HERO_SLIDES = [
  '/images/plotter-carousel-v3-00.webp',
  '/images/plotter-carousel-v3-01.webp',
  '/images/plotter-carousel-v3-02.webp',
  '/images/plotter-carousel-v3-03.webp',
  '/images/plotter-carousel-v3-04.webp',
  '/images/plotter-carousel-v3-05.webp',
  '/images/plotter-carousel-v3-06.webp',
]
const PLOTTER_SIZE_COEFFICIENTS = [0.97, 0.74, 0.76, 0.85, 0.85, 1.045, 1.14]
const PLOTTER_VERTICAL_BIAS = [0, 0, 0, 4, 4, 13, 13]

// serwis-drukarek-3d: the original animated hero (slide 0, eager LCP) + 6 3D-printer renders cropped to their own alpha bbox
// (see public/images/druk3d-carousel-v3-*.webp) — sizes small/small,
// medium/medium, large/large, matching DRUK3D_HERO_SLIDES order 1:1.
const DRUK3D_HERO_SLIDES = [
  '/images/Serwis_i_Naprawa_Drukarek_3D.webp',
  '/images/druk3d-carousel-v3-01.webp',
  '/images/druk3d-carousel-v3-02.webp',
  '/images/druk3d-carousel-v3-03.webp',
  '/images/druk3d-carousel-v3-04.webp',
  '/images/druk3d-carousel-v3-05.webp',
  '/images/druk3d-carousel-v3-06.webp',
]
// Static first frame of the animation (pixel-identical frame 0, 62KB) — paints
// as LCP, the 586KB animation swaps in after window "load".
const DRUK3D_POSTER = '/images/Serwis_i_Naprawa_Drukarek_3D-static.webp'
const DRUK3D_SIZE_COEFFICIENTS =[0.88, 0.74, 0.76, 0.85, 0.85, 0.95, 0.95]
const DRUK3D_VERTICAL_BIAS = [4, 0, 0, 4, 4, 13, 13]

// serwis-niszczarek: 6 shredder renders cropped to their own alpha bbox
// (see public/images/niszczarki-carousel-v1-*.webp) — sizes small/small,
// medium/medium, large/large. Own per-page coefficients (not tied to other pages).
const NISZCZARKI_HERO_SLIDES = [
  '/images/niszczarki-carousel-v1-01.webp',
  '/images/niszczarki-carousel-v1-02.webp',
  '/images/niszczarki-carousel-v1-03.webp',
  '/images/niszczarki-carousel-v1-04.webp',
  '/images/niszczarki-carousel-v1-05.webp',
  '/images/niszczarki-carousel-v2-06.webp',
]
const NISZCZARKI_SIZE_COEFFICIENTS = [0.74, 0.76, 0.85, 0.85, 0.95, 0.95]
const NISZCZARKI_VERTICAL_BIAS = [0, 0, 4, 4, 13, 13]

// serwis-drukarek-do-kart-plastikowych: 6 card-printer renders cropped to their own alpha bbox
// (see public/images/karty-carousel-v1-*.webp) — sizes small/small,
// medium/medium, large/large. Own per-page coefficients (not tied to other pages).
const KARTY_HERO_SLIDES = [
  '/images/karty-carousel-v1-01.webp',
  '/images/karty-carousel-v1-02.webp',
  '/images/karty-carousel-v1-03.webp',
  '/images/karty-carousel-v1-04.webp',
  '/images/karty-carousel-v1-05.webp',
  '/images/karty-carousel-v1-06.webp',
]
const KARTY_SIZE_COEFFICIENTS = [0.666, 0.76, 0.85, 0.85, 1.045, 0.95]
// Phone: slide 5 also ~10% larger — 1.1 × the 0.78 phone cap it was held at.
const KARTY_MOBILE_SIZE_COEFFICIENTS = [undefined, undefined, undefined, undefined, 0.858]
const KARTY_VERTICAL_BIAS = [0, 0, 4, 4, 13, 13]

// naprawa-zasilaczy-ups: 6 UPS renders cropped to their own alpha bbox
// (see public/images/ups-carousel-v1-*.webp) — sizes small/small,
// medium/medium, large/large, same coefficients as the other pages.
const UPS_HERO_SLIDES = [
  '/images/ups-carousel-v1-01.webp',
  '/images/ups-carousel-v1-02.webp',
  '/images/ups-carousel-v1-03.webp',
  '/images/ups-carousel-v1-04.webp',
  '/images/ups-carousel-v1-05.webp',
  '/images/ups-carousel-v1-06.webp',
]
const UPS_SIZE_COEFFICIENTS = [0.74, 0.76, 0.85, 0.85, 0.95, 0.95]
const UPS_VERTICAL_BIAS = [0, 0, 4, 4, 13, 13]

// serwis-drukarek-dtg: 6 DTG-printer renders cropped to their own alpha bbox
// (see public/images/dtg-carousel-v1-*.webp) — sizes small/small,
// medium/medium, large/large. Own per-page coefficients (not tied to other pages).
const DTG_HERO_SLIDES = [
  '/images/dtg-carousel-v1-01.webp',
  '/images/dtg-carousel-v1-02.webp',
  '/images/dtg-carousel-v1-03.webp',
  '/images/dtg-carousel-v1-04.webp',
  '/images/dtg-carousel-v1-05.webp',
  '/images/dtg-carousel-v1-06.webp',
]
const DTG_SIZE_COEFFICIENTS = [0.74, 0.76, 0.85, 0.85, 0.95, 0.95]
const DTG_VERTICAL_BIAS = [0, 0, 4, 4, 13, 13]

// serwis-drukarek-dtf: 6 DTF-printer renders cropped to their own alpha bbox
// (see public/images/dtf-carousel-v3-*.webp) — sizes small/small,
// medium/medium, large/large. Own per-page coefficients (not tied to other pages).
const DTF_HERO_SLIDES = [
  '/images/dtf-carousel-v3-01.webp',
  '/images/dtf-carousel-v3-02.webp',
  '/images/dtf-carousel-v3-03.webp',
  '/images/dtf-carousel-v3-04.webp',
  '/images/dtf-carousel-v3-05.webp',
  '/images/dtf-carousel-v3-06.webp',
]
const DTF_SIZE_COEFFICIENTS = [0.74, 0.76, 0.85, 0.85, 0.95, 0.95]
const DTF_VERTICAL_BIAS = [0, 0, 4, 4, 13, 13]

const SUBLIMACJA_HERO_SLIDES = [1, 2, 3, 4, 5, 6].map((n) => `/images/sublimacja-carousel-v1-0${n}.webp`)
const SUBLIMACJA_SIZE_COEFFICIENTS = [0.65, 0.76, 0.85, 0.85, 0.95, 0.95]
const SUBLIMACJA_VERTICAL_BIAS = [0, 0, 4, 4, 13, 13]

// serwis-drukarek-spozywczych: 7 food-printer renders cropped to their own alpha bbox
// (see public/images/spozywcze-carousel-v1-*.webp) — sizes small/small,
// medium/medium/medium, large/large (user order 1→7).
const SPOZYWCZE_HERO_SLIDES = [
  '/images/spozywcze-carousel-v1-01.webp',
  '/images/spozywcze-carousel-v1-02.webp',
  '/images/spozywcze-carousel-v1-03.webp',
  '/images/spozywcze-carousel-v1-04.webp',
  '/images/spozywcze-carousel-v1-05.webp',
  '/images/spozywcze-carousel-v1-06.webp',
  '/images/spozywcze-carousel-v1-07.webp',
]
const SPOZYWCZE_SIZE_COEFFICIENTS = [0.814, 0.836, 0.935, 0.85, 0.85, 0.95, 0.95]
const SPOZYWCZE_VERTICAL_BIAS = [0, 0, 4, 4, 4, 13, 13]

// serwis-laptopow: repair photos (user's order 1,3-8), cropped to alpha bbox
// and optimized to WebP — see public/images/laptop-carousel/. The original
// cracked-screen animation sits in slot 2 (it's heavy, so it isn't slide 0:
// the light first photo stays the eager LCP slide, the animation is fetched
// in the background with the other slides).
const LAPTOP_HERO_SLIDES = [
  '/images/laptop-carousel/laptop-carousel-v2-01.webp',
  '/images/serwis-laptopow-hero-animated.webp',
  '/images/laptop-carousel/laptop-carousel-v2-02.webp',
  '/images/laptop-carousel/laptop-carousel-v2-03.webp',
  '/images/laptop-carousel/laptop-carousel-v2-04.webp',
  '/images/laptop-carousel/laptop-carousel-v2-05.webp',
  '/images/laptop-carousel/laptop-carousel-v2-06.webp',
  '/images/laptop-carousel/laptop-carousel-v2-07.webp',
]
// Same on-screen laptop size as on the home hero (0.87 in its 1.2 box),
// recalculated for this page's 1.4 box.
const LAPTOP_SIZE_COEFFICIENTS = LAPTOP_HERO_SLIDES.map(() => (0.87 * 1.2) / 1.4)
// Phones: the animation's frame 0 instead of the ~520KB animated file.
const LAPTOP_MOBILE_STILLS = [undefined, '/images/serwis-laptopow-hero-animated-still.webp']

// Carousel pages share the home hero's carousel look: peek, entrance, hover
// and glow (styles in service-hero.css under .home-hero-carousel-wrap).
const HERO_CAROUSEL_SLUGS = new Set([
  'serwis-laptopow',
  'serwis-drukarek-3d',
  'serwis-plotterow',
  'naprawa-drukarek',
  'serwis-drukarek-atramentowych',
  'serwis-drukarek-laserowych',
  'serwis-drukarek-iglowych',
  'serwis-drukarek-termicznych',
  'serwis-niszczarek',
  'serwis-drukarek-do-kart-plastikowych',
  'naprawa-zasilaczy-ups',
  'serwis-drukarek-dtg', 'serwis-drukarek-dtf', 'serwis-drukarek-sublimacyjnych', 'serwis-drukarek-spozywczych',
])

const PAGE_CLASS_SLUGS = [
  'serwis-drukarek-termicznych', 'serwis-laptopow', 'serwis-komputerow-stacjonarnych',
  'outsourcing-it', 'serwis-drukarek-laserowych', 'serwis-drukarek-atramentowych',
  'serwis-drukarek-3d', 'serwis-plotterow', 'serwis-drukarek-iglowych',
  'naprawa-drukarek', 'wynajem-drukarek', 'drukarka-zastepcza',
  'druk-3d-na-zamowienie', 'serwis-niszczarek',
  'serwis-drukarek-do-kart-plastikowych',
  'naprawa-zasilaczy-ups',
  'serwis-drukarek-dtg', 'serwis-drukarek-dtf', 'serwis-drukarek-sublimacyjnych', 'serwis-drukarek-spozywczych',
]

// PL-only H1 restructuring into the unified "Serwis i naprawa X we Wrocławiu"
// 3-line layout (matches the approved /uslugi/serwis-laptopow hero). Pages whose
// meaning doesn't fit that template (outsourcing-it, druk-3d-na-zamowienie,
// wynajem-drukarek, drukarka-zastepcza) are intentionally absent — they keep
// headings.h1 as plain text, wrapped inside the same sized/centered box.
// All 3 lines always share the same font size and horizontal center. The middle
// line never shrinks and never wraps to a second line — if it's wider than the
// 470px box, it overflows symmetrically (equal amounts left and right) around
// that shared center.
const HERO_LINES_PL: Record<string, { mid: string }> = {
  'serwis-laptopow': { mid: 'laptopów' },
  'naprawa-drukarek': { mid: 'drukarek' },
  'serwis-komputerow-stacjonarnych': { mid: 'komputerów stacjonarnych' },
  'serwis-drukarek-laserowych': { mid: 'drukarek laserowych' },
  'serwis-drukarek-atramentowych': { mid: 'drukarek atramentowych' },
  'serwis-drukarek-3d': { mid: 'drukarek 3D' },
  'serwis-plotterow': { mid: 'ploterów drukujących' },
  'serwis-drukarek-iglowych': { mid: 'drukarek igłowych' },
  'serwis-drukarek-termicznych': { mid: 'drukarek etykiet' },
  'serwis-niszczarek': { mid: 'niszczarek' },
}

export interface ServicePageHeadings {
  h1: string
  // UK/RU: the same 3 hero lines as HERO_LINES_PL (first / device / city),
  // so the break points come from the data, not from the browser.
  lines?: readonly [string, string, string]
  // Phone only: the middle line is a bit too wide for 40px — scale this H1
  // with the screen so it stays 3 lines, like PL.
  fitMobile?: boolean
  // Podpis pod drugą linią H1 (styl jak napis „Pełny wykaz usług i cen…” pod hero)
  tagline?: string
  // Fragment drugiej linii H1 w kolorze podpisu (#bfa76a), np. „DTG”
  accent?: string
  h2?: string
}

export interface ServicePageSeoBlock {
  items: string[]
}

export interface RelatedService {
  slug: string
  /** Raw title from services data, used in icon alt text */
  title: string
  /** Title shown on the card (may differ from raw title) */
  displayTitle: string
  iconSrc: string
}

export interface ServicePageLabels {
  callNow: ReactNode
  sendRequest: string
  formHref: string
  fadeSlideDefault: string
  fadeSlideDrukarkaZastepcza: string
  fadeSlideWynajem: string
  fadeSlideDruk3DZamowienie?: string
  relatedCta: string
  relatedIconAltSuffix: string
  drukarkaZastepczaNote: ReactNode
  ctaHeading: string
  /** Заголовок CTA под устройство конкретной страницы; без записи — ctaHeading. */
  ctaHeadingBySlug?: Record<string, string>
  ctaText: string
  /** Telefon: krótszy CTA — ogólna nazwa urządzenia (bez typu); brak wpisu → ctaHeadingMobile. */
  ctaHeadingMobile?: string
  ctaHeadingMobileBySlug?: Record<string, string>
  ctaTextMobile?: string
  ctaButton: string
  ctaHref: string
}

interface SeoBlocksGridProps {
  items: string[]
  variant: 'related' | 'accordion'
  slug?: string
}

function SeoBlocksGrid({ items, variant, slug }: SeoBlocksGridProps) {
  if (!items.length) return null
  const wrapperClass = variant === 'related'
    ? 'pt-2 pb-6 md:pb-8'
    : REPAIR_ACCORDION_LAYOUT_SLUGS.includes(slug ?? '') ? 'pt-3 pb-24' : 'pt-6 pb-24'
  // Na druk-3d-na-zamowienie ten tekst nie ma być semantycznym H2 (nie jest
  // częścią struktury H1/H2 tej strony) — inne strony nadal renderują go jako <h2>.
  const Tag = slug === 'druk-3d-na-zamowienie' ? 'div' : 'h2'
  return (
    <div className={wrapperClass}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-[2px] text-left break-words">
        {items.map((text, index) => {
          // Пустая ячейка-распорка остаётся в сетке, но не должна быть пустым заголовком для скринридеров.
          const ItemTag = text.trim() ? Tag : 'div'
          return (
          <ItemTag
            key={index}
            className={
              variant === 'related'
                ? `text-[12px] font-normal leading-[1.1] m-0 p-0 text-[#bfa76a]/85 text-left ${index % 2 === 0 ? 'md:text-right md:pr-2' : 'md:text-left md:pl-2'}`
                : `text-[12px] font-normal leading-[1.1] m-0 p-0 text-[#bfa76a]/85 ${index % 2 === 0 ? 'text-left md:text-right md:pr-2' : 'text-left md:pl-2'}`
            }
          >
            {text}
          </ItemTag>
          )
        })}
      </div>
    </div>
  )
}

interface ServicePageTemplateProps {
  locale: 'pl' | 'uk' | 'ru'
  slug: string
  service: ServiceData
  heroLabels: string[]
  headings: ServicePageHeadings
  seoBlocks?: ServicePageSeoBlock
  slugBrands?: string[]
  imageSrc: string
  imageAlt: string
  basePath: string
  labels: ServicePageLabels
  relatedServices?: RelatedService[]
  jsonLd: object | object[]
  footerT?: NonNullable<ComponentProps<typeof Footer>>['t']
}

export function ServicePageTemplate({
  locale,
  slug,
  service,
  heroLabels,
  headings,
  seoBlocks,
  slugBrands,
  imageSrc,
  imageAlt,
  basePath,
  labels,
  relatedServices,
  jsonLd,
  footerT,
}: ServicePageTemplateProps) {
  const pageClass = PAGE_CLASS_SLUGS.includes(slug) ? `page-${slug}` : ''
  const repairAccordionClass = REPAIR_ACCORDION_LAYOUT_SLUGS.includes(slug) ? 'page-repair-accordion' : ''

  return (
    <>
      {(Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <Header locale={locale} />
      <main className={`pt-[40px] pb-[10px] md:pb-[20px] relative overflow-visible ${pageClass} ${repairAccordionClass}`}>

        <>
          <div className="absolute inset-x-0 top-0 overflow-visible service-hero-bg-fade">
            {/* Telefon (<768px) — bez zmian. Od 768px — ten sam kadr (te same
                proporcje), powiększony AI do 1920px. */}
            <picture>
              <source media="(min-width: 768px)" srcSet={serviceBgDesktopSrcSet} sizes="100vw" />
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img {...serviceBgMobileProps} fetchPriority="high" className="object-cover object-center" />
            </picture>
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div
            aria-hidden="true"
            className="fixed inset-0 -z-10"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), var(--bg-parchment)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </>


        <div className="relative">
          {pageClass ? (
            <>
              <div className="container max-w-4xl mx-auto px-4 md:px-6 relative z-10 pt-1 md:pt-2 mb-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
                  <div className="service-hero-zone flex justify-center items-center h-[300px] md:h-[400px] md:self-center">
                    <div
                      className={`service-hero-image-wrap relative ${HERO_CAROUSEL_SLUGS.has(slug) ? 'home-hero-carousel-wrap service-hero-carousel ' : ''}${
                        HERO_SCALE[slug] ? 'shrink-0' : 'w-full h-full'
                      }`}
                      style={HERO_SCALE[slug] ? { width: `${HERO_SCALE[slug] * 100}%`, height: `${HERO_SCALE[slug] * 100}%` } : undefined}
                    >
                      {slug === 'druk-3d-na-zamowienie' ? (
                        // Self-animated SVG (SMIL/CSS baked in) — plain <img>, not
                        // next/image, so the optimizer doesn't rasterize it and kill
                        // the animation.
                        // The shared file holds both the animated and the still layer
                        // (CSS media query picks one); here each mode gets a file with
                        // only its own layer, so the phone downloads half as much.
                        <picture className="contents">
                          <source media="(prefers-reduced-motion: reduce)" srcSet="/images/Druk_3D_animation-reduced.svg?v=1" />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/images/Druk_3D_animation-motion.svg?v=1"
                            alt={imageAlt}
                            width={420}
                            height={420}
                            className="service-hero-image object-contain w-full h-full"
                            fetchPriority="high"
                          />
                        </picture>
                      ) : slug === 'serwis-laptopow' ? (
                        // Center-active carousel of laptop repair close-ups
                        // (same stack mechanic as naprawa-drukarek below, via
                        // variant="laptop" for its own contained-in-zone
                        // geometry — see hero-printer-carousel.tsx).
                        <HeroPrinterCarousel
                          alt={imageAlt}
                          slides={LAPTOP_HERO_SLIDES}
                          variant="home"
                          sizeCoefficients={LAPTOP_SIZE_COEFFICIENTS}
                          mobileStills={LAPTOP_MOBILE_STILLS}
                          advanceOnSecondReady
                        />
                      ) : slug === 'serwis-komputerow-stacjonarnych' ? (
                        // Animated WebP (cooling-fan animation baked into the file, transparent
                        // background, pre-cropped) — canvas/offsets/disposal/blend across all 16
                        // frames must stay byte-for-byte as authored (no crop/recode) or the
                        // composited animation breaks. Starts on a static first-frame fallback
                        // (mobile and desktop alike) and swaps in the animated file after page
                        // load (see AnimatedHeroImage) to keep LCP fast on every screen size.
                        <AnimatedHeroImage
                          animatedSrc={imageSrc}
                          mobileAnimatedSrc="/images/02_serwis-komputerow-stacjonarnych-mobile.webp"
                          staticSrc="/images/02_serwis-komputerow-stacjonarnych-static.webp"
                          alt={imageAlt}
                          width={622}
                          height={773}
                          className="service-hero-image object-contain w-full h-full"
                        />
                      ) : slug === 'outsourcing-it' ? (
                        // Split animation (see OutsourcingItHero): static first frame for fast
                        // LCP, then after page load a clean background plus a transparent
                        // 40-frame overlay with only the moving orbit dots/arcs (100 ms per
                        // frame, same as the original) — ~0.55 MB instead of 2.85 MB.
                        <OutsourcingItHero
                          staticSrc="/images/03_outsourcing-it-v3-static.webp"
                          baseSrc="/images/03_outsourcing-it-v3-base.webp"
                          overlaySrc="/images/03_outsourcing-it-v3-overlay.webp"
                          alt={imageAlt}
                          width={699}
                          height={403}
                          className="service-hero-image object-contain w-full h-full"
                        />
                      ) : slug === 'serwis-drukarek-3d' ? (
                        // Same stack-carousel mechanic as naprawa-drukarek
                        // with per-slide size bands — 6 3D-printer renders.
                        <HeroPrinterCarousel
                          alt={imageAlt}
                          variant="home"
                          slides={DRUK3D_HERO_SLIDES}
                          sizeCoefficients={DRUK3D_SIZE_COEFFICIENTS}
                          verticalBias={DRUK3D_VERTICAL_BIAS}
                          posterSrc={DRUK3D_POSTER}
                        />
                      ) : slug === 'serwis-plotterow' ? (
                        // Same stack-carousel mechanic as naprawa-drukarek
                        // with per-slide size bands — plotter renders.
                        <HeroPrinterCarousel
                          alt={imageAlt}
                          variant="home"
                          slides={PLOTTER_HERO_SLIDES}
                          sizeCoefficients={PLOTTER_SIZE_COEFFICIENTS}
                          verticalBias={PLOTTER_VERTICAL_BIAS}
                        />
                      ) : slug === 'naprawa-drukarek' ? (
                        // Center-active carousel of the same category hero
                        // images used on their own service pages (laser,
                        // inkjet, needle, thermal, plotter, 3D) — replaces
                        // the single static Serwis_Drukarek.webp. No new
                        // assets, same fixed hero zone.
                        <PrinterHubCarousel alt={imageAlt} slides={PRINTER_HERO_SLIDES} />
                      ) : slug === 'serwis-drukarek-atramentowych' ? (
                        // Same stack-carousel mechanic as naprawa-drukarek
                        // (default "printer" variant, no new CSS) — 6
                        // inkjet-printer renders cropped to their own
                        // alpha bbox (see public/images/atrament-carousel-v3-*.webp).
                        <HeroPrinterCarousel
                          alt={imageAlt}
                          variant="home"
                          slides={ATRAMENT_HERO_SLIDES}
                          sizeCoefficients={ATRAMENT_SIZE_COEFFICIENTS}
                          verticalBias={ATRAMENT_VERTICAL_BIAS}
                          introVideo={ATRAMENT_PRINT_CLIP}
                          animationSlideIndex={0}
                        />
                      ) : slug === 'serwis-drukarek-laserowych' ? (
                        // Same stack-carousel mechanic as the atramentowych
                        // page above — 7 laser-printer/MFP
                        // renders cropped to their own alpha bbox (see
                        // public/images/laser-carousel-v3-*.webp).
                        <HeroPrinterCarousel
                          alt={imageAlt}
                          variant="home"
                          slides={LASER_HERO_SLIDES}
                          sizeCoefficients={LASER_SIZE_COEFFICIENTS}
                          mobileSizeCoefficients={LASER_MOBILE_SIZE_COEFFICIENTS}
                          verticalBias={LASER_VERTICAL_BIAS}
                        />
                      ) : slug === 'serwis-drukarek-do-kart-plastikowych' ? (
                        <HeroPrinterCarousel
                          alt={imageAlt}
                          variant="home"
                          slides={KARTY_HERO_SLIDES}
                          sizeCoefficients={KARTY_SIZE_COEFFICIENTS}
                          mobileSizeCoefficients={KARTY_MOBILE_SIZE_COEFFICIENTS}
                          verticalBias={KARTY_VERTICAL_BIAS}
                        />
                      ) : slug === 'naprawa-zasilaczy-ups' ? (
                        <HeroPrinterCarousel
                          alt={imageAlt}
                          variant="home"
                          slides={UPS_HERO_SLIDES}
                          sizeCoefficients={UPS_SIZE_COEFFICIENTS}
                          verticalBias={UPS_VERTICAL_BIAS}
                        />
                      ) : slug === 'serwis-drukarek-dtg' ? (
                        <HeroPrinterCarousel
                          alt={imageAlt}
                          variant="home"
                          slides={DTG_HERO_SLIDES}
                          sizeCoefficients={DTG_SIZE_COEFFICIENTS}
                          verticalBias={DTG_VERTICAL_BIAS}
                        />
                      ) : slug === 'serwis-drukarek-dtf' ? (
                        <HeroPrinterCarousel
                          alt={imageAlt}
                          variant="home"
                          slides={DTF_HERO_SLIDES}
                          sizeCoefficients={DTF_SIZE_COEFFICIENTS}
                          verticalBias={DTF_VERTICAL_BIAS}
                        />
                      ) : slug === 'serwis-drukarek-sublimacyjnych' ? (
                        <HeroPrinterCarousel
                          alt={imageAlt}
                          variant="home"
                          slides={SUBLIMACJA_HERO_SLIDES}
                          sizeCoefficients={SUBLIMACJA_SIZE_COEFFICIENTS}
                          verticalBias={SUBLIMACJA_VERTICAL_BIAS}
                        />
                      ) : slug === 'serwis-drukarek-spozywczych' ? (
                        <HeroPrinterCarousel
                          alt={imageAlt}
                          variant="home"
                          slides={SPOZYWCZE_HERO_SLIDES}
                          sizeCoefficients={SPOZYWCZE_SIZE_COEFFICIENTS}
                          verticalBias={SPOZYWCZE_VERTICAL_BIAS}
                        />
                      ) : slug === 'serwis-niszczarek' ? (
                        <HeroPrinterCarousel
                          alt={imageAlt}
                          variant="home"
                          slides={NISZCZARKI_HERO_SLIDES}
                          sizeCoefficients={NISZCZARKI_SIZE_COEFFICIENTS}
                          verticalBias={NISZCZARKI_VERTICAL_BIAS}
                        />
                      ) : slug === 'serwis-drukarek-iglowych' ? (
                        // Same stack-carousel mechanic as naprawa-drukarek
                        // with per-slide size bands — 7 dot-matrix printer renders
                        // (see public/images/iglowe-carousel-v3-*.webp).
                        <HeroPrinterCarousel
                          alt={imageAlt}
                          variant="home"
                          slides={IGLOWE_HERO_SLIDES}
                          sizeCoefficients={IGLOWE_SIZE_COEFFICIENTS}
                          verticalBias={IGLOWE_VERTICAL_BIAS}
                        />
                      ) : slug === 'serwis-drukarek-termicznych' ? (
                        // Same stack-carousel mechanic — 7 thermal printer
                        // renders (see public/images/termiczne-carousel-v3-*.webp).
                        <HeroPrinterCarousel
                          alt={imageAlt}
                          variant="home"
                          slides={TERMICZNE_HERO_SLIDES}
                          sizeCoefficients={TERMICZNE_SIZE_COEFFICIENTS}
                          verticalBias={TERMICZNE_VERTICAL_BIAS}
                        />
                      ) : (
                        <Image
                          src={imageSrc}
                          alt={imageAlt}
                          width={420}
                          height={420}
                          sizes="(max-width: 768px) 85vw, 420px"
                          className="service-hero-image object-contain w-full h-full"
                          priority
                          fetchPriority="high"
                          quality={60}
                        />
                      )}
                      {SINGLE_HERO_SPOTLIGHT[slug] && (
                        <HeroSpotlight
                          src={SINGLE_HERO_SPOTLIGHT[slug].src}
                          depth={SINGLE_HERO_SPOTLIGHT[slug].depth}
                          className="service-hero-image object-contain w-full h-full"
                          style={{ position: 'absolute', inset: 0 }}
                          hide="img"
                        />
                      )}
                    </div>
                  </div>
                  {/* Phone: H1 goes first (above the image), so its position never depends on the image. */}
                  <div className="text-center flex flex-col items-center justify-center relative z-10 order-first md:order-none">
                    {/* naprawa-drukarek, phone: H1 scales with the screen (≤47px, tighter leading) so it
                        balances the printer; a PL middle line wider than the column ("drukarek
                        atramentowych") is shrunk to fit by PrinterHubMid, so the H1 height never jumps. */}
                    {headings.lines && headings.tagline && !(locale === 'pl' && (slug === 'naprawa-drukarek' || slug === 'druk-3d-na-zamowienie' || HERO_LINES_PL[slug])) ? (
                      // Podpis (tagline) nie jest częścią H1: zewnętrzny <div> ma klasy H1 + flex-col, a <h1 className="contents">
                      // nie tworzy własnego pudełka — linie i podpis układają się jak wcześniej; podpis wraca między 2. a 3. linię przez order.
                      <div className={`font-cormorant font-bold text-[#ffffff] w-full max-w-[90vw] md:max-w-none md:w-[470px] text-[40px] md:text-[52px] leading-[1.15] max-md:[text-wrap:balance] max-md:break-words${slug === 'naprawa-drukarek' ? ' max-md:text-[length:min(47px,10.6vw)] max-md:leading-[1.05]' : headings.fitMobile ? ' max-md:text-[length:min(40px,9.4vw)]' : ''} flex flex-col`}>
                        <h1 className="contents">
                          <span className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap">{headings.lines[0]}{' '}</span>
                          <span className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap">{headings.accent && headings.lines[1].includes(headings.accent) ? (<>{headings.lines[1].split(headings.accent)[0]}<span className="text-[#bfa76a]">{headings.accent}</span>{headings.lines[1].split(headings.accent).slice(1).join(headings.accent)}</>) : headings.lines[1]}{' '}</span>
                          <span className="order-2 block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap">{headings.lines[2]}</span>
                        </h1>
                        <span className="order-1 block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap text-[20px] text-[#bfa76a] font-cormorant italic leading-tight font-semibold drop-shadow-2xl">{headings.tagline}{' '}</span>
                      </div>
                    ) : (
                    <h1 className={`font-cormorant font-bold text-[#ffffff] w-full max-w-[90vw] md:max-w-none md:w-[470px] text-[40px] md:text-[52px] leading-[1.15] max-md:[text-wrap:balance] max-md:break-words${slug === 'naprawa-drukarek' ? ' max-md:text-[length:min(47px,10.6vw)] max-md:leading-[1.05]' : headings.fitMobile ? ' max-md:text-[length:min(40px,9.4vw)]' : ''}`}>
                      {locale === 'pl' && slug === 'naprawa-drukarek' ? (
                        // Middle line swaps with the carousel slide (home hero word animation);
                        // search engines/screen readers get the unchanged H1 text.
                        <>
                          <span className="sr-only">Serwis i naprawa drukarek we Wrocławiu</span>
                          <span aria-hidden="true" className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap">Serwis i naprawa{' '}</span>
                          <span aria-hidden="true" className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] whitespace-nowrap"><PrinterHubMid mids={PRINTER_HERO_MIDS} /></span>
                          <span aria-hidden="true" className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap">we Wrocławiu</span>
                        </>
                      ) : locale === 'pl' && slug === 'druk-3d-na-zamowienie' ? (
                        <>
                          <span className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap">Druk 3D{' '}</span>
                          <span className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap">na zamówienie{' '}</span>
                          <span className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap">we Wrocławiu</span>
                        </>
                      ) : locale === 'pl' && HERO_LINES_PL[slug] ? (
                        <>
                          <span className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap">Serwis i naprawa{' '}</span>
                          <span className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap">{HERO_LINES_PL[slug].mid}{' '}</span>
                          <span className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap">we Wrocławiu</span>
                        </>
                      ) : headings.lines ? (
                        <>
                          <span className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap">{headings.lines[0]}{' '}</span>
                          <span className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap">{headings.accent && headings.lines[1].includes(headings.accent) ? (<>{headings.lines[1].split(headings.accent)[0]}<span className="text-[#bfa76a]">{headings.accent}</span>{headings.lines[1].split(headings.accent).slice(1).join(headings.accent)}</>) : headings.lines[1]}{' '}</span>
                          {headings.tagline && (
                            <span className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap text-[20px] text-[#bfa76a] font-cormorant italic leading-tight font-semibold drop-shadow-2xl">{headings.tagline}{' '}</span>
                          )}
                          <span className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap">{headings.lines[2]}</span>
                        </>
                      ) : (
                        headings.h1 || service.title
                      )}
                    </h1>
                    )}

                    {headings.h2 && (() => {
                      // Lista marek „(HP, Epson, …)” pod H1 to opis, nie sekcja — zwykły <div> z tym samym wyglądem.
                      // naprawa-drukarek i opisowe podtytuły (np. druk-3d) zostają <h2>.
                      const SubTag = headings.h2.trim().startsWith('(') && slug !== 'naprawa-drukarek' ? 'div' : 'h2'
                      return (
                        <SubTag className="h1-sub text-[14px] md:text-[16px] opacity-80 font-cormorant font-bold text-[#ffffff] leading-[1.1] mt-1">
                          {headings.h2}
                        </SubTag>
                      )
                    })()}
                  </div>
                </div>
              </div>
              {slug === 'druk-3d-na-zamowienie' ? (
                <div className="mt-[40px]">
                  <PrintedPartsTicker />
                </div>
              ) : slugBrands && slugBrands.length > 0 && (
                <div className="mt-[40px]">
                  <BrandTicker brandNames={slugBrands} muted="mobile" />
                </div>
              )}
              <div className={`container max-w-5xl mx-auto px-4 md:px-6 text-center relative z-10 mb-3${slug === 'druk-3d-na-zamowienie' ? ' mt-[74px]' : slugBrands && slugBrands.length > 0 ? ' mt-[44px]' : ''}`}>
                <FadeSlideP className={`hidden md:block text-[20px] text-[#bfa76a] font-cormorant italic leading-tight font-semibold drop-shadow-2xl ${slug === 'drukarka-zastepcza' ? 'whitespace-nowrap' : 'max-w-3xl mx-auto'}`}>
                  {slug === 'drukarka-zastepcza'
                    ? labels.fadeSlideDrukarkaZastepcza
                    : slug === 'wynajem-drukarek'
                      ? labels.fadeSlideWynajem
                      : slug === 'druk-3d-na-zamowienie'
                        ? (labels.fadeSlideDruk3DZamowienie ?? labels.fadeSlideDefault)
                        : labels.fadeSlideDefault}
                </FadeSlideP>
              </div>
            </>
          ) : null}
        </div>

        {slug === 'naprawa-drukarek' ? (
          <section id="uslugi" className="relative text-center pt-0 pb-2">
            <div className="relative max-w-7xl mx-auto px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                {[...(relatedServices ?? [])].sort((a, b) => relatedServiceSlugs.indexOf(a.slug) - relatedServiceSlugs.indexOf(b.slug)).map((rs) => (
                  // Same cards as the "Drukarki biurowe" tab on the home page.
                  <Link
                    key={rs.slug}
                    href={`${basePath}/${rs.slug}`}
                    prefetch={false}
                    className={`group relative [container-type:inline-size] ${CARD_BAKED[rs.slug] ? 'md:min-h-[168px]' : 'min-h-[168px]'} py-4 pl-6 md:pl-8 pr-3 flex items-center text-left w-full zakres-paper-card services-home-card services-card-hover isolate ${CARD_BAKED[rs.slug] ? 'services-card-baked' : ''}`}
                    style={CARD_BAKED[rs.slug] ? ({ '--baked-d': `url(${CARD_BAKED[rs.slug].d})`, '--baked-m': `url(${CARD_BAKED[rs.slug].m})` } as React.CSSProperties) : undefined}
                  >
                    <div className="relative z-[4] flex-none max-w-[49%] flex flex-col items-start">
                      <div className="font-cormorant font-bold text-[#24160B] leading-[1.05] text-[24px] md:text-[length:min(28px,8.05cqi)]">
                        {rs.displayTitle}
                      </div>
                      <span className="flex items-center gap-2 text-xs font-cormorant font-normal leading-[1.2] text-[#3A2817] group-hover:translate-x-1 transition-transform">
                        <span>{MORE_LABEL[locale]}</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <SeoBlocksGrid items={seoBlocks?.items ?? []} variant="related" />
          </section>
        ) : (
          <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
            {/* Ceny i słownik liczone tu, na serwerze — do przeglądarki trafia tylko ta usługa i ten język. */}
            <ServiceAccordion
              service={service}
              locale={locale}
              t={serviceAccordionI18n[locale]}
              pricing={getServiceDisplayPricing(service.slug, service.pricingSections, locale)}
            />
            <SeoBlocksGrid items={seoBlocks?.items ?? []} variant="accordion" slug={slug} />
          </section>
        )}

        <div className="relative z-10 -mt-6 md:-mt-10 -mb-[80px] overflow-visible">
          <GoogleReviews locale={locale} />
        </div>

      </main>

      <Footer
        t={footerT}
        bare
        cta={{
          heading: labels.ctaHeadingBySlug?.[slug] ?? labels.ctaHeading,
          text: labels.ctaText,
          headingMobile: labels.ctaHeadingMobileBySlug?.[slug] ?? labels.ctaHeadingMobile,
          textMobile: labels.ctaTextMobile,
          button: labels.ctaButton,
          href: labels.ctaHref,
        }}
      />
    </>
  )
}
