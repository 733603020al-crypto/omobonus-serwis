import { notFound } from "next/navigation"
import { Metadata } from "next"
import { services } from "@/lib/services-data"
import { serviceHeroLabels } from "@/lib/service-hero-labels"
import { ServicePageTemplate, type RelatedService, type ServicePageLabels } from "@/components/service-page-template"

const headings: Record<string, { h1: string; h2?: string }> = {
  'serwis-drukarek-termicznych': {
    h1: 'Serwis i naprawa drukarek etykiet termicznych i termotransferowych we Wrocławiu',
    h2: '(Zebra, Dymo, Godex, Sato, Brother i inne)',
  },

  'serwis-laptopow': {
    h1: 'Serwis i naprawa laptopów we Wrocławiu',
    h2: '', // '(HP, Dell, Lenovo, Acer, Asus, Apple, MSI, Fujitsu Siemens, ...) ',
  },

  'naprawa-drukarek': {
    h1: 'Serwis drukarek i urządzeń wielofunkcyjnych we Wrocławiu',
    h2: '(HP, Epson, Brother, Canon, Samsung, Xerox, Kyocera, OKI, Lexmark, Oki, Dell, Konica Minolta, Ricoh, Sharp, Toshiba, ...)',
  },

  'serwis-komputerow-stacjonarnych': {
    h1: 'Serwis i naprawa komputerów stacjonarnych',
  },

  'outsourcing-it': {
    h1: 'Outsourcing IT i obsługa informatyczna firm',
  },

  'serwis-drukarek-laserowych': {
    h1: 'Serwis i naprawa drukarek laserowych',
    h2: '(HP, Epson, Brother, Canon, Samsung, Xerox, Lexmark, OKI, Toshiba, Sharp, Ricoh ...)',
  },

  'serwis-drukarek-atramentowych': {
    h1: 'Serwis drukarek atramentowych',
    h2: '(HP, Epson, Canon, Brother, Lexmark, ...)',
  },

  'serwis-drukarek-3d': {
    h1: 'Serwis i naprawa drukarek 3D we Wrocławiu',
    h2: '(Bambulab / Bambu Lab, Creality, Anycubic, Flashforge, Prusa Research, Formlabs, Elegoo, QIDI Tech, Zortrax, Flying Bear, ...)',
  },

  'serwis-plotterow': {
    h1: 'Serwis i naprawa ploterów drukujących we Wrocławiu',
    h2: '(plotery HP, Canon, Epson i inne)',
  },

  'serwis-drukarek-iglowych': {
    h1: 'Serwis drukarek igłowych (Matrycowych)',
    h2: '(Epson, OKI, Bixolon, Citizen, Star Micronics...)',
  },

  'wynajem-drukarek': {
    h1: 'Wynajem (dzierżawa) drukarek i kserokopiarek',
    h2: '(HP, Epson, Brother, Canon, Samsung, Xerox, Kyocera, OKI, ...)',
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
      'Twoja drukarka laserowa - podamy koszt naprawy w 15 min i wykonamy naprawę nawet w tym dniu.',
      'Naprawa, czyszczenie, konfiguracja Wi-Fi, problemy z drukowaniem, zacinaniem papieru i jakością wydruku.',]
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

// Obraz hero i jego opis alternatywny dla każdej usługi
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

const imageAlt: Record<string, string> = {
  'serwis-drukarek-termicznych': 'Drukarka etykiet termicznych',
  'serwis-laptopow': 'Naprawa laptopów',
  'serwis-komputerow-stacjonarnych': 'Serwis komputerów stacjonarnych',
  'outsourcing-it': 'Outsourcing IT',
  'serwis-drukarek-laserowych': 'Serwis drukarek laserowych',
  'serwis-drukarek-atramentowych': 'Serwis drukarek atramentowych',
  'serwis-drukarek-3d': 'Serwis i naprawa drukarek 3D',
  'serwis-plotterow': 'Serwis i naprawa ploterów',
  'serwis-drukarek-iglowych': 'Serwis drukarek igłowych',
  'naprawa-drukarek': 'Serwis drukarek i urządzeń wielofunkcyjnych',
  'wynajem-drukarek': 'Wynajem drukarek',
  'drukarka-zastepcza': 'Drukarka zastępcza',
}

// Ikony dla kafelków usług powiązanych (sekcja "naprawa-drukarek")
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

// Nadpisania tytułów na kafelkach usług powiązanych
const subServiceTitles: Record<string, string> = {
  'serwis-drukarek-termicznych': 'Serwis i naprawa drukarek etykiet',
  'serwis-drukarek-laserowych': 'Serwis Drukarek Laserowych',
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
  callNow: 'Zadzwoń teraz',
  sendRequest: 'Wyślij zgłoszenie',
  formHref: '/#formularz',
  fadeSlideDefault: 'Pełny wykaz usług i cen, bez ukrytych kosztów (nie "naprawa od 50 zł" lub "cena do uzgodnienia")',
  fadeSlideDrukarkaZastepcza: 'Awaria? Bez stresu – na czas naprawy zapewniamy drukarkę zastępczą bez opłat abonamentowych',
  fadeSlideWynajem: 'Drukarka z serwisem i tonerem w cenie — Ty dbasz tylko o papier i prąd.',
  relatedCta: 'Zobacz cennik',
  relatedIconAltSuffix: 'Wrocław - ikona usługi serwisowej',
  drukarkaZastepczaNote: (
    <>
      Drukarka zastępcza we Wrocławiu – urządzenie na czas naprawy drukarki lub serwisu sprzętu biurowego. Oferujemy <strong>drukarki zastępcze Wrocław</strong> dla firm i klientów indywidualnych, szybkie podstawienie urządzenia, wynajem drukarki na czas serwisu oraz pełną obsługę serwisową.
    </>
  ),
}

// SEO metadata for each service page
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

const seoMetadata: Record<string, { title: string; description: string }> = {
  'serwis-laptopow': {
    title: 'Serwis i naprawa laptopów',
    description: '✔ Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu  ✔ Diagnoza w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś!  ☎ 793 759 262',

  },
  'serwis-komputerow-stacjonarnych': {
    title: 'Serwis i naprawa komputerów stacjonarnych',
    description: '✔ Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu  ✔ Diagnoza w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś!  ☎ 793 759 262',

  },
  'outsourcing-it': {
    title: 'Outsourcing IT Wrocław | Omobonus obsługa informatyczna',
    description: 'Outsourcing IT Wrocław – obsługa informatyczna firm, wsparcie IT, helpdesk, administracja sieci i serwerów, stała opieka techniczna dla firm.',

  },
  'serwis-drukarek-laserowych': {
    title: 'Naprawa drukarek laserowych',
    description: '✔ Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu  ✔ Diagnoza w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś!  ☎ 793 759 262',

  },
  'serwis-drukarek-atramentowych': {
    title: 'Naprawa drukarek atramentowych',
    description: '✔ Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu  ✔ Diagnoza w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś!  ☎ 793 759 262',
  },
  'serwis-drukarek-3d': {
    title: 'Serwis i naprawa drukarek 3D',
    description: '✔ Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu  ✔ Diagnoza w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś!  ☎ 793 759 262',
  },
  'serwis-drukarek-termicznych': {
    title: 'Serwis i naprawa drukarek etykiet Zebra, Dymo',
    description: '✔ Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu  ✔ Diagnoza w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś!  ☎ 793 759 262',

  },
  'serwis-drukarek-iglowych': {
    title: 'Naprawa drukarek igłowych',
    description: '✔ Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu  ✔ Diagnoza w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś!  ☎ 793 759 262',

  },
  'naprawa-drukarek': {
    title: 'Naprawa drukarek i kserokopiarek',
    description: '✔ Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu  ✔ Diagnoza w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś!  ☎ 793 759 262',

  },
  'wynajem-drukarek': {
    title: 'Wynajem (dzierżawa) drukarek i kerokopiarek',
    description: 'Nawet w 24h  ✔ Bez umów długoterminowych ✔ Serwis i materiały w cenie ✔ dostępność od ręki! ✔ Zadzwoń i zamów! ☎ 793 759 262',

  },
  'drukarka-zastepcza': {
    title: 'Drukarka zastępcza (na czas naprawy)',
    description: '✔ Potrzebna drukarka na czas naprawy? Nawet w 24h ✔ Bez opłat abonamentowych ✔ Sprzęt od ręki ✔ Zadzwoń i zamów! ☎ 793 759 262',

  },
  'serwis-plotterow': {
    title: 'Serwis i naprawa ploterów',
    description: '✔ Kompleksowa obsługa ploterów ✔ Diagnoza w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś!  ☎ 793 759 262',

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
      languages: {
        'pl': `https://serwis.omobonus.com.pl/uslugi/${slug}`,
        'uk': `https://serwis.omobonus.com.pl/uk/uslugi/${slug}`,
        'x-default': `https://serwis.omobonus.com.pl/uslugi/${slug}`,
      },
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
  const heroLabels = serviceHeroLabels[slug] || []

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

  const relatedServices: RelatedService[] = services
    .filter(s => relatedServiceSlugs.includes(s.slug))
    .map(s => ({
      slug: s.slug,
      title: s.title,
      displayTitle: subServiceTitles[s.slug] || s.title,
      iconSrc: serviceIconSrc[s.slug] || s.icon,
    }))

  return (
    <ServicePageTemplate
      locale="pl"
      slug={slug}
      service={service}
      heroLabels={heroLabels}
      headings={headings[slug] ?? { h1: service.title }}
      seoBlocks={seoBlocks[slug]}
      slugBrands={slugBrands[slug]}
      imageSrc={serviceImageSrc[slug] || service.icon}
      imageAlt={imageAlt[slug] || service.title}
      basePath="/uslugi"
      labels={labels}
      relatedServices={relatedServices}
      jsonLd={serviceJsonLd}
    />
  )
}
