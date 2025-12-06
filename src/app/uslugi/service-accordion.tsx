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
import { Info, ArrowRight } from 'lucide-react'

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
      return '/images/A4.png'
    case 'akordeon-2':
      return '/images/A3.png'
    default:
      return manifest.P5_FAQ_pytania_i_odpowiedzi
  }
}

const getIconForSubcategory = (subcategoryId: string) => {
  switch (subcategoryId) {
    case 'drukarki-mono':
      return '/images/A4_Drukarki_mono.png'
    case 'drukarki-kolor':
      return '/images/A4_Drukarki_kolor.png'
    case 'mfu-mono':
      return '/images/A4_MFU_mono.png'
    case 'mfu-kolor':
      return '/images/A4_MFU_kolor.png'
    case 'a3-drukarki-mono':
      return '/images/DrukarkiA3A4 (mono).png'
    case 'a3-drukarki-kolor':
      return '/images/Drukarki A3A4 (mono+kolor).png'
    case 'a3-mfu-mono':
      return '/images/MFU A3A4 (mono).png'
    case 'a3-mfu-kolor':
      return '/images/MFU A3A4 (mono+kolor).png'
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

// Общая функция для рендеринга второстепенного текста (стиль как у "do ceny")
// Единый стиль для всех второстепенных описаний на страницах услуг
// Явно переопределяем все визуальные параметры, чтобы избежать наследования от родительских элементов
const renderSecondaryText = (text: string, italic: boolean = false, key?: string | number) => (
  <div
    key={key ? `${text}-${key}` : undefined}
    className={`font-table-sub text-[14px] leading-[1.3] ${italic ? 'italic' : ''}`}
    style={{ 
      color: '#ede0c4',
      opacity: 1,
      textShadow: supplementTextShadow,
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
    const isDoCenySuffix = lower === 'do ceny'
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

    if (isStandalonePlusSuffix || isSupplement || isPerMeasureSuffix || isDoCenySuffix) {
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
const renderParenthesesText = (text: string) => (
  <div
    className="font-table-sub text-[14px] leading-[1.3]"
    style={{ 
      color: '#ede0c4',
      opacity: 1,
      textShadow: supplementTextShadow,
      fontWeight: 'normal',
      fontStyle: 'normal'
    }}
  >
    ({text})
  </div>
)

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
      className={`flex items-start w-full gap-0.5 border-white/20 border-b border-white/30 ${
        isFirst ? 'border-t border-white/30' : ''
      } ${isLast ? '' : ''} py-1`}
    >
      {/* Левая колонка - описание */}
      <div className="flex-1 min-w-0 pl-0.5">
        <div className="font-table-main text-[rgba(255,255,245,0.85)] text-[15px] text-white leading-[1.3] tracking-tight">
          {parsed.main}
        </div>
        {parsed.parentheses && renderParenthesesText(parsed.parentheses)}
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
  headerRefs 
}: { 
  subcategoryId: string
  headerRefs: {
    icon: React.RefObject<HTMLDivElement | null>
    text: React.RefObject<HTMLDivElement | null>
    prices: React.RefObject<HTMLDivElement | null>[]
  }
}) => {
  const [columnWidths, setColumnWidths] = useState<{ icon: number; text: number; price1: number; price2: number; price3: number } | null>(null)
  
  // Фиксированный отступ слева для выравнивания нижней таблицы под верхним рядом
  // Примерно равен расстоянию от левого края контейнера до начала иконки (12px)
  // Скорректировано визуально для идеального совпадения
  const leftOffset = 12

  useEffect(() => {
    const validSubcategoryIds = ['drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor', 'a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor']
    if (!validSubcategoryIds.includes(subcategoryId) || !headerRefs.prices[0]?.current) return

    const measureColumns = () => {
      const iconEl = headerRefs.icon.current
      const textEl = headerRefs.text.current
      const price1El = headerRefs.prices[0]?.current
      const price2El = headerRefs.prices[1]?.current
      const price3El = headerRefs.prices[2]?.current

      if (iconEl && textEl && price1El && price2El && price3El) {
        const iconRect = iconEl.getBoundingClientRect()
        const textRect = textEl.getBoundingClientRect()
        const price1Rect = price1El.getBoundingClientRect()
        const price2Rect = price2El.getBoundingClientRect()
        const price3Rect = price3El.getBoundingClientRect()

        setColumnWidths({
          icon: iconRect.width,
          text: textRect.width,
          price1: price1Rect.width,
          price2: price2Rect.width,
          price3: price3Rect.width,
        })
      }
    }

    // Задержка для обеспечения рендеринга элементов
    const timeoutId1 = setTimeout(measureColumns, 50)
    const timeoutId2 = setTimeout(measureColumns, 200)
    const timeoutId3 = setTimeout(measureColumns, 500)

    const handleResize = () => {
      measureColumns()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId2)
      clearTimeout(timeoutId3)
    }
  }, [subcategoryId, headerRefs])

  const validSubcategoryIds = ['drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor', 'a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor']
  if (!validSubcategoryIds.includes(subcategoryId)) return null

  // Данные для таблицы Drukarki mono
  const tableDataMono = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '500 str./mies.', plan2: '1 000 str./mies.', plan3: '2 500 str./mies.' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,05 zł', plan2: '0,05 zł', plan3: '0,04 zł' },
    { label: 'Duplex', plan1: '-', plan2: '- / +', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '20', plan2: '40', plan3: '60' },
  ]

  // Данные для таблицы Drukarki kolor
  const tableDataKolor = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '1 000 + 0', plan2: '1 000 + 200', plan3: '2 000 + 200' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,05 zł', plan2: '0,05 zł', plan3: '0,04 zł' },
    { label: 'Cena wydruku A4 kolor (powyżej limitu)', plan1: '0,25 zł', plan2: '0,20 zł', plan3: '0,20 zł' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '20', plan2: '40', plan3: '60' },
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

  // Данные для таблицы Drukarki A3/A4 mono
  const tableDataA3Mono = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '2 500 str./mies.', plan2: '3 750 str./mies.', plan3: '5 000 str./mies.' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,04 zł', plan2: '0,04 zł', plan3: '0,03 zł' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50', plan2: '60', plan3: '90' },
  ]

  // Данные для таблицы Drukarki A3/A4 kolor
  const tableDataA3Kolor = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '2 000 + 300', plan2: '3 000 + 500', plan3: '5 000 + 800' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,04 zł', plan2: '0,04 zł', plan3: '0,03 zł' },
    { label: 'Cena wydruku A4 kolor (powyżej limitu)', plan1: '0,25 zł', plan2: '0,20 zł', plan3: '0,18 zł' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50', plan2: '60', plan3: '90' },
  ]

  // Данные для таблицы MFU A3/A4 mono
  const tableDataA3MfuMono = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '5 000 str./mies.', plan2: '7 000 str./mies.', plan3: '10 000 str./mies.' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,04 zł', plan2: '0,04 zł', plan3: '0,03 zł' },
    { label: 'Skanowanie', plan1: 'gratis', plan2: 'gratis', plan3: 'gratis' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50', plan2: '60', plan3: '90' },
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

  const tableData = 
    subcategoryId === 'drukarki-mono' ? tableDataMono :
    subcategoryId === 'a3-drukarki-mono' ? tableDataA3Mono :
    subcategoryId === 'drukarki-kolor' ? tableDataKolor :
    subcategoryId === 'a3-drukarki-kolor' ? tableDataA3Kolor :
    subcategoryId === 'mfu-mono' ? tableDataMfuMono :
    subcategoryId === 'a3-mfu-mono' ? tableDataA3MfuMono :
    subcategoryId === 'mfu-kolor' ? tableDataMfuKolor :
    subcategoryId === 'a3-mfu-kolor' ? tableDataA3MfuKolor :
    []

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
  const renderValueWithSuffix = (value: string, fontSize: string = 'text-[16px]', columnIndex: number = 0, rowLabel?: string) => {
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
                  className="font-table-sub text-[14px] text-[#ede0c4] leading-[1.3] ml-1" 
                  style={{ textShadow: supplementTextShadow }}
                >
                  mono
                </span>
              </div>
              {/* Вторая строка: "+ 0 kolor" */}
              <div className="flex items-baseline">
                <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>+</span>
                <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)] ml-1`}>{secondPart}</span>
                <span 
                  className="font-table-sub text-[14px] text-[#ede0c4] leading-[1.3] ml-1" 
                  style={{ textShadow: supplementTextShadow }}
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
                className="font-table-sub text-[14px] text-[#ede0c4] leading-[1.3]" 
                style={{ textShadow: supplementTextShadow }}
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
                className="font-table-sub text-[14px] text-[#ede0c4] leading-[1.3]" 
                style={{ textShadow: supplementTextShadow }}
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
                className="font-table-sub text-[14px] text-[#ede0c4] leading-[1.3] ml-1" 
                style={{ textShadow: supplementTextShadow }}
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
              className="font-table-sub text-[14px] text-[#ede0c4] leading-[1.3] ml-1" 
              style={{ textShadow: supplementTextShadow }}
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
            className="font-table-sub text-[14px] text-[#ede0c4] leading-[1.3]" 
            style={{ textShadow: supplementTextShadow }}
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
            className="font-table-sub text-[14px] text-[#ede0c4] leading-[1.3] ml-1" 
            style={{ textShadow: supplementTextShadow }}
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
            className="font-table-sub text-[14px] text-[#ede0c4] leading-[1.3] ml-0.5" 
            style={{ textShadow: supplementTextShadow, marginTop: '-3px' }}
          >
            zł
          </span>
        </span>
      )
    }
    // Для остальных значений
    return <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{value}</span>
  }

  return (
    <div 
      className="rounded-lg outline outline-1 outline-[#bfa76a]/10 md:outline-none md:border md:border-[#bfa76a]/10 overflow-hidden"
    >
      <div className="overflow-x-auto md:overflow-x-visible -mx-4 md:mx-0 px-4 md:px-0">
        {/* Десктоп: flex с динамическими размерами из верхнего ряда */}
        <div 
          className="hidden md:block"
          style={{ marginLeft: `${leftOffset}px`, width: `calc(100% - ${leftOffset}px)` }}
        >
          {tableData.map((row, idx) => {
            const isSmallFontRow = row.label.includes('Skanowanie') || row.label.includes('Duplex') || row.label.includes('Prędkość druku')
            const labelFontSize = isSmallFontRow ? 'text-[14px]' : 'text-[16px]'
            const valueFontSize = isSmallFontRow ? 'text-[14px]' : (idx === 3 ? 'text-[14px]' : 'text-[16px]')
            
            return (
              <div
                key={idx}
                className={`flex w-full items-center border-[#8b7a5a] ${idx === 0 ? 'border-t-2' : ''} border-b-2`}
              >
                {/* Пустая колонка для иконки */}
                <div 
                  style={columnWidths ? { width: `${columnWidths.icon}px`, marginRight: '8px' } : { width: '40px', marginRight: '8px' }}
                ></div>
                {/* Колонка с описанием */}
                <div 
                  className={`px-2 py-1 flex items-center leading-[1.4] font-table-main ${labelFontSize} text-[rgba(255,255,245,0.85)]`}
                  style={columnWidths ? { width: `${columnWidths.text}px` } : undefined}
                >
                  {renderLabel(row.label, labelFontSize)}
                </div>
                {/* Три колонки с данными - используют точные размеры из верхнего ряда */}
                <div 
                  className="px-2 py-1 flex items-center justify-center text-center leading-[1.4] border-l-2 border-[#8b7a5a]"
                  style={columnWidths ? { width: `${columnWidths.price1}px`, marginLeft: '8px' } : undefined}
                >
                  {renderValueWithSuffix(row.plan1, valueFontSize, idx === 1 ? 0 : 0, row.label)}
                </div>
                <div 
                  className="px-2 py-1 flex items-center justify-center text-center leading-[1.4] border-l-2 border-[#8b7a5a]"
                  style={columnWidths ? { width: `${columnWidths.price2}px` } : undefined}
                >
                  {renderValueWithSuffix(row.plan2, valueFontSize, idx === 1 ? 1 : 0, row.label)}
                </div>
                <div 
                  className="px-2 py-1 flex items-center justify-center text-center leading-[1.4] border-l-2 border-[#8b7a5a]"
                  style={columnWidths ? { width: `${columnWidths.price3}px` } : undefined}
                >
                  {renderValueWithSuffix(row.plan3, valueFontSize, idx === 1 ? 2 : 0, row.label)}
                </div>
              </div>
            )
          })}
        </div>
        {/* Мобильная версия: обычная таблица */}
        <div className="md:hidden">
          <div className="overflow-x-auto scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
            <Table className="border-separate" style={{ minWidth: '100%', width: '100%', borderSpacing: '2px 0', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '48%', minWidth: '120px' }} />
                <col style={{ width: '17.33%', minWidth: '45px' }} />
                <col style={{ width: '17.33%', minWidth: '45px' }} />
                <col style={{ width: '17.33%', minWidth: '45px' }} />
              </colgroup>
              <TableHeader>
                <TableRow className="border-[#8b7a5a] border-b-2 border-t-2">
                  <TableHead 
                    className="px-2 pr-3 align-middle text-left" 
                    style={{ width: '48%', minWidth: '120px', maxWidth: '48%', boxSizing: 'border-box', whiteSpace: 'normal' }}
                  ></TableHead>
                  <TableHead 
                    colSpan={3} 
                    className="pl-2 pr-2 align-middle text-center border-l-2 border-[#8b7a5a]" 
                    style={{ width: '52%', maxWidth: '52%', boxSizing: 'border-box', overflow: 'hidden' }}
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
                  const isSmallFontRow = row.label.includes('Skanowanie') || row.label.includes('Duplex') || row.label.includes('Prędkość druku')
                  const labelFontSize = isSmallFontRow ? 'text-[14px]' : 'text-[16px]'
                  const valueFontSize = isSmallFontRow ? 'text-[13px]' : (idx === 3 ? 'text-[13px]' : 'text-[15px]')
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
                        className={`px-2 pr-3 py-2.5 align-middle text-left leading-[1.4] font-table-main ${labelFontSize} text-[rgba(255,255,245,0.85)] break-words`} 
                        style={{ 
                          wordBreak: 'break-word', 
                          overflowWrap: 'break-word', 
                          width: '48%', 
                          minWidth: '120px',
                          maxWidth: '48%',
                          boxSizing: 'border-box',
                          whiteSpace: 'normal',
                          borderBottom: isLastRow ? 'none' : '1.5px solid rgba(139, 122, 90, 0.75)'
                        }}
                      >
                        {renderLabel(row.label, labelFontSize)}
                      </TableCell>
                      <TableCell 
                        className="pl-2 pr-1 py-2.5 align-middle text-center leading-[1.4] border-l-2 border-[#8b7a5a]" 
                        style={{ 
                          width: '17.33%', 
                          minWidth: '45px', 
                          maxWidth: '17.33%', 
                          boxSizing: 'border-box', 
                          borderBottom: isLastRow ? 'none' : '1.5px solid rgba(139, 122, 90, 0.75)'
                        }}
                      >
                        {renderValueWithSuffix(row.plan1, valueFontSize, idx === 1 ? 0 : 0, row.label)}
                      </TableCell>
                      <TableCell 
                        className="pl-1.5 pr-1 py-2.5 align-middle text-center leading-[1.4] border-l-2 border-[#8b7a5a]" 
                        style={{ 
                          width: '17.33%', 
                          minWidth: '45px', 
                          maxWidth: '17.33%', 
                          boxSizing: 'border-box', 
                          borderBottom: isLastRow ? 'none' : '1.5px solid rgba(139, 122, 90, 0.75)'
                        }}
                      >
                        {renderValueWithSuffix(row.plan2, valueFontSize, idx === 1 ? 1 : 0, row.label)}
                      </TableCell>
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
                        {renderValueWithSuffix(row.plan3, valueFontSize, idx === 1 ? 2 : 0, row.label)}
                      </TableCell>
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

// Функция для получения пути к картинке принтера по названию категории
const getPrinterImageForCategory = (categoryTitle: string): string => {
  switch (categoryTitle) {
    case 'Drukarka domowa':
      return '/images/Drukarka_domowa.png'
    case 'Drukarka biurowa':
      return '/images/A4_MFU_kolor.png'
    case 'Drukarka biznesowa':
      return '/images/MFU A3A4 (mono).png'
    default:
      return ''
  }
}

const SPECIAL_TOOLTIP_SERVICES = new Set([
  'serwis-drukarek-laserowych',
  'serwis-drukarek-atramentowych',
  'serwis-drukarek-termicznych',
])

const ServiceAccordion = ({ service }: { service: ServiceData }) => {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<string | null>(null)
  const [isCategoryTooltipOpen, setCategoryTooltipOpen] = useState(false)
  const [openWynajemSubcategories, setOpenWynajemSubcategories] = useState<string[]>([])
  const [openDrukarkaZastepczaSubcategories, setOpenDrukarkaZastepczaSubcategories] = useState<string[]>([])
  const sectionRefs = useRef<ScrollRefs>({})
  const subcategoryRefs = useRef<ScrollRefs>({})
  // Refs для колонок цен в шапке wynajem подменю
  const wynajemHeaderRefs = useRef<{ 
    [key: string]: { 
      icon: React.RefObject<HTMLDivElement>
      text: React.RefObject<HTMLDivElement>
      prices: React.RefObject<HTMLDivElement>[]
    } 
  }>({})
  // Refs для колонок цен в шапке drukarka-zastepcza подменю
  const drukarkaZastepczaHeaderRefs = useRef<{ 
    [key: string]: { 
      icon: React.RefObject<HTMLDivElement>
      text: React.RefObject<HTMLDivElement>
      prices: React.RefObject<HTMLDivElement>[]
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
        className="relative pointer-events-auto w-[min(calc(100vw-64px),900px)] max-h-[88vh] overflow-y-auto rounded-2xl border border-[rgba(200,169,107,0.45)] shadow-[0_22px_45px_rgba(0,0,0,0.5)] text-[#f8eacd]"
        style={{
          backgroundImage: "url('/images/services-background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 rounded-2xl bg-[rgba(0,0,0,0.5)] pointer-events-none" />
        <div className="relative p-6 md:p-7 space-y-6">
          <div className="text-center space-y-2">
            <h4 className="text-[22px] md:text-[26px] font-cormorant font-semibold text-white tracking-wide">
              Kategorie urządzeń
            </h4>
            <p className="text-[15px] md:text-[17px] text-[rgba(255,255,245,0.85)] leading-snug font-cormorant">
              W cenniku pierwsza cena dotyczy drukarki domowej, druga – biurowej, trzecia – biznesowej
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {DEVICE_CATEGORIES.map(category => (
              <div
                key={category.title}
                className="bg-[rgba(255,255,255,0.08)] border border-[rgba(191,167,106,0.35)] rounded-xl p-4 flex flex-col h-full shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] text-center"
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
                    src={getPrinterImageForCategory(category.title)}
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
    if (!openSubcategory || openSection !== 'naprawy') return
    const parentRef = sectionRefs.current['naprawy']
    if (!parentRef) return

    const rect = parentRef.getBoundingClientRect()
    if (rect.bottom > 70) {
      return
    }

    scrollIntoViewIfNeeded(parentRef, SECTION_SCROLL_OFFSET, true)
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
    <div className="container max-w-4xl mx-auto px-0 sm:px-4 md:px-6 pb-20 relative z-10">
      <div className="flex flex-col gap-4">
        <Accordion
          type="single"
          collapsible
          value={openSection ?? undefined}
          onValueChange={handleSectionChange}
          className="w-full"
        >
          {service.pricingSections.map((section) => (
            <AccordionItem
              key={section.id}
              value={section.id}
              className="border-0 group mb-4 last:mb-0 scroll-mt-[120px]"
              ref={node => {
                sectionRefs.current[section.id] = node
              }}
            >
              <div 
                className="group relative min-h-[70px] rounded-lg py-1.5 px-0 sm:py-2 md:px-3 border-2 border-[rgba(200,169,107,0.5)] hover:border-[rgba(200,169,107,0.85)] transition-all duration-300 hover:shadow-xl group-data-[state=open]:border-b group-data-[state=open]:border-b-[rgba(191,167,106,0.2)] w-full bg-[rgba(5,5,5,0.85)]"
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
                              <h3 className={cn(
                                "text-lg font-cormorant font-semibold text-[#ffffff] group-hover:text-white transition-colors leading-tight flex-1 min-w-0 pr-2",
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
                              {/* "Czynsz wynajmu [zł/mies.]" над столбцами цен - мобильная версия, только когда аккордеон открыт */}
                              {(service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && isSectionOpen(section.id) && (
                                <div className="flex-shrink-0">
                                  <span className="text-base font-cormorant font-semibold text-[#ffffff] leading-tight whitespace-nowrap">
                                    Czynsz wynajmu [zł/mies.]
                                  </span>
                                </div>
                              )}
                            </div>
                            {/* Десктопная версия: обычный заголовок */}
                            <h3 className="hidden md:block text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] group-hover:text-white transition-colors mb-1 leading-tight">
                              {section.title}
                            </h3>
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
                                    <div className="text-center">
                                      <span className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-tight">
                                        Czynsz wynajmu [zł/mies.]
                                      </span>
                                    </div>
                                  </div>
                                </>
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
                              <div
                                className={cn(
                                  'flex items-center gap-2 text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-[1.05] whitespace-nowrap pl-1 md:pl-0',
                                  section.id === 'diagnoza' || section.id === 'dojazd' || section.id === 'konserwacja' || section.id === 'naprawy'
                                    ? 'justify-center'
                                    : 'justify-end'
                                )}
                              >
                                <span className="hidden sm:inline">Cena, zł</span>
                                <span className="inline sm:hidden">Cena</span>
                                {service.slug !== 'serwis-laptopow' && service.slug !== 'serwis-komputerow-stacjonarnych' && (
                                  <TooltipProvider delayDuration={100}>
                                    <Tooltip
                                      onOpenChange={open => {
                                        if (isSpecialTooltipService) {
                                          setCategoryTooltipOpen(open)
                                        }
                                      }}
                                    >
                                      <TooltipTrigger
                                        className="ml-1 -mr-2 sm:mr-0 hidden md:inline-flex"
                                        onClick={event => event.stopPropagation()}
                                        onPointerDown={event => event.stopPropagation()}
                                        onKeyDown={event => {
                                          if (event.key === 'Enter' || event.key === ' ') {
                                            event.preventDefault()
                                            event.stopPropagation()
                                          }
                                        }}
                                      >
                                        <span
                                          role="button"
                                          tabIndex={0}
                                          aria-label="Informacja o cenach"
                                          className="inline-flex items-center justify-center text-white/80 rounded-full focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none p-2 sm:p-1 cursor-pointer"
                                        >
                                          <Info className="w-4 h-4 opacity-70 pointer-events-none" />
                                        </span>
                                      </TooltipTrigger>
                                      <TooltipContent
                                        {...(isSpecialTooltipService
                                          ? {
                                              side: 'left' as const,
                                              align: 'center' as const,
                                              sideOffset: 16,
                                              collisionPadding: 16,
                                              className: 'p-0 border-none bg-transparent shadow-none max-w-none rounded-none',
                                            }
                                          : { sideOffset: 4 })}
                                      >
                                        {isSpecialTooltipService ? (
                                          renderPriceTooltipContent()
                                        ) : (
                                          <p className="max-w-xs text-sm leading-snug text-[#f8f1db]">
                                            cena z VAT (brutto)
                                          </p>
                                        )}
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </div>
                              {service.slug !== 'serwis-laptopow' && service.slug !== 'serwis-komputerow-stacjonarnych' && (
                                <span
                                  className="font-table-sub text-[14px] text-[#ede0c4] mt-0.5 leading-[1.3] hidden sm:block"
                                  style={{ textShadow: supplementTextShadow }}
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
                                ? 'py-1 px-1.5 md:py-2 md:px-3 [&>svg]:hidden md:[&>svg]:block'
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
                                <div className="hidden md:flex items-center" style={{ 
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
                                    
                                    return (
                                      <>
                                        <div 
                                          ref={headerRefs.icon}
                                          className="w-[40px] h-[40px] flex-shrink-0 flex items-center justify-center mr-2"
                                        >
                                          <Image
                                            src={getIconForSubcategory(subcategory.id) || getIconForSection(section.id)}
                                            alt={subcategory.title}
                                            width={40}
                                            height={40}
                                            className="object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                                            unoptimized
                                          />
                                        </div>
                                        <div 
                                          ref={headerRefs.text}
                                          className="min-w-0" 
                                          style={{ width: 'calc((100% - 40px - 8px) * 0.4)' }}
                                        >
                                          <h4 className="text-lg font-semibold text-[#ffffff] font-table-main leading-[1.3]">
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
                                                  // Для других секций - как было
                                                  return (
                                                    <>
                                                      {mainPart}{' '}
                                                      <span className="font-table-sub text-[14px] text-[#ede0c4] leading-[1.3]" style={{ textShadow: supplementTextShadow }}>
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
                                        {subcategory.price.split(' / ').map((price, idx) => (
                                          <div 
                                            key={idx}
                                            ref={headerRefs.prices[idx]}
                                            className="flex items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
                                            style={{ width: `calc((100% - 40px - 8px) * 0.2)`, marginLeft: idx === 0 ? '8px' : '0' }}
                                          >
                                            <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3]">
                                              <span className="inline-flex items-start">
                                                <span>{price}</span>
                                                {isSubcategoryOpen(section.id, subcategory.id) && (
                                                  <span 
                                                    className="font-table-sub text-[16px] text-[#ede0c4] leading-[1.3] ml-0.5 inline-flex" 
                                                    style={{ textShadow: supplementTextShadow, marginTop: '-3px' }}
                                                  >
                                                    zł
                                                  </span>
                                                )}
                                              </span>
                                            </div>
                                          </div>
                                        ))}
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
                                    "flex gap-2.5",
                                    (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && isSectionOpen(section.id) 
                                      ? "items-center" 
                                      : "items-start"
                                  )}>
                                    <div className="w-[40px] h-[40px] flex-shrink-0 flex items-center justify-center">
                                      <Image
                                        src={getIconForSubcategory(subcategory.id) || getIconForSection(section.id)}
                                        alt={subcategory.title}
                                        width={40}
                                        height={40}
                                        className="object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
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
                                              // Для других секций - как было
                                              return (
                                                <>
                                                  {mainPart}{' '}
                                                  <span className="font-table-sub text-[14px] text-[#ede0c4] leading-[1.3]" style={{ textShadow: supplementTextShadow }}>
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
                                      {subcategory.price.split(' / ').map((price, idx) => (
                                        <div 
                                          key={idx}
                                          className="flex items-center justify-center text-center border-l-2 border-[#8b7a5a] pl-2 pr-2 flex-1"
                                          style={{ 
                                            boxSizing: 'border-box'
                                          }}
                                        >
                                          <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3]">
                                            <span className="inline-flex items-start">
                                              <span>{price}</span>
                                              {isSubcategoryOpen(section.id, subcategory.id) && (
                                                <span 
                                                  className="font-table-sub text-[16px] text-[#ede0c4] leading-[1.3] ml-0.5 inline-flex" 
                                                  style={{ textShadow: supplementTextShadow, marginTop: '-3px' }}
                                                >
                                                  zł
                                                </span>
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      ))}
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
                                  <div className="mr-2 w-[40px] h-[40px] flex-shrink-0 flex items-center justify-center">
                                    <Image
                                      src={getIconForSubcategory(subcategory.id) || getIconForSection(section.id)}
                                      alt={subcategory.title}
                                      width={40}
                                      height={40}
                                      className="object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                                      unoptimized
                                    />
                                  </div>
                                )}
                                <div className="flex-1 w-full min-w-0">
                                  <div>
                                    <h4
                                      className={`font-table-main ${(service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') ? 'leading-[1.2] md:leading-[1.3]' : 'leading-[1.3]'} ${
                                        section.id === 'faq'
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
                                      <div
                                        className="font-table-sub text-[13px] md:text-[14px] text-[#f0dfbd] leading-tight italic mt-0.5"
                                        style={{ textShadow: supplementTextShadow }}
                                      >
                                        ({subcategory.subtitle})
                                      </div>
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
                                className={`font-cormorant text-base whitespace-pre-line text-[#fff8e7] ${
                                  section.id === 'faq' ? 'pt-0.5 pl-4 leading-snug' : 'pt-2 pb-1.5 px-1 leading-normal'
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
                                    return <WynajemTable subcategoryId={subcategory.id} headerRefs={headerRefs} />
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
                                                  {parsed.parentheses && renderParenthesesText(parsed.parentheses)}
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
                                        {parsed.parentheses && renderParenthesesText(parsed.parentheses)}
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
    </div>
  )
}

export default ServiceAccordion

