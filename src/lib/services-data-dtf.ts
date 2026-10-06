import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

// serwis-drukarek-dtg — własne dane strony (PL = źródło prawdy dla UK/RU).
export const DTF_PRICE_TOOLTIP =
  'Ceny netto za robociznę, bez części i atramentu. Przy pełnej konserwacji standardowe płyny czyszczące i drobne materiały serwisowe są wliczone w cenę. Czas realizacji nie obejmuje oczekiwania na części.'

const applyDtfCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PEŁNA KONSERWACJA\u2028[[kompleksowe ]]czyszczenie, kontrola i kalibracja drukarki DTG\n• czyszczenie okolic głowic z włókien i zaschniętego atramentu oraz standardowe cykle czyszczenia głowic;\n• czyszczenie capów, wiperów i stacji serwisowej;\n• kontrola drożności i szczelności układu atramentowego, przewodów, damperów i filtrów;\n• kontrola cyrkulacji / mieszania białego atramentu;\n• kontrola i opróżnienie układu zużytego atramentu;\n• czyszczenie enkodera;\n• czyszczenie i kontrola prowadnic oraz mechanizmu karetki;\n• czyszczenie i kontrola stołu / platenu;\n• kontrola filtrów powietrza / wentylacji;\n• test dysz, wyrównanie głowicy i wydruk testowy.',
    },
  ]
  cleaningSection.notes = [
    'W cenie: standardowe płyny czyszczące i drobne materiały serwisowe.',
    'Części zamienne — dodatkowo, jeśli konieczna jest ich wymiana.',
  ]
}

const applyDtfRepairsSection = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection) return
  repairsSection.subcategories = [
    {
      id: 'naprawy-glowica',
      title: 'Głowica drukująca i jakość nadruku',
      items: [
        { service: 'Udrażnianie głowicy\n(brakujące dysze lub przerwy w nadruku, które nie ustępują po standardowym czyszczeniu)' },
        { service: 'Regeneracja głowicy drukującej\n(udrażnianie nie przywraca prawidłowego druku lub część dysz nadal nie pracuje)' },
        { service: 'Wymiana głowicy drukującej\n(głowica jest uszkodzona i nie można przywrócić prawidłowego druku)' },
        { service: 'Kalibracja / wyrównanie głowicy\n(przesunięte kolory, podwójne kontury lub nieprawidłowe położenie nadruku)' },
      ],
    },
    {
      id: 'naprawy-atrament',
      title: 'Układ atramentowy i biały atrament',
      items: [
        { service: 'Płukanie / udrażnianie układu atramentowego\n(atrament nie dopływa prawidłowo, układ jest zapowietrzony lub zatkany)' },
        { service: 'Wymiana damperów, filtrów i przewodów\n(niestabilny przepływ atramentu, pęcherzyki powietrza lub problemy z podawaniem)' },
        { service: 'Naprawa / wymiana pompy atramentu\n(pompa nie podaje atramentu lub nie utrzymuje prawidłowego przepływu)' },
        { service: 'Naprawa układu cyrkulacji białego atramentu\n(biały atrament nie krąży, osadza się lub jest podawany nierównomiernie)' },
        { service: 'Naprawa / wymiana modułu podawania atramentu\n(drukarka nie pobiera atramentu lub zgłasza błąd układu zasilania atramentem)' },
      ],
    },
    {
      id: 'naprawy-stacja-serwisowa',
      title: 'Stacja serwisowa i zużyty atrament',
      items: [
        { service: 'Naprawa / wymiana capów i wiperów\n(głowica nie jest prawidłowo uszczelniana lub czyszczona)' },
        { service: 'Naprawa / wymiana pompy stacji serwisowej\n(czyszczenie głowicy nie działa lub atrament nie jest prawidłowo odsysany)' },
        { service: 'Wymiana stacji serwisowej (maintenance unit)\n(stacja nie wykonuje prawidłowo czyszczenia lub parkowania głowicy)' },
        { service: 'Naprawa układu odprowadzania zużytego atramentu\n(zużyty atrament nie jest odprowadzany lub pojawia się wyciek)' },
        { service: 'Wymiana pochłaniacza zużytego atramentu (absorber, flushing box)\n(element osiągnął limit zużycia lub drukarka zgłasza konieczność wymiany)' },
      ],
    },
    {
      id: 'naprawy-karetka',
      title: 'Karetka i napęd głowicy',
      items: [
        { service: 'Naprawa mechanizmu karetki\n(karetka zacina się, porusza nierówno lub zatrzymuje podczas pracy)' },
        { service: 'Wymiana silnika karetki\n(karetka nie porusza się lub drukarka zgłasza błąd napędu)' },
        { service: 'Wymiana paska napędowego\n(karetka ślizga się, przeskakuje lub traci prawidłową pozycję)' },
        { service: 'Wymiana / naprawa enkodera\n(drukarka błędnie określa położenie głowicy lub zgłasza błąd enkodera)' },
        { service: 'Wymiana czujników położenia karetki\n(drukarka nie wykrywa prawidłowo pozycji karetki)' },
      ],
    },
    {
      id: 'naprawy-stol',
      title: 'Stół (platen) i jego napęd',
      items: [
        { service: 'Naprawa mechanizmu przesuwu platenu\n(stół nie przesuwa się, zatrzymuje lub porusza nierówno)' },
        { service: 'Naprawa / wymiana silnika stołu\n(platen nie porusza się lub pojawia się błąd napędu)' },
        { service: 'Naprawa mechanizmu podnoszenia\n(nie można prawidłowo ustawić wysokości stołu)' },
        { service: 'Naprawa czujnika wysokości / przeszkody\n(drukarka błędnie wykrywa materiał lub zatrzymuje druk z powodu przeszkody)' },
        { service: 'Kalibracja wysokości / położenia platenu\n(nadruk jest źle ustawiony lub głowica znajduje się za blisko materiału)' },
      ],
    },
    {
      id: 'naprawy-elektronika-zasilanie',
      title: 'Elektronika, zasilanie i czujniki',
      items: [
        { service: 'Naprawa płyty głównej / sterującej\n(drukarka nie uruchamia się, zawiesza się lub zgłasza błędy elektroniki)' },
        { service: 'Wymiana płyty głównej / sterującej\n(płyta jest uszkodzona i nie nadaje się do naprawy)' },
        { service: 'Naprawa / wymiana zasilacza\n(drukarka nie włącza się, wyłącza się lub ma niestabilne zasilanie)' },
        { service: 'Naprawa przewodów, taśm i złączy\n(zanikają sygnały lub występują błędy połączeń między podzespołami)' },
        { service: 'Wymiana pozostałych czujników\n(drukarka błędnie wykrywa położenie, poziom lub stan podzespołów)' },
        { service: 'Naprawa / wymiana panelu sterowania / wyświetlacza\n(panel nie reaguje, ekran nie działa lub błędnie wyświetla informacje)' },
      ],
    },
    {
      id: 'naprawy-oprogramowanie',
      title: 'Oprogramowanie, firmware i RIP',
      items: [
        { service: 'Aktualizacja / przywracanie firmware\n(błędy po aktualizacji, problemy z uruchomieniem lub nieprawidłowa praca systemu)' },
        { service: 'Instalacja i konfiguracja sterowników / RIP\n(drukarka nie jest widoczna w programie lub zadania nie są prawidłowo wysyłane)' },
        { service: 'Naprawa komunikacji USB / LAN\n(komputer nie wykrywa drukarki lub połączenie jest niestabilne)' },
      ],
    },
  ]
}

const applyDtfFaqSection = (sections: PricingSection[]) => {
  const faq = sections.find(section => section.id === 'faq')
  if (!faq) return
  faq.subcategories = [
    { id: 'faq-1', title: 'Jakie drukarki DTG naprawiacie?', items: [], answer: 'Serwisujemy kompaktowe, profesjonalne i przemysłowe drukarki DTG marek Epson, Brother, Kornit Digital, Ricoh, Polyprint, aeoon Technologies, M&R, ROQ, OmniPrint, ColDesi, DTG Digital / Pigment.inc, AnaJet, Roland DG, Mimaki, Azonprinter, Resolute DTG, Lawson Screen & Digital i Durst. Zakres i koszt naprawy zależą od modelu, konstrukcji urządzenia i rodzaju usterki.' },
    { id: 'faq-2', title: 'Czy naprawiacie starsze modele i czy to się opłaca?', items: [], answer: 'Tak, jeśli dostępne są części lub możliwa jest naprawa istniejącego podzespołu. Opłacalność zależy od wartości urządzenia, zakresu uszkodzenia i dostępności części — po diagnozie mówimy otwarcie, czy naprawa ma sens.' },
    { id: 'faq-3', title: 'Ile kosztuje diagnoza drukarki DTG?', items: [], answer: 'Wstępna diagnoza online i przy dostawie do serwisu jest bezpłatna. Pełna diagnoza jest bezpłatna, jeśli zlecisz naprawę. W razie rezygnacji z naprawy kosztuje 150 / 250 / 450 zł netto — zależnie od klasy drukarki.' },
    { id: 'faq-4', title: 'Od czego zależy cena naprawy i czy poznam ją wcześniej?', items: [], answer: 'Cena zależy od klasy drukarki (kompaktowa, profesjonalna, przemysłowa), rodzaju usterki i potrzebnych części. Po diagnozie przedstawiamy zakres i koszt naprawy — prace wymagające akceptacji zaczynamy dopiero po Twojej zgodzie.' },
    { id: 'faq-5', title: 'Czy części są wliczone w cenę naprawy?', items: [], answer: 'Nie, jeśli przy danej usłudze wskazano „+ części”. Cena w cenniku dotyczy wtedy robocizny. Wszystkie ceny w cenniku są cenami netto.' },
    { id: 'faq-6', title: 'Co zrobić, gdy drukarka DTG nie drukuje części dysz?', items: [], answer: 'Najpierw uruchom standardowe czyszczenie głowicy z panelu drukarki i wykonaj test dysz. Jeśli braki nie ustępują, sprawdzamy głowicę, stację serwisową i układ atramentowy — przyczyną może być zaschnięty atrament, problem z capami, pompą lub przepływem atramentu.' },
    { id: 'faq-7', title: 'Czy da się uratować zaschniętą głowicę — udrażnianie, regeneracja czy wymiana?', items: [], answer: 'Najpierw próbujemy udrożnić głowicę. Jeśli to nie przywraca prawidłowego druku, wykonujemy regenerację, o ile pozwala na to konstrukcja i stan głowicy. Gdy głowicy nie da się odzyskać, wymieniamy ją i wykonujemy wymagane ustawienia oraz kalibrację w cenie wymiany. Skuteczność udrażniania i regeneracji zależy od stopnia zaschnięcia, dlatego gwarancja na te usługi wynosi 7 dni.' },
    { id: 'faq-8', title: 'Dlaczego biały atrament przestaje prawidłowo drukować?', items: [], answer: 'Biały pigment łatwo się osadza. Problem może dotyczyć cyrkulacji, przewodów, filtrów, damperów, pompy lub samej głowicy. Naprawiamy układ cyrkulacji białego atramentu — sprawdzamy pompę, przewody, filtry, moduły podawania i elementy odpowiedzialne za mieszanie.' },
    { id: 'faq-9', title: 'Czy naprawiacie układ atramentowy i stację serwisową?', items: [], answer: 'Tak. Płuczemy zatkany układ atramentowy, wymieniamy dampery, filtry i przewody, a w stacji serwisowej naprawiamy lub wymieniamy capy, wipery, pompę i — jeśli drukarka go posiada — kompletny moduł stacji (maintenance unit).' },
    { id: 'faq-10', title: 'Drukarka zgłasza pełny pochłaniacz atramentu — co zrobić?', items: [], answer: 'Nie ignoruj tego komunikatu — przepełniony pochłaniacz może prowadzić do wycieku zużytego atramentu do wnętrza drukarki. Wymieniamy pochłaniacz (absorber, flushing box) i sprawdzamy układ odprowadzania zużytego atramentu.' },
    { id: 'faq-11', title: 'Atrament kapie lub na nadruku pojawiają się plamy — co robić?', items: [], answer: 'Przyczyną bywają zabrudzone okolice głowicy, zużyte wipery lub capy, nieszczelny damper albo przewód, a także zbyt mała odległość głowicy od materiału. Po diagnozie wykonujemy konserwację lub wymieniamy uszkodzone elementy.' },
    { id: 'faq-12', title: 'Dlaczego drukarka pozostawia pasy lub przesunięte kolory?', items: [], answer: 'Przyczyną mogą być niedrożne dysze, niewłaściwa wysokość platenu, kalibracja głowicy, enkoder lub mechanizm karetki.' },
    { id: 'faq-13', title: 'Czy naprawiacie karetkę i stół (platen) oraz wykonujecie kalibrację?', items: [], answer: 'Tak. Naprawiamy napęd, pasek, silnik, enkoder i czujniki karetki, a także mechanizm przesuwu, podnoszenia, napęd i czujniki stołu. Kalibrację głowicy lub platenu wykonujemy jako osobną usługę albo — jeśli jest potrzebna po naszej naprawie — w jej cenie.' },
    { id: 'faq-14', title: 'Drukarka DTG nie włącza się — czy to się da naprawić?', items: [], answer: 'W wielu przypadkach tak. Przyczyną bywa zasilacz, płyta sterująca, przewody lub złącza. Po diagnozie naprawiamy lub wymieniamy uszkodzony podzespół.' },
    { id: 'faq-15', title: 'Czy pomagacie przy firmware, sterownikach i RIP?', items: [], answer: 'Tak. Aktualizujemy i przywracamy firmware, instalujemy sterowniki, naprawiamy komunikację USB/LAN i konfigurujemy RIP do współpracy z obsługiwaną drukarką DTG.' },
    { id: 'faq-16', title: 'Jak często wykonywać konserwację drukarki DTG?', items: [], answer: 'Codzienne i cotygodniowe czynności — test dysz, czyszczenie capów i wiperów — wykonuje operator zgodnie z instrukcją producenta. Pełną konserwację w serwisie warto wykonywać regularnie, częściej przy intensywnej produkcji. Zaniedbanie konserwacji, szczególnie w układzie białego atramentu, może prowadzić do zatkania przewodów, stacji serwisowej lub głowicy.' },
    { id: 'faq-17', title: 'Czy wykonujecie samo czyszczenie i konserwację bez naprawy?', items: [], answer: 'Tak. Pełna konserwacja jest dostępna jako osobna usługa i obejmuje standardowe cykle czyszczenia głowic. Jeśli dysze pozostają zatkane, udrażnianie głowicy jest osobną usługą z cennika.' },
    { id: 'faq-18', title: 'Czy drukarkę DTG można wyłączać na kilka dni?', items: [], answer: 'To zależy od modelu. Wiele urządzeń wykonuje automatyczne procedury konserwacji i powinno pozostawać w stanie wymaganym przez producenta. Dłuższy przestój może wymagać przygotowania układu atramentowego.' },
    { id: 'faq-19', title: 'Jak długo trwa naprawa drukarki DTG?', items: [], answer: 'Typowe naprawy zajmują około 1–5 dni. Czas realizacji nie obejmuje oczekiwania na części.' },
    { id: 'faq-20', title: 'Czy można wysłać drukarkę DTG kurierem?', items: [], answer: 'Tak. Przyjmujemy urządzenia wysyłane z całej Polski. Drukarka powinna być zabezpieczona zgodnie z wymaganiami transportowymi danego modelu. We Wrocławiu możemy też odebrać drukarkę i dostarczyć ją po naprawie — zgodnie z cennikiem dojazdu.' },
    { id: 'faq-21', title: 'Czy po naprawie sprawdzacie jakość druku?', items: [], answer: 'Tak. Jeśli charakter naprawy tego wymaga, sprawdzamy działanie urządzenia i wykonujemy test druku. Kalibracja i konfiguracja potrzebne po naszej naprawie lub wymianie są wliczone w jej cenę.' },
    { id: 'faq-22', title: 'Czy udzielacie gwarancji na naprawę?', items: [], answer: 'Tak. Na wykonaną usługę serwisową udzielamy 3 miesięcy gwarancji, a na udrażnianie i regenerację głowicy — 7 dni. Części podlegają gwarancji producenta lub dostawcy.' },
  ]
}

export const createDtfPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applyDtfCleaningSection(sections)
  applyDtfRepairsSection(sections)
  applyDtfFaqSection(sections)
  return sections
}
