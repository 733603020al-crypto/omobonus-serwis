import { Metadata } from 'next'
import { LegalPageTemplate } from '@/components/legal-page-template'
import { politykaPrywatnosciContentRu } from '@/lib/legal/legal-pages'
import { ru } from '@/lib/i18n/ru'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | Omobonus Serwis',
  description: 'Политика конфиденциальности сервиса Omobonus Вроцлав. Принципы обработки персональных данных, защита GDPR.',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/ru/polityka-prywatnosci',
    languages: {
      pl: 'https://serwis.omobonus.com.pl/polityka-prywatnosci',
      uk: 'https://serwis.omobonus.com.pl/uk/polityka-prywatnosci',
      ru: 'https://serwis.omobonus.com.pl/ru/polityka-prywatnosci',
      'x-default': 'https://serwis.omobonus.com.pl/polityka-prywatnosci',
    },
  },
}

export const dynamic = 'force-static'

export default function RuPolitykaPrywatnosci() {
  return <LegalPageTemplate content={politykaPrywatnosciContentRu} footerT={ru.footer} cardMarginBottomClass="-mb-[15%]" />
}
