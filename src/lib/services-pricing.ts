import { type PricingItem, type PricingSection } from './services-data'
import { migratedPrice, migratedDuration, type FieldMigration } from './services-pricing-data'
import { PRICE_WRAPPERS, DURATION_WRAPPERS, type WrapperTemplate } from './services-pricing-wrappers'

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
// Все 510 позиций цены и 510 позиций срока мигрированы в migratedPrice/
// migratedDuration (включая бывшие уникальные форматы — см. "Бывшие ... спец-
// случаи" в services-pricing-wrappers.ts). fallback в resolveDisplay остаётся
// как защита архитектуры (id без записи в migrated* при будущих правках), а
// не как активный путь для каких-то конкретных сегодняшних позиций.

function fillTemplate(template: string, numbers: string[]): string {
  return template.replace(/\{(\d+)\}/g, (_, i) => numbers[Number(i)] ?? '')
}

function resolveDisplay(
  migrated: Record<string, FieldMigration>,
  wrappers: Record<string, WrapperTemplate>,
  id: string,
  locale: PricingLocale,
  fallback: string,
): string {
  const entry = migrated[id]
  if (!entry) return fallback
  const wrapper = wrappers[entry.wrapperKey]
  if (!wrapper) return fallback
  return fillTemplate(wrapper[locale], entry.numbers)
}

export function getDisplayPrice(slug: string, path: string, locale: PricingLocale, fallback: string): string {
  return resolveDisplay(migratedPrice, PRICE_WRAPPERS, pricingId(slug, path), locale, fallback)
}

export function getDisplayDuration(slug: string, path: string, locale: PricingLocale, fallback: string): string {
  return resolveDisplay(migratedDuration, DURATION_WRAPPERS, pricingId(slug, path), locale, fallback)
}
