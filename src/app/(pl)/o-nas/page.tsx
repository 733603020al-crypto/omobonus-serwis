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
      <ONasHero />
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
          <Advantages />
          <About bare compact showReviews={false} />
          <Team />
          <div className="pt-10 md:pt-16 pb-10 md:pb-16">
            <GoogleReviews />
          </div>
          <Footer bare />
        </div>
      </div>
    </>
  )
}
