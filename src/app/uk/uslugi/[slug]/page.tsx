import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { servicesUk } from '@/lib/services-data-uk'
import { serviceHeroLabelsUk } from '@/lib/service-hero-labels-uk'
import { uk } from '@/lib/i18n/uk'
import { ServicePageTemplate, type RelatedService, type ServicePageLabels } from '@/components/service-page-template'

const headingsUk: Record<string, { h1: string; h2?: string }> = {
  'serwis-drukarek-termicznych': {
    h1: 'Сервіс і ремонт термотрансферних принтерів етикеток у Вроцлаві',
    h2: '(Zebra, Dymo, Godex, Sato, Brother та інші)',
  },
  'serwis-laptopow': {
    h1: 'Сервіс і ремонт ноутбуків у Вроцлаві',
    h2: '',
  },
  'naprawa-drukarek': {
    h1: 'Сервіс принтерів і багатофункціональних пристроїв у Вроцлаві',
    h2: '(HP, Epson, Brother, Canon, Samsung, Xerox, Kyocera, OKI, Lexmark, Oki, Dell, Konica Minolta, Ricoh, Sharp, Toshiba, ...)',
  },
  'serwis-komputerow-stacjonarnych': {
    h1: 'Сервіс і ремонт стаціонарних комп\'ютерів',
  },
  'outsourcing-it': {
    h1: 'Аутсорсинг IT та IT-обслуговування компаній',
  },
  'serwis-drukarek-laserowych': {
    h1: 'Сервіс і ремонт лазерних принтерів',
    h2: '(HP, Epson, Brother, Canon, Samsung, Xerox, Lexmark, OKI, Toshiba, Sharp, Ricoh ...)',
  },
  'serwis-drukarek-atramentowych': {
    h1: 'Сервіс струменевих принтерів',
    h2: '(HP, Epson, Canon, Brother, Lexmark, ...)',
  },
  'serwis-drukarek-3d': {
    h1: 'Сервіс і ремонт принтерів 3D у Вроцлаві',
    h2: '(Bambulab / Bambu Lab, Creality, Anycubic, Flashforge, Prusa Research, Formlabs, Elegoo, QIDI Tech, Zortrax, Flying Bear, ...)',
  },
  'serwis-plotterow': {
    h1: 'Сервіс і ремонт плотерів у Вроцлаві',
    h2: '(плотери HP, Canon, Epson та інші)',
  },
  'serwis-drukarek-iglowych': {
    h1: 'Сервіс матричних (голчастих) принтерів',
    h2: '(Epson, OKI, Bixolon, Citizen, Star Micronics...)',
  },
  'wynajem-drukarek': {
    h1: 'Оренда (лізинг) принтерів і копіювальних апаратів',
    h2: '(HP, Epson, Brother, Canon, Samsung, Xerox, Kyocera, OKI, Lexmark, Oki, Dell, Konica Minolta, Ricoh, Sharp, Toshiba, ...)',
  },
  'drukarka-zastepcza': {
    h1: 'Принтер на заміну (на час ремонту)',
  },
}

const seoMetadataUk: Record<string, { title: string; description: string }> = {
  'serwis-laptopow': {
    title: 'Сервіс і ремонт ноутбуків у Вроцлаві',
    description: '✔ Професійний сервіс комп\'ютерів, ноутбуків і принтерів у Вроцлаві ✔ Діагностика за 15 хв ✔ Повний прайс- лист на сайті ✔ Запишіться на сервіс! ☎ 793 759 262',
  },
  'serwis-komputerow-stacjonarnych': {
    title: 'Сервіс і ремонт стаціонарних комп\'ютерів',
    description: '✔ Професійний сервіс комп\'ютерів, ноутбуків і принтерів у Вроцлаві ✔ Діагностика за 15 хв ✔ Повний прайс - лист на сайті ✔ Запишіться на сервіс! ☎ 793 759 262',
  },
  'outsourcing-it': {
    title: 'Аутсорсинг IT Вроцлав | Omobonus IT-обслуговування',
    description: 'Аутсорсинг IT Вроцлав – IT-обслуговування компаній, IT-підтримка, helpdesk, адміністрування мереж і серверів, постійна технічна підтримка для бізнесу.',
  },
  'serwis-drukarek-laserowych': {
    title: 'Ремонт лазерних принтерів',
    description: '✔ Професійний сервіс комп\'ютерів, ноутбуків і принтерів у Вроцлаві ✔ Діагностика за 15 хв ✔ Повний прайс - лист на сайті ✔ Запишіться на сервіс! ☎ 793 759 262',
  },
  'serwis-drukarek-atramentowych': {
    title: 'Ремонт струменевих принтерів',
    description: '✔ Професійний сервіс комп\'ютерів, ноутбуків і принтерів у Вроцлаві ✔ Діагностика за 15 хв ✔ Повний прайс - лист на сайті ✔ Запишіться на сервіс! ☎ 793 759 262',
  },
  'serwis-drukarek-3d': {
    title: 'Сервіс і ремонт принтерів 3D',
    description: '✔ Професійний сервіс комп\'ютерів, ноутбуків і принтерів у Вроцлаві ✔ Діагностика за 15 хв ✔ Повний прайс - лист на сайті ✔ Запишіться на сервіс! ☎ 793 759 262',
  },
  'serwis-drukarek-termicznych': {
    title: 'Сервіс і ремонт термотрансферних принтерів Zebra, Dymo',
    description: '✔ Професійний сервіс комп\'ютерів, ноутбуків і принтерів у Вроцлаві ✔ Діагностика за 15 хв ✔ Повний прайс - лист на сайті ✔ Запишіться на сервіс! ☎ 793 759 262',
  },
  'serwis-drukarek-iglowych': {
    title: 'Ремонт матричних принтерів',
    description: '✔ Професійний сервіс комп\'ютерів, ноутбуків і принтерів у Вроцлаві ✔ Діагностика за 15 хв ✔ Повний прайс - лист на сайті ✔ Запишіться на сервіс! ☎ 793 759 262',
  },
  'naprawa-drukarek': {
    title: 'Ремонт принтерів і копіювальних апаратів',
    description: '✔ Професійний сервіс комп\'ютерів, ноутбуків і принтерів у Вроцлаві ✔ Діагностика за 15 хв ✔ Повний прайс - лист на сайті ✔ Запишіться на сервіс! ☎ 793 759 262',
  },
  'wynajem-drukarek': {
    title: 'Оренда (лізинг) принтерів і копіювальних апаратів',
    description: 'Навіть за 24 год ✔ Без довгострокових договорів ✔ Сервіс і витратні матеріали у вартості ✔ Доступність одразу! ✔ Телефонуйте і замовляйте! ☎ 793 759 262',
  },
  'drukarka-zastepcza': {
    title: 'Принтер на заміну (на час ремонту)',
    description: '✔ Потрібен принтер на час ремонту? Навіть за 24 год ✔ Без абонентської плати ✔ Обладнання одразу ✔ Телефонуйте і замовляйте! ☎ 793 759 262',
  },
  'serwis-plotterow': {
    title: 'Сервіс і ремонт плотерів',
    description: '✔ Комплексне обслуговування плотерів ✔ Діагностика за 15 хв ✔ Повний прайс-лист на сайті ✔ Запишіться на сервіс! ☎ 793 759 262',
  },
}

const slugBrands: Record<string, string[]> = {
  'serwis-laptopow': ['apple', 'microsoft', 'dell', 'hp', 'lenovo', 'acer', 'asus', 'msi', 'fujitsu', 'samsung', 'toshiba'],
  'serwis-komputerow-stacjonarnych': ['apple', 'microsoft', 'dell', 'hp', 'lenovo', 'acer', 'asus', 'msi', 'fujitsu', 'samsung'],
  'outsourcing-it': ['apple', 'microsoft', 'dell', 'hp', 'lenovo', 'acer', 'asus', 'msi', 'fujitsu', 'samsung', 'apc'],
  'naprawa-drukarek': ['hp', 'canon', 'epson', 'brother', 'xerox', 'ricoh', 'kyocera', 'konica-minolta', 'sharp', 'lexmark', 'pantum', 'toshiba', 'olivetti', 'oki', 'samsung'],
  'serwis-plotterow': ['hp', 'canon', 'epson', 'xerox', 'ricoh'],
  'serwis-drukarek-termicznych': ['brother', 'zebra', 'dymo', 'godex', 'bixolon', 'oki'],
  'wynajem-drukarek': ['hp', 'canon', 'epson', 'brother', 'xerox', 'ricoh', 'kyocera', 'konica-minolta', 'sharp', 'lexmark', 'toshiba', 'oki'],
  'drukarka-zastepcza': ['hp', 'canon', 'epson', 'brother', 'xerox', 'ricoh', 'kyocera', 'konica-minolta', 'sharp', 'lexmark', 'toshiba', 'oki'],
  'serwis-drukarek-laserowych': ['hp', 'canon', 'brother', 'xerox', 'ricoh', 'kyocera', 'konica-minolta', 'sharp', 'lexmark', 'pantum', 'samsung', 'oki', 'toshiba'],
  'serwis-drukarek-atramentowych': ['hp', 'canon', 'epson', 'brother'],
  'serwis-drukarek-iglowych': ['epson', 'oki', 'bixolon'],
  'serwis-drukarek-3d': ['bambulab', 'formlabs', 'creality', 'anycubic', 'prusa', 'flashforge', 'elegoo', 'zortrax', 'ultimaker', 'phrozen', 'artillery', 'snapmaker'],
}

const seoBlocksUk: Record<string, { items: string[] }> = {
  'naprawa-drukarek': {
    items: [
      'Також надаємо послуги очищення, технічного обслуговування, регенерації, ремонту головки.',
      'Також копіювальних апаратів Lexmark, Oki, Dell, Konica Minolta, Ricoh, Sharp, Toshiba.',
      'Ваш принтер або ксерокс — повідомимо вартість ремонту за 15 хв і виконаємо сервіс.',
      'Забезпечуємо сервіс після гарантії у Вроцлаві (Кшики, Фабрична, Грабишинська, Псе-Поле) і околицях.',
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
      'Ремонт, чищення, налаштування Wi-Fi, проблеми з друком, затисканням паперу та якістю відбитка.',
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
      'Потрібен копіювальний апарат, а коштів зараз немає? Є рішення.',
      'Оренда копіювальних апаратів (багатофункціональних пристроїв) – це вихід із ситуації.',
    ],
  },
  'drukarka-zastepcza': {
    items: [' ', ' '],
  },
}

const imageAltUk: Record<string, string> = {
  'serwis-drukarek-termicznych': 'Принтер термотрансферних етикеток',
  'serwis-laptopow': 'Ремонт ноутбуків',
  'serwis-komputerow-stacjonarnych': 'Сервіс стаціонарних комп\'ютерів',
  'outsourcing-it': 'Аутсорсинг IT',
  'serwis-drukarek-laserowych': 'Сервіс лазерних принтерів',
  'serwis-drukarek-atramentowych': 'Сервіс струменевих принтерів',
  'serwis-drukarek-3d': 'Сервіс і ремонт принтерів 3D',
  'serwis-plotterow': 'Сервіс і ремонт плотерів',
  'serwis-drukarek-iglowych': 'Сервіс матричних принтерів',
  'naprawa-drukarek': 'Сервіс принтерів і багатофункціональних пристроїв',
  'wynajem-drukarek': 'Оренда принтерів',
  'drukarka-zastepcza': 'Принтер на заміну',
}

const serviceImageSrc: Record<string, string> = {
  'serwis-drukarek-termicznych': '/images/06_serwis-drukarek-termicznych.webp',
  'serwis-laptopow': '/images/01_serwis-laptopow.webp',
  'serwis-komputerow-stacjonarnych': '/images/02_serwis-komputerow-stacjonarnych.webp',
  'outsourcing-it': '/images/03_outsourcing-it.webp',
  'serwis-drukarek-laserowych': '/images/04_serwis-drukarek-laserowych.webp',
  'serwis-drukarek-atramentowych': '/images/05_serwis-drukarek-atramentowych.webp',
  'serwis-drukarek-3d': '/images/Serwis_i_Naprawa_Drukarek_3D.webp',
  'serwis-plotterow': '/images/08_serwis-ploterow.webp',
  'serwis-drukarek-iglowych': '/images/07_serwis-drukarek-iglowych.webp',
  'naprawa-drukarek': '/images/Serwis_Drukarek.webp',
  'wynajem-drukarek': '/images/10_wynajem-drukarek.webp',
  'drukarka-zastepcza': '/images/11_drukarka-zastepcza.webp',
}

const serviceIconSrc: Record<string, string> = {
  'serwis-komputerow-stacjonarnych': '/images/02_serwis-komputerow-stacjonarnych-icon.webp',
  'serwis-laptopow': '/images/01_serwis-laptopow-icon.webp',
  'outsourcing-it': '/images/03_outsourcing-it-icon.webp',
  'serwis-drukarek-laserowych': '/images/04_serwis-drukarek-laserowych-icon.webp',
  'serwis-drukarek-atramentowych': '/images/05_serwis-drukarek-atramentowych-icon.webp',
  'serwis-drukarek-3d': '/images/Serwis_i_Naprawa_Drukarek_3D-icon.webp',
  'serwis-plotterow': '/images/08_serwis-ploterow-icon.webp',
  'serwis-drukarek-termicznych': '/images/06_serwis-drukarek-termicznych-icon.webp',
  'serwis-drukarek-iglowych': '/images/07_serwis-drukarek-iglowych-icon.webp',
  'wynajem-drukarek': '/images/10_wynajem-drukarek-icon.webp',
  'drukarka-zastepcza': '/images/11_drukarka-zastepcza-icon.webp',
}

const subServiceTitlesUk: Record<string, string> = {
  'serwis-drukarek-termicznych': 'Сервіс і ремонт принтерів етикеток',
  'serwis-drukarek-laserowych': 'Сервіс лазерних принтерів',
}

const relatedServiceSlugs = [
  'serwis-drukarek-laserowych',
  'serwis-drukarek-atramentowych',
  'serwis-drukarek-iglowych',
  'serwis-plotterow',
  'serwis-drukarek-termicznych',
  'serwis-drukarek-3d',
  'wynajem-drukarek',
  'drukarka-zastepcza',
]

const labels: ServicePageLabels = {
  callNow: 'Зателефонувати',
  sendRequest: 'Надіслати заявку',
  formHref: '/uk#formularz',
  fadeSlideDefault: 'Повний прайс-лист послуг, без прихованих витрат (не "ремонт від 50 зл" або "ціна до узгодження")',
  fadeSlideDrukarkaZastepcza: 'Поломка? Без стресу – на час ремонту надаємо принтер на заміну без абонентської плати',
  fadeSlideWynajem: 'Принтер із сервісом і тонером у вартості — ви дбаєте лише про папір і електроенергію.',
  relatedCta: 'Переглянути прайс-лист',
  relatedIconAltSuffix: 'Вроцлав - іконка сервісної послуги',
  drukarkaZastepczaNote: (
    <>
      Принтер на заміну у Вроцлаві – пристрій на час ремонту принтера або сервісу офісного обладнання. Пропонуємо <strong>принтери на заміну Вроцлав</strong> для компаній та фізичних осіб, швидке надання пристрою, оренду принтера на час сервісу та повне сервісне обслуговування.
    </>
  ),
}

export async function generateStaticParams() {
  return servicesUk.map(service => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = servicesUk.find(s => s.slug === slug)
  const seo = seoMetadataUk[slug]

  if (!service || !seo) {
    return { title: 'Послугу не знайдено' }
  }

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `https://serwis.omobonus.com.pl/uk/uslugi/${slug}`,
      languages: {
        'pl': `https://serwis.omobonus.com.pl/uslugi/${slug}`,
        'uk': `https://serwis.omobonus.com.pl/uk/uslugi/${slug}`,
        'x-default': `https://serwis.omobonus.com.pl/uslugi/${slug}`,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://serwis.omobonus.com.pl/uk/uslugi/${slug}`,
      images: [
        {
          url: slug === 'naprawa-drukarek' ? 'https://serwis.omobonus.com.pl/images/Serwis_Drukarek.webp' : service.icon,
          width: 400,
          height: 400,
          alt: service.title,
        },
      ],
    },
  }
}

export default async function UkServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = servicesUk.find(s => s.slug === slug)
  const heroLabels = serviceHeroLabelsUk[slug] || []

  if (!service) {
    notFound()
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: seoMetadataUk[slug]?.description || service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Omobonus Serwis',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Marcina Bukowskiego 174',
        addressLocality: 'Wrocław',
        postalCode: '52-418',
        addressCountry: 'PL',
      },
      telephone: '+48793759262',
    },
    areaServed: {
      '@type': 'City',
      name: 'Wrocław',
    },
    url: `https://serwis.omobonus.com.pl/uk/uslugi/${slug}`,
  }

  const relatedServices: RelatedService[] = servicesUk
    .filter(s => relatedServiceSlugs.includes(s.slug))
    .map(s => ({
      slug: s.slug,
      title: s.title,
      displayTitle: subServiceTitlesUk[s.slug] || s.title,
      iconSrc: serviceIconSrc[s.slug] || s.icon,
    }))

  return (
    <ServicePageTemplate
      locale="uk"
      slug={slug}
      service={service}
      heroLabels={heroLabels}
      headings={headingsUk[slug] ?? { h1: service.title }}
      seoBlocks={seoBlocksUk[slug]}
      slugBrands={slugBrands[slug]}
      imageSrc={serviceImageSrc[slug] || service.icon}
      imageAlt={imageAltUk[slug] || service.title}
      basePath="/uk/uslugi"
      labels={labels}
      relatedServices={relatedServices}
      jsonLd={serviceJsonLd}
      footerT={uk.footer}
    />
  )
}
