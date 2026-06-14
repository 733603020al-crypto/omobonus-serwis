export interface ServiceAccordionCategoryTranslation {
  title: string
  description: string
  features: string[]
}

export interface ServiceAccordionDict {
  priceHeaderFull: string
  priceHeaderShort: string
  timeHeader: string
  timeHeaderLine2: string
  viewPriceList: string
  viewDetails: string
  detailsInPreparation: string
  gratisLower: string
  gratisUpper: string
  deviceCategoriesTitle: string
  deviceCategoriesCaption: string
  exampleLabel: string
  rentPriceHeader: string
  printPriceHeader: string
  konserwacjaTitle: string
  naprawyTitle: string
  dojazdNote: readonly [string, string]
  deviceCategoriesDescription: {
    default: string
    serwisDrukarekIglowych: string
    serwisDrukarekTermicznych: string
  }
  /** Перевод названия/описания/особенностей категорий устройств, ключ — польский title из DEVICE_CATEGORIES/THERMAL_DEVICE_CATEGORIES/NEEDLE_DEVICE_CATEGORIES */
  categoryTranslations: Record<string, ServiceAccordionCategoryTranslation>
}

export const serviceAccordionI18n: Record<'pl' | 'uk', ServiceAccordionDict> = {
  pl: {
    priceHeaderFull: 'Cena, zł',
    priceHeaderShort: 'Cena',
    timeHeader: 'Czas',
    timeHeaderLine2: 'realizacji',
    viewPriceList: 'Zobacz cennik',
    viewDetails: 'Zobacz szczegóły',
    detailsInPreparation: 'Szczegóły w przygotowaniu',
    gratisLower: 'gratis',
    gratisUpper: 'GRATIS',
    deviceCategoriesTitle: 'Kategorie urządzeń',
    deviceCategoriesCaption: '(kategorie urządzeń)',
    exampleLabel: '(np.',
    rentPriceHeader: 'Czynsz wynajmu [zł/mies.]',
    printPriceHeader: 'Cena wydruku',
    konserwacjaTitle: 'Czyszczenie i konserwacja',
    naprawyTitle: 'Naprawy i usługi serwisowe',
    dojazdNote: [
      'Nie mówimy, że dojazd lub odbiór są „za darmo”,',
      'a następnie doliczamy ten koszt do ceny naprawy',
    ],
    deviceCategoriesDescription: {
      default: 'W cenniku pierwsza cena dotyczy drukarki domowej, druga – biurowej, trzecia – biznesowej',
      serwisDrukarekIglowych: 'W cenniku pierwsza cena dotyczy małej drukarki igłowej, druga – średniej, trzecia – dużej',
      serwisDrukarekTermicznych: 'W cenniku pierwsza cena dotyczy małej drukarki etykiet, druga – średniej, trzecia – dużej',
    },
    categoryTranslations: {},
  },
  uk: {
    priceHeaderFull: 'Ціна, zł',
    priceHeaderShort: 'Ціна',
    timeHeader: 'Час',
    timeHeaderLine2: 'виконання',
    viewPriceList: 'Переглянути прайс-лист',
    viewDetails: 'Докладніше',
    detailsInPreparation: 'Опис послуги готується',
    gratisLower: 'безкоштовно',
    gratisUpper: 'БЕЗКОШТОВНО',
    deviceCategoriesTitle: 'Категорії пристроїв',
    deviceCategoriesCaption: '(категорії пристроїв)',
    exampleLabel: '(напр.',
    rentPriceHeader: 'Орендна плата [zł/міс.]',
    printPriceHeader: 'Ціна друку',
    // не используется напрямую — для секций konserwacja/naprawy на uk берётся section.title из данных
    konserwacjaTitle: 'Czyszczenie i konserwacja',
    naprawyTitle: 'Naprawy i usługi serwisowe',
    dojazdNote: [
      'Ми не кажемо, що виїзд або прийом «безкоштовні»,',
      'а потім додаємо цю вартість до ціни ремонту',
    ],
    deviceCategoriesDescription: {
      default: 'У прайсі перша ціна стосується домашнього принтера, друга — офісного, третя — бізнесового',
      serwisDrukarekIglowych: 'У прайсі перша ціна стосується малого матричного принтера, друга — середнього, третя — великого',
      serwisDrukarekTermicznych: 'У прайсі перша ціна стосується малого принтера етикеток, друга — середнього, третя — великого',
    },
    categoryTranslations: {
      'Drukarka domowa': { title: 'Домашній принтер', description: 'Пристрій для домашнього (нечастого) друку. Невеликі моделі A4', features: ['малі розміри', 'повільніший друк'] },
      'Drukarka biurowa': { title: 'Офісний принтер', description: 'Для роботи в малих і середніх офісах. Для частішого друку.', features: ['середній розмір', 'швидший друк', 'вища надійність'] },
      'Drukarka biznesowa': { title: 'Бізнес-принтер', description: 'Великі пристрої A4/A3 для інтенсивної щоденної роботи та великих обсягів друку.', features: ['для великих обсягів із високою витривалістю'] },
      'Mała drukarka etykiet': { title: 'Малий принтер етикеток', description: 'Пристрій для нечастого друку. Невеликі моделі.', features: ['малі розміри', 'повільніший друк'] },
      'Średnia drukarka etykiet': { title: 'Середній принтер етикеток', description: 'Для роботи в малих і середніх офісах. Для частішого друку.', features: ['середній розмір', 'швидший друк', 'вища надійність'] },
      'Duża drukarka etykiet': { title: 'Великий принтер етикеток', description: 'Бізнес-пристрій для інтенсивної щоденної роботи та великих обсягів друку.', features: ['для великих обсягів із високою витривалістю'] },
      'Mała drukarka igłowa': { title: 'Малий матричний принтер', description: 'Пристрій для нечастого друку. Невеликі моделі.', features: ['малі розміри', 'повільніший друк'] },
      'Średnia drukarka igłowa': { title: 'Середній матричний принтер', description: 'Для роботи в малих і середніх офісах. Для частішого друку.', features: ['середній розмір', 'швидший друк', 'вища надійність'] },
      'Duża drukarka igłowa': { title: 'Великий матричний принтер', description: 'Бізнес-пристрій для інтенсивної щоденної роботи та великих обсягів друку.', features: ['для великих обсягів із високою витривалістю'] },
    },
  },
} as const
