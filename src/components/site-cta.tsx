import { HomeCta } from '@/components/home-cta'
import { uk } from '@/lib/i18n/uk'
import { ru } from '@/lib/i18n/ru'
import { en } from '@/lib/i18n/en'

type Locale = 'pl' | 'uk' | 'ru' | 'en'

// The one "Masz problem ze swoim urządzeniem?" block for the whole site (home, service pages,
// O nas, serwis-wysylkowy): texts per language live here, look and button size live in HomeCta.
const PL = {
  heading: 'Masz problem ze swoim urządzeniem?',
  text: 'Napisz lub zadzwoń — podpowiemy, od czego zacząć',
  headingMobile: 'Masz problem z urządzeniem?',
  textMobile: 'Napisz lub zadzwoń — znajdziemy rozwiązanie!',
  button: 'Szybki kontakt',
}

const TEXTS = { pl: PL, uk: uk.homeCta, ru: ru.homeCta, en: en.homeCta }

export function SiteCta({ locale = 'pl' }: { locale?: Locale }) {
  return <HomeCta {...TEXTS[locale]} href={locale === 'pl' ? '/kontakt' : `/${locale}/kontakt`} singleHeading />
}
