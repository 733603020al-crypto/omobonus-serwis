import type { PricingSection } from './services-data-types'
import { createDefaultPricingSections, createFaqSection } from './services-data-shared'

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
        price: '0,06',
      },
      {
        id: 'drukarki-kolor',
        title: 'Drukarki A4 (mono+kolor)',
        items: [],
        price: '0,06 / 0,27',
      },
      {
        id: 'mfu-mono',
        title: 'MFU A4 (mono)',
        items: [],
        price: '0,08',
      },
      {
        id: 'mfu-kolor',
        title: 'MFU A4 (mono+kolor)',
        items: [],
        price: '0,08 / 0,30',
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
        price: '0,05',
      },
      {
        id: 'a3-drukarki-kolor',
        title: 'Drukarki A3 (mono+kolor)',
        items: [],
        price: '0,05 / 0,27',
      },
      {
        id: 'a3-mfu-mono',
        title: 'MFU A3 (mono)',
        items: [],
        price: '0,07',
      },
      {
        id: 'a3-mfu-kolor',
        title: 'MFU A3 (mono+kolor)',
        items: [],
        price: '0,07 / 0,30',
      },
    ],
  })

  // Добавляем FAQ в конец
  sections.push(createFaqSection())

  return sections
}
