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
          <About t={uk.about} bare showReviews={false} />
          <Team />
          <GoogleReviews />
          <Footer t={uk.footer} bare />
        </div>
      </div>
    </>
  )
}
