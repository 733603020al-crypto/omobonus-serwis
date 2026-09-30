import type { PricingSection, PricingItem } from './services-data-types'

export const defaultPricingSections: PricingSection[] = [
  {
    id: 'diagnoza',
    title: 'Diagnoza i wycena',
    // icon: manifest.P1_Diagnoza_i_wycena, // Ikona będzie dodana w komponencie
    status: 'GRATIS',
    items: [
      {
        service: 'Wstępna diagnoza online\n(opis problemu przez WhatsApp, stronę lub telefon)',
      },
      {
        service: 'Wstępna diagnoza przy dostawie do serwisu 15 min. (również w razie rezygnacji z naprawy)',
      },
      {
        service: 'Diagnoza i wycena naprawy\n(w przypadku realizacji naprawy)',
      },
      {
        service: 'Diagnoza i wycena naprawy\n(w przypadku rezygnacji z naprawy)',
      },
      {
        service: 'Pisemna opinia techniczna\n(dodatkowo do pełnej diagnozy, z dokumentacją fotograficzną)',
      },
      {
        service: 'Pilna realizacja (jeśli to możliwe, przyspieszamy naprawę bez dodatkowej opłaty)',
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
      },
      {
        service: 'Dostarczenie naprawionego urządzenia do Klienta (do 2,5 km od serwisu; 5 km łącznie w obie strony)',
      },
      {
        service: 'Odbiór lub dostawa powyżej 2,5 km od serwisu (trasa w obie strony; dopłata po przekroczeniu 5 km)',
      },
      {
        service: 'Pilna realizacja (jeśli to możliwe, realizujemy odbiór lub dostawę w pierwszej kolejności)',
      },
    ],
  },

  {
    id: 'konserwacja',
    title: 'Czyszczenie i konserwacja (bez naprawy)',
    items: [], // każda strona ustawia własny pakiet
  },
  {
    id: 'naprawy',
    title: 'Naprawy i usługi serwisowe',
    subcategories: [], // każda strona ustawia własne podkategorie
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
      answer: 'Tak. Naprawiamy m.in. HP, Dell, Lenovo, ASUS, Acer, MSI i inne.',
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
      answer: 'Wszystkie podane ceny są netto.',
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


export const getRecoveryItems = (): PricingItem[] => [
  {
    service: 'Oszacowanie możliwości odzyskania danych z uszkodzonego nośnika',
  },
  {
    service:
      'Odzyskanie danych (usuniętych plików) po skasowaniu ze sprawnego nośnika (dokumenty, zdjęcia lub filmy, przez przypadkowe ich usunięcie, sformatowanie dysku lub przywrócenie systemu Windows)',
  },
  {
    service:
      'Odzyskiwanie danych (uszkodzenia logiczne – nośnik (np. dysk twardy) zachował sprawność)',
  },
  {
    service:
      'Odzyskanie danych z uszkodzonego nośnika (fizycznie lub elektronicznie uszkodzonych dysków HDD i SSD)',
  },
  {
    service: 'Trwałe usuwanie danych',
  },
]
