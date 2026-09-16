import type { PricingSection } from './services-data-types'
import { createDefaultPricingSections, createFaqSection } from './services-data-shared'
import { getDisplayPrice } from './services-pricing'

const SLUG = 'drukarka-zastepcza'
const price = (path: string) => getDisplayPrice(SLUG, `${path}.price`, 'pl')

export const createDrukarkaZastepczaPricingSections = (): PricingSection[] => {
  // Используем только базовые секции без FAQ (FAQ добавим в конце)
  const defaultSections = createDefaultPricingSections()

  // Удаляем ненужные секции для drukarka-zastepcza
  const sections = defaultSections.filter(
    section =>
      section.id !== 'diagnoza' &&
      section.id !== 'dojazd' &&
      section.id !== 'konserwacja' &&
      section.id !== 'naprawy'
  )

  // Добавляем два аккордеона
  sections.push({
    id: 'akordeon-1',
    title: 'Laserowe (format A4)',
    items: [],
    subcategories: [
      {
        id: 'drukarki-mono',
        title: 'Drukarki A4 (mono)',
        items: [],
        price: price('akordeon-1.drukarki-mono'),
      },
      {
        id: 'drukarki-kolor',
        title: 'Drukarki A4 (mono+kolor)',
        items: [],
        price: price('akordeon-1.drukarki-kolor'),
      },
      {
        id: 'mfu-mono',
        title: 'MFU A4 (mono)',
        items: [],
        price: price('akordeon-1.mfu-mono'),
      },
      {
        id: 'mfu-kolor',
        title: 'MFU A4 (mono+kolor)',
        items: [],
        price: price('akordeon-1.mfu-kolor'),
      },
    ],
  })

  sections.push({
    id: 'akordeon-2',
    title: 'Laserowe (format A3)',
    items: [],
    subcategories: [
      {
        id: 'a3-drukarki-mono',
        title: 'Drukarki A3 (mono)',
        items: [],
        price: price('akordeon-2.a3-drukarki-mono'),
      },
      {
        id: 'a3-drukarki-kolor',
        title: 'Drukarki A3 (mono+kolor)',
        items: [],
        price: price('akordeon-2.a3-drukarki-kolor'),
      },
      {
        id: 'a3-mfu-mono',
        title: 'MFU A3 (mono)',
        items: [],
        price: price('akordeon-2.a3-mfu-mono'),
      },
      {
        id: 'a3-mfu-kolor',
        title: 'MFU A3 (mono+kolor)',
        items: [],
        price: price('akordeon-2.a3-mfu-kolor'),
      },
    ],
  })

  // Добавляем FAQ в конец
  sections.push(createFaqSection())

  return sections
}
