import type { PricingSection, PricingSubcategory } from './services-data-types'
import { createPricingSections } from './services-data-shared'

// Sekcja 'diagnoza' (id zachowane dla ikony/układu) -> konsultacja i wycena obsługi IT
const updateKonsultacjaForOutsourcing = (sections: PricingSection[]) => {
  const diagnozaSection = sections.find(section => section.id === 'diagnoza')
  if (!diagnozaSection) return

  diagnozaSection.title = 'Konsultacja i wycena obsługi IT'
  diagnozaSection.status = 'GRATIS'
  diagnozaSection.items = [
    {
      service: 'Konsultacja i analiza potrzeb firmy\n(krótka analiza liczby stanowisk, infrastruktury, zakresu wsparcia i potrzeb firmy)',
    },
    {
      service: 'Wstępna wycena abonamentu IT',
    },
    {
      service: 'Audyt infrastruktury przed wdrożeniem obsługi\n(inwentaryzacja stacji roboczych, sieci, serwerów / NAS, backupu i podstawowych zabezpieczeń)',
    },
  ]
  diagnozaSection.notes = [
    'Koszt audytu odliczamy od pierwszego abonamentu po rozpoczęciu stałej współpracy.',
  ]
}

const removeDojazdForOutsourcing = (sections: PricingSection[]) => {
  const dojazdIndex = sections.findIndex(section => section.id === 'dojazd')
  if (dojazdIndex !== -1) sections.splice(dojazdIndex, 1)
}

const updateKonserwacjaForOutsourcing = (sections: PricingSection[]) => {
  const konserwacjaSection = sections.find(section => section.id === 'konserwacja')
  if (!konserwacjaSection) return

  konserwacjaSection.title = 'Obsługa firm (abonament miesięczny)'
  konserwacjaSection.items = [
    {
      service: 'Pakiet START — dla małych firm\n• 1–5 stanowisk\n• zdalny helpdesk dla użytkowników\n• aktualizacje systemów Windows / macOS\n• podstawowa administracja stacjami roboczymi\n• kontrola aktualności ochrony antywirusowej i zapory\n• kontrola działania kopii zapasowych\n• podstawowa pomoc z drukarkami i urządzeniami biurowymi\n• do **3 h** pracy miesięcznie\n• wizyty na miejscu: brak w cenie\n• minimalny abonament: **500 zł/mies.**',
    },
    {
      service: 'Pakiet BIZNES — dla rozwijających się firm\n• 6–15 stanowisk\n• cały zakres START\n• administracja LAN / Wi-Fi\n• konfiguracja drukarek i skanerów sieciowych\n• zarządzanie użytkownikami i uprawnieniami\n• wsparcie przy nowych stanowiskach\n• do **8 h** pracy miesięcznie\n• **1 wizyta** na miejscu/mies. do 2 h\n• minimalny abonament: **900 zł/mies.**',
    },
    {
      service: 'Pakiet PRO — dla firm z rozbudowaną infrastrukturą\n• 16+ stanowisk\n• cały zakres BIZNES\n• administracja serwerami i NAS\n• monitoring infrastruktury\n• zarządzanie użytkownikami i uprawnieniami\n• miesięczny raport stanu IT\n• priorytetowa obsługa\n• do **15 h** pracy miesięcznie\n• **2 wizyty** na miejscu/mies. do 2 h każda\n• minimalny abonament: **1600 zł/mies.**',
    },
  ]
  konserwacjaSection.notes = [
    'Po przekroczeniu limitu godzin: **180 zł/h**',
    'Wizyty ponad limit pakietu: **180 zł/h**',
    'Pilna interwencja poza standardowym SLA: **+50%**',
    'Praca poza godzinami serwisu / weekendy / święta: **+100%**',
    'Dodatkowo płatne: części zamienne, sprzęt, licencje, materiały, usługi firm trzecich.',
    'Podstawowy miesięczny raport stanu IT jest wliczony w pakiet PRO. Grupa „Audyt i optymalizacja IT” — dla osobnych zleceń, rozszerzonych audytów i firm bez abonamentu.',
  ]
}

const outsourcingNaprawySubcategories: PricingSubcategory[] = [
  {
    id: 'naprawy-serwis-ogolny',
    title: 'Serwis ogólny (praca serwisanta u Klienta)',
    items: [
      { service: 'Wizyta serwisanta u Klienta\n(diagnostyka, konfiguracja i usuwanie usterek w siedzibie firmy)' },
      { service: 'Każda kolejna rozpoczęta godzina pracy\n(kontynuacja naprawy, konfiguracji lub wdrożenia)' },
      { service: 'Pomoc zdalna\n(diagnostyka i konfiguracja systemu, urządzeń biurowych i oprogramowania online)' },
      { service: 'Pilna interwencja\n(szybkie wsparcie w nagłych awariach – dopłata do stawki podstawowej)' },
      { service: 'Praca poza godzinami / weekendy / święta\n(realizacja zleceń poza godzinami pracy serwisu – dopłata do stawki podstawowej)' },
    ],
  },
  {
    id: 'naprawy-sprzet-na-miejscu',
    title: 'Naprawy sprzętu komputerowego (na miejscu u Klienta)',
    items: [
      { service: 'Wymiana zasilacza / dysku / RAM u Klienta\n(wymiana uszkodzonych lub rozbudowa podzespołów bezpośrednio w siedzibie firmy)' },
      { service: 'Czyszczenie wnętrza komputera i chłodzenia\n(usunięcie kurzu i zabrudzeń – poprawa wydajności i chłodzenia podzespołów)' },
      { service: 'Wymiana wentylatora / chłodzenia CPU\n(montaż nowego układu chłodzenia lub wymiana niesprawnego wentylatora)' },
      { service: 'Wymiana pasty termoprzewodzącej CPU\n(odświeżenie połączenia termicznego dla lepszego odprowadzania ciepła)' },
      { service: 'Konserwacja stacji roboczej / terminala\n(czyszczenie, kontrola połączeń, test stabilności – utrzymanie sprawności sprzętu)' },
      { service: 'Montaż nowego stanowiska\n(podłączenie komputera, monitora, urządzeń peryferyjnych i podstawowa konfiguracja)' },
    ],
  },
  {
    id: 'naprawy-siec-konfiguracja',
    title: 'Konfiguracja i sieć biurowa',
    items: [
      { service: 'Diagnostyka i konfiguracja sieci LAN / Wi-Fi\n(analiza połączeń, usuwanie błędów komunikacji, optymalizacja ustawień sieci firmowej)' },
      { service: 'Konfiguracja routera / punktu dostępowego\n(ustawienie parametrów dostępu do Internetu, zabezpieczeń i sieci bezprzewodowej)' },
      { service: 'Konfiguracja urządzenia sieciowego — drukarka / skaner / router\n(przywrócenie komunikacji w sieci lokalnej, instalacja i test urządzenia)' },
      { service: 'Udostępnianie plików i drukarek w sieci\n(tworzenie wspólnych zasobów w sieci lokalnej, konfiguracja uprawnień użytkowników)' },
      { service: 'Test prędkości i stabilności połączenia\n(pomiar wydajności i jakości łącza internetowego lub sieci wewnętrznej)' },
      { service: 'Podłączenie nowego stanowiska do sieci\n(konfiguracja adresu IP i włączenie komputera do sieci biurowej)' },
    ],
  },
  {
    id: 'naprawy-bezpieczenstwo-backup',
    title: 'Bezpieczeństwo i kopie zapasowe',
    items: [
      { service: 'Usuwanie wirusów i złośliwego oprogramowania\n(czyszczenie systemu, przywrócenie stabilności i wydajności)' },
      { service: 'Konfiguracja ochrony antywirusowej\n(instalacja i konfiguracja ochrony w czasie rzeczywistym – licencja nie jest wliczona w cenę)' },
      { service: 'Konfiguracja zapory sieciowej / firewall\n(ustawienie reguł dostępu, blokowanie nieautoryzowanych połączeń i zagrożeń sieciowych)' },
      { service: 'Konfiguracja backupu + test odtwarzania\n(ustawienie automatycznych kopii danych oraz kontrola poprawności odtwarzania)' },
      { service: 'Odzyskiwanie danych — prosty przypadek\n(odzyskanie skasowanych lub utraconych plików po awarii lub formatowaniu)' },
      { service: 'Przywrócenie dostępu do systemu / konta użytkownika\n(naprawa uszkodzonych profili, reset uprawnień, przywrócenie logowania)' },
    ],
  },
  {
    id: 'naprawy-audyt',
    title: 'Audyt i optymalizacja IT',
    items: [
      { service: 'Audyt infrastruktury IT\n(kompleksowa kontrola stacji roboczych, serwerów i urządzeń sieciowych)' },
      { service: 'Analiza konfiguracji systemów i oprogramowania\n(ocena poprawności ustawień, licencji i wydajności systemów oraz aplikacji)' },
      { service: 'Optymalizacja środowiska pracy\n(usprawnienie działania komputerów biurowych, poprawa szybkości i stabilności)' },
      { service: 'Raport z audytu i rekomendacje\n(szczegółowy raport z wynikami kontroli i sugestiami modernizacji sprzętu, sieci i zabezpieczeń)' },
      { service: 'Weryfikacja backupu i bezpieczeństwa danych\n(sprawdzenie procedur kopii zapasowych, test odtwarzania, ocena zabezpieczeń)' },
    ],
  },
]

const updateNaprawyForOutsourcing = (sections: PricingSection[]) => {
  const naprawySection = sections.find(section => section.id === 'naprawy')
  if (!naprawySection) return

  naprawySection.subcategories = outsourcingNaprawySubcategories.map(sub => ({
    ...sub,
    items: sub.items.map(item => ({ ...item })),
  }))
  naprawySection.footer = 'Interwencje i usługi IT poza abonamentem'
}

const outsourcingFaqSubcategories: PricingSubcategory[] = [
  { id: 'faq-1', title: 'Na czym polega outsourcing IT dla firmy?', items: [], answer: 'To stała, zewnętrzna opieka nad IT firmy: użytkownikami, komputerami, siecią, kopiami zapasowymi i bezpieczeństwem, a w zależności od pakietu także nad serwerami / NAS.' },
  { id: 'faq-2', title: 'Dla jakich firm przeznaczona jest obsługa IT w abonamencie?', items: [], answer: 'Dla małych i średnich firm, które potrzebują stałego wsparcia IT, ale nie chcą utrzymywać własnego, pełnego działu IT.' },
  { id: 'faq-3', title: 'Jak wygląda rozpoczęcie współpracy?', items: [], answer: 'Zaczynamy od konsultacji i analizy potrzeb firmy, a następnie przygotowujemy wycenę zakresu obsługi. W razie potrzeby przed wdrożeniem obsługi wykonujemy audyt infrastruktury.' },
  { id: 'faq-4', title: 'Czy konsultacja i wycena są bezpłatne?', items: [], answer: 'Tak. Konsultacja oraz wstępna wycena abonamentu są bezpłatne.' },
  { id: 'faq-5', title: 'Ile kosztuje audyt infrastruktury przed rozpoczęciem współpracy?', items: [], answer: 'Audyt kosztuje **200 zł**. Koszt audytu odliczamy od pierwszego abonamentu po rozpoczęciu stałej współpracy.' },
  { id: 'faq-6', title: 'Jakie pakiety outsourcingu IT oferujecie?', items: [], answer: 'Oferujemy trzy pakiety:\n• START — **1–5 stanowisk**\n• BIZNES — **6–15 stanowisk**\n• PRO — **16+ stanowisk**' },
  { id: 'faq-7', title: 'Czy cena abonamentu zależy od liczby stanowisk?', items: [], answer: 'Tak. Cenę naliczamy za stanowisko miesięcznie, przy czym każdy pakiet ma minimalną wartość abonamentu.' },
  { id: 'faq-8', title: 'Jakie są minimalne abonamenty?', items: [], answer: '• START — **500 zł/mies.**\n• BIZNES — **900 zł/mies.**\n• PRO — **1600 zł/mies.**' },
  { id: 'faq-9', title: 'Ile godzin pracy obejmuje abonament?', items: [], answer: '• START — do **3 h/mies.**\n• BIZNES — do **8 h/mies.**\n• PRO — do **15 h/mies.**' },
  { id: 'faq-10', title: 'Co się dzieje po przekroczeniu limitu godzin?', items: [], answer: 'Dodatkowa praca ponad limit pakietu kosztuje **180 zł/h**.' },
  { id: 'faq-11', title: 'Co oznacza „czas reakcji”?', items: [], answer: 'To czas do podjęcia zgłoszenia, a nie gwarantowany czas całkowitego rozwiązania problemu.\n• START — do **4 h roboczych**\n• BIZNES — do **2 h roboczych**\n• PRO — do **1 h roboczej**' },
  { id: 'faq-12', title: 'Jak mogę zgłosić problem?', items: [], answer: 'Zgłoszenia przyjmujemy przez ustalone z firmą kanały kontaktu, a większość z nich obsługujemy zdalnie.' },
  { id: 'faq-13', title: 'Czy większość problemów można rozwiązać zdalnie?', items: [], answer: 'Tak. Typowe problemy z systemem, oprogramowaniem, kontami, konfiguracją czy urządzeniami biurowymi często rozwiązujemy zdalnie. Jeśli potrzebna jest fizyczna ingerencja, umawiamy wizytę na miejscu.' },
  { id: 'faq-14', title: 'Czy wizyty serwisanta są wliczone w abonament?', items: [], answer: '• START — brak wizyt w cenie\n• BIZNES — **1 wizyta/mies.** do 2 h\n• PRO — **2 wizyty/mies.** do 2 h każda' },
  { id: 'faq-15', title: 'Ile kosztuje dodatkowa wizyta ponad limit pakietu?', items: [], answer: 'Wizyta ponad limit pakietu kosztuje **180 zł/h**.' },
  { id: 'faq-16', title: 'Czy części, sprzęt i licencje są wliczone w abonament?', items: [], answer: 'Nie. Osobno płatne są:\n• części zamienne\n• sprzęt\n• licencje\n• materiały\n• usługi firm trzecich' },
  { id: 'faq-17', title: 'Czy obsługujecie sieć LAN / Wi-Fi i urządzenia biurowe?', items: [], answer: 'Tak, a zakres zależy od pakietu. BIZNES i PRO obejmują administrację siecią oraz obsługę drukarek i skanerów sieciowych.' },
  { id: 'faq-18', title: 'Czy zajmujecie się serwerami i NAS?', items: [], answer: 'Tak. W pakiecie PRO administracja serwerami i NAS jest częścią zakresu abonamentu.' },
  { id: 'faq-19', title: 'Czy dbacie o backup danych?', items: [], answer: 'Tak. W zależności od pakietu lub usługi kontrolujemy albo konfigurujemy kopie zapasowe. Backup warto też okresowo sprawdzać pod kątem możliwości odtworzenia danych.' },
  { id: 'faq-20', title: 'Czy outsourcing obejmuje bezpieczeństwo IT?', items: [], answer: 'Tak. W zależności od pakietu obejmuje kontrolę aktualizacji, ochrony antywirusowej, zapory i uprawnień użytkowników oraz monitoring infrastruktury.' },
  { id: 'faq-21', title: 'Czy można zamówić pilną pomoc poza standardowym SLA?', items: [], answer: 'Tak.\n• Pilna interwencja poza standardowym SLA: **+50%**\n• Praca poza godzinami serwisu / w weekendy / święta: **+100%**' },
  { id: 'faq-22', title: 'Czy można korzystać z usług IT bez abonamentu?', items: [], answer: 'Tak. Firma może zamówić pojedyncze interwencje i usługi IT poza abonamentem zgodnie z aktualnym cennikiem.' },
]

const updateFaqForOutsourcing = (sections: PricingSection[]) => {
  const faq = sections.find(section => section.id === 'faq')
  if (!faq) return
  faq.subcategories = outsourcingFaqSubcategories.map(sub => ({ ...sub }))
}

export const createOutsourcingItPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  updateKonsultacjaForOutsourcing(sections)
  removeDojazdForOutsourcing(sections)
  updateKonserwacjaForOutsourcing(sections)
  updateNaprawyForOutsourcing(sections)
  updateFaqForOutsourcing(sections)
  return sections
}
