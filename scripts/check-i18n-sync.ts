// Постоянная проверка синхронности 3 языковых версий (pl/ru/uk) сайта.
// Запуск: npm run check:i18n-sync
//
// Что проверяет:
// 1) Структурное соответствие pl/ru/uk 1:1 — одинаковый набор и порядок
//    slug-ов услуг, секций прайса, подкатегорий, количество позиций в каждой
//    и (для wynajem-drukarek/drukarka-zastepcza) количество priceTiers/rows.
// 2) Что для каждой ценовой/срочной позиции, для которой номера уже вынесены
//    в общий источник (services-pricing-data.ts), текст в каждом языковом
//    файле (item.price/item.duration) не разошёлся с тем, что реально
//    выводится через getDisplayPrice/getDisplayDuration — то есть что в
//    языковых файлах не появился новый захардкоженный текст цены/срока,
//    из общей схемы.
// 3) Числовое ядро priceTiers-строк и subcategory.price для wynajem-drukarek
//    и drukarka-zastepcza — совпадает ли набор цифр в pl/ru/uk (сами числа
//    там дублированы по 3 языковым файлам, поэтому могут разъехаться, если
//    кто-то поправит число только в одном файле).
//
// Подробнее об архитектуре — см. AGENTS.md, раздел "Цены/сроки услуг: единый
// источник для 3 языков".

import { services, type PricingSection, type PricingSubcategory } from '@/lib/services-data'
import { servicesRu } from '@/lib/services-data-ru'
import { servicesUk } from '@/lib/services-data-uk'
import { walkPricingItems, pricingId, getDisplayPrice, getDisplayDuration } from '@/lib/services-pricing'
import { migratedPrice, migratedDuration } from '@/lib/services-pricing-data'

type Locale = 'ru' | 'uk'

interface Problem {
  id: string
  file: string
  message: string
}

const problems: Problem[] = []

function report(id: string, file: string, message: string) {
  problems.push({ id, file, message })
}

function numericCore(s: string): string {
  return (s.match(/\d+([.,]\d+)?/g) ?? []).join(',')
}

// --- 1) Структурное соответствие slug-ов услуг -----------------------------

const plSlugs = services.map(s => s.slug)
const ruSlugs = servicesRu.map(s => s.slug)
const ukSlugs = servicesUk.map(s => s.slug)

function compareSlugLists(locale: Locale, list: string[]) {
  if (list.length !== plSlugs.length) {
    report('services', `services-data-${locale}.ts`, `Число услуг ${list.length}, в PL ${plSlugs.length}`)
  }
  const max = Math.max(plSlugs.length, list.length)
  for (let i = 0; i < max; i++) {
    if (plSlugs[i] !== list[i]) {
      report(`services[${i}]`, `services-data-${locale}.ts`, `slug "${list[i] ?? '—'}" не совпадает с PL "${plSlugs[i] ?? '—'}" (позиция ${i})`)
    }
  }
}

compareSlugLists('ru', ruSlugs)
compareSlugLists('uk', ukSlugs)

// --- 2) Структурное соответствие секций/подкатегорий/позиций ---------------

function sectionKey(slug: string, section: PricingSection) {
  return `${slug}::${section.id}`
}

function compareSections(locale: Locale, plSlug: string, plSections: PricingSection[], otherSections: PricingSection[]) {
  const plIds = plSections.map(s => s.id)
  const otherIds = otherSections.map(s => s.id)
  if (plIds.join('|') !== otherIds.join('|')) {
    report(sectionKey(plSlug, plSections[0] ?? { id: '?', title: '', items: [] }), `services-data-${locale}.ts`,
      `Список секций услуги "${plSlug}" не совпадает с PL: PL=[${plIds.join(', ')}] ${locale.toUpperCase()}=[${otherIds.join(', ')}]`)
    return
  }

  plSections.forEach((plSection, i) => {
    const otherSection = otherSections[i]
    const id = sectionKey(plSlug, plSection)

    if (plSection.items.length !== otherSection.items.length) {
      report(id, `services-data-${locale}.ts`,
        `Секция "${plSection.id}": ${otherSection.items.length} позиций, в PL ${plSection.items.length}`)
    }

    const plSubIds = (plSection.subcategories ?? []).map(s => s.id)
    const otherSubIds = (otherSection.subcategories ?? []).map(s => s.id)
    if (plSubIds.join('|') !== otherSubIds.join('|')) {
      report(id, `services-data-${locale}.ts`,
        `Секция "${plSection.id}": подкатегории не совпадают: PL=[${plSubIds.join(', ')}] ${locale.toUpperCase()}=[${otherSubIds.join(', ')}]`)
      return
    }

    ;(plSection.subcategories ?? []).forEach((plSub, j) => {
      const otherSub = (otherSection.subcategories ?? [])[j]
      compareSubcategory(locale, plSlug, plSection, plSub, otherSub)
    })
  })
}

function compareSubcategory(locale: Locale, plSlug: string, plSection: PricingSection, plSub: PricingSubcategory, otherSub: PricingSubcategory) {
  const id = `${plSlug}::${plSection.id}.${plSub.id}`

  if (plSub.items.length !== otherSub.items.length) {
    report(id, `services-data-${locale}.ts`,
      `Подкатегория "${plSub.id}": ${otherSub.items.length} позиций, в PL ${plSub.items.length}`)
  }

  const plTiers = plSub.priceTiers ?? []
  const otherTiers = otherSub.priceTiers ?? []
  if (plTiers.length !== otherTiers.length) {
    report(id, `services-data-${locale}.ts`,
      `Подкатегория "${plSub.id}": ${otherTiers.length} priceTiers, в PL ${plTiers.length}`)
    return
  }

  plTiers.forEach((plTier, tierIdx) => {
    const otherTier = otherTiers[tierIdx]
    if (plTier.rows.length !== otherTier.rows.length) {
      report(`${id}.tier${tierIdx}`, `services-data-${locale}.ts`,
        `priceTier ${tierIdx} ("${plTier.label}"): ${otherTier.rows.length} строк, в PL ${plTier.rows.length}`)
      return
    }
    plTier.rows.forEach((plRow, rowIdx) => {
      const otherRow = otherTier.rows[rowIdx]
      const plCore = numericCore(plRow.value)
      const otherCore = numericCore(otherRow.value)
      if (plCore !== otherCore) {
        report(`${id}.tier${tierIdx}.row${rowIdx}`, `services-data-${locale}.ts`,
          `priceTier ${tierIdx}, строка ${rowIdx} ("${plRow.label}"): числа "${otherRow.value}" (${otherCore || '—'}) не совпадают с PL "${plRow.value}" (${plCore || '—'})`)
      }
    })
  })

  // subcategory.price (drukarka-zastepcza — цена в заголовке подменю)
  if (plSub.price !== undefined || otherSub.price !== undefined) {
    const plCore = numericCore(plSub.price ?? '')
    const otherCore = numericCore(otherSub.price ?? '')
    if (plCore !== otherCore) {
      report(id, `services-data-${locale}.ts`,
        `subcategory.price: числа "${otherSub.price ?? '—'}" (${otherCore || '—'}) не совпадают с PL "${plSub.price ?? '—'}" (${plCore || '—'})`)
    }
  }
}

services.forEach((plService, i) => {
  const ruService = servicesRu[i]
  const ukService = servicesUk[i]
  if (ruService && ruService.slug === plService.slug) {
    compareSections('ru', plService.slug, plService.pricingSections, ruService.pricingSections)
  }
  if (ukService && ukService.slug === plService.slug) {
    compareSections('uk', plService.slug, plService.pricingSections, ukService.pricingSections)
  }
})

// --- 3) getDisplayPrice/getDisplayDuration vs. текст в языковых файлах -----
// Цена для мигрированных позиций больше не хранится в языковых файлах
// (item.price отсутствует) — единственный источник это services-pricing-data.ts,
// getDisplayPrice бросает исключение сама, если для id нет записи. Здесь только
// проверяем, что legacy item.price не появился заново по ошибке, и что
// getDisplayPrice реально строится (иначе упал бы build).
// Срок (duration) пока не мигрирован на строгий режим — сравниваем как раньше.

interface LangSet {
  locale: 'pl' | Locale
  list: typeof services
  file: string
}

const langSets: LangSet[] = [
  { locale: 'pl', list: services, file: 'services-data.ts' },
  { locale: 'ru', list: servicesRu, file: 'services-data-ru.ts' },
  { locale: 'uk', list: servicesUk, file: 'services-data-uk.ts' },
]

let checkedPositions = 0
let migratedCount = 0

for (const { locale, list, file } of langSets) {
  for (const service of list) {
    walkPricingItems(service.pricingSections, (path, item) => {
      const id = pricingId(service.slug, path)
      checkedPositions++

      if (migratedPrice[id]) {
        migratedCount++
        if (item.price !== undefined) {
          report(id, file, `У мигрированной позиции остался legacy item.price = "${item.price}" — цена должна быть только в services-pricing-data.ts`)
        }
        getDisplayPrice(service.slug, path, locale)
      }

      if (migratedDuration[id]) {
        const displayDuration = getDisplayDuration(service.slug, path, locale, item.duration)
        if (displayDuration !== item.duration) {
          report(id, file, `Срок в файле "${item.duration}" не совпадает с построенным через общую схему "${displayDuration}"`)
        }
      }
    })
  }
}

// --- Итог --------------------------------------------------------------

console.log(`check:i18n-sync — проверено услуг: PL=${plSlugs.length}, RU=${ruSlugs.length}, UK=${ukSlugs.length}`)
console.log(`check:i18n-sync — позиций цен/сроков проверено: ${checkedPositions} (по общей схеме: ${migratedCount / langSets.length} id × ${langSets.length} языка)`)

if (problems.length === 0) {
  console.log('check:i18n-sync: OK — расхождений не найдено')
  process.exit(0)
} else {
  console.log(`check:i18n-sync: НАЙДЕНЫ РАСХОЖДЕНИЯ (${problems.length}):`)
  for (const p of problems) {
    console.log(`  [${p.id}] ${p.file}: ${p.message}`)
  }
  process.exit(1)
}
