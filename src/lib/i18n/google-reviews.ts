export interface GoogleReviewsDict {
  title: string
  link: string
}

export const googleReviewsI18n: Record<'pl' | 'uk' | 'ru', GoogleReviewsDict> = {
  pl: {
    title: 'Opinie klientów z Google',
    link: 'Zobacz wszystkie opinie w Google →',
  },
  uk: {
    title: 'Відгуки клієнтів у Google',
    link: 'Переглянути всі відгуки в Google →',
  },
  ru: {
    title: 'Отзывы клиентов в Google',
    link: 'Смотреть все отзывы в Google →',
  },
} as const
