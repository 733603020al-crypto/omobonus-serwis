import type { ComponentProps, ReactNode } from 'react'
import { Header } from '@/components/header'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Services } from '@/components/sections/services'
import BrandTicker from '@/components/brand-ticker'
import { Footer } from '@/components/footer'
import { HomeCta } from '@/components/home-cta'
import manifest from '@/config/manifest'

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
  contactSection?: ReactNode
}

export function HomePageTemplate({
  heroT,
  servicesData,
  servicesBasePath,
  servicesT,
  aboutT,
  footerT,
  cta,
  contactSection,
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
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${manifest.Background_1}')`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10">
          <Services servicesData={servicesData} basePath={servicesBasePath} t={servicesT} bare />

          <About t={aboutT} bare showMoreLink />

          <HomeCta {...cta} />

          {contactSection}

          <Footer t={footerT} bare />
        </div>
      </div>
    </>
  )
}
