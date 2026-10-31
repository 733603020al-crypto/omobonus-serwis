// Title, description, canonical and hreflang of the "Serwis wysyłkowy" page in all languages.
// Title has no suffix: the layout template adds "| Omobonus Wrocław" / "| Omobonus Вроцлав".
import type { Metadata } from 'next'

type Locale = 'pl' | 'uk' | 'ru' | 'en'

const SITE = 'https://serwis.omobonus.com.pl'
const PATH = 'serwis-wysylkowy'

const TEXT: Record<Locale, { title: string; description: string }> = {
  pl: {
    title: 'Serwis wysyłkowy sprzętu biurowego',
    description: '✔ Serwis wysyłkowy sprzętu biurowego we Wrocławiu ✔ Odbiór kurierem lub z paczkomatu, diagnoza i wycena ✔ Pełny cennik bez ukrytych kosztów ☎ 793 759 262',
  },
  uk: {
    title: 'Сервіс з відправкою офісної техніки',
    description: '✔ Сервіс з відправкою офісної техніки у Вроцлаві ✔ Забір кур\'єром або з поштомату, діагностика й оцінка ✔ Повний прайс без прихованих витрат ☎ 793 759 262',
  },
  ru: {
    title: 'Сервис с отправкой офисной техники',
    description: '✔ Сервис с отправкой офисной техники во Вроцлаве ✔ Забор курьером или из постамата, диагностика и оценка ✔ Полный прайс без скрытых платежей ☎ 793 759 262',
  },
  en: {
    title: 'Mail-in office equipment service',
    description: '✔ Mail-in office equipment service in Wrocław ✔ Courier or parcel locker pickup, diagnosis and quote ✔ Full price list, no hidden costs ☎ 793 759 262',
  },
}

const url = (locale: Locale) => (locale === 'pl' ? `${SITE}/${PATH}` : `${SITE}/${locale}/${PATH}`)

export function serwisWysylkowyMetadata(locale: Locale): Metadata {
  const { title, description } = TEXT[locale]
  return {
    title,
    description,
    alternates: {
      canonical: url(locale),
      languages: { pl: url('pl'), uk: url('uk'), ru: url('ru'), en: url('en'), 'x-default': url('pl') },
    },
    openGraph: { title, description, url: url(locale) },
    twitter: { card: 'summary_large_image', title, description },
  }
}
