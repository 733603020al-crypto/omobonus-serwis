import type { PricingSection } from './services-data-types'

export const zastepczaAkordeon1: PricingSection = {
  id: 'akordeon-1',
  title: 'Лазерные (формат A4)',
  items: [],
  subcategories: [
    { id: 'drukarki-mono', title: 'Принтеры A4 (моно)', items: [], price: '0,06' },
    { id: 'drukarki-kolor', title: 'Принтеры A4 (моно+цвет)', items: [], price: '0,06 / 0,27' },
    { id: 'mfu-mono', title: 'МФУ A4 (моно)', items: [], price: '0,08' },
    { id: 'mfu-kolor', title: 'МФУ A4 (моно+цвет)', items: [], price: '0,08 / 0,30' },
  ],
}

export const zastepczaAkordeon2: PricingSection = {
  id: 'akordeon-2',
  title: 'Лазерные (формат A3)',
  items: [],
  subcategories: [
    { id: 'a3-drukarki-mono', title: 'Принтеры A3 (моно)', items: [], price: '0,05' },
    { id: 'a3-drukarki-kolor', title: 'Принтеры A3 (моно+цвет)', items: [], price: '0,05 / 0,27' },
    { id: 'a3-mfu-mono', title: 'МФУ A3 (моно)', items: [], price: '0,07' },
    { id: 'a3-mfu-kolor', title: 'МФУ A3 (моно+цвет)', items: [], price: '0,07 / 0,30' },
  ],
}

// -------------------------------------------------------
// Сборка финального массива servicesRu
// -------------------------------------------------------
