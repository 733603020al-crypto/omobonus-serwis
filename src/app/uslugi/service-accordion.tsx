'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import manifest from '@/config/manifest'
import { DEFAULT_PRICE_TOOLTIP } from '@/lib/services-data'
import type { ServiceData } from '@/lib/services-data'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Info, ArrowRight, X } from 'lucide-react'

const getIconForSection = (sectionId: string) => {
  switch (sectionId) {
    case 'diagnoza':
      return manifest.P1_Diagnoza_i_wycena
    case 'dojazd':
      return manifest.P2_Dojazd
    case 'konserwacja':
      return manifest.P3_Czyszczenie_i_konserwacja_pakiety
    case 'naprawy':
      return manifest.P4_Naprawy_i_uslugi_serwisowe
    case 'faq':
      return manifest.P5_FAQ_pytania_i_odpowiedzi
    case 'akordeon-1':
      return '/images/A4.webp'
    case 'akordeon-2':
      return '/images/A3.webp'
    default:
      return manifest.P5_FAQ_pytania_i_odpowiedzi
  }
}

const getIconForSubcategory = (subcategoryId: string) => {
  switch (subcategoryId) {
    case 'drukarki-mono':
      return '/images/A4_Drukarki_mono.webp'
    case 'drukarki-kolor':
      return '/images/A4_Drukarki_kolor.webp'
    case 'mfu-mono':
      return '/images/A4_MFU_mono.webp'
    case 'mfu-kolor':
      return '/images/A4_MFU_kolor.webp'
    case 'a3-drukarki-mono':
      return '/images/Drukarki_A3_A4_mono.webp'
    case 'a3-drukarki-kolor':
      return '/images/Drukarki_A3_A4_mono_kolor.webp'
    case 'a3-mfu-mono':
      return '/images/MFU_A3_A4_mono.webp'
    case 'a3-mfu-kolor':
      return '/images/MFU_A3_A4_mono_kolor.webp'
    default:
      return null
  }
}

const PROPER_NOUN_PREFIXES = [
  'windows',
  'google',
  'onedrive',
  'airprint',
  'mopria',
  'mac',
  'bios',
  'uefi',
  'raid',
  'hp',
  'canon',
  'epson',
  'brother',
  'xerox',
  'kyocera',
  'samsung',
  'ricoh',
  'lexmark',
  'apple',
  'android',
  'wrocław',
  'wroclaw',
]

const hasOuterParens = (value: string) => {
  const trimmed = value.trim()
  return trimmed.startsWith('(') && trimmed.endsWith(')')
}

const stripOuterParens = (value: string) => {
  if (!value) return value
  let result = value.trim()
  while (result.length > 1 && hasOuterParens(result)) {
    result = result.slice(1, -1).trim()
  }
  return result
}

const shouldLowercaseContinuation = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) return false
  const firstChar = trimmed[0]
  if (firstChar === '(') return false
  if (/^\d/.test(firstChar)) return false
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿĄĆĘŁŃÓŚŹŻą-źż]/.test(firstChar)) return false
  const normalized = trimmed.toLowerCase()
  return !PROPER_NOUN_PREFIXES.some(prefix => normalized.startsWith(prefix))
}

const lowercaseFirstLetter = (value: string) => {
  if (!value) return value
  return value.charAt(0).toLocaleLowerCase('pl-PL') + value.slice(1)
}

const normalizeSecondLine = (value?: string | null) => {
  if (!value) return null
  let result = stripOuterParens(value)
  if (!result) return null
  if (shouldLowercaseContinuation(result)) {
    result = lowercaseFirstLetter(result)
  }
  return result
}

const stripTrailingPeriod = (value: string) => {
  let result = value.trim()
  if (result.endsWith('.')) {
    result = result.slice(0, -1).trimEnd()
  }
  return result
}

const parseServiceText = (text: string) => {
  if (!text) {
    return {
      main: '',
      parentheses: null,
    }
  }

  const buildResult = (main: string, secondary?: string | null) => {
    const normalizedSecondary = normalizeSecondLine(secondary)
    const normalizedMain =
      normalizedSecondary && main.trim().endsWith('.')
        ? stripTrailingPeriod(main)
        : main.trim()

    return {
      main: normalizedMain,
      parentheses: normalizedSecondary,
    }
  }

  if (text.includes('\n')) {
    const [firstLine, ...rest] = text.split('\n')
    const remainder = rest.join('\n').trim()
    return buildResult(firstLine, remainder || null)
  }

  const matchTwo = text.match(/^(.+?)\s*\((.+?)\)\s*\((.+?)\)\s*$/)
  if (matchTwo) {
    const mainWithFirstParens = `${matchTwo[1].trim()} (${matchTwo[2].trim()})`
    return buildResult(mainWithFirstParens, matchTwo[3].trim())
  }

  const match = text.match(/^(.+?)\s*\((.+?)\)\s*$/)
  if (match) {
    return buildResult(match[1], match[2])
  }

  return {
    main: text.trim(),
    parentheses: null,
  }
}

const supplementTextShadow = '0 0 8px rgba(237, 224, 196, 0.4), 0 0 4px rgba(237, 224, 196, 0.3)'

// Общая функция для рендеринга второстепенного текста (стиль как у SEO-текста)
// Единый стиль для всех второстепенных описаний на страницах услуг
// Явно переопределяем все визуальные параметры, чтобы избежать наследования от родительских элементов
const renderSecondaryText = (text: string, italic: boolean = false, key?: string | number) => (
  <div
    key={key ? `${text}-${key}` : undefined}
    className={`parentheses-text-isolated text-[12px] text-[#cbb27c] leading-relaxed ${italic ? 'italic' : ''}`}
    style={{
      opacity: 1,
      fontSize: '12px',
      fontWeight: 'normal',
      fontStyle: italic ? 'italic' : 'normal'
    }}
  >
    {text}
  </div>
)

const renderPriceLines = (price: string, link?: string) => {
  const trimmedPrice = price?.trim()
  if (trimmedPrice?.toLowerCase() === 'link' && link) {
    return (
      <Link
        href={link}
        className="font-inter text-[13px] md:text-[14px] text-[rgba(255,255,255,0.9)] underline underline-offset-2 hover:text-white focus:text-white transition-colors"
      >
        {trimmedPrice}
      </Link>
    )
  }

  const renderSuffixLine = (text: string, key?: string | number) => renderSecondaryText(text, false, key)

  const renderValueLine = (text: string, key?: string | number) => {
    if (!text) return null
    const compact = text.replace(/\s*\/\s*/g, '/')
    const hasVariant = compact !== text
    return (
      <div
        key={key ? `${text}-${key}` : undefined}
        className="font-inter text-[13px] md:text-[14px] text-[rgba(255,255,255,0.9)] leading-[1.3]"
      >
        {hasVariant ? (
          <>
            <span className="md:hidden">{compact}</span>
            <span className="hidden md:inline">{text}</span>
          </>
        ) : (
          text
        )}
      </div>
    )
  }

  return price.split('\n').map((line, idx) => {
    const trimmed = line.trim()
    if (!trimmed) return null
    const lower = trimmed.toLowerCase()
    const isHourly =
      lower.includes('/ godzinę') || lower.includes('/ godzine')
    const plusIndex = trimmed.indexOf('+')
    const hasInlinePlusSuffix = plusIndex > 0
    const isStandalonePlusSuffix = plusIndex === 0
    const isStandaloneNumericPlus = isStandalonePlusSuffix && /^\+\s*\d/.test(trimmed)
    const isSupplement = lower.includes('stawka z cennika')
    const isPerMeasureSuffix = lower.startsWith('za ')
    const isDoCenySuffix = lower === 'do ceny' || lower.startsWith('do ceny ')
    const isSlashSuffix = trimmed.startsWith('/')
    if (isHourly) {
      const [val, suffix] = trimmed.split('/').map(part => part.trim())
      const suffixText = suffix ? `/ ${suffix}` : ''
      return (
        <div key={`${trimmed}-${idx}`}>
          {val && renderValueLine(val, `${trimmed}-${idx}-value`)}
          {suffixText && renderSuffixLine(suffixText)}
        </div>
      )
    }
    if (hasInlinePlusSuffix) {
      const value = trimmed.slice(0, plusIndex).trim()
      const suffixText = trimmed.slice(plusIndex).trim()
      return (
        <div key={`${trimmed}-${idx}`}>
          {value && renderValueLine(value, `${trimmed}-${idx}-value`)}
          {suffixText && renderSuffixLine(suffixText)}
        </div>
      )
    }
    if (isStandaloneNumericPlus) {
      return renderValueLine(trimmed, `${trimmed}-${idx}`)
    }

    if (isStandalonePlusSuffix || isSupplement || isPerMeasureSuffix || isDoCenySuffix || isSlashSuffix) {
      return renderSuffixLine(trimmed, idx)
    }
    return renderValueLine(trimmed, `${trimmed}-${idx}`)
  })
}

export const renderDurationValue = (value: string) => (
  <div className="font-inter text-[13px] md:text-[14px] text-[rgba(255,255,255,0.9)] leading-[1.3]">
    {value}
  </div>
)

// Функция для рендеринга текста в скобках - использует тот же стиль, что и "do ceny"
// Явно переопределяем все визуальные параметры, чтобы избежать наследования от родительских элементов
const renderParenthesesText = (text: string, fontSize: '12px' | '14px' = '14px') => {
  if (!text) return null

  // Jeśli tekst zawiera переносы строк, разбиваем и рендерим каждую строку отдельно
  if (text.includes('\n')) {
    const lines = text.split('\n').filter(line => line.trim())
    return (
      <div className="text-[14px] text-[#cbb27c] leading-relaxed mt-1">
        {lines.map((line, idx) => {
          const trimmed = line.trim()
          const lower = trimmed.toLowerCase()

          // Special handling for "zakres usługi obejmuje:", "zakres paketu obejmuje:", "zakres PODSTAWOWY +", "zakres STANDARD +", "zakres START +", "zakres BIZNES +" - white text, no parens
          if (lower.startsWith('zakres usługi obejmuje:') || lower.startsWith('zakres paketu obejmuje:') || lower.startsWith('zakres podstawowy +') || lower.startsWith('zakres standard +') || lower.startsWith('zakres start +') || lower.startsWith('zakres biznes +')) {
            return (
              <div key={idx} className="text-[14px] text-white leading-relaxed mt-1 first:mt-0">
                {trimmed}
              </div>
            )
          }

          // Special handling for "Uwaga!!!" - white text, no parens
          if (trimmed.startsWith('Uwaga!!!')) {
            return (
              <div key={idx} className="text-[14px] text-white leading-relaxed mt-1 first:mt-0">
                {trimmed}
              </div>
            )
          }

          // Special handling for bullet points - no parens, tighter spacing
          if (trimmed.startsWith('•')) {
            return (
              <div key={idx} className="text-[14px] text-[#cbb27c] leading-[1.35] mt-[1px] pl-1">
                {trimmed}
              </div>
            )
          }

          return (
            <div key={idx} className="text-[14px] text-[#cbb27c] leading-relaxed mt-0.5 first:mt-0">
              ({trimmed})
            </div>
          )
        })}
      </div>
    )
  }

  const trimmed = text.trim()
  const lower = trimmed.toLowerCase()

  if (lower.startsWith('zakres usługi obejmuje:') || lower.startsWith('zakres paketu obejmuje:') || lower.startsWith('zakres podstawowy +') || lower.startsWith('zakres standard +') || lower.startsWith('zakres start +') || lower.startsWith('zakres biznes +')) {
    return (
      <div className="text-[14px] text-white leading-relaxed">
        {trimmed}
      </div>
    )
  }

  // Special handling for "Uwaga!!!" - white text, no parens
  if (trimmed.startsWith('Uwaga!!!')) {
    return (
      <div className="text-[14px] text-white leading-relaxed">
        {trimmed}
      </div>
    )
  }

  if (trimmed.startsWith('•')) {
    return (
      <div className="text-[14px] text-[#cbb27c] leading-relaxed pl-1">
        {trimmed}
      </div>
    )
  }

  return (
    <div className="text-[14px] text-[#cbb27c] leading-relaxed">
      ({trimmed})
    </div>
  )
}

// Функция для рендеринга заголовка секции с возможностью переноса части в скобках
const renderSectionTitleMobile = (title: string) => {
  const match = title.match(/^(.+?)\s*\((.+?)\)$/)
  if (match) {
    const mainPart = match[1].trim()
    const bracketPart = match[2].trim()
    return (
      <>
        <div>{mainPart}</div>
        <div>({bracketPart})</div>
      </>
    )
  }
  return <>{title}</>
}

// Мобильная версия строки услуги (flex layout)
const renderMobileServiceRow = (
  item: { service: string; price: string; duration: string; link?: string },
  idx: number,
  isFirst: boolean,
  isLast: boolean,
  shouldHighlightPrices: boolean,
  parseServiceText: (text: string) => { main: string; parentheses: string | null },
) => {
  const parsed = parseServiceText(item.service)
  return (
    <div
      key={`mobile-${idx}`}
      className={`flex items-start w-full gap-0.5 border-white/20 border-b border-white/30 ${isFirst ? 'border-t border-white/30' : ''
        } ${isLast ? '' : ''} py-1`}
    >
      {/* Левая колонка - описание */}
      <div className="flex-1 min-w-0 pl-0.5">
        <div className="font-table-main text-[rgba(255,255,245,0.85)] text-[15px] text-white leading-[1.3] tracking-tight">
          {parsed.main}
        </div>
        {parsed.parentheses && renderParenthesesText(parsed.parentheses, '14px')}
      </div>
      {/* Правая колонка - цена */}
      <div
        className={cn(
          'flex-shrink-0 min-w-[80px] max-w-[90px] text-center leading-[1.3] pr-2',
          shouldHighlightPrices
            ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.65)] brightness-110'
            : ''
        )}
      >
        {renderPriceLines(item.price, item.link)}
      </div>
    </div>
  )
}

type ScrollRefs = Record<string, HTMLDivElement | null>

const SECTION_SCROLL_OFFSET = 120

// Компонент для таблицы wynajem с динамическим выравниванием
const WynajemTable = ({
  subcategoryId,
  headerRefs,
  serviceSlug
}: {
  subcategoryId: string
  headerRefs: {
    icon: React.RefObject<HTMLDivElement | null>
    text: React.RefObject<HTMLDivElement | null>
    prices: React.RefObject<HTMLDivElement | null>[]
  }
  serviceSlug?: string
}) => {
  const isDrukarkaZastepcza = serviceSlug === 'drukarka-zastepcza'
  // Для a3-drukarki-mono на странице "Drukarka Zastępcza" используем ту же структуру, что и для a3-drukarki-kolor
  // На странице "Wynajem" используем subcategoryId напрямую для правильных данных tableDataA3Mono
  const effectiveSubcategoryId = (subcategoryId === 'a3-drukarki-mono' && isDrukarkaZastepcza) ? 'a3-drukarki-kolor' : subcategoryId
  const [columnWidths, setColumnWidths] = useState<{ icon: number; text: number; price1: number; price2: number; price3?: number } | null>(null)
  const [a3ReferenceWidths, setA3ReferenceWidths] = useState<{ icon: number; text: number; price1: number; price2: number } | null>(null)
  // Сохранение измерений верхнего блока для точного выравнивания нижнего блока
  const [headerMeasurements, setHeaderMeasurements] = useState<{
    iconWidth: number;
    distanceIconToText: number;
    textWidth: number;
    distanceTextToPrice1: number;
    leftPartWidth: number;
  } | null>(null)

  // Фиксированный отступ слева для выравнивания нижней таблицы под верхним рядом
  // Примерно равен расстоянию от левого края контейнера до начала иконки (12px)
  // Скорректировано визуально для идеального совпадения
  const leftOffset = 12

  useEffect(() => {
    const validSubcategoryIds = ['drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor', 'a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor']
    if (!validSubcategoryIds.includes(effectiveSubcategoryId) || !headerRefs.prices[0]?.current) return

    const measureColumns = () => {
      const iconEl = headerRefs.icon.current
      const textEl = headerRefs.text.current
      const price1El = headerRefs.prices[0]?.current
      const price2El = headerRefs.prices[1]?.current
      const price3El = !isDrukarkaZastepcza ? headerRefs.prices[2]?.current : null

      if (iconEl && textEl && price1El && price2El) {
        const iconRect = iconEl.getBoundingClientRect()
        const textRect = textEl.getBoundingClientRect()
        const price1Rect = price1El.getBoundingClientRect()
        const price2Rect = price2El.getBoundingClientRect()

        const baseWidths = {
          icon: iconRect.width,
          text: textRect.width,
          price1: price1Rect.width,
          price2: price2Rect.width,
        }

        if (isDrukarkaZastepcza) {
          setColumnWidths(baseWidths)
          // Для всех A3 подкатегорий используем одинаковую логику выравнивания
          const a3SubcategoryIds = ['a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor']
          if (a3SubcategoryIds.includes(subcategoryId)) {
            // Приоритет: если это a3-drukarki-kolor (или a3-drukarki-mono на странице Drukarka Zastępcza, который обрабатывается как kolor), всегда обновляем эталон
            // Для MFU A3 подкатегорий: всегда используем a3-mfu-mono как эталон для синхронизации ширины между mono и mono+kolor
            const isMfuMono = subcategoryId === 'a3-mfu-mono'
            const isMfuKolor = subcategoryId === 'a3-mfu-kolor'
            if (effectiveSubcategoryId === 'a3-drukarki-kolor' || isMfuMono || (!a3ReferenceWidths && !isMfuKolor)) {
              setA3ReferenceWidths(baseWidths)
            }
            // Для a3-mfu-kolor не устанавливаем a3ReferenceWidths - используем значение от a3-mfu-mono для полной синхронизации
          }
        } else if (price3El) {
          const price3Rect = price3El.getBoundingClientRect()
          setColumnWidths({
            ...baseWidths,
            price3: price3Rect.width,
          })
        }
      }
    }

    // Задержка для обеспечения рендеринга элементов
    const timeoutId1 = setTimeout(measureColumns, 50)
    const timeoutId2 = setTimeout(measureColumns, 200)
    const timeoutId3 = setTimeout(measureColumns, 500)

    // Измерение структуры заголовка для всех A3/A4 подкатегорий на Drukarka Zastępcza
    const measureHeader = () => {
      const iconEl = headerRefs.icon.current
      const textEl = headerRefs.text.current
      const price1El = headerRefs.prices[0]?.current

      if (iconEl && textEl && price1El) {
        const iconRect = iconEl.getBoundingClientRect()
        const textRect = textEl.getBoundingClientRect()
        const price1Rect = price1El.getBoundingClientRect()

        const distanceIconToText = textRect.left - iconRect.right
        const distanceTextToPrice1 = price1Rect.left - textRect.right
        const leftPartWidth = textRect.right - iconRect.left

        // Сохраняем измерения для использования в нижнем блоке
        setHeaderMeasurements({
          iconWidth: iconRect.width,
          distanceIconToText: distanceIconToText,
          textWidth: textRect.width,
          distanceTextToPrice1: distanceTextToPrice1,
          leftPartWidth: leftPartWidth
        })
      }
    }

    // Измеряем заголовок для всех A3/A4 подкатегорий на Drukarka Zastępcza
    const a3A4SubcategoryIds = ['a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor', 'drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor']
    if (isDrukarkaZastepcza && a3A4SubcategoryIds.includes(subcategoryId)) {
      setTimeout(measureHeader, 600)
      setTimeout(measureHeader, 1000)
    }

    const handleResize = () => {
      measureColumns()
      if (isDrukarkaZastepcza && a3A4SubcategoryIds.includes(subcategoryId)) {
        measureHeader()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId2)
      clearTimeout(timeoutId3)
    }
  }, [subcategoryId, headerRefs, isDrukarkaZastepcza, effectiveSubcategoryId, a3ReferenceWidths])

  const validSubcategoryIds = ['drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor', 'a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor']
  if (!validSubcategoryIds.includes(subcategoryId)) return null


  // Данные для таблицы Drukarki mono
  const tableDataMono = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '500 str./mies.', plan2: '1 000 str./mies.', plan3: '2 500 str./mies.' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,05 zł', plan2: '0,05 zł', plan3: '0,04 zł' },
    { label: 'Duplex', plan1: '-', plan2: '- / +', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '20', plan2: '40', plan3: '60' },
  ]

  // Данные для таблицы Drukarki mono (drukarka-zastepcza) - без строки "Cena wydruku A4 mono" и "Liczba stron A4"
  const tableDataMonoDZ = [
    { label: 'Duplex', plan1: '-' },
    { label: 'Prędkość druku do: (str./min)', plan1: '40' },
  ]

  // Данные для таблицы Drukarki kolor
  const tableDataKolor = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '1 000 + 0', plan2: '1 000 + 200', plan3: '2 000 + 200' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,05 zł', plan2: '0,05 zł', plan3: '0,04 zł' },
    { label: 'Cena wydruku A4 kolor (powyżej limitu)', plan1: '0,25 zł', plan2: '0,20 zł', plan3: '0,20 zł' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '20', plan2: '40', plan3: '60' },
  ]

  // Данные для таблицы Drukarki kolor (drukarka-zastepcza) - только один столбец (plan1) и без некоторых строк
  const tableDataKolorDZ = [
    { label: 'Duplex', plan1: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '40' },
  ]

  // Данные для таблицы MFU mono
  const tableDataMfuMono = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '1 500 str./mies.', plan2: '2 000 str./mies.', plan3: '3 000 str./mies.' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,05 zł', plan2: '0,05 zł', plan3: '0,04 zł' },
    { label: 'Skanowanie', plan1: 'gratis', plan2: 'gratis', plan3: 'gratis' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '20', plan2: '40', plan3: '60' },
  ]

  // Данные для таблицы MFU kolor
  const tableDataMfuKolor = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '1 000 + 100', plan2: '1 500 + 200', plan3: '2 000 + 300' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,05 zł', plan2: '0,05 zł', plan3: '0,04 zł' },
    { label: 'Cena wydruku A4 kolor (powyżej limitu)', plan1: '0,25 zł', plan2: '0,20 zł', plan3: '0,20 zł' },
    { label: 'Skanowanie', plan1: 'gratis', plan2: 'gratis', plan3: 'gratis' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '20', plan2: '30', plan3: '40' },
  ]

  // Данные для таблицы MFU mono (drukarka-zastepcza) - только один столбец и без некоторых строк
  const tableDataMfuMonoDZ = [
    { label: 'Skanowanie', plan1: 'gratis' },
    { label: 'Duplex', plan1: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '40' },
  ]

  // Данные для таблицы MFU kolor (drukarka-zastepcza) - только один столбец и без некоторых строк
  const tableDataMfuKolorDZ = [
    { label: 'Skanowanie', plan1: 'gratis' },
    { label: 'Duplex', plan1: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '40' },
  ]

  // Данные для таблицы Drukarki A3/A4 mono
  const tableDataA3Mono = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '2 500 str./mies.', plan2: '3 750 str./mies.', plan3: '5 000 str./mies.' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,04 zł', plan2: '0,04 zł', plan3: '0,03 zł' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50', plan2: '60', plan3: '90' },
  ]

  // Данные для таблицы Drukarki A3/A4 mono (drukarka-zastepcza) - только технические строки, один столбец
  const tableDataA3MonoDZ = [
    { label: 'Duplex', plan1: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50' },
  ]

  // Данные для таблицы Drukarki A3/A4 kolor
  const tableDataA3Kolor = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '2 000 + 300', plan2: '3 000 + 500', plan3: '5 000 + 800' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,04 zł', plan2: '0,04 zł', plan3: '0,03 zł' },
    { label: 'Cena wydruku A4 kolor (powyżej limitu)', plan1: '0,25 zł', plan2: '0,20 zł', plan3: '0,18 zł' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50', plan2: '60', plan3: '90' },
  ]

  // Данные для таблицы Drukarki A3/A4 kolor (drukarka-zastepcza) - только технические строки, один столбец
  const tableDataA3KolorDZ = [
    { label: 'Duplex', plan1: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50' },
  ]

  // Данные для таблицы MFU A3/A4 mono
  const tableDataA3MfuMono = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '5 000 str./mies.', plan2: '7 000 str./mies.', plan3: '10 000 str./mies.' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,04 zł', plan2: '0,04 zł', plan3: '0,03 zł' },
    { label: 'Skanowanie', plan1: 'gratis', plan2: 'gratis', plan3: 'gratis' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50', plan2: '60', plan3: '90' },
  ]

  // Данные для таблицы MFU A3/A4 mono (drukarka-zastepcza) - только технические строки, без заголовка "Cena wydruku format A3", один столбец
  const tableDataA3MfuMonoDZ = [
    { label: 'Skanowanie', plan1: 'gratis' },
    { label: 'Duplex', plan1: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50' },
  ]

  // Данные для таблицы MFU A3/A4 kolor
  const tableDataA3MfuKolor = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '5 000 + 500', plan2: '7 500 + 750', plan3: '10 000 + 1 000' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,04 zł', plan2: '0,04 zł', plan3: '0,03 zł' },
    { label: 'Cena wydruku A4 kolor (powyżej limitu)', plan1: '0,16 zł', plan2: '0,16 zł', plan3: '0,15 zł' },
    { label: 'Skanowanie', plan1: 'gratis', plan2: 'gratis', plan3: 'gratis' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50', plan2: '60', plan3: '90' },
  ]

  // Данные для таблицы MFU A3/A4 kolor (drukarka-zastepcza) - только технические строки, без заголовка "Cena wydruku format A3"
  // Только один столбец с данными (plan1) - второй столбец удален
  const tableDataA3MfuKolorDZ = [
    { label: 'Skanowanie', plan1: 'gratis' },
    { label: 'Duplex', plan1: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50' },
  ]

  let tableData =
    subcategoryId === 'drukarki-mono' ? (isDrukarkaZastepcza ? tableDataMonoDZ : tableDataMono) :
      // Для a3-drukarki-mono на странице "Drukarka Zastępcza" используем те же данные, что и для a3-drukarki-kolor, чтобы структура была идентичной
      subcategoryId === 'a3-drukarki-mono' ? (isDrukarkaZastepcza ? tableDataA3KolorDZ : tableDataA3Mono) :
        subcategoryId === 'drukarki-kolor' ? (isDrukarkaZastepcza ? tableDataKolorDZ : tableDataKolor) :
          subcategoryId === 'a3-drukarki-kolor' ? (isDrukarkaZastepcza ? tableDataA3KolorDZ : tableDataA3Kolor) :
            subcategoryId === 'mfu-mono' ? (isDrukarkaZastepcza ? tableDataMfuMonoDZ : tableDataMfuMono) :
              subcategoryId === 'a3-mfu-mono' ? (isDrukarkaZastepcza ? tableDataA3MfuMonoDZ : tableDataA3MfuMono) :
                subcategoryId === 'mfu-kolor' ? (isDrukarkaZastepcza ? tableDataMfuKolorDZ : tableDataMfuKolor) :
                  subcategoryId === 'a3-mfu-kolor' ? (isDrukarkaZastepcza ? tableDataA3MfuKolorDZ : tableDataA3MfuKolor) :
                    []

  // Для drukarka-zastepcza убираем plan3 из данных, строки "Liczba stron A4 wliczonych w czynsz", "Cena wydruku A4 mono (powyżej limitu)" и "Cena wydruku A4 kolor (powyżej limitu)" (кроме drukarki-mono, drukarki-kolor и всех A3 подкатегорий, где уже используются специальные таблицы)
  const a3SubcategoryIds = ['a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor']
  if (isDrukarkaZastepcza && tableData.length > 0 && subcategoryId !== 'drukarki-mono' && subcategoryId !== 'drukarki-kolor' && !a3SubcategoryIds.includes(subcategoryId)) {
    tableData = tableData
      .filter(row =>
        row.label !== 'Liczba stron A4 wliczonych w czynsz' &&
        row.label !== 'Cena wydruku A4 mono (powyżej limitu)' &&
        row.label !== 'Cena wydruku A4 kolor (powyżej limitu)'
      )
      .map(row => {
        const { plan3, ...rest } = row as { label: string; plan1: string; plan2: string; plan3: string }
        return rest
      })
  }

  // Функция для рендеринга label с переносами строк (для мобильной и десктопной версий)
  const renderLabel = (label: string, fontSize: string) => {
    // "Liczba stron A4 wliczonych w czynsz" → "Liczba stron A4" / "wliczonych w czynsz"
    if (label === 'Liczba stron A4 wliczonych w czynsz') {
      return (
        <>
          Liczba stron A4<br />
          wliczonych w czynsz
        </>
      )
    }
    // "Cena wydruku A4 mono (powyżej limitu)" → "Cena wydruku A4 mono" / "(powyżej limitu)"
    else if (label === 'Cena wydruku A4 mono (powyżej limitu)') {
      return (
        <>
          Cena wydruku A4 mono<br />
          (powyżej limitu)
        </>
      )
    }
    // "Cena wydruku A4 kolor (powyżej limitu)" → "Cena wydruku A4 kolor" / "(powyżej limitu)"
    else if (label === 'Cena wydruku A4 kolor (powyżej limitu)') {
      return (
        <>
          Cena wydruku A4 kolor<br />
          (powyżej limitu)
        </>
      )
    }
    // Для остальных текстов - без изменений
    return label
  }

  // Функция для рендеринга значения с суффиксом "/mies.", "/min" или "zł"
  const renderValueWithSuffix = (value: string | undefined, fontSize: string = 'text-[16px]', columnIndex: number = 0, rowLabel?: string) => {
    if (!value) return null
    const isLimitRow = rowLabel === 'Liczba stron A4 wliczonych w czynsz'
    // Для сложных значений типа "1 000 + 0" (без "str.") - разделяем на две строки
    if (value.includes(' + ') && !value.includes(' str.')) {
      const parts = value.split(' + ')
      const firstPart = parts[0].trim() // "1 000"
      const secondPart = parts[1].trim() // "0"

      // Если это строка с лимитом, добавляем подписи "mono" и "kolor"
      if (isLimitRow) {
        return (
          <div className="flex flex-col items-center">
            {/* Десктоп: числа и подписи на одной строке */}
            <div className="hidden md:flex flex-col items-center">
              {/* Первая строка: "1 000 mono" */}
              <div className="flex items-baseline">
                <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{firstPart}</span>
                <span
                  className="text-[14px] text-[#cbb27c] leading-relaxed ml-1"
                >
                  mono
                </span>
              </div>
              {/* Вторая строка: "+ 0 kolor" */}
              <div className="flex items-baseline">
                <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>+</span>
                <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)] ml-1`}>{secondPart}</span>
                <span
                  className="text-[14px] text-[#cbb27c] leading-relaxed ml-1"
                >
                  kolor
                </span>
              </div>
            </div>
            {/* Мобильная версия: каждое число и подпись на отдельной строке */}
            <div className="md:hidden flex flex-col items-center">
              {/* "1 000" */}
              <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{firstPart}</span>
              {/* "mono" */}
              <span
                className="text-[14px] text-[#cbb27c] leading-relaxed"
              >
                mono
              </span>
              {/* "+ 0" */}
              <div className="flex items-baseline">
                <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>+</span>
                <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)] ml-1`}>{secondPart}</span>
              </div>
              {/* "kolor" */}
              <span
                className="text-[14px] text-[#cbb27c] leading-relaxed"
              >
                kolor
              </span>
            </div>
          </div>
        )
      }

      // Обычная обработка (без подписей mono/kolor)
      return (
        <div className="flex flex-col items-center">
          {/* Первая строка: "1 000" */}
          <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{firstPart}</span>
          {/* Вторая строка: "+ 0" */}
          <div className="flex items-baseline">
            <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>+</span>
            <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)] ml-1`}>{secondPart}</span>
          </div>
        </div>
      )
    }

    // Для сложных значений типа "1 000 str. + 0 str." - разделяем на две строки
    if (value.includes(' + ') && value.includes(' str.')) {
      const parts = value.split(' + ')
      const firstPart = parts[0].trim() // "1 000 str."
      const secondPart = parts[1].trim() // "0 str."

      const renderStrPart = (strPart: string) => {
        const strMatch = strPart.match(/^(.+?)\s*str\.$/)
        if (strMatch) {
          const number = strMatch[1].trim()
          return (
            <div className="flex items-baseline">
              <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{number}</span>
              <span
                className="text-[14px] text-[#cbb27c] leading-relaxed ml-1"
              >
                str.
              </span>
            </div>
          )
        }
        return <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{strPart}</span>
      }

      // Парсим вторую часть отдельно
      const secondMatch = secondPart.match(/^(.+?)\s*str\.$/)
      const secondNumber = secondMatch ? secondMatch[1].trim() : secondPart

      return (
        <div className="flex flex-col items-center">
          {/* Первая строка: "1 000 str." */}
          {renderStrPart(firstPart)}
          {/* Вторая строка: "+ 0 str." */}
          <div className="flex items-baseline">
            <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>+</span>
            <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)] ml-1`}>{secondNumber}</span>
            <span
              className="text-[14px] text-[#cbb27c] leading-relaxed ml-1"
            >
              str.
            </span>
          </div>
        </div>
      )
    }

    // Для "500 str./mies." - разделить на две строки: число сверху, "str./mies." снизу
    if (value.includes('str./mies.')) {
      const parts = value.split('str./mies.')
      const number = parts[0].trim()
      return (
        <div className="flex flex-col items-center">
          <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{number}</span>
          <span
            className="text-[14px] text-[#cbb27c] leading-relaxed"
          >
            str./mies.
          </span>
        </div>
      )
    }
    // Для "20 str./min" - не переносим, но "str./min" оформляем в том же стиле
    if (value.includes('str./min')) {
      const number = value.replace(/\s*str\.\/min.*$/, '').trim()
      return (
        <span className="inline-flex items-baseline">
          <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{number}</span>
          <span
            className="text-[14px] text-[#cbb27c] leading-relaxed ml-1"
          >
            str./min
          </span>
        </span>
      )
    }
    // Для "0,05 zł" - "zł" оформляем в том же стиле
    // Используем вариант A для всех колонок, с поднятием "zł" выше
    if (value.includes('zł')) {
      const number = value.replace(/\s*zł.*$/, '').trim()
      return (
        <span className="inline-flex items-start">
          <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{number}</span>
          <span
            className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5"
            style={{ marginTop: '-3px' }}
          >
            zł
          </span>
        </span>
      )
    }
    // Для остальных значений
    // Для "gratis" и "+" на странице Drukarka Zastępcza используем стиль как у "(mono A4)"
    if (isDrukarkaZastepcza && (value === 'gratis' || value === '+' || value === '-')) {
      return (
        <span
          className="text-[14px] text-[#cbb27c] leading-relaxed"
        >
          {value}
        </span>
      )
    }
    return <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{value}</span>
  }

  return (
    <div
      className={cn(
        "rounded-lg outline outline-1 outline-[#bfa76a]/10 md:outline-none md:border md:border-[#bfa76a]/10 overflow-hidden"
      )}
    >
      <div
        className="overflow-x-auto md:overflow-x-visible -mx-4 md:mx-0 px-4 md:px-0"
        ref={(el) => {
          // ВРЕМЕННО: измерение ширины родительского контейнера overflow-x-auto
          if (el && (subcategoryId === 'a3-mfu-mono' || subcategoryId === 'a3-mfu-kolor') && isDrukarkaZastepcza) {
            setTimeout(() => {
              const overflowRect = el.getBoundingClientRect()
              console.log(`[WIDTH MEASURE] ${subcategoryId} - родительский контейнер overflow-x-auto:`, {
                width: overflowRect.width
              })
            }, 150)
          }
        }}
      >
        {/* Десктоп: flex с динамическими размерами из верхнего ряда */}
        <div
          className="hidden md:block"
          style={{ marginLeft: `${leftOffset}px`, width: `calc(100% - ${leftOffset}px)` }}
          ref={(el) => {
            // ВРЕМЕННО: измерение ширины родительского контейнера md:block
            if (el && (subcategoryId === 'a3-mfu-mono' || subcategoryId === 'a3-mfu-kolor') && isDrukarkaZastepcza) {
              setTimeout(() => {
                const mdBlockRect = el.getBoundingClientRect()
                console.log(`[WIDTH MEASURE] ${subcategoryId} - родительский контейнер md:block:`, {
                  width: mdBlockRect.width,
                  marginLeft: leftOffset,
                  calculatedWidth: `calc(100% - ${leftOffset}px)`
                })
              }, 120)
            }
          }}
        >
          {tableData.map((row, idx) => {
            if (!row || !(row as { label?: string }).label) return null
            const typedRow = row as { label: string; plan1?: string; plan2?: string; plan3?: string }
            const isSmallFontRow = typedRow.label.includes('Skanowanie') || typedRow.label.includes('Duplex') || typedRow.label.includes('Prędkość druku')
            const labelFontSize = isSmallFontRow ? 'text-[13px]' : 'text-[16px]'
            const valueFontSize = isSmallFontRow ? 'text-[13px]' : (idx === 3 ? 'text-[14px]' : 'text-[16px]')
            const lineHeight = isSmallFontRow ? 'leading-[1.2]' : 'leading-[1.4]'

            return (
              <div
                key={idx}
                data-subcategory={subcategoryId}
                className={cn(
                  `flex w-full items-center border-[#8b7a5a] ${idx === 0 ? 'border-t-2' : ''} border-b-2`
                )}
              >
                {/* Пустая колонка для иконки */}
                <div
                  style={(() => {
                    // Единый шаблон для всех A3/A4 подкатегорий на Drukarka Zastępcza
                    const isA3A4OnDZ = isDrukarkaZastepcza && ['a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor', 'drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor'].includes(subcategoryId)
                    if (isA3A4OnDZ) {
                      // Используем headerMeasurements если доступны (для точного выравнивания), иначе a3ReferenceWidths или columnWidths
                      if (headerMeasurements) {
                        return {
                          width: `${headerMeasurements.iconWidth}px`,
                          marginRight: `${headerMeasurements.distanceIconToText}px`
                        }
                      }
                      if (a3ReferenceWidths) {
                        return { width: `${a3ReferenceWidths.icon}px`, marginRight: '8px' }
                      }
                      return columnWidths ? { width: `${columnWidths.icon}px`, marginRight: '8px' } : { width: '40px', marginRight: '8px' }
                    }
                    return columnWidths ? { width: `${columnWidths.icon}px`, marginRight: '8px' } : { width: '40px', marginRight: '8px' }
                  })()}
                ></div>
                {/* Колонка с описанием */}
                <div
                  className={cn(
                    `px-2 flex items-center font-table-main ${labelFontSize} ${lineHeight} text-[rgba(255,255,245,0.85)]`,
                    isDrukarkaZastepcza
                      ? (isSmallFontRow ? 'py-0' : 'py-[3px]')
                      : (isSmallFontRow ? 'py-0.5' : 'py-1')
                  )}
                  style={(() => {
                    // Единый шаблон для всех A3/A4 подкатегорий на Drukarka Zastępcza
                    const isA3A4OnDZ = isDrukarkaZastepcza && ['a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor', 'drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor'].includes(subcategoryId)
                    if (isA3A4OnDZ) {
                      // Используем headerMeasurements если доступны, иначе a3ReferenceWidths или columnWidths
                      if (headerMeasurements) {
                        return { width: `${headerMeasurements.textWidth}px` }
                      }
                      if (a3ReferenceWidths) {
                        return { width: `${a3ReferenceWidths.text}px` }
                      }
                      return columnWidths ? { width: `${columnWidths.text}px` } : undefined
                    }
                    return columnWidths ? { width: `${columnWidths.text}px` } : undefined
                  })()}
                >
                  {renderLabel(typedRow.label, labelFontSize)}
                </div>
                {/* Колонка с данными - единый шаблон для всех A3/A4 подкатегорий на Drukarka Zastępcza */}
                {typedRow.plan1 && (
                  <div
                    className={cn(
                      "px-2 flex items-center justify-center text-center leading-[1.4] border-l-2 border-[#8b7a5a]",
                      isDrukarkaZastepcza
                        ? "py-[3px]"
                        : "py-1"
                    )}
                    style={(() => {
                      // Единый шаблон для всех A3/A4 подкатегорий на Drukarka Zastępcza
                      const isA3A4OnDZ = isDrukarkaZastepcza && ['a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor', 'drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor'].includes(subcategoryId)
                      if (isA3A4OnDZ) {
                        // Используем headerMeasurements если доступны для точного выравнивания
                        if (headerMeasurements) {
                          return {
                            width: '22.5%',
                            marginLeft: `${headerMeasurements.distanceTextToPrice1}px`
                          }
                        }
                        return { width: '22.5%', marginLeft: '8px' }
                      }
                      return columnWidths ? { width: `${columnWidths.price1}px`, marginLeft: '8px' } : undefined
                    })()}
                  >
                    {renderValueWithSuffix(typedRow.plan1, valueFontSize, idx === 1 ? 0 : 0, typedRow.label)}
                  </div>
                )}
                {/* Второй столбец удален для всех A3/A4 подкатегорий на Drukarka Zastępcza */}
                {typedRow.plan2 && !(isDrukarkaZastepcza && ['a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor', 'drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor'].includes(subcategoryId)) && (
                  <div
                    className={cn(
                      "px-2 flex items-center justify-center text-center leading-[1.4] border-l-2 border-[#8b7a5a]",
                      isDrukarkaZastepcza
                        ? "py-[3px]"
                        : "py-1"
                    )}
                    style={columnWidths ? { width: `${columnWidths.price2}px` } : undefined}
                  >
                    {renderValueWithSuffix(typedRow.plan2, valueFontSize, idx === 1 ? 1 : 0, typedRow.label)}
                  </div>
                )}
                {!isDrukarkaZastepcza && typedRow.plan3 && (
                  <div
                    className="px-2 py-1 flex items-center justify-center text-center leading-[1.4] border-l-2 border-[#8b7a5a]"
                    style={columnWidths ? { width: `${columnWidths.price3}px` } : undefined}
                  >
                    {renderValueWithSuffix(typedRow.plan3, valueFontSize, idx === 1 ? 2 : 0, typedRow.label)}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {/* Мобильная версия: обычная таблица */}
        <div className="md:hidden">
          <div className="overflow-x-auto scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
            <Table className="border-separate" style={{ minWidth: '100%', width: '100%', borderSpacing: '2px 0', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: isDrukarkaZastepcza ? '55%' : '48%', minWidth: '120px' }} />
                <col style={{ width: isDrukarkaZastepcza ? '22.5%' : '17.33%', minWidth: '45px' }} />
                <col style={{ width: isDrukarkaZastepcza ? '22.5%' : '17.33%', minWidth: '45px' }} />
                {!isDrukarkaZastepcza && <col style={{ width: '17.33%', minWidth: '45px' }} />}
              </colgroup>
              <TableHeader>
                <TableRow className="border-[#8b7a5a] border-b-2 border-t-2">
                  <TableHead
                    className="px-2 pr-3 align-middle text-left"
                    style={{ width: isDrukarkaZastepcza ? '55%' : '48%', minWidth: '120px', maxWidth: isDrukarkaZastepcza ? '55%' : '48%', boxSizing: 'border-box', whiteSpace: 'normal' }}
                  ></TableHead>
                  <TableHead
                    colSpan={isDrukarkaZastepcza ? 1 : 3}
                    className="pl-2 pr-2 align-middle text-center border-l-2 border-[#8b7a5a]"
                    style={{ width: isDrukarkaZastepcza ? '45%' : '52%', maxWidth: isDrukarkaZastepcza ? '45%' : '52%', boxSizing: 'border-box', overflow: 'hidden' }}
                  >
                    {/* Надпись "Czynsz wynajmu [zł/mies.]" убрана из таблицы - теперь она в шапке секции */}
                    <div className="hidden md:block text-lg font-cormorant font-semibold text-[#ffffff] leading-tight">
                      Czynsz wynajmu [zł/mies.]
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, idx) => {
                  if (!row || !(row as { label?: string }).label) return null
                  const typedRow = row as { label: string; plan1?: string; plan2?: string; plan3?: string }
                  const isSmallFontRow = typedRow.label.includes('Skanowanie') || typedRow.label.includes('Duplex') || typedRow.label.includes('Prędkość druku')
                  const labelFontSize = isSmallFontRow ? 'text-[13px]' : 'text-[16px]'
                  const valueFontSize = isSmallFontRow ? 'text-[13px]' : (idx === 3 ? 'text-[13px]' : 'text-[15px]')
                  const lineHeight = isSmallFontRow ? 'leading-[1.2]' : 'leading-[1.4]'
                  const isLastRow = idx === tableData.length - 1
                  const borderBottomStyle = isLastRow ? 'none' : 'solid'
                  const borderBottomColor = isLastRow ? 'transparent' : 'rgba(139, 122, 90, 0.75)'

                  return (
                    <TableRow
                      key={idx}
                      style={{
                        borderBottomColor,
                        borderBottomWidth: '1.5px',
                        borderBottomStyle
                      }}
                    >
                      <TableCell
                        className={cn(
                          `px-2 pr-3 align-middle text-left font-table-main ${labelFontSize} ${lineHeight} text-[rgba(255,255,245,0.85)] break-words`,
                          isDrukarkaZastepcza
                            ? (isSmallFontRow ? 'py-[3px]' : 'py-2')
                            : (isSmallFontRow ? 'py-1' : 'py-2.5')
                        )}
                        style={{
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          width: isDrukarkaZastepcza ? '55%' : '48%',
                          minWidth: '120px',
                          maxWidth: isDrukarkaZastepcza ? '55%' : '48%',
                          boxSizing: 'border-box',
                          whiteSpace: 'normal',
                          borderBottom: isLastRow ? 'none' : '1.5px solid rgba(139, 122, 90, 0.75)'
                        }}
                      >
                        {renderLabel(typedRow.label, labelFontSize)}
                      </TableCell>
                      {typedRow.plan1 && (
                        <TableCell
                          className={cn(
                            "pl-2 pr-1 align-middle text-center border-l-2 border-[#8b7a5a]",
                            lineHeight,
                            isDrukarkaZastepcza
                              ? (isSmallFontRow ? 'py-[3px]' : 'py-2')
                              : (isSmallFontRow ? 'py-1' : 'py-2.5')
                          )}
                          style={{
                            width: isDrukarkaZastepcza ? '45%' : '17.33%',
                            minWidth: '45px',
                            maxWidth: isDrukarkaZastepcza ? '45%' : '17.33%',
                            boxSizing: 'border-box',
                            borderBottom: isLastRow ? 'none' : '1.5px solid rgba(139, 122, 90, 0.75)'
                          }}
                        >
                          {renderValueWithSuffix(typedRow.plan1, valueFontSize, idx === 1 ? 0 : 0, typedRow.label)}
                        </TableCell>
                      )}
                      {/* Второй столбец удален для всех A3/A4 подкатегорий на Drukarka Zastępcza */}
                      {typedRow.plan2 && !(isDrukarkaZastepcza && ['a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor', 'drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor'].includes(subcategoryId)) && (
                        <TableCell
                          className={cn(
                            `${isDrukarkaZastepcza ? 'pl-1.5 pr-2' : 'pl-1.5 pr-1'} align-middle text-center border-l-2 border-[#8b7a5a]`,
                            lineHeight,
                            isDrukarkaZastepcza
                              ? (isSmallFontRow ? 'py-[3px]' : 'py-2')
                              : (isSmallFontRow ? 'py-1' : 'py-2.5')
                          )}
                          style={{
                            width: isDrukarkaZastepcza ? '22.5%' : '17.33%',
                            minWidth: '45px',
                            maxWidth: isDrukarkaZastepcza ? '22.5%' : '17.33%',
                            boxSizing: 'border-box',
                            borderBottom: isLastRow ? 'none' : '1.5px solid rgba(139, 122, 90, 0.75)'
                          }}
                        >
                          {renderValueWithSuffix(typedRow.plan2, valueFontSize, idx === 1 ? 1 : 0, typedRow.label)}
                        </TableCell>
                      )}
                      {!isDrukarkaZastepcza && typedRow.plan3 && (
                        <TableCell
                          className="pl-1.5 pr-2 py-2.5 align-middle text-center leading-[1.4] border-l-2 border-[#8b7a5a]"
                          style={{
                            width: '17.33%',
                            minWidth: '45px',
                            maxWidth: '17.33%',
                            boxSizing: 'border-box',
                            borderBottom: isLastRow ? 'none' : '1.5px solid rgba(139, 122, 90, 0.75)'
                          }}
                        >
                          {renderValueWithSuffix(typedRow.plan3, valueFontSize, idx === 1 ? 2 : 0, typedRow.label)}
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

const scrollIntoViewIfNeeded = (
  target?: HTMLDivElement | null,
  offset = SECTION_SCROLL_OFFSET,
  force = false,
) => {
  if (!target) return

  const measureAndScroll = () => {
    const rect = target.getBoundingClientRect()
    const topVisible = rect.top >= offset
    const bottomVisible = rect.bottom <= window.innerHeight - 20

    if (!force && topVisible && bottomVisible) {
      return
    }

    const top = rect.top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(measureAndScroll)
  })
}

// Вспомогательная функция для поиска scrollable контейнера внутри AccordionContent
const findScrollableContainer = (accordionContentElement: HTMLElement): HTMLElement | null => {
  const children = Array.from(accordionContentElement.children) as HTMLElement[]

  // Проверяем дочерние элементы
  for (const child of children) {
    const styles = window.getComputedStyle(child)
    if (styles.overflowY === 'auto' || styles.overflowY === 'scroll' ||
      (styles.maxHeight !== 'none' && styles.maxHeight !== '0px')) {
      return child
    }
  }

  // Проверяем сам AccordionContent
  const styles = window.getComputedStyle(accordionContentElement)
  if (styles.overflowY === 'auto' || styles.overflowY === 'scroll') {
    return accordionContentElement
  }

  // Fallback: первый дочерний div или сам AccordionContent
  return children.find(el => el.tagName === 'DIV') || accordionContentElement
}

// Функция для прокрутки подкатегории внутри контейнера с overflow
const scrollSubcategoryToTop = (
  sectionRef: HTMLDivElement | null,
  subcategoryRef: HTMLDivElement | null,
  sectionOffset = SECTION_SCROLL_OFFSET,
) => {
  if (!sectionRef || !subcategoryRef) return

  // subcategoryRef указывает на AccordionItem, нам нужно найти AccordionTrigger внутри него
  // для прокрутки к заголовку подкатегории
  const subcategoryTrigger = subcategoryRef.querySelector<HTMLElement>(
    '[data-slot="accordion-trigger"]'
  ) || subcategoryRef

  // Ждем завершения анимации раскрытия аккордеона Radix UI
  // Radix UI Accordion использует CSS анимации ~200-300ms
  // Используем двойной RAF + задержку для гарантии завершения анимации
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        // 1. Сначала проверяем и прокручиваем страницу, чтобы заголовок секции был виден
        // Проверяем, находится ли заголовок секции в нужной позиции (с отступом sectionOffset)
        const sectionRect = sectionRef.getBoundingClientRect()
        const targetSectionTop = sectionOffset
        const currentSectionTop = sectionRect.top
        const needsPageScroll = Math.abs(currentSectionTop - targetSectionTop) > 20 // Порог для прокрутки

        if (needsPageScroll) {
          const sectionTop = sectionRect.top + window.scrollY - sectionOffset
          window.scrollTo({ top: Math.max(0, sectionTop), behavior: 'smooth' })
        }

        // 2. Находим контейнер с overflow-y-auto внутри AccordionContent
        // AccordionContent имеет data-slot="accordion-content"
        // Внутри него есть div с overflow-y-auto (className применяется к внутреннему div)
        const accordionContentElement = sectionRef.querySelector<HTMLElement>(
          '[data-slot="accordion-content"]'
        )

        if (!accordionContentElement) return

        // Ищем scrollable контейнер
        const scrollableContainer = findScrollableContainer(accordionContentElement)

        // Функция для выполнения прокрутки контейнера
        const performContainerScroll = () => {
          // Получаем актуальные позиции после возможной прокрутки страницы
          // Используем trigger для прокрутки к заголовку подкатегории
          const subcategoryTriggerRect = subcategoryTrigger.getBoundingClientRect()
          const containerRect = scrollableContainer!.getBoundingClientRect()

          // Вычисляем относительную позицию заголовка подкатегории внутри контейнера
          const relativeTop = subcategoryTriggerRect.top - containerRect.top

          // Вычисляем, насколько нужно прокрутить контейнер
          // Чтобы заголовок подкатегории был в самом верху контейнера (с небольшим отступом)
          const currentScrollTop = scrollableContainer!.scrollTop
          const targetScrollTop = currentScrollTop + relativeTop - 10 // Небольшой отступ сверху для визуального комфорта

          // Прокручиваем контейнер плавно
          scrollableContainer!.scrollTo({
            top: Math.max(0, targetScrollTop),
            behavior: 'smooth'
          })
        }

        // Если была прокрутка страницы, ждем её начала перед прокруткой контейнера
        // Это нужно для корректного расчета позиций элементов
        if (needsPageScroll) {
          setTimeout(performContainerScroll, 200) // Даем время на начало прокрутки страницы
        } else {
          // Если страница не прокручивается, выполняем прокрутку контейнера сразу
          performContainerScroll()
        }
      }, 100) // Задержка для завершения анимации раскрытия Radix UI Accordion
    })
  })
}

const DEVICE_CATEGORIES = [
  {
    title: 'Drukarka domowa',
    description:
      'Urządzenie do użytku domowego (okazjonalnego drukowania). Małe modele A4',
    features: ['małe wymiary', 'wolniejszy druk'],
    examples: '',
  },
  {
    title: 'Drukarka biurowa',
    description:
      'Do pracy w małych i średnich biurach. Do częstszego drukowania.',
    features: ['średni rozmiar', 'szybszy druk', 'wyższa trwałość'],
    examples: '',
  },
  {
    title: 'Drukarka biznesowa',
    description:
      'Duże urządzenia A4/A3 do intensywnej codziennej pracy i dużych wolumenów wydruku.',
    features: ['do dużych nakładów z wysoką wytrzymałością'],
    examples: '',
  },
]

// Категории для страницы "Serwis Drukarek Termiczno-etykietowych"
const THERMAL_DEVICE_CATEGORIES = [
  {
    title: 'Mała drukarka etykiet',
    description:
      'Urządzenie do użytku okazjonalnego drukowania. Małe modele',
    features: ['małe wymiary', 'wolniejszy druk'],
    examples: '',
  },
  {
    title: 'Średnia drukarka etykiet',
    description:
      'Do pracy w małych i średnich biurach. Do częstszego drukowania.',
    features: ['średni rozmiar', 'szybszy druk', 'wyższa trwałość'],
    examples: '',
  },
  {
    title: 'Duża drukarka etykiet',
    description:
      'Biznesowe urządzenie do intensywnej codziennej pracy i dużych wolumenów wydruku.',
    features: ['do dużych nakładów z wysoką wytrzymałością'],
    examples: '',
  },
]

// Категории для страницы "Serwis Drukarek Igłowych"
const NEEDLE_DEVICE_CATEGORIES = [
  {
    title: 'Mała drukarka igłowa',
    description:
      'Urządzenie do użytku okazjonalnego drukowania. Małe modele',
    features: ['małe wymiary', 'wolniejszy druk'],
    examples: '',
  },
  {
    title: 'Średnia drukarka igłowa',
    description:
      'Do pracy w małych i średnich biurach. Do częstszego drukowania.',
    features: ['średni rozmiar', 'szybszy druk', 'wyższa trwałość'],
    examples: '',
  },
  {
    title: 'Duża drukarka igłowa',
    description:
      'Biznesowe urządzenie do intensywnej codziennej pracy i dużych wolumenów wydruku.',
    features: ['do dużych nakładów z wysoką wytrzymałością'],
    examples: '',
  },
]

// Функция для получения категорий устройств в зависимости от страницы
const getDeviceCategories = (serviceSlug?: string) => {
  if (serviceSlug === 'serwis-drukarek-termicznych') {
    return THERMAL_DEVICE_CATEGORIES
  }
  if (serviceSlug === 'serwis-drukarek-iglowych') {
    return NEEDLE_DEVICE_CATEGORIES
  }
  return DEVICE_CATEGORIES
}

// Функция для получения пути к картинке принтера по названию категории
const getPrinterImageForCategory = (categoryTitle: string, serviceSlug?: string): string => {
  // Для страницы "Serwis Drukarek Igłowych" используем специальные изображения
  if (serviceSlug === 'serwis-drukarek-iglowych') {
    switch (categoryTitle) {
      case 'Mała drukarka igłowa':
        return '/images/Mała_drukarka_Igłowa.webp'
      case 'Średnia drukarka igłowa':
        return '/images/Średnia_drukarka_Igłowa.webp'
      case 'Duża drukarka igłowa':
        return '/images/Duża_drukarka_Igłowa.webp'
      default:
        return ''
    }
  }

  // Для страницы "Serwis Drukarek Termiczno-etykietowych" используем специальные изображения
  if (serviceSlug === 'serwis-drukarek-termicznych') {
    switch (categoryTitle) {
      case 'Mała drukarka etykiet':
        return '/images/Mała_drukarka_etykiet.webp'
      case 'Średnia drukarka etykiet':
        return '/images/Srednia_drukarka_etykiet.webp'
      case 'Duża drukarka etykiet':
        return '/images/Duża_drukarka_etykiet.webp'
      default:
        return ''
    }
  }

  // Для страницы "Serwis Drukarek Atramentowych" используем специальные изображения
  if (serviceSlug === 'serwis-drukarek-atramentowych') {
    switch (categoryTitle) {
      case 'Drukarka domowa':
        return '/images/Drukarka_domowa_atramentowa.webp'
      case 'Drukarka biurowa':
        return '/images/Drukarka_biurowa_atramentowa.webp'
      case 'Drukarka biznesowa':
        return '/images/Drukarka_biznesowa_atramentowa.webp'
      default:
        return ''
    }
  }

  // Для всех остальных страниц используем старые изображения
  switch (categoryTitle) {
    case 'Drukarka domowa':
      return '/images/Drukarka_domowa.webp'
    case 'Drukarka biurowa':
      return '/images/A4_MFU_kolor.webp'
    case 'Drukarka biznesowa':
      return '/images/MFU A3A4 (mono).webp'
    default:
      return ''
  }
}

const SPECIAL_TOOLTIP_SERVICES = new Set([
  'serwis-drukarek-laserowych',
  'serwis-drukarek-atramentowych',
  'serwis-drukarek-termicznych',
  'serwis-drukarek-iglowych',
])

const ServiceAccordion = ({ service }: { service: ServiceData }) => {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<string | null>(null)
  const [isCategoryTooltipOpen, setCategoryTooltipOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [openSmallTooltips, setOpenSmallTooltips] = useState<Set<string>>(new Set())
  const tooltipContentRef = useRef<HTMLDivElement | null>(null)
  const swipeStartY = useRef<number | null>(null)
  const [openWynajemSubcategories, setOpenWynajemSubcategories] = useState<string[]>([])
  const [openDrukarkaZastepczaSubcategories, setOpenDrukarkaZastepczaSubcategories] = useState<string[]>([])
  const sectionRefs = useRef<ScrollRefs>({})
  const subcategoryRefs = useRef<ScrollRefs>({})
  // Refs для колонок цен в шапке wynajem подменю
  const wynajemHeaderRefs = useRef<{
    [key: string]: {
      icon: React.RefObject<HTMLDivElement | null>
      text: React.RefObject<HTMLDivElement | null>
      prices: React.RefObject<HTMLDivElement | null>[]
    }
  }>({})
  // Refs для колонок цен в шапке drukarka-zastepcza подменю
  const drukarkaZastepczaHeaderRefs = useRef<{
    [key: string]: {
      icon: React.RefObject<HTMLDivElement | null>
      text: React.RefObject<HTMLDivElement | null>
      prices: React.RefObject<HTMLDivElement | null>[]
    }
  }>({})
  // Refs для контейнеров заголовков секций (для позиционирования "Czynsz wynajmu [zł/mies.]")
  const sectionHeaderRef1 = useRef<HTMLDivElement | null>(null)
  const sectionHeaderRef2 = useRef<HTMLDivElement | null>(null)
  // Refs для контейнеров заголовков секций drukarka-zastepcza
  const sectionHeaderRef1DZ = useRef<HTMLDivElement | null>(null)
  const sectionHeaderRef2DZ = useRef<HTMLDivElement | null>(null)
  const [priceColumnsPosition1, setPriceColumnsPosition1] = useState<{ left: number; width: number } | null>(null)
  const [priceColumnsPosition2, setPriceColumnsPosition2] = useState<{ left: number; width: number } | null>(null)
  const [priceColumnsPosition1DZ, setPriceColumnsPosition1DZ] = useState<{ left: number; width: number } | null>(null)
  const [priceColumnsPosition2DZ, setPriceColumnsPosition2DZ] = useState<{ left: number; width: number } | null>(null)
  const priceTooltip = service.priceTooltip ?? DEFAULT_PRICE_TOOLTIP
  const isLaserService = service.slug === 'serwis-drukarek-laserowych'
  const isSpecialTooltipService = SPECIAL_TOOLTIP_SERVICES.has(service.slug)
  const shouldHighlightPrices = isLaserService && isCategoryTooltipOpen

  // Определение размера экрана
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Закрытие маленьких tooltip при клике вне их области на мобильных
  useEffect(() => {
    if (openSmallTooltips.size === 0 || !isMobile) return

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement
      // Проверяем, что клик не внутри tooltip или его триггера
      const tooltipContent = target.closest('[data-slot="tooltip-content"]')
      const tooltipTrigger = target.closest('[data-slot="tooltip-trigger"]')
      if (!tooltipContent && !tooltipTrigger) {
        setOpenSmallTooltips(new Set())
      }
    }

    // Используем небольшую задержку, чтобы не перехватывать событие открытия
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside, true)
      document.addEventListener('touchstart', handleClickOutside, true)
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('click', handleClickOutside, true)
      document.removeEventListener('touchstart', handleClickOutside, true)
    }
  }, [openSmallTooltips, isMobile])

  // Управление прокруткой body при открытом модальном окне
  useEffect(() => {
    if (isCategoryTooltipOpen && isMobile && isSpecialTooltipService) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCategoryTooltipOpen, isMobile, isSpecialTooltipService])

  const renderPriceTooltipContent = () => {
    if (!isSpecialTooltipService) {
      return (
        <p className="max-w-xs text-sm leading-snug text-[#f8f1db]">
          {priceTooltip}
        </p>
      )
    }

    return (
      <div
        ref={tooltipContentRef}
        className={cn(
          "relative pointer-events-auto rounded-2xl border border-[rgba(200,169,107,0.45)] shadow-[0_22px_45px_rgba(0,0,0,0.5)] text-[#f8eacd] overflow-hidden",
          isMobile ? "w-full min-h-fit" : "w-[min(calc(100vw-32px),900px)] md:w-[min(calc(100vw-64px),900px)] max-h-[90vh] md:max-h-[88vh]"
        )}
        style={{
          backgroundImage: "url('/images/services-background.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 rounded-2xl bg-[rgba(0,0,0,0.5)] pointer-events-none" />
        {/* Кнопка закрытия X - фиксированная вверху на мобильных */}
        {isMobile && (
          <div
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setCategoryTooltipOpen(false)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                setCategoryTooltipOpen(false)
              }
            }}
            className="absolute top-4 right-4 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-black/70 active:bg-black/90 text-white transition-colors touch-manipulation shadow-lg cursor-pointer"
            aria-label="Zamknij"
          >
            <X className="w-5 h-5" />
          </div>
        )}
        <div
          className={cn(
            "relative p-6 md:p-7 pb-8 md:pb-7 space-y-6",
            !isMobile && "max-h-[90vh] md:max-h-[88vh] overflow-y-auto"
          )}
        >
          <div className="text-center space-y-2">
            <h4 className="text-[22px] md:text-[26px] font-cormorant font-semibold text-white tracking-wide">
              Kategorie urządzeń
            </h4>
            <p className="text-[15px] md:text-[17px] text-[rgba(255,255,245,0.85)] leading-snug font-cormorant">
              {service.slug === 'serwis-drukarek-iglowych'
                ? 'W cenniku pierwsza cena dotyczy małej drukarki igłowej, druga – średniej, trzecia – dużej'
                : service.slug === 'serwis-drukarek-termicznych'
                  ? 'W cenniku pierwsza cena dotyczy małej drukarki etykiet, druga – średniej, trzecia – dużej'
                  : 'W cenniku pierwsza cena dotyczy drukarki domowej, druga – biurowej, trzecia – biznesowej'}
            </p>
            <div className="mt-1 flex items-center justify-center gap-1">
              <span className="text-[15px] md:text-[17px] text-[rgba(255,255,245,0.85)] font-cormorant">(np.</span>
              <div className="flex items-center">
                <div className="drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">
                  {renderPriceLines('50 / 100 / 150')}
                </div>
              </div>
              <span className="text-[15px] md:text-[17px] text-[rgba(255,255,245,0.85)] font-cormorant">)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pb-4">
            {getDeviceCategories(service.slug).map(category => (
              <div
                key={category.title}
                className="bg-[rgba(255,255,255,0.08)] border border-[rgba(191,167,106,0.35)] rounded-xl p-4 flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] text-center"
              >
                <div>
                  <div className="text-xl font-cormorant font-semibold text-white">{category.title}</div>
                  <p className="text-xs md:text-sm text-[rgba(255,255,245,0.85)] leading-snug mt-1 whitespace-pre-line">
                    {category.description}
                  </p>
                </div>
                {/* Добавление картинки принтера */}
                <div className="flex justify-center items-center my-3">
                  <Image
                    src={getPrinterImageForCategory(category.title, service.slug)}
                    alt={category.title}
                    width={200}
                    height={150}
                    className="w-[150px] md:w-[200px] h-auto object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-[13px] text-[rgba(255,255,245,0.85)] leading-snug font-table-sub text-center mt-auto pt-2">
                  {category.features.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const handleSectionChange = (value: string | null) => {
    setOpenSection(prev => (prev === value ? null : value))
    setOpenSubcategory(null)
    if (!value || (service.slug === 'wynajem-drukarek' && value !== 'akordeon-1' && value !== 'akordeon-2')) {
      setOpenWynajemSubcategories([])
    }
    if (!value || (service.slug === 'drukarka-zastepcza' && value !== 'akordeon-1' && value !== 'akordeon-2')) {
      setOpenDrukarkaZastepczaSubcategories([])
    }
  }

  const handleSubcategoryChange = (sectionId: string, value: string | null) => {
    if (sectionId !== 'naprawy') return

    // Fix: Restore toggle logic to allow single-click open/close
    setOpenSubcategory(prev => (prev === value ? null : value))
  }

  const isSectionOpen = (sectionId: string) =>
    openSection ? openSection === sectionId : false

  const getSubcategoryValue = (sectionId: string) =>
    sectionId === 'naprawy' ? openSubcategory ?? undefined : undefined

  const isSubcategoryOpen = (sectionId: string, subcategoryId: string) => {
    if (service.slug === 'wynajem-drukarek' && (sectionId === 'akordeon-1' || sectionId === 'akordeon-2')) {
      return openWynajemSubcategories.includes(subcategoryId)
    }
    if (service.slug === 'drukarka-zastepcza' && (sectionId === 'akordeon-1' || sectionId === 'akordeon-2')) {
      return openDrukarkaZastepczaSubcategories.includes(subcategoryId)
    }
    return false
  }

  const handleWynajemSubcategoryChange = (values: string[]) => {
    setOpenWynajemSubcategories(values)
  }

  const handleDrukarkaZastepczaSubcategoryChange = (values: string[]) => {
    setOpenDrukarkaZastepczaSubcategories(values)
  }

  useEffect(() => {
    if (!openSection) return
    scrollIntoViewIfNeeded(sectionRefs.current[openSection], SECTION_SCROLL_OFFSET)
  }, [openSection])

  useEffect(() => {
    if (openSection !== 'faq' && openFaq) {
      setOpenFaq(null)
    }
  }, [openSection, openFaq])

  useEffect(() => {
    // Прокрутка только при открытии подкатегории
    if (!openSubcategory || openSection !== 'naprawy') {
      return
    }

    const sectionRef = sectionRefs.current['naprawy']
    const subcategoryRef = subcategoryRefs.current[openSubcategory]

    if (!sectionRef || !subcategoryRef) {
      return
    }

    // Прокручиваем подкатегорию к верху внутри контейнера
    // Fix: Change order - first ensure content appears (state changed), 
    // then wait for DOM to likely settle (RAF + timeout), THEN scroll.
    // This helps the browser accept the "open" state as the new baseline.
    const rafId = requestAnimationFrame(() => {
      const timerId = setTimeout(() => {
        // Double-check: if user closed it during the delay, DO NOT scroll.
        if (subcategoryRef.dataset.state !== 'open') return
        scrollSubcategoryToTop(sectionRef, subcategoryRef, SECTION_SCROLL_OFFSET)
      }, 100)

      // Cleanup inside the RAF closure isn't possible directly via useEffect return, 
      // but we can't easily cancel internal logic from outside.
      // However, the `dataset.state` check acts as a logical gate.
    })

    // Basic cleanup to prevent memory leaks if component unmounts
    return () => cancelAnimationFrame(rafId)
  }, [openSubcategory, openSection])


  // Измерение позиции столбцов цен для позиционирования "Czynsz wynajmu [zł/mies.]"
  useEffect(() => {
    if (service.slug !== 'wynajem-drukarek' && service.slug !== 'drukarka-zastepcza') {
      setPriceColumnsPosition1(null)
      setPriceColumnsPosition2(null)
      setPriceColumnsPosition1DZ(null)
      setPriceColumnsPosition2DZ(null)
      return
    }

    if (service.slug === 'wynajem-drukarek') {

      const measurePriceColumns = (sectionId: 'akordeon-1' | 'akordeon-2', sectionHeaderRef: React.RefObject<HTMLDivElement | null>, setPosition: (pos: { left: number; width: number } | null) => void) => {
        if (openSection !== sectionId) {
          setPosition(null)
          return
        }

        // Проверяем, что контейнер заголовка существует
        if (!sectionHeaderRef.current) return

        // Ищем первую подкатегорию в секции
        const firstSubcategoryKey = sectionId === 'akordeon-1' ? 'akordeon-1-drukarki-mono' : 'akordeon-2-a3-drukarki-mono'
        const headerRefs = wynajemHeaderRefs.current[firstSubcategoryKey]

        if (headerRefs && headerRefs.prices[0]?.current && headerRefs.prices[2]?.current) {
          const firstColumn = headerRefs.prices[0].current
          const thirdColumn = headerRefs.prices[2].current
          const firstRect = firstColumn.getBoundingClientRect()
          const thirdRect = thirdColumn.getBoundingClientRect()
          const headerRect = sectionHeaderRef.current.getBoundingClientRect()

          // Вычисляем относительную позицию первого столбца относительно контейнера заголовка
          const left = firstRect.left - headerRect.left

          // Ширина = позиция правого края третьего столбца - позиция левого края первого столбца
          const totalWidth = (thirdRect.right - headerRect.left) - left

          if (totalWidth > 0 && left > 0) {
            setPosition({ left, width: totalWidth })
          }
        } else {
          setPosition(null)
        }
      }

      const measureAll = () => {
        measurePriceColumns('akordeon-1', sectionHeaderRef1, setPriceColumnsPosition1)
        measurePriceColumns('akordeon-2', sectionHeaderRef2, setPriceColumnsPosition2)
      }

      // Задержка для обеспечения рендеринга
      const timeoutId1 = setTimeout(measureAll, 100)
      const timeoutId2 = setTimeout(measureAll, 300)
      const timeoutId3 = setTimeout(measureAll, 500)

      const handleResize = () => {
        measureAll()
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        clearTimeout(timeoutId1)
        clearTimeout(timeoutId2)
        clearTimeout(timeoutId3)
      }
    }

    if (service.slug === 'drukarka-zastepcza') {
      const measurePriceColumnsDZ = (sectionId: 'akordeon-1' | 'akordeon-2', sectionHeaderRef: React.RefObject<HTMLDivElement | null>, setPosition: (pos: { left: number; width: number } | null) => void) => {
        if (openSection !== sectionId) {
          setPosition(null)
          return
        }

        // Проверяем, что контейнер заголовка существует
        if (!sectionHeaderRef.current) return

        // Ищем первую подкатегорию в секции
        const firstSubcategoryKey = sectionId === 'akordeon-1' ? 'akordeon-1-drukarki-mono' : 'akordeon-2-a3-drukarki-mono'
        const headerRefs = drukarkaZastepczaHeaderRefs.current[firstSubcategoryKey]

        if (headerRefs && headerRefs.prices[0]?.current && headerRefs.prices[2]?.current) {
          const firstColumn = headerRefs.prices[0].current
          const thirdColumn = headerRefs.prices[2].current
          const firstRect = firstColumn.getBoundingClientRect()
          const thirdRect = thirdColumn.getBoundingClientRect()
          const headerRect = sectionHeaderRef.current.getBoundingClientRect()

          // Вычисляем относительную позицию первого столбца относительно контейнера заголовка
          const left = firstRect.left - headerRect.left

          // Ширина = позиция правого края третьего столбца - позиция левого края первого столбца
          const totalWidth = (thirdRect.right - headerRect.left) - left

          if (totalWidth > 0 && left > 0) {
            setPosition({ left, width: totalWidth })
          }
        } else {
          setPosition(null)
        }
      }

      const measureAllDZ = () => {
        measurePriceColumnsDZ('akordeon-1', sectionHeaderRef1DZ, setPriceColumnsPosition1DZ)
        measurePriceColumnsDZ('akordeon-2', sectionHeaderRef2DZ, setPriceColumnsPosition2DZ)
      }

      // Задержка для обеспечения рендеринга
      const timeoutId1DZ = setTimeout(measureAllDZ, 100)
      const timeoutId2DZ = setTimeout(measureAllDZ, 300)
      const timeoutId3DZ = setTimeout(measureAllDZ, 500)

      const handleResizeDZ = () => {
        measureAllDZ()
      }

      window.addEventListener('resize', handleResizeDZ)

      return () => {
        window.removeEventListener('resize', handleResizeDZ)
        clearTimeout(timeoutId1DZ)
        clearTimeout(timeoutId2DZ)
        clearTimeout(timeoutId3DZ)
      }
    }
  }, [service.slug, openSection, sectionRefs, wynajemHeaderRefs, drukarkaZastepczaHeaderRefs])



  return (
    <div className="container max-w-4xl mx-auto px-0 sm:px-4 md:px-6 pb-0 relative z-10">
      <div className="flex flex-col gap-4">
        <Accordion
          type="single"
          collapsible
          value={openSection ?? undefined}
          onValueChange={handleSectionChange}
          className="w-full"
          data-main-accordion="true"
        >
          {service.pricingSections.map((section) => (
            <AccordionItem
              key={section.id}
              value={section.id}
              data-naprawy-main-section={section.id === 'naprawy' ? 'true' : undefined}
              className={cn(
                "border-0 group mb-4 last:mb-0 scroll-mt-[120px]"
              )}
              ref={node => {
                sectionRefs.current[section.id] = node
              }}
            >
              <div
                className={cn(
                  "group relative min-h-[70px] rounded-lg py-1.5 px-0 sm:py-2 md:px-3 border-2 border-[rgba(200,169,107,0.5)] hover:border-[rgba(200,169,107,0.85)] transition-all duration-300 hover:shadow-xl group-data-[state=open]:border-b group-data-[state=open]:border-b-[rgba(191,167,106,0.2)] w-full bg-[rgba(5,5,5,0.85)]"
                )}
              >
                <AccordionTrigger
                  className="hover:no-underline [&>svg]:hidden w-full group !py-0 !items-center !gap-0"
                >
                  <div className="flex items-center w-full text-left">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="mr-4 w-[50px] h-[50px] flex-shrink-0 flex items-center justify-center">
                        <Image
                          src={getIconForSection(section.id)}
                          alt={section.title}
                          width={50}
                          height={50}
                          className="object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                          unoptimized
                        />
                      </div>

                      <div
                        ref={
                          service.slug === 'wynajem-drukarek' && section.id === 'akordeon-1' ? sectionHeaderRef1 :
                            service.slug === 'wynajem-drukarek' && section.id === 'akordeon-2' ? sectionHeaderRef2 :
                              service.slug === 'drukarka-zastepcza' && section.id === 'akordeon-1' ? sectionHeaderRef1DZ :
                                service.slug === 'drukarka-zastepcza' && section.id === 'akordeon-2' ? sectionHeaderRef2DZ :
                                  null
                        }
                        className="flex-1 relative"
                      >
                        <div className="flex flex-col md:block">
                          <div className="flex items-start md:items-center gap-2 md:gap-0 md:flex-nowrap">
                            {/* Мобильная версия: заголовок и надпись в одной строке */}
                            <div className={cn(
                              "md:hidden flex justify-between w-full gap-2",
                              (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && isSectionOpen(section.id) ? "items-center" : "items-start"
                            )}>
                              <div className="flex-1 min-w-0 pr-2">
                                <h3 className={cn(
                                  "text-lg font-cormorant font-semibold text-[#ffffff] group-hover:text-white transition-colors leading-tight",
                                  (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && isSectionOpen(section.id) && "flex flex-col"
                                )}>
                                  {(() => {
                                    if ((service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2')) {
                                      // Если аккордеон открыт, переносим заголовок на две строки для экономии места
                                      if (isSectionOpen(section.id)) {
                                        return renderSectionTitleMobile(section.title)
                                      }
                                      // Если закрыт - показываем обычный заголовок
                                      return section.title
                                    }
                                    if (section.id === 'konserwacja') {
                                      return 'Czyszczenie i konserwacja'
                                    }
                                    if (section.id === 'naprawy') {
                                      return 'Naprawy i usługi serwisowe'
                                    }
                                    return section.title
                                  })()}
                                </h3>
                                {/* Footer для секции naprawy на странице Outsourcing IT - мобильная версия, только когда открыта */}
                                {service.slug === 'outsourcing-it' && section.id === 'naprawy' && isSectionOpen(section.id) && section.footer && (
                                  <span
                                    className="text-[12px] text-[#cbb27c] leading-relaxed block mt-0.5"
                                    style={{
                                      opacity: 1,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal'
                                    }}
                                  >
                                    ({section.footer})
                                  </span>
                                )}
                              </div>
                              {/* "Czynsz wynajmu [zł/mies.]" или "Cena wydruku format A4 [mono/kolor]" над столбцами цен - мобильная версия, только когда аккордеон открыт */}
                              {service.slug === 'wynajem-drukarek' && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && isSectionOpen(section.id) && (
                                <div className="flex-shrink-0">
                                  <span className="text-base font-cormorant font-semibold text-[#ffffff] leading-tight whitespace-nowrap">
                                    Czynsz wynajmu [zł/mies.]
                                  </span>
                                </div>
                              )}
                              {service.slug === 'drukarka-zastepcza' && section.id === 'akordeon-1' && isSectionOpen(section.id) && (
                                <div className="flex-shrink-0">
                                  <div className="text-base font-cormorant font-semibold text-[#ffffff] leading-tight text-center">
                                    <div>Cena wydruku</div>
                                  </div>
                                </div>
                              )}
                              {service.slug === 'drukarka-zastepcza' && section.id === 'akordeon-2' && isSectionOpen(section.id) && (
                                <div className="flex-shrink-0">
                                  <div className="text-base font-cormorant font-semibold text-[#ffffff] leading-tight text-center">
                                    <div>Cena wydruku</div>
                                  </div>
                                </div>
                              )}
                            </div>
                            {/* Десктопная версия: обычный заголовок */}
                            <div className="hidden md:block">
                              <h3 className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] group-hover:text-white transition-colors mb-1 leading-tight">
                                {section.title}
                              </h3>
                              {/* Footer для секции naprawy на странице Outsourcing IT - только когда открыта */}
                              {service.slug === 'outsourcing-it' && section.id === 'naprawy' && isSectionOpen(section.id) && section.footer && (
                                <span
                                  className="text-[12px] text-[#cbb27c] leading-relaxed block"
                                  style={{
                                    opacity: 1,
                                    fontWeight: 'normal',
                                    fontStyle: 'normal'
                                  }}
                                >
                                  ({section.footer})
                                </span>
                              )}
                            </div>
                          </div>
                          {/* "Czynsz wynajmu [zł/mies.]" над столбцами цен - десктопная версия */}
                          {service.slug === 'wynajem-drukarek' && section.id === 'akordeon-1' && isSectionOpen(section.id) && (
                            <>
                              {priceColumnsPosition1 ? (
                                <>
                                  {/* Десктопная версия с вычисленной позицией */}
                                  <div
                                    className="hidden md:block absolute top-0"
                                    style={{
                                      left: `${priceColumnsPosition1.left}px`,
                                      width: `${priceColumnsPosition1.width}px`,
                                    }}
                                  >
                                    <div className="text-center">
                                      <span className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-tight">
                                        Czynsz wynajmu [zł/mies.]
                                      </span>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                            </>
                          )}
                          {service.slug === 'wynajem-drukarek' && section.id === 'akordeon-2' && isSectionOpen(section.id) && (
                            <>
                              {/* Десктопная версия */}
                              {priceColumnsPosition2 ? (
                                <div
                                  className="hidden md:block absolute top-0"
                                  style={{
                                    left: `${priceColumnsPosition2.left}px`,
                                    width: `${priceColumnsPosition2.width}px`,
                                  }}
                                >
                                  <div className="text-center">
                                    <span className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-tight">
                                      Czynsz wynajmu [zł/mies.]
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="hidden md:block absolute top-0 right-0" style={{ width: '60%' }}>
                                  <div className="text-center">
                                    <span className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-tight">
                                      Czynsz wynajmu [zł/mies.]
                                    </span>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                          {service.slug === 'drukarka-zastepcza' && section.id === 'akordeon-1' && isSectionOpen(section.id) && (
                            <>
                              {priceColumnsPosition1DZ ? (
                                <>
                                  {/* Десктопная версия с вычисленной позицией */}
                                  <div
                                    className="hidden md:block absolute top-0"
                                    style={{
                                      left: `${priceColumnsPosition1DZ.left}px`,
                                      width: `${priceColumnsPosition1DZ.width}px`,
                                    }}
                                  >
                                    <div className="text-left" style={{ marginLeft: '50px' }}>
                                      <div className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-tight">
                                        <div>Cena wydruku</div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="hidden md:block absolute top-0 right-0" style={{ width: '60%' }}>
                                  <div className="text-left" style={{ marginLeft: '50px' }}>
                                    <div className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-tight">
                                      <div>Cena wydruku</div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                          {service.slug === 'drukarka-zastepcza' && section.id === 'akordeon-2' && isSectionOpen(section.id) && (
                            <>
                              {/* Десктопная версия */}
                              {priceColumnsPosition2DZ ? (
                                <div
                                  className="hidden md:block absolute top-0"
                                  style={{
                                    left: `${priceColumnsPosition2DZ.left}px`,
                                    width: `${priceColumnsPosition2DZ.width}px`,
                                  }}
                                >
                                  <div className="text-left" style={{ marginLeft: '50px' }}>
                                    <div className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-tight">
                                      <div>Cena wydruku</div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="hidden md:block absolute top-0 right-0" style={{ width: '60%' }}>
                                  <div className="text-left" style={{ marginLeft: '50px' }}>
                                    <div className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-tight">
                                      <div>Cena wydruku</div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[#bfa76a] text-xs font-serif group-hover:translate-x-1 transition-transform group-data-[state=open]:hidden">
                          <span>{section.id === 'faq' ? 'Zobacz' : 'Zobacz cennik'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>

                    {section.id !== 'faq' && !(service.slug === 'wynajem-drukarek' && (section.id === 'akordeon-1' || section.id === 'akordeon-2')) && !(service.slug === 'drukarka-zastepcza' && (section.id === 'akordeon-1' || section.id === 'akordeon-2')) && (
                      <>
                        <div className="flex items-center gap-3 ml-3 sm:gap-4 sm:ml-4 flex-shrink-0">
                          <div
                            className={cn(
                              'flex items-center justify-center',
                              section.id === 'diagnoza' || section.id === 'dojazd' || section.id === 'konserwacja' || section.id === 'naprawy'
                                ? 'min-w-[96px] sm:min-w-[120px]'
                                : 'min-w-0 sm:min-w-[120px]'
                            )}
                          >
                            {(section.id === 'diagnoza' || section.id === 'dojazd') && (
                              <span className="text-lg md:text-xl font-table-accent text-[rgba(255,255,245,0.85)] group-data-[state=open]:hidden whitespace-nowrap">
                                GRATIS
                              </span>
                            )}
                            <div
                              className="text-center hidden group-data-[state=open]:block w-full"
                            >
                              <TooltipProvider delayDuration={100}>
                                {(isMobile && !isSpecialTooltipService) ? (
                                  <Popover
                                    open={isMobile && !isSpecialTooltipService ? openSmallTooltips.has(section.id) : undefined}
                                    onOpenChange={open => {
                                      if (isSpecialTooltipService) {
                                        setCategoryTooltipOpen(open)
                                      } else if (isMobile) {
                                        const newSet = new Set(openSmallTooltips)
                                        if (open) {
                                          newSet.add(section.id)
                                        } else {
                                          newSet.delete(section.id)
                                        }
                                        setOpenSmallTooltips(newSet)
                                      }
                                    }}
                                  >
                                    <PopoverTrigger
                                      asChild
                                    >
                                      <div
                                        className={cn(
                                          'flex items-center gap-2 text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-[1.05] whitespace-nowrap pl-1 md:pl-0',
                                          section.id === 'diagnoza' || section.id === 'dojazd' || section.id === 'konserwacja' || section.id === 'naprawy'
                                            ? 'justify-center'
                                            : 'justify-end',
                                          'md:cursor-default cursor-pointer'
                                        )}
                                        role="button"
                                        tabIndex={0}
                                        aria-label="Informacja o cenach"
                                        onPointerDown={(e) => {
                                          // На мобильных обрабатываем touch события
                                          if (isMobile && !isSpecialTooltipService) {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            const newSet = new Set(openSmallTooltips)
                                            if (newSet.has(section.id)) {
                                              newSet.delete(section.id)
                                            } else {
                                              // Закрываем все остальные tooltip и открываем только этот
                                              newSet.clear()
                                              newSet.add(section.id)
                                            }
                                            setOpenSmallTooltips(newSet)
                                          }
                                        }}
                                        onClick={(e) => {
                                          // На мобильных также обрабатываем клик (для совместимости)
                                          if (isMobile && !isSpecialTooltipService) {
                                            e.preventDefault()
                                            e.stopPropagation()
                                          }
                                        }}
                                      >
                                        <span className="inline sm:hidden">Cena</span>
                                        <span className="ml-1 -mr-2 sm:mr-0 inline-flex items-center justify-center text-white/80 rounded-full p-2">
                                          <Info className="w-4 h-4 opacity-70 pointer-events-none" />
                                        </span>
                                      </div>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      side="bottom"
                                      sideOffset={8}
                                      className={cn(
                                        "w-fit max-w-[280px]",
                                        service.slug === 'outsourcing-it' || service.slug === 'serwis-laptopow' || service.slug === 'serwis-komputerow-stacjonarnych' || service.slug === 'serwis-drukarek-3d' || service.slug === 'serwis-plotterow'
                                          ? 'border border-[#bfa76a]/30 text-white shadow-lg p-3 relative overflow-hidden bg-cover bg-center'
                                          : 'border border-[#bfa76a]/30 text-white shadow-lg p-3 bg-[#1a1a1a]'
                                      )}
                                      style={service.slug === 'outsourcing-it' || service.slug === 'serwis-laptopow' || service.slug === 'serwis-komputerow-stacjonarnych' || service.slug === 'serwis-drukarek-3d' || service.slug === 'serwis-plotterow' ? {
                                        backgroundImage: `url('${manifest.Background_1}')`,
                                      } : {}}
                                    >
                                      {service.slug === 'outsourcing-it' || service.slug === 'serwis-laptopow' || service.slug === 'serwis-komputerow-stacjonarnych' || service.slug === 'serwis-drukarek-3d' || service.slug === 'serwis-plotterow' ? (
                                        <>
                                          <div className="absolute inset-0 bg-black/50 z-0" />
                                          <p className="relative z-10 text-sm leading-snug text-white font-medium">
                                            cena z VAT (brutto)
                                          </p>
                                        </>
                                      ) : (
                                        <p className="max-w-xs text-sm leading-snug text-[#f8f1db]">
                                          {priceTooltip}
                                        </p>
                                      )}
                                    </PopoverContent>
                                  </Popover>
                                ) : isMobile && isSpecialTooltipService ? (
                                  <div
                                    className={cn(
                                      'flex items-center gap-2 text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-[1.05] whitespace-nowrap pl-1 md:pl-0 justify-center cursor-pointer'
                                    )}
                                    role="button"
                                    tabIndex={0}
                                    aria-label="Informacja o kategoriach"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      setCategoryTooltipOpen(!isCategoryTooltipOpen)
                                    }}
                                  >
                                    <span className="inline sm:hidden">Cena</span>
                                    <span className="ml-1 -mr-2 sm:mr-0 inline-flex items-center justify-center text-white/80 rounded-full p-2">
                                      <Info className="w-4 h-4 opacity-70 pointer-events-none" />
                                    </span>
                                  </div>
                                ) : (
                                  <Tooltip
                                    onOpenChange={open => {
                                      if (isSpecialTooltipService) {
                                        setCategoryTooltipOpen(open)
                                      }
                                    }}
                                  >
                                    <TooltipTrigger
                                      asChild
                                    >
                                      <div
                                        className={cn(
                                          'flex items-center gap-2 text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-[1.05] whitespace-nowrap pl-1 md:pl-0',
                                          section.id === 'diagnoza' || section.id === 'dojazd' || section.id === 'konserwacja' || section.id === 'naprawy'
                                            ? 'justify-center'
                                            : 'justify-end',
                                          'md:cursor-default'
                                        )}
                                        role="button"
                                        tabIndex={0}
                                        aria-label="Informacja o cenach"
                                      >
                                        <span className="hidden sm:inline">Cena, zł</span>
                                        <span className="inline sm:hidden">Cena</span>
                                        <span
                                          className="ml-1 -mr-2 sm:mr-0 inline-flex items-center justify-center text-white/80 rounded-full focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none p-2 sm:p-1 md:cursor-pointer"
                                        >
                                          <Info className="w-4 h-4 opacity-70 pointer-events-none" />
                                        </span>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent
                                      {...(isSpecialTooltipService
                                        ? {
                                          side: 'left',
                                          align: 'center',
                                          sideOffset: 16,
                                          collisionPadding: 16,
                                          className: 'p-0 border-none bg-transparent shadow-none max-w-none rounded-none',
                                        }
                                        : service.slug === 'outsourcing-it' || service.slug === 'serwis-laptopow' || service.slug === 'serwis-komputerow-stacjonarnych' || service.slug === 'serwis-drukarek-3d' || service.slug === 'serwis-plotterow'
                                          ? {
                                            side: 'top',
                                            sideOffset: 4,
                                            className: 'border border-[#bfa76a]/30 text-white shadow-lg p-3 relative overflow-hidden',
                                            style: {
                                              backgroundImage: `url('${manifest.Background_1}')`,
                                              backgroundSize: 'cover',
                                              backgroundPosition: 'center',
                                            },
                                          }
                                          : {
                                            side: 'top',
                                            sideOffset: 4
                                          })}
                                    >
                                      {isSpecialTooltipService ? (
                                        renderPriceTooltipContent()
                                      ) : service.slug === 'outsourcing-it' || service.slug === 'serwis-laptopow' || service.slug === 'serwis-komputerow-stacjonarnych' || service.slug === 'serwis-drukarek-3d' || service.slug === 'serwis-plotterow' ? (
                                        <>
                                          <div className="absolute inset-0 bg-black/50 z-0" />
                                          <p className="relative z-10 max-w-xs text-sm leading-snug text-white font-medium">
                                            cena z VAT (brutto)
                                          </p>
                                        </>
                                      ) : (
                                        <p className="max-w-xs text-sm leading-snug text-[#f8f1db]">
                                          {priceTooltip}
                                        </p>
                                      )}
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </TooltipProvider>
                              {service.slug !== 'serwis-laptopow' && service.slug !== 'serwis-komputerow-stacjonarnych' && service.slug !== 'serwis-drukarek-3d' && service.slug !== 'serwis-plotterow' && (
                                <span
                                  className="text-[12px] text-[#cbb27c] leading-relaxed hidden md:block"
                                  style={{
                                    opacity: 1,
                                    fontWeight: 'normal',
                                    fontStyle: 'normal'
                                  }}
                                >
                                  (kategorie urządzeń)
                                </span>
                              )}
                            </div>
                          </div>

                          <div
                            className={cn(
                              'items-center justify-center hidden md:flex',
                              section.id === 'diagnoza' || section.id === 'dojazd' || section.id === 'konserwacja' || section.id === 'naprawy'
                                ? 'min-w-[120px]'
                                : 'min-w-0'
                            )}
                          >
                            <div className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] text-center hidden group-data-[state=open]:block leading-[1.05]">
                              <div className="leading-[1.05]">Czas</div>
                              <div className="leading-[1.05]">realizacji</div>
                            </div>
                          </div>
                        </div>

                      </>
                    )}
                  </div>
                </AccordionTrigger>

                <AccordionContent
                  data-naprawy-section={section.id === 'naprawy' ? 'true' : undefined}
                  className={cn(
                    "pb-3 max-h-[70vh] overflow-y-auto scroll-smooth accordion-scroll relative z-10 md:border-t md:border-[rgba(200,169,107,0.3)] md:mt-2 md:border-x md:border-[rgba(191,167,106,0.3)] md:mx-2 md:mb-2 md:rounded-b-lg",
                    (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && isSectionOpen(section.id)
                      ? "md:pt-3 pt-0"
                      : "pt-3"
                  )}
                >
                  {section.subcategories ? (
                    (() => {
                      const isRepairSection = section.id === 'naprawy'
                      const isFaqSection = section.id === 'faq'
                      const subcategoryItems = section.subcategories.map((subcategory, index) => (
                        <AccordionItem
                          key={subcategory.id}
                          value={subcategory.id}
                          data-naprawy-subcategory={isRepairSection ? 'true' : undefined}
                          className={cn(
                            "border-0 last:border-b-0 last:mb-0 group scroll-mt-[100px]",
                            section.id === 'faq'
                              ? `border-b border-[#bfa76a]/30 mb-0.5 pb-0.5 ${index === 0 ? 'border-t border-[#bfa76a]/30 pt-0.5' : ''}`
                              : (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                ? `border-b border-white/20 mb-1 pb-1 md:mb-1.5 md:pb-1.5 ${index === 0 ? 'border-t border-white/20 md:pt-1.5' : ''}`
                                : `border-b border-white/20 mb-1.5 pb-1.5 ${index === 0 ? 'border-t border-white/20 pt-1.5' : ''}`,
                          )}
                          ref={node => {
                            subcategoryRefs.current[subcategory.id] = node
                          }}
                        >
                          <AccordionTrigger
                            className={cn(
                              "hover:no-underline text-left w-full !focus-visible:ring-0 !focus-visible:outline-none focus-visible:ring-transparent transition-all duration-200",
                              section.id === 'faq'
                                ? 'py-1 px-2 rounded-lg hover:border-[#ffecb3]/20'
                                : (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                  ? service.slug === 'drukarka-zastepcza'
                                    ? 'py-[1px] px-1.5 md:py-[1px] md:px-3 [&>svg]:hidden md:[&>svg]:block'
                                    : 'py-1 px-1.5 md:py-2 md:px-3 [&>svg]:hidden md:[&>svg]:block'
                                  : 'py-1.5 px-1.5 md:py-2 md:px-3',
                            )}
                          >
                            {(service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && subcategory.price ? (
                              <>
                                {/* Десктоп: grid с иконкой, текстом и тремя колонками цен */}
                                {/* Фиксированные элементы (всего 108px): */}
                                {/* - Padding слева: 12px (md:px-3) - уже учтен в AccordionTrigger */}
                                {/* - Иконка: 40px */}
                                {/* - Расстояние между иконкой и текстом: 16px (gap-4) */}
                                {/* - Стрелка справа: 40px (gap + padding + стрелка) */}
                                {/* Grid контейнер занимает calc(100% - 40px) для учета стрелки справа */}
                                {/* Пропорции колонок подобраны вручную для точного совпадения центров: */}
                                {/* Иконка (40px) + Gap (16px) + Текст (2.15fr) + Цены (0.95fr каждая) */}
                                <div className={cn(
                                  "hidden md:flex items-center",
                                  service.slug === 'drukarka-zastepcza' && "gap-[1px]"
                                )} style={{
                                  width: 'calc(100% - 40px)' // Вычитаем место для стрелки справа (40px)
                                }}>
                                  {(() => {
                                    // Создаем или получаем refs для этого подменю
                                    const subcategoryKey = `${section.id}-${subcategory.id}`
                                    const headerRefsObj = service.slug === 'wynajem-drukarek' ? wynajemHeaderRefs : drukarkaZastepczaHeaderRefs
                                    if (!headerRefsObj.current[subcategoryKey]) {
                                      headerRefsObj.current[subcategoryKey] = {
                                        icon: React.createRef<HTMLDivElement>(),
                                        text: React.createRef<HTMLDivElement>(),
                                        prices: [
                                          React.createRef<HTMLDivElement>(),
                                          React.createRef<HTMLDivElement>(),
                                          React.createRef<HTMLDivElement>(),
                                        ],
                                      }
                                    }
                                    const headerRefs = headerRefsObj.current[subcategoryKey]

                                    const isA3DrukarkiMonoHeader = subcategory.id === 'a3-drukarki-mono'
                                    const isA3DrukarkiKolorHeader = subcategory.id === 'a3-drukarki-kolor'

                                    return (
                                      <>
                                        <div
                                          ref={headerRefs.icon}
                                          className={cn(
                                            "flex-shrink-0 flex items-center justify-center",
                                            "h-[60px] w-[60px] md:h-[50px] md:w-[50px]"
                                          )}
                                        >
                                          <Image
                                            src={getIconForSubcategory(subcategory.id) || getIconForSection(section.id)}
                                            alt={subcategory.title}
                                            width={100}
                                            height={100}
                                            className={cn(
                                              "w-full h-full opacity-90 group-hover:opacity-100 transition-opacity",
                                              service.slug === 'drukarka-zastepcza' ? "object-cover" : "object-contain"
                                            )}
                                            unoptimized
                                          />
                                        </div>
                                        <div
                                          ref={headerRefs.text}
                                          data-measure-text={subcategory.id === 'a3-mfu-kolor' && service.slug === 'drukarka-zastepcza' ? 'true' : undefined}
                                          className={cn(
                                            "min-w-0"
                                          )}
                                          style={{ width: 'calc((100% - 40px - 8px) * 0.4)' }}
                                        >
                                          <h4 className={cn(
                                            "text-lg font-semibold text-[#ffffff] font-table-main leading-[1.3]"
                                          )}>
                                            {(() => {
                                              const title = subcategory.title
                                              // Для wynajem-drukarek и drukarka-zastepcza подкатегорий части в скобках оформляем в том же стиле
                                              const isWynajemSubcategory = (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                              const match = title.match(/^(.+?)\s*\((.+?)\)$/)
                                              if (match) {
                                                const mainPart = match[1].trim()
                                                const bracketPart = match[2].trim()
                                                if (isWynajemSubcategory) {
                                                  // Для wynajem - вся часть в скобках в том же стиле
                                                  return (
                                                    <>
                                                      {mainPart}{' '}
                                                      <span className="text-lg font-semibold text-[#ffffff] font-table-main leading-[1.3]">
                                                        ({bracketPart})
                                                      </span>
                                                    </>
                                                  )
                                                } else {
                                                  // Для других секций - унифицированный стиль как у SEO-текста
                                                  return (
                                                    <>
                                                      {mainPart}{' '}
                                                      <span className="text-[14px] text-[#cbb27c] leading-relaxed">
                                                        ({bracketPart})
                                                      </span>
                                                    </>
                                                  )
                                                }
                                              }
                                              return title
                                            })()}
                                          </h4>
                                          <div
                                            data-subcategory-link
                                            className="flex items-center gap-2 text-[#bfa76a] text-xs font-serif group-hover:translate-x-1 transition-transform whitespace-nowrap"
                                          >
                                            <span>Zobacz szczegóły</span>
                                            <ArrowRight className="w-3 h-3 flex-shrink-0" />
                                          </div>
                                        </div>
                                        {(() => {
                                          // Для drukarki-mono на drukarka-zastepcza показываем две цены (одну с данными, вторую пустую) для выравнивания с mono+kolor
                                          if (service.slug === 'drukarka-zastepcza' && subcategory.id === 'drukarki-mono') {
                                            return (
                                              <>
                                                <div
                                                  ref={headerRefs.prices[0]}
                                                  className={cn(
                                                    "flex flex-col items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
                                                  )}
                                                  style={{ width: `22.5%`, marginLeft: '8px' }}
                                                >
                                                  <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3]">
                                                    <span className="inline-flex items-start">
                                                      <span>0,05</span>
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                        style={{ marginTop: '-3px' }}
                                                      >
                                                        zł
                                                      </span>
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                      >
                                                        (mono)
                                                      </span>
                                                    </span>
                                                  </div>
                                                </div>
                                                <div
                                                  ref={headerRefs.prices[1]}
                                                  className={cn(
                                                    "flex flex-col items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
                                                  )}
                                                  style={{ width: `22.5%`, marginLeft: '0' }}
                                                >
                                                  {/* Пустой столбец для выравнивания */}
                                                </div>
                                              </>
                                            )
                                          }
                                          // Для mfu-mono на drukarka-zastepcza показываем две цены (одну с данными, вторую пустую) для выравнивания с mono+kolor
                                          if (service.slug === 'drukarka-zastepcza' && subcategory.id === 'mfu-mono') {
                                            return (
                                              <>
                                                <div
                                                  ref={headerRefs.prices[0]}
                                                  className={cn(
                                                    "flex flex-col items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
                                                  )}
                                                  style={{ width: `22.5%`, marginLeft: '8px' }}
                                                >
                                                  <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3]">
                                                    <span className="inline-flex items-start">
                                                      <span>0,08</span>
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                        style={{ marginTop: '-3px' }}
                                                      >
                                                        zł
                                                      </span>
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                      >
                                                        (mono)
                                                      </span>
                                                    </span>
                                                  </div>
                                                </div>
                                                <div
                                                  ref={headerRefs.prices[1]}
                                                  className={cn(
                                                    "flex flex-col items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
                                                  )}
                                                  style={{ width: `22.5%`, marginLeft: '0' }}
                                                >
                                                  {/* Пустой столбец для выравнивания */}
                                                </div>
                                              </>
                                            )
                                          }
                                          // Для остальных - как было
                                          return subcategory.price.split(' / ').map((price, idx) => {
                                            // Определяем label для drukarka-zastepcza
                                            const isDrukarkaZastepczaA4 = service.slug === 'drukarka-zastepcza' && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                            const isDrukarkaZastepczaA3 = service.slug === 'drukarka-zastepcza' && section.id === 'akordeon-2'
                                            const isA3DrukarkiMono = subcategory.id === 'a3-drukarki-mono'
                                            const isMonoKolor = subcategory.title.includes('mono+kolor')
                                            const isMono = subcategory.title.includes('mono') && !isMonoKolor

                                            // Для a3-drukarki-mono, a3-drukarki-kolor, a3-mfu-mono, a3-mfu-kolor: первый контейнер с "A4", второй с "A3"
                                            const isA3DrukarkiKolor = subcategory.id === 'a3-drukarki-kolor'
                                            const isA3MfuMono = subcategory.id === 'a3-mfu-mono'
                                            const isA3MfuKolor = subcategory.id === 'a3-mfu-kolor'
                                            let priceLabel = ''
                                            let secondPriceLabel = ''
                                            let secondPrice = '0'

                                            if (isDrukarkaZastepczaA4) {
                                              if (isA3DrukarkiMono || isA3DrukarkiKolor) {
                                                // Для a3-drukarki-mono и a3-drukarki-kolor: первый контейнер - "(mono A4)" или "(kolor A4)", второй - "(mono A3)" или "(kolor A3)"
                                                if (idx === 0) {
                                                  priceLabel = '(mono A4)'
                                                  secondPriceLabel = '(mono A3)'
                                                  secondPrice = '0,10'
                                                } else {
                                                  priceLabel = '(kolor A4)'
                                                  secondPriceLabel = '(kolor A3)'
                                                  secondPrice = '0,53'
                                                }
                                              } else if (isA3MfuMono) {
                                                // Для a3-mfu-mono: первый контейнер - "(mono A4)", второй - "(mono A3)"
                                                priceLabel = '(mono A4)'
                                                secondPriceLabel = '(mono A3)'
                                                secondPrice = '0,14'
                                              } else if (isA3MfuKolor) {
                                                // Для a3-mfu-kolor: первый контейнер - "(mono A4)" или "(kolor A4)", второй - "(mono A3)" или "(kolor A3)"
                                                if (idx === 0) {
                                                  priceLabel = '(mono A4)'
                                                  secondPriceLabel = '(mono A3)'
                                                  secondPrice = '0,14'
                                                } else {
                                                  priceLabel = '(kolor A4)'
                                                  secondPriceLabel = '(kolor A3)'
                                                  secondPrice = '0,60'
                                                }
                                              } else if (isMonoKolor) {
                                                priceLabel = idx === 0 ? '(mono)' : '(kolor)'
                                                secondPriceLabel = priceLabel
                                              } else if (isMono) {
                                                priceLabel = '(mono)'
                                                secondPriceLabel = priceLabel
                                              }
                                            }

                                            return (
                                              <div
                                                key={idx}
                                                ref={headerRefs.prices[idx]}
                                                data-measure-price={subcategory.id === 'a3-mfu-kolor' && service.slug === 'drukarka-zastepcza' ? `${idx}` : undefined}
                                                data-price-value={subcategory.id === 'a3-mfu-kolor' && service.slug === 'drukarka-zastepcza' ? price : undefined}
                                                className={cn(
                                                  "flex flex-col items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
                                                )}
                                                style={{
                                                  width: `22.5%`,
                                                  marginLeft: idx === 0 ? '8px' : '0'
                                                }}
                                              >
                                                <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3]">
                                                  <span className="inline-flex items-start">
                                                    <span>{price}</span>
                                                    {(service.slug === 'drukarka-zastepcza' || isSubcategoryOpen(section.id, subcategory.id)) && (
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                        style={{ marginTop: '-3px' }}
                                                      >
                                                        zł
                                                      </span>
                                                    )}
                                                    {priceLabel && (
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                      >
                                                        {priceLabel}
                                                      </span>
                                                    )}
                                                  </span>
                                                </div>
                                                {/* Второй контейнер для akordeon-2 */}
                                                {isDrukarkaZastepczaA3 && (isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor ? secondPriceLabel : priceLabel) && (
                                                  <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3] mt-1">
                                                    <span className="inline-flex items-start">
                                                      <span>{(isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor) ? secondPrice : '0'}</span>
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                        style={{ marginTop: '-3px' }}
                                                      >
                                                        zł
                                                      </span>
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                      >
                                                        {(isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor) ? secondPriceLabel : priceLabel}
                                                      </span>
                                                    </span>
                                                  </div>
                                                )}
                                              </div>
                                            )
                                          })

                                          // Если это drukarka-zastepcza и только одна цена (не mono+kolor и не A3 подкатегории), добавляем пустой столбец для выравнивания
                                          if (!subcategory.price) return null

                                          const isA3DrukarkiMonoCheck = subcategory.id === 'a3-drukarki-mono'
                                          const isA3DrukarkiKolorCheck = subcategory.id === 'a3-drukarki-kolor'
                                          const isA3MfuMonoCheck = subcategory.id === 'a3-mfu-mono'
                                          const isA3MfuKolorCheck = subcategory.id === 'a3-mfu-kolor'

                                          const prices = subcategory.price!.split(' / ')
                                          const isSinglePrice = prices.length === 1
                                          const isNotA3Subcategory = !isA3DrukarkiMonoCheck && !isA3DrukarkiKolorCheck && !isA3MfuMonoCheck && !isA3MfuKolorCheck

                                          if (service.slug === 'drukarka-zastepcza' && isSinglePrice && isNotA3Subcategory) {
                                            const priceElements = subcategory.price!.split(' / ').map((price, idx) => {
                                              const isDrukarkaZastepczaA4 = service.slug === 'drukarka-zastepcza' && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                              const isMonoKolor = subcategory.title.includes('mono+kolor')
                                              const isMono = subcategory.title.includes('mono') && !isMonoKolor
                                              let priceLabel = ''

                                              if (isDrukarkaZastepczaA4) {
                                                if (isMono) {
                                                  priceLabel = '(mono)'
                                                }
                                              }

                                              return (
                                                <div
                                                  key={idx}
                                                  ref={headerRefs.prices[idx]}
                                                  className={cn(
                                                    "flex flex-col items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
                                                  )}
                                                  style={{ width: `22.5%`, marginLeft: idx === 0 ? '8px' : '0' }}
                                                >
                                                  <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3]">
                                                    <span className="inline-flex items-start">
                                                      <span>{price}</span>
                                                      {(service.slug === 'drukarka-zastepcza' || isSubcategoryOpen(section.id, subcategory.id)) && (
                                                        <span
                                                          className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                          style={{ marginTop: '-3px' }}
                                                        >
                                                          zł
                                                        </span>
                                                      )}
                                                      {priceLabel && (
                                                        <span
                                                          className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                        >
                                                          {priceLabel}
                                                        </span>
                                                      )}
                                                    </span>
                                                  </div>
                                                </div>
                                              )
                                            })

                                            return (
                                              <>
                                                {priceElements}
                                                <div
                                                  ref={headerRefs.prices[1]}
                                                  className={cn(
                                                    "flex flex-col items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
                                                  )}
                                                  style={{ width: `22.5%`, marginLeft: '0' }}
                                                >
                                                  {/* Пустой столбец для выравнивания */}
                                                </div>
                                              </>
                                            )
                                          }

                                          return subcategory.price!.split(' / ').map((price, idx) => {
                                            // Определяем label для drukarka-zastepcza
                                            const isDrukarkaZastepczaA4 = service.slug === 'drukarka-zastepcza' && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                            const isDrukarkaZastepczaA3 = service.slug === 'drukarka-zastepcza' && section.id === 'akordeon-2'
                                            const isA3DrukarkiMono = subcategory.id === 'a3-drukarki-mono'
                                            const isMonoKolor = subcategory.title.includes('mono+kolor')
                                            const isMono = subcategory.title.includes('mono') && !isMonoKolor

                                            // Для a3-drukarki-mono, a3-drukarki-kolor, a3-mfu-mono, a3-mfu-kolor: первый контейнер с "A4", второй с "A3"
                                            const isA3DrukarkiKolor = subcategory.id === 'a3-drukarki-kolor'
                                            const isA3MfuMono = subcategory.id === 'a3-mfu-mono'
                                            const isA3MfuKolor = subcategory.id === 'a3-mfu-kolor'
                                            let priceLabel = ''
                                            let secondPriceLabel = ''
                                            let secondPrice = '0'

                                            if (isDrukarkaZastepczaA4) {
                                              if (isA3DrukarkiMono || isA3DrukarkiKolor) {
                                                // Для a3-drukarki-mono и a3-drukarki-kolor: первый контейнер - "(mono A4)" или "(kolor A4)", второй - "(mono A3)" или "(kolor A3)"
                                                if (idx === 0) {
                                                  priceLabel = '(mono A4)'
                                                  secondPriceLabel = '(mono A3)'
                                                  secondPrice = '0,10'
                                                } else {
                                                  priceLabel = '(kolor A4)'
                                                  secondPriceLabel = '(kolor A3)'
                                                  secondPrice = '0,53'
                                                }
                                              } else if (isA3MfuMono) {
                                                // Для a3-mfu-mono: первый контейнер - "(mono A4)", второй - "(mono A3)"
                                                priceLabel = '(mono A4)'
                                                secondPriceLabel = '(mono A3)'
                                                secondPrice = '0,14'
                                              } else if (isA3MfuKolor) {
                                                // Для a3-mfu-kolor: первый контейнер - "(mono A4)" или "(kolor A4)", второй - "(mono A3)" или "(kolor A3)"
                                                if (idx === 0) {
                                                  priceLabel = '(mono A4)'
                                                  secondPriceLabel = '(mono A3)'
                                                  secondPrice = '0,14'
                                                } else {
                                                  priceLabel = '(kolor A4)'
                                                  secondPriceLabel = '(kolor A3)'
                                                  secondPrice = '0,60'
                                                }
                                              } else if (isMonoKolor) {
                                                priceLabel = idx === 0 ? '(mono)' : '(kolor)'
                                                secondPriceLabel = priceLabel
                                              } else if (isMono) {
                                                priceLabel = '(mono)'
                                                secondPriceLabel = priceLabel
                                              }
                                            }

                                            return (
                                              <div
                                                key={idx}
                                                ref={headerRefs.prices[idx]}
                                                className={cn(
                                                  "flex flex-col items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
                                                )}
                                                style={{ width: `22.5%`, marginLeft: idx === 0 ? '8px' : '0' }}
                                              >
                                                <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3]">
                                                  <span className="inline-flex items-start">
                                                    <span>{price}</span>
                                                    {(service.slug === 'drukarka-zastepcza' || isSubcategoryOpen(section.id, subcategory.id)) && (
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                        style={{ marginTop: '-3px' }}
                                                      >
                                                        zł
                                                      </span>
                                                    )}
                                                    {priceLabel && (
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                      >
                                                        {priceLabel}
                                                      </span>
                                                    )}
                                                  </span>
                                                </div>
                                                {/* Второй контейнер для akordeon-2 */}
                                                {isDrukarkaZastepczaA3 && (isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor ? secondPriceLabel : priceLabel) && (
                                                  <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3] mt-1">
                                                    <span className="inline-flex items-start">
                                                      <span>{(isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor) ? secondPrice : '0'}</span>
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                        style={{ marginTop: '-3px' }}
                                                      >
                                                        zł
                                                      </span>
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                      >
                                                        {(isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor) ? secondPriceLabel : priceLabel}
                                                      </span>
                                                    </span>
                                                  </div>
                                                )}
                                              </div>
                                            )
                                          })
                                        })()}
                                      </>
                                    )
                                  })()}
                                </div>
                                <div className={cn(
                                  "md:hidden flex flex-col w-full",
                                  (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && isSectionOpen(section.id)
                                    ? "gap-0.5"
                                    : "gap-2"
                                )}>
                                  <div className={cn(
                                    "flex gap-[1px]",
                                    (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && isSectionOpen(section.id)
                                      ? "items-center"
                                      : "items-start"
                                  )}>
                                    <div className={cn(
                                      "flex-shrink-0 flex items-center justify-center",
                                      "h-[60px] w-[60px]"
                                    )}>
                                      <Image
                                        src={getIconForSubcategory(subcategory.id) || getIconForSection(section.id)}
                                        alt={subcategory.title}
                                        width={100}
                                        height={100}
                                        className={cn(
                                          "w-full h-full opacity-90 group-hover:opacity-100 transition-opacity",
                                          service.slug === 'drukarka-zastepcza' ? "object-cover" : "object-contain"
                                        )}
                                        unoptimized
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0" style={{ width: '48%', maxWidth: '48%' }}>
                                      <h4 className="text-lg font-semibold text-[#ffffff] font-table-main leading-[1.2]">
                                        {(() => {
                                          const title = subcategory.title
                                          // Для wynajem-drukarek и drukarka-zastepcza подкатегорий части в скобках оформляем в том же стиле
                                          const isWynajemSubcategory = (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                          const match = title.match(/^(.+?)\s*\((.+?)\)$/)
                                          if (match) {
                                            const mainPart = match[1].trim()
                                            const bracketPart = match[2].trim()
                                            if (isWynajemSubcategory) {
                                              // Для wynajem на мобильных - переносим на две строки для экономии места
                                              return (
                                                <>
                                                  <span className="text-lg font-semibold text-[#ffffff] font-table-main leading-[1.2]">
                                                    {mainPart}
                                                  </span>
                                                  <br className="md:hidden" />
                                                  <span className="text-lg font-semibold text-[#ffffff] font-table-main leading-[1.2]">
                                                    ({bracketPart})
                                                  </span>
                                                </>
                                              )
                                            } else {
                                              // Для других секций - унифицированный стиль как у SEO-текста
                                              return (
                                                <>
                                                  {mainPart}{' '}
                                                  <span className="text-[14px] text-[#cbb27c] leading-relaxed">
                                                    ({bracketPart})
                                                  </span>
                                                </>
                                              )
                                            }
                                          }
                                          return title
                                        })()}
                                      </h4>
                                    </div>
                                    {/* Цены справа - только на мобильных, выровнены с таблицей внутри аккордеона */}
                                    {/* Блок занимает 100% оставшегося места, внутри три равные колонки */}
                                    <div className="flex items-center flex-1">
                                      {(() => {
                                        // Для drukarki-mono на drukarka-zastepcza показываем только одну цену "0,05 zł"
                                        if (service.slug === 'drukarka-zastepcza' && subcategory.id === 'drukarki-mono') {
                                          return (
                                            <div
                                              className="flex items-center justify-center text-center border-l-2 border-[#8b7a5a] pl-2 pr-2 flex-1"
                                              style={{
                                                boxSizing: 'border-box'
                                              }}
                                            >
                                              <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3]">
                                                <span className="inline-flex items-start">
                                                  <span>0,05</span>
                                                  <span
                                                    className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                    style={{ marginTop: '-3px' }}
                                                  >
                                                    zł
                                                  </span>
                                                  <span
                                                    className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                  >
                                                    (mono)
                                                  </span>
                                                </span>
                                              </div>
                                            </div>
                                          )
                                        }
                                        // Для остальных - как было
                                        const pricesArray = subcategory.price.split(' / ')
                                        return pricesArray.map((price, idx) => {
                                          // Определяем label для drukarka-zastepcza
                                          const isDrukarkaZastepczaA4 = service.slug === 'drukarka-zastepcza' && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                          const isDrukarkaZastepczaA3 = service.slug === 'drukarka-zastepcza' && section.id === 'akordeon-2'
                                          const isA3DrukarkiMono = subcategory.id === 'a3-drukarki-mono'
                                          const isMonoKolor = subcategory.title.includes('mono+kolor')
                                          const isMono = subcategory.title.includes('mono') && !isMonoKolor

                                          // Для a3-drukarki-mono, a3-drukarki-kolor, a3-mfu-mono, a3-mfu-kolor: первый контейнер с "A4", второй с "A3"
                                          const isA3DrukarkiKolor = subcategory.id === 'a3-drukarki-kolor'
                                          const isA3MfuMono = subcategory.id === 'a3-mfu-mono'
                                          const isA3MfuKolor = subcategory.id === 'a3-mfu-kolor'
                                          let priceLabel = ''
                                          let secondPriceLabel = ''
                                          let secondPrice = '0'

                                          if (isDrukarkaZastepczaA4) {
                                            if (isA3DrukarkiMono || isA3DrukarkiKolor) {
                                              // Для a3-drukarki-mono и a3-drukarki-kolor: первый контейнер - "(mono A4)" или "(kolor A4)", второй - "(mono A3)" или "(kolor A3)"
                                              if (idx === 0) {
                                                priceLabel = '(mono A4)'
                                                secondPriceLabel = '(mono A3)'
                                                secondPrice = '0,10'
                                              } else {
                                                priceLabel = '(kolor A4)'
                                                secondPriceLabel = '(kolor A3)'
                                                secondPrice = '0,53'
                                              }
                                            } else if (isA3MfuMono) {
                                              // Для a3-mfu-mono: первый контейнер - "(mono A4)", второй - "(mono A3)"
                                              priceLabel = '(mono A4)'
                                              secondPriceLabel = '(mono A3)'
                                              secondPrice = '0,14'
                                            } else if (isA3MfuKolor) {
                                              // Для a3-mfu-kolor: первый контейнер - "(mono A4)" или "(kolor A4)", второй - "(mono A3)" или "(kolor A3)"
                                              if (idx === 0) {
                                                priceLabel = '(mono A4)'
                                                secondPriceLabel = '(mono A3)'
                                                secondPrice = '0,14'
                                              } else {
                                                priceLabel = '(kolor A4)'
                                                secondPriceLabel = '(kolor A3)'
                                                secondPrice = '0,60'
                                              }
                                            } else if (isMonoKolor) {
                                              priceLabel = idx === 0 ? '(mono)' : '(kolor)'
                                              secondPriceLabel = priceLabel
                                            } else if (isMono) {
                                              priceLabel = '(mono)'
                                              secondPriceLabel = priceLabel
                                            }
                                          }

                                          const hasTwoPrices = (subcategory.price?.split(' / ') || []).length === 2
                                          // Для akordeon-2 метки всегда снизу на мобильных
                                          const shouldShowLabelBelow = isDrukarkaZastepczaA3 || hasTwoPrices

                                          return (
                                            <div
                                              key={idx}
                                              className={cn(
                                                "flex flex-col items-center justify-center text-center border-l-2 border-[#8b7a5a] pl-2 pr-2 flex-1"
                                              )}
                                              style={{
                                                boxSizing: 'border-box'
                                              }}
                                            >
                                              <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3]">
                                                <span className="inline-flex items-start">
                                                  <span>{price}</span>
                                                  {(service.slug === 'drukarka-zastepcza' || isSubcategoryOpen(section.id, subcategory.id)) && (
                                                    <span
                                                      className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                      style={{ marginTop: '-3px' }}
                                                    >
                                                      zł
                                                    </span>
                                                  )}
                                                  {priceLabel && !shouldShowLabelBelow && (
                                                    <span
                                                      className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                    >
                                                      {priceLabel}
                                                    </span>
                                                  )}
                                                </span>
                                              </div>
                                              {priceLabel && shouldShowLabelBelow && (
                                                <span
                                                  className="text-[14px] text-[#cbb27c] leading-relaxed mt-0.5"
                                                >
                                                  {priceLabel}
                                                </span>
                                              )}
                                              {/* Второй контейнер для akordeon-2 */}
                                              {isDrukarkaZastepczaA3 && (isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor ? secondPriceLabel : priceLabel) && (
                                                <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3] mt-1">
                                                  <span className="inline-flex items-start">
                                                    <span>{(isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor) ? secondPrice : '0'}</span>
                                                    <span
                                                      className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                      style={{ marginTop: '-3px' }}
                                                    >
                                                      zł
                                                    </span>
                                                    {!shouldShowLabelBelow && (
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                      >
                                                        {(isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor) ? secondPriceLabel : priceLabel}
                                                      </span>
                                                    )}
                                                  </span>
                                                  {shouldShowLabelBelow && (
                                                    <span
                                                      className="text-[14px] text-[#cbb27c] leading-relaxed mt-0.5"
                                                    >
                                                      {(isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor) ? secondPriceLabel : priceLabel}
                                                    </span>
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          )
                                        })
                                      })()}
                                    </div>
                                  </div>
                                  <div className="pl-[52px] -mt-0.5">
                                    <div
                                      data-subcategory-link
                                      className="flex items-center gap-2 text-[#bfa76a] text-xs font-serif group-hover:translate-x-1 transition-transform whitespace-nowrap"
                                    >
                                      <span>Zobacz szczegóły</span>
                                      <ArrowRight className="w-3 h-3 flex-shrink-0" />
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className={`flex items-center w-full ${service.slug === 'wynajem-drukarek' && (section.id === 'akordeon-1' || section.id === 'akordeon-2') ? 'gap-2.5 md:gap-3' : 'gap-3'}`}>
                                {service.slug === 'wynajem-drukarek' && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && (
                                  <div className="mr-2 h-[60px] w-[60px] md:h-[50px] md:w-[50px] flex-shrink-0 flex items-center justify-center">
                                    <Image
                                      src={getIconForSubcategory(subcategory.id) || getIconForSection(section.id)}
                                      alt={subcategory.title}
                                      width={100}
                                      height={100}
                                      className="object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                                      unoptimized
                                    />
                                  </div>
                                )}
                                <div className="flex-1 w-full min-w-0">
                                  <div>
                                    <h4
                                      className={`font-table-main ${(service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') ? 'leading-[1.2] md:leading-[1.3]' : 'leading-[1.3]'} ${section.id === 'faq'
                                        ? 'text-[15px] md:text-[16px] font-semibold text-[#ffffff] mb-0'
                                        : 'text-lg font-semibold text-[#ffffff]'
                                        }`}
                                    >
                                      {(() => {
                                        const title = subcategory.title
                                        // Применяем стиль для wynajem-drukarek и drukarka-zastepcza
                                        if ((service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2')) {
                                          const match = title.match(/^(.+?)\s*\((.+?)\)$/)
                                          if (match) {
                                            const mainPart = match[1].trim()
                                            const bracketPart = match[2].trim()
                                            // Для wynajem и drukarka-zastepcza - вся часть в скобках в том же стиле, что и основная часть
                                            return (
                                              <>
                                                {mainPart}{' '}
                                                <span className={`text-lg font-semibold text-[#ffffff] font-table-main ${(service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') ? 'leading-[1.2] md:leading-[1.3]' : 'leading-[1.3]'}`}>
                                                  ({bracketPart})
                                                </span>
                                              </>
                                            )
                                          }
                                        }
                                        return title
                                      })()}
                                    </h4>
                                    {subcategory.subtitle && section.id !== 'faq' && (
                                      renderParenthesesText(subcategory.subtitle, '12px')
                                    )}
                                  </div>
                                  {section.id !== 'faq' && (
                                    <>
                                      <div
                                        data-subcategory-link
                                        className="flex items-center gap-2 text-[#bfa76a] text-xs font-serif group-hover:translate-x-1 transition-transform whitespace-nowrap"
                                      >
                                        <span>
                                          {(service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                            ? 'Zobacz szczegóły'
                                            : 'Zobacz cennik'}
                                        </span>
                                        <ArrowRight className="w-3 h-3 flex-shrink-0" />
                                      </div>
                                    </>
                                  )}
                                </div>
                                {(service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && subcategory.price && (
                                  <div className="hidden md:flex items-center justify-end flex-shrink-0 min-w-[200px]">
                                    <div className="font-inter text-[14px] text-[rgba(255,255,255,0.9)] leading-[1.3] text-right whitespace-nowrap">
                                      {subcategory.price.split(' / ').map((price, idx, arr) => (
                                        <span key={idx}>
                                          {price}
                                          {idx < arr.length - 1 && ' / '}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </AccordionTrigger>
                          <AccordionContent className={cn(
                            section.id === 'faq' ? 'pt-0.5' : 'pt-1.5',
                            (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && isSectionOpen(section.id) && "md:pt-1.5 pt-0.5"
                          )}>
                            {subcategory.answer ? (
                              <div
                                className={`font-cormorant text-base whitespace-pre-line text-[#fff8e7] ${section.id === 'faq' ? 'pt-0.5 pl-4 leading-snug' : 'pt-2 pb-1.5 px-1 leading-normal'
                                  }`}
                              >
                                {subcategory.answer}
                              </div>
                            ) : subcategory.items.length === 0 ? (
                              (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') ? (
                                (() => {
                                  const subcategoryKey = `${section.id}-${subcategory.id}`
                                  const headerRefs = service.slug === 'wynajem-drukarek'
                                    ? wynajemHeaderRefs.current[subcategoryKey]
                                    : drukarkaZastepczaHeaderRefs.current[subcategoryKey]
                                  if (headerRefs) {
                                    return <WynajemTable subcategoryId={subcategory.id} headerRefs={headerRefs} serviceSlug={service.slug} />
                                  }
                                  return null
                                })()
                              ) : (
                                <div className="rounded-lg outline outline-1 outline-[#bfa76a]/10 md:outline-none md:border md:border-[#bfa76a]/10 overflow-hidden min-h-[100px] p-4">
                                  {(service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') ? (
                                    <div className="text-center text-[rgba(255,255,245,0.85)] font-cormorant text-base">
                                      Szczegóły w przygotowaniu
                                    </div>
                                  ) : null}
                                </div>
                              )
                            ) : (
                              <div className="rounded-lg outline outline-1 outline-[#bfa76a]/10 md:outline-none md:border md:border-[#bfa76a]/10 overflow-hidden">
                                {/* Мобильная версия - flex layout */}
                                <div className="block md:hidden">
                                  {subcategory.items.map((item, idx) =>
                                    renderMobileServiceRow(
                                      item,
                                      idx,
                                      idx === 0,
                                      idx === subcategory.items.length - 1,
                                      shouldHighlightPrices,
                                      parseServiceText,
                                    ),
                                  )}
                                </div>
                                {/* Десктопная версия - HTML таблица */}
                                <div className="hidden md:block">
                                  <Table className="table-fixed border-collapse">
                                    {(service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') ? (
                                      <colgroup>
                                        <col style={{ width: '70%' }} />
                                        <col style={{ width: '30%' }} />
                                      </colgroup>
                                    ) : (
                                      <colgroup>
                                        <col style={{ width: '67%' }} />
                                        <col style={{ width: '16.5%' }} />
                                        <col style={{ width: '16.5%' }} />
                                      </colgroup>
                                    )}
                                    <TableBody>
                                      {subcategory.items.map((item, idx) => (
                                        <TableRow
                                          key={idx}
                                          className={`border-white/20 border-b border-white/30 ${idx === 0 ? 'border-t border-white/30' : ''}`}
                                        >
                                          <TableCell className="font-table-main text-[rgba(255,255,245,0.85)] py-1 pl-2 pr-2 !whitespace-normal w-auto max-w-[67%] leading-[1.3] tracking-normal overflow-hidden">
                                            {(() => {
                                              const parsed = parseServiceText(item.service)
                                              return (
                                                <div className="service-description-text">
                                                  <div className="text-[16px] text-white service-description-text leading-[1.3]">
                                                    {parsed.main}
                                                  </div>
                                                  {parsed.parentheses && renderParenthesesText(parsed.parentheses, '14px')}
                                                </div>
                                              )
                                            })()}
                                          </TableCell>
                                          <TableCell
                                            className={cn(
                                              'py-1 pl-2 pr-2 align-middle leading-[1.3] text-center w-auto min-w-[80px] md:pl-4',
                                              (subcategory.id === 'opcjonalne' || subcategory.title?.includes('opcjonalne')) && 'md:translate-x-[8px]',
                                              shouldHighlightPrices
                                                ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.65)] brightness-110'
                                                : ''
                                            )}
                                          >
                                            {renderPriceLines(item.price, item.link)}
                                          </TableCell>
                                          {!((service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2')) && (
                                            <TableCell className={cn(
                                              'text-center py-1 pl-2 pr-2 align-middle leading-[1.3] md:pl-4',
                                              (subcategory.id === 'opcjonalne' || subcategory.title?.includes('opcjonalne')) && 'md:translate-x-[8px]'
                                            )}>
                                              {renderDurationValue(item.duration)}
                                            </TableCell>
                                          )}
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))

                      if (isRepairSection) {
                        return (
                          <Accordion
                            type="single"
                            collapsible
                            value={getSubcategoryValue(section.id)}
                            onValueChange={value => handleSubcategoryChange(section.id, value)}
                            className="w-full"
                            data-naprawy-accordion="true"
                          >
                            {subcategoryItems}
                          </Accordion>
                        )
                      }

                      if (isFaqSection) {
                        return (
                          <Accordion
                            type="single"
                            collapsible
                            value={openFaq ?? undefined}
                            onValueChange={value => setOpenFaq(value ?? null)}
                            className="w-full"
                          >
                            {subcategoryItems}
                          </Accordion>
                        )
                      }

                      const isWynajemSection = service.slug === 'wynajem-drukarek' && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                      const isDrukarkaZastepczaSection = service.slug === 'drukarka-zastepcza' && (section.id === 'akordeon-1' || section.id === 'akordeon-2')

                      return (
                        <Accordion
                          type="multiple"
                          className="w-full"
                          value={
                            isWynajemSection ? openWynajemSubcategories :
                              isDrukarkaZastepczaSection ? openDrukarkaZastepczaSubcategories :
                                undefined
                          }
                          onValueChange={
                            isWynajemSection ? handleWynajemSubcategoryChange :
                              isDrukarkaZastepczaSection ? handleDrukarkaZastepczaSubcategoryChange :
                                undefined
                          }
                        >
                          {subcategoryItems}
                        </Accordion>
                      )
                    })()
                  ) : (
                    <div className="rounded-lg outline outline-1 outline-[#bfa76a]/10 md:outline-none md:border md:border-[#bfa76a]/10 overflow-hidden">
                      {/* Мобильная версия - flex layout */}
                      <div className="block md:hidden">
                        {section.items?.map((item, idx) =>
                          renderMobileServiceRow(
                            item,
                            idx,
                            idx === 0,
                            idx === (section.items?.length ?? 0) - 1,
                            false,
                            parseServiceText,
                          ),
                        )}
                      </div>
                      {/* Десктопная версия - HTML таблица */}
                      <div className="hidden md:block">
                        <Table className="table-fixed border-collapse">
                          <colgroup>
                            <col style={{ width: '67%' }} />
                            <col style={{ width: '16.5%' }} />
                            <col style={{ width: '16.5%' }} />
                          </colgroup>
                          <TableBody>
                            {section.items?.map((item, idx) => (
                              <TableRow
                                key={idx}
                                className={`border-white/20 border-b border-white/30 ${idx === 0 ? 'border-t border-white/30' : ''}`}
                              >
                                <TableCell className="font-table-main text-[rgba(255,255,245,0.85)] py-1 pl-2 pr-2 !whitespace-normal w-auto max-w-[67%] leading-[1.3] tracking-normal overflow-hidden">
                                  {(() => {
                                    const parsed = parseServiceText(item.service)
                                    return (
                                      <div className="service-description-text">
                                        <div className="text-[16px] text-white service-description-text leading-[1.3]">
                                          {parsed.main}
                                        </div>
                                        {parsed.parentheses && renderParenthesesText(parsed.parentheses, '14px')}
                                      </div>
                                    )
                                  })()}
                                </TableCell>
                                <TableCell className="py-1 pl-2 pr-2 align-middle leading-[1.3] text-center w-auto min-w-[80px] md:pl-4">
                                  {renderPriceLines(item.price, item.link)}
                                </TableCell>
                                <TableCell className="text-center py-1 pl-2 pr-2 align-middle leading-[1.3] md:pl-4">
                                  {renderDurationValue(item.duration)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* БОЛЬШАЯ ПОДСКАЗКА (МОДАЛЬНОЕ ОКНО) ДЛЯ МОБИЛЬНЫХ */}
      {isMobile && isSpecialTooltipService && isCategoryTooltipOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm">
          <div
            className="absolute left-0 right-0 bottom-0 top-0 overflow-y-auto"
            style={{
              paddingTop: 'calc(65px + env(safe-area-inset-top) + 16px)',
              paddingBottom: 'calc(env(safe-area-inset-bottom) + 32px)',
              WebkitOverflowScrolling: 'touch',
            }}
            onClick={(e) => {
              // Закрываем по клику на область вокруг контента (backdrop)
              if (e.target === e.currentTarget) {
                setCategoryTooltipOpen(false)
              }
            }}
          >
            {/* Контент модального окна */}
            <div className="mx-auto w-[calc(100vw-32px)] md:w-[min(calc(100vw-64px),900px)]">
              {renderPriceTooltipContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServiceAccordion