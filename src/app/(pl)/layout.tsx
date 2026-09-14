import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { ConsentManager } from '@/components/ConsentManager'
import { Cormorant_Garamond, Inter, Lora } from 'next/font/google'
import '../globals.css'
import { MobileActionBar } from '@/components/ui/FloatingButtonsLazy'
import { DeferredGtm } from '@/components/DeferredGtm'
import { ScrollToTop } from '@/components/ScrollToTop'

/* =========================
   Fonts
   ========================= */

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
})

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

/* Tylko dla formularza kontaktowego (/kontakt) — etykiety i tekst w polach */
const lora = Lora({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
})

/* =========================
   Metadata
   ========================= */

export const metadata: Metadata = {
  metadataBase: new URL('https://serwis.omobonus.com.pl'),
  title: {
    default: 'Serwis komputerów, laptopów i drukarek Wrocław | Omobonus',
    template: '%s | Omobonus Wrocław',
  },
  description:
    'Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu. Naprawa sprzętu, outsourcing IT, uczciwe ceny bez ukrytych kosztów. Dojazd gratis.',
  authors: [{ name: 'Omobonus Sp. z o.o.' }],
  creator: 'Omobonus Sp. z o.o.',
  publisher: 'Omobonus Sp. z o.o.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://serwis.omobonus.com.pl',
    siteName: 'Omobonus Serwis',
    title: 'Serwis komputerów, laptopów i drukarek Wrocław | Omobonus',
    description:
      'Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu. Naprawa sprzętu, outsourcing IT, uczciwe ceny bez ukrytych kosztów.',
    images: [
      {
        url: '/images/omobonus-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Omobonus - serwis komputerów, laptopów i drukarek Wrocław',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Serwis komputerów, laptopów i drukarek Wrocław | Omobonus',
    description:
      'Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu. Uczciwe ceny, dojazd gratis.',
    images: ['/images/omobonus-hero.webp'],
  },
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl',
      'uk': 'https://serwis.omobonus.com.pl/uk',
      'ru': 'https://serwis.omobonus.com.pl/ru',
      'x-default': 'https://serwis.omobonus.com.pl',
    },
  },
  category: 'technology',
}

/* =========================
   Schema.org JSON-LD
   ========================= */

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://serwis.omobonus.com.pl/#organization',
  name: 'Omobonus Serwis',
  alternateName: 'Omobonus Sp. z o.o.',
  url: 'https://serwis.omobonus.com.pl',
  telephone: '+48793759262',
  image: 'https://serwis.omobonus.com.pl/images/omobonus-hero.webp',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Marcina Bukowskiego 174',
    addressLocality: 'Wrocław',
    postalCode: '52-418',
    addressCountry: 'PL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.0775534,
    longitude: 16.9784082,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
}

/* =========================
   Root Layout
   ========================= */

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pl"
      className={`${cormorant.variable} ${inter.variable} ${lora.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="gtm-consent" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              personalization_storage: 'denied',
              functionality_storage: 'denied',
              security_storage: 'granted'
            });
          `}
        </Script>

        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/45d9e4594525ca10005b171a79e9b287/script.js"
          strategy="lazyOnload"
        />

        <link rel="preconnect" href="https://cdn-cookieyes.com" />
        <link rel="dns-prefetch" href="https://cdn-cookieyes.com" />
        <link rel="dns-prefetch" href="https://log.cookieyes.com" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
      </head>

      <body className="antialiased scroll-smooth pb-[88px] md:pb-0">
        <ScrollToTop />
        <ConsentManager />
        <DeferredGtm gtmId="GTM-5XQXX5KL" />

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5XQXX5KL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}

        {/* Mobile-only bottom quick-action bar */}
        <MobileActionBar />

        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
