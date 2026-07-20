import { Metadata } from 'next'
import { LegalPageTemplate } from '@/components/legal-page-template'
import { politykaPrywatnosciContentUk } from '@/lib/legal/legal-pages'
import { uk } from '@/lib/i18n/uk'

export const metadata: Metadata = {
  title: 'Політика конфіденційності | Omobonus Serwis',
  description: 'Політика конфіденційності сервісу Omobonus Вроцлав. Принципи обробки персональних даних, захист GDPR.',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/uk/polityka-prywatnosci',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/polityka-prywatnosci',
      'uk': 'https://serwis.omobonus.com.pl/uk/polityka-prywatnosci',
      'ru': 'https://serwis.omobonus.com.pl/ru/polityka-prywatnosci',
      'x-default': 'https://serwis.omobonus.com.pl/polityka-prywatnosci',
    },
  },
}

export const dynamic = 'force-static'

export default function UkPolitykaPrywatnosci() {
  return <LegalPageTemplate content={politykaPrywatnosciContentUk} footerT={uk.footer} cardMarginBottomClass="-mb-[15%]" locale="uk" />
}
