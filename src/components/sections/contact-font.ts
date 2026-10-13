import { Lora } from 'next/font/google'

/* Lora — tylko formularz kontaktowy (/kontakt). Zdefiniowana tutaj, a nie w layoucie,
   żeby jej @font-face trafiały wyłącznie do CSS strony kontaktu. */
export const lora = Lora({
  weight: ['400', '600'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-lora',
  preload: false,
})
