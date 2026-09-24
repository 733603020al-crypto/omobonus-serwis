import manifest from '@/config/manifest'
import type { ServiceData, PricingSection } from './services-data-types'
import { diagnostaSection, dojazdSection, faqSectionUk } from './services-data-uk-shared'
import { laptopDiagnostaSection, laptopDojazdSection, laptopKonserwacja, laptopNaprawy } from './services-data-uk-laptop'
import { desktopKonserwacja, desktopNaprawy } from './services-data-uk-desktop'
import { outsourcingKonserwacja, outsourcingNaprawy } from './services-data-uk-outsourcing'
import { laserKonserwacjaUk, laserNaprawy } from './services-data-uk-laser'
import { inkjetKonserwacjaUk, inkjetNaprawy } from './services-data-uk-inkjet'
import { thermalKonserwacja, thermalNaprawy } from './services-data-uk-thermal'
import { needleKonserwacja, needleNaprawy } from './services-data-uk-needle'
import { printer3dKonserwacja, printer3dNaprawy } from './services-data-uk-3dprinter'
import { plotterKonserwacja, plotterNaprawy } from './services-data-uk-plotter'
import { wynajemAkordeon1, wynajemAkordeon2 } from './services-data-uk-wynajem'
import { zastepczaAkordeon1, zastepczaAkordeon2 } from './services-data-uk-drukarka-zastepcza'

export const servicesUk: ServiceData[] = [
  {
    slug: 'serwis-laptopow',
    title: 'Сервіс і ремонт ноутбуків',
    subtitle: 'Повний перелік послуг і цін, без прихованих витрат (не «ремонт від 50 zł» або «ціна за домовленістю»)',
    icon: manifest['01_serwis_laptopow'],
    description: 'Комплексний ремонт та обслуговування ноутбуків усіх марок.',
    pricingSections: [
      laptopDiagnostaSection(),
      laptopDojazdSection(),
      laptopKonserwacja,
      laptopNaprawy,
      faqSectionUk(),
    ],
  },
  {
    slug: 'serwis-komputerow-stacjonarnych',
    title: 'Сервіс стаціонарних комп\'ютерів',
    subtitle: 'Повний перелік послуг і цін, без прихованих витрат',
    icon: manifest['02_serwis_komputerow_stacjonarnych'],
    description: 'Діагностика, ремонт та модернізація системних блоків.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      desktopKonserwacja,
      desktopNaprawy,
      faqSectionUk(),
    ],
  },
  {
    slug: 'outsourcing-it',
    title: 'Аутсорсинг IT',
    subtitle: 'ІТ-обслуговування компаній',
    icon: manifest['03_outsourcing_it'],
    description: 'Повне ІТ-обслуговування для Вашої компанії.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      outsourcingKonserwacja,
      outsourcingNaprawy,
      faqSectionUk(),
    ],
  },
  {
    slug: 'naprawa-drukarek',
    title: 'Ремонт принтерів і копіювальних апаратів',
    subtitle: 'Ремонт спеціалізованих матричних принтерів',
    icon: manifest['07_serwis_drukarek_iglowych'],
    description: 'Ремонт спеціалізованих матричних принтерів.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      needleKonserwacja,
      needleNaprawy,
      faqSectionUk(),
    ],
  },
  {
    slug: 'serwis-drukarek-laserowych',
    title: 'Сервіс лазерних принтерів і копіювальних апаратів',
    subtitle: 'Професійний ремонт лазерних принтерів та багатофункціональних пристроїв',
    icon: manifest['04_serwis_drukarek_laserowych'],
    description: 'Професійний ремонт та обслуговування лазерних принтерів.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      laserKonserwacjaUk,
      laserNaprawy,
      faqSectionUk(),
    ],
    priceTooltipRich: {
      type: 'deviceCategories',
      title: 'Категорії пристроїв',
      description: 'Оберіть орієнтовно, до якої групи належить Ваш принтер. Це допоможе легше підібрати ціновий діапазон.',
      categories: [
        {
          title: 'Домашній принтер',
          description: 'Пристрій для домашнього використання або епізодичного друку. Невеликі моделі A4, зазвичай дешевші у придбанні.',
          features: ['малі розміри', 'повільний друк', 'базові функції'],
          examples: ['HP DeskJet 2720', 'Canon MG3650s'],
        },
        {
          title: 'Офісний принтер',
          description: 'Для роботи в малих і середніх офісах. Призначені для частішого друку та роботи в мережі.',
          features: ['швидший друк', 'LAN / Wi-Fi', 'більша довговічність'],
          examples: ['Brother DCP-J105', 'Epson L3150'],
        },
        {
          title: 'Бізнес-принтер',
          description: 'Великі пристрої A4/A3 для інтенсивної роботи та великих обсягів друку.',
          features: ['дуже висока витривалість', 'швидкі тонери та картриджі', 'сервісні функції управління'],
          examples: ['Epson L6570', 'Canon MAXIFY GX4040'],
        },
      ],
    },
  },
  {
    slug: 'serwis-drukarek-atramentowych',
    title: 'Сервіс струменевих принтерів',
    subtitle: 'Спеціалізований ремонт струменевих принтерів',
    icon: manifest['05_serwis_drukarek_atramentowych'],
    description: 'Ремонт, прочищення головок та обслуговування струменевих принтерів.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      inkjetKonserwacjaUk,
      inkjetNaprawy,
      faqSectionUk(),
    ],
  },
  {
    slug: 'serwis-plotterow',
    title: 'Сервіс і ремонт плотерів',
    subtitle: 'Сервіс широкоформатних плотерів HP, Epson та Canon',
    icon: manifest['08_serwis_ploterow'],
    description: 'Сервіс та ремонт широкоформатних плотерів.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      plotterKonserwacja,
      plotterNaprawy,
      faqSectionUk(),
    ],
  },
  {
    slug: 'serwis-drukarek-termicznych',
    title: 'Сервіс термо- та термотрансферних принтерів етикеток',
    subtitle: 'Ремонт принтерів етикеток і штрих-кодів',
    icon: manifest['06_serwis_drukarek_termicznych'],
    description: 'Сервіс принтерів етикеток і штрих-кодів.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      thermalKonserwacja,
      thermalNaprawy,
      faqSectionUk(),
    ],
    priceTooltip: 'Ціни нетто окремо для принтерів: настільних / напівпромислових / промислових (робота, без витратних матеріалів)',
  },
  {
    slug: 'serwis-drukarek-iglowych',
    title: 'Сервіс матричних принтерів',
    subtitle: 'Ремонт спеціалізованих матричних принтерів',
    icon: manifest['07_serwis_drukarek_iglowych'],
    description: 'Ремонт спеціалізованих матричних принтерів.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      needleKonserwacja,
      needleNaprawy,
      faqSectionUk(),
    ],
  },
  {
    slug: 'serwis-drukarek-3d',
    title: 'Сервіс і ремонт 3D-принтерів',
    subtitle: 'Повний перелік послуг і цін, без прихованих витрат',
    icon: '/images/Serwis_i_Naprawa_Drukarek_3D.webp',
    description: 'Сервіс 3D-принтерів у Вроцлаві – ремонт 3D-принтера, калібрування столу, регулювання осей та покращення якості друку. Ремонт 3D-принтерів FDM та SLA, чищення екструдера та хотенду, заміна деталей та налаштування параметрів друку. Сервіс 3D-принтерів для компаній та майстерень, налаштування прошивки та підготовка принтера до матеріалів ABS, PETG та нейлону.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      printer3dKonserwacja,
      printer3dNaprawy,
      faqSectionUk(),
    ],
  },
  {
    slug: 'druk-3d-na-zamowienie',
    title: '3D-друк на замовлення',
    subtitle: 'Повний перелік послуг і цін, без прихованих витрат',
    icon: '/images/Serwis_i_Naprawa_Drukarek_3D.webp',
    description: 'Сервіс 3D-принтерів у Вроцлаві – ремонт 3D-принтера, калібрування столу, регулювання осей та покращення якості друку. Ремонт 3D-принтерів FDM та SLA, чищення екструдера та хотенду, заміна деталей та налаштування параметрів друку. Сервіс 3D-принтерів для компаній та майстерень, налаштування прошивки та підготовка принтера до матеріалів ABS, PETG та нейлону.',
    pricingSections: [
      {
        id: 'diagnoza',
        title: 'Друк 3D з готового проєкту',
        items: [
          { service: 'Підготовка до друку', },
          { service: 'PLA\nстандартний матеріал для прототипів, моделей і декоративних елементів', },
          { service: 'PETG\nміцний і стійкий до вологи, для функціональних та технічних деталей', },
          { service: 'ABS / ASA\nміцні матеріали для технічних деталей, стійких до температури', },
          { service: 'TPU\nеластичний матеріал для ущільнювачів, накладок і гнучких елементів', },
          { service: 'Термінове виконання\nвиконання того самого дня, якщо дозволяє час друку', },
          { service: 'Доставка\nкур\'єром або до поштомату', },
        ],
        priceFormula: 'Кінцева ціна = підготовка до друку + матеріал + час друку',
        example: 'Приклад: друк з PLA, 100 г матеріалу, 5 годин друку — 25 zł (підготовка) + 100 г × 0,30 zł/грам + 5 год × 8 zł/год = 95 zł',
      },
      {
        id: 'projektowanie-modeli',
        title: 'Проєктування і 3D CAD-моделювання',
        mobileTitle: 'Проєктування 3D CAD',
        items: [
          { service: 'Попередня оцінка проєкту\nперевірка можливості виконання та обсягу робіт', },
          { service: 'Невелика зміна файлу STL\nзміна розміру, отвору, виправлення або дрібне коригування моделі', },
          { service: 'Проста технічна модель\nна основі розмірів, ескізу або креслення', },
          { service: 'Відтворення простої деталі\nна основі зразка, фото та точних розмірів', },
          { service: 'Технічний проєкт середньої складності\nнапр. корпус, тримач, перехідник або складніший елемент', },
          { service: 'Додаткова проєктна робота\nпісля перевищення часу, включеного в обрану послугу', },
          { service: 'Додатковий пакет правок\nзміни в готовому проєкті після його затвердження', },
        ],
      },
      {
        id: 'faq',
        title: 'Часті питання (FAQ)',
        items: [],
        subcategories: [
          { id: 'faq-13', title: 'Послуги 3D-друку на замовлення – як відбувається виконання замовлення?', items: [], answer: 'Отримавши модель, перевіряємо можливість виконання, готуємо кошторис і після його підтвердження розпочинаємо виконання. Друкуємо як окремі деталі, так і невеликі партії.' },
          { id: 'faq-16', title: 'Замовлення 3D-друку онлайн – як зробити замовлення через інтернет?', items: [], answer: 'Надішліть нам файл з моделлю — перевіримо можливість виконання і підготуємо кошторис. Після підтвердження виконаємо друк, який можна забрати особисто або замовити з доставкою.' },
          { id: 'faq-1', title: 'Чи можу я замовити 3D-друк без готової моделі?', items: [], answer: 'Так. Можете надіслати фото, ескіз, точні розміри або принести наявну деталь. Спочатку безкоштовно оцінимо можливість виконання проєкту, а потім повідомимо вартість його підготовки.' },
          { id: 'faq-2', title: 'Які файли можна надіслати для 3D-друку?', items: [], answer: 'Найкраще надіслати готову модель у форматі STL, STEP або 3MF. Якщо у вас файл іншого формату — надішліть його для попередньої оцінки, і ми перевіримо, чи можемо його використати або підготувати.' },
          { id: 'faq-8', title: 'Чи можете ви виправити або змінити мій файл STL?', items: [], answer: 'Так. Можемо виконати невеликі зміни: корекцію розмірів, отворів, підгонку чи інші прості правки моделі. Більші зміни оцінюємо як окрему проєктну роботу.' },
          { id: 'faq-3', title: 'Прайс на 3D-друк – вартість і розрахунок ціни друку', items: [], answer: 'Ціна 3D-друку залежить від матеріалу, його витрати та часу роботи принтера. Точну вартість повідомляємо перед початком виконання, відповідно до прайсу на сторінці.' },
          { id: 'faq-4', title: 'Скільки коштує розробка 3D-моделі?', items: [], answer: 'Залежить від обсягу проєкту. Попередня оцінка проєкту безкоштовна, а ціни на прості правки, технічні моделі та відтворення деталей вказані в прайсі. Якщо проєкт вимагає більше часу, додаткові години розраховуємо за вказаною ставкою.' },
          { id: 'faq-15', title: 'Ціни в прайсі вказані нетто чи брутто?', items: [], answer: 'Ціни в прайсі є цінами нетто.' },
          { id: 'faq-6', title: '3D-прототипування та друк моделей, деталей і елементів – чи можна замовити одну штуку?', items: [], answer: 'Так. Виконуємо як поодинокі деталі, так і невеликі партії — залежно від потреб клієнта та типу проєкту.' },
          { id: 'faq-12', title: 'Чи можу я замовити кілька або кілька десятків однакових деталей?', items: [], answer: 'Так. 3D-друк добре підходить для прототипів і невеликих виробничих партій. При більшій кількості деталей можемо заздалегідь перевірити налаштування друку та спосіб виконання, щоб отримати однакові деталі.' },
          { id: 'faq-7', title: 'Чи можете ви відтворити пошкоджену або недоступну деталь?', items: [], answer: 'Так. Прості деталі можемо відтворити за зразком, фото та точними розмірами. При складнішій геометрії можемо попросити надати оригінальну деталь, щоб точніше відтворити її форму.' },
          { id: 'faq-17', title: '3D-друк фігурок і автозапчастин – чи друкуєте ви також ущільнювачі 3D?', items: [], answer: 'Так. Залежно від проєкту виготовляємо фігурки, автозапчастини та ущільнювачі 3D з відповідно підібраного матеріалу. Перед виконанням перевіряємо модель і підбираємо матеріал під призначення деталі.' },
          { id: 'faq-5', title: 'Який матеріал обрати: PLA, PETG, ABS/ASA чи TPU?', items: [], answer: 'FDM-друк виконуємо з PLA, PETG, ASA та TPU. Матеріал підбираємо насамперед під призначення деталі. PLA добре підходить для моделей і прототипів, PETG — для функціональних деталей, ABS/ASA — для технічних елементів, стійких до температури, а TPU — для еластичних деталей. Якщо не знаєте, який матеріал обрати, порадимо перед виконанням.' },
          { id: 'faq-9', title: 'Наскільки точний 3D-друк?', items: [], answer: 'Точність залежить від геометрії моделі, матеріалу, орієнтації друку та потрібних допусків. Якщо якийсь розмір особливо важливий — наприклад, отвір, діаметр, защіпка чи місце кріплення — вкажіть це під час оформлення замовлення.' },
          { id: 'faq-10', title: 'Чи буде надрукована деталь такою ж міцною, як оригінал?', items: [], answer: 'Не завжди. Міцність залежить від матеріалу, конструкції деталі, напрямку шарів та умов, у яких вона працюватиме. Якщо вважаємо, що 3D-друк не підходить для конкретного застосування, повідомимо про це перед виконанням.' },
          { id: 'faq-11', title: 'Скільки триває виконання замовлення?', items: [], answer: 'Стандартний термін виконання друку зазвичай становить 1–2 дні. Час виконання проєкту залежить від його складності. Доступне також термінове виконання до 24 годин, якщо це дозволяє час друку.' },
          { id: 'faq-14', title: 'Чи відправляєте ви готові вироби?', items: [], answer: 'Так. Готове замовлення можемо надіслати кур\'єром або до поштомату. Вартість доставки розраховується за тарифом перевізника.' },
        ],
      },
    ],
  },
  {
    slug: 'wynajem-drukarek',
    title: 'Оренда принтерів',
    subtitle: 'Оренда друкувальних пристроїв для офісів',
    icon: manifest['10_wynajem_drukarek'],
    description: 'Оренда друкувальних пристроїв для офісів і компаній.',
    pricingSections: [
      wynajemAkordeon1,
      wynajemAkordeon2,
      faqSectionUk(),
    ],
  },
  {
    slug: 'drukarka-zastepcza',
    title: 'Принтер на заміну',
    subtitle: 'Замінний пристрій на час ремонту',
    icon: manifest['11_drukarka_zastepcza'],
    description: 'Пропонуємо замінний пристрій на час ремонту.',
    pricingSections: [
      zastepczaAkordeon1,
      zastepczaAkordeon2,
      faqSectionUk(),
    ],
  },
]
