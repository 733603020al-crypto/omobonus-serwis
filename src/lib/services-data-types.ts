export interface PricingItem {
  service: string
  // Реальная цена для мигрированных позиций — только в services-pricing-data.ts
  // (см. getDisplayPrice). Строковое значение здесь остаётся только там, где
  // цена не мигрирована (3D-печать по формуле, priceTiers-таблицы).
  price?: string
  link?: string
  tooltipSlug?: string // Okno „Kategorie urządzeń” tej usługi przy cenie wiersza (tabela pytań /serwis-wysylkowy)
}

export interface PriceTierRow {
  label: string
  value: string
}

export interface PriceTier {
  label: string // Nazwa planu w nagłówku kolumny (np. "500 str./mies.")
  rows: PriceTierRow[] // Wiersz 1 zawsze to czynsz/mies., dalej realne dane taryfy
}

export interface PricingSubcategory {
  id: string
  title: string
  items: PricingItem[]
  subtitle?: string
  answer?: string // Odpowiedź dla FAQ (z obsługą formatowania)
  price?: string // Цена для отображения в заголовке подменю
  icon?: string // Ścieżka do obrazka podkategorii (naprawy) — opcjonalna, placeholder gdy brak
  priceTiers?: PriceTier[] // 3 plany taryfowe z pełną podtabelą (wynajem-drukarek, repair-accordion layout)
  closedSuffix?: string // Dodatkowy tekst po tytule, widoczny tylko na desktop i tylko gdy accordion jest zamknięty
  intro?: string // Tekst nad tabelą podkategorii (naprawy, repair-accordion layout)
  diagnozaBanner?: boolean // Baner „DIAGNOZA ZA DARMO”? nad tabelą — ten sam wygląd i tekst co w sekcji Diagnoza i wycena
  noteBanner?: string // Jednolinijkowa uwaga pod nagłówkiem pytania — wygląd jak podpis banera „DIAGNOZA ZA DARMO”
  infoCards?: { title: string; rows: ([string] | [string, string])[]; note?: string; image?: string; imageSize?: [number, number]; imageAlt?: string }[] // Karty w ramce jak „Kategorie urządzeń”: tekst + obrazek (mobile — obrazek pod tekstem); wiersz bez ceny — sam tekst na całą szerokość; note — uwaga pod wierszami
  columns?: readonly [string, string, string] // Widoczne nagłówki kolumn tabeli podkategorii (naprawy)
}

export interface PricingSection {
  id: string
  title: string
  mobileTitle?: string // Krótsza nazwa nagłówka sekcji tylko na mobile (zamiast title)
  mobileOpenTitle?: string // Krótsza nazwa tylko w otwartym nagłówku na mobile (zamknięta karta i SSR — pełny title)
  icon?: string
  status?: string // np. "GRATIS", "od 50 zł"
  items: PricingItem[]
  subcategories?: PricingSubcategory[] // Podkategorie (dla "naprawy" lub "faq")
  footer?: string // Footer text (displayed below title when section is open)
  intro?: string // Tekst wprowadzający wyświetlany na początku otwartej sekcji, przed tabelą
  priceFormula?: string // Wzór wyliczenia ceny końcowej, wyświetlany pod tabelą (biały, styl zwykłej pozycji)
  example?: string // Jedna mała złota linia z przykładem wyliczenia, pod priceFormula
  notes?: string[] // Uwagi/warunki pod tabelą sekcji (małe złote linie, **pogrubienie**)
}

export interface PriceTooltipCategory {
  title: string
  description: string
  features: string[]
  examples: string[]
}

export interface PriceTooltipRichContent {
  type: 'deviceCategories'
  title: string
  description: string
  categories: PriceTooltipCategory[]
}

export interface ServiceData {
  slug: string
  title: string
  subtitle: string
  icon: string
  description: string // Krótki opis na kafelki
  pricingSections: PricingSection[]
  priceTooltip?: string
  priceTooltipRich?: PriceTooltipRichContent
}
