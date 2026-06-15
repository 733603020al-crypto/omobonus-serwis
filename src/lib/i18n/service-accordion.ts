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
  /** Заголовки секций konserwacja/naprawy для мобильного аккордеона. null — использовать section.title из данных */
  mobileAccordionTitles: {
    konserwacja: string | null
    naprawy: string | null
  }
  dojazdNote: readonly [string, string]
  deviceCategoriesDescription: {
    default: string
    serwisDrukarekIglowych: string
    serwisDrukarekTermicznych: string
  }
  /** Подписи строк таблицы wynajem (akordeon-1/akordeon-2), двустрочные варианты для renderLabel */
  wynajemTableLabels: {
    pagesIncluded: readonly [string, string]
    printPriceMono: readonly [string, string]
    printPriceColor: readonly [string, string]
    scanning: string
    duplex: string
    printSpeedPrefix: string
  }
  /** Единицы измерения, отображаемые в таблице wynajem рядом со значениями (renderValueWithSuffix) */
  wynajemUnits: {
    mono: string
    kolor: string
    str: string
    strPerMonth: string
    strPerMin: string
    currency: string
  }
  /** Перевод названия/описания/особенностей категорий устройств, ключ — польский title из DEVICE_CATEGORIES/THERMAL_DEVICE_CATEGORIES/NEEDLE_DEVICE_CATEGORIES */
  categoryTranslations: Record<string, ServiceAccordionCategoryTranslation>
}

export const serviceAccordionI18n: Record<'pl' | 'uk' | 'ru', ServiceAccordionDict> = {
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
    mobileAccordionTitles: {
      konserwacja: 'Czyszczenie i konserwacja',
      naprawy: 'Naprawy i usługi serwisowe',
    },
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
    wynajemTableLabels: {
      pagesIncluded: ['Liczba stron A4', 'wliczonych w czynsz'],
      printPriceMono: ['Cena wydruku A4 mono', '(powyżej limitu)'],
      printPriceColor: ['Cena wydruku A4 kolor', '(powyżej limitu)'],
      scanning: 'Skanowanie',
      duplex: 'Duplex',
      printSpeedPrefix: 'Prędkość druku do:',
    },
    wynajemUnits: {
      mono: 'mono',
      kolor: 'kolor',
      str: 'str.',
      strPerMonth: 'str./mies.',
      strPerMin: 'str./min',
      currency: 'zł',
    },
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
    // null — для секций konserwacja/naprawy на uk берётся section.title из данных (заголовки уже короткие и различаются по сервисам)
    mobileAccordionTitles: {
      konserwacja: null,
      naprawy: null,
    },
    dojazdNote: [
      'Ми не кажемо, що виїзд або прийом «безкоштовні»,',
      'а потім додаємо цю вартість до ціни ремонту',
    ],
    deviceCategoriesDescription: {
      default: 'У прайсі перша ціна стосується домашнього принтера, друга — офісного, третя — бізнесового',
      serwisDrukarekIglowych: 'У прайсі перша ціна стосується малого матричного принтера, друга — середнього, третя — великого',
      serwisDrukarekTermicznych: 'У прайсі перша ціна стосується малого принтера етикеток, друга — середнього, третя — великого',
    },
    wynajemTableLabels: {
      pagesIncluded: ['Кількість сторінок A4', 'включених у ренту'],
      printPriceMono: ['Ціна друку A4 моно', '(понад ліміт)'],
      printPriceColor: ['Ціна друку A4 колір', '(понад ліміт)'],
      scanning: 'Сканування',
      duplex: 'Duplex',
      printSpeedPrefix: 'Швидкість друку до:',
    },
    wynajemUnits: {
      mono: 'mono',
      kolor: 'kolor',
      str: 'str.',
      strPerMonth: 'str./mies.',
      strPerMin: 'str./min',
      currency: 'zł',
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
  ru: {
    priceHeaderFull: 'Цена, zł',
    priceHeaderShort: 'Цена',
    timeHeader: 'Срок',
    timeHeaderLine2: 'выполнения',
    viewPriceList: 'Смотреть прайс-лист',
    viewDetails: 'Подробнее',
    detailsInPreparation: 'Описание услуги готовится',
    gratisLower: 'бесплатно',
    gratisUpper: 'БЕСПЛАТНО',
    deviceCategoriesTitle: 'Категории устройств',
    deviceCategoriesCaption: '(категории устройств)',
    exampleLabel: '(напр.',
    rentPriceHeader: 'Аренда [zł/мес.]',
    printPriceHeader: 'Цена печати',
    mobileAccordionTitles: {
      konserwacja: 'Чистка и обслуживание',
      naprawy: 'Ремонт и сервисное обслуживание',
    },
    dojazdNote: [
      'Мы не говорим, что выезд или приём «бесплатные»,',
      'а затем добавляем эту стоимость к цене ремонта',
    ],
    deviceCategoriesDescription: {
      default: 'В прайсе первая цена относится к домашнему принтеру, вторая — к офисному, третья — к бизнес-принтеру',
      serwisDrukarekIglowych: 'В прайсе первая цена относится к малому игольчатому принтеру, вторая — к среднему, третья — к большому',
      serwisDrukarekTermicznych: 'В прайсе первая цена относится к малому принтеру этикеток, вторая — к среднему, третья — к большому',
    },
    wynajemTableLabels: {
      pagesIncluded: ['Количество страниц A4', 'включённых в аренду'],
      printPriceMono: ['Цена печати A4 моно', '(сверх лимита)'],
      printPriceColor: ['Цена печати A4 цвет', '(сверх лимита)'],
      scanning: 'Сканирование',
      duplex: 'Duplex',
      printSpeedPrefix: 'Скорость печати до:',
    },
    wynajemUnits: {
      mono: 'mono',
      kolor: 'kolor',
      str: 'str.',
      strPerMonth: 'str./mies.',
      strPerMin: 'str./min',
      currency: 'zł',
    },
    categoryTranslations: {
      'Drukarka domowa': { title: 'Домашний принтер', description: 'Устройство для домашней (нечастой) печати. Небольшие модели A4', features: ['компактные размеры', 'более медленная печать'] },
      'Drukarka biurowa': { title: 'Офисный принтер', description: 'Для работы в малых и средних офисах. Для более частой печати.', features: ['средний размер', 'быстрая печать', 'высокая надёжность'] },
      'Drukarka biznesowa': { title: 'Бизнес-принтер', description: 'Крупные устройства A4/A3 для интенсивной ежедневной работы и больших объёмов печати.', features: ['для больших объёмов с высокой выносливостью'] },
      'Mała drukarka etykiet': { title: 'Малый принтер этикеток', description: 'Устройство для нечастой печати. Небольшие модели.', features: ['компактные размеры', 'более медленная печать'] },
      'Średnia drukarka etykiet': { title: 'Средний принтер этикеток', description: 'Для работы в малых и средних офисах. Для более частой печати.', features: ['средний размер', 'быстрая печать', 'высокая надёжность'] },
      'Duża drukarka etykiet': { title: 'Большой принтер этикеток', description: 'Бизнес-устройство для интенсивной ежедневной работы и больших объёмов печати.', features: ['для больших объёмов с высокой выносливостью'] },
      'Mała drukarka igłowa': { title: 'Малый матричный принтер', description: 'Устройство для нечастой печати. Небольшие модели.', features: ['компактные размеры', 'более медленная печать'] },
      'Średnia drukarka igłowa': { title: 'Средний матричный принтер', description: 'Для работы в малых и средних офисах. Для более частой печати.', features: ['средний размер', 'быстрая печать', 'высокая надёжность'] },
      'Duża drukarka igłowa': { title: 'Большой матричный принтер', description: 'Бизнес-устройство для интенсивной ежедневной работы и больших объёмов печати.', features: ['для больших объёмов с высокой выносливостью'] },
    },
  },
} as const
