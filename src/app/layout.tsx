import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { ConsentManager } from '@/components/ConsentManager'
import { Cormorant_Garamond, Cormorant_SC, Lora, Inter, EB_Garamond, Spectral_SC, Cinzel } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
})

const cormorantSC = Cormorant_SC({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant-sc',
})

const lora = Lora({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-lora',
})

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
})

const ebGaramond = EB_Garamond({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
})

const spectralSC = Spectral_SC({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-spectral-sc',
})

const cinzel = Cinzel({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cinzel',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://serwis.omobonus.com.pl'),
  title: {
    default: 'Serwis komputerów, laptopów i drukarek Wrocław | Omobonus',
    template: '%s | Omobonus Wrocław',
  },
  description: 'Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu. Naprawa sprzętu, outsourcing IT, uczciwe ceny bez ukrytych kosztów. Dojazd gratis.',

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
    description: 'Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu. Naprawa sprzętu, outsourcing IT, uczciwe ceny bez ukrytych kosztów.',
    images: [
      {
        url: '/images/omobonus-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Omobonus - serwis komputerów i drukarek Wrocław',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Serwis komputerów, laptopów i drukarek Wrocław | Omobonus',
    description: 'Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu. Uczciwe ceny, dojazd gratis.',
    images: ['/images/omobonus-hero.webp'],
  },
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl',
  },
  verification: {
    google: 'google-site-verification-code', // Замените на реальный код верификации
  },
  category: 'technology',
  other: {
    'geo.region': 'PL-DS',
    'geo.placename': 'Wrocław',
    'geo.position': '51.107883;17.038538',
    'ICBM': '51.107883, 17.038538',
  },
}

// Schema.org LocalBusiness structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://serwis.omobonus.com.pl/#organization',
  name: 'Omobonus Serwis',
  alternateName: 'Omobonus Sp. z o.o.',
  description: 'Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu. Naprawa sprzętu komputerowego, outsourcing IT dla firm, uczciwe ceny bez ukrytych kosztów.',
  url: 'https://serwis.omobonus.com.pl',
  logo: 'https://serwis.omobonus.com.pl/images/Logo_Omobonus.webp',
  image: 'https://serwis.omobonus.com.pl/images/omobonus-hero.webp',
  telephone: '+48793759262',
  email: 'serwis@omobonus.com.pl',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Marcina Bukowskiego 174',
    addressLocality: 'Wrocław',
    addressRegion: 'Dolnośląskie',
    postalCode: '52-418',
    addressCountry: 'PL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.107883,
    longitude: 17.038538,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  priceRange: '$$',
  currenciesAccepted: 'PLN',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  areaServed: {
    '@type': 'City',
    name: 'Wrocław',
    '@id': 'https://www.wikidata.org/wiki/Q1799',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Usługi serwisowe',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Naprawa laptopów',
          description: 'Kompleksowy serwis i naprawa laptopów wszystkich marek: HP, Dell, Lenovo, Asus, Acer',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Serwis komputerów stacjonarnych',
          description: 'Diagnostyka, naprawa i modernizacja komputerów PC',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Serwis drukarek',
          description: 'Naprawa drukarek laserowych, atramentowych, termicznych i igłowych',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Outsourcing IT',
          description: 'Kompleksowa obsługa informatyczna dla firm we Wrocławiu',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Wynajem drukarek',
          description: 'Dzierżawa urządzeń drukujących dla biur z pełnym serwisem',
        },
      },
    ],
  },
  sameAs: [
    'https://wa.me/48793759262',
    'https://t.me/+48793759262',
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const fontClasses = `${cormorant.variable} ${cormorantSC.variable} ${lora.variable} ${inter.variable} ${ebGaramond.variable} ${spectralSC.variable} ${cinzel.variable}`

  return (
    <html lang="pl" className={fontClasses} suppressHydrationWarning>
      <head>
        {/* GTM Consent Mode Default State */}
        <Script id="gtm-consent" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'personalization_storage': 'denied',
              'functionality_storage': 'denied',
              'security_storage': 'granted'
            });
          `}
        </Script>

        {/* CookieYes Script */}
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/45d9e4594525ca10005b171a79e9b287/script.js"
          strategy="afterInteractive"
        />

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5XQXX5KL');`}
        </Script>

        <link rel="preload" href="/images/omobonus-hero.webp" as="image" />
        <link rel="preload" href="/images/Background_1.webp" as="image" />
        <link rel="preload" href="/images/Logo_Omobonus.webp" as="image" />
      </head>
      <body className="font-sans antialiased scroll-smooth">
        <ConsentManager />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5XQXX5KL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
