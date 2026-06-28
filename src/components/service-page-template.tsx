import '@/app/styles/accordion.css'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import type { ReactNode, ComponentProps } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import ServiceAccordion from '@/components/service-accordion'
import GoogleReviews from '@/components/google-reviews'
import { CallButton } from '@/components/ui/CallButton'
import BrandTicker from '@/components/brand-ticker'
import { FadeSlideText } from '@/components/ui/FadeSlideText'
import type { ServiceData } from '@/lib/services-data'

const PAGE_CLASS_SLUGS = [
  'serwis-drukarek-termicznych', 'serwis-laptopow', 'serwis-komputerow-stacjonarnych',
  'outsourcing-it', 'serwis-drukarek-laserowych', 'serwis-drukarek-atramentowych',
  'serwis-drukarek-3d', 'serwis-plotterow', 'serwis-drukarek-iglowych',
  'naprawa-drukarek', 'wynajem-drukarek', 'drukarka-zastepcza',
]

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
  relatedCta: string
  relatedIconAltSuffix: string
  drukarkaZastepczaNote: ReactNode
}

interface SeoBlocksGridProps {
  items: string[]
  variant: 'related' | 'accordion'
}

function SeoBlocksGrid({ items, variant }: SeoBlocksGridProps) {
  if (!items.length) return null
  const wrapperClass = variant === 'related' ? 'pt-2 pb-6 md:pb-8' : 'pt-6 pb-24'
  return (
    <div className={wrapperClass}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-[2px] text-left break-words">
        {items.map((text, index) => (
          <h2
            key={index}
            className={
              variant === 'related'
                ? `text-[12px] font-normal leading-[1.1] m-0 p-0 text-[#bfa76a]/70 text-left ${index % 2 === 0 ? 'md:text-right md:pr-2' : 'md:text-left md:pl-2'}`
                : `text-[12px] font-normal leading-[1.1] m-0 p-0 text-[#bfa76a]/70 ${index % 2 === 0 ? 'text-left md:text-right md:pr-2' : 'text-left md:pl-2'}`
            }
          >
            {text}
          </h2>
        ))}
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
  jsonLd: object
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className={`pt-[40px] pb-[10px] md:pb-[20px] relative overflow-visible ${pageClass}`}>

        <div className="absolute inset-0">
          <Image
            src="/images/omobonus-hero2.webp"
            alt="Omobonus serwis"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative">
          {pageClass ? (
            <>
              <div className="container max-w-5xl mx-auto px-4 md:px-6 relative z-10 pt-1 md:pt-2 mb-1">
                <div
                  className={`grid grid-cols-1 gap-4 md:gap-10 items-center ${slug === 'naprawa-drukarek'
                    ? 'md:grid-cols-[40%_60%]'
                    : 'md:grid-cols-[25%_75%]'
                    }`}
                >
                  <div className="flex justify-center md:justify-start">
                    <div className="service-hero-image-wrap relative w-full">
                      {heroLabels.map((label, index) => (
                        <span
                          key={label}
                          className={`service-hero-label service-hero-label-${index + 1}`}
                        >
                          {label}
                        </span>
                      ))}

                      <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={420}
                        height={420}
                        sizes="(max-width: 768px) 85vw, 420px"
                        className="service-hero-image object-contain w-full h-auto"
                        priority
                      />
                    </div>
                  </div>
                  <div className="text-center flex flex-col items-center justify-center">
                    <h1 className="text-[32px] md:text-[40px] font-cormorant font-bold text-[#ffffff] leading-[1.1]">
                      {headings.h1 || service.title}
                    </h1>

                    {headings.h2 && (
                      <h2 className="h1-sub text-[14px] md:text-[16px] opacity-80 font-cormorant font-bold text-[#ffffff] leading-[1.1] mt-1">
                        {headings.h2}
                      </h2>
                    )}
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-[28px] items-center justify-center w-full">
                      <CallButton
                        variant="primary"
                        href="tel:+48793759262"
                        className="w-[80%] md:w-auto"
                      >
                        <span className="md:hidden">{labels.callNow}</span>
                        <span className="hidden md:inline">793 759 262</span>
                      </CallButton>

                      <CallButton
                        variant="secondary"
                        href={labels.formHref}
                        className="w-[80%] md:w-auto"
                      >
                        {labels.sendRequest}
                      </CallButton>
                    </div>
                  </div>
                </div>
              </div>
              {slugBrands && slugBrands.length > 0 && (
                <div className="mt-[40px]">
                  <BrandTicker brandNames={slugBrands} />
                </div>
              )}
              <div className={`container max-w-5xl mx-auto px-4 md:px-6 text-center relative z-10 mb-6${slugBrands && slugBrands.length > 0 ? ' mt-[44px]' : ''}`}>
                <FadeSlideText className="hidden md:block text-[18px] text-[#bfa76a] font-cormorant italic leading-tight max-w-3xl mx-auto font-semibold drop-shadow-2xl">
                  {slug === 'drukarka-zastepcza'
                    ? labels.fadeSlideDrukarkaZastepcza
                    : slug === 'wynajem-drukarek'
                      ? labels.fadeSlideWynajem
                      : labels.fadeSlideDefault}
                </FadeSlideText>
              </div>
            </>
          ) : null}
        </div>

        {slug === 'naprawa-drukarek' ? (
          <section id="uslugi" className="relative text-center pt-0 pb-2">
            <div className="relative max-w-7xl mx-auto px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                {(relatedServices ?? []).map((rs) => (
                  <Link
                    key={rs.slug}
                    href={`${basePath}/${rs.slug}`}
                    className="group relative min-h-[70px] rounded-lg py-2 px-3 border-2 border-[rgba(200,169,107,0.5)] flex items-center text-left w-full services-card-bg transition-all duration-300 ease-out hover:border-[rgba(200,169,107,0.85)] hover:-translate-y-[2px] hover:shadow-[0_0_24px_rgba(191,167,106,0.35)]"
                  >
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#bfa76a]/40 via-[#bfa76a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />

                    <div className="relative z-10 mr-4 w-[50px] h-[50px] flex-shrink-0 flex items-center justify-center">
                      <Image
                        src={rs.iconSrc}
                        alt={`${rs.title} ${labels.relatedIconAltSuffix}`}
                        width={50}
                        height={50}
                        sizes="50px"
                        className="object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                    </div>

                    <div className="relative z-10 flex-1">
                      <div className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] group-hover:text-white transition-colors mb-1 leading-tight">
                        {rs.displayTitle}
                      </div>
                      <div className="flex items-center gap-2 text-[#bfa76a] text-xs font-serif group-hover:translate-x-1 transition-transform">
                        <span>{labels.relatedCta}</span>
                        <ArrowRight className="w-3 h-3" />
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
            <SeoBlocksGrid items={seoBlocks?.items ?? []} variant="accordion" />
          </section>
        )}

        {service.slug === 'drukarka-zastepcza' && (
          <div className="relative z-10 container max-w-5xl mx-auto px-4 md:px-6 pt-[10px] pb-[30px]">
            <p className="text-[12px] text-[#cbb27c] leading-relaxed text-justify max-w-4xl mx-auto">
              {labels.drukarkaZastepczaNote}
            </p>
          </div>
        )}

        <div className="relative z-10 -mt-6 md:-mt-10 -mb-[80px] overflow-visible">
          <GoogleReviews />
        </div>

      </main>

      <Footer t={footerT} />
    </>
  )
}
