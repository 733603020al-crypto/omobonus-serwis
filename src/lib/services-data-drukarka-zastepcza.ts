import type { PricingSection, PricingSubcategory } from './services-data-types'
import { createDefaultPricingSections, createFaqSection } from './services-data-shared'
import { getDisplayPrice } from './services-pricing'

const SLUG = 'drukarka-zastepcza'
const price = (path: string) => getDisplayPrice(SLUG, `${path}.price`, 'pl')

// FAQ strony: wyłącznie zasady korzystania z drukarki zastępczej na czas naprawy
const zastepczaFaqSubcategories: PricingSubcategory[] = [
  { id: 'faq-1', title: "Kiedy mogę otrzymać drukarkę zastępczą?", items: [], answer: "Gdy naprawiane urządzenie wymaga dłuższego serwisu, a mamy dostępne odpowiednie urządzenie zastępcze." },
  { id: 'faq-2', title: "Czy za samo udostępnienie drukarki zastępczej płacę abonament?", items: [], answer: "Nie. Nie pobieramy opłaty abonamentowej za samo udostępnienie urządzenia na czas naprawy." },
  { id: 'faq-3', title: "Za co płacę podczas korzystania z drukarki zastępczej?", items: [], answer: "Za wykonane wydruki według aktualnego cennika." },
  { id: 'faq-4', title: "Czy ceny wydruków są netto?", items: [], answer: "Tak. Wszystkie ceny podane w cenniku są cenami **netto**." },
  { id: 'faq-5', title: "Czy toner jest w cenie?", items: [], answer: "Tak. Toner oraz standardowe materiały eksploatacyjne są po naszej stronie." },
  { id: 'faq-6', title: "Czy papier jest w cenie?", items: [], answer: "Nie. Papier zapewnia Klient." },
  { id: 'faq-7', title: "Czy mogę otrzymać urządzenie o takich samych funkcjach jak moja drukarka?", items: [], answer: "Dobieramy urządzenie możliwie najbliższe funkcjonalnie naprawianemu sprzętowi, zależnie od aktualnej dostępności." },
  { id: 'faq-8', title: "Czy dostępne są drukarki kolorowe i monochromatyczne?", items: [], answer: "Tak, oferujemy urządzenia mono oraz kolorowe, zależnie od dostępności." },
  { id: 'faq-9', title: "Czy dostępne są urządzenia A4 i A3?", items: [], answer: "Tak, w zależności od aktualnie dostępnego sprzętu." },
  { id: 'faq-10', title: "Czy dostępne są urządzenia wielofunkcyjne ze skanowaniem?", items: [], answer: "Tak, w ofercie znajdują się również urządzenia wielofunkcyjne ze skanowaniem." },
  { id: 'faq-11', title: "Jak liczone są wydruki A3?", items: [], answer: "Każdą wydrukowaną stronę A3 liczymy jak **dwie strony A4**." },
  { id: 'faq-12', title: "Jak szybko możecie podstawić urządzenie zastępcze?", items: [], answer: "W typowych przypadkach do **24 h roboczych**, zależnie od dostępności odpowiedniego urządzenia." },
  { id: 'faq-13', title: "Czy dostarczacie drukarkę zastępczą do Klienta?", items: [], answer: "Warunki dostawy ustalamy przy zgłoszeniu serwisowym." },
  { id: 'faq-14', title: "Czy konfigurujecie drukarkę po dostarczeniu?", items: [], answer: "Możemy wykonać podstawową konfigurację urządzenia i połączenia ze stanowiskiem / siecią, zależnie od zakresu zgłoszenia." },
  { id: 'faq-15', title: "Co zrobić, jeśli drukarka zastępcza ulegnie awarii?", items: [], answer: "Należy skontaktować się z serwisem. Organizujemy naprawę albo wymianę urządzenia, zależnie od dostępności." },
  { id: 'faq-16', title: "Jak długo mogę korzystać z urządzenia zastępczego?", items: [], answer: "Przez uzgodniony okres związany z naprawą urządzenia Klienta." },
  { id: 'faq-17', title: "Czy po zakończeniu naprawy muszę sam zwrócić drukarkę zastępczą?", items: [], answer: "Sposób odbioru / zwrotu urządzenia ustalamy przy zakończeniu naprawy." },
  { id: 'faq-18', title: "Czy drukarka zastępcza jest dostępna zawsze?", items: [], answer: "Nie gwarantujemy dostępności konkretnego modelu w każdym momencie. Dostępność zależy od aktualnej puli urządzeń zastępczych." },
]

export const createDrukarkaZastepczaPricingSections = (): PricingSection[] => {
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
        price: price('akordeon-1.drukarki-mono'),
      },
      {
        id: 'drukarki-kolor',
        title: 'Drukarki A4 (mono+kolor)',
        items: [],
        price: price('akordeon-1.drukarki-kolor'),
      },
      {
        id: 'mfu-mono',
        title: 'MFU A4 (mono)',
        items: [],
        price: price('akordeon-1.mfu-mono'),
      },
      {
        id: 'mfu-kolor',
        title: 'MFU A4 (mono+kolor)',
        items: [],
        price: price('akordeon-1.mfu-kolor'),
      },
    ],
  })

  sections.push({
    id: 'akordeon-2',
    title: 'Laserowe (format A3)',
    footer: 'Każdą wydrukowaną stronę A3 liczymy jak dwie strony A4',
    items: [],
    subcategories: [
      {
        id: 'a3-drukarki-mono',
        title: 'Drukarki A3 (mono)',
        items: [],
        price: price('akordeon-2.a3-drukarki-mono'),
      },
      {
        id: 'a3-drukarki-kolor',
        title: 'Drukarki A3 (mono+kolor)',
        items: [],
        price: price('akordeon-2.a3-drukarki-kolor'),
      },
      {
        id: 'a3-mfu-mono',
        title: 'MFU A3 (mono)',
        items: [],
        price: price('akordeon-2.a3-mfu-mono'),
      },
      {
        id: 'a3-mfu-kolor',
        title: 'MFU A3 (mono+kolor)',
        items: [],
        price: price('akordeon-2.a3-mfu-kolor'),
      },
    ],
  })

  // Добавляем FAQ в конец
  sections.push({
    ...createFaqSection(),
    subcategories: zastepczaFaqSubcategories.map(sub => ({ ...sub })),
  })

  return sections
}
