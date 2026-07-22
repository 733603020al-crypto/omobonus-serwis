'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { ServiceData } from '@/lib/services-data'
import { serviceAccordionI18n } from '@/lib/i18n/service-accordion'
import { renderPriceLines } from '@/components/service-accordion'
import { X } from 'lucide-react'

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

interface PriceTooltipContentProps {
  service: ServiceData
  locale?: 'pl' | 'uk' | 'ru'
  isMobile: boolean
  onClose: () => void
}

// Only rendered for the 4 "special tooltip" services (SPECIAL_TOOLTIP_SERVICES in
// service-accordion.tsx) — code-split out so the other 7 service pages don't parse
// this device-category grid (+ its images) at all.
export function PriceTooltipContent({ service, locale = 'pl', isMobile, onClose }: PriceTooltipContentProps) {
  const t = serviceAccordionI18n[locale]
  const tooltipContentRef = useRef<HTMLDivElement | null>(null)

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
            onClose()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              e.stopPropagation()
              onClose()
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
