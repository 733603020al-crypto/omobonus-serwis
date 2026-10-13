import type { PricingSection, PricingSubcategory } from './services-data-types'
import { createDefaultPricingSections, createFaqSection } from './services-data-shared'
import { getDisplayPrice } from './services-pricing'

const SLUG = 'wynajem-drukarek'
const rent = (path: string) => getDisplayPrice(SLUG, `${path}.rent`, 'pl')
const pages = (path: string) => getDisplayPrice(SLUG, `${path}.pages`, 'pl')
const overLimit = (path: string) => getDisplayPrice(SLUG, `${path}.overLimitPrice`, 'pl')
const label = (path: string) => `${rent(path)}/mies.`

// FAQ tylko o wynajmie (zastępuje ogólny FAQ napraw)
const wynajemFaqSubcategories: PricingSubcategory[] = [
  { id: 'faq-1', title: "Na czym polega wynajem drukarki?", items: [], answer: "Płacisz miesięczny czynsz za urządzenie i korzystasz z pakietu stron w cenie. Wydruki ponad limit rozliczamy według stawek z cennika." },
  { id: 'faq-2', title: "Co obejmuje cena wynajmu?", items: [], answer: "Urządzenie, serwis, naprawy wynikające z normalnego użytkowania, tonery oraz standardowe części i materiały eksploatacyjne potrzebne do prawidłowej pracy urządzenia." },
  { id: 'faq-3', title: "Czy tonery są w cenie?", items: [], answer: "Tak, tonery są w cenie wynajmu." },
  { id: 'faq-4', title: "Czy bębny i części zamienne są w cenie?", items: [], answer: "Tak. Standardowe części i materiały eksploatacyjne potrzebne podczas normalnego użytkowania są po naszej stronie." },
  { id: 'faq-5', title: "Czy papier jest w cenie?", items: [], answer: "Nie. Papier oraz energia elektryczna są po stronie Klienta." },
  { id: 'faq-6', title: "Czy ceny są netto czy brutto?", items: [], answer: "Wszystkie ceny podane na stronie są cenami **netto**." },
  { id: 'faq-7', title: "Jak rozliczane są wydruki?", items: [], answer: "Miesięczny czynsz obejmuje określoną liczbę stron A4. Po wykorzystaniu limitu każdą kolejną stronę rozliczamy według stawki podanej w tabeli." },
  { id: 'faq-8', title: "Co się dzieje, jeśli przekroczę miesięczny limit stron?", items: [], answer: "Urządzenie działa normalnie, a dodatkowe strony rozliczamy według ceny za wydruk ponad limit." },
  { id: 'faq-9', title: "Jak liczone są wydruki A3?", items: [], answer: "Każdą wydrukowaną stronę A3 liczymy jak **dwie strony A4**." },
  { id: 'faq-10', title: "Czy niewykorzystane strony przechodzą na kolejny miesiąc?", items: [], answer: "Warunki rozliczenia niewykorzystanego limitu ustalamy przy zawieraniu umowy." },
  { id: 'faq-11', title: "Czy dostawa i instalacja urządzenia są w cenie?", items: [], answer: "Tak. Dostarczamy urządzenie, instalujemy je i wykonujemy podstawową konfigurację." },
  { id: 'faq-12', title: "Czy konfigurujecie drukowanie i skanowanie w sieci?", items: [], answer: "Tak. Przy instalacji możemy wykonać podstawową konfigurację drukowania i skanowania na stanowiskach Klienta." },
  { id: 'faq-13', title: "Jaki jest minimalny okres wynajmu?", items: [], answer: "**1 miesiąc**." },
  { id: 'faq-14', title: "Czy trzeba podpisywać umowę długoterminową?", items: [], answer: "Nie, nie wymagamy umowy długoterminowej." },
  { id: 'faq-15', title: "Co zrobić w przypadku awarii drukarki?", items: [], answer: "Zgłoś problem do serwisu. Naprawy wynikające z normalnego użytkowania są objęte wynajmem." },
  { id: 'faq-16', title: "Jaki jest czas reakcji serwisu?", items: [], answer: "Do **24 h roboczych**. To czas reakcji na zgłoszenie, a nie gwarantowany czas zakończenia naprawy." },
  { id: 'faq-17', title: "Czy w razie poważnej awarii dostanę urządzenie zastępcze?", items: [], answer: "Jeśli naprawa wymaga dłuższego czasu, możliwość zapewnienia urządzenia zastępczego ustalamy indywidualnie." },
  { id: 'faq-18', title: "Czy mogę zmienić urządzenie na inny model?", items: [], answer: "Jeśli zmienią się potrzeby firmy, możliwość zmiany urządzenia ustalamy indywidualnie." },
  { id: 'faq-19', title: "Co dzieje się z urządzeniem po zakończeniu wynajmu?", items: [], answer: "Po zakończeniu najmu odbieramy urządzenie." },
  { id: 'faq-20', title: "Jak dobrać odpowiednią drukarkę i pakiet stron?", items: [], answer: "Dobór zależy przede wszystkim od formatu (A4 / A3), druku mono lub kolor, miesięcznej liczby stron, wymaganej prędkości oraz potrzeby skanowania i kopiowania." },
]

export const createWynajemPricingSections = (): PricingSection[] => {
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

  // Добавляем два аккордеона (repair-accordion layout: pełna podtabela 3 planów
  // taryfowych na podkategorię, czynsz jako pierwszy wiersz — dane realne,
  // przeniesione 1:1 z dotychczasowego WynajemTable/WynajemSubcategoryHeader)
  sections.push({
    id: 'akordeon-1',
    title: 'Laserowe (format A4)',
    items: [],
    subcategories: [
      {
        id: 'drukarki-mono',
        title: 'Drukarki A4 (mono)',
        items: [],
        icon: '/images/wynajem-a4-drukarki-mono-v2.webp',
        priceTiers: [
          {
            label: label('akordeon-1.drukarki-mono.tier0'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-1.drukarki-mono.tier0') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.drukarki-mono.tier0') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.drukarki-mono.tier0') },
              { label: 'Duplex', value: 'nie' },
              { label: 'Prędkość druku do:', value: '20' },
            ],
          },
          {
            label: label('akordeon-1.drukarki-mono.tier1'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-1.drukarki-mono.tier1') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.drukarki-mono.tier1') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.drukarki-mono.tier1') },
              { label: 'Duplex', value: 'opcjonalnie' },
              { label: 'Prędkość druku do:', value: '40' },
            ],
          },
          {
            label: label('akordeon-1.drukarki-mono.tier2'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-1.drukarki-mono.tier2') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.drukarki-mono.tier2') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.drukarki-mono.tier2') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '60' },
            ],
          },
        ],
      },
      {
        id: 'drukarki-kolor',
        title: 'Drukarki A4 (mono+kolor)',
        items: [],
        icon: '/images/wynajem-a4-drukarki-kolor-v2.webp',
        priceTiers: [
          {
            label: label('akordeon-1.drukarki-kolor.tier0'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-1.drukarki-kolor.tier0') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.drukarki-kolor.tier0') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.drukarki-kolor.tier0') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '20' },
            ],
          },
          {
            label: label('akordeon-1.drukarki-kolor.tier1'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-1.drukarki-kolor.tier1') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.drukarki-kolor.tier1') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.drukarki-kolor.tier1') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '40' },
            ],
          },
          {
            label: label('akordeon-1.drukarki-kolor.tier2'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-1.drukarki-kolor.tier2') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.drukarki-kolor.tier2') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.drukarki-kolor.tier2') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '60' },
            ],
          },
        ],
      },
      {
        id: 'mfu-mono',
        title: 'MFU A4 (mono)',
        items: [],
        icon: '/images/wynajem-a4-mfu-mono-v2.webp',
        priceTiers: [
          {
            label: label('akordeon-1.mfu-mono.tier0'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-1.mfu-mono.tier0') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.mfu-mono.tier0') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.mfu-mono.tier0') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '20' },
              { label: 'Skanowanie', value: 'tak' },
            ],
          },
          {
            label: label('akordeon-1.mfu-mono.tier1'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-1.mfu-mono.tier1') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.mfu-mono.tier1') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.mfu-mono.tier1') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '40' },
              { label: 'Skanowanie', value: 'tak' },
            ],
          },
          {
            label: label('akordeon-1.mfu-mono.tier2'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-1.mfu-mono.tier2') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.mfu-mono.tier2') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.mfu-mono.tier2') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '60' },
              { label: 'Skanowanie', value: 'tak' },
            ],
          },
        ],
      },
      {
        id: 'mfu-kolor',
        title: 'MFU A4 (mono+kolor)',
        items: [],
        icon: '/images/wynajem-a4-mfu-kolor-v2.webp',
        priceTiers: [
          {
            label: label('akordeon-1.mfu-kolor.tier0'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-1.mfu-kolor.tier0') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.mfu-kolor.tier0') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.mfu-kolor.tier0') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '20' },
              { label: 'Skanowanie', value: 'tak' },
            ],
          },
          {
            label: label('akordeon-1.mfu-kolor.tier1'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-1.mfu-kolor.tier1') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.mfu-kolor.tier1') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.mfu-kolor.tier1') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '30' },
              { label: 'Skanowanie', value: 'tak' },
            ],
          },
          {
            label: label('akordeon-1.mfu-kolor.tier2'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-1.mfu-kolor.tier2') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-1.mfu-kolor.tier2') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-1.mfu-kolor.tier2') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '40' },
              { label: 'Skanowanie', value: 'tak' },
            ],
          },
        ],
      },
    ],
  })

  sections.push({
    id: 'akordeon-2',
    title: 'Laserowe (format A3/A4)',
    footer: 'Każdą wydrukowaną stronę A3 liczymy jak dwie strony A4',
    items: [],
    subcategories: [
      {
        id: 'a3-drukarki-mono',
        title: 'Drukarki A3 (mono)',
        items: [],
        icon: '/images/wynajem-a3-drukarki-mono-v2.webp',
        priceTiers: [
          {
            label: label('akordeon-2.a3-drukarki-mono.tier0'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-2.a3-drukarki-mono.tier0') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-drukarki-mono.tier0') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-drukarki-mono.tier0') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '50' },
            ],
          },
          {
            label: label('akordeon-2.a3-drukarki-mono.tier1'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-2.a3-drukarki-mono.tier1') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-drukarki-mono.tier1') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-drukarki-mono.tier1') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '60' },
            ],
          },
          {
            label: label('akordeon-2.a3-drukarki-mono.tier2'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-2.a3-drukarki-mono.tier2') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-drukarki-mono.tier2') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-drukarki-mono.tier2') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '90' },
            ],
          },
        ],
      },
      {
        id: 'a3-drukarki-kolor',
        title: 'Drukarki A3 (mono+kolor)',
        items: [],
        icon: '/images/wynajem-a3-drukarki-kolor-v2.webp',
        priceTiers: [
          {
            label: label('akordeon-2.a3-drukarki-kolor.tier0'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-2.a3-drukarki-kolor.tier0') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-drukarki-kolor.tier0') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier0') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '50' },
            ],
          },
          {
            label: label('akordeon-2.a3-drukarki-kolor.tier1'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-2.a3-drukarki-kolor.tier1') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-drukarki-kolor.tier1') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier1') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '60' },
            ],
          },
          {
            label: label('akordeon-2.a3-drukarki-kolor.tier2'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-2.a3-drukarki-kolor.tier2') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-drukarki-kolor.tier2') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier2') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '90' },
            ],
          },
        ],
      },
      {
        id: 'a3-mfu-mono',
        title: 'MFU A3 (mono)',
        items: [],
        icon: '/images/wynajem-a3-mfu-mono-v2.webp',
        priceTiers: [
          {
            label: label('akordeon-2.a3-mfu-mono.tier0'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-2.a3-mfu-mono.tier0') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-mfu-mono.tier0') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-mfu-mono.tier0') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '50' },
              { label: 'Skanowanie', value: 'tak' },
            ],
          },
          {
            label: label('akordeon-2.a3-mfu-mono.tier1'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-2.a3-mfu-mono.tier1') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-mfu-mono.tier1') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-mfu-mono.tier1') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '60' },
              { label: 'Skanowanie', value: 'tak' },
            ],
          },
          {
            label: label('akordeon-2.a3-mfu-mono.tier2'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-2.a3-mfu-mono.tier2') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-mfu-mono.tier2') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-mfu-mono.tier2') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '90' },
              { label: 'Skanowanie', value: 'tak' },
            ],
          },
        ],
      },
      {
        id: 'a3-mfu-kolor',
        title: 'MFU A3 (mono+kolor)',
        items: [],
        icon: '/images/wynajem-a3-mfu-kolor-v2.webp',
        priceTiers: [
          {
            label: label('akordeon-2.a3-mfu-kolor.tier0'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-2.a3-mfu-kolor.tier0') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-mfu-kolor.tier0') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-mfu-kolor.tier0') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '50' },
              { label: 'Skanowanie', value: 'tak' },
            ],
          },
          {
            label: label('akordeon-2.a3-mfu-kolor.tier1'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-2.a3-mfu-kolor.tier1') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-mfu-kolor.tier1') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-mfu-kolor.tier1') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '60' },
              { label: 'Skanowanie', value: 'tak' },
            ],
          },
          {
            label: label('akordeon-2.a3-mfu-kolor.tier2'),
            rows: [
              { label: 'Czynsz wynajmu (zł/mies.)', value: rent('akordeon-2.a3-mfu-kolor.tier2') },
              { label: 'Liczba stron A4 wliczonych w czynsz', value: pages('akordeon-2.a3-mfu-kolor.tier2') },
              { label: 'Cena wydruku A4 (powyżej limitu)', value: overLimit('akordeon-2.a3-mfu-kolor.tier2') },
              { label: 'Duplex', value: 'tak' },
              { label: 'Prędkość druku do:', value: '90' },
              { label: 'Skanowanie', value: 'tak' },
            ],
          },
        ],
      },
    ],
  })

  // Добавляем FAQ в конец
  sections.push({
    ...createFaqSection(),
    subcategories: wynajemFaqSubcategories.map(sub => ({ ...sub })),
  })

  return sections
}
