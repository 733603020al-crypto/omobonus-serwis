'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { ServiceData } from '@/lib/services-data'
import { serviceAccordionI18n, type ServiceAccordionDict } from '@/lib/i18n/service-accordion'
import { renderPriceLines } from '@/components/service-accordion'
import { X } from 'lucide-react'
import { BacklitImage } from '@/components/backlit-image'

type DeviceCategoriesTextKey = keyof ServiceAccordionDict['deviceCategoriesDescription']

// Osobne mapy tłumaczeń kart w i18n — dla stron, na których polski tytuł karty powtarza się na innej stronie
type DeviceCategoriesTranslationsKey =
  | 'categoryTranslationsAtrament'
  | 'categoryTranslationsDtg'
  | 'categoryTranslationsDtf'
  | 'categoryTranslationsSublimacja'
  | 'categoryTranslationsSpozywcze'

interface DeviceCategory {
  /** Polski tytuł karty — zarazem klucz tłumaczenia UK/RU w i18n */
  title: string
  /** Polski opis karty (bez kropki na końcu) */
  description: string
  /** Obrazek karty z public/images */
  image: string
}

interface DeviceCategoriesWindow {
  /** Klucz w i18n: deviceCategoriesDescription (opis, obowiązkowy) i deviceCategoriesNote (uwaga pod kartami, opcjonalna) */
  textKey: DeviceCategoriesTextKey
  /** Przykład „(np. A / B / C zł netto)” — trzy ceny jednej usługi z cennika tej samej strony, w kolejności kart */
  priceExample: string
  /** Osobna mapa tłumaczeń kart; bez niej — wspólna categoryTranslations */
  translationsKey?: DeviceCategoriesTranslationsKey
  categories: [DeviceCategory, DeviceCategory, DeviceCategory]
}

// Okno „Kategorie urządzeń” — jedna konfiguracja na stronę (slug). Nowe okno = nowy wpis tutaj
// + teksty w i18n (deviceCategoriesDescription, tłumaczenia kart, opcjonalnie deviceCategoriesNote).
// Przykład cen: diagnoza i wycena naprawy; plotery, 3D i niszczarki — czyszczenie i konserwacja.
// Standard: docs/standards/kategorie-urzadzen-standard.md
const DEVICE_CATEGORIES_WINDOWS: Record<string, DeviceCategoriesWindow> = {
  'serwis-drukarek-laserowych': {
    textKey: 'default',
    priceExample: '70 / 100 / 150',
    categories: [
      { title: 'Drukarka domowa', description: 'Małe drukarki laserowe A4 do domu i okazjonalnego drukowania', image: '/images/laser-carousel-v3-02.webp' },
      { title: 'Drukarka biurowa', description: 'Drukarki i urządzenia wielofunkcyjne A4/A3 do codziennej pracy w biurze', image: '/images/laser-carousel-v3-04.webp' },
      { title: 'Drukarka biznesowa', description: 'Duże urządzenia A4/A3 do intensywnej pracy w firmie, często z kilkoma podajnikami papieru i dodatkowym wyposażeniem', image: '/images/laser-carousel-v3-07.webp' },
    ],
  },
  'serwis-drukarek-atramentowych': {
    textKey: 'serwisDrukarekAtramentowych',
    priceExample: '70 / 100 / 150',
    translationsKey: 'categoryTranslationsAtrament',
    categories: [
      { title: 'Drukarka domowa', description: 'Małe drukarki atramentowe A4 do domu i okazjonalnego drukowania', image: '/images/atrament-carousel-v3-01.webp' },
      { title: 'Drukarka biurowa', description: 'Drukarki A4/A3 do codziennej pracy w biurze, często ze skanerem lub dużymi zbiornikami tuszu', image: '/images/atrament-carousel-v3-04.webp' },
      { title: 'Drukarka biznesowa', description: 'Większe i bardziej rozbudowane urządzenia A4/A3 do intensywnej pracy w firmie', image: '/images/atrament-carousel-v3-05.webp' },
    ],
  },
  'serwis-plotterow': {
    textKey: 'serwisPlotterow',
    priceExample: '350 / 500 / 700',
    categories: [
      { title: 'Mały ploter', description: 'Kompaktowe plotery o szerokości druku do 24″', image: '/images/plotter-carousel-v3-02.webp' },
      { title: 'Średni ploter', description: 'Plotery o szerokości druku powyżej 24″ do 44″', image: '/images/plotter-carousel-v3-04.webp' },
      { title: 'Duży ploter', description: 'Plotery o szerokości druku powyżej 44″', image: '/images/plotter-carousel-v3-05.webp' },
    ],
  },
  'serwis-drukarek-termicznych': {
    textKey: 'serwisDrukarekTermicznych',
    priceExample: '100 / 150 / 200',
    categories: [
      { title: 'Drukarka biurkowa', description: 'Małe drukarki etykiet do codziennej pracy przy niewielkiej i średniej liczbie wydruków', image: '/images/termiczne-carousel-v3-02.webp' },
      { title: 'Drukarka półprzemysłowa', description: 'Wydajniejsze drukarki do regularnej pracy w magazynach, sklepach i logistyce', image: '/images/termiczne-carousel-v3-03.webp' },
      { title: 'Drukarka przemysłowa', description: 'Wytrzymałe drukarki do intensywnej lub ciągłej pracy, często z dodatkowym wyposażeniem', image: '/images/termiczne-carousel-v3-06.webp' },
    ],
  },
  'serwis-drukarek-iglowych': {
    textKey: 'serwisDrukarekIglowych',
    priceExample: '50 / 70 / 100',
    categories: [
      { title: 'Mała drukarka igłowa', description: 'Małe drukarki biurkowe z węższym torem papieru', image: '/images/iglowe-carousel-v3-02.webp' },
      { title: 'Średnia drukarka igłowa', description: 'Większe drukarki do biura i drukowania formularzy', image: '/images/iglowe-carousel-v3-04.webp' },
      { title: 'Duża drukarka igłowa', description: 'Duże drukarki do intensywnej pracy i drukowania formularzy wielowarstwowych', image: '/images/iglowe-carousel-v3-07.webp' },
    ],
  },
  'serwis-drukarek-3d': {
    textKey: 'serwisDrukarek3d',
    priceExample: '200 / 250 / 350',
    categories: [
      { title: 'Mała drukarka 3D', description: 'Kompaktowe drukarki o prostej konstrukcji i niewielkim polu roboczym', image: '/images/druk3d-carousel-v3-01.webp' },
      { title: 'Średnia drukarka 3D', description: 'Większe drukarki, często z zamkniętą obudową i bardziej rozbudowaną mechaniką', image: '/images/druk3d-carousel-v3-04.webp' },
      { title: 'Duża drukarka 3D', description: 'Duże drukarki desktopowe i profesjonalne o rozbudowanej konstrukcji', image: '/images/druk3d-carousel-v3-06.webp' },
    ],
  },
  'serwis-niszczarek': {
    textKey: 'serwisNiszczarek',
    priceExample: '150 / 200 / 250',
    categories: [
      { title: 'Mała', description: 'Małe niszczarki do domu i małego biura, przeznaczone do niszczenia niewielkich ilości dokumentów', image: '/images/niszczarki-carousel-v1-01.webp' },
      { title: 'Biurowa', description: 'Niszczarki do codziennej pracy w biurze, przeznaczone dla kilku użytkowników', image: '/images/niszczarki-carousel-v1-04.webp' },
      { title: 'Profesjonalna', description: 'Wydajne niszczarki do intensywnej pracy i niszczenia dużych ilości dokumentów', image: '/images/niszczarki-carousel-v2-06.webp' },
    ],
  },
  'naprawa-zasilaczy-ups': {
    textKey: 'ups',
    priceExample: '60 / 100 / 180',
    categories: [
      { title: 'do 1 kVA', description: 'Małe zasilacze do komputera, routera, kasy fiskalnej lub monitoringu', image: '/images/ups-carousel-v1-01.webp' },
      { title: '1–3 kVA', description: 'Zasilacze do biura i małych serwerów, stojące lub przeznaczone do szafy serwerowej', image: '/images/ups-carousel-v1-04.webp' },
      { title: '3–10 kVA', description: 'Zasilacze do serwerowni i firm, często typu online (z podwójną konwersją), z dodatkowymi modułami bateryjnymi', image: '/images/ups-carousel-v1-06.webp' },
    ],
  },
  'naprawa-projektorow': {
    textKey: 'projektory',
    priceExample: '60 / 100 / 180',
    categories: [
      { title: 'Projektory kompaktowe', description: 'Małe i przenośne projektory do użytku domowego, podróży i niewielkich pomieszczeń', image: '/images/projektory-kategoria-kompaktowe.webp' },
      { title: 'Projektory domowe i biurowe', description: 'Projektory do oglądania filmów, prezentacji oraz codziennego użytku w domach, biurach i szkołach', image: '/images/projektory-kategoria-domowe-biurowe.webp' },
      { title: 'Projektory profesjonalne i instalacyjne', description: 'Zaawansowane projektory do sal konferencyjnych, audytoriów i dużych obiektów, przeznaczone do intensywnej pracy', image: '/images/projektory-kategoria-profesjonalne.webp' },
    ],
  },
  'serwis-drukarek-do-kart-plastikowych': {
    textKey: 'serwisDrukarekDoKart',
    priceExample: '100 / 150 / 200',
    categories: [
      { title: 'Podstawowa', description: 'Drukarki do jednostronnego nadruku na kartach plastikowych, np. identyfikatorach i kartach pracowniczych', image: '/images/karty-carousel-v1-01.webp' },
      { title: 'Biznesowa', description: 'Drukarki do dwustronnego nadruku i codziennej pracy, często z możliwością zapisu danych na pasku magnetycznym lub chipie', image: '/images/karty-carousel-v1-04.webp' },
      { title: 'Retransferowa', description: 'Drukarki nanoszące nadruk na kartę za pomocą specjalnej folii, przeznaczone do uzyskiwania wysokiej jakości wydruków', image: '/images/karty-carousel-v1-06.webp' },
    ],
  },
  'serwis-drukarek-dtg': {
    textKey: 'serwisDrukarekDtg',
    priceExample: '150 / 250 / 450',
    translationsKey: 'categoryTranslationsDtg',
    categories: [
      { title: 'Kompaktowa', description: 'Małe drukarki DTG do krótkich serii i personalizacji odzieży', image: '/images/dtg-carousel-v1-01.webp' },
      { title: 'Profesjonalna', description: 'Drukarki DTG do codziennej produkcji i większych nakładów', image: '/images/dtg-carousel-v1-03.webp' },
      { title: 'Przemysłowa', description: 'Duże i wydajne drukarki DTG do produkcji seryjnej i dużych nakładów', image: '/images/dtg-carousel-v1-05.webp' },
    ],
  },
  'serwis-drukarek-dtf': {
    textKey: 'serwisDrukarekDtf',
    priceExample: '250 / 350 / 500',
    translationsKey: 'categoryTranslationsDtf',
    categories: [
      { title: 'Kompaktowa', description: 'Małe drukarki DTF do krótkich serii i personalizacji odzieży', image: '/images/dtf-carousel-v3-01.webp' },
      { title: 'Profesjonalna', description: 'Drukarki DTF do codziennej produkcji i większych nakładów', image: '/images/dtf-carousel-v3-03.webp' },
      { title: 'Przemysłowa', description: 'Duże i wydajne drukarki DTF do produkcji seryjnej i dużych nakładów', image: '/images/dtf-carousel-v3-06.webp' },
    ],
  },
  'serwis-drukarek-sublimacyjnych': {
    textKey: 'serwisDrukarekSublimacja',
    priceExample: '150 / 250 / 400',
    translationsKey: 'categoryTranslationsSublimacja',
    categories: [
      { title: 'Kompaktowa', description: 'Małe drukarki sublimacyjne do krótkich serii i personalizacji', image: '/images/sublimacja-carousel-v1-02.webp' },
      { title: 'Profesjonalna', description: 'Drukarki sublimacyjne do codziennej produkcji i większych formatów', image: '/images/sublimacja-carousel-v1-04.webp' },
      { title: 'Wielkoformatowa', description: 'Duże drukarki sublimacyjne do druku z roli i dużych nakładów', image: '/images/sublimacja-carousel-v1-06.webp' },
    ],
  },
  'serwis-drukarek-spozywczych': {
    textKey: 'serwisDrukarekSpozywczych',
    priceExample: '50 / 100 / 150',
    translationsKey: 'categoryTranslationsSpozywcze',
    categories: [
      { title: 'Arkuszowa', description: 'Drukarki atramentowe z jadalnym tuszem do drukowania na arkuszach cukrowych i waflowych', image: '/images/spozywcze-category-01.webp' },
      { title: 'Kompaktowa', description: 'Niewielkie drukarki do bezpośredniego nadruku na ciastkach i innych produktach spożywczych', image: '/images/spozywcze-category-02.webp' },
      { title: 'Profesjonalna', description: 'Większe drukarki do regularnego wykonywania nadruków bezpośrednio na produktach spożywczych', image: '/images/spozywcze-category-03.webp' },
    ],
  },
  'serwis-ekspresow-do-kawy': {
    textKey: 'serwisEkspresowDoKawy',
    priceExample: '80 / 120 / 180',
    categories: [
      { title: 'Ekspresy domowe', description: 'Ekspresy automatyczne i kolbowe do codziennego użytku domowego', image: '/images/kawa-carousel-v1-01.webp' },
      { title: 'Ekspresy biurowe', description: 'Ekspresy do biur i firm, przystosowane do przygotowywania większej liczby kaw', image: '/images/kawa-carousel-v1-04.webp' },
      { title: 'Ekspresy gastronomiczne', description: 'Ekspresy do kawiarni, restauracji i hoteli, przeznaczone do intensywnej pracy', image: '/images/kawa-carousel-v1-05.webp' },
    ],
  },
}

// Standard okna (docs/standards/kategorie-urzadzen-standard.md): linia 1 „Cena zależy od …:”, linia 2 „pierwsza – …”.
// Dzielimy po pierwszym „: ”, tylko gdy dalej zaczyna się wyliczenie kategorii; inaczej tekst zostaje jednym akapitem.
const splitDeviceCategoriesDescription = (text: string): string[] => {
  const idx = text.indexOf(': ')
  if (idx < 0 || !/^(pierwsza|перша|первая)\s/i.test(text.slice(idx + 2))) return [text]
  return [text.slice(0, idx + 1), text.slice(idx + 2)]
}

interface PriceTooltipContentProps {
  service: ServiceData
  locale?: 'pl' | 'uk' | 'ru' | 'en'
  isMobile: boolean
  onClose: () => void
  // Ceny diagnozy (3 progi) — zastępują stały przykład okna; brak → przykład z konfiguracji
  priceExample?: string
}

// Rendered only for slugs in SPECIAL_TOOLTIP_SERVICES (service-accordion.tsx) — code-split
// out so other service pages don't parse this device-category grid (+ its images) at all.
export function PriceTooltipContent({ service, locale = 'pl', isMobile, onClose, priceExample }: PriceTooltipContentProps) {
  const t = serviceAccordionI18n[locale]
  const tooltipContentRef = useRef<HTMLDivElement | null>(null)
  // Same backing as the header "Usługi" mega menu (parchment + black/55, gold
  // border, shadow). All four pages with this popup.
  const menuBacking = service.slug in DEVICE_CATEGORIES_WINDOWS
  // golden back light behind the category pictures — temporarily off; to enable: laser page only
  const backlit = false as boolean // service.slug === 'serwis-drukarek-laserowych'
  // Dane okna z konfiguracji po slug (slug spoza konfiguracji — okno drukarek laserowych, jak dotąd)
  const win = DEVICE_CATEGORIES_WINDOWS[service.slug] ?? DEVICE_CATEGORIES_WINDOWS['serwis-drukarek-laserowych']
  const deviceCategoriesNote = t.deviceCategoriesNote?.[win.textKey]
  const example = priceExample ?? win.priceExample

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
          <h4 className={cn("text-[22px] md:text-[26px] leading-normal md:leading-4 font-cormorant font-semibold tracking-wide", menuBacking ? "text-[#f3df9a]" : "text-white")}>
            {t.deviceCategoriesTitle}
          </h4>
          <p className="text-[15px] md:text-[17px] text-[rgba(255,255,245,0.85)] leading-snug font-cormorant">
            {splitDeviceCategoriesDescription(t.deviceCategoriesDescription[win.textKey]).map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </p>
          {example && (
          <div className="mt-1 flex items-center justify-center gap-1">
            <span className="text-[15px] md:text-[17px] leading-normal md:leading-4 text-[rgba(255,255,245,0.85)] font-cormorant">{t.exampleLabel}</span>
            <div className="flex items-center">
              <div className="drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">
                {renderPriceLines(`${example} ${locale === 'pl' ? 'zł netto' : locale === 'en' ? 'zł net' : 'zł нетто'}`)}
              </div>
            </div>
            <span className="text-[15px] md:text-[17px] leading-normal md:leading-4 text-[rgba(255,255,245,0.85)] font-cormorant">)</span>
          </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto_auto_auto] gap-4 md:gap-x-6 md:gap-y-0 pb-4">
          {win.categories.map(category => {
            const ukCat = (win.translationsKey ? t[win.translationsKey][category.title] : undefined) ?? t.categoryTranslations[category.title] ?? null
            return (
            <div
              key={category.title}
              className={cn("bg-[rgba(255,255,255,0.08)] border border-[rgba(191,167,106,0.35)] rounded-xl p-4 flex flex-col md:grid md:grid-rows-subgrid md:row-span-4 md:gap-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] text-center", backlit && "relative isolate overflow-hidden")}
            >
              {/* md+: wiersze karty wspólne z sąsiednimi kartami (subgrid) — strefa tytułu, opis i obrazek na tej samej wysokości */}
              <div className={cn("text-xl font-cormorant font-semibold md:flex md:items-center md:justify-center", menuBacking ? "text-[#f3df9a]" : "text-white")}>{ukCat ? ukCat.title : category.title}</div>
              <p className={cn("text-[rgba(255,255,245,0.85)] mt-1 whitespace-pre-line", menuBacking ? "text-[14px] md:text-[16px] leading-normal md:leading-4 font-cormorant" : "text-xs md:text-sm")}>
                {ukCat ? ukCat.description : category.description}
              </p>
              {/* Добавление картинки принтера */}
              <div className="flex justify-center items-center my-3">
                {backlit ? (
                  <BacklitImage
                    src={category.image}
                    alt={category.title}
                    width={200}
                    height={150}
                    className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-contain"
                  />
                ) : (
                <Image
                  src={category.image}
                  alt={category.title}
                  width={200}
                  height={150}
                  className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-contain"
                  unoptimized
                />
                )}
              </div>
              {(ukCat?.features ?? []).length > 0 && (
                <p className="text-[13px] text-[rgba(255,255,245,0.85)] leading-snug font-table-sub text-center mt-auto pt-2">
                  {(ukCat?.features ?? []).join(', ')}
                </p>
              )}
            </div>
          )})}
        </div>
        {deviceCategoriesNote && (
          <p className="text-center text-[15px] md:text-[17px] text-[rgba(255,255,245,0.85)] leading-snug font-cormorant">
            {deviceCategoriesNote}
          </p>
        )}
      </div>
    </div>
  )
}
