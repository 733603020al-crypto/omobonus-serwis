import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Services } from '@/components/sections/services'
import BrandTicker from '@/components/brand-ticker'
import { Footer } from '@/components/footer'
import manifest from '@/config/manifest'
import dynamic from 'next/dynamic'

const Contact = dynamic(() => import('@/components/sections/contact').then((mod) => mod.Contact))


export const metadata: Metadata = {
  title: 'Naprawa Komputerów, Laptopów i Drukarek | Omobonus Wrocław',
  description: '✔ Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu  ✔ Diagnoza w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś!  ✔ ☎ 793 759 262',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl',
      'uk': 'https://serwis.omobonus.com.pl/uk',
      'x-default': 'https://serwis.omobonus.com.pl',
    },
  },
  openGraph: {
    title: 'Serwis komputerów, laptopów i drukarek Wrocław | Omobonus',
    description: 'Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu. Naprawa sprzętu, uczciwe ceny bez ukrytych kosztów.',
    url: 'https://serwis.omobonus.com.pl',
    images: [
      {
        url: '/images/omobonus-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Omobonus - profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu',
      },
    ],
  },
}

export default function Home() {
  return (
    <>
      <Header />
      <div>
        <Hero>
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
          <Services bare />

          {/* Święty Omobonus */}
          <About bare showMoreLink />

          <div className="mt-4 md:mt-6">
            <Contact bare />
          </div>

          <Footer bare />
        </div>
      </div>
    </>
  )
}
