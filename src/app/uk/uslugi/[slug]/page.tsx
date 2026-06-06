import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Metadata } from 'next'
import { servicesUk } from '@/lib/services-data-uk'
import { serviceHeroLabelsUk } from '@/lib/service-hero-labels-uk'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { uk } from '@/lib/i18n/uk'
import manifest from '@/config/manifest'
import ServiceAccordion from '@/components/service-accordion'
import GoogleReviews from '@/components/google-reviews'
import { CallButton } from '@/components/ui/CallButton'
import BrandTicker from '@/components/brand-ticker'
import { FadeSlideText } from '@/components/ui/FadeSlideText'

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

  const pageClass = [
    'serwis-drukarek-termicznych', 'serwis-laptopow', 'serwis-komputerow-stacjonarnych',
    'outsourcing-it', 'serwis-drukarek-laserowych', 'serwis-drukarek-atramentowych',
    'serwis-drukarek-3d', 'serwis-plotterow', 'serwis-drukarek-iglowych',
    'naprawa-drukarek', 'wynajem-drukarek', 'drukarka-zastepcza',
  ].includes(slug) ? `page-${slug}` : ''

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Header />
      <main className={`pt-[40px] pb-[10px] md:pb-[20px] relative overflow-visible ${pageClass}`}>

        <div className="absolute inset-0">
          <Image
            src="/images/omobonus-hero2.webp"
            alt="Omobonus serwis"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative">
          {pageClass ? (
            <>
              <div className="container max-w-5xl mx-auto px-4 md:px-6 relative z-10 pt-1 md:pt-2 mb-1">
                <div
                  className={`grid grid-cols-1 gap-4 md:gap-10 items-center ${slug === 'naprawa-drukarek'
                    ? 'md:grid-cols-[40%_60%]'
                    : 'md:grid-cols-[25%_75%]'
                    }`}
                >
                  <div className="flex justify-center md:justify-start">
                    <div className="service-hero-image-wrap relative w-full">
                      {heroLabels.map((label, index) => (
                        <span
                          key={label}
                          className={`service-hero-label service-hero-label-${index + 1}`}
                        >
                          {label}
                        </span>
                      ))}

                      <Image
                        src={serviceImageSrc[slug] || service.icon}
                        alt={imageAltUk[slug] || service.title}
                        width={420}
                        height={420}
                        className="service-hero-image object-contain w-full h-auto"
                        priority
                      />
                    </div>
                  </div>
                  <div className="text-center flex flex-col items-center justify-center">
                    <h1 className="text-[32px] md:text-[40px] font-cormorant font-bold text-[#ffffff] leading-[1.1]">
                      {headingsUk[slug]?.h1 || service.title}
                    </h1>

                    {headingsUk[slug]?.h2 && (
                      <h2 className="h1-sub text-[14px] md:text-[16px] opacity-80 font-cormorant font-bold text-[#ffffff] leading-[1.1] mt-1">
                        {headingsUk[slug].h2}
                      </h2>
                    )}
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-[28px] items-center justify-center w-full">
                      <CallButton
                        variant="primary"
                        href="tel:+48793759262"
                        className="w-[80%] md:w-auto"
                      >
                        <span className="md:hidden">Зателефонувати</span>
                        <span className="hidden md:inline">793 759 262</span>
                      </CallButton>

                      <CallButton
                        variant="secondary"
                        href="/uk#formularz"
                        className="w-[80%] md:w-auto"
                      >
                        Надіслати заявку
                      </CallButton>
                    </div>
                  </div>
                </div>
              </div>
              {slugBrands[slug] && (
                <div className="mt-[40px]">
                  <BrandTicker brandNames={slugBrands[slug]} />
                </div>
              )}
              <div className={`container max-w-5xl mx-auto px-4 md:px-6 text-center relative z-10 mb-6${slugBrands[slug] ? ' mt-[44px]' : ''}`}>
                <FadeSlideText className="hidden md:block text-[18px] text-[#bfa76a] font-cormorant italic leading-tight max-w-3xl mx-auto font-semibold drop-shadow-2xl">
                  {slug === 'drukarka-zastepcza'
                    ? 'Поломка? Без стресу – на час ремонту надаємо принтер на заміну без абонентської плати'
                    : slug === 'wynajem-drukarek'
                      ? 'Принтер із сервісом і тонером у вартості — ви дбаєте лише про папір і електроенергію.'
                      : 'Повний прайс-лист послуг, без прихованих витрат (не "ремонт від 50 зл" або "ціна до узгодження")'}
                </FadeSlideText>
              </div>
            </>
          ) : null}
        </div>

        {slug === 'naprawa-drukarek' ? (
          <section
            id="uslugi"
            className="relative text-center pt-0 pb-2"
          >
            <div className="relative max-w-7xl mx-auto px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                {servicesUk
                  .filter(s => [
                    'serwis-drukarek-laserowych',
                    'serwis-drukarek-atramentowych',
                    'serwis-drukarek-iglowych',
                    'serwis-plotterow',
                    'serwis-drukarek-termicznych',
                    'serwis-drukarek-3d',
                    'wynajem-drukarek',
                    'drukarka-zastepcza',
                  ].includes(s.slug))
                  .map((svc) => (
                    <Link
                      key={svc.slug}
                      href={`/uk/uslugi/${svc.slug}`}
                      className="group relative min-h-[70px] rounded-lg py-2 px-3 border-2 border-[rgba(200,169,107,0.5)] flex items-center text-left w-full services-card-bg transition-all duration-300 ease-out hover:border-[rgba(200,169,107,0.85)] hover:-translate-y-[2px] hover:shadow-[0_0_24px_rgba(191,167,106,0.35)]"
                    >
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#bfa76a]/40 via-[#bfa76a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />

                      <div className="relative z-10 mr-4 w-[50px] h-[50px] flex-shrink-0 flex items-center justify-center">
                        <Image
                          src={serviceIconSrc[svc.slug] || svc.icon}
                          alt={`${svc.title} Wrocław - ikona usługi serwisowej`}
                          width={50}
                          height={50}
                          className="object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                          unoptimized
                        />
                      </div>

                      <div className="relative z-10 flex-1">
                        <div className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] group-hover:text-white transition-colors mb-1 leading-tight">
                          {subServiceTitlesUk[svc.slug] || svc.title}
                        </div>
                        <div className="flex items-center gap-2 text-[#bfa76a] text-xs font-serif group-hover:translate-x-1 transition-transform">
                          <span>Переглянути прайс-лист</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
            {seoBlocksUk[slug]?.items.length > 0 && (
              <div className="pt-2 pb-6 md:pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-[2px] text-left break-words">
                  {seoBlocksUk[slug].items.map((text, index) => (
                    <h2
                      key={index}
                      className={`text-[12px] font-normal leading-[1.1] m-0 p-0 text-[#bfa76a]/70 text-left ${index % 2 === 0
                        ? 'md:text-right md:pr-2'
                        : 'md:text-left md:pl-2'
                        }`}
                    >
                      {text}
                    </h2>
                  ))}
                </div>
              </div>
            )}
          </section>
        ) : (
          <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
            <ServiceAccordion service={service} locale="uk" />

            {seoBlocksUk[slug]?.items.length > 0 && (
              <div className="pt-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-[2px] text-left break-words">
                  {seoBlocksUk[slug].items.map((text, index) => (
                    <h2
                      key={index}
                      className={`text-[12px] font-normal leading-[1.1] m-0 p-0 text-[#bfa76a]/70 ${index % 2 === 0
                        ? 'text-left md:text-right md:pr-2'
                        : 'text-left md:pl-2'
                        }`}
                    >
                      {text}
                    </h2>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {service.slug === 'drukarka-zastepcza' && (
          <div className="relative z-10 container max-w-5xl mx-auto px-4 md:px-6 pt-[10px] pb-[30px]">
            <p className="text-[12px] text-[#cbb27c] leading-relaxed text-justify max-w-4xl mx-auto">
              Принтер на заміну у Вроцлаві – пристрій на час ремонту принтера або сервісу офісного обладнання. Пропонуємо <strong>принтери на заміну Вроцлав</strong> для компаній та фізичних осіб, швидке надання пристрою, оренду принтера на час сервісу та повне сервісне обслуговування.
            </p>
          </div>
        )}

        <div className="relative z-10 -mt-6 md:-mt-10 -mb-[80px] overflow-visible">
          <GoogleReviews />
        </div>

      </main>

      <Footer t={uk.footer} />
    </>
  )
}
