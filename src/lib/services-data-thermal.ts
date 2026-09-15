import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

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
  mechanismSubcategory.icon = '/images/accordion-icon-termiczne-mechanizm-podawania.webp'
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
  headSubcategory.icon = '/images/accordion-icon-termiczne-glowica-platen.webp'
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
  sensorSubcategory.icon = '/images/accordion-icon-termiczne-czujniki.webp'
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
  ribbonSubcategory.icon = '/images/accordion-icon-termiczne-ribbon.webp'
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
      sub.id === 'naprawy-tasma' ||
      sub.title === 'Skaner / ADF' ||
      sub.title === 'Moduły dodatkowe: odklejak, nawijak, podajniki, obcinarka'
  )

  if (!modulesSubcategory) return

  // Ujednolica id z wersją UK/RU (ta sama treść merytoryczna pod stałym id
  // we wszystkich językach) — bez tego podkategoria zostawała pod id
  // 'naprawy-tasma' i duplikowała domyślny tytuł "Taśma barwiąca...".
  modulesSubcategory.id = 'naprawy-skaner'
  modulesSubcategory.title = 'Moduły dodatkowe: odklejak, nawijak, podajniki, obcinarka'
  modulesSubcategory.icon = '/images/accordion-icon-termiczne-moduly.webp'
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
  electronicsSubcategory.icon = '/images/accordion-icon-termiczne-elektronika.webp'
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

  // Ujednolica id z wersją UK/RU (ta sama treść merytoryczna pod stałym id
  // we wszystkich językach) — bez tego podkategoria zostawała pod id
  // 'naprawy-dodatkowe' (dziedziczonym z domyślnego tytułu "Usługi dodatkowe").
  softwareSubcategory.id = 'naprawy-additional'
  softwareSubcategory.title = 'Oprogramowanie, konfiguracja i integracje'
  softwareSubcategory.subtitle =
    'etykiety drukują się przesunięte, w złym formacie, z błędnymi danymi lub nie drukują się wcale z programu'
  softwareSubcategory.icon = '/images/accordion-icon-termiczne-oprogramowanie.webp'
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
    icon: '/images/accordion-icon-termiczne-uslugi-dodatkowe.webp',
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
        duration: 'wg dostępności',
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

export const createThermalPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()

  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  const diagnosisItem = diagnosisSection?.items[3]

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

  // Kolejność podkategorii "naprawy" musi być identyczna jak w UK/RU —
  // wymuszamy ją jawnie, bo powyższe apply* funkcje tylko zmieniają treść
  // istniejących obiektów, nie ich pozycję w tablicy.
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (repairsSection?.subcategories) {
    const order = [
      'naprawy-mechanizm',
      'naprawy-karetka',
      'naprawy-glowica',
      'naprawy-elektronika',
      'naprawy-skaner',
      'naprawy-software',
      'naprawy-additional',
      'naprawy-termiczne-uslugi',
    ]
    repairsSection.subcategories.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
  }

  return sections
}
