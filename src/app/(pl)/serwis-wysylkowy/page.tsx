import type { Metadata } from 'next'
import { serwisWysylkowyMetadata } from '@/components/serwis-wysylkowy/seo'
import { HomePageTemplate } from '@/components/serwis-wysylkowy/page-template'
import { services } from '@/lib/services-data'

export const metadata: Metadata = serwisWysylkowyMetadata('pl')

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
