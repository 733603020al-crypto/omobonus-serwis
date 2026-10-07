import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

// serwis-drukarek-dtf — własne dane strony (PL = źródło prawdy dla UK/RU).
export const DTF_PRICE_TOOLTIP =
  'Ceny netto za robociznę, bez części i atramentu. Przy pełnej konserwacji standardowe płyny czyszczące i drobne materiały serwisowe są wliczone w cenę. Czas realizacji nie obejmuje oczekiwania na części.'

const applyDtfCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PEŁNA KONSERWACJA\u2028[[kompleksowe ]]czyszczenie, kontrola i kalibracja drukarki DTF\n• czyszczenie głowic i ich otoczenia;\n• czyszczenie captopów, wiperów i stacji serwisowej;\n• kontrola układu atramentowego, przewodów, damperów i filtrów;\n• kontrola pomp i odpływu zużytego atramentu;\n• kontrola i czyszczenie systemu białego atramentu;\n• czyszczenie enkodera i czujników;\n• czyszczenie i kontrola prowadnic oraz mechanizmu karetki;\n• kontrola pasków, napędów i rolek;\n• czyszczenie i kontrola toru prowadzenia folii;\n• test dysz;\n• kalibracja głowic i podawania materiału;\n• wydruk testowy po konserwacji.',
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
      title: 'Głowice drukujące i jakość druku',
      items: [
        { service: 'Czyszczenie / udrażnianie głowicy\n(brakujące dysze, paski, przerwy lub nierówny druk)' },
        { service: 'Wymiana głowicy drukującej\n(głowica jest uszkodzona lub nie można jej skutecznie udrożnić)' },
        { service: 'Kalibracja głowic i bi-direction\n(przesunięte kolory, podwójne kontury lub nieostry druk)' },
        { service: 'Regulacja położenia / wysokości głowicy\n(ocieranie głowicy o folię lub nieprawidłowa odległość od materiału)' },
      ],
    },
    {
      id: 'naprawy-atrament',
      title: 'Układ atramentowy i biały atrament',
      items: [
        { service: 'Płukanie / udrażnianie układu atramentowego\n(atrament nie dopływa prawidłowo, układ jest zapowietrzony lub zatkany)' },
        { service: 'Wymiana damperów, filtrów lub przewodów\n(niestabilny przepływ atramentu, pęcherzyki powietrza lub zaniki koloru)' },
        { service: 'Naprawa / wymiana pompy atramentu\n(pompa nie podaje atramentu lub nie utrzymuje prawidłowego przepływu)' },
        { service: 'Naprawa cyrkulacji / mieszania białego atramentu\n(biały atrament osiada, rozwarstwia się lub jest podawany nierównomiernie)' },
        { service: 'Czyszczenie zbiorników i osadów atramentowych\n(osad lub zanieczyszczenia utrudniają prawidłowe podawanie atramentu)' },
      ],
    },
    {
      id: 'naprawy-stacja-serwisowa',
      title: 'Stacja serwisowa i układ odpływu atramentu',
      items: [
        { service: 'Czyszczenie / regeneracja stacji serwisowej\n(głowica nie jest prawidłowo czyszczona lub parkowana)' },
        { service: 'Wymiana captopów / wiperów\n(problemy z czyszczeniem głowicy, zasysaniem atramentu lub brakującymi dyszami)' },
        { service: 'Naprawa / wymiana pompy odsysającej\n(stacja nie odsysa atramentu podczas czyszczenia głowicy)' },
        { service: 'Udrażnianie układu odpływu atramentu\n(zużyty atrament nie odpływa lub pojawiają się wycieki)' },
        { service: 'Wymiana zbiornika / czujnika zużytego atramentu\n(drukarka zgłasza pełny zbiornik lub nie wykrywa jego stanu)' },
      ],
    },
    {
      id: 'naprawy-karetka',
      title: 'Karetka, napęd i enkoder',
      items: [
        { service: 'Wymiana paska karetki\n(karetka szarpie, przeskakuje lub nie porusza się prawidłowo)' },
        { service: 'Naprawa / wymiana silnika karetki\n(karetka nie rusza, zatrzymuje się lub drukarka zgłasza błąd napędu)' },
        { service: 'Czyszczenie / wymiana enkodera\n(błędy pozycjonowania, przesunięcia wydruku lub nieprawidłowy ruch karetki)' },
        { service: 'Regulacja prowadnic i mechanizmu karetki\n(hałas, opory ruchu, luzy lub nierówna praca karetki)' },
      ],
    },
    {
      id: 'naprawy-folia',
      title: 'Podawanie i prowadzenie folii',
      items: [
        { service: 'Kalibracja posuwu folii\n(wydruk jest rozciągnięty, ściśnięty lub pojawiają się poziome pasy)' },
        { service: 'Naprawa / wymiana rolek dociskowych\n(folia ślizga się, przesuwa na bok lub jest podawana nierówno)' },
        { service: 'Naprawa / wymiana silnika podawania folii\n(folia nie przesuwa się lub zatrzymuje podczas druku)' },
        { service: 'Naprawa odwijaka / nawijarki\n(rolka nie rozwija lub nie nawija folii prawidłowo)' },
        { service: 'Regulacja prowadzenia folii\n(folia schodzi na bok, marszczy się lub przesuwa podczas druku)' },
      ],
    },
    {
      id: 'naprawy-grzanie',
      title: 'Podgrzewanie i podsys folii',
      items: [
        { service: 'Naprawa / wymiana grzałki\n(folia nie jest podgrzewana lub temperatura jest zbyt niska)' },
        { service: 'Naprawa sterowania temperaturą / czujnika\n(temperatura jest niestabilna, zawyżona lub drukarka zgłasza błąd grzania)' },
        { service: 'Naprawa podsysu / wentylatora\n(folia nie przylega prawidłowo lub przesuwa się podczas druku)' },
        { service: 'Kalibracja temperatury grzania\n(rzeczywista temperatura różni się od ustawionej lub grzanie jest nierównomierne)' },
      ],
    },
    {
      id: 'naprawy-elektronika-zasilanie',
      title: 'Elektronika, zasilanie i czujniki',
      items: [
        { service: 'Diagnostyka / naprawa płyty głównej\n(drukarka nie uruchamia się, zawiesza się lub zgłasza błędy elektroniki)' },
        { service: 'Wymiana płyty głównej / sterownika\n(płyta jest uszkodzona i nie nadaje się do naprawy)' },
        { service: 'Naprawa / wymiana zasilacza\n(brak zasilania, samoczynne wyłączanie lub niestabilna praca)' },
        { service: 'Naprawa / wymiana czujników\n(drukarka błędnie wykrywa folię, położenie elementów lub stan urządzenia)' },
        { service: 'Naprawa przewodów, taśm i połączeń elektronicznych\n(przerywana komunikacja, losowe błędy lub brak sterowania podzespołem)' },
      ],
    },
    {
      id: 'naprawy-oprogramowanie',
      title: 'Oprogramowanie, firmware i RIP',
      items: [
        { service: 'Instalacja / konfiguracja RIP\n(program nie drukuje prawidłowo lub wymaga konfiguracji drukarki i parametrów DTF)' },
        { service: 'Aktualizacja / przywrócenie firmware\n(błędy oprogramowania drukarki, problemy po aktualizacji lub nieprawidłowe działanie sterowania)' },
        { service: 'Konfiguracja sterowników i komunikacji PC–drukarka\n(komputer nie wykrywa drukarki lub zadania nie są przesyłane)' },
        { service: 'Kalibracja kolorów / konfiguracja profilu ICC\n(kolory na wydruku nie odpowiadają projektowi lub wymagają korekty)' },
        { service: 'Przywracanie / konfiguracja ustawień drukarki\n(utracone ustawienia, błędne parametry lub konfiguracja po wymianie elektroniki)' },
      ],
    },
  ]
}

const applyDtfFaqSection = (sections: PricingSection[]) => {
  const faq = sections.find(section => section.id === 'faq')
  if (!faq) return
  faq.subcategories = [
    { id: 'faq-1', title: 'Jakie drukarki DTF naprawiamy?', items: [], answer: 'Serwisujemy drukarki DTF różnych klas — od kompaktowych urządzeń A3 po profesjonalne i przemysłowe systemy rolkowe. Obsługujemy m.in. Epson, Roland DG, Mimaki, Mutoh, Fedar, Audley, Pegasus, TruJet, Artemis, IronPrinter, Dias, Cobe, Keditec i DTF Station / Prestige.' },
    { id: 'faq-2', title: 'Czy naprawiamy również mniej popularne i chińskie drukarki DTF?', items: [], answer: 'Tak. Możliwość naprawy zależy przede wszystkim od konstrukcji urządzenia, zastosowanych podzespołów oraz dostępności części. W wielu drukarkach DTF stosowane są popularne głowice Epson i standardowe komponenty układu atramentowego.' },
    { id: 'faq-3', title: 'Ile trwa diagnoza drukarki DTF?', items: [], answer: 'Wstępna ocena online lub przy dostawie do serwisu zajmuje do 15 minut. Pełna diagnoza techniczna i wycena naprawy zazwyczaj zajmuje 1–2 dni robocze, a przy bardziej złożonych usterkach do 3 dni.' },
    { id: 'faq-4', title: 'Czy diagnoza jest płatna?', items: [], answer: 'Jeżeli wykonujemy naprawę — diagnoza i wycena są GRATIS. Przy rezygnacji z naprawy koszt diagnozy wynosi 250 / 350 / 500 zł, zależnie od klasy urządzenia.' },
    { id: 'faq-5', title: 'Ile trwa naprawa drukarki DTF?', items: [], answer: 'Większość napraw wykonujemy w 1–3 dni robocze, naprawy elektroniki w 2–5 dni. Przy każdej usłudze w cenniku podajemy orientacyjny czas realizacji. Czas ten nie obejmuje oczekiwania na części.' },
    { id: 'faq-6', title: 'Czy możliwa jest pilna naprawa?', items: [], answer: 'Tak — jeśli to możliwe, przyspieszamy naprawę bez dodatkowej opłaty. Termin zależy od rodzaju usterki i dostępności części.' },
    { id: 'faq-7', title: 'Czy można uratować zatkaną głowicę DTF?', items: [], answer: 'Często tak. Najpierw sprawdzamy stan dysz, captopu, pompy, damperów i układu atramentowego. Jeżeli głowicę można bezpiecznie udrożnić, wykonujemy czyszczenie lub płukanie. Wymianę proponujemy dopiero wtedy, gdy regeneracja nie ma technicznego lub ekonomicznego sensu.' },
    { id: 'faq-8', title: 'Dlaczego biały atrament DTF przestaje drukować prawidłowo?', items: [], answer: 'Najczęstsze przyczyny to sedymentacja pigmentu, niewłaściwa cyrkulacja, zatkane filtry lub dampery, zapowietrzenie układu albo problemy z pompą i głowicą. Dlatego diagnozujemy cały układ białego atramentu, a nie tylko samą głowicę.' },
    { id: 'faq-9', title: 'Co zrobić, jeśli drukarka DTF długo nie była używana?', items: [], answer: 'Nie należy od razu wykonywać wielu intensywnych cykli czyszczenia. Przy dłuższym postoju atrament może zaschnąć w głowicy, captopach, damperach i przewodach. Bezpieczniej najpierw sprawdzić stan układu atramentowego.' },
    { id: 'faq-10', title: 'Dlaczego folia DTF schodzi na bok lub marszczy się podczas druku?', items: [], answer: 'Przyczyną mogą być rolki dociskowe, nieprawidłowe napięcie folii, odwijak lub nawijarka, ustawienie prowadzenia materiału albo błędna kalibracja posuwu. Sprawdzamy cały tor prowadzenia folii.' },
    { id: 'faq-11', title: 'Czy naprawiamy problemy z RIP-em, firmware i komunikacją z komputerem?', items: [], answer: 'Tak. Pomagamy przy problemach z RIP-em, sterownikami, firmware, komunikacją PC–drukarka, ustawieniami druku oraz konfiguracją profili ICC. Konfigurację RIP-u, sterowników i firmware możemy wykonać zdalnie — według cen z cennika. Bezpłatna jest wyłącznie wstępna ocena online.' },
    { id: 'faq-12', title: 'Czy części zamienne są wliczone w cenę i czy dostanę wycenę przed wymianą?', items: [], answer: 'Nie, jeżeli przy usłudze widnieje oznaczenie „+ części”. Cena w cenniku obejmuje wtedy pracę serwisową. Po diagnozie informujemy, co jest uszkodzone, jaki zakres prac jest potrzebny i ile kosztują części. Wymianę drogich podzespołów wykonujemy dopiero po akceptacji kosztów.' },
    { id: 'faq-13', title: 'Czy wykonujemy samo czyszczenie i konserwację drukarki DTF bez naprawy?', items: [], answer: 'Tak. Pełna konserwacja obejmuje m.in. czyszczenie głowic i stacji serwisowej, kontrolę układu atramentowego i białego atramentu, prowadnic, karetki, enkodera, prowadzenia folii oraz kalibrację i wydruk testowy.' },
    { id: 'faq-14', title: 'Ile kosztuje konserwacja drukarki DTF?', items: [], answer: 'Pełna konserwacja kosztuje 400 / 600 / 900 zł netto, zależnie od klasy urządzenia. W cenie są standardowe płyny czyszczące i drobne materiały serwisowe; części zamienne — dodatkowo, jeśli konieczna jest ich wymiana.' },
    { id: 'faq-15', title: 'Jak często warto wykonywać konserwację drukarki DTF?', items: [], answer: 'Zależy to od intensywności pracy, rodzaju atramentu i konstrukcji urządzenia. Przy regularnej produkcji układ atramentowy, stacja serwisowa, głowice i mechanika powinny być kontrolowane systematycznie, zanim pojawią się problemy z jakością druku.' },
    { id: 'faq-16', title: 'Czy drukarka DTF wymaga codziennej obsługi?', items: [], answer: 'Tak. Przy większości drukarek DTF zaleca się codzienny test dysz i regularne mieszanie lub cyrkulację białego atramentu, zgodnie z instrukcją producenta. Zaniedbanie codziennej obsługi to najczęstsza przyczyna zaschniętych głowic i problemów z białym kolorem.' },
    { id: 'faq-17', title: 'Czy drukarkę DTF trzeba dostarczyć do serwisu?', items: [], answer: 'Nie zawsze. Najpierw możemy ocenić problem na podstawie opisu, zdjęć lub rozmowy. Jeżeli konieczna jest dokładna diagnoza lub naprawa mechaniczna, urządzenie można dostarczyć do serwisu albo skorzystać z odbioru. Serwis u klienta możliwy jest we Wrocławiu i okolicach — koszt dojazdu według cennika. Odbiór dużych drukarek DTF (60 cm, na stelażu) rozliczamy według tej samej stawki co pozostałych urządzeń — od 150 zł.' },
    { id: 'faq-18', title: 'Jak zgłosić usterkę drukarki DTF?', items: [], answer: 'Opisz problem przez WhatsApp, formularz na stronie lub telefonicznie — najlepiej z nazwą modelu i zdjęciem testu dysz. Wstępna ocena online jest bezpłatna i zajmuje do 15 minut.' },
    { id: 'faq-19', title: 'Czy udzielacie gwarancji na naprawę?', items: [], answer: 'Tak. 3 miesiące gwarancji na wykonaną usługę serwisową. 7 dni gwarancji na usługę udrażniania / regeneracji głowicy. Na zamontowane części obowiązuje gwarancja producenta lub dostawcy, zgodnie z jej warunkami.' },
  ]
}

export const createDtfPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applyDtfCleaningSection(sections)
  applyDtfRepairsSection(sections)
  applyDtfFaqSection(sections)
  return sections
}
