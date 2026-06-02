import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { ONasHero } from '@/components/sections/o-nas-hero'
import { Advantages } from '@/components/sections/advantages'
import { About } from '@/components/sections/about'
import { Team } from '@/components/sections/team'
import GoogleReviews from '@/components/google-reviews'
import { Footer } from '@/components/footer'
import manifest from '@/config/manifest'
import { uk } from '@/lib/i18n/uk'

export const metadata: Metadata = {
  title: 'Про нас | Omobonus Вроцлав',
  description: 'Познайомтеся з Omobonus — чесний сервіс комп\'ютерів, ноутбуків і принтерів у Вроцлаві.',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/uk/o-nas',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/o-nas',
      'uk': 'https://serwis.omobonus.com.pl/uk/o-nas',
      'x-default': 'https://serwis.omobonus.com.pl/o-nas',
    },
  },
}

export default function UkONasPage() {
  return (
    <>
      <Header />
      <ONasHero t={uk.onasHero} />
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
          <Advantages t={uk.advantages} />
          <About t={uk.aboutOnas} bare compact showReviews={false} />
          <Team t={uk.team} />
          <div className="pt-10 md:pt-16 pb-10 md:pb-16">
            <GoogleReviews />
          </div>
          <Footer t={uk.footer} bare />
        </div>
      </div>
    </>
  )
}
