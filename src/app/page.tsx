import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Services } from '@/components/sections/services'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/footer'
import GoogleReviews from "@/components/google-reviews"

export const metadata: Metadata = {
  title: 'Naprawa Komputerów, Laptopów i Drukarek | Omobonus Wrocław',
  description: '✔ Kompleksowa obsługa ✔ Bezpłatna diagnoza i wycena w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś!',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl',
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
        alt: 'Omobonus - profesjonalny serwis komputerów i drukarek we Wrocławiu',
      },
    ],
  },
}

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />

      {/* Święty Omobonus */}
      <About />

      <div style={{ marginTop: "-40px" }}>

      </div>

      <Contact />


      <Footer />
    </>
  )
}
