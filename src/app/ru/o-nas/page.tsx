import type { Metadata } from 'next'
import { AboutPageTemplate } from '@/components/about-page-template'
import { ru } from '@/lib/i18n/ru'

export const metadata: Metadata = {
  title: 'О нас | Честный сервис компьютеров и принтеров | Omobonus Вроцлав',
  description: 'Мы не зарабатываем на вашей проблеме. Omobonus — сервис компьютеров, ноутбуков и принтеров во Вроцлаве ✔ 10+ лет опыта ✔ Диагностика за 15 мин ✔ Ремонт за 48 часов',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/ru/o-nas',
    languages: {
      pl: 'https://serwis.omobonus.com.pl/o-nas',
      uk: 'https://serwis.omobonus.com.pl/uk/o-nas',
      ru: 'https://serwis.omobonus.com.pl/ru/o-nas',
      'x-default': 'https://serwis.omobonus.com.pl/o-nas',
    },
  },
}

export default function RuONasPage() {
  return (
    <AboutPageTemplate
      brandCaptionText="Ремонтируем технику популярных брендов"
      onasHeroT={ru.onasHero}
      advantagesT={ru.advantages}
      aboutT={ru.aboutOnas}
      teamT={ru.team}
      footerT={ru.footer}
    />
  )
}
