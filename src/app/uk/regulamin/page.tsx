import { Metadata } from 'next'
import { LegalPageTemplate } from '@/components/legal-page-template'
import { regulaminContent } from '@/lib/legal/legal-pages'
import { uk } from '@/lib/i18n/uk'

export const metadata: Metadata = {
  title: 'Умови та положення | Omobonus Serwis',
  description: 'Умови та положення сервісу Omobonus Вроцлав. Правила ремонту комп\'ютерів і принтерів, гарантія, рекламації.',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/uk/regulamin',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/regulamin',
      'uk': 'https://serwis.omobonus.com.pl/uk/regulamin',
      'x-default': 'https://serwis.omobonus.com.pl/regulamin',
    },
  },
}

export const dynamic = 'force-static'

export default function UkRegulamin() {
  return <LegalPageTemplate content={regulaminContent} footerT={uk.footer} cardMarginBottomClass="-mb-[25%]" minHeightZero />
}
