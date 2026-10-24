import type { Metadata } from 'next'
import { AboutPageTemplate } from '@/components/about-page-template'
import { uk } from '@/lib/i18n/uk'
import { withSocialMeta } from '@/lib/social-meta'

export const metadata: Metadata = withSocialMeta('uk', {
  title: 'Про нас | Чесний сервіс комп\'ютерів і принтерів',
  description: "✔ 10+ років ремонту комп'ютерів, ноутбуків і принтерів у Вроцлаві ✔ Чесні ціни без прихованих витрат ✔ Скажемо, коли ремонт невигідний ☎ 793 759 262",
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/uk/o-nas',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/o-nas',
      'uk': 'https://serwis.omobonus.com.pl/uk/o-nas',
      'ru': 'https://serwis.omobonus.com.pl/ru/o-nas',
      'en': 'https://serwis.omobonus.com.pl/en/o-nas',
      'x-default': 'https://serwis.omobonus.com.pl/o-nas',
    },
  },
})

export default function UkONasPage() {
  return (
    <AboutPageTemplate
      brandCaptionText="Ремонтуємо техніку популярних брендів"
      onasHeroT={uk.onasHero}
      heroT={uk.hero}
      advantagesT={uk.advantages}
      aboutT={uk.aboutOnas}
      teamT={uk.team}
      footerT={uk.footer}
      locale="uk"
    />
  )
}
