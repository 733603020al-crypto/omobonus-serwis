import '@/app/styles/accordion.css'
import ServiceAccordion from '@/components/service-accordion'
import { serviceAccordionI18n } from '@/lib/i18n/service-accordion'
import { getDisplayDuration, getDisplayPrice, getServiceDisplayPricing } from '@/lib/services-pricing'
import { services, type PricingSubcategory } from '@/lib/services-data'

// Nazwa urządzenia w tabeli „Ile kosztuje diagnoza i wycena naprawy?”; brak w mapie — tytuł usługi.
const DEVICE_NAMES: Record<string, string> = {
  'serwis-laptopow': 'Laptop',
  'serwis-komputerow-stacjonarnych': 'Komputer stacjonarny',
  'serwis-drukarek-laserowych': 'Drukarka laserowa / kserokopiarka',
  'serwis-drukarek-atramentowych': 'Drukarka atramentowa',
  'serwis-plotterow': 'Ploter',
  'serwis-drukarek-termicznych': 'Drukarka termiczna / etykiet',
  'serwis-drukarek-iglowych': 'Drukarka igłowa',
  'serwis-drukarek-3d': 'Drukarka 3D',
  'serwis-niszczarek': 'Niszczarka',
  'naprawa-zasilaczy-ups': 'Zasilacz awaryjny UPS',
  'naprawa-projektorow': 'Projektor',
  'serwis-drukarek-do-kart-plastikowych': 'Drukarka do kart plastikowych',
  'serwis-drukarek-dtg': 'Drukarka DTG',
  'serwis-drukarek-dtf': 'Drukarka DTF',
  'serwis-drukarek-sublimacyjnych': 'Drukarka sublimacyjna',
  'serwis-drukarek-spozywczych': 'Drukarka spożywcza',
  'serwis-ekspresow-do-kawy': 'Ekspres do kawy',
}

const PRICE_SUB_ID = 'koszt-diagnozy'
// Ikona-zaślepka wszystkich pytań (do wymiany na własne grafiki).
const QUESTION_ICON = '/images/accordion-icon-diagnoza.webp'
// Pytania już ustalone przez właściciela (tytuł/ikona) — reszta treści na razie z szablonu.
const QUESTION_OVERRIDES: Record<string, Partial<PricingSubcategory>> = {
  'naprawy-glowica': {
    title: 'Ile kosztuje wysyłka?',
    icon: '/images/serwis-wysylkowy/modal-naprawa-v2.avif',
    items: [],
    noteBanner: 'Ceny orientacyjne za wysyłkę w jedną stronę, według oficjalnych cenników przewoźników. Dokładna cena zależy od adresu, wymiarów i wagi paczki.',
    infoCards: [
      { title: 'Paczkomat', image: '/images/serwis-wysylkowy/wysylka-paczkomat-v1.avif', imageSize: [720, 478], imageAlt: 'Paczkomat i paczki do wysyłki', rows: [['Gabaryt A — 8 × 38 × 64 cm, do 25 kg', '16,49 zł'], ['Gabaryt B — 19 × 38 × 64 cm, do 25 kg', '18,49 zł'], ['Gabaryt C — 41 × 38 × 64 cm, do 25 kg', '20,49 zł']] },
      { title: 'Kurier', image: '/images/serwis-wysylkowy/wysylka-kurier-v1.avif', imageSize: [720, 389], imageAlt: 'Samochód kurierski i paczki do wysyłki', rows: [['8 × 38 × 64 cm, do 25 kg', '19,49 zł'], ['41 × 38 × 64 cm, do 25 kg', '25,49 zł'], ['40 × 60 × 80 cm, do 31,5 kg', '41,00 zł'], ['60 × 60 × 120 cm, do 31,5 kg', '57,00 zł']] },
    ],
  },
  'naprawy-skaner': {
    title: 'Jak prawidłowo zapakować sprzęt?',
    icon: '/images/serwis-wysylkowy/modal-wysylka-v1.avif',
    items: [],
    infoCards: [
      { title: 'Oryginalne opakowanie', image: '/images/serwis-wysylkowy/pakowanie-oryginalne-v1.avif', imageSize: [720, 458], imageAlt: 'Laptop w oryginalnym kartonie z wkładkami producenta', rows: [['Najlepiej wyślij sprzęt w oryginalnym kartonie, razem z wkładkami producenta.']] },
      { title: 'Nie masz oryginalnego?', image: '/images/serwis-wysylkowy/pakowanie-karton-v2.avif', imageSize: [720, 490], imageAlt: 'Laptop w kartonie z wypełniaczem', rows: [['– Wyłącz urządzenie i owiń je folią bąbelkową.'], ['– Wybierz sztywny, nieuszkodzony karton, w którym zostanie min. 5 cm wolnego miejsca z każdej strony, i wypełnij je wypełniaczem — nic nie może się przesuwać.'], ['– Zaklej karton taśmą.']], note: 'Uwaga:\nNie owijaj kartonu folią stretch — kurier może doliczyć opłatę.\nZa duży karton może podnieść cenę wysyłki — kurierzy liczą wagę także z wymiarów kartonu.' },
    ],
  },
  'naprawy-elektronika': { title: 'Ile to wszystko potrwa?', icon: '/images/serwis-wysylkowy/ile-to-wszystko-potrwa-v1.avif', items: [], intro: '– **Dostawa do serwisu:** zwykle 1–2 dni robocze.\n– **Diagnoza i wycena:** zwykle 1–3 dni robocze od otrzymania paczki.\n– **Naprawa:** według cennika danej usługi (kolumna „Czas realizacji”).\n– **Odesłanie sprzętu:** zwykle 1–2 dni robocze.' },
  'naprawy-software': { title: 'Czy moje dane są bezpieczne?', icon: '/images/serwis-wysylkowy/czy-dane-bezpieczne-v1.avif', items: [], intro: '**Twoje pliki:** nie przeglądamy, nie kopiujemy i nie usuwamy Twoich danych. Jeśli naprawa może na nie wpłynąć (np. wymiana dysku), najpierw to z Tobą uzgodnimy.\n**Umowa o poufności:** na Twoją prośbę podpiszemy umowę o zachowaniu poufności.\n**Hasło:** jest potrzebne, by sprawdzić laptopa po naprawie (np. test pod obciążeniem).\n**Kopia zapasowa:** przed wysyłką zrób kopię ważnych plików — na wszelki wypadek.' },
  'naprawy-uklad-tuszu': { title: 'Nie wiem jak nadać paczkę ani gdzie wydrukować etykietę', icon: '/images/serwis-wysylkowy/etykieta-v2.avif', intro: '**Nie musisz niczego drukować ani zakładać kont u przewoźników – wysyłkę przygotowujemy za Ciebie.**\n\n• **Paczkomat InPost** – wysyłamy Ci SMS-em lub e-mailem kod nadania. Wpisujesz go na ekranie Paczkomatu (albo skanujesz kod QR w aplikacji InPost), skrytka się otwiera i wkładasz paczkę. Bez etykiety.\n\n• **Kurier** – zamawiamy odbiór pod Twój adres. Jeśli przewoźnik wymaga etykiety, kurier przywiezie ją ze sobą lub wystarczy czytelnie napisać na kartonie numer, który od nas dostaniesz.\n\nTy tylko pakujesz urządzenie – a jeśli nie wiesz jak, podpowiemy krok po kroku.', items: [] },
}

// Nowe pytanie — wstawiane zaraz po „Jak prawidłowo zapakować sprzęt?” (naprawy-skaner).
const KARTKA_IMG = '/images/serwis-wysylkowy/kartka-dane-v1.avif'
const PACZKA_SUB: PricingSubcategory = {
  id: 'co-wlozyc-do-paczki',
  title: 'Co włożyć do paczki?',
  icon: KARTKA_IMG,
  items: [],
  infoCards: [
    { title: 'Kartka z Twoimi danymi — obowiązkowo', image: KARTKA_IMG, imageSize: [720, 510], imageAlt: 'Kartka z imieniem, telefonem i opisem usterki', rows: [['Włóż do paczki kartkę z imieniem i nazwiskiem, numerem telefonu i krótkim opisem usterki.'], ['Na etykiecie kurierskiej Twoje dane są ukryte — bez kartki nie będziemy wiedzieć, od kogo jest paczka.']] },
    // Obrazek dojdzie później (image + imageSize + imageAlt) — na razie tekst na całą szerokość.
    { title: 'Co dołączyć do urządzenia?', rows: [['– ładowarkę do laptopa lub zewnętrzny zasilacz,'], ['– nietypowe kable,'], ['– wszystkie tace i kasety na papier — bez nich niektóre drukarki nie działają,'], ['– specjalny papier: składankę do drukarek igłowych, etykiety lub rolki do drukarek termicznych (zapakowane osobno).'], ['Tusze i tonery zostaw w urządzeniu. UPS wyślij w komplecie — niczego nie wyjmuj.'], ['Nie wysyłaj standardowego kabla zasilającego ani kabla USB (mamy własne), myszek, pendrive’ów, kart pamięci, toreb ani etui.']], note: 'Nie wiesz, co dołączyć? Zapytaj nas przed wysyłką.' },
  ],
}

// Cena i czas pełnej diagnozy przy rezygnacji — ten sam wiersz i to samo źródło cen co na stronach usług.
function rejectedQuoteRows() {
  return services.flatMap((s) => {
    const diagnoza = s.pricingSections.find((sec) => sec.id === 'diagnoza')
    const idx = diagnoza?.items.findIndex((it) => /rezygn/i.test(it.service)) ?? -1
    if (idx < 0) return []
    const path = `diagnoza.items.${idx}`
    return [{ slug: s.slug, name: DEVICE_NAMES[s.slug] ?? s.title, price: getDisplayPrice(s.slug, path, 'pl'), duration: getDisplayDuration(s.slug, path, 'pl') }]
  })
}

export function BasicQuestions() {
  const source = services.find((s) => s.slug === 'serwis-drukarek-atramentowych'); if (!source) return null
  const rows = rejectedQuoteRows()
  const priceSub: PricingSubcategory = {
    id: PRICE_SUB_ID,
    title: 'Ile kosztuje diagnoza i wycena naprawy?',
    icon: '/images/serwis-wysylkowy/diagnoza-wycena-v1.avif',
    diagnozaBanner: true,
    columns: ['Pełna diagnoza i wycena naprawy', 'Cena, zł', 'Czas realizacji'],
    items: rows.map((r) => ({ service: r.name, tooltipSlug: r.slug })),
  }
  const rejectSub: PricingSubcategory = {
    id: 'nie-akceptuje-wyceny',
    title: 'Co jeśli nie zaakceptuję wyceny i zrezygnuję z naprawy?',
    icon: '/images/serwis-wysylkowy/stempel-nie.webp',
    intro: '**Nic nie naprawiamy bez Twojej zgody.**\n\nJeśli zrezygnujesz, odeślemy urządzenie, a Ty zapłacisz **tylko za pełną diagnozę i wycenę** (cena zależy od urządzenia — patrz pierwsze pytanie) + wysyłkę w obie strony według cennika kuriera.\n\nZa etykietę, zapakowanie i nadanie paczki nic nie doliczamy.',
    items: [],
  }
  const acceptSub: PricingSubcategory = {
    id: 'akceptuje-naprawe',
    title: 'Jeśli zaakceptuję naprawę, czy diagnoza naprawdę będzie „za darmo”?',
    icon: '/images/serwis-wysylkowy/stempel-tak.webp',
    intro: 'Rozebranie urządzenia, pomiary i znalezienie usterki wymagają czasu i pracy — nie mogą być „za darmo”.\n\nZlecasz naprawę? **Wtedy nie liczymy diagnozy osobno**, bo urządzenie jest już rozebrane i wiemy, co wymienić, więc połowa pracy przy naprawie jest już zrobiona.\n\nPłacisz tylko za samą naprawę (według cennika) i ewentualne części — diagnoza jest już w tej cenie. Do tego dochodzi wysyłka w obie strony według cennika kuriera.',
    items: [],
  }
  const pricing = getServiceDisplayPricing(source.slug, source.pricingSections, 'pl')
  // Pozostałe pytania (na razie treść z drukarek): nowe id, żeby wszędzie była ikona-zaślepka (lupa); ceny przepisane pod nowe id.
  const placeholderSubs = (source.pricingSections.find((s) => s.id === 'naprawy')?.subcategories ?? []).slice(2).flatMap((sub) => {
    const id = `pytanie-${sub.id}`
    sub.items.forEach((_, i) => { pricing.price[`naprawy.${id}.${i}`] = pricing.price[`naprawy.${sub.id}.${i}`]; pricing.duration[`naprawy.${id}.${i}`] = pricing.duration[`naprawy.${sub.id}.${i}`] })
    const q = { ...sub, id, icon: QUESTION_ICON, ...QUESTION_OVERRIDES[sub.id] }
    return sub.id === 'naprawy-skaner' ? [q, PACZKA_SUB] : [q]
  })
  const service = { ...source, pricingSections: source.pricingSections.filter((s) => s.id === 'naprawy').map((s) => ({ ...s, title: 'Najczęściej zadawane pytania (FAQ)', icon: '/images/accordion-icon-faq.webp', mobileTitle: undefined, mobileOpenTitle: undefined, subcategories: [priceSub, acceptSub, rejectSub, ...placeholderSubs] })) }
  rows.forEach((r, i) => { pricing.price[`naprawy.${PRICE_SUB_ID}.${i}`] = r.price; pricing.duration[`naprawy.${PRICE_SUB_ID}.${i}`] = r.duration })
  return (<section className="questions-accordion relative z-10 mx-auto max-w-7xl px-4 md:px-6"><ServiceAccordion service={service} locale="pl" t={{ ...serviceAccordionI18n.pl, viewPriceList: 'Zobacz szczegóły' }} pricing={pricing} defaultOpenSection="naprawy" /></section>)
}
