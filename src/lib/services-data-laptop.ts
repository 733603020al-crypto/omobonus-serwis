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
        service: 'Pełna diagnoza i wycena naprawy\n(bezpłatna w przypadku realizacji naprawy)',
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
          'PEŁNA KONSERWACJA — LAPTOP STANDARDOWY\u2028czyszczenie wnętrza i układu chłodzenia, wymiana materiałów termicznych\n• demontaż i dokładne czyszczenie układu chłodzenia,\n• czyszczenie wentylatorów, radiatorów i kanałów wentylacyjnych,\n• wymiana pasty termoprzewodzącej na CPU/GPU,\n• kontrola i w razie potrzeby wymiana/dopasowanie termopadów,\n• kontrola działania wentylatorów,\n• czyszczenie obudowy i klawiatury,\n• montaż oraz test temperatur i stabilności pracy.',
      },
      {
        service:
          'PEŁNA KONSERWACJA — LAPTOP GAMINGOWY\u2028rozszerzone czyszczenie CPU/GPU i wymiana materiałów termicznych\n• dokładne czyszczenie rozbudowanego układu chłodzenia CPU/GPU,\n• czyszczenie wentylatorów, radiatorów i kanałów wentylacyjnych,\n• wymiana pasty termoprzewodzącej na CPU/GPU,\n• kontrola i wymiana/dopasowanie termopadów VRAM, VRM i pozostałych chłodzonych elementów,\n• montaż oraz rozszerzony test obciążeniowy CPU/GPU i kontrola temperatur.',
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
          { service: 'Instalacja systemu z zachowaniem danych' },
          { service: 'Instalacja systemu macOS' },
          { service: 'Instalacja i konfiguracja oprogramowania / sterowników' },
          { service: 'Naprawa i optymalizacja systemu Windows\n(problemy z uruchomieniem, zapętlanie startu, restarty, zawieszanie lub wolna praca)' },
          { service: 'Przywracanie systemu z partycji Recovery' },
          { service: 'Naprawa problemów po aktualizacji Windows / BSOD' },
          { service: 'Usuwanie wirusów i złośliwego oprogramowania' },
          { service: 'Indywidualna konfiguracja systemu Windows' },
          { service: 'Zdalna pomoc informatyka' },
        ],
      },
      {
        id: 'naprawy-plyta-glowna',
        title: 'BIOS / UEFI i elektronika płyty głównej',
        items: [
          { service: 'Aktualizacja / konfiguracja BIOS / UEFI' },
          { service: 'Naprawa / odzyskanie BIOS po błędnej aktualizacji' },
          { service: 'Programowanie kości BIOS / UEFI' },
          { service: 'Wymiana płyty głównej' },
          { service: 'Naprawa płyty głównej\n(przerwane ścieżki, zimne luty, mikrolutowanie, uszkodzenia elementów elektronicznych)' },
          { service: 'Wymiana układów zasilania / KBC / EC' },
          { service: 'Wymiana baterii CMOS' },
        ],
      },
      {
        id: 'naprawy-bateria',
        title: 'Bateria',
        items: [
          { service: 'Diagnostyka / wymiana baterii laptopa\n(krótki czas pracy, wyłączanie bez zasilacza, brak ładowania lub błędny poziom baterii)' },
          { service: 'Wymiana baterii wewnętrznej' },
        ],
      },
      {
        id: 'naprawy-zasilanie-ladowanie',
        title: 'Zasilanie i ładowanie',
        items: [
          { service: 'Naprawa / wymiana gniazda zasilania DC' },
          { service: 'Naprawa / wymiana gniazda USB-C / układu ładowania USB-C\n(brak ładowania przez USB-C, luźne lub uszkodzone gniazdo, problemy z Power Delivery)' },
          { service: 'Naprawa układu ładowania\n(charge controller / MOSFET / BQ / ISL)' },
        ],
      },
      {
        id: 'naprawy-zlacza-podzespoly',
        title: 'Złącza i podzespoły',
        items: [
          { service: 'Naprawa / wymiana portu USB / HDMI / Audio' },
          { service: 'Wymiana kamery / mikrofonu / głośników' },
          { service: 'Naprawa / konfiguracja Wi-Fi i Bluetooth' },
          { service: 'Wymiana modułu Wi-Fi / Bluetooth' },
          { service: 'Wymiana napędu / nagrywarki' },
        ],
      },
      {
        id: 'naprawy-chlodzenie',
        title: 'Układ chłodzenia',
        items: [
          { service: 'Wymiana wentylatora chłodzenia' },
          { service: 'Wymiana radiatora / układu chłodzenia' },
        ],
      },
      {
        id: 'naprawy-dyski-dane',
        title: 'Dyski, pamięć i migracja danych',
        items: [
          { service: 'Diagnostyka dysku + SMART / test powierzchni' },
          { service: 'Kopia zapasowa danych' },
          { service: 'Migracja / klonowanie danych' },
          { service: 'Wymiana HDD na SSD + migracja danych' },
          { service: 'Montaż dysku M.2 NVMe / SATA' },
          { service: 'Wymiana / rozbudowa pamięci RAM + test stabilności' },
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
          { service: 'Wymiana uszkodzonej matrycy LCD/LED (standard, bez klejenia)' },
          { service: 'Wymiana taśmy sygnałowej matrycy (brak podświetlenia matrycy)' },
          { service: 'Wymiana ramki ekranu (front bezel)' },
          { service: 'Wymiana zawiasów' },
          { service: 'Naprawa pękniętych mocowań zawiasów, obudowy (wzmocnienie / klejenie)' },
          { service: 'Wymiana obudowy – klapy ekranu (pokrywa matrycy) lub obudowy dolnej' },
          { service: 'Wymiana lub uzupełnienie pojedynczych elementów obudowy (śruby, mocowania, klipsy)' },
          { service: 'Przełożenie podzespołów do nowej obudowy' },
        ],
      },
      {
        id: 'naprawy-klawiatura-touchpad',
        title: 'Klawiatura, touchpad i elementy sterujące',
        items: [
          { service: 'Czyszczenie klawiatury + dezynfekcja (bez rozkręcania / rozbierania)' },
          { service: 'Czyszczenie klawiatury przykręcanej po zalaniu' },
          { service: 'Czyszczenie klawiatury zintegrowanej z obudową po zalaniu' },
          { service: 'Czyszczenie lub wymiana pojedynczego klawisza (keycap / stabilizator, jeśli możliwe)' },
          { service: 'Naprawa lub wymiana klawiatury przykręcanej' },
          { service: 'Naprawa lub wymiana klawiatury zintegrowanej z obudową (lutowanej lub klejonej)' },
          { service: 'Wymiana klawiatury podświetlanej (RGB / LED)' },
          { service: 'Naprawa lub wymiana touchpada (trackpad)' },
          { service: 'Naprawa / wymiana przycisku zasilania' },
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
  { id: 'faq-1', title: 'Jak wygląda proces naprawy laptopa?', items: [], answer: 'Przyjmujemy laptop, wykonujemy diagnozę i przedstawiamy wycenę. Naprawę rozpoczynamy dopiero po jej akceptacji. W razie potrzeby zamawiamy części i informujemy o terminie, a po naprawie testujemy laptop przed wydaniem.' },
  { id: 'faq-2', title: 'Ile trwa diagnoza laptopa?', items: [], answer: 'Wstępne sprawdzenie przy przyjęciu trwa do 15 minut. Pełna diagnoza zajmuje zwykle 1–2 dni.' },
  { id: 'faq-3', title: 'Czy diagnoza jest bezpłatna?', items: [], answer: 'Tak — pełna diagnoza jest **GRATIS**, jeśli zlecasz naprawę. W przypadku rezygnacji po pełnej diagnozie jej koszt wynosi **100 zł**. Konsultacja online i wstępne sprawdzenie przy przyjęciu są zawsze bezpłatne.' },
  { id: 'faq-4', title: 'Czy przed naprawą poznam dokładny koszt?', items: [], answer: 'Tak. Po diagnozie podajemy koszt usługi i ewentualnych części. Nie rozpoczynamy naprawy bez Twojej akceptacji, a jeśli w trakcie okaże się, że potrzebne są dodatkowe prace — najpierw je uzgadniamy.' },
  { id: 'faq-5', title: 'Ile trwa naprawa laptopa?', items: [], answer: 'Standardowa naprawa trwa zwykle **1–3 dni**. Naprawa płyty głównej, układu ładowania lub oczekiwanie na części mogą wydłużyć ten czas. Termin dla każdej usługi podajemy w cenniku.' },
  { id: 'faq-6', title: 'Czy ceny w cenniku obejmują części zamienne?', items: [], answer: 'Ceny bez dopisku obejmują samą usługę. Jeśli przy cenie jest „+ części” lub „+ część”, część zamienna jest płatna osobno — jej koszt podajemy przed naprawą.' },
  { id: 'faq-7', title: 'Czy udzielacie gwarancji na naprawę?', items: [], answer: 'Tak. **3–12 miesięcy**, w zależności od rodzaju naprawy i wymienionych części.' },
  { id: 'faq-8', title: 'Czy naprawa może wpłynąć na gwarancję producenta?', items: [], answer: 'Jeśli naprawa mogłaby naruszyć warunki gwarancji producenta, informujemy o tym przed rozpoczęciem prac. Decyzja zawsze należy do Ciebie.' },
  { id: 'faq-9', title: 'Czy naprawiacie laptopy wszystkich marek?', items: [], answer: 'Tak. Naprawiamy laptopy m.in. HP, Dell, Lenovo, ASUS, Acer, MSI, Toshiba, Fujitsu, Samsung i Huawei — również modele gamingowe i biznesowe.' },
  { id: 'faq-10', title: 'Czy moje dane są bezpieczne podczas naprawy?', items: [], answer: 'Przy większości napraw (np. wymiana ekranu, klawiatury czy wentylatora) nie ingerujemy w dane. Jeśli naprawa wiąże się z ryzykiem ich utraty — np. reinstalacja systemu, praca na dysku lub naprawa płyty głównej — informujemy o tym wcześniej i proponujemy kopię zapasową.' },
  { id: 'faq-11', title: 'Czy przed naprawą trzeba zrobić kopię zapasową danych?', items: [], answer: 'Warto, jeśli laptop działa. Jeśli nie możesz zrobić jej samodzielnie, wykonamy kopię zapasową danych za 120 zł. Przy ryzykownych operacjach zawsze pytamy o to przed rozpoczęciem prac.' },
  { id: 'faq-12', title: 'Czy odzyskujecie dane z uszkodzonych dysków HDD i SSD?', items: [], answer: 'Tak. Najpierw oceniamy możliwość odzyskania danych (50 zł). Odzyskanie danych z fizycznie lub elektronicznie uszkodzonego nośnika kosztuje od 500 zł i trwa zwykle 5–15 dni. Nie zawsze da się odzyskać wszystkie dane — o szansach informujemy przed rozpoczęciem prac.' },
  { id: 'faq-13', title: 'Co zrobić natychmiast po zalaniu laptopa?', items: [], answer: 'Od razu wyłącz laptop, odłącz zasilacz i — jeśli to możliwe — wyjmij baterię. Nie włączaj go ponownie, żeby sprawdzić, czy działa. Jak najszybciej dostarcz laptop do serwisu: im szybciej, tym większa szansa na naprawę.' },
  { id: 'faq-14', title: 'Laptop po zalaniu nadal działa — czy trzeba go oddać do serwisu?', items: [], answer: 'Tak. Pozostałości cieczy powodują korozję, która może uszkodzić elektronikę po kilku dniach lub tygodniach. Czyszczenie po zalaniu (250 zł) pozwala usunąć ciecz i korozję, zanim pojawią się poważniejsze usterki.' },
  { id: 'faq-15', title: 'Laptop mocno się nagrzewa lub głośno pracuje — co może być przyczyną?', items: [], answer: 'Najczęściej zabrudzony układ chłodzenia, zaschnięta pasta termoprzewodząca lub zużyty wentylator. Pomaga pełna konserwacja (180 zł, laptop gamingowy — 250 zł), a przy uszkodzeniu — wymiana wentylatora (100 zł + części).' },
  { id: 'faq-16', title: 'Jak często warto czyścić układ chłodzenia laptopa?', items: [], answer: 'Zwykle co 1–2 lata. Laptopy gamingowe, intensywnie używane lub pracujące w zakurzonym otoczeniu — częściej, np. raz w roku. Sygnałem są wyższe temperatury, głośniejsza praca i spadek wydajności.' },
  { id: 'faq-17', title: 'Laptop nie ładuje baterii — czy zawsze trzeba wymienić baterię?', items: [], answer: 'Nie. Przyczyną może być bateria, ale też zasilacz, gniazdo DC lub USB-C albo układ ładowania na płycie głównej. Najpierw ustalamy, co jest uszkodzone, żeby nie wymieniać sprawnych części.' },
  { id: 'faq-18', title: 'Laptop się nie włącza — co może być uszkodzone?', items: [], answer: 'Najczęściej zasilacz, gniazdo zasilania, bateria, układ zasilania na płycie głównej lub BIOS — albo skutki zalania. Dokładną przyczynę ustalamy podczas diagnozy, a przed naprawą podajemy koszt.' },
  { id: 'faq-19', title: 'Pękła matryca albo pojawiły się pasy — czy ekran można wymienić?', items: [], answer: 'Tak. Wymiana matrycy kosztuje 180 zł + część. Pasy lub brak podświetlenia mogą też oznaczać uszkodzoną taśmę sygnałową (120 zł + część), dlatego przed wymianą sprawdzamy przyczynę.' },
  { id: 'faq-20', title: 'Czy warto wymienić HDD na SSD lub rozbudować RAM w starszym laptopie?', items: [], answer: 'Zwykle tak — to jeden z najtańszych sposobów na przyspieszenie starszego laptopa. Wymiana HDD na SSD z migracją danych kosztuje 150 zł + części, a rozbudowa RAM — 70 zł + części. Wcześniej sprawdzamy, jakie podzespoły obsługuje dany model.' },
  { id: 'faq-21', title: 'Czy warto naprawiać starszy laptop, czy lepiej kupić nowy?', items: [], answer: 'To zależy od usterki, kosztu części i ogólnego stanu laptopa. Po diagnozie powiemy otwarcie, czy naprawa się opłaca — jeśli nie, nie będziemy jej proponować.' },
  { id: 'faq-22', title: 'Czy mogę dostarczyć laptop osobiście, zamówić odbiór albo wysłać go kurierem?', items: [], answer: 'Tak, każda z tych opcji jest możliwa. Laptop możesz przywieźć do naszego serwisu we Wrocławiu. Odbiór lub dostawa do 2,5 km od serwisu kosztuje **20 zł**, dalej — **20 zł + 1,5 zł/km**. Możesz też wysłać laptop kurierem — prześlemy instrukcję bezpiecznego pakowania, a po naprawie odeślemy sprzęt.' },
]
