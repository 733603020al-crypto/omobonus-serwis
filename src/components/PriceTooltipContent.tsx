'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { ServiceData } from '@/lib/services-data'
import { serviceAccordionI18n } from '@/lib/i18n/service-accordion'
import { renderPriceLines } from '@/components/service-accordion'
import { X } from 'lucide-react'
import { BacklitImage } from '@/components/backlit-image'

const DEVICE_CATEGORIES = [
  {
    title: 'Drukarka domowa',
    description:
      'Kompaktowe drukarki laserowe A4 o prostszej konstrukcji, przeznaczone do użytku domowego i niewielkich obciążeń.',
    features: [] as string[],
    examples: '',
  },
  {
    title: 'Drukarka biurowa',
    description:
      'Drukarki i urządzenia wielofunkcyjne A4/A3 do regularnej pracy, z bardziej rozbudowanym torem papieru i dodatkowymi modułami.',
    features: [] as string[],
    examples: '',
  },
  {
    title: 'Drukarka biznesowa',
    description:
      'Duże i rozbudowane urządzenia A4/A3 do intensywnej pracy, często z wieloma podajnikami, duplexem, ADF i modułami wykańczającymi.',
    features: [] as string[],
    examples: '',
  },
]

// Категории для страницы "Serwis Drukarek Termiczno-etykietowych"
const THERMAL_DEVICE_CATEGORIES = [
  {
    title: 'Drukarka biurkowa',
    description:
      'Kompaktowe drukarki etykiet przeznaczone do standardowej pracy przy mniejszych i średnich wolumenach.',
    features: [] as string[],
    examples: '',
  },
  {
    title: 'Drukarka półprzemysłowa',
    description:
      'Wydajniejsze drukarki do regularnej pracy w magazynach, handlu i logistyce, z bardziej rozbudowanym mechanizmem.',
    features: [] as string[],
    examples: '',
  },
  {
    title: 'Drukarka przemysłowa',
    description:
      'Drukarki o wzmocnionej konstrukcji do intensywnej lub ciągłej pracy, często wyposażone w dodatkowe moduły.',
    features: [] as string[],
    examples: '',
  },
]

// Категории для страницы "Serwis Drukarek Igłowych"
const NEEDLE_DEVICE_CATEGORIES = [
  {
    title: 'Mała drukarka igłowa',
    description:
      'Kompaktowe drukarki biurkowe z węższym torem papieru i prostszą konstrukcją.',
    features: [] as string[],
    examples: '',
  },
  {
    title: 'Średnia drukarka igłowa',
    description:
      'Większe drukarki biurowe i formularzowe z rozbudowanym mechanizmem podawania papieru.',
    features: [] as string[],
    examples: '',
  },
  {
    title: 'Duża drukarka igłowa',
    description:
      'Drukarki przemysłowe i szerokowierszowe do intensywnej pracy i wielowarstwowych formularzy.',
    features: [] as string[],
    examples: '',
  },
]

// Категории для страницы "Serwis Drukarek 3D" (те же описания, что у игольчатых)
const PRINTER_3D_DEVICE_CATEGORIES = NEEDLE_DEVICE_CATEGORIES.map((c, i) => ({
  ...c,
  title: ['Mała drukarka 3D', 'Średnia drukarka 3D', 'Duża drukarka 3D'][i],
  description: [
    'Kompaktowe drukarki o prostej konstrukcji i małym polu roboczym.',
    'Większe drukarki, często zamknięte lub CoreXY, z bardziej rozbudowaną mechaniką.',
    'Duże drukarki desktopowe i profesjonalne o rozbudowanej konstrukcji i bardziej pracochłonnym serwisie.',
  ][i],
  features: [] as string[],
}))

// Категории для страницы "Serwis Ploterów" (особенности — как у игольчатых)
const PLOTTER_DEVICE_CATEGORIES = NEEDLE_DEVICE_CATEGORIES.map((c, i) => ({
  ...c,
  title: ['Mały ploter', 'Średni ploter', 'Duży ploter'][i],
  description: [
    'Kompaktowe, zwykle do 24″. Prostsza konstrukcja i łatwiejszy dostęp serwisowy.',
    'Plotery o szerokości druku od 36″ do 44″. Większe gabaryty i bardziej rozbudowana konstrukcja.',
    'Plotery o szerokości druku powyżej 44″, np. 54–64″ i szersze. Cięższa konstrukcja i bardziej pracochłonny serwis.',
  ][i],
  features: [] as string[],
}))

// Категории для страницы "Serwis Drukarek Atramentowych" (те же title/картинки, свои описания, без подписей)
const INKJET_DEVICE_CATEGORIES = DEVICE_CATEGORIES.map((c, i) => ({
  ...c,
  description: [
    'Kompaktowe drukarki A4 o prostszej konstrukcji, przeznaczone do użytku domowego i okazjonalnego.',
    'Drukarki A4/A3 do regularnej pracy, często z rozbudowanym podajnikiem, skanerem lub systemem stałego zasilania tuszem.',
    'Większe i bardziej rozbudowane urządzenia A4/A3 do intensywnej pracy i większych obciążeń.',
  ][i],
  features: [] as string[],
}))

// Функция для получения категорий устройств в зависимости от страницы
const getDeviceCategories = (serviceSlug?: string) => {
  if (serviceSlug === 'serwis-drukarek-atramentowych') {
    return INKJET_DEVICE_CATEGORIES
  }
  if (serviceSlug === 'serwis-drukarek-termicznych') {
    return THERMAL_DEVICE_CATEGORIES
  }
  if (serviceSlug === 'serwis-drukarek-iglowych') {
    return NEEDLE_DEVICE_CATEGORIES
  }
  if (serviceSlug === 'serwis-drukarek-3d') {
    return PRINTER_3D_DEVICE_CATEGORIES
  }
  if (serviceSlug === 'serwis-plotterow') {
    return PLOTTER_DEVICE_CATEGORIES
  }
  return DEVICE_CATEGORIES
}

// Функция для получения пути к картинке принтера по названию категории
const getPrinterImageForCategory = (categoryTitle: string, serviceSlug?: string): string => {
  if (serviceSlug === 'serwis-plotterow') {
    switch (categoryTitle) {
      case 'Mały ploter':
        return '/images/plotter-carousel-v3-02.webp'
      case 'Średni ploter':
        return '/images/plotter-carousel-v3-04.webp'
      case 'Duży ploter':
        return '/images/plotter-carousel-v3-05.webp'
      default:
        return ''
    }
  }

  if (serviceSlug === 'serwis-drukarek-3d') {
    switch (categoryTitle) {
      case 'Mała drukarka 3D':
        return '/images/druk3d-carousel-v3-01.webp'
      case 'Średnia drukarka 3D':
        return '/images/druk3d-carousel-v3-04.webp'
      case 'Duża drukarka 3D':
        return '/images/druk3d-carousel-v3-06.webp'
      default:
        return ''
    }
  }

  // Для страницы "Serwis Drukarek Igłowych" используем специальные изображения
  if (serviceSlug === 'serwis-drukarek-iglowych') {
    switch (categoryTitle) {
      case 'Mała drukarka igłowa':
        return '/images/iglowe-carousel-v3-02.webp'
      case 'Średnia drukarka igłowa':
        return '/images/iglowe-carousel-v3-04.webp'
      case 'Duża drukarka igłowa':
        return '/images/iglowe-carousel-v3-07.webp'
      default:
        return ''
    }
  }

  // Для страницы "Serwis Drukarek Termiczno-etykietowych" используем специальные изображения
  if (serviceSlug === 'serwis-drukarek-termicznych') {
    switch (categoryTitle) {
      case 'Drukarka biurkowa':
        return '/images/termiczne-carousel-v3-02.webp'
      case 'Drukarka półprzemysłowa':
        return '/images/termiczne-carousel-v3-03.webp'
      case 'Drukarka przemysłowa':
        return '/images/termiczne-carousel-v3-06.webp'
      default:
        return ''
    }
  }

  // Для страницы "Serwis Drukarek Atramentowych" используем специальные изображения
  if (serviceSlug === 'serwis-drukarek-atramentowych') {
    switch (categoryTitle) {
      case 'Drukarka domowa':
        return '/images/atrament-carousel-v3-01.webp'
      case 'Drukarka biurowa':
        return '/images/atrament-carousel-v3-04.webp'
      case 'Drukarka biznesowa':
        return '/images/atrament-carousel-v3-05.webp'
      default:
        return ''
    }
  }

  // serwis-drukarek-laserowych (default categories)
  switch (categoryTitle) {
    case 'Drukarka domowa':
      return '/images/laser-carousel-v3-02.webp'
    case 'Drukarka biurowa':
      return '/images/laser-carousel-v3-04.webp'
    case 'Drukarka biznesowa':
      return '/images/laser-carousel-v3-07.webp'
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
  // Same backing as the header "Usługi" mega menu (parchment + black/55, gold
  // border, shadow). All four pages with this popup.
  const menuBacking = service.slug === 'serwis-drukarek-laserowych' || service.slug === 'serwis-drukarek-atramentowych' || service.slug === 'serwis-drukarek-iglowych' || service.slug === 'serwis-drukarek-termicznych' || service.slug === 'serwis-drukarek-3d' || service.slug === 'serwis-plotterow'
  // golden back light behind the category pictures — temporarily off; to enable: laser page only
  const backlit = false as boolean // service.slug === 'serwis-drukarek-laserowych'

  return (
    <div
      ref={tooltipContentRef}
      className={cn(
        "relative pointer-events-auto text-[#f8eacd] overflow-hidden",
        menuBacking
          ? "rounded-lg border-2 border-[rgba(200,169,107,0.5)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          : "rounded-2xl border border-[rgba(200,169,107,0.45)] shadow-[0_22px_45px_rgba(0,0,0,0.5)]",
        isMobile ? "w-full min-h-fit" : "w-[min(calc(100vw-32px),900px)] md:w-[min(calc(100vw-64px),900px)] max-h-[90vh] md:max-h-[88vh]"
      )}
      style={{
        backgroundImage: menuBacking ? 'var(--bg-parchment)' : "url('/images/services-background.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={cn("absolute inset-0 pointer-events-none", menuBacking ? "rounded-lg bg-black/55" : "rounded-2xl bg-[rgba(0,0,0,0.5)]")} />
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
          aria-label={t.closeAriaLabel}
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
          <h4 className={cn("text-[22px] md:text-[26px] font-cormorant font-semibold tracking-wide", menuBacking ? "text-[#f3df9a]" : "text-white")}>
            {t.deviceCategoriesTitle}
          </h4>
          <p className="text-[15px] md:text-[17px] text-[rgba(255,255,245,0.85)] leading-snug font-cormorant">
            {service.slug === 'serwis-drukarek-iglowych'
              ? t.deviceCategoriesDescription.serwisDrukarekIglowych
              : service.slug === 'serwis-drukarek-termicznych'
                ? t.deviceCategoriesDescription.serwisDrukarekTermicznych
                : service.slug === 'serwis-drukarek-3d'
                ? t.deviceCategoriesDescription.serwisDrukarek3d
                : service.slug === 'serwis-plotterow'
                ? t.deviceCategoriesDescription.serwisPlotterow
                : service.slug === 'serwis-drukarek-atramentowych'
                ? t.deviceCategoriesDescription.serwisDrukarekAtramentowych
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
            const ukCat = (service.slug === 'serwis-drukarek-atramentowych' ? t.categoryTranslationsAtrament[category.title] : undefined) ?? t.categoryTranslations[category.title] ?? null
            return (
            <div
              key={category.title}
              className={cn("bg-[rgba(255,255,255,0.08)] border border-[rgba(191,167,106,0.35)] rounded-xl p-4 flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] text-center", backlit && "relative isolate overflow-hidden")}
            >
              <div>
                <div className={cn("text-xl font-cormorant font-semibold", menuBacking ? "text-[#f3df9a]" : "text-white")}>{ukCat ? ukCat.title : category.title}</div>
                <p className={cn("text-[rgba(255,255,245,0.85)] leading-snug mt-1 whitespace-pre-line", menuBacking ? "text-[14px] md:text-[16px] font-cormorant" : "text-xs md:text-sm")}>
                  {ukCat ? ukCat.description : category.description}
                </p>
              </div>
              {/* Добавление картинки принтера */}
              <div className="flex justify-center items-center my-3">
                {backlit ? (
                  <BacklitImage
                    src={getPrinterImageForCategory(category.title, service.slug)}
                    alt={category.title}
                    width={200}
                    height={150}
                    className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-contain"
                  />
                ) : (
                <Image
                  src={getPrinterImageForCategory(category.title, service.slug)}
                  alt={category.title}
                  width={200}
                  height={150}
                  className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-contain"
                  unoptimized
                />
                )}
              </div>
              {(ukCat ? ukCat.features : category.features).length > 0 && (
                <p className="text-[13px] text-[rgba(255,255,245,0.85)] leading-snug font-table-sub text-center mt-auto pt-2">
                  {(ukCat ? ukCat.features : category.features).join(', ')}
                </p>
              )}
            </div>
          )})}
        </div>
      </div>
    </div>
  )
}
