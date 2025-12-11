'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Критическая ошибка
            </h2>
            <p className="mb-6 text-gray-600">
              Произошла критическая ошибка приложения. Пожалуйста, обновите страницу.
            </p>
            {error.message && (
              <p className="mb-4 rounded bg-red-50 p-3 text-sm text-red-800">
                {error.message}
              </p>
            )}
            <button
              onClick={reset}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}





