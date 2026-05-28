import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Kontakt | Omobonus Wrocław',
  description: 'Kontakt z serwisem Omobonus we Wrocławiu: adres, telefon, e-mail, godziny pracy i mapa dojazdu.',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/kontakt',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/kontakt',
      'uk': 'https://serwis.omobonus.com.pl/uk/kontakt',
      'x-default': 'https://serwis.omobonus.com.pl/kontakt',
    },
  },
}

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main>
      </main>
      <Footer />
    </>
  )
}
