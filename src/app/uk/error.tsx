'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 text-center shadow-2xl">
        <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
          Щось пішло не так!
        </h2>
        <p className="mb-6 text-foreground/70">
          Сталася помилка під час завантаження сторінки. Спробуйте ще раз.
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="flex-1 rounded-lg bg-primary px-4 py-2 font-medium text-background transition-colors hover:bg-primary/90"
          >
            Спробувати знову
          </button>
          <button
            onClick={() => (window.location.href = '/uk')}
            className="flex-1 rounded-lg border border-border px-4 py-2 text-foreground transition-colors hover:bg-card/60"
          >
            На головну
          </button>
        </div>
      </div>
    </div>
  )
}
