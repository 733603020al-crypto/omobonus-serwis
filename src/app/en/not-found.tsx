import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found | Omobonus Serwis',
}

export default function EnNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 text-center shadow-2xl">
        <h1 className="mb-4 font-serif text-6xl font-bold text-primary">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mb-6 text-foreground/70">
          Sorry, the page you requested does not exist.
        </p>
        <Link
          href="/en"
          className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-background transition-colors hover:bg-primary/90"
        >
          Back to the home page
        </Link>
      </div>
    </div>
  )
}
