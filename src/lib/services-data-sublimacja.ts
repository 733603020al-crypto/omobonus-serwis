import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

// serwis-drukarek-sublimacyjnych — własne dane strony (PL = źródło prawdy dla UK/RU).
export const SUBLIMACJA_PRICE_TOOLTIP =
  'Ceny netto za robociznę, bez części i atramentu. Przy pełnej konserwacji standardowe płyny czyszczące i drobne materiały serwisowe są wliczone w cenę. Czas realizacji nie obejmuje oczekiwania na części.'

// Dojazd: własny cennik strony (do 20 km)
const applySublimacjaDojazdSection = (sections: PricingSection[]) => {
  const dojazdSection = sections.find(section => section.id === 'dojazd')
  if (!dojazdSection) return
  dojazdSection.items = [
    { service: 'Odbiór urządzenia od Klienta (do 20 km od serwisu)' },
    { service: 'Dostarczenie naprawionego urządzenia do Klienta (do 20 km od serwisu)' },
    { service: 'Odbiór lub dostawa powyżej 20 km od serwisu (2,50 zł doliczamy tylko za każdy km ponad 20 km)' },
    { service: 'Pilna realizacja (jeśli to możliwe, realizujemy odbiór lub dostawę w pierwszej kolejności)' },
  ]
}

const applySublimacjaCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PEŁNA KONSERWACJA\u2028pełne czyszczenie, kontrola i konserwacja drukarki sublimacyjnej\n• czyszczenie stacji serwisowej i capów;\n• czyszczenie wiperów;\n• czyszczenie okolic głowicy i spodu karetki;\n• kontrola i czyszczenie układu odprowadzania zużytego atramentu;\n• kontrola układu atramentowego;\n• czyszczenie rolek i toru prowadzenia materiału;\n• czyszczenie czujników materiału;\n• kontrola prowadnic i mechanizmu karetki;\n• nozzle check i standardowy cykl czyszczenia;\n• wydruk testowy po konserwacji.',
    },
  ]
  cleaningSection.notes = [
    'W cenie: standardowe płyny czyszczące i drobne materiały serwisowe.',
    'Części zamienne — dodatkowo, jeśli konieczna jest ich wymiana.',
  ]
}

const applySublimacjaRepairsSection = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection) return
  repairsSection.subcategories = [
    {
      id: 'naprawy-glowica',
      title: 'Głowica drukująca i jakość druku',
      items: [
        { service: 'Udrażnianie głowicy drukującej\n(brak części dysz, pasy, zaniki jednego lub kilku kolorów)' },
        { service: 'Regeneracja głowicy drukującej\n(czyszczenie standardowe i udrażnianie nie przywracają prawidłowego testu dysz)' },
        { service: 'Wymiana głowicy drukującej\n(głowica jest uszkodzona, nie drukuje lub nie nadaje się do regeneracji)' },
        { service: 'Kalibracja i korekta jakości druku\n(pasy, przesunięcia kolorów lub niewłaściwe nakładanie obrazu mimo drożnych dysz)' },
      ],
    },
    {
      id: 'naprawy-atrament',
      title: 'Układ atramentowy',
      items: [
        { service: 'Wymiana damperów\n(nierówny dopływ atramentu, zaniki kolorów lub zapowietrzanie przy głowicy)' },
        { service: 'Naprawa przewodów atramentowych\n(wyciek atramentu, pęcherzyki powietrza lub przerwy w dopływie atramentu)' },
        { service: 'Usuwanie zapowietrzenia układu atramentowego\n(atrament nie dociera prawidłowo do głowicy po postoju lub ingerencji w układ)' },
        { service: 'Płukanie układu atramentowego\n(zanieczyszczony lub częściowo niedrożny układ powoduje problemy z przepływem atramentu)' },
        { service: 'Wymiana filtrów układu atramentowego\n(ograniczony przepływ atramentu lub zanieczyszczenia w układzie)' },
      ],
    },
    {
      id: 'naprawy-stacja-serwisowa',
      title: 'Stacja serwisowa i odpływ atramentu',
      items: [
        { service: 'Wymiana capów (cap top) stacji serwisowej\n(głowica nie jest prawidłowo uszczelniana podczas czyszczenia lub postoju)' },
        { service: 'Wymiana wipera\n(na głowicy pozostaje atrament lub zanieczyszczenia po cyklu czyszczenia)' },
        { service: 'Wymiana pompy atramentu\n(drukarka nie odciąga atramentu podczas cyklu czyszczenia)' },
        { service: 'Naprawa stacji serwisowej\n(czyszczenie głowicy nie działa prawidłowo lub stacja nie ustawia się poprawnie)' },
        { service: 'Naprawa odpływu zużytego atramentu\n(atrament nie odpływa prawidłowo, pojawia się wyciek lub przepełnienie)' },
      ],
    },
    {
      id: 'naprawy-podawanie',
      title: 'Podawanie i prowadzenie materiału',
      items: [
        { service: 'Naprawa mechanizmu podawania materiału\n(papier lub materiał nie jest pobierany, przesuwa się nierówno albo zatrzymuje podczas druku)' },
        { service: 'Wymiana / naprawa rolek podających\n(materiał ślizga się, przekrzywia lub jest podawany nierównomiernie)' },
        { service: 'Naprawa prowadzenia rolki materiału\n(rolka przesuwa się nierówno, materiał schodzi z toru lub marszczy się)' },
        { service: 'Naprawa mechanizmu cięcia\n(drukarka nie odcina materiału lub nóż zacina się)' },
        { service: 'Naprawa systemu nawijania (take-up)\n(wydruk nie nawija się, nawija nierówno lub system zatrzymuje się)' },
      ],
    },
    {
      id: 'naprawy-karetka',
      title: 'Karetka, napęd i enkodery',
      items: [
        { service: 'Naprawa napędu karetki\n(karetka zatrzymuje się, porusza nierówno lub drukarka zgłasza błąd ruchu)' },
        { service: 'Wymiana silnika karetki (CR motor)\n(karetka nie porusza się mimo sprawnego paska i prowadzenia)' },
        { service: 'Wymiana silnika podawania materiału (PF motor)\n(materiał nie przesuwa się lub drukarka zgłasza błąd napędu podawania)' },
        { service: 'Wymiana paska karetki\n(karetka szarpie, traci pozycję lub pasek jest zużyty albo uszkodzony)' },
        { service: 'Czyszczenie / wymiana taśmy enkodera\n(karetka traci pozycję, druk jest przesunięty lub pojawiają się błędy pozycjonowania)' },
      ],
    },
    {
      id: 'naprawy-elektronika-zasilanie',
      title: 'Czujniki, elektronika i zasilanie',
      items: [
        { service: 'Wymiana czujnika materiału\n(drukarka nie wykrywa papieru lub materiału albo błędnie określa jego położenie)' },
        { service: 'Naprawa / wymiana czujników położenia\n(drukarka nie rozpoznaje pozycji mechanizmu lub zgłasza błędy ruchu)' },
        { service: 'Naprawa płyty głównej\n(drukarka nie uruchamia się prawidłowo, zawiesza się lub zgłasza błędy elektroniki)' },
        { service: 'Naprawa elektroniki sterującej głowicą\n(głowica nie otrzymuje prawidłowego sterowania mimo sprawnego układu atramentowego)' },
        { service: 'Naprawa zasilacza\n(drukarka nie uruchamia się, wyłącza się lub występują niestabilne napięcia)' },
        { service: 'Naprawa przewodów i taśm sygnałowych\n(pojawiają się przerwy w komunikacji z głowicą, czujnikami lub innymi podzespołami)' },
      ],
    },
    {
      id: 'naprawy-oprogramowanie',
      title: 'Oprogramowanie, firmware i konfiguracja',
      items: [
        { service: 'Aktualizacja / przywrócenie firmware\n(drukarka zawiesza się, zgłasza błędy systemowe lub nie działa prawidłowo po aktualizacji)' },
        { service: 'Usuwanie problemów z komunikacją\n(komputer lub RIP nie wykrywa drukarki albo połączenie jest niestabilne)' },
        { service: 'Konfiguracja sterownika i połączenia sieciowego\n(drukarka jest widoczna w sieci, ale nie można poprawnie rozpocząć druku)' },
        { service: 'Konfiguracja RIP\n(zadania nie są wysyłane poprawnie albo ustawienia medium lub profilu są błędne)' },
      ],
    },
  ]
}

const applySublimacjaFaqSection = (sections: PricingSection[]) => {
  const faq = sections.find(section => section.id === 'faq')
  if (!faq) return
  faq.subcategories = [
    { id: 'faq-1', title: 'Ile kosztuje diagnoza drukarki sublimacyjnej?', items: [], answer: 'W przypadku rezygnacji z naprawy: 150 / 250 / 400 zł, zależnie od kategorii urządzenia.' },
    { id: 'faq-2', title: 'Czy diagnoza jest płatna, jeśli zdecyduję się na naprawę?', items: [], answer: 'Nie — opłata dotyczy rezygnacji z naprawy.' },
    { id: 'faq-3', title: 'Ile trwa diagnoza?', items: [], answer: 'Zwykle 1–3 dni robocze.' },
    { id: 'faq-4', title: 'Od czego zależy cena naprawy?', items: [], answer: 'Od klasy urządzenia, rodzaju usterki, zakresu prac i ceny potrzebnych części.' },
    { id: 'faq-5', title: 'Czy przed naprawą poznam jej koszt?', items: [], answer: 'Tak. Po diagnozie przedstawiamy zakres prac i koszt naprawy. Naprawę rozpoczynamy dopiero po Twojej akceptacji.' },
    { id: 'faq-6', title: 'Ile trwa naprawa?', items: [], answer: 'Większość napraw z cennika wykonujemy w 1–2 dni robocze. Bardziej złożone prace, np. regeneracja głowicy lub naprawa elektroniki, trwają do 2–4 dni roboczych. Czas realizacji nie obejmuje oczekiwania na części.' },
    { id: 'faq-7', title: 'Czy naprawiacie Epson, Mimaki, Mutoh, Roland DG, Sawgrass, HP i Brother?', items: [], answer: 'Tak — te marki obejmuje oferta serwisu.' },
    { id: 'faq-8', title: 'Czy naprawiacie starsze modele drukarek sublimacyjnych?', items: [], answer: 'Tak, jeśli dostępne są potrzebne części i urządzenie można technicznie naprawić.' },
    { id: 'faq-9', title: 'Drukarka drukuje w pasy — czy zawsze winna jest głowica?', items: [], answer: 'Nie. Przyczyną mogą być również niedrożne dysze, ustawienia medium, kalibracja, podawanie materiału lub układ atramentowy.' },
    { id: 'faq-10', title: 'Co oznaczają brakujące linie w nozzle check?', items: [], answer: 'Najczęściej oznaczają, że część dysz nie pracuje prawidłowo i wymaga czyszczenia lub dalszej diagnostyki.' },
    { id: 'faq-11', title: 'Czy każdą zatkaną głowicę można udrożnić?', items: [], answer: 'Nie. Jeśli standardowe czyszczenie i udrażnianie nie pomagają, może być potrzebna regeneracja albo wymiana głowicy.' },
    { id: 'faq-12', title: 'Czy naprawiacie układ atramentowy?', items: [], answer: 'Tak — m.in. dampery, przewody, filtry, zapowietrzenie i problemy z przepływem atramentu.' },
    { id: 'faq-13', title: 'Czy naprawiacie stację serwisową i pompę?', items: [], answer: 'Tak — obejmuje to m.in. capy, wiper, pompę i odpływ zużytego atramentu.' },
    { id: 'faq-14', title: 'Drukarka nie pobiera papieru lub prowadzi go krzywo — czy to naprawiacie?', items: [], answer: 'Tak — diagnozujemy rolki, mechanizm podawania, prowadzenie materiału i jego napęd.' },
    { id: 'faq-15', title: 'Czy naprawiacie system nawijania w drukarkach rolkowych?', items: [], answer: 'Tak, jeśli dany model posiada taki system.' },
    { id: 'faq-16', title: 'Czy naprawiacie elektronikę drukarki?', items: [], answer: 'Tak — m.in. płytę główną, zasilanie, elektronikę sterującą głowicą, czujniki i przewody sygnałowe.' },
    { id: 'faq-17', title: 'Czy rozwiązujecie problemy z RIP-em i komunikacją z komputerem?', items: [], answer: 'Tak — konfigurujemy połączenie, sterownik i RIP oraz diagnozujemy problemy komunikacyjne.' },
    { id: 'faq-18', title: 'Czy aktualizujecie firmware?', items: [], answer: 'Tak — możemy zaktualizować lub przywrócić firmware, jeśli jest to potrzebne do usunięcia problemu.' },
    { id: 'faq-19', title: 'Co zrobić, jeśli drukarka długo nie była używana?', items: [], answer: 'Najpierw należy sprawdzić nozzle check i stan układu atramentowego. Nie warto od razu wykonywać wielu kolejnych cykli czyszczenia.' },
    { id: 'faq-20', title: 'Jak często wykonywać konserwację?', items: [], answer: 'Zależy to od modelu, intensywności pracy i zaleceń producenta. Regularna konserwacja obejmuje m.in. stację serwisową, wiper, tor materiału i kontrolę dysz.' },
    { id: 'faq-21', title: 'Czy udrażnianie głowicy jest częścią zwykłej konserwacji?', items: [], answer: 'Nie. Konserwacja dotyczy sprawnego urządzenia. Udrażnianie lub regeneracja niedrożnej głowicy traktowane są jako naprawa.' },
    { id: 'faq-22', title: 'Czy części zamienne są w cenie naprawy?', items: [], answer: 'Ceny w cenniku dotyczą robocizny. Przy usługach oznaczonych „+ części” koszt potrzebnych części doliczamy osobno — po uzgodnieniu z Tobą.' },
    { id: 'faq-23', title: 'Czy mogę osobiście dostarczyć drukarkę do serwisu?', items: [], answer: 'Tak. Najlepiej dostarczyć urządzenie osobiście do naszego serwisu — to najprostsze rozwiązanie. Jeśli nie masz takiej możliwości, możemy zorganizować odbiór urządzenia.' },
    { id: 'faq-24', title: 'Czy możecie odebrać drukarkę z firmy?', items: [], answer: 'Tak, jeśli nie możesz dostarczyć urządzenia osobiście. Odbiór lub dostawa do 20 km kosztuje 150 zł. Powyżej 20 km: 150 zł + 2,50 zł za każdy kilometr ponad 20 km.' },
    { id: 'faq-25', title: 'Jak naliczana jest opłata za odbiór lub dostawę powyżej 20 km?', items: [], answer: 'Do 20 km obowiązuje stała cena 150 zł. Powyżej 20 km doliczamy 2,50 zł za każdy kilometr ponad limit 20 km.' },
    { id: 'faq-26', title: 'Czy możliwa jest pilna realizacja?', items: [], answer: 'Tak, jeśli mamy możliwość ustawienia zlecenia w pierwszej kolejności — bez dodatkowej opłaty.' },
    { id: 'faq-27', title: 'Czy udzielacie gwarancji na naprawę?', items: [], answer: 'Tak. Na wykonaną usługę serwisową udzielamy 3 miesięcy gwarancji, a na udrażnianie i regenerację głowicy — 7 dni. Części podlegają gwarancji producenta lub dostawcy.' },
  ]
}

export const createSublimacjaPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applySublimacjaDojazdSection(sections)
  applySublimacjaCleaningSection(sections)
  applySublimacjaRepairsSection(sections)
  applySublimacjaFaqSection(sections)
  return sections
}
