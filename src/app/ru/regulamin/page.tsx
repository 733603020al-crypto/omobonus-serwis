import { Metadata } from 'next'
import { LegalPageTemplate } from '@/components/legal-page-template'
import { regulaminContentRu } from '@/lib/legal/legal-pages'
import { ru } from '@/lib/i18n/ru'

export const metadata: Metadata = {
  title: 'Условия и положения | Omobonus Serwis',
  description: 'Условия и положения сервиса Omobonus Вроцлав. Правила ремонта компьютеров и принтеров, гарантия, претензии.',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/ru/regulamin',
    languages: {
      pl: 'https://serwis.omobonus.com.pl/regulamin',
      uk: 'https://serwis.omobonus.com.pl/uk/regulamin',
      ru: 'https://serwis.omobonus.com.pl/ru/regulamin',
      'x-default': 'https://serwis.omobonus.com.pl/regulamin',
    },
  },
}

export const dynamic = 'force-static'

export default function RuRegulamin() {
  return <LegalPageTemplate content={regulaminContentRu} footerT={ru.footer} cardMarginBottomClass="-mb-[25%]" minHeightZero />
}
