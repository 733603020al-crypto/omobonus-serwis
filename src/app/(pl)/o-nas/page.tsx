import type { Metadata } from 'next'
import { AboutPageTemplate } from '@/components/about-page-template'
import { withSocialMeta } from '@/lib/social-meta'

export const metadata: Metadata = withSocialMeta('pl', {
  title: 'O nas | Uczciwy serwis komputerów i drukarek',
  description: '✔ 10+ lat napraw komputerów, laptopów i drukarek we Wrocławiu ✔ Uczciwe ceny bez ukrytych kosztów ✔ Mówimy, gdy naprawa się nie opłaca ☎ 793 759 262',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/o-nas',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/o-nas',
      'uk': 'https://serwis.omobonus.com.pl/uk/o-nas',
      'ru': 'https://serwis.omobonus.com.pl/ru/o-nas',
      'en': 'https://serwis.omobonus.com.pl/en/o-nas',
      'x-default': 'https://serwis.omobonus.com.pl/o-nas',
    },
  },
})

export default function ONasPage() {
  return <AboutPageTemplate brandCaptionText="Naprawiamy sprzęt popularnych marek" locale="pl" />
}
