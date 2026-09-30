import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

const applyPlotterCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PEŁNA KONSERWACJA\u2028[[kompleksowe ]]czyszczenie, kontrola i kalibracja plotera\n• dokładne czyszczenie wnętrza plotera, prowadnic, rolek i toru prowadzenia mediów,\n• czyszczenie i kontrola karetki, paska enkodera oraz elementów napędu,\n• czyszczenie i kontrola stacji serwisowej oraz układu podawania tuszu,\n• kontrola głowicy drukującej i drożności układu atramentowego,\n• kontrola i konserwacja elementów mechanicznych; smarowanie zgodnie z zaleceniami producenta,\n• kalibracja urządzenia oraz końcowy test jakości wydruku i podawania mediów.',
    },
  ]
}

const applyPlotterDojazdSection = (sections: PricingSection[]) => {
  const dojazd = sections.find(section => section.id === 'dojazd')
  if (!dojazd) return
  dojazd.items = dojazd.items.map((item, i) =>
    i === 2 ? { ...item, service: 'Odbiór lub dostawa powyżej 2,5 km od serwisu (dopłata za każdy kilometr powyżej 5 km łącznej trasy)' } : item
  )
}

const applyPlotterFaqSection = (sections: PricingSection[]) => {
  const faq = sections.find(section => section.id === 'faq')
  if (!faq) return
  faq.subcategories = [
    { id: 'faq-1', title: 'Jak wygląda proces naprawy plotera?', items: [], answer: 'Najpierw przeprowadzamy wstępną diagnozę i określamy możliwą przyczynę usterki. Następnie wykonujemy pełną diagnozę, podajemy dokładny koszt naprawy i termin realizacji. Naprawę rozpoczynamy dopiero po akceptacji Klienta.' },
    { id: 'faq-2', title: 'Ile kosztuje diagnoza plotera?', items: [], answer: 'Wstępna diagnoza online oraz przy dostarczeniu urządzenia do serwisu jest bezpłatna. Pełna diagnoza również jest bezpłatna, jeśli realizujemy naprawę. W przypadku rezygnacji z naprawy koszt pełnej diagnozy wynosi 150 zł netto.' },
    { id: 'faq-3', title: 'Ile trwa naprawa plotera?', items: [], answer: 'Większość standardowych napraw wykonujemy w ciągu 1–3 dni roboczych. Bardziej złożone naprawy elektroniki lub oczekiwanie na części mogą wydłużyć ten czas. Dokładny termin podajemy po diagnozie.' },
    { id: 'faq-4', title: 'Jakie marki ploterów serwisujecie?', items: [], answer: 'Serwisujemy plotery wielu producentów, m.in. HP, Canon, Epson, Roland, Mimaki, Mutoh i innych. Przed przyjęciem urządzenia możemy potwierdzić możliwość naprawy i dostępność części dla konkretnego modelu.' },
    { id: 'faq-5', title: 'Czy warto naprawiać starszy ploter?', items: [], answer: 'To zależy od rodzaju usterki, stanu urządzenia, dostępności części i kosztu naprawy. Po diagnozie informujemy, czy naprawa jest ekonomicznie uzasadniona. Jeśli naszym zdaniem nie ma sensu – powiemy to przed rozpoczęciem prac.' },
    { id: 'faq-6', title: 'Czy muszę dostarczyć ploter do serwisu?', items: [], answer: 'Nie musisz, ale jeśli masz możliwość bezpiecznego transportu, możesz dostarczyć ploter bezpośrednio do naszego serwisu. Jeśli transport jest utrudniony, możesz zamówić u nas odbiór urządzenia zgodnie z cennikiem.' },
    { id: 'faq-7', title: 'Ile kosztuje odbiór lub dostawa plotera?', items: [], answer: 'Do 2,5 km od serwisu odbiór lub dostawa kosztuje 60 / 100 / 150 zł netto odpowiednio dla małego, średniego i dużego plotera. Przy dalszej trasie doliczamy 2 zł za każdy kilometr powyżej pierwszych 5 km łącznej trasy.' },
    { id: 'faq-8', title: 'Jak przygotować ploter do transportu?', items: [], answer: 'Przed transportem skontaktuj się z nami. W zależności od modelu podpowiemy, jak zabezpieczyć głowicę, karetkę, atrament oraz ruchome elementy urządzenia, aby ograniczyć ryzyko uszkodzenia podczas przewozu.' },
    { id: 'faq-9', title: 'Czy części są wliczone w cenę naprawy?', items: [], answer: 'Nie. Jeżeli przy usłudze widnieje „+ części”, podana cena obejmuje robociznę, a potrzebne części są rozliczane osobno. Ich koszt podajemy przed rozpoczęciem naprawy.' },
    { id: 'faq-10', title: 'Jakie części stosujecie?', items: [], answer: 'W zależności od modelu i dostępności stosujemy odpowiednie części serwisowe. Przed naprawą informujemy Klienta o rodzaju oraz koszcie zastosowanych części.' },
    { id: 'faq-11', title: 'Czy udzielacie gwarancji na naprawę?', items: [], answer: 'Tak. Na wykonane naprawy udzielamy gwarancji od 3 do 12 miesięcy, w zależności od rodzaju wykonanej pracy i zastosowanych części.' },
    { id: 'faq-12', title: 'Dlaczego na wydruku pojawiają się pasy lub smugi?', items: [], answer: 'Przyczyną może być zabrudzona lub niedrożna głowica, problem z układem atramentowym, stacją serwisową, kalibracją albo przesuwem mediów. Podczas diagnozy ustalamy konkretną przyczynę przed wykonaniem naprawy.' },
    { id: 'faq-13', title: 'Dlaczego brakuje jednego koloru lub części dysz?', items: [], answer: 'Najczęściej przyczyną jest niedrożna lub zaschnięta głowica, zapowietrzony układ atramentowy, uszkodzone dampery albo problem z dopływem tuszu. W zależności od stanu wykonujemy czyszczenie, płukanie, odpowietrzanie lub wymianę uszkodzonego elementu.' },
    { id: 'faq-25', title: 'Dlaczego ploter nie pobiera tuszu mimo pełnych zbiorników?', items: [], answer: 'Przyczyną mogą być zapowietrzone przewody, uszkodzone dampery, pompa, stacja serwisowa albo nieszczelność układu atramentowego.' },
    { id: 'faq-14', title: 'Kiedy trzeba wymienić głowicę drukującą?', items: [], answer: 'Wymiana jest potrzebna, gdy głowica jest trwale uszkodzona lub zużyta i prawidłowe czyszczenie oraz udrażnianie nie przywracają jakości wydruku. Zawsze najpierw sprawdzamy, czy głowicę można uratować.' },
    { id: 'faq-24', title: 'Czym różni się zwykłe czyszczenie głowicy od regeneracyjnego płukania?', items: [], answer: 'Standardowe czyszczenie usuwa lekkie zabrudzenia i częściowe niedrożności. Regeneracyjne płukanie stosujemy przy mocno zaschniętych głowicach lub trwałych brakach dysz.' },
    { id: 'faq-28', title: 'Ploter pokazuje błąd głowicy — czy zawsze trzeba ją wymienić?', items: [], answer: 'Nie. Najpierw sprawdzamy drożność, elektronikę, połączenia, układ atramentowy i stan samej głowicy. Wymiana jest potrzebna dopiero przy trwałym uszkodzeniu.' },
    { id: 'faq-15', title: 'Dlaczego medium przesuwa się krzywo albo marszczy?', items: [], answer: 'Najczęściej problem dotyczy rolek, prowadnic, ustawienia posuwu, zabrudzenia toru medium albo nieprawidłowej kalibracji podawania.' },
    { id: 'faq-16', title: 'Dlaczego karetka hałasuje albo zatrzymuje się podczas pracy?', items: [], answer: 'Możliwą przyczyną jest zabrudzona prowadnica, zużyty pasek, enkoder, silnik albo mechaniczne zablokowanie karetki.' },
    { id: 'faq-17', title: 'Ploter pokazuje błąd, ale nadal się uruchamia — czy można go dalej używać?', items: [], answer: 'Zależy od rodzaju błędu. Dalsza praca z usterką mechaniczną, układu atramentowego lub elektroniki może powodować kolejne uszkodzenia. Najlepiej przekazać nam kod błędu lub zdjęcie komunikatu do wstępnej diagnozy.' },
    { id: 'faq-18', title: 'Ploter nie włącza się — co może być przyczyną?', items: [], answer: 'Problem może dotyczyć zasilacza, płyty sterującej, okablowania lub innego elementu elektroniki. Po diagnozie ustalamy, czy możliwa jest naprawa podzespołu, czy potrzebna jest jego wymiana.' },
    { id: 'faq-19', title: 'Czy problemy z jakością wydruku zawsze oznaczają awarię?', items: [], answer: 'Nie. Część problemów wynika z niewłaściwej kalibracji, ustawień materiału, profilu kolorystycznego, sterownika lub RIP. Sprawdzamy zarówno stan techniczny plotera, jak i ustawienia wpływające na jakość wydruku.' },
    { id: 'faq-26', title: 'Dlaczego kolory na wydruku różnią się od projektu?', items: [], answer: 'Przyczyną może być niewłaściwy profil ICC, ustawienia RIP, inny rodzaj atramentu lub medium albo brak kalibracji kolorystycznej.' },
    { id: 'faq-27', title: 'Czy wykonujecie profile ICC do plotera?', items: [], answer: 'Tak. Profil może zostać przygotowany pod konkretny ploter, atrament i medium, aby poprawić odwzorowanie i powtarzalność kolorów.' },
    { id: 'faq-20', title: 'Czy konfigurujecie RIP i ustawienia mediów?', items: [], answer: 'Tak. Konfigurujemy parametry RIP, komunikację z ploterem, ustawienia materiałów oraz podstawowe parametry kolorystyczne.' },
    { id: 'faq-21', title: 'Jak często warto wykonywać konserwację plotera?', items: [], answer: 'Częstotliwość zależy od intensywności pracy, rodzaju atramentu i warunków eksploatacji. Przy regularnie używanych urządzeniach warto wykonywać okresową kontrolę i konserwację, zanim pojawią się problemy z głowicą, prowadzeniem mediów lub mechaniką.' },
    { id: 'faq-22', title: 'Co obejmuje pełna konserwacja plotera?', items: [], answer: 'Obejmuje czyszczenie wnętrza i toru mediów, kontrolę karetki, napędu, stacji serwisowej i układu atramentowego, kontrolę elementów mechanicznych, kalibrację oraz końcowy test wydruku i podawania mediów.' },
  ]
}

export const createPlotterPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applyPlotterDojazdSection(sections)
  applyPlotterCleaningSection(sections)
  applyPlotterFaqSection(sections)

  const repairsSection = sections.find(s => s.id === 'naprawy')
  if (repairsSection) {
    repairsSection.title = 'Naprawy i usługi serwisowe'
    repairsSection.subcategories = [
      {
        id: 'plotter-mechanics',
        title: 'Transport i podawanie mediów',
        items: [
          { service: 'Usuwanie zacięć w torze mediów\n(papier lub materiał blokuje się podczas druku)' },
          { service: 'Regulacja toru przesuwu mediów\n(krzywe prowadzenie, przekosy wydruku)' },
          { service: 'Czyszczenie i regulacja rolek transportowych\n(ślizganie, nierówne lub przerywane podawanie)' },
          { service: 'Wymiana rolek transportowych\n(zużyte rolki, problemy z pobieraniem materiału)' },
          { service: 'Naprawa mechanizmu podawania roli\n(brak pobierania lub rozwijania materiału)' },
          { service: 'Wymiana mechanizmu podawania roli\n(uszkodzony mechanizm podawania lub rozwijania roli)' },
          { service: 'Naprawa obcinaka papieru\n(papier nie jest odcinany lub zacina się przy cięciu)' },
          { service: 'Wymiana obcinaka papieru\n(tępy, wyszczerbiony lub złamany nóż, uszkodzony wózek obcinaka)' },
        ],
      },
      {
        id: 'plotter-carriage',
        title: 'Karetka i mechanizm napędu',
        items: [
          { service: 'Czyszczenie i konserwacja prowadnicy karetki\n(głośna praca, nierówny ruch karetki)' },
          { service: 'Wymiana paska napędu karetki\n(przeskakiwanie, hałas lub brak ruchu karetki)' },
          { service: 'Wymiana enkodera\n(błędy pozycjonowania, nierówny lub przesunięty wydruk)' },
          { service: 'Wymiana taśmy sygnałowej karetki\n(błędy komunikacji z głowicą, przerywanie pracy)' },
          { service: 'Naprawa napędu karetki\n(karetka nie porusza się lub zatrzymuje podczas pracy)' },
          { service: 'Wymiana silnika napędu karetki\n(brak ruchu, błędy napędu lub zatrzymywanie karetki)' },
          { service: 'Wymiana karetki\n(uszkodzenie mechanizmu lub mocowania głowicy)' },
        ],
      },
      {
        id: 'plotter-ink',
        title: 'Głowica i układ atramentowy',
        items: [
          { service: 'Czyszczenie / udrażnianie głowicy\n(brakujące linie, kolory lub dysze)' },
          { service: 'Regeneracyjne płukanie głowicy drukującej\n(zaschnięta głowica, brak dysz lub trwałe przerwy w wydruku mimo standardowego czyszczenia)' },
          { service: 'Wymiana głowicy drukującej\n(uszkodzona głowica, trwałe problemy z wydrukiem)' },
          { service: 'Czyszczenie / regeneracja stacji serwisowej\n(zasychanie głowicy, smugi, problemy z czyszczeniem)' },
          { service: 'Wymiana stacji serwisowej\n(brak prawidłowego czyszczenia lub parkowania głowicy)' },
          { service: 'Odpowietrzanie układu atramentowego\n(powietrze w przewodach, przerywany wydruk)' },
          { service: 'Płukanie układu atramentowego\n(zaschnięty lub zanieczyszczony atrament)' },
          { service: 'Naprawa układu zasilania atramentem / damperów / przewodów\n(brak dopływu tuszu, zapowietrzenie, nierówny kolor lub problem z zasilaniem głowicy)' },
          { service: 'Wymiana układu zasilania atramentem\n(uszkodzony układ doprowadzania atramentu)' },
        ],
      },
      {
        id: 'plotter-electronics',
        title: 'Elektronika, zasilanie i czujniki',
        items: [
          { service: 'Wymiana czujników\n(błędy papieru, pokrywy, pozycji lub ruchu)' },
          { service: 'Naprawa okablowania i połączeń\n(losowe błędy, zaniki komunikacji)' },
          { service: 'Naprawa zasilacza\n(ploter nie uruchamia się lub wyłącza podczas pracy)' },
          { service: 'Wymiana zasilacza\n(brak zasilania lub uszkodzony moduł zasilający)' },
          { service: 'Naprawa płyty sterującej\n(brak komunikacji, błędy elektroniki lub sterowania)' },
          { service: 'Wymiana płyty sterującej\n(uszkodzona płyta główna lub moduł sterujący)' },
        ],
      },
      {
        id: 'plotter-calibration',
        title: 'Kalibracja i jakość wydruku',
        items: [
          { service: 'Kalibracja przesuwu mediów\n(przesunięcia, nierówne odstępy lub przekosy)' },
          { service: 'Kalibracja głowicy i pozycjonowania\n(rozjechane linie, kontury lub kolory)' },
          { service: 'Profilowanie kolorystyczne ICC\n(nieprawidłowe odwzorowanie kolorów lub potrzeba dopasowania plotera do konkretnego atramentu i medium)' },
          { service: 'Kontrola jakości wydruku i korekta ustawień\n(spadek jakości bez awarii — ustawienia materiału, gęstości lub prędkości)' },
        ],
      },
      {
        id: 'plotter-software',
        title: 'Oprogramowanie i konfiguracja',
        items: [
          { service: 'Aktualizacja firmware\n(błędy oprogramowania lub problemy ze stabilnością)' },
          { service: 'Instalacja / konfiguracja sterowników\n(komputer nie widzi plotera lub drukuje nieprawidłowo)' },
          { service: 'Konfiguracja sieciowa\n(brak połączenia z ploterem przez sieć)' },
          { service: 'Konfiguracja oprogramowania RIP\n(problemy z wysyłaniem zadań, ustawieniami mediów, kolorów lub komunikacją z ploterem)' },
        ],
      },
    ]
  }

  return sections
}
