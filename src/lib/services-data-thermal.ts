import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

const applyThermalCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return

  cleaningSection.items = [
    {
      service:
        'PEŁNA KONSERWACJA\u2028[[kompleksowe ]]czyszczenie, kontrola i kalibracja drukarki\n• dokładne czyszczenie wnętrza drukarki oraz całego toru etykiet / taśmy termotransferowej,\n• czyszczenie głowicy termicznej, wałka dociskowego, czujników, prowadnic i elementów podawania,\n• kontrolę stanu głowicy, wałka, napędu i głównych elementów mechanicznych; smarowanie, jeśli przewiduje je producent,\n• czyszczenie i kontrolę modułów dodatkowych: obcinaka, odklejaka i nawijaka – jeśli występują,\n• kalibrację czujników i mediów oraz sprawdzenie parametrów druku,\n• test końcowy jakości wydruku, czytelności kodów kreskowych i prawidłowego podawania etykiet.',
    },
  ]
}

const applyThermalRepairsSection = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection) return
  repairsSection.subcategories = [
    {
      id: 'naprawy-mechanizm',
      title: 'Transport etykiet i mechanizm napędu',
      items: [
        { service: 'Usuwanie zacięć w torze etykiet\n(etykiety lub liner blokują się wewnątrz drukarki)' },
        { service: 'Czyszczenie toru prowadzenia etykiet\n(zacinanie, podwijanie lub krzywe prowadzenie etykiet)' },
        { service: 'Regulacja toru i prowadnic etykiet\n(etykieta przesuwa się krzywo lub nadruk zmienia położenie)' },
        { service: 'Czyszczenie i regeneracja rolek podających\n(poślizg, nierówne lub przerywane pobieranie etykiet)' },
        { service: 'Wymiana rolek podających i prowadzących\n(zużyte rolki, trwałe problemy z pobieraniem etykiet)' },
        { service: 'Wymiana paska napędowego\n(przeskakiwanie, hałas lub problemy z przesuwem etykiet)' },
        { service: 'Wymiana silnika napędu\n(brak przesuwu etykiet lub zatrzymywanie mechanizmu)' },
      ],
    },
    {
      id: 'naprawy-glowica-platen',
      title: 'Głowica drukująca i wałek dociskowy',
      items: [
        { service: 'Czyszczenie głowicy drukującej i wałka dociskowego\n(blady wydruk, pasy lub słabo czytelne kody kreskowe)' },
        { service: 'Regulacja docisku głowicy\n(nierównomierna intensywność nadruku po obu stronach etykiety)' },
        { service: 'Wymiana wałka dociskowego (platen roller)\n(poślizg nośnika, nierówny wydruk lub uszkodzona powierzchnia wałka)' },
        { service: 'Wymiana głowicy drukującej\n(trwałe ubytki, białe linie lub uszkodzenie głowicy)' },
        { service: 'Kalibracja jakości wydruku\n(niewłaściwa temperatura, prędkość lub gęstość nadruku)' },
      ],
    },
    {
      id: 'naprawy-czujniki-kalibracja',
      title: 'Czujniki i kalibracja mediów',
      items: [
        { service: 'Czyszczenie czujników etykiet i taśmy barwiącej\n(błędy „label out”, „paper out” lub niewykrywanie ribbonu)' },
        { service: 'Kalibracja czujników gap / black mark\n(drukowanie w pustkę, pomijanie etykiet lub błędne pozycjonowanie)' },
        { service: 'Kalibracja długości i wysuwu etykiety\n(zbyt duży lub zbyt mały wysuw po wydruku)' },
        { service: 'Naprawa układu czujników\n(błędy detekcji pozostają mimo czyszczenia i kalibracji)' },
        { service: 'Wymiana czujnika etykiet / ribbonu / głowicy\n(brak prawidłowej detekcji nośnika, taśmy lub zamknięcia głowicy)' },
      ],
    },
    {
      id: 'naprawy-tasma-ribbon',
      title: 'Taśma barwiąca i mechanizm termotransferowy',
      items: [
        { service: 'Korekta prowadzenia taśmy barwiącej (ribbonu)\n(marszczenie, przesuwanie lub zrywanie taśmy)' },
        { service: 'Czyszczenie toru prowadzenia ribbonu\n(smugi, zabrudzenia lub nierówny przesuw taśmy)' },
        { service: 'Regulacja napięcia i nawijania ribbonu\n(taśma ślizga się, zatrzymuje lub nawija nierówno)' },
        { service: 'Wymiana elementów prowadzenia ribbonu\n(uszkodzone wałki, trzpienie lub uchwyty taśmy)' },
        { service: 'Dobór ribbonu i kalibracja parametrów druku\n(słaba trwałość nadruku, przegrzewanie głowicy lub niewłaściwa jakość)' },
      ],
    },
    {
      id: 'naprawy-moduly-dodatkowe',
      title: 'Obcinak, odklejak i nawijak',
      items: [
        { service: 'Czyszczenie i regulacja odklejaka (peel-off)\n(etykieta nie odkleja się prawidłowo od podkładu)' },
        { service: 'Naprawa odklejaka (peel-off)\n(mechanizm odklejania nie działa lub powoduje zacięcia)' },
        { service: 'Wymiana modułu odklejaka\n(zużyty lub pęknięty moduł odklejaka — naprawa nieopłacalna)' },
        { service: 'Czyszczenie i regulacja obcinaka\n(niedocinanie, zacinanie lub wyrywanie etykiet)' },
        { service: 'Wymiana noża obcinarki\n(postrzępione krawędzie lub brak prawidłowego cięcia)' },
        { service: 'Naprawa modułu obcinaka\n(obcinak nie uruchamia się lub blokuje podczas pracy)' },
        { service: 'Wymiana modułu obcinaka\n(uszkodzony silnik lub mechanizm noża — naprawa nieopłacalna)' },
        { service: 'Czyszczenie i regulacja nawijaka\n(rolka nawija się luźno, krzywo lub zatrzymuje)' },
        { service: 'Naprawa mechanizmu nawijaka\n(nawijak nie działa lub nie utrzymuje prawidłowego napięcia)' },
        { service: 'Wymiana mechanizmu nawijaka\n(uszkodzony silnik lub sprzęgło nawijaka — naprawa nieopłacalna)' },
      ],
    },
    {
      id: 'naprawy-elektronika-zasilanie',
      title: 'Elektronika, zasilanie i komunikacja',
      items: [
        { service: 'Naprawa zasilacza\n(drukarka nie włącza się lub wyłącza podczas pracy)' },
        { service: 'Wymiana zasilacza\n(uszkodzony moduł zasilający)' },
        { service: 'Naprawa płyty głównej\n(resetowanie, zawieszanie lub błędy elektroniki)' },
        { service: 'Wymiana płyty głównej\n(uszkodzona elektronika sterująca drukarki)' },
        { service: 'Naprawa okablowania i złączy\n(zaniki zasilania, sygnału lub niestabilna praca)' },
        { service: 'Naprawa panelu sterowania\n(przyciski, ekran lub panel nie reagują prawidłowo)' },
        { service: 'Wymiana panelu sterowania\n(uszkodzony wyświetlacz lub moduł panelu)' },
        { service: 'Naprawa modułów komunikacyjnych\n(brak komunikacji przez USB, Ethernet, Wi-Fi lub RS232)' },
      ],
    },
    {
      id: 'naprawy-oprogramowanie',
      title: 'Oprogramowanie i konfiguracja',
      items: [
        { service: 'Instalacja i konfiguracja sterowników\n(brak możliwości druku lub nieprawidłowa komunikacja z komputerem)' },
        { service: 'Konfiguracja formatu i parametrów etykiety\n(przesunięty nadruk, błędny rozmiar lub ucięte elementy etykiety)' },
        { service: 'Aktualizacja / konfiguracja firmware\n(błędy oprogramowania lub problemy po aktualizacji)' },
        { service: 'Konfiguracja sieciowa drukarki\n(brak druku z sieci lub wielu stanowisk)' },
        { service: 'Konfiguracja programu do projektowania etykiet\n(problemy z szablonem, kodami kreskowymi, czcionkami lub danymi)' },
      ],
    },
  ]
}

const applyThermalFaqSection = (sections: PricingSection[]) => {
  const faq = sections.find(section => section.id === 'faq')
  if (!faq) return
  faq.subcategories = [
    { id: 'faq-1', title: 'Jak wygląda proces naprawy drukarki etykiet?', items: [], answer: 'Najpierw wykonujemy wstępną diagnozę, następnie pełną diagnostykę i podajemy dokładny koszt oraz termin. Naprawę rozpoczynamy dopiero po akceptacji Klienta.' },
    { id: 'faq-2', title: 'Ile kosztuje diagnoza?', items: [], answer: 'Wstępna diagnoza online oraz przy dostarczeniu urządzenia jest bezpłatna. Przy realizacji naprawy pełna diagnoza również jest bezpłatna. W przypadku rezygnacji z naprawy koszt pełnej diagnozy wynosi 100 / 150 / 200 zł netto, zależnie od kategorii urządzenia.' },
    { id: 'faq-3', title: 'Ile trwa naprawa?', items: [], answer: 'Większość standardowych napraw wykonujemy w ciągu 1–3 dni roboczych. Bardziej złożona elektronika lub oczekiwanie na części może wydłużyć termin.' },
    { id: 'faq-4', title: 'Jakie marki serwisujecie?', items: [], answer: 'Serwisujemy m.in. Zebra, TSC, SATO, Honeywell, Citizen, Brother, Godex, Datalogic oraz inne drukarki etykiet.' },
    { id: 'faq-5', title: 'Czy warto naprawiać starszą drukarkę etykiet?', items: [], answer: 'To zależy od rodzaju usterki, stanu urządzenia, dostępności części i wartości drukarki. Po diagnozie informujemy, czy naprawa ma ekonomiczny sens.' },
    { id: 'faq-6', title: 'Drukarka pokazuje „Media Out” mimo założonych etykiet — dlaczego?', items: [], answer: 'Przyczyną może być zabrudzony lub źle ustawiony czujnik, niewłaściwy typ mediów albo brak prawidłowej kalibracji gap / black mark.' },
    { id: 'faq-7', title: 'Dlaczego drukarka pomija etykiety lub drukuje co drugą?', items: [], answer: 'Najczęściej problem wynika z kalibracji czujnika, ustawienia typu mediów albo nieprawidłowej długości etykiety.' },
    { id: 'faq-8', title: 'Co oznacza błąd „Ribbon Out”, gdy taśma jest założona?', items: [], answer: 'Możliwą przyczyną jest nieprawidłowe prowadzenie ribbonu, zabrudzony czujnik, zła szerokość taśmy albo ustawienie trybu Direct Thermal zamiast Thermal Transfer.' },
    { id: 'faq-9', title: 'Dlaczego ribbon marszczy się albo zrywa?', items: [], answer: 'Powodem może być niewłaściwe napięcie, prowadzenie taśmy, docisk głowicy lub zużycie mechanizmu nawijania.' },
    { id: 'faq-10', title: 'Jak dobrać odpowiedni ribbon?', items: [], answer: 'Rodzaj ribbonu dobiera się do materiału etykiety i wymaganej trwałości nadruku. Stosuje się m.in. taśmy wax, wax/resin i resin. Możemy dobrać ribbon i odpowiednie parametry druku.' },
    { id: 'faq-11', title: 'Dlaczego wydruk jest blady?', items: [], answer: 'Przyczyną może być zabrudzona lub zużyta głowica, zbyt niska temperatura, zbyt duża prędkość, niewłaściwy ribbon lub problem z dociskiem.' },
    { id: 'faq-12', title: 'Skąd biorą się białe pionowe linie na wydruku?', items: [], answer: 'Stałe białe linie mogą wskazywać na zabrudzenie lub uszkodzone punkty grzewcze głowicy. Najpierw wykonujemy czyszczenie i kontrolę głowicy.' },
    { id: 'faq-13', title: 'Kiedy trzeba wymienić głowicę drukującą?', items: [], answer: 'Jeśli po prawidłowym czyszczeniu nadal pozostają stałe ubytki nadruku lub uszkodzone linie grzewcze, głowica może wymagać wymiany.' },
    { id: 'faq-14', title: 'Kiedy trzeba wymienić platen roller?', items: [], answer: 'Gdy wałek jest zużyty, popękany lub zdeformowany, etykiety mogą się ślizgać, prowadzić nierówno albo powodować pogorszenie jakości wydruku.' },
    { id: 'faq-15', title: 'Drukarka pokazuje „Head Open”, mimo że głowica jest zamknięta — dlaczego?', items: [], answer: 'Możliwą przyczyną jest czujnik zamknięcia głowicy, jego ustawienie, okablowanie albo mechaniczne niedomykanie zespołu głowicy.' },
    { id: 'faq-16', title: 'Dlaczego obcinak nie odcina etykiet?', items: [], answer: 'Przyczyną może być klej i zabrudzenia, tępy lub uszkodzony nóż, zacięcie mechanizmu albo awaria modułu cutter.' },
    { id: 'faq-17', title: 'Dlaczego moduł peel-off nie odkleja etykiet?', items: [], answer: 'Problem może wynikać z zabrudzenia, regulacji czujnika lub prowadzenia lineru, zużycia mechanizmu albo nieprawidłowych ustawień trybu peel-off.' },
    { id: 'faq-18', title: 'Drukarka nie łączy się przez USB, Ethernet, Wi-Fi lub RS232 — co sprawdzacie?', items: [], answer: 'Sprawdzamy sterownik, konfigurację portu i sieci, przewody, złącza oraz moduły komunikacyjne.' },
    { id: 'faq-19', title: 'Czy problem może wynikać z ustawień lub materiałów, a nie z awarii?', items: [], answer: 'Tak. Niewłaściwy typ mediów, ribbon, temperatura, prędkość, tryb termiczny / termotransferowy albo błędna konfiguracja mogą powodować objawy podobne do usterki.' },
    { id: 'faq-20', title: 'Czy po zmianie etykiet trzeba ponownie kalibrować drukarkę?', items: [], answer: 'Często tak, szczególnie po zmianie rozmiaru, rodzaju nośnika, przerwy gap, black mark lub sposobu prowadzenia materiału.' },
    { id: 'faq-21', title: 'Czy części są wliczone w cenę?', items: [], answer: 'Jeżeli przy usłudze widnieje „+ części”, cena obejmuje robociznę, a części są rozliczane osobno. Koszt części podajemy przed rozpoczęciem naprawy.' },
    { id: 'faq-22', title: 'Czy udzielacie gwarancji na naprawę?', items: [], answer: 'Tak. Na wykonane naprawy udzielamy gwarancji od 3 do 12 miesięcy, zależnie od rodzaju pracy i zastosowanych części.' },
    { id: 'faq-23', title: 'Czy mogę dostarczyć drukarkę samodzielnie?', items: [], answer: 'Tak. Jeśli masz możliwość bezpiecznego transportu, możesz dostarczyć urządzenie bezpośrednio do serwisu. Możesz również zamówić odbiór zgodnie z aktualnym cennikiem.' },
    { id: 'faq-24', title: 'Ile kosztuje odbiór lub dostawa drukarki etykiet?', items: [], answer: 'Odbiór lub dostawa do 2,5 km od serwisu kosztuje 20 zł netto. Przy dłuższej trasie doliczamy 1,5 zł netto za każdy kilometr powyżej 5 km łącznej trasy w obie strony.' },
    { id: 'faq-25', title: 'Jak często czyścić głowicę i konserwować drukarkę etykiet?', items: [], answer: 'Głowicę warto czyścić przy każdej wymianie ribbonu lub rolki etykiet, a przy intensywnej pracy częściej. Pełną konserwację zalecamy co 6–12 miesięcy albo wcześniej, gdy pojawiają się blade fragmenty, białe linie lub problemy z prowadzeniem etykiet.' },
  ]
}

export const createThermalPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()

  applyThermalCleaningSection(sections)
  applyThermalRepairsSection(sections)
  applyThermalFaqSection(sections)

  return sections
}
