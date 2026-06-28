import type { ComponentProps, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Header } from '@/components/header'
import { Hero } from '@/components/sections/hero'
import BrandTicker from '@/components/brand-ticker'
import manifest from '@/config/manifest'

// Below-fold components: split into separate chunks so the initial JS
// bundle only contains Header + Hero code, allowing LCP to paint sooner
const Services = dynamic(() => import('@/components/sections/services').then(m => ({ default: m.Services })))
const About = dynamic(() => import('@/components/sections/about').then(m => ({ default: m.About })))
const HomeCta = dynamic(() => import('@/components/home-cta').then(m => ({ default: m.HomeCta })))
const HomeContactForm = dynamic(() => import('@/components/sections/home-contact-form').then(m => ({ default: m.HomeContactForm })))
const Footer = dynamic(() => import('@/components/footer').then(m => ({ default: m.Footer })))

interface HomePageTemplateProps {
  heroT?: NonNullable<ComponentProps<typeof Hero>>['t']
  servicesData?: NonNullable<ComponentProps<typeof Services>>['servicesData']
  servicesBasePath?: NonNullable<ComponentProps<typeof Services>>['basePath']
  servicesT?: NonNullable<ComponentProps<typeof Services>>['t']
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
  aboutT,
  footerT,
  cta,
  locale = 'pl',
}: HomePageTemplateProps) {
  return (
    <>
      <Header />
      <div>
        <Hero t={heroT}>
          <div className="absolute bottom-[40px] left-0 w-full z-10 md:bottom-[48px]">
            <BrandTicker compact />
          </div>
        </Hero>
      </div>
      <div
        className="relative isolate overflow-hidden [background-attachment:scroll] md:[background-attachment:fixed]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${manifest.Background_1}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10">
          <Services servicesData={servicesData} basePath={servicesBasePath} t={servicesT} bare />

          <About t={aboutT} bare showMoreLink />

          <HomeCta {...cta} />

          <div className="mt-4 md:mt-6">
            <HomeContactForm locale={locale} bare />
          </div>

          <Footer t={footerT} bare />
        </div>
      </div>
    </>
  )
}
