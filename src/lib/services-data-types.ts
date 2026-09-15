export interface PricingItem {
  service: string
  price: string
  duration: string
  link?: string
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
}

export interface PricingSection {
  id: string
  title: string
  icon?: string
  status?: string // np. "GRATIS", "od 50 zł"
  items: PricingItem[]
  subcategories?: PricingSubcategory[] // Podkategorie (dla "naprawy" lub "faq")
  footer?: string // Footer text (displayed below title when section is open)
  intro?: string // Tekst wprowadzający wyświetlany na początku otwartej sekcji, przed tabelą
  priceFormula?: string // Wzór wyliczenia ceny końcowej, wyświetlany pod tabelą (biały, styl zwykłej pozycji)
  example?: string // Jedna mała złota linia z przykładem wyliczenia, pod priceFormula
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
