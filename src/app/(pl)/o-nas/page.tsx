import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { ONasHero } from '@/components/sections/o-nas-hero'
import { Advantages } from '@/components/sections/advantages'
import { About } from '@/components/sections/about'
import { Team } from '@/components/sections/team'
import GoogleReviews from '@/components/google-reviews'
import { Footer } from '@/components/footer'
import manifest from '@/config/manifest'

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
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${manifest.Background_1}')` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10">
          <ONasHero />
          <Advantages />
          <About bare showReviews={false} />
          <Team />
          <GoogleReviews />
          <Footer bare />
        </div>
      </div>
    </>
  )
}
