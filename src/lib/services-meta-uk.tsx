import type { ServicePageHeadings, ServicePageLabels } from '@/components/service-page-template'

export const headingsUk: Record<string, ServicePageHeadings> = {
  'serwis-niszczarek': {
    h1: 'Сервіс і ремонт знищувачів документів у Вроцлаві',
    lines: ['Сервіс і ремонт', 'знищувачів документів', 'у Вроцлаві'],
    fitMobile: true,
    h2: '(Fellowes, HSM, Kobra, Rexel, IDEAL, Dahle, OPUS, Leitz, Wallner, Argo, EBA, HP, Tracer, Tarnator, Genie, Olympia, Intimus, Aurora, Peach, Lanberg)',
  },
  'naprawa-zasilaczy-ups': {
    h1: 'Сервіс і ремонт джерел безперебійного живлення UPS у Вроцлаві',
    lines: ['Сервіс і ремонт', 'джерел безперебійного живлення UPS', 'у Вроцлаві'],
    fitMobile: true,
    h2: '(APC, Schneider Electric, Eaton, Powerware, Riello, Vertiv, Liebert, Emerson, MGE, Socomec, Delta, Ever, Fideltronik, CyberPower, PowerWalker, Legrand, AEG, ABB, GE, Siemens, G-Tec, Borri, Orvaldi, Salicru…)',
  },
  'serwis-drukarek-do-kart-plastikowych': {
    h1: 'Сервіс і ремонт принтерів для пластикових карток у Вроцлаві',
    lines: ['Сервіс і ремонт', 'принтерів для пластикових карток', 'у Вроцлаві'],
    fitMobile: true,
    h2: '(Evolis, Zebra, HID Fargo, Magicard, Entrust Datacard, Matica, IDP Smart, HiTi, DASCOM, Swiftcolor, XID, EDIsecure...)',
  },
  'serwis-drukarek-dtg': {
    h1: 'Сервіс і ремонт DTG-принтерів у Вроцлаві',
    lines: ['Сервіс і ремонт', 'DTG-принтерів', 'у Вроцлаві'],
    tagline: 'друк безпосередньо на одязі (Direct to Garment)',
    accent: 'DTG',
    h2: '(Epson, Brother, Kornit Digital, Ricoh, Polyprint, aeoon Technologies, M&R, ROQ, OmniPrint, ColDesi, DTG Digital / Pigment.inc, AnaJet, Roland DG, Mimaki, Azonprinter, Resolute DTG, Lawson Screen & Digital, Durst, …)',
  },
  'serwis-drukarek-dtf': {
    h1: 'Сервіс і ремонт DTF-принтерів у Вроцлаві',
    lines: ['Сервіс і ремонт', 'DTF-принтерів', 'у Вроцлаві'],
    tagline: 'друк на плівці з перенесенням (Direct to Film)',
    accent: 'DTF',
    h2: '(Epson, Roland DG, Mimaki, Mutoh, Fedar, Audley, Pegasus, TruJet, Artemis, IronPrinter, Dias, Cobe, Keditec, DTF Station / Prestige, …)',
  },
  'serwis-drukarek-termicznych': {
    h1: 'Сервіс і ремонт принтерів етикеток у Вроцлаві',
    lines: ['Сервіс і ремонт', 'принтерів етикеток', 'у Вроцлаві'],
    h2: '(Zebra, TSC, Toshiba TEC, Honeywell, GoDEX, SATO, Brother, DYMO, Citizen, BIXOLON, Epson, cab, Star Micronics, OKI, Argox, …)',
  },
  'serwis-laptopow': {
    h1: 'Сервіс і ремонт ноутбуків у Вроцлаві',
    lines: ['Сервіс і ремонт', 'ноутбуків', 'у Вроцлаві'],
    h2: '', // '(Microsoft, Dell, HP, Lenovo, Acer, Asus, MSI, Fujitsu, Samsung, Toshiba, Huawei, LG, Gigabyte, Razer, HONOR, Xiaomi, MEDION, Dynabook, VAIO, Panasonic, Framework, CHUWI, …)',
  },
  'naprawa-drukarek': {
    h1: 'Сервіс і ремонт принтерів у Вроцлаві',
    lines: ['Сервіс і ремонт', 'принтерів', 'у Вроцлаві'],
    h2: '(HP, Epson, Brother, Canon, Samsung, Xerox, Kyocera, OKI, Lexmark, Dell, Konica Minolta, Ricoh, Sharp, Toshiba, ...)',
  },
  'serwis-komputerow-stacjonarnych': {
    h1: 'Сервіс і ремонт стаціонарних комп’ютерів у Вроцлаві',
    lines: ['Сервіс і ремонт', 'стаціонарних комп’ютерів', 'у Вроцлаві'],
    h2: '', // '(HP, Dell, Lenovo, Asus, Acer, MSI, Microsoft, Samsung, Gigabyte, Alienware, Fujitsu, Corsair, ZOTAC, MINISFORUM, Framework, …)',
  },
  'outsourcing-it': {
    h1: 'Аутсорсинг IT та IT-обслуговування компаній',
  },
  'serwis-drukarek-laserowych': {
    h1: 'Сервіс і ремонт лазерних принтерів у Вроцлаві',
    lines: ['Сервіс і ремонт', 'лазерних принтерів', 'у Вроцлаві'],
    h2: '(HP, Samsung, Canon, Brother, Xerox, Ricoh, Kyocera, Konica Minolta, Sharp, Lexmark, Pantum, Toshiba, OKI, Epson, Fujifilm, DEVELOP, UTAX, Sindoh, …)',
  },
  'serwis-drukarek-atramentowych': {
    h1: 'Сервіс і ремонт струменевих принтерів у Вроцлаві',
    lines: ['Сервіс і ремонт', 'струменевих принтерів', 'у Вроцлаві'],
    h2: '(HP, Canon, Epson, Brother, Lexmark, Ricoh, RISO, Xerox, …)',
  },
  'serwis-drukarek-3d': {
    h1: 'Сервіс і ремонт 3D-принтерів у Вроцлаві',
    lines: ['Сервіс і ремонт', '3D-принтерів', 'у Вроцлаві'],
    h2: '(Bambu Lab, Prusa Research, Creality, Anycubic, Elegoo, Formlabs, Ultimaker, Flashforge, Snapmaker, QIDI Tech, MakerBot, Raise3D, Zortrax, Sovol, Artillery, Phrozen, BCN3D, Peopoly, UniFormation, Tronxy, Flying Bear, HBot 3D, …)',
  },
  'druk-3d-na-zamowienie': {
    h1: '3D-друк на замовлення у Вроцлаві',
    lines: ['3D-друк', 'на замовлення', 'у Вроцлаві'],
    h2: '3D-друк за технологією FDM з PLA, PETG, ASA та TPU – запасні частини, прототипи, корпуси, технічні деталі та короткі серії.',
  },
  'serwis-plotterow': {
    h1: 'Сервіс і ремонт друкувальних плотерів у Вроцлаві',
    lines: ['Сервіс і ремонт', 'друкувальних плотерів', 'у Вроцлаві'],
    fitMobile: true,
    h2: '(HP, Canon, Epson, Xerox, Ricoh, Mimaki, Roland DG, Mutoh, OKI, Fujifilm, Agfa, KIP, Durst, swissQprint, …)',
  },
  'serwis-drukarek-iglowych': {
    h1: 'Сервіс і ремонт матричних принтерів у Вроцлаві',
    lines: ['Сервіс і ремонт', 'матричних принтерів', 'у Вроцлаві'],
    h2: '(Epson, OKI, Bixolon, Citizen, Star Micronics, Tally DASCOM, Printronix, Fujitsu, Olivetti, Panasonic, TallyGenicom, …)',
  },
  'wynajem-drukarek': {
    h1: 'Оренда принтерів і копіювальних апаратів',
    h2: '(HP, Epson, Brother, Canon, Samsung, Xerox, Kyocera, OKI, ...)',
  },
  'drukarka-zastepcza': {
    h1: 'Принтер на заміну (на час ремонту)',
  },
}

export const seoBlocksUk: Record<string, { items: string[] }> = {
  'serwis-niszczarek': {
    items: [
      'Обслуговування та змащення, усунення застрягань, ремонт ріжучого механізму, редуктора, двигуна й датчиків знищувача.',
      'Ваш знищувач можемо попередньо перевірити після доставки в сервіс — попередня діагностика триває до 15 хв.',
      'Малі, офісні та професійні знищувачі: Fellowes, HSM, Kobra, Rexel, IDEAL, Dahle, Lanberg та інші.',
    ],
  },
  'naprawa-zasilaczy-ups': {
    items: [
      'Заміна акумуляторів, діагностика, ремонт електроніки та системи заряджання джерел безперебійного живлення UPS.',
      'Ваш UPS — повідомимо вартість ремонту за 15 хв.',
      'UPS для дому, офісу та серверної: APC, Eaton, Ever, Vertiv та інші.',
    ],
  },
  'serwis-drukarek-do-kart-plastikowych': {
    items: [
      'Чищення, обслуговування, заміна головки й роликів, ремонт модулів ламінації, ретрансферу та кодування карток.',
      'Ваш принтер для пластикових карток — попередньо оцінимо проблему за 15 хв.',
      'Принтери для ID-карток, бейджів і карток лояльності: Zebra, Evolis, HID Fargo, Magicard та інші.',
    ],
  },
  'serwis-drukarek-dtg': {
    items: [
      'Чищення та обслуговування, прочищення й заміна головки, ремонт системи білого чорнила та сервісної станції.',
      'Ваш DTG-принтер для друку на футболках — попередньо оцінимо проблему за 15 хв.',
      'Сервіс DTG-принтерів для текстильних друкарень і компаній з друком на одязі.',
    ],
  },
  'serwis-drukarek-dtf': {
    items: [
      'Чищення та обслуговування, прочищення й заміна головки, ремонт системи білого чорнила та сервісної станції.',
      'Ваш DTF-принтер для друку на плівці — попередньо оцінимо проблему за 15 хв.',
      'Сервіс DTF-принтерів для друкарень, компаній з друком на одязі та виробництва трансферів.',
    ],
  },
  'naprawa-drukarek': {
    items: [
      'Також надаємо послуги очищення, технічного обслуговування, регенерації, ремонту головки.',
      'Також копіювальних апаратів Lexmark, Oki, Dell, Konica Minolta, Ricoh, Sharp, Toshiba.',
      'Ваш принтер або ксерокс — повідомимо вартість ремонту за 15 хв і виконаємо сервіс принтера (ксерокса).',
      'Забезпечуємо післягарантійний сервіс у Вроцлаві (Кшики, Фабрична, Грабишинська, Псе-Поле) і околицях.',
    ],
  },
  'serwis-drukarek-termicznych': {
    items: [
      'Послуги обслуговування, огляду, ремонту (заміни) головки, ... термічного принтера (термо-етикетного)',
      'Ваш термічний (термотрансферний) принтер — повідомимо вартість ремонту за 15 хв.',
      'Термічні (етикетні) принтери – наша спеціалізація',
    ],
  },
  'serwis-laptopow': {
    items: [
      'Діагностика, чищення та обслуговування ноутбука після заливання, встановлення ПЗ.',
      'Встановлення Windows, видалення вірусів, відновлення даних, повернення втрачених файлів.',
      'Заміна материнської плати, диска, оперативної пам\'яті, термопасти, вентилятора, порту USB (живлення).',
      'акумулятора, блока живлення, матриці (екрана), корпусу, петель, клавіатури (клавіші), ...',
    ],
  },
  'serwis-komputerow-stacjonarnych': {
    items: [
      'Діагностика, чищення та обслуговування комп\'ютера, встановлення ПЗ.',
      'Встановлення Windows, видалення вірусів, відновлення даних, повернення втрачених файлів.',
      'Заміна материнської плати, мережевої карти, диска, оперативної пам\'яті, термопасти,',
      'вентилятора, порту USB (живлення), блока живлення, корпусу, ...',
    ],
  },
  'outsourcing-it': {
    items: [' ', ' '],
  },
  'serwis-drukarek-laserowych': {
    items: [
      'Надаємо послуги очищення, обслуговування, регенерації, ... та для Oki, Dell, Kyocera, Konica Minolta',
      'Ваш лазерний принтер — повідомимо вартість ремонту за 15 хв і виконаємо ремонт навіть того ж дня.',
      'Ремонт, чищення, налаштування Wi-Fi, проблеми з друком, застряганням паперу та якістю відбитка.',
    ],
  },
  'serwis-drukarek-atramentowych': {
    items: [
      'Надаємо послуги очищення, регенерації, ремонту головки, обслуговування, ...',
      'Ваш струменевий принтер — повідомимо вартість ремонту за 15 хв і виконаємо ремонт навіть того ж дня.',
    ],
  },
  'serwis-drukarek-3d': {
    items: [
      'Надаємо сервісні послуги – сервіс 3D-принтера',
      'для бізнес-клієнтів та фізичних осіб.',
    ],
  },
  'druk-3d-na-zamowienie': {
    items: [
      'Надаємо сервісні послуги – сервіс 3D-принтера',
      'для бізнес-клієнтів та фізичних осіб.',
    ],
  },
  'serwis-plotterow': {
    items: [' ', ' '],
  },
  'serwis-drukarek-iglowych': {
    items: [
      'Надаємо послуги очищення, регенерації, обслуговування,',
      'ремонту (заміни) головки, ... матричного (голчастого) принтера',
      'Ваш матричний принтер — повідомимо вартість ремонту за 15 хв',
      'і виконаємо ремонт навіть того ж дня.',
    ],
  },
  'wynajem-drukarek': {
    items: [
      'Потрібен копіювальний апарат, а коштів зараз немає? Копіювальний апарат буде.',
      'Оренда копіювальних апаратів (багатофункціональних пристроїв) – це вихід із ситуації.',
    ],
  },
  'drukarka-zastepcza': {
    items: ['Принтер на заміну у Вроцлаві – пристрій на час ремонту принтера або сервісу офісного обладнання.',
      'Пропонуємо принтери на заміну Вроцлав для компаній та фізичних осіб, швидке надання пристрою, оренду принтера на час сервісу та повне сервісне обслуговування.',],
  },
}

export const imageAltUk: Record<string, string> = {
  'serwis-niszczarek': 'Сервіс і ремонт знищувачів документів',
  'naprawa-zasilaczy-ups': 'Джерело безперебійного живлення UPS',
  'serwis-drukarek-do-kart-plastikowych': 'Принтер для пластикових карток',
  'serwis-drukarek-dtg': 'DTG-принтер для друку на футболках',
  'serwis-drukarek-dtf': 'DTF-принтер для друку на плівці',
  'serwis-drukarek-termicznych': 'Принтер термоетикеток',
  'serwis-laptopow': 'Ремонт ноутбуків',
  'serwis-komputerow-stacjonarnych': 'Сервіс стаціонарних комп\'ютерів',
  'outsourcing-it': 'Аутсорсинг IT',
  'serwis-drukarek-laserowych': 'Сервіс лазерних принтерів',
  'serwis-drukarek-atramentowych': 'Сервіс струменевих принтерів',
  'serwis-drukarek-3d': 'Сервіс і ремонт 3D-принтерів',
  'druk-3d-na-zamowienie': '3D-друк на замовлення у Вроцлаві',
  'serwis-plotterow': 'Сервіс і ремонт плотерів',
  'serwis-drukarek-iglowych': 'Сервіс матричних принтерів',
  'naprawa-drukarek': 'Сервіс принтерів і багатофункціональних пристроїв',
  'wynajem-drukarek': 'Оренда принтерів',
  'drukarka-zastepcza': 'Принтер на заміну',
}

// Short card names on /uslugi/naprawa-drukarek, same as the home service cards.
export const subServiceTitlesUk: Record<string, string> = {
  'serwis-drukarek-laserowych': 'Лазерних принтерів',
  'serwis-drukarek-atramentowych': 'Струменевих принтерів',
  'serwis-plotterow': 'Плотерів',
  'serwis-drukarek-termicznych': 'Принтерів етикеток',
  'serwis-drukarek-iglowych': 'Матричних принтерів',
  'serwis-drukarek-3d': '3D-принтерів',
  'serwis-drukarek-do-kart-plastikowych': 'Принтерів пластикових карток',
}

export const seoMetadataUk: Record<string, { title: string; description: string }> = {
  'serwis-niszczarek': {
    title: 'Ремонт знищувачів документів Вроцлав — сервіс і ціни',
    description: 'Сервіс і ремонт знищувачів документів у Вроцлаві: обслуговування та змащення, усунення застрягань, заміна ножів, ремонт двигуна й датчиків. Ціни нетто, діагностика безкоштовна в разі ремонту. Fellowes, HSM, Kobra, Rexel, IDEAL.',
  },
  'naprawa-zasilaczy-ups': {
    title: 'Сервіс і ремонт UPS – джерел безперебійного живлення',
    description: 'Сервіс і ремонт джерел безперебійного живлення UPS у Вроцлаві — заміна акумуляторів, діагностика, ремонт електроніки. APC, Eaton, Ever, Vertiv та інші. Повний прайс-лист без прихованих витрат.',
  },
  'serwis-drukarek-do-kart-plastikowych': {
    title: 'Сервіс принтерів для пластикових карток — Zebra, Evolis, Fargo',
    description: 'Сервіс і ремонт принтерів для пластикових карток у Вроцлаві — Zebra, Evolis, HID Fargo, Magicard, Entrust Datacard та інші. Прозорий прайс — вартість ремонту погоджуємо до його виконання.',
  },
  'serwis-drukarek-dtg': {
    title: 'Сервіс і ремонт DTG-принтерів — Epson, Brother, Kornit',
    description: 'Сервіс і ремонт DTG-принтерів у Вроцлаві — відкритий прайс: прочищення головки, біле чорнило, сервісна станція, обслуговування. Вартість ремонту ви знаєте до його виконання.',
  },
  'serwis-drukarek-dtf': {
    title: 'Сервіс DTF-принтерів Вроцлав — ремонт і обслуговування',
    description: 'Сервіс DTF-принтерів у Вроцлаві — ремонт головок, системи білого чорнила, подачі плівки, електроніки та RIP. Відкритий прайс і діагностика перед ремонтом.',
  },
  'serwis-laptopow': {
    title: 'Сервіс і ремонт ноутбуків',
    description: '✔ Сервіс і ремонт ноутбуків усіх марок у Вроцлаві ✔ Заміна матриці, диска, акумулятора, клавіатури ✔ Діагностика за 15 хв ✔ Запишіться вже сьогодні! ☎ 793 759 262',
  },
  'serwis-komputerow-stacjonarnych': {
    title: 'Сервіс і ремонт стаціонарних комп\'ютерів',
    description: '✔ Сервіс і ремонт стаціонарних комп\'ютерів у Вроцлаві ✔ Чищення, заміна комплектуючих, відновлення даних ✔ Діагностика за 15 хв ✔ Телефонуйте! ☎ 793 759 262',
  },
  'outsourcing-it': {
    title: 'Аутсорсинг IT | IT-обслуговування',
    description: 'Аутсорсинг IT Вроцлав – IT-обслуговування компаній, IT-підтримка, helpdesk, адміністрування мереж і серверів, постійна технічна підтримка для бізнесу.',
  },
  'serwis-drukarek-laserowych': {
    title: 'Ремонт лазерних принтерів',
    description: '✔ Ремонт лазерних принтерів HP, Canon, Brother, Samsung, Xerox у Вроцлаві ✔ Чищення, регенерація, проблеми з друком ✔ Діагностика за 15 хв ☎ 793 759 262',
  },
  'serwis-drukarek-atramentowych': {
    title: 'Ремонт струменевих принтерів',
    description: '✔ Ремонт струменевих принтерів HP, Epson, Canon, Brother, Lexmark у Вроцлаві ✔ Чищення, регенерація, ремонт головки ✔ Діагностика за 15 хв ☎ 793 759 262',
  },
  'serwis-drukarek-3d': {
    title: 'Сервіс і ремонт 3D-принтерів',
    description: '✔ Сервіс і ремонт 3D-принтерів у Вроцлаві — Bambu Lab, Creality, Anycubic, Prusa та інші ✔ Діагностика за 15 хв ✔ Повний прайс-лист на сайті ✔ Телефонуйте! ☎ 793 759 262',
  },
  'druk-3d-na-zamowienie': {
    title: '3D-друк на замовлення',
    description: '✔ 3D-друк з PLA, PETG, ASA та TPU – запасні частини, прототипи, корпуси, деталі… Чесні ціни! ✔ Повний прайс-лист на сайті ✔ Навіть сьогодні! ☎ 793 759 262',
  },
  'serwis-drukarek-termicznych': {
    title: 'Сервіс і ремонт принтерів етикеток Zebra, Dymo',
    description: '✔ Сервіс принтерів термоетикеток і термотрансферних Zebra, Dymo, Godex, Sato у Вроцлаві ✔ Діагностика за 15 хв ✔ Прайс-лист на сайті ☎ 793 759 262',
  },
  'serwis-drukarek-iglowych': {
    title: 'Ремонт матричних принтерів',
    description: '✔ Ремонт і сервіс матричних (голчастих) принтерів Epson, OKI, Bixolon, Citizen у Вроцлаві ✔ Діагностика за 15 хв ✔ Повний прайс-лист на сайті ☎ 793 759 262',
  },
  'naprawa-drukarek': {
    title: 'Ремонт принтерів і копіювальних апаратів',
    description: '✔ Сервіс принтерів і багатофункціональних пристроїв — HP, Epson, Canon, Brother, Xerox, Kyocera у Вроцлаві ✔ Діагностика за 15 хв ✔ Прайс-лист на сайті ☎ 793 759 262',
  },
  'wynajem-drukarek': {
    title: 'Оренда принтерів і копіювальних апаратів',
    description: 'Навіть за 24 год ✔ Без довгострокових договорів ✔ Сервіс і витратні матеріали у вартості ✔ Доступність одразу! ✔ Телефонуйте і замовляйте! ☎ 793 759 262',
  },
  'drukarka-zastepcza': {
    title: 'Принтер на заміну (на час ремонту)',
    description: '✔ Потрібен принтер на час ремонту? Навіть за 24 год ✔ Без абонентської плати ✔ Обладнання одразу ✔ Телефонуйте і замовляйте! ☎ 793 759 262',
  },
  'serwis-plotterow': {
    title: 'Сервіс і ремонт плотерів',
    description: '✔ Ремонт і сервіс плотерів HP, Canon, Epson, … у Вроцлаві ✔ Діагностика за 15 хв ✔ Повний прайс-лист на сайті ✔ Запишіться на сервіс уже сьогодні! ☎ 793 759 262',
  },
}

export const labelsUk: ServicePageLabels = {
  callNow: 'Зателефонувати зараз',
  sendRequest: 'Швидкий контакт',
  formHref: '/uk/kontakt',
  fadeSlideDefault: 'Повний перелік послуг і цін, без прихованих витрат (не "ремонт від 50 zł" або "ціна за домовленістю")',
  fadeSlideDrukarkaZastepcza: 'Поломка? Без стресу – на час ремонту надаємо принтер на заміну без абонентської плати',
  fadeSlideWynajem: 'Принтер із сервісом і тонером у ціні — ви дбаєте лише про папір та електроенергію.',
  fadeSlideDruk3DZamowienie: 'Повний перелік послуг і цін, без прихованих витрат (не "ціна від 50 zł" або "ціна за домовленістю")',
  relatedCta: 'Переглянути прайс-лист',
  relatedIconAltSuffix: 'Вроцлав - іконка сервісної послуги',
  ctaHeading: 'Маєте проблему зі своїм пристроєм?',
  ctaHeadingBySlug: {
    'serwis-laptopow': 'Маєте проблему з ноутбуком?',
    'serwis-komputerow-stacjonarnych': 'Маєте проблему з комп\'ютером?',
    'naprawa-drukarek': 'Маєте проблему з принтером?',
    'serwis-drukarek-laserowych': 'Маєте проблему з лазерним принтером?',
    'serwis-drukarek-atramentowych': 'Маєте проблему зі струменевим принтером?',
    'serwis-plotterow': 'Маєте проблему з плотером?',
    'serwis-drukarek-termicznych': 'Маєте проблему з термопринтером?',
    'serwis-drukarek-iglowych': 'Маєте проблему з матричним принтером?',
    'serwis-drukarek-3d': 'Маєте проблему з 3D-принтером?',
    'serwis-niszczarek': 'Маєте проблему зі шредером?',
    'naprawa-zasilaczy-ups': 'Маєте проблему з UPS?',
    'serwis-drukarek-do-kart-plastikowych': 'Маєте проблему з принтером карток?',
    'serwis-drukarek-dtg': 'Маєте проблему з DTG-принтером?',
    'serwis-drukarek-dtf': 'Маєте проблему з DTF-принтером?',
    'wynajem-drukarek': 'Маєте проблему з принтером?',
    'drukarka-zastepcza': 'Маєте проблему з принтером?',
  },
  ctaText: 'Напишіть або зателефонуйте — підкажемо, з чого почати',
  ctaButton: 'Швидкий контакт',
  ctaHref: '/uk/kontakt',
  drukarkaZastepczaNote: (
    <>
      Принтер на заміну у Вроцлаві – пристрій на час ремонту принтера або сервісу офісного обладнання. Пропонуємо <strong>принтери на заміну Вроцлав</strong> для компаній та фізичних осіб, швидке надання пристрою, оренду принтера на час сервісу та повне сервісне обслуговування.
    </>
  ),
}
