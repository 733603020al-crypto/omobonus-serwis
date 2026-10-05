'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="uk">
      <body className="antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 text-center shadow-2xl">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              Сталася критична помилка
            </h2>
            <p className="mb-6 text-foreground/70">
              Сталася критична помилка застосунку. Оновіть сторінку.
            </p>
            <button
              onClick={reset}
              className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-background transition-colors hover:bg-primary/90"
            >
              Спробувати знову
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
