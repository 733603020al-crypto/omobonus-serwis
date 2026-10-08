import manifest from '@/config/manifest'

// Public API kept identical to the pre-split single-file module: types,
// layout constants, and per-service pricing-section builders are now split
// across services-data-*.ts files; this file re-exports them and assembles
// the final `services` / `HOME_EXTRA_SERVICES` arrays so nothing elsewhere
// in the codebase needs to change its imports.
export type {
  PricingItem,
  PriceTierRow,
  PriceTier,
  PricingSubcategory,
  PricingSection,
  PriceTooltipCategory,
  PriceTooltipRichContent,
  ServiceData,
} from './services-data-types'

export { DEFAULT_PRICE_TOOLTIP, REPAIR_ACCORDION_LAYOUT_SLUGS } from './services-layout-constants'

import type { ServiceData } from './services-data-types'
import { createOutsourcingItPricingSections } from './services-data-outsourcing'
import { createLaptopPricingSections } from './services-data-laptop'
import { createDesktopPricingSections } from './services-data-desktop'
import { createLaserPricingSections } from './services-data-laser'
import { create3DPrinterPricingSections, createDruk3DZamowieniePricingSections } from './services-data-3dprinter'
import { createPlotterPricingSections } from './services-data-plotter'
import { createInkjetPricingSections } from './services-data-inkjet'
import { createIglowePricingSections } from './services-data-needle'
import { createThermalPricingSections } from './services-data-thermal'
import { createWynajemPricingSections } from './services-data-wynajem'
import { createDrukarkaZastepczaPricingSections } from './services-data-drukarka-zastepcza'
import { createNiszczarkiPricingSections, NISZCZARKI_PRICE_TOOLTIP } from './services-data-niszczarki'
import { createUpsPricingSections } from './services-data-ups'
import { createKartyPricingSections, KARTY_PRICE_TOOLTIP } from './services-data-karty'
import { createDtgPricingSections, DTG_PRICE_TOOLTIP } from './services-data-dtg'
import { createDtfPricingSections, DTF_PRICE_TOOLTIP } from './services-data-dtf'
import { createSublimacjaPricingSections, SUBLIMACJA_PRICE_TOOLTIP } from './services-data-sublimacja'
import { createSpozywczePricingSections, SPOZYWCZE_PRICE_TOOLTIP } from './services-data-spozywcze'

export const services: ServiceData[] = [
  {
    slug: 'serwis-laptopow',
    title: 'Serwis i naprawa laptopów',
    subtitle: 'Pełny wykaz usług i cen, bez ukrytych kosztów (nie „naprawa od 50 zł” lub „cena do uzgodnienia")',
    icon: manifest['01_serwis_laptopow'],
    description: 'Kompleksowa naprawa i konserwacja laptopów wszystkich marek.',
    pricingSections: createLaptopPricingSections(),
  },
  {
    slug: 'serwis-komputerow-stacjonarnych',
    title: 'Serwis komputerów stacjonarnych',
    subtitle: 'Pełny wykaz usług i cen, bez ukrytych kosztów',
    icon: manifest['02_serwis_komputerow_stacjonarnych'],
    description: 'Diagnostyka, naprawa i modernizacja jednostek centralnych.',
    pricingSections: createDesktopPricingSections(),
  },
  {
    slug: 'outsourcing-it',
    title: 'Outsourcing IT',
    subtitle: 'Obsługa informatyczna dla firm',
    icon: manifest['03_outsourcing_it'],
    description: 'Pełna obsługa informatyczna dla Twojej firmy.',
    pricingSections: createOutsourcingItPricingSections(),
  },
  {
    slug: 'naprawa-drukarek',
    title: 'Naprawa drukarek i kserokopiarek',
    subtitle: 'Naprawa specjalistycznych drukarek igłowych',
    icon: manifest['07_serwis_drukarek_iglowych'],
    description: 'Naprawa specjalistycznych drukarek igłowych.',
    // Strona renderuje siatkę kart zamiast cennika i nie ma widocznego FAQ — bez sekcji,
    // żeby nie generować JSON-LD FAQPage dla treści, której nie ma na stronie
    pricingSections: [],
  },
  {
    slug: 'serwis-drukarek-laserowych',
    title: 'Serwis drukarek laserowych i kserokopiarek',
    subtitle: 'Profesjonalna naprawa drukarek laserowych i urządzeń wielofunkcyjnych',
    icon: manifest['04_serwis_drukarek_laserowych'],
    description: 'Profesjonalna naprawa i serwis drukarek laserowych.',
    pricingSections: createLaserPricingSections(),
  },
  {
    slug: 'serwis-drukarek-atramentowych',
    title: 'Serwis Drukarek Atramentowych',
    subtitle: 'Specjalistyczna naprawa drukarek atramentowych',
    icon: manifest['05_serwis_drukarek_atramentowych'],
    description: 'Naprawa, udrażnianie głowic i konserwacja drukarek atramentowych.',
    pricingSections: createInkjetPricingSections(),
  },

  {
    slug: 'serwis-plotterow',
    title: 'Serwis i naprawa ploterów',
    subtitle: 'Serwis ploterów wielkoformatowych HP, Epson i Canon',
    icon: manifest['08_serwis_ploterow'],
    description: 'Serwis i naprawa ploterów wielkoformatowych.',
    pricingSections: createPlotterPricingSections(),
  },
  {
    slug: 'serwis-drukarek-termicznych',
    title: 'Serwis Drukarek Termiczno-etykietowych',
    subtitle: 'Naprawa drukarek etykiet i kodów kreskowych',
    icon: manifest['06_serwis_drukarek_termicznych'],
    description: 'Serwis drukarek etykiet i kodów kreskowych.',
    pricingSections: createThermalPricingSections(),
    priceTooltip:
      'Ceny netto osobno dla drukarek: biurkowych / półprzemysłowych / przemysłowych (robocizna, bez materiałów eksploatacyjnych)',
  },
  {
    slug: 'serwis-drukarek-iglowych',
    title: 'Serwis Drukarek Igłowych',
    subtitle: 'Naprawa specjalistycznych drukarek igłowych',
    icon: manifest['07_serwis_drukarek_iglowych'],
    description: 'Naprawa specjalistycznych drukarek igłowych.',
    pricingSections: createIglowePricingSections(),
  },
  {
    slug: 'serwis-drukarek-3d',
    title: 'Serwis i naprawa drukarek 3D',
    subtitle: 'Pełny wykaz usług i cen, bez ukrytych kosztów',
    icon: '/images/Serwis_i_Naprawa_Drukarek_3D.webp',
    description: 'Serwis drukarek 3D we Wrocławiu – naprawa drukarki 3D, kalibracja stołu, regulacja osi oraz poprawa jakości wydruku. Naprawa drukarek 3D FDM i SLA, czyszczenie ekstrudera i hotendu, wymiana części oraz konfiguracja ustawień druku. Serwis drukarek 3D dla firm i pracowni, konfiguracja firmware oraz przygotowanie drukarki do materiałów ABS, PETG i nylon.',
    pricingSections: create3DPrinterPricingSections(),
  },
  // Tymczasowa kopia strony 'serwis-drukarek-3d' pod nowym adresem/usługą
  // "Druk 3D na zamówienie" — treść zostanie stopniowo przepisana później.
  // Dane celowo zduplikowane (nie referencja), żeby obie strony były niezależne.
  {
    slug: 'druk-3d-na-zamowienie',
    title: 'Druk 3D na zamówienie',
    subtitle: 'Pełny wykaz usług i cen, bez ukrytych kosztów',
    icon: '/images/Serwis_i_Naprawa_Drukarek_3D.webp',
    description: 'Serwis drukarek 3D we Wrocławiu – naprawa drukarki 3D, kalibracja stołu, regulacja osi oraz poprawa jakości wydruku. Naprawa drukarek 3D FDM i SLA, czyszczenie ekstrudera i hotendu, wymiana części oraz konfiguracja ustawień druku. Serwis drukarek 3D dla firm i pracowni, konfiguracja firmware oraz przygotowanie drukarki do materiałów ABS, PETG i nylon.',
    pricingSections: createDruk3DZamowieniePricingSections(),
  },
  {
    slug: 'serwis-niszczarek',
    title: 'Serwis i naprawa niszczarek',
    subtitle: 'Serwis i naprawa niszczarek we Wrocławiu',
    icon: '/images/niszczarki-carousel-v1-01.webp',
    description: 'Serwis i naprawa niszczarek.',
    pricingSections: createNiszczarkiPricingSections(),
    priceTooltip: NISZCZARKI_PRICE_TOOLTIP,
  },
  {
    slug: 'naprawa-zasilaczy-ups',
    title: 'Serwis i naprawa UPS – zasilaczy awaryjnych',
    subtitle: 'Serwis i naprawa zasilaczy awaryjnych UPS we Wrocławiu',
    icon: '/images/ups-carousel-v1-01.webp',
    description: 'Serwis i naprawa UPS – zasilaczy awaryjnych.',
    pricingSections: createUpsPricingSections(),
  },
  {
    slug: 'serwis-drukarek-do-kart-plastikowych',
    title: 'Serwis i naprawa drukarek do kart plastikowych',
    subtitle: 'Serwis i naprawa drukarek do kart plastikowych we Wrocławiu',
    icon: '/images/karty-carousel-v1-01.webp',
    description: 'Serwis i naprawa drukarek do kart plastikowych.',
    pricingSections: createKartyPricingSections(),
    priceTooltip: KARTY_PRICE_TOOLTIP,
  },
  // Strony drukarek DTG, DTF, sublimacyjnych i spożywczych.
  {
    slug: 'serwis-drukarek-dtg',
    title: 'Serwis i naprawa drukarek DTG',
    subtitle: 'Serwis i naprawa drukarek DTG we Wrocławiu',
    icon: '/images/dtg-carousel-v1-01.webp',
    description: 'Serwis i naprawa drukarek DTG do nadruku na koszulkach.',
    pricingSections: createDtgPricingSections(),
    priceTooltip: DTG_PRICE_TOOLTIP,
  },
  {
    slug: 'serwis-drukarek-dtf',
    title: 'Serwis i naprawa drukarek DTF',
    subtitle: 'Serwis i naprawa drukarek DTF we Wrocławiu',
    icon: '/images/dtf-carousel-v3-01.webp',
    description: 'Serwis i naprawa drukarek DTF do druku transferów na folii.',
    pricingSections: createDtfPricingSections(),
    priceTooltip: DTF_PRICE_TOOLTIP,
  },
  {
    slug: 'serwis-drukarek-sublimacyjnych',
    title: 'Serwis i naprawa drukarek sublimacyjnych',
    subtitle: 'Serwis i naprawa drukarek sublimacyjnych we Wrocławiu',
    icon: '/images/sublimacja-carousel-v1-01.webp',
    description: 'Serwis i naprawa drukarek i ploterów sublimacyjnych.',
    pricingSections: createSublimacjaPricingSections(),
    priceTooltip: SUBLIMACJA_PRICE_TOOLTIP,
  },
  {
    slug: 'serwis-drukarek-spozywczych',
    title: 'Serwis i naprawa drukarek spożywczych',
    subtitle: 'Serwis i naprawa drukarek spożywczych we Wrocławiu',
    icon: '/images/spozywcze-carousel-v1-01.webp',
    description: 'Serwis i naprawa drukarek spożywczych do druku na tortach i ciastkach.',
    pricingSections: createSpozywczePricingSections(),
    priceTooltip: SPOZYWCZE_PRICE_TOOLTIP,
  },
  {
    slug: 'wynajem-drukarek',
    title: 'Wynajem (dzierżawa) drukarek',
    subtitle: 'Dzierżawa urządzeń drukujących dla biur',
    icon: manifest['10_wynajem_drukarek'],
    description: 'Dzierżawa urządzeń drukujących dla biur i firm.',
    pricingSections: createWynajemPricingSections(),
  },
  {
    slug: 'drukarka-zastepcza',
    title: 'Drukarka zastępcza',
    subtitle: 'Urządzenie zastępcze na czas naprawy',
    icon: manifest['11_drukarka_zastepcza'],
    description: 'Oferujemy urządzenie zastępcze na czas naprawy.',
    pricingSections: createDrukarkaZastepczaPricingSections(),
  },
]

// Homepage "SERWIS I NAPRAWA" block: slugi ujawniane po kliknięciu
// "ZOBACZ WSZYSTKIE USŁUGI" — centralized here so services can be
// added/removed without touching the Services component itself.
export const HOME_EXTRA_SERVICES = [
  'serwis-drukarek-laserowych',
  'serwis-drukarek-atramentowych',
  'serwis-drukarek-iglowych',
  'druk-3d-na-zamowienie',
  'wynajem-drukarek',
  'drukarka-zastepcza',
]
