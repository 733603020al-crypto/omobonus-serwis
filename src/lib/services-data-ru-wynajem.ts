import type { PricingSection } from './services-data-types'
import { getDisplayPrice } from './services-pricing'
import { faqSectionRu } from './services-data-ru-shared'

const SLUG = 'wynajem-drukarek'
const rent = (path: string) => getDisplayPrice(SLUG, `${path}.rent`, 'ru')
const pages = (path: string) => getDisplayPrice(SLUG, `${path}.pages`, 'ru')
const overLimit = (path: string) => getDisplayPrice(SLUG, `${path}.overLimitPrice`, 'ru')
const label = (path: string) => `${rent(path)}/мес.`

export const wynajemAkordeon1: PricingSection = {
  id: 'akordeon-1',
  title: 'Лазерные (формат A4)',
  items: [],
  subcategories: [
    {
      id: 'drukarki-mono',
      title: 'Принтеры A4 (моно)',
      items: [],
      icon: '/images/wynajem-a4-drukarki-mono-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-1.drukarki-mono.tier0'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-1.drukarki-mono.tier0') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.drukarki-mono.tier0') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.drukarki-mono.tier0') },
            { label: 'Дуплекс', value: 'нет' },
            { label: 'Скорость печати до:', value: '20' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-mono.tier1'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-1.drukarki-mono.tier1') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.drukarki-mono.tier1') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.drukarki-mono.tier1') },
            { label: 'Дуплекс', value: 'опционально' },
            { label: 'Скорость печати до:', value: '40' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-mono.tier2'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-1.drukarki-mono.tier2') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.drukarki-mono.tier2') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.drukarki-mono.tier2') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '60' },
          ],
        },
      ],
    },
    {
      id: 'drukarki-kolor',
      title: 'Принтеры A4 (моно+цвет)',
      items: [],
      icon: '/images/wynajem-a4-drukarki-kolor-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-1.drukarki-kolor.tier0'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-1.drukarki-kolor.tier0') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.drukarki-kolor.tier0') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.drukarki-kolor.tier0') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '20' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-kolor.tier1'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-1.drukarki-kolor.tier1') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.drukarki-kolor.tier1') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.drukarki-kolor.tier1') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '40' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-kolor.tier2'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-1.drukarki-kolor.tier2') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.drukarki-kolor.tier2') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.drukarki-kolor.tier2') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '60' },
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
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-1.mfu-mono.tier0') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.mfu-mono.tier0') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.mfu-mono.tier0') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '20' },
            { label: 'Сканирование', value: 'да' },
          ],
        },
        {
          label: label('akordeon-1.mfu-mono.tier1'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-1.mfu-mono.tier1') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.mfu-mono.tier1') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.mfu-mono.tier1') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '40' },
            { label: 'Сканирование', value: 'да' },
          ],
        },
        {
          label: label('akordeon-1.mfu-mono.tier2'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-1.mfu-mono.tier2') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.mfu-mono.tier2') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.mfu-mono.tier2') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '60' },
            { label: 'Сканирование', value: 'да' },
          ],
        },
      ],
    },
    {
      id: 'mfu-kolor',
      title: 'МФУ A4 (моно+цвет)',
      items: [],
      icon: '/images/wynajem-a4-mfu-kolor-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-1.mfu-kolor.tier0'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-1.mfu-kolor.tier0') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.mfu-kolor.tier0') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.mfu-kolor.tier0') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '20' },
            { label: 'Сканирование', value: 'да' },
          ],
        },
        {
          label: label('akordeon-1.mfu-kolor.tier1'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-1.mfu-kolor.tier1') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.mfu-kolor.tier1') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.mfu-kolor.tier1') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '30' },
            { label: 'Сканирование', value: 'да' },
          ],
        },
        {
          label: label('akordeon-1.mfu-kolor.tier2'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-1.mfu-kolor.tier2') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-1.mfu-kolor.tier2') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-1.mfu-kolor.tier2') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '40' },
            { label: 'Сканирование', value: 'да' },
          ],
        },
      ],
    },
  ],
}

export const wynajemAkordeon2: PricingSection = {
  id: 'akordeon-2',
  title: 'Лазерные (формат A3/A4)',
  footer: 'Каждую напечатанную страницу A3 считаем как две страницы A4',
  items: [],
  subcategories: [
    {
      id: 'a3-drukarki-mono',
      title: 'Принтеры A3 (моно)',
      items: [],
      icon: '/images/wynajem-a3-drukarki-mono-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-drukarki-mono.tier0'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-2.a3-drukarki-mono.tier0') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-drukarki-mono.tier0') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-drukarki-mono.tier0') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '50' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-mono.tier1'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-2.a3-drukarki-mono.tier1') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-drukarki-mono.tier1') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-drukarki-mono.tier1') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '60' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-mono.tier2'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-2.a3-drukarki-mono.tier2') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-drukarki-mono.tier2') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-drukarki-mono.tier2') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '90' },
          ],
        },
      ],
    },
    {
      id: 'a3-drukarki-kolor',
      title: 'Принтеры A3 (моно+цвет)',
      items: [],
      icon: '/images/wynajem-a3-drukarki-kolor-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-drukarki-kolor.tier0'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-2.a3-drukarki-kolor.tier0') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-drukarki-kolor.tier0') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier0') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '50' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-kolor.tier1'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-2.a3-drukarki-kolor.tier1') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-drukarki-kolor.tier1') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier1') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '60' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-kolor.tier2'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-2.a3-drukarki-kolor.tier2') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-drukarki-kolor.tier2') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier2') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '90' },
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
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-2.a3-mfu-mono.tier0') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-mfu-mono.tier0') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-mfu-mono.tier0') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '50' },
            { label: 'Сканирование', value: 'да' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-mono.tier1'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-2.a3-mfu-mono.tier1') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-mfu-mono.tier1') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-mfu-mono.tier1') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '60' },
            { label: 'Сканирование', value: 'да' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-mono.tier2'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-2.a3-mfu-mono.tier2') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-mfu-mono.tier2') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-mfu-mono.tier2') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '90' },
            { label: 'Сканирование', value: 'да' },
          ],
        },
      ],
    },
    {
      id: 'a3-mfu-kolor',
      title: 'МФУ A3 (моно+цвет)',
      items: [],
      icon: '/images/wynajem-a3-mfu-kolor-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-mfu-kolor.tier0'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-2.a3-mfu-kolor.tier0') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-mfu-kolor.tier0') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-mfu-kolor.tier0') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '50' },
            { label: 'Сканирование', value: 'да' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-kolor.tier1'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-2.a3-mfu-kolor.tier1') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-mfu-kolor.tier1') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-mfu-kolor.tier1') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '60' },
            { label: 'Сканирование', value: 'да' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-kolor.tier2'),
          rows: [
            { label: 'Арендная плата (zł/мес.)', value: rent('akordeon-2.a3-mfu-kolor.tier2') },
            { label: 'Количество страниц A4, включённых в аренду', value: pages('akordeon-2.a3-mfu-kolor.tier2') },
            { label: 'Цена печати A4 (сверх лимита)', value: overLimit('akordeon-2.a3-mfu-kolor.tier2') },
            { label: 'Дуплекс', value: 'да' },
            { label: 'Скорость печати до:', value: '90' },
            { label: 'Сканирование', value: 'да' },
          ],
        },
      ],
    },
  ],
}

// -------------------------------------------------------
// Принтер на замену
// -------------------------------------------------------

// FAQ tylko o wynajmie (lustro PL)
export const wynajemFaq = (): PricingSection => ({
  ...faqSectionRu(),
  subcategories: [
    { id: 'faq-1', title: "В чём заключается аренда принтера?", items: [], answer: "Вы платите ежемесячную арендную плату за устройство и пользуетесь пакетом страниц, входящим в цену. Печать сверх лимита рассчитываем по тарифам из прайса." },
    { id: 'faq-2', title: "Что входит в стоимость аренды?", items: [], answer: "Устройство, сервис, ремонты, возникающие при обычном использовании, тонеры, а также стандартные запчасти и расходные материалы, необходимые для правильной работы устройства." },
    { id: 'faq-3', title: "Входят ли тонеры в стоимость?", items: [], answer: "Да, тонеры входят в стоимость аренды." },
    { id: 'faq-4', title: "Входят ли барабаны и запчасти в стоимость?", items: [], answer: "Да. Стандартные запчасти и расходные материалы, необходимые при обычном использовании, — с нашей стороны." },
    { id: 'faq-5', title: "Входит ли бумага в стоимость?", items: [], answer: "Нет. Бумага и электроэнергия — на стороне Клиента." },
    { id: 'faq-6', title: "Цены указаны нетто или брутто?", items: [], answer: "Все цены на сайте указаны **нетто**." },
    { id: 'faq-7', title: "Как рассчитываются отпечатки?", items: [], answer: "Ежемесячная арендная плата включает определённое количество страниц A4. После использования лимита каждую следующую страницу рассчитываем по тарифу, указанному в таблице." },
    { id: 'faq-8', title: "Что будет, если я превышу месячный лимит страниц?", items: [], answer: "Устройство работает как обычно, а дополнительные страницы рассчитываем по цене печати сверх лимита." },
    { id: 'faq-9', title: "Как считаются отпечатки A3?", items: [], answer: "Каждую напечатанную страницу A3 считаем как **две страницы A4**." },
    { id: 'faq-10', title: "Переходят ли неиспользованные страницы на следующий месяц?", items: [], answer: "Условия расчёта неиспользованного лимита согласовываем при заключении договора." },
    { id: 'faq-11', title: "Входят ли доставка и установка устройства в стоимость?", items: [], answer: "Да. Доставляем устройство, устанавливаем его и выполняем базовую настройку." },
    { id: 'faq-12', title: "Настраиваете ли вы печать и сканирование в сети?", items: [], answer: "Да. При установке можем выполнить базовую настройку печати и сканирования на рабочих местах Клиента." },
    { id: 'faq-13', title: "Какой минимальный срок аренды?", items: [], answer: "**1 месяц**." },
    { id: 'faq-14', title: "Нужно ли подписывать долгосрочный договор?", items: [], answer: "Нет, долгосрочный договор не требуется." },
    { id: 'faq-15', title: "Что делать в случае поломки принтера?", items: [], answer: "Сообщите о проблеме в сервис. Ремонты, возникающие при обычном использовании, покрываются арендой." },
    { id: 'faq-16', title: "Какое время реакции сервиса?", items: [], answer: "До **24 рабочих часов**. Это время реакции на обращение, а не гарантированное время завершения ремонта." },
    { id: 'faq-17', title: "Получу ли я подменное устройство в случае серьёзной поломки?", items: [], answer: "Если ремонт требует больше времени, возможность предоставления подменного устройства согласовываем индивидуально." },
    { id: 'faq-18', title: "Могу ли я заменить устройство на другую модель?", items: [], answer: "Если потребности компании изменятся, возможность замены устройства согласовываем индивидуально." },
    { id: 'faq-19', title: "Что происходит с устройством после окончания аренды?", items: [], answer: "После окончания аренды мы забираем устройство." },
    { id: 'faq-20', title: "Как подобрать подходящий принтер и пакет страниц?", items: [], answer: "Выбор зависит прежде всего от формата (A4 / A3), монохромной или цветной печати, месячного количества страниц, нужной скорости и потребности в сканировании и копировании." },
  ],
})
