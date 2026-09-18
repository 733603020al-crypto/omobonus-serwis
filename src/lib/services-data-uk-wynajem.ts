import type { PricingSection } from './services-data-types'
import { getDisplayPrice } from './services-pricing'

const SLUG = 'wynajem-drukarek'
const rent = (path: string) => getDisplayPrice(SLUG, `${path}.rent`, 'uk')
const pages = (path: string) => getDisplayPrice(SLUG, `${path}.pages`, 'uk')
const overLimit = (path: string) => getDisplayPrice(SLUG, `${path}.overLimitPrice`, 'uk')
const label = (path: string) => `${rent(path)}/міс.`

export const wynajemAkordeon1: PricingSection = {
  id: 'akordeon-1',
  title: 'Лазерні (формат A4)',
  items: [],
  subcategories: [
    {
      id: 'drukarki-mono',
      title: 'Принтери A4 (моно)',
      items: [],
      icon: '/images/A4_Drukarki_mono.webp',
      priceTiers: [
        {
          label: label('akordeon-1.drukarki-mono.tier0'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-1.drukarki-mono.tier0') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.drukarki-mono.tier0') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.drukarki-mono.tier0') },
            { label: 'Дуплекс', value: '-' },
            { label: 'Швидкість друку до: (стор./хв)', value: '20' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-mono.tier1'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-1.drukarki-mono.tier1') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.drukarki-mono.tier1') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.drukarki-mono.tier1') },
            { label: 'Дуплекс', value: '- / +' },
            { label: 'Швидкість друку до: (стор./хв)', value: '40' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-mono.tier2'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-1.drukarki-mono.tier2') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.drukarki-mono.tier2') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.drukarki-mono.tier2') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '60' },
          ],
        },
      ],
    },
    {
      id: 'drukarki-kolor',
      title: 'Принтери A4 (моно+колір)',
      items: [],
      icon: '/images/A4_Drukarki_kolor.webp',
      priceTiers: [
        {
          label: label('akordeon-1.drukarki-kolor.tier0'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-1.drukarki-kolor.tier0') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.drukarki-kolor.tier0') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.drukarki-kolor.tier0') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '20' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-kolor.tier1'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-1.drukarki-kolor.tier1') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.drukarki-kolor.tier1') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.drukarki-kolor.tier1') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '40' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-kolor.tier2'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-1.drukarki-kolor.tier2') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.drukarki-kolor.tier2') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.drukarki-kolor.tier2') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '60' },
          ],
        },
      ],
    },
    {
      id: 'mfu-mono',
      title: 'МФУ A4 (моно)',
      items: [],
      icon: '/images/A4_MFU_mono.webp',
      priceTiers: [
        {
          label: label('akordeon-1.mfu-mono.tier0'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-1.mfu-mono.tier0') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.mfu-mono.tier0') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.mfu-mono.tier0') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '20' },
          ],
        },
        {
          label: label('akordeon-1.mfu-mono.tier1'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-1.mfu-mono.tier1') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.mfu-mono.tier1') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.mfu-mono.tier1') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '40' },
          ],
        },
        {
          label: label('akordeon-1.mfu-mono.tier2'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-1.mfu-mono.tier2') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.mfu-mono.tier2') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.mfu-mono.tier2') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '60' },
          ],
        },
      ],
    },
    {
      id: 'mfu-kolor',
      title: 'МФУ A4 (моно+колір)',
      items: [],
      icon: '/images/A4_MFU_kolor.webp',
      priceTiers: [
        {
          label: label('akordeon-1.mfu-kolor.tier0'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-1.mfu-kolor.tier0') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.mfu-kolor.tier0') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.mfu-kolor.tier0') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '20' },
          ],
        },
        {
          label: label('akordeon-1.mfu-kolor.tier1'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-1.mfu-kolor.tier1') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.mfu-kolor.tier1') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.mfu-kolor.tier1') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '30' },
          ],
        },
        {
          label: label('akordeon-1.mfu-kolor.tier2'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-1.mfu-kolor.tier2') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.mfu-kolor.tier2') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.mfu-kolor.tier2') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '40' },
          ],
        },
      ],
    },
  ],
}

export const wynajemAkordeon2: PricingSection = {
  id: 'akordeon-2',
  title: 'Лазерні (формат A3/A4)',
  footer: 'Кожну надруковану сторінку A3 рахуємо як дві сторінки A4',
  items: [],
  subcategories: [
    {
      id: 'a3-drukarki-mono',
      title: 'Принтери A3 (моно)',
      items: [],
      icon: '/images/Drukarki_A3_A4_mono.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-drukarki-mono.tier0'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-2.a3-drukarki-mono.tier0') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-drukarki-mono.tier0') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-drukarki-mono.tier0') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '50' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-mono.tier1'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-2.a3-drukarki-mono.tier1') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-drukarki-mono.tier1') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-drukarki-mono.tier1') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '60' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-mono.tier2'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-2.a3-drukarki-mono.tier2') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-drukarki-mono.tier2') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-drukarki-mono.tier2') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '90' },
          ],
        },
      ],
    },
    {
      id: 'a3-drukarki-kolor',
      title: 'Принтери A3 (моно+колір)',
      items: [],
      icon: '/images/Drukarki_A3_A4_mono_kolor.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-drukarki-kolor.tier0'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-2.a3-drukarki-kolor.tier0') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-drukarki-kolor.tier0') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier0') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '50' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-kolor.tier1'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-2.a3-drukarki-kolor.tier1') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-drukarki-kolor.tier1') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier1') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '60' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-kolor.tier2'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-2.a3-drukarki-kolor.tier2') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-drukarki-kolor.tier2') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier2') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '90' },
          ],
        },
      ],
    },
    {
      id: 'a3-mfu-mono',
      title: 'МФУ A3 (моно)',
      items: [],
      icon: '/images/MFU_A3_A4_mono.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-mfu-mono.tier0'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-2.a3-mfu-mono.tier0') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-mfu-mono.tier0') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-mfu-mono.tier0') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '50' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-mono.tier1'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-2.a3-mfu-mono.tier1') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-mfu-mono.tier1') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-mfu-mono.tier1') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '60' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-mono.tier2'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-2.a3-mfu-mono.tier2') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-mfu-mono.tier2') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-mfu-mono.tier2') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '90' },
          ],
        },
      ],
    },
    {
      id: 'a3-mfu-kolor',
      title: 'МФУ A3 (моно+колір)',
      items: [],
      icon: '/images/MFU_A3_A4_mono_kolor.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-mfu-kolor.tier0'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-2.a3-mfu-kolor.tier0') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-mfu-kolor.tier0') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-mfu-kolor.tier0') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '50' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-kolor.tier1'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-2.a3-mfu-kolor.tier1') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-mfu-kolor.tier1') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-mfu-kolor.tier1') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '60' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-kolor.tier2'),
          rows: [
            { label: 'Орендна плата [zł/міс.]', value: rent('akordeon-2.a3-mfu-kolor.tier2') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-mfu-kolor.tier2') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-mfu-kolor.tier2') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Швидкість друку до: (стор./хв)', value: '90' },
          ],
        },
      ],
    },
  ],
}

// -------------------------------------------------------
// Принтер на заміну
// -------------------------------------------------------
