export interface GoogleReviewsDict {
  title: string
  link: string
  ratingLabel: string
  basedOnReviews: (count: number) => string
}

export const googleReviewsI18n: Record<'pl' | 'uk' | 'ru', GoogleReviewsDict> = {
  pl: {
    title: 'Opinie klientów z Google',
    link: 'Zobacz wszystkie opinie w Google →',
    ratingLabel: 'Google Rating',
    basedOnReviews: (count) => `Na podstawie ${count} opinii`,
  },
  uk: {
    title: 'Відгуки клієнтів у Google',
    link: 'Переглянути всі відгуки в Google →',
    ratingLabel: 'Рейтинг Google',
    basedOnReviews: (count) => `На основі ${count} відгуків`,
  },
  ru: {
    title: 'Отзывы клиентов в Google',
    link: 'Смотреть все отзывы в Google →',
    ratingLabel: 'Рейтинг Google',
    basedOnReviews: (count) => `На основе ${count} отзывов`,
  },
} as const
