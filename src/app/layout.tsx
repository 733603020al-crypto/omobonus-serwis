import type { Metadata } from 'next'
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
  title: 'Omobonus Serwis — Serwis drukarek i komputerów Wrocław',
  description:
    'Profesjonalny serwis komputerów i drukarek we Wrocławiu — uczciwa wycena, brak ukrytych kosztów.',
  icons: {
    icon: '/images/Logo_Omobonus_favicon.png',
    shortcut: '/images/Logo_Omobonus_favicon.png',
    apple: '/images/Logo_Omobonus_favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${cormorant.variable} ${cormorantSC.variable} ${lora.variable} ${inter.variable} ${ebGaramond.variable} ${spectralSC.variable} ${cinzel.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/images/omobonus-hero.png" as="image" fetchPriority="high" />
        <link rel="preload" href="/images/Logo_Omobonus.png" as="image" />
      </head>
      <body className="font-sans antialiased scroll-smooth" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}