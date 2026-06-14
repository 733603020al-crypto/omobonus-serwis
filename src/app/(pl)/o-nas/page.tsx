import type { Metadata } from 'next'
import { AboutPageTemplate } from '@/components/about-page-template'

export const metadata: Metadata = {
  title: 'O nas | Uczciwy serwis komputerów i drukarek',
  description: 'Nie bogacimy się na Twoim problemie. Omobonus — serwis komputerów, laptopów i drukarek we Wrocławiu ✔ 10+ lat doświadczenia ✔ Diagnoza w 15 min ✔ Naprawy do 48h',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/o-nas',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/o-nas',
      'uk': 'https://serwis.omobonus.com.pl/uk/o-nas',
      'x-default': 'https://serwis.omobonus.com.pl/o-nas',
    },
  },
}

export default function ONasPage() {
  return <AboutPageTemplate brandCaptionText="Naprawiamy sprzęt popularnych marek" />
}
