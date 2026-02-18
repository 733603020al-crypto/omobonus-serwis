export interface PricingItem {
  service: string
  price: string
  duration: string
  link?: string
}

export interface PricingSubcategory {
  id: string
  title: string
  items: PricingItem[]
  subtitle?: string
  answer?: string // Odpowiedź dla FAQ (z obsługą formatowania)
  price?: string // Цена для отображения в заголовке подменю
}

export interface PricingSection {
  id: string
  title: string
  icon?: string
  status?: string // np. "GRATIS", "od 50 zł"
  items: PricingItem[]
  subcategories?: PricingSubcategory[] // Podkategorie (dla "naprawy" lub "faq")
  footer?: string // Footer text (displayed below title when section is open)
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

export const DEFAULT_PRICE_TOOLTIP = 'Ceny netto'

