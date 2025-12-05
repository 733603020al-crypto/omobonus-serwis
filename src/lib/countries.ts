export interface Country {
  code: string
  name: string
  shortName: string // для случаев, когда полное не помещается
  dialCode: string
  flagImage: string // путь к изображению из /images/
  phoneFormat?: string // формат для форматирования (например, "xxx xxx xxx" для Польши)
  phoneLength?: number // длина номера для валидации
}

export const countries: Country[] = [
  { code: 'ua', name: 'Ukraina', shortName: 'Ukraina', dialCode: '+380', flagImage: '/images/ua.png', phoneFormat: 'xxx xxx xxxx', phoneLength: 9 },
  { code: 'pl', name: 'Polska', shortName: 'Polska', dialCode: '+48', flagImage: '/images/pl.png', phoneFormat: 'xxx xxx xxx', phoneLength: 9 },
  { code: 'de', name: 'Niemcy', shortName: 'Niemcy', dialCode: '+49', flagImage: '/images/de.png', phoneFormat: 'xxx xxxxxxx', phoneLength: 11 },
  { code: 'cz', name: 'Czechy', shortName: 'Czechia', dialCode: '+420', flagImage: '/images/cz.png', phoneFormat: 'xxx xxx xxx', phoneLength: 9 },
  { code: 'sk', name: 'Słowacja', shortName: 'Słowacja', dialCode: '+421', flagImage: '/images/sk.png', phoneFormat: 'xxx xxx xxx', phoneLength: 9 },
  { code: 'lt', name: 'Litwa', shortName: 'Litwa', dialCode: '+370', flagImage: '/images/lt.png', phoneFormat: 'xxx xxxxx', phoneLength: 8 },
  { code: 'gb', name: 'Wielka Brytania', shortName: 'Wielka Brytania', dialCode: '+44', flagImage: '/images/gb.png', phoneFormat: 'xxxx xxxxxx', phoneLength: 10 },
  { code: 'other', name: 'Inny kraj', shortName: 'Inny kraj', dialCode: '', flagImage: '/images/other.png' },
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




















