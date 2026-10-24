import type { Metadata } from 'next'
import { HomePageTemplate } from '@/components/home-page-template'
import { servicesRu } from '@/lib/services-data-ru'
import { ru } from '@/lib/i18n/ru'

// Meta, og:description i twitter:description — jeden zatwierdzony tekst (docs/seo/description-standard.md)
const DESCRIPTION =
  '✔ Сервис и ремонт компьютеров, ноутбуков и принтеров во Вроцлаве ✔ Цену ремонта согласуем до начала работ ✔ Полный прайс без скрытых платежей ☎ 793 759 262'

export const metadata: Metadata = {
  title: 'Ремонт компьютеров, ноутбуков и принтеров | Omobonus Вроцлав',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/ru',
    languages: {
      pl: 'https://serwis.omobonus.com.pl',
      uk: 'https://serwis.omobonus.com.pl/uk',
      ru: 'https://serwis.omobonus.com.pl/ru',
      en: 'https://serwis.omobonus.com.pl/en',
      'x-default': 'https://serwis.omobonus.com.pl',
    },
  },
  openGraph: {
    title: 'Сервис компьютеров, ноутбуков и принтеров Вроцлав | Omobonus',
    description: DESCRIPTION,
    url: 'https://serwis.omobonus.com.pl/ru',
    images: [
      {
        url: '/images/omobonus-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Omobonus - профессиональный сервис компьютеров, ноутбуков и принтеров во Вроцлаве',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Сервис компьютеров, ноутбуков и принтеров Вроцлав | Omobonus',
    description: DESCRIPTION,
    images: ['/images/omobonus-hero.webp'],
  },
}

export default function RuHome() {
  return (
    <HomePageTemplate
      heroT={ru.hero}
      servicesData={servicesRu}
      servicesBasePath="/ru/uslugi"
      servicesT={ru.services}
      aboutT={ru.about}
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
