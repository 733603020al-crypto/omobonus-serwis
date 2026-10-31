import type { Metadata } from 'next'
import { serwisWysylkowyMetadata } from '@/components/serwis-wysylkowy/seo'
import { HomePageTemplate } from '@/components/serwis-wysylkowy/page-template'
import { HERO_UK } from '@/components/serwis-wysylkowy/i18n-hero'
import { servicesUk } from '@/lib/services-data-uk'
import { uk } from '@/lib/i18n/uk'

export const metadata: Metadata = serwisWysylkowyMetadata('uk')

export default function SerwisWysylkowyPage() {
  return (
    <HomePageTemplate
      heroT={HERO_UK}
      servicesData={servicesUk}
      servicesBasePath="/uk/uslugi"
      servicesT={uk.services}
      footerT={uk.footer}
      cta={{
        heading: uk.homeCta.heading,
        text: uk.homeCta.text,
        headingMobile: uk.homeCta.headingMobile,
        textMobile: uk.homeCta.textMobile,
        button: uk.homeCta.button,
        href: '/uk/kontakt',
      }}
      locale="uk"
    />
  )
}
