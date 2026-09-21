// Единый источник визуальной конфигурации подкатегорий "Naprawy" для всех языков.
// Ключ: slug услуги -> id подкатегории (id общие для PL/UK/RU). Языковые файлы
// services-data-*.ts содержат только текст и не должны задавать icon.

export interface SubcategoryVisual {
  icon: string
  // Строка "Oprogramowanie": особая геометрия иконки и заголовка на мобильных
  software?: boolean
}

const SOFTWARE_ICON = '/images/naprawy-oprogramowanie-v3.webp'

// Нейтральная временная иконка: для подкатегорий, у которых ещё нет своей картинки.
export const NAPRAWY_PLACEHOLDER_ICON = '/images/accordion-icon-naprawy.webp'

export const SERVICE_VISUALS: Record<string, Record<string, SubcategoryVisual>> = {
  'serwis-laptopow': {
    'naprawy-oprogramowanie': { icon: SOFTWARE_ICON, software: true },
    'naprawy-plyta-glowna': { icon: '/images/naprawy-plyta-glowna-laptop-v6.webp' },
    'naprawy-chlodzenie': { icon: '/images/naprawy-uklad-chlodzenia-v3.webp' },
    'naprawy-dyski-dane': { icon: '/images/accordion-subcategory-dyski-dane.webp' },
    'naprawy-odzyskiwanie-danych': { icon: '/images/naprawy-odzyskanie-danych-v2.webp' },
    'naprawy-ekran-obudowa': { icon: '/images/accordion-subcategory-ekran-obudowa.webp' },
    'naprawy-klawiatura-touchpad': { icon: '/images/accordion-subcategory-klawiatura.webp' },
  },
  'serwis-komputerow-stacjonarnych': {
    'naprawy-oprogramowanie': { icon: SOFTWARE_ICON, software: true },
    'naprawy-plyta-glowna': { icon: '/images/naprawy-plyta-glowna-v3.webp' },
    'naprawy-chlodzenie': { icon: '/images/naprawy-uklad-chlodzenia-v5.webp' },
    'naprawy-dyski-dane': { icon: '/images/accordion-subcategory-dyski-dane.webp' },
    'naprawy-odzyskiwanie-danych': { icon: '/images/naprawy-odzyskanie-danych-v2.webp' },
  },
  'serwis-plotterow': {
    'plotter-mechanics': { icon: '/images/accordion-icon-plotter-mechanika.webp' },
    'plotter-ink': { icon: '/images/accordion-icon-plotter-atrament-v3.webp' },
    'plotter-electronics': { icon: '/images/accordion-icon-plotter-elektronika.webp' },
    'plotter-calibration': { icon: '/images/accordion-icon-plotter-kalibracja.webp' },
    'plotter-software': { icon: '/images/accordion-icon-plotter-oprogramowanie-v2.webp' },
  },
  'serwis-drukarek-3d': {
    '3d-mechanics': { icon: '/images/accordion-icon-3dprinter-mechanika-v2.webp' },
    '3d-electronics': { icon: '/images/accordion-icon-3dprinter-elektronika-v2.webp' },
    '3d-calibration': { icon: '/images/accordion-icon-3dprinter-kalibracja-v2.webp' },
    '3d-software': { icon: '/images/accordion-icon-3dprinter-oprogramowanie-v2.webp' },
    '3d-additional': { icon: '/images/accordion-icon-3dprinter-dodatkowe-v2.webp' },
  },
  'serwis-drukarek-laserowych': {
    'naprawy-mechanizm': { icon: '/images/accordion-icon-laser-mechanizm-podawania.webp' },
    'naprawy-modul-obrazu': { icon: '/images/accordion-icon-laserowe-moduly-obrazu-utrwalania-v2.webp' },
    'naprawy-fuser': { icon: '/images/accordion-icon-modul-utrwalania-fuser.webp' },
    'naprawy-optyka-laser': { icon: '/images/accordion-icon-laser-optyka.webp' },
    'naprawy-elektronika': { icon: '/images/accordion-icon-laser-elektronika.webp' },
    'naprawy-software': { icon: '/images/accordion-icon-laser-oprogramowanie-konfiguracja.webp' },
    'naprawy-dodatkowe': { icon: '/images/accordion-icon-laserowe-dodatkowe-uslugi-v3.webp' },
  },
  'serwis-drukarek-termicznych': {
    'naprawy-mechanizm': { icon: '/images/accordion-icon-termiczne-mechanizm-podawania.webp' },
    'naprawy-glowica-platen': { icon: '/images/accordion-icon-termiczne-glowica-platen.webp' },
    'naprawy-czujniki-kalibracja': { icon: '/images/accordion-icon-termiczne-czujniki.webp' },
    'naprawy-tasma-ribbon': { icon: '/images/accordion-icon-termiczne-ribbon.webp' },
    'naprawy-moduly-dodatkowe': { icon: '/images/accordion-icon-termiczne-moduly.webp' },
    'naprawy-elektronika-zasilanie': { icon: '/images/accordion-icon-termiczne-elektronika.webp' },
    'naprawy-oprogramowanie': { icon: '/images/accordion-icon-termiczne-oprogramowanie-v2.webp' },
    'naprawy-termiczne-uslugi': { icon: '/images/accordion-icon-termiczne-uslugi-dodatkowe.webp' },
  },
  'serwis-drukarek-iglowych': {
    'naprawy-mechanizm': { icon: '/images/accordion-icon-iglowe-mechanizm-podawania.webp' },
    'naprawy-glowica-matrycowa': { icon: '/images/accordion-icon-iglowe-glowica.webp' },
    'naprawy-naped-kartridza': { icon: '/images/accordion-icon-iglowe-naped-karetki.webp' },
    'naprawy-tasma': { icon: '/images/accordion-icon-iglowe-tasma.webp' },
    'naprawy-elektronika': { icon: '/images/accordion-icon-iglowe-elektronika.webp' },
    'naprawy-software': { icon: '/images/naprawy-oprogramowanie-iglowe-v3.webp' },
    'naprawy-dodatkowe': { icon: '/images/accordion-icon-iglowe-uslugi-dodatkowe.webp' },
  },
  'serwis-drukarek-atramentowych': {
    'naprawy-mechanizm': { icon: '/images/accordion-icon-atramentowe-mechanizm-podawania.webp' },
    'naprawy-karetka': { icon: '/images/accordion-icon-atramentowe-karetka.webp' },
    'naprawy-glowica': { icon: '/images/accordion-icon-atramentowe-glowica.webp' },
    'naprawy-elektronika': { icon: '/images/accordion-icon-atramentowe-elektronika.webp' },
    'naprawy-software': { icon: '/images/accordion-icon-atramentowe-oprogramowanie-konfiguracja-v4.webp' },
    'naprawy-dodatkowe': { icon: '/images/accordion-icon-atramentowe-uslugi-dodatkowe-v3.webp' },
  },
  'outsourcing-it': {
    'naprawy-serwis-ogolny': { icon: '/images/accordion-icon-outsourcing-serwis-ogolny.webp' },
    'naprawy-sprzet-na-miejscu': { icon: '/images/accordion-icon-outsourcing-naprawy-sprzetu.webp' },
    'naprawy-siec-konfiguracja': { icon: '/images/accordion-icon-outsourcing-siec-biurowa.webp' },
    'naprawy-bezpieczenstwo-backup': { icon: '/images/accordion-icon-outsourcing-bezpieczenstwo-v2.webp' },
    'naprawy-audyt': { icon: '/images/accordion-icon-outsourcing-audyt.webp' },
  },
}

export const getSubcategoryVisual = (slug: string, subcategoryId: string): SubcategoryVisual | undefined =>
  SERVICE_VISUALS[slug]?.[subcategoryId]
