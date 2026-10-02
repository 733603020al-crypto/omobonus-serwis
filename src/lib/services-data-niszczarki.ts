import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

// TYMCZASOWA KOPIA treści z serwis-drukarek-laserowych — do zastąpienia treścią o niszczarkach.
// Klasy urządzeń — wg przeznaczenia i konstrukcji (nie wagi).
export const NISZCZARKI_DEVICE_CLASSES = ['Mała', 'Biurowa', 'Profesjonalna'] as const

export const NISZCZARKI_PRICE_TOOLTIP = `Klasy niszczarek: ${NISZCZARKI_DEVICE_CLASSES.join(' / ')}`

const applyNiszczarkiCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PEŁNA KONSERWACJA\u2028[[kompleksowe ]]czyszczenie, kontrola i konserwacja niszczarki\n• dokładne czyszczenie wnętrza urządzenia z pyłu papierowego i pozostałości ścinków;\n• czyszczenie mechanizmu tnącego, szczeliny podawczej i czujników;\n• smarowanie mechanizmu tnącego odpowiednim olejem;\n• kontrola noży / wałków tnących oraz zespołu napędowego;\n• kontrola kół zębatych, silnika i głównych elementów mechanicznych;\n• kontrola działania rewersu, start/stop i zabezpieczeń, jeśli występują;\n• końcowy test pracy i niszczenia dokumentów.',
    },
  ]
}

const applyNiszczarkiRepairsSection = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection) return
  repairsSection.subcategories = [
    {
      id: 'naprawy-mechanizm',
      title: 'Mechanizm tnący i zacięcia',
      items: [
        { service: 'Usuwanie zacięć i ciał obcych\n(papier utknął w mechanizmie, niszczarka się blokuje lub nie przyjmuje dokumentów)' },
        { service: 'Naprawa mechanizmu tnącego\n(noże nie obracają się, urządzenie tnie nierówno lub zatrzymuje się podczas pracy)' },
        { service: 'Wymiana noży / wałków tnących\n(zużyte lub uszkodzone elementy tnące nie niszczą papieru prawidłowo)' },
      ],
    },
    {
      id: 'naprawy-naped',
      title: 'Napęd i elementy mechaniczne',
      items: [
        { service: 'Naprawa kół zębatych / przekładni\n(trzaski, przeskakiwanie mechanizmu lub brak przeniesienia napędu na noże)' },
        { service: 'Naprawa mechanizmu napędowego\n(niszczarka pracuje głośno, zacina się lub mechanizm nie obraca się prawidłowo)' },
        { service: 'Naprawa / wymiana silnika\n(silnik nie uruchamia się, zatrzymuje podczas pracy lub pracuje niestabilnie)' },
        { service: 'Naprawa mechanizmu podawania / AutoFeed\n(papier nie jest pobierany automatycznie, podajnik zacina się lub pobiera dokumenty nieprawidłowo)' },
      ],
    },
    {
      id: 'naprawy-czujniki',
      title: 'Czujniki i sterowanie',
      items: [
        { service: 'Naprawa czujnika papieru / fotokomórki\n(niszczarka nie reaguje na papier, uruchamia się sama lub nie zatrzymuje po zakończeniu pracy)' },
        { service: 'Naprawa czujnika obrotów / pracy mechanizmu\n(urządzenie zatrzymuje się mimo braku zacięcia lub błędnie wykrywa pracę mechanizmu)' },
        { service: 'Naprawa funkcji start/stop / rewersu\n(automatyczny start, zatrzymanie lub cofanie papieru nie działa prawidłowo)' },
      ],
    },
    {
      id: 'naprawy-elektronika',
      title: 'Elektronika i zasilanie',
      items: [
        { service: 'Naprawa układu zasilania\n(niszczarka nie włącza się, wyłącza podczas pracy lub działa niestabilnie)' },
        { service: 'Naprawa elektroniki / płyty sterującej\n(urządzenie nie reaguje prawidłowo, wykonuje losowe działania lub nie uruchamia funkcji)' },
        { service: 'Naprawa panelu / przycisków sterowania\n(przyciski, przełącznik lub panel sterowania nie reagują albo działają nieprawidłowo)' },
      ],
    },
  ]
}

const applyNiszczarkiFaqSection = (sections: PricingSection[]) => {
  const faq = sections.find(section => section.id === 'faq')
  if (!faq) return
  faq.subcategories = [
    { id: 'faq-1', title: 'Jak wygląda proces naprawy niszczarki?', items: [], answer: 'Najpierw wykonujemy diagnozę i określamy koszt naprawy. Po akceptacji wykonujemy naprawę, testujemy urządzenie i informujemy o możliwości odbioru lub dostawy.' },
    { id: 'faq-2', title: 'Ile kosztuje diagnoza niszczarki?', items: [], answer: 'Diagnoza i wycena są bezpłatne, jeśli realizujemy naprawę. W przypadku rezygnacji z naprawy koszt diagnozy wynosi 50 zł netto.' },
    { id: 'faq-3', title: 'Ile trwa naprawa niszczarki?', items: [], answer: 'Zależy od rodzaju usterki i dostępności części. Większość usług w cenniku ma termin od 1 do 5 dni.' },
    { id: 'faq-4', title: 'Jakie niszczarki naprawiacie?', items: [], answer: 'Naprawiamy małe, biurowe i profesjonalne niszczarki różnych konstrukcji i wielkości.' },
    { id: 'faq-5', title: 'Jakie marki niszczarek serwisujecie?', items: [], answer: 'Serwisujemy m.in. Fellowes, HSM, Kobra, Rexel, IDEAL, Dahle, OPUS, Leitz, Wallner, Argo, EBA, HP, Tracer, Tarnator, Genie, Olympia, Intimus, Aurora i Peach oraz inne marki.' },
    { id: 'faq-6', title: 'Czy naprawiacie duże i profesjonalne niszczarki?', items: [], answer: 'Tak. Przyjmujemy również duże i profesjonalne urządzenia. Nie stosujemy ograniczenia wyłącznie do małych niszczarek biurowych.' },
    { id: 'faq-7', title: 'Czy naprawiacie niszczarki u Klienta?', items: [], answer: 'Nie. Naprawy wykonujemy w serwisie, ponieważ prawidłowa diagnoza może wymagać rozebrania urządzenia, testów i zamówienia odpowiednich części.' },
    { id: 'faq-8', title: 'Czy można zamówić odbiór i dostawę niszczarki?', items: [], answer: 'Tak. Odbiór do 2,5 km od serwisu kosztuje 20 zł netto, a dostarczenie urządzenia do 2,5 km również 20 zł netto. Powyżej 2,5 km obowiązuje 20 zł + 1,5 zł/km.' },
    { id: 'faq-9', title: 'Co zrobić, gdy papier zablokował się w niszczarce?', items: [], answer: 'Jeśli urządzenie ma funkcję rewersu, można spróbować ostrożnie cofnąć papier zgodnie z instrukcją producenta. Jeśli zator nie ustępuje, nie należy wyciągać papieru na siłę ani rozbierać urządzenia — można uszkodzić noże, przekładnię lub silnik.' },
    { id: 'faq-10', title: 'Dlaczego niszczarka nie pobiera papieru?', items: [], answer: 'Przyczyną może być zablokowany mechanizm tnący, zabrudzona lub uszkodzona fotokomórka, zużyte wałki tnące, uszkodzone koła zębate albo napęd.' },
    { id: 'faq-11', title: 'Dlaczego niszczarka działa, ale noże się nie obracają?', items: [], answer: 'Możliwa jest awaria przekładni, kół zębatych, napędu, silnika albo samego mechanizmu tnącego. Dokładną przyczynę można określić po diagnozie.' },
    { id: 'faq-12', title: 'Dlaczego niszczarka pracuje bardzo głośno albo terkocze?', items: [], answer: 'Nietypowy hałas może wynikać z braku smarowania, ciała obcego w mechanizmie, zużytych kół zębatych, przekładni lub elementów mechanizmu tnącego.' },
    { id: 'faq-13', title: 'Dlaczego niszczarka nie wyłącza się po zniszczeniu papieru?', items: [], answer: 'Częstą przyczyną jest zabrudzona lub uszkodzona fotokomórka albo problem z układem start/stop.' },
    { id: 'faq-14', title: 'Dlaczego niszczarka nie reaguje po włożeniu papieru?', items: [], answer: 'Może odpowiadać za to zabrudzony lub uszkodzony czujnik papieru, fotokomórka, układ sterowania albo zasilanie urządzenia.' },
    { id: 'faq-15', title: 'Dlaczego niszczarka wciąga papier i od razu go cofa?', items: [], answer: 'Jedną z możliwych przyczyn jest problem z czujnikiem obrotów lub działaniem mechanizmu tnącego. Taki objaw wymaga sprawdzenia urządzenia.' },
    { id: 'faq-16', title: 'Dlaczego rewers nie działa?', items: [], answer: 'Przyczyną może być uszkodzenie przełącznika, panelu sterowania, elektroniki albo układu odpowiedzialnego za zmianę kierunku pracy silnika.' },
    { id: 'faq-17', title: 'Dlaczego niszczarka przegrzewa się i zatrzymuje?', items: [], answer: 'Przy intensywnej pracy może zadziałać zabezpieczenie termiczne. Jeśli urządzenie przegrzewa się szybko, mimo normalnego użytkowania, przyczyną może być przeciążony mechanizm, brak konserwacji albo usterka napędu lub silnika.' },
    { id: 'faq-18', title: 'Czy trzeba oliwić niszczarkę?', items: [], answer: 'Wiele niszczarek Cross-Cut i Micro-Cut wymaga regularnego smarowania mechanizmu tnącego. Częstotliwość i sposób oliwienia zależą od modelu i zaleceń producenta.' },
    { id: 'faq-19', title: 'Czy można używać WD-40 lub oleju w sprayu?', items: [], answer: 'Nie należy stosować WD-40 ani łatwopalnych smarów w aerozolu do mechanizmu tnącego. Należy używać środka przeznaczonego do niszczarek zgodnie z instrukcją producenta.' },
    { id: 'faq-20', title: 'Kiedy warto wykonać konserwację niszczarki?', items: [], answer: 'Gdy urządzenie zaczyna pracować głośniej, wolniej niszczy dokumenty, częściej się zacina albo było intensywnie użytkowane. Regularna konserwacja ogranicza zużycie mechanizmu tnącego i napędu.' },
    { id: 'faq-21', title: 'Czy części są wliczone w cenę naprawy?', items: [], answer: 'Jeśli przy pozycji w cenniku znajduje się „+ części”, podana cena dotyczy robocizny. Potrzebne części są rozliczane oddzielnie.' },
    { id: 'faq-22', title: 'Jak przygotować niszczarkę do serwisu?', items: [], answer: 'Odłącz urządzenie od zasilania, opróżnij kosz na ścinki i przygotuj krótki opis usterki. Dostarcz kompletne urządzenie — nie demontuj samodzielnie mechanizmu tnącego przed oddaniem do serwisu.' },
  ]
}

export const createNiszczarkiPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applyNiszczarkiCleaningSection(sections)
  applyNiszczarkiRepairsSection(sections)
  applyNiszczarkiFaqSection(sections)
  return sections
}
