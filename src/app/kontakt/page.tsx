import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Kontakt | Omobonus Wrocław',
  description: 'Kontakt z serwisem Omobonus we Wrocławiu: adres, telefon, e-mail, godziny pracy i mapa dojazdu.',
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
