import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Services } from '@/components/sections/services'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Omobonus – serwis komputerów, laptopów i drukarek Wrocław',
  description:
    'Profesjonalny serwis komputerów i drukarek we Wrocławiu — uczciwa wycena, brak ukrytych kosztów.',
}

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />
    </>
  )
}