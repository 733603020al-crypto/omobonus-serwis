'use client'

import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import manifest from '@/config/manifest'
import { DEFAULT_PRICE_TOOLTIP } from '@/lib/services-data'
import type { ServiceData } from '@/lib/services-data'
import { serviceAccordionI18n } from '@/lib/i18n/service-accordion'
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
const WynajemTable = dynamic(() => import('./WynajemTable').then(m => ({ default: m.WynajemTable })))

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

const ServiceAccordion = ({ service, locale = 'pl' }: { service: ServiceData; locale?: 'pl' | 'uk' | 'ru' }) => {
  const t = serviceAccordionI18n[locale]
  const priceHeaderFull = t.priceHeaderFull
  const priceHeaderShort = t.priceHeaderShort
  const timeHeader = t.timeHeader
  const viewPriceList = t.viewPriceList
  const viewDetails = t.viewDetails
  const detailsInPreparation = t.detailsInPreparation
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
              {t.deviceCategoriesTitle}
            </h4>
            <p className="text-[15px] md:text-[17px] text-[rgba(255,255,245,0.85)] leading-snug font-cormorant">
              {service.slug === 'serwis-drukarek-iglowych'
                ? t.deviceCategoriesDescription.serwisDrukarekIglowych
                : service.slug === 'serwis-drukarek-termicznych'
                  ? t.deviceCategoriesDescription.serwisDrukarekTermicznych
                  : t.deviceCategoriesDescription.default}
            </p>
            <div className="mt-1 flex items-center justify-center gap-1">
              <span className="text-[15px] md:text-[17px] text-[rgba(255,255,245,0.85)] font-cormorant">{t.exampleLabel}</span>
              <div className="flex items-center">
                <div className="drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">
                  {renderPriceLines('50 / 100 / 150')}
                </div>
              </div>
              <span className="text-[15px] md:text-[17px] text-[rgba(255,255,245,0.85)] font-cormorant">)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pb-4">
            {getDeviceCategories(service.slug).map(category => {
              const ukCat = t.categoryTranslations[category.title] ?? null
              return (
              <div
                key={category.title}
                className="bg-[rgba(255,255,255,0.08)] border border-[rgba(191,167,106,0.35)] rounded-xl p-4 flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] text-center"
              >
                <div>
                  <div className="text-xl font-cormorant font-semibold text-white">{ukCat ? ukCat.title : category.title}</div>
                  <p className="text-xs md:text-sm text-[rgba(255,255,245,0.85)] leading-snug mt-1 whitespace-pre-line">
                    {ukCat ? ukCat.description : category.description}
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
                  {(ukCat ? ukCat.features : category.features).join(', ')}
                </p>
              </div>
            )})}
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
                  "group relative w-full transition-all duration-300 min-h-[70px] rounded-lg py-1.5 px-0 sm:py-2 md:px-3 border-2 border-[rgba(200,169,107,0.5)] hover:border-[rgba(200,169,107,0.85)] hover:shadow-[0_0_24px_rgba(191,167,106,0.35)] bg-[rgba(5,5,5,0.85)]"
                )}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#bfa76a]/25 via-[#bfa76a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />
                <AccordionTrigger
                  className="hover:no-underline [&>svg]:hidden w-full group !py-0 !items-center !gap-0 relative z-10"
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
                                <div className={cn(
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
                                      return t.mobileAccordionTitles.konserwacja ?? section.title
                                    }
                                    if (section.id === 'naprawy') {
                                      return t.mobileAccordionTitles.naprawy ?? section.title
                                    }
                                    return section.title
                                  })()}
                                </div>
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
                                    {t.rentPriceHeader}
                                  </span>
                                </div>
                              )}
                              {service.slug === 'drukarka-zastepcza' && section.id === 'akordeon-1' && isSectionOpen(section.id) && (
                                <div className="flex-shrink-0">
                                  <div className="text-base font-cormorant font-semibold text-[#ffffff] leading-tight text-center">
                                    <div>{t.printPriceHeader}</div>
                                  </div>
                                </div>
                              )}
                              {service.slug === 'drukarka-zastepcza' && section.id === 'akordeon-2' && isSectionOpen(section.id) && (
                                <div className="flex-shrink-0">
                                  <div className="text-base font-cormorant font-semibold text-[#ffffff] leading-tight text-center">
                                    <div>{t.printPriceHeader}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                            {/* Десктопная версия: обычный заголовок */}
                            <div className="hidden md:block">
                              <div className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] group-hover:text-white transition-colors mb-1 leading-tight">
                                {section.title}
                              </div>
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
                                        {t.rentPriceHeader}
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
                                      {t.rentPriceHeader}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="hidden md:block absolute top-0 right-0" style={{ width: '60%' }}>
                                  <div className="text-center">
                                    <span className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-tight">
                                      {t.rentPriceHeader}
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
                                        <div>{t.printPriceHeader}</div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="hidden md:block absolute top-0 right-0" style={{ width: '60%' }}>
                                  <div className="text-left" style={{ marginLeft: '50px' }}>
                                    <div className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-tight">
                                      <div>{t.printPriceHeader}</div>
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
                                      <div>{t.printPriceHeader}</div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="hidden md:block absolute top-0 right-0" style={{ width: '60%' }}>
                                  <div className="text-left" style={{ marginLeft: '50px' }}>
                                    <div className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-tight">
                                      <div>{t.printPriceHeader}</div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        {section.id === 'dojazd' && isSectionOpen(section.id) && (
                          <div className="mt-1 text-[12px] leading-snug text-[#f5f0df] max-w-[420px]">
                            <div>{t.dojazdNote[0]}</div>
                            <div>{t.dojazdNote[1]}</div>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-[#bfa76a] text-xs font-serif group-hover:translate-x-1 transition-transform group-data-[state=open]:hidden">
                          <span>{section.id === 'faq' ? viewDetails : viewPriceList}</span>
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
                            {section.id === 'diagnoza' && (
                              <span className="text-lg md:text-xl font-table-accent text-[rgba(255,255,245,0.85)] group-data-[state=open]:hidden whitespace-nowrap">
                                {t.gratisUpper}
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
                                        <span className="inline sm:hidden">{priceHeaderShort}</span>
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
                                        backgroundImage: `var(--bg-parchment)`,
                                      } : {}}
                                    >
                                      {service.slug === 'outsourcing-it' || service.slug === 'serwis-laptopow' || service.slug === 'serwis-komputerow-stacjonarnych' || service.slug === 'serwis-drukarek-3d' || service.slug === 'serwis-plotterow' ? (
                                        <>
                                          <div className="absolute inset-0 bg-black/50 z-0" />
                                          <p className="relative z-10 text-sm leading-snug text-white font-medium">
                                            cena netto
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
                                        <span className="hidden sm:inline">{priceHeaderFull}</span>
                                        <span className="inline sm:hidden">{priceHeaderShort}</span>
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
                                          sideOffset: -80,
                                          collisionPadding: 16,
                                          className: 'p-0 border-none bg-transparent shadow-none max-w-none rounded-none',
                                        }
                                        : service.slug === 'outsourcing-it' || service.slug === 'serwis-laptopow' || service.slug === 'serwis-komputerow-stacjonarnych' || service.slug === 'serwis-drukarek-3d' || service.slug === 'serwis-plotterow'
                                          ? {
                                            side: 'top',
                                            sideOffset: 4,
                                            className: 'border border-[#bfa76a]/30 text-white shadow-lg p-3 relative overflow-hidden',
                                            style: {
                                              backgroundImage: `var(--bg-parchment)`,
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
                                            cena netto
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
                                  {t.deviceCategoriesCaption}
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
                              <div className="leading-[1.05]">{timeHeader}</div>
                              <div className="leading-[1.05]">{t.timeHeaderLine2}</div>
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
                          data-faq-item={section.id === 'faq' ? 'true' : undefined}
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
                                            <span>{viewDetails}</span>
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
                                      <span>{viewDetails}</span>
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
                                            ? viewDetails
                                            : viewPriceList}
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
                                    return <WynajemTable subcategoryId={subcategory.id} headerRefs={headerRefs} serviceSlug={service.slug} locale={locale} />
                                  }
                                  return null
                                })()
                              ) : (
                                <div className="rounded-lg outline outline-1 outline-[#bfa76a]/10 md:outline-none md:border md:border-[#bfa76a]/10 overflow-hidden min-h-[100px] p-4">
                                  {(service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') ? (
                                    <div className="text-center text-[rgba(255,255,245,0.85)] font-cormorant text-base">
                                      {detailsInPreparation}
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
