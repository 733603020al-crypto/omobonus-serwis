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
  konserwacjaPromoDescriptionNiszczarki: string
  konserwacjaPromoTitleInkjet: string
  konserwacjaPromoDescriptionInkjet: string
  konserwacjaPromoTitleDtg: string
  konserwacjaPromoDescriptionDtg: string
  konserwacjaPromoDescriptionSpozywcze: string
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
    serwisDrukarekDoKart: string
    serwisDrukarekDtg: string
    serwisDrukarekSpozywczych: string
  }
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
    konserwacjaPromoDescriptionAlt: 'Nie ograniczamy się tylko do usunięcia kurzu — wykonujemy pełną konserwację urządzenia.',
    konserwacjaPromoDescriptionNiszczarki: 'Nie ograniczamy się tylko do usunięcia kurzu — wykonujemy pełną konserwację niszczarki.',
    konserwacjaPromoTitleInkjet: '„TYLKO CZYSZCZENIE GŁOWICY?”',
    konserwacjaPromoDescriptionInkjet: 'Nie ograniczamy się do udrażniania głowicy — wykonujemy pełną konserwację układu drukującego i mechanizmów drukarki.',
    konserwacjaPromoTitleDtg: '„TYLKO CYKL CZYSZCZĄCY?”',
    konserwacjaPromoDescriptionDtg: 'Nie ograniczamy się do czyszczenia z panelu — wykonujemy pełną konserwację stacji serwisowej, układu atramentowego i mechaniki drukarki DTG.',
    konserwacjaPromoDescriptionSpozywcze: 'Nie ograniczamy się do czyszczenia z panelu — wykonujemy pełną konserwację stacji serwisowej, układu atramentowego i mechaniki drukarki spożywczej.',
    konserwacjaIncludedNote: 'W cenie: materiały eksploatacyjne potrzebne do wykonania usługi, w tym pasta termoprzewodząca i standardowe termopady.',
    konserwacjaExtraPaidNote: 'Dodatkowo płatne: niestandardowe materiały, naprawy i części zamienne — zawsze po wcześniejszym uzgodnieniu.',
    konserwacjaIncludedNoteInkjet: 'W cenie usług zawarte są standardowe środki i materiały potrzebne do wykonania prac serwisowych. W przypadku obsługi absorbera cena obejmuje jego czyszczenie lub wymianę na nowy — zależnie od stanu absorbera i dostępności odpowiedniej części.',
    konserwacjaExtraPaidNoteInkjet: 'Dodatkowo płatne są naprawy oraz inne części zamienne, jeśli okażą się konieczne — zawsze po wcześniejszym uzgodnieniu z klientem.',
    deviceCategoriesDescription: {
      default: 'Cena zależy od klasy, konstrukcji i stopnia rozbudowania drukarki: pierwsza – domowa, druga – biurowa, trzecia – biznesowa.',
      serwisDrukarekIglowych: 'Cena zależy od klasy, konstrukcji i szerokości mechanizmu drukarki: pierwsza – mała, druga – średnia, trzecia – duża drukarka igłowa.',
      serwisDrukarekTermicznych: 'Cena zależy od klasy, konstrukcji i przeznaczenia drukarki: pierwsza – biurkowa, druga – półprzemysłowa, trzecia – przemysłowa.',
      serwisDrukarek3d: 'Cena zależy od wielkości i konstrukcji drukarki: pierwsza – mała, druga – średnia, trzecia – duża drukarka 3D.',
      serwisPlotterow: 'Cena zależy od wielkości i konstrukcji plotera: pierwsza – mały, druga – średni, trzecia – duży.',
      serwisDrukarekAtramentowych: 'Cena zależy od klasy, konstrukcji i przeznaczenia drukarki: pierwsza – domowa, druga – biurowa, trzecia – biznesowa.',
      serwisNiszczarek: 'Cena zależy od klasy, konstrukcji i wydajności niszczarki: pierwsza – mała, druga – biurowa, trzecia – profesjonalna.',
      serwisDrukarekDoKart: 'Cena zależy od klasy, konstrukcji i wyposażenia drukarki do kart: pierwsza – podstawowa, druga – biznesowa, trzecia – retransferowa.',
      serwisDrukarekDtg: 'Cena zależy od klasy, konstrukcji i wydajności drukarki DTG: pierwsza – kompaktowa, druga – profesjonalna, trzecia – przemysłowa. Czas realizacji nie obejmuje oczekiwania na części.',
      serwisDrukarekSpozywczych: 'Cena zależy od konstrukcji i stopnia rozbudowania drukarki spożywczej: pierwsza — arkuszowa / adaptowana, druga — kompaktowa direct-to-food, trzecia — profesjonalna direct-to-food. Czas realizacji nie obejmuje oczekiwania na części.',
    },
    categoryTranslations: {},
    categoryTranslationsAtrament: {},
    categoryTranslationsDtg: {},
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
    konserwacjaPromoDescriptionAlt: 'Ми не обмежуємося лише видаленням пилу — виконуємо повне обслуговування пристрою.',
    konserwacjaPromoDescriptionNiszczarki: 'Ми не обмежуємося лише видаленням пилу — виконуємо повне обслуговування знищувача.',
    konserwacjaPromoTitleInkjet: '«ТІЛЬКИ ЧИЩЕННЯ ГОЛОВКИ?»',
    konserwacjaPromoDescriptionInkjet: 'Ми не обмежуємося прочищенням головки — виконуємо повне обслуговування друкувального вузла та механізмів принтера.',
    konserwacjaPromoTitleDtg: '«ТІЛЬКИ ЦИКЛ ЧИЩЕННЯ?»',
    konserwacjaPromoDescriptionDtg: 'Ми не обмежуємося чищенням із панелі — виконуємо повне обслуговування сервісної станції, чорнильної системи та механіки DTG-принтера.',
    konserwacjaPromoDescriptionSpozywcze: 'Ми не обмежуємося чищенням із панелі — виконуємо повне обслуговування сервісної станції, чорнильної системи та механіки харчового принтера.',
    konserwacjaIncludedNote: 'У ціну входить: витратні матеріали, потрібні для виконання послуги, зокрема термопаста та стандартні термопрокладки.',
    konserwacjaExtraPaidNote: 'Додатково платно: нестандартні матеріали, ремонт і запасні частини — завжди за попереднім погодженням.',
    konserwacjaIncludedNoteInkjet: 'У вартість послуг входять стандартні засоби та матеріали, необхідні для виконання сервісних робіт. У разі обслуговування абсорбера ціна включає його чищення або заміну на новий — залежно від стану абсорбера та наявності відповідної частини.',
    konserwacjaExtraPaidNoteInkjet: 'Додатково платно: ремонт та інші запасні частини, якщо вони виявляться необхідними — завжди за попереднім погодженням з клієнтом.',
    deviceCategoriesDescription: {
      default: 'Ціна залежить від класу, конструкції та ступеня оснащеності принтера: перша — домашній, друга — офісний, третя — бізнесовий.',
      serwisDrukarekIglowych: 'Ціна залежить від класу, конструкції та ширини механізму принтера: перша — малий, друга — середній, третя — великий матричний принтер.',
      serwisDrukarekTermicznych: 'Ціна залежить від класу, конструкції та призначення принтера: перша — настільний, друга — напівпромисловий, третя — промисловий.',
      serwisDrukarek3d: 'Ціна залежить від розміру та конструкції принтера: перша — малий, друга — середній, третя — великий 3D-принтер.',
      serwisPlotterow: 'Ціна залежить від розміру та конструкції плотера: перша — малий, друга — середній, третя — великий.',
      serwisDrukarekAtramentowych: 'Ціна залежить від класу, конструкції та призначення принтера: перша — домашній, друга — офісний, третя — бізнесовий.',
      serwisNiszczarek: 'Ціна залежить від класу, конструкції та продуктивності знищувача: перша — мала, друга — офісна, третя — професійна категорія.',
      serwisDrukarekDoKart: 'Ціна залежить від класу, конструкції та оснащення принтера карток: перша — базовий, друга — бізнесовий, третя — ретрансферний.',
      serwisDrukarekDtg: 'Ціна залежить від класу, конструкції та продуктивності DTG-принтера: перша — компактний, друга — професійний, третя — промисловий. Термін виконання не враховує очікування на деталі.',
      serwisDrukarekSpozywczych: 'Ціна залежить від конструкції та рівня складності харчового принтера: перша — аркушевий / адаптований, друга — компактний direct-to-food, третя — професійний direct-to-food. Термін виконання не враховує очікування на деталі.',
    },
    categoryTranslationsAtrament: {
      'Drukarka domowa': { title: 'Домашній принтер', description: 'Компактні принтери A4 простішої конструкції, призначені для домашнього та нечастого використання.', features: [] },
      'Drukarka biurowa': { title: 'Офісний принтер', description: 'Принтери A4/A3 для регулярної роботи, часто з розширеним лотком подачі, сканером або системою безперервної подачі чорнила.', features: [] },
      'Drukarka biznesowa': { title: 'Бізнес-принтер', description: 'Більші та складніші пристрої A4/A3 для інтенсивної роботи та більших навантажень.', features: [] },
    },
    categoryTranslationsDtg: {
      'Kompaktowa': { title: 'Компактний', description: 'Компактні DTG-принтери для малих тиражів, персоналізації одягу та невеликого виробництва.', features: [] },
      'Profesjonalna': { title: 'Професійний', description: 'DTG-принтери для регулярного виробництва, більших тиражів та інтенсивної щоденної роботи.', features: [] },
      'Przemysłowa': { title: 'Промисловий', description: 'Високопродуктивні DTG-системи для серійного виробництва, великих тиражів і промислової роботи.', features: [] },
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
      // serwis-drukarek-spozywczych
      'Arkuszowe / adaptowane': { title: 'Аркушеві / адаптовані', description: 'Струменеві принтери, пристосовані до роботи з їстівним чорнилом і друку на цукрових, вафельних аркушах та frosting sheets.', features: [] },
      'Direct-to-food kompaktowe': { title: 'Direct-to-food компактні', description: 'Компактні принтери з механізмом столу або платформи, що дозволяють друкувати безпосередньо на тістечках, топперах, печиві та інших продуктах.', features: [] },
      'Direct-to-food profesjonalne': { title: 'Direct-to-food професійні', description: 'Складніші харчові принтери для регулярної роботи, з власним механізмом позиціонування продукту, приводом, датчиками та системою прямого друку.', features: [] },
      // serwis-niszczarek
      'Mała': { title: 'Мала', description: 'Компактні знищувачі документів для дому та невеликого офісу, розраховані на невеликі обсяги документів при регулярному використанні.', features: [] },
      'Biurowa': { title: 'Офісна', description: 'Знищувачі для регулярної офісної роботи кількох користувачів, з вищою продуктивністю та складнішою конструкцією.', features: [] },
      'Profesjonalna': { title: 'Професійна', description: 'Продуктивні знищувачі для інтенсивної або безперервної роботи, великих обсягів документів і професійного використання.', features: [] },
      // serwis-drukarek-do-kart-plastikowych
      'Podstawowa': { title: 'Базовий', description: 'Односторонні принтери карток за технологією сублімації (direct-to-card) для простих бейджів і менших тиражів.', features: [] },
      'Biznesowa': { title: 'Бізнесовий', description: 'Двосторонні принтери для регулярної роботи, часто з кодерами карток (магнітна смуга, чип, RFID) і більшим подавачем.', features: [] },
      'Retransferowa': { title: 'Ретрансферний', description: 'Просунуті ретрансферні принтери, часто з модулем ламінації, для карток найвищої якості та інтенсивної роботи.', features: [] },
      'Drukarka domowa': { title: 'Домашній принтер', description: 'Компактні лазерні принтери A4 простішої конструкції, призначені для домашнього використання та невеликих навантажень.', features: [] },
      'Drukarka biurowa': { title: 'Офісний принтер', description: 'Принтери та багатофункціональні пристрої A4/A3 для регулярної роботи, зі складнішим трактом подачі паперу та додатковими модулями.', features: [] },
      'Drukarka biznesowa': { title: 'Бізнес-принтер', description: 'Великі та складні пристрої A4/A3 для інтенсивної роботи, часто з кількома лотками, дуплексом, ADF і фінішними модулями.', features: [] },
      'Drukarka biurkowa': { title: 'Настільний принтер', description: 'Компактні принтери етикеток для стандартної роботи з меншими та середніми обсягами.', features: [] },
      'Drukarka półprzemysłowa': { title: 'Напівпромисловий принтер', description: 'Продуктивніші принтери для регулярної роботи на складах, у торгівлі та логістиці, з розширенішим механізмом.', features: [] },
      'Drukarka przemysłowa': { title: 'Промисловий принтер', description: 'Принтери з посиленою конструкцією для інтенсивної або безперервної роботи, часто оснащені додатковими модулями.', features: [] },
      'Mała drukarka igłowa': { title: 'Малий матричний принтер', description: 'Компактні настільні принтери з вужчим трактом паперу та простішою конструкцією.', features: [] },
      'Średnia drukarka igłowa': { title: 'Середній матричний принтер', description: 'Більші офісні та бланкові принтери з розширеним механізмом подачі паперу.', features: [] },
      'Duża drukarka igłowa': { title: 'Великий матричний принтер', description: 'Промислові та широкоформатні принтери для інтенсивної роботи та багатошарових бланків.', features: [] },
      'Mała drukarka 3D': { title: 'Малий 3D-принтер', description: 'Компактні принтери з простою конструкцією та невеликим робочим полем.', features: [] },
      'Średnia drukarka 3D': { title: 'Середній 3D-принтер', description: 'Більші принтери, часто закриті або CoreXY, зі складнішою механікою.', features: [] },
      'Duża drukarka 3D': { title: 'Великий 3D-принтер', description: 'Великі настільні та професійні принтери зі складною конструкцією та трудомісткішим сервісом.', features: [] },
      'Mały ploter': { title: 'Малий плотер', description: 'Компактні, зазвичай до 24″. Простіша конструкція та легший сервісний доступ.', features: [] },
      'Średni ploter': { title: 'Середній плотер', description: 'Плотери з шириною друку від 36″ до 44″. Більші габарити та складніша конструкція.', features: [] },
      'Duży ploter': { title: 'Великий плотер', description: 'Плотери з шириною друку понад 44″, напр. 54–64″ і ширші. Важча конструкція та трудомісткіший сервіс.', features: [] },
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
    konserwacjaPromoDescriptionAlt: 'Мы не ограничиваемся только удалением пыли — выполняем полное обслуживание устройства.',
    konserwacjaPromoDescriptionNiszczarki: 'Мы не ограничиваемся только удалением пыли — выполняем полное обслуживание уничтожителя.',
    konserwacjaPromoTitleInkjet: '«ТОЛЬКО ЧИСТКА ГОЛОВКИ?»',
    konserwacjaPromoDescriptionInkjet: 'Мы не ограничиваемся прочисткой головки — выполняем полное обслуживание печатающего узла и механизмов принтера.',
    konserwacjaPromoTitleDtg: '«ТОЛЬКО ЦИКЛ ЧИСТКИ?»',
    konserwacjaPromoDescriptionDtg: 'Мы не ограничиваемся чисткой с панели — выполняем полное обслуживание сервисной станции, чернильной системы и механики DTG-принтера.',
    konserwacjaPromoDescriptionSpozywcze: 'Мы не ограничиваемся чисткой с панели — выполняем полное обслуживание сервисной станции, чернильной системы и механики пищевого принтера.',
    konserwacjaIncludedNote: 'В цену входит: расходные материалы, необходимые для выполнения услуги, в том числе термопаста и стандартные термопрокладки.',
    konserwacjaExtraPaidNote: 'Дополнительно платно: нестандартные материалы, ремонт и запасные части — всегда по предварительному согласованию.',
    konserwacjaIncludedNoteInkjet: 'В стоимость услуг входят стандартные средства и материалы, необходимые для выполнения сервисных работ. При обслуживании абсорбера цена включает его чистку или замену на новый — в зависимости от состояния абсорбера и наличия соответствующей детали.',
    konserwacjaExtraPaidNoteInkjet: 'Дополнительно платно: ремонт и другие запасные части, если они окажутся необходимыми — всегда по предварительному согласованию с клиентом.',
    deviceCategoriesDescription: {
      default: 'Цена зависит от класса, конструкции и степени оснащённости принтера: первая — домашний, вторая — офисный, третья — бизнес-принтер.',
      serwisDrukarekIglowych: 'Цена зависит от класса, конструкции и ширины механизма принтера: первая — малый, вторая — средний, третья — большой матричный принтер.',
      serwisDrukarekTermicznych: 'Цена зависит от класса, конструкции и назначения принтера: первая — настольный, вторая — полупромышленный, третья — промышленный.',
      serwisDrukarek3d: 'Цена зависит от размера и конструкции принтера: первая — малый, вторая — средний, третья — большой 3D-принтер.',
      serwisPlotterow: 'Цена зависит от размера и конструкции плоттера: первая — малый, вторая — средний, третья — большой.',
      serwisDrukarekAtramentowych: 'Цена зависит от класса, конструкции и назначения принтера: первая — домашний, вторая — офисный, третья — бизнес-принтер.',
      serwisNiszczarek: 'Цена зависит от класса, конструкции и производительности уничтожителя: первая — малая, вторая — офисная, третья — профессиональная категория.',
      serwisDrukarekDoKart: 'Цена зависит от класса, конструкции и оснащения принтера карт: первая — базовый, вторая — бизнес, третья — ретрансферный.',
      serwisDrukarekDtg: 'Цена зависит от класса, конструкции и производительности DTG-принтера: первая — компактный, вторая — профессиональный, третья — промышленный. Срок выполнения не включает ожидание деталей.',
      serwisDrukarekSpozywczych: 'Цена зависит от конструкции и степени сложности пищевого принтера: первая — листовой / адаптированный, вторая — компактный direct-to-food, третья — профессиональный direct-to-food. Срок выполнения не включает ожидание деталей.',
    },
    categoryTranslationsAtrament: {
      'Drukarka domowa': { title: 'Домашний принтер', description: 'Компактные принтеры A4 более простой конструкции, предназначенные для домашнего и нечастого использования.', features: [] },
      'Drukarka biurowa': { title: 'Офисный принтер', description: 'Принтеры A4/A3 для регулярной работы, часто с расширенным лотком подачи, сканером или системой непрерывной подачи чернил.', features: [] },
      'Drukarka biznesowa': { title: 'Бизнес-принтер', description: 'Более крупные и сложные устройства A4/A3 для интенсивной работы и больших нагрузок.', features: [] },
    },
    categoryTranslationsDtg: {
      'Kompaktowa': { title: 'Компактный', description: 'Компактные DTG-принтеры для небольших тиражей, персонализации одежды и небольшого производства.', features: [] },
      'Profesjonalna': { title: 'Профессиональный', description: 'DTG-принтеры для регулярного производства, больших тиражей и интенсивной ежедневной работы.', features: [] },
      'Przemysłowa': { title: 'Промышленный', description: 'Высокопроизводительные DTG-системы для серийного производства, больших тиражей и промышленной работы.', features: [] },
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
      // serwis-drukarek-spozywczych
      'Arkuszowe / adaptowane': { title: 'Листовые / адаптированные', description: 'Струйные принтеры, приспособленные для работы со съедобными чернилами и печати на сахарных, вафельных листах и frosting sheets.', features: [] },
      'Direct-to-food kompaktowe': { title: 'Direct-to-food компактные', description: 'Компактные принтеры с механизмом стола или платформы, позволяющие печатать прямо на пирожных, топперах, печенье и других продуктах.', features: [] },
      'Direct-to-food profesjonalne': { title: 'Direct-to-food профессиональные', description: 'Более сложные пищевые принтеры для регулярной работы, с собственным механизмом позиционирования продукта, приводом, датчиками и системой прямой печати.', features: [] },
      // serwis-niszczarek
      'Mała': { title: 'Малая', description: 'Компактные уничтожители документов для дома и небольшого офиса, рассчитанные на небольшие объёмы документов при регулярном использовании.', features: [] },
      'Biurowa': { title: 'Офисная', description: 'Уничтожители для регулярной офисной работы нескольких пользователей, с более высокой производительностью и более сложной конструкцией.', features: [] },
      'Profesjonalna': { title: 'Профессиональная', description: 'Производительные уничтожители для интенсивной или непрерывной работы, больших объёмов документов и профессионального применения.', features: [] },
      // serwis-drukarek-do-kart-plastikowych
      'Podstawowa': { title: 'Базовый', description: 'Односторонние принтеры карт по технологии сублимации (direct-to-card) для простых бейджей и небольших тиражей.', features: [] },
      'Biznesowa': { title: 'Бизнес', description: 'Двусторонние принтеры для регулярной работы, часто с кодерами карт (магнитная полоса, чип, RFID) и большим податчиком.', features: [] },
      'Retransferowa': { title: 'Ретрансферный', description: 'Продвинутые ретрансферные принтеры, часто с модулем ламинации, для карт высочайшего качества и интенсивной работы.', features: [] },
      'Drukarka domowa': { title: 'Домашний принтер', description: 'Компактные лазерные принтеры A4 более простой конструкции, предназначенные для домашнего использования и небольших нагрузок.', features: [] },
      'Drukarka biurowa': { title: 'Офисный принтер', description: 'Принтеры и многофункциональные устройства A4/A3 для регулярной работы, с более сложным трактом подачи бумаги и дополнительными модулями.', features: [] },
      'Drukarka biznesowa': { title: 'Бизнес-принтер', description: 'Крупные и сложные устройства A4/A3 для интенсивной работы, часто с несколькими лотками, дуплексом, ADF и финишными модулями.', features: [] },
      'Drukarka biurkowa': { title: 'Настольный принтер', description: 'Компактные принтеры этикеток для стандартной работы при меньших и средних объёмах.', features: [] },
      'Drukarka półprzemysłowa': { title: 'Полупромышленный принтер', description: 'Более производительные принтеры для регулярной работы на складах, в торговле и логистике, с более развитым механизмом.', features: [] },
      'Drukarka przemysłowa': { title: 'Промышленный принтер', description: 'Принтеры с усиленной конструкцией для интенсивной или непрерывной работы, часто оснащённые дополнительными модулями.', features: [] },
      'Mała drukarka igłowa': { title: 'Малый матричный принтер', description: 'Компактные настольные принтеры с более узким трактом бумаги и простой конструкцией.', features: [] },
      'Średnia drukarka igłowa': { title: 'Средний матричный принтер', description: 'Более крупные офисные и бланковые принтеры с расширенным механизмом подачи бумаги.', features: [] },
      'Duża drukarka igłowa': { title: 'Большой матричный принтер', description: 'Промышленные и широкоформатные принтеры для интенсивной работы и многослойных бланков.', features: [] },
      'Mała drukarka 3D': { title: 'Малый 3D-принтер', description: 'Компактные принтеры с простой конструкцией и небольшим рабочим полем.', features: [] },
      'Średnia drukarka 3D': { title: 'Средний 3D-принтер', description: 'Более крупные принтеры, часто закрытые или CoreXY, с более сложной механикой.', features: [] },
      'Duża drukarka 3D': { title: 'Большой 3D-принтер', description: 'Крупные настольные и профессиональные принтеры со сложной конструкцией и более трудоёмким сервисом.', features: [] },
      'Mały ploter': { title: 'Малый плоттер', description: 'Компактные, обычно до 24″. Более простая конструкция и лёгкий сервисный доступ.', features: [] },
      'Średni ploter': { title: 'Средний плоттер', description: 'Плоттеры с шириной печати от 36″ до 44″. Большие габариты и более сложная конструкция.', features: [] },
      'Duży ploter': { title: 'Большой плоттер', description: 'Плоттеры с шириной печати более 44″, например 54–64″ и шире. Более тяжёлая конструкция и более трудоёмкий сервис.', features: [] },
    },
  },
} as const
