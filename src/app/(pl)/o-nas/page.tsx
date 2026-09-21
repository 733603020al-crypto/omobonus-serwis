import type { Metadata } from 'next'
import { AboutPageTemplate } from '@/components/about-page-template'
import { withSocialMeta } from '@/lib/social-meta'

export const metadata: Metadata = withSocialMeta('pl', {
  title: 'O nas | Uczciwy serwis komputerów i drukarek',
  description: 'Nie bogacimy się na Twoim problemie. Omobonus — serwis komputerów, laptopów i drukarek we Wrocławiu ✔ 10+ lat doświadczenia ✔ Diagnoza w 15 min ✔ Naprawy do 48h',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/o-nas',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/o-nas',
      'uk': 'https://serwis.omobonus.com.pl/uk/o-nas',
      'ru': 'https://serwis.omobonus.com.pl/ru/o-nas',
      'x-default': 'https://serwis.omobonus.com.pl/o-nas',
    },
  },
})

export default function ONasPage() {
  return <AboutPageTemplate brandCaptionText="Naprawiamy sprzęt popularnych marek" locale="pl" />
}
