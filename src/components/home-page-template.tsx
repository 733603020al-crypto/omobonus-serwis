import type { ComponentProps, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Header } from '@/components/header'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import BrandTicker from '@/components/brand-ticker'
import GoogleReviews from '@/components/google-reviews'

// Below-fold components: split into separate chunks so the initial JS
// bundle only contains Header + Hero code, allowing LCP to paint sooner.
// About is a Server Component (no client JS besides the tiny FadeSlideP
// eyebrow wrapper it renders internally), so it's imported statically.
const Services = dynamic(() => import('@/components/sections/services').then(m => ({ default: m.Services })))
const HomeCta = dynamic(() => import('@/components/home-cta').then(m => ({ default: m.HomeCta })))
const Footer = dynamic(() => import('@/components/footer').then(m => ({ default: m.Footer })))

interface HomePageTemplateProps {
  heroT?: NonNullable<ComponentProps<typeof Hero>>['t']
  servicesData?: NonNullable<ComponentProps<typeof Services>>['servicesData']
  servicesBasePath?: NonNullable<ComponentProps<typeof Services>>['basePath']
  servicesT?: NonNullable<ComponentProps<typeof Services>>['t']
  servicesExtra?: NonNullable<ComponentProps<typeof Services>>['extraServices']
  aboutT?: NonNullable<ComponentProps<typeof About>>['t']
  footerT?: NonNullable<ComponentProps<typeof Footer>>['t']
  cta: {
    heading: ReactNode
    text: ReactNode
    button: ReactNode
    href: string
  }
  locale?: 'pl' | 'uk' | 'ru'
}

export function HomePageTemplate({
  heroT,
  servicesData,
  servicesBasePath,
  servicesT,
  servicesExtra,
  aboutT,
  footerT,
  cta,
  locale = 'pl',
}: HomePageTemplateProps) {
  // Services is a client component: pass only what the cards render so the
  // full services dataset (prices, accordions) isn't serialized into the HTML.
  const servicesCards = servicesData?.map(({ slug, title, icon }) => ({ slug, title, icon }))
  return (
    <>
      <Header locale={locale} />
      <div>
        <Hero t={heroT} locale={locale}>
          <div className="absolute bottom-[120px] left-0 w-full z-10 md:bottom-[48px]">
            <BrandTicker compact />
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
        <div className="relative z-10">
          <Services servicesData={servicesCards} basePath={servicesBasePath} t={servicesT} extraServices={servicesExtra} bare />

          <About t={aboutT} bare showMoreLink reviewsSlot={<GoogleReviews />} />

          <HomeCta {...cta} />

          <Footer t={footerT} bare />
        </div>
      </div>
    </>
  )
}
