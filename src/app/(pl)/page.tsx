import type { Metadata } from 'next'
import { HomePageTemplate } from '@/components/home-page-template'
import { services } from '@/lib/services-data'

// Meta, og:description i twitter:description — jeden zatwierdzony tekst (docs/seo/description-standard.md)
const DESCRIPTION =
  '✔ Serwis i naprawa komputerów, laptopów i drukarek we Wrocławiu ✔ Koszt naprawy uzgadniamy przed rozpoczęciem ✔ Pełny cennik bez ukrytych kosztów ☎ 793 759 262'

export const metadata: Metadata = {
  title: 'Naprawa komputerów, laptopów i drukarek | Omobonus Wrocław',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl',
      'uk': 'https://serwis.omobonus.com.pl/uk',
      'ru': 'https://serwis.omobonus.com.pl/ru',
      'x-default': 'https://serwis.omobonus.com.pl',
    },
  },
  openGraph: {
    title: 'Serwis komputerów, laptopów i drukarek Wrocław | Omobonus',
    description: DESCRIPTION,
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
  twitter: {
    card: 'summary_large_image',
    title: 'Serwis komputerów, laptopów i drukarek Wrocław | Omobonus',
    description: DESCRIPTION,
    images: ['/images/omobonus-hero.webp'],
  },
}

export default function Home() {
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
