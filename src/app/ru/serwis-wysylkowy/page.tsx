import type { Metadata } from 'next'
import { serwisWysylkowyMetadata } from '@/components/serwis-wysylkowy/seo'
import { HomePageTemplate } from '@/components/serwis-wysylkowy/page-template'
import { HERO_RU } from '@/components/serwis-wysylkowy/i18n-hero'
import { servicesRu } from '@/lib/services-data-ru'
import { ru } from '@/lib/i18n/ru'

export const metadata: Metadata = serwisWysylkowyMetadata('ru')

export default function SerwisWysylkowyPage() {
  return (
    <HomePageTemplate
      heroT={HERO_RU}
      servicesData={servicesRu}
      servicesBasePath="/ru/uslugi"
      servicesT={ru.services}
      footerT={ru.footer}
      cta={{
        heading: ru.homeCta.heading,
        text: ru.homeCta.text,
        headingMobile: ru.homeCta.headingMobile,
        textMobile: ru.homeCta.textMobile,
        button: ru.homeCta.button,
        href: '/ru/kontakt',
      }}
      locale="ru"
    />
  )
}
