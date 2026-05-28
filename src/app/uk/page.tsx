import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Services } from '@/components/sections/services'
import BrandTicker from '@/components/brand-ticker'
import { Footer } from '@/components/footer'
import { servicesUk } from '@/lib/services-data-uk'
import { uk } from '@/lib/i18n/uk'
import { ContactUk } from '@/components/sections/contact-uk'

export const metadata: Metadata = {
  title: 'Сервіс і ремонт комп\'ютерів, ноутбуків і принтерів | Omobonus Вроцлав',
  description: '✔ Професійний сервіс комп\'ютерів, ноутбуків і принтерів у Вроцлаві ✔ Діагностика за 15 хв ✔ Повний прайс-лист на сайті ✔ Запишіться на сервіс! ☎ 793 759 262',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/uk',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl',
      'uk': 'https://serwis.omobonus.com.pl/uk',
      'x-default': 'https://serwis.omobonus.com.pl',
    },
  },
  openGraph: {
    title: 'Сервіс комп\'ютерів, ноутбуків і принтерів Вроцлав | Omobonus',
    description: 'Професійний сервіс комп\'ютерів, ноутбуків і принтерів у Вроцлаві. Ремонт обладнання, чесні ціни без прихованих витрат.',
    url: 'https://serwis.omobonus.com.pl/uk',
    images: [
      {
        url: '/images/omobonus-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Omobonus - професійний сервіс комп\'ютерів і принтерів у Вроцлаві',
      },
    ],
  },
}

export default function UkHome() {
  return (
    <>
      <Header />
      <div>
        <Hero t={uk.hero}>
          <div className="absolute bottom-[40px] left-0 w-full z-10 md:bottom-[48px]">
            <BrandTicker compact />
          </div>
        </Hero>
      </div>
      <Services servicesData={servicesUk} basePath="/uk/uslugi" t={uk.services} />

      <About t={uk.about} />

      <div style={{ marginTop: "-80px" }}>
        <ContactUk />
      </div>

      <Footer t={uk.footer} />
    </>
  )
}
