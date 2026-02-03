import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { ConsentManager } from '@/components/ConsentManager'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import './styles/accordion.css'
import { FloatingCallButton } from '@/components/ui/FloatingCallButton'

/* =========================
   Fonts (STRICT: 2 only)
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
        alt: 'Omobonus - serwis komputerów i drukarek Wrocław',
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
}

/* =========================
   Root Layout
   ========================= */

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pl"
      className={`${cormorant.variable} ${inter.variable}`}
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
          strategy="afterInteractive"
        />

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

      <body className="antialiased scroll-smooth">
        <ConsentManager />

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5XQXX5KL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}

        {/* 🔵 Floating call button – ONLY mobile */}
        <FloatingCallButton />

        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
