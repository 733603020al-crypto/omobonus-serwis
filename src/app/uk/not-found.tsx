import Link from 'next/link'

export default function UkNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Сторінку не знайдено
        </h2>
        <p className="mb-6 text-gray-600">
          Вибачте, запитувана сторінка не існує.
        </p>
        <Link
          href="/uk"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
        >
          Повернутися на головну
        </Link>
      </div>
    </div>
  )
}
