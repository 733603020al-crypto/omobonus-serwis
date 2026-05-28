import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { uk } from '@/lib/i18n/uk'

export const metadata: Metadata = {
  title: 'Контакт | Omobonus Вроцлав',
  description: 'Контакт із сервісом Omobonus у Вроцлаві: адреса, телефон, e-mail, години роботи та карта проїзду.',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/uk/kontakt',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/kontakt',
      'uk': 'https://serwis.omobonus.com.pl/uk/kontakt',
      'x-default': 'https://serwis.omobonus.com.pl/kontakt',
    },
  },
}

export default function UkKontaktPage() {
  return (
    <>
      <Header />
      <main />
      <Footer t={uk.footer} />
    </>
  )
}
