import { notFound } from "next/navigation"
import { Metadata } from "next"
import { services } from "@/lib/services-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import manifest from "@/config/manifest"
import ServiceAccordion from "../service-accordion"

// SEO metadata for each service page
const seoMetadata: Record<string, { title: string; description: string; keywords: string[] }> = {
  'serwis-laptopow': {
    title: 'Naprawa laptopów Wrocław | Omobonus serwis komputerowy',
    description: 'Naprawa laptopów Wrocław – serwis laptopów wszystkich marek: HP, Dell, Lenovo, Asus, Acer. Wymiana matrycy, dysku SSD, instalacja Windows, odzyskiwanie danych.',
    keywords: ['naprawa laptopów Wrocław', 'serwis laptopów Wrocław', 'wymiana matrycy laptop', 'wymiana dysku SSD laptop', 'czyszczenie laptopa Wrocław', 'naprawa laptopa HP', 'serwis Dell Wrocław', 'naprawa Lenovo'],
  },
  'serwis-komputerow-stacjonarnych': {
    title: 'Serwis komputerów Wrocław | Omobonus naprawa PC',
    description: 'Serwis komputerów Wrocław – naprawa PC, diagnostyka, modernizacja, wymiana podzespołów, instalacja Windows, konfiguracja sprzętu.',
    keywords: ['serwis komputerów Wrocław', 'naprawa komputerów Wrocław', 'naprawa PC Wrocław', 'modernizacja komputera', 'wymiana karty graficznej', 'instalacja Windows Wrocław', 'diagnoza komputera'],
  },
  'outsourcing-it': {
    title: 'Outsourcing IT Wrocław | Omobonus obsługa informatyczna',
    description: 'Outsourcing IT Wrocław – obsługa informatyczna firm, wsparcie IT, helpdesk, administracja sieci i serwerów, stała opieka techniczna dla firm.',
    keywords: ['outsourcing IT Wrocław', 'obsługa informatyczna firm', 'wsparcie IT Wrocław', 'usługi IT dla firm', 'administracja sieci', 'helpdesk IT Wrocław', 'opieka informatyczna'],
  },
  'serwis-drukarek-laserowych': {
    title: 'Serwis drukarek laserowych Wrocław | Omobonus naprawa drukarek',
    description: 'Serwis drukarek laserowych Wrocław – naprawa drukarek HP, Brother, Canon, Samsung, wymiana tonerów, konserwacja MFU, serwis urządzeń biurowych.',
    keywords: ['serwis drukarek laserowych Wrocław', 'naprawa drukarek Wrocław', 'serwis drukarek HP', 'naprawa drukarki Brother', 'serwis MFU', 'wymiana tonera', 'naprawa kserokopiarki'],
  },
  'serwis-drukarek-atramentowych': {
    title: 'Serwis drukarek atramentowych Wrocław | Omobonus serwis drukarek',
    description: 'Serwis drukarek atramentowych Wrocław – naprawa drukarek Epson, Canon, HP, czyszczenie głowic, wymiana tuszy, usuwanie usterek i konserwacja.',
    keywords: ['serwis drukarek atramentowych Wrocław', 'naprawa drukarki atramentowej', 'udrażnianie głowicy drukarki', 'serwis Epson Wrocław', 'naprawa Canon', 'wymiana tuszu'],
  },
  'serwis-drukarek-termicznych': {
    title: 'Serwis drukarek termicznych Wrocław | Omobonus naprawa drukarek etykiet',
    description: 'Serwis drukarek termicznych Wrocław – naprawa drukarek Zebra, Brother, Dymo, wymiana głowicy termicznej, konserwacja i kalibracja urządzeń.',
    keywords: ['serwis drukarek termicznych Wrocław', 'naprawa drukarki etykiet', 'serwis Zebra', 'drukarka kodów kreskowych', 'naprawa drukarki etykietowej', 'wymiana głowicy termicznej'],
  },
  'serwis-drukarek-iglowych': {
    title: 'Serwis drukarek igłowych Wrocław | Omobonus naprawa drukarek',
    description: 'Serwis drukarek igłowych Wrocław – naprawa Epson, OKI, Citizen, wymiana taśmy barwiącej, konserwacja mechanizmu, usuwanie usterek.',
    keywords: ['serwis drukarek igłowych Wrocław', 'naprawa drukarki igłowej', 'serwis Epson LX', 'naprawa OKI', 'wymiana taśmy barwiącej', 'drukarka igłowa naprawa'],
  },
  'wynajem-drukarek': {
    title: 'Wynajem drukarek Wrocław | Omobonus dzierżawa urządzeń',
    description: 'Wynajem drukarek Wrocław – dzierżawa drukarek dla firm, urządzenia z serwisem i tonerami, elastyczne warunki, wsparcie techniczne.',
    keywords: ['wynajem drukarek Wrocław', 'dzierżawa drukarek', 'leasing drukarek', 'wynajem drukarki dla firmy', 'drukarki na wynajem', 'dzierżawa urządzeń biurowych'],
  },
  'drukarka-zastepcza': {
    title: 'Drukarka zastępcza Wrocław | Omobonus serwis',
    description: 'Drukarka zastępcza Wrocław – urządzenie na czas naprawy, drukarka zastępcza dla firm, wynajem tymczasowy, serwis i wsparcie techniczne.',
    keywords: ['drukarka zastępcza Wrocław', 'drukarka na czas naprawy', 'urządzenie zastępcze', 'wynajem drukarki tymczasowo', 'drukarka zamienna'],
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
    keywords: seo.keywords,
    alternates: {
      canonical: `https://serwis.omobonus.com.pl/uslugi/${slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://serwis.omobonus.com.pl/uslugi/${slug}`,
      images: [
        {
          url: service.icon,
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
      <main className="min-h-screen pt-[65px] relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${manifest.services_background}')` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative">
          <div className="container max-w-5xl mx-auto px-4 md:px-6 text-center relative z-10 mb-6">
            <h1 className="text-[40px] font-cormorant font-bold text-[#ffffff] leading-[1.1]">
              {service.title}
            </h1>
            {service.slug === 'wynajem-drukarek' ? (
              <p className="mt-[6px] text-[18px] text-[#bfa76a] font-cormorant italic leading-tight max-w-3xl mx-auto font-semibold drop-shadow-2xl">
                Drukarka z serwisem i tonerem w cenie — Ty dbasz tylko o papier i prąd.
              </p>
            ) : service.slug === 'drukarka-zastepcza' ? (
              <p className="mt-[6px] text-[18px] text-[#bfa76a] font-cormorant italic leading-tight max-w-3xl mx-auto font-semibold drop-shadow-2xl">
                Awaria? Bez stresu – na czas naprawy zapewniamy drukarkę zastępczą bez opłat abonamentowych
              </p>
            ) : (
              <p className="mt-[6px] text-[18px] text-[#bfa76a] font-cormorant italic leading-tight max-w-3xl mx-auto font-semibold drop-shadow-2xl">
                Pełny wykaz usług i cen, bez ukrytych kosztów (nie &ldquo;naprawa od 50 zł&rdquo; lub &ldquo;cena do uzgodnienia&rdquo;)
              </p>
            )}
          </div>
        </div>

        <ServiceAccordion service={service} />

        {/* SEO текст для страницы Serwis Laptopów */}
        {service.slug === 'serwis-laptopow' && (
          <div className="relative z-10 container max-w-5xl mx-auto px-4 md:px-6 pt-[10px] pb-[30px]">
            <p className="text-[11px] md:text-[12px] text-[#bfa76a]/70 leading-relaxed text-center max-w-4xl mx-auto">
              We Wrocławiu oferujemy kompleksowy serwis i naprawę laptopów –
              czyszczenie, wymianę matrycy, dysku SSD oraz naprawę klawiatury.
              Zajmujemy się również instalacją systemu Windows i diagnozą usterek.
              Szybka naprawa laptopów wszystkich marek: HP, Dell, Lenovo, Asus, Acer i innych.
            </p>
          </div>
        )}

        {/* SEO tekst dla strony Serwis Komputerów Stacjonarnych */}
        {service.slug === 'serwis-komputerow-stacjonarnych' && (
          <div className="relative z-10 container max-w-5xl mx-auto px-4 md:px-6 pt-[10px] pb-[30px]">
            <p className="text-[11px] md:text-[12px] text-[#bfa76a]/70 leading-relaxed text-center max-w-4xl mx-auto">
              Oferujemy serwis i naprawę komputerów we Wrocławiu – zarówno PC, jak i komputery stacjonarne.
              Zajmujemy się czyszczeniem komputerów, wymianą dysków, instalacją systemu Windows
              oraz odzyskiwaniem danych. Modernizacja komputera i diagnoza usterek dostępna od ręki.
            </p>
          </div>
        )}

        {/* SEO tekst dla strony Outsourcing IT */}
        {service.slug === 'outsourcing-it' && (
          <div className="relative z-10 container max-w-5xl mx-auto px-4 md:px-6 pt-[10px] pb-[30px]">
            <p className="text-[11px] md:text-[12px] text-[#bfa76a]/70 leading-relaxed text-center max-w-4xl mx-auto">
              Oferujemy outsourcing IT we Wrocławiu dla firm i osób prywatnych.
              Zapewniamy serwis komputerów, wsparcie IT, obsługę firm, konserwację sprzętu, helpdesk i szybkie naprawy.
              Idealne rozwiązanie: outsourcing IT Wrocław, usługi IT dla firm Wrocław, serwis komputerów Wrocław, wsparcie IT Wrocław.
            </p>
          </div>
        )}

        {/* SEO tekst dla strony Serwis Drukarek Laserowych i Kserokopiarek */}
        {service.slug === 'serwis-drukarek-laserowych' && (
          <div className="relative z-10 container max-w-5xl mx-auto px-4 md:px-6 pt-[10px] pb-[30px]">
            <p className="text-[12px] text-[#cbb27c] leading-relaxed text-justify max-w-4xl mx-auto">
              Serwis drukarek laserowych i urządzeń wielofunkcyjnych (MFU) we Wrocławiu – naprawa drukarek laserowych, serwis drukarek HP i Brother, konserwacja drukarek oraz serwis kserokopiarek dla firm. Jeśli szukasz <strong>serwis drukarek Wrocław</strong> lub <strong>naprawa drukarek Wrocław</strong> z dojazdem, zajmujemy się także serwisem urządzeń wielofunkcyjnych i naprawą drukarki na miejscu.
            </p>
          </div>
        )}

        {/* SEO tekst dla strony Serwis Drukarek Atramentowych */}
        {service.slug === 'serwis-drukarek-atramentowych' && (
          <div className="relative z-10 container max-w-5xl mx-auto px-4 md:px-6 pt-[10px] pb-[30px]">
            <p className="text-[12px] text-[#cbb27c] leading-relaxed text-justify max-w-4xl mx-auto">
              Serwis drukarek atramentowych we Wrocławiu – naprawa drukarek atramentowych wszystkich marek, w tym Epson, Canon i HP. Oferujemy serwis urządzeń atramentowych, czyszczenie głowic drukujących, wymianę tuszy oraz naprawę drukarki, która nie drukuje. Jeśli szukasz <strong>serwis drukarek atramentowych Wrocław</strong> lub <strong>naprawa drukarki atramentowej Wrocław</strong>, zapraszamy do kontaktu.
            </p>
          </div>
        )}

        {/* SEO tekst dla strony Serwis i Naprawa Drukarek 3D */}
        {service.slug === 'serwis-drukarek-3d' && (
          <div className="relative z-10 container max-w-5xl mx-auto px-4 md:px-6 pt-[10px] pb-[30px]">
            <p className="text-[12px] text-[#cbb27c] leading-relaxed text-justify max-w-4xl mx-auto">
              Serwis drukarek 3D we Wrocławiu – naprawa drukarki 3D, kalibracja stołu, regulacja osi oraz poprawa jakości wydruku. Naprawa drukarek 3D FDM i SLA, czyszczenie ekstrudera i hotendu, wymiana części oraz konfiguracja ustawień druku. Serwis drukarek 3D dla firm i pracowni, konfiguracja firmware oraz przygotowanie drukarki do materiałów ABS, PETG i nylon.
            </p>
          </div>
        )}

        {/* SEO tekst dla strony Serwis Drukarek Termiczno-etykietowych */}
        {service.slug === 'serwis-drukarek-termicznych' && (
          <div className="relative z-10 container max-w-5xl mx-auto px-4 md:px-6 pt-[10px] pb-[30px]">
            <p className="text-[12px] text-[#cbb27c] leading-relaxed text-justify max-w-4xl mx-auto">
              Serwis drukarek termicznych i etykietowych we Wrocławiu – naprawa drukarek etykiet Zebra, Brother, Dymo, Epson i innych. Oferujemy czyszczenie, konserwację, kalibrację oraz wymianę głowicy drukującej. Jeśli szukasz <strong>serwis drukarek termicznych Wrocław</strong> lub <strong>naprawa drukarki etykietowej Wrocław</strong>, zapewniamy szybką diagnozę i naprawę urządzeń etykietujących.
            </p>
          </div>
        )}

        {/* SEO tekst dla strony Serwis Drukarek Igłowych */}
        {service.slug === 'serwis-drukarek-iglowych' && (
          <div className="relative z-10 container max-w-5xl mx-auto px-4 md:px-6 pt-[10px] pb-[30px]">
            <p className="text-[12px] text-[#cbb27c] leading-relaxed text-justify max-w-4xl mx-auto">
              Serwis drukarek igłowych we Wrocławiu – naprawa i konserwacja drukarek igłowych Epson, OKI, Citizen i innych marek. Wymiana taśmy barwiącej, czyszczenie mechanizmu drukującego oraz serwis drukarek używanych w firmach i urzędach. Jeśli szukasz <strong>serwis drukarek igłowych Wrocław</strong> lub <strong>naprawa drukarki igłowej Wrocław</strong>, wykonujemy szybkie i solidne naprawy na miejscu.
            </p>
          </div>
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
