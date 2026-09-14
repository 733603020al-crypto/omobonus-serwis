import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Страница не найдена | Omobonus Serwis',
}

export default function RuNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 text-center shadow-2xl">
        <h1 className="mb-4 font-serif text-6xl font-bold text-primary">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-foreground">
          Страница не найдена
        </h2>
        <p className="mb-6 text-foreground/70">
          Извините, запрашиваемая страница не существует.
        </p>
        <Link
          href="/ru"
          className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-background transition-colors hover:bg-primary/90"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}
