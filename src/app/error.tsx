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
    // Логируем ошибку в консоль для отладки
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Что-то пошло не так!
        </h2>
        <p className="mb-6 text-gray-600">
          Произошла ошибка при загрузке страницы. Пожалуйста, попробуйте снова.
        </p>
        {error.message && (
          <p className="mb-4 rounded bg-red-50 p-3 text-sm text-red-800">
            {error.message}
          </p>
        )}
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Попробовать снова
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  )
}

