import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { About } from '@/components/sections/about'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'O nas | Omobonus Wrocław',
  description: 'Poznaj Omobonus — uczciwy serwis komputerów, laptopów i drukarek we Wrocławiu.',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/o-nas',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/o-nas',
      'uk': 'https://serwis.omobonus.com.pl/uk/o-nas',
      'x-default': 'https://serwis.omobonus.com.pl/o-nas',
    },
  },
}

export default function ONasPage() {
  return (
    <>
      <Header />
      <About />
      <Footer />
    </>
  )
}
