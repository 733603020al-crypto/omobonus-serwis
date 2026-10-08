import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

// serwis-drukarek-spozywczych — własne dane strony (PL = źródło prawdy dla UK/RU).
// Wszystkie ikony (sekcje i grupy Naprawy) — właściwe zdjęcia od właściciela.
export const SPOZYWCZE_PRICE_TOOLTIP =
  'Ceny netto za robociznę, bez części i atramentu. Przy pełnej konserwacji standardowe płyny czyszczące i drobne materiały serwisowe są wliczone w cenę. Czas realizacji nie obejmuje oczekiwania na części.'

const applySpozywczeCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PEŁNA KONSERWACJA\u2028[[pełne ]]czyszczenie i kontrola drukarki spożywczej\n• kontrola dysz i nozzle check;\n• standardowy cykl czyszczenia głowicy;\n• czyszczenie głowicy / powierzchni dysz;\n• czyszczenie capów i wipera;\n• czyszczenie odpływu zużytego atramentu;\n• czyszczenie filtrów;\n• czyszczenie rolek i toru podawania arkuszy;\n• czyszczenie platformy / stołu roboczego w drukarkach direct-to-food;\n• czyszczenie czujników produktu i położenia;\n• wydruk testowy po konserwacji.',
    },
  ]
  cleaningSection.notes = [
    'W cenie: standardowe płyny czyszczące i drobne materiały serwisowe.',
    'Części zamienne — dodatkowo, jeśli konieczna jest ich wymiana.',
  ]
}

const applySpozywczeRepairsSection = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection) return
  repairsSection.subcategories = [
    {
      id: 'naprawy-glowica',
      title: 'Głowica drukująca i jakość nadruku',
      items: [
        { service: 'Udrażnianie głowicy drukującej\n(brak części dysz, zaniki kolorów, pasy na wydruku, zaschnięty atrament)' },
        { service: 'Regeneracja głowicy drukującej\n(standardowe czyszczenie i udrażnianie nie przywracają prawidłowego druku)' },
        { service: 'Wymiana głowicy drukującej\n(głowica nie drukuje, ma trwałe uszkodzenia lub nie nadaje się do regeneracji)' },
        { service: 'Kalibracja i korekta jakości nadruku\n(nadruk jest przesunięty, rozmyty, podwójny lub kolory nie pokrywają się prawidłowo)' },
      ],
    },
    {
      id: 'naprawy-kartridze',
      title: 'Kartridże i układ jadalnego atramentu',
      items: [
        { service: 'Naprawa problemów z rozpoznawaniem kartridży\n(drukarka nie wykrywa wkładu lub pokazuje błąd kartridża mimo jego zamontowania)' },
        { service: 'Naprawa styków kartridża / głowicy\n(kartridż jest wykrywany niestabilnie lub błąd pojawia się po poruszeniu wkładem)' },
        { service: 'Naprawa przewodów atramentowych / CISS\n(atrament wycieka, nie dopływa do głowicy lub w przewodach pojawia się powietrze)' },
        { service: 'Usuwanie zapowietrzenia układu atramentowego\n(atrament nie dociera prawidłowo do głowicy po postoju lub wymianie tuszu)' },
        { service: 'Wymiana damperów (tłumików atramentu)\n(dopływ atramentu jest nierówny, kolor zanika lub układ zasysa powietrze)' },
        { service: 'Płukanie układu atramentowego\n(zanieczyszczony lub częściowo niedrożny układ ogranicza przepływ jadalnego atramentu)' },
      ],
    },
    {
      id: 'naprawy-stacja-serwisowa',
      title: 'Stacja serwisowa i zużyty atrament',
      items: [
        { service: 'Naprawa / wymiana stacji kapującej (cap station)\n(głowica nie jest prawidłowo uszczelniana lub czyszczenie nie działa skutecznie)' },
        { service: 'Wymiana wipera\n(na głowicy pozostają resztki atramentu po cyklu czyszczenia)' },
        { service: 'Naprawa napędu wipera\n(wiper nie porusza się lub drukarka zgłasza błąd mechanizmu czyszczenia)' },
        { service: 'Naprawa / wymiana pompy atramentu\n(drukarka nie odciąga atramentu podczas czyszczenia)' },
        { service: 'Wymiana / obsługa pochłaniacza (absorbera) zużytego atramentu\n(drukarka zgłasza przepełnienie absorbera lub zużyty atrament nie jest prawidłowo magazynowany)' },
        { service: 'Naprawa odpływu zużytego atramentu\n(pojawiają się wycieki albo atrament nie odpływa ze stacji serwisowej)' },
        { service: 'Naprawa wanienki atramentu (ink trough) i filtrów w direct-to-food\n(atrament gromadzi się w komorze lub przepływ przez filtr jest ograniczony)' },
      ],
    },
    {
      id: 'naprawy-podawanie',
      title: 'Podawanie arkuszy spożywczych',
      items: [
        { service: 'Naprawa mechanizmu pobierania arkuszy\n(drukarka nie pobiera papieru cukrowego, waflowego lub frosting sheet)' },
        { service: 'Wymiana / naprawa rolek pobierających\n(arkusz ślizga się, pobierany jest kilka razy albo wchodzi krzywo)' },
        { service: 'Naprawa prowadzenia arkusza\n(arkusz przesuwa się nierówno, przekrzywia lub ociera o elementy drukarki)' },
        { service: 'Usuwanie zacięć mechanizmu podawania\n(arkusz zatrzymuje się wewnątrz drukarki lub nie przechodzi przez cały tor)' },
        { service: 'Naprawa czujnika papieru / arkusza\n(drukarka nie wykrywa arkusza albo zgłasza jego brak mimo prawidłowego założenia)' },
      ],
    },
    {
      id: 'naprawy-platforma',
      title: 'Platforma / stół direct-to-food',
      items: [
        { service: 'Naprawa mechanizmu podnoszenia i opuszczania platformy\n(stół nie ustawia prawidłowej wysokości względem produktu)' },
        { service: 'Naprawa napędu platformy\n(platforma nie porusza się, zatrzymuje się lub pracuje nierówno)' },
        { service: 'Naprawa prowadnic platformy\n(stół zacina się, ma luz lub przesuwa się nierówno)' },
        { service: 'Naprawa mechanizmu wsuwania / wysuwania stołu\n(platforma nie wjeżdża pod głowicę albo nie wraca do pozycji startowej)' },
        { service: 'Usuwanie błędów Platform Feed / Lift\n(drukarka zatrzymuje pracę i zgłasza błąd ruchu lub wysokości platformy)' },
      ],
    },
    {
      id: 'naprawy-pozycjonowanie',
      title: 'Pozycjonowanie produktu i karuzela',
      items: [
        { service: 'Kalibracja położenia produktu\n(nadruk nie trafia w środek produktu lub jest stale przesunięty)' },
        { service: 'Naprawa mechanizmu centrowania produktu\n(produkt nie ustawia się prawidłowo względem głowicy)' },
        { service: 'Naprawa / kalibracja karuzeli\n(karuzela zatrzymuje się, obraca nierówno lub ustawia produkt w złej pozycji)' },
        { service: 'Naprawa napędu karuzeli\n(karuzela nie obraca się mimo prawidłowego ustawienia produktu)' },
        { service: 'Naprawa tacki / mocowania produktu\n(produkt przesuwa się podczas drukowania lub tacka nie ustawia się prawidłowo)' },
      ],
    },
    {
      id: 'naprawy-czujniki',
      title: 'Czujniki produktu i wysokości',
      items: [
        { service: 'Wymiana czujnika produktu\n(drukarka nie wykrywa produktu na platformie)' },
        { service: 'Naprawa / wymiana płytki czujników (sensor board)\n(czujniki nie działają prawidłowo mimo sprawnej mechaniki)' },
        { service: 'Naprawa czujnika wysokości produktu\n(drukarka błędnie ustawia odległość głowicy od produktu)' },
        { service: 'Naprawa czujnika pozycji platformy\n(drukarka nie rozpoznaje położenia stołu lub zatrzymuje jego ruch)' },
      ],
    },
    {
      id: 'naprawy-karetka',
      title: 'Karetka, napęd i enkodery',
      items: [
        { service: 'Naprawa napędu karetki\n(karetka zatrzymuje się, porusza nierówno lub drukarka zgłasza błąd ruchu)' },
        { service: 'Wymiana / regulacja paska karetki\n(karetka szarpie, traci pozycję lub pasek jest luźny albo uszkodzony)' },
        { service: 'Naprawa / wymiana silnika karetki\n(karetka nie porusza się mimo sprawnego paska i prowadzenia)' },
        { service: 'Czyszczenie / wymiana taśmy enkodera\n(druk jest przesunięty, karetka traci pozycję lub pojawiają się błędy ruchu)' },
        { service: 'Naprawa enkodera platformy / koła enkodera\n(platforma zatrzymuje się w niewłaściwej pozycji lub nie mierzy prawidłowo ruchu)' },
      ],
    },
    {
      id: 'naprawy-elektronika-zasilanie',
      title: 'Elektronika, zasilanie i panel sterowania',
      subtitle: 'Nie każda drukarka spożywcza posiada osobny panel lub wyświetlacz — te pozycje dotyczą modeli wyposażonych w taki element.',
      items: [
        { service: 'Naprawa zasilacza / układu zasilania\n(drukarka nie włącza się, wyłącza lub pracuje niestabilnie)' },
        { service: 'Wymiana zasilacza / modułu zasilania\n(uszkodzony moduł zasilający)' },
        { service: 'Naprawa płyty głównej / elektroniki sterującej\n(resetowanie, zawieszanie lub błędy sterowania drukarką)' },
        { service: 'Wymiana płyty głównej / modułu sterującego\n(trwale uszkodzona elektronika urządzenia)' },
        { service: 'Naprawa okablowania i taśm sygnałowych\n(losowe błędy, zaniki sygnału lub przerywanie pracy)' },
        { service: 'Naprawa portów USB / LAN\n(komputer lub sieć nie wykrywa drukarki mimo prawidłowej konfiguracji)' },
        { service: 'Naprawa panelu sterowania\n(przyciski, ekran lub panel dotykowy nie reagują prawidłowo)' },
        { service: 'Wymiana panelu sterowania / wyświetlacza\n(uszkodzony ekran, panel lub moduł sterowania)' },
      ],
    },
    {
      id: 'naprawy-oprogramowanie',
      title: 'Oprogramowanie i konfiguracja',
      subtitle: 'Konfiguracja, firmware, kalibracja lub przywrócenie ustawień potrzebne do zakończenia naszej naprawy są wliczone w jej cenę. Osobna cena obowiązuje tylko przy samodzielnym zleceniu takiej usługi.',
      items: [
        { service: 'Instalacja i konfiguracja sterowników\n(komputer nie widzi drukarki lub drukowanie działa nieprawidłowo)' },
        { service: 'Konfiguracja sieci Wi-Fi / LAN\n(drukarka nie łączy się z siecią lub komputerem przez sieć)' },
        { service: 'Konfiguracja aplikacji / oprogramowania producenta\n(problemy z konfiguracją programu używanego do obsługi i drukowania)' },
        { service: 'Aktualizacja / konfiguracja firmware\n(błędy oprogramowania urządzenia lub problem po aktualizacji)' },
        { service: 'Przywrócenie ustawień i ponowna konfiguracja drukarki\n(problemy po błędnej zmianie ustawień, resecie lub zmianie konfiguracji urządzenia)' },
      ],
    },
  ]
}

// Dojazd tej strony: 1,50 zł/km liczone od całej trasy tam i z powrotem ponad pierwsze 5 km
const applySpozywczeDojazdSection = (sections: PricingSection[]) => {
  const dojazd = sections.find(section => section.id === 'dojazd')
  if (!dojazd?.items[2]) return
  dojazd.items[2] = {
    ...dojazd.items[2],
    service: 'Odbiór lub dostawa powyżej 2,5 km od serwisu (1,50 zł za każdy dodatkowy km całej trasy tam i z powrotem ponad pierwsze 5 km)',
  }
}

const applySpozywczeFaqSection = (sections: PricingSection[]) => {
  const faq = sections.find(section => section.id === 'faq')
  if (!faq) return
  faq.subcategories = [
    { id: 'faq-1', title: 'Ile kosztuje diagnoza drukarki spożywczej?', items: [], answer: 'W przypadku rezygnacji z naprawy: **50 / 100 / 150 zł**, zależnie od kategorii urządzenia.' },
    { id: 'faq-2', title: 'Czy diagnoza jest płatna, jeśli zdecyduję się na naprawę?', items: [], answer: 'Nie — opłata dotyczy rezygnacji z naprawy.' },
    { id: 'faq-3', title: 'Ile trwa diagnoza?', items: [], answer: 'Zwykle **1–3 dni robocze**.' },
    { id: 'faq-4', title: 'Ile trwa naprawa?', items: [], answer: 'Większość napraw wykonujemy w **1–2 dni robocze**. Bardziej złożone prace mogą trwać **2–4 dni**, bez czasu oczekiwania na części.' },
    { id: 'faq-5', title: 'Czy przed naprawą poznam jej koszt?', items: [], answer: 'Tak. Po diagnozie przedstawiamy zakres prac i koszt. Naprawę rozpoczynamy dopiero po akceptacji.' },
    { id: 'faq-6', title: 'Od czego zależy cena naprawy?', items: [], answer: 'Od kategorii urządzenia, zakresu prac oraz potrzebnych części. Dokładny koszt przedstawiamy po diagnozie, przed rozpoczęciem naprawy.' },
    { id: 'faq-7', title: 'Czy warto naprawiać starszą drukarkę spożywczą?', items: [], answer: 'Po diagnozie ocenimy zakres usterki i opłacalność naprawy. Jeśli zdecydujesz się zrezygnować, obowiązuje opłata za diagnozę zgodnie z cennikiem.' },
    { id: 'faq-8', title: 'Jakie drukarki spożywcze naprawiacie?', items: [], answer: 'Naprawiamy zarówno drukarki arkuszowe przystosowane do jadalnych tuszów, jak i kompaktowe drukarki direct-to-food.' },
    { id: 'faq-9', title: 'Czy naprawiacie drukarki Canon, Epson i Brother przystosowane do jadalnych tuszów?', items: [], answer: 'Tak. Naprawiamy urządzenia już przystosowane do pracy z jadalnymi tuszami.' },
    { id: 'faq-10', title: 'Jakie marki drukarek spożywczych naprawiacie?', items: [], answer: 'M.in. Canon, Epson, Brother, Primera, JetLT, Icing Images, Icinginks, Kopykake, DecoPac / PhotoCake, EVEBOT, Cino Printer i inne — w zakresie urządzeń objętych naszą ofertą.' },
    { id: 'faq-11', title: 'Drukarka nie drukuje jednego lub kilku kolorów — co może być przyczyną?', items: [], answer: 'Najczęściej przyczyną są zatkane dysze, problem z kartridżem albo nieprawidłowy dopływ atramentu.' },
    { id: 'faq-12', title: 'Czy każdą zatkaną głowicę można udrożnić?', items: [], answer: 'Nie. Przy trwałym uszkodzeniu może być potrzebna regeneracja lub wymiana głowicy.' },
    { id: 'faq-13', title: 'Czy jadalny atrament może zaschnąć w głowicy?', items: [], answer: 'Tak, szczególnie przy dłuższym postoju drukarki. Jeśli kolejne cykle czyszczenia nie pomagają, potrzebne może być udrażnianie lub regeneracja głowicy.' },
    { id: 'faq-14', title: 'Czy kilka kolejnych cykli czyszczenia głowicy jest dobrym pomysłem?', items: [], answer: 'Nie zawsze. Jeśli kolejne cykle nie poprawiają jakości druku, potrzebna jest dalsza diagnostyka.' },
    { id: 'faq-15', title: 'Dlaczego druk jest rozmyty albo przesunięty?', items: [], answer: 'Przyczyną może być głowica, kalibracja, encoder, ustawienie produktu albo niewłaściwa wysokość platformy.' },
    { id: 'faq-16', title: 'Dlaczego nadruk nie trafia w środek ciastka?', items: [], answer: 'Przyczyną może być pozycjonowanie, kalibracja, czujnik produktu albo ustawienie tacki / karuzeli.' },
    { id: 'faq-17', title: 'Drukarka nie wykrywa produktu na platformie — czy to naprawiacie?', items: [], answer: 'Tak. Diagnozujemy czujnik produktu, sensor board, platformę i jej ustawienie.' },
    { id: 'faq-18', title: 'Głowica uderza w ciastko lub tort — co może być przyczyną?', items: [], answer: 'Najczęściej problem z czujnikiem wysokości, kalibracją platformy, zabrudzeniem czujnika lub encoderem.' },
    { id: 'faq-19', title: 'Czy naprawiacie platformę / stół direct-to-food?', items: [], answer: 'Tak — m.in. napęd, podnoszenie, prowadnice, pozycjonowanie oraz błędy Platform Feed / Lift.' },
    { id: 'faq-20', title: 'Czy naprawiacie karuzelę w drukarkach do ciastek?', items: [], answer: 'Tak — również jej napęd, ustawienie i kalibrację.' },
    { id: 'faq-21', title: 'Czy naprawiacie problemy z pobieraniem papieru cukrowego lub waflowego?', items: [], answer: 'Tak — diagnozujemy rolki, prowadzenie arkusza, czujniki i zacięcia.' },
    { id: 'faq-22', title: 'Czy można używać dowolnego jadalnego atramentu i papieru?', items: [], answer: 'Nie zawsze. Należy stosować materiały kompatybilne z konkretnym urządzeniem i systemem druku.' },
    { id: 'faq-23', title: 'Czy części są w cenie naprawy?', items: [], answer: 'Ceny w cenniku dotyczą robocizny. Przy usługach oznaczonych **„+ części”** koszt potrzebnych części doliczamy osobno — po uzgodnieniu z Tobą.' },
    { id: 'faq-24', title: 'Czy mogę osobiście dostarczyć drukarkę do serwisu?', items: [], answer: 'Tak. To preferowany sposób. Jeśli nie masz takiej możliwości, możemy zorganizować odbiór urządzenia.' },
    { id: 'faq-25', title: 'Czy mogę wysłać drukarkę kurierem z innego miasta?', items: [], answer: 'Tak. Możesz samodzielnie wysłać dobrze zabezpieczoną drukarkę kurierem do naszego serwisu. Przed wysyłką skontaktuj się z nami. Nie organizujemy obecnie odbioru kurierskiego na terenie całej Polski.' },
    { id: 'faq-26', title: 'Ile kosztuje odbiór lub dostawa?', items: [], answer: '**20 zł** obejmuje trasę do 2,5 km od serwisu, czyli do 5 km łącznie w obie strony. Powyżej tego limitu: **20 zł + 1,50 zł/km** — za każdy dodatkowy kilometr całej trasy tam i z powrotem ponad pierwsze 5 km.' },
    { id: 'faq-27', title: 'Jak często wykonywać konserwację?', items: [], answer: 'Zależy od modelu i intensywności pracy. Regularnej kontroli wymagają m.in. głowica, stacja serwisowa, czujniki, platforma oraz układ atramentowy.' },
    { id: 'faq-28', title: 'Czy udrażnianie głowicy jest częścią zwykłej konserwacji?', items: [], answer: 'Nie. Konserwacja dotyczy sprawnego urządzenia. Udrażnianie lub regeneracja niedrożnej głowicy jest usługą naprawczą.' },
    { id: 'faq-29', title: 'Czy udzielacie gwarancji na naprawę?', items: [], answer: 'Tak. Na wykonaną usługę serwisową udzielamy **3 miesięcy gwarancji**, a na **udrażnianie i regenerację głowicy — 7 dni**. Części podlegają gwarancji producenta lub dostawcy.' },
  ]
}

export const createSpozywczePricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applySpozywczeCleaningSection(sections)
  applySpozywczeRepairsSection(sections)
  applySpozywczeDojazdSection(sections)
  applySpozywczeFaqSection(sections)
  return sections
}
