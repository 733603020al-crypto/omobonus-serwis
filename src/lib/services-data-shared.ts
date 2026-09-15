import type { PricingSection, PricingItem } from './services-data-types'

export const defaultPricingSections: PricingSection[] = [
  {
    id: 'diagnoza',
    title: 'Diagnoza i wycena',
    // icon: manifest.P1_Diagnoza_i_wycena, // Ikona będzie dodana w komponencie
    status: 'GRATIS',
    items: [
      {
        service: 'Wstępna diagnoza online 15 min.(Opis problemu przez WhatsApp / stronę internetową/telefon)',
        price: 'GRATIS',
        duration: 'do 15 min',
      },
      {
        service: 'Wstępna diagnoza przy dostawie do serwisu 15 min. (również w razie rezygnacji z naprawy)',
        price: 'GRATIS',
        duration: 'do 15 min',
      },
      {
        service: 'Diagnoza i wycena naprawy\n(w przypadku realizacji naprawy)',
        price: 'GRATIS',
        duration: '1-2 dni',
      },
      {
        service: 'Diagnoza i wycena naprawy\n(w przypadku rezygnacji z naprawy)',
        price: '',
        duration: '1-2 dni',
      },
      {
        service: 'Pisemna opinia techniczna\n(dodatkowo do pełnej diagnozy, z dokumentacją fotograficzną)',
        price: '+ 50 zł',
        duration: '1-2 dni',
      },
      {
        service: 'Pilna realizacja (jeśli to możliwe, przyspieszamy naprawę bez dodatkowej opłaty)',
        price: 'GRATIS',
        duration: 'do ustalenia',
      },
    ],
  },
  {
    id: 'dojazd',
    title: 'Dojazd',
    status: '20 zł',
    footer:
      'Nie mówimy, że dojazd lub odbiór są „za darmo”, a następnie doliczamy ten koszt do ceny naprawy',
    items: [
      {
        service: 'Odbiór urządzenia od Klienta (do 2,5 km od serwisu; 5 km łącznie w obie strony)',
        price: '20 zł',
        duration: '1-2 dni',
      },
      {
        service: 'Dostarczenie naprawionego urządzenia do Klienta (do 2,5 km od serwisu; 5 km łącznie w obie strony)',
        price: '20 zł',
        duration: '1-2 dni',
      },
      {
        service: 'Odbiór lub dostawa powyżej 2,5 km od serwisu (trasa w obie strony; dopłata po przekroczeniu 5 km)',
        price: '20 zł + 1,5 zł/km',
        duration: '1-2 dni',
      },
      {
        service: 'Pilna realizacja (jeśli to możliwe, realizujemy odbiór lub dostawę w pierwszej kolejności)',
        price: 'GRATIS',
        duration: 'do ustalenia',
      },
    ],
  },

  {
    id: 'konserwacja',
    title: 'Czyszczenie i konserwacja (bez naprawy)',
    items: [
      {
        service: 'PODSTAWOWY (przegląd i profilaktyka)\n\nzakres usługi obejmuje:\n• czyszczenie zewnętrzne i wewnętrzne drukarki,\n• czyszczenie i konserwacja karetek,\n• sprawdzenie głowicy,\n• czyszczenie rolek pobierania papieru,\n• kontrola elementów mechanicznych,\n• test jakości wydruku.',
        price: '50 / 100 / 150',
        duration: '1-3 dni',
      },
      {
        service: 'STANDARD (standardowa konserwacja)\n\nzakres PODSTAWOWY +\n• czyszczenie czujników papieru,\n• czyszczenie stacji serwisowej.',
        price: '100 / 150 / 200',
        duration: '1-3 dni',
      },
      {
        service: 'PREMIUM (pełna konserwacja)\n\nzakres STANDARD +\n• udrożnienie układu tuszu,\n• czyszczenie pompy/pochłaniacza tuszu,\n• reset liczników serwisowych.',
        price: '150 / 200 / 250',
        duration: '1-3 dni',
      },
    ],
  },
  {
    id: 'naprawy',
    title: 'Naprawy i usługi serwisowe (opcjonalne)',
    subcategories: [
      {
        id: 'naprawy-mechanizm',
        title: 'Mechanizm poboru papieru, rolki, separatory',
        items: [
          {
            service: 'Naprawa mechanizmu podawania oraz poboru papieru\n(usunięcie problemów z wciąganiem kartek, nieregularnym podawaniem papieru lub zatrzymywaniem się rolki)',
            price: '70 / 110 / 150 + części',
            duration: '1–2 dni',
          },
          {
            service: 'Czyszczenie mechanizmu podawania i uchwytów papieru\n(usunięcie zabrudzeń z rolek i separatorów – poprawa przyczepności i płynności podawania papieru)',
            price: '70 / 100 / 140',
            duration: '1–2 dni',
          },
          {
            service: 'Usunięcie zacięć papieru i regeneracja mechanizmu podawania\n(eliminacja blokad papieru, wymiana zużytych rolek i elementów prowadzących, regeneracja sprężyn i separatorów)',
            price: '80 / 120 / 160 + części',
            duration: '1–3 dni',
          },
        ],
      },
      {
        id: 'naprawy-karetka',
        title: 'Mechanizm uderzeniowy i głowica drukująca (matryczna)',
        items: [
          {
            service: 'Wymiana głowicy drukującej (igłowej)\n(przywraca prawidłowy wydruk — rozwiązuje problem z brakiem znaków, przerywanymi liniami lub nierówną intensywnością druku)',
            price: '120 / 180 / 240 + części',
            duration: '2–4 dni',
          },
          {
            service: 'Regulacja i czyszczenie mechanizmu igieł / ramienia uderzeniowego\n(czyszczenie i kalibracja mechanizmu uderzeniowego – usuwa zacięcia igieł, poprawia jakość i precyzję druku)',
            price: '90 / 140 / 190',
            duration: '1–3 dni',
          },
        ],
      },
      {
        id: 'naprawy-glowica',
        title: 'Napęd i mechanika ruchu kartridża / wstęgi barwiącej',
        items: [
          {
            service: 'Wymiana lub regulacja paska / przekładni napędu kartridża\n(naprawa napędu przesuwu głowicy – usuwa hałas, drgania i zatrzymania karetki podczas drukowania)',
            price: '80 / 130 / 180 + części',
            duration: '1–3 dni',
          },
          {
            service: 'Czyszczenie i smarowanie prowadnic kartridża / ramienia\n(czyszczenie i konserwacja elementów prowadzących – poprawia płynność ruchu karetki i dokładność wydruku)',
            price: '70 / 100 / 140',
            duration: '1–2 dni',
          },
          {
            service: 'Wymiana lub naprawa mechanizmu wstęgi barwiącej\n(przywraca równomierne nanoszenie tuszu na papier, eliminuje problemy z przerywanym lub bladym drukiem)',
            price: '90 / 140 / 190 + części',
            duration: '1–3 dni',
          },
        ],
      },
      {
        id: 'naprawy-tasma',
        title: 'Taśma barwiąca / mechanizm barwienia druku',
        items: [
          {
            service: 'Wymiana taśmy barwiącej (ink-ribbon)\n(przywraca prawidłową intensywność i kontrast wydruku – usuwa efekt bladych lub przerywanych linii)',
            price: '50 / 80 / 110 + materiał',
            duration: '1–2 dni',
          },
          {
            service: 'Czyszczenie mechanizmu wstęgi i prowadnic\n(usunięcie zabrudzeń i resztek tuszu z elementów prowadzących – poprawia równomierne przesuwanie taśmy i jakość druku)',
            price: '70 / 100 / 140',
            duration: '1–2 dni',
          },
          {
            service: 'Regeneracja mechanizmu wstęgi lub uchwytu wstęgi\n(naprawa lub wymiana zużytych elementów napędu taśmy – eliminuje zacięcia i problemy z podawaniem taśmy barwiącej)',
            price: '90 / 130 / 180 + części',
            duration: '1–3 dni',
          },
        ],
      },
      {
        id: 'naprawy-elektronika',
        title: 'Naprawy elektroniczne',
        items: [
          {
            service:
              'Naprawa lub wymiana złączki lub gniazda LAN/USB uszkodzone / poluzowane\n(usuwa brak wykrywania drukarki przez komputer / LAN)',
            price: '90 / 130 / 170\n+ części',
            duration: '1-3 dni',
          },
          {
            service:
              'Naprawa lub wymiana zasilacza (PSU / płytka zasilająca)\n(po awarii po przepięciu / skoku napięcia)',
            price: '150 / 200 / 250\n+ części',
            duration: '1-5 dni',
          },
          {
            service:
              'Diagnostyka płyty głównej / elektroniki sterującej\n(ustala źródło błędów, zwarć, braku komunikacji)',
            price: '60 / 90 / 120',
            duration: '1-2 dni',
          },
          {
            service:
              'Naprawa lub wymiana płyty głównej (formatera) / interfejsów I/O / HVPS\n(błędy firmware, usuwa problemy z uruchamianiem drukarki, samoczynnym wyłączaniem)',
            price: '160 / 220 / 280\n+ części',
            duration: '1-5 dni',
          },
          {
            service:
              'Odbudowa ścieżek / lutów po zalaniu lub przepięciu\n(przywraca ciągłość sygnałów płyty głównej)',
            price: '140 / 210 / 300',
            duration: '2-5 dni',
          },
          {
            service:
              'Naprawa lub wymiana wentylatora / modułu chłodzenia\n(hałas, przegrzewanie, zabrudzenie)',
            price: '90 / 130 / 170\n+ części',
            duration: '1-3 dni',
          },
          {
            service: 'Wymiana taśm sygnałowych / kabli wewnętrznych',
            price: '70 / 110 / 150\n+ część',
            duration: '1-2 dni',
          },
          {
            service:
              'Naprawa lub wymiana uszkodzonego panelu sterowania\n(przyciski, taśmy, sensory), panelu dotykowego / ekranu LCD)',
            price: '140 / 200 / 260\n+ część',
            duration: '2-5 dni',
          },
        ],
      },
      {
        id: 'naprawy-software',
        title: 'Oprogramowanie i konfiguracja',
        items: [
          {
            service:
              'Instalacja sterowników i konfiguracja w sieci (router / Wi-Fi / LAN /) (zdalnie lub lokalnie)',
            price: '50 / 100 / 150',
            duration: '1-2 dni',
          },
          {
            service:
              'Aktualizacja firmware / reset systemu drukarki (usuwa błędy i komunikaty serwisowe)',
            price: '80 / 120 / 160',
            duration: '1-2 dni',
          },
          {
            service:
              'Reset liczników serwisowych bez ingerencji w moduły (odblokowanie funkcji po komunikacie o konserwacji)',
            price: '60 / 90 / 120',
            duration: '1 dzień',
          },
          {
            service:
              'Przywrócenie ustawień fabrycznych i ponowna konfiguracja (rozwiązuje problemy po błędnych zmianach ustawień)',
            price: '60 / 90 / 120',
            duration: '1 dzień',
          },
          {
            service:
              'Usunięcie komunikatów błędów systemowych (diagnostyka + reset) (drukarka wraca do pracy bez błędów)',
            price: '80 / 120 / 160',
            duration: '1-2 dni',
          },
          {
            service:
              'Usuwanie konfliktów sterowników (przywraca poprawną komunikację drukarka ↔ komputer)',
            price: '50 / 80 / 110',
            duration: '1 dzień',
          },
          {
            service:
              'Migracja drukarki na nowy komputer / serwer (przeniesienie profili, skrótów, udziałów)',
            price: '80 / 120 / 160',
            duration: '1 dzień',
          },
          {
            service:
              'Szkolenie użytkownika (5-15 min) (pokazanie podstaw obsługi: skan, druk, wymiana tuszu/tonera)',
            price: '30 / 50 / 70',
            duration: 'od ręki',
          },
          {
            service:
              'Wsparcie zdalne - konfiguracja / sterowniki / diagnostyka (pomoc bez wizyty serwisanta)',
            price: '120\n/ godzinę',
            duration: '1-2 dni',
          },
        ],
      },
      {
        id: 'naprawy-dodatkowe',
        title: 'Usługi dodatkowe',
        items: [
          {
            service: 'Czyszczenie po silnym zalaniu tonerem (Pełna dekontaminacja)',
            price: '200 / 280 / 360',
            duration: '1-3 dni',
          },
          {
            service: 'Ocena stanu urządzenia przed zakupem (Ekspertyza)',
            price: '40 / 60 / 80',
            duration: '1 dzień',
          },
          {
            service: 'Drukarka zastępcza (Na czas naprawy)',
            price: 'Link',
            duration: '-',
            link: '/uslugi/drukarka-zastepcza',
          },
          {
            service: 'Odnowienie obudowy (Bielenie UV)',
            price: '70 / 90 / 120',
            duration: '1-5 dni',
          },
        ],
      },
    ],
    items: [], // Pusta tablica, bo używamy subcategories
  },
]

// FAQ sekcja - dodawana automatycznie do wszystkich usług

export const faqSection: PricingSection = {
  id: 'faq',
  title: 'Najczęściej zadawane pytania (FAQ)',
  subcategories: [
    {
      id: 'faq-1',
      title: 'Czy warto naprawiać, czy lepiej kupić nowe?',
      items: [],
      answer: 'To zależy od usterki i dostępności części. Zawsze wykonujemy bezpłatną diagnozę wstępną i informujemy, czy naprawa jest opłacalna. Jeżeli naprawa się nie opłaca – powiemy to otwarcie.',
    },
    {
      id: 'faq-2',
      title: 'Jak wygląda proces naprawy?',
      items: [],
      answer: 'Najpierw przeprowadzamy szybką diagnostykę, przygotowujemy wycenę, a po jej akceptacji przystępujemy do naprawy. W razie potrzeby zamawiamy niezbędne części i informujemy o czasie realizacji.',
    },
    {
      id: 'faq-3',
      title: 'Ile trwa naprawa?',
      items: [],
      answer: 'Typowo 1–3 dni robocze. Gdy trzeba zamówić części lub usterka jest złożona (np. płyta główna), czas może być dłuższy; na bieżąco informujemy o statusie.',
    },
    {
      id: 'faq-4',
      title: 'Czy oferujecie dojazd do Klienta? Czy mogę samodzielnie dostarczyć urządzenie do naprawy?',
      items: [],
      answer:
        'Tak, świadczymy usługi serwisowe we Wrocławiu i okolicach.\n\nDojazd serwisanta i diagnoza są GRATIS, jeśli Klient akceptuje zaproponowany koszt naprawy. W przypadku prostych usterek możemy naprawić urządzenie na miejscu, a jeśli zajdzie taka potrzeba – zabierzemy je do naszego serwisu.\n\nW przypadku rezygnacji z naprawy koszt wizyty wynosi 50 zł netto (czas + dojazd serwisanta).\n\nOczywiście mogą Państwo również samodzielnie dostarczyć urządzenie do naszej siedziby we Wrocławiu. Na miejscu zapewniamy kompleksową, szybką i bezpłatną diagnostykę w obecności Klienta, miłe przywitanie oraz darmową kawę lub herbatę.',
    },
    {
      id: 'faq-5',
      title: 'Czy mogę dostarczyć urządzenie kurierem?',
      items: [],
      answer: 'Tak. Otrzymasz od nas instrukcję bezpiecznego pakowania.\n\nPo naprawie odeślemy urządzenie do Ciebie.',
    },
    {
      id: 'faq-6',
      title: 'Czy naprawa wpływa na gwarancję producenta?',
      items: [],
      answer: 'Jeżeli naprawa wymaga działań naruszających warunki gwarancji — poinformujemy Cię o tym przed jej wykonaniem.',
    },
    {
      id: 'faq-7',
      title: 'Czy udzielacie gwarancji na naprawy?',
      items: [],
      answer: 'Tak. **3–12 miesięcy**, w zależności od rodzaju naprawy i wymienionych części.',
    },
    {
      id: 'faq-8',
      title: 'Czy naprawiacie komputery / drukarki wszystkich marek?',
      items: [],
      answer: 'Tak. Naprawiamy m.in. HP, Dell, Lenovo, ASUS, Acer, MSI, Apple i inne.',
    },
    {
      id: 'faq-9',
      title: 'Czy oferujecie drukarkę zastępczą na czas naprawy?',
      items: [],
      answer: 'Tak. W razie potrzeby zapewniamy drukarkę zastępczą — bez przestoju w pracy.',
    },
    {
      id: 'faq-10',
      title: 'Czy utracę dane?',
      items: [],
      answer: 'Nie. W naprawach systemowych i mechanicznych chronimy dane. Przy operacjach ryzykownych (np. wymiana dysku, reinstalacja po awarii) proponujemy backup lub odzysk danych przed pracami.',
    },
    {
      id: 'faq-11',
      title: 'Czy odzyskacie dane po awarii?',
      items: [],
      answer: 'Tak — od prostych przypadków (logiczne uszkodzenia) po bardziej złożone (nośnik uszkodzony). Zawsze informujemy o szansach i kosztach przed startem prac.',
    },
    {
      id: 'faq-12',
      title: 'Czy naprawiacie po zalaniu?',
      items: [],
      answer: 'Tak. Wykonujemy mycie płyty w myjce ultradźwiękowej, usuwamy korozję, wymieniamy uszkodzone elementy. Czas i koszt zależą od skali, im szybciej sprzęt trafi do serwisu, tym większa szansa powodzenia.',
    },
    {
      id: 'faq-13',
      title: 'To ceny brutto czy netto?',
      items: [],
      answer: 'Wszystkie podane ceny są netto**.',
    },
  ],
  items: [], // Pusta tablica, bo używamy subcategories
}

// Funkcja dodająca FAQ do sekcji cennika
// Безопасное клонирование без циклических ссылок

export const cloneSections = <T>(data: T): T => {
  try {
    // Используем structuredClone если доступен (Node.js 17+)
    if (typeof structuredClone !== 'undefined') {
      return structuredClone(data)
    }
    // Fallback: используем JSON с обработкой циклических ссылок
    const seen = new WeakSet()
    return JSON.parse(JSON.stringify(data, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return undefined // Пропускаем циклические ссылки
        }
        seen.add(value)
      }
      return value
    }))
  } catch (error) {
    // Если всё равно ошибка, возвращаем оригинал
    console.warn('Ошибка клонирования данных:', error)
    return data
  }
}

export const createDefaultPricingSections = (): PricingSection[] => cloneSections(defaultPricingSections)

export const createFaqSection = (): PricingSection => cloneSections(faqSection)

export const createPricingSections = (): PricingSection[] => {
  return [...createDefaultPricingSections(), createFaqSection()]
}

export const updateDojazdReturnPrice = (sections: PricingSection[], price: string) => {
  const transportSection = sections.find(section => section.id === 'dojazd')
  const targetItem = transportSection?.items?.find(item =>
    item.service.startsWith('Dojazd (przy rezygnacji z naprawy)')
  )
  if (targetItem) {
    targetItem.price = price
  }
}

export const getRecoveryItems = (): PricingItem[] => [
  {
    service: 'Oszacowanie możliwości odzyskania danych z uszkodzonego nośnika',
    price: '50',
    duration: '1-2 dni',
  },
  {
    service:
      'Odzyskanie danych (usuniętych plików) po skasowaniu ze sprawnego nośnika (dokumenty, zdjęcia lub filmy, przez przypadkowe ich usunięcie, sformatowanie dysku lub przywrócenie systemu Windows)',
    price: '120-200',
    duration: '1-5 dni',
  },
  {
    service:
      'Odzyskiwanie danych (uszkodzenia logiczne – nośnik (np. dysk twardy) zachował sprawność)',
    price: '180-260',
    duration: '1-5 dni',
  },
  {
    service:
      'Odzyskanie danych z uszkodzonego nośnika (fizycznie lub elektronicznie uszkodzonych dysków HDD i SSD)',
    price: 'od 500',
    duration: '5-15 dni',
  },
  {
    service: 'Trwałe usuwanie danych',
    price: '50',
    duration: '1-2 dni',
  },
]
