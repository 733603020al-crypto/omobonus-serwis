import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { About } from '@/components/sections/about'
import { Footer } from '@/components/footer'
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
      <About t={uk.about} />
      <Footer t={uk.footer} />
    </>
  )
}
