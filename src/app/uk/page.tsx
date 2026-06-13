import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
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

          <About t={uk.about} bare showMoreLink />

          <section className="py-12 md:py-16">
            <div className="max-w-3xl mx-auto px-6 text-center text-white space-y-2">
              <h2 className="text-2xl md:text-3xl font-cormorant font-bold leading-tight text-white">
                {uk.homeCta.heading}
              </h2>
              <p className="font-serif text-base md:text-lg font-normal leading-relaxed text-[#bfa76a]">
                {uk.homeCta.text}
              </p>
              <div className="flex justify-center">
                <Link
                  href="/uk/kontakt"
                  className="inline-flex items-center justify-center gap-1 min-w-[200px] rounded-full px-8 py-[16px] font-cormorant font-semibold text-[20px] transition-all duration-300 ease-out backdrop-blur-[2px] text-[#bfa76a] border border-[#bfa76a]/80 bg-[#bfa76a]/10 shadow-[0_0_20px_rgba(191,167,106,0.35)] hover:-translate-y-1 hover:bg-[#bfa76a]/20 hover:shadow-[0_0_28px_rgba(191,167,106,0.45)]"
                >
                  {uk.homeCta.button}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          <div className="mt-4 md:mt-6">
            <ContactUk bare />
          </div>

          <Footer t={uk.footer} bare />
        </div>
      </div>
    </>
  )
}
