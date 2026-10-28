import type { ComponentProps, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Header } from '@/components/header'
import { Hero } from '@/components/serwis-wysylkowy/sections/hero'
import EquipmentTicker from '@/components/serwis-wysylkowy/equipment-ticker'
import GoogleReviews from '@/components/serwis-wysylkowy/google-reviews'
import { BasicQuestions } from '@/components/serwis-wysylkowy/sections/basic-questions'
import { SERVICE_CATEGORIES } from '@/config/service-categories'

const SITE_URL = 'https://serwis.omobonus.com.pl'
const CATALOG_NAME = { pl: 'Serwis i naprawa', uk: 'Сервіс і ремонт', ru: 'Сервис и ремонт', en: 'Service and repair' } as const

// Below-fold components: split into separate chunks so the initial JS
// bundle only contains Header + Hero code, allowing LCP to paint sooner.
const Services = dynamic(() => import('@/components/serwis-wysylkowy/sections/services').then(m => ({ default: m.Services })))
const HomeCta = dynamic(() => import('@/components/serwis-wysylkowy/home-cta').then(m => ({ default: m.HomeCta })))
const Footer = dynamic(() => import('@/components/footer').then(m => ({ default: m.Footer })))

interface HomePageTemplateProps {
  heroT?: NonNullable<ComponentProps<typeof Hero>>['t']
  servicesData?: NonNullable<ComponentProps<typeof Services>>['servicesData']
  servicesBasePath?: NonNullable<ComponentProps<typeof Services>>['basePath']
  servicesT?: NonNullable<ComponentProps<typeof Services>>['t']
  footerT?: NonNullable<ComponentProps<typeof Footer>>['t']
  cta: {
    heading: ReactNode
    text: ReactNode
    headingMobile?: ReactNode
    textMobile?: ReactNode
    button: ReactNode
    href: string
  }
  locale?: 'pl' | 'uk' | 'ru' | 'en'
}

export function HomePageTemplate({
  heroT,
  servicesData,
  servicesBasePath,
  servicesT,
  footerT,
  cta,
  locale = 'pl',
}: HomePageTemplateProps) {
  // Services is a client component: pass only what the cards render so the
  // full services dataset (prices, accordions) isn't serialized into the HTML.
  const servicesCards = servicesData?.map(({ slug, title, icon }) => ({ slug, title, icon }))
  // The services shown on the cards, added to the site-wide LocalBusiness (same @id, so
  // search engines merge it with the layout's block) — home page only.
  const offerCatalogLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: 'Omobonus Serwis',
    url: SITE_URL,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: CATALOG_NAME[locale],
      itemListElement: SERVICE_CATEGORIES.map((category) => ({
        '@type': 'OfferCatalog',
        name: (category.homeTitle ?? category.title)[locale],
        itemListElement: [...category.items, ...(category.subgroup?.items ?? [])]
          // Same list as the home cards: menu-only entries (Drukarka zastępcza)
          // have no card here, so they're not claimed in this page's markup.
          .filter((item) => !item.menuOnly && (!item.locales || item.locales.includes(locale)))
          .map((item) => {
            const slug = item.href.split('/').pop() as string
            return {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: servicesData?.find((s) => s.slug === slug)?.title ?? item.label[locale],
                url: `${SITE_URL}${servicesBasePath ?? '/uslugi'}/${slug}`,
              },
            }
          }),
      })),
    },
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogLd) }} />
      <Header locale={locale} />
      <div>
        <Hero t={heroT} locale={locale} cta={{ label: cta.button, href: cta.href }}>
          <div className="absolute bottom-[36px] left-0 w-full z-10 md:bottom-[48px]">
            <EquipmentTicker compact />
          </div>
        </Hero>
      </div>
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), var(--bg-parchment)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="home-below relative z-10">
          <Services servicesData={servicesCards} basePath={servicesBasePath} t={servicesT} locale={locale} categories={SERVICE_CATEGORIES.slice(0, 3)} bare />

          <div className="pt-6 md:pt-10">
            <BasicQuestions />
          </div>

          {/* The "Skąd nazwa / O nas" block is left out here; only the reviews stay. */}
          <div className="pt-4 md:pt-6">
            <GoogleReviews locale={locale} />
          </div>

          <HomeCta {...cta} singleHeading />

          <Footer t={footerT} bare />
        </div>
      </div>
    </>
  )
}
