'use client'

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
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
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Info, ArrowRight } from 'lucide-react'

// Literal strings (not template-interpolated) so Tailwind's static content
// scanner can find them — same reasoning as services.tsx's ORIENT/EDGE/
// CORNER_CLASSES, which this deliberately mirrors for the accordion's own
// torn-parchment edge variety (zero new image files, same CSS mechanism).
const ACCORDION_EDGE_CLASSES = [
  'zakres-edge-a',
  'zakres-edge-c',
  'zakres-edge-e',
  'zakres-edge-g',
]
const ACCORDION_ORIENT_CLASSES = [
  'zakres-orient-normal',
  'zakres-orient-flipy',
]
// Mostly corner-none, so folds stay subtle across a whole page of sections.
const ACCORDION_CORNER_CLASSES = [
  '',
  'zakres-corner-tr',
  '',
  'zakres-corner-bl',
]

// Visual test: slugs opted into a lighter "warm parchment" look that mirrors
// the homepage SERWIS I NAPRAWA cards (near-zero overlay, dark-brown header
// text, full torn-edge variety) instead of the shared darker accordion
// treatment every other /uslugi/[slug] page keeps. Add more slugs here to
// extend the variant later — this never mutates the base ACCORDION_EDGE/
// ORIENT/CORNER_CLASSES arrays above, which other pages still use as-is.
const WARM_PARCHMENT_SLUGS = ['serwis-laptopow']

// Full 8/4/5 variety, ported 1:1 from services.tsx's EDGE_CLASSES/
// ORIENT_CLASSES/CORNER_CLASSES — only used for WARM_PARCHMENT_SLUGS pages.
const ACCORDION_EDGE_CLASSES_FULL = [
  'zakres-edge-a',
  'zakres-edge-b',
  'zakres-edge-c',
  'zakres-edge-d',
  'zakres-edge-e',
  'zakres-edge-f',
  'zakres-edge-g',
  'zakres-edge-h',
]
const ACCORDION_ORIENT_CLASSES_FULL = [
  'zakres-orient-normal',
  'zakres-orient-flipx',
  'zakres-orient-flipy',
  'zakres-orient-rotate180',
]
const ACCORDION_CORNER_CLASSES_FULL = [
  '',
  'zakres-corner-tl',
  'zakres-corner-tr',
  'zakres-corner-bl',
  'zakres-corner-br',
]

export const getIconForSection = (sectionId: string) => {
  switch (sectionId) {
    case 'diagnoza':
      return manifest.P1_Diagnoza_i_wycena
    case 'projektowanie-modeli':
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

export const getIconForSubcategory = (subcategoryId: string) => {
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

export const renderPriceLines = (price: string, link?: string) => {
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
        className="price-value-text font-inter text-[13px] md:text-[14px] text-[rgba(255,255,255,0.9)] leading-[1.3]"
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
  <div className="duration-value-text font-inter text-[13px] md:text-[14px] text-[rgba(255,255,255,0.9)] leading-[1.3]">
    {value}
  </div>
)

// Функция для рендеринга текста в скобках - использует тот же стиль, что и "do ceny"
// Явно переопределяем все визуальные параметры, чтобы избежать наследования от родительских элементов
const renderParenthesesText = (text: string, fontSize: '12px' | '14px' = '14px', matchCaptionTypography: boolean = false, matchTitleTypography: boolean = false) => {
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
              <div
                key={idx}
                className={matchCaptionTypography ? 'mt-1 first:mt-0' : 'emphasis-inline-text text-[14px] leading-relaxed mt-1 first:mt-0 text-white'}
                style={matchCaptionTypography ? { fontFamily: 'var(--font-cormorant), serif', fontSize: '13px', fontWeight: 500, lineHeight: 1.2, color: '#3A2817', opacity: 1 } : undefined}
              >
                {trimmed}
              </div>
            )
          }

          // Special handling for "Uwaga!!!" - white text, no parens
          if (trimmed.startsWith('Uwaga!!!')) {
            return matchTitleTypography ? (
              <div key={idx} className="font-table-main text-[18px] font-medium text-[#3A2817] leading-[1.15] md:text-[20px] md:font-semibold md:text-[#332314] md:leading-[1.3] mt-1 first:mt-0">
                {trimmed}
              </div>
            ) : (
              <div key={idx} className="emphasis-inline-text text-[14px] text-white leading-relaxed mt-1 first:mt-0">
                {trimmed}
              </div>
            )
          }

          // Special handling for bullet points - no parens, tighter spacing
          if (trimmed.startsWith('•')) {
            return (
              <div
                key={idx}
                className={matchCaptionTypography ? 'mt-[1px] pl-1' : 'parentheses-caption-text text-[14px] text-[#cbb27c] mt-[1px] pl-1 leading-[1.35]'}
                style={matchCaptionTypography ? { fontFamily: 'var(--font-cormorant), serif', fontSize: '13px', fontWeight: 500, lineHeight: 1.2, color: '#3A2817', opacity: 1 } : undefined}
              >
                {trimmed}
              </div>
            )
          }

          return (
            <div key={idx} className="parentheses-caption-text text-[14px] text-[#cbb27c] leading-relaxed mt-0.5 first:mt-0">
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
      <div className="emphasis-inline-text text-[14px] text-white leading-relaxed">
        {trimmed}
      </div>
    )
  }

  // Special handling for "Uwaga!!!" - white text, no parens
  if (trimmed.startsWith('Uwaga!!!')) {
    return (
      <div className="emphasis-inline-text text-[14px] text-white leading-relaxed">
        {trimmed}
      </div>
    )
  }

  if (trimmed.startsWith('•')) {
    return (
      <div className="parentheses-caption-text text-[14px] text-[#cbb27c] leading-relaxed pl-1">
        {trimmed}
      </div>
    )
  }

  return (
    <div className="parentheses-caption-text text-[14px] text-[#cbb27c] leading-relaxed">
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

// Sekcje strony druk-3d-na-zamowienie, które mają korzystać z tego samego
// niestandardowego układu cennika co "Druk 3D z gotowego projektu" (id 'diagnoza').
const DRUK3D_CUSTOM_SECTION_IDS = new Set(['diagnoza', 'projektowanie-modeli'])
const isDruk3DCustomSection = (slug: string, sectionId: string) =>
  slug === 'druk-3d-na-zamowienie' && DRUK3D_CUSTOM_SECTION_IDS.has(sectionId)

// Pytania FAQ na druk-3d-na-zamowienie, które mają semantycznie być <h2>
// (reszta pytań FAQ — na tej i innych stronach — pozostaje <h4> bez zmian).
const DRUK3D_FAQ_H2_IDS = new Set(['faq-3', 'faq-6', 'faq-13', 'faq-16', 'faq-17'])
const isDruk3DFaqH2 = (slug: string, sectionId: string, subcategoryId: string) =>
  slug === 'druk-3d-na-zamowienie' && sectionId === 'faq' && DRUK3D_FAQ_H2_IDS.has(subcategoryId)

// Подсвietla jednostki "zł/gram" i "zł/godz." złotym kolorem wewnątrz jednolinijkowej ceny
// (np. "0,30 zł/gram + 8 zł/godz.") — reszta tekstu (liczby, "+") pozostaje biała.
const renderPlainPriceWithUnits = (price: string) => {
  const parts = price.split(/(zł\/gram|zł\/godz\.)/g)
  return parts.map((part, i) =>
    part === 'zł/gram' || part === 'zł/godz.' ? (
      <span key={i} className="text-[#cbb27c]">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

// Cena materiału (PLA/PETG/ABS-ASA/TPU) jako dwa bloki obok siebie:
// góra wartości głównym białym stylem, pod spodem jednostka tym samym
// małym złotym stylem co opisy materiałów (renderParenthesesText),
// ale bez nawiasów.
const renderMaterialPrice = (price: string) => {
  const plusIdx = price.indexOf('+')
  if (plusIdx === -1) return renderPlainPriceWithUnits(price)
  const mainPart = price.slice(0, plusIdx).trim() // "0,30 zł/gram"
  const surchargePart = price.slice(plusIdx).trim() // "+ 8 zł/godz."

  const splitValueUnit = (part: string) => {
    const m = part.match(/^(.*zł)(\/.*)$/)
    return m ? { value: m[1], unit: m[2] } : { value: part, unit: '' }
  }

  const main = splitValueUnit(mainPart)
  const surcharge = splitValueUnit(surchargePart)

  const block = (value: string, unit: string, key: string, prefix?: string) => (
    <div key={key} className="flex items-start">
      {prefix && (
        <span className="font-inter text-[13px] md:text-[14px] text-white leading-[1.3] whitespace-nowrap">{prefix}&nbsp;</span>
      )}
      <div className="flex flex-col items-center">
        <div className="font-inter text-[13px] md:text-[14px] text-white leading-[1.3] whitespace-nowrap">{value}</div>
        {unit && <div className="font-table-main text-[14px] text-[#cbb27c] leading-relaxed">{unit}</div>}
      </div>
    </div>
  )

  const surchargeMatch = surcharge.value.match(/^(\+)\s*(.*)$/)
  const surchargePrefix = surchargeMatch ? surchargeMatch[1] : undefined
  const surchargeValue = surchargeMatch ? surchargeMatch[2] : surcharge.value

  return (
    <div className="flex items-start justify-center gap-2">
      {block(main.value, main.unit, 'main')}
      {block(surchargeValue, surcharge.unit, 'surcharge', surchargePrefix)}
    </div>
  )
}

// Dwuliniowa cena (np. "według cennika" / "przewoźnika"): góra głównym
// białym stylem, dół tym samym małym złotym stylem co /gram, /godz.
const renderTwoLinePrice = (price: string) => {
  const [main, sub] = price.split('\n')
  return (
    <div className="flex flex-col items-center">
      <div className="font-table-main text-[16px] text-white leading-[1.3]">{main}</div>
      {sub && <div className="font-table-main text-[14px] text-[#cbb27c] leading-relaxed">{sub}</div>}
    </div>
  )
}

// Domyślna cena dwuliniowa dla niestandardowych cenników druk-3d-na-zamowienie
// (np. "Realizacja ekspresowa": "+50%\ndo ceny" lub "Wstępna ocena projektu":
// "GRATIS\ndo 15 min konsultacji"): górna linia zachowuje oryginalny styl
// renderPriceLines, dolna dostaje dokładnie taki sam styl jak tekst przykładu
// (font-table-main text-[14px] text-[#cbb27c] leading-relaxed) zamiast domyślnego 12px.
const renderExpressPrice = (price: string) => {
  const [main, sub] = price.split('\n')
  return (
    <div className="flex flex-col items-center">
      <div className="font-inter text-[13px] md:text-[14px] text-[rgba(255,255,255,0.9)] leading-[1.3]">{main}</div>
      {sub && <div className="font-table-main text-[14px] text-[#cbb27c] leading-relaxed">{sub}</div>}
    </div>
  )
}

// Мобильная версия строки услуги (flex layout)
const renderMobileServiceRow = (
  item: { service: string; price: string; duration: string; link?: string },
  idx: number,
  isFirst: boolean,
  isLast: boolean,
  shouldHighlightPrices: boolean,
  parseServiceText: (text: string) => { main: string; parentheses: string | null },
  plainPrice: boolean = false,
  hideSubtitle: boolean = false,
  matchCaptionTypography: boolean = false,
  matchTitleTypography: boolean = false,
  showDuration: boolean = false,
  finalLeftIndent8px: boolean = false,
) => {
  const parsed = parseServiceText(item.service)
  return (
    <div
      key={`mobile-${idx}`}
      className={`flex items-start w-full gap-0.5 border-white/20 border-b border-white/30 ${isFirst ? 'border-t border-white/30' : ''
        } ${isLast ? '' : ''} py-1`}
    >
      {/* Левая колонка - описание */}
      <div className={`flex-1 min-w-0 ${finalLeftIndent8px ? 'pl-2' : 'pl-0.5'}`}>
        <div className="service-description-text font-table-main text-[rgba(255,255,245,0.85)] text-[15px] text-white leading-[1.3] tracking-tight">
          {parsed.main}
        </div>
        {!hideSubtitle && parsed.parentheses && renderParenthesesText(parsed.parentheses, '14px', matchCaptionTypography, matchTitleTypography)}
      </div>
      {/* Колонка - цена */}
      <div
        className={cn(
          'flex-shrink-0 text-center leading-[1.3]',
          showDuration ? 'pr-1 min-w-[58px] max-w-[68px]' : 'pr-2',
          !showDuration && (plainPrice ? 'min-w-[110px] max-w-[130px]' : 'min-w-[80px] max-w-[90px]'),
          shouldHighlightPrices
            ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.65)] brightness-110'
            : ''
        )}
      >
        {plainPrice ? (
          item.price.includes('zł/gram') ? (
            renderMaterialPrice(item.price)
          ) : item.service.startsWith('Wysyłka') ? (
            renderTwoLinePrice(item.price)
          ) : item.service.startsWith('Realizacja ekspresowa') ? (
            renderExpressPrice(item.price)
          ) : item.price.includes('\n') ? (
            renderExpressPrice(item.price)
          ) : (
            <div className="font-inter text-[13px] text-white leading-[1.3] whitespace-normal">
              {renderPlainPriceWithUnits(item.price)}
            </div>
          )
        ) : (
          renderPriceLines(item.price, item.link)
        )}
      </div>
      {/* Колонка - срок */}
      {showDuration && (
        <div className="flex-shrink-0 text-center leading-[1.3] pr-1 min-w-[58px] max-w-[68px]">
          {renderDurationValue(item.duration)}
        </div>
      )}
    </div>
  )
}

type ScrollRefs = Record<string, HTMLDivElement | null>

const SECTION_SCROLL_OFFSET = 120

// Компонент для таблицы wynajem с динамическим выравниванием
const WynajemTable = dynamic(() => import('./WynajemTable').then(m => ({ default: m.WynajemTable })))

// Device-category tooltip content — only used by SPECIAL_TOOLTIP_SERVICES (4 of 11 services)
const PriceTooltipContent = dynamic(() => import('./PriceTooltipContent').then(m => ({ default: m.PriceTooltipContent })))

// Wynajem/drukarka-zastepcza subcategory header (pixel-alignment grid) — only used
// by those 2 of 11 services' akordeon-1/akordeon-2 sections.
const WynajemSubcategoryHeader = dynamic(() => import('./WynajemSubcategoryHeader').then(m => ({ default: m.WynajemSubcategoryHeader })))

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

const SPECIAL_TOOLTIP_SERVICES = new Set([
  'serwis-drukarek-laserowych',
  'serwis-drukarek-atramentowych',
  'serwis-drukarek-termicznych',
  'serwis-drukarek-iglowych',
])

const ServiceAccordion = ({ service, locale = 'pl' }: { service: ServiceData; locale?: 'pl' | 'uk' | 'ru' }) => {
  const isWarmParchment = WARM_PARCHMENT_SLUGS.includes(service.slug)
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
  const swipeStartY = useRef<number | null>(null)
  const [openWynajemSubcategories, setOpenWynajemSubcategories] = useState<string[]>([])
  const [openDrukarkaZastepczaSubcategories, setOpenDrukarkaZastepczaSubcategories] = useState<string[]>([])
  const sectionRefs = useRef<ScrollRefs>({})
  const subcategoryRefs = useRef<ScrollRefs>({})
  // Desktop Naprawy: programmatic slice of the shared parchment backdrop into
  // header + row + bottom-tail segments (background-image/-position-y), so the
  // divider lines become segment cuts instead of the image being stretched to
  // the open block's height. Measured only while all rows are collapsed (the
  // "closed sheet" baseline) — reused as-is while a row is open.
  const naprawyHeaderSegmentRef = useRef<HTMLDivElement | null>(null)
  const naprawyNestedTableRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const naprawyTailSpacerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const diagnozaContentBottomRef = useRef<HTMLDivElement | null>(null)
  const diagnozaTailSpacerRef = useRef<HTMLDivElement | null>(null)
  const dojazdContentBottomRef = useRef<HTMLDivElement | null>(null)
  const dojazdTailSpacerRef = useRef<HTMLDivElement | null>(null)
  const konserwacjaContentBottomRef = useRef<HTMLDivElement | null>(null)
  const konserwacjaTailSpacerRef = useRef<HTMLDivElement | null>(null)
  const faqItemRef = useRef<HTMLDivElement | null>(null)
  const faqContentBottomRef = useRef<HTMLDivElement | null>(null)
  const faqTailSpacerRef = useRef<HTMLDivElement | null>(null)
  const faqInitialGapRef = useRef<number>(0)
  const faqContentResizeRef = useRef<HTMLDivElement>(null)
  const [naprawySegmentMetrics, setNaprawySegmentMetrics] = useState<{
    containerWidth: number
    headerHeight: number
    rowHeights: number[]
    totalHeight: number
    bottomTailHeight: number
  } | null>(null)
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

  const handleSectionChange = (value: string | null) => {
    if (value === 'faq' && openSection !== 'faq' && faqItemRef.current) {
      const itemEl = faqItemRef.current
      const nextEl = itemEl.nextElementSibling as HTMLElement | null
      if (nextEl) {
        faqInitialGapRef.current = nextEl.getBoundingClientRect().top - itemEl.getBoundingClientRect().bottom
      }
    }
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

  useLayoutEffect(() => {
    if (openSection !== 'naprawy' || openSubcategory !== null) return
    const naprawySection = service.pricingSections.find(s => s.id === 'naprawy')
    if (!naprawySection?.subcategories) return

    const measure = () => {
      const containerEl = sectionRefs.current['naprawy']
      const headerEl = naprawyHeaderSegmentRef.current
      if (!containerEl || !headerEl) return
      const containerWidth = containerEl.offsetWidth
      const headerHeight = headerEl.offsetHeight
      const rowHeights = naprawySection.subcategories!.map(
        sc => subcategoryRefs.current[sc.id]?.offsetHeight ?? 0
      )
      const measuredHeight = headerHeight + rowHeights.reduce((a, b) => a + b, 0)
      const aspectRatio = 858 / 1465
      const aspectHeight = aspectRatio * containerWidth
      const bottomTailHeight = Math.max(aspectHeight - measuredHeight, 24)
      setNaprawySegmentMetrics({
        containerWidth,
        headerHeight,
        rowHeights,
        totalHeight: measuredHeight + bottomTailHeight,
        bottomTailHeight,
      })
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [openSection, openSubcategory, service.pricingSections])

  // Desktop Naprawy: OPEN parchment (contact-form-parchment.webp) height is
  // derived, not guessed — the image is scaled so its own CURL-TOP pixel
  // (source row 959/1121, the fold's apex) lands exactly on the WHITE
  // table's real measured bottom edge. RAGGED-ANCHOR (source row 1077/1121)
  // falls out of that same scale automatically. A real flow spacer
  // (afterContent, last child of the container) is sized to the actual gap
  // between the real RAGGED-ANCHOR marker and the real next-CLOSED top, so
  // the container's flow-bottom — and so the next CLOSED row's top — lands
  // exactly on that point. The two decorative COPY segments are
  // fixed-height (--naprawy-row-h) and bottom-anchored inside the container
  // in CSS, so once the container's bottom sits on RAGGED-ANCHOR they do
  // too, automatically.
  useLayoutEffect(() => {
    if (service.slug !== 'serwis-laptopow' || openSection !== 'naprawy' || !openSubcategory) return
    const whiteEl = naprawyNestedTableRefs.current[openSubcategory]
    if (!whiteEl) return
    const parchmentEl = whiteEl.closest('[data-nested-parchment="true"]') as HTMLElement | null
    if (!parchmentEl) return
    const CURL_TOP_FRACTION = 959 / 1121
    const RAGGED_ANCHOR_FRACTION = 1077 / 1121
    const IMG_TOP_OFFSET = 68 // matches the img's fixed -top-[68px]
    const applyGeometry = () => {
      const parchmentTop = parchmentEl.getBoundingClientRect().top
      const whiteBottomY = whiteEl.getBoundingClientRect().bottom - parchmentTop
      const imgHeight = (whiteBottomY + IMG_TOP_OFFSET) / CURL_TOP_FRACTION
      parchmentEl.style.setProperty('--naprawy-img-h', `${imgHeight}px`)

      // Computed directly from the same source fraction as the visual
      // RAGGED-ANCHOR marker's own CSS — not read from marker DOM.
      const raggedY = parchmentTop + (RAGGED_ANCHOR_FRACTION * imgHeight - IMG_TOP_OFFSET)

      // Mobile: same algorithm as desktop above (own CURL-TOP/RAGGED-ANCHOR
      // source fractions, own -top offset), applied to the single trimmed
      // contact-form-parchment-mobile-naprawy.webp (634x1206) asset instead
      // of contact-form-parchment.webp — no body/bottom split.
      const MOBILE_CURL_TOP_FRACTION = 1132 / 1206
      const MOBILE_IMG_TOP_OFFSET = 68 // matches the mobile img's fixed -top-[68px]
      const mobileImgHeight = (whiteBottomY + MOBILE_IMG_TOP_OFFSET) / MOBILE_CURL_TOP_FRACTION
      parchmentEl.style.setProperty('--naprawy-img-h-mobile', `${mobileImgHeight}px`)

      // Mobile's own RAGGED-ANCHOR (source row 1204/1206 of the trimmed
      // mobile asset) — the real screen line where mobile paper's torn edge
      // ends, distinct from desktop's raggedY above. Spacer below must
      // target this on mobile, not desktop's raggedY, or it overshoots past
      // the visible mobile paper.
      const MOBILE_RAGGED_ANCHOR_FRACTION = 1204 / 1206
      const mobileRaggedY = parchmentTop + (MOBILE_RAGGED_ANCHOR_FRACTION * mobileImgHeight - MOBILE_IMG_TOP_OFFSET)
      const spacerTargetY = window.innerWidth < 768 ? mobileRaggedY : raggedY

      const accordionItemEl = parchmentEl.closest('[data-slot="accordion-item"]')
      const spacerEl = naprawyTailSpacerRefs.current[openSubcategory]
      // Universal by DOM position, not id: last subcategory has no next row
      // in the nested Accordion.
      const isLastSubcategory = accordionItemEl != null && accordionItemEl.nextElementSibling == null

      if (isLastSubcategory) {
        // No next closed row / CLOSED-TOP to compute — align Naprawy's own
        // bottom border-box edge (not the next top-level element) to
        // RAGGED-ANCHOR. Whatever CSS margin/gap naturally follows Naprawy's
        // own box (same classes as in CLOSED state, unaffected by inner
        // content height) then reproduces the real CLOSED-to-next-top-level
        // gap automatically — no hardcoded px, no id/name lookup.
        const naprawyMainSectionEl = accordionItemEl?.closest('[data-naprawy-main-section="true"]') as HTMLElement | null
        if (spacerEl && naprawyMainSectionEl) {
          spacerEl.style.height = '0px'
          void spacerEl.offsetHeight
          const naprawyBottomY = naprawyMainSectionEl.getBoundingClientRect().bottom
          const spacerH = Math.max(0, spacerTargetY - naprawyBottomY)
          spacerEl.style.height = `${spacerH}px`
        }
      } else {
        const firstClosedEl = accordionItemEl?.nextElementSibling as HTMLElement | null

        // Real-element spacer: zero it first so re-runs (resize) measure the
        // natural (pre-spacer) CLOSED-Y, not one already pushed by a stale gap.
        if (spacerEl && firstClosedEl) {
          spacerEl.style.height = '0px'
          void spacerEl.offsetHeight
          const closedY = firstClosedEl.getBoundingClientRect().top
          const spacerH = Math.max(0, (spacerTargetY + 15) - closedY)
          spacerEl.style.height = `${spacerH}px`
        }
      }
    }
    applyGeometry()
    window.addEventListener('resize', applyGeometry)
    return () => window.removeEventListener('resize', applyGeometry)
  }, [service.slug, openSection, openSubcategory])

  // CURL/RAGGED mechanism, scoped to Diagnoza only. Same source fractions as
  // Naprawy above (properties of the shared contact-form-parchment.webp
  // asset); CONTENT-BOTTOM is the `.rounded-lg` wrapper, IMG_TOP_OFFSET is
  // 12px (matches -top-[12px], not Naprawy's 68px), spacer lands against the
  // next top-level AccordionItem.
  useLayoutEffect(() => {
    if (service.slug !== 'serwis-laptopow') return
    const contentBottomEl = diagnozaContentBottomRef.current
    if (!contentBottomEl) return
    const parchmentEl = contentBottomEl.closest('[data-open-header-split-content="true"]') as HTMLElement | null
    if (!parchmentEl) return
    const accordionItemEl = parchmentEl.closest('[data-slot="accordion-item"]') as HTMLElement | null
    const spacerEl = diagnozaTailSpacerRef.current
    if (openSection !== 'diagnoza') {
      // CLOSED cleanup: drop the stale computed height so the parchment img
      // (hidden via CSS for the closed state) recomputes fresh on the next
      // OPEN instead of reusing last OPEN's geometry.
      parchmentEl.style.removeProperty('--diagnoza-img-h')
      if (spacerEl) spacerEl.style.height = '0px'
      return
    }
    const CURL_TOP_FRACTION = 959 / 1121
    const RAGGED_ANCHOR_FRACTION = 1077 / 1121
    const IMG_TOP_OFFSET = 12 // matches the img's fixed -top-[12px]
    const applyGeometry = () => {
      if (spacerEl) spacerEl.style.height = '0px'

      const parchmentTop = parchmentEl.getBoundingClientRect().top
      const contentBottomY = contentBottomEl.getBoundingClientRect().bottom - parchmentTop
      const imgHeight = (contentBottomY + IMG_TOP_OFFSET) / CURL_TOP_FRACTION
      parchmentEl.style.setProperty('--diagnoza-img-h', `${imgHeight}px`)

      const raggedY = parchmentTop + (RAGGED_ANCHOR_FRACTION * imgHeight - IMG_TOP_OFFSET)

      // Sole rule: NEXT AccordionItem top = RAGGED-ANCHOR + 16px. Measured
      // directly off the next item's own (reset) natural top — not off this
      // item's bottom/padding/margin — and pushed via real spacer height.
      const nextAccordionItemEl = accordionItemEl?.nextElementSibling as HTMLElement | null
      if (spacerEl && nextAccordionItemEl) {
        const nextTopY = nextAccordionItemEl.getBoundingClientRect().top
        spacerEl.style.height = `${Math.max(0, (raggedY + 16) - nextTopY)}px`
      }
    }
    applyGeometry()
    window.addEventListener('resize', applyGeometry)
    return () => window.removeEventListener('resize', applyGeometry)
  }, [service.slug, openSection])

  // Same mechanism as Diagnoza above, ported 1:1 for Dojazd.
  useLayoutEffect(() => {
    if (service.slug !== 'serwis-laptopow') return
    const contentBottomEl = dojazdContentBottomRef.current
    if (!contentBottomEl) return
    const parchmentEl = contentBottomEl.closest('[data-open-header-split-content="true"]') as HTMLElement | null
    if (!parchmentEl) return
    const accordionItemEl = parchmentEl.closest('[data-slot="accordion-item"]') as HTMLElement | null
    const spacerEl = dojazdTailSpacerRef.current
    if (openSection !== 'dojazd') {
      parchmentEl.style.removeProperty('--dojazd-img-h')
      if (spacerEl) spacerEl.style.height = '0px'
      return
    }
    const CURL_TOP_FRACTION = 959 / 1121
    const RAGGED_ANCHOR_FRACTION = 1077 / 1121
    const IMG_TOP_OFFSET = 12
    const applyGeometry = () => {
      if (spacerEl) spacerEl.style.height = '0px'

      const parchmentTop = parchmentEl.getBoundingClientRect().top
      const contentBottomY = contentBottomEl.getBoundingClientRect().bottom - parchmentTop
      const imgHeight = (contentBottomY + IMG_TOP_OFFSET) / CURL_TOP_FRACTION
      parchmentEl.style.setProperty('--dojazd-img-h', `${imgHeight}px`)

      const raggedY = parchmentTop + (RAGGED_ANCHOR_FRACTION * imgHeight - IMG_TOP_OFFSET)

      const nextAccordionItemEl = accordionItemEl?.nextElementSibling as HTMLElement | null
      if (spacerEl && nextAccordionItemEl) {
        const nextTopY = nextAccordionItemEl.getBoundingClientRect().top
        spacerEl.style.height = `${Math.max(0, (raggedY + 16) - nextTopY)}px`
      }
    }
    applyGeometry()
    window.addEventListener('resize', applyGeometry)
    return () => window.removeEventListener('resize', applyGeometry)
  }, [service.slug, openSection])

  // Same mechanism as Diagnoza above, ported 1:1 for Czyszczenie i konserwacja.
  useLayoutEffect(() => {
    if (service.slug !== 'serwis-laptopow') return
    const contentBottomEl = konserwacjaContentBottomRef.current
    if (!contentBottomEl) return
    const parchmentEl = contentBottomEl.closest('[data-open-header-split-content="true"]') as HTMLElement | null
    if (!parchmentEl) return
    const accordionItemEl = parchmentEl.closest('[data-slot="accordion-item"]') as HTMLElement | null
    const spacerEl = konserwacjaTailSpacerRef.current
    if (openSection !== 'konserwacja') {
      parchmentEl.style.removeProperty('--konserwacja-img-h')
      if (spacerEl) spacerEl.style.height = '0px'
      return
    }
    const CURL_TOP_FRACTION = 959 / 1121
    const RAGGED_ANCHOR_FRACTION = 1077 / 1121
    const IMG_TOP_OFFSET = 12
    const applyGeometry = () => {
      if (spacerEl) spacerEl.style.height = '0px'

      const parchmentTop = parchmentEl.getBoundingClientRect().top
      const contentBottomY = contentBottomEl.getBoundingClientRect().bottom - parchmentTop
      const imgHeight = (contentBottomY + IMG_TOP_OFFSET) / CURL_TOP_FRACTION
      parchmentEl.style.setProperty('--konserwacja-img-h', `${imgHeight}px`)

      const raggedY = parchmentTop + (RAGGED_ANCHOR_FRACTION * imgHeight - IMG_TOP_OFFSET)

      const nextAccordionItemEl = accordionItemEl?.nextElementSibling as HTMLElement | null
      if (spacerEl && nextAccordionItemEl) {
        const nextTopY = nextAccordionItemEl.getBoundingClientRect().top
        spacerEl.style.height = `${Math.max(0, (raggedY + 16) - nextTopY)}px`
      }
    }
    applyGeometry()
    window.addEventListener('resize', applyGeometry)
    return () => window.removeEventListener('resize', applyGeometry)
  }, [service.slug, openSection])

  // Same mechanism as Konserwacja above, ported for FAQ — own refs/CSS var, no
  // price grid. Recomputed on openFaq too: unlike Konserwacja, FAQ content
  // height changes each time a nested question is expanded/collapsed, so the
  // body-bottom position must be re-measured. Spacer uses the real initial
  // gap (faqInitialGapRef, captured pre-open in handleSectionChange) instead
  // of a fixed 16px, since FAQ's gap to the next card isn't the same as
  // Konserwacja's.
  useLayoutEffect(() => {
    if (service.slug !== 'serwis-laptopow') return
    const contentBottomEl = faqContentBottomRef.current
    if (!contentBottomEl) return
    const parchmentEl = contentBottomEl.closest('[data-open-header-split-content="true"]') as HTMLElement | null
    if (!parchmentEl) return
    const spacerEl = faqTailSpacerRef.current
    if (openSection !== 'faq') {
      parchmentEl.style.removeProperty('--faq-img-h')
      if (spacerEl) spacerEl.style.height = '0px'
      return
    }
    const CURL_TOP_FRACTION = 959 / 1121
    const RAGGED_ANCHOR_FRACTION = 1077 / 1121
    const IMG_TOP_OFFSET = 25
    const applyGeometry = () => {
      const parchmentTop = parchmentEl.getBoundingClientRect().top
      const contentBottomY = contentBottomEl.getBoundingClientRect().bottom - parchmentTop
      const imgHeight = (contentBottomY + IMG_TOP_OFFSET) / CURL_TOP_FRACTION
      parchmentEl.style.setProperty('--faq-img-h', `${imgHeight}px`)

      const raggedY = parchmentTop + (RAGGED_ANCHOR_FRACTION * imgHeight - IMG_TOP_OFFSET)

      const nextInfoBlockEl = spacerEl?.parentElement?.nextElementSibling as HTMLElement | null
      if (spacerEl && nextInfoBlockEl) {
        const currentSpacer = spacerEl.getBoundingClientRect().height
        const nextTopY = nextInfoBlockEl.getBoundingClientRect().top
        const baseNextTopY = nextTopY - currentSpacer
        const nextSpacer = Math.max(
          0,
          raggedY + faqInitialGapRef.current - baseNextTopY
        )
        if (Math.abs(nextSpacer - currentSpacer) > 0.5) {
          spacerEl.style.height = `${nextSpacer}px`
        }
      }
    }
    applyGeometry()
    let faqRaf = 0
    const faqObserver = new ResizeObserver(() => {
      cancelAnimationFrame(faqRaf)
      faqRaf = requestAnimationFrame(applyGeometry)
    })
    if (openSection === 'faq' && faqContentResizeRef.current) {
      faqObserver.observe(faqContentResizeRef.current)
    }
    window.addEventListener('resize', applyGeometry)
    return () => {
      window.removeEventListener('resize', applyGeometry)
      faqObserver.disconnect()
      cancelAnimationFrame(faqRaf)
    }
  }, [service.slug, openSection, openFaq])

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
          data-parchment-variant={isWarmParchment ? 'warm' : undefined}
        >
          {service.pricingSections.map((section, sectionIdx) => {
            // WARM PARCHMENT (serwis-laptopow) desktop: OPEN/CLOSED header split.
            // Structural DOM change so AccordionContent is no longer nested inside
            // the same parchment wrapper div as AccordionTrigger — see the two
            // branches near the bottom of this callback. Not gated on open/closed
            // state on purpose: keeping the DOM shape stable avoids remounting
            // AccordionContent mid-animation. CLOSED looks identical either way
            // since collapsed Content is 0px regardless of where it's parented.
            // Applies to every card on this page (not just diagnoza).
            const isOpenHeaderSplit = isWarmParchment && !isMobile
            // Mobile: "Diagnoza i wycena", "Dojazd", "Konserwacja" and "FAQ" reuse the
            // same split (desktop MASTER parchment/shadow treatment for these cards
            // only — every other card on this page keeps its original mobile layout
            // untouched). FAQ's own mobile geometry mirrors this same mechanism —
            // see the [data-section-id="faq"] rules in the mobile CSS block.
            const isDiagnozaMobileSplit = isWarmParchment && isMobile && (section.id === 'diagnoza' || section.id === 'dojazd' || section.id === 'konserwacja' || section.id === 'faq')
            const useSplitHeaderLayout = isOpenHeaderSplit || isDiagnozaMobileSplit
            const headerWrapperClassName = cn(
              "group relative w-full transition-all duration-300 min-h-[70px] py-1.5 px-0 sm:py-2 md:px-3 hover:shadow-[0_0_24px_rgba(191,167,106,0.35)]",
              isWarmParchment
                ? ACCORDION_EDGE_CLASSES_FULL[sectionIdx % ACCORDION_EDGE_CLASSES_FULL.length]
                : ACCORDION_EDGE_CLASSES[sectionIdx % ACCORDION_EDGE_CLASSES.length],
              isWarmParchment
                ? ACCORDION_ORIENT_CLASSES_FULL[sectionIdx % ACCORDION_ORIENT_CLASSES_FULL.length]
                : ACCORDION_ORIENT_CLASSES[sectionIdx % ACCORDION_ORIENT_CLASSES.length],
              isWarmParchment
                ? ACCORDION_CORNER_CLASSES_FULL[sectionIdx % ACCORDION_CORNER_CLASSES_FULL.length]
                : ACCORDION_CORNER_CLASSES[sectionIdx % ACCORDION_CORNER_CLASSES.length],
              section.id === 'dojazd' && isSectionOpen(section.id) && 'pt-1.5 pb-0',
              section.id === 'faq' && 'parchment-shadow-image parchment-shadow-block',
              ['diagnoza', 'dojazd', 'konserwacja', 'faq'].includes(section.id) && isSectionOpen(section.id) && 'parchment-shadow-header',
            )
            const triggerNode = (
              <>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#bfa76a]/25 via-[#bfa76a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />
                <AccordionTrigger
                  className="hover:no-underline [&>svg]:hidden w-full group !py-0 !items-center !gap-0 relative z-10"
                >
                  <div className={cn(
                    "flex items-center w-full text-left",
                    useSplitHeaderLayout && (section.id === 'diagnoza' || section.id === 'dojazd' || section.id === 'konserwacja') && 'diagnoza-open-header-row'
                  )}>
                    <div data-naprawy-header-inner={section.id === 'naprawy' ? 'true' : undefined} className={cn(
                      "flex items-center flex-1 min-w-0",
                      service.slug === 'serwis-laptopow' && "relative left-[15px] md:left-0"
                    )}>
                        <div className={cn(
                          "zakres-debug-img mr-4 w-[50px] h-[50px] flex-shrink-0 flex items-center justify-center relative",
                          service.slug === 'serwis-laptopow' && "w-[115px] h-[58px] md:w-[50px] md:h-[50px]",
                          service.slug === 'serwis-laptopow' && (section.id === 'diagnoza' || section.id === 'dojazd' || section.id === 'konserwacja') && "md:origin-top-left md:group-data-[state=open]:scale-[1.4] md:group-data-[state=open]:z-20",
                          service.slug === 'serwis-laptopow' && (section.id === 'diagnoza' || section.id === 'dojazd' || section.id === 'konserwacja') && "origin-top-left group-data-[state=open]:scale-[1.4] group-data-[state=open]:z-20",
                          service.slug === 'serwis-laptopow' && section.id === 'faq' && "md:origin-top-left md:group-data-[state=open]:scale-[1.4] md:group-data-[state=open]:z-20",
                          service.slug === 'serwis-laptopow' && section.id === 'faq' && "origin-top-left group-data-[state=open]:scale-[1.4] group-data-[state=open]:z-20"
                        )}>
                          <Image
                            src={
                              isWarmParchment && section.id === 'dojazd'
                                ? '/images/accordion-icon-dojazd.webp'
                                : isWarmParchment && section.id === 'diagnoza'
                                ? '/images/accordion-icon-diagnoza.webp'
                                : isWarmParchment && section.id === 'konserwacja'
                                ? '/images/accordion-icon-czyszczenie.webp'
                                : isWarmParchment && section.id === 'naprawy'
                                ? '/images/accordion-icon-naprawy.webp'
                                : isWarmParchment && section.id === 'faq'
                                ? '/images/accordion-icon-faq.webp'
                                : getIconForSection(section.id)
                            }
                            alt={section.title}
                            width={50}
                            height={50}
                            className={cn(
                              "zakres-debug-img-media object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity",
                              !isSectionOpen(section.id) && 'parchment-shadow-icon-closed'
                            )}
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
                        className={cn(
                          "zakres-debug-header flex-1 relative",
                          service.slug === 'serwis-laptopow' && section.id === 'naprawy' && isSectionOpen(section.id) && "w-full h-full flex items-center justify-center"
                        )}
                      >
                        <div className="flex flex-col md:block">
                          <div className="flex items-start md:items-center gap-2 md:gap-0 md:flex-nowrap">
                            {/* Мобильная версия: заголовок и надпись в одной строке */}
                            <div className={cn(
                              "md:hidden flex justify-between w-full gap-2",
                              (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && isSectionOpen(section.id) ? "items-center" : "items-start"
                            )}>
                              <div data-open-header-hover-text="true" className="flex-1 min-w-0 pr-2">
                                {(() => {
                                  const TitleTag = isDruk3DCustomSection(service.slug, section.id) ? 'h2' : 'div'
                                  return (
                                    <TitleTag className={cn(
                                      cn("zakres-title-text text-xl font-cormorant font-semibold transition-colors leading-tight", service.slug === 'serwis-laptopow' && (section.id === 'diagnoza' || section.id === 'dojazd' || section.id === 'konserwacja') && "md:hidden group-data-[state=open]:line-clamp-2 group-data-[state=open]:translate-x-[46px] group-data-[state=open]:max-w-[calc(100%-46px)] group-data-[state=open]:min-w-0"),
                                      /* FAQ OPEN header, mobile: standalone mirror of the icon-overflow
                                         compensation above (same 115px icon container × 1.4 scale = same
                                         46px right-overflow), kept as its own condition rather than joining
                                         the diagnoza/dojazd/konserwacja selector (FAQ has no price grid). */
                                      service.slug === 'serwis-laptopow' && section.id === 'faq' && "md:hidden group-data-[state=open]:line-clamp-2 group-data-[state=open]:translate-x-[46px] group-data-[state=open]:max-w-[calc(100%-46px)] group-data-[state=open]:min-w-0",
                                      isWarmParchment ? "text-[#3A2817] group-hover:text-[#3A2817]" : "text-[#ffffff] group-hover:text-white",
                                      (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && isSectionOpen(section.id) && "flex flex-col",
                                      service.slug === 'serwis-laptopow' && section.id === 'naprawy' && isSectionOpen(section.id) && "w-full text-center whitespace-nowrap"
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
                                        if (section.id === 'faq' && service.slug === 'serwis-laptopow') {
                                          return t.mobileAccordionTitles.faq ?? section.title
                                        }
                                        return section.title
                                      })()}
                                    </TitleTag>
                                  )
                                })()}
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
                            {/* Десктопная версия: обычный заголовок.
                                Не <h2> — semantyczny <h2> dla tej sekcji już istnieje
                                w wersji mobilnej (ten sam tekst, wspólny dla obu
                                breakpointów w drzewie DOM), więc unikamy duplikatu H2. */}
                            <div data-open-header-hover-text="true" className="hidden md:block">
                              <div className={cn(
                                "zakres-title-text text-lg md:text-xl font-cormorant font-semibold transition-colors mb-1 leading-tight",
                                !(service.slug === 'serwis-laptopow' && section.id === 'naprawy') && "group-data-[state=open]:md:translate-x-[60px]",
                                isWarmParchment ? "text-[#3A2817] group-hover:text-[#3A2817]" : "text-[#ffffff] group-hover:text-white",
                                service.slug === 'serwis-laptopow' && section.id === 'naprawy' && isSectionOpen(section.id) && "w-full text-center whitespace-nowrap"
                              )}>
                                {service.slug === 'serwis-laptopow' && (section.id === 'konserwacja' || section.id === 'naprawy') ? (
                                  <>
                                    {section.id === 'konserwacja' ? 'Czyszczenie i konserwacja' : 'Naprawy i usługi serwisowe'}{' '}
                                    <span className={cn(section.id === 'konserwacja' && "group-data-[state=open]:md:block group-data-[state=open]:md:text-center")}>
                                      {section.id === 'konserwacja' ? '(bez naprawy)' : '(opcjonalne)'}
                                    </span>
                                  </>
                                ) : section.title}
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
                        <div className={cn(
                          "zakres-cennik-link flex items-center gap-2 text-xs font-serif group-hover:translate-x-1 transition-transform group-data-[state=open]:hidden",
                          isWarmParchment ? "text-[#72502B]" : "text-[#bfa76a]"
                        )}>
                          <span>{section.id === 'faq' ? viewDetails : viewPriceList}</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>

                    {section.id !== 'faq' && !(service.slug === 'serwis-laptopow' && section.id === 'naprawy') && !(service.slug === 'wynajem-drukarek' && (section.id === 'akordeon-1' || section.id === 'akordeon-2')) && !(service.slug === 'drukarka-zastepcza' && (section.id === 'akordeon-1' || section.id === 'akordeon-2')) && (
                      <>
                        <div
                          className={cn(
                            'flex items-center ml-3 sm:ml-4 flex-shrink-0',
                            isDruk3DCustomSection(service.slug, section.id)
                              ? 'gap-0 md:w-[calc(46%-9.2px)] md:mr-[10px]'
                              : 'gap-3 sm:gap-4'
                          )}
                        >
                          <div
                            className={cn(
                              'flex items-center justify-center',
                              isDruk3DCustomSection(service.slug, section.id)
                                ? 'min-w-[96px] max-w-[110px] md:w-[60.8696%] md:min-w-0 md:max-w-none md:pl-4 md:pr-2'
                                : section.id === 'diagnoza' || section.id === 'dojazd' || section.id === 'konserwacja' || section.id === 'naprawy'
                                  ? cn(
                                      'min-w-[96px] sm:min-w-[120px]',
                                      service.slug === 'serwis-laptopow' && 'group-data-[state=closed]:min-w-0 group-data-[state=closed]:w-auto sm:group-data-[state=closed]:min-w-[120px]'
                                    )
                                  : 'min-w-0 sm:min-w-[120px]'
                            )}
                          >
                            {section.id === 'diagnoza' && (
                              service.slug === 'druk-3d-na-zamowienie' ? null : (
                                <span className={cn(
                                  "text-lg md:text-xl font-table-accent group-data-[state=open]:hidden whitespace-nowrap",
                                  isWarmParchment ? "text-[#3A2817]" : "text-[rgba(255,255,245,0.85)]",
                                  service.slug === 'serwis-laptopow' && "relative left-[-15px] md:left-0"
                                )}>
                                  {t.gratisUpper}
                                </span>
                              )
                            )}


                            <div
                              data-debug-price="true"
                              data-open-header-hover-text="true"
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
                                          'zakres-price-header-text flex items-center text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-[1.05] whitespace-nowrap pl-1 md:pl-0',
                                          section.id === 'diagnoza' || section.id === 'dojazd' || section.id === 'konserwacja' || section.id === 'naprawy'
                                            ? 'justify-center'
                                            : 'justify-end',
                                          'md:cursor-default cursor-pointer'
                                        )}
                                        style={{ gap: '1px' }}
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
                                        <span className="inline sm:hidden">{service.slug === 'serwis-laptopow' ? priceHeaderFull : priceHeaderShort}</span>
                                        <PopoverAnchor asChild>
                                          <span className="-mr-2 sm:mr-0 inline-flex items-center justify-center text-white/80 rounded-full p-2">
                                            <Info className="w-4 h-4 opacity-70 pointer-events-none" />
                                          </span>
                                        </PopoverAnchor>
                                      </div>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      side={service.slug === 'outsourcing-it' || service.slug === 'serwis-laptopow' || service.slug === 'serwis-komputerow-stacjonarnych' || service.slug === 'serwis-drukarek-3d' || service.slug === 'serwis-plotterow' ? 'top' : 'bottom'}
                                      sideOffset={service.slug === 'outsourcing-it' || service.slug === 'serwis-laptopow' || service.slug === 'serwis-komputerow-stacjonarnych' || service.slug === 'serwis-drukarek-3d' || service.slug === 'serwis-plotterow' ? (service.slug === 'serwis-laptopow' && section.id === 'diagnoza' ? 6 : 4) : 8}
                                      className={cn(
                                        service.slug === 'outsourcing-it' || service.slug === 'serwis-laptopow' || service.slug === 'serwis-komputerow-stacjonarnych' || service.slug === 'serwis-drukarek-3d' || service.slug === 'serwis-plotterow'
                                          ? 'border border-[#bfa76a]/30 text-white shadow-lg p-3 relative overflow-hidden bg-cover bg-center'
                                          : 'w-fit max-w-[280px] border border-[#bfa76a]/30 text-white shadow-lg p-3 bg-[#1a1a1a]'
                                      )}
                                      style={service.slug === 'outsourcing-it' || service.slug === 'serwis-laptopow' || service.slug === 'serwis-komputerow-stacjonarnych' || service.slug === 'serwis-drukarek-3d' || service.slug === 'serwis-plotterow' ? {
                                        backgroundImage: `var(--bg-parchment)`,
                                        width: 'max-content',
                                        minWidth: 0,
                                        whiteSpace: 'nowrap',
                                        right: '4px',
                                        left: 'auto',
                                      } : {}}
                                    >
                                      {service.slug === 'outsourcing-it' || service.slug === 'serwis-laptopow' || service.slug === 'serwis-komputerow-stacjonarnych' || service.slug === 'serwis-drukarek-3d' || service.slug === 'serwis-plotterow' ? (
                                        <>
                                          <div className="absolute inset-0 bg-black/50 z-0" />
                                          <p className="relative z-10 max-w-xs text-sm leading-snug text-white font-medium">
                                            cena netto
                                          </p>
                                          <PopoverPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
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
                                          'zakres-price-header-text text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-[1.05] whitespace-nowrap',
                                          isDruk3DCustomSection(service.slug, section.id)
                                            ? 'relative md:w-full flex items-center justify-center gap-2 pl-1 md:pl-0'
                                            : cn(
                                                'flex items-center gap-[5px] pl-1 md:pl-0',
                                                section.id === 'diagnoza' || section.id === 'dojazd' || section.id === 'konserwacja' || section.id === 'naprawy'
                                                  ? 'justify-center'
                                                  : 'justify-end'
                                              ),
                                          'md:cursor-default'
                                        )}
                                        role="button"
                                        tabIndex={0}
                                        aria-label="Informacja o cenach"
                                      >
                                        {isDruk3DCustomSection(service.slug, section.id) ? (
                                          <span className="relative inline-block">
                                            <span className="hidden sm:inline">{priceHeaderFull}</span>
                                            <span className="inline sm:hidden">{priceHeaderShort}</span>
                                            <span className="md:absolute md:left-full md:top-1/2 md:-translate-y-1/2 md:ml-3 ml-1 sm:ml-0 inline-flex items-center justify-center text-white/80 rounded-full focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none p-2 sm:p-1 md:cursor-pointer">
                                              <Info className="w-4 h-4 opacity-70 pointer-events-none" />
                                            </span>
                                          </span>
                                        ) : (
                                          <>
                                            <span className="hidden sm:inline">{priceHeaderFull}</span>
                                            <span className="inline sm:hidden">{priceHeaderShort}</span>
                                            <span className="ml-1 -mr-2 sm:mr-0 inline-flex items-center justify-center text-white/80 rounded-full focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none p-2 sm:p-1 md:cursor-pointer">
                                              <Info className="w-4 h-4 opacity-70 pointer-events-none" />
                                            </span>
                                          </>
                                        )}
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
                                        : service.slug === 'outsourcing-it' || service.slug === 'serwis-laptopow' || service.slug === 'serwis-komputerow-stacjonarnych' || service.slug === 'serwis-drukarek-3d' || service.slug === 'serwis-plotterow' || service.slug === 'druk-3d-na-zamowienie'
                                          ? {
                                            side: 'top',
                                            sideOffset: service.slug === 'serwis-laptopow' && section.id === 'diagnoza' ? 6 : 4,
                                            ...(service.slug === 'druk-3d-na-zamowienie' ? { align: 'end' as const, alignOffset: -4 } : {}),
                                            className: `border border-[#bfa76a]/30 text-white shadow-lg p-3 relative overflow-hidden${service.slug === 'serwis-laptopow' && section.id === 'diagnoza' ? ' diagnoza-tooltip-content' : ''}`,
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
                                        <PriceTooltipContent service={service} locale={locale} isMobile={isMobile} onClose={() => setCategoryTooltipOpen(false)} />
                                      ) : service.slug === 'outsourcing-it' || service.slug === 'serwis-laptopow' || service.slug === 'serwis-komputerow-stacjonarnych' || service.slug === 'serwis-drukarek-3d' || service.slug === 'serwis-plotterow' || service.slug === 'druk-3d-na-zamowienie' ? (
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
                              {service.slug !== 'serwis-laptopow' && service.slug !== 'serwis-komputerow-stacjonarnych' && service.slug !== 'serwis-drukarek-3d' && service.slug !== 'serwis-plotterow' && service.slug !== 'druk-3d-na-zamowienie' && (
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
                              isDruk3DCustomSection(service.slug, section.id)
                                ? 'md:w-[39.1304%] md:pl-4 md:pr-2'
                                : section.id === 'diagnoza' || section.id === 'dojazd' || section.id === 'konserwacja' || section.id === 'naprawy'
                                  ? 'min-w-[120px]'
                                  : 'min-w-0'
                            )}
                          >
                            <div data-open-header-hover-text="true" className="zakres-time-header-text text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] text-center hidden group-data-[state=open]:block leading-[1.05]">
                              <div className="leading-[1.05]">{timeHeader}</div>
                              <div className="leading-[1.05]">{t.timeHeaderLine2}</div>
                            </div>
                          </div>
                        </div>

                      </>
                    )}
                  </div>
                </AccordionTrigger>
              </>
            )
            const contentNode = (
              <AccordionContent
                  beforeContent={section.id === 'dojazd' ? (
                    <div className="w-full text-center" style={{ width: '100%', maxWidth: 'none', marginLeft: 0, background: 'rgba(114, 80, 43, 0.10)', borderBottom: '1px solid rgba(114, 80, 43, 0.35)', paddingLeft: isMobile ? '24px' : '250px', paddingRight: isMobile ? '24px' : '20px', paddingTop: isMobile ? '6px' : undefined, paddingBottom: isMobile ? '6px' : '4px' }}>
                      <div className="font-table-main">
                        <div className="text-[16px] text-white service-description-text leading-[1.3]">„DARMOWY DOJAZD” 😉</div>
                        <div className="parentheses-caption-text text-[14px] text-[#cbb27c] leading-relaxed md:whitespace-nowrap">nie mówimy, że dojazd lub odbiór są „za darmo”, a następnie doliczamy ten koszt do ceny naprawy</div>
                      </div>
                    </div>
                  ) : undefined}
                  data-naprawy-section={section.id === 'naprawy' ? 'true' : undefined}
                  // Na druk-3d-na-zamowienie treść FAQ (lista pytań) ma pozostawać w DOM
                  // niezależnie od stanu tej sekcji, żeby teksty pytań (w tym te
                  // semantyczne <h2>) były obecne w DOM od razu, a nie dopiero po
                  // kliknięciu. Same odpowiedzi nadal montują się tylko po otwarciu
                  // konkretnego pytania (osobny zagnieżdżony Accordion niżej, bez forceMount).
                  forceMount={service.slug === 'druk-3d-na-zamowienie' && section.id === 'faq' ? true : undefined}
                  style={service.slug === 'serwis-laptopow' && section.id === 'konserwacja' ? { paddingBottom: 16, marginTop: -8 } : undefined}
                  className={cn(
                    "pb-3 scroll-smooth accordion-scroll relative z-10 md:mt-2 md:mx-2 md:mb-2",
                    !(service.slug === 'serwis-laptopow' && section.id === 'faq') && "md:border-t md:border-[rgba(200,169,107,0.3)] md:border-x md:border-[rgba(191,167,106,0.3)] md:rounded-b-lg",
                    service.slug === 'serwis-laptopow' && section.id === 'konserwacja'
                      ? "max-h-none overflow-y-visible"
                      : service.slug === 'serwis-laptopow' && section.id === 'faq'
                        ? "overflow-visible"
                        : "max-h-[70vh] overflow-y-auto",
                    service.slug === 'serwis-laptopow' && section.id === 'naprawy'
                      ? "max-h-none h-auto overflow-y-visible overflow-x-visible w-full min-w-0"
                      : "",
                    (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && isSectionOpen(section.id)
                      ? "md:pt-3 pt-0"
                      : service.slug === 'serwis-laptopow' && ['diagnoza', 'dojazd', 'konserwacja', 'naprawy'].includes(section.id)
                        ? "pt-[15px]"
                        : "pt-3",
                    service.slug === 'druk-3d-na-zamowienie' && section.id === 'faq' && !isSectionOpen(section.id) && "hidden"
                  )}
                >
                  {section.subcategories ? (
                    (() => {
                      const isRepairSection = section.id === 'naprawy'
                      const isFaqSection = section.id === 'faq'
                      let naprawyCumY: number[] = []
                      if (isRepairSection && naprawySegmentMetrics) {
                        let acc = naprawySegmentMetrics.headerHeight
                        naprawyCumY = naprawySegmentMetrics.rowHeights.map(h => {
                          const y = acc
                          acc += h
                          return y
                        })
                      }
                      const subcategoryItems = section.subcategories.map((subcategory, index) => (
                        <AccordionItem
                          key={subcategory.id}
                          value={subcategory.id}
                          data-naprawy-subcategory={isRepairSection ? 'true' : undefined}
                          data-naprawy-first-row={isRepairSection && index === 0 ? 'true' : undefined}
                          data-naprawy-last-row={isRepairSection && index === section.subcategories!.length - 1 ? 'true' : undefined}
                          data-faq-item={section.id === 'faq' ? 'true' : undefined}
                          className={cn(
                            "border-0 last:border-b-0 last:mb-0 group group/subcategory scroll-mt-[100px]",
                            service.slug === 'serwis-laptopow' && isRepairSection && 'max-md:w-full max-md:min-w-0',
                            isRepairSection && 'md:border-b-0 md:border-t-0 md:mb-0 md:pb-0',
                            isRepairSection && index === 0 && 'md:pt-0',
                            section.id === 'faq'
                              ? `mb-0.5 pb-0.5 ${index === 0 ? 'pt-0.5' : ''}`
                              : (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                ? `border-b border-white/20 mb-1 pb-1 md:mb-1.5 md:pb-1.5 ${index === 0 ? 'border-t border-white/20 md:pt-1.5' : ''}`
                                : `border-b border-white/20 mb-1.5 pb-1.5 ${index === 0 ? 'border-t border-white/20 pt-1.5' : ''}`,
                          )}
                          ref={node => {
                            subcategoryRefs.current[subcategory.id] = node
                          }}
                          style={isRepairSection && naprawyCumY.length ? ({
                            '--naprawy-seg-y': `-${naprawyCumY[index]}px`,
                            '--naprawy-row-h': `${naprawySegmentMetrics?.rowHeights[index] ?? 0}px`,
                          } as React.CSSProperties) : undefined}
                        >
                          <AccordionTrigger
                            className={cn(
                              "hover:no-underline text-left w-full !focus-visible:ring-0 !focus-visible:outline-none focus-visible:ring-transparent transition-all duration-200",
                              section.id === 'faq'
                                ? 'py-1 px-2 md:px-8 rounded-lg hover:border-[#ffecb3]/20'
                                : (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                  ? service.slug === 'drukarka-zastepcza'
                                    ? 'py-[1px] px-1.5 md:py-[1px] md:px-3 [&>svg]:hidden md:[&>svg]:block'
                                    : 'py-1 px-1.5 md:py-2 md:px-3 [&>svg]:hidden md:[&>svg]:block'
                                  : isRepairSection
                                    ? 'data-[state=closed]:py-[3px] data-[state=open]:py-2 data-[state=closed]:px-3 data-[state=open]:px-0'
                                    : 'py-1.5 px-1.5 data-[state=closed]:md:py-[3px] data-[state=open]:md:py-2 md:px-3',
                            )}
                          >
                            {(service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && subcategory.price ? (
                              <WynajemSubcategoryHeader service={service} section={section} subcategory={subcategory} viewDetails={viewDetails} isSectionOpen={isSectionOpen} isSubcategoryOpen={isSubcategoryOpen} wynajemHeaderRefs={wynajemHeaderRefs} drukarkaZastepczaHeaderRefs={drukarkaZastepczaHeaderRefs} />
                            ) : (
                              <div data-naprawy-header-row={service.slug === 'serwis-laptopow' && isRepairSection ? 'true' : undefined} className={`flex items-center w-full group/naprawy-row ${service.slug === 'wynajem-drukarek' && (section.id === 'akordeon-1' || section.id === 'akordeon-2') ? 'gap-2.5 md:gap-3' : service.slug === 'serwis-laptopow' && isRepairSection ? 'diagnoza-open-header-row' : 'gap-3'}`}>
                                <div data-naprawy-header-col1={service.slug === 'serwis-laptopow' && isRepairSection ? 'true' : undefined} className="flex items-center min-w-0 flex-1">
                                {service.slug === 'serwis-laptopow' && isRepairSection && subcategory.title === 'Oprogramowanie' && (
                                  <div data-naprawy-subcategory-image="true" className={cn(
                                    "zakres-debug-img mr-4 w-[50px] h-[50px] flex-shrink-0 flex items-center justify-center relative",
                                    "w-[115px] h-[58px] md:w-[50px] md:h-[50px]",
                                    "md:origin-top-left md:group-data-[state=open]/subcategory:scale-[1.4] md:group-data-[state=open]/subcategory:z-20",
                                    "origin-top-left group-data-[state=open]/subcategory:scale-[1.4] group-data-[state=open]/subcategory:z-20"
                                  )}>
                                    <Image
                                      src="/images/naprawy-oprogramowanie-v3.webp"
                                      alt=""
                                      width={50}
                                      height={50}
                                      className={cn(
                                        "zakres-debug-img-media object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity",
                                        !isSubcategoryOpen(section.id, subcategory.id) && 'parchment-shadow-icon-closed',
                                        isSubcategoryOpen(section.id, subcategory.id) && 'parchment-shadow-icon-open'
                                      )}
                                      unoptimized
                                    />
                                  </div>
                                )}
                                {service.slug === 'serwis-laptopow' && isRepairSection && subcategory.title !== 'Oprogramowanie' && (
                                  <div data-naprawy-subcategory-image="true" className="zakres-debug-img mr-4 w-[50px] h-[50px] flex-shrink-0 flex items-center justify-center relative origin-top-left md:group-data-[state=open]/subcategory:scale-[1.4] md:group-data-[state=open]/subcategory:z-20">
                                    {subcategory.title === 'Płyta główna / zasilanie / podzespoły' && (
                                      <img src="/images/naprawy-plyta-glowna-v3.webp" alt="" className={cn("zakres-debug-img-media object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity", !isSubcategoryOpen(section.id, subcategory.id) && 'parchment-shadow-icon-closed', isSubcategoryOpen(section.id, subcategory.id) && 'parchment-shadow-icon-open')} />
                                    )}
                                    {subcategory.title === 'Układ chłodzenia i czystość' && (
                                      <img src="/images/naprawy-uklad-chlodzenia-v3.webp" alt="" className={cn("zakres-debug-img-media object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity", !isSubcategoryOpen(section.id, subcategory.id) && 'parchment-shadow-icon-closed', isSubcategoryOpen(section.id, subcategory.id) && 'parchment-shadow-icon-open')} />
                                    )}
                                    {subcategory.title === 'Dyski i dane' && (
                                      <img src="/images/accordion-subcategory-dyski-dane.webp" alt="" className={cn("zakres-debug-img-media object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity", !isSubcategoryOpen(section.id, subcategory.id) && 'parchment-shadow-icon-closed', isSubcategoryOpen(section.id, subcategory.id) && 'parchment-shadow-icon-open')} />
                                    )}
                                    {subcategory.title === 'Odzyskanie / usuwanie danych' && (
                                      <img src="/images/naprawy-odzyskanie-danych-v2.webp" alt="" className={cn("zakres-debug-img-media object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity", !isSubcategoryOpen(section.id, subcategory.id) && 'parchment-shadow-icon-closed', isSubcategoryOpen(section.id, subcategory.id) && 'parchment-shadow-icon-open')} />
                                    )}
                                    {subcategory.title === 'Ekran i obudowa' && (
                                      <img src="/images/accordion-subcategory-ekran-obudowa.webp" alt="" className={cn("zakres-debug-img-media object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity", !isSubcategoryOpen(section.id, subcategory.id) && 'parchment-shadow-icon-closed', isSubcategoryOpen(section.id, subcategory.id) && 'parchment-shadow-icon-open')} />
                                    )}
                                    {subcategory.title === 'Klawiatura / touchpad' && (
                                      <img src="/images/accordion-subcategory-klawiatura.webp" alt="" className={cn("zakres-debug-img-media object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity", !isSubcategoryOpen(section.id, subcategory.id) && 'parchment-shadow-icon-closed', isSubcategoryOpen(section.id, subcategory.id) && 'parchment-shadow-icon-open')} />
                                    )}
                                  </div>
                                )}
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
                                <div data-debug-subcategory-text="true" data-naprawy-subcategory-hover-text="true" className={cn("flex-1 w-full min-w-0", service.slug === 'serwis-laptopow' && isRepairSection && "zakres-debug-header relative")}>
                                  <div data-debug-subcategory-title="true">
                                    {(() => {
                                      const TitleTag = isDruk3DFaqH2(service.slug, section.id, subcategory.id)
                                        ? 'h2'
                                        : service.slug === 'druk-3d-na-zamowienie' && section.id === 'faq'
                                          ? 'div'
                                          : 'h4'
                                      const titleClassName = `${service.slug === 'serwis-laptopow' && (isRepairSection || section.id === 'faq') ? 'font-cormorant' : 'font-table-main'} ${service.slug === 'serwis-laptopow' && (isRepairSection || section.id === 'faq') ? 'leading-tight' : (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') ? 'leading-[1.2] md:leading-[1.3]' : 'leading-[1.3]'} ${section.id === 'faq'
                                        ? 'faq-question-title-text text-[17px] md:text-[20px] font-semibold text-[#3A2817] mb-0'
                                        : service.slug === 'serwis-laptopow' && isRepairSection
                                          ? `zakres-title-text text-xl font-semibold transition-colors mb-1 text-[#3A2817] group-hover:text-[#3A2817] md:group-data-[state=open]/subcategory:translate-x-[60px]${subcategory.title === 'Oprogramowanie' ? ' max-md:group-data-[state=open]/subcategory:translate-x-[60px]' : ''}`
                                          : 'text-lg font-semibold text-[#ffffff]'
                                        }`
                                      return (
                                        <TitleTag
                                          className={titleClassName}
                                          data-zakres-title-oprogramowanie={service.slug === 'serwis-laptopow' && isRepairSection && subcategory.title === 'Oprogramowanie' ? 'true' : undefined}
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
                                            // RESP-002: mobile <430px width has no natural word-break point in
                                            // this single-word title, causing the browser's overflow-wrap:anywhere
                                            // fallback to split it at an arbitrary letter. A soft hyphen gives it
                                            // one clean, deliberate break point instead.
                                            if (service.slug === 'serwis-laptopow' && isRepairSection && title === 'Oprogramowanie') {
                                              return 'Oprogra­mowanie'
                                            }
                                            return title
                                          })()}
                                        </TitleTag>
                                      )
                                    })()}
                                    {subcategory.subtitle && section.id !== 'faq' && (
                                      renderParenthesesText(subcategory.subtitle, '12px')
                                    )}
                                  </div>
                                  {section.id !== 'faq' && (
                                    <>
                                      <div
                                        data-subcategory-link
                                        className={cn(
                                          "flex items-center gap-2 text-xs font-serif group-hover/naprawy-row:translate-x-1 transition-transform whitespace-nowrap",
                                          service.slug === 'serwis-laptopow' && isRepairSection ? "zakres-cennik-link text-[#72502B]" : "text-[#bfa76a]"
                                        )}
                                      >
                                        <span>
                                          {(service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                            ? viewDetails
                                            : viewPriceList}
                                        </span>
                                        <ArrowRight className={cn("w-3 h-3", !(service.slug === 'serwis-laptopow' && isRepairSection) && "flex-shrink-0")} />
                                      </div>
                                    </>
                                  )}
                                </div>
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
                                {service.slug === 'serwis-laptopow' && isRepairSection && (
                                  <div data-debug-subcategory-price="true" data-naprawy-subcategory-hover-text="true" className="hidden group-data-[state=open]/subcategory:flex items-center flex-shrink-0">
                                    <div className="flex items-center justify-center">
                                      <div className="text-center block w-full">
                                        <TooltipProvider delayDuration={100}>
                                          {(isMobile && !isSpecialTooltipService) ? (
                                            <Popover
                                              open={openSmallTooltips.has(subcategory.id)}
                                              onOpenChange={open => {
                                                if (isMobile) {
                                                  const newSet = new Set(openSmallTooltips)
                                                  if (open) {
                                                    newSet.add(subcategory.id)
                                                  } else {
                                                    newSet.delete(subcategory.id)
                                                  }
                                                  setOpenSmallTooltips(newSet)
                                                }
                                              }}
                                            >
                                              <PopoverTrigger asChild>
                                                <div
                                                  className="zakres-price-header-text flex items-center text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-[1.05] whitespace-nowrap pl-1 md:pl-0 justify-center md:cursor-default cursor-pointer"
                                                  style={{ gap: '1px' }}
                                                  role="button"
                                                  tabIndex={0}
                                                  aria-label="Informacja o cenach"
                                                  onPointerDown={(e) => {
                                                    if (isMobile) {
                                                      e.preventDefault()
                                                      e.stopPropagation()
                                                      const newSet = new Set(openSmallTooltips)
                                                      if (newSet.has(subcategory.id)) {
                                                        newSet.delete(subcategory.id)
                                                      } else {
                                                        newSet.clear()
                                                        newSet.add(subcategory.id)
                                                      }
                                                      setOpenSmallTooltips(newSet)
                                                    }
                                                  }}
                                                  onClick={(e) => {
                                                    if (isMobile) {
                                                      e.preventDefault()
                                                      e.stopPropagation()
                                                    }
                                                  }}
                                                >
                                                  <span className="inline sm:hidden">{priceHeaderFull}</span>
                                                  <PopoverAnchor asChild>
                                                    <span className="-mr-2 sm:mr-0 inline-flex items-center justify-center text-white/80 rounded-full p-2">
                                                      <Info className="w-4 h-4 opacity-70 pointer-events-none" />
                                                    </span>
                                                  </PopoverAnchor>
                                                </div>
                                              </PopoverTrigger>
                                              <PopoverContent
                                                side="top"
                                                sideOffset={4}
                                                className="border border-[#bfa76a]/30 text-white shadow-lg p-3 relative overflow-hidden bg-cover bg-center"
                                                style={{
                                                  backgroundImage: `var(--bg-parchment)`,
                                                  width: 'max-content',
                                                  minWidth: 0,
                                                  whiteSpace: 'nowrap',
                                                  right: '4px',
                                                  left: 'auto',
                                                }}
                                              >
                                                <div className="absolute inset-0 bg-black/50 z-0" />
                                                <p className="relative z-10 max-w-xs text-sm leading-snug text-white font-medium">
                                                  cena netto
                                                </p>
                                                <PopoverPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
                                              </PopoverContent>
                                            </Popover>
                                          ) : (
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <div
                                                  className="zakres-price-header-text text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] leading-[1.05] whitespace-nowrap flex items-center gap-[5px] pl-1 md:pl-0 justify-center md:cursor-default"
                                                  role="button"
                                                  tabIndex={0}
                                                  aria-label="Informacja o cenach"
                                                >
                                                  <span className="hidden sm:inline">{priceHeaderFull}</span>
                                                  <span className="inline sm:hidden">{priceHeaderShort}</span>
                                                  <span className="ml-1 sm:ml-0 inline-flex items-center justify-center text-white/80 rounded-full focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none p-2 sm:p-1">
                                                    <Info className="w-4 h-4 opacity-70 pointer-events-none" />
                                                  </span>
                                                </div>
                                              </TooltipTrigger>
                                              <TooltipContent
                                                side="top"
                                                sideOffset={4}
                                                className="border border-[#bfa76a]/30 text-white shadow-lg p-3 relative overflow-hidden"
                                                style={{
                                                  backgroundImage: `var(--bg-parchment)`,
                                                  backgroundSize: 'cover',
                                                  backgroundPosition: 'center',
                                                }}
                                              >
                                                <div className="absolute inset-0 bg-black/50 z-0" />
                                                <p className="relative z-10 max-w-xs text-sm leading-snug text-white font-medium">
                                                  cena netto
                                                </p>
                                              </TooltipContent>
                                            </Tooltip>
                                          )}
                                        </TooltipProvider>
                                      </div>
                                    </div>
                                    <div className="items-center justify-center hidden md:flex">
                                      <div className="zakres-time-header-text text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] text-center block leading-[1.05]">
                                        <div className="leading-[1.05]">{timeHeader}</div>
                                        <div className="leading-[1.05]">{t.timeHeaderLine2}</div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            {isRepairSection && index !== (section.subcategories?.length ?? 0) - 1 && (
                              <span data-naprawy-row-divider="true" aria-hidden="true" />
                            )}
                            {isRepairSection && (
                              <span data-naprawy-open-header-shadow="true" aria-hidden="true" />
                            )}
                          </AccordionTrigger>
                          <AccordionContent
                            data-open-header-split-content={service.slug === 'serwis-laptopow' && isRepairSection ? 'true' : undefined}
                            data-section-id={service.slug === 'serwis-laptopow' && isRepairSection ? 'naprawy-nested' : undefined}
                            data-nested-parchment={service.slug === 'serwis-laptopow' && isRepairSection ? 'true' : undefined}
                            beforeContent={service.slug === 'serwis-laptopow' && isRepairSection ? (
                              <>
                                {index !== (section.subcategories?.length ?? 0) - 1 && (
                                  <>
                                    <span data-naprawy-open-row-segment="upper" aria-hidden="true" />
                                    <span data-naprawy-open-row-segment="lower" aria-hidden="true" />
                                  </>
                                )}
                                <img
                                  src="/images/contact-form-parchment-mobile-naprawy.webp"
                                  alt=""
                                  aria-hidden="true"
                                  className="md:hidden absolute bottom-0 -top-[68px] object-fill pointer-events-none select-none naprawy-mobile-parchment-shadow"
                                  style={{ maxWidth: 'none', width: '100%', left: '0', right: 'auto', height: 'var(--naprawy-img-h-mobile)' }}
                                />
                                <img
                                  src="/images/contact-form-parchment.webp"
                                  alt=""
                                  aria-hidden="true"
                                  className={cn(
                                    "hidden md:block h-full absolute bottom-0 -top-[68px] object-fill pointer-events-none select-none",
                                    isSubcategoryOpen(section.id, subcategory.id) ? 'contact-form-parchment-shadow parchment-shadow-content' : 'contact-form-parchment-shadow',
                                  )}
                                  style={{ maxWidth: 'none', width: 'calc(100% + 16px)', left: '-8px', right: 'auto' }}
                                />
                              </>
                            ) : undefined}
                            afterContent={service.slug === 'serwis-laptopow' && isRepairSection ? (
                              <div
                                data-naprawy-tail-spacer="true"
                                aria-hidden="true"
                                ref={el => { naprawyTailSpacerRefs.current[subcategory.id] = el }}
                                style={{ height: 0 }}
                              />
                            ) : undefined}
                            className={cn(
                            section.id === 'faq' ? 'pt-0.5' : service.slug === 'serwis-laptopow' && isRepairSection ? 'pt-[21px]' : 'pt-1.5',
                            (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && isSectionOpen(section.id) && "md:pt-1.5 pt-0.5",
                            service.slug === 'serwis-laptopow' && isRepairSection && "relative z-10",
                            service.slug === 'serwis-laptopow' && isRepairSection && "max-md:!w-full max-md:max-w-full max-md:min-w-0"
                          )}>
                            {subcategory.answer ? (
                              <div
                                className={`${section.id === 'faq' ? 'whitespace-pre-line' : 'font-cormorant text-base whitespace-pre-line text-[#fff8e7]'} ${section.id === 'faq' ? 'faq-answer-text font-table-main text-[15px] md:text-[17px] font-medium leading-relaxed text-[#72502B] md:text-[#332314] ml-2 mr-2 md:ml-10 md:mr-8 pt-0.5' : 'pt-2 pb-1.5 px-1 leading-normal'
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
                                <div
                                  ref={isRepairSection ? (el => { naprawyNestedTableRefs.current[subcategory.id] = el }) : undefined}
                                  className="rounded-lg outline outline-1 outline-[#bfa76a]/10 md:outline-none md:border md:border-[#bfa76a]/10 overflow-hidden min-h-[100px] p-4"
                                >
                                  {(service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') ? (
                                    <div className="text-center text-[rgba(255,255,245,0.85)] font-cormorant text-base">
                                      {detailsInPreparation}
                                    </div>
                                  ) : null}
                                </div>
                              )
                            ) : (
                              <div
                                ref={(el) => { naprawyNestedTableRefs.current[subcategory.id] = el }}
                                className="rounded-lg outline outline-1 outline-[#bfa76a]/10 md:outline-none md:border md:border-[#bfa76a]/10 overflow-hidden"
                              >
                                {/* Мобильная версия - flex layout / (serwis-laptopow: новая Table-based mobile-разметка) */}
                                <div className="block md:hidden">
                                  {service.slug === 'serwis-laptopow' && isRepairSection ? (
                                    <Table className="table-fixed border-collapse max-md:w-full max-md:min-w-0">
                                      <colgroup>
                                        <col className="w-[75%]" />
                                        <col className="w-[25%]" />
                                      </colgroup>
                                      <TableBody>
                                        {subcategory.items.map((item, idx) => (
                                          <TableRow
                                            key={idx}
                                            className={`border-white/20 border-b border-white/30 ${idx === 0 ? 'border-t border-white/30' : ''}`}
                                          >
                                            <TableCell className="font-table-main text-[rgba(255,255,245,0.85)] py-1 pl-2 pr-2 !whitespace-normal w-auto max-w-[67%] leading-[1.3] tracking-normal overflow-hidden text-left">
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
                                                'py-1 pl-2 pr-2 align-middle leading-[1.3] text-center w-auto min-w-[80px] md:px-2',
                                                (subcategory.id === 'opcjonalne' || subcategory.title?.includes('opcjonalne')) && 'md:translate-x-[8px]',
                                                shouldHighlightPrices
                                                  ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.65)] brightness-110'
                                                  : ''
                                              )}
                                            >
                                              {renderPriceLines(item.price, item.link)}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  ) : (
                                    subcategory.items.map((item, idx) =>
                                      renderMobileServiceRow(
                                        item,
                                        idx,
                                        idx === 0 && !(service.slug === 'serwis-laptopow' && section.id === 'konserwacja'),
                                        idx === subcategory.items.length - 1,
                                        shouldHighlightPrices,
                                        parseServiceText,
                                        false,
                                        false,
                                        false,
                                        false,
                                        service.slug === 'serwis-laptopow' && isRepairSection,
                                      ),
                                    )
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
                                          className={`border-white/20 border-b border-white/30 ${idx === 0 && !(service.slug === 'serwis-laptopow' && section.id === 'konserwacja') ? 'border-t border-white/30' : ''}`}
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
                                              'py-1 pl-2 pr-2 align-middle leading-[1.3] text-center w-auto min-w-[80px] md:px-2',
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
                                              'text-center py-1 pl-2 pr-2 align-middle leading-[1.3] md:px-2',
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
                        const bottomTailY = naprawySegmentMetrics
                          ? naprawySegmentMetrics.headerHeight + naprawySegmentMetrics.rowHeights.reduce((a, b) => a + b, 0)
                          : 0
                        const isLastSubcategoryOpen = !!openSubcategory
                          && section.subcategories![section.subcategories!.length - 1]?.id === openSubcategory
                        return (
                          <>
                            <Accordion
                              type="single"
                              collapsible
                              value={getSubcategoryValue(section.id)}
                              onValueChange={value => handleSubcategoryChange(section.id, value)}
                              className="w-full max-w-full min-w-0"
                              data-naprawy-accordion="true"
                            >
                              {subcategoryItems}
                            </Accordion>
                            <div
                              data-naprawy-bottom-segment="true"
                              style={{
                                '--naprawy-tail-h': isLastSubcategoryOpen ? '0px' : naprawySegmentMetrics ? `${naprawySegmentMetrics.bottomTailHeight}px` : '0px',
                                '--naprawy-seg-y': `-${bottomTailY}px`,
                              } as React.CSSProperties}
                            />
                          </>
                        )
                      }

                      if (isFaqSection) {
                        return (
                          <>
                            <Accordion
                              ref={faqContentResizeRef}
                              type="single"
                              collapsible
                              value={openFaq ?? undefined}
                              onValueChange={value => setOpenFaq(value ?? null)}
                              className="w-full"
                            >
                              {subcategoryItems}
                            </Accordion>
                            <div
                              data-faq-content-bottom-marker="true"
                              aria-hidden="true"
                              ref={el => { faqContentBottomRef.current = el }}
                            />
                          </>
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
                    <div
                      className="rounded-lg outline outline-1 outline-[#bfa76a]/10 md:outline-none md:border md:border-[#bfa76a]/10 overflow-hidden"
                      style={section.id === 'dojazd' ? { paddingTop: 0, marginTop: 0, overflow: 'visible' } : undefined}
                      ref={
                        section.id === 'diagnoza' ? (el => { diagnozaContentBottomRef.current = el }) :
                        section.id === 'dojazd' ? (el => { dojazdContentBottomRef.current = el }) :
                        section.id === 'konserwacja' ? (el => { konserwacjaContentBottomRef.current = el }) :
                        undefined
                      }
                    >
                      {isDruk3DCustomSection(service.slug, section.id) && section.intro && (
                        <p className="text-[13px] md:text-[14px] text-[rgba(255,255,245,0.8)] leading-[1.4] px-2 pt-2 pb-2 whitespace-pre-line">
                          {section.intro}
                        </p>
                      )}
                      {/* Мобильная версия - flex layout */}
                      <div className="block md:hidden">
                        {section.items?.map((item, idx) => {
                          const row = renderMobileServiceRow(
                            item,
                            idx,
                            idx === 0 && section.id !== 'dojazd' && !(service.slug === 'serwis-laptopow' && section.id === 'konserwacja'),
                            idx === (section.items?.length ?? 0) - 1,
                            false,
                            parseServiceText,
                            isDruk3DCustomSection(service.slug, section.id),
                            isDruk3DCustomSection(service.slug, section.id),
                            service.slug === 'serwis-laptopow' && section.id === 'konserwacja',
                            service.slug === 'serwis-laptopow' && section.id === 'konserwacja',
                            false,
                            service.slug === 'serwis-laptopow' && (section.id === 'diagnoza' || section.id === 'dojazd' || section.id === 'konserwacja'),
                          )
                          return row
                        })}
                      </div>
                      {/* Десктопная версия - HTML таблица */}
                      <div className="hidden md:block">
                        <Table className="table-fixed border-collapse">
                          <colgroup>
                            {isDruk3DCustomSection(service.slug, section.id) ? (
                              <>
                                <col style={{ width: '54%' }} />
                                <col style={{ width: '28%' }} />
                                <col style={{ width: '18%' }} />
                              </>
                            ) : (
                              <>
                                <col style={{ width: '67%' }} />
                                <col style={{ width: '16.5%' }} />
                                <col style={{ width: '16.5%' }} />
                              </>
                            )}
                          </colgroup>
                          <TableBody>
                            {section.items?.map((item, idx) => (
                              <TableRow
                                key={idx}
                                className={`border-white/20 border-b border-white/30 ${idx === 0 && section.id !== 'dojazd' ? 'border-t border-white/30' : ''}`}
                              >
                                <TableCell className="font-table-main text-[rgba(255,255,245,0.85)] py-1 pl-2 pr-2 !whitespace-normal w-auto max-w-[67%] leading-[1.3] tracking-normal overflow-hidden">
                                  {(() => {
                                    const parsed = parseServiceText(item.service)
                                    return (
                                      <div className="service-description-text">
                                        <div className="text-[16px] text-white service-description-text leading-[1.3]">
                                          {parsed.main}
                                        </div>
                                        {parsed.parentheses && renderParenthesesText(parsed.parentheses, '14px', false, service.slug === 'serwis-laptopow' && section.id === 'konserwacja')}
                                      </div>
                                    )
                                  })()}
                                </TableCell>
                                <TableCell className="py-1 pl-2 pr-2 align-middle leading-[1.3] text-center w-auto min-w-[80px] md:pl-4">
                                  {isDruk3DCustomSection(service.slug, section.id) ? (
                                    item.price.includes('zł/gram') ? (
                                      renderMaterialPrice(item.price)
                                    ) : item.service.startsWith('Wysyłka') ? (
                                      renderTwoLinePrice(item.price)
                                    ) : item.service.startsWith('Realizacja ekspresowa') ? (
                                      renderExpressPrice(item.price)
                                    ) : item.price.includes('\n') ? (
                                      renderExpressPrice(item.price)
                                    ) : (
                                      <div className="font-inter text-[13px] md:text-[14px] text-white leading-[1.3] whitespace-nowrap">
                                        {renderPlainPriceWithUnits(item.price)}
                                      </div>
                                    )
                                  ) : (
                                    renderPriceLines(item.price, item.link)
                                  )}
                                </TableCell>
                                <TableCell className="text-center py-1 pl-2 pr-2 align-middle leading-[1.3] md:pl-4">
                                  {renderDurationValue(item.duration)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      {isDruk3DCustomSection(service.slug, section.id) && section.priceFormula && (
                        <div className="border-t border-[#bfa76a]/20 px-2 pt-2 pb-1">
                          <p className="font-table-main text-[16px] text-white leading-[1.3]">
                            {section.priceFormula}
                          </p>
                        </div>
                      )}
                      {isDruk3DCustomSection(service.slug, section.id) && section.example && (
                        <div className="px-2 pb-2">
                          <p className="font-table-main text-[14px] text-[#cbb27c] leading-relaxed">
                            {section.example}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </AccordionContent>
            )
            return (
              <AccordionItem
                key={section.id}
                value={section.id}
                data-naprawy-main-section={section.id === 'naprawy' ? 'true' : undefined}
                className={cn(
                  "border-0 group mb-4 last:mb-0 scroll-mt-[120px]"
                )}
                ref={node => {
                  sectionRefs.current[section.id] = node
                  if (section.id === 'faq') faqItemRef.current = node
                }}
                style={section.id === 'naprawy' && naprawySegmentMetrics ? ({
                  '--naprawy-seg-size': `${naprawySegmentMetrics.containerWidth}px ${naprawySegmentMetrics.totalHeight}px`,
                } as React.CSSProperties) : undefined}
              >
                {useSplitHeaderLayout ? (
                  <>
                    {section.id === 'naprawy' && isSectionOpen(section.id) && (
                      /* Mobile only: one shared big backdrop behind the header row AND the
                         whole subcategory list together (unchanged behavior). Desktop uses
                         the segmented background-image slices below instead (md:hidden here). */
                      <img
                        src="/images/naprawy-open-parchment-desktop.webp"
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none md:hidden"
                      />
                    )}
                    <div
                      className={headerWrapperClassName}
                      data-section-id={section.id}
                      data-top-level-service-header="true"
                      data-naprawy-header-segment={section.id === 'naprawy' ? 'true' : undefined}
                      ref={section.id === 'naprawy' ? naprawyHeaderSegmentRef : undefined}
                      style={section.id === 'naprawy' ? ({ '--naprawy-seg-y': '0px' } as React.CSSProperties) : undefined}
                    >
                      {triggerNode}
                      {service.slug === 'serwis-laptopow' && section.id === 'naprawy' && isSectionOpen(section.id) && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span
                            data-naprawy-open-title="true"
                            className={cn(
                            "zakres-title-text text-xl md:text-2xl font-cormorant font-semibold transition-colors mb-1 leading-tight",
                            isWarmParchment ? "text-[#3A2817] group-hover:text-[#3A2817]" : "text-[#ffffff] group-hover:text-white",
                            "w-full text-center whitespace-nowrap"
                          )}>Naprawy i usługi serwisowe</span>
                        </div>
                      )}
                    </div>
                    <section data-open-header-split-content="true" data-section-id={section.id}>
                      {section.id === 'diagnoza' ? (
                        <>
                          {/* Same parchment asset/technique as /kontakt Formularz
                              zgłoszeniowy — img sits behind contentNode, offset -12px at
                              the top so it tucks under the CLOSED header without shifting
                              the table's own position. Height is --diagnoza-img-h
                              (service-accordion.tsx): computed so the image's
                              RAGGED-ANCHOR pixel (source row 1077/1121) lands exactly on
                              the next AccordionItem's top — same mechanism as Naprawy
                              above. */}
                          <img
                            src="/images/contact-form-parchment.webp"
                            alt=""
                            aria-hidden="true"
                            className="w-full h-full absolute left-0 right-0 bottom-0 -top-[12px] object-fill contact-form-parchment-shadow parchment-shadow-content pointer-events-none select-none"
                          />
                          <div className="relative z-10">{contentNode}</div>
                          <div
                            data-diagnoza-tail-spacer="true"
                            aria-hidden="true"
                            ref={el => { diagnozaTailSpacerRef.current = el }}
                            style={{ height: 0 }}
                          />
                        </>
                      ) : section.id === 'dojazd' ? (
                        <>
                          {/* Same mechanism as Diagnoza above, ported 1:1. Height is
                              --dojazd-img-h (service-accordion.tsx). */}
                          <img
                            src="/images/contact-form-parchment.webp"
                            alt=""
                            aria-hidden="true"
                            className="w-full h-full absolute left-0 right-0 bottom-0 -top-[12px] object-fill contact-form-parchment-shadow parchment-shadow-content pointer-events-none select-none"
                          />
                          <div className="relative z-10">{contentNode}</div>
                          <div
                            data-dojazd-tail-spacer="true"
                            aria-hidden="true"
                            ref={el => { dojazdTailSpacerRef.current = el }}
                            style={{ height: 0 }}
                          />
                        </>
                      ) : section.id === 'konserwacja' ? (
                        <>
                          {/* Same mechanism as Diagnoza above, ported 1:1. Height is
                              --konserwacja-img-h (service-accordion.tsx). */}
                          <img
                            src="/images/contact-form-parchment.webp"
                            alt=""
                            aria-hidden="true"
                            className="w-full h-full absolute left-0 right-0 bottom-0 -top-[12px] object-fill contact-form-parchment-shadow parchment-shadow-content pointer-events-none select-none"
                          />
                          <div className="relative z-10">{contentNode}</div>
                          <div
                            data-konserwacja-tail-spacer="true"
                            aria-hidden="true"
                            ref={el => { konserwacjaTailSpacerRef.current = el }}
                            style={{ height: 0 }}
                          />
                        </>
                      ) : section.id === 'faq' ? (
                        <>
                          {/* Same mechanism as Diagnoza/Czyszczenie above, ported 1:1 for
                              FAQ. Height is --faq-img-h (service-accordion.tsx). Own refs
                              (faqContentBottomRef/faqTailSpacerRef) — not the shared
                              konserwacja ones, no price grid/columns here. */}
                          <img
                            src="/images/contact-form-parchment.webp"
                            alt=""
                            aria-hidden="true"
                            className="w-full h-full absolute left-0 right-0 bottom-0 -top-[25px] object-fill contact-form-parchment-shadow parchment-shadow-content pointer-events-none select-none"
                          />
                          <div className="relative z-10">{contentNode}</div>
                        </>
                      ) : (
                        contentNode
                      )}
                    </section>
                  </>
                ) : (
                  <div className={headerWrapperClassName}>
                    {section.id === 'naprawy' ? (
                      <div
                        data-naprawy-header-segment="true"
                        ref={naprawyHeaderSegmentRef}
                        style={{ '--naprawy-seg-y': '0px' } as React.CSSProperties}
                      >
                        {triggerNode}
                        {service.slug === 'serwis-laptopow' && isSectionOpen(section.id) && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span
                              data-naprawy-open-title="true"
                              className={cn(
                                "zakres-title-text text-xl md:text-2xl font-cormorant font-semibold transition-colors mb-1 leading-tight",
                                isWarmParchment ? "text-[#3A2817] group-hover:text-[#3A2817]" : "text-[#ffffff] group-hover:text-white",
                                "w-full text-center whitespace-nowrap"
                              )}
                            >Naprawy i usługi serwisowe</span>
                          </div>
                        )}
                      </div>
                    ) : triggerNode}
                    {contentNode}
                  </div>
                )}
              </AccordionItem>
            )
          })}
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
              <PriceTooltipContent service={service} locale={locale} isMobile={isMobile} onClose={() => setCategoryTooltipOpen(false)} />
            </div>
          </div>
        </div>
      )}
      {service.slug === 'serwis-laptopow' && (
        <div
          data-faq-tail-spacer="true"
          aria-hidden="true"
          ref={el => { faqTailSpacerRef.current = el }}
          style={{ height: 0 }}
        />
      )}
    </div>
  )
}

export default ServiceAccordion
