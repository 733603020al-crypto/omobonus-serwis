'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNearViewport } from '@/lib/use-near-viewport'
import { HeroSpotlight } from '@/components/hero-spotlight'
import { useProcessFlow, ProcessArrows } from '../process-flow'
import { ORIENT_CLASSES, EDGE_CLASSES, CORNER_CLASSES } from './services-card-classes'
import Link from 'next/link'
import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { GOLD_CTA_SIZE } from '@/components/ui/gold-cta'

// "Szybki kontakt" on the light parchment of card 01: same pill and size as GOLD_CTA,
// colours taken from the parchment (avg #e2bc87) and its ink (#3a2817).
const PARCHMENT_CTA =
  // + the GOLD_CTA effects (shiny ring arc, dots, inner shimmer, hover glow, label glint, lift)
  // recoloured to parchment ink tones; the animation itself comes from globals.css.
  'inline-flex items-center justify-center rounded-full font-cormorant font-semibold transition-all duration-300 ease-out !text-[#3a2817] border border-[#3a2817]/55 bg-[linear-gradient(180deg,rgba(242,215,160,0.72),rgba(206,156,92,0.62))] shadow-[inset_0_1px_0_rgba(255,247,224,0.75),0_2px_6px_rgba(58,40,23,0.22)] hover:-translate-y-1 hover:bg-[linear-gradient(180deg,rgba(244,217,160,0.85),rgba(200,148,82,0.75))] hover:shadow-[inset_0_1px_0_rgba(255,247,224,0.75),0_6px_12px_rgba(58,40,23,0.28)] gold-border-flow gold-shiny before:!bg-[conic-gradient(from_calc(var(--gold-flow-angle)_-_var(--gold-shiny-offset)),transparent,#6b4a20_var(--gold-shiny-percent),var(--gold-shiny-shine)_calc(var(--gold-shiny-percent)_*_2),#6b4a20_calc(var(--gold-shiny-percent)_*_3),transparent_calc(var(--gold-shiny-percent)_*_4))] before:!bg-[rgba(58,40,23,0.4)] after:!bg-[linear-gradient(-50deg,transparent,rgba(255,244,214,0.85),transparent)] [&>.gold-text-sweep]:!bg-[linear-gradient(110deg,#3a2817_40%,#a8803c_50%,#3a2817_60%)] [&>.gold-text-sweep]:before:!bg-[radial-gradient(circle_at_2px_2px,#5a3d1c_0.5px,transparent_0)] [&>.gold-text-sweep]:after:!shadow-[inset_0_-1ex_2rem_4px_rgba(176,120,50,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3a2817] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e2bc87]'
// Step number on the process cards: the same "Szybki kontakt" parchment pill
// (PARCHMENT_CTA) as a small circle; it lights up with its card (hover and the
// automatic lift) via .gold-shiny-card in globals.css. Digits in Inter, as the prices.
const STEP_BADGE_BASE = `${PARCHMENT_CTA} pointer-events-none !p-0 gold-shiny-card`
// The same circle in the open window's header, inline before the title; always lit there.
const STEP_BADGE_HEADER = `${STEP_BADGE_BASE} mr-3 h-[30px] w-[30px] flex-none align-middle md:h-[40px] md:w-[40px] data-[lit]:bg-[linear-gradient(180deg,rgba(244,217,160,0.85),rgba(200,148,82,0.75))]`
const STEP_BADGE =
  `${STEP_BADGE_BASE} !absolute z-[5] h-[22px] w-[22px] md:h-[48px] md:w-[48px] md:group-hover:bg-[linear-gradient(180deg,rgba(244,217,160,0.85),rgba(200,148,82,0.75))] data-[lit]:bg-[linear-gradient(180deg,rgba(244,217,160,0.85),rgba(200,148,82,0.75))]`
import type { ServiceData } from '@/lib/services-data'
import { serviceIconSrc as CARD_ICON_SRC, serviceCardBaked as CARD_BAKED } from '@/lib/services-meta-shared'
import manifest from '@/config/KANONICZNY_MANIFEST.json'
import { SERVICE_CATEGORIES, type ServiceCategory, type ServiceLocale } from '@/config/service-categories'
import ServiceAccordion from '@/components/service-accordion'
import { serviceAccordionI18n } from '@/lib/i18n/service-accordion'
import { getServiceDisplayPricing } from '@/lib/services-pricing'
import { services as allServices } from '@/lib/services-data'

// Home cards only: larger, tightly cropped renders of each service's own
// hero image (trimmed to the visible device, no transparent margins), with
// their natural size and the geometry class that places them on the card.
// Services without one fall back to the shared 160px card icon.
const CARD_DEVICE: Record<string, { src: string; w: number; h: number; cls: string }> = {
  'serwis-laptopow': { src: '/images/serwis-laptopow-card-device.webp', w: 399, h: 345, cls: 'tech-laptop' },
  'serwis-komputerow-stacjonarnych': { src: '/images/serwis-komputerow-stacjonarnych-card-device.webp', w: 321, h: 400, cls: 'tech-desktop' },
  'naprawa-drukarek': { src: '/images/naprawa-drukarek-card-device.webp', w: 400, h: 390, cls: 'tech-printer' },
  'serwis-drukarek-3d': { src: '/images/serwis-drukarek-3d-card-device.webp', w: 394, h: 398, cls: 'tech-3d' },
  'serwis-drukarek-termicznych': { src: '/images/serwis-drukarek-termicznych-card-device.webp', w: 400, h: 303, cls: 'tech-label' },
  'serwis-plotterow': { src: '/images/serwis-plotterow-card-device.webp', w: 400, h: 283, cls: 'tech-plotter' },
  'serwis-drukarek-laserowych': { src: '/images/serwis-drukarek-laserowych-card-device.webp', w: 400, h: 355, cls: 'tech-printer' },
  'serwis-drukarek-atramentowych': { src: '/images/serwis-drukarek-atramentowych-card-device.webp', w: 399, h: 306, cls: 'tech-printer' },
  'serwis-drukarek-iglowych': { src: '/images/serwis-drukarek-iglowych-card-device.webp', w: 400, h: 272, cls: 'tech-printer' },
  'wynajem-drukarek': { src: '/images/wynajem-drukarek-card-device.webp', w: 400, h: 311, cls: 'tech-printer' },
  'drukarka-zastepcza': { src: '/images/drukarka-zastepcza-card-device.webp', w: 400, h: 255, cls: 'tech-printer' },
}

// Homepage-only display order (doesn't touch services-data.ts, so sitemap,
// header dropdown and the related-services widget keep their own order).
// Fixed (non-random) edge+orientation+corner assignment for the 10 cards,
// indexed by position in the 3-column grid (0,1,2 / 3,4,5 / 6,7,8 / 9).
// Rules satisfied: no (edge, orientation, corner) triple repeats anywhere;
// no two horizontally- or vertically-adjacent cards share an edge; no two
// horizontally- or vertically-adjacent cards share a real (non-"none")
// corner direction; no corner direction used more than twice; exactly 4
// cards use corner-none.
const CARD_STYLE: { edgeIdx: number; orientIdx: number; cornerIdx: number }[] = [
  { edgeIdx: 0, orientIdx: 0, cornerIdx: 3 }, // 0 laptopów:   edge-a + normal    + corner-bl
  { edgeIdx: 1, orientIdx: 1, cornerIdx: 0 }, // 1 komputery:  edge-b + flipX     + none
  { edgeIdx: 2, orientIdx: 3, cornerIdx: 2 }, // 2 outsourcing: edge-c + rotate180 + corner-tr
  { edgeIdx: 3, orientIdx: 2, cornerIdx: 1 }, // 3 naprawa:    edge-d + flipY     + corner-tl
  { edgeIdx: 4, orientIdx: 0, cornerIdx: 0 }, // 4 plotery:    edge-e + normal    + none
  { edgeIdx: 5, orientIdx: 1, cornerIdx: 4 }, // 5 etykiety:   edge-f + flipX     + corner-br
  { edgeIdx: 6, orientIdx: 3, cornerIdx: 0 }, // 6 drukarki3D: edge-g + rotate180 + none
  { edgeIdx: 7, orientIdx: 2, cornerIdx: 3 }, // 7 druk3D:     edge-h + flipY     + corner-bl
  { edgeIdx: 2, orientIdx: 1, cornerIdx: 2 }, // 8 wynajem:    edge-c + flipX     + corner-tr
  { edgeIdx: 5, orientIdx: 3, cornerIdx: 0 }, // 9 zastępcza:  edge-f + rotate180 + none
]

// The card grid only needs these three fields. Keeping the prop this narrow
// matters: Services is a client component, so everything passed in is
// serialized into the page HTML (the full services dataset was ~145 KB there).
export type ServiceCardData = Pick<ServiceData, 'slug' | 'title' | 'icon'>

interface ServicesT {
  subheading: string
  tagline: string
  cardLabels: Record<string, string>
  moreLabel?: string
}

const PL: ServicesT = {
  subheading: 'Serwis i naprawa bez wychodzenia z domu',
  tagline: 'Oferujemy serwis komputerów, laptopów i drukarek oraz wsparcie techniczne dla domu i biura we Wrocławiu',
  cardLabels: {
    'serwis-laptopow': 'Laptopów',
    'serwis-komputerow-stacjonarnych': 'Komputerów stacjonarnych',
    'outsourcing-it': 'Outsourcing IT',
    'naprawa-drukarek': 'Drukarek i kserokopiarek',
    'serwis-drukarek-3d': 'Drukarek 3D',
    'serwis-drukarek-termicznych': 'Drukarek etykiet',
    'serwis-plotterow': 'Ploterów',
    'serwis-drukarek-laserowych': 'Drukarek laserowych',
    'serwis-drukarek-atramentowych': 'Drukarek atramentowych',
    'serwis-drukarek-iglowych': 'Drukarek igłowych',
    'serwis-drukarek-sublimacyjnych': 'Drukarek sublimacyjnych',
    'serwis-drukarek-dtf': 'Drukarek DTF',
    'serwis-drukarek-dtg': 'Drukarek DTG',
    'serwis-drukarek-spozywczych': 'Drukarek spożywczych',
    'druk-3d-na-zamowienie': 'Druk 3D na zamówienie',
    'serwis-niszczarek': 'Niszczarek',
    'naprawa-zasilaczy-ups': 'Zasilaczy UPS',
    'naprawa-projektorow': 'Projektorów',
    'serwis-ekspresow-do-kawy': 'Ekspresów do kawy',
    'serwis-drukarek-do-kart-plastikowych': 'Drukarek do kart plastikowych',
    'wynajem-drukarek': 'Wynajem drukarek',
    'drukarka-zastepcza': 'Drukarka zastępcza',
  },
  moreLabel: 'Zobacz więcej',
}

// Category tabs: one cell per category, thin gold dividers between them —
// a single row from lg, a 2×2 grid on tablets, one full-width row per
// category on phones (no horizontal overflow).
// Active tab: user's parchment as a 9-slice — burnt edges and curled corners
// keep their proportions, only the plain middle adapts. Phones use the same
// wide picture as desktop (full-width row has the desktop tab's shape).
const PARCHMENT = '[border-image:url(/images/services-tab-parchment.webp)_26_fill/9px_stretch] bg-[url(/images/services-tab-parchment.webp)] p-[5px] bg-[length:100%_100%] bg-no-repeat bg-clip-content'
// Same dark brown as the card names on the parchment cards below.
const PROCESS_STEPS = [
  // Pictures are trimmed to the parchment's edges and fill the whole card,
  // so the cards line up like the category cards above.
  { number: '01', title: 'Zgłoszenie', image: '/images/serwis-wysylkowy/krok-01-zgloszenie.avif', sizes: '(min-width: 1024px) 400px, 100vw', className: 'w-full aspect-[265/100]' },
  { number: '02', title: 'Wysyłka', image: '/images/serwis-wysylkowy/krok-02-wysylka.avif', sizes: '(min-width: 1024px) 400px, 100vw', className: 'w-full aspect-[265/100]' },
  { number: '03', title: 'Diagnostyka i wycena', titleBreak: 1, image: '/images/serwis-wysylkowy/krok-03-diagnostyka.webp', sizes: '(min-width: 1024px) 400px, 100vw', className: 'w-full aspect-[265/100]' },
  { number: '04', title: 'Akceptacja wyceny', description: 'Bez Twojej zgody nie rozpoczynamy naprawy', image: '/images/serwis-wysylkowy/krok-04-pasek.avif', sizes: '(min-width: 768px) 720px, 100vw', className: 'w-full aspect-[1639/331] lg:aspect-auto lg:h-[145.4px]' },
  { number: '05.1', title: 'Naprawa i zwrot', titleBreak: 1, image: '/images/serwis-wysylkowy/krok-05-naprawa-zwrot.avif', sizes: '(min-width: 1024px) 400px, 100vw', className: 'w-full aspect-[265/100]' },
  { number: '05.2', title: 'Zwrot bez naprawy', titleBreak: 1, image: '/images/serwis-wysylkowy/krok-02-wysylka.avif', sizes: '(min-width: 1024px) 400px, 100vw', className: 'w-full aspect-[265/100]' },
] as const

const ACTIVE_INK = '#24160B'
// Gold of the "Skąd nazwa" / "Święty Omobonus XII wieku" headings (about.tsx).
const IDLE_INK = '#bfa76a'
// Tab-only mask copies of two menu icons: their dark inner lines are cut out,
// so a one-colour fill keeps the printer details and the cube edges.
const TAB_ICON_MASK: Record<string, string> = {
  '/images/menu-icon-drukarki-laserowe.webp': '/images/services-tab-mask-drukarki-laserowe.webp',
  '/images/menu-icon-drukarki-3d.webp': '/images/services-tab-mask-drukarki-3d.webp',
}
// Active tab hover = the parchment cards' hover (.services-card-hover in
// globals.css): same lift + scale, shadow, 180ms curve, mouse-only.
const CARD_HOVER_MOVE = 'transition-all duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)] md:group-hover:-translate-y-1 md:group-hover:scale-[1.04] md:hover:-translate-y-1 md:hover:scale-[1.04]'
const CARD_HOVER_SHADOW = 'md:group-hover:shadow-[0_12px_20px_rgba(35,18,8,0.50)] md:hover:shadow-[0_12px_20px_rgba(35,18,8,0.50)]'
// The same hover state, switched on from code (card walk-through).
const CARD_HOVER_ON = 'md:-translate-y-1 md:scale-[1.04] md:shadow-[0_12px_20px_rgba(35,18,8,0.50)]'
// Carousel spotlight on a raised card: still light on the middle of the card's
// title (card share, measured at 1440), flat depth.
// Step 1 window: FAQ under the main block.
const ZGLOSZENIE_FAQ = [
  ['Czy zgłoszenie zobowiązuje mnie do naprawy?', 'Nie. Decyzję podejmiesz po otrzymaniu wyceny.'],
  ['Ile zapłacę, jeśli zrezygnuję z naprawy?', 'Jeśli zrezygnujesz po ustaleniu przyczyny usterki i otrzymaniu wyceny, zapłacisz za diagnozę według ceny dla Twojej kategorii urządzenia oraz za transport. Obie kwoty podamy przed wysyłką.'],
  ['Nie znam przyczyny awarii. Co napisać?', 'Opisz, co nie działa, od kiedy i w jakich sytuacjach. Nie musisz znać technicznej przyczyny.'],
  ['Czy muszę dołączyć zdjęcia lub film?', 'Nie, ale mogą pomóc nam lepiej zrozumieć problem.'],
  ['Czy mogę od razu wysłać urządzenie?', 'Najpierw skontaktuj się z nami, aby ustalić warunki przyjęcia i sposób wysyłki.'],
].map(([title, answer], i) => ({ id: 'zgloszenie-faq-' + (i + 1), title, items: [], answer }))
// Header illustration of the main block (the shared accordion has no picture option).
const ZGLOSZENIE_ICON = '/images/serwis-wysylkowy/modal-zgloszenie-v1.avif'
// Step 1 window: the main block shows this note (as an open FAQ question) instead of a price table.
const ZGLOSZENIE_INFO = {
  sections: [
    {
      title: 'Skontaktuj się z nami przed wysyłką — ustalimy, od czego zacząć',
      text: 'Opisz problem w formularzu, napisz na czacie, zadzwoń lub zostaw numer — oddzwonimy i ustalimy dalsze kroki.\nPodaj markę i model urządzenia, opisz objawy oraz zostaw dane do kontaktu. Jeśli możesz, dołącz zdjęcie tabliczki z modelem, komunikatu błędu lub krótki film pokazujący problem.',
    },
    {
      title: 'Co dalej?',
      text: 'Sprawdzimy zgłoszenie i ustalimy z Tobą dalsze kroki oraz warunki przyjęcia sprzętu. Przed wysyłką poznasz obowiązujący Cię koszt diagnozy w razie rezygnacji z naprawy oraz koszt transportu: odesłania urządzenia do Ciebie, a jeśli przygotujemy etykietę — także wysyłki do serwisu.',
    },
    {
      title: 'Konsultacja przed wysyłką jest bezpłatna. Przyczynę usterki, możliwość i koszt naprawy ustalamy dopiero po diagnostyce urządzenia w serwisie.',
      text: '',
    },
  ],
  button: 'Szybki kontakt',
}
// Step 2 window: same layout as step 1.
const WYSYLKA_FAQ = [
  ['Czy mogę wysłać urządzenie dowolnym przewoźnikiem?', 'Tak. Nadaj paczkę na adres podany w potwierdzeniu zgłoszenia. Możesz też poprosić nas o przygotowanie etykiety.'],
  ['Ile kosztuje wysyłka?', 'Jeśli wysyłasz samodzielnie — według cennika Twojego przewoźnika. Jeśli przygotujemy etykietę — jej koszt podamy, zanim ją przygotujemy. Koszt odesłania urządzenia również podamy wcześniej.'],
  ['Czy mogę wysłać drukarkę w oryginalnym opakowaniu?', 'Tak, to najlepsze rozwiązanie. Jeśli go nie masz, użyj sztywnego kartonu z wypełnieniem.'],
  ['Co, jeśli paczka dotrze uszkodzona?', 'Przy odbiorze sprawdzamy stan opakowania, a każdą paczkę otwieramy, dokumentując jej zawartość zdjęciami i filmem. Jeśli zauważymy uszkodzenie, od razu Cię poinformujemy, zanim rozpoczniemy prace, i przekażemy dokumentację potrzebną do zgłoszenia reklamacji u przewoźnika.'],
].map(([title, answer], i) => ({ id: 'wysylka-faq-' + (i + 1), title, items: [], answer }))
const WYSYLKA_INFO = {
  sections: [
    {
      title: 'Wyślij urządzenie samodzielnie albo poproś nas o etykietę',
      text: 'Możesz nadać paczkę dowolnym przewoźnikiem na adres podany w potwierdzeniu zgłoszenia. Jeśli wolisz, przygotujemy dla Ciebie etykietę dla kuriera lub do Paczkomatu. Jej koszt podamy, zanim ją przygotujemy — opłacimy ją, a Ty zwrócisz nam ten koszt.\nZapakuj urządzenie w sztywny karton z wypełnieniem, tak aby nie przesuwało się w środku. Drukarkę zabezpiecz zgodnie z instrukcją producenta: zablokuj głowicę, wyjmij lub zabezpiecz wkłady i opróżnij podajniki papieru. Nie dołączaj kart pamięci ani akcesoriów, których nie potrzebujemy do naprawy. Przed zapakowaniem zrób kilka zdjęć urządzenia, a numer zgłoszenia umieść na paczce lub w środku.',
    },
    {
      title: 'Co dalej?',
      text: 'Gdy paczka do nas dotrze, otworzymy ją, nagrywając film, i wyślemy Ci e-mailem potwierdzenie przyjęcia z opisem stanu urządzenia. Jeśli zauważymy uszkodzenie, poinformujemy Cię o tym, zanim rozpoczniemy prace.',
    },
    {
      title: 'Transport do serwisu i z powrotem opłacasz niezależnie od wyniku diagnozy i naprawy. Nie jest wliczony w cenę diagnozy ani naprawy.',
      text: '',
    },
  ],
  button: 'Szybki kontakt',
}
// Step 3 window: same layout as steps 1–2.
const DIAGNOSTYKA_FAQ = [
  ['Ile trwa diagnoza?', 'Diagnoza trwa zwykle 1–3 dni robocze od przyjęcia urządzenia.'],
  ['Ile kosztuje diagnoza?', 'Cenę diagnozy dla Twojej kategorii urządzenia podajemy przed wysyłką. Płacisz ją tylko wtedy, gdy po ustaleniu przyczyny usterki i otrzymaniu wyceny zrezygnujesz z naprawy. Jeśli zlecisz naprawę, diagnoza jest wliczona w jej cenę.'],
  ['Co, jeśli nie znajdziecie przyczyny usterki?', 'Powiemy Ci o tym i odeślemy urządzenie. Za diagnozę nie płacisz — pokrywasz tylko transport.'],
  ['Jakie części stosujecie?', 'Rodzaj części podajemy w wycenie. Części innych niż nowe używamy wyłącznie za Twoją zgodą.'],
].map(([title, answer], i) => ({ id: 'diagnostyka-faq-' + (i + 1), title, items: [], answer }))
const DIAGNOSTYKA_INFO = {
  sections: [
    {
      title: 'Sprawdzimy urządzenie i przedstawimy wycenę',
      text: 'Diagnoza trwa zwykle 1–3 dni robocze od przyjęcia urządzenia. W wycenie podamy przyczynę usterki, zakres naprawy, rodzaj części (oryginalne, zamienniki lub odnowione), cenę i przewidywany termin. Konsumentom podajemy cenę brutto.\nJeśli zlecisz naprawę, diagnoza jest wliczona w jej cenę — nie płacisz za nią osobno. Jeśli po otrzymaniu wyceny zrezygnujesz z naprawy — także uznając ją za nieopłacalną — płacisz za diagnozę według ceny uzgodnionej przed wysyłką. Jeśli nie uda nam się ustalić przyczyny usterki, za diagnozę nie płacisz.',
    },
    {
      title: 'Co dalej?',
      text: 'Wycenę otrzymasz e-mailem. Naprawy nie rozpoczniemy bez Twojej akceptacji.',
    },
    {
      title: 'Jeśli naprawa okaże się nieopłacalna albo potrzebna część będzie niedostępna, powiemy Ci o tym od razu i podamy powód.',
      text: '',
    },
  ],
  button: 'Szybki kontakt',
}
// Step 4 window: same layout as steps 1–3.
const AKCEPTACJA_FAQ = [
  ['Ile mam czasu na decyzję?', 'Jeśli nie odpowiesz w ciągu 14 dni od otrzymania wyceny, spróbujemy skontaktować się ponownie. Dalszy brak odpowiedzi traktujemy jako rezygnację z naprawy, a nie jako zgodę.'],
  ['Ile zapłacę, jeśli zrezygnuję?', 'Za diagnozę według ceny uzgodnionej przed wysyłką oraz za transport.'],
  ['Czy mogę wybrać tańsze części?', 'Zapytaj nas — jeśli dostępny jest tańszy wariant (zamienniki lub części odnowione), przedstawimy go. Części innych niż nowe używamy wyłącznie za Twoją zgodą.'],
].map(([title, answer], i) => ({ id: 'akceptacja-faq-' + (i + 1), title, items: [], answer }))
const AKCEPTACJA_INFO = {
  sections: [
    {
      title: 'Ty decydujesz, czy naprawiamy',
      text: 'Wycenę możesz zaakceptować osobiście, telefonicznie, e-mailem, SMS-em lub przez komunikator. Akceptację telefoniczną potwierdzamy e-mailem lub SMS-em.\nJeśli w trakcie naprawy okaże się, że potrzebne są dodatkowe prace lub części albo cena miałaby wzrosnąć, przerwiemy prace i zapytamy Cię o zgodę. Bez niej nie wykonujemy dodatkowych prac i nie pobieramy za nie opłat.',
    },
    {
      title: 'Co dalej?',
      text: 'Akceptujesz wycenę — naprawiamy urządzenie. Rezygnujesz — odsyłamy je bez naprawy.',
    },
    {
      title: 'Bez Twojej zgody nie rozpoczynamy naprawy. Brak odpowiedzi nie oznacza akceptacji.',
      text: '',
    },
  ],
  button: 'Szybki kontakt',
}
// Step 5.1 window: same layout as steps 1–4.
const NAPRAWA_FAQ = [
  ['Kiedy płacę za naprawę?', 'Płatność przyjmujemy przelewem. Konsumenci płacą przed wysłaniem urządzenia, firmy — w terminie wskazanym na fakturze.'],
  ['Ile trwa gwarancja?', 'Okres gwarancji zależy od usługi. Podajemy go w opisie usługi na stronie oraz w dokumencie naprawy, np. na fakturze.'],
  ['Co, jeśli usterka powróci?', 'Zgłoś to e-mailem, telefonicznie lub osobiście, podając numer zlecenia lub faktury i opis usterki. W ramach gwarancji koszt dostarczenia urządzenia do serwisu z terenu Polski pokrywamy my.'],
  ['Co, jeśli paczka dotrze do mnie uszkodzona?', 'Sprawdź przesyłkę przy kurierze i poproś o protokół szkody, a następnie skontaktuj się z nami. Pakowanie każdej przesyłki dokumentujemy zdjęciami i filmem, co pomaga wyjaśnić sprawę z przewoźnikiem. Brak protokołu nie pozbawia konsumenta jego praw.'],
].map(([title, answer], i) => ({ id: 'naprawa-faq-' + (i + 1), title, items: [], answer }))
const NAPRAWA_INFO = {
  sections: [
    {
      title: 'Naprawiamy, testujemy i odsyłamy',
      text: 'Po akceptacji wyceny naprawiamy urządzenie i sprawdzamy jego działanie. Gdy naprawa będzie gotowa, poinformujemy Cię o tym i prześlemy dane do płatności.\nPłatność przyjmujemy przelewem. Konsumenci płacą przed wysłaniem urządzenia, firmy — w terminie wskazanym na fakturze. Urządzenie starannie pakujemy, dokumentując pakowanie zdjęciami i filmem, i wysyłamy ubezpieczoną przesyłką. Wartość do ubezpieczenia i koszt wysyłki ustalimy z Tobą przed nadaniem.\nWymienione części proponujemy zwrócić Ci razem z urządzeniem. Wyjątkiem są części, które musimy oddać dostawcy, oraz części niebezpieczne, np. spuchnięte akumulatory — o takim wyjątku informujemy przed naprawą.',
    },
    {
      title: 'Co dalej?',
      text: 'Po nadaniu prześlemy Ci numer przesyłki. Przy odbiorze sprawdź stan paczki w obecności kuriera, a jeśli jest uszkodzona — poproś o protokół szkody.',
    },
    {
      title: 'Na naprawę udzielamy gwarancji. Jeśli w okresie gwarancji usterka powróci, koszt dostarczenia urządzenia do serwisu z terenu Polski pokrywamy my.',
      text: '',
    },
  ],
  button: 'Szybki kontakt',
}
// Step 5.2 window: same layout; the cost list is three short paragraphs.
const ZWROT_FAQ = [
  ['Ile zapłacę, jeśli nie ustalicie przyczyny usterki?', 'Za diagnozę nie płacisz — pokrywasz tylko transport.'],
  ['Co, jeśli nie odpowiem na wycenę?', 'Jeśli nie odpowiesz w ciągu 14 dni, spróbujemy skontaktować się ponownie. Dalszy brak odpowiedzi traktujemy jako rezygnację z naprawy i informujemy Cię o możliwości odbioru urządzenia.'],
  ['Jak długo przechowujecie urządzenie?', 'Przez 30 dni od zawiadomienia o możliwości odbioru — bezpłatnie. Później naliczamy opłatę za przechowywanie zgodnie z regulaminem. Przypomnimy Ci o tym przed końcem bezpłatnego okresu.'],
].map(([title, answer], i) => ({ id: 'zwrot-faq-' + (i + 1), title, items: [], answer }))
const ZWROT_INFO = {
  sections: [
    {
      title: 'Odsyłamy urządzenie bez naprawy',
      text: 'Jeśli zrezygnujesz z naprawy albo nie ustalimy przyczyny usterki, odeślemy Ci urządzenie. Należności rozliczamy przed wysyłką: konsumenci płacą przelewem przed wysłaniem urządzenia, firmy — w terminie wskazanym na fakturze.',
    },
    {
      title: 'Ile zapłacisz?',
      text: '',
      // Bulleted list: bold opening condition + the rest of the item.
      list: [
        ['Rezygnujesz po otrzymaniu wyceny', ' (także gdy uznasz naprawę za nieopłacalną) — płacisz za diagnozę według ceny uzgodnionej przed wysyłką oraz za transport.'],
        ['Nie ustalimy przyczyny usterki', ' — za diagnozę nie płacisz, pokrywasz tylko transport.'],
      ],
    },
    {
      title: 'Co dalej?',
      text: 'Po nadaniu prześlemy Ci numer przesyłki. Przy odbiorze sprawdź stan paczki w obecności kuriera, a jeśli jest uszkodzona — poproś o protokół szkody.',
    },
    {
      title: 'Jeśli nie możesz od razu odebrać przesyłki lub rozliczyć należności, przechowamy urządzenie bezpłatnie przez 30 dni od zawiadomienia.',
      text: '',
    },
  ],
  button: 'Szybki kontakt',
}
// Steps that open a window: its title, header picture, note and FAQ.
const STEP_WINDOWS = {
  '01': { title: '1. Zgłoszenie', icon: ZGLOSZENIE_ICON, info: ZGLOSZENIE_INFO, faq: ZGLOSZENIE_FAQ },
  '02': { title: '2. Wysyłka', icon: '/images/serwis-wysylkowy/modal-wysylka-v1.avif', info: WYSYLKA_INFO, faq: WYSYLKA_FAQ },
  '03': { title: '3. Diagnostyka i wycena', icon: '/images/serwis-wysylkowy/modal-diagnostyka-v1.avif', info: DIAGNOSTYKA_INFO, faq: DIAGNOSTYKA_FAQ },
  // No picture of its own yet: the card's TAK stamp.
  '04': { title: '4. Akceptacja wyceny', icon: '/images/serwis-wysylkowy/stempel-tak.webp', info: AKCEPTACJA_INFO, faq: AKCEPTACJA_FAQ },
  '05.1': { title: '5.1. Naprawa i zwrot', icon: '/images/serwis-wysylkowy/modal-naprawa-v2.avif', info: NAPRAWA_INFO, faq: NAPRAWA_FAQ },
  '05.2': { title: '5.2. Zwrot bez naprawy', icon: '/images/serwis-wysylkowy/modal-zwrot-bez-naprawy-v1.avif', info: ZWROT_INFO, faq: ZWROT_FAQ },
}
type WindowStep = keyof typeof STEP_WINDOWS
const isWindowStep = (n: string): n is WindowStep => n in STEP_WINDOWS
// Main block of the step 1 window: price columns, "Zobacz cennik" and the table are left out.
const ZGLOSZENIE_MAIN = '[&_.diagnoza-open-header-row>div:nth-child(2)]:!hidden [&_.accordion-scroll]:!max-h-none [&_.accordion-scroll]:!overflow-y-visible [&_.accordion-scroll]:!border-0 [&_.accordion-scroll]:!pb-0 [&_.accordion-scroll>.rounded-lg]:!border-0 [&_.accordion-scroll>.rounded-lg]:!outline-0 [&_.accordion-scroll>.rounded-lg>:not([data-zgloszenie-info])]:!hidden'
// Same highlight as an open FAQ question (globals.css, [data-faq-item] trigger ::before).
const FAQ_OPEN_ROW = 'linear-gradient(90deg, rgba(114, 80, 43, 0.11) 0%, rgba(114, 80, 43, 0.06) 55%, transparent 100%)'
// The site's quick contact (the /kontakt page blocks), loaded only when asked for.
const FLAT_DEPTH = '/images/serwis-wysylkowy/flat-depth.webp'
const SPOT_POINT: Record<string, { x: number; y: number }> = {
  '01': { x: 0.25, y: 0.45 },
  '02': { x: 0.22, y: 0.45 },
  '03': { x: 0.28, y: 0.45 },
  '04': { x: 0.5, y: 0.35 },
  '05.1': { x: 0.25, y: 0.45 },
  '05.2': { x: 0.28, y: 0.45 },
}

// "Drukarek (kserokopiarek) biurowych" vs phone "Drukarek biurowych": returns
// [before, hidden part, after] when the phone label is the title without one
// bracketed fragment, so the heading carries the full title only once.
function splitMobileTitle(category: ServiceCategory, locale: ServiceLocale): [string, string, string] | null {
  if (!category.titleMobile) return null
  const title = (category.homeTitle ?? category.title)[locale]
  const m = title.match(/\s*\([^)]*\)/)
  if (!m || m.index === undefined) return null
  const before = title.slice(0, m.index)
  const after = title.slice(m.index + m[0].length)
  return before + after === category.titleMobile[locale] ? [before, m[0], after] : null
}

export function Services({
  servicesData,
  basePath = '/uslugi',
  t,
  bare = false,
  locale = 'pl',
  categories = SERVICE_CATEGORIES,
  showHeading = true,
  sectionClassName = 'relative pt-7 pb-7 md:pt-12 md:pb-10 text-center text-white overflow-hidden',
  centerLastRow = false,
}: {
  servicesData?: ServiceCardData[]
  basePath?: string
  t?: ServicesT
  bare?: boolean
  locale?: ServiceLocale
  /** Tabs to show (the printer page passes its own printer-only set). */
  categories?: ServiceCategory[]
  /** The big "Serwis i naprawa" heading above the tabs (home only). */
  showHeading?: boolean
  sectionClassName?: string
  /** Printer page: an incomplete last row of cards is centred (same card width and gaps). */
  centerLastRow?: boolean
} = {}) {
  const services = servicesData ?? []
  const d = t ?? PL
  const [active, setActive] = useState(0)
  // Which step's window is open (null = none).
  const [windowStep, setWindowStep] = useState<WindowStep | null>(null)
  const isDiagnosisModalOpen = windowStep !== null
  const stepWindow = STEP_WINDOWS[windowStep ?? '01']
  // Number for the header circle: steps 1–4 only (5.1/5.2 have no circle).
  const windowBadge = (windowStep ?? '01').startsWith('05') ? null : (windowStep ?? '01').replace(/^0/, '')
  const setDiagnosisModalOpen = (open: false) => setWindowStep(open || null)
  const diagnosisModalRef = useRef<HTMLDivElement>(null)
  const diagnosisTriggerRef = useRef<HTMLElement | null>(null)
  const diagnosisScrollRef = useRef<HTMLDivElement>(null)
  // Spot inside the shared accordion's open content where the card 1 note is rendered.
  const [zgloszenieSlot, setZgloszenieSlot] = useState<HTMLElement | null>(null)
  // Desktop only: where the parchment top and the close button go (null = phone layout).
  const [diagnosisLayout, setDiagnosisLayout] = useState<{ top: number; crossX: number; crossY: number } | null>(null)
  // Phones only: every category starts folded; a second tap on the open one folds it again.
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767.98px)')
    const onChange = () => { if (!mq.matches) setCollapsed(false) }
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const idBase = useId()
  // Baked card pictures sit below the first screen: fetched only on approach.
  const sectionRef = useRef<HTMLElement>(null)
  const bgNear = useNearViewport(sectionRef)
  const flowRef = useRef<HTMLDivElement>(null)
  const flow = useProcessFlow(flowRef, isDiagnosisModalOpen)
  // Spotlights mount (and fetch their pictures) only as the cards draw near.
  const flowNear = useNearViewport(flowRef, '50%')

  useEffect(() => {
    if (!isDiagnosisModalOpen) return
    const previousActive = document.activeElement as HTMLElement | null
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    // The shared accordion scrolls the page to an opened block; the page stays where it was.
    const pageY = window.scrollY
    const holdPage = () => {
      if (window.scrollY !== pageY) window.scrollTo(0, pageY)
    }
    window.addEventListener('scroll', holdPage)

    const modal = diagnosisModalRef.current
    const trigger = modal?.querySelector<HTMLElement>('[data-slot="accordion-trigger"]') ?? null
    diagnosisTriggerRef.current = trigger
    trigger?.click()
    modal?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      const outside = document.activeElement && document.activeElement !== document.body && !modal?.contains(document.activeElement)
      if (event.key === 'Escape') {
        if (outside) return
        event.preventDefault()
        setDiagnosisModalOpen(false)
        return
      }
      if (event.key !== 'Tab' || !modal || outside) return
      const focusable = Array.from(modal.querySelectorAll<HTMLElement>('button, [href], input:not([type="hidden"]):not([tabindex="-1"]), textarea, select, [tabindex]:not([tabindex="-1"])'))
        .filter((el) => !el.hasAttribute('disabled') && el.getClientRects().length > 0)
      if (focusable.length === 0) {
        event.preventDefault()
        modal.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', holdPage)
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      diagnosisTriggerRef.current = null
      // Back to the card the window was opened from, without moving the page.
      previousActive?.focus({ preventScroll: true })
    }
  }, [isDiagnosisModalOpen])

  // Card 1 note goes into the main block's open content (the shared accordion has no slot for it).
  useLayoutEffect(() => {
    if (!isDiagnosisModalOpen) return
    // Inside the price-table box: the shared parchment is sized to that box's bottom edge.
    const content = diagnosisScrollRef.current?.querySelector<HTMLElement>('[data-main-accordion="true"] .accordion-scroll > .rounded-lg')
    if (!content) return
    const slot = document.createElement('div')
    slot.dataset.zgloszenieInfo = 'true'
    content.prepend(slot)
    setZgloszenieSlot(slot)
    return () => {
      slot.remove()
      setZgloszenieSlot(null)
    }
  }, [isDiagnosisModalOpen])

  // The shared accordion sizes its parchment on open/resize; re-run it once the note is in place.
  // Then keep the site's spacing under it: the next block starts 16px below the parchment's torn edge
  // (the shared accordion does this only for blocks inside the same list, the FAQ is a separate one).
  useEffect(() => {
    if (!zgloszenieSlot) return
    const wrap = zgloszenieSlot.closest<HTMLElement>('[data-main-accordion="true"]')?.parentElement
    const img = wrap?.querySelector<HTMLImageElement>('section > img')
    const faq = diagnosisScrollRef.current?.querySelectorAll<HTMLElement>('[data-main-accordion="true"]')[1]
    if (!wrap || !img || !faq) return
    const RAGGED_ANCHOR = 1077 / 1121 // same source fraction as the shared accordion
    const fitGap = () => {
      wrap.style.marginBottom = '0px'
      const r = img.getBoundingClientRect()
      if (!r.height) return
      const target = r.top + RAGGED_ANCHOR * r.height + 16
      wrap.style.marginBottom = `${Math.max(0, target - faq.getBoundingClientRect().top)}px`
    }
    const raf = requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'))
      fitGap()
    })
    const ro = new ResizeObserver(fitGap)
    ro.observe(img)
    ro.observe(zgloszenieSlot)
    window.addEventListener('resize', fitGap)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('resize', fitGap)
      wrap.style.marginBottom = ''
    }
  }, [zgloszenieSlot])

  // Exactly one of the two blocks is open: toggling one flips the other.
  useEffect(() => {
    if (!isDiagnosisModalOpen) return
    const scroller = diagnosisScrollRef.current
    const [main, faq] = Array.from(scroller?.querySelectorAll<HTMLElement>('[data-main-accordion="true"]') ?? [])
    const mainItem = main?.querySelector<HTMLElement>(':scope > [data-slot="accordion-item"]')
    const faqItem = faq?.querySelector<HTMLElement>(':scope > [data-slot="accordion-item"]')
    if (!mainItem || !faqItem) return
    const mo = new MutationObserver((records) => {
      const changed = records[records.length - 1].target as HTMLElement
      const other = changed === mainItem ? faqItem : mainItem
      if (changed.dataset.state !== other.dataset.state) return
      other.querySelector<HTMLElement>('[data-slot="accordion-trigger"]')?.click()
      scroller!.scrollTop = 0
    })
    mo.observe(mainItem, { attributes: true, attributeFilter: ['data-state'] })
    mo.observe(faqItem, { attributes: true, attributeFilter: ['data-state'] })
    return () => mo.disconnect()
  }, [isDiagnosisModalOpen])

  // The shared accordion picks its own header picture: swap it before the first paint.
  useLayoutEffect(() => {
    if (!isDiagnosisModalOpen) return
    const icon = diagnosisScrollRef.current?.querySelector<HTMLImageElement>('.zakres-icon-media')
    if (icon) icon.src = stepWindow.icon
    // Step 4: a NIE stamp on the right, mirroring the TAK picture on the left (not on phones — no room).
    const plate = icon?.closest<HTMLElement>('[data-slot="accordion-trigger"]')?.parentElement?.parentElement
    if (!icon || !plate || windowStep !== '04') return
    const nie = document.createElement('img')
    nie.src = '/images/serwis-wysylkowy/stempel-nie.webp'
    nie.alt = ''
    nie.setAttribute('aria-hidden', 'true')
    nie.className = 'pointer-events-none absolute z-[3] object-contain opacity-90 max-md:hidden'
    const place = () => {
      const a = icon.getBoundingClientRect()
      const p = plate.getBoundingClientRect()
      Object.assign(nie.style, { right: a.left - p.left + 'px', top: a.top - p.top + 'px', width: a.width + 'px', height: a.height + 'px' })
    }
    place()
    plate.appendChild(nie)
    window.addEventListener('resize', place)
    return () => {
      window.removeEventListener('resize', place)
      nie.remove()
    }
  }, [isDiagnosisModalOpen, stepWindow, windowStep])

  // Desktop: the visible parchment top sits on the vertical middle of the site
  // menu, and the close button 22px right of the parchment's right edge.
  // Measured from the real elements, so it follows any window size.
  useEffect(() => {
    if (!isDiagnosisModalOpen) {
      setDiagnosisLayout(null)
      return
    }
    const modal = diagnosisModalRef.current
    const scroller = diagnosisScrollRef.current
    if (!modal || !scroller) return
    const desktop = window.matchMedia('(min-width: 768px)')
    let raf = 0
    const measure = () => {
      raf = 0
      const item = scroller.querySelector<HTMLElement>('[data-slot="accordion-item"]')
      const header = document.querySelector('header')
      if (!desktop.matches) {
        setDiagnosisLayout(null)
        return
      }
      // Quick contact view: the window keeps the place measured on the card.
      if (!item || !header) return
      const h = header.getBoundingClientRect()
      const box = modal.getBoundingClientRect()
      // The header plate pokes out a little past the item box: take the real visible edges.
      let top = Infinity
      let right = 0
      for (const el of [item, ...item.querySelectorAll<HTMLElement>('*')]) {
        const r = el.getBoundingClientRect()
        if (!r.width || !r.height) continue
        top = Math.min(top, r.top)
        right = Math.max(right, r.right)
      }
      const parchmentTop = top - box.top + scroller.scrollTop
      const crossX = Math.min(right - box.left + 22, window.innerWidth - 8 - 40 - box.left)
      const next = { top: Math.round(h.top + h.height / 2 - parchmentTop), crossX: Math.round(crossX), crossY: Math.round(parchmentTop) }
      setDiagnosisLayout((prev) => (prev && prev.top === next.top && prev.crossX === next.crossX && prev.crossY === next.crossY ? prev : next))
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure)
    }
    schedule()
    const ro = new ResizeObserver(schedule)
    ro.observe(scroller)
    if (scroller.firstElementChild) ro.observe(scroller.firstElementChild)
    window.addEventListener('resize', schedule)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [isDiagnosisModalOpen])

  // Every category's cards are in the HTML (search engines see all services
  // and their links without clicking a tab); the inactive panels are simply
  // display:none, so their lazy pictures aren't fetched until opened.
  const categoryCards = (index: number) => [...categories[index].items, ...(categories[index].subgroup?.items ?? [])]
    .filter((item) => !item.menuOnly && (!item.locales || item.locales.includes(locale)))
    .map((item) => {
      const slug = item.href.split('/').pop() as string
      return services.find((service) => service.slug === slug) ?? { slug, title: item.label[locale], icon: typeof item.icon === 'string' ? item.icon : '' }
    })

  const selectTab = (index: number) => {
    const count = categories.length
    const next = (index + count) % count
    setActive(next)
    setCollapsed(false)
    tabRefs.current[next]?.focus()
  }

  // Phones: after switching, the open category may have jumped up past the
  // fixed header (the previous panel above it closed) — bring it back in view.
  const openTab = (index: number) => {
    if (!window.matchMedia('(max-width: 767.98px)').matches) {
      setActive(index)
      return
    }
    if (index === active && !collapsed) {
      setCollapsed(true)
      return
    }
    setActive(index)
    setCollapsed(false)
    requestAnimationFrame(() => {
      const top = tabRefs.current[index]?.getBoundingClientRect().top ?? 0
      const header = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0
      if (top < header + 8) window.scrollBy({ top: top - header - 8 })
    })
  }

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === 'ArrowRight') selectTab(index + 1)
    else if (e.key === 'ArrowLeft') selectTab(index - 1)
    else if (e.key === 'Home') selectTab(0)
    else if (e.key === 'End') selectTab(categories.length - 1)
    else return
    e.preventDefault()
  }

  const renderProcessCard = (step: typeof PROCESS_STEPS[number]) => (
    <article
      key={step.number}
      data-step={step.number}
      role={isWindowStep(step.number) ? 'button' : undefined}
      tabIndex={isWindowStep(step.number) ? 0 : undefined}
      onClick={isWindowStep(step.number) ? () => setWindowStep(step.number as WindowStep) : undefined}
      onKeyDown={isWindowStep(step.number) ? (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          setWindowStep(step.number as WindowStep)
        }
      } : undefined}
      className={`group relative ${step.className} ${CARD_HOVER_MOVE} ${CARD_HOVER_SHADOW} ${flow.lift.includes(step.number) ? CARD_HOVER_ON : ''}`}
    >
      <Image
        src={step.image}
        alt=""
        fill
        sizes={step.sizes}
        data-spot={step.number === '04' ? undefined : ''}
        className={`object-fill ${step.number === '04' ? 'lg:hidden' : ''}`}
      />
      {flowNear && step.number !== '04' && (
        <HeroSpotlight src={step.image} depth={FLAT_DEPTH} hide="img[data-spot]" lit={flow.lift.includes(step.number)} point={SPOT_POINT[step.number]} style={{}} className="pointer-events-none absolute inset-0 h-full w-full" />
      )}
      {/* Desktop step 04 is narrower than its strip: both burnt ends stay at
          the strip's own scale, only a slice of the plain middle is left out
          (no stretching). */}
      {step.number === '04' && (['left', 'right'] as const).map((side) => (
        <div key={side} aria-hidden="true" className={`pointer-events-none absolute inset-y-0 w-1/2 overflow-hidden max-lg:hidden ${side === 'left' ? 'left-0' : 'right-0'}`}>
          <Image src={step.image} alt="" width={1639} height={331} sizes={step.sizes} className={`absolute top-0 h-full w-auto max-w-none ${side === 'left' ? 'left-0' : 'right-0'}`} />
          {flowNear && <HeroSpotlight src={step.image} depth={FLAT_DEPTH} hide="img" lit={flow.lift.includes('04')} point={SPOT_POINT[step.number]} style={{}} className={`absolute top-0 h-full w-auto max-w-none ${side === 'left' ? 'left-0' : 'right-0'}`} />}
        </div>
      ))}
      {/* Step 04: plain strip with separate stamps (TAK left, NIE right),
          so other languages only swap the stamp pictures. */}
      {step.number === '04' && (
        <>
          <Image src="/images/serwis-wysylkowy/stempel-nie.webp" alt="" width={407} height={224} sizes="(min-width: 768px) 160px, 17vw" className="pointer-events-none absolute right-[4.5%] top-1/2 z-[3] w-[22%] -translate-y-1/2 max-md:right-[3%] max-md:w-[17%] md:right-[14px] md:w-[140px]" />
          <Image src="/images/serwis-wysylkowy/stempel-tak.webp" alt="" width={406} height={226} sizes="(min-width: 768px) 160px, 17vw" className="pointer-events-none absolute left-[3.5%] top-1/2 z-[3] w-[22%] -translate-y-1/2 max-md:left-[36px] max-md:w-[13%] md:left-[14px] md:w-[140px]" />
        </>
      )}
      {/* Step 05.2: the shipping card with a language stamp on the box. */}
      {step.number === '05.2' && (
        <Image src="/images/serwis-wysylkowy/stempel-zwrot-v4.avif" alt="" width={510} height={207} sizes="(min-width: 1024px) 170px, 42vw" className="pointer-events-none absolute right-[5%] top-[55%] z-[3] w-[40%] -translate-y-1/2 -rotate-6" />
      )}
      {!step.number.startsWith('05') && (
        <span aria-hidden="true" data-lit={flow.lift.includes(step.number) ? '' : undefined} className={`${STEP_BADGE} ${step.number === '04' ? 'left-[10px] top-[25px] md:left-[162px] md:top-[8px]' : 'left-[18px] top-[10px] md:left-[14px] md:top-[8px]'}`}>
          <span className="gold-text-sweep font-inter text-[12px] font-semibold leading-none md:text-[24px]">{step.number.replace(/^0/, '')}</span>
        </span>
      )}
      <div className={`relative z-[4] flex h-full flex-col text-[#24160B] ${step.number === '04'
        ? 'mx-auto max-w-[38%] items-center justify-center text-center md:max-w-none'
        : `max-w-[49%] items-start justify-center py-4 pl-6 pr-3 text-left md:pl-8 ${step.number === '03' ? 'md:pt-[50px]' : step.number.startsWith('05') ? '' : 'md:pt-[24px]'}`
      }`}>
        {/* The number lives in the circle (STEP_BADGE), not in the title. */}
        <h3 className="whitespace-nowrap font-cormorant font-bold text-[#24160B] leading-[1.05] text-[24px] md:text-[length:min(28px,8.05cqi)]">
          {!step.number.startsWith('05') && <span className="sr-only">{step.number.replace(/^0/, '')}. </span>}
          {'titleBreak' in step ? (
            <>
              {step.title.split(' ').slice(0, step.titleBreak).join(' ')}
              <br />
              {step.title.split(' ').slice(step.titleBreak).join(' ')}
            </>
          ) : step.title}
        </h3>
        {/* Only step 04 keeps a line under the title; phones let it wrap. */}
        {'description' in step && (
          <p className="mt-1 font-cormorant text-xs font-semibold leading-[1.2] text-[#352414] md:whitespace-nowrap md:text-[16px] md:leading-[1.4]">
            {step.description}
          </p>
        )}
        {/* Same "Zobacz więcej →" as the service cards on the home page:
            right under the title, 12px. */}
        <span className={`flex items-center gap-2 text-xs font-cormorant font-normal leading-[1.2] text-[#3A2817] transition-transform group-hover:translate-x-1 ${'description' in step ? 'mt-1 max-md:hidden' : ''}`}>
          <span>{d.moreLabel ?? 'Zobacz więcej'}</span>
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </article>
  )

  const renderCard = (service: ServiceCardData, style: { edgeIdx: number; orientIdx: number; cornerIdx: number }) => {
    return (
      <Link
        key={service.slug}
        href={`${basePath}/${service.slug}`}
        prefetch={false}
        className={`
    group
    relative
    [container-type:inline-size]
    ${CARD_BAKED[service.slug] ? 'md:min-h-[168px]' : 'min-h-[168px]'}
    py-4 pl-6 md:pl-8 pr-3
    flex
    items-center
    text-left
    w-full
    zakres-paper-card
    services-home-card
    services-card-hover
    isolate
    ${CARD_BAKED[service.slug] ? 'services-card-baked' : ''}
    ${EDGE_CLASSES[style.edgeIdx]}
    ${ORIENT_CLASSES[style.orientIdx]}
    ${CORNER_CLASSES[style.cornerIdx]}
  `}
        style={CARD_BAKED[service.slug] && bgNear ? ({ '--baked-d': `url(${CARD_BAKED[service.slug].d})`, '--baked-m': `url(${CARD_BAKED[service.slug].m})` } as React.CSSProperties) : undefined}
      >
        {/* Treść — name at the left edge, small "Zobacz więcej →" under it. */}
        <div className="relative z-[4] flex-none max-w-[49%] flex flex-col items-start">
          <h3 className="font-cormorant font-bold text-[#24160B] leading-[1.05] text-[24px] md:text-[length:min(28px,8.05cqi)]">
            {d.cardLabels[service.slug] ?? service.title}
          </h3>
          {/* Same as the closed-section "Zobacz cennik" link on the service pages. */}
          <span className="flex items-center gap-2 text-xs font-cormorant font-normal leading-[1.2] text-[#3A2817] group-hover:translate-x-1 transition-transform">
            <span>{d.moreLabel ?? 'Zobacz więcej'}</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Technika — layers over the parchment (0): brown patch (1), gold
            glow (2), device (3); text is on top (4). Nothing here clips, so
            the glow and shadow may spill past the parchment. */}
        {!CARD_BAKED[service.slug] && (
        <div className="tech-wrap">
          <Image
            src={CARD_DEVICE[service.slug]?.src ?? CARD_ICON_SRC[service.slug] ?? service.icon}
            alt={`${service.title} Wrocław - ikona usługi serwisowej`}
            width={CARD_DEVICE[service.slug]?.w ?? 160}
            height={CARD_DEVICE[service.slug]?.h ?? 160}
            sizes="(max-width: 768px) 50vw, 200px"
            className={`tech-image ${CARD_DEVICE[service.slug]?.cls ?? 'tech-printer'}`}
          />
        </div>
        )}
      </Link>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="uslugi"
      className={sectionClassName}
    >

      {/* Tło */}
      {!bare && (
        <div className="absolute inset-0">
          <Image
            src={manifest.services_background}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Zawartość */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {showHeading && (
        <div className="text-center mt-[10px] mb-5">
          {/* Same weight/line-height as "Serwis i naprawa" in the home hero H1; desktop 0.93em of its 60px,
              phones ~18% larger than before (was 0.93*clamp(28px,8.4vw,46px)). */}
          <h2
            className="font-cormorant font-bold text-[hsl(45_25%_95%)] leading-none mx-auto mb-0 max-w-full whitespace-normal break-words text-[calc(1.09*clamp(33px,9.9vw,54px))] md:whitespace-nowrap md:max-w-none md:text-[55.8px]"
            style={{ letterSpacing: '0.2px', textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
          >
            {d.subheading}
          </h2>
          <p className="mt-px text-[20px] text-[#bfa76a] font-cormorant italic leading-tight font-semibold drop-shadow-2xl">
            Wyślij do nas laptop, drukarkę lub inne urządzenie. My zajmiemy się resztą.
          </p>
        </div>
        )}

        {/* Phones: a vertical accordion — the tablist is display:contents, so its cells
            and the one card panel are flex items here, ordered by --m-order: the
            panel sits right below the open category. Tablet/desktop: plain tabs. */}
        <div className="max-md:flex max-md:flex-col max-md:gap-[6px]">
        {/* Category panel (same dark plate + gold hairline as the header menu). */}
        {/* Category buttons are intentionally hidden for this prototype; service cards remain below. */}
        {false && <div
          role="tablist"
          aria-label={d.subheading}
          className={`max-md:contents md:mb-6 md:grid md:grid-cols-2 md:gap-[6px] ${categories.length === 3 ? 'lg:grid-cols-[repeat(3,auto)]' : 'lg:grid-cols-[repeat(4,auto)]'}`}
        >
          {categories.map((category, i) => {
            // Folded (phones only): the category looks and reads as closed.
            const selected = i === active && !collapsed
            return (
              // Each category name is the section's H2 for search engines; role=presentation
              // keeps the tab structure intact for screen readers.
              <h2 key={category.title.pl} role="presentation" className="group relative max-md:[order:var(--m-order)]" style={{ '--m-order': i <= active ? i : i + 1 } as React.CSSProperties}>
                {/* Active parchment fills the whole cell (not just the button inside it). */}
                {selected && <span aria-hidden="true" className={`pointer-events-none absolute inset-0 border border-solid will-change-transform ${CARD_HOVER_MOVE} ${CARD_HOVER_SHADOW} ${PARCHMENT}`} />}
                <button
                  ref={(el) => { tabRefs.current[i] = el }}
                  type="button"
                  role="tab"
                  id={`${idBase}-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`${idBase}-panel-${i}`}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => openTab(i)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className={`relative flex h-full min-h-[52px] w-full flex-row items-center justify-start gap-3 rounded-md border px-4 py-2 text-left font-cormorant text-[18px] font-semibold leading-tight hyphens-auto md:min-h-0 md:px-3 md:py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6cc82] md:text-[20px] ${
                    selected
                      ? `border-transparent text-[#24160B] ${CARD_HOVER_MOVE}`
                      : // Same hover as the items of the header Usługi menu; thin gold ring of the
                        // Szybki kontakt button: closed frame at rest, its glint runs only while hovered.
                        // Hover glow only from md: on phones a tap just switches the category.
                        'gold-border-flow !border-[#bfa76a]/80 bg-black/55 before:opacity-0 before:![animation-play-state:paused] md:hover:before:opacity-100 md:hover:before:![animation-play-state:running] text-white transition-all duration-300 ease-out md:hover:-translate-y-0.5 md:hover:border-[#bfa76a]/80 md:hover:bg-gradient-to-r md:hover:from-[#bfa76a]/40 md:hover:via-[#bfa76a]/20 md:hover:to-transparent md:hover:text-[#f3df9a] md:hover:shadow-[0_0_30px_rgba(191,167,106,0.45)] md:hover:[text-shadow:0_0_12px_rgba(191,167,106,0.65)] md:[&:hover_img]:opacity-100'
                  }`}
                >
                  {/* Same icon shape, filled with one colour: card-name brown when active,
                      gold of the "Skąd nazwa" headings otherwise. */}
                  <span
                    aria-hidden="true"
                    className="h-[22px] w-[28px] flex-shrink-0 md:h-[27px] md:w-[34px]"
                    style={{
                      backgroundColor: selected ? ACTIVE_INK : IDLE_INK,
                      maskImage: `url(${TAB_ICON_MASK[category.icon] ?? category.icon})`,
                      WebkitMaskImage: `url(${TAB_ICON_MASK[category.icon] ?? category.icon})`,
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                    }}
                  />
                  {splitMobileTitle(category, locale) ? (
                    // One heading text: the part missing from the phone label is hidden there.
                    <span>
                      {splitMobileTitle(category, locale)![0]}
                      <span className="max-md:hidden">{splitMobileTitle(category, locale)![1]}</span>
                      {splitMobileTitle(category, locale)![2]}
                    </span>
                  ) : category.titleMobile ? (
                    <>
                      <span className="md:hidden">{category.titleMobile[locale]}</span>
                      <span className="max-md:hidden">{(category.homeTitle ?? category.title)[locale]}</span>
                    </>
                  ) : (
                    <span>{(category.homeTitle ?? category.title)[locale]}</span>
                  )}
                  {/* Phones: accordion arrow (same chevron as the mobile menu's Usługi). */}
                  <ChevronDown aria-hidden="true" className={`ml-auto h-5 w-5 flex-shrink-0 transition-transform duration-200 md:hidden ${selected ? 'rotate-180' : ''}`} />
                </button>
              </h2>
            )
          })}
        </div>}

        <div ref={flowRef} className="relative mx-auto flex w-full max-w-7xl flex-col gap-4">
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
            {PROCESS_STEPS.slice(0, 3).map(renderProcessCard)}
          </div>
          <div className="flex w-full justify-center">
            <div className="relative w-full max-w-[720px] lg:max-w-[650px]">
              {renderProcessCard(PROCESS_STEPS[3])}
            </div>
          </div>
          {/* Desktop: 5.1 and 5.2 keep the top-row card width and sit together
              in the centre, 120px apart, with "— lub —" in the middle of the gap. */}
          <div className="grid w-full grid-cols-1 items-center gap-4 lg:flex lg:justify-center lg:gap-0">
            <div className="lg:w-[calc((100%-2rem)/3)] lg:flex-none">{renderProcessCard(PROCESS_STEPS[4])}</div>
            {/* Lights up (bright gold of the menu hover) while 5.1 and 5.2 are raised. */}
            <span className={`whitespace-nowrap text-center font-cormorant text-[22px] font-semibold transition-[color,text-shadow] duration-300 max-lg:hidden lg:w-[120px] lg:flex-none ${flow.lift.includes('05.1') ? 'text-[#f3df9a] [text-shadow:0_0_12px_rgba(191,167,106,0.65)]' : 'text-[#bfa76a]'}`}>
              — lub —
            </span>
            <div className="lg:w-[calc((100%-2rem)/3)] lg:flex-none">{renderProcessCard(PROCESS_STEPS[5])}</div>
          </div>
          <ProcessArrows boxRef={flowRef} on={flow.arrows} />
        </div>
        {isDiagnosisModalOpen && typeof document !== 'undefined' && createPortal((
          <div
            data-diagnosis-modal-backdrop="true"
            className="fixed inset-0 z-[100] flex justify-center bg-black/70 p-[max(8px,env(safe-area-inset-top))_max(8px,env(safe-area-inset-right))_max(8px,env(safe-area-inset-bottom))_max(8px,env(safe-area-inset-left))] md:items-start md:p-4"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setDiagnosisModalOpen(false)
            }}
          >
            <div
              ref={diagnosisModalRef}
              role="dialog"
              aria-modal="true"
              aria-label={stepWindow.title}
              tabIndex={-1}
              style={diagnosisLayout ? { marginTop: diagnosisLayout.top - 16, maxHeight: `calc(100dvh - ${diagnosisLayout.top + 16}px)` } : undefined}
              className="relative flex h-full w-full flex-col outline-none md:h-auto md:max-w-[992px]"
            >
              <button
                type="button"
                aria-label="Zamknij"
                onClick={() => setDiagnosisModalOpen(false)}
                style={diagnosisLayout ? { left: diagnosisLayout.crossX, top: diagnosisLayout.crossY } : undefined}
                className="z-[110] flex h-10 w-10 flex-none items-center justify-center self-end text-3xl leading-none text-white md:absolute"
              >
                ×
              </button>
              {(() => {
                const diagnosisService = allServices.find((service) => service.slug === 'serwis-drukarek-3d')
                const faqService = allServices.find((service) => service.slug === 'serwis-drukarek-atramentowych')
                if (!diagnosisService) return null
                const diagnosisOnly = {
                  ...diagnosisService,
                  pricingSections: diagnosisService.pricingSections
                    .filter((section) => section.id === 'diagnoza')
                    // Steps 1–4: the number sits in the circle (titlePrefix below), not in the text.
                    .map((section) => ({ ...section, title: windowBadge ? stepWindow.title.replace(/^\d+\.\s*/, '') : stepWindow.title, mobileTitle: undefined, mobileOpenTitle: undefined })),
                }
                // FAQ of step 1, in its own accordion so opening it keeps the main block open.
                const faqOnly = faqService && {
                  ...faqService,
                  pricingSections: faqService.pricingSections
                    .filter((section) => section.id === 'faq')
                    .map((section) => ({ ...section, subcategories: stepWindow.faq })),
                }
                return (
                  <div
                    ref={diagnosisScrollRef}
                    className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-3 pb-4 pt-2 [scrollbar-width:none] md:px-12 [&::-webkit-scrollbar]:hidden"
                  >
                    {/* Small text of the window (card 1 note + FAQ answers): Cormorant reads small, so larger and bolder here only. */}
                    <section className="page-repair-accordion relative z-10 flex flex-col gap-2 px-0 [&_.faq-answer-text]:!text-[15px] [&_.faq-answer-text]:!font-medium [&_.faq-answer-text]:!leading-[1.35] md:[&_.faq-answer-text]:!text-[17px] md:[&_.faq-answer-text]:!leading-[1.45]">
                      <div className={`relative ${ZGLOSZENIE_MAIN} [&:has([role=region][data-state=closed])_.step-window-cta]:hidden`}>
                        <ServiceAccordion
                          service={diagnosisOnly}
                          locale="pl"
                          // Steps 1–5.2 have no prices: the caption reads "Zobacz więcej", like the card.
                          t={{ ...serviceAccordionI18n.pl, viewPriceList: 'Zobacz więcej' }}
                          pricing={getServiceDisplayPricing(diagnosisService.slug, diagnosisService.pricingSections, 'pl')}
                          titlePrefix={windowBadge && (
                            <span aria-hidden="true" data-lit="" className={STEP_BADGE_HEADER}>
                              <span className="gold-text-sweep font-inter text-[15px] font-semibold leading-none md:text-[20px]">{windowBadge}</span>
                            </span>
                          )}
                        />
                        {/* The button sits in the parchment's torn bottom margin, so it barely adds height to the window. */}
                        <div className="step-window-cta pointer-events-none absolute inset-x-0 bottom-[18px] md:bottom-[22px] z-20 flex justify-center leading-normal">
                          <Link href="/kontakt" className={`${PARCHMENT_CTA} ${GOLD_CTA_SIZE} pointer-events-auto`}>
                            <span className="gold-text-sweep">{stepWindow.info.button}</span>
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                      {/* Card 1 note, laid out as an open FAQ question: title, text, one button. */}
                      {zgloszenieSlot && createPortal((
                        <div className="pt-0.5">
                          {stepWindow.info.sections.map((section, i) => (
                            // Thin line between sections, the same as between the FAQ questions.
                            <div key={section.title} className={`relative pb-3 ${i < stepWindow.info.sections.length - 1 ? 'mb-0.5 after:pointer-events-none after:absolute after:inset-x-2 after:bottom-0 after:h-px after:bg-[rgba(114,80,43,0.28)] after:content-[""] md:after:inset-x-8' : ''}`}>
                              <div className="relative isolate py-1 pl-1.5 pr-2 md:pl-[22px] md:pr-8">
                                <span aria-hidden="true" className="absolute inset-x-0 inset-y-[2px] -z-10 rounded-[6px] opacity-[0.55]" style={{ background: FAQ_OPEN_ROW }} />
                                <h3 className={`faq-question-title-text mb-0 ${section.text || 'list' in section ? '' : 'text-center'} font-cormorant text-[17px] font-semibold leading-tight tracking-[-0.025em] text-[#3A2817] md:text-[20px] md:tracking-normal`}>
                                  {section.title}
                                </h3>
                              </div>
                              {section.text && (
                                <p className="faq-answer-text ml-1.5 mr-2 whitespace-pre-line pt-1 font-table-main text-[#72502B] md:ml-[30px] md:mr-8 md:text-[#3A2817]">
                                  {section.text}
                                </p>
                              )}
                              {'list' in section && section.list && (
                                <ul className="faq-answer-text ml-1.5 mr-2 list-disc pl-[1.1em] pt-1 font-table-main text-[#72502B] marker:text-current md:ml-[30px] md:mr-8 md:text-[#3A2817] [&>li+li]:mt-[0.5em]">
                                  {section.list.map(([lead, rest]) => (
                                    <li key={lead}><strong className="font-bold">{lead}</strong>{rest}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                          {/* Room for the button, which is drawn over the parchment's bottom margin (see step-window-cta). */}
                          <div aria-hidden="true" className="h-[16px] md:h-[18px]" />
                        </div>
                      ), zgloszenieSlot)}
                      {faqOnly && (
                        <ServiceAccordion
                          service={faqOnly}
                          locale="pl"
                          t={serviceAccordionI18n.pl}
                          pricing={getServiceDisplayPricing(faqService.slug, faqService.pricingSections, 'pl')}
                        />
                      )}
                    </section>
                  </div>
                )
              })()}
            </div>
          </div>
        ), document.body)}
        </div>
      </div>
    </section>
  )
}
