export interface ServiceAccordionCategoryTranslation {
  title: string
  description: string
  features: string[]
}

export interface ServiceAccordionDict {
  priceHeaderFull: string
  priceHeaderShort: string
  priceNettoTooltip: string
  priceInfoAriaLabel: string
  categoryInfoAriaLabel: string
  closeAriaLabel: string
  timeHeader: string
  timeHeaderLine2: string
  // Nagłówek kolumny czasu w tabeli pakietów abonamentowych (outsourcing-it)
  reactionTimeHeader: string
  reactionTimeHeaderLine2: string
  viewPriceList: string
  viewDetails: string
  detailsInPreparation: string
  gratisLower: string
  gratisUpper: string
  deviceCategoriesTitle: string
  deviceCategoriesCaption: string
  exampleLabel: string
  /** Wspólny blok warunków pod cennikiem wynajem-drukarek */
  wynajemTerms: {
    netNote: string
    includedTitle: string
    included: string[]
    clientTitle: string
    client: string[]
    conditions: string[]
  }
  /** Blok warunków pod cennikiem drukarka-zastepcza + tak/nie w tabelach */
  dzTerms: {
    title: string
    included: string[]
    conditions: string[]
    netNote: string
    yes: string
    no: string
  }
  printPriceHeader: string
  dojazdNote: readonly [string, string]
  dojazdPromoTitle: string
  konserwacjaPromoTitle: string
  konserwacjaPromoDescription: string
  konserwacjaPromoTitleAlt: string
  konserwacjaPromoDescriptionAlt: string
  konserwacjaPromoTitleNiszczarki: string
  konserwacjaPromoDescriptionNiszczarki: string
  konserwacjaPromoDescriptionUps: string
  konserwacjaPromoTitleInkjet: string
  konserwacjaPromoDescriptionInkjet: string
  konserwacjaPromoTitleDtg: string
  konserwacjaPromoDescriptionDtg: string
  konserwacjaPromoDescriptionDtf: string
  konserwacjaPromoDescriptionSublimacja: string
  konserwacjaPromoDescriptionSpozywcze: string
  konserwacjaPromoTitleKawa: string
  konserwacjaPromoDescriptionKawa: string
  konserwacjaIncludedNote: string
  konserwacjaExtraPaidNote: string
  konserwacjaIncludedNoteInkjet: string
  konserwacjaExtraPaidNoteInkjet: string
  deviceCategoriesDescription: {
    default: string
    serwisDrukarekIglowych: string
    serwisDrukarekTermicznych: string
    serwisDrukarek3d: string
    serwisPlotterow: string
    serwisDrukarekAtramentowych: string
    serwisNiszczarek: string
    ups: string
    serwisDrukarekDoKart: string
    serwisDrukarekDtg: string
    serwisDrukarekDtf: string
    serwisDrukarekSublimacja: string
    serwisDrukarekSpozywczych: string
    serwisEkspresowDoKawy: string
  }
  /** Необязательное примечание под карточками окна «Kategorie urządzeń» (те же ключи, что deviceCategoriesDescription) */
  deviceCategoriesNote?: Partial<Record<keyof ServiceAccordionDict['deviceCategoriesDescription'], string>>
  /** Подписи строк таблицы wynajem (akordeon-1/akordeon-2), двустрочные варианты для renderLabel */
  wynajemTableLabels: {
    pagesIncluded: readonly [string, string]
    printPriceMono: readonly [string, string]
    printPriceColor: readonly [string, string]
    /** Заголовок + подпись объединённой строки "Cena wydruku A4" (mono+kolor в одном значении) в современной accordion-tier таблице wynajem-drukarek */
    printPriceOverLimit: readonly [string, string]
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
  /** Переопределение categoryTranslations только для serwis-drukarek-atramentowych (те же польские title, что у DEVICE_CATEGORIES) */
  categoryTranslationsAtrament: Record<string, ServiceAccordionCategoryTranslation>
  /** Переопределение categoryTranslations только для serwis-drukarek-dtg (title «Profesjonalna» совпадает с шредерами) */
  categoryTranslationsDtg: Record<string, ServiceAccordionCategoryTranslation>
  categoryTranslationsDtf: Record<string, ServiceAccordionCategoryTranslation>
  categoryTranslationsSublimacja: Record<string, ServiceAccordionCategoryTranslation>
  /** Переопределение categoryTranslations только для serwis-drukarek-spozywczych (title «Kompaktowa»/«Profesjonalna» совпадают с другими страницами) */
  categoryTranslationsSpozywcze: Record<string, ServiceAccordionCategoryTranslation>
}

export const serviceAccordionI18n: Record<'pl' | 'uk' | 'ru', ServiceAccordionDict> = {
  pl: {
    priceHeaderFull: 'Cena, zł',
    priceHeaderShort: 'Cena',
    priceNettoTooltip: 'Cena netto',
    priceInfoAriaLabel: 'Informacja o cenach',
    categoryInfoAriaLabel: 'Informacja o kategoriach',
    closeAriaLabel: 'Zamknij',
    timeHeader: 'Czas',
    timeHeaderLine2: 'realizacji',
    reactionTimeHeader: 'Czas',
    reactionTimeHeaderLine2: 'reakcji',
    viewPriceList: 'Zobacz cennik',
    viewDetails: 'Zobacz szczegóły',
    detailsInPreparation: 'Szczegóły w przygotowaniu',
    gratisLower: 'gratis',
    gratisUpper: 'GRATIS',
    deviceCategoriesTitle: 'Kategorie urządzeń',
    deviceCategoriesCaption: '(kategorie urządzeń)',
    exampleLabel: '(np.',
    wynajemTerms: {
      netNote: 'Wszystkie ceny są cenami netto.',
      includedTitle: 'W cenie wynajmu:',
      included: ['urządzenie', 'serwis i naprawy wynikające z normalnego użytkowania', 'tonery', 'standardowe materiały eksploatacyjne i części wymagane do prawidłowej pracy urządzenia'],
      clientTitle: 'Po stronie Klienta:',
      client: ['papier', 'energia elektryczna', 'wydruki ponad miesięczny limit według stawek z tabeli'],
      conditions: ['Dostawa, instalacja urządzenia i podstawowa konfiguracja są w cenie wynajmu.', 'Po zakończeniu najmu odbieramy urządzenie.', 'Minimalny okres najmu: 1 miesiąc. Nie wymagamy umowy długoterminowej.', 'Czas reakcji serwisu: do 24 h roboczych.'],
    },
    dzTerms: {
      title: 'Drukarka zastępcza na czas naprawy',
      included: [
        'urządzenie zastępcze udostępniamy na czas naprawy sprzętu Klienta',
        'brak opłaty abonamentowej',
        'Klient płaci za wykonane wydruki według cennika',
        'toner oraz standardowe materiały eksploatacyjne są po naszej stronie',
        'papier jest po stronie Klienta',
        'urządzenie dobieramy możliwie najbliżej funkcjonalności naprawianego sprzętu',
      ],
      conditions: [
        'Dostawa i podstawowa konfiguracja urządzenia zastępczego są ustalane przy zgłoszeniu serwisowym.',
        'Dostępność urządzenia zastępczego zależy od aktualnie dostępnego sprzętu.',
        'W typowych przypadkach urządzenie możemy podstawić do 24 h roboczych, zależnie od dostępności odpowiedniego sprzętu.',
        'W przypadku awarii urządzenia zastępczego prosimy o kontakt z serwisem. Organizujemy naprawę lub wymianę urządzenia zależnie od dostępności.',
      ],
      netNote: 'Wszystkie podane ceny są cenami netto.',
      yes: 'tak',
      no: 'nie',
    },
    printPriceHeader: 'Cena wydruku',
    dojazdNote: [
      'Nie mówimy, że dojazd lub odbiór są „za darmo”,',
      'a następnie doliczamy ten koszt do ceny naprawy',
    ],
    dojazdPromoTitle: '„DARMOWY DOJAZD”',
    konserwacjaPromoTitle: '„PRZEDMUCHANIE + PASTA”',
    konserwacjaPromoDescription: 'Nie oferujemy okrojonej usługi — wykonujemy pełną konserwację układu chłodzenia',
    konserwacjaPromoTitleAlt: '„TYLKO PRZEDMUCHANIE?”',
    konserwacjaPromoDescriptionAlt: 'Nie ograniczamy się tylko do usunięcia kurzu — wykonujemy pełną konserwację urządzenia',
    konserwacjaPromoTitleNiszczarki: '„TYLKO OLEJENIE?”',
    konserwacjaPromoDescriptionNiszczarki: 'Nie ograniczamy się tylko do naoliwienia noży — wykonujemy pełną konserwację niszczarki',
    konserwacjaPromoDescriptionUps: 'Nie ograniczamy się tylko do usunięcia kurzu — wykonujemy pełny przegląd i konserwację UPS',
    konserwacjaPromoTitleInkjet: '„TYLKO CZYSZCZENIE GŁOWICY?”',
    konserwacjaPromoDescriptionInkjet: 'Nie ograniczamy się do udrażniania głowicy — wykonujemy pełną konserwację układu drukującego i mechanizmów drukarki',
    konserwacjaPromoTitleDtg: '„TYLKO CYKL CZYSZCZĄCY?”',
    konserwacjaPromoDescriptionDtg: 'Nie ograniczamy się do czyszczenia z panelu — wykonujemy pełną konserwację stacji serwisowej, układu atramentowego i mechaniki drukarki DTG',
    konserwacjaPromoDescriptionDtf: 'Nie ograniczamy się do czyszczenia z panelu — wykonujemy pełną konserwację stacji serwisowej, układu atramentowego i mechaniki drukarki DTF',
    konserwacjaPromoDescriptionSublimacja: 'Nie ograniczamy się do czyszczenia z panelu — wykonujemy pełną konserwację stacji serwisowej, układu atramentowego i mechaniki drukarki sublimacyjnej',
    konserwacjaPromoTitleKawa: '„TYLKO ODKAMIENIANIE?”',
    konserwacjaPromoDescriptionKawa: 'Nie ograniczamy się do uruchomienia programu czyszczenia — wykonujemy pełną konserwację układu kawowego, wodnego, mlecznego oraz mechanizmów ekspresu',
    konserwacjaPromoDescriptionSpozywcze: 'Nie ograniczamy się do czyszczenia z panelu — wykonujemy pełną konserwację stacji serwisowej, układu atramentowego i mechaniki drukarki spożywczej',
    konserwacjaIncludedNote: 'W cenie: materiały eksploatacyjne potrzebne do wykonania usługi, w tym pasta termoprzewodząca i standardowe termopady.',
    konserwacjaExtraPaidNote: 'Dodatkowo płatne: niestandardowe materiały, naprawy i części zamienne — zawsze po wcześniejszym uzgodnieniu.',
    konserwacjaIncludedNoteInkjet: 'W cenie usług zawarte są standardowe środki i materiały potrzebne do wykonania prac serwisowych. W przypadku obsługi absorbera cena obejmuje jego czyszczenie lub wymianę na nowy — zależnie od stanu absorbera i dostępności odpowiedniej części.',
    konserwacjaExtraPaidNoteInkjet: 'Dodatkowo płatne są naprawy oraz inne części zamienne, jeśli okażą się konieczne — zawsze po wcześniejszym uzgodnieniu z klientem.',
    deviceCategoriesDescription: {
      default: 'Cena zależy od klasy, konstrukcji i stopnia rozbudowania drukarki: pierwsza – domowa, druga – biurowa, trzecia – biznesowa.',
      serwisDrukarekIglowych: 'Cena zależy od wielkości i konstrukcji drukarki igłowej: pierwsza – mała, druga – średnia, trzecia – duża drukarka igłowa.',
      serwisDrukarekTermicznych: 'Cena zależy od klasy, konstrukcji i przeznaczenia drukarki: pierwsza – biurkowa, druga – półprzemysłowa, trzecia – przemysłowa.',
      serwisDrukarek3d: 'Cena zależy od wielkości i konstrukcji drukarki: pierwsza – mała, druga – średnia, trzecia – duża drukarka 3D.',
      serwisPlotterow: 'Cena zależy od szerokości druku plotera: pierwsza – mały, druga – średni, trzecia – duży.',
      serwisDrukarekAtramentowych: 'Cena zależy od klasy, konstrukcji i przeznaczenia drukarki: pierwsza – domowa, druga – biurowa, trzecia – biznesowa.',
      serwisNiszczarek: 'Cena zależy od klasy, konstrukcji i wydajności niszczarki: pierwsza – mała, druga – biurowa, trzecia – profesjonalna.',
      ups: 'Cena zależy od mocy zasilacza: pierwsza – do 1 kVA, druga – 1–⁠3 kVA, trzecia – 3–⁠10 kVA.',
      serwisDrukarekDoKart: 'Cena zależy od klasy, konstrukcji i wyposażenia drukarki do kart: pierwsza – podstawowa, druga – biznesowa, trzecia – retransferowa.',
      serwisDrukarekDtg: 'Cena zależy od klasy, konstrukcji i wydajności drukarki DTG: pierwsza – kompaktowa, druga – profesjonalna, trzecia – przemysłowa.',
      serwisDrukarekDtf: 'Cena zależy od klasy, konstrukcji i wydajności drukarki DTF: pierwsza – kompaktowa, druga – profesjonalna, trzecia – przemysłowa.',
      serwisDrukarekSublimacja: 'Cena zależy od klasy, konstrukcji i wielkości drukarki sublimacyjnej: pierwsza – kompaktowa, druga – profesjonalna, trzecia – wielkoformatowa.',
      serwisDrukarekSpozywczych: 'Cena zależy od konstrukcji i sposobu druku drukarki spożywczej: pierwsza – arkuszowa, druga – kompaktowa, trzecia – profesjonalna.',
      serwisEkspresowDoKawy: 'Cena zależy od rodzaju i przeznaczenia ekspresu do kawy: pierwsza – domowa, druga – biurowa, trzecia – gastronomiczna.',
    },
    deviceCategoriesNote: {
      serwisNiszczarek: 'Duże niszczarki centralne i przemysłowe – wycena indywidualna.',
      ups: 'Zasilacze UPS powyżej 10 kVA – wycena indywidualna.',
    },
    categoryTranslations: {},
    categoryTranslationsAtrament: {},
    categoryTranslationsDtg: {},
    categoryTranslationsDtf: {},
    categoryTranslationsSublimacja: {},
    categoryTranslationsSpozywcze: {},
    wynajemTableLabels: {
      pagesIncluded: ['Liczba stron A4', 'wliczonych w czynsz'],
      printPriceMono: ['Cena wydruku A4 mono', '(powyżej limitu)'],
      printPriceColor: ['Cena wydruku A4 kolor', '(powyżej limitu)'],
      printPriceOverLimit: ['Cena wydruku A4', '(po wykorzystaniu wliczonych stron)'],
      scanning: 'Skanowanie',
      duplex: 'Duplex',
      printSpeedPrefix: 'Prędkość druku do:',
    },
    wynajemUnits: {
      mono: 'mono',
      kolor: 'kolor',
      str: 'str.',
      strPerMonth: 'str./mies.',
      strPerMin: 'str./min.',
      currency: 'zł',
    },
  },
  uk: {
    priceHeaderFull: 'Ціна, zł',
    priceHeaderShort: 'Ціна',
    priceNettoTooltip: 'Ціна без ПДВ',
    priceInfoAriaLabel: 'Інформація про ціни',
    categoryInfoAriaLabel: 'Інформація про категорії',
    closeAriaLabel: 'Закрити',
    timeHeader: 'Час',
    timeHeaderLine2: 'виконання',
    reactionTimeHeader: 'Час',
    reactionTimeHeaderLine2: 'реакції',
    viewPriceList: 'Переглянути прайс-лист',
    viewDetails: 'Докладніше',
    detailsInPreparation: 'Опис послуги готується',
    gratisLower: 'безкоштовно',
    gratisUpper: 'БЕЗКОШТОВНО',
    deviceCategoriesTitle: 'Категорії пристроїв',
    deviceCategoriesCaption: '(категорії пристроїв)',
    exampleLabel: '(напр.',
    wynajemTerms: {
      netNote: 'Усі ціни вказано нетто.',
      includedTitle: 'У вартість оренди входить:',
      included: ['пристрій', 'сервіс і ремонти, пов’язані зі звичайним використанням', 'тонери', 'стандартні витратні матеріали та деталі, потрібні для правильної роботи пристрою'],
      clientTitle: 'З боку Клієнта:',
      client: ['папір', 'електроенергія', 'друк понад місячний ліміт за тарифами з таблиці'],
      conditions: ['Доставка, встановлення пристрою та базове налаштування входять у вартість оренди.', 'Після завершення оренди ми забираємо пристрій.', 'Мінімальний строк оренди: 1 місяць. Довгостроковий договір не потрібен.', 'Час реакції сервісу: до 24 робочих годин.'],
    },
    dzTerms: {
      title: 'Принтер на заміну на час ремонту',
      included: [
        'надаємо пристрій на заміну на час ремонту техніки Клієнта',
        'без абонентської плати',
        'Клієнт оплачує виконаний друк згідно з прайсом',
        'тонер і стандартні витратні матеріали — за наш рахунок',
        'папір — за рахунок Клієнта',
        'підбираємо пристрій, максимально близький за функціями до техніки, що ремонтується',
      ],
      conditions: [
        'Доставку та базове налаштування пристрою на заміну узгоджуємо під час оформлення заявки на ремонт.',
        'Наявність пристрою на заміну залежить від обладнання, доступного на цей момент.',
        'Зазвичай можемо надати пристрій протягом 24 робочих годин — залежно від наявності відповідного обладнання.',
        'Якщо пристрій на заміну зламається, зверніться до сервісу. Ми організуємо ремонт або заміну пристрою залежно від наявності.',
      ],
      netNote: 'Усі вказані ціни — нетто.',
      yes: 'так',
      no: 'ні',
    },
    printPriceHeader: 'Ціна друку',
    dojazdNote: [
      'Ми не кажемо, що виїзд або забір пристрою «безкоштовні»,',
      'а потім додаємо ці витрати до вартості ремонту',
    ],
    dojazdPromoTitle: '«БЕЗКОШТОВНИЙ ВИЇЗД»',
    konserwacjaPromoTitle: '«ПРОДУВКА + ПАСТА»',
    konserwacjaPromoDescription: 'Ми не пропонуємо урізану послугу — виконуємо повне обслуговування системи охолодження',
    konserwacjaPromoTitleAlt: '«ТІЛЬКИ ПРОДУВКА?»',
    konserwacjaPromoDescriptionAlt: 'Ми не обмежуємося лише видаленням пилу — виконуємо повне обслуговування пристрою',
    konserwacjaPromoTitleNiszczarki: '«ТІЛЬКИ ЗМАЩЕННЯ?»',
    konserwacjaPromoDescriptionNiszczarki: 'Ми не обмежуємося лише змащенням ножів — виконуємо повне обслуговування знищувача',
    konserwacjaPromoDescriptionUps: 'Ми не обмежуємося лише видаленням пилу — виконуємо повний огляд і обслуговування ДБЖ',
    konserwacjaPromoTitleInkjet: '«ТІЛЬКИ ЧИЩЕННЯ ГОЛОВКИ?»',
    konserwacjaPromoDescriptionInkjet: 'Ми не обмежуємося прочищенням головки — виконуємо повне обслуговування друкувального вузла та механізмів принтера',
    konserwacjaPromoTitleDtg: '«ТІЛЬКИ ЦИКЛ ЧИЩЕННЯ?»',
    konserwacjaPromoDescriptionDtg: 'Ми не обмежуємося чищенням із панелі — виконуємо повне обслуговування сервісної станції, чорнильної системи та механіки DTG-принтера',
    konserwacjaPromoDescriptionDtf: 'Ми не обмежуємося чищенням із панелі — виконуємо повне обслуговування сервісної станції, чорнильної системи та механіки DTF-принтера',
    konserwacjaPromoDescriptionSublimacja: 'Ми не обмежуємося чищенням із панелі — виконуємо повне обслуговування сервісної станції, чорнильної системи та механіки сублімаційного принтера',
    konserwacjaPromoTitleKawa: '«ТІЛЬКИ ВИДАЛЕННЯ НАКИПУ?»',
    konserwacjaPromoDescriptionKawa: 'Ми не обмежуємося запуском програми чищення — виконуємо повне обслуговування кавової, водяної та молочної систем, а також механізмів кавомашини',
    konserwacjaPromoDescriptionSpozywcze: 'Ми не обмежуємося чищенням із панелі — виконуємо повне обслуговування сервісної станції, чорнильної системи та механіки харчового принтера',
    konserwacjaIncludedNote: 'У ціну входить: витратні матеріали, потрібні для виконання послуги, зокрема термопаста та стандартні термопрокладки.',
    konserwacjaExtraPaidNote: 'Додатково платно: нестандартні матеріали, ремонт і запасні частини — завжди за попереднім погодженням.',
    konserwacjaIncludedNoteInkjet: 'У вартість послуг входять стандартні засоби та матеріали, необхідні для виконання сервісних робіт. У разі обслуговування абсорбера ціна включає його чищення або заміну на новий — залежно від стану абсорбера та наявності відповідної частини.',
    konserwacjaExtraPaidNoteInkjet: 'Додатково платно: ремонт та інші запасні частини, якщо вони виявляться необхідними — завжди за попереднім погодженням з клієнтом.',
    deviceCategoriesDescription: {
      default: 'Ціна залежить від класу, конструкції та ступеня оснащеності принтера: перша – домашній, друга – офісний, третя – бізнесовий.',
      serwisDrukarekIglowych: 'Ціна залежить від розміру та конструкції матричного принтера: перша – малий, друга – середній, третя – великий матричний принтер.',
      serwisDrukarekTermicznych: 'Ціна залежить від класу, конструкції та призначення принтера: перша – настільний, друга – напівпромисловий, третя – промисловий.',
      serwisDrukarek3d: 'Ціна залежить від розміру та конструкції принтера: перша – малий, друга – середній, третя – великий 3D-принтер.',
      serwisPlotterow: 'Ціна залежить від ширини друку плотера: перша – малий, друга – середній, третя – великий.',
      serwisDrukarekAtramentowych: 'Ціна залежить від класу, конструкції та призначення принтера: перша – домашній, друга – офісний, третя – бізнесовий.',
      serwisNiszczarek: 'Ціна залежить від класу, конструкції та продуктивності знищувача: перша – мала, друга – офісна, третя – професійна.',
      ups: 'Ціна залежить від потужності ДБЖ: перша – до 1 kVA, друга – 1–⁠3 kVA, третя – 3–⁠10 kVA.',
      serwisDrukarekDoKart: 'Ціна залежить від класу, конструкції та оснащення принтера карток: перша – базовий, друга – бізнесовий, третя – ретрансферний.',
      serwisDrukarekDtg: 'Ціна залежить від класу, конструкції та продуктивності DTG-принтера: перша – компактний, друга – професійний, третя – промисловий.',
      serwisDrukarekDtf: 'Ціна залежить від класу, конструкції та продуктивності DTF-принтера: перша – компактний, друга – професійний, третя – промисловий.',
      serwisDrukarekSublimacja: 'Ціна залежить від класу, конструкції та розміру сублімаційного принтера: перша – компактний, друга – професійний, третя – широкоформатний.',
      serwisDrukarekSpozywczych: 'Ціна залежить від конструкції та способу друку харчового принтера: перша – аркушевий, друга – компактний, третя – професійний.',
      serwisEkspresowDoKawy: 'Ціна залежить від типу та призначення кавомашини: перша – домашня, друга – офісна, третя – гастрономічна.',
    },
    deviceCategoriesNote: {
      serwisNiszczarek: 'Великі центральні та промислові знищувачі – індивідуальна оцінка вартості.',
      ups: 'ДБЖ понад 10 kVA – індивідуальна оцінка вартості.',
    },
    categoryTranslationsAtrament: {
      'Drukarka domowa': { title: 'Домашній принтер', description: 'Невеликі струменеві принтери A4 для дому та нечастого друку', features: [] },
      'Drukarka biurowa': { title: 'Офісний принтер', description: 'Принтери A4/A3 для щоденної роботи в офісі, часто зі сканером або великими ємностями для чорнила', features: [] },
      'Drukarka biznesowa': { title: 'Бізнес-принтер', description: 'Більші та складніші пристрої A4/A3 для інтенсивної роботи в компанії', features: [] },
    },
    categoryTranslationsDtg: {
      'Kompaktowa': { title: 'Компактний', description: 'Невеликі DTG-принтери для коротких серій і персоналізації одягу', features: [] },
      'Profesjonalna': { title: 'Професійний', description: 'DTG-принтери для щоденного виробництва та більших тиражів', features: [] },
      'Przemysłowa': { title: 'Промисловий', description: 'Великі та продуктивні DTG-принтери для серійного виробництва та великих тиражів', features: [] },
    },
    categoryTranslationsDtf: {
      'Kompaktowa': { title: 'Компактний', description: 'Невеликі DTF-принтери для коротких серій і персоналізації одягу', features: [] },
      'Profesjonalna': { title: 'Професійний', description: 'DTF-принтери для щоденного виробництва та більших тиражів', features: [] },
      'Przemysłowa': { title: 'Промисловий', description: 'Великі та продуктивні DTF-принтери для серійного виробництва та великих тиражів', features: [] },
    },
    categoryTranslationsSublimacja: {
      'Kompaktowa': { title: 'Компактний', description: 'Невеликі сублімаційні принтери для коротких серій і персоналізації', features: [] },
      'Profesjonalna': { title: 'Професійний', description: 'Сублімаційні принтери для щоденного виробництва та більших форматів', features: [] },
      'Wielkoformatowa': { title: 'Широкоформатний', description: 'Великі сублімаційні принтери для друку з рулону та великих тиражів', features: [] },
    },
    categoryTranslationsSpozywcze: {
      'Arkuszowa': { title: 'Аркушевий', description: 'Струменеві принтери з їстівним чорнилом для друку на цукрових і вафельних аркушах', features: [] },
      'Kompaktowa': { title: 'Компактний', description: 'Невеликі принтери для друку безпосередньо на тістечках та інших харчових продуктах', features: [] },
      'Profesjonalna': { title: 'Професійний', description: 'Більші принтери для регулярного друку безпосередньо на харчових продуктах', features: [] },
    },
    wynajemTableLabels: {
      pagesIncluded: ['Кількість сторінок A4', 'включених в оренду'],
      printPriceMono: ['Ціна друку A4 моно', '(понад ліміт)'],
      printPriceColor: ['Ціна друку A4 колір', '(понад ліміт)'],
      printPriceOverLimit: ['Ціна друку A4', '(після використання включених сторінок)'],
      scanning: 'Сканування',
      duplex: 'Дуплекс',
      printSpeedPrefix: 'Швидкість друку до:',
    },
    wynajemUnits: {
      mono: 'моно',
      kolor: 'колір',
      str: 'стор.',
      strPerMonth: 'стор./міс.',
      strPerMin: 'стор./хв.',
      currency: 'zł',
    },
    categoryTranslations: {
      // serwis-ekspresow-do-kawy
      'Ekspresy domowe': { title: 'Домашні кавомашини', description: 'Автоматичні та ріжкові кавомашини для щоденного домашнього використання', features: [] },
      'Ekspresy biurowe': { title: 'Офісні кавомашини', description: 'Кавомашини для офісів і компаній, розраховані на приготування більшої кількості кави', features: [] },
      'Ekspresy gastronomiczne': { title: 'Гастрономічні кавомашини', description: 'Кавомашини для кав’ярень, ресторанів і готелів, призначені для інтенсивної роботи', features: [] },
      // naprawa-zasilaczy-ups
      'do 1 kVA': { title: 'до 1 kVA', description: 'Невеликі ДБЖ для комп’ютера, роутера, касового апарата або відеоспостереження', features: [] },
      '1–3 kVA': { title: '1–3 kVA', description: 'ДБЖ для офісу та невеликих серверів, підлогові або призначені для серверної шафи', features: [] },
      '3–10 kVA': { title: '3–10 kVA', description: 'ДБЖ для серверних і компаній, часто типу online (з подвійним перетворенням), з додатковими батарейними модулями', features: [] },
      // serwis-niszczarek
      'Mała': { title: 'Мала', description: 'Невеликі знищувачі для дому та невеликого офісу, призначені для знищення невеликої кількості документів', features: [] },
      'Biurowa': { title: 'Офісна', description: 'Знищувачі для щоденної роботи в офісі, розраховані на кількох користувачів', features: [] },
      'Profesjonalna': { title: 'Професійна', description: 'Продуктивні знищувачі для інтенсивної роботи та знищення великої кількості документів', features: [] },
      // serwis-drukarek-do-kart-plastikowych
      'Podstawowa': { title: 'Базовий', description: 'Принтери для одностороннього друку на пластикових картках, напр. бейджах і картках працівників', features: [] },
      'Biznesowa': { title: 'Бізнесовий', description: 'Принтери для двостороннього друку та щоденної роботи, часто з можливістю запису даних на магнітну смугу або чип', features: [] },
      'Retransferowa': { title: 'Ретрансферний', description: 'Принтери, що наносять зображення на картку за допомогою спеціальної плівки, призначені для отримання високоякісного друку', features: [] },
      'Drukarka domowa': { title: 'Домашній принтер', description: 'Невеликі лазерні принтери A4 для дому та нечастого друку', features: [] },
      'Drukarka biurowa': { title: 'Офісний принтер', description: 'Принтери та багатофункціональні пристрої A4/A3 для щоденної роботи в офісі', features: [] },
      'Drukarka biznesowa': { title: 'Бізнес-принтер', description: 'Великі пристрої A4/A3 для інтенсивної роботи в компанії, часто з кількома лотками для паперу та додатковим обладнанням', features: [] },
      'Drukarka biurkowa': { title: 'Настільний принтер', description: 'Невеликі принтери етикеток для щоденної роботи з невеликою та середньою кількістю друку', features: [] },
      'Drukarka półprzemysłowa': { title: 'Напівпромисловий принтер', description: 'Продуктивніші принтери для регулярної роботи на складах, у магазинах і логістиці', features: [] },
      'Drukarka przemysłowa': { title: 'Промисловий принтер', description: 'Витривалі принтери для інтенсивної або безперервної роботи, часто з додатковим обладнанням', features: [] },
      'Mała drukarka igłowa': { title: 'Малий матричний принтер', description: 'Невеликі настільні принтери з вужчим трактом паперу', features: [] },
      'Średnia drukarka igłowa': { title: 'Середній матричний принтер', description: 'Більші принтери для офісу та друку бланків', features: [] },
      'Duża drukarka igłowa': { title: 'Великий матричний принтер', description: 'Великі принтери для інтенсивної роботи та друку багатошарових бланків', features: [] },
      'Mała drukarka 3D': { title: 'Малий 3D-принтер', description: 'Компактні принтери з простою конструкцією та невеликим робочим полем', features: [] },
      'Średnia drukarka 3D': { title: 'Середній 3D-принтер', description: 'Більші принтери, часто із закритим корпусом і складнішою механікою', features: [] },
      'Duża drukarka 3D': { title: 'Великий 3D-принтер', description: 'Великі настільні та професійні принтери зі складною конструкцією', features: [] },
      'Mały ploter': { title: 'Малий плотер', description: 'Компактні плотери з шириною друку до 24″', features: [] },
      'Średni ploter': { title: 'Середній плотер', description: 'Плотери з шириною друку понад 24″ до 44″', features: [] },
      'Duży ploter': { title: 'Великий плотер', description: 'Плотери з шириною друку понад 44″', features: [] },
    },
  },
  ru: {
    priceHeaderFull: 'Цена, zł',
    priceHeaderShort: 'Цена',
    priceNettoTooltip: 'Цена без НДС',
    priceInfoAriaLabel: 'Информация о ценах',
    categoryInfoAriaLabel: 'Информация о категориях',
    closeAriaLabel: 'Закрыть',
    timeHeader: 'Срок',
    timeHeaderLine2: 'выполнения',
    reactionTimeHeader: 'Время',
    reactionTimeHeaderLine2: 'реакции',
    viewPriceList: 'Смотреть прайс-лист',
    viewDetails: 'Подробнее',
    detailsInPreparation: 'Описание услуги готовится',
    gratisLower: 'бесплатно',
    gratisUpper: 'БЕСПЛАТНО',
    deviceCategoriesTitle: 'Категории устройств',
    deviceCategoriesCaption: '(категории устройств)',
    exampleLabel: '(напр.',
    wynajemTerms: {
      netNote: 'Все цены указаны нетто.',
      includedTitle: 'В стоимость аренды входит:',
      included: ['устройство', 'сервис и ремонты, связанные с обычным использованием', 'тонеры', 'стандартные расходные материалы и детали, необходимые для правильной работы устройства'],
      clientTitle: 'Со стороны Клиента:',
      client: ['бумага', 'электроэнергия', 'печать сверх месячного лимита по тарифам из таблицы'],
      conditions: ['Доставка, установка устройства и базовая настройка входят в стоимость аренды.', 'После окончания аренды мы забираем устройство.', 'Минимальный срок аренды: 1 месяц. Долгосрочный договор не требуется.', 'Время реакции сервиса: до 24 рабочих часов.'],
    },
    dzTerms: {
      title: 'Принтер на замену на время ремонта',
      included: [
        'предоставляем устройство на замену на время ремонта техники Клиента',
        'без абонентской платы',
        'Клиент оплачивает выполненную печать по прайсу',
        'тонер и стандартные расходные материалы — за наш счёт',
        'бумага — за счёт Клиента',
        'подбираем устройство, максимально близкое по функциям к ремонтируемой технике',
      ],
      conditions: [
        'Доставку и базовую настройку устройства на замену согласовываем при оформлении заявки на ремонт.',
        'Наличие устройства на замену зависит от оборудования, доступного на данный момент.',
        'Обычно можем предоставить устройство в течение 24 рабочих часов — в зависимости от наличия подходящего оборудования.',
        'Если устройство на замену сломается, свяжитесь с сервисом. Мы организуем ремонт или замену устройства в зависимости от наличия.',
      ],
      netNote: 'Все указанные цены — нетто.',
      yes: 'да',
      no: 'нет',
    },
    printPriceHeader: 'Цена печати',
    dojazdNote: [
      'Мы не говорим, что выезд или забор устройства «бесплатные»,',
      'а потом добавляем эти расходы к стоимости ремонта',
    ],
    dojazdPromoTitle: '«БЕСПЛАТНЫЙ ВЫЕЗД»',
    konserwacjaPromoTitle: '«ПРОДУВКА + ПАСТА»',
    konserwacjaPromoDescription: 'Мы не предлагаем урезанную услугу — выполняем полное обслуживание системы охлаждения',
    konserwacjaPromoTitleAlt: '«ТОЛЬКО ПРОДУВКА?»',
    konserwacjaPromoDescriptionAlt: 'Мы не ограничиваемся только удалением пыли — выполняем полное обслуживание устройства',
    konserwacjaPromoTitleNiszczarki: '«ТОЛЬКО СМАЗКА?»',
    konserwacjaPromoDescriptionNiszczarki: 'Мы не ограничиваемся только смазкой ножей — выполняем полное обслуживание уничтожителя',
    konserwacjaPromoDescriptionUps: 'Мы не ограничиваемся только удалением пыли — выполняем полный осмотр и обслуживание ИБП',
    konserwacjaPromoTitleInkjet: '«ТОЛЬКО ЧИСТКА ГОЛОВКИ?»',
    konserwacjaPromoDescriptionInkjet: 'Мы не ограничиваемся прочисткой головки — выполняем полное обслуживание печатающего узла и механизмов принтера',
    konserwacjaPromoTitleDtg: '«ТОЛЬКО ЦИКЛ ЧИСТКИ?»',
    konserwacjaPromoDescriptionDtg: 'Мы не ограничиваемся чисткой с панели — выполняем полное обслуживание сервисной станции, чернильной системы и механики DTG-принтера',
    konserwacjaPromoDescriptionDtf: 'Мы не ограничиваемся чисткой с панели — выполняем полное обслуживание сервисной станции, чернильной системы и механики DTF-принтера',
    konserwacjaPromoDescriptionSublimacja: 'Мы не ограничиваемся чисткой с панели — выполняем полное обслуживание сервисной станции, чернильной системы и механики сублимационного принтера',
    konserwacjaPromoTitleKawa: '«ТОЛЬКО УДАЛЕНИЕ НАКИПИ?»',
    konserwacjaPromoDescriptionKawa: 'Мы не ограничиваемся запуском программы чистки — выполняем полное обслуживание кофейной, водяной и молочной систем, а также механизмов кофемашины',
    konserwacjaPromoDescriptionSpozywcze: 'Мы не ограничиваемся чисткой с панели — выполняем полное обслуживание сервисной станции, чернильной системы и механики пищевого принтера',
    konserwacjaIncludedNote: 'В цену входит: расходные материалы, необходимые для выполнения услуги, в том числе термопаста и стандартные термопрокладки.',
    konserwacjaExtraPaidNote: 'Дополнительно платно: нестандартные материалы, ремонт и запасные части — всегда по предварительному согласованию.',
    konserwacjaIncludedNoteInkjet: 'В стоимость услуг входят стандартные средства и материалы, необходимые для выполнения сервисных работ. При обслуживании абсорбера цена включает его чистку или замену на новый — в зависимости от состояния абсорбера и наличия соответствующей детали.',
    konserwacjaExtraPaidNoteInkjet: 'Дополнительно платно: ремонт и другие запасные части, если они окажутся необходимыми — всегда по предварительному согласованию с клиентом.',
    deviceCategoriesDescription: {
      default: 'Цена зависит от класса, конструкции и степени оснащённости принтера: первая – домашний, вторая – офисный, третья – бизнес-принтер.',
      serwisDrukarekIglowych: 'Цена зависит от размера и конструкции матричного принтера: первая – малый, вторая – средний, третья – большой матричный принтер.',
      serwisDrukarekTermicznych: 'Цена зависит от класса, конструкции и назначения принтера: первая – настольный, вторая – полупромышленный, третья – промышленный.',
      serwisDrukarek3d: 'Цена зависит от размера и конструкции принтера: первая – малый, вторая – средний, третья – большой 3D-принтер.',
      serwisPlotterow: 'Цена зависит от ширины печати плоттера: первая – малый, вторая – средний, третья – большой.',
      serwisDrukarekAtramentowych: 'Цена зависит от класса, конструкции и назначения принтера: первая – домашний, вторая – офисный, третья – бизнес-принтер.',
      serwisNiszczarek: 'Цена зависит от класса, конструкции и производительности уничтожителя: первая – малая, вторая – офисная, третья – профессиональная.',
      ups: 'Цена зависит от мощности ИБП: первая – до 1 kVA, вторая – 1–⁠3 kVA, третья – 3–⁠10 kVA.',
      serwisDrukarekDoKart: 'Цена зависит от класса, конструкции и оснащения принтера карт: первая – базовый, вторая – бизнес, третья – ретрансферный.',
      serwisDrukarekDtg: 'Цена зависит от класса, конструкции и производительности DTG-принтера: первая – компактный, вторая – профессиональный, третья – промышленный.',
      serwisDrukarekDtf: 'Цена зависит от класса, конструкции и производительности DTF-принтера: первая – компактный, вторая – профессиональный, третья – промышленный.',
      serwisDrukarekSublimacja: 'Цена зависит от класса, конструкции и размера сублимационного принтера: первая – компактный, вторая – профессиональный, третья – широкоформатный.',
      serwisDrukarekSpozywczych: 'Цена зависит от конструкции и способа печати пищевого принтера: первая – листовой, вторая – компактный, третья – профессиональный.',
      serwisEkspresowDoKawy: 'Цена зависит от типа и назначения кофемашины: первая – домашняя, вторая – офисная, третья – гастрономическая.',
    },
    deviceCategoriesNote: {
      serwisNiszczarek: 'Крупные центральные и промышленные уничтожители – индивидуальный расчёт стоимости.',
      ups: 'ИБП свыше 10 kVA – индивидуальный расчёт стоимости.',
    },
    categoryTranslationsAtrament: {
      'Drukarka domowa': { title: 'Домашний принтер', description: 'Небольшие струйные принтеры A4 для дома и нечастой печати', features: [] },
      'Drukarka biurowa': { title: 'Офисный принтер', description: 'Принтеры A4/A3 для ежедневной работы в офисе, часто со сканером или большими ёмкостями для чернил', features: [] },
      'Drukarka biznesowa': { title: 'Бизнес-принтер', description: 'Более крупные и сложные устройства A4/A3 для интенсивной работы в компании', features: [] },
    },
    categoryTranslationsDtg: {
      'Kompaktowa': { title: 'Компактный', description: 'Небольшие DTG-принтеры для коротких серий и персонализации одежды', features: [] },
      'Profesjonalna': { title: 'Профессиональный', description: 'DTG-принтеры для ежедневного производства и больших тиражей', features: [] },
      'Przemysłowa': { title: 'Промышленный', description: 'Крупные и производительные DTG-принтеры для серийного производства и больших тиражей', features: [] },
    },
    categoryTranslationsDtf: {
      'Kompaktowa': { title: 'Компактный', description: 'Небольшие DTF-принтеры для коротких серий и персонализации одежды', features: [] },
      'Profesjonalna': { title: 'Профессиональный', description: 'DTF-принтеры для ежедневного производства и больших тиражей', features: [] },
      'Przemysłowa': { title: 'Промышленный', description: 'Крупные и производительные DTF-принтеры для серийного производства и больших тиражей', features: [] },
    },
    categoryTranslationsSublimacja: {
      'Kompaktowa': { title: 'Компактный', description: 'Небольшие сублимационные принтеры для коротких серий и персонализации', features: [] },
      'Profesjonalna': { title: 'Профессиональный', description: 'Сублимационные принтеры для ежедневного производства и больших форматов', features: [] },
      'Wielkoformatowa': { title: 'Широкоформатный', description: 'Крупные сублимационные принтеры для печати с рулона и больших тиражей', features: [] },
    },
    categoryTranslationsSpozywcze: {
      'Arkuszowa': { title: 'Листовой', description: 'Струйные принтеры со съедобными чернилами для печати на сахарных и вафельных листах', features: [] },
      'Kompaktowa': { title: 'Компактный', description: 'Небольшие принтеры для печати прямо на пирожных и других пищевых продуктах', features: [] },
      'Profesjonalna': { title: 'Профессиональный', description: 'Более крупные принтеры для регулярной печати прямо на пищевых продуктах', features: [] },
    },
    wynajemTableLabels: {
      pagesIncluded: ['Количество страниц A4', 'включённых в аренду'],
      printPriceMono: ['Цена печати A4 моно', '(сверх лимита)'],
      printPriceColor: ['Цена печати A4 цвет', '(сверх лимита)'],
      printPriceOverLimit: ['Цена печати A4', '(после использования включённых страниц)'],
      scanning: 'Сканирование',
      duplex: 'Дуплекс',
      printSpeedPrefix: 'Скорость печати до:',
    },
    wynajemUnits: {
      mono: 'моно',
      kolor: 'цвет',
      str: 'стр.',
      strPerMonth: 'стр./мес.',
      strPerMin: 'стр./мин.',
      currency: 'zł',
    },
    categoryTranslations: {
      // serwis-ekspresow-do-kawy
      'Ekspresy domowe': { title: 'Домашние кофемашины', description: 'Автоматические и рожковые кофемашины для ежедневного домашнего использования', features: [] },
      'Ekspresy biurowe': { title: 'Офисные кофемашины', description: 'Кофемашины для офисов и компаний, рассчитанные на приготовление большего количества кофе', features: [] },
      'Ekspresy gastronomiczne': { title: 'Гастрономические кофемашины', description: 'Кофемашины для кофеен, ресторанов и отелей, предназначенные для интенсивной работы', features: [] },
      // naprawa-zasilaczy-ups
      'do 1 kVA': { title: 'до 1 kVA', description: 'Небольшие ИБП для компьютера, роутера, кассового аппарата или видеонаблюдения', features: [] },
      '1–3 kVA': { title: '1–3 kVA', description: 'ИБП для офиса и небольших серверов, напольные или предназначенные для серверного шкафа', features: [] },
      '3–10 kVA': { title: '3–10 kVA', description: 'ИБП для серверных и компаний, часто типа online (с двойным преобразованием), с дополнительными батарейными модулями', features: [] },
      // serwis-niszczarek
      'Mała': { title: 'Малая', description: 'Небольшие уничтожители для дома и небольшого офиса, предназначенные для уничтожения небольшого количества документов', features: [] },
      'Biurowa': { title: 'Офисная', description: 'Уничтожители для ежедневной работы в офисе, рассчитанные на нескольких пользователей', features: [] },
      'Profesjonalna': { title: 'Профессиональная', description: 'Производительные уничтожители для интенсивной работы и уничтожения большого количества документов', features: [] },
      // serwis-drukarek-do-kart-plastikowych
      'Podstawowa': { title: 'Базовый', description: 'Принтеры для односторонней печати на пластиковых картах, например бейджах и картах сотрудников', features: [] },
      'Biznesowa': { title: 'Бизнес', description: 'Принтеры для двусторонней печати и ежедневной работы, часто с возможностью записи данных на магнитную полосу или чип', features: [] },
      'Retransferowa': { title: 'Ретрансферный', description: 'Принтеры, наносящие изображение на карту с помощью специальной плёнки, предназначенные для получения высококачественной печати', features: [] },
      'Drukarka domowa': { title: 'Домашний принтер', description: 'Небольшие лазерные принтеры A4 для дома и нечастой печати', features: [] },
      'Drukarka biurowa': { title: 'Офисный принтер', description: 'Принтеры и многофункциональные устройства A4/A3 для ежедневной работы в офисе', features: [] },
      'Drukarka biznesowa': { title: 'Бизнес-принтер', description: 'Крупные устройства A4/A3 для интенсивной работы в компании, часто с несколькими лотками для бумаги и дополнительным оборудованием', features: [] },
      'Drukarka biurkowa': { title: 'Настольный принтер', description: 'Небольшие принтеры этикеток для ежедневной работы при небольшом и среднем объёме печати', features: [] },
      'Drukarka półprzemysłowa': { title: 'Полупромышленный принтер', description: 'Более производительные принтеры для регулярной работы на складах, в магазинах и логистике', features: [] },
      'Drukarka przemysłowa': { title: 'Промышленный принтер', description: 'Прочные принтеры для интенсивной или непрерывной работы, часто с дополнительным оборудованием', features: [] },
      'Mała drukarka igłowa': { title: 'Малый матричный принтер', description: 'Небольшие настольные принтеры с более узким трактом бумаги', features: [] },
      'Średnia drukarka igłowa': { title: 'Средний матричный принтер', description: 'Более крупные принтеры для офиса и печати бланков', features: [] },
      'Duża drukarka igłowa': { title: 'Большой матричный принтер', description: 'Крупные принтеры для интенсивной работы и печати многослойных бланков', features: [] },
      'Mała drukarka 3D': { title: 'Малый 3D-принтер', description: 'Компактные принтеры с простой конструкцией и небольшим рабочим полем', features: [] },
      'Średnia drukarka 3D': { title: 'Средний 3D-принтер', description: 'Более крупные принтеры, часто с закрытым корпусом и более сложной механикой', features: [] },
      'Duża drukarka 3D': { title: 'Большой 3D-принтер', description: 'Крупные настольные и профессиональные принтеры со сложной конструкцией', features: [] },
      'Mały ploter': { title: 'Малый плоттер', description: 'Компактные плоттеры с шириной печати до 24″', features: [] },
      'Średni ploter': { title: 'Средний плоттер', description: 'Плоттеры с шириной печати свыше 24″ до 44″', features: [] },
      'Duży ploter': { title: 'Большой плоттер', description: 'Плоттеры с шириной печати свыше 44″', features: [] },
    },
  },
} as const
