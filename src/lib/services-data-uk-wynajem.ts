import type { PricingSection } from './services-data-types'
import { getDisplayPrice } from './services-pricing'
import { faqSectionUk } from './services-data-uk-shared'

const SLUG = 'wynajem-drukarek'
const rent = (path: string) => getDisplayPrice(SLUG, `${path}.rent`, 'uk')
const pages = (path: string) => getDisplayPrice(SLUG, `${path}.pages`, 'uk')
const overLimit = (path: string) => getDisplayPrice(SLUG, `${path}.overLimitPrice`, 'uk')
const label = (path: string) => `${rent(path)}/міс.`

export const wynajemAkordeon1: PricingSection = {
  id: 'akordeon-1',
  title: 'Лазерні (формат A4)',
  items: [],
  subcategories: [
    {
      id: 'drukarki-mono',
      title: 'Принтери A4 (моно)',
      items: [],
      icon: '/images/wynajem-a4-drukarki-mono-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-1.drukarki-mono.tier0'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-1.drukarki-mono.tier0') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.drukarki-mono.tier0') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.drukarki-mono.tier0') },
            { label: 'Дуплекс', value: 'ні' },
            { label: 'Швидкість друку до:', value: '20' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-mono.tier1'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-1.drukarki-mono.tier1') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.drukarki-mono.tier1') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.drukarki-mono.tier1') },
            { label: 'Дуплекс', value: 'опційно' },
            { label: 'Швидкість друку до:', value: '40' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-mono.tier2'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-1.drukarki-mono.tier2') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.drukarki-mono.tier2') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.drukarki-mono.tier2') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '60' },
          ],
        },
      ],
    },
    {
      id: 'drukarki-kolor',
      title: 'Принтери A4 (моно+колір)',
      items: [],
      icon: '/images/wynajem-a4-drukarki-kolor-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-1.drukarki-kolor.tier0'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-1.drukarki-kolor.tier0') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.drukarki-kolor.tier0') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.drukarki-kolor.tier0') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '20' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-kolor.tier1'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-1.drukarki-kolor.tier1') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.drukarki-kolor.tier1') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.drukarki-kolor.tier1') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '40' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-kolor.tier2'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-1.drukarki-kolor.tier2') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.drukarki-kolor.tier2') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.drukarki-kolor.tier2') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '60' },
          ],
        },
      ],
    },
    {
      id: 'mfu-mono',
      title: 'МФУ A4 (моно)',
      items: [],
      icon: '/images/wynajem-a4-mfu-mono-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-1.mfu-mono.tier0'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-1.mfu-mono.tier0') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.mfu-mono.tier0') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.mfu-mono.tier0') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '20' },
            { label: 'Сканування', value: 'так' },
          ],
        },
        {
          label: label('akordeon-1.mfu-mono.tier1'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-1.mfu-mono.tier1') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.mfu-mono.tier1') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.mfu-mono.tier1') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '40' },
            { label: 'Сканування', value: 'так' },
          ],
        },
        {
          label: label('akordeon-1.mfu-mono.tier2'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-1.mfu-mono.tier2') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.mfu-mono.tier2') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.mfu-mono.tier2') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '60' },
            { label: 'Сканування', value: 'так' },
          ],
        },
      ],
    },
    {
      id: 'mfu-kolor',
      title: 'МФУ A4 (моно+колір)',
      items: [],
      icon: '/images/wynajem-a4-mfu-kolor-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-1.mfu-kolor.tier0'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-1.mfu-kolor.tier0') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.mfu-kolor.tier0') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.mfu-kolor.tier0') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '20' },
            { label: 'Сканування', value: 'так' },
          ],
        },
        {
          label: label('akordeon-1.mfu-kolor.tier1'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-1.mfu-kolor.tier1') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.mfu-kolor.tier1') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.mfu-kolor.tier1') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '30' },
            { label: 'Сканування', value: 'так' },
          ],
        },
        {
          label: label('akordeon-1.mfu-kolor.tier2'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-1.mfu-kolor.tier2') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-1.mfu-kolor.tier2') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-1.mfu-kolor.tier2') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '40' },
            { label: 'Сканування', value: 'так' },
          ],
        },
      ],
    },
  ],
}

export const wynajemAkordeon2: PricingSection = {
  id: 'akordeon-2',
  title: 'Лазерні (формат A3/A4)',
  footer: 'Кожну надруковану сторінку A3 рахуємо як дві сторінки A4',
  items: [],
  subcategories: [
    {
      id: 'a3-drukarki-mono',
      title: 'Принтери A3 (моно)',
      items: [],
      icon: '/images/wynajem-a3-drukarki-mono-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-drukarki-mono.tier0'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-2.a3-drukarki-mono.tier0') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-drukarki-mono.tier0') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-drukarki-mono.tier0') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '50' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-mono.tier1'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-2.a3-drukarki-mono.tier1') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-drukarki-mono.tier1') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-drukarki-mono.tier1') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '60' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-mono.tier2'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-2.a3-drukarki-mono.tier2') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-drukarki-mono.tier2') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-drukarki-mono.tier2') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '90' },
          ],
        },
      ],
    },
    {
      id: 'a3-drukarki-kolor',
      title: 'Принтери A3 (моно+колір)',
      items: [],
      icon: '/images/wynajem-a3-drukarki-kolor-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-drukarki-kolor.tier0'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-2.a3-drukarki-kolor.tier0') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-drukarki-kolor.tier0') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier0') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '50' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-kolor.tier1'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-2.a3-drukarki-kolor.tier1') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-drukarki-kolor.tier1') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier1') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '60' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-kolor.tier2'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-2.a3-drukarki-kolor.tier2') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-drukarki-kolor.tier2') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier2') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '90' },
          ],
        },
      ],
    },
    {
      id: 'a3-mfu-mono',
      title: 'МФУ A3 (моно)',
      items: [],
      icon: '/images/wynajem-a3-mfu-mono-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-mfu-mono.tier0'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-2.a3-mfu-mono.tier0') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-mfu-mono.tier0') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-mfu-mono.tier0') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '50' },
            { label: 'Сканування', value: 'так' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-mono.tier1'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-2.a3-mfu-mono.tier1') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-mfu-mono.tier1') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-mfu-mono.tier1') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '60' },
            { label: 'Сканування', value: 'так' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-mono.tier2'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-2.a3-mfu-mono.tier2') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-mfu-mono.tier2') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-mfu-mono.tier2') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '90' },
            { label: 'Сканування', value: 'так' },
          ],
        },
      ],
    },
    {
      id: 'a3-mfu-kolor',
      title: 'МФУ A3 (моно+колір)',
      items: [],
      icon: '/images/wynajem-a3-mfu-kolor-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-mfu-kolor.tier0'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-2.a3-mfu-kolor.tier0') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-mfu-kolor.tier0') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-mfu-kolor.tier0') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '50' },
            { label: 'Сканування', value: 'так' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-kolor.tier1'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-2.a3-mfu-kolor.tier1') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-mfu-kolor.tier1') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-mfu-kolor.tier1') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '60' },
            { label: 'Сканування', value: 'так' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-kolor.tier2'),
          rows: [
            { label: 'Орендна плата (zł/міс.)', value: rent('akordeon-2.a3-mfu-kolor.tier2') },
            { label: 'Кількість сторінок A4, включених в оренду', value: pages('akordeon-2.a3-mfu-kolor.tier2') },
            { label: 'Ціна друку A4 (понад ліміт)', value: overLimit('akordeon-2.a3-mfu-kolor.tier2') },
            { label: 'Дуплекс', value: 'так' },
            { label: 'Швидкість друку до:', value: '90' },
            { label: 'Сканування', value: 'так' },
          ],
        },
      ],
    },
  ],
}

// -------------------------------------------------------
// Принтер на заміну
// -------------------------------------------------------

// FAQ tylko o wynajmie (lustro PL)
export const wynajemFaq = (): PricingSection => ({
  ...faqSectionUk(),
  subcategories: [
    { id: 'faq-1', title: "У чому полягає оренда принтера?", items: [], answer: "Ви сплачуєте щомісячну орендну плату за пристрій і користуєтеся пакетом сторінок, що входить у ціну. Друк понад ліміт розраховуємо за тарифами з прайсу." },
    { id: 'faq-2', title: "Що входить у вартість оренди?", items: [], answer: "Пристрій, сервіс, ремонти, що виникають унаслідок звичайного використання, тонери, а також стандартні запчастини й витратні матеріали, потрібні для правильної роботи пристрою." },
    { id: 'faq-3', title: "Чи входять тонери у вартість?", items: [], answer: "Так, тонери входять у вартість оренди." },
    { id: 'faq-4', title: "Чи входять барабани й запчастини у вартість?", items: [], answer: "Так. Стандартні запчастини й витратні матеріали, потрібні під час звичайного використання, — з нашого боку." },
    { id: 'faq-5', title: "Чи входить папір у вартість?", items: [], answer: "Ні. Папір та електроенергія — з боку Клієнта." },
    { id: 'faq-6', title: "Ціни вказано нетто чи брутто?", items: [], answer: "Усі ціни на сайті вказано **нетто**." },
    { id: 'faq-7', title: "Як розраховуються відбитки?", items: [], answer: "Щомісячна орендна плата включає визначену кількість сторінок A4. Після використання ліміту кожну наступну сторінку розраховуємо за тарифом, указаним у таблиці." },
    { id: 'faq-8', title: "Що буде, якщо я перевищу місячний ліміт сторінок?", items: [], answer: "Пристрій працює як звичайно, а додаткові сторінки розраховуємо за ціною друку понад ліміт." },
    { id: 'faq-9', title: "Як рахуються відбитки A3?", items: [], answer: "Кожну надруковану сторінку A3 рахуємо як **дві сторінки A4**." },
    { id: 'faq-10', title: "Чи переходять невикористані сторінки на наступний місяць?", items: [], answer: "Умови розрахунку невикористаного ліміту узгоджуємо під час укладення договору." },
    { id: 'faq-11', title: "Чи входять доставка й встановлення пристрою у вартість?", items: [], answer: "Так. Доставляємо пристрій, встановлюємо його й виконуємо базове налаштування." },
    { id: 'faq-12', title: "Чи налаштовуєте ви друк і сканування в мережі?", items: [], answer: "Так. Під час встановлення можемо виконати базове налаштування друку й сканування на робочих місцях Клієнта." },
    { id: 'faq-13', title: "Який мінімальний термін оренди?", items: [], answer: "**1 місяць**." },
    { id: 'faq-14', title: "Чи потрібно підписувати довгостроковий договір?", items: [], answer: "Ні, довгостроковий договір не потрібен." },
    { id: 'faq-15', title: "Що робити в разі поломки принтера?", items: [], answer: "Повідомте про проблему в сервіс. Ремонти, що виникають унаслідок звичайного використання, покриваються орендою." },
    { id: 'faq-16', title: "Який час реакції сервісу?", items: [], answer: "До **24 робочих годин**. Це час реакції на звернення, а не гарантований час завершення ремонту." },
    { id: 'faq-17', title: "Чи отримаю я пристрій на заміну в разі серйозної поломки?", items: [], answer: "Якщо ремонт потребує більше часу, можливість надання пристрою на заміну узгоджуємо індивідуально." },
    { id: 'faq-18', title: "Чи можу я замінити пристрій на іншу модель?", items: [], answer: "Якщо потреби компанії зміняться, можливість заміни пристрою узгоджуємо індивідуально." },
    { id: 'faq-19', title: "Що відбувається з пристроєм після завершення оренди?", items: [], answer: "Після завершення оренди ми забираємо пристрій." },
    { id: 'faq-20', title: "Як підібрати відповідний принтер і пакет сторінок?", items: [], answer: "Вибір залежить насамперед від формату (A4 / A3), монохромного чи кольорового друку, місячної кількості сторінок, потрібної швидкості та потреби в скануванні й копіюванні." },
  ],
})
