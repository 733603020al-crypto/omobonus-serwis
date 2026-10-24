import type { Metadata } from 'next'
import { AboutPageTemplate } from '@/components/about-page-template'
import { ru } from '@/lib/i18n/ru'
import { withSocialMeta } from '@/lib/social-meta'

export const metadata: Metadata = withSocialMeta('ru', {
  title: 'О нас | Честный сервис компьютеров и принтеров',
  description: '✔ 10+ лет ремонта компьютеров, ноутбуков и принтеров во Вроцлаве ✔ Честные цены без скрытых платежей ✔ Скажем, когда ремонт невыгоден ☎ 793 759 262',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/ru/o-nas',
    languages: {
      pl: 'https://serwis.omobonus.com.pl/o-nas',
      uk: 'https://serwis.omobonus.com.pl/uk/o-nas',
      ru: 'https://serwis.omobonus.com.pl/ru/o-nas',
      en: 'https://serwis.omobonus.com.pl/en/o-nas',
      'x-default': 'https://serwis.omobonus.com.pl/o-nas',
    },
  },
})

export default function RuONasPage() {
  return (
    <AboutPageTemplate
      brandCaptionText="Ремонтируем технику популярных брендов"
      onasHeroT={ru.onasHero}
      heroT={ru.hero}
      advantagesT={ru.advantages}
      aboutT={ru.aboutOnas}
      teamT={ru.team}
      footerT={ru.footer}
      locale="ru"
    />
  )
}
