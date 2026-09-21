import type { Metadata } from 'next'

type SocialLocale = 'pl' | 'uk' | 'ru'

// Значения совпадают с openGraph/twitter в layout соответствующей локали.
const SOCIAL_BY_LOCALE: Record<SocialLocale, { ogLocale: string; imageAlt: string }> = {
  pl: { ogLocale: 'pl_PL', imageAlt: 'Omobonus - serwis komputerów, laptopów i drukarek Wrocław' },
  uk: { ogLocale: 'uk_UA', imageAlt: "Omobonus - сервіс комп'ютерів і принтерів Вроцлав" },
  ru: { ogLocale: 'ru_RU', imageAlt: 'Omobonus - сервис компьютеров и принтеров Вроцлав' },
}

const SHARE_IMAGE = '/images/omobonus-hero.webp'

/**
 * Страницы без собственного openGraph/twitter наследовали их из layout целиком:
 * og:url указывал на главную, а заголовок и описание были главной страницы.
 * Metadata в Next перекрывается на уровне ключей, поэтому openGraph здесь собирается
 * полностью: url берётся из canonical, title/description — из самой страницы.
 */
export function withSocialMeta(locale: SocialLocale, page: Metadata): Metadata {
  const { title, description, alternates } = page
  const canonical = typeof alternates?.canonical === 'string' ? alternates.canonical : undefined
  if (typeof title !== 'string' || typeof description !== 'string' || !canonical) return page

  const { ogLocale, imageAlt } = SOCIAL_BY_LOCALE[locale]
  return {
    ...page,
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: canonical,
      siteName: 'Omobonus Serwis',
      title,
      description,
      images: [{ url: SHARE_IMAGE, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SHARE_IMAGE],
    },
  }
}
