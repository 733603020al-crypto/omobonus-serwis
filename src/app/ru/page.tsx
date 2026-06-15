import type { Metadata } from 'next'
import { HomePageTemplate } from '@/components/home-page-template'
import { servicesRu } from '@/lib/services-data-ru'
import { ru } from '@/lib/i18n/ru'

export const metadata: Metadata = {
  title: 'Ремонт компьютеров, ноутбуков и принтеров | Omobonus Вроцлав',
  description: '✔ Профессиональный ремонт и сервис компьютеров, ноутбуков, принтеров и МФУ во Вроцлаве ✔ Диагностика за 15 мин ✔ Цены на сайте ✔ Звоните: 793 759 262',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/ru',
    languages: {
      pl: 'https://serwis.omobonus.com.pl',
      uk: 'https://serwis.omobonus.com.pl/uk',
      ru: 'https://serwis.omobonus.com.pl/ru',
      'x-default': 'https://serwis.omobonus.com.pl',
    },
  },
  openGraph: {
    title: 'Сервис компьютеров, ноутбуков и принтеров Вроцлав | Omobonus',
    description: 'Профессиональный сервис компьютеров, ноутбуков и принтеров во Вроцлаве.',
    url: 'https://serwis.omobonus.com.pl/ru',
    images: [
      {
        url: '/images/omobonus-hero.webp',
        width: 1200,
        height: 630,
      },
    ],
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
        button: ru.homeCta.button,
        href: '/ru/kontakt',
      }}
      locale="ru"
    />
  )
}
