import manifest from '@/config/manifest'

export interface PricingItem {
  service: string
  price: string
  duration: string
  link?: string
}

export interface PricingSubcategory {
  id: string
  title: string
  items: PricingItem[]
  subtitle?: string
  answer?: string // Odpowiedź dla FAQ (z obsługą formatowania)
  price?: string // Цена для отображения в заголовке подменю
}

export interface PricingSection {
  id: string
  title: string
  icon?: string
  status?: string // np. "GRATIS", "od 50 zł"
  items: PricingItem[]
  subcategories?: PricingSubcategory[] // Podkategorie (dla "naprawy" lub "faq")
  footer?: string // Footer text (displayed below title when section is open)
}

export interface PriceTooltipCategory {
  title: string
  description: string
  features: string[]
  examples: string[]
}

export interface PriceTooltipRichContent {
  type: 'deviceCategories'
  title: string
  description: string
  categories: PriceTooltipCategory[]
}

export interface ServiceData {
  slug: string
  title: string
  subtitle: string
  icon: string
  description: string // Krótki opis na kafelki
  pricingSections: PricingSection[]
  priceTooltip?: string
  priceTooltipRich?: PriceTooltipRichContent
}

export const DEFAULT_PRICE_TOOLTIP = 'Ceny brutto (zawierają VAT)'

// Domyślne sekcje cennika (aby nie powtarzać kodu dla każdej usługi na start)
const defaultPricingSections: PricingSection[] = [
  {
    id: 'diagnoza',
    title: 'Diagnoza i wycena',
    // icon: manifest.P1_Diagnoza_i_wycena, // Ikona będzie dodana w komponencie
    status: 'GRATIS',
    items: [
      {
        service: 'Wstępna diagnoza online 15 min.(Opis problemu przez WhatsApp / stronę internetową/telefon)',
        price: 'GRATIS',
        duration: '15 min',
      },
      {
        service: 'Wstępna diagnoza przy dostawie do serwisu 15 min. (również w razie rezygnacji z naprawy)',
        price: 'GRATIS',
        duration: '15 min',
      },
      {
        service: 'Wycena naprawy (bez naprawy)',
        price: '',
        duration: '1-3 dni',
      },

      {
        service: 'Usługi w trybie ekspresowym (do 24 godzin, stawka z cennika)',
        price: '+ 100%\ndo ceny',
        duration: '24 h',
      },
    ],
  },
  {
    id: 'dojazd',
    title: 'Dojazd',
    status: '20 zł',
    footer:
      'Nie mówimy, że dojazd lub odbiór są „za darmo”, a następnie doliczamy ten koszt do ceny naprawy.',
    items: [
      {
        service: 'Odbiór urządzenia od Klienta (Wrocław do 5 km)',
        price: '20 zł',
        duration: '1-3 dni',
      },
      {
        service: 'Dostarczenie naprawionego urządzenia do Klienta (Wrocław do 5 km)',
        price: '20 zł',
        duration: '1-3 dni',
      },
      {
        service: 'Dojazd lub dostawa (powyżej 5 km) (liczony w obie strony)',
        price: '1,5 zł/km',
        duration: '1-3 dni',
      },
      {
        service: 'Usługi w trybie ekspresowym (do 24 godzin)',
        price: '+ 100%\ndo ceny',
        duration: '24 h',
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
const faqSection: PricingSection = {
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
        'Tak, świadczymy usługi serwisowe we Wrocławiu i okolicach.\n\nDojazd serwisanta i diagnoza są GRATIS, jeśli Klient akceptuje zaproponowany koszt naprawy. W przypadku prostych usterek możemy naprawić urządzenie na miejscu, a jeśli zajdzie taka potrzeba – zabierzemy je do naszego serwisu.\n\nW przypadku rezygnacji z naprawy koszt wizyty wynosi 50 zł brutto (czas + dojazd serwisanta).\n\nOczywiście mogą Państwo również samodzielnie dostarczyć urządzenie do naszej siedziby we Wrocławiu. Na miejscu zapewniamy kompleksową, szybką i bezpłatną diagnostykę w obecności Klienta, miłe przywitanie oraz darmową kawę lub herbatę.',
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
      answer: 'Wszystkie podane ceny są **brutto (z VAT)**.',
    },
  ],
  items: [], // Pusta tablica, bo używamy subcategories
}

// Funkcja dodająca FAQ do sekcji cennika
// Безопасное клонирование без циклических ссылок
const cloneSections = <T>(data: T): T => {
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

const createDefaultPricingSections = (): PricingSection[] => cloneSections(defaultPricingSections)

const createFaqSection = (): PricingSection => cloneSections(faqSection)

const createPricingSections = (): PricingSection[] => {
  return [...createDefaultPricingSections(), createFaqSection()]
}

const updateKonserwacjaForOutsourcing = (sections: PricingSection[]) => {
  const konserwacjaSection = sections.find(section => section.id === 'konserwacja')
  if (!konserwacjaSection) return

  konserwacjaSection.title = 'Obsługa firm (abonament miesięczny)'
  konserwacjaSection.items = [
    {
      service: 'Pakiet START dla małych firm i biur (1–3 komputery)\n\nzakres paketu obejmuje:\n• zdalne wsparcie użytkowników (rozwiązywanie problemów z programami, drukowaniem, pocztą - pomoc telefoniczna/chat) - do 4 h miesięcznie,\n• aktualizacje systemów i oprogramowania,\n• administracja systemami Windows / macOS (utrzymanie stabilności i aktualności),\n• monitoring bezpieczeństwa (aktualizacje antywirusa, kontrola zapór i zagrożeń),\n• zarządzanie kopiami zapasowymi (backup + test odtwarzania).',
      price: '70 zł\n/ stanowisko',
      duration: 'do 4 h',
    },
    {
      service: 'Pakiet BIZNES dla rozwijających się firm (4–10 komputerów)\n\nzakres START +\n• zdalne wsparcie użytkowników - pomoc telefoniczna/chat - do 10 h miesięcznie,\n• monitoring bezpieczeństwa (aktualizacje antywirusa, kontrola zapór i zagrożeń),\n• zarządzanie kopiami zapasowymi (backup + test odtwarzania),\n• administracja siecią LAN / Wi-Fi / Router,\n• konfiguracja drukarek i skanowania w sieci (SMB / e-mail),\n• wizyta serwisanta na miejscu: 1× / miesiąc.',
      price: '55 zł\n/ stanowisko',
      duration: 'do 2 h',
    },
    {
      service: 'Pakiet PRO dla firm z rozbudowaną infrastrukturą (11+ komputerów)\n\nzakres BIZNES +\n• zdalne wsparcie użytkowników - pomoc telefoniczna/chat – nielimitowane,\n• zarządzanie użytkownikami i uprawnieniami,\n• administracja serwerami i usługami sieciowymi,\n• wizyta serwisanta na miejscu: 2× / miesiąc,\n• audyt sprzętu i raport miesięczny,\n• priorytetowa obsługa (pomijanie kolejki).',
      price: '40 zł\n/ stanowisko',
      duration: 'do 1 h',
    },
  ]
}

const updateNaprawyKaretkaForOutsourcing = (sections: PricingSection[]) => {
  const naprawySection = sections.find(section => section.id === 'naprawy')
  const karetkaSubcategory = naprawySection?.subcategories?.find(
    sub => sub.id === 'naprawy-karetka'
  )
  if (!karetkaSubcategory) return

  karetkaSubcategory.title = 'Naprawy sprzętu komputerowego (na miejscu u Klienta)'
  karetkaSubcategory.items = [
    {
      service: 'Wymiana zasilacza / dysku / RAM u Klienta\n(wymiana uszkodzonych lub rozbudowa podzespołów bezpośrednio w siedzibie firmy)',
      price: '150 zł',
      duration: '1–3 dni',
    },
    {
      service: 'Czyszczenie wnętrza komputera i chłodzenia\n(usunięcie kurzu i zabrudzeń – poprawa wydajności i chłodzenia podzespołów)',
      price: '180 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Wymiana wentylatora / chłodzenia CPU\n(montaż nowego układu chłodzenia lub wymiana niesprawnego wentylatora)',
      price: '160 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Wymiana past termoprzewodzących CPU / GPU\n(odświeżenie połączenia termicznego dla lepszego odprowadzania ciepła)',
      price: '120 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Konserwacja stacji roboczej lub terminala\n(czyszczenie, kontrola połączeń, test stabilności – utrzymanie sprawności sprzętu)',
      price: '150 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Montaż nowego sprzętu\n(instalacja i podłączenie komputera, monitora, zasilacza UPS w miejscu pracy)',
      price: '100 zł\n/ stanowisko',
      duration: '1–3 dni',
    },
  ]
}

const updateNaprawyGlowicaForOutsourcing = (sections: PricingSection[]) => {
  const naprawySection = sections.find(section => section.id === 'naprawy')
  const glowicaSubcategory = naprawySection?.subcategories?.find(
    sub => sub.id === 'naprawy-glowica'
  )
  if (!glowicaSubcategory) return

  glowicaSubcategory.title = 'Konfiguracja i sieć biurowa'
  glowicaSubcategory.items = [
    {
      service: 'Diagnostyka i konfiguracja sieci LAN / Wi-Fi\n(analiza połączeń, usuwanie błędów komunikacji, optymalizacja ustawień sieci firmowej)',
      price: '150 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Konfiguracja routera, modemu, punktu dostępowego\n(ustawienie parametrów dostępu do Internetu, zabezpieczeń i sieci bezprzewodowej)',
      price: '120 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Konfiguracja lub ponowne uruchomienie urządzeń sieciowych (drukarka, skaner, router)\n(przywrócenie komunikacji w sieci lokalnej, ponowna instalacja i test urządzeń)',
      price: '100 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Udostępnianie plików i drukarek w sieci\n(tworzenie wspólnych zasobów w sieci lokalnej, konfiguracja uprawnień użytkowników)',
      price: '80 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Test prędkości i stabilności połączenia\n(pomiar wydajności i jakości łącza internetowego lub sieci wewnętrznej)',
      price: '50 zł',
      duration: 'do 24 h',
    },
    {
      service: 'Podłączenie nowych stanowisk do sieci\n(instalacja kabli, konfiguracja adresów IP i włączenie komputerów do sieci biurowej)',
      price: '70 zł\n/ stanowisko',
      duration: '1–3 dni',
    },
  ]
}

const updateNaprawyTasmaForOutsourcing = (sections: PricingSection[]) => {
  const naprawySection = sections.find(section => section.id === 'naprawy')
  const tasmaSubcategory = naprawySection?.subcategories?.find(
    sub => sub.id === 'naprawy-tasma'
  )
  if (!tasmaSubcategory) return

  tasmaSubcategory.title = 'Bezpieczeństwo i kopie zapasowe'
  tasmaSubcategory.items = [
    {
      service: 'Usuwanie wirusów, trojanów, adware\n(czyszczenie systemu z oprogramowania szkodliwego, przywrócenie stabilności i wydajności)',
      price: '150 zł',
      duration: '1–3 dni',
    },
    {
      service: 'Aktualizacja i konfiguracja antywirusa\n(instalacja, konfiguracja ochrony w czasie rzeczywistym, aktualizacja baz zagrożeń)',
      price: '80 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Konfiguracja zapory sieciowej (firewall)\n(ustawienie reguł dostępu, blokowanie nieautoryzowanych połączeń i zagrożeń sieciowych)',
      price: '100 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Wykonanie i test kopii zapasowej (backup + test odtwarzania)\n(tworzenie automatycznych kopii danych oraz kontrola poprawności odtwarzania)',
      price: '150 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Odzyskiwanie danych z dysku lub pendrive\'a (prosty przypadek)\n(odzyskanie skasowanych lub utraconych plików po awarii lub formatowaniu)',
      price: '250 zł',
      duration: '1–5 dni',
    },
    {
      service: 'Przywrócenie dostępu do systemu lub konta użytkownika (po błędzie lub infekcji)\n(naprawa uszkodzonych profili, reset uprawnień, przywrócenie logowania do systemu)',
      price: '200 zł',
      duration: '1–3 dni',
    },
  ]
}

const removeUnwantedSubcategoriesForOutsourcing = (sections: PricingSection[]) => {
  const naprawySection = sections.find(section => section.id === 'naprawy')
  if (!naprawySection?.subcategories) return

  // Удаляем три подкатегории: Naprawy elektroniczne, Oprogramowanie i konfiguracja, Usługi dodatkowe
  naprawySection.subcategories = naprawySection.subcategories.filter(
    sub =>
      sub.id !== 'naprawy-elektronika' &&
      sub.id !== 'naprawy-software' &&
      sub.id !== 'naprawy-dodatkowe'
  )

  // Добавляем footer для секции naprawy на странице Outsourcing IT
  naprawySection.footer = '"Pogotowie komputerowe" - interwencje serwisowe poza abonamentem'
}

const addAudytSubcategoryForOutsourcing = (sections: PricingSection[]) => {
  const naprawySection = sections.find(section => section.id === 'naprawy')
  if (!naprawySection?.subcategories) return

  // Проверяем, не существует ли уже эта подкатегория
  const existingAudyt = naprawySection.subcategories.find(sub => sub.id === 'naprawy-audyt')
  if (existingAudyt) return

  // Находим индекс подкатегории "naprawy-tasma" (Bezpieczeństwo i kopie zapasowe)
  const tasmaIndex = naprawySection.subcategories.findIndex(sub => sub.id === 'naprawy-tasma')

  // Создаем новую подкатегорию
  const audytSubcategory: PricingSubcategory = {
    id: 'naprawy-audyt',
    title: 'Audyt i optymalizacja IT (opcjonalnie / rozszerzenie)',
    items: [
      {
        service: 'Audyt infrastruktury komputerowej\n(kompleksowa kontrola stacji roboczych, serwerów i urządzeń sieciowych – wykrycie usterek sprzętowych i programowych)',
        price: '200 zł',
        duration: '1–3 dni',
      },
      {
        service: 'Analiza konfiguracji systemów i oprogramowania\n(ocena poprawności ustawień, legalności licencji oraz wydajności systemów operacyjnych i aplikacji)',
        price: '150 zł',
        duration: '1–2 dni',
      },
      {
        service: 'Optymalizacja środowiska pracy\n(usprawnienie działania komputerów biurowych, usunięcie zbędnych procesów, poprawa szybkości i stabilności systemów)',
        price: '120 zł',
        duration: '1–2 dni',
      },
      {
        service: 'Raport z audytu i rekomendacje modernizacji\n(szczegółowy raport z wynikami kontroli i sugestiami aktualizacji sprzętu, sieci i zabezpieczeń)',
        price: '100 zł',
        duration: '1–2 dni',
      },
      {
        service: 'Weryfikacja kopii zapasowych i bezpieczeństwa danych\n(sprawdzenie procedur tworzenia backupów, test odtwarzania danych, ocena zabezpieczeń przed utratą informacji)',
        price: '150 zł',
        duration: '1–3 dni',
      },
    ],
  }

  // Вставляем новую подкатегорию после "naprawy-tasma"
  if (tasmaIndex !== -1) {
    naprawySection.subcategories.splice(tasmaIndex + 1, 0, audytSubcategory)
  } else {
    // Если не нашли, просто добавляем в конец
    naprawySection.subcategories.push(audytSubcategory)
  }
}

const createOutsourcingItPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  const diagnosisItem = diagnosisSection?.items.find(
    item => item.service === 'Wycena naprawy (bez naprawy)'
  )
  if (diagnosisItem) {
    diagnosisItem.price = '90'
  }


  updateDojazdReturnPrice(sections, '100')
  updateKonserwacjaForOutsourcing(sections)
  updateNaprawyMechanizmForOutsourcing(sections)
  updateNaprawyKaretkaForOutsourcing(sections)
  updateNaprawyGlowicaForOutsourcing(sections)
  updateNaprawyTasmaForOutsourcing(sections)
  removeUnwantedSubcategoriesForOutsourcing(sections)
  addAudytSubcategoryForOutsourcing(sections)
  return sections
}


const updateDojazdReturnPrice = (sections: PricingSection[], price: string) => {
  const transportSection = sections.find(section => section.id === 'dojazd')
  const targetItem = transportSection?.items?.find(item =>
    item.service.startsWith('Dojazd (przy rezygnacji z naprawy)')
  )
  if (targetItem) {
    targetItem.price = price
  }
}

const updateNaprawyMechanizmForOutsourcing = (sections: PricingSection[]) => {
  const naprawySection = sections.find(section => section.id === 'naprawy')
  const mechanizmSubcategory = naprawySection?.subcategories?.find(
    sub => sub.id === 'naprawy-mechanizm'
  )
  if (!mechanizmSubcategory) return

  mechanizmSubcategory.title = 'Serwis ogólny (praca serwisanta u Klienta)'
  mechanizmSubcategory.items = [
    {
      service: 'Wizyta serwisanta u Klienta\n(pierwsza godzina pracy – diagnostyka i usunięcie drobnych usterek bezpośrednio w siedzibie Klienta)',
      price: '150 zł\n/ godzinę',
      duration: '1–3 dni',
    },
    {
      service: 'Każda kolejna rozpoczęta godzina pracy serwisanta\n(kontynuacja naprawy, konfiguracji lub wdrożenia po przekroczeniu pierwszej godziny)',
      price: '100 zł\n/ godzinę',
      duration: '—',
    },
    {
      service: 'Pomoc zdalna\n(diagnostyka lub konfiguracja systemu, urządzeń biurowych i oprogramowania online)',
      price: '120 zł\n/ godzinę',
      duration: 'do 24 h',
    },
    {
      service: 'Pilna interwencja\n(czas reakcji do 4 h w dni robocze – szybkie wsparcie w nagłych awariach)',
      price: '+50%\ndo ceny',
      duration: 'do 4 h',
    },
    {
      service: 'Usługi poza godzinami pracy / weekendy / święta\n(realizacja zleceń w trybie awaryjnym – po godzinach pracy serwisu)',
      price: '+100%\ndo ceny',
      duration: 'do 4 h',
    },
  ]
}

const createLaptopPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  const diagnosisItem = diagnosisSection?.items.find(
    item => item.service === 'Wycena naprawy (bez naprawy)'
  )
  if (diagnosisItem) {
    diagnosisItem.price = '90'
  }


  updateDojazdReturnPrice(sections, '100')
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (cleaningSection) {
    cleaningSection.items = [
      {
        service:
          'PODSTAWOWY (przegląd i profilaktyka)\n\nzakres usługi obejmuje:\n• czyszczenie wewnętrzne laptopa – usunięcie kurzu i zanieczyszczeń,\n• czyszczenie wentylatora oraz radiatora,\n• wymianę past termoprzewodzących CPU / GPU,\n• testy obciążeniowe oraz test temperatur,\n• czyszczenie zewnętrzne obudowy i klawiatury.',
        price: '120',
        duration: '1-3 dni',
      },
      {
        service:
          'STANDARD (standardowa konserwacja)\n\nzakres PODSTAWOWY +\n• wymiana / dopasowanie termopadów,\n• konserwacja portów,\n• krótki test pamięci RAM i dysku SMART.',
        price: '160',
        duration: '1-3 dni',
      },
      {
        service:
          'PREMIUM (pełna konserwacja)\n\nzakres STANDARD +\n• porządkowanie okablowania i kanałów powietrznych,\n• czyszczenie klawiatury i portów wewnętrznych sprężonym powietrzem bez rozkręcania,\n• aktualizacja BIOS/UEFI (jeśli wskazana),\n• długie testy obciążeniowe (CPU / GPU / RAM).',
        price: '200',
        duration: '1-3 dni',
      },
      {
        service:
          'SPECIALNE (po zalaniu laptopa)\n\nzakres usługi obejmuje:\n• demontaż całego laptopa,\n• identyfikacja obszarów zalania,\n• czyszczenie lub naprawa niesprawnych elementów,\n• zabezpieczenie antykorozyjne płyty głównej i podzespołów,\n• czyszczenie klawiatury i portów wewnętrznych,\n• testy diagnostyczne elektroniczne i programowe,\n• montaż laptopa,\n• odkurzenie i oczyszczenie wnętrza laptopa oraz uzupełnienie brakujących śrub (gratis).\n\nUwaga!!! Prosimy o wyłączenie laptopa i wyciągnięcie baterii natychmiast po zalaniu.',
        price: '200\n+ części',
        duration: '1-3 dni',
      },
    ]
  }
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const softwareSubcategory = serviceSection?.subcategories?.[0]
  if (softwareSubcategory) {
    softwareSubcategory.title = 'Oprogramowanie'
    softwareSubcategory.items = [
      {
        service:
          'Instalacja systemu Windows/Linux z aktualizacjami i sterownikami (bez zachowania danych) (Nie instalujemy oprogramowania bez ważnej i legalnej licencji. Pomagamy w zakupie licencji.)',
        price: '150',
        duration: '1-2 dni',
      },
      {
        service: 'Instalacja systemu z zachowaniem danych',
        price: '200',
        duration: '1-2 dni',
      },
      {
        service: 'Instalacja systemu operacyjnego MAC OS X',
        price: '250',
        duration: '1-2 dni',
      },
      {
        service:
          'Instalacja i konfiguracja oprogramowania (pakietów biurowych/multimedialnych) / sterowników',
        price: '120\n/ godzinę',
        duration: '1-2 dni',
      },
      {
        service:
          'Naprawa i optymalizacja systemu operacyjnego Windows (problemy z uruchomieniem systemu, zapętlanie się przy starcie, restartowanie się, zawieszanie się lub wolna praca)',
        price: '100',
        duration: '1-2 dni',
      },
      {
        service:
          'Kopia (odzyskanie) danych z uszkodzonego systemu\n(w przypadku awarii systemu Windows, aby odzyskać dokumenty, zdjęcia, filmy i inne pliki)',
        price: '150',
        duration: '1-3 dni',
      },
      {
        service: 'Przywracanie systemu z partycji Recovery (jeśli dostępne)',
        price: '100',
        duration: '1-2 dni',
      },
      {
        service: 'Rozwiązywanie problemów z aktualizacjami Windows (odzyskiwanie systemu po błędnej aktualizacji / BSOD)',
        price: '100-180',
        duration: '1-2 dni',
      },
      {
        service:
          'Odwirusownie (usunięcie wirusów, trojanów, spyware, malware, adware, ransomware i innych złośliwych programów)',
        price: '100',
        duration: '1-2 dni',
      },
      {
        service:
          'Usunięcie haseł systemowych, zabezpieczających system operacyjny, dysk lub BIOS (jeśli legalne i możliwe)',
        price: '100',
        duration: '1-2 dni',
      },
      {
        service: 'Odzyskiwanie haseł użytkownika (jeśli legalne)',
        price: '100',
        duration: '1-2 dni',
      },
      {
        service: 'Upgrade (aktualizacja) BIOS-u (bez uszkodzenia kości i wylutowania)',
        price: '50',
        duration: '1-2 dni',
      },
      {
        service: 'Reset / naprawa / rekonstrukcja UEFI/BIOS ustawień',
        price: '80-120',
        duration: '1-2 dni',
      },
      {
        service: 'Reset/odzyskiwanie BIOS/UEFI (po błędnym flashu / update)',
        price: '100',
        duration: '1-2 dni',
      },
      {
        service: 'Programowanie BIOS (odczyt / rewrite / flash z pliku)',
        price: '100',
        duration: '1-2 dni',
      },
      {
        service: 'Programowanie BIOSu po wylutowaniu w programatorze',
        price: '150',
        duration: '1-2 dni',
      },
      {
        service: 'Indywidualna konfiguracja/naprawa systemu Windows',
        price: '120\n/ godzinę',
        duration: '-',
      },
      {
        service: 'Zdalna pomoc informatyka',
        price: '120\n/ godzinę',
        duration: '-',
      },
    ]
  }
  const boardSubcategory = serviceSection?.subcategories?.[1]
  if (boardSubcategory) {
    boardSubcategory.title = 'Płyta główna / zasilanie / podzespoły'
    boardSubcategory.items = [
      {
        service: 'Wymiana płyty głównej (przekładka + konfiguracja)',
        price: '180 + część',
        duration: '1-3 dni',
      },
      {
        service: 'Naprawa płyty głównej (przerwane ścieżki, zimne luty, mikrolutowanie)',
        price: '200-350 + części',
        duration: '2-7 dni',
      },
      {
        service: 'Wymiana gniazda USB / HDMI / Audio / DC-jack, …',
        price: '150 + część',
        duration: '2-5 dni',
      },
      {
        service:
          'Wymiana lub przelutowanie uszkodzonego gniazda zasilającego (częste wkładanie/wyciąganie wtyczki zasilacza bądź spowodowane upadkiem laptopa)',
        price: '150 + część',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana baterii dla układu CMOS (BIOS) na płycie głównej',
        price: '50-150',
        duration: '1-3 dni',
      },
      {
        service: 'Naprawa układu ładowania (charge controller / MOSFET / BQ / ISL)',
        price: '180-260 + części',
        duration: '2-7 dni',
      },
      {
        service: 'Wymiana układów zasilania (PU, PD, KBC/EC)',
        price: '220-360 + części',
        duration: '3-7 dni',
      },
      {
        service: 'Wymiana przewodu (zewnętrzny kabel) / gniazda zasilacza',
        price: '50 + część',
        duration: '1 dzień',
      },
      {
        service: 'Wymiana / rozbudowa pamięci RAM + test stabilności',
        price: '70 + część',
        duration: '1-2 dni',
      },
      {
        service: 'Naprawa problemów z kartą sieciową (sterowniki / usługi / reset)',
        price: '60-120',
        duration: '1 dzień',
      },
      {
        service: 'Wymiana karty Wi-Fi (M.2 / miniPCIe) + konfiguracja',
        price: '90 + część',
        duration: '1-2 dni',
      },
      {
        service: 'Naprawa Bluetooth (sterowniki / konflikty / parowanie urządzeń)',
        price: '50-120',
        duration: '1-2 dni',
      },
      {
        service: 'Wymiana napędu / nagrywarki',
        price: '50 + część',
        duration: '1-3 dni',
      },
    ]
  }
  const coolingSubcategory = serviceSection?.subcategories?.[2]
  if (coolingSubcategory) {
    coolingSubcategory.title = 'Układ chłodzenia i czystość'
    coolingSubcategory.items = [
      {
        service: 'Diagnostyka układu chłodzenia (pomiar temperatur przed/po czyszczeniu)',
        price: '40',
        duration: '1 dzień',
      },
      {
        service: 'Wymiana wentylatora chłodzenia (montaż nowego)',
        price: '100 + część',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana radiatora',
        price: '100 + część',
        duration: '1-3 dni',
      },
      {
        service: 'Czyszczenie układu chłodzenia w laptopach gamingowych (2-3 wentylatory)',
        price: '220',
        duration: '1-3 dni',
      },
    ]
  }
  const disksSubcategory = serviceSection?.subcategories?.[3]
  if (disksSubcategory) {
    disksSubcategory.title = 'Dyski i dane'
    disksSubcategory.items = [
      {
        service: 'Diagnoza dysku + SMART / test powierzchni',
        price: '50',
        duration: '1-2 dni',
      },
      {
        service: 'Kopia zapasowa danych',
        price: '120',
        duration: '1-2 dni',
      },
      {
        service: 'Migracja danych / klonowanie dysku (stary dysk -> nowy dysk)',
        price: '80-140',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana dysku HDD -> SSD + migracja danych',
        price: '130 + nośnik',
        duration: '1-3 dni',
      },
      {
        service: 'Montaż dysku M.2 NVMe / SATA (z konfiguracją)',
        price: '120 + część',
        duration: '1-2 dni',
      },
    ]
  }
  const recoverySubcategory = serviceSection?.subcategories?.[4]
  if (recoverySubcategory) {
    recoverySubcategory.title = 'Odzyskanie / usuwanie danych'
    recoverySubcategory.items = getRecoveryItems()
  }
  const screenSubcategory = serviceSection?.subcategories?.[5]
  if (screenSubcategory) {
    screenSubcategory.title = 'Ekran i obudowa'
    screenSubcategory.items = [
      {
        service: 'Wymiana uszkodzonej matrycy LCD/LED (standard, bez klejenia)',
        price: '180 + część',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana taśmy sygnałowej matrycy (brak podświetlenia matrycy)',
        price: '120 + część',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana ramki ekranu (front bezel)',
        price: '100 + część',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana zawiasów',
        price: '120 + część',
        duration: '1-3 dni',
      },
      {
        service: 'Naprawa pękniętych mocowań zawiasów, obudowy (wzmocnienie / klejenie)',
        price: '140-240',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana obudowy – klapy ekranu (pokrywa matrycy) lub obudowy dolnej',
        price: '180 + część',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana kamery internetowej / mikrofonu / audio',
        price: '100 + część',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana lub uzupełnienie pojedynczych elementów obudowy (śruby, mocowania, klipsy)',
        price: '20-60',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana baterii wewnętrznej (integralnej w zamkniętej obudowie)',
        price: '120 + część',
        duration: '1-3 dni',
      },
      {
        service: 'Naprawa lub wymiana przycisku zasilania',
        price: '100 + część',
        duration: '1-3 dni',
      },
      {
        service: 'Przełożenie podzespołów do nowej obudowy',
        price: '250',
        duration: '1-3 dni',
      },
    ]
  }
  const keyboardSubcategory = serviceSection?.subcategories?.[6]
  if (keyboardSubcategory) {
    keyboardSubcategory.title = 'Klawiatura / touchpad'
    keyboardSubcategory.items = [
      {
        service: 'Czyszczenie klawiatury + dezynfekcja (bez rozkręcania / rozbierania)',
        price: '40',
        duration: 'od ręki',
      },
      {
        service: 'Czyszczenie klawiatury przykręcanej po zalaniu',
        price: '120',
        duration: '1-3 dni',
      },
      {
        service: 'Czyszczenie klawiatury zintegrowanej z obudową po zalaniu',
        price: '150',
        duration: '1-3 dni',
      },
      {
        service: 'Czyszczenie lub wymiana pojedynczego klawisza (keycap / stabilizator, jeśli możliwe)',
        price: '20-40 + część',
        duration: '1-3 dni',
      },
      {
        service: 'Naprawa lub wymiana klawiatury przykręcanej',
        price: '120 + część',
        duration: '1-3 dni',
      },
      {
        service: 'Naprawa lub wymiana klawiatury zintegrowanej z obudową (lutowanej lub klejonej)',
        price: '150 + część',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana klawiatury podświetlanej (RGB / LED)',
        price: '150 + część',
        duration: '1-3 dni',
      },
      {
        service: 'Naprawa lub wymiana touchpada (trackpad)',
        price: '120 + część',
        duration: '1-3 dni',
      },
    ]
  }
  return sections
}

const applyDesktopCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PODSTAWOWY (przegląd i profilaktyka)\n\nzakres usługi obejmuje:\n• demontarz obudowy,\n• czyszczenie wentylatorów i radiatorów,\n• wymiana past termoprzewodzących CPU/GPU,\n• usunięcie kurzu i zanieczyszczeń,\n• testy obciążeniowe + test temperatur.',
      price: '120',
      duration: '1-3 dni',
    },
    {
      service:
        'STANDARD (standardowa konserwacja)\n\nzakres PODSTAWOWY +\n• wymiana / dopasowanie termopadów,\n• konserwacja portów,\n• krótki test pamięci RAM i dysku SMART.',
      price: '160',
      duration: '1-3 dni',
    },
    {
      service:
        'PREMIUM (pełna konserwacja)\n\nzakres STANDARD +\n• porządkowanie okablowania i kanałów powietrznych,\n• czyszczenie klawiatury i portów wewnętrznych,\n• aktualizacja BIOS/UEFI (jeśli wskazana),\n• długie testy obciążeniowe (CPU / GPU / RAM).',
      price: '200',
      duration: '1-3 dni',
    },
  ]
}

const applyDesktopSoftwareSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const softwareSubcategory = serviceSection?.subcategories?.[0]
  if (!softwareSubcategory) return
  softwareSubcategory.title = 'Oprogramowanie'
  softwareSubcategory.items = [
    {
      service:
        'Instalacja systemu Windows/Linux z aktualizacjami i sterownikami (bez zachowania danych) (Nie instalujemy oprogramowania bez ważnej i legalnej licencji (pirackich wersji). Pomagamy w zakupie licencji.)',
      price: '150',
      duration: '1-2 dni',
    },
    {
      service: 'Instalacja systemu z zachowaniem danych',
      price: '200',
      duration: '1-2 dni',
    },
    {
      service: 'Instalacja systemu operacyjnego MAC OS X',
      price: '250',
      duration: '1-2 dni',
    },
    {
      service:
        'Instalacja i konfiguracja oprogramowania\n(pakietów biurowych/multimedialnych) / sterowników',
      price: '120\n/ godzinę',
      duration: '1-2 dni',
    },
    {
      service:
        'Naprawa i optymalizacja systemu operacyjnego Windows (problemy z uruchomieniem systemu, zapętlanie się przy starcie, restartowanie się, zawieszanie się lub wolna praca)',
      price: '100',
      duration: '1-2 dni',
    },
    {
      service:
        'Kopia (odzyskanie) danych z uszkodzonego systemu\n(w przypadku awarii systemu Windows, aby odzyskać dokumenty (word, excel, itp), zdjęcia, filmy i inne pliki)',
      price: '150',
      duration: '1-3 dni',
    },
    {
      service: 'Przywracanie systemu z partycji Recovery (jeśli dostępne)',
      price: '100',
      duration: '1-2 dni',
    },
    {
      service:
        'Rozwiązywanie problemów z aktualizacjami Windows (odzyskiwanie systemu po błędnej aktualizacji / BSOD)',
      price: '100-180',
      duration: '1-2 dni',
    },
    {
      service:
        'Odwirusownie (usunięcie wirusów, trojanów, spyware, malware, adware, ransomware i innych złośliwych programów)',
      price: '100',
      duration: '1-2 dni',
    },
    {
      service:
        'Usunięcie haseł systemowych, zabezpieczających system operacyjny, dysk lub BIOS (jeśli legalne i możliwe)',
      price: '100',
      duration: '1-2 dni',
    },
    {
      service: 'Odzyskiwanie haseł użytkownika (jeśli legalne)',
      price: '100',
      duration: '1-2 dni',
    },
    {
      service: 'Upgrade (aktualizacja) BIOS-u (bez uszkodzenia kości i wylutowania)',
      price: '50',
      duration: '1-2 dni',
    },
    {
      service: 'Reset / naprawa / rekonstrukcja UEFI/BIOS ustawień',
      price: '80-120',
      duration: '1-2 dni',
    },
    {
      service: 'Reset/odzyskiwanie BIOS/UEFI (po błędnym flashu / update)',
      price: '100',
      duration: '1-2 dni',
    },
    {
      service: 'Programowanie BIOS (odczyt / rewrite / flash z pliku)',
      price: '100',
      duration: '1-2 dni',
    },
    {
      service: 'Programowanie BIOSu po wylutowaniu w programatorze',
      price: '150',
      duration: '1-2 dni',
    },
    {
      service: 'Konfiguracja RAID (0/1/5/10)',
      price: '180',
      duration: '1-3 dni',
    },
    {
      service: 'Indywidualna konfiguracja/naprawa systemu Windows',
      price: '120 / godzinę',
      duration: '-',
    },
    {
      service: 'Zdalna pomoc informatyka',
      price: '120 / godzinę',
      duration: '-',
    },
  ]
}

const applyDesktopHardwareSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const hardwareSubcategory = serviceSection?.subcategories?.[1]
  if (!hardwareSubcategory) return
  hardwareSubcategory.title = 'Płyta główna / zasilanie / podzespoły'
  hardwareSubcategory.items = [
    {
      service: 'Wymiana procesora',
      price: '50 + część',
      duration: '1-3 dni',
    },
    {
      service: 'Wymiana płyty głównej (przekładka + konfiguracja)',
      price: '120 + część',
      duration: '1-3 dni',
    },
    {
      service:
        'Naprawa płyty głównej (przerwane ścieżki, zimne luty, mikrolutowanie)',
      price: '200-350 + części',
      duration: '2-7 dni',
    },
    {
      service: 'Wymiana gniazda USB / HDMI / Audio / DC-jack, …',
      price: '150 + część',
      duration: '2-5 dni',
    },
    {
      service:
        'Wymiana baterii dla układu CMOS (BIOS) na płycie głównej',
      price: '50',
      duration: '1-3 dni',
    },
    {
      service:
        'Naprawa układu ładowania (charge controller / MOSFET / BQ / ISL)',
      price: '180-260 + części',
      duration: '2-7 dni',
    },
    {
      service: 'Wymiana układów zasilania (PU, PD, KBC/EC)',
      price: '220-360 + części',
      duration: '3-7 dni',
    },
    {
      service:
        'Wymiana części/podzespołów w komputerze stacjonarnym\n(karta grafiki, pamięć RAM, …). Testy diagnostyczne',
      price: '50 + część',
      duration: '1-2 dni',
    },
    {
      service: 'Wymiana zasilacza',
      price: '50-120 + część',
      duration: '1-2 dni',
    },
    {
      service:
        'Naprawa problemów z kartą sieciową (sterowniki / usługi / reset)',
      price: '60-120',
      duration: '1 dzień',
    },
    {
      service:
        'Naprawa Bluetooth (sterowniki / konflikty / parowanie urządzeń)',
      price: '50-120',
      duration: '1-2 dni',
    },
    {
      service: 'Wymiana napędu / nagrywarki',
      price: '50 + część',
      duration: '1-3 dni',
    },
    {
      service: 'Naprawa przycisku POWER / panelu przedniego',
      price: '70 + części',
      duration: '1-3 dni',
    },
    {
      service: 'Wymiana obudowy (pełna przekładka)',
      price: '200',
      duration: '1-2 dni',
    },
    {
      service:
        'Montaż komputera stacjonarnego\n(możemy zamontować z części dostarczonych przez Klienta, lub zakupionych przez nas)',
      price: '120\n/ godzinę',
      duration: '1-3 dni',
    },
  ]
}

const applyDesktopCoolingSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const coolingSubcategory = serviceSection?.subcategories?.[2]
  if (!coolingSubcategory) return
  coolingSubcategory.title = 'Układ chłodzenia i czystość'
  coolingSubcategory.items = [
    {
      service:
        'Diagnostyka układu chłodzenia (pomiar temperatur przed/po czyszczeniu)',
      price: '40',
      duration: '1 dzień',
    },
    {
      service: 'Wymiana wentylatora chłodzenia (montaż nowego)',
      price: '50 + część',
      duration: '1-3 dni',
    },
    {
      service: 'Wymiana radiatora',
      price: '50 + część',
      duration: '1-3 dni',
    },
  ]
}

const applyDesktopStorageSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const storageSubcategory = serviceSection?.subcategories?.[3]
  if (!storageSubcategory) return
  storageSubcategory.title = 'Dyski i dane'
  storageSubcategory.items = [
    {
      service: 'Diagnoza dysku + SMART / test powierzchni',
      price: '50',
      duration: '1-2 dni',
    },
    {
      service: 'Kopia zapasowa danych',
      price: '120',
      duration: '1-2 dni',
    },
    {
      service:
        'Migracja danych / klonowanie dysku (stary dysk → nowy dysk)',
      price: '80-140',
      duration: '1-3 dni',
    },
    {
      service: 'Wymiana dysku HDD → SSD + migracja danych',
      price: '130 + nośnik',
      duration: '1-3 dni',
    },
    {
      service: 'Montaż dysku M.2 NVMe / SATA (z konfiguracją)',
      price: '120 + część',
      duration: '1-2 dni',
    },
  ]
}

const getRecoveryItems = (): PricingItem[] => [
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

const applyDesktopRecoverySubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const recoverySubcategory = serviceSection?.subcategories?.[4]
  if (!recoverySubcategory) return
  recoverySubcategory.title = 'Odzyskanie / usuwanie danych'
  recoverySubcategory.items = getRecoveryItems()
}

const removeDesktopExtraSubcategories = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  if (!serviceSection?.subcategories) return
  serviceSection.subcategories = serviceSection.subcategories.filter(
    subcategory =>
      subcategory.title !== 'Oprogramowanie i konfiguracja' &&
      subcategory.title !== 'Usługi dodatkowe'
  )
}

const applyLaserCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PODSTAWOWY (przegląd i profilaktyka)\n\nzakres usługi obejmuje:\n• czyszczenie wnętrza urządzenia (kurz, resztki tonera),\n• kontrola i czyszczenie rolek poboru papieru (pickup roller) / separatora,\n• kontrola głównych elementów mechanicznych,\n• szybki przegląd sekcji obrazu i utrwalania (drum / transfer / fuser),\n• test jakości wydruku.',
      price: '50 / 100 / 150',
      duration: '1-3 dni',
    },
    {
      service:
        'STANDARD (standardowa konserwacja)\n\nzakres PODSTAWOWY +\n• czyszczenie czujników papieru,\n• czyszczenie elementów prowadzenia papieru,\n• smarowanie głównych elementów mechanicznych,\n• sprawdzenie modułu bębna i pasa transferowego.',
      price: '100 / 150 / 200',
      duration: '1-3 dni',
    },
    {
      service:
        'PREMIUM (pełna konserwacja)\n\nzakres STANDARD +\n• czyszczenie optyki lasera,\n• konserwacja modułu bębna, pasa transferowego i fusera,\n• reset liczników serwisowych (jeśli możliwe),\n• kontrola tonera i pojemnika na zużyty toner (ew. czyszczenie / wymiana),\n• kalibracja kolorów i rejestracji.',
      price: '150 / 200 / 250',
      duration: '1-3 dni',
    },
  ]
}

const apply3DPrinterCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PODSTAWOWY (przegląd i profilaktyka)\n\nzakres usługi obejmuje:\n• czyszczenie wszelkich prowadnic, śrub i osi (kurz, filament, zanieczyszczenia)\n• kontrola i czyszczenie ekstrudera oraz hotendu\n• sprawdzenie i czyszczenie stołu roboczego oraz układu podawania filamentu\n• szybki przegląd układu elektronicznego i złączy\n• test kalibracji podstawowej (osi X / Y / Z)',
      price: '150',
      duration: '1–3 dni',
    },
    {
      service:
        'STANDARD (standardowa konserwacja)\n\nzakres PODSTAWOWY +\n• czyszczenie napinaczy pasów i kontrola przesunięć osi\n• smarowanie prowadnic liniowych i śrub\n• regulacja naciągu pasków i prowadzeń\n• kontrola i czyszczenie czujników oraz krańcówek',
      price: '200',
      duration: '1–3 dni',
    },
    {
      service:
        'PREMIUM (pełna konserwacja)\n\nzakres STANDARD +\n• precyzyjna kalibracja stołu (auto-bed leveling / mesh)\n• pełne czyszczenie ekstrudera + wymiana tulei PTFE\n• kontrola i optymalizacja chłodzenia (wentylatory, kanały)\n• reset i aktualizacja firmware (jeśli możliwe)\n• test jakości wydruku i korekta parametrów',
      price: '250',
      duration: '1–3 dni',
    },
  ]
}

const apply3DPrinterMechanicsSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const mechanicsSubcategory = serviceSection?.subcategories?.[0]
  if (!mechanicsSubcategory) return
  mechanicsSubcategory.title = 'Mechanika i układ ruchu (osie, paski, ekstruder)'
  mechanicsSubcategory.items = [
    {
      service: 'Regulacja i kalibracja osi X / Y / Z\n(nierówne warstwy, przesunięcia, stuki podczas ruchu)',
      price: '150 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Regulacja lub wymiana pasków i napinaczy\n(luzy, przeskakiwanie, utrata dokładności druku)',
      price: '180 zł + części',
      duration: '1–3 dni',
    },
    {
      service: 'Serwis ekstrudera i hotendu\n(zatykanie, brak podawania filamentu, wycieki)',
      price: '200 zł + części',
      duration: '1–3 dni',
    },
    {
      service: 'Czyszczenie i naprawa układu podawania filamentu\n(ślizganie filamentu, nieregularne podawanie)',
      price: '150 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Naprawa systemu chłodzenia (wentylatory, kanały)\n(przegrzewanie, deformacje wydruku)',
      price: '150 zł + części',
      duration: '1–2 dni',
    },
  ]
}

const apply3DPrinterElectronicsSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const electronicsSubcategory = serviceSection?.subcategories?.[1]
  if (!electronicsSubcategory) return
  electronicsSubcategory.title = 'Elektronika i sterowanie (płyta główna, czujniki, okablowanie)'
  electronicsSubcategory.items = [
    {
      service: 'Diagnostyka i naprawa płyty głównej\n(błędy systemowe, brak reakcji, resetowanie się drukarki)',
      price: '200 zł + części',
      duration: '1–3 dni',
    },
    {
      service: 'Wymiana lub naprawa czujników (endstop, BL-Touch, termistory)\n(błędy osi, problemy z poziomowaniem, błędy temperatury)',
      price: '150 zł + części',
      duration: '1–2 dni',
    },
    {
      service: 'Naprawa lub wymiana okablowania i złączy\n(przerywanie pracy, zaniki sygnału, niestabilność)',
      price: '150 zł + części',
      duration: '1–2 dni',
    },
    {
      service: 'Naprawa układów zasilania (zasilacz, przewody)\n(brak zasilania, wyłączanie się drukarki)',
      price: '180 zł + części',
      duration: '1–3 dni',
    },
    {
      service: 'Wgrywanie, reset i konfiguracja firmware\n(błędy oprogramowania, nieprawidłowe działanie po aktualizacji)',
      price: '120 zł',
      duration: '1 dzień',
    },
  ]
}

const apply3DPrinterCalibrationSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const calibrationSubcategory = serviceSection?.subcategories?.[2]
  if (!calibrationSubcategory) return
  calibrationSubcategory.title = 'Kalibracja i jakość druku'
  calibrationSubcategory.items = [
    {
      service: 'Precyzyjna kalibracja poziomowania stołu (manual / auto-bed leveling)\n(problemy z pierwszą warstwą, słaba przyczepność)',
      price: '150 zł',
      duration: '1 dzień',
    },
    {
      service: 'Kalibracja ekstrudera (E-steps, flow, retrakcja)\n(nitkowanie, niedolewanie, przelewanie filamentu)',
      price: '150 zł',
      duration: '1 dzień',
    },
    {
      service: 'Kalibracja osi i geometrii drukarki\n(przekoszenia, nierówne ściany, przesunięcia warstw)',
      price: '180 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Testy jakości wydruku i korekta profilu materiału\n(PLA, PETG, ABS, TPU)',
      price: '150 zł',
      duration: '1 dzień',
    },
    {
      service: 'Optymalizacja parametrów pod konkretny model / detal\n(druk techniczny, dokładność wymiarowa)',
      price: '200 zł',
      duration: '1–2 dni',
    },
  ]
}

const apply3DPrinterSoftwareSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const softwareSubcategory = serviceSection?.subcategories?.[3]
  if (!softwareSubcategory) return
  softwareSubcategory.title = 'Oprogramowanie i konfiguracja'
  softwareSubcategory.items = [
    {
      service: 'Instalacja i konfiguracja firmware (Marlin, Klipper, itp.)\n(błędy systemowe, potrzeba aktualizacji lub zmiany funkcji)',
      price: '150 zł',
      duration: '1 dzień',
    },
    {
      service: 'Konfiguracja slicera i profili materiałów\n(Cura, PrusaSlicer, Bambu Studio itp.)',
      price: '120 zł',
      duration: '1 dzień',
    },
    {
      service: 'Integracja z siecią i zdalne sterowanie (OctoPrint, Klipper UI)\n(zdalny monitoring, sterowanie z telefonu/PC)',
      price: '150 zł',
      duration: '1 dzień',
    },
    {
      service: 'Backup i przywracanie ustawień drukarki\n(po awarii, aktualizacji, wymianie elektroniki)',
      price: '100 zł',
      duration: '1 dzień',
    },
    {
      service: 'Szkolenie z obsługi i konfiguracji drukarki\n(dla nowych użytkowników lub firm)',
      price: '150 zł / godz.',
      duration: 'wg ustaleń',
    },
  ]
}

const apply3DPrinterAdditionalSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const additionalSubcategory = serviceSection?.subcategories?.[4]
  if (!additionalSubcategory) return
  additionalSubcategory.title = 'Dodatkowe usługi (tuning i modyfikacje)'
  additionalSubcategory.items = [
    {
      service: 'Montaż i konfiguracja auto-levelingu (BL-Touch, CR-Touch itp.)',
      price: '200 zł + części',
      duration: '1–2 dni',
    },
    {
      service: 'Upgrade ekstrudera (direct drive, all-metal hotend)',
      price: '250 zł + części',
      duration: '1–3 dni',
    },
    {
      service: 'Modyfikacje pod materiały techniczne (ABS, nylon, CF)\n(komora, chłodzenie, ustawienia)',
      price: '200 zł + części',
      duration: '1–3 dni',
    },
    {
      service: 'Usuwanie poważnych zatorów i regeneracja hotendu\n(cold pull, czyszczenie chemiczne, wymiana elementów)',
      price: '180 zł + części',
      duration: '1–2 dni',
    },
    {
      service: 'Indywidualne modyfikacje na zamówienie\nwycena indywidualna wg ustaleń',
      price: '—',
      duration: '—',
    },
  ]
}


const applyPlotterCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PODSTAWOWY (przegląd i profilaktyka)\n\nzakres usługi obejmuje:\n• czyszczenie wszystkich prowadnic, rolek i elementów mechanicznych — usuwanie kurzu, zanieczyszczeń i resztek materiałów drukujących\n• kontrola i czyszczenie układu podawania papieru / mediów drukujących\n• sprawdzenie i usunięcie zatorów w kanałach transportu materiału\n• kontrola i czyszczenie układu atramentowego / głowicy drukującej od strony użytkownika\n• czyszczenie powierzchni roboczej i obszarów kontaktu z materiałem\n• szybki przegląd układu elektronicznego i złączy\n• test podstawowej kalibracji osi i pozycji elementów',
      price: '349 zł',
      duration: '1–3 dni',
    },
    {
      service:
        'STANDARD (rozszerzona konserwacja)\n\nzakres PODSTAWOWY +\n• czyszczenie i regulacja napinaczy, pasów napędowych i prowadnic\n• smarowanie prowadnic liniowych, rolek i elementów ruchomych\n• kontrola i czyszczenie sensorów oraz krańcówek\n• sprawdzenie systemów odsysania / wspomagających (jeśli występują)\n• kontrola i czyszczenie elementów chłodzenia (jeśli występują)',
      price: '499 zł',
      duration: '1–3 dni',
    },
    {
      service:
        'PREMIUM (pełna konserwacja techniczna)\n\nzakres STANDARD +\n• precyzyjna kalibracja osi X/Y oraz toru transportu mediów\n• zaawansowane czyszczenie głowicy (manualne + chemiczne) i kanałów atramentu\n• pełny przegląd wszystkich podzespołów ruchomych i sensorów\n• kontrola i optymalizacja chłodzenia\n• reset i aktualizacja firmware (jeśli możliwe)\n• test wydruku i korekta parametrów po testach',
      price: '699 zł',
      duration: '2–4 dni',
    },
  ]
}

const applyPlotterMechanicsSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const mechanicsSubcategory = serviceSection?.subcategories?.find(sub => sub.id === 'plotter-mechanics')
  if (!mechanicsSubcategory) return
  mechanicsSubcategory.title = 'Mechanika i transport mediów'
  mechanicsSubcategory.items = [
    {
      service: 'Regulacja toru przesuwu papieru\n(krzywe prowadzenie, przekosy wydruku)',
      price: '180 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Czyszczenie i regulacja rolek transportowych\n(ślizganie się papieru, zatrzymywanie wydruku)',
      price: '180 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Wymiana rolek transportowych (bez części)\n(zużyte rolki, błędy podawania)',
      price: '220 zł + części',
      duration: '1–3 dni',
    },
    {
      service: 'Naprawa mechanizmu podajnika roli\n(brak pobierania materiału)',
      price: '250 zł + części',
      duration: '1–3 dni',
    },
    {
      service: 'Usuwanie zacięć w torze papieru\n(blokady wewnątrz urządzenia)',
      price: '150 zł',
      duration: 'do 1 dnia',
    },
  ]
}

const applyPlotterInkSystemSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const inkSubcategory = serviceSection?.subcategories?.find(sub => sub.id === 'plotter-ink')
  if (!inkSubcategory) return
  inkSubcategory.title = 'Układ atramentowy i głowice'
  inkSubcategory.items = [
    {
      service: 'Serwis stacji serwisowej (capping, wiper)\n(zasychanie głowic, smugi)',
      price: '200 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Ręczne czyszczenie głowicy\n(brakujące linie, pasy)',
      price: '200 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Płukanie układu atramentowego\n(zasychający atrament)',
      price: '250 zł',
      duration: '1–3 dni',
    },
    {
      service: 'Wymiana głowicy (bez części)\n(uszkodzona głowica)',
      price: '200 zł + części',
      duration: '1–2 dni',
    },
    {
      service: 'Odpowietrzanie układu atramentu\n(przerywany wydruk)',
      price: '180 zł',
      duration: '1–2 dni',
    },
  ]
}

const applyPlotterElectronicsSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const electronicsSubcategory = serviceSection?.subcategories?.find(sub => sub.id === 'plotter-electronics')
  if (!electronicsSubcategory) return
  electronicsSubcategory.title = 'Elektronika i czujniki'
  electronicsSubcategory.items = [
    {
      service: 'Diagnostyka elektroniki\n(błędy systemowe, brak startu)',
      price: '150 zł',
      duration: 'do 1 dnia',
    },
    {
      service: 'Wymiana czujników i enkoderów (bez części)\n(błędy pozycji)',
      price: '180 zł + części',
      duration: '1–2 dni',
    },
    {
      service: 'Naprawa okablowania\n(losowe błędy)',
      price: '180 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Naprawa płyty sterującej\n(brak komunikacji)',
      price: 'od 250 zł',
      duration: '2–4 dni',
    },
  ]
}

const applyPlotterCalibrationSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const calibrationSubcategory = serviceSection?.subcategories?.find(sub => sub.id === 'plotter-calibration')
  if (!calibrationSubcategory) return
  calibrationSubcategory.title = 'Kalibracja i jakość wydruku'
  calibrationSubcategory.items = [
    {
      service: 'Kalibracja przesuwu i osi\n(rozjechane linie)',
      price: '180 zł',
      duration: 'do 1 dnia',
    },
    {
      service: 'Kalibracja kolorów i profili\n(różnice kolorów)',
      price: '250 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Usuwanie pasów i artefaktów\n(smugi, nierówności)',
      price: '200 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Test wydruku z korektą ustawień\n(kontrola jakości)',
      price: '150 zł',
      duration: 'do 1 dnia',
    },
  ]
}

const applyPlotterSoftwareSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const softwareSubcategory = serviceSection?.subcategories?.find(sub => sub.id === 'plotter-software')
  if (!softwareSubcategory) return
  softwareSubcategory.title = 'Oprogramowanie i konfiguracja'
  softwareSubcategory.items = [
    {
      service: 'Aktualizacja firmware\n(błędy systemowe)',
      price: '120 zł',
      duration: 'do 1 dnia',
    },
    {
      service: 'Konfiguracja sterowników / RIP\n(problemy z formatem)',
      price: '180 zł',
      duration: 'do 1 dnia',
    },
    {
      service: 'Konfiguracja sieciowa\n(brak połączenia)',
      price: '150 zł',
      duration: 'do 1 dnia',
    },
    {
      service: 'Pełna rekonfiguracja po awarii\n(reset + kalibracja)',
      price: '220 zł',
      duration: '1–2 dni',
    },
  ]
}

const applyLaserPaperFeedSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const paperSubcategory = serviceSection?.subcategories?.[0]
  if (!paperSubcategory) return
  paperSubcategory.title =
    'Mechanizm poboru papieru, rolki, separatory, … (zacina, lub nie pobiera papieru)'
  paperSubcategory.items = [
    {
      service:
        'Usuwanie zaciętego papieru / ciał obcych z toru papieru\n(spinacze, resztki papieru, kurz, ... - typowa przyczyna powtarzających się zacięć)',
      price: '40 / 70 / 100',
      duration: 'od ręki',
    },
    {
      service:
        'Czyszczenie lub wymiana rolki pobierającej i separatora\n(usuwa zacięcia, „pobieranie kilku kartek naraz”, ślizganie papieru)',
      price: '80 / 120 / 160 + części',
      duration: '1-2 dni',
    },
    {
      service:
        'Czyszczenie lub wymiana prowadnic, rolek lub klap rejestracji papieru.\nRównież w module duplex, eliminuje przechylone wydruki i „krzywe prowadzenie”',
      price: '90 / 140 / 180 + części',
      duration: '1-3 dni',
    },
    {
      service:
        'Czyszczenie lub wymiana czujników papieru (optycznych i mechanicznych)\n(usuwa błędy typu „brak papieru”, zatrzymania papieru, fałszywe komunikaty)',
      price: '80 / 130 / 170 + części',
      duration: '1-2 dni',
    },
    {
      service:
        'Naprawa lub wymiana sprzęgła poboru / solenoidu\n(typowa usterka HP/Brother – papier wchodzi za wcześnie lub wcale nie wchodzi)',
      price: '100 / 150 / 200 + części',
      duration: '1-3 dni',
    },
  ]
}

const applyLaserOpticsSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const opticsSubcategory =
    serviceSection?.subcategories?.find(sub => sub.id === 'naprawy-glowica') ||
    serviceSection?.subcategories?.find(
      sub => sub.title === 'Głowica drukująca i układ tuszu'
    )

  if (!opticsSubcategory) return

  opticsSubcategory.title = 'Optyka i laser'
  opticsSubcategory.items = [
    {
      service:
        'Czyszczenie modułu lasera / lusterek skanera\n(usuwa blade wydruki, pasy, brak czerni – przywraca właściwy kontrast)',
      price: '120 / 180 / 240',
      duration: '1–3 dni',
    },
    {
      service:
        'Wymiana modułu lasera (DC Controller / LSU)\n(rozwiązuje całkowity brak wydruku lub komunikat „błąd lasera”)',
      price: '220 / 320 / 450 + części',
      duration: '1–3 dni',
    },
    {
      service:
        'Usunięcie komunikatu „Błąd lasera / błąd LSU / błąd skanera optycznego”\n(diagnostyka + kalibracja + czyszczenie)',
      price: '120 / 180 / 240',
      duration: '1–3 dni',
    },
    {
      service:
        'Wymiana taśmy / przewodów sterujących modułem optycznym\n(usuwa zaniki wydruku spowodowane przerwą lub niestabilnym sygnałem)',
      price: '80 / 130 / 180 + części',
      duration: '1–3 dni',
    },
  ]
}

const applyLaserScannerSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const scannerSubcategory = serviceSection?.subcategories?.find(
    subcategory => subcategory.title === 'Skaner / ADF'
  )
  if (!scannerSubcategory) return
  scannerSubcategory.title = 'Skaner / ADF (dla MFP)'
  scannerSubcategory.items = [
    {
      service:
        'Czyszczenie optyki skanera (lustra, soczewki, lampa LED/CCD).\nUsuwanie pasów i smug spowodowanych zabrudzeniem optyki',
      price: '120 / 160 / 250',
      duration: '1-3 dni',
    },
    {
      service:
        'Naprawa mechanizmu skanera (optyka, napęd, prowadnice)',
      price: '130 / 180 / 230\n+ części',
      duration: '2-5 dni',
    },
    {
      service:
        'Wymiana silnika napędu skanera',
      price: '140 / 200 / 250\n+ część',
      duration: '2-5 dni',
    },
    {
      service:
        'Wymiana taśmy transmisyjnej CCD / przewodu sygnałowego skanera',
      price: '150 / 200 / 250\n+ część',
      duration: '2-5 dni',
    },
    {
      service: 'Wymiana szkła skanera (głównego)',
      price: '150 / 200 / 250\n+ części',
      duration: '2-5 dni',
    },
    {
      service:
        'Czyszczenie lub wymiana rolek ADF i separatorów\n(zapobiega pobieraniu wielu kartek naraz)',
      price: '100 / 150 / 200\n+ części',
      duration: '2-5 dni',
    },
    {
      service:
        'Czyszczenie szyby skanera i szyby „pod ADF”\n(usuwa smugi i linie przy skanowaniu)',
      price: '60 / 90 / 120',
      duration: '-',
    },
    {
      service:
        'Wymiana wąskiej szyby pod ADF\n(tzw. „szyba skanowania z podajnika”)',
      price: '100 / 150 / 200\n+ część',
      duration: '1-3 dni',
    },
    {
      service: 'Naprawa silnika ADF / sprzęgła pobierania',
      price: '150 / 200 / 250\n+ część',
      duration: '1-4 dni',
    },
  ]
}

const applyLaserImagingSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const imagingSubcategory = serviceSection?.subcategories?.[1]
  if (!imagingSubcategory) return
  imagingSubcategory.title =
    'Bęben, pas transferowy, fuser (moduły obrazu i utrwalania)'
  imagingSubcategory.items = [
    {
      service:
        'Wymiana bębna obrazującego i listwy czyszczącej bębna (cleaning blade)\n(drum / image unit). Reset licznika. Kalibracja kolorów / rejestracji po wymianie modułów\n(eliminuje pasy i zabrudzenia powtarzalne na kartce)',
      price: '120 / 170 / 240 + części',
      duration: '1-3 dni',
    },
    {
      service:
        'Wymiana pasa transferowego lub rolki transferowej.\nKalibracja kolorów / rejestracji po wymianie modułów\n(usuwa kolorowe smugi, przesunięcia kolorów i brudzenie papieru)',
      price: '160 / 240 / 320 + części',
      duration: '1-3 dni',
    },
    {
      service:
        'Czyszczenie pasa transferowego i rolek prowadzących\n(zapobiega przenoszeniu tonera i powtarzalnym zabrudzeniom)',
      price: '80 / 120 / 160',
      duration: '1-2 dni',
    },
    {
      service:
        'Wymiana listwy czyszczącej pasa transferowego.\nKalibracja kolorów / rejestracji po wymianie modułów',
      price: '80 / 120 / 160 + części',
      duration: '1-3 dni',
    },
    {
      service:
        'Regeneracja / serwis zespołu utrwalającego (fuser)\n(czyszczenie, wymiana folii / wałka dociskowego, elementu grzejnego, termistora, bezpiecznika fusera, kół zębatych, łożysk, tulei, smarowanie, testy - usuwa rozmazywanie tonera i zaginanie papieru)',
      price: '150 / 200 / 250 + części',
      duration: '1-3 dni',
    },
    {
      service: 'Wymiana w całości zespołu utrwalającego (fuser)',
      price: '150 / 220 / 300 + część',
      duration: '1-2 dni',
    },
    {
      service:
        'Reset liczników modułów obrazu (usuwa komunikaty „wymień bęben / fuser / pas” po wymianie)',
      price: '40 / 70 / 100',
      duration: '1-2 dni',
    },
  ]
}

const applyLaserElectronicsSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const electronicsSubcategory = serviceSection?.subcategories?.[3]
  if (!electronicsSubcategory) return
  electronicsSubcategory.title = 'Naprawy elektroniczne'
  electronicsSubcategory.items = [
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
        'Naprawa lub wymiana modułu HV (wysokiego napięcia)\ndla sekcji obrazu / transferu',
      price: '160 / 260 / 330\n+ część',
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
  ]
}

const applyLaserSoftwareSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const softwareSubcategory = serviceSection?.subcategories?.find(
    subcategory => subcategory.title === 'Oprogramowanie i konfiguracja'
  )
  if (!softwareSubcategory) return
  softwareSubcategory.items = [
    {
      service:
        'Instalacja sterowników i konfiguracja w sieci (router / Wi-Fi / LAN /) (zdalnie lub lokalnie)',
      price: '50 / 100 / 150',
      duration: '1-2 dni',
    },
    {
      service:
        'Instalacja aplikacji mobilnych (AirPrint / Mopria / aplikacje producenta) (drukowanie ze smartfona bez kabli)',
      price: '50 / 80 / 110',
      duration: '1 dzień',
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
        'Konfiguracja skanowania do komputera (SMB/FTP) (skany trafiają bezpośrednio do folderu użytkownika)',
      price: '70 / 110 / 150',
      duration: '1-2 dni',
    },
    {
      service:
        'Konfiguracja skanowania do e-mail (SMTP, TLS, porty, uwierzytelnienie) / do chmury (Google Drive / OneDrive / SharePoint) (skanowanie jednym przyciskiem)',
      price: '100 / 150 / 200',
      duration: '1-2 dni',
    },
    {
      service:
        'Konfiguracja panelu webowego drukarki (IP, DHCP, DNS, zabezpieczenia) (ustawienia sieciowe pod kontrolą)',
      price: '60 / 100 / 140',
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
        'Zabezpieczenie dostępu (PIN / hasło administratora) (chroni urządzenie przed nieautoryzowanym użyciem)',
      price: '60 / 90 / 120',
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
  ]
}

const applyLaserAdditionalSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const additionalSubcategory = serviceSection?.subcategories?.find(
    subcategory => subcategory.title === 'Usługi dodatkowe'
  )
  if (!additionalSubcategory) return
  additionalSubcategory.title = 'Dodatkowe usługi'
  additionalSubcategory.items = [
    {
      service:
        'Odkurzanie wnętrza po rozsypaniu tonera (podstawowe czyszczenie)',
      price: '100 / 150 / 200',
      duration: '1-2 dni',
    },
    {
      service:
        'Czyszczenie po „silnym zalaniu tonerem”\n(pełna dekontaminacja i demontaż wszystkich podzespołów drukarki)',
      price: '200 / 280 / 360',
      duration: '1-3 dni',
    },
    {
      service:
        'Wymiana wadliwego toneru lub po wyczerpaniu proszku.\nCzyszczenie gniazda tonera',
      price: '20 / 40 / 60 + koszt tonera',
      duration: '1 dzień',
    },
    {
      service: 'Wymiana pojemnika na zużyty toner (waste toner)',
      price: '60 / 90 / 120\n+ część',
      duration: '1 dzień',
    },
    {
      service: 'Ocena stanu urządzenia przed zakupem (ekspertyza)',
      price: '40 / 60 / 80',
      duration: '1 dzień',
    },
    {
      service: 'Drukarka zastępcza (na czas naprawy)',
      price: 'Link',
      duration: '1 dzień',
      link: '/uslugi/drukarka-zastepcza',
    },
    {
      service:
        'NOWOŚĆ – Odnowienie obudowy (wybielenie pożółkłego plastiku)\nUsługa estetyczna polegająca na przywróceniu pierwotnego koloru obudowy drukarki poprzez wybielenie plastiku, który zżółkł pod wpływem światła i promieniowania UV. Obejmuje demontaż, wybielenie UV, czyszczenie oraz ponowny montaż obudowy.\nUwagi: efekt zależy od rodzaju tworzywa i stopnia zżółknięcia; w przypadku silnych przebarwień możliwa dopłata +20–40 zł.',
      price: '70 / 90 / 120',
      duration: '1-5 dni',
    },
  ]
}

const applyInkjetPaperFeedSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const paperSubcategory =
    serviceSection?.subcategories?.find(sub => sub.id === 'naprawy-mechanizm') ||
    serviceSection?.subcategories?.find(sub =>
      sub.title?.includes('Mechanizm poboru papieru')
    )

  if (!paperSubcategory) return

  paperSubcategory.items = [
    {
      service:
        'Czyszczenie lub wymiana rolki pobierającej / separatora\nusuwa zacięcia, „pobiera kilka kartek”',
      price: '80 / 120 / 160\n+ części',
      duration: '1-2 dni',
    },
    {
      service:
        'Czyszczenie czujników papieru\nusuwa fałszywe komunikaty „brak papieru”',
      price: '80 / 130 / 170',
      duration: '1-2 dni',
    },
    {
      service:
        'Regulacja prowadnic i rolek rejestracji papieru\nwyrównuje tor papieru, zmniejsza zacięcia',
      price: '90 / 140 / 180\n+ części',
      duration: '1-3 dni',
    },
    {
      service:
        'Naprawa mechanizmu poboru papieru\neliminuje ślizganie i blokady',
      price: '100 / 150 / 200\n+ części',
      duration: '1-3 dni',
    },
  ]
}

const applyInkjetCarriageSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const carriageSubcategory =
    serviceSection?.subcategories?.find(sub => sub.id === 'naprawy-karetka') ||
    serviceSection?.subcategories?.find(sub =>
      sub.title?.includes('Karetka i napęd')
    )

  if (!carriageSubcategory) return
  carriageSubcategory.title = 'Karetka i napęd (pasek, enkoder)'

  carriageSubcategory.items = [
    {
      service:
        'Czyszczenie i smarowanie prowadnic karetki\nusuwa szarpanie i hałas',
      price: '80 / 130 / 170',
      duration: '1-2 dni',
    },
    {
      service: 'Wymiana paska napędowego karetki\nusuwa „zgrzyt”',
      price: '120 / 170 / 220 + część',
      duration: '1-3 dni',
    },
    {
      service:
        'Czyszczenie / wymiana taśmy enkodera\nusuwa przesunięcia i cienie',
      price: '100 / 150 / 200 + część',
      duration: '1-3 dni',
    },
    {
      service:
        'Naprawa silnika karetki / mechanizmu przesuwu\ndrukarka nie rusza głowicy',
      price: '140 / 200 / 260 + część',
      duration: '1-5 dni',
    },
  ]
}

const applyInkjetHeadSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const headSubcategory =
    serviceSection?.subcategories?.find(sub => sub.id === 'naprawy-glowica') ||
    serviceSection?.subcategories?.find(sub =>
      sub.title?.includes('Głowica drukująca i układ tuszu')
    )

  if (!headSubcategory) return
  headSubcategory.title = 'Głowica drukująca i układ tuszu'

  headSubcategory.items = [
    {
      service: 'Udrażnianie głowicy drukującej\nusuwa przerwy w druku',
      price: '120 / 170 / 220',
      duration: '1-3 dni',
    },
    {
      service:
        'Płukanie i odpowietrzanie układu tuszu\nzapobiega pęcherzykom',
      price: '130 / 180 / 230 + materiał',
      duration: '1-3 dni',
    },
    {
      service: 'Wymiana głowicy drukującej\ngdy udrażnianie nie działa',
      price: '120 / 170 / 220 + część',
      duration: '1-3 dni',
    },
    {
      service: 'Serwis stacji serwisowej\nczyści głowicę',
      price: '120 / 170 / 220 + części',
      duration: '1-3 dni',
    },
    {
      service: 'Reset blokad serwisowych\nodblokowuje drukarkę',
      price: '80 / 120 / 160',
      duration: '1 dzień',
    },
    {
      service:
        'Czyszczenie/wymiana pochłaniacza tuszu\npampers – gąbki',
      price: '80 / 120 / 160 + materiał',
      duration: '1-2 dni',
    },
  ]
}

const applyInkjetElectronicsSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const electronicsSubcategory =
    serviceSection?.subcategories?.find(sub => sub.id === 'naprawy-elektronika') ||
    serviceSection?.subcategories?.find(sub =>
      sub.title?.includes('Naprawy elektroniczne')
    )

  if (!electronicsSubcategory) return

  electronicsSubcategory.items = [
    {
      service:
        'Naprawa lub wymiana złączki lub gniazda LAN/USB uszkodzone / poluzowane\n(usuwa brak wykrywania drukarki przez komputer / LAN)',
      price: '90 / 130 / 170\n+ części',
      duration: '1-3 dni',
    },
    {
      service:
        'Naprawa lub wymiana zasilacza (PSU / płytka zasilająca)\n(po awarii po przepięciu / skoku napięcia)',
      price: '150 / 200 / 250 + części',
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
      price: '160 / 220 / 280 + części',
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
        'Naprawa lub wymiana modułu HV (wysokiego napięcia) dla sekcji obrazu / transferu',
      price: '160 / 260 / 330 + część',
      duration: '2-5 dni',
    },
    {
      service:
        'Naprawa lub wymiana wentylatora / modułu chłodzenia\n(hałas, przegrzewanie, zabrudzenie)',
      price: '90 / 130 / 170 + części',
      duration: '1-3 dni',
    },
    {
      service: 'Wymiana taśm sygnałowych / kabli wewnętrznych',
      price: '70 / 110 / 150 + część',
      duration: '1-2 dni',
    },
    {
      service:
        'Naprawa lub wymiana uszkodzonego panelu sterowania (przyciski, taśmy, sensory), panelu dotykowego / ekranu LCD)',
      price: '140 / 200 / 260 + część',
      duration: '2-5 dni',
    },
  ]
}

const applyInkjetScannerSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const scannerSubcategory =
    serviceSection?.subcategories?.find(sub => sub.title === 'Skaner / ADF')

  if (!scannerSubcategory) return

  scannerSubcategory.title = 'Skaner / ADF (dla MFP)'
  scannerSubcategory.items = [
    {
      service:
        'Czyszczenie optyki skanera (lustra, soczewki, lampa LED/CCD).\nUsuwanie pasów i smug spowodowanych zabrudzeniem optyki',
      price: '120 / 160 / 250\n+ części',
      duration: '1-3 dni',
    },
    {
      service: 'Naprawa mechanizmu skanera (optyka, napęd, prowadnice)',
      price: '130 / 180 / 230\n+ części',
      duration: '2-5 dni',
    },
    {
      service: 'Wymiana silnika napędu skanera',
      price: '140 / 200 / 250\n+ część',
      duration: '2-5 dni',
    },
    {
      service:
        'Wymiana taśmy transmisyjnej CCD / przewodu sygnałowego skanera',
      price: '150 / 200 / 250\n+ część',
      duration: '2-5 dni',
    },
    {
      service: 'Wymiana szkła skanera (głównego)',
      price: '150 / 200 / 250\n+ części',
      duration: '2-5 dni',
    },
    {
      service:
        'Czyszczenie lub wymiana rolek ADF i separatorów\n(zapobiega pobieraniu wielu kartek naraz)',
      price: '100 / 150 / 200\n+ części',
      duration: '2-5 dni',
    },
    {
      service:
        'Czyszczenie szyby skanera i szyby „pod ADF”\n(usuwa smugi i linie przy skanowaniu)',
      price: '60 / 90 / 120',
      duration: '-',
    },
    {
      service:
        'Wymiana wąskiej szyby pod ADF\n(tzw. „szyba skanowania z podajnika”)',
      price: '100 / 150 / 200\n+ część',
      duration: '1-3 dni',
    },
    {
      service: 'Naprawa silnika ADF / sprzęgła pobierania',
      price: '150 / 200 / 250\n+ część',
      duration: '1-4 dni',
    },
  ]
}

const applyInkjetSoftwareSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const softwareSubcategory =
    serviceSection?.subcategories?.find(
      sub => sub.title === 'Oprogramowanie i konfiguracja'
    )

  if (!softwareSubcategory) return

  softwareSubcategory.items = [
    {
      service:
        'Instalacja sterowników i konfiguracja w sieci (router / Wi-Fi / LAN /)\n(zdalnie lub lokalnie)',
      price: '50 / 100 / 150',
      duration: '1-2 dni',
    },
    {
      service:
        'Instalacja aplikacji mobilnych (AirPrint / Mopria / aplikacje producenta)\n(drukowanie ze smartfona bez kabli)',
      price: '50 / 80 / 110',
      duration: '1 dzień',
    },
    {
      service:
        'Aktualizacja firmware / reset systemu drukarki\n(usuwa błędy i komunikaty serwisowe)',
      price: '80 / 120 / 160',
      duration: '1-2 dni',
    },
    {
      service:
        'Reset liczników serwisowych bez ingerencji w moduły\n(odblokowanie funkcji po komunikacie o konserwacji)',
      price: '60 / 90 / 120',
      duration: '1 dzień',
    },
    {
      service:
        'Przywrócenie ustawień fabrycznych i ponowna konfiguracja\n(rozwiązuje problemy po błędnych zmianach ustawień)',
      price: '60 / 90 / 120',
      duration: '1 dzień',
    },
    {
      service:
        'Usunięcie komunikatów błędów systemowych (diagnostyka + reset)\n(drukarka wraca do pracy bez błędów)',
      price: '80 / 120 / 160',
      duration: '1-2 dni',
    },
    {
      service:
        'Usuwanie konfliktów sterowników\n(przywraca poprawną komunikację drukarka ↔ komputer)',
      price: '50 / 80 / 110',
      duration: '1 dzień',
    },
    {
      service:
        'Konfiguracja skanowania do komputera (SMB/FTP)\n(skant trafia bezpośrednio do folderu użytkownika)',
      price: '70 / 110 / 150',
      duration: '1-2 dni',
    },
    {
      service:
        'Konfiguracja skanowania do e-mail (SMTP, TLS, porty, uwierzytelnienie) / do chmury (Google Drive / OneDrive / SharePoint)\n(skanowanie jednym przyciskiem)',
      price: '100 / 150 / 200',
      duration: '1-2 dni',
    },
    {
      service:
        'Konfiguracja panelu webowego drukarki (IP, DHCP, DNS, zabezpieczenia)\n(ustawienia sieciowe pod kontrolą)',
      price: '60 / 100 / 140',
      duration: '1 dzień',
    },
    {
      service:
        'Migracja drukarki na nowy komputer / serwer\n(przeniesienie profili, skrótów, udziałów)',
      price: '80 / 120 / 160',
      duration: '1 dzień',
    },
    {
      service:
        'Zabezpieczenie dostępu (PIN / hasło administratora)\n(chronic urządzenie przed nieautoryzowanym użyciem)',
      price: '60 / 90 / 120',
      duration: '1 dzień',
    },
    {
      service:
        'Szkolenie użytkownika (5–15 min)\n(pokazanie podstaw obsługi: skan, druk, wymiana tuszu/tonera)',
      price: '30 / 50 / 70',
      duration: 'od ręki',
    },
    {
      service:
        'Wsparcie zdalne – konfiguracja / sterowniki / diagnostyka\n(pomoc bez wizyty serwisanta)',
      price: '120\n/ godzinę',
      duration: '1-2 dni',
    },
  ]
}

const applyInkjetAdditionalSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const additionalSubcategory =
    serviceSection?.subcategories?.find(sub => sub.title === 'Usługi dodatkowe')

  if (!additionalSubcategory) return

  additionalSubcategory.title = 'Dodatkowe usługi'
  additionalSubcategory.items = [
    {
      service: 'Czyszczenie wnętrza po rozlaniu tuszu\npodstawowe czyszczenie',
      price: '100 / 150 / 200',
      duration: '1-2 dni',
    },
    {
      service:
        'Czyszczenie po „silnym zalaniu tuszem”\npełna dekontaminacja i demontaż wszystkich podzespołów drukarki',
      price: '200 / 280 / 360',
      duration: '1-3 dni',
    },
    {
      service:
        'Wymiana wadliwego kartridża z tuszem lub po jego wyczerpaniu\nczyszczenie gniazda kartridża / pojemnika z tuszem',
      price: '20 / 40 / 60 + koszt tuszu',
      duration: '1 dzień',
    },
    {
      service:
        'Wymiana pojemnika / modułu na zużyty tusz (tzw. waste ink, „pampers”)',
      price: '60 / 90 / 120 + część',
      duration: '1 dzień',
    },
    {
      service: 'Ocena stanu urządzenia przed zakupem (ekspertyza)',
      price: '40 / 60 / 80',
      duration: '1 dzień',
    },
    {
      service: 'Drukarka zastępcza (na czas naprawy)',
      price: 'Link',
      duration: '1 dzień',
      link: '/uslugi/drukarka-zastepcza',
    },
  ]
}

const applyNeedleCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service: 'PREMIUM (pełna konserwacja)\n\nzakres usługi obejmuje:\n• konserwacja całego mechanizmu uderzeniowego (smarowanie i regulacja igieł oraz prowadnic),\n• pełne czyszczenie i regeneracja toru papieru,\n• kontrola i kalibracja mechanizmu podawania,\n• czyszczenie elektroniki z pyłu,\n• test końcowy wydruku i reset liczników serwisowych.',
      price: '150 / 200 / 250',
      duration: '1–3 dni',
    },
  ]
}

const createNeedlePricingSections = (): PricingSection[] => {
  const sections = createPricingSections()

  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  const diagnosisItem = diagnosisSection?.items.find(
    item => item.service === 'Wycena naprawy (bez naprawy)'
  )
  if (diagnosisItem) {
    diagnosisItem.price = '80 / 100 / 150'
  }

  applyNeedleCleaningSection(sections)
  return sections
}


const createLaserPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  const diagnosisItem = diagnosisSection?.items.find(
    item => item.service === 'Wycena naprawy (bez naprawy)'
  )
  if (diagnosisItem) {
    diagnosisItem.price = '70 / 100 / 150'
  }


  applyLaserCleaningSection(sections)
  applyLaserPaperFeedSubcategory(sections)
  applyLaserOpticsSubcategory(sections)
  applyLaserImagingSubcategory(sections)
  applyLaserElectronicsSubcategory(sections)
  applyLaserSoftwareSubcategory(sections)
  applyLaserScannerSubcategory(sections)
  applyLaserAdditionalSubcategory(sections)
  return sections
}

const create3DPrinterPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()

  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  const diagnosisItem = diagnosisSection?.items.find(
    item => item.service === 'Wycena naprawy (bez naprawy)'
  )
  if (diagnosisItem) {
    diagnosisItem.price = '150'
  }

  apply3DPrinterCleaningSection(sections)

  const repairsSection = sections.find(s => s.id === 'naprawy')
  if (repairsSection) {
    // Resetuj podkategorie, aby nie pokazywały się te od laserówek
    repairsSection.subcategories = [
      { id: '3d-mechanics', title: '', items: [] },
      { id: '3d-electronics', title: '', items: [] },
      { id: '3d-calibration', title: '', items: [] },
      { id: '3d-software', title: '', items: [] },
      { id: '3d-additional', title: '', items: [] },
    ]
  }

  apply3DPrinterMechanicsSubcategory(sections)
  apply3DPrinterElectronicsSubcategory(sections)
  apply3DPrinterCalibrationSubcategory(sections)
  apply3DPrinterSoftwareSubcategory(sections)
  apply3DPrinterAdditionalSubcategory(sections)

  return sections
}



const createPlotterPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  const diagnosisItem = diagnosisSection?.items.find(
    item => item.service === 'Wycena naprawy (bez naprawy)'
  )
  if (diagnosisItem) {
    diagnosisItem.price = '150'
  }


  applyPlotterCleaningSection(sections)

  const repairsSection = sections.find(s => s.id === 'naprawy')
  if (repairsSection) {
    // Resetuj podkategorie, aby nie pokazywały się te od laserówek
    repairsSection.subcategories = [
      { id: 'plotter-mechanics', title: '', items: [] },
      { id: 'plotter-ink', title: '', items: [] },
      { id: 'plotter-electronics', title: '', items: [] },
      { id: 'plotter-calibration', title: '', items: [] },
      { id: 'plotter-software', title: '', items: [] },
    ]
  }

  applyPlotterMechanicsSubcategory(sections)
  applyPlotterInkSystemSubcategory(sections)
  applyPlotterElectronicsSubcategory(sections)
  applyPlotterCalibrationSubcategory(sections)
  applyPlotterSoftwareSubcategory(sections)

  return sections
}


const removeUnwantedSubcategoriesForInkjet = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection?.subcategories) return

  repairsSection.subcategories = repairsSection.subcategories.filter(
    sub => sub.id !== 'naprawy-tasma'
  )
}

const createInkjetPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  const diagnosisItem = diagnosisSection?.items.find(
    item => item.service === 'Wycena naprawy (bez naprawy)'
  )
  if (diagnosisItem) {
    diagnosisItem.price = '50 / 70 / 90'
  }


  applyInkjetPaperFeedSubcategory(sections)
  applyInkjetCarriageSubcategory(sections)
  applyInkjetHeadSubcategory(sections)
  applyInkjetElectronicsSubcategory(sections)
  applyInkjetScannerSubcategory(sections)
  applyInkjetSoftwareSubcategory(sections)
  applyInkjetAdditionalSubcategory(sections)
  removeUnwantedSubcategoriesForInkjet(sections)
  return sections
}

const applyThermalCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return

  cleaningSection.items = [
    {
      service:
        'PODSTAWOWY (przegląd i profilaktyka)\n\nzakres usługi obejmuje:\n• czyszczenie wnętrza drukarki (pył z etykiet, resztki kleju, kurz),\n• czyszczenie i kontrola rolki dociskowej (platen roller),\n• czyszczenie podstawowych elementów prowadzenia etykiet (tor papieru),\n• wstępna kontrola czujników nośnika / znacznika (gap / black mark),\n• kontrola głównych elementów mechanicznych podajnika etykiet,\n• test jakości wydruku etykiet (kody kreskowe / tekst).',
      price: '50 / 100 / 150',
      duration: '1–3 dni',
    },
    {
      service:
        'STANDARD (standardowa konserwacja)\n\nzakres PODSTAWOWY +\n• dokładne czyszczenie głowicy drukującej (środkiem na bazie alkoholu izopropylowego),\n• czyszczenie czujników papieru / etykiet i elementów wykrywających taśmę barwiącą,\n• czyszczenie elementów prowadzenia etykiet na całej ścieżce (rolki, prowadnice),\n• smarowanie wybranych elementów mechanicznych (zgodnie z zaleceniami producenta),\n• sprawdzenie i podstawowa kalibracja czujników nośnika (pozycja etykiety, odczyt znacznika),\n• sprawdzenie ustawień mediów i parametrów drukowania (temperatura, prędkość, ciemność).',
      price: '100 / 150 / 200',
      duration: '1–3 dni',
    },
    {
      service:
        'PREMIUM (pełna konserwacja)\n\nzakres STANDARD +\n• zaawansowane czyszczenie i ocena stanu głowicy drukującej (raport zużycia),\n• konserwacja i czyszczenie modułów dodatkowych: odklejak (peel-off), nawijak etykiet / taśmy (jeśli występują),\n• czyszczenie i konserwacja obcinarki (cutter) – usuwanie resztek etykiet i kleju, test cięcia,\n• dokładne czyszczenie lub regeneracja rolki dociskowej (platen) – robocizna bez ceny części,\n• reset liczników serwisowych / konserwacyjnych (jeśli technicznie możliwe w danym modelu),\n• kontrola stanu materiałów eksploatacyjnych (etykiety, taśma barwiąca / ribbon) – zalecenia wymiany,\n• kalibracja jakości wydruku (gęstość, kontrast kodów kreskowych, wyrównanie druku).',
      price: '150 / 200 / 250',
      duration: '1–3 dni',
    },
  ]
}

const applyThermalMechanismSubcategory = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection?.subcategories) return

  const mechanismSubcategory = repairsSection.subcategories.find(
    sub =>
      sub.id === 'naprawy-mechanizm' ||
      sub.title === 'Mechanizm poboru papieru, rolki, separatory' ||
      sub.title === 'Mechanizm podawania etykiet, rolki, prowadnice'
  )

  if (!mechanismSubcategory) return

  mechanismSubcategory.title = 'Mechanizm podawania etykiet, rolki, prowadnice'
  mechanismSubcategory.subtitle = 'zacina etykiety, nie pobiera, wciąga krzywo lub „gubi” odstępy'
  mechanismSubcategory.items = [
    {
      service:
        'Usuwanie zaciętych etykiet / lineru i ciał obcych z toru etykiet\nresztki etykiet, oderwany liner, kurz, drobne elementy – typowa przyczyna powtarzających się zacięć',
      price: '80 / 110 / 150',
      duration: 'od ręki',
    },
    {
      service:
        'Czyszczenie toru prowadzenia etykiet\nrolki prowadzące, prowadnice, ścieżka przesuwu – usuwa „podwijanie się” etykiet, zatrzymywanie się w środku drukarki i krzywe prowadzenie',
      price: '110 / 150 / 190',
      duration: '1–2 dni',
    },
    {
      service:
        'Czyszczenie lub regeneracja rolek podających / dociskowych etykiet\nlikwiduje poślizg – drukarka „nie pobiera” etykiet, pobiera kilka naraz lub zatrzymuje rolkę',
      price: '130 / 180 / 230\n+ części',
      duration: '1–3 dni',
    },
    {
      service:
        'Wymiana rolek podających, prowadnic i elementów docisku nośnika\nrozwiązuje trwałe problemy z pobieraniem etykiet, krzywym wciąganiem i gubieniem odstępów, szczególnie w urządzeniach mocno wyeksploatowanych',
      price: '160 / 220 / 280\n+ części',
      duration: '1–3 dni',
    },
    {
      service:
        'Regulacja toru etykiet, prowadnic i ustawienia rolki z etykietami\nkoryguje ustawienie rolki, prowadnic i docisku – usuwa przesunięcia druku, „uciekającą” etykietę i problemy po zmianie rodzaju etykiet',
      price: '110 / 160 / 210',
      duration: '1–3 dni',
    },
  ]
}

const applyThermalHeadSubcategory = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection?.subcategories) return

  const headSubcategory = repairsSection.subcategories.find(
    sub =>
      sub.id === 'naprawy-karetka' ||
      sub.title === 'Karetka i napęd' ||
      sub.title === 'Głowica drukująca i rolka dociskowa (platen)'
  )

  if (!headSubcategory) return

  headSubcategory.title = 'Głowica drukująca i rolka dociskowa (platen)'
  headSubcategory.subtitle =
    'słaba jakość wydruku, brak fragmentów nadruku, słabo czytelne kody kreskowe'
  headSubcategory.items = [
    {
      service:
        'Czyszczenie głowicy drukującej i wałka pod głowicą (platen roller)\nprzywraca ostrość nadruku, usuwa przerwy w liniach oraz zabrudzenia powodujące słabą czytelność kodów kreskowych',
      price: '120 / 170 / 220',
      duration: '1–3 dni',
    },
    {
      service:
        'Regulacja docisku głowicy i równomierności przylegania do wałka\neliminuje sytuacje, gdy jedna strona etykiety drukuje się zbyt jasno, a druga zbyt ciemno lub pojawiają się pasy',
      price: '130 / 180 / 230',
      duration: '1–3 dni',
    },
    {
      service:
        'Wymiana wałka dociskowego (platen roller) wraz z czyszczeniem strefy drukowania\nrozwiązuje problemy z poślizgiem nośnika pod głowicą, mechanicznymi uszkodzeniami wałka i powtarzającymi się pasami na wydruku',
      price: '160 / 220 / 280\n+ części',
      duration: '1–3 dni',
    },
    {
      service:
        'Wymiana głowicy drukującej (montaż certyfikowanej głowicy, regulacja docisku, kalibracja temperatury i prędkości druku)\nusuwa trwałe ubytki w wydruku, skutki przepalenia lub mechanicznego uszkodzenia głowicy',
      price: '190 / 250 / 320\n+ części',
      duration: '1–3 dni',
    },
    {
      service:
        'Kalibracja parametrów drukowania i jakości kodów kreskowych\ntemperatura, prędkość, gęstość druku, test czytelności kodów kreskowych zgodnie z wymaganiami logistyki i kurierów',
      price: '110 / 160 / 210',
      duration: '1–3 dni',
    },
  ]
}

const applyThermalSensorSubcategory = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection?.subcategories) return

  const sensorSubcategory = repairsSection.subcategories.find(
    sub =>
      sub.id === 'naprawy-glowica' ||
      sub.title === 'Głowica drukująca i układ tuszu' ||
      sub.title === 'Czujniki mediów i kalibracja etykiet'
  )

  if (!sensorSubcategory) return

  sensorSubcategory.title = 'Czujniki mediów i kalibracja etykiet'
  sensorSubcategory.subtitle =
    'drukarka „nie widzi” etykiet, drukuje w pustkę, zatrzymuje się z błędem nośnika'
  sensorSubcategory.items = [
    {
      service:
        'Czyszczenie czujników etykiet (transmisyjnych / refleksyjnych) i czujnika taśmy barwiącej\nusuwa błędy „label out” / „paper out” przy założonej rolce, błędne wykrywanie końca etykiet lub taśmy',
      price: '120 / 170 / 220',
      duration: '1–3 dni',
    },
    {
      service:
        'Kalibracja czujników nośnika i przerwy między etykietami (gap / black mark)\nrozwiązuje drukowanie „w pustkę”, nakładanie nadruku na przerwy oraz przesunięcie wydruku po zmianie rodzaju etykiet',
      price: '110 / 160 / 210',
      duration: '1–3 dni',
    },
    {
      service:
        'Kalibracja długości etykiety i wysuwu po wydruku\neliminuje zbyt duży lub zbyt mały wysuw etykiety, problemy z odklejaniem etykiet oraz „przycinanie” początku lub końca nadruku',
      price: '110 / 160 / 210',
      duration: '1–3 dni',
    },
    {
      service:
        'Diagnostyka i naprawa układu czujników nośnika / taśmy (okablowanie, elementy optyczne, płytki)\nusuwa powracające błędy czujnika mimo czyszczenia i kalibracji – typowe w urządzeniach intensywnie eksploatowanych',
      price: '160 / 220 / 280\n+ części',
      duration: '1–5 dni',
    },
    {
      service:
        'Wymiana uszkodzonego czujnika etykiet lub czujnika taśmy barwiącej\nrozwiązuje całkowity brak detekcji nośnika – ciągłe komunikaty „label out” / „paper out” niezależnie od rodzaju założonych etykiet',
      price: '190 / 250 / 320\n+ części',
      duration: '1–5 dni',
    },
  ]
}

const applyThermalRibbonSubcategory = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection?.subcategories) return

  const ribbonSubcategory = repairsSection.subcategories.find(
    sub =>
      sub.id === 'naprawy-elektronika' ||
      sub.title === 'Naprawy elektroniczne' ||
      sub.title === 'Taśma barwiąca (ribbon) i mechanizm nawijania'
  )

  if (!ribbonSubcategory) return

  ribbonSubcategory.title = 'Taśma barwiąca (ribbon) i mechanizm nawijania'
  ribbonSubcategory.subtitle =
    'zrywa taśmę, ribbon marszczy się, brudzi etykiety lub w ogóle się nie przesuwa'
  ribbonSubcategory.items = [
    {
      service:
        'Korekta prowadzenia i prawidłowego założenia taśmy barwiącej (ribbonu)\nusuwa marszczenie się taśmy, przesuwanie się ribbonu na boki oraz zabrudzenia nadruku wynikające z nieprawidłowego przeprowadzenia taśmy',
      price: '90 / 130 / 170',
      duration: '1–3 dni',
    },
    {
      service:
        'Czyszczenie toru prowadzenia taśmy barwiącej i elementów kontaktu z ribbonem (rolki, prowadnice, osłony)\neliminuje zabrudzenia z barwnika na elementach drukarki, ślady na odwrocie etykiet oraz powstawanie smug na wydruku',
      price: '120 / 170 / 220',
      duration: '1–3 dni',
    },
    {
      service:
        'Regulacja napięcia i mechanizmu nawijania taśmy barwiącej (sprzęgła, hamulce, docisk szpul)\nrozwiązuje problemy z zatrzymywaniem się ribbonu, jego ślizganiem, zrywaniem oraz nierównym nawijaniem na rolkę odbiorczą',
      price: '150 / 210 / 270\n+ części',
      duration: '1–5 dni',
    },
    {
      service:
        'Wymiana uszkodzonych elementów prowadzenia ribbonu (wałki prowadzące, uchwyty gilz, trzpienie)\nusuwa trwałe uszkodzenia mechaniczne powodujące blokowanie taśmy, jej strzępienie lub niemożność prawidłowego montażu kasety',
      price: '180 / 240 / 300\n+ części',
      duration: '1–5 dni',
    },
    {
      service:
        'Diagnostyka doboru taśmy barwiącej do nośnika i kalibracja parametrów druku (temperatura, prędkość, gęstość druku dla danej kombinacji etykieta + ribbon)\npoprawia trwałość i czytelność nadruku, ogranicza nadmierne zużycie taśmy i przegrzewanie głowicy',
      price: '110 / 160 / 210',
      duration: '1–3 dni',
    },
  ]
}

const applyThermalModulesSubcategory = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection?.subcategories) return

  const modulesSubcategory = repairsSection.subcategories.find(
    sub =>
      sub.id === 'naprawy-skaner' ||
      sub.title === 'Skaner / ADF' ||
      sub.title === 'Moduły dodatkowe: odklejak, nawijak, podajniki, obcinarka'
  )

  if (!modulesSubcategory) return

  modulesSubcategory.title = 'Moduły dodatkowe: odklejak, nawijak, podajniki, obcinarka'
  modulesSubcategory.subtitle =
    'drukarka nie odkleja / nie odcina etykiet, źle nawija rolki, zacina przy aplikacji'
  modulesSubcategory.items = [
    {
      service:
        'Czyszczenie i regulacja modułu odklejającego etykiety (peel-off)\nusuwa problemy z pozostawaniem etykiety na linerze, zrywaniem etykiety przy odklejaniu oraz nieregularnym wysuwem etykiet do ręcznego pobrania',
      price: '120 / 170 / 220',
      duration: '1–3 dni',
    },
    {
      service:
        'Czyszczenie i regulacja modułu obcinającego (cuttera)\neliminuje zacinanie się etykiet w nożu, niedocinanie lub wyrywanie etykiet spowodowane nagromadzonym klejem i resztkami nośnika',
      price: '130 / 180 / 230',
      duration: '1–3 dni',
    },
    {
      service:
        'Ostrzenie lub wymiana noża obcinarki wraz z testem cięcia\nrozwiązuje problemy z postrzępionymi krawędziami, „ciągnięciem” etykiety zamiast jej odcięcia oraz koniecznością ręcznego odrywania etykiet',
      price: '150 / 210 / 270\n+ części',
      duration: '1–5 dni',
    },
    {
      service:
        'Czyszczenie i regulacja modułu nawijania etykiet (wewnętrznego / zewnętrznego)\nusuwa problemy z luźnym, krzywym lub zbyt mocnym nawijaniem rolek, zsuwaniem się nawoju oraz zatrzymywaniem się nawijaka',
      price: '150 / 210 / 270',
      duration: '1–5 dni',
    },
    {
      service:
        'Naprawa lub wymiana elementów modułów dodatkowych (sprężyny, łożyska, zębatki, uchwyty rolek)\nlikwiduje trwałe uszkodzenia mechaniczne odklejaka, nawijaka lub obcinarki, które powodują częste zacięcia oraz brak stabilnej pracy tych modułów',
      price: '180 / 240 / 300\n+ części',
      duration: '1–5 dni',
    },
  ]
}

const applyThermalElectronicsSubcategory = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection?.subcategories) return

  const electronicsSubcategory = repairsSection.subcategories.find(
    sub =>
      sub.id === 'naprawy-software' ||
      sub.title === 'Oprogramowanie i konfiguracja' ||
      sub.title === 'Elektronika, zasilanie, panel sterujący, interfejsy'
  )

  if (!electronicsSubcategory) return

  electronicsSubcategory.title = 'Elektronika, zasilanie, panel sterujący, interfejsy'
  electronicsSubcategory.subtitle =
    'drukarka nie włącza się, zawiesza się, pokazuje błędy elektroniki lub nie łączy się z komputerem / siecią'
  electronicsSubcategory.items = [
    {
      service:
        'Diagnostyka usterek elektronicznych (zasilacz, płyta główna, moduły komunikacyjne, panel sterujący – identyfikacja uszkodzonego podzespołu i wstępna wycena naprawy)',
      price: '140 / 190 / 240',
      duration: '2–5 dni',
    },
    {
      service:
        'Naprawa lub wymiana zasilacza wewnętrznego / zewnętrznego drukarki\nusuwa problemy z brakiem zasilania, samoczynnym wyłączaniem się urządzenia lub niestabilną pracą pod obciążeniem',
      price: '180 / 240 / 300\n+ części',
      duration: '2–7 dni',
    },
    {
      service:
        'Naprawa płyty głównej drukarki (sekcja zasilania, sterowanie silnikami, pamięć, logika sterująca)\nrozwiązuje losowe restarty, zawieszanie się drukarki oraz błędy elektroniki niewynikające z mechaniki',
      price: '200 / 260 / 320\n+ części',
      duration: '3–10 dni',
    },
    {
      service:
        'Wymiana płyty głównej / modułu logiki drukarki wraz z konfiguracją urządzenia\nprzywraca pełną sprawność urządzenia po poważnych uszkodzeniach elektroniki, przepięciach lub zalaniu – obejmuje podstawową konfigurację po wymianie',
      price: '220 / 280 / 340\n+ części',
      duration: '3–10 dni',
    },
    {
      service:
        'Naprawa lub wymiana panelu sterującego i złączy komunikacyjnych (przyciski, wyświetlacz, USB, Ethernet, RS232)\nusuwa problemy z niedziałającymi przyciskami, brakiem reakcji panelu, brakiem komunikacji z komputerem lub siecią LAN',
      price: '160 / 220 / 280\n+ części',
      duration: '2–7 dni',
    },
  ]
}

const applyThermalSoftwareSubcategory = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection?.subcategories) return

  const softwareSubcategory = repairsSection.subcategories.find(
    sub =>
      sub.id === 'naprawy-additional' ||
      sub.title === 'Usługi dodatkowe' ||
      sub.title === 'Oprogramowanie, konfiguracja i integracje'
  )

  if (!softwareSubcategory) return

  softwareSubcategory.title = 'Oprogramowanie, konfiguracja i integracje'
  softwareSubcategory.subtitle =
    'etykiety drukują się przesunięte, w złym formacie, z błędnymi danymi lub nie drukują się wcale z programu'
  softwareSubcategory.items = [
    {
      service:
        'Instalacja i konfiguracja sterowników drukarki etykiet (Windows / macOS / Linux)\nrozwiązuje problemy z brakiem możliwości druku, niewłaściwym wyborem portu, błędnym formatem strony oraz niepełną obsługą funkcji drukarki',
      price: '120 / 170 / 220',
      duration: '1–3 dni',
    },
    {
      service:
        'Konfiguracja formatu etykiet i ustawień drukowania w systemie (rozmiar, marginesy, kierunek, tryb termiczny / termotransfer)\neliminuje przesunięcia nadruku, „ucięte” kody kreskowe i problemy po zmianie rodzaju etykiet',
      price: '110 / 160 / 210',
      duration: '1–3 dni',
    },
    {
      service:
        'Konfiguracja i optymalizacja programu do projektowania etykiet (np. BarTender, NiceLabel, inne)\npoprawia jakość i spójność szablonów etykiet, usuwa błędy w kodach kreskowych oraz problemy z polskimi znakami i czcionkami',
      price: '140 / 190 / 240',
      duration: '1–5 dni',
    },
    {
      service:
        'Konfiguracja druku etykiet z systemów magazynowych / WMS / ERP / programów sprzedażowych (integracja szablonów, mapowanie danych, testy)\nrozwiązuje problemy z niepełnymi danymi na etykietach, błędnymi numerami partii, kodami towarów lub lokalizacji',
      price: '180 / 240 / 300',
      duration: '1–5 dni',
    },
    {
      service:
        'Diagnostyka problemów z drukiem z sieci / wielu stanowisk (serwer wydruku, udostępnianie drukarki, uprawnienia)\nusuwa sytuacje, gdy drukarka drukuje poprawnie lokalnie, ale nie drukuje lub drukuje błędnie z innych komputerów w sieci',
      price: '150 / 210 / 270',
      duration: '1–5 dni',
    },
  ]
}

const addThermalExtraServicesSubcategory = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection) return

  if (!repairsSection.subcategories) {
    repairsSection.subcategories = []
  }

  const alreadyExists = repairsSection.subcategories.some(
    sub => sub.id === 'naprawy-termiczne-uslugi' || sub.title === 'Usługi dodatkowe i modernizacje'
  )

  if (alreadyExists) return

  repairsSection.subcategories.push({
    id: 'naprawy-termiczne-uslugi',
    title: 'Usługi dodatkowe i modernizacje',
    subtitle: 'przygotowanie drukarki do dalszej eksploatacji, odsprzedaży, minimalizacja przestojów',
    items: [
      {
        service:
          'Przegląd techniczny i ekspertyza stanu drukarki etykiet\nocena zużycia podzespołów, wskazanie ryzyka awarii, raport przed naprawą lub zakupem / sprzedażą urządzenia',
        price: '140 / 190 / 240',
        duration: '1–3 dni',
      },
      {
        service:
          'Przygotowanie drukarki etykiet do odsprzedaży / ponownego wdrożenia\nczyszczenie, przegląd podstawowy, testy wydruku i konfiguracja podstawowa – poprawia wygląd i wiarygodność urządzenia przy sprzedaży lub relokacji',
        price: '180 / 240 / 300',
        duration: '1–5 dni',
      },
      {
        service:
          'Dostarczenie drukarki zastępczej na czas naprawy\nzapewnia ciągłość pracy magazynu / biura podczas dłuższej naprawy urządzenia klienta – cena nie obejmuje kosztu etykiet i taśmy barwiącej',
        price: 'od 25 / 35 / 45\nza dzień',
        duration: 'wg dostępności modeli',
      },
      {
        service:
          'Audyt systemu wydruku etykiet w firmie\nanaliza parku drukarek, materiałów eksploatacyjnych i konfiguracji – propozycje optymalizacji kosztów, wydajności i niezawodności',
        price: '260 / 320 / 380',
        duration: '3–10 dni',
      },
      {
        service:
          'Szkolenie użytkowników z obsługi drukarek etykiet i oprogramowania\nkonfiguracja, wymiana materiałów, rozwiązywanie typowych problemów – zmniejsza liczbę przestojów i błędów w drukowaniu etykiet',
        price: '220 / 280 / 340',
        duration: '1–3 dni',
      },
    ],
  })
}

const createThermalPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()

  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  const diagnosisItem = diagnosisSection?.items.find(
    item => item.service === 'Wycena naprawy (bez naprawy)'
  )

  if (diagnosisItem) {
    diagnosisItem.price = '100 / 150 / 200'
  }
  applyThermalCleaningSection(sections)
  applyThermalMechanismSubcategory(sections)
  applyThermalHeadSubcategory(sections)
  applyThermalSensorSubcategory(sections)
  applyThermalRibbonSubcategory(sections)
  applyThermalModulesSubcategory(sections)
  applyThermalElectronicsSubcategory(sections)
  applyThermalSoftwareSubcategory(sections)
  addThermalExtraServicesSubcategory(sections)
  return sections
}

const createDesktopPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  const diagnosisItem = diagnosisSection?.items.find(
    item => item.service === 'Wycena naprawy (bez naprawy)'
  )
  if (diagnosisItem) {
    diagnosisItem.price = '90'
  }


  updateDojazdReturnPrice(sections, '100')
  applyDesktopCleaningSection(sections)
  applyDesktopSoftwareSubcategory(sections)
  applyDesktopHardwareSubcategory(sections)
  applyDesktopCoolingSubcategory(sections)
  applyDesktopStorageSubcategory(sections)
  applyDesktopRecoverySubcategory(sections)
  removeDesktopExtraSubcategories(sections)
  return sections
}

const createWynajemPricingSections = (): PricingSection[] => {
  // Используем только базовые секции без FAQ (FAQ добавим в конце)
  const defaultSections = createDefaultPricingSections()

  // Удаляем ненужные секции для wynajem-drukarek
  const sections = defaultSections.filter(
    section =>
      section.id !== 'diagnoza' &&
      section.id !== 'dojazd' &&
      section.id !== 'konserwacja' &&
      section.id !== 'naprawy'
  )

  // Добавляем два аккордеона
  sections.push({
    id: 'akordeon-1',
    title: 'Laserowe (format A4)',
    items: [],
    subcategories: [
      {
        id: 'drukarki-mono',
        title: 'Drukarki A4 (mono)',
        items: [],
        price: '30 / 50 / 100',
      },
      {
        id: 'drukarki-kolor',
        title: 'Drukarki A4 (mono+kolor)',
        items: [],
        price: '50 / 100 / 150',
      },
      {
        id: 'mfu-mono',
        title: 'MFU A4 (mono)',
        items: [],
        price: '80 / 100 / 150',
      },
      {
        id: 'mfu-kolor',
        title: 'MFU A4 (mono+kolor)',
        items: [],
        price: '100 / 150 / 200',
      },
    ],
  })

  sections.push({
    id: 'akordeon-2',
    title: 'Laserowe (format A3/A4)',
    items: [],
    subcategories: [
      {
        id: 'a3-drukarki-mono',
        title: 'Drukarki A3 (mono)',
        items: [],
        price: '100 / 150 / 200',
      },
      {
        id: 'a3-drukarki-kolor',
        title: 'Drukarki A3 (mono+kolor)',
        items: [],
        price: '200 / 250 / 300',
      },
      {
        id: 'a3-mfu-mono',
        title: 'MFU A3 (mono)',
        items: [],
        price: '200 / 250 / 300',
      },
      {
        id: 'a3-mfu-kolor',
        title: 'MFU A3 (mono+kolor)',
        items: [],
        price: '300 / 400 / 500',
      },
    ],
  })

  // Добавляем FAQ в конец
  sections.push(createFaqSection())

  return sections
}

const createDrukarkaZastepczaPricingSections = (): PricingSection[] => {
  // Используем только базовые секции без FAQ (FAQ добавим в конце)
  const defaultSections = createDefaultPricingSections()

  // Удаляем ненужные секции для drukarka-zastepcza
  const sections = defaultSections.filter(
    section =>
      section.id !== 'diagnoza' &&
      section.id !== 'dojazd' &&
      section.id !== 'konserwacja' &&
      section.id !== 'naprawy'
  )

  // Добавляем два аккордеона
  sections.push({
    id: 'akordeon-1',
    title: 'Laserowe (format A4)',
    items: [],
    subcategories: [
      {
        id: 'drukarki-mono',
        title: 'Drukarki A4 (mono)',
        items: [],
        price: '0,06',
      },
      {
        id: 'drukarki-kolor',
        title: 'Drukarki A4 (mono+kolor)',
        items: [],
        price: '0,06 / 0,27',
      },
      {
        id: 'mfu-mono',
        title: 'MFU A4 (mono)',
        items: [],
        price: '0,08',
      },
      {
        id: 'mfu-kolor',
        title: 'MFU A4 (mono+kolor)',
        items: [],
        price: '0,08 / 0,30',
      },
    ],
  })

  sections.push({
    id: 'akordeon-2',
    title: 'Laserowe (format A3)',
    items: [],
    subcategories: [
      {
        id: 'a3-drukarki-mono',
        title: 'Drukarki A3 (mono)',
        items: [],
        price: '0,05',
      },
      {
        id: 'a3-drukarki-kolor',
        title: 'Drukarki A3 (mono+kolor)',
        items: [],
        price: '0,05 / 0,27',
      },
      {
        id: 'a3-mfu-mono',
        title: 'MFU A3 (mono)',
        items: [],
        price: '0,07',
      },
      {
        id: 'a3-mfu-kolor',
        title: 'MFU A3 (mono+kolor)',
        items: [],
        price: '0,07 / 0,30',
      },
    ],
  })

  // Добавляем FAQ в конец
  sections.push(createFaqSection())

  return sections
}

export const services: ServiceData[] = [
  {
    slug: 'serwis-laptopow',
    title: 'Serwis i Naprawa Laptopów',
    subtitle: 'Pełny wykaz usług i cen, bez ukrytych kosztów (nie „naprawa od 50 zł” lub „cena do uzgodnienia")',
    icon: manifest['01_serwis_laptopow'],
    description: 'Kompleksowa naprawa i konserwacja laptopów wszystkich marek.',
    pricingSections: createLaptopPricingSections(),
  },
  {
    slug: 'serwis-komputerow-stacjonarnych',
    title: 'Serwis Komputerów Stacjonarnych',
    subtitle: 'Pełny wykaz usług i cen, bez ukrytych kosztów',
    icon: manifest['02_serwis_komputerow_stacjonarnych'],
    description: 'Diagnostyka, naprawa i modernizacja jednostek centralnych.',
    pricingSections: createDesktopPricingSections(),
  },
  {
    slug: 'outsourcing-it',
    title: 'Outsourcing IT',
    subtitle: 'Obsługa informatyczna dla firm',
    icon: manifest['03_outsourcing_it'],
    description: 'Pełna obsługa informatyczna dla Twojej firmy.',
    pricingSections: createOutsourcingItPricingSections(),
  },
  {
    slug: 'naprawa-drukarek',
    title: 'Naprawa Drukarek i Kserokopiarek',
    subtitle: 'Naprawa specjalistycznych drukarek igłowych',
    icon: manifest['07_serwis_drukarek_iglowych'],
    description: 'Naprawa specjalistycznych drukarek igłowych.',
    pricingSections: createNeedlePricingSections(),
  },
  {
    slug: 'serwis-drukarek-laserowych',
    title: 'Serwis Drukarek Laserowych i Kserokopiarek',
    subtitle: 'Profesjonalna naprawa drukarek laserowych i urządzeń wielofunkcyjnych',
    icon: manifest['04_serwis_drukarek_laserowych'],
    description: 'Profesjonalna naprawa i serwis drukarek laserowych.',
    pricingSections: createLaserPricingSections(),
    priceTooltipRich: {
      type: 'deviceCategories',
      title: 'Kategorie urządzeń',
      description: 'Wybierz orientacyjnie, do której grupy należy Twoja drukarka. Dzięki temu łatwiej dopasujesz przedział cenowy.',
      categories: [
        {
          title: 'Drukarka domowa',
          description: 'Urządzenie do użytku domowego lub okazjonalnego drukowania. Małe modele A4, zwykle tańsze w zakupie.',
          features: ['małe wymiary', 'wolniejszy druk', 'podstawowe funkcje'],
          examples: ['HP DeskJet 2720', 'Canon MG3650s'],
        },
        {
          title: 'Drukarka biurowa',
          description: 'Do pracy w małych i średnich biurach. Przystosowane do częstszego drukowania i pracy w sieci.',
          features: ['szybszy druk', 'LAN / Wi-Fi', 'wyższa trwałość'],
          examples: ['Brother DCP-J105', 'Epson L3150'],
        },
        {
          title: 'Drukarka biznesowa',
          description: 'Duże urządzenia A4/A3 do intensywnej pracy i dużych wolumenów wydruku.',
          features: ['bardzo wysoka wytrzymałość', 'szybkie tonery i kasety', 'serwisowe funkcje zarządzania'],
          examples: ['Epson L6570', 'Canon MAXIFY GX4040'],
        },
      ],
    },
  },
  {
    slug: 'serwis-drukarek-atramentowych',
    title: 'Serwis Drukarek Atramentowych',
    subtitle: 'Specjalistyczna naprawa drukarek atramentowych',
    icon: manifest['05_serwis_drukarek_atramentowych'],
    description: 'Naprawa, udrażnianie głowic i konserwacja drukarek atramentowych.',
    pricingSections: createInkjetPricingSections(),
  },

  {
    slug: 'serwis-plotterow',
    title: 'Serwis i Naprawa Ploterów',
    subtitle: 'Serwis ploterów wielkoformatowych HP, Epson i Canon',
    icon: manifest['08_serwis_ploterow'],
    description: 'Serwis i naprawa ploterów wielkoformatowych.',
    pricingSections: createPlotterPricingSections(),
  },
  {
    slug: 'serwis-drukarek-termicznych',
    title: 'Serwis Drukarek Termiczno-etykietowych',
    subtitle: 'Naprawa drukarek etykiet i kodów kreskowych',
    icon: manifest['06_serwis_drukarek_termicznych'],
    description: 'Serwis drukarek etykiet i kodów kreskowych.',
    pricingSections: createThermalPricingSections(),
    priceTooltip:
      'Ceny brutto osobno dla drukarek: biurkowych / półprzemysłowych / przemysłowych (robocizna, bez materiałów eksploatacyjnych)',
  },
  {
    slug: 'serwis-drukarek-iglowych',
    title: 'Serwis Drukarek Igłowych',
    subtitle: 'Naprawa specjalistycznych drukarek igłowych',
    icon: manifest['07_serwis_drukarek_iglowych'],
    description: 'Naprawa specjalistycznych drukarek igłowych.',
    pricingSections: createNeedlePricingSections(),
  },
  {
    slug: 'serwis-drukarek-3d',
    title: 'Serwis i Naprawa Drukarek 3D',
    subtitle: 'Pełny wykaz usług i cen, bez ukrytych kosztów',
    icon: '/images/Serwis_i_Naprawa_Drukarek_3D.webp',
    description: 'Serwis drukarek 3D we Wrocławiu – naprawa drukarki 3D, kalibracja stołu, regulacja osi oraz poprawa jakości wydruku. Naprawa drukarek 3D FDM i SLA, czyszczenie ekstrudera i hotendu, wymiana części oraz konfiguracja ustawień druku. Serwis drukarek 3D dla firm i pracowni, konfiguracja firmware oraz przygotowanie drukarki do materiałów ABS, PETG i nylon.',
    pricingSections: create3DPrinterPricingSections(),
  },
  {
    slug: 'wynajem-drukarek',
    title: 'Wynajem (Dzierżawa) Drukarek',
    subtitle: 'Dzierżawa urządzeń drukujących dla biur',
    icon: manifest['10_wynajem_drukarek'],
    description: 'Dzierżawa urządzeń drukujących dla biur i firm.',
    pricingSections: createWynajemPricingSections(),
  },
  {
    slug: 'drukarka-zastepcza',
    title: 'Drukarka Zastępcza',
    subtitle: 'Urządzenie zastępcze na czas naprawy',
    icon: manifest['11_drukarka_zastepcza'],
    description: 'Oferujemy urządzenie zastępcze na czas naprawy.',
    pricingSections: createDrukarkaZastepczaPricingSections(),
  },
]
