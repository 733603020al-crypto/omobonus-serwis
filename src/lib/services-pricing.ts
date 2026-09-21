import { type PricingItem, type PricingSection } from './services-data'
import { migratedPrice, migratedDuration } from './services-pricing-data'
import { PRICE_WRAPPERS, DURATION_WRAPPERS } from './services-pricing-wrappers'

export type PricingLocale = 'pl' | 'ru' | 'uk'

// Id — позиционный, вычисляется на лету, без правки самих item-ов.

export function walkPricingItems(
  sections: PricingSection[],
  visit: (path: string, item: PricingItem) => void
) {
  for (const section of sections) {
    section.items.forEach((item, i) => visit(`${section.id}.items.${i}`, item))
    for (const sub of section.subcategories ?? []) {
      sub.items.forEach((item, i) => visit(`${section.id}.${sub.id}.${i}`, item))
    }
  }
}

export function pricingId(slug: string, path: string): string {
  return `${slug}::${path}`
}

// --- Реальный общий источник цен/сроков (этап 2) ---
//
// src/lib/services-pricing-data.ts (migratedPrice / migratedDuration) хранит,
// по каждой id-позиции, числа + ключ "обёртки" (слова вокруг числа: "od",
// "+ część", "GRATIS" и т.п.). src/lib/services-pricing-wrappers.ts хранит сам
// перевод обёрток на pl/ru/uk — один глобальный словарь на весь сайт.
// Итоговая строка собирается здесь: число(-а) из services-pricing-data.ts +
// перевод обёртки на нужный язык. Отредактировать число для всех 3 языков
// сразу — значит отредактировать services-pricing-data.ts.
//
// Все 510 позиций цены и 519 позиций срока мигрированы в migratedPrice/
// migratedDuration (включая бывшие уникальные форматы — см. "Бывшие ... спец-
// случаи" в services-pricing-wrappers.ts). И для цены (getDisplayPrice), и
// для срока (getDisplayDuration) legacy item.price/item.duration больше не
// существует как fallback — отсутствие записи в migratedPrice/migratedDuration
// или в соответствующем словаре обёрток теперь явная ошибка (dev и build),
// чтобы значение нельзя было молча потерять.

function fillTemplate(template: string, numbers: string[]): string {
  return template.replace(/\{(\d+)\}/g, (_, i) => numbers[Number(i)] ?? '')
}

export function getDisplayPrice(slug: string, path: string, locale: PricingLocale): string {
  const id = pricingId(slug, path)
  const entry = migratedPrice[id]
  if (!entry) {
    throw new Error(`[services-pricing] Нет цены в migratedPrice для "${id}" — добавь запись в services-pricing-data.ts.`)
  }
  const wrapper = PRICE_WRAPPERS[entry.wrapperKey]
  if (!wrapper) {
    throw new Error(`[services-pricing] Неизвестный wrapperKey "${entry.wrapperKey}" для "${id}" в services-pricing-wrappers.ts.`)
  }
  return fillTemplate(wrapper[locale], entry.numbers)
}

export function getDisplayDuration(slug: string, path: string, locale: PricingLocale): string {
  const id = pricingId(slug, path)
  const entry = migratedDuration[id]
  if (!entry) {
    throw new Error(`[services-pricing] Нет срока в migratedDuration для "${id}" — добавь запись в services-pricing-data.ts.`)
  }
  const wrapper = DURATION_WRAPPERS[entry.wrapperKey]
  if (!wrapper) {
    throw new Error(`[services-pricing] Неизвестный wrapperKey "${entry.wrapperKey}" для "${id}" в services-pricing-wrappers.ts.`)
  }
  return fillTemplate(wrapper[locale], entry.numbers)
}

// Сырые числа без обёртки — только для сборки составных полей (например,
// tier.label), которые должны переиспользовать те же цифры, что и
// getDisplayPrice для того же id, без повторного набора числа в data-файле.
export function getPriceNumbers(slug: string, path: string): string[] {
  const id = pricingId(slug, path)
  const entry = migratedPrice[id]
  if (!entry) {
    throw new Error(`[services-pricing] Нет цены в migratedPrice для "${id}" — добавь запись в services-pricing-data.ts.`)
  }
  return entry.numbers
}
