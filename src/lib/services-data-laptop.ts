import type { PricingSection, PricingSubcategory } from './services-data-types'
import { createPricingSections, getRecoveryItems } from './services-data-shared'

export const createLaptopPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  if (diagnosisSection) {
    diagnosisSection.items = [
      {
        service: 'Wstępna konsultacja online do 15 min (opis problemu przez WhatsApp, formularz lub telefon)',
      },
      {
        service: 'Wstępne sprawdzenie przy przyjęciu sprzętu (krótkie sprawdzenie objawów i wstępna ocena; nie zastępuje pełnej diagnozy)',
      },
      {
        service: 'Pełna diagnoza i wycena naprawy\n(bezpłatna przy zleceniu naprawy lub gdy nie znajdziemy przyczyny usterki)',
      },
      {
        service: 'Pełna diagnoza i wycena naprawy\n(tylko w przypadku rezygnacji po wykonaniu pełnej diagnozy)',
      },
      {
        service: 'Pisemna opinia techniczna\n(dodatkowo do pełnej diagnozy, z dokumentacją fotograficzną)',
      },
      {
        service: 'Pilna realizacja (jeśli to możliwe, przyspieszamy naprawę bez dodatkowej opłaty)',
      },
    ]
  }

  const dojazdSection = sections.find(section => section.id === 'dojazd')
  if (dojazdSection) {
    dojazdSection.items = [
      {
        service: 'Odbiór urządzenia od Klienta (do 2,5 km od serwisu; 5 km łącznie w obie strony)',
      },
      {
        service: 'Dostarczenie naprawionego urządzenia do Klienta (do 2,5 km od serwisu; 5 km łącznie w obie strony)',
      },
      {
        service: 'Odbiór lub dostawa powyżej 2,5 km od serwisu (trasa w obie strony; dopłata po przekroczeniu 5 km)',
      },
      {
        service: 'Pilna realizacja (jeśli to możliwe, realizujemy odbiór lub dostawę w pierwszej kolejności)',
      },
    ]
  }
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (cleaningSection) {
    cleaningSection.items = [
      {
        service:
          'CZYSZCZENIE I KONSERWACJA — LAPTOP STANDARDOWY\u2028czyszczenie wnętrza i układu chłodzenia, wymiana materiałów termicznych\n• demontaż i dokładne czyszczenie układu chłodzenia,\n• czyszczenie wentylatorów, radiatorów i kanałów wentylacyjnych,\n• wymiana pasty termoprzewodzącej na CPU/GPU,\n• kontrola i w razie potrzeby wymiana/dopasowanie termopadów,\n• kontrola działania wentylatorów,\n• czyszczenie obudowy i klawiatury,\n• montaż oraz test temperatur i stabilności pracy.',
      },
      {
        service:
          'CZYSZCZENIE I KONSERWACJA — LAPTOP GAMINGOWY\u2028rozszerzone czyszczenie CPU/GPU i wymiana materiałów termicznych\n• dokładne czyszczenie rozbudowanego układu chłodzenia CPU/GPU,\n• czyszczenie wentylatorów, radiatorów i kanałów wentylacyjnych,\n• wymiana pasty termoprzewodzącej na CPU/GPU,\n• kontrola i wymiana/dopasowanie termopadów VRAM, VRM i pozostałych chłodzonych elementów,\n• montaż oraz rozszerzony test obciążeniowy CPU/GPU i kontrola temperatur.',
      },
      {
        service:
          'CZYSZCZENIE PO ZALANIU\u2028demontaż, czyszczenie i diagnostyka urządzenia\n• demontaż laptopa i odłączenie baterii,\n• lokalizacja śladów zalania i korozji,\n• dokładne czyszczenie płyty głównej i zalanych podzespołów,\n• usuwanie pozostałości cieczy i korozji,\n• czyszczenie złączy, portów i pozostałych zalanych elementów,\n• diagnostyka elektroniki,\n• montaż i test podstawowych funkcji urządzenia.\n\nUwaga!!! Prosimy o wyłączenie laptopa i wyciągnięcie baterii natychmiast po zalaniu.',
      },
    ]
  }
  const serviceSection = sections.find(section => section.id === 'naprawy')
  if (serviceSection) {
    serviceSection.subcategories = [
      {
        id: 'naprawy-oprogramowanie',
        title: 'Oprogramowanie i system',
        items: [
          { service: 'Instalacja systemu Windows / Linux\n(czysta instalacja systemu, aktualizacje i sterowniki; bez zachowania danych)' },
          { service: 'Instalacja systemu z zachowaniem danych\n(system wymaga ponownej instalacji, a dokumenty, zdjęcia i pliki mają zostać na komputerze)' },
          { service: 'Instalacja systemu macOS\n(czysta instalacja systemu i aktualizacje; bez zachowania danych)' },
          { service: 'Instalacja i konfiguracja oprogramowania / sterowników\n(brak dźwięku, niedziałająca drukarka lub inne urządzenie, „nieznane urządzenie” w systemie)' },
          { service: 'Naprawa i optymalizacja systemu Windows\n(problemy z uruchomieniem, zapętlanie startu, restarty, zawieszanie lub wolna praca)' },
          { service: 'Przywracanie systemu z partycji Recovery\n(poważne problemy z systemem lub złośliwe oprogramowanie — powrót do ustawień fabrycznych)' },
          { service: 'Naprawa problemów po aktualizacji Windows / BSOD\n(niebieski ekran, ciągłe restarty, „Automatyczna naprawa” lub czarny ekran po aktualizacji)' },
          { service: 'Usuwanie wirusów i złośliwego oprogramowania\n(wyskakujące reklamy, przekierowania na obce strony, zmieniona przeglądarka, spowolnienie)' },
          { service: 'Usunięcie / odzyskanie hasła użytkownika Windows\n(zapomniane hasło, brak możliwości zalogowania; tylko jeśli legalne i możliwe)' },
          { service: 'Indywidualna konfiguracja systemu Windows\n(ustawienie systemu pod użytkownika: konta, aktualizacje, wygląd, zbędne programy, zabezpieczenia)' },
          { service: 'Zdalna pomoc informatyka\n(przez internet: programy, poczta, drukarka, sterowniki; komputer musi się uruchamiać i mieć internet)' },
        ],
      },
      {
        id: 'naprawy-bios',
        title: 'BIOS / UEFI i konfiguracja sprzętowa',
        items: [
          { service: 'Aktualizacja / konfiguracja BIOS / UEFI\n(nowa wersja od producenta lub zmiana ustawień, np. gdy nowy podzespół nie jest rozpoznawany)' },
          { service: 'Naprawa / odzyskanie BIOS po błędnej aktualizacji\n(czarny ekran, brak logo producenta, pętla restartów lub brak reakcji po aktualizacji)' },
          { service: 'Programowanie BIOS / UEFI\n(uszkodzone oprogramowanie BIOS — komputer nie startuje, choć podzespoły są sprawne)' },
          { service: 'Usunięcie hasła BIOS / UEFI\n(zapomniane hasło przy starcie lub do ustawień BIOS)' },
          { service: 'Odtworzenie BIOS z zachowaniem danych (numer seryjny, klucz Windows)\n(gdy po programowaniu BIOS zniknął numer seryjny lub Windows stracił aktywację)' },
        ],
      },
      {
        id: 'naprawy-plyta-glowna',
        title: 'Płyta główna i elektronika',
        items: [
          { service: 'Naprawa płyty głównej\n(przerwane ścieżki, zimne luty, mikrolutowanie, uszkodzenia elementów elektronicznych)' },
          { service: 'Wymiana płyty głównej\n(gdy naprawa płyty nie jest możliwa lub się nie opłaca)' },
          { service: 'Naprawa / wymiana portu USB / HDMI / Audio\n(luźne gniazdo, połączenie tylko pod kątem, system nie wykrywa urządzenia)' },
          { service: 'Wymiana baterii CMOS\n(reset daty i godziny, utrata ustawień BIOS, komunikat „CMOS Battery Failure”)' },
          { service: 'Naprawa układu zasilania płyty głównej\n(laptop nie włącza się lub nie reaguje na przycisk, restarty, nie działa klawiatura lub wentylator)' },
        ],
      },
      {
        id: 'naprawy-bateria',
        title: 'Bateria',
        items: [
          { service: 'Diagnostyka / wymiana baterii laptopa\n(krótki czas pracy, wyłączanie bez zasilacza, brak ładowania lub błędny poziom baterii)' },
          { service: 'Wymiana baterii wewnętrznej\n(spuchnięta bateria, wybrzuszona obudowa lub unoszący się touchpad, komunikat o wymianie baterii)' },
        ],
      },
      {
        id: 'naprawy-zasilanie-ladowanie',
        title: 'Zasilanie i ładowanie',
        items: [
          { service: 'Naprawa / wymiana gniazda zasilania\n(ładowanie tylko po dociśnięciu wtyczki, luźne gniazdo, laptop nie wykrywa zasilacza)' },
          { service: 'Naprawa / wymiana gniazda USB-C\n(brak ładowania przez USB-C, luźne lub uszkodzone gniazdo, problemy z Power Delivery)' },
          { service: 'Naprawa układu ładowania\n(„Podłączony, nie ładuje”, laptop działa tylko na zasilaczu lub tylko na baterii)' },
        ],
      },
      {
        id: 'naprawy-zlacza-podzespoly',
        title: 'Podzespoły',
        items: [
          { service: 'Wymiana / rozbudowa pamięci RAM + test stabilności\n(zawieszanie, niebieskie ekrany, restarty lub wolna praca)' },
          { service: 'Wymiana modułu Wi-Fi / Bluetooth\n(brak wykrywania sieci, zrywanie połączenia, nie działa Bluetooth)' },
          { service: 'Naprawa / konfiguracja Wi-Fi i Bluetooth\n(brak połączenia, wolny internet mimo dobrej sieci, nie da się sparować urządzeń Bluetooth)' },
          { service: 'Wymiana kamery / mikrofonu / głośników\n(rozmówcy słyszą szum lub cichy głos, trzaski, charczenie lub brak dźwięku)' },
          { service: 'Wymiana napędu / nagrywarki\n(nie czyta lub nie nagrywa płyt, wyrzuca płyty, nietypowe odgłosy)' },
        ],
      },
      {
        id: 'naprawy-chlodzenie',
        title: 'Układ chłodzenia',
        items: [
          { service: 'Wymiana wentylatora chłodzenia\n(głośne terkotanie lub pisk, przegrzewanie, samoczynne wyłączanie)' },
          { service: 'Wymiana radiatora / układu chłodzenia\n(przegrzewanie i wyłączanie pod obciążeniem, spadek wydajności)' },
        ],
      },
      {
        id: 'naprawy-dyski-dane',
        title: 'Dyski i dane',
        items: [
          { service: 'Diagnoza dysku — sprawdzenie stanu i test powierzchni\n(klikanie lub stukanie dysku, zawieszanie przy otwieraniu plików, długie ładowanie systemu)' },
          { service: 'Kopia zapasowa danych\n(zabezpieczenie zdjęć, dokumentów i plików przed naprawą, reinstalacją lub przeniesieniem na nowy komputer)' },
          { service: 'Klonowanie dysku (przeniesienie danych na nowy dysk)\n(system, programy i pliki 1:1 na nowym lub większym dysku, bez ponownej instalacji)' },
          { service: 'Wymiana HDD na SSD + migracja danych\n(system długo się uruchamia, programy otwierają się wolno)' },
          { service: 'Wymiana / montaż dysku SSD (M.2 NVMe / SATA)\n(brakuje miejsca na pliki, montaż dodatkowego dysku lub wymiana uszkodzonego SSD)' },
          { service: 'Kopia danych z uszkodzonego systemu\n(w przypadku awarii systemu Windows — dokumenty, zdjęcia, filmy i inne pliki)' },
        ],
      },
      {
        id: 'naprawy-odzyskiwanie-danych',
        title: 'Odzyskiwanie i bezpieczne usuwanie danych',
        items: getRecoveryItems().map(item => ({ ...item })),
      },
      {
        id: 'naprawy-ekran-obudowa',
        title: 'Ekran, zawiasy i obudowa',
        items: [
          { service: 'Wymiana matrycy (standardowej, bez klejenia)\n(pęknięcia, plamy, pasy, migotanie lub czarny ekran przy działającym laptopie)' },
          { service: 'Wymiana taśmy matrycy\n(obraz miga lub znika przy ruszaniu klapą, pionowe lub poziome paski)' },
          { service: 'Wymiana ramki ekranu\n(pęknięta lub wyłamana ramka po upadku lub uderzeniu)' },
          { service: 'Wymiana zawiasów\n(klapa chodzi ciężko lub nierówno, trzaski, luźny ekran)' },
          { service: 'Naprawa mocowań zawiasów i obudowy\n(szczelina między elementami obudowy, unosząca się obudowa przy zawiasie)' },
          { service: 'Wymiana obudowy matrycy lub obudowy dolnej\n(pęknięcia lub wyłamania po upadku lub uderzeniu)' },
          { service: 'Wymiana lub uzupełnienie pojedynczych elementów obudowy (śruby, mocowania, klipsy)\n(brakujące lub poluzowane śruby, odpięte lub wyłamane klipsy, luźne pojedyncze elementy obudowy)' },
          { service: 'Przełożenie podzespołów do nowej obudowy\n(pełny demontaż i przeniesienie płyty głównej, chłodzenia, klawiatury i pozostałych części do nowej obudowy)' },
        ],
      },
      {
        id: 'naprawy-klawiatura-touchpad',
        title: 'Klawiatura, touchpad i elementy sterujące',
        items: [
          { service: 'Czyszczenie klawiatury + dezynfekcja (bez rozkręcania / rozbierania)\n(usunięcie kurzu, okruchów i zabrudzeń z klawiszy i szczelin oraz dezynfekcja powierzchni)' },
          { service: 'Czyszczenie klawiatury przykręcanej po zalaniu\n(klawisze kleją się, wciskają się ciężko lub same, klawiatura reaguje losowo)' },
          { service: 'Czyszczenie klawiatury zintegrowanej z obudową po zalaniu\n(klawisze kleją się, wciskają się ciężko lub same, klawiatura reaguje losowo)' },
          { service: 'Czyszczenie lub wymiana pojedynczego klawisza (jeśli możliwe)\n(pojedynczy klawisz nie reaguje lub wymaga większej siły)' },
          { service: 'Naprawa lub wymiana klawiatury (wymiennej, przykręcanej)\n(część klawiszy nie działa, klawiatura reaguje losowo, uszkodzenie po zalaniu)' },
          { service: 'Naprawa lub wymiana klawiatury nitowanej / zintegrowanej z obudową (cena zależy od złożoności)\n(część klawiszy nie działa, klawiatura reaguje losowo, uszkodzenie po zalaniu)' },
          { service: 'Naprawa lub wymiana touchpada\n(brak reakcji na dotyk, skaczący kursor, samoczynne kliknięcia)' },
          { service: 'Naprawa / wymiana przycisku zasilania\n(przycisk zapada się, nie wraca lub trzeba go mocno wciskać)' },
        ],
      },
    ]
  }
  const faqSection = sections.find(section => section.id === 'faq')
  if (faqSection) {
    faqSection.subcategories = laptopFaqItems()
  }
  return sections
}


// FAQ tylko dla serwis-laptopow (zastępuje wspólne FAQ napraw).
const laptopFaqItems = (): PricingSubcategory[] => [
  { id: 'faq-1', title: 'Jak wygląda proces naprawy laptopa?', items: [], answer: '**Przyjmujemy laptop, wykonujemy diagnozę i przedstawiamy wycenę.**\n\nNaprawę rozpoczynamy dopiero po jej akceptacji.\n\nW razie potrzeby zamawiamy części i informujemy o terminie, a po naprawie testujemy laptop przed wydaniem.' },
  { id: 'faq-2', title: 'Ile trwa diagnoza laptopa?', items: [], answer: 'Wstępne sprawdzenie przy przyjęciu trwa do 15 minut. Pełna diagnoza zajmuje zwykle 1–2 dni.' },
  { id: 'faq-3', title: 'Czy diagnoza jest bezpłatna?', items: [], answer: 'Tak — pełna diagnoza jest **GRATIS**, jeśli zlecasz naprawę.\n\nW przypadku rezygnacji po pełnej diagnozie jej koszt wynosi **100 zł**.\n\nKonsultacja online i wstępne sprawdzenie przy przyjęciu są zawsze bezpłatne.' },
  { id: 'faq-4', title: 'Czy przed naprawą poznam dokładny koszt?', items: [], answer: '**Tak. Po diagnozie podajemy koszt usługi i ewentualnych części.**\n\nNie rozpoczynamy naprawy bez Twojej akceptacji, a jeśli w trakcie okaże się, że potrzebne są dodatkowe prace — najpierw je uzgadniamy.' },
  { id: 'faq-5', title: 'Ile trwa naprawa laptopa?', items: [], answer: 'Standardowa naprawa trwa zwykle **1–3 dni**.\n\nNaprawa płyty głównej, układu ładowania lub oczekiwanie na części mogą wydłużyć ten czas.\n\nTermin dla każdej usługi podajemy w cenniku.' },
  { id: 'faq-6', title: 'Czy ceny w cenniku obejmują części zamienne?', items: [], answer: 'Ceny bez dopisku obejmują samą usługę. Jeśli przy cenie jest „+ części” lub „+ część”, część zamienna jest płatna osobno — jej koszt podajemy przed naprawą.' },
  { id: 'faq-7', title: 'Czy udzielacie gwarancji na naprawę?', items: [], answer: 'Tak. **3–12 miesięcy**, w zależności od rodzaju naprawy i wymienionych części.' },
  { id: 'faq-8', title: 'Czy naprawa może wpłynąć na gwarancję producenta?', items: [], answer: 'Jeśli naprawa mogłaby naruszyć warunki gwarancji producenta, informujemy o tym przed rozpoczęciem prac. Decyzja zawsze należy do Ciebie.' },
  { id: 'faq-9', title: 'Czy naprawiacie laptopy wszystkich marek?', items: [], answer: 'Tak. Naprawiamy laptopy m.in. HP, Dell, Lenovo, ASUS, Acer, MSI, Toshiba, Fujitsu, Samsung i Huawei — również modele gamingowe i biznesowe.' },
  { id: 'faq-10', title: 'Czy moje dane są bezpieczne podczas naprawy?', items: [], answer: 'Przy większości napraw (np. wymiana ekranu, klawiatury czy wentylatora) nie ingerujemy w dane. Jeśli naprawa wiąże się z ryzykiem ich utraty — np. reinstalacja systemu, praca na dysku lub naprawa płyty głównej — informujemy o tym wcześniej i proponujemy kopię zapasową.' },
  { id: 'faq-11', title: 'Czy przed naprawą trzeba zrobić kopię zapasową danych?', items: [], answer: '**Warto, jeśli laptop działa.**\n\nJeśli nie możesz zrobić jej samodzielnie, wykonamy kopię zapasową danych za 120 zł.\n\nPrzy ryzykownych operacjach zawsze pytamy o to przed rozpoczęciem prac.' },
  { id: 'faq-12', title: 'Czy odzyskujecie dane z uszkodzonych dysków HDD i SSD?', items: [], answer: '**Tak. Najpierw oceniamy możliwość odzyskania danych (50 zł).**\n\nOdzyskanie danych z fizycznie lub elektronicznie uszkodzonego nośnika kosztuje od 500 zł i trwa zwykle 5–15 dni.\n\nNie zawsze da się odzyskać wszystkie dane — o szansach informujemy przed rozpoczęciem prac.' },
  { id: 'faq-13', title: 'Co zrobić natychmiast po zalaniu laptopa?', items: [], answer: '**Od razu wyłącz laptop, odłącz zasilacz i — jeśli to możliwe — wyjmij baterię.**\n\nNie włączaj go ponownie, żeby sprawdzić, czy działa.\n\nJak najszybciej dostarcz laptop do serwisu: im szybciej, tym większa szansa na naprawę.' },
  { id: 'faq-14', title: 'Laptop po zalaniu nadal działa — czy trzeba go oddać do serwisu?', items: [], answer: '**Tak. Pozostałości cieczy powodują korozję, która może uszkodzić elektronikę po kilku dniach lub tygodniach.**\n\nCzyszczenie po zalaniu (250 zł) pozwala usunąć ciecz i korozję, zanim pojawią się poważniejsze usterki.' },
  { id: 'faq-15', title: 'Laptop mocno się nagrzewa lub głośno pracuje — co może być przyczyną?', items: [], answer: 'Najczęściej zabrudzony układ chłodzenia, zaschnięta pasta termoprzewodząca lub zużyty wentylator. Pomaga pełna konserwacja (200 zł, laptop gamingowy — 250 zł), a przy uszkodzeniu — wymiana wentylatora (100 zł + części).' },
  { id: 'faq-16', title: 'Jak często warto czyścić układ chłodzenia laptopa?', items: [], answer: '**Zwykle co 1–2 lata.**\n\nLaptopy gamingowe, intensywnie używane lub pracujące w zakurzonym otoczeniu — częściej, np. raz w roku.\n\nSygnałem są wyższe temperatury, głośniejsza praca i spadek wydajności.' },
  { id: 'faq-17', title: 'Laptop nie ładuje baterii — czy zawsze trzeba wymienić baterię?', items: [], answer: 'Nie. Przyczyną może być bateria, ale też zasilacz, gniazdo DC lub USB-C albo układ ładowania na płycie głównej.\n\nNajpierw ustalamy, co jest uszkodzone, żeby nie wymieniać sprawnych części.' },
  { id: 'faq-18', title: 'Laptop się nie włącza — co może być uszkodzone?', items: [], answer: 'Najczęściej zasilacz, gniazdo zasilania, bateria, układ zasilania na płycie głównej lub BIOS — albo skutki zalania. Dokładną przyczynę ustalamy podczas diagnozy, a przed naprawą podajemy koszt.' },
  { id: 'faq-19', title: 'Pękła matryca albo pojawiły się pasy — czy ekran można wymienić?', items: [], answer: '**Tak. Wymiana matrycy kosztuje 180 zł + część.**\n\nPasy lub brak podświetlenia mogą też oznaczać uszkodzoną taśmę sygnałową (150 zł + część), dlatego przed wymianą sprawdzamy przyczynę.' },
  { id: 'faq-20', title: 'Czy warto wymienić HDD na SSD lub rozbudować RAM w starszym laptopie?', items: [], answer: '**Zwykle tak — to jeden z najtańszych sposobów na przyspieszenie starszego laptopa.**\n\nWymiana HDD na SSD z migracją danych kosztuje 150 zł + części, a rozbudowa RAM — 70 zł + części.\n\nWcześniej sprawdzamy, jakie podzespoły obsługuje dany model.' },
  { id: 'faq-21', title: 'Czy warto naprawiać starszy laptop, czy lepiej kupić nowy?', items: [], answer: 'To zależy od usterki, kosztu części i ogólnego stanu laptopa. Po diagnozie powiemy otwarcie, czy naprawa się opłaca — jeśli nie, nie będziemy jej proponować.' },
  { id: 'faq-22', title: 'Czy mogę dostarczyć laptop osobiście, zamówić odbiór albo wysłać go kurierem?', items: [], answer: 'Tak, każda z tych opcji jest możliwa.\n\nLaptop możesz przywieźć do naszego serwisu we Wrocławiu. Odbiór lub dostawa do 2,5 km od serwisu kosztuje **25 zł**, dalej — **25 zł + 2 zł/km**.\n\nMożesz też wysłać laptop kurierem — prześlemy instrukcję bezpiecznego pakowania, a po naprawie odeślemy sprzęt.' },
]
