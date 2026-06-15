import type { Metadata } from 'next'
import { HomePageTemplate } from '@/components/home-page-template'
import { servicesUk } from '@/lib/services-data-uk'
import { uk } from '@/lib/i18n/uk'

export const metadata: Metadata = {
  title: "Ремонт комп'ютерів, ноутбуків і принтерів | Omobonus Вроцлав",
  description: "✔ Професійний ремонт і сервіс комп’ютерів, ноутбуків, принтерів та МФУ у Вроцлаві ✔ Діагностика за 15 хв ✔ Ціни на сайті ✔ Телефонуйте: 793 759 262",
  alternates: {
    canonical: "https://serwis.omobonus.com.pl/uk",
    languages: {
      pl: "https://serwis.omobonus.com.pl",
      uk: "https://serwis.omobonus.com.pl/uk",
      ru: "https://serwis.omobonus.com.pl/ru",
      "x-default": "https://serwis.omobonus.com.pl",
    },
  },
  openGraph: {
    title: "Сервіс комп'ютерів, ноутбуків і принтерів Вроцлав | Omobonus",
    description: "Професійний сервіс комп'ютерів, ноутбуків і принтерів у Вроцлаві.",
    url: "https://serwis.omobonus.com.pl/uk",
    images: [
      {
        url: "/images/omobonus-hero.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function UkHome() {
  return (
    <HomePageTemplate
      heroT={uk.hero}
      servicesData={servicesUk}
      servicesBasePath="/uk/uslugi"
      servicesT={uk.services}
      aboutT={uk.about}
      footerT={uk.footer}
      cta={{
        heading: uk.homeCta.heading,
        text: uk.homeCta.text,
        button: uk.homeCta.button,
        href: '/uk/kontakt',
      }}
      locale="uk"
    />
  )
}
