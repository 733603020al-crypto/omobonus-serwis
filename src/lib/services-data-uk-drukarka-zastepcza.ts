import type { PricingSection } from './services-data-types'
import { getDisplayPrice } from './services-pricing'

const SLUG = 'drukarka-zastepcza'
const price = (path: string) => getDisplayPrice(SLUG, `${path}.price`, 'uk')

export const zastepczaAkordeon1: PricingSection = {
  id: 'akordeon-1',
  title: 'Лазерні (формат A4)',
  items: [],
  subcategories: [
    { id: 'drukarki-mono', title: 'Принтери A4 (моно)', items: [], price: price('akordeon-1.drukarki-mono') },
    { id: 'drukarki-kolor', title: 'Принтери A4 (моно+колір)', items: [], price: price('akordeon-1.drukarki-kolor') },
    { id: 'mfu-mono', title: 'МФУ A4 (моно)', items: [], price: price('akordeon-1.mfu-mono') },
    { id: 'mfu-kolor', title: 'МФУ A4 (моно+колір)', items: [], price: price('akordeon-1.mfu-kolor') },
  ],
}

export const zastepczaAkordeon2: PricingSection = {
  id: 'akordeon-2',
  title: 'Лазерні (формат A3)',
  items: [],
  subcategories: [
    { id: 'a3-drukarki-mono', title: 'Принтери A3 (моно)', items: [], price: price('akordeon-2.a3-drukarki-mono') },
    { id: 'a3-drukarki-kolor', title: 'Принтери A3 (моно+колір)', items: [], price: price('akordeon-2.a3-drukarki-kolor') },
    { id: 'a3-mfu-mono', title: 'МФУ A3 (моно)', items: [], price: price('akordeon-2.a3-mfu-mono') },
    { id: 'a3-mfu-kolor', title: 'МФУ A3 (моно+колір)', items: [], price: price('akordeon-2.a3-mfu-kolor') },
  ],
}

// -------------------------------------------------------
// Складання фінального масиву servicesUk
// -------------------------------------------------------
