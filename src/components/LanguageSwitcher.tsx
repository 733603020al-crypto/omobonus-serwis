'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import manifest from '@/config/manifest'

interface LocaleOption {
  code: 'pl' | 'uk' | 'ru'
  /** Префикс маршрута локали, '' для корневой (pl) локали */
  prefix: string
  /** Полное название языка в выпадающем списке */
  fullLabel: string
  flagSrc: string
  /** Изображение с коротким обозначением (PL/UA) для верхней строки —
   *  не текстовый узел React, чтобы браузерные переводчики не могли его подменить. */
  labelSrc?: string
  labelWidth?: number
  labelHeight?: number
}

// Видимые сейчас локали. Чтобы добавить язык (например ru), достаточно
// добавить новый элемент сюда — JSX переключателя менять не нужно.
const SUPPORTED_LOCALES: LocaleOption[] = [
  { code: 'pl', prefix: '', fullLabel: 'Polski', flagSrc: '/images/pl.webp', labelSrc: '/images/lang-label-pl.svg', labelWidth: 16, labelHeight: 18 },
  { code: 'uk', prefix: '/uk', fullLabel: 'Українська', flagSrc: '/images/ua.webp', labelSrc: '/images/lang-label-uk.svg', labelWidth: 20, labelHeight: 18 },
  { code: 'ru', prefix: '/ru', fullLabel: 'Русский', flagSrc: '/images/other.webp' },
]

function matchesLocale(pathname: string, locale: LocaleOption): boolean {
  if (!locale.prefix) return true
  return pathname === locale.prefix || pathname.startsWith(locale.prefix + '/')
}

function getCurrentLocale(pathname: string): LocaleOption {
  return SUPPORTED_LOCALES.find(locale => locale.prefix && matchesLocale(pathname, locale)) ?? SUPPORTED_LOCALES[0]
}

/** Путь страницы без префикса текущей локали (т.е. "польский" вид пути) */
function getBasePath(pathname: string, currentLocale: LocaleOption): string {
  if (!currentLocale.prefix) return pathname
  const rest = pathname.slice(currentLocale.prefix.length)
  return rest || '/'
}

function buildLocaleHref(basePath: string, targetLocale: LocaleOption): string {
  if (!targetLocale.prefix) return basePath
  return basePath === '/' ? targetLocale.prefix : targetLocale.prefix + basePath
}

// Локали, которые всегда видны в самой шапке (не только в выпадающем списке).
// Остальные поддерживаемые локали (сейчас — ru) остаются доступны через стрелку.
const ALWAYS_VISIBLE_CODES: LocaleOption['code'][] = ['pl', 'uk']

export function LanguageSwitcher() {
  const pathname = usePathname() ?? '/'
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const currentLocale = getCurrentLocale(pathname)
  const basePath = getBasePath(pathname, currentLocale)
  const visibleLocales = SUPPORTED_LOCALES.filter(locale => ALWAYS_VISIBLE_CODES.includes(locale.code))

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const dropdownItemClass = (active: boolean) =>
    `flex items-center gap-2 rounded-sm border border-transparent px-2 py-1.5 font-cormorant text-[15px] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#bfa76a]/80 hover:bg-gradient-to-r hover:from-[#bfa76a]/40 hover:via-[#bfa76a]/20 hover:to-transparent hover:text-[#f3df9a] hover:shadow-[0_0_30px_rgba(191,167,106,0.45)] hover:[text-shadow:0_0_12px_rgba(191,167,106,0.65)] [&:hover_img]:opacity-100 ${
      active ? 'text-[#f3df9a] [text-shadow:0_0_8px_rgba(191,167,106,0.5)]' : 'text-white'
    }`

  return (
    <div
      ref={ref}
      translate="no"
      className="notranslate relative h-full flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center gap-2">
        {visibleLocales.map(locale => (
          <Link
            key={locale.code}
            href={buildLocaleHref(basePath, locale)}
            onClick={() => setIsOpen(false)}
            aria-label={locale.fullLabel}
            className={`group !flex items-center gap-1 transition-all duration-300 ease-out hover:-translate-y-0.5 select-none ${
              locale.code === currentLocale.code ? 'nav-active-underline' : ''
            }`}
          >
            <Image
              src={locale.flagSrc}
              alt=""
              width={18}
              height={13}
              className="rounded-[2px] object-cover flex-shrink-0"
              unoptimized
            />
            {locale.labelSrc && (
              <Image
                src={locale.labelSrc}
                alt=""
                width={locale.labelWidth}
                height={locale.labelHeight}
                className="flex-shrink-0 transition-all duration-300 ease-out group-hover:brightness-125 group-hover:[filter:drop-shadow(0_0_6px_rgba(191,167,106,0.6))]"
                unoptimized
              />
            )}
          </Link>
        ))}
        <button
          type="button"
          onClick={() => setIsOpen(o => !o)}
          className="flex items-center text-[#bfa76a] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-[#f3df9a] hover:[text-shadow:0_0_10px_rgba(191,167,106,0.55)] select-none"
          style={isOpen ? { textShadow: '0 0 8px rgba(191,167,106,0.7), 0 0 18px rgba(191,167,106,0.35)' } : undefined}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Wybierz język / Вибрати мову"
        >
          <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 z-50 w-[155px] rounded-b-lg border-2 border-[rgba(200,169,107,0.5)] overflow-hidden opacity-95 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <Image src={manifest.Background_1} alt="" fill sizes="155px" className="object-cover object-center" />
          <div className="absolute inset-0 bg-black/75" />
          <div className="relative z-10 p-2 flex flex-col divide-y divide-[#bfa76a]/25">
            {SUPPORTED_LOCALES.map(locale => (
              <Link
                key={locale.code}
                href={buildLocaleHref(basePath, locale)}
                onClick={() => setIsOpen(false)}
                className={dropdownItemClass(locale.code === currentLocale.code)}
              >
                <Image src={locale.flagSrc} alt="" width={20} height={15} className="rounded-[2px] object-cover flex-shrink-0 opacity-90" unoptimized />
                {locale.fullLabel}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
