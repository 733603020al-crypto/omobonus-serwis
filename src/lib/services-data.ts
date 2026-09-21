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
import { createNeedlePricingSections } from './services-data-needle'
import { createThermalPricingSections } from './services-data-thermal'
import { createWynajemPricingSections } from './services-data-wynajem'
import { createDrukarkaZastepczaPricingSections } from './services-data-drukarka-zastepcza'

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
    pricingSections: createNeedlePricingSections(),
  },
  {
    slug: 'serwis-drukarek-laserowych',
    title: 'Serwis drukarek laserowych i kserokopiarek',
    subtitle: 'Profesjonalna naprawa drukarek laserowych i urządzeń wielofunkcyjnych',
    icon: manifest['04_serwis_drukarek_laserowych'],
    description: 'Profesjonalna naprawa i serwis drukarek laserowych.',
    pricingSections: createLaserPricingSections(),
    priceTooltipRich: {
      type: 'deviceCategories',
      title: 'Kategorie urządzeń',
      description: 'Wybierz orientacyjnie, do której grupy należy Twoja drukarka. Dzięki temu łatwiej dopasujesz przedział cenowy.',
      categories: [
        {
          title: 'Drukarka domowa',
          description: 'Urządzenie do użytku domowego lub okazjonalnego drukowania. Małe modele A4, zwykle tańsze w zakupie.',
          features: ['małe wymiary', 'wolniejszy druk', 'podstawowe funkcje'],
          examples: ['HP DeskJet 2720', 'Canon MG3650s'],
        },
        {
          title: 'Drukarka biurowa',
          description: 'Do pracy w małych i średnich biurach. Przystosowane do częstszego drukowania i pracy w sieci.',
          features: ['szybszy druk', 'LAN / Wi-Fi', 'wyższa trwałość'],
          examples: ['Brother DCP-J105', 'Epson L3150'],
        },
        {
          title: 'Drukarka biznesowa',
          description: 'Duże urządzenia A4/A3 do intensywnej pracy i dużych wolumenów wydruku.',
          features: ['bardzo wysoka wytrzymałość', 'szybkie tonery i kasety', 'serwisowe funkcje zarządzania'],
          examples: ['Epson L6570', 'Canon MAXIFY GX4040'],
        },
      ],
    },
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
    pricingSections: createNeedlePricingSections(),
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
