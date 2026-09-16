import manifest from '@/config/manifest'
import type { ServiceData, PricingSection } from './services-data-types'
import { diagnostaSection, dojazdSection, faqSectionRu } from './services-data-ru-shared'
import { laptopDiagnostaSection, laptopDojazdSection, laptopKonserwacja, laptopNaprawy } from './services-data-ru-laptop'
import { desktopKonserwacja, desktopNaprawy } from './services-data-ru-desktop'
import { outsourcingKonserwacja, outsourcingNaprawy } from './services-data-ru-outsourcing'
import { laserKonserwacjaRu, laserNaprawy } from './services-data-ru-laser'
import { inkjetKonserwacjaRu, inkjetNaprawy } from './services-data-ru-inkjet'
import { thermalKonserwacja, thermalNaprawy } from './services-data-ru-thermal'
import { needleKonserwacja, needleNaprawy } from './services-data-ru-needle'
import { printer3dKonserwacja, printer3dNaprawy } from './services-data-ru-3dprinter'
import { plotterKonserwacja, plotterNaprawy } from './services-data-ru-plotter'
import { wynajemAkordeon1, wynajemAkordeon2 } from './services-data-ru-wynajem'
import { zastepczaAkordeon1, zastepczaAkordeon2 } from './services-data-ru-drukarka-zastepcza'

export const servicesRu: ServiceData[] = [
  {
    slug: 'serwis-laptopow',
    title: 'Сервис и ремонт ноутбуков',
    subtitle: 'Полный перечень услуг и цен, без скрытых платежей (не «ремонт от 50 zł» или «цена по договорённости»)',
    icon: manifest['01_serwis_laptopow'],
    description: 'Комплексный ремонт и обслуживание ноутбуков всех марок.',
    pricingSections: [
      laptopDiagnostaSection(),
      laptopDojazdSection(),
      laptopKonserwacja,
      laptopNaprawy,
      faqSectionRu(),
    ],
  },
  {
    slug: 'serwis-komputerow-stacjonarnych',
    title: 'Сервис стационарных компьютеров',
    subtitle: 'Полный перечень услуг и цен, без скрытых платежей',
    icon: manifest['02_serwis_komputerow_stacjonarnych'],
    description: 'Диагностика, ремонт и модернизация системных блоков.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      desktopKonserwacja,
      desktopNaprawy,
      faqSectionRu(),
    ],
  },
  {
    slug: 'outsourcing-it',
    title: 'IT-аутсорсинг',
    subtitle: 'IT-обслуживание компаний',
    icon: manifest['03_outsourcing_it'],
    description: 'Полное IT-обслуживание для вашей компании.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      outsourcingKonserwacja,
      outsourcingNaprawy,
      faqSectionRu(),
    ],
  },
  {
    slug: 'naprawa-drukarek',
    title: 'Ремонт принтеров и копировальных аппаратов',
    subtitle: 'Ремонт специализированных матричных принтеров',
    icon: manifest['07_serwis_drukarek_iglowych'],
    description: 'Ремонт специализированных матричных принтеров.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      needleKonserwacja,
      needleNaprawy,
      faqSectionRu(),
    ],
  },
  {
    slug: 'serwis-drukarek-laserowych',
    title: 'Сервис лазерных принтеров и копировальных аппаратов',
    subtitle: 'Профессиональный ремонт лазерных принтеров и многофункциональных устройств',
    icon: manifest['04_serwis_drukarek_laserowych'],
    description: 'Профессиональный ремонт и обслуживание лазерных принтеров.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      laserKonserwacjaRu,
      laserNaprawy,
      faqSectionRu(),
    ],
    priceTooltipRich: {
      type: 'deviceCategories',
      title: 'Категории устройств',
      description: 'Выберите ориентировочно, к какой группе относится ваш принтер. Это поможет легче подобрать ценовой диапазон.',
      categories: [
        {
          title: 'Домашний принтер',
          description: 'Устройство для домашнего использования или эпизодической печати. Небольшие модели A4, как правило, более дешёвые при покупке.',
          features: ['компактные размеры', 'медленная печать', 'базовые функции'],
          examples: ['HP DeskJet 2720', 'Canon MG3650s'],
        },
        {
          title: 'Офисный принтер',
          description: 'Для работы в малых и средних офисах. Предназначены для более частой печати и работы в сети.',
          features: ['более быстрая печать', 'LAN / Wi-Fi', 'большая долговечность'],
          examples: ['Brother DCP-J105', 'Epson L3150'],
        },
        {
          title: 'Бизнес-принтер',
          description: 'Крупные устройства A4/A3 для интенсивной работы и больших объёмов печати.',
          features: ['очень высокая выносливость', 'быстрые тонеры и картриджи', 'сервисные функции управления'],
          examples: ['Epson L6570', 'Canon MAXIFY GX4040'],
        },
      ],
    },
  },
  {
    slug: 'serwis-drukarek-atramentowych',
    title: 'Сервис струйных принтеров',
    subtitle: 'Специализированный ремонт струйных принтеров',
    icon: manifest['05_serwis_drukarek_atramentowych'],
    description: 'Ремонт, прочистка головок и обслуживание струйных принтеров.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      inkjetKonserwacjaRu,
      inkjetNaprawy,
      faqSectionRu(),
    ],
  },
  {
    slug: 'serwis-plotterow',
    title: 'Сервис и ремонт плоттеров',
    subtitle: 'Сервис широкоформатных плоттеров HP, Epson и Canon',
    icon: manifest['08_serwis_ploterow'],
    description: 'Сервис и ремонт широкоформатных плоттеров.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      plotterKonserwacja,
      plotterNaprawy,
      faqSectionRu(),
    ],
  },
  {
    slug: 'serwis-drukarek-termicznych',
    title: 'Сервис термоэтикеточных и термотрансферных принтеров',
    subtitle: 'Ремонт принтеров этикеток и штрихкодов',
    icon: manifest['06_serwis_drukarek_termicznych'],
    description: 'Сервис принтеров этикеток и штрихкодов.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      thermalKonserwacja,
      thermalNaprawy,
      faqSectionRu(),
    ],
    priceTooltip: 'Цены нетто отдельно для принтеров: настольных / полупромышленных / промышленных (работа, без расходных материалов)',
  },
  {
    slug: 'serwis-drukarek-iglowych',
    title: 'Сервис матричных принтеров',
    subtitle: 'Ремонт специализированных матричных принтеров',
    icon: manifest['07_serwis_drukarek_iglowych'],
    description: 'Ремонт специализированных матричных принтеров.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      needleKonserwacja,
      needleNaprawy,
      faqSectionRu(),
    ],
  },
  {
    slug: 'serwis-drukarek-3d',
    title: 'Сервис и ремонт 3D-принтеров',
    subtitle: 'Полный перечень услуг и цен, без скрытых платежей',
    icon: '/images/Serwis_i_Naprawa_Drukarek_3D.webp',
    description: 'Сервис 3D-принтеров во Вроцлаве – ремонт 3D-принтера, калибровка стола, регулировка осей и улучшение качества печати. Ремонт 3D-принтеров FDM и SLA, чистка экструдера и хотэнда, замена деталей и настройка параметров печати. Сервис 3D-принтеров для компаний и мастерских, настройка прошивки и подготовка к материалам ABS, PETG и nylon.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      printer3dKonserwacja,
      printer3dNaprawy,
      faqSectionRu(),
    ],
  },
  {
    slug: 'druk-3d-na-zamowienie',
    title: '3D-печать на заказ',
    subtitle: 'Полный перечень услуг и цен, без скрытых платежей',
    icon: '/images/Serwis_i_Naprawa_Drukarek_3D.webp',
    description: 'Сервис 3D-принтеров во Вроцлаве – ремонт 3D-принтера, калибровка стола, регулировка осей и улучшение качества печати. Ремонт 3D-принтеров FDM и SLA, чистка экструдера и хотэнда, замена деталей и настройка параметров печати. Сервис 3D-принтеров для компаний и мастерских, настройка прошивки и подготовка к материалам ABS, PETG и nylon.',
    pricingSections: [
      {
        id: 'diagnoza',
        title: 'Печать 3D из готового проекта',
        items: [
          { service: 'Подготовка к печати', },
          { service: 'PLA\nстандартный материал для прототипов, моделей и декоративных элементов', },
          { service: 'PETG\nпрочный и влагостойкий, для функциональных и технических деталей', },
          { service: 'ABS / ASA\nпрочные материалы для технических деталей, устойчивых к температуре', },
          { service: 'TPU\nэластичный материал для уплотнителей, накладок и гибких элементов', },
          { service: 'Срочное выполнение\nвыполнение в тот же день, если позволяет время печати', },
          { service: 'Доставка\nкурьером или в постамат', },
        ],
        priceFormula: 'Итоговая цена = подготовка к печати + материал + время печати',
        example: 'Пример: печать из PLA, 100 г материала, 5 часов печати — 25 zł (подготовка) + 100 г × 0,30 zł/грамм + 5 ч × 8 zł/ч = 95 zł',
      },
      {
        id: 'projektowanie-modeli',
        title: 'Проектирование и 3D CAD-моделирование',
        items: [
          { service: 'Предварительная оценка проекта\nпроверка возможности выполнения и объёма работ', },
          { service: 'Небольшая правка файла STL\nизменение размера, отверстия, исправление или мелкая корректировка модели', },
          { service: 'Простая техническая модель\nна основе размеров, эскиза или чертежа', },
          { service: 'Восстановление простой детали\nпо образцу, фото и точным размерам', },
          { service: 'Технический проект средней сложности\nнапр. корпус, держатель, переходник или более сложный элемент', },
          { service: 'Дополнительная проектная работа\nпосле превышения времени, включённого в выбранную услугу', },
          { service: 'Дополнительный пакет правок\nизменения в готовом проекте после его утверждения', },
        ],
      },
      {
        id: 'faq',
        title: 'Часто задаваемые вопросы (FAQ)',
        items: [],
        subcategories: [
          { id: 'faq-13', title: 'Услуги 3D-печати на заказ – как проходит выполнение заказа?', items: [], answer: 'Получив модель, проверяем возможность выполнения, готовим смету и после подтверждения приступаем к работе. Печатаем как отдельные детали, так и небольшие партии.' },
          { id: 'faq-16', title: 'Заказ 3D-печати онлайн – как оформить заказ через интернет?', items: [], answer: 'Пришлите нам файл с моделью — проверим возможность выполнения и подготовим смету. После подтверждения выполним печать, которую можно забрать лично или заказать с доставкой.' },
          { id: 'faq-1', title: 'Могу ли я заказать 3D-печать без готовой модели?', items: [], answer: 'Да. Можете прислать фото, эскиз, точные размеры или принести имеющуюся деталь. Сначала бесплатно оценим возможность выполнения проекта, а затем сообщим стоимость его подготовки.' },
          { id: 'faq-2', title: 'Какие файлы можно прислать для 3D-печати?', items: [], answer: 'Лучше всего прислать готовую модель в формате STL, STEP или 3MF. Если у вас файл другого формата — пришлите его для предварительной оценки, и мы проверим, можем ли мы его использовать или подготовить.' },
          { id: 'faq-8', title: 'Можете ли вы исправить или изменить мой файл STL?', items: [], answer: 'Да. Можем выполнить небольшие правки: коррекцию размеров, отверстий, подгонку или другие простые изменения модели. Более крупные изменения оцениваем как отдельную проектную работу.' },
          { id: 'faq-3', title: 'Цены на 3D-печать – стоимость и расчёт цены печати', items: [], answer: 'Цена 3D-печати зависит от материала, его расхода и времени работы принтера. Точную стоимость сообщаем перед началом работы, согласно прайс-листу на странице.' },
          { id: 'faq-4', title: 'Сколько стоит разработка 3D-модели?', items: [], answer: 'Зависит от объёма проекта. Предварительная оценка проекта бесплатна, а цены на простые правки, технические модели и восстановление деталей указаны в прайс-листе. Если проект требует больше времени, дополнительные часы рассчитываем по указанной ставке.' },
          { id: 'faq-15', title: 'Цены в прайс-листе указаны нетто или брутто?', items: [], answer: 'Цены в прайс-листе — это цены нетто.' },
          { id: 'faq-6', title: '3D-прототипирование и печать моделей, деталей и элементов – можно ли заказать одну штуку?', items: [], answer: 'Да. Выполняем как единичные детали, так и небольшие партии — в зависимости от потребностей клиента и типа проекта.' },
          { id: 'faq-12', title: 'Могу ли я заказать несколько или несколько десятков одинаковых деталей?', items: [], answer: 'Да. 3D-печать хорошо подходит для прототипов и небольших производственных партий. При большем количестве деталей можем заранее проверить настройку печати и способ выполнения, чтобы получить одинаковые детали.' },
          { id: 'faq-7', title: 'Можете ли вы восстановить повреждённую или недоступную деталь?', items: [], answer: 'Да. Простые детали можем воссоздать по образцу, фото и точным размерам. При более сложной геометрии можем попросить предоставить оригинальную деталь, чтобы точнее воспроизвести её форму.' },
          { id: 'faq-17', title: '3D-печать фигурок и автозапчастей – печатаете ли вы также уплотнители 3D?', items: [], answer: 'Да. В зависимости от проекта изготавливаем фигурки, автозапчасти и уплотнители 3D из подходящего материала. Перед выполнением проверяем модель и подбираем материал под назначение детали.' },
          { id: 'faq-5', title: 'Какой материал выбрать: PLA, PETG, ABS/ASA или TPU?', items: [], answer: 'FDM-печать выполняем из PLA, PETG, ASA и TPU. Материал подбираем прежде всего под назначение детали. PLA хорошо подходит для моделей и прототипов, PETG — для функциональных деталей, ABS/ASA — для технических элементов, устойчивых к температуре, а TPU — для эластичных деталей. Если не знаете, какой материал выбрать, подскажем перед выполнением.' },
          { id: 'faq-9', title: 'Насколько точна 3D-печать?', items: [], answer: 'Точность зависит от геометрии модели, материала, ориентации печати и требуемых допусков. Если конкретный размер особенно важен — например, отверстие, диаметр, защёлка или место крепления — укажите это при оформлении заказа.' },
          { id: 'faq-10', title: 'Будет ли напечатанная деталь такой же прочной, как оригинал?', items: [], answer: 'Не всегда. Прочность зависит от материала, конструкции детали, направления слоёв и условий, в которых деталь будет работать. Если сочтём, что 3D-печать не подходит для конкретного применения, сообщим об этом перед выполнением.' },
          { id: 'faq-11', title: 'Сколько длится выполнение заказа?', items: [], answer: 'Стандартный срок выполнения печати обычно составляет 1–2 дня. Время выполнения проекта зависит от его сложности. Также доступно срочное выполнение до 24 часов, если это позволяет время печати.' },
          { id: 'faq-14', title: 'Отправляете ли вы готовые изделия?', items: [], answer: 'Да. Готовый заказ можем отправить курьером или в постамат. Стоимость доставки рассчитывается по тарифу перевозчика.' },
        ],
      },
    ],
  },
  {
    slug: 'wynajem-drukarek',
    title: 'Аренда (лизинг) принтеров',
    subtitle: 'Аренда печатающих устройств для офисов',
    icon: manifest['10_wynajem_drukarek'],
    description: 'Аренда печатающих устройств для офисов и компаний.',
    pricingSections: [
      wynajemAkordeon1,
      wynajemAkordeon2,
      faqSectionRu(),
    ],
  },
  {
    slug: 'drukarka-zastepcza',
    title: 'Принтер на замену',
    subtitle: 'Замещающее устройство на время ремонта',
    icon: manifest['11_drukarka_zastepcza'],
    description: 'Предлагаем замещающее устройство на время ремонта.',
    pricingSections: [
      zastepczaAkordeon1,
      zastepczaAkordeon2,
      faqSectionRu(),
    ],
  },
]
