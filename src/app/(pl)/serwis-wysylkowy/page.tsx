import type { Metadata } from 'next'
import { HomePageTemplate } from '@/components/serwis-wysylkowy/page-template'
import { services } from '@/lib/services-data'

const DESCRIPTION =
  'Prototyp strony serwisu wysyłkowego Omobonus — dokładna kopia strony głównej do dalszych prac projektowych.'

export const metadata: Metadata = {
  title: 'Serwis wysyłkowy — prototyp | Omobonus',
  description: DESCRIPTION,
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: null,
    languages: {},
  },
}

export default function SerwisWysylkowyPage() {
  return (
    <HomePageTemplate
      servicesData={services}
      cta={{
        heading: 'Masz problem ze swoim urządzeniem?',
        text: 'Napisz lub zadzwoń — podpowiemy, od czego zacząć',
        headingMobile: 'Masz problem z urządzeniem?',
        textMobile: 'Napisz lub zadzwoń — znajdziemy rozwiązanie!',
        button: 'Szybki kontakt',
        href: '/kontakt',
      }}
      locale="pl"
    />
  )
}
