import type { ServicePageLabels } from '@/components/service-page-template'

export const headings: Record<string, { h1: string; h2?: string }> = {
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
}

export type SeoBlock = {
  items: string[]
}

export const seoBlocks: Record<string, SeoBlock> = {
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

// Opis alternatywny obrazu hero dla każdej usługi
export const imageAlt: Record<string, string> = {
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

// Nadpisania tytułów na kafelkach usług powiązanych (sekcja "naprawa-drukarek")
export const subServiceTitles: Record<string, string> = {
  'serwis-drukarek-termicznych': 'Serwis i naprawa drukarek etykiet',
  'serwis-drukarek-laserowych': 'Serwis Drukarek Laserowych',
}

export const seoMetadata: Record<string, { title: string; description: string }> = {
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

export const labels: ServicePageLabels = {
  callNow: 'Zadzwoń teraz',
  sendRequest: 'Szybki kontakt',
  formHref: '/kontakt',
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
