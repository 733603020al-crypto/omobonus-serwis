import type { Metadata } from 'next'
import { HomePageTemplate } from '@/components/home-page-template'

export const metadata: Metadata = {
  title: 'Naprawa Komputerów, Laptopów i Drukarek | Omobonus Wrocław',
  description: '✔ Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu  ✔ Diagnoza w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś!  ✔ ☎ 793 759 262',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl',
      'uk': 'https://serwis.omobonus.com.pl/uk',
      'x-default': 'https://serwis.omobonus.com.pl',
    },
  },
  openGraph: {
    title: 'Serwis komputerów, laptopów i drukarek Wrocław | Omobonus',
    description: 'Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu. Naprawa sprzętu, uczciwe ceny bez ukrytych kosztów.',
    url: 'https://serwis.omobonus.com.pl',
    images: [
      {
        url: '/images/omobonus-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Omobonus - profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu',
      },
    ],
  },
}

export default function Home() {
  return (
    <HomePageTemplate
      cta={{
        heading: 'Masz problem z komputerem lub drukarką?',
        text: 'Napisz lub zadzwoń — podpowiemy, od czego zacząć',
        button: 'Szybki kontakt',
        href: '/kontakt',
      }}
    />
  )
}
