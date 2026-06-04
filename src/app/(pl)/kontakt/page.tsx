import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Kontakt|Serwis komputerów, laptopów i drukarek',
  description: '✔ Serwis komputerów, laptopów, drukarek, ploterów, ... we Wrocławiu ✔ Diagnoza w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś! ✔  ☎ 793 759 262',
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
