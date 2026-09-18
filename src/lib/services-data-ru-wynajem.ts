import type { PricingSection } from './services-data-types'
import { getDisplayPrice } from './services-pricing'

const SLUG = 'wynajem-drukarek'
const rent = (path: string) => getDisplayPrice(SLUG, `${path}.rent`, 'ru')
const pages = (path: string) => getDisplayPrice(SLUG, `${path}.pages`, 'ru')
const overLimit = (path: string) => getDisplayPrice(SLUG, `${path}.overLimitPrice`, 'ru')
const label = (path: string) => `${rent(path)}/мес.`

export const wynajemAkordeon1: PricingSection = {
  id: 'akordeon-1',
  title: 'Лазерные (формат A4)',
  items: [],
  subcategories: [
    {
      id: 'drukarki-mono',
      title: 'Принтеры A4 (моно)',
      items: [],
      icon: '/images/A4_Drukarki_mono.webp',
      priceTiers: [
        {
          label: label('akordeon-1.drukarki-mono.tier0'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-1.drukarki-mono.tier0') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.drukarki-mono.tier0') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.drukarki-mono.tier0') },
            { label: 'Дуплекс', value: '-' },
            { label: 'Скорость печати до: (стр./мин)', value: '20' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-mono.tier1'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-1.drukarki-mono.tier1') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.drukarki-mono.tier1') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.drukarki-mono.tier1') },
            { label: 'Дуплекс', value: '- / +' },
            { label: 'Скорость печати до: (стр./мин)', value: '40' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-mono.tier2'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-1.drukarki-mono.tier2') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.drukarki-mono.tier2') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.drukarki-mono.tier2') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '60' },
          ],
        },
      ],
    },
    {
      id: 'drukarki-kolor',
      title: 'Принтеры A4 (моно+цвет)',
      items: [],
      icon: '/images/A4_Drukarki_kolor.webp',
      priceTiers: [
        {
          label: label('akordeon-1.drukarki-kolor.tier0'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-1.drukarki-kolor.tier0') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.drukarki-kolor.tier0') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.drukarki-kolor.tier0') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '20' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-kolor.tier1'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-1.drukarki-kolor.tier1') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.drukarki-kolor.tier1') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.drukarki-kolor.tier1') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '40' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-kolor.tier2'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-1.drukarki-kolor.tier2') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.drukarki-kolor.tier2') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.drukarki-kolor.tier2') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '60' },
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
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-1.mfu-mono.tier0') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.mfu-mono.tier0') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.mfu-mono.tier0') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '20' },
          ],
        },
        {
          label: label('akordeon-1.mfu-mono.tier1'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-1.mfu-mono.tier1') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.mfu-mono.tier1') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.mfu-mono.tier1') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '40' },
          ],
        },
        {
          label: label('akordeon-1.mfu-mono.tier2'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-1.mfu-mono.tier2') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.mfu-mono.tier2') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.mfu-mono.tier2') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '60' },
          ],
        },
      ],
    },
    {
      id: 'mfu-kolor',
      title: 'МФУ A4 (моно+цвет)',
      items: [],
      icon: '/images/A4_MFU_kolor.webp',
      priceTiers: [
        {
          label: label('akordeon-1.mfu-kolor.tier0'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-1.mfu-kolor.tier0') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.mfu-kolor.tier0') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.mfu-kolor.tier0') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '20' },
          ],
        },
        {
          label: label('akordeon-1.mfu-kolor.tier1'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-1.mfu-kolor.tier1') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.mfu-kolor.tier1') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.mfu-kolor.tier1') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '30' },
          ],
        },
        {
          label: label('akordeon-1.mfu-kolor.tier2'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-1.mfu-kolor.tier2') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.mfu-kolor.tier2') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.mfu-kolor.tier2') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '40' },
          ],
        },
      ],
    },
  ],
}

export const wynajemAkordeon2: PricingSection = {
  id: 'akordeon-2',
  title: 'Лазерные (формат A3/A4)',
  footer: 'Каждую напечатанную страницу A3 считаем как две страницы A4',
  items: [],
  subcategories: [
    {
      id: 'a3-drukarki-mono',
      title: 'Принтеры A3 (моно)',
      items: [],
      icon: '/images/Drukarki_A3_A4_mono.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-drukarki-mono.tier0'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-2.a3-drukarki-mono.tier0') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-drukarki-mono.tier0') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-drukarki-mono.tier0') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '50' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-mono.tier1'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-2.a3-drukarki-mono.tier1') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-drukarki-mono.tier1') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-drukarki-mono.tier1') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '60' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-mono.tier2'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-2.a3-drukarki-mono.tier2') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-drukarki-mono.tier2') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-drukarki-mono.tier2') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '90' },
          ],
        },
      ],
    },
    {
      id: 'a3-drukarki-kolor',
      title: 'Принтеры A3 (моно+цвет)',
      items: [],
      icon: '/images/Drukarki_A3_A4_mono_kolor.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-drukarki-kolor.tier0'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-2.a3-drukarki-kolor.tier0') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-drukarki-kolor.tier0') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier0') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '50' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-kolor.tier1'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-2.a3-drukarki-kolor.tier1') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-drukarki-kolor.tier1') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier1') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '60' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-kolor.tier2'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-2.a3-drukarki-kolor.tier2') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-drukarki-kolor.tier2') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier2') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '90' },
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
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-2.a3-mfu-mono.tier0') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-mfu-mono.tier0') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-mfu-mono.tier0') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '50' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-mono.tier1'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-2.a3-mfu-mono.tier1') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-mfu-mono.tier1') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-mfu-mono.tier1') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '60' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-mono.tier2'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-2.a3-mfu-mono.tier2') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-mfu-mono.tier2') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-mfu-mono.tier2') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '90' },
          ],
        },
      ],
    },
    {
      id: 'a3-mfu-kolor',
      title: 'МФУ A3 (моно+цвет)',
      items: [],
      icon: '/images/MFU_A3_A4_mono_kolor.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-mfu-kolor.tier0'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-2.a3-mfu-kolor.tier0') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-mfu-kolor.tier0') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-mfu-kolor.tier0') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '50' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-kolor.tier1'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-2.a3-mfu-kolor.tier1') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-mfu-kolor.tier1') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-mfu-kolor.tier1') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '60' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-kolor.tier2'),
          rows: [
            { label: 'Арендная плата [zł/мес.]', value: rent('akordeon-2.a3-mfu-kolor.tier2') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-mfu-kolor.tier2') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-mfu-kolor.tier2') },
            { label: 'Дуплекс', value: '+' },
            { label: 'Скорость печати до: (стр./мин)', value: '90' },
          ],
        },
      ],
    },
  ],
}

// -------------------------------------------------------
// Принтер на замену
// -------------------------------------------------------
