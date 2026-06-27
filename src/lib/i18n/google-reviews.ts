export interface GoogleReviewsDict {
  title: string
  link: string
  ratingLabel: string
  basedOnReviews: (count: number) => string
  loading: string
  empty: string
}

export const googleReviewsI18n: Record<'pl' | 'uk' | 'ru', GoogleReviewsDict> = {
  pl: {
    title: 'Opinie klientów z Google',
    link: 'Zobacz wszystkie opinie w Google →',
    ratingLabel: 'Google Rating',
    basedOnReviews: (count) => `Na podstawie ${count} opinii`,
    loading: 'Ładowanie opinii klientów…',
    empty: 'Brak opinii (API nie zwróciło danych)',
  },
  uk: {
    title: 'Відгуки клієнтів у Google',
    link: 'Переглянути всі відгуки в Google →',
    ratingLabel: 'Рейтинг Google',
    basedOnReviews: (count) => `На основі ${count} відгуків`,
    loading: 'Завантаження відгуків клієнтів…',
    empty: 'Немає відгуків (API не повернув дані)',
  },
  ru: {
    title: 'Отзывы клиентов в Google',
    link: 'Смотреть все отзывы в Google →',
    ratingLabel: 'Рейтинг Google',
    basedOnReviews: (count) => `На основе ${count} отзывов`,
    loading: 'Загрузка отзывов клиентов…',
    empty: 'Нет отзывов (API не вернул данные)',
  },
} as const
