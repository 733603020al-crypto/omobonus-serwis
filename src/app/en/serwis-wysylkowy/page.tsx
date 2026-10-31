import type { Metadata } from 'next'
import { serwisWysylkowyMetadata } from '@/components/serwis-wysylkowy/seo'
import { HomePageTemplate } from '@/components/serwis-wysylkowy/page-template'
import { HERO_EN } from '@/components/serwis-wysylkowy/i18n-hero'
import { servicesEn } from '@/lib/services-data-en'
import { en } from '@/lib/i18n/en'

export const metadata: Metadata = serwisWysylkowyMetadata('en')

export default function SerwisWysylkowyPage() {
  return (
    <HomePageTemplate
      heroT={HERO_EN}
      servicesData={servicesEn}
      servicesBasePath="/en/uslugi"
      servicesT={en.services}
      footerT={en.footer}
      cta={{
        heading: en.homeCta.heading,
        text: en.homeCta.text,
        headingMobile: en.homeCta.headingMobile,
        textMobile: en.homeCta.textMobile,
        button: en.homeCta.button,
        href: '/en/kontakt',
      }}
      locale="en"
    />
  )
}
