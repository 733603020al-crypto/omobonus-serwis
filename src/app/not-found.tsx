import type { Metadata } from 'next'
import Link from 'next/link'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

/* Korzeń app/not-found.tsx nie ma nadrzędnego layoutu (trzy równoległe
   layouty PL/RU/UK to osobne "root layouts" przez route groups) — dlatego
   ta strona musi sama zdefiniować <html>/<body> i podpiąć czcionki/globals.css,
   dokładnie tak jak robi to każdy z trzech layoutów językowych. Obsługuje
   adresy, które w ogóle nie pasują do żadnej trasy (np. spoza /uk, /ru). */

const cormorant = Cormorant_Garamond({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
})

const inter = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Strona nie znaleziona | Omobonus Serwis',
}

export default function NotFound() {
  return (
    <html lang="pl" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 text-center shadow-2xl">
            <h1 className="mb-4 font-serif text-6xl font-bold text-primary">404</h1>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Strona nie została znaleziona
            </h2>
            <p className="mb-6 text-foreground/70">
              Przepraszamy, żądana strona nie istnieje.
            </p>
            <Link
              href="/"
              className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-background transition-colors hover:bg-primary/90"
            >
              Powrót do strony głównej
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
