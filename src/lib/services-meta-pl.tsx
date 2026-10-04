import type { ServicePageHeadings, ServicePageLabels } from '@/components/service-page-template'

export const headings: Record<string, ServicePageHeadings> = {
  'serwis-niszczarek': {
    h1: 'Serwis i naprawa niszczarek we Wrocławiu',
    h2: '(Fellowes, HSM, Kobra, Rexel, IDEAL, Dahle, OPUS, Leitz, Wallner, Argo, EBA, HP, Tracer, Tarnator, Genie, Olympia, Intimus, Aurora, Peach)',
  },
  'serwis-drukarek-do-kart-plastikowych': {
    h1: 'Serwis i naprawa drukarek do kart plastikowych we Wrocławiu',
    lines: ['Serwis i naprawa', 'drukarek do kart plastikowych', 'we Wrocławiu'],
    fitMobile: true,
    h2: '(Evolis, Zebra, HID Fargo, Magicard, Entrust Datacard, Matica, IDP Smart, HiTi, DASCOM, Swiftcolor, XID, EDIsecure...)',
  },

  'serwis-drukarek-termicznych': {
    h1: 'Serwis i naprawa drukarek etykiet termicznych i termotransferowych we Wrocławiu',
    h2: '(Zebra, TSC, Toshiba TEC, Honeywell, GoDEX, SATO, Brother, DYMO, Citizen, BIXOLON, Epson, cab, Star Micronics, OKI, Argox, …)',
  },

  'serwis-laptopow': {
    h1: 'Serwis i naprawa laptopów we Wrocławiu',
    h2: '', // '(Microsoft, Dell, HP, Lenovo, Acer, Asus, MSI, Fujitsu, Samsung, Toshiba, Huawei, LG, Gigabyte, Razer, HONOR, Xiaomi, MEDION, Dynabook, VAIO, Panasonic, Framework, CHUWI, …)',
  },

  'naprawa-drukarek': {
    h1: 'Serwis drukarek i urządzeń wielofunkcyjnych we Wrocławiu',
    h2: '(HP, Epson, Brother, Canon, Samsung, Xerox, Kyocera, OKI, Lexmark, Dell, Konica Minolta, Ricoh, Sharp, Toshiba, ...)',
  },

  'serwis-komputerow-stacjonarnych': {
    h1: 'Serwis i naprawa komputerów stacjonarnych',
    h2: '', // '(HP, Dell, Lenovo, Asus, Acer, MSI, Microsoft, Samsung, Gigabyte, Alienware, Fujitsu, Corsair, ZOTAC, MINISFORUM, Framework, …)',
  },

  'outsourcing-it': {
    h1: 'Outsourcing IT i obsługa informatyczna firm',
  },

  'serwis-drukarek-laserowych': {
    h1: 'Serwis i naprawa drukarek laserowych',
    h2: '(HP, Samsung, Canon, Brother, Xerox, Ricoh, Kyocera, Konica Minolta, Sharp, Lexmark, Pantum, Toshiba, OKI, Epson, Fujifilm, DEVELOP, UTAX, Sindoh, …)',
  },

  'serwis-drukarek-atramentowych': {
    h1: 'Serwis drukarek atramentowych',
    h2: '(HP, Canon, Epson, Brother, Lexmark, Ricoh, RISO, Xerox, …)',
  },

  'serwis-drukarek-3d': {
    h1: 'Serwis i naprawa drukarek 3D we Wrocławiu',
    h2: '(Bambu Lab, Prusa Research, Creality, Anycubic, Elegoo, Formlabs, Ultimaker, Flashforge, Snapmaker, QIDI Tech, MakerBot, Raise3D, Zortrax, Sovol, Artillery, Phrozen, BCN3D, Peopoly, UniFormation, Tronxy, Flying Bear, HBot 3D, …)',
  },

  // Tymczasowa kopia 'serwis-drukarek-3d' — jedyna świadomie inna wartość na tym etapie to H1
  'druk-3d-na-zamowienie': {
    h1: 'Druk 3D na zamówienie we Wrocławiu',
    h2: 'Wydruki 3D w technologii FDM z PLA, PETG, ASA i TPU – części zamienne, prototypy, obudowy, elementy techniczne i krótkie serie.',
  },

  'serwis-plotterow': {
    h1: 'Serwis i naprawa ploterów drukujących we Wrocławiu',
    h2: '(HP, Canon, Epson, Xerox, Ricoh, Mimaki, Roland DG, Mutoh, OKI, Fujifilm, Agfa, KIP, Durst, swissQprint, …)',
  },

  'serwis-drukarek-iglowych': {
    h1: 'Serwis drukarek igłowych (Matrycowych)',
    h2: '(Epson, OKI, Bixolon, Citizen, Star Micronics, Tally DASCOM, Printronix, Fujitsu, Olivetti, Panasonic, TallyGenicom, …)',
  },

  'wynajem-drukarek': {
    h1: 'Wynajem (dzierżawa) drukarek i kserokopiarek',
    h2: '(HP, Epson, Brother, Canon, Samsung, Xerox, Kyocera, OKI, ...)',
  },

  'drukarka-zastepcza': {
    h1: 'Drukarka zastępcza (na czas naprawy)',
  },
}

export type SeoBlock = {
  items: string[]
}

export const seoBlocks: Record<string, SeoBlock> = {
  // TYMCZASOWA KOPIA treści z serwis-drukarek-laserowych — do zastąpienia treścią o niszczarkach
  'serwis-niszczarek': {
    items: ['Świadczymy usługi czyszczenie, konserwacja, regeneracja, ... i na Oki, Dell, Kyocera, Konica Minolta',
      'Twoja drukarka laserowa - podamy koszt naprawy w 15 min i wykonamy naprawę nawet w tym dniu.',
      'Naprawa, czyszczenie, konfiguracja Wi-Fi, problemy z drukowaniem, zacinaniem papieru i jakością wydruku.',]
  },
  'serwis-drukarek-do-kart-plastikowych': {
    items: [
      'Czyszczenie, konserwacja, wymiana głowicy i rolek, naprawa modułów laminacji, retransferu i kodowania kart.',
      'Twoja drukarka do kart plastikowych — wstępnie ocenimy problem w 15 min.',
      'Drukarki do kart ID, identyfikatorów i kart lojalnościowych: Zebra, Evolis, HID Fargo, Magicard i inne.',
    ],
  },
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
      'Wymiana płyty głównej, dysku, pamięci ram, pasty termoprzewodzącej, wentylatora, portu usb (zasilania).',
      'baterii, zasilacza, matrycy (ekranu), obudowy, zawiasów, klawiatury (klawisza), ...',]
  },
  'serwis-komputerow-stacjonarnych': {
    items: ['Diagnostyka, czyszczenie i konserwacja komputera, instalacja oprogramowania.',
      'Wgranie systemu windows, usuwanie wirusów, odzyskiwanie danych, przywracanie utraconych plików.',
      'Wymiana płyty głównej, karty sieciowej, dysku, pamięci ram, pasty termoprzewodzącej, ',
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
  'druk-3d-na-zamowienie': {
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
    items: ['Drukarka zastępcza we Wrocławiu – urządzenie na czas naprawy drukarki lub serwisu sprzętu biurowego.',
      'Oferujemy drukarki zastępcze Wrocław dla firm i klientów indywidualnych, szybkie podstawienie urządzenia, wynajem drukarki na czas serwisu oraz pełną obsługę serwisową.',]
  },
}

// Opis alternatywny obrazu hero dla każdej usługi
export const imageAlt: Record<string, string> = {
  'serwis-niszczarek': 'Serwis i naprawa niszczarek',
  'serwis-drukarek-do-kart-plastikowych': 'Drukarka do kart plastikowych',
  'serwis-drukarek-termicznych': 'Drukarka etykiet termicznych',
  'serwis-laptopow': 'Naprawa laptopów',
  'serwis-komputerow-stacjonarnych': 'Serwis komputerów stacjonarnych',
  'outsourcing-it': 'Outsourcing IT',
  'serwis-drukarek-laserowych': 'Serwis drukarek laserowych',
  'serwis-drukarek-atramentowych': 'Serwis drukarek atramentowych',
  'serwis-drukarek-3d': 'Serwis i naprawa drukarek 3D',
  'druk-3d-na-zamowienie': 'Druk 3D na zamówienie we Wrocławiu',
  'serwis-plotterow': 'Serwis i naprawa ploterów',
  'serwis-drukarek-iglowych': 'Serwis drukarek igłowych',
  'naprawa-drukarek': 'Serwis drukarek i urządzeń wielofunkcyjnych',
  'wynajem-drukarek': 'Wynajem drukarek',
  'drukarka-zastepcza': 'Drukarka zastępcza',
}

// Nadpisania tytułów na kafelkach usług powiązanych (sekcja "naprawa-drukarek")
// Short card names on /uslugi/naprawa-drukarek, same as the home service cards.
export const subServiceTitles: Record<string, string> = {
  'serwis-drukarek-laserowych': 'Drukarek laserowych',
  'serwis-drukarek-atramentowych': 'Drukarek atramentowych',
  'serwis-plotterow': 'Ploterów',
  'serwis-drukarek-termicznych': 'Drukarek etykiet',
  'serwis-drukarek-iglowych': 'Drukarek igłowych',
  'serwis-drukarek-3d': 'Drukarek 3D',
}

export const seoMetadata: Record<string, { title: string; description: string }> = {
  // Tymczasowe neutralne metadane — docelowy tekst SEO zostanie dodany osobno
  'serwis-niszczarek': {
    title: 'Serwis i naprawa niszczarek',
    description: 'Serwis i naprawa niszczarek we Wrocławiu — Fellowes, HSM, Kobra, Rexel, IDEAL, Dahle i inne.',
  },
  // Strona w przygotowaniu (noindex) — tekst SEO do potwierdzenia przed publikacją
  'serwis-drukarek-do-kart-plastikowych': {
    title: 'Serwis drukarek do kart plastikowych — Zebra, Evolis, Fargo',
    description: 'Serwis i naprawa drukarek do kart plastikowych we Wrocławiu — Zebra, Evolis, HID Fargo, Magicard, Entrust Datacard i inne. Przejrzysty cennik — koszt naprawy ustalamy przed jej wykonaniem.',
  },
  'serwis-laptopow': {
    title: 'Serwis i naprawa laptopów',
    description: '✔ Serwis i naprawa laptopów wszystkich marek we Wrocławiu ✔ Wymiana matrycy, dysku, baterii, klawiatury ✔ Diagnoza w 15 min ✔ Umów się już dziś! ☎ 793 759 262',

  },
  'serwis-komputerow-stacjonarnych': {
    title: 'Serwis i naprawa komputerów stacjonarnych',
    description: '✔ Serwis i naprawa komputerów stacjonarnych we Wrocławiu ✔ Czyszczenie, wymiana podzespołów, odzyskiwanie danych ✔ Diagnoza w 15 min ✔ Zadzwoń! ☎ 793 759 262',

  },
  'outsourcing-it': {
    title: 'Outsourcing IT | obsługa informatyczna',
    description: 'Outsourcing IT Wrocław – obsługa informatyczna firm, wsparcie IT, helpdesk, administracja sieci i serwerów, stała opieka techniczna dla firm.',

  },
  'serwis-drukarek-laserowych': {
    title: 'Naprawa drukarek laserowych',
    description: '✔ Naprawa drukarek laserowych HP, Canon, Brother, Samsung, Xerox we Wrocławiu ✔ Czyszczenie, regeneracja, problemy z drukiem ✔ Diagnoza w 15 min ☎ 793 759 262',

  },
  'serwis-drukarek-atramentowych': {
    title: 'Naprawa drukarek atramentowych',
    description: '✔ Naprawa drukarek atramentowych HP, Epson, Canon, Brother, Lexmark we Wrocławiu ✔ Czyszczenie, regeneracja, naprawa głowicy ✔ Diagnoza w 15 min ☎ 793 759 262',
  },
  'serwis-drukarek-3d': {
    title: 'Serwis i naprawa drukarek 3D',
    description: '✔ Serwis i naprawa drukarek 3D we Wrocławiu — Bambu Lab, Creality, Anycubic, Prusa i inne ✔ Diagnoza w 15 min ✔ Pełny cennik na stronie ✔ Zadzwoń! ☎ 793 759 262',
  },
  'druk-3d-na-zamowienie': {
    title: 'Drukowanie 3D na zamówienie',
    description: '✔ Wydruki 3D z PLA, PETG, ASA i TPU – części zamienne, prototypy, obudowy, elementy … Uczciwe ceny! ✔ Pełny wykaz cen na stronie ✔ Nawet już dziś! ☎ 793 759 262',
  },
  'serwis-drukarek-termicznych': {
    title: 'Serwis i naprawa drukarek etykiet Zebra, Dymo',
    description: '✔ Serwis drukarek etykiet termicznych i termotransferowych Zebra, Dymo, Godex, Sato we Wrocławiu ✔ Diagnoza w 15 min ✔ Cennik na stronie ☎ 793 759 262',

  },
  'serwis-drukarek-iglowych': {
    title: 'Naprawa drukarek igłowych',
    description: '✔ Naprawa i serwis drukarek igłowych (matrycowych) Epson, OKI, Bixolon, Citizen we Wrocławiu ✔ Diagnoza w 15 min ✔ Pełny cennik na stronie ☎ 793 759 262',

  },
  'naprawa-drukarek': {
    title: 'Naprawa drukarek i kserokopiarek',
    description: '✔ Serwis drukarek i urządzeń wielofunkcyjnych — HP, Epson, Canon, Brother, Xerox, Kyocera we Wrocławiu ✔ Diagnoza w 15 min ✔ Cennik na stronie ☎ 793 759 262',

  },
  'wynajem-drukarek': {
    title: 'Wynajem (dzierżawa) drukarek i kserokopiarek',
    description: 'Nawet w 24h  ✔ Bez umów długoterminowych ✔ Serwis i materiały w cenie ✔ dostępność od ręki! ✔ Zadzwoń i zamów! ☎ 793 759 262',

  },
  'drukarka-zastepcza': {
    title: 'Drukarka zastępcza (na czas naprawy)',
    description: '✔ Potrzebna drukarka na czas naprawy? Nawet w 24h ✔ Bez opłat abonamentowych ✔ Sprzęt od ręki ✔ Zadzwoń i zamów! ☎ 793 759 262',

  },
  'serwis-plotterow': {
    title: 'Serwis i naprawa ploterów',
    description: '✔ Naprawa i serwis ploterów HP, Canon, Epson, … we Wrocławiu ✔ Diagnoza w 15 min ✔ Pełny wykaz cen na stronie ✔ Umów serwis już dziś! ☎ 793 759 262',

  },
}

export const labels: ServicePageLabels = {
  callNow: 'Zadzwoń teraz',
  sendRequest: 'Szybki kontakt',
  formHref: '/kontakt',
  fadeSlideDefault: 'Pełny wykaz usług i cen, bez ukrytych kosztów (nie "naprawa od 50 zł" lub "cena do uzgodnienia")',
  fadeSlideDrukarkaZastepcza: 'Awaria? Bez stresu – na czas naprawy zapewniamy drukarkę zastępczą bez opłat abonamentowych',
  fadeSlideWynajem: 'Drukarka z serwisem i tonerem w cenie — Ty dbasz tylko o papier i prąd.',
  fadeSlideDruk3DZamowienie: 'Pełny wykaz usług i cen, bez ukrytych kosztów (nie "cena od 50 zł" lub "cena do uzgodnienia")',
  relatedCta: 'Zobacz cennik',
  relatedIconAltSuffix: 'Wrocław - ikona usługi serwisowej',
  ctaHeading: 'Masz problem ze swoim urządzeniem?',
  ctaHeadingBySlug: {
    'serwis-laptopow': 'Masz problem z laptopem?',
    'serwis-komputerow-stacjonarnych': 'Masz problem z komputerem?',
    'naprawa-drukarek': 'Masz problem z drukarką?',
    'serwis-drukarek-laserowych': 'Masz problem z drukarką laserową?',
    'serwis-drukarek-atramentowych': 'Masz problem z drukarką atramentową?',
    'serwis-plotterow': 'Masz problem z ploterem?',
    'serwis-drukarek-termicznych': 'Masz problem z drukarką termiczną?',
    'serwis-drukarek-iglowych': 'Masz problem z drukarką igłową?',
    'serwis-drukarek-3d': 'Masz problem z drukarką 3D?',
    'serwis-niszczarek': 'Masz problem z niszczarką?',
    'serwis-drukarek-do-kart-plastikowych': 'Masz problem z drukarką do kart?',
    'wynajem-drukarek': 'Masz problem z drukarką?',
    'drukarka-zastepcza': 'Masz problem z drukarką?',
  },
  ctaText: 'Napisz lub zadzwoń — podpowiemy, od czego zacząć',
  ctaButton: 'Szybki kontakt',
  ctaHref: '/kontakt',
  drukarkaZastepczaNote: (
    <>
      Drukarka zastępcza we Wrocławiu – urządzenie na czas naprawy drukarki lub serwisu sprzętu biurowego. Oferujemy <strong>drukarki zastępcze Wrocław</strong> dla firm i klientów indywidualnych, szybkie podstawienie urządzenia, wynajem drukarki na czas serwisu oraz pełną obsługę serwisową.
    </>
  ),
}
