import type { PricingSection, PricingSubcategory } from './services-data-types'
import { createPricingSections } from './services-data-shared'

const applyDesktopCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'CZYSZCZENIE I KONSERWACJA — KOMPUTER STANDARDOWY\u2028czyszczenie wnętrza i układu chłodzenia, wymiana materiałów termicznych\n• dokładne czyszczenie wnętrza obudowy, filtrów, wentylatorów i radiatorów,\n• czyszczenie układu chłodzenia procesora,\n• wymiana pasty termoprzewodzącej na CPU,\n• kontrola i w razie potrzeby wymiana / dopasowanie termopadów,\n• kontrola wentylatorów i przepływu powietrza,\n• montaż oraz test temperatur i stabilności pracy.',
    },
    {
      service:
        'CZYSZCZENIE I KONSERWACJA — KOMPUTER GAMINGOWY\u2028rozszerzone czyszczenie CPU/GPU i wymiana materiałów termicznych\n• dokładne czyszczenie wnętrza, filtrów, wentylatorów i radiatorów,\n• demontaż i konserwacja układu chłodzenia CPU,\n• demontaż i konserwacja układu chłodzenia karty graficznej,\n• wymiana pasty termoprzewodzącej na CPU i GPU,\n• kontrola i w razie potrzeby wymiana / dopasowanie termopadów VRAM i VRM,\n• kontrola wentylatorów i przepływu powietrza,\n• rozszerzony test obciążeniowy CPU/GPU oraz kontrola temperatur.',
    },
    {
      service:
        'CZYSZCZENIE PO ZALANIU\u2028demontaż, czyszczenie i diagnostyka urządzenia\n• demontaż komputera i odłączenie zasilania,\n• lokalizacja śladów zalania i korozji,\n• dokładne czyszczenie płyty głównej i zalanych podzespołów,\n• usuwanie pozostałości cieczy i korozji,\n• czyszczenie złączy, portów i pozostałych zalanych elementów,\n• zabezpieczenie oczyszczonych miejsc przed dalszą korozją, jeśli jest to technicznie uzasadnione,\n• diagnostyka elektroniki,\n• montaż i test podstawowych funkcji urządzenia.\n\nUwaga!!! Po zalaniu natychmiast odłącz komputer od zasilania i nie uruchamiaj go ponownie.',
    },
  ]
}

// Diagnoza — wspólny standard z serwis-laptopow (te same pozycje i ceny).
const applyDesktopDiagnosisSection = (sections: PricingSection[]) => {
  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  if (!diagnosisSection) return
  diagnosisSection.items = [
    { service: 'Wstępna konsultacja online do 15 min (opis problemu przez WhatsApp, formularz lub telefon)' },
    { service: 'Wstępne sprawdzenie przy przyjęciu sprzętu (krótkie sprawdzenie objawów i wstępna ocena; nie zastępuje pełnej diagnozy)' },
    { service: 'Pełna diagnoza i wycena naprawy\n(bezpłatna w przypadku realizacji naprawy)' },
    { service: 'Pełna diagnoza i wycena naprawy\n(tylko w przypadku rezygnacji po wykonaniu pełnej diagnozy)' },
    { service: 'Pisemna opinia techniczna\n(dodatkowo do pełnej diagnozy, z dokumentacją fotograficzną)' },
    { service: 'Pilna realizacja (jeśli to możliwe, przyspieszamy naprawę bez dodatkowej opłaty)' },
  ]
}

const applyDesktopRepairSubcategories = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  if (!serviceSection) return
  serviceSection.subcategories = [
    {
      id: 'naprawy-oprogramowanie',
      title: 'Oprogramowanie i system',
      items: [
        { service: 'Instalacja systemu Windows / Linux\n(czysta instalacja systemu, aktualizacje i sterowniki; bez zachowania danych)' },
        { service: 'Instalacja systemu z zachowaniem danych' },
        { service: 'Instalacja i konfiguracja oprogramowania / sterowników\n(brak dźwięku, niedziałająca drukarka lub inne urządzenie, „nieznane urządzenie” w systemie)' },
        { service: 'Naprawa i optymalizacja systemu Windows\n(problemy z uruchomieniem, zapętlanie startu, restarty, zawieszanie lub wolna praca)' },
        { service: 'Przywracanie systemu z partycji Recovery\n(poważne problemy z systemem lub złośliwe oprogramowanie — powrót do ustawień fabrycznych)' },
        { service: 'Naprawa problemów po aktualizacji Windows / BSOD\n(niebieski ekran, ciągłe restarty, „Automatyczna naprawa” lub czarny ekran po aktualizacji)' },
        { service: 'Usuwanie wirusów i złośliwego oprogramowania\n(wyskakujące reklamy, przekierowania na obce strony, zmieniona przeglądarka, spowolnienie)' },
        { service: 'Usunięcie / odzyskanie hasła użytkownika Windows\n(zapomniane hasło, brak możliwości zalogowania; tylko jeśli legalne i możliwe)' },
        { service: 'Indywidualna konfiguracja systemu Windows' },
        { service: 'Zdalna pomoc informatyka' },
      ],
    },
    {
      id: 'naprawy-bios',
      title: 'BIOS / UEFI i konfiguracja sprzętowa',
      items: [
        { service: 'Aktualizacja / konfiguracja BIOS / UEFI' },
        { service: 'Naprawa / odzyskanie BIOS po błędnej aktualizacji\n(czarny ekran, brak logo producenta, pętla restartów lub brak reakcji po aktualizacji)' },
        { service: 'Programowanie BIOS / UEFI\n(uszkodzony wsad BIOS — sprzęt nie startuje mimo sprawnych podzespołów)' },
        { service: 'Usunięcie hasła BIOS / UEFI\n(zapomniane hasło przy starcie lub do ustawień BIOS)' },
        { service: 'Odtworzenie BIOS z zachowaniem danych (numer seryjny, klucz Windows)' },
        { service: 'Konfiguracja RAID 0 / 1 / 5 / 10' },
      ],
    },
    {
      id: 'naprawy-plyta-glowna',
      title: 'Płyta główna i elektronika',
      items: [
        { service: 'Naprawa płyty głównej\n(przerwane ścieżki, zimne luty, mikrolutowanie, uszkodzenia elementów elektronicznych)' },
        { service: 'Wymiana / montaż płyty głównej\n(gdy naprawa płyty nie jest możliwa lub się nie opłaca)' },
        { service: 'Naprawa / wymiana portu USB / HDMI / Audio / LAN\n(luźne gniazdo, połączenie tylko pod kątem, system nie wykrywa urządzenia)' },
        { service: 'Wymiana baterii CMOS\n(reset daty i godziny, utrata ustawień BIOS, komunikat „CMOS Battery Failure”)' },
      ],
    },
    {
      id: 'naprawy-zasilanie',
      title: 'Zasilanie',
      items: [
        { service: 'Wymiana zasilacza\n(komputer nie włącza się, wyłącza się lub restartuje pod obciążeniem, piszczenie, zapach spalenizny)' },
        { service: 'Naprawa przycisku zasilania / panelu przedniego\n(brak reakcji na przycisk, zapadnięty przycisk lub komputer włącza się sam)' },
      ],
    },
    {
      id: 'naprawy-podzespoly',
      title: 'Podzespoły i modernizacja',
      items: [
        { service: 'Wymiana / montaż procesora\n(komputer nie startuje, zawieszanie, niebieskie ekrany, restarty pod obciążeniem)' },
        { service: 'Wymiana / montaż karty graficznej\n(artefakty, kolorowe paski, brak obrazu przy działającym komputerze, wyłączanie w grach)' },
        { service: 'Wymiana / rozbudowa pamięci RAM\n(zawieszanie, niebieskie ekrany, restarty lub wolna praca)' },
        { service: 'Wymiana / montaż karty rozszerzeń\n(np. Wi-Fi, LAN, karta dźwiękowa, kontroler)' },
        { service: 'Naprawa / konfiguracja Wi-Fi i Bluetooth\n(brak połączenia, wolny internet mimo dobrej sieci, nie da się sparować urządzeń Bluetooth)' },
        { service: 'Wymiana napędu / nagrywarki\n(nie czyta lub nie nagrywa płyt, wyrzuca płyty, nietypowe odgłosy)' },
        { service: 'Wymiana obudowy / pełne przełożenie podzespołów' },
        { service: 'Składanie komputera z części Klienta' },
        { service: 'Modernizacja komputera\n(dobór i montaż kilku podzespołów, np. RAM, SSD, karta graficzna lub zasilacz, wraz z podstawową konfiguracją i testem)' },
      ],
    },
    {
      id: 'naprawy-chlodzenie',
      title: 'Układ chłodzenia',
      items: [
        { service: 'Wymiana wentylatora chłodzenia\n(głośne terkotanie lub pisk, przegrzewanie, samoczynne wyłączanie)' },
        { service: 'Wymiana / montaż radiatora lub chłodzenia CPU\n(wysokie temperatury procesora, wyłączanie lub spowolnienie pod obciążeniem, głośna praca)' },
      ],
    },
    {
      id: 'naprawy-dyski-dane',
      title: 'Dyski i dane',
      items: [
        { service: 'Diagnoza dysku + SMART / test powierzchni\n(klikanie lub stukanie dysku, zawieszanie przy otwieraniu plików, długie ładowanie systemu)' },
        { service: 'Kopia zapasowa danych' },
        { service: 'Klonowanie dysku (przeniesienie danych na nowy dysk)' },
        { service: 'Wymiana HDD na SSD + migracja danych\n(system długo się uruchamia, programy otwierają się wolno)' },
        { service: 'Wymiana / montaż dysku SSD (M.2 NVMe / SATA)' },
        { service: 'Kopia danych z uszkodzonego systemu\n(w przypadku awarii systemu Windows — dokumenty, zdjęcia, filmy i inne pliki)' },
      ],
    },
    {
      id: 'naprawy-odzyskiwanie-danych',
      title: 'Odzyskiwanie i bezpieczne usuwanie danych',
      items: [
        { service: 'Ocena możliwości odzyskania danych z uszkodzonego nośnika' },
        { service: 'Odzyskanie przypadkowo usuniętych danych / po formatowaniu\n(skasowane pliki, sformatowany dysk, przeinstalowany system)' },
        { service: 'Odzyskiwanie danych — uszkodzenia logiczne\n(niewidoczna partycja, znikające foldery, komunikat „dysk wymaga formatowania”)' },
        { service: 'Odzyskanie danych z fizycznie / elektronicznie uszkodzonego HDD / SSD\n(dysk klika, nie jest wykrywany lub nie da się go odczytać)' },
        { service: 'Trwałe usuwanie danych\n(przed sprzedażą, przekazaniem lub utylizacją sprzętu)' },
      ],
    },
  ]
}

export const createDesktopPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applyDesktopDiagnosisSection(sections)
  applyDesktopCleaningSection(sections)
  applyDesktopRepairSubcategories(sections)
  const faqSection = sections.find(section => section.id === 'faq')
  if (faqSection) faqSection.subcategories = desktopFaqItems()
  return sections
}

// FAQ tylko dla serwis-komputerow-stacjonarnych (zastępuje wspólne FAQ napraw).
const desktopFaqItems = (): PricingSubcategory[] => [
  { id: 'faq-1', title: 'Jak wygląda proces naprawy komputera stacjonarnego?', items: [], answer: 'Najpierw wykonujemy diagnozę i przedstawiamy wycenę. Naprawę rozpoczynamy dopiero po akceptacji kosztu.' },
  { id: 'faq-2', title: 'Ile trwa diagnoza komputera?', items: [], answer: 'Pełna diagnoza zajmuje zwykle **1–2 dni**.' },
  { id: 'faq-3', title: 'Czy diagnoza jest bezpłatna?', items: [], answer: 'Tak, jeśli zlecasz naprawę. W przypadku rezygnacji po pełnej diagnozie jej koszt wynosi **80 zł**.' },
  { id: 'faq-4', title: 'Czy przed naprawą poznam dokładny koszt?', items: [], answer: 'Tak. Koszt potwierdzamy przed rozpoczęciem płatnych prac — bez Twojej akceptacji nie zaczynamy naprawy.' },
  { id: 'faq-5', title: 'Ile trwa naprawa komputera?', items: [], answer: 'Standardowe naprawy trwają zwykle **1–3 dni**. Naprawa elektroniki, odzyskiwanie danych lub oczekiwanie na części mogą potrwać dłużej.' },
  { id: 'faq-6', title: 'Czy ceny w cenniku obejmują części zamienne?', items: [], answer: 'Jeśli przy cenie widnieje „+ części”, cena dotyczy samej robocizny, a koszt części uzgadniamy osobno.' },
  { id: 'faq-7', title: 'Czy udzielacie gwarancji na naprawę?', items: [], answer: 'Tak. Okres gwarancji zależy od rodzaju naprawy i zastosowanych części.' },
  { id: 'faq-8', title: 'Czy naprawiacie komputery składane z różnych podzespołów?', items: [], answer: 'Tak — również komputery składane samodzielnie i zestawy gamingowe.' },
  { id: 'faq-9', title: 'Komputer w ogóle się nie włącza — co może być przyczyną?', items: [], answer: 'Przyczyną może być m.in. zasilacz, przycisk POWER, płyta główna, zwarcie lub inny uszkodzony podzespół. Dokładną przyczynę ustalamy podczas diagnozy.' },
  { id: 'faq-10', title: 'Komputer się uruchamia, ale nie ma obrazu — co może być uszkodzone?', items: [], answer: 'Może to być m.in. karta graficzna, pamięć RAM, płyta główna, przewód lub monitor. Sam brak obrazu nie wskazuje jednoznacznie, który podzespół jest uszkodzony.' },
  { id: 'faq-11', title: 'Komputer sam się restartuje albo wyłącza — co może być przyczyną?', items: [], answer: 'Możliwe przyczyny to m.in. przegrzewanie, zasilacz, pamięć RAM, płyta główna, sterowniki lub system.' },
  { id: 'faq-12', title: 'Komputer mocno się nagrzewa lub głośno pracuje — co zrobić?', items: [], answer: 'Warto sprawdzić wentylatory, radiatory, pastę termoprzewodzącą i przepływ powietrza w obudowie.' },
  { id: 'faq-13', title: 'Jak często warto czyścić komputer stacjonarny?', items: [], answer: 'To zależy od warunków pracy. Jeśli rosną temperatury, komputer pracuje głośniej lub w środku zbiera się dużo kurzu — warto wykonać konserwację.' },
  { id: 'faq-14', title: 'Czy warto wymienić HDD na SSD?', items: [], answer: 'W wielu starszych komputerach tak — SSD wyraźnie przyspiesza uruchamianie systemu i programów.' },
  { id: 'faq-15', title: 'Czy można rozbudować pamięć RAM lub wymienić kartę graficzną?', items: [], answer: 'Tak, jeśli nowe podzespoły są zgodne z płytą główną, zasilaczem i obudową. Przed modernizacją możemy sprawdzić kompatybilność.' },
  { id: 'faq-16', title: 'Czy możecie zmodernizować starszy komputer?', items: [], answer: 'Tak. Możemy dobrać i zamontować m.in. RAM, SSD, kartę graficzną, procesor lub zasilacz, a potem sprawdzić stabilność zestawu.' },
  { id: 'faq-17', title: 'Czy składacie komputery z części dostarczonych przez Klienta?', items: [], answer: 'Tak. Składamy zestaw, podłączamy podzespoły, wykonujemy podstawową konfigurację i test działania.' },
  { id: 'faq-18', title: 'Czy moje dane są bezpieczne podczas naprawy?', items: [], answer: 'Przy naprawach sprzętowych nie ingerujemy w dane bez potrzeby. Jeśli planowana czynność niesie ryzyko ich utraty, informujemy o tym wcześniej.' },
  { id: 'faq-19', title: 'Czy przed oddaniem komputera warto zrobić kopię zapasową?', items: [], answer: 'Jeśli komputer działa i masz taką możliwość — tak. W razie potrzeby możemy też wykonać kopię danych.' },
  { id: 'faq-20', title: 'Czy odzyskujecie dane z uszkodzonych dysków HDD i SSD?', items: [], answer: 'Tak — od przypadkowego usunięcia i uszkodzeń logicznych po bardziej złożone przypadki uszkodzonych nośników.' },
  { id: 'faq-21', title: 'Czy warto naprawiać stary komputer, czy lepiej kupić nowy?', items: [], answer: 'To zależy od usterki, parametrów sprzętu i kosztu naprawy lub modernizacji. Po diagnozie podajemy koszt, dzięki czemu możesz podjąć decyzję.' },
  { id: 'faq-22', title: 'Czy mogę dostarczyć komputer osobiście, zamówić odbiór albo wysłać go kurierem?', items: [], answer: 'Tak. Komputer możesz przywieźć osobiście lub wysłać kurierem. Odbiór lub dostawa do 2,5 km od serwisu kosztuje **20 zł**, dalej — **20 zł + 1,5 zł/km**.' },
]
