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
import manifest from '@/config/manifest'

export const metadata: Metadata = {
  title: "Ремонт комп'ютерів, ноутбуків і принтерів | Omobonus Вроцлав",
  description: "✔ Професійний ремонт і сервіс комп’ютерів, ноутбуків, принтерів та МФУ у Вроцлаві ✔ Діагностика за 15 хв ✔ Ціни на сайті ✔ Телефонуйте: 793 759 262",
  alternates: {
    canonical: "https://serwis.omobonus.com.pl/uk",
    languages: {
      pl: "https://serwis.omobonus.com.pl",
      uk: "https://serwis.omobonus.com.pl/uk",
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
    <>
      <Header />
      <div>
        <Hero t={uk.hero}>
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
          <Services servicesData={servicesUk} basePath="/uk/uslugi" t={uk.services} bare />

          <About t={uk.about} bare />

          <div className="mt-4 md:mt-6">
            <ContactUk bare />
          </div>

          <Footer t={uk.footer} bare />
        </div>
      </div>
    </>
  )
}
