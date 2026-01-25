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

const headings: Record<string, { h1: string; h2?: string }> = {
  'serwis-drukarek-termicznych': {
    h1: 'Serwis i naprawa drukarek etykiet termicznych i termotransferowych we Wrocławiu',
    h2: '(Zebra, Dymo, Godex, Sato, Brother i inne)',
  },

  'serwis-laptopow': {
    h1: 'Serwis i naprawa laptopów we Wrocławiu',
    h2: '(HP, Dell, Lenovo, Asus, Acer, Apple, MSI...)',
  },

  'naprawa-drukarek': {
    h1: 'Serwis Drukarek i Urządzeń Wielofunkcyjnych we Wrocławiu',
    h2: '(HP, Epson, Brother, Canon, Samsung, Xerox, Kyocera, ...)',
  },

  'serwis-komputerow-stacjonarnych': {
    h1: 'Serwis i naprawa komputerów stacjonarnych we Wrocławiu',
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
    h1: 'Serwis c naprawa drukarek 3D',
  },

  'serwis-plotterow': {
    h1: 'Serwis i naprawa ploterów',
  },

  'serwis-drukarek-iglowych': {
    h1: 'Serwis drukarek igłowych (matrycowych)',
    h2: '(Epson, OKI, Bixolon, Citizen, Star Micronics...)',
  },

  'wynajem-drukarek': {
    h1: 'Wynajem (dzierżawa) drukarek',
  },

  'drukarka-zastepcza': {
    h1: 'Drukarka zastępcza',
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
    items: [' ',
      ' ',]
  },
  'serwis-laptopow': {
    items: [' ',
      ' ',]
  },
  'serwis-komputerow-stacjonarnych': {
    items: [' ',
      ' ',]
  },
  'outsourcing-it': {
    items: [' ',
      ' ',]
  },
  'serwis-drukarek-laserowych': {
    items: ['Świadczymy również usługi czyszczenie, konserwacja, regeneracja, ... i na Oki, Dell, Kyocera, Konica Minolta',
      'Twoja drukarka laserowa - podamy koszt naprawy w 15 min i wykonamy naprawę nawet w tym dniu.',]
  },
  'serwis-drukarek-atramentowych': {
    items: [' ',
      ' ',]
  },
  'serwis-drukarek-3d': {
    items: [' ',
      ' ',]
  },
  'serwis-plotterow': {
    items: [' ',
      ' ',]
  },
  'serwis-drukarek-iglowych': {
    items: [' ',
      ' ',]
  },
  'wynajem-drukarek': {
    items: [' ',
      ' ',]
  },
  'drukarka-zastepcza': {
    items: [' ',
      ' ',]
  },
}




// SEO metadata for each service page
const seoMetadata: Record<string, { title: string; description: string }> = {
  'serwis-laptopow': {
    title: 'Naprawa laptopów Wrocław | Omobonus serwis komputerowy',
    description: 'Naprawa laptopów Wrocław – serwis laptopów wszystkich marek: HP, Dell, Lenovo, Asus, Acer. Wymiana matrycy, dysku SSD, instalacja Windows, odzyskiwanie danych.',

  },
  'serwis-komputerow-stacjonarnych': {
    title: 'Serwis komputerów Wrocław | Omobonus naprawa PC',
    description: 'Serwis komputerów Wrocław – naprawa PC, diagnostyka, modernizacja, wymiana podzespołów, instalacja Windows, konfiguracja sprzętu.',

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
    title: 'Wynajem drukarek Wrocław | Omobonus dzierżawa urządzeń',
    description: 'Wynajem drukarek Wrocław – dzierżawa drukarek dla firm, urządzenia z serwisem i tonerami, elastyczne warunki, wsparcie techniczne.',

  },
  'drukarka-zastepcza': {
    title: 'Drukarka zastępcza Wrocław | Omobonus serwis',
    description: 'Drukarka zastępcza Wrocław – urządzenie na czas naprawy, drukarka zastępcza dla firm, wynajem tymczasowy, serwis i wsparcie techniczne.',

  },
  'serwis-plotterow': {
    title: 'Serwis i Naprawa Ploterów',
    description: '✔ Bezpłatna diagnoza i wycena w 15 min ✔ Pełny wykaz cen na stronie ✔ Drukarka zastępcza na czas naprawy ✔ Umów serwis już dziś!',

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
      <main className={`min-h-[calc(100vh-65px)] pt-[65px] relative ${slug === 'serwis-drukarek-termicznych' ? 'page-serwis-drukarek-termicznych' : slug === 'serwis-laptopow' ? 'page-serwis-laptopow' : slug === 'serwis-komputerow-stacjonarnych' ? 'page-serwis-komputerow-stacjonarnych' : slug === 'outsourcing-it' ? 'page-outsourcing-it' : slug === 'serwis-drukarek-laserowych' ? 'page-serwis-drukarek-laserowych' : slug === 'serwis-drukarek-atramentowych' ? 'page-serwis-drukarek-atramentowych' : slug === 'serwis-drukarek-3d' ? 'page-serwis-drukarek-3d' : slug === 'serwis-plotterow' ? 'page-serwis-plotterow' : slug === 'serwis-drukarek-iglowych' ? 'page-serwis-drukarek-iglowych' : slug === 'naprawa-drukarek' ? 'page-naprawa-drukarek' : slug === 'wynajem-drukarek' ? 'page-wynajem-drukarek' : slug === 'drukarka-zastepcza' ? 'page-drukarka-zastepcza' : ''}`}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/omobonus-hero2.webp')" }}
        />
        <div className="absolute inset-0 bg-black/50" />


        <div className="relative">
          {slug === 'serwis-drukarek-termicznych' || slug === 'serwis-laptopow' || slug === 'serwis-komputerow-stacjonarnych' || slug === 'outsourcing-it' || slug === 'serwis-drukarek-laserowych' || slug === 'serwis-drukarek-atramentowych' || slug === 'serwis-drukarek-3d' || slug === 'serwis-plotterow' || slug === 'serwis-drukarek-iglowych' || slug === 'naprawa-drukarek' || slug === 'wynajem-drukarek' || slug === 'drukarka-zastepcza' ? (
            <>
              {/* HERO container */}
              <div className="container max-w-5xl mx-auto px-4 md:px-6 relative z-10 pt-1 md:pt-2 mb-1">
                <div className="grid grid-cols-1 md:grid-cols-[25%_75%] gap-4 md:gap-10 items-center">
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
                                              ? "Serwis Drukarek Igłowych"
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
                    <div className="flex flex-row gap-3 md:gap-6 mt-6 items-center justify-center w-full">
                      <a
                        href="tel:+48793759262"
                        className="flex-1 md:flex-none inline-flex items-center justify-center border border-[#bfa76a]/80 text-[12px] sm:text-[13px] md:text-[15px] text-[#bfa76a] py-2 md:py-[8px] px-1 md:px-[24px] rounded-full hover:bg-[#bfa76a]/10 transition-colors md:min-w-[200px]"
                      >
                        <img
                          src="/images/telefon.png"
                          alt="Telefon"
                          className="w-6 h-6 mr-2 object-contain"
                        /> Zadzwoń teraz
                      </a>

                      <Link
                        href="/#formularz"
                        className="flex-1 md:flex-none inline-flex items-center justify-center border border-[#bfa76a]/80 text-[12px] sm:text-[13px] md:text-[15px] text-[#bfa76a] py-2 md:py-[8px] px-1 md:px-[24px] rounded-full hover:bg-[#bfa76a]/10 transition-colors md:min-w-[200px]"
                      >
                        Wyślij zgłoszenie
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* INFO container */}
              <div className="container max-w-5xl mx-auto px-4 md:px-6 text-center relative z-10 mb-6">
                <p className="text-[18px] text-[#bfa76a] font-cormorant italic leading-tight max-w-3xl mx-auto font-semibold drop-shadow-2xl">
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
                  .filter(s => ![
                    'serwis-laptopow',
                    'serwis-komputerow-stacjonarnych',
                    'outsourcing-it',
                    'naprawa-drukarek',
                    'serwis-drukarek-3d',
                    'serwis-drukarek-termicznych',
                    'serwis-plotterow',
                    'wynajem-drukarek',
                    'drukarka-zastepcza'
                  ].includes(s.slug))
                  .map((service) => (
                    <Link
                      key={service.slug}
                      href={`/uslugi/${service.slug}`}
                      className="group relative min-h-[70px] rounded-lg py-2 px-3 border-2 border-[rgba(200,169,107,0.5)] hover:border-[rgba(200,169,107,0.85)] transition-all duration-300 hover:shadow-xl flex items-center text-left w-full services-card-bg"
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
      </main>
      <Footer />
    </>
  )
}
