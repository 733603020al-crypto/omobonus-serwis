import type { Metadata } from 'next'
import { AboutPageTemplate } from '@/components/about-page-template'
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
    <AboutPageTemplate
      brandCaptionText="Ремонтуємо техніку популярних брендів"
      onasHeroT={uk.onasHero}
      advantagesT={uk.advantages}
      aboutT={uk.aboutOnas}
      teamT={uk.team}
      footerT={uk.footer}
    />
  )
}
