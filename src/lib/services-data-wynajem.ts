import type { PricingSection } from './services-data-types'
import { createDefaultPricingSections, createFaqSection } from './services-data-shared'

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
        icon: '/images/A4_Drukarki_mono.webp',
        priceTiers: [
          {
            label: '30 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '30 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '500 str./mies.' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,05 zł' },
              { label: 'Duplex', value: '-' },
              { label: 'Prędkość druku do: (str./min)', value: '20' },
            ],
          },
          {
            label: '50 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '50 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '1 000 str./mies.' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,05 zł' },
              { label: 'Duplex', value: '- / +' },
              { label: 'Prędkość druku do: (str./min)', value: '40' },
            ],
          },
          {
            label: '100 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '100 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '2 500 str./mies.' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,04 zł' },
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
        icon: '/images/A4_Drukarki_kolor.webp',
        priceTiers: [
          {
            label: '50 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '50 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '1 000 str. (mono) / + 0 str. (kolor)' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,05 zł (mono) / 0,25 zł (kolor)' },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '20' },
            ],
          },
          {
            label: '100 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '100 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '1 000 str. (mono) / + 200 str. (kolor)' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,05 zł (mono) / 0,20 zł (kolor)' },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '40' },
            ],
          },
          {
            label: '150 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '150 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '2 000 str. (mono) / + 200 str. (kolor)' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,04 zł (mono) / 0,20 zł (kolor)' },
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
        icon: '/images/A4_MFU_mono.webp',
        priceTiers: [
          {
            label: '80 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '80 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '1 500 str./mies.' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,05 zł' },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '20' },
            ],
          },
          {
            label: '100 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '100 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '2 000 str./mies.' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,05 zł' },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '40' },
            ],
          },
          {
            label: '150 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '150 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '3 000 str./mies.' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,04 zł' },
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
        icon: '/images/A4_MFU_kolor.webp',
        priceTiers: [
          {
            label: '100 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '100 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '1 000 str. (mono) / + 100 str. (kolor)' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,05 zł (mono) / 0,25 zł (kolor)' },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '20' },
            ],
          },
          {
            label: '150 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '150 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '1 500 str. (mono) / + 200 str. (kolor)' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,05 zł (mono) / 0,20 zł (kolor)' },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '30' },
            ],
          },
          {
            label: '200 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '200 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '2 000 str. (mono) / + 300 str. (kolor)' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,04 zł (mono) / 0,20 zł (kolor)' },
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
        icon: '/images/Drukarki_A3_A4_mono.webp',
        priceTiers: [
          {
            label: '100 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '100 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '2 500 str./mies.' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,04 zł' },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '50' },
            ],
          },
          {
            label: '150 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '150 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '3 750 str./mies.' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,04 zł' },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '60' },
            ],
          },
          {
            label: '200 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '200 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '5 000 str./mies.' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,03 zł' },
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
        icon: '/images/Drukarki_A3_A4_mono_kolor.webp',
        priceTiers: [
          {
            label: '200 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '200 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '2 000 str. (mono) / + 300 str. (kolor)' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,04 zł (mono) / 0,25 zł (kolor)' },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '50' },
            ],
          },
          {
            label: '250 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '250 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '3 000 str. (mono) / + 500 str. (kolor)' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,04 zł (mono) / 0,20 zł (kolor)' },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '60' },
            ],
          },
          {
            label: '300 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '300 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '5 000 str. (mono) / + 800 str. (kolor)' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,03 zł (mono) / 0,18 zł (kolor)' },
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
        icon: '/images/MFU_A3_A4_mono.webp',
        priceTiers: [
          {
            label: '200 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '200 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '5 000 str./mies.' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,04 zł' },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '50' },
            ],
          },
          {
            label: '250 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '250 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '7 000 str./mies.' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,04 zł' },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '60' },
            ],
          },
          {
            label: '300 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '300 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '10 000 str./mies.' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,03 zł' },
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
        icon: '/images/MFU_A3_A4_mono_kolor.webp',
        priceTiers: [
          {
            label: '300 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '300 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '5 000 str. (mono) / + 500 str. (kolor)' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,04 zł (mono) / 0,16 zł (kolor)' },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '50' },
            ],
          },
          {
            label: '400 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '400 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '7 500 str. (mono) / + 750 str. (kolor)' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,04 zł (mono) / 0,16 zł (kolor)' },
              { label: 'Duplex', value: '+' },
              { label: 'Prędkość druku do: (str./min)', value: '60' },
            ],
          },
          {
            label: '500 zł/mies.',
            rows: [
              { label: 'Czynsz wynajmu (zł miesięcznie)', value: '500 zł' },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: '10 000 str. (mono) / + 1 000 str. (kolor)' },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: '0,03 zł (mono) / 0,15 zł (kolor)' },
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
