import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

// serwis-drukarek-do-kart-plastikowych — własne dane strony (PL = źródło prawdy dla UK/RU).
// Klasy urządzeń: podstawowe (jednostronne) / biznesowe (dwustronne, kodowanie) / retransferowe.
export const KARTY_PRICE_TOOLTIP =
  'Ceny netto osobno dla drukarek kart: podstawowych / biznesowych / retransferowych (robocizna, bez materiałów eksploatacyjnych)'

const applyKartyCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PEŁNA KONSERWACJA [[kompleksowe ]]czyszczenie, kontrola i kalibracja drukarki kart\n• dokładne czyszczenie wnętrza drukarki oraz całego toru transportu kart;\n• czyszczenie głowicy drukującej, rolek podających i rolki czyszczącej;\n• czyszczenie i kontrola podajnika, odbiornika kart i modułu obracania (druk dwustronny), jeśli występuje;\n• kontrola mechanizmu prowadzenia taśmy barwiącej (ribbon) i czujników;\n• kontrola modułu laminacji / retransferu oraz koderów (pasek magnetyczny, chip, RFID), jeśli występują;\n• kalibracja czujników i parametrów druku;\n• test końcowy jakości nadruku i prawidłowego podawania kart.',
    },
  ]
}

const applyKartyRepairsSection = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection) return
  repairsSection.subcategories = [
    {
      id: 'naprawy-mechanizm',
      title: 'Podawanie i transport kart',
      items: [
        { service: 'Usuwanie zaciętej karty / ciała obcego' },
        { service: 'Naprawa mechanizmu pobierania kart' },
        { service: 'Wymiana rolek podających / transportowych' },
        { service: 'Naprawa podajnika / odbiornika kart' },
        { service: 'Regulacja toru transportu kart' },
      ],
    },
    {
      id: 'naprawy-glowica-platen',
      title: 'Głowica drukująca i jakość nadruku',
      items: [
        { service: 'Kalibracja głowicy / jakości nadruku' },
        { service: 'Naprawa problemów z jakością nadruku' },
        { service: 'Wymiana głowicy drukującej' },
        { service: 'Regulacja docisku / położenia głowicy' },
      ],
    },
    {
      id: 'naprawy-tasma-ribbon',
      title: 'Taśma barwiąca i mechanizm druku',
      items: [
        { service: 'Usunięcie problemu z taśmą barwiącą' },
        { service: 'Naprawa mechanizmu prowadzenia taśmy' },
        { service: 'Naprawa / wymiana czujnika taśmy' },
        { service: 'Kalibracja czujnika taśmy' },
        { service: 'Naprawa mechanizmu napędu taśmy' },
      ],
    },
    {
      id: 'naprawy-mechanika-czujniki',
      title: 'Mechanika, napęd i czujniki',
      items: [
        { service: 'Naprawa mechanizmu napędowego' },
        { service: 'Naprawa przekładni / kół zębatych' },
        { service: 'Naprawa / wymiana czujników kart' },
        { service: 'Kalibracja czujników kart' },
        { service: 'Naprawa elementów mechanicznych obudowy / prowadnic' },
      ],
    },
    {
      id: 'naprawy-moduly-dodatkowe',
      title: 'Druk dwustronny, retransfer i laminacja',
      items: [
        { service: 'Naprawa modułu obracania kart (flipper)' },
        { service: 'Naprawa modułu retransferu' },
        { service: 'Naprawa modułu laminacji' },
        { service: 'Regulacja / kalibracja modułu retransferu' },
        { service: 'Regulacja / kalibracja laminatora' },
      ],
    },
    {
      id: 'naprawy-kodowanie',
      title: 'Kodowanie kart',
      items: [
        { service: 'Naprawa kodera paska magnetycznego' },
        { service: 'Naprawa kodera chipowego' },
        { service: 'Naprawa kodera RFID / bezstykowego' },
        { service: 'Konfiguracja / kalibracja kodera' },
      ],
    },
    {
      id: 'naprawy-elektronika-zasilanie',
      title: 'Elektronika, zasilanie i komunikacja',
      items: [
        { service: 'Wymiana / naprawa zasilacza' },
        { service: 'Naprawa płyty głównej' },
        { service: 'Naprawa portu USB / Ethernet' },
        { service: 'Naprawa modułu Ethernet / Wi-Fi' },
        { service: 'Naprawa panelu sterowania / wyświetlacza' },
      ],
    },
    {
      id: 'naprawy-oprogramowanie',
      title: 'Oprogramowanie i konfiguracja',
      items: [
        { service: 'Instalacja / konfiguracja sterowników' },
        { service: 'Aktualizacja firmware' },
        { service: 'Konfiguracja sieci LAN / Wi-Fi' },
        { service: 'Konfiguracja parametrów druku' },
        { service: 'Konfiguracja drukarki z systemem / oprogramowaniem klienta' },
      ],
    },
  ]
}

const applyKartyFaqSection = (sections: PricingSection[]) => {
  const faq = sections.find(section => section.id === 'faq')
  if (!faq) return
  faq.subcategories = [
    { id: 'faq-1', title: 'Jakie marki drukarek do kart plastikowych serwisujecie?', items: [], answer: 'Serwisujemy m.in. Evolis, Zebra, HID Fargo, Magicard, Entrust Datacard, Matica, IDP Smart, HiTi, DASCOM, Swiftcolor, XID, EDIsecure, DNP, Nisca, Javelin, Pointman, Seaory, Polaroid, Kanematsu, CIM, Valid i Ultra Electronics. Jeśli Twojej marki nie ma na liście, skontaktuj się z nami — sprawdzimy możliwość naprawy.' },
    { id: 'faq-2', title: 'Czy naprawiacie drukarki kupione w innej firmie?', items: [], answer: 'Tak. Serwisujemy urządzenia niezależnie od miejsca ich zakupu.' },
    { id: 'faq-3', title: 'Jakie usterki drukarek do kart naprawiacie?', items: [], answer: 'Naprawiamy problemy z pobieraniem i transportem kart, głowicą drukującą, jakością nadruku, taśmą barwiącą, czujnikami, napędem, elektroniką, koderami oraz modułami dodatkowymi.' },
    { id: 'faq-4', title: 'Czy wykonujecie diagnostykę przed naprawą?', items: [], answer: 'Tak. Najpierw diagnozujemy urządzenie, określamy zakres prac i przygotowujemy wycenę.' },
    { id: 'faq-5', title: 'Czy diagnostyka jest bezpłatna?', items: [], answer: 'Przy realizacji naprawy diagnostyka jest bezpłatna. W przypadku rezygnacji z naprawy obowiązuje opłata zgodna z cennikiem.' },
    { id: 'faq-6', title: 'Czy przed rozpoczęciem naprawy otrzymam wycenę?', items: [], answer: 'Tak. Przed rozpoczęciem naprawy przedstawiamy zakres prac i koszt do akceptacji.' },
    { id: 'faq-7', title: 'Ile trwa naprawa drukarki do kart?', items: [], answer: 'Większość napraw realizujemy w ciągu kilku dni roboczych. Dokładny czas zależy od rodzaju usterki i dostępności części.' },
    { id: 'faq-8', title: 'Czy można zlecić pilną naprawę?', items: [], answer: 'Tak. Oferujemy przyspieszoną realizację, jeśli pozwala na to rodzaj usterki i dostępność potrzebnych części.' },
    { id: 'faq-9', title: 'Czy można wysłać drukarkę kurierem?', items: [], answer: 'Tak. Możesz wysłać urządzenie kurierem lub skorzystać z organizowanego przez nas odbioru i dostawy po naprawie.' },
    { id: 'faq-10', title: 'Jak przygotować drukarkę do wysyłki?', items: [], answer: 'Wyjmij karty i materiały eksploatacyjne, odłącz przewody i dokładnie zabezpiecz urządzenie. Jeśli masz oryginalne opakowanie, najlepiej użyć go do transportu.' },
    { id: 'faq-11', title: 'Czy naprawiacie problemy z pobieraniem kart?', items: [], answer: 'Tak. Naprawiamy rolki, podajniki, odbiorniki, prowadnice i mechanizmy transportu oraz usuwamy zacięcia kart i ciała obce.' },
    { id: 'faq-12', title: 'Czy wymieniacie rolki podające i transportowe?', items: [], answer: 'Tak. Wymieniamy zużyte lub uszkodzone rolki oraz sprawdzamy i regulujemy cały tor transportu kart.' },
    { id: 'faq-13', title: 'Czy wymieniacie głowice drukujące?', items: [], answer: 'Tak. Diagnozujemy uszkodzenia głowicy, wykonujemy jej wymianę oraz potrzebną regulację i kalibrację.' },
    { id: 'faq-14', title: 'Czy naprawiacie problemy z jakością nadruku?', items: [], answer: 'Tak. Usuwamy problemy takie jak pasy, białe linie, nierówny nadruk, niewłaściwe kolory, przesunięcia obrazu czy niepełny nadruk na karcie.' },
    { id: 'faq-15', title: 'Czy naprawiacie problemy z taśmą barwiącą?', items: [], answer: 'Tak. Serwisujemy mechanizm prowadzenia i napędu taśmy, czujniki taśmy oraz problemy z jej prawidłowym przesuwaniem.' },
    { id: 'faq-16', title: 'Czy naprawiacie czujniki w drukarkach kart?', items: [], answer: 'Tak. Naprawiamy i wymieniamy czujniki kart, taśmy i innych elementów oraz wykonujemy ich kalibrację.' },
    { id: 'faq-17', title: 'Czy wykonujecie czyszczenie i konserwację drukarki?', items: [], answer: 'Tak. Czyścimy głowicę, rolki, tor transportu kart, czujniki i mechanizmy oraz wykonujemy niezbędną kontrolę i kalibrację urządzenia.' },
    { id: 'faq-18', title: 'Czy można oddać sprawną drukarkę tylko na przegląd?', items: [], answer: 'Tak. Możesz zlecić samą konserwację i przegląd okresowy bez zgłaszania konkretnej awarii.' },
    { id: 'faq-19', title: 'Czy serwisujecie drukarki dwustronne?', items: [], answer: 'Tak. Naprawiamy drukarki duplex, w tym moduły obracania kart i mechanizmy odpowiedzialne za druk dwustronny.' },
    { id: 'faq-20', title: 'Czy naprawiacie moduły retransferu?', items: [], answer: 'Tak. Serwisujemy drukarki retransferowe, w tym mechanizmy transportu folii retransferowej, czujniki oraz moduły odpowiedzialne za nanoszenie obrazu na kartę.' },
    { id: 'faq-21', title: 'Czy naprawiacie laminatory?', items: [], answer: 'Tak. Diagnozujemy i naprawiamy moduły laminacji oraz wykonujemy ich regulację i kalibrację.' },
    { id: 'faq-22', title: 'Czy serwisujecie kodery kart magnetycznych?', items: [], answer: 'Tak. Naprawiamy i konfigurujemy kodery pasków magnetycznych stosowane w drukarkach kart plastikowych.' },
    { id: 'faq-23', title: 'Czy naprawiacie kodery kart chipowych i RFID?', items: [], answer: 'Tak. Serwisujemy również kodery kart stykowych i bezstykowych, w tym moduły RFID.' },
    { id: 'faq-24', title: 'Czy naprawiacie elektronikę drukarki?', items: [], answer: 'Tak. Naprawiamy m.in. płyty główne, układy zasilania, porty komunikacyjne, moduły sieciowe, panele sterowania i wyświetlacze.' },
    { id: 'faq-25', title: 'Czy naprawiacie zasilacze drukarek do kart?', items: [], answer: 'Tak. Diagnozujemy problemy z zasilaniem oraz naprawiamy lub wymieniamy uszkodzone zasilacze i elementy układu zasilania.' },
    { id: 'faq-26', title: 'Czy pomagacie z firmware i sterownikami?', items: [], answer: 'Tak. Wykonujemy aktualizacje firmware, instalację i konfigurację sterowników oraz pomagamy w konfiguracji urządzenia.' },
    { id: 'faq-27', title: 'Czy konfigurujecie drukarki w sieci LAN lub Wi-Fi?', items: [], answer: 'Tak. Konfigurujemy komunikację sieciową, jeśli dany model drukarki obsługuje LAN lub Wi-Fi.' },
    { id: 'faq-28', title: 'Czy serwisujecie starsze drukarki do kart?', items: [], answer: 'Tak, jeśli dostępne są odpowiednie części i naprawa jest technicznie możliwa. Potwierdzamy to po diagnostyce.' },
    { id: 'faq-29', title: 'Czy macie części zamienne do starszych modeli?', items: [], answer: 'Dostępność zależy od producenta i konkretnego modelu. Jeśli części nie mamy na miejscu, sprawdzamy możliwość jej zamówienia.' },
    { id: 'faq-30', title: 'Czy stosujecie oryginalne części zamienne?', items: [], answer: 'Dobór części zależy od modelu, dostępności i rodzaju naprawy. Przed realizacją informujemy o zakresie prac i kosztach.' },
    { id: 'faq-31', title: 'Czy naprawa drukarki do kart zawsze się opłaca?', items: [], answer: 'Nie zawsze. Jeśli koszt naprawy jest wysoki w stosunku do wartości urządzenia, informujemy o tym po diagnostyce przed rozpoczęciem prac.' },
    { id: 'faq-32', title: 'Czy serwisujecie drukarki PVC, identyfikatorów i kart pracowniczych?', items: [], answer: 'Tak. Serwis obejmuje drukarki używane do kart PVC, identyfikatorów, legitymacji, kart pracowniczych, kart dostępu i innych kart plastikowych.' },
  ]
}

export const createKartyPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applyKartyCleaningSection(sections)
  applyKartyRepairsSection(sections)
  applyKartyFaqSection(sections)
  return sections
}
