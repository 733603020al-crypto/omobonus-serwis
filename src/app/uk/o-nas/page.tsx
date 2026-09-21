import type { Metadata } from 'next'
import { AboutPageTemplate } from '@/components/about-page-template'
import { uk } from '@/lib/i18n/uk'
import { withSocialMeta } from '@/lib/social-meta'

export const metadata: Metadata = withSocialMeta('uk', {
  title: 'Про нас | Чесний сервіс комп\'ютерів і принтерів | Omobonus Вроцлав',
  description: 'Ми не заробляємо на вашій проблемі. Omobonus — сервіс комп\'ютерів, ноутбуків і принтерів у Вроцлаві ✔ 10+ років досвіду ✔ Діагностика за 15 хв ✔ Ремонт за 48 годин',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/uk/o-nas',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/o-nas',
      'uk': 'https://serwis.omobonus.com.pl/uk/o-nas',
      'ru': 'https://serwis.omobonus.com.pl/ru/o-nas',
      'x-default': 'https://serwis.omobonus.com.pl/o-nas',
    },
  },
})

export default function UkONasPage() {
  return (
    <AboutPageTemplate
      brandCaptionText="Ремонтуємо техніку популярних брендів"
      onasHeroT={uk.onasHero}
      advantagesT={uk.advantages}
      aboutT={uk.aboutOnas}
      teamT={uk.team}
      footerT={uk.footer}
      locale="uk"
    />
  )
}
