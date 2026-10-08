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
    'naprawy-bateria': { icon: '/images/naprawy-bateria-laptop.webp' },
    'naprawy-zasilanie-ladowanie': { icon: '/images/naprawy-zasilanie-ladowanie-laptop.webp' },
    'naprawy-zlacza-podzespoly': { icon: '/images/naprawy-zlacza-podzespoly-laptop.webp' },
    'naprawy-chlodzenie': { icon: '/images/naprawy-uklad-chlodzenia-v3.webp' },
    'naprawy-dyski-dane': { icon: '/images/accordion-subcategory-dyski-dane.webp' },
    'naprawy-odzyskiwanie-danych': { icon: '/images/naprawy-odzyskanie-danych-v2.webp' },
    'naprawy-ekran-obudowa': { icon: '/images/accordion-subcategory-ekran-obudowa.webp' },
    'naprawy-klawiatura-touchpad': { icon: '/images/accordion-subcategory-klawiatura.webp' },
  },
  'serwis-komputerow-stacjonarnych': {
    'naprawy-oprogramowanie': { icon: SOFTWARE_ICON, software: true },
    'naprawy-bios': { icon: '/images/naprawy-bios-desktop-v2.webp' },
    'naprawy-plyta-glowna': { icon: '/images/naprawy-plyta-glowna-v3.webp' },
    'naprawy-podzespoly': { icon: '/images/naprawy-podzespoly-desktop.webp' },
    'naprawy-chlodzenie': { icon: '/images/naprawy-uklad-chlodzenia-v5.webp' },
    'naprawy-dyski-dane': { icon: '/images/accordion-subcategory-dyski-dane.webp' },
    'naprawy-odzyskiwanie-danych': { icon: '/images/naprawy-odzyskanie-danych-v2.webp' },
  },
  'serwis-plotterow': {
    'plotter-mechanics': { icon: '/images/accordion-icon-plotter-mechanika.webp' },
    'plotter-carriage': { icon: '/images/accordion-icon-plotter-karetka.webp' },
    'plotter-ink': { icon: '/images/accordion-icon-plotter-atrament-v3.webp' },
    'plotter-electronics': { icon: '/images/accordion-icon-plotter-elektronika.webp' },
    'plotter-calibration': { icon: '/images/accordion-icon-plotter-kalibracja.webp' },
    'plotter-software': { icon: '/images/accordion-icon-plotter-oprogramowanie-v2.webp' },
  },
  'serwis-drukarek-3d': {
    '3d-mechanics': { icon: '/images/accordion-icon-3dprinter-mechanika-v3.webp' },
    '3d-extruder': { icon: '/images/accordion-icon-3dprinter-ekstruder-v3.webp' },
    '3d-heating': { icon: '/images/accordion-icon-3dprinter-stol-grzanie-v3.webp' },
    '3d-electronics': { icon: '/images/accordion-icon-3dprinter-elektronika-v3.webp' },
    '3d-calibration': { icon: '/images/accordion-icon-3dprinter-kalibracja-v3.webp' },
    '3d-software': { icon: '/images/accordion-icon-3dprinter-oprogramowanie-v3.webp' },
    '3d-resin': { icon: '/images/accordion-icon-3dprinter-zywiczne-sla-v3.webp' },
    '3d-additional': { icon: '/images/accordion-icon-3dprinter-modyfikacje-v3.webp' },
  },
  'serwis-drukarek-laserowych': {
    'naprawy-mechanizm': { icon: '/images/accordion-icon-laser-mechanizm-podawania.webp' },
    'naprawy-modul-obrazu': { icon: '/images/accordion-icon-laserowe-moduly-obrazu-utrwalania-v2.webp' },
    'naprawy-transfer': { icon: '/images/accordion-icon-laser-pas-transferowy.webp' },
    'naprawy-fuser': { icon: '/images/accordion-icon-modul-utrwalania-fuser.webp' },
    'naprawy-optyka-laser': { icon: '/images/accordion-icon-laser-optyka.webp' },
    'naprawy-skaner': { icon: '/images/accordion-icon-atramentowe-skaner-adf.webp' },
    'naprawy-elektronika': { icon: '/images/accordion-icon-laser-elektronika.webp' },
    'naprawy-software': { icon: '/images/accordion-icon-laser-oprogramowanie-konfiguracja.webp' },
  },
  // Brak wpisów: wszystkie grupy niszczarek mają neutralną ikonę zastępczą (do wymiany na własne).
  'serwis-niszczarek': {
    'naprawy-mechanizm': { icon: '/images/accordion-icon-niszczarki-mechanizm.webp' },
    'naprawy-naped': { icon: '/images/accordion-icon-niszczarki-naped.webp' },
    'naprawy-czujniki': { icon: '/images/accordion-icon-niszczarki-czujniki.webp' },
    'naprawy-elektronika': { icon: '/images/accordion-icon-niszczarki-elektronika.webp' },
  },
  'naprawa-zasilaczy-ups': {
    'naprawy-akumulatory': { icon: '/images/accordion-icon-ups-akumulatory.webp' },
    'naprawy-ladowanie-dc': { icon: '/images/accordion-icon-ups-ladowanie.webp' },
    'naprawy-falownik': { icon: '/images/accordion-icon-ups-falownik.webp' },
    'naprawy-bypass': { icon: '/images/accordion-icon-ups-bypass.webp' },
    'naprawy-elektronika': { icon: '/images/accordion-icon-ups-elektronika.webp' },
    'naprawy-chlodzenie': { icon: '/images/accordion-icon-ups-chlodzenie.webp' },
    'naprawy-komunikacja': { icon: '/images/accordion-icon-ups-komunikacja.webp' },
  },
  'serwis-drukarek-do-kart-plastikowych': {
    'naprawy-mechanizm': { icon: '/images/accordion-icon-karty-podawanie.webp' },
    'naprawy-glowica-platen': { icon: '/images/accordion-icon-karty-glowica.webp' },
    'naprawy-tasma-ribbon': { icon: '/images/accordion-icon-karty-tasma.webp' },
    'naprawy-mechanika-czujniki': { icon: '/images/accordion-icon-karty-mechanika.webp' },
    'naprawy-moduly-dodatkowe': { icon: '/images/accordion-icon-karty-moduly.webp' },
    'naprawy-kodowanie': { icon: '/images/accordion-icon-karty-kodowanie.webp' },
    'naprawy-elektronika-zasilanie': { icon: '/images/accordion-icon-karty-elektronika.webp' },
    'naprawy-oprogramowanie': { icon: '/images/accordion-icon-karty-oprogramowanie.webp' },
  },
  'serwis-drukarek-dtg': {
    'naprawy-glowica': { icon: '/images/accordion-icon-dtg-glowica.webp' },
    'naprawy-atrament': { icon: '/images/accordion-icon-dtg-atrament.webp' },
    'naprawy-stacja-serwisowa': { icon: '/images/accordion-icon-dtg-stacja-serwisowa.webp' },
    'naprawy-karetka': { icon: '/images/accordion-icon-dtg-karetka.webp' },
    'naprawy-stol': { icon: '/images/accordion-icon-dtg-stol.webp' },
    'naprawy-elektronika-zasilanie': { icon: '/images/accordion-icon-dtg-elektronika.webp' },
    'naprawy-oprogramowanie': { icon: '/images/accordion-icon-dtg-oprogramowanie.webp' },
  },
  'serwis-drukarek-dtf': {
    'naprawy-glowica': { icon: '/images/accordion-icon-dtf-glowica.webp' },
    'naprawy-atrament': { icon: '/images/accordion-icon-dtf-atrament.webp' },
    'naprawy-stacja-serwisowa': { icon: '/images/accordion-icon-dtf-stacja-serwisowa.webp' },
    'naprawy-karetka': { icon: '/images/accordion-icon-dtf-karetka.webp' },
    'naprawy-folia': { icon: '/images/accordion-icon-dtf-folia.webp' },
    'naprawy-grzanie': { icon: '/images/accordion-icon-dtf-grzanie.webp' },
    'naprawy-elektronika-zasilanie': { icon: '/images/accordion-icon-dtf-elektronika.webp' },
    'naprawy-oprogramowanie': { icon: '/images/accordion-icon-dtf-oprogramowanie.webp' },
  },
  'serwis-drukarek-sublimacyjnych': {
    'naprawy-glowica': { icon: '/images/accordion-icon-sublimacja-glowica.webp' },
    'naprawy-atrament': { icon: '/images/accordion-icon-sublimacja-atrament.webp' },
    'naprawy-stacja-serwisowa': { icon: '/images/accordion-icon-sublimacja-stacja-serwisowa.webp' },
    'naprawy-karetka': { icon: '/images/accordion-icon-sublimacja-karetka.webp' },
    'naprawy-elektronika-zasilanie': { icon: '/images/accordion-icon-sublimacja-elektronika.webp' },
    'naprawy-oprogramowanie': { icon: '/images/accordion-icon-sublimacja-oprogramowanie.webp' },
  },
  // Drukarki termiczne (etykiet)
  'serwis-drukarek-termicznych': {
    'naprawy-mechanizm': { icon: '/images/accordion-icon-termiczne-mechanizm-podawania.webp' },
    'naprawy-glowica-platen': { icon: '/images/accordion-icon-termiczne-glowica-platen.webp' },
    'naprawy-czujniki-kalibracja': { icon: '/images/accordion-icon-termiczne-czujniki.webp' },
    'naprawy-tasma-ribbon': { icon: '/images/accordion-icon-termiczne-ribbon.webp' },
    'naprawy-moduly-dodatkowe': { icon: '/images/accordion-icon-termiczne-moduly.webp' },
    'naprawy-elektronika-zasilanie': { icon: '/images/accordion-icon-termiczne-elektronika.webp' },
    'naprawy-oprogramowanie': { icon: '/images/accordion-icon-termiczne-oprogramowanie-v2.webp' },
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
    'naprawy-uklad-tuszu': { icon: '/images/accordion-icon-atramentowe-uklad-tuszu.webp' },
    'naprawy-skaner': { icon: '/images/accordion-icon-atramentowe-skaner-adf.webp' },
    'naprawy-elektronika': { icon: '/images/accordion-icon-atramentowe-elektronika.webp' },
    'naprawy-software': { icon: '/images/accordion-icon-atramentowe-oprogramowanie-konfiguracja-v4.webp' },
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
