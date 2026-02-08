import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { Metadata } from "next"
import { services } from "@/lib/services-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import manifest from "@/config/manifest"
import ServiceAccordion from "../service-accordion"
import GoogleReviews from "@/components/google-reviews"
import { CallButton } from "@/components/ui/CallButton"

const headings: Record<string, { h1: string; h2?: string }> = {
  'serwis-drukarek-termicznych': {
    h1: 'Serwis i naprawa drukarek etykiet termicznych i termotransferowych we Wrocławiu',
    h2: '(Zebra, Dymo, Godex, Sato, Brother i inne)',
  },

  'serwis-laptopow': {
    h1: 'Serwis i Naprawa Laptopów we Wrocławiu',
    h2: '(HP, Dell, Lenovo, Acer, Asus, Apple, MSI, Fujitsu Siemens, ...) ',
  },

  'naprawa-drukarek': {
    h1: 'Serwis Drukarek i Urządzeń Wielofunkcyjnych we Wrocławiu',
    h2: '(HP, Epson, Brother, Canon, Samsung, Xerox, Kyocera, ...)',
  },

  'serwis-komputerow-stacjonarnych': {
    h1: 'Serwis i Naprawa Komputerów Stacjonarnych',
    h2: '(HP, Dell, Lenovo, Acer, Asus, Apple, MSI, Fujitsu Siemens, ...) ',
  },

  'outsourcing-it': {
    h1: 'Outsourcing IT i obsługa informatyczna firm',
  },

  'serwis-drukarek-laserowych': {
    h1: 'Serwis i Naprawa Drukarek Laserowych',
    h2: '(HP, Epson, Brother, Canon, Samsung, Xerox, Lexmark, ...)',
  },

  'serwis-drukarek-atramentowych': {
    h1: 'Serwis drukarek atramentowych',
  },

  'serwis-drukarek-3d': {
    h1: 'Serwis i Naprawa Drukarek 3D we Wrocławiu',
    h2: '(Bambulab, Creality, Anycubic, Flashforge, Prusa, Formlabs, ...)',
  },

  'serwis-plotterow': {
    h1: 'Serwis i Naprawa Ploterów Drukujących we Wrocławiu',
    h2: '(plotery HP, Canon, Epson i inne)',
  },

  'serwis-drukarek-iglowych': {
    h1: 'Serwis Drukarek Igłowych (Matrycowych)',
    h2: '(Epson, OKI, Bixolon, Citizen, Star Micronics...)',
  },

  'wynajem-drukarek': {
    h1: 'Wynajem (Dzierżawa) Drukarek i Kserokopiarek',
    h2: '(HP, Epson, Brother, Canon, Samsung, Xerox, Kyocera, ...)',
  },

  'drukarka-zastepcza': {
    h1: 'Drukarka zastępcza (na czas naprawy)',
  },
};

type SeoBlock = {
  items: string[]
}

const seoBlocks: Record<string, SeoBlock> = {
  'naprawa-drukarek': {
    items: [
      'Świadczymy również usługi czyszczenie, konserwacja, regeneracja, naprawa głowicy.',
      'Też kopiarek (drukarek z kopiarką) Lexmark, Oki, Dell, Konica Minolta, Ricoh, Sharp, Toshiba.',
      'Twoja drukarka lub ksero - podamy koszt naprawy w 15 min, oraz wykonamy serwis drukarki (kserokopiarki).',
      'Zapewniamy serwis pogwarancyjny we Wrocławiu (Krzyki, Fabryczna, Grabiszyńska, Psie Pole) i okolice.',
    ],
  },

  'serwis-drukarek-termicznych': {
    items: ['Usługi konserwacja, przegląd, naprawa (wymiana) głowicy, ...drukarki termicznej (termiczno etykietowych)',
      'Twoja drukarka termiczna (termotransferowa) - podamy koszt naprawy w 15 min.',
      'Drukarki termiczne (etykietowe) – nasza specjalizacja',]
  },
  'serwis-laptopow': {
    items: ['Diagnostyka, czyszczenie i konserwacja laptopa po zalaniu, instalacja oprogramowania.',
      'Wgranie systemu windows, usuwanie wirusów, odzyskiwanie danych, przywracanie utraconych plików.',
      'Wymiana plyty glownej, dysku, pamięci ram, pasty termoprzewodzącej, wentylatora, portu usb (zasilania).',
      'baterii, zasilacza, matrycy (ekranu), obudowy, zawiasów, klawiatury (klawisza), ...',]
  },
  'serwis-komputerow-stacjonarnych': {
    items: ['Diagnostyka, czyszczenie i konserwacja komputera, instalacja oprogramowania.',
      'Wgranie systemu windows, usuwanie wirusów, odzyskiwanie danych, przywracanie utraconych plików.',
      'Wymiana plyty glownej, karty sieciowejю dysku, pamięci ram, pasty termoprzewodzącej, ',
      'wentylatora, portu usb (zasilania), zasilacza, obudowy, ...',]
  },
  'outsourcing-it': {
    items: [' ',
      ' ',]
  },
  'serwis-drukarek-laserowych': {
    items: ['Świadczymy usługi czyszczenie, konserwacja, regeneracja, ... i na Oki, Dell, Kyocera, Konica Minolta',
      'Twoja drukarka laserowa - podamy koszt naprawy w 15 min i wykonamy naprawę nawet w tym dniu.',]
  },
  'serwis-drukarek-atramentowych': {
    items: ['Świadczymy usługi czyszczenie, regeneracja, naprawa głowicy, konserwacja, ...',
      'Twoja drukarka atramentowa - podamy koszt naprawy w 15 min i wykonamy naprawę nawet w tym dniu.',]
  },
  'serwis-drukarek-3d': {
    items: ['Świadczymy usługi serwisowe – serwis drukarki 3d oraz 3d printer ',
      'dla klientów biznesowych i indywidualnych.',]
  },
  'serwis-plotterow': {
    items: [' ',
      ' ',]
  },
  'serwis-drukarek-iglowych': {
    items: [
      'Świadczymy usługi czyszczenie, regeneracja, konserwacja,',
      'naprawa (wymiana) głowicy, ... drukarki igłowej (matrycowej)',
      'Twoja drukarka igłowa - podamy koszt naprawy w 15 min',
      'wykonamy naprawę nawet w tym dniu.'
    ]
  },
  'wynajem-drukarek': {
    items: ['Potrzebujesz kserokopiarki i nie ma na to teraz pieniędzy? Kserokopiarka będzie.',
      'Wynajem kopiarek (urządzeń wielofunkcyjnych) - to jest wyjście z tej sytuacji.',]
  },
  'drukarka-zastepcza': {
    items: [' ',
      ' ',]
  },
}




// SEO metadata for each service page
const seoMetadata: Record<string, { title: string; description: string }> = {
  'serwis-laptopow': {
    title: 'Serwis i Naprawa Laptopów',
    description: '✔ Kompleksowa obsługa ✔ Bezpłatna diagnoza i wycena w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś!',

  },
  'serwis-komputerow-stacjonarnych': {
    title: 'Serwis i Naprawa Komputerów Stacjonarnych',
    description: '✔ Kompleksowa obsługa ✔ Bezpłatna diagnoza i wycena w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś!',

  },
  'outsourcing-it': {
    title: 'Outsourcing IT Wrocław | Omobonus obsługa informatyczna',
    description: 'Outsourcing IT Wrocław – obsługa informatyczna firm, wsparcie IT, helpdesk, administracja sieci i serwerów, stała opieka techniczna dla firm.',

  },
  'serwis-drukarek-laserowych': {
    title: 'Naprawa Drukarek Laserowych',
    description: '✔ Bezpłatna diagnoza i wycena w 15 min ✔ Pełny wykaz cen na stronie ✔ Drukarka zastępcza na czas naprawy ✔ Umów serwis już dziś!',

  },
  'serwis-drukarek-atramentowych': {
    title: 'Naprawa Drukarek Atramentowych',
    description: '✔ Bezpłatna diagnoza i wycena w 15 min ✔ Pełny wykaz cen na stronie ✔ Drukarka zastępcza na czas naprawy ✔ Umów serwis już dziś!',
  },
  'serwis-drukarek-3d': {
    title: 'Serwis i Naprawa Drukarek 3D',
    description: '✔ Bezpłatna diagnoza i wycena w 15 min ✔ Pełny wykaz cen na stronie ✔ Drukarka zastępcza na czas naprawy ✔ Umów serwis już dziś!',
  },
  'serwis-drukarek-termicznych': {
    title: 'Serwis i naprawa drukarek etykiet Zebra, Dymo',
    description: '✔ Bezpłatna diagnoza i wycena w 15 min ✔ Pełny wykaz cen na stronie ✔ Drukarka zastępcza na czas naprawy ✔ Umów serwis już dziś!',

  },
  'serwis-drukarek-iglowych': {
    title: 'Naprawa Drukarek Igłowych',
    description: '✔ Bezpłatna diagnoza i wycena w 15 min ✔ Pełny wykaz cen na stronie ✔ Drukarka zastępcza na czas naprawy ✔ Umów serwis już dziś!',

  },
  'naprawa-drukarek': {
    title: 'Naprawa Drukarek i Kserokopiarek',
    description: '✔ Bezpłatna diagnoza i wycena w 15 min ✔ Pełny wykaz cen na stronie ✔ Drukarka zastępcza na czas naprawy ✔ Umów serwis już dziś!',

  },
  'wynajem-drukarek': {
    title: 'Wynajem (Dzierżawa) Drukarek i Kserokopiarek',
    description: 'Nawet w 24h  ✔ Bez umów długoterminowych ✔ Serwis i materiały w cenie ✔ Zadzwoń – dostępność od ręki!',

  },
  'drukarka-zastepcza': {
    title: 'Drukarka zastępcza (na czas naprawy)',
    description: '✔ Potrzebna drukarka na czas naprawy? Nawet w 24h ✔ Bez opłat abonamentowych ✔ Sprzęt od ręki ✔ Zadzwoń i zamów!',

  },
  'serwis-plotterow': {
    title: 'Serwis i Naprawa Ploterów',
    description: '✔ Kompleksowa obsługa ploterów ✔ Bezpłatna diagnoza i wycena w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś!',

  },
}

export async function generateStaticParams() {
  return services.map(service => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)
  const seo = seoMetadata[slug]

  if (!service || !seo) {
    return {
      title: 'Usługa nie znaleziona',
    }
  }

  return {
    title: seo.title,
    description: seo.description,

    alternates: {
      canonical: `https://serwis.omobonus.com.pl/uslugi/${slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://serwis.omobonus.com.pl/uslugi/${slug}`,
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

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)

  if (!service) {
    notFound()
  }

  // Schema.org Service structured data
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: seoMetadata[slug]?.description || service.description,
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
    url: `https://serwis.omobonus.com.pl/uslugi/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Header />
      <main
        className={`pt-[40px] pb-[10px] md:pb-[20px] relative overflow-visible ${slug === 'serwis-drukarek-termicznych'




          ? 'page-serwis-drukarek-termicznych'
          : slug === 'serwis-laptopow'
            ? 'page-serwis-laptopow'
            : slug === 'serwis-komputerow-stacjonarnych'
              ? 'page-serwis-komputerow-stacjonarnych'
              : slug === 'outsourcing-it'
                ? 'page-outsourcing-it'
                : slug === 'serwis-drukarek-laserowych'
                  ? 'page-serwis-drukarek-laserowych'
                  : slug === 'serwis-drukarek-atramentowych'
                    ? 'page-serwis-drukarek-atramentowych'
                    : slug === 'serwis-drukarek-3d'
                      ? 'page-serwis-drukarek-3d'
                      : slug === 'serwis-plotterow'
                        ? 'page-serwis-plotterow'
                        : slug === 'serwis-drukarek-iglowych'
                          ? 'page-serwis-drukarek-iglowych'
                          : slug === 'naprawa-drukarek'
                            ? 'page-naprawa-drukarek'
                            : slug === 'wynajem-drukarek'
                              ? 'page-wynajem-drukarek'
                              : slug === 'drukarka-zastepcza'
                                ? 'page-drukarka-zastepcza'
                                : ''}`}
      >



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
          {slug === 'serwis-drukarek-termicznych' || slug === 'serwis-laptopow' || slug === 'serwis-komputerow-stacjonarnych' || slug === 'outsourcing-it' || slug === 'serwis-drukarek-laserowych' || slug === 'serwis-drukarek-atramentowych' || slug === 'serwis-drukarek-3d' || slug === 'serwis-plotterow' || slug === 'serwis-drukarek-iglowych' || slug === 'naprawa-drukarek' || slug === 'wynajem-drukarek' || slug === 'drukarka-zastepcza' ? (
            <>
              {/* HERO container */}
              <div className="container max-w-5xl mx-auto px-4 md:px-6 relative z-10 pt-1 md:pt-2 mb-1">
                <div
                  className={`grid grid-cols-1 gap-4 md:gap-10 items-center ${slug === 'naprawa-drukarek'
                    ? 'md:grid-cols-[40%_60%]'
                    : 'md:grid-cols-[25%_75%]'
                    }`}
                >
                  <div className="flex justify-center md:justify-start">
                    <div className="relative w-full">
                      <Image
                        src={
                          slug === 'serwis-drukarek-termicznych'
                            ? "/images/06_serwis-drukarek-termicznych.webp"
                            : slug === 'serwis-laptopow'
                              ? "/images/01_serwis-laptopow.webp"
                              : slug === 'serwis-komputerow-stacjonarnych'
                                ? "/images/02_serwis-komputerow-stacjonarnych.webp"
                                : slug === 'outsourcing-it'
                                  ? "/images/03_outsourcing-it.webp"
                                  : slug === 'serwis-drukarek-laserowych'
                                    ? "/images/04_serwis-drukarek-laserowych.webp"
                                    : slug === 'serwis-drukarek-atramentowych'
                                      ? "/images/05_serwis-drukarek-atramentowych.webp"
                                      : slug === 'serwis-drukarek-3d'
                                        ? "/images/Serwis_i_Naprawa_Drukarek_3D.webp"
                                        : slug === 'serwis-plotterow'
                                          ? "/images/08_serwis-ploterow.webp"
                                          : slug === 'serwis-drukarek-iglowych'
                                            ? "/images/07_serwis-drukarek-iglowych.webp"
                                            : slug === 'naprawa-drukarek'
                                              ? "/images/Serwis_Drukarek.webp"
                                              : slug === 'wynajem-drukarek'
                                                ? "/images/10_wynajem-drukarek.webp"
                                                : "/images/11_drukarka-zastepcza.webp"
                        }
                        alt={
                          slug === 'serwis-drukarek-termicznych'
                            ? "Drukarka etykiet termicznych"
                            : slug === 'serwis-laptopow'
                              ? "Naprawa laptopów"
                              : slug === 'serwis-komputerow-stacjonarnych'
                                ? "Serwis komputerów stacjonarnych"
                                : slug === 'outsourcing-it'
                                  ? "Outsourcing IT"
                                  : slug === 'serwis-drukarek-laserowych'
                                    ? "Serwis drukarek laserowych"
                                    : slug === 'serwis-drukarek-atramentowych'
                                      ? "Serwis drukarek atramentowych"
                                      : slug === 'serwis-drukarek-3d'
                                        ? "Serwis i naprawa drukarek 3D"
                                        : slug === 'serwis-plotterow'
                                          ? "Serwis i Naprawa Ploterów"
                                          : slug === 'serwis-drukarek-iglowych'
                                            ? "Serwis Drukarek Igłowych"
                                            : slug === 'naprawa-drukarek'
                                              ? "Serwis Drukarek i Urządzeń Wielofunkcyjnych"
                                              : slug === 'wynajem-drukarek'
                                                ? "Wynajem Drukarek"
                                                : "Drukarka Zastępcza"
                        }
                        width={420}
                        height={420}
                        className="object-contain w-full h-auto drop-shadow-2xl"
                        priority
                      />
                    </div>
                  </div>
                  <div className="text-center flex flex-col items-center justify-center">
                    <h1 className="text-[32px] md:text-[40px] font-cormorant font-bold text-[#ffffff] leading-[1.1]">
                      {headings[slug]?.h1 || service.title}
                    </h1>

                    {headings[slug]?.h2 && (
                      <h2 className="h1-sub text-[14px] md:text-[16px] opacity-80 font-cormorant font-bold text-[#ffffff] leading-[1.1] mt-1">
                        {headings[slug].h2}
                      </h2>
                    )}
                    {/* BUTTONS */}
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-[28px] items-center justify-center w-full">
                      <CallButton
                        variant="primary"
                        href="tel:+48793759262"
                        className="w-[80%] md:w-auto"
                      >
                        <span className="md:hidden">Zadzwoń teraz</span>
                        <span className="hidden md:inline">793 759 262</span>
                      </CallButton>


                      <CallButton
                        variant="secondary"
                        href="/#formularz"
                        className="w-[80%] md:w-auto"
                      >
                        Wyślij zgłoszenie
                      </CallButton>
                    </div>


                  </div>
                </div>
              </div>
              {/* INFO container */}
              <div className="container max-w-5xl mx-auto px-4 md:px-6 text-center relative z-10 mb-6">
                <p className="hidden md:block text-[18px] text-[#bfa76a] font-cormorant italic leading-tight max-w-3xl mx-auto font-semibold drop-shadow-2xl">

                  {slug === 'drukarka-zastepcza'
                    ? 'Awaria? Bez stresu – na czas naprawy zapewniamy drukarkę zastępczą bez opłat abonamentowych'
                    : slug === 'wynajem-drukarek'
                      ? 'Drukarka z serwisem i tonerem w cenie — Ty dbasz tylko o papier i prąd.'
                      : 'Pełny wykaz usług i cen, bez ukrytych kosztów (nie "naprawa od 50 zł" lub "cena do uzgodnienia")'}
                </p>
              </div>
            </>
          ) : null}
        </div>

        {slug === 'naprawa-drukarek' ? (
          <section
            id="uslugi"
            className={`relative text-center
    ${slug === 'naprawa-drukarek'
                ? 'pt-0 pb-2'
                : 'pt-2 md:pt-4 pb-16 md:pb-24'
              }
  `}

          >
            {/* Tło */}


            {/* Zawartość */}
            <div className="relative max-w-7xl mx-auto px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                {services
                  .filter(s => [
                    // старые (должны остаться)
                    'serwis-drukarek-laserowych',
                    'serwis-drukarek-atramentowych',
                    'serwis-drukarek-iglowych',

                    // новые
                    'serwis-plotterow',
                    'serwis-drukarek-termicznych',
                    'serwis-drukarek-3d',
                    'wynajem-drukarek',
                    'drukarka-zastepcza',
                  ].includes(s.slug))
                  .map((service) => (
                    <Link
                      key={service.slug}
                      href={`/uslugi/${service.slug}`}
                      className="
    group relative
    min-h-[70px]
    rounded-lg
    py-2 px-3
    border-2 border-[rgba(200,169,107,0.5)]
    flex items-center text-left w-full
    services-card-bg

    transition-all duration-300 ease-out
    hover:border-[rgba(200,169,107,0.85)]
    hover:-translate-y-[2px]
    hover:shadow-[0_10px_25px_rgba(0,0,0,0.35)]
  "
                    >

                      {/* Ikona */}
                      <div className="mr-4 w-[50px] h-[50px] flex-shrink-0 flex items-center justify-center">
                        <Image
                          src={
                            service.slug === 'serwis-komputerow-stacjonarnych'
                              ? '/images/02_serwis-komputerow-stacjonarnych-icon.webp'
                              : service.slug === 'serwis-laptopow'
                                ? '/images/01_serwis-laptopow-icon.webp'
                                : service.slug === 'outsourcing-it'
                                  ? '/images/03_outsourcing-it-icon.webp'
                                  : service.slug === 'serwis-drukarek-laserowych'
                                    ? '/images/04_serwis-drukarek-laserowych-icon.webp'
                                    : service.slug === 'serwis-drukarek-atramentowych'
                                      ? '/images/05_serwis-drukarek-atramentowych-icon.webp'
                                      : service.slug === 'serwis-drukarek-3d'
                                        ? '/images/Serwis_i_Naprawa_Drukarek_3D-icon.webp'
                                        : service.slug === 'serwis-plotterow'
                                          ? '/images/08_serwis-ploterow-icon.webp'
                                          : service.slug === 'serwis-drukarek-termicznych'
                                            ? '/images/06_serwis-drukarek-termicznych-icon.webp'
                                            : service.slug === 'serwis-drukarek-iglowych'
                                              ? '/images/07_serwis-drukarek-iglowych-icon.webp'
                                              : service.slug === 'wynajem-drukarek'
                                                ? '/images/10_wynajem-drukarek-icon.webp'
                                                : service.slug === 'drukarka-zastepcza'
                                                  ? '/images/11_drukarka-zastepcza-icon.webp'
                                                  : service.icon
                          }
                          alt={`${service.title} Wrocław - ikona usługi serwisowej`}
                          width={50}
                          height={50}
                          className="object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                          unoptimized
                        />
                      </div>

                      {/* Treść */}
                      <div className="flex-1">
                        <div className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] group-hover:text-white transition-colors mb-1 leading-tight">
                          {service.slug === 'serwis-drukarek-termicznych' ? 'Serwis i naprawa drukarek etykiet' : service.slug === 'serwis-drukarek-laserowych' ? 'Serwis Drukarek Laserowych' : service.title}
                        </div>
                        <div className="flex items-center gap-2 text-[#bfa76a] text-xs font-serif group-hover:translate-x-1 transition-transform">
                          <span>Zobacz cennik</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
            {seoBlocks[slug]?.items.length > 0 && (
              <div className="pt-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-[2px] text-left break-words">
                  {seoBlocks[slug].items.map((text, index) => (
                    <h2
                      key={index}
                      className={`text-[12px] font-normal leading-[1.1] m-0 p-0 text-[#bfa76a]/70 text-left ${index % 2 === 0
                        ? "md:text-right md:pr-2"
                        : "md:text-left md:pl-2"
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
            <ServiceAccordion service={service} />

            {seoBlocks[slug]?.items.length > 0 && (
              <div className="pt-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-[2px] text-left break-words">
                  {seoBlocks[slug].items.map((text, index) => (
                    <h2
                      key={index}
                      className={`text-[12px] font-normal leading-[1.1] m-0 p-0 text-[#bfa76a]/70 ${index % 2 === 0
                        ? "text-left md:text-right md:pr-2"
                        : "text-left md:pl-2"
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



        {/* SEO tekst dla strony Drukarka Zastępcza */}
        {service.slug === 'drukarka-zastepcza' && (
          <div className="relative z-10 container max-w-5xl mx-auto px-4 md:px-6 pt-[10px] pb-[30px]">
            <p className="text-[12px] text-[#cbb27c] leading-relaxed text-justify max-w-4xl mx-auto">
              Drukarka zastępcza we Wrocławiu – urządzenie na czas naprawy drukarki lub serwisu sprzętu biurowego. Oferujemy <strong>drukarki zastępcze Wrocław</strong> dla firm i klientów indywidualnych, szybkie podstawienie urządzenia, wynajem drukarki na czas serwisu oraz pełną obsługę serwisową.
            </p>
          </div>
        )}


        <div className="relative z-10 mt-0 md:mt-0 -mb-[80px] overflow-visible">
          <GoogleReviews />
        </div>









      </main>

      <Footer />
    </>
  )
}