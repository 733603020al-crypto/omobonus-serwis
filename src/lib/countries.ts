export interface Country {
  code: string
  name: string
  nameUk?: string // украинское название для UK locale (только отображение)
  nameRu?: string // русское название для RU locale (только отображение)
  shortName: string // для случаев, когда полное не помещается
  dialCode: string
  flagImage: string // путь к изображению из /images/
  phoneFormat?: string // формат для форматирования (например, "xxx xxx xxx" для Польши)
  phoneLength?: number // длина номера для валидации
}

export const countries: Country[] = [
  { code: 'ua', name: 'Ukraina', nameUk: 'Україна', shortName: 'Ukraina', dialCode: '+380', flagImage: '/images/ua.webp', phoneFormat: 'xxx xxx xxxx', phoneLength: 9 },
  { code: 'pl', name: 'Polska', nameUk: 'Польща', shortName: 'Polska', dialCode: '+48', flagImage: '/images/pl.webp', phoneFormat: 'xxx xxx xxx', phoneLength: 9 },
  { code: 'de', name: 'Niemcy', nameUk: 'Німеччина', shortName: 'Niemcy', dialCode: '+49', flagImage: '/images/de.webp', phoneFormat: 'xxx xxxxxxx', phoneLength: 11 },
  { code: 'cz', name: 'Czechy', nameUk: 'Чехія', shortName: 'Czechia', dialCode: '+420', flagImage: '/images/cz.webp', phoneFormat: 'xxx xxx xxx', phoneLength: 9 },
  { code: 'sk', name: 'Słowacja', nameUk: 'Словаччина', shortName: 'Słowacja', dialCode: '+421', flagImage: '/images/sk.webp', phoneFormat: 'xxx xxx xxx', phoneLength: 9 },
  { code: 'lt', name: 'Litwa', nameUk: 'Литва', shortName: 'Litwa', dialCode: '+370', flagImage: '/images/lt.webp', phoneFormat: 'xxx xxxxx', phoneLength: 8 },
  { code: 'gb', name: 'Wielka Brytania', nameUk: 'Велика Британія', shortName: 'Wielka Brytania', dialCode: '+44', flagImage: '/images/gb.webp', phoneFormat: 'xxxx xxxxxx', phoneLength: 10 },
  { code: 'other', name: 'Inny kraj', nameUk: 'Інша країна', nameRu: 'Другая страна', shortName: 'Inny kraj', dialCode: '', flagImage: '/images/other.webp' },
]

export function formatPhoneNumber(phone: string, format?: string): string {
  if (!format || !phone) return phone
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 0) return ''
  let formatted = ''
  let digitIndex = 0
  for (let i = 0; i < format.length && digitIndex < digits.length; i++) {
    if (format[i] === 'x') {
      formatted += digits[digitIndex]
      digitIndex++
    } else {
      if (digitIndex < digits.length) {
        formatted += format[i]
      }
    }
  }
  if (digitIndex < digits.length) {
    formatted += (formatted ? ' ' : '') + digits.slice(digitIndex)
  }
  return formatted.trim()
}




















