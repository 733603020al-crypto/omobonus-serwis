import '@/app/styles/accordion.css'
import '@/app/styles/service-hero.css'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode, ComponentProps } from 'react'
import { Header } from '@/components/header'
import { AnimatedHeroImage } from '@/components/animated-hero-image'
import { HeroPrinterCarousel } from '@/components/hero-printer-carousel'
import PrintedPartsTicker from '@/components/printed-parts-ticker'
import type { ServiceData } from '@/lib/services-data'
import { REPAIR_ACCORDION_LAYOUT_SLUGS } from '@/lib/services-data'
import GoogleReviews from '@/components/google-reviews'
import { EDGE_CLASSES, ORIENT_CLASSES, CORNER_CLASSES } from '@/components/sections/services'

// Below-fold: split into separate chunks, same pattern as HomePageTemplate.
// No ssr:false — content still renders server-side, only the JS bundle is split.
// GoogleReviews (imported above) reads data/reviews.json directly on the server
// and is rendered as a plain Server Component — no dynamic() needed.
const Footer = dynamic(() => import('@/components/footer').then(m => ({ default: m.Footer })))
const ServiceAccordion = dynamic(() => import('@/components/service-accordion'))
const BrandTicker = dynamic(() => import('@/components/brand-ticker'))

// Per-service hero image scale relative to the fixed 400px/300px zone
// (object-contain already caps at 100%; this intentionally overflows the zone).
const HERO_SCALE: Record<string, number> = {
  'serwis-laptopow': 1.4,
  'outsourcing-it': 1.4,
  'serwis-plotterow': 1.4,
  'wynajem-drukarek': 1.4,
  'drukarka-zastepcza': 1.4,
  'serwis-drukarek-termicznych': 1.2,
  'serwis-drukarek-iglowych': 1.2,
  'serwis-drukarek-atramentowych': 1.2,
  'serwis-drukarek-laserowych': 1.2,
}
const FadeSlideP = dynamic(() => import('@/components/ui/fade-slide-p').then(m => ({ default: m.FadeSlideP })))

// naprawa-drukarek: same category hero images already used on their own
// service pages (laser, inkjet, needle, thermal, plotter, 3D) — no new assets.
const PRINTER_HERO_SLIDES = [
  '/images/04_serwis-drukarek-laserowych.webp',
  '/images/05_serwis-drukarek-atramentowych.webp',
  '/images/07_serwis-drukarek-iglowych.webp',
  '/images/06_serwis-drukarek-termicznych.webp',
  '/images/08_serwis-ploterow.webp',
  '/images/Serwis_i_Naprawa_Drukarek_3D.webp',
]

// serwis-drukarek-atramentowych: existing hero image kept as slide 0, plus 5
// more inkjet-printer renders (Epson/Canon), each cropped to its own alpha
// bbox and downscaled to match, same convention as the assets above.
const ATRAMENT_HERO_SLIDES = [
  '/images/05_serwis-drukarek-atramentowych.webp',
  '/images/atrament-carousel-02b.webp',
  '/images/atrament-carousel-03b.webp',
  '/images/atrament-carousel-04b.webp',
  '/images/atrament-carousel-05b.webp',
  '/images/atrament-carousel-06b.webp',
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

// serwis-drukarek-laserowych: existing hero image kept as slide 0 (unchanged,
// medium-sized), plus 6 more laser-printer/MFP renders, each cropped to its
// own alpha bbox and downscaled, same convention as the atrament set above.
const LASER_HERO_SLIDES = [
  '/images/04_serwis-drukarek-laserowych.webp',
  '/images/laser-carousel-02b.webp',
  '/images/laser-carousel-03b.webp',
  '/images/laser-carousel-04b.webp',
  '/images/laser-carousel-05b.webp',
  '/images/laser-carousel-06b.webp',
  '/images/laser-carousel-07b.webp',
]

// Per-slide real-world size category (medium/small/small/medium/medium/
// large/large, matching LASER_HERO_SLIDES order 1:1) — same coefficient
// bands as ATRAMENT_SIZE_COEFFICIENTS above.
const LASER_SIZE_COEFFICIENTS = [0.85, 0.74, 0.76, 0.85, 0.88, 0.95, 0.95]
// Same graduated downward nudge as ATRAMENT_VERTICAL_BIAS: small stays
// centered, medium gets a light nudge, large gets more.
const LASER_VERTICAL_BIAS = [4, 0, 0, 4, 4, 13, 13]

// serwis-laptopow: the original cracked-screen animation (same file the
// static AnimatedHeroImage used before this carousel existed — kept as slide
// 0 so it's still the eager/high-priority LCP slide, same as before) plus
// repair close-ups (broken screen, motherboard/SSD/fan work), cropped to
// alpha bbox and optimized to WebP — see public/images/laptop-carousel/.
const LAPTOP_HERO_SLIDES = [
  '/images/serwis-laptopow-hero-animated.webp',
  '/images/laptop-carousel/laptop-carousel-01.webp',
  '/images/laptop-carousel/laptop-carousel-02.webp',
  '/images/laptop-carousel/laptop-carousel-03.webp',
  '/images/laptop-carousel/laptop-carousel-04.webp',
  '/images/laptop-carousel/laptop-carousel-05.webp',
  '/images/laptop-carousel/laptop-carousel-06.webp',
  '/images/laptop-carousel/laptop-carousel-07.webp',
  '/images/laptop-carousel/laptop-carousel-08.webp',
  '/images/laptop-carousel/laptop-carousel-09.webp',
]

const PAGE_CLASS_SLUGS = [
  'serwis-drukarek-termicznych', 'serwis-laptopow', 'serwis-komputerow-stacjonarnych',
  'outsourcing-it', 'serwis-drukarek-laserowych', 'serwis-drukarek-atramentowych',
  'serwis-drukarek-3d', 'serwis-plotterow', 'serwis-drukarek-iglowych',
  'naprawa-drukarek', 'wynajem-drukarek', 'drukarka-zastepcza',
  'druk-3d-na-zamowienie',
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
}

export interface ServicePageHeadings {
  h1: string
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
  ctaText: string
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
            <Image
              src="/images/omobonus-hero2.webp"
              alt="Omobonus serwis"
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              quality={60}
              className="object-cover object-center"
            />
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
                  <div className="flex justify-center items-center h-[300px] md:h-[400px] md:self-center">
                    <div
                      className={`service-hero-image-wrap relative ${
                        HERO_SCALE[slug] ? 'shrink-0' : 'w-full h-full'
                      }`}
                      style={HERO_SCALE[slug] ? { width: `${HERO_SCALE[slug] * 100}%`, height: `${HERO_SCALE[slug] * 100}%` } : undefined}
                    >
                      {slug === 'druk-3d-na-zamowienie' ? (
                        // Self-animated SVG (SMIL/CSS baked in) — plain <img>, not
                        // next/image, so the optimizer doesn't rasterize it and kill
                        // the animation.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imageSrc}
                          alt={imageAlt}
                          width={420}
                          height={420}
                          className="service-hero-image object-contain w-full h-full"
                          fetchPriority="high"
                        />
                      ) : slug === 'serwis-laptopow' ? (
                        // Center-active carousel of laptop repair close-ups
                        // (same stack mechanic as naprawa-drukarek below, via
                        // variant="laptop" for its own contained-in-zone
                        // geometry — see hero-printer-carousel.tsx). Slide 0
                        // is the heavy (531KB) animated laptop-screen WebP, so
                        // posterSrc gives it the same static-first-then-
                        // animate treatment AnimatedHeroImage uses elsewhere
                        // (lightweight 38KB first frame — the animation's own
                        // first frame, byte-for-byte — paints immediately,
                        // the animated file loads only after window "load").
                        <HeroPrinterCarousel
                          alt={imageAlt}
                          slides={LAPTOP_HERO_SLIDES}
                          variant="laptop"
                          posterSrc="/images/serwis-laptopow-hero-static-v2.webp"
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
                          staticSrc="/images/02_serwis-komputerow-stacjonarnych-static.webp"
                          alt={imageAlt}
                          width={622}
                          height={773}
                          className="service-hero-image object-contain w-full h-full"
                        />
                      ) : slug === 'outsourcing-it' ? (
                        // Animated WebP (orbiting connection-dots animation baked into the
                        // file, transparent background) — canvas/offsets/disposal/blend
                        // across all 40 frames must stay intact or the composited animation
                        // breaks. Starts on a static first-frame fallback (mobile and desktop
                        // alike) and swaps in the animated file after page load (see
                        // AnimatedHeroImage) to keep LCP fast on every screen size.
                        <AnimatedHeroImage
                          animatedSrc={imageSrc}
                          staticSrc="/images/03_outsourcing-it-static.webp"
                          alt={imageAlt}
                          width={699}
                          height={403}
                          className="service-hero-image object-contain w-full h-full"
                        />
                      ) : slug === 'serwis-drukarek-3d' ? (
                        // Animated WebP (rotating wireframe-fullerene print animation baked
                        // into the file, transparent background) — plain <img>, not next/image,
                        // so the optimizer doesn't rasterize it and kill the animation. 32
                        // frames, disposal/blend must stay intact. Starts on a static first
                        // frame (the animation's own first ANMF chunk copied byte-for-byte,
                        // so the swap is pixel-identical) and swaps in the ~600KB animated
                        // file after page load (see AnimatedHeroImage).
                        <AnimatedHeroImage
                          animatedSrc={imageSrc}
                          staticSrc="/images/Serwis_i_Naprawa_Drukarek_3D-static.webp"
                          alt={imageAlt}
                          width={492}
                          height={497}
                          className="service-hero-image object-contain w-full h-full"
                        />
                      ) : slug === 'naprawa-drukarek' ? (
                        // Center-active carousel of the same category hero
                        // images used on their own service pages (laser,
                        // inkjet, needle, thermal, plotter, 3D) — replaces
                        // the single static Serwis_Drukarek.webp. No new
                        // assets, same fixed hero zone.
                        <HeroPrinterCarousel alt={imageAlt} slides={PRINTER_HERO_SLIDES} />
                      ) : slug === 'serwis-drukarek-atramentowych' ? (
                        // Same stack-carousel mechanic as naprawa-drukarek
                        // (default "printer" variant, no new CSS) — the
                        // existing hero image stays slide 0, followed by 5
                        // more inkjet-printer renders cropped to their own
                        // alpha bbox (see public/images/atrament-carousel-*.webp).
                        <HeroPrinterCarousel
                          alt={imageAlt}
                          slides={ATRAMENT_HERO_SLIDES}
                          sizeCoefficients={ATRAMENT_SIZE_COEFFICIENTS}
                          verticalBias={ATRAMENT_VERTICAL_BIAS}
                        />
                      ) : slug === 'serwis-drukarek-laserowych' ? (
                        // Same stack-carousel mechanic as the atramentowych
                        // page above — the existing hero image stays slide 0
                        // unchanged, followed by 6 more laser-printer/MFP
                        // renders cropped to their own alpha bbox (see
                        // public/images/laser-carousel-*.webp).
                        <HeroPrinterCarousel
                          alt={imageAlt}
                          slides={LASER_HERO_SLIDES}
                          sizeCoefficients={LASER_SIZE_COEFFICIENTS}
                          verticalBias={LASER_VERTICAL_BIAS}
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
                    </div>
                  </div>
                  <div className={`text-center flex flex-col items-center justify-center relative z-10 ${HERO_SCALE[slug] ? 'mt-14 md:mt-0' : ''}`}>
                    <h1 className="font-cormorant font-bold text-[#ffffff] md:w-[470px] text-[40px] md:text-[52px] leading-[1.15]">
                      {locale === 'pl' && HERO_LINES_PL[slug] ? (
                        <>
                          <span className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap">Serwis i naprawa{' '}</span>
                          <span className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap">{HERO_LINES_PL[slug].mid}{' '}</span>
                          <span className="block w-full text-center md:w-max md:relative md:left-1/2 md:[transform:translateX(-50%)] md:whitespace-nowrap">we Wrocławiu</span>
                        </>
                      ) : (
                        headings.h1 || service.title
                      )}
                    </h1>

                    {headings.h2 && (
                      <h2 className="h1-sub text-[14px] md:text-[16px] opacity-80 font-cormorant font-bold text-[#ffffff] leading-[1.1] mt-1">
                        {headings.h2}
                      </h2>
                    )}
                  </div>
                </div>
              </div>
              {slug === 'druk-3d-na-zamowienie' ? (
                <div className="mt-[40px]">
                  <PrintedPartsTicker />
                </div>
              ) : slugBrands && slugBrands.length > 0 && (
                <div className="mt-[40px]">
                  <BrandTicker brandNames={slugBrands} />
                </div>
              )}
              <div className={`container max-w-5xl mx-auto px-4 md:px-6 text-center relative z-10 ${REPAIR_ACCORDION_LAYOUT_SLUGS.includes(slug) ? 'mb-3' : 'mb-6'}${slug === 'druk-3d-na-zamowienie' ? ' mt-[74px]' : slugBrands && slugBrands.length > 0 ? ' mt-[44px]' : ''}`}>
                <FadeSlideP className={`hidden md:block ${REPAIR_ACCORDION_LAYOUT_SLUGS.includes(slug) ? 'text-[20px]' : 'text-[18px]'} text-[#bfa76a] font-cormorant italic leading-tight font-semibold drop-shadow-2xl ${slug === 'drukarka-zastepcza' ? 'whitespace-nowrap' : 'max-w-3xl mx-auto'}`}>
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
                {(relatedServices ?? []).map((rs, i) => (
                  <Link
                    key={rs.slug}
                    href={`${basePath}/${rs.slug}`}
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
    ${EDGE_CLASSES[i % EDGE_CLASSES.length]}
    ${ORIENT_CLASSES[i % ORIENT_CLASSES.length]}
    ${CORNER_CLASSES[i % CORNER_CLASSES.length]}
  `}
                  >
                    <div className="z-10 h-[120px] flex-shrink-0 w-[50%]">
                      <div className="relative w-full h-full service-card-icon-zoom">
                        <Image
                          src={rs.iconSrc}
                          alt={`${rs.title} ${labels.relatedIconAltSuffix}`}
                          fill
                          sizes="(max-width: 768px) 35vw, 180px"
                          className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>

                    <div className="relative z-20 h-[120px] flex items-center pl-[15px] w-[50%]">
                      <div className="font-cormorant font-semibold text-[#3A2817] leading-[1.25]" style={{ fontSize: '25.4px' }}>
                        {rs.displayTitle}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <SeoBlocksGrid items={seoBlocks?.items ?? []} variant="related" />
          </section>
        ) : (
          <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
            <ServiceAccordion service={service} locale={locale} />
            <SeoBlocksGrid items={seoBlocks?.items ?? []} variant="accordion" slug={slug} />
          </section>
        )}

        <div className="relative z-10 -mt-6 md:-mt-10 -mb-[80px] overflow-visible">
          <GoogleReviews />
        </div>

      </main>

      <Footer
        t={footerT}
        bare
        cta={{
          heading: labels.ctaHeading,
          text: labels.ctaText,
          button: labels.ctaButton,
          href: labels.ctaHref,
        }}
      />
    </>
  )
}
