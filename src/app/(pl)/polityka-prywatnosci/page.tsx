import { Metadata } from 'next'
import { LegalPageTemplate } from '@/components/legal-page-template'
import { politykaPrywatnosciContent } from '@/lib/legal/legal-pages'

export const metadata: Metadata = {
  title: 'Polityka Prywatności | Omobonus Serwis',
  description: 'Polityka prywatności serwisu Omobonus Wrocław. Zasady przetwarzania danych osobowych, ochrona RODO.',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/polityka-prywatnosci',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/polityka-prywatnosci',
      'uk': 'https://serwis.omobonus.com.pl/uk/polityka-prywatnosci',
      'x-default': 'https://serwis.omobonus.com.pl/polityka-prywatnosci',
    },
  },
}

export const dynamic = 'force-static'

export default function PolitykaPrywatnosci() {
  return <LegalPageTemplate content={politykaPrywatnosciContent} cardMarginBottomClass="-mb-[15%]" />
}
