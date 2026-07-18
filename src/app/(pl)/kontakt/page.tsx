import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Header } from '@/components/header'
import { ContactActionsSection } from '@/components/sections/contact-actions'

const Contact = dynamic(() =>
  import('@/components/sections/contact').then(mod => mod.Contact)
)
const Footer = dynamic(() => import('@/components/footer').then(m => m.Footer))

export const metadata: Metadata = {
  title: 'Kontakt|Serwis komputerów, laptopów i drukarek',
  description: '✔ Serwis komputerów, laptopów, drukarek, ploterów, ... we Wrocławiu ✔ Diagnoza w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś! ✔  ☎ 793 759 262',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/kontakt',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/kontakt',
      'uk': 'https://serwis.omobonus.com.pl/uk/kontakt',
      'ru': 'https://serwis.omobonus.com.pl/ru/kontakt',
      'x-default': 'https://serwis.omobonus.com.pl/kontakt',
    },
  },
}

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), var(--bg-parchment)`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10">
          <h1 className="sr-only">Kontakt z serwisem komputerów, laptopów i drukarek we Wrocławiu</h1>
          <ContactActionsSection />
          <Contact bare={true} />
          <Footer bare />
        </div>
      </main>
    </>
  )
}
