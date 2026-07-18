import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { ConsentManager } from '@/components/ConsentManager'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import '../globals.css'
import { FloatingCallButton } from '@/components/ui/FloatingCallButton'
import { FloatingContactButton } from '@/components/ui/FloatingContactButton'
import { DeferredGtm } from '@/components/DeferredGtm'

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-cormorant',
})

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://serwis.omobonus.com.pl'),
  title: {
    default: 'Сервіс комп\'ютерів, ноутбуків і принтерів Вроцлав | Omobonus',
    template: '%s | Omobonus Вроцлав',
  },
  description:
    'Професійний сервіс комп\'ютерів, ноутбуків і принтерів у Вроцлаві. Ремонт обладнання, аутсорсинг IT, чесні ціни без прихованих витрат. Виїзд безкоштовно.',
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
    locale: 'uk_UA',
    url: 'https://serwis.omobonus.com.pl/uk',
    siteName: 'Omobonus Serwis',
    title: 'Сервіс комп\'ютерів, ноутбуків і принтерів Вроцлав | Omobonus',
    description:
      'Професійний сервіс комп\'ютерів, ноутбуків і принтерів у Вроцлаві. Ремонт обладнання, аутсорсинг IT, чесні ціни без прихованих витрат.',
    images: [
      {
        url: '/images/omobonus-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Omobonus - сервіс комп\'ютерів і принтерів Вроцлав',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Сервіс комп\'ютерів, ноутбуків і принтерів Вроцлав | Omobonus',
    description:
      'Професійний сервіс комп\'ютерів, ноутбуків і принтерів у Вроцлаві. Чесні ціни, виїзд безкоштовно.',
    images: ['/images/omobonus-hero.webp'],
  },
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/uk',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl',
      'uk': 'https://serwis.omobonus.com.pl/uk',
      'ru': 'https://serwis.omobonus.com.pl/ru',
      'x-default': 'https://serwis.omobonus.com.pl',
    },
  },
  category: 'technology',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://serwis.omobonus.com.pl/#organization',
  name: 'Omobonus Serwis',
  alternateName: 'Omobonus Sp. z o.o.',
  url: 'https://serwis.omobonus.com.pl',
  telephone: '+48793759262',
}

export default function UkRootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="uk"
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

        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://cdn-cookieyes.com" />
        <link rel="dns-prefetch" href="https://log.cookieyes.com" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
      </head>

      <body className="antialiased scroll-smooth">
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

        <FloatingCallButton />
        <FloatingContactButton />

        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}