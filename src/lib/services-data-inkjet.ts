import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

const applyInkjetCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PEŁNA KONSERWACJA\u2028[[kompleksowe ]]czyszczenie, kontrola i kalibracja drukarki\n• dokładne czyszczenie wnętrza i obudowy drukarki,\n• czyszczenie toru papieru, rolek pobierania i czujników,\n• czyszczenie i konserwacja karetki, prowadnic i enkodera,\n• kontrola głowicy drukującej i drożności układu tuszu,\n• czyszczenie stacji serwisowej i pompy oraz kontrola mechanizmów drukarki,\n• kalibracja i końcowy test jakości wydruku oraz podawania papieru.',
    },
    {
      service:
        'Wymiana / czyszczenie absorbera zużytego tuszu + reset licznika\n• demontaż elementów niezbędnych do uzyskania dostępu do absorbera;\n• wymianę lub dokładne oczyszczenie absorbera zużytego tuszu („pampersa”);\n• oczyszczenie komory absorbera z pozostałości tuszu;\n• kontrolę i oczyszczenie układu odprowadzania zużytego tuszu;\n• reset licznika zużytego tuszu / usunięcie blokady serwisowej;\n• ponowny montaż i test prawidłowego działania drukarki.',
    },
  ]
}

const applyInkjetRepairsSection = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection) return
  repairsSection.subcategories = [
      {
        id: 'naprawy-mechanizm',
        title: 'Transport papieru, rolki i podajniki',
        items: [
          { service: 'Usuwanie zacięć w torze papieru\n(papier blokuje się lub zatrzymuje podczas drukowania)' },
          { service: 'Czyszczenie i regeneracja rolki pobierającej / separatora\n(drukarka nie pobiera papieru lub pobiera kilka kartek jednocześnie)' },
          { service: 'Wymiana rolki pobierającej / separatora\n(zużyte elementy powodują poślizg lub problemy z pobieraniem papieru)' },
          { service: 'Czyszczenie czujników papieru\n(fałszywy komunikat o braku papieru lub błędne wykrywanie arkusza)' },
          { service: 'Regulacja toru i prowadnic papieru\n(papier przesuwa się krzywo, zacina lub wydruk jest przesunięty)' },
          { service: 'Naprawa mechanizmu podawania papieru\n(podajnik nie pobiera, zatrzymuje lub nie przesuwa papieru prawidłowo)' },
          { service: 'Naprawa modułu druku dwustronnego (duplex)\n(papier zacina się lub nie jest prawidłowo obracany przy druku dwustronnym)' },
        ],
      },
      {
        id: 'naprawy-karetka',
        title: 'Karetka, enkoder i mechanizm napędu',
        items: [
          { service: 'Czyszczenie i smarowanie prowadnicy karetki\n(szarpanie, hałas lub nierówny ruch głowicy)' },
          { service: 'Czyszczenie taśmy enkodera\n(przesunięcia, cienie lub błędne pozycjonowanie wydruku)' },
          { service: 'Wymiana taśmy enkodera\n(trwałe błędy pozycjonowania mimo prawidłowego czyszczenia)' },
          { service: 'Regulacja paska napędu karetki\n(drgania, przeskakiwanie lub nierówny ruch karetki)' },
          { service: 'Wymiana paska napędu karetki\n(zużyty lub uszkodzony pasek powoduje zgrzyty albo brak ruchu głowicy)' },
          { service: 'Naprawa mechanizmu napędu karetki\n(karetka zatrzymuje się, blokuje lub porusza nieprawidłowo)' },
          { service: 'Wymiana silnika napędu karetki\n(głowica nie porusza się lub drukarka zgłasza błąd napędu)' },
        ],
      },
      {
        id: 'naprawy-glowica',
        title: 'Głowica drukująca i jakość wydruku',
        items: [
          { service: 'Czyszczenie i udrażnianie głowicy drukującej\n(brak koloru, przerwy, pasy lub puste fragmenty wydruku)' },
          { service: 'Wymiana głowicy drukującej\n(trwałe braki dysz lub uszkodzona głowica)' },
          { service: 'Kalibracja / wyrównanie głowicy\n(rozjechane linie, cienie lub nieprawidłowe nakładanie kolorów)' },
        ],
      },
      {
        id: 'naprawy-uklad-tuszu',
        title: 'Układ tuszu, stacja serwisowa i pompa',
        items: [
          { service: 'Płukanie i odpowietrzanie układu tuszu\n(przerwy w dopływie tuszu, pęcherzyki powietrza lub brak jednego koloru)' },
          { service: 'Naprawa układu zasilania tuszem / Ink Tank / EcoTank\n(tusz nie dopływa prawidłowo do głowicy lub poziom tuszu się nie wyrównuje)' },
          { service: 'Usuwanie nieszczelności i wycieków tuszu\n(tusz pojawia się wewnątrz drukarki lub pod urządzeniem)' },
          { service: 'Czyszczenie stacji serwisowej (capping / wiper)\n(głowica zasycha, brudzi lub automatyczne czyszczenie nie działa prawidłowo)' },
          { service: 'Naprawa stacji serwisowej / pompy tuszu\n(głowica nie jest prawidłowo czyszczona, nie parkuje lub tusz nie jest odprowadzany podczas czyszczenia)' },
        ],
      },
      {
        id: 'naprawy-skaner',
        title: 'Skaner i podajnik dokumentów ADF',
        items: [
          { service: 'Czyszczenie i kalibracja skanera\n(pasy, zabrudzenia lub niewłaściwe odwzorowanie skanu)' },
          { service: 'Naprawa mechanizmu skanera\n(skaner zatrzymuje się, hałasuje lub nie przesuwa modułu optycznego)' },
          { service: 'Naprawa podajnika dokumentów ADF\n(dokumenty nie są pobierane, zacinają się lub przechodzą krzywo)' },
          { service: 'Wymiana rolek / separatora ADF\n(podajnik pobiera kilka kartek lub nie pobiera dokumentów)' },
          { service: 'Naprawa czujników ADF / skanera\n(urządzenie błędnie wykrywa dokument lub zgłasza zacięcie)' },
        ],
      },
      {
        id: 'naprawy-elektronika',
        title: 'Elektronika, zasilanie i panel sterowania',
        items: [
          { service: 'Naprawa zasilacza / układu zasilania\n(drukarka nie włącza się, wyłącza lub pracuje niestabilnie)' },
          { service: 'Wymiana zasilacza / modułu zasilania\n(uszkodzony moduł zasilający)' },
          { service: 'Naprawa płyty głównej / elektroniki sterującej\n(resetowanie, zawieszanie lub błędy sterowania drukarką)' },
          { service: 'Wymiana płyty głównej / modułu sterującego\n(trwale uszkodzona elektronika urządzenia)' },
          { service: 'Naprawa okablowania i taśm sygnałowych\n(losowe błędy, zaniki sygnału lub przerywanie pracy)' },
          { service: 'Naprawa portów USB / LAN\n(komputer lub sieć nie wykrywa drukarki)' },
          { service: 'Naprawa panelu sterowania\n(przyciski, ekran lub panel dotykowy nie reagują prawidłowo)' },
          { service: 'Wymiana panelu sterowania / wyświetlacza\n(uszkodzony ekran lub moduł panelu)' },
        ],
      },
      {
        id: 'naprawy-software',
        title: 'Oprogramowanie i konfiguracja',
        items: [
          { service: 'Instalacja i konfiguracja sterowników\n(komputer nie widzi drukarki lub drukowanie działa nieprawidłowo)' },
          { service: 'Konfiguracja sieci Wi-Fi / LAN\n(drukarka nie łączy się z siecią lub innymi urządzeniami)' },
          { service: 'Konfiguracja AirPrint / Mopria / aplikacji producenta\n(brak możliwości drukowania ze smartfona lub tabletu)' },
          { service: 'Aktualizacja / konfiguracja firmware\n(błędy oprogramowania lub problemy po aktualizacji)' },
          { service: 'Przywrócenie ustawień i ponowna konfiguracja drukarki\n(problemy po błędnej zmianie ustawień lub resecie urządzenia)' },
          { service: 'Konfiguracja skanowania do komputera / folderu\n(skan nie trafia do komputera lub wskazanego folderu)' },
          { service: 'Konfiguracja skanowania do e-mail / chmury\n(problemy z wysyłaniem skanów przez SMTP lub do usługi chmurowej)' },
        ],
      },
  ]
}

const applyInkjetFaqSection = (sections: PricingSection[]) => {
  const faq = sections.find(section => section.id === 'faq')
  if (!faq) return
  faq.subcategories = [
    { id: 'faq-1', title: 'Jak wygląda proces naprawy drukarki atramentowej?', items: [], answer: 'Najpierw przeprowadzamy diagnozę i ustalamy przyczynę usterki. Następnie przedstawiamy koszt oraz przewidywany termin. Naprawę rozpoczynamy dopiero po akceptacji Klienta.' },
    { id: 'faq-2', title: 'Ile kosztuje diagnoza drukarki?', items: [], answer: 'Wstępna diagnoza online oraz przy dostarczeniu urządzenia jest bezpłatna. Pełna diagnoza również jest bezpłatna przy realizacji naprawy. Przy rezygnacji obowiązuje cena wskazana w aktualnym cenniku.' },
    { id: 'faq-3', title: 'Ile trwa naprawa?', items: [], answer: 'Większość standardowych napraw trwa 1–3 dni robocze. Bardziej złożone naprawy elektroniki albo oczekiwanie na części mogą wydłużyć ten czas.' },
    { id: 'faq-4', title: 'Jakie marki drukarek atramentowych serwisujecie?', items: [], answer: 'Serwisujemy m.in. Epson, Canon, HP, Brother oraz inne popularne drukarki atramentowe i urządzenia wielofunkcyjne.' },
    { id: 'faq-5', title: 'Czy warto naprawiać starszą drukarkę atramentową?', items: [], answer: 'To zależy od wartości urządzenia, rodzaju usterki, kosztu części i ogólnego stanu drukarki. Po diagnozie informujemy, czy naprawa jest ekonomicznie uzasadniona.' },
    { id: 'faq-6', title: 'Dlaczego drukarka drukuje w paski?', items: [], answer: 'Najczęściej przyczyną jest częściowo niedrożna głowica, problem z dopływem tuszu, zabrudzony enkoder albo nieprawidłowe wyrównanie głowicy.' },
    { id: 'faq-7', title: 'Dlaczego drukarka nie drukuje jednego koloru?', items: [], answer: 'Przyczyną może być zaschnięta głowica, zapowietrzony układ tuszu, niedrożny przewód albo problem ze stacją serwisową.' },
    { id: 'faq-8', title: 'Dlaczego drukarka drukuje puste strony?', items: [], answer: 'Najczęstsze przyczyny to całkowicie niedrożna głowica, brak dopływu tuszu albo uszkodzenie głowicy.' },
    { id: 'faq-9', title: 'Czy automatyczne czyszczenie głowicy zawsze pomaga?', items: [], answer: 'Nie. Przy lekkim zabrudzeniu może wystarczyć, ale mocno zaschnięta głowica często wymaga demontażu i profesjonalnego czyszczenia lub udrażniania.' },
    { id: 'faq-10', title: 'Czy każdą zaschniętą głowicę można udrożnić?', items: [], answer: 'Nie. Jeżeli dysze lub elektronika głowicy są trwale uszkodzone, czyszczenie może nie przywrócić jej prawidłowej pracy.' },
    { id: 'faq-11', title: 'Kiedy trzeba wymienić głowicę?', items: [], answer: 'Gdy profesjonalne czyszczenie i udrażnianie nie przywracają sprawności albo głowica jest uszkodzona elektrycznie lub mechanicznie. Przy wymianie do ceny robocizny doliczany jest koszt nowej głowicy.' },
    { id: 'faq-12', title: 'Dlaczego drukarka EcoTank / Ink Tank nie pobiera tuszu?', items: [], answer: 'Możliwą przyczyną jest zapowietrzenie, niedrożność przewodów, nieszczelność albo problem ze stacją serwisową i pompą.' },
    { id: 'faq-13', title: 'Dlaczego w przewodach EcoTank pojawiają się pęcherzyki powietrza?', items: [], answer: 'Powietrze może dostać się do układu po opróżnieniu zbiornika, nieszczelności albo dłuższym postoju urządzenia. Układ może wtedy wymagać odpowietrzenia.' },
    { id: 'faq-14', title: 'Dlaczego drukarka przecieka albo wewnątrz znajduje się tusz?', items: [], answer: 'Przyczyną może być nieszczelność systemu tuszu, uszkodzony pojemnik, przewód, stacja serwisowa albo przepełniony absorber.' },
    { id: 'faq-15', title: 'Co oznacza komunikat o pełnym absorberze / „pampersie”?', items: [], answer: 'Absorber zbiera tusz zużywany podczas automatycznego czyszczenia głowicy. Po osiągnięciu limitu urządzenie może wyświetlić komunikat serwisowy albo zablokować drukowanie.' },
    { id: 'faq-16', title: 'Czy wystarczy tylko zresetować licznik absorbera?', items: [], answer: 'Nie. Należy również sprawdzić fizyczny stan absorbera i układu odprowadzania tuszu. Sam reset może doprowadzić do przepełnienia i wycieku.' },
    { id: 'faq-17', title: 'Dlaczego drukarka nie pobiera papieru?', items: [], answer: 'Najczęstsze przyczyny to zabrudzone lub zużyte rolki, separator, czujniki albo uszkodzenie mechanizmu pobierania papieru.' },
    { id: 'faq-18', title: 'Dlaczego drukarka pobiera kilka kartek jednocześnie?', items: [], answer: 'Najczęściej odpowiada za to zużyty separator albo rolka pobierająca.' },
    { id: 'faq-19', title: 'Dlaczego papier zacina się lub jest pobierany krzywo?', items: [], answer: 'Przyczyną mogą być rolki, prowadnice, czujniki, zabrudzenie toru papieru albo problem z mechanizmem duplex.' },
    { id: 'faq-20', title: 'Dlaczego karetka głowicy hałasuje, szarpie lub zatrzymuje się?', items: [], answer: 'Możliwą przyczyną jest zabrudzona prowadnica, taśma enkodera, zużyty pasek, silnik albo mechaniczne zablokowanie karetki.' },
    { id: 'faq-21', title: 'Drukarka pokazuje błąd tuszu albo nie rozpoznaje kartridża — dlaczego?', items: [], answer: 'Przyczyną może być uszkodzony lub niekompatybilny wkład, zabrudzone styki, problem z chipem albo elektronika urządzenia.' },
    { id: 'faq-22', title: 'Dlaczego ADF nie pobiera dokumentów lub pobiera kilka kartek?', items: [], answer: 'Najczęściej przyczyną są zabrudzone lub zużyte rolki i separator ADF albo problem z czujnikiem.' },
    { id: 'faq-23', title: 'Skaner nie skanuje albo na skanie są pasy — czy to naprawiacie?', items: [], answer: 'Tak. Naprawiamy skanery i ADF w urządzeniach wielofunkcyjnych. Pasy mogą wynikać z zabrudzeń, problemu mechanizmu skanera lub czujników.' },
    { id: 'faq-24', title: 'Drukarka nie łączy się przez Wi-Fi / LAN albo komputer jej nie widzi — czy to naprawiacie?', items: [], answer: 'Tak. Sprawdzamy sterowniki, ustawienia sieci, firmware, porty USB/LAN oraz konfigurację drukarki i komputera.' },
    { id: 'faq-25', title: 'Czy udzielacie gwarancji na naprawę?', items: [], answer: 'Tak. Na wykonane naprawy udzielamy gwarancji od 3 do 12 miesięcy, zależnie od rodzaju pracy i zastosowanych części.' },
    { id: 'faq-26', title: 'Czy części są wliczone w cenę?', items: [], answer: 'Zależy od usługi. Jeżeli przy usłudze widnieje „+ części”, podana cena obejmuje robociznę, a potrzebne części są rozliczane osobno. Przy wymianie / czyszczeniu absorbera zużytego tuszu cena 250 zł obejmuje już absorber i materiały potrzebne do wykonania usługi.' },
    { id: 'faq-27', title: 'Ile kosztuje odbiór lub dostawa drukarki?', items: [], answer: 'Odbiór lub dostawa do 2,5 km od serwisu kosztuje 20 zł netto. Przy dłuższej trasie doliczamy 1,5 zł netto za każdy kilometr powyżej 5 km łącznej trasy w obie strony.' },
  ]
}

export const createInkjetPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applyInkjetCleaningSection(sections)
  applyInkjetRepairsSection(sections)
  applyInkjetFaqSection(sections)
  return sections
}
