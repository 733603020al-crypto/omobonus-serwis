import { Metadata } from 'next'
import { LegalPageTemplate } from '@/components/legal-page-template'
import { regulaminContent } from '@/lib/legal/legal-pages'

export const metadata: Metadata = {
  title: 'Regulamin | Omobonus Serwis',
  description: 'Regulamin serwisu Omobonus Wrocław. Zasady naprawy komputerów, laptopów i drukarek, gwarancja, reklamacje.',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/regulamin',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/regulamin',
      'uk': 'https://serwis.omobonus.com.pl/uk/regulamin',
      'ru': 'https://serwis.omobonus.com.pl/ru/regulamin',
      'x-default': 'https://serwis.omobonus.com.pl/regulamin',
    },
  },
}

export const dynamic = 'force-static'

export default function Regulamin() {
  return <LegalPageTemplate content={regulaminContent} cardMarginBottomClass="-mb-[25%]" minHeightZero />
}
