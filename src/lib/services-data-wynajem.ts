import type { PricingSection } from './services-data-types'
import { createDefaultPricingSections, createFaqSection } from './services-data-shared'
import { getDisplayPrice } from './services-pricing'

const SLUG = 'wynajem-drukarek'
const rent = (path: string) => getDisplayPrice(SLUG, `${path}.rent`, 'pl')
const pages = (path: string) => getDisplayPrice(SLUG, `${path}.pages`, 'pl')
const overLimit = (path: string) => getDisplayPrice(SLUG, `${path}.overLimitPrice`, 'pl')
const label = (path: string) => `${rent(path)}/mies.`

export const createWynajemPricingSections = (): PricingSection[] => {
  // Используем только базовые секции без FAQ (FAQ добавим в конце)
  const defaultSections = createDefaultPricingSections()

  // Удаляем ненужные секции для wynajem-drukarek
  const sections = defaultSections.filter(
    section =>
      section.id !== 'diagnoza' &&
      section.id !== 'dojazd' &&
      section.id !== 'konserwacja' &&
      section.id !== 'naprawy'
  )

  // Добавляем два аккордеона (repair-accordion layout: pełna podtabela 3 planów
  // taryfowych na podkategorię, czynsz jako pierwszy wiersz — dane realne,
  // przeniesione 1:1 z dotychczasowego WynajemTable/WynajemSubcategoryHeader)
  sections.push({
    id: 'akordeon-1',
    title: 'Laserowe (format A4)',
    items: [],
    subcategories: [
      {
        id: 'drukarki-mono',
        title: 'Drukarki A4 (mono)',
        items: [],
        icon: '/images/wynajem-a4-drukarki-mono-v2.webp',
        priceTiers: [
          {
            label: label('akordeon-1.drukarki-mono.tier0'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-1.drukarki-mono.tier0') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.drukarki-mono.tier0') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.drukarki-mono.tier0') },
              { label: 'Duplex', value: '-' },
              { label: 'Prędkość druku do: (str./min)', value: '20' },
            ],
          },
          {
            label: label('akordeon-1.drukarki-mono.tier1'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-1.drukarki-mono.tier1') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.drukarki-mono.tier1') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.drukarki-mono.tier1') },
              { label: 'Duplex', value: '- / +' },
              { label: 'Prędkość druku do: (str./min)', value: '40' },
            ],
          },
          {
            label: label('akordeon-1.drukarki-mono.tier2'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-1.drukarki-mono.tier2') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.drukarki-mono.tier2') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.drukarki-mono.tier2') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '60' },
            ],
          },
        ],
      },
      {
        id: 'drukarki-kolor',
        title: 'Drukarki A4 (mono+kolor)',
        items: [],
        icon: '/images/wynajem-a4-drukarki-kolor-v2.webp',
        priceTiers: [
          {
            label: label('akordeon-1.drukarki-kolor.tier0'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-1.drukarki-kolor.tier0') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.drukarki-kolor.tier0') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.drukarki-kolor.tier0') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '20' },
            ],
          },
          {
            label: label('akordeon-1.drukarki-kolor.tier1'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-1.drukarki-kolor.tier1') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.drukarki-kolor.tier1') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.drukarki-kolor.tier1') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '40' },
            ],
          },
          {
            label: label('akordeon-1.drukarki-kolor.tier2'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-1.drukarki-kolor.tier2') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.drukarki-kolor.tier2') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.drukarki-kolor.tier2') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '60' },
            ],
          },
        ],
      },
      {
        id: 'mfu-mono',
        title: 'MFU A4 (mono)',
        items: [],
        icon: '/images/wynajem-a4-mfu-mono-v2.webp',
        priceTiers: [
          {
            label: label('akordeon-1.mfu-mono.tier0'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-1.mfu-mono.tier0') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.mfu-mono.tier0') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.mfu-mono.tier0') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '20' },
            ],
          },
          {
            label: label('akordeon-1.mfu-mono.tier1'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-1.mfu-mono.tier1') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.mfu-mono.tier1') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.mfu-mono.tier1') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '40' },
            ],
          },
          {
            label: label('akordeon-1.mfu-mono.tier2'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-1.mfu-mono.tier2') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.mfu-mono.tier2') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.mfu-mono.tier2') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '60' },
            ],
          },
        ],
      },
      {
        id: 'mfu-kolor',
        title: 'MFU A4 (mono+kolor)',
        items: [],
        icon: '/images/wynajem-a4-mfu-kolor-v2.webp',
        priceTiers: [
          {
            label: label('akordeon-1.mfu-kolor.tier0'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-1.mfu-kolor.tier0') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.mfu-kolor.tier0') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.mfu-kolor.tier0') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '20' },
            ],
          },
          {
            label: label('akordeon-1.mfu-kolor.tier1'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-1.mfu-kolor.tier1') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.mfu-kolor.tier1') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.mfu-kolor.tier1') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '30' },
            ],
          },
          {
            label: label('akordeon-1.mfu-kolor.tier2'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-1.mfu-kolor.tier2') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.mfu-kolor.tier2') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.mfu-kolor.tier2') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '40' },
            ],
          },
        ],
      },
    ],
  })

  sections.push({
    id: 'akordeon-2',
    title: 'Laserowe (format A3/A4)',
    footer: 'Każdą wydrukowaną stronę A3 liczymy jak dwie strony A4',
    items: [],
    subcategories: [
      {
        id: 'a3-drukarki-mono',
        title: 'Drukarki A3 (mono)',
        items: [],
        icon: '/images/wynajem-a3-drukarki-mono-v2.webp',
        priceTiers: [
          {
            label: label('akordeon-2.a3-drukarki-mono.tier0'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-2.a3-drukarki-mono.tier0') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-drukarki-mono.tier0') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-drukarki-mono.tier0') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '50' },
            ],
          },
          {
            label: label('akordeon-2.a3-drukarki-mono.tier1'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-2.a3-drukarki-mono.tier1') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-drukarki-mono.tier1') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-drukarki-mono.tier1') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '60' },
            ],
          },
          {
            label: label('akordeon-2.a3-drukarki-mono.tier2'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-2.a3-drukarki-mono.tier2') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-drukarki-mono.tier2') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-drukarki-mono.tier2') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '90' },
            ],
          },
        ],
      },
      {
        id: 'a3-drukarki-kolor',
        title: 'Drukarki A3 (mono+kolor)',
        items: [],
        icon: '/images/wynajem-a3-drukarki-kolor-v2.webp',
        priceTiers: [
          {
            label: label('akordeon-2.a3-drukarki-kolor.tier0'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-2.a3-drukarki-kolor.tier0') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-drukarki-kolor.tier0') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier0') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '50' },
            ],
          },
          {
            label: label('akordeon-2.a3-drukarki-kolor.tier1'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-2.a3-drukarki-kolor.tier1') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-drukarki-kolor.tier1') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier1') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '60' },
            ],
          },
          {
            label: label('akordeon-2.a3-drukarki-kolor.tier2'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-2.a3-drukarki-kolor.tier2') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-drukarki-kolor.tier2') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier2') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '90' },
            ],
          },
        ],
      },
      {
        id: 'a3-mfu-mono',
        title: 'MFU A3 (mono)',
        items: [],
        icon: '/images/wynajem-a3-mfu-mono-v2.webp',
        priceTiers: [
          {
            label: label('akordeon-2.a3-mfu-mono.tier0'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-2.a3-mfu-mono.tier0') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-mfu-mono.tier0') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-mfu-mono.tier0') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '50' },
            ],
          },
          {
            label: label('akordeon-2.a3-mfu-mono.tier1'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-2.a3-mfu-mono.tier1') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-mfu-mono.tier1') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-mfu-mono.tier1') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '60' },
            ],
          },
          {
            label: label('akordeon-2.a3-mfu-mono.tier2'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-2.a3-mfu-mono.tier2') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-mfu-mono.tier2') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-mfu-mono.tier2') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '90' },
            ],
          },
        ],
      },
      {
        id: 'a3-mfu-kolor',
        title: 'MFU A3 (mono+kolor)',
        items: [],
        icon: '/images/wynajem-a3-mfu-kolor-v2.webp',
        priceTiers: [
          {
            label: label('akordeon-2.a3-mfu-kolor.tier0'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-2.a3-mfu-kolor.tier0') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-mfu-kolor.tier0') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-mfu-kolor.tier0') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '50' },
            ],
          },
          {
            label: label('akordeon-2.a3-mfu-kolor.tier1'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-2.a3-mfu-kolor.tier1') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-mfu-kolor.tier1') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-mfu-kolor.tier1') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '60' },
            ],
          },
          {
            label: label('akordeon-2.a3-mfu-kolor.tier2'),
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: rent('akordeon-2.a3-mfu-kolor.tier2') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-mfu-kolor.tier2') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-mfu-kolor.tier2') },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '90' },
            ],
          },
        ],
      },
    ],
  })

  // Добавляем FAQ в конец
  sections.push(createFaqSection())

  return sections
}
