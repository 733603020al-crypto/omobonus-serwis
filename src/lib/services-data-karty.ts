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
        'PEŁNA KONSERWACJA [[kompleksowe ]]czyszczenie, kontrola i kalibracja drukarki kart\n• dokładne czyszczenie wnętrza drukarki oraz całego toru transportu kart;\n• czyszczenie głowicy drukującej i rolek podających;\n• czyszczenie / wymiana rolki czyszczącej oraz wkładu / kasety czyszczącej, jeśli występują w danym modelu;\n• czyszczenie i kontrola podajnika, odbiornika kart i modułu obracania (druk dwustronny), jeśli występuje;\n• kontrola mechanizmu prowadzenia taśmy barwiącej (ribbon) i czujników;\n• kontrola modułu laminacji / retransferu oraz koderów (pasek magnetyczny, chip, RFID), jeśli występują;\n• kalibracja czujników i parametrów druku;\n• test końcowy jakości nadruku i prawidłowego podawania kart.',
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
        { service: 'Usuwanie zaciętej karty / ciała obcego\n(karta utknęła w drukarce, urządzenie zgłasza Card Jam lub karta nie wychodzi)' },
        { service: 'Naprawa mechanizmu pobierania kart\n(drukarka nie pobiera kart, pobiera je nieregularnie lub próbuje pobrać kilka naraz)' },
        { service: 'Wymiana rolek podających / transportowych\n(karty ślizgają się, zatrzymują w środku lub drukarka ma problem z ich przesuwaniem)' },
        { service: 'Naprawa podajnika / odbiornika kart\n(karty nie wychodzą z podajnika albo nie trafiają prawidłowo do odbiornika)' },
        { service: 'Regulacja toru transportu kart\n(karty często się zacinają, przesuwają krzywo lub zatrzymują w tym samym miejscu)' },
        { service: 'Regulacja grubości kart / separatora\n(drukarka pobiera dwie karty naraz albo nie pobiera kart o innej grubości)' },
        { service: 'Naprawa / wymiana czujników kart\n(drukarka nie wykrywa karty, zgłasza jej brak albo zatrzymuje ją w niewłaściwym miejscu)' },
        { service: 'Kalibracja czujników kart\n(karta jest w drukarce, ale urządzenie jej nie widzi lub błędnie określa jej położenie)' },
      ],
    },
    {
      id: 'naprawy-glowica-platen',
      title: 'Głowica drukująca i jakość nadruku',
      items: [
        { service: 'Kalibracja głowicy / jakości nadruku\n(kolory lub obraz są przesunięte, nadruk jest nierówny albo nie pokrywa prawidłowo karty)' },
        { service: 'Diagnostyka i usunięcie przyczyny wad nadruku\n(na kartach pojawiają się smugi, pasy, przebarwienia, białe linie lub niepełny nadruk)' },
        { service: 'Wymiana głowicy drukującej\n(na każdej karcie pojawiają się stałe białe linie lub fragmenty obrazu nie są drukowane)' },
        { service: 'Regulacja docisku / położenia głowicy\n(nadruk jest słabszy z jednej strony, nierówny lub przesunięty względem karty)' },
        { service: 'Wymiana wałka dociskowego (platen)\n(nadruk jest blady lub nierówny na całej długości karty, a wałek jest wytarty lub uszkodzony)' },
        { service: 'Naprawa mechanizmu podnoszenia głowicy\n(drukarka zgłasza błąd podniesionej głowicy, a głowica nie opuszcza się lub nie podnosi)' },
      ],
    },
    {
      id: 'naprawy-tasma-ribbon',
      title: 'Taśma barwiąca: prowadzenie, napęd i czujniki',
      items: [
        { service: 'Diagnostyka i naprawa problemów z taśmą barwiącą\n(drukarka zgłasza Invalid ribbon lub błąd chipu taśmy, nie rozpoznaje taśmy, taśma się zacina lub zrywa)' },
        { service: 'Naprawa mechanizmu prowadzenia taśmy\n(taśma przesuwa się nierówno, marszczy się, zrywa lub nawija nieprawidłowo)' },
        { service: 'Naprawa / wymiana czujnika taśmy\n(drukarka nie wykrywa nowej taśmy lub błędnie zgłasza jej brak / koniec)' },
        { service: 'Kalibracja czujnika taśmy\n(drukarka nie rozpoznaje paneli kolorów albo zatrzymuje druk mimo prawidłowej taśmy)' },
        { service: 'Naprawa mechanizmu napędu taśmy\n(taśma nie przewija się, zatrzymuje podczas druku lub słychać pracę napędu bez ruchu taśmy)' },
      ],
    },
    {
      id: 'naprawy-mechanika-czujniki',
      title: 'Napęd i mechanika',
      items: [
        { service: 'Naprawa mechanizmu napędowego\n(drukarka pracuje głośno, mechanizm nie rusza lub zatrzymuje się podczas drukowania)' },
        { service: 'Naprawa przekładni / kół zębatych\n(słychać trzaski lub przeskakiwanie, a karta albo taśma nie przesuwa się prawidłowo)' },
        { service: 'Naprawa elementów mechanicznych obudowy / prowadnic\n(pokrywa, prowadnice lub elementy mocujące są uszkodzone i utrudniają prawidłową pracę drukarki)' },
      ],
    },
    {
      id: 'naprawy-moduly-dodatkowe',
      title: 'Druk dwustronny, retransfer i laminacja',
      items: [
        { service: 'Naprawa modułu obracania kart (flipper)\n(druk dwustronny nie działa, karta zacina się podczas obracania lub pojawia się błąd Flip Jam)' },
        { service: 'Naprawa modułu retransferu\n(folia retransferowa zacina się, marszczy lub obraz nie jest prawidłowo nanoszony na kartę)' },
        { service: 'Naprawa modułu laminacji\n(laminat nie jest nakładany, przesuwa się, marszczy lub karta blokuje się w laminatorze)' },
        { service: 'Regulacja / kalibracja modułu retransferu\n(obraz jest przesunięty, folia nie pokrywa całej karty lub pojawiają się nierówności)' },
        { service: 'Regulacja / kalibracja laminatora\n(laminat jest przesunięty, nierówno przyklejony lub nie pokrywa prawidłowo karty)' },
        { service: 'Naprawa grzałki / wałka grzewczego retransferu lub laminatora\n(folia lub laminat nie przykleja się, pojawia się błąd temperatury albo urządzenie długo się nagrzewa)' },
      ],
    },
    {
      id: 'naprawy-kodowanie',
      title: 'Kodowanie kart',
      items: [
        { service: 'Naprawa kodera paska magnetycznego\n(drukarka drukuje kartę, ale nie zapisuje danych na pasku magnetycznym lub zgłasza błąd kodowania)' },
        { service: 'Naprawa kodera chipowego\n(karta jest drukowana, ale chip nie jest zapisywany lub odczytywany)' },
        { service: 'Naprawa kodera RFID / bezstykowego\n(drukarka nie zapisuje danych na karcie zbliżeniowej albo nie wykrywa modułu RFID)' },
        { service: 'Konfiguracja / kalibracja kodera\n(kodowanie działa nieregularnie, zapis jest błędny lub karta nie trafia prawidłowo w pozycję kodowania)' },
      ],
    },
    {
      id: 'naprawy-elektronika-zasilanie',
      title: 'Elektronika, zasilanie i komunikacja',
      items: [
        { service: 'Wymiana / naprawa zasilacza\n(drukarka nie włącza się, wyłącza podczas pracy lub reaguje niestabilnie na zasilanie)' },
        { service: 'Naprawa płyty głównej\n(drukarka nie uruchamia się prawidłowo, zawiesza się lub zgłasza nietypowe błędy sprzętowe)' },
        { service: 'Naprawa portu USB\n(komputer nie widzi drukarki przez USB mimo prawidłowego przewodu i sterownika)' },
        { service: 'Naprawa modułu sieciowego Ethernet / Wi-Fi\n(drukarka traci połączenie z siecią, nie uzyskuje adresu IP lub nie jest dostępna dla komputerów)' },
        { service: 'Naprawa panelu sterowania / wyświetlacza\n(wyświetlacz nie działa, przyciski nie reagują albo panel pokazuje nieprawidłowe informacje)' },
        { service: 'Wymiana wentylatora / usunięcie przegrzewania\n(drukarka przerywa pracę, zgłasza błąd temperatury albo głośno pracuje)' },
      ],
    },
    {
      id: 'naprawy-oprogramowanie',
      title: 'Oprogramowanie i konfiguracja',
      items: [
        { service: 'Instalacja / konfiguracja sterowników\n(komputer nie wykrywa drukarki, drukowanie nie startuje lub sterownik działa nieprawidłowo)' },
        { service: 'Aktualizacja firmware\n(drukarka zawiesza się, zgłasza błędy lub wymaga aktualizacji oprogramowania urządzenia)' },
        { service: 'Konfiguracja sieci LAN / Wi-Fi\n(drukarka nie jest widoczna w sieci albo nie można drukować z innych komputerów)' },
        { service: 'Konfiguracja parametrów druku\n(kolory, orientacja, położenie obrazu lub inne ustawienia wydruku są nieprawidłowe)' },
        { service: 'Konfiguracja drukarki z systemem / oprogramowaniem klienta\n(drukarka działa samodzielnie, ale nie współpracuje prawidłowo z używanym programem lub systemem)' },
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
    { id: 'faq-3', title: 'Jakie usterki naprawiacie?', items: [], answer: 'Naprawiamy m.in.: pobieranie i transport kart (rolki podające i transportowe, podajniki, odbiorniki, prowadnice), głowice drukujące i jakość nadruku (diagnoza, wymiana, kalibracja), mechanizm i czujniki taśmy barwiącej, czujniki kart, moduły druku dwustronnego, retransferu i laminacji, kodery pasków magnetycznych, kart chipowych i RFID, elektronikę (płyty główne, zasilacze, porty, moduły sieciowe, panele i wyświetlacze), a także firmware, sterowniki i konfigurację sieci LAN / Wi-Fi, jeśli dany model ją obsługuje.' },
    { id: 'faq-4', title: 'Czy wykonujecie diagnostykę przed naprawą?', items: [], answer: 'Tak. Najpierw diagnozujemy urządzenie, określamy zakres prac i przygotowujemy wycenę.' },
    { id: 'faq-5', title: 'Czy diagnostyka jest bezpłatna?', items: [], answer: 'Przy realizacji naprawy diagnostyka jest bezpłatna. W przypadku rezygnacji z naprawy obowiązuje opłata zgodna z cennikiem.' },
    { id: 'faq-6', title: 'Czy przed rozpoczęciem naprawy otrzymam wycenę?', items: [], answer: 'Tak. Przed rozpoczęciem naprawy przedstawiamy zakres prac i koszt do akceptacji.' },
    { id: 'faq-7', title: 'Co jeśli nie zaakceptuję wyceny?', items: [], answer: 'Nie wykonujemy naprawy bez Twojej akceptacji. Jeśli po diagnozie zrezygnujesz z naprawy, obowiązuje jedynie opłata za diagnostykę zgodna z cennikiem, a drukarkę oddajemy bez wykonywania naprawy.' },
    { id: 'faq-8', title: 'Od czego zależy cena naprawy?', items: [], answer: 'Od kategorii drukarki (podstawowa, biznesowa, retransferowa), rodzaju usterki i tego, czy potrzebna jest wymiana części. W cenniku podajemy koszt robocizny; cena części — jeśli są potrzebne — jest doliczana osobno i zawsze ustalana z Tobą przed naprawą. Najdroższą częścią zwykle jest głowica drukująca.' },
    { id: 'faq-9', title: 'Ile trwa naprawa drukarki do kart?', items: [], answer: 'Drobne prace wykonujemy zwykle w 1–3 dni, standardowe naprawy w 3–5 dni, a skomplikowane naprawy w 5–7 dni plus czas oczekiwania na części. Dokładny termin podajemy po diagnozie.' },
    { id: 'faq-10', title: 'Czy można zlecić pilną naprawę?', items: [], answer: 'Tak. Oferujemy przyspieszoną realizację bez dodatkowej opłaty, jeśli pozwala na to rodzaj usterki i dostępność potrzebnych części.' },
    { id: 'faq-11', title: 'Czy można wysłać drukarkę kurierem?', items: [], answer: 'Tak. Możesz wysłać urządzenie kurierem z całej Polski albo dostarczyć drukarkę osobiście do serwisu. Dojazd do klienta we Wrocławiu — zgodnie z cennikiem dojazdu.' },
    { id: 'faq-12', title: 'Jak przygotować drukarkę do wysyłki?', items: [], answer: 'Wyjmij karty i materiały eksploatacyjne, odłącz przewody i dokładnie zabezpiecz urządzenie. Jeśli masz oryginalne opakowanie, najlepiej użyć go do transportu.' },
    { id: 'faq-13', title: 'Drukarka zacina karty lub ich nie pobiera — co robić?', items: [], answer: 'Sprawdź, czy karty nie są sklejone, wygięte lub zabrudzone i czy są prawidłowo ułożone w podajniku. Jeśli problem się powtarza, przyczyną bywają zużyte lub zabrudzone rolki, uszkodzony mechanizm pobierania albo czujnik karty — usuwamy zacięcia i ciała obce, wymieniamy rolki oraz regulujemy tor transportu kart.' },
    { id: 'faq-14', title: 'Na kartach pojawiają się linie lub pasy — co to oznacza?', items: [], answer: 'Białe linie lub pasy najczęściej oznaczają zabrudzoną albo uszkodzoną głowicę drukującą, rzadziej problem z taśmą barwiącą lub rolkami. Najpierw warto wykonać czyszczenie zgodnie z instrukcją producenta; jeśli linie nie znikają, diagnozujemy głowicę i w razie potrzeby ją czyścimy, kalibrujemy lub wymieniamy.' },
    { id: 'faq-15', title: 'Drukarka zgłasza błąd taśmy — co robić?', items: [], answer: 'Błąd taśmy (Ribbon error) może wynikać z nieprawidłowo założonej, niezgodnej lub zużytej taśmy, ale też z uszkodzonego czujnika, chipu taśmy lub mechanizmu jej napędu. Sprawdź, czy taśma jest przeznaczona do danego modelu i prawidłowo założona; jeśli błąd nie znika, serwisujemy czujniki oraz mechanizm prowadzenia i napędu taśmy.' },
    { id: 'faq-16', title: 'Co jeśli usterka się powtórzy?', items: [], answer: 'Skontaktuj się z nami i opisz objawy — sprawdzimy, czy problem dotyczy wykonanej naprawy, czy ma inną przyczynę. Powracające zacięcia lub linie na nadruku często wynikają z zabrudzonych rolek, zużytej głowicy lub kart słabej jakości; podczas diagnozy wskażemy, co je powoduje.' },
    { id: 'faq-17', title: 'Jaka jest gwarancja na naprawę?', items: [], answer: 'Na wykonaną usługę udzielamy 3 miesięcy gwarancji. Na zamontowane części obowiązuje gwarancja producenta lub dostawcy.' },
    { id: 'faq-18', title: 'Czy wykonujecie czyszczenie i konserwację drukarki?', items: [], answer: 'Tak. Czyścimy głowicę, rolki, tor transportu kart, czujniki i mechanizmy oraz wykonujemy niezbędną kontrolę i kalibrację urządzenia. Możesz też oddać sprawną drukarkę tylko na przegląd okresowy, bez zgłaszania konkretnej awarii.' },
    { id: 'faq-19', title: 'Jak często czyścić i serwisować drukarkę?', items: [], answer: 'Rolkę czyszczącą (jeśli występuje w danym modelu) producenci zwykle zalecają wymieniać przy każdej nowej taśmie, a czyszczenie wnętrza i głowicy wykonywać regularnie według instrukcji danego modelu lub przy pierwszych oznakach pogorszenia jakości nadruku. Przy intensywnej pracy warto okresowo zlecać pełną konserwację i przegląd.' },
    { id: 'faq-20', title: 'Czy serwisujecie starsze drukarki do kart i macie do nich części?', items: [], answer: 'Tak, jeśli dostępne są odpowiednie części i naprawa jest technicznie możliwa — potwierdzamy to po diagnostyce. Dostępność części zależy od producenta i konkretnego modelu; jeśli nie mamy ich na miejscu, sprawdzamy możliwość zamówienia.' },
    { id: 'faq-21', title: 'Czy stosujecie oryginalne części zamienne?', items: [], answer: 'Dobór części zależy od modelu, dostępności i rodzaju naprawy. Przed realizacją informujemy o zakresie prac i kosztach.' },
    { id: 'faq-22', title: 'Czy naprawa drukarki do kart zawsze się opłaca?', items: [], answer: 'Nie zawsze. Jeśli koszt naprawy jest wysoki w stosunku do wartości urządzenia, informujemy o tym po diagnostyce przed rozpoczęciem prac.' },
    { id: 'faq-23', title: 'Czy serwisujecie drukarki PVC, identyfikatorów i kart pracowniczych?', items: [], answer: 'Tak. Serwis obejmuje drukarki używane do kart PVC, identyfikatorów, legitymacji, kart pracowniczych, kart dostępu i innych kart plastikowych.' },
  ]
}

export const createKartyPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applyKartyCleaningSection(sections)
  applyKartyRepairsSection(sections)
  applyKartyFaqSection(sections)
  return sections
}
