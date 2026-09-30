import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

const apply3DPrinterCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PEŁNA KONSERWACJA\u2028[[kompleksowe ]]czyszczenie, kontrola i kalibracja drukarki 3D\n• dokładne czyszczenie wnętrza drukarki, prowadnic, śrub, osi i stołu roboczego,\n• **czyszczenie hotendu, dyszy i ekstrudera oraz kontrola układu podawania filamentu,**\n• kontrola i regulacja pasków, prowadnic, łożysk i mechanizmów napędowych,\n• smarowanie wymagających tego elementów mechanicznych,\n• kontrola czujników, krańcówek, chłodzenia i podstawowych połączeń,\n• kalibracja stołu i osi oraz końcowy test wydruku i korekta parametrów.',
    },
  ]
}

const apply3DPrinterRepairsSection = (sections: PricingSection[]) => {
  const repairsSection = sections.find(s => s.id === 'naprawy')
  if (!repairsSection) return
  repairsSection.subcategories = [
    {
      id: '3d-mechanics',
      title: 'Mechanika i układ ruchu',
      items: [
        { service: 'Regulacja i kalibracja osi X / Y / Z\n(przesunięcia warstw, nierówny ruch, stuki podczas pracy)' },
        { service: 'Regulacja pasków i napinaczy\n(luzy, przeskakiwanie, utrata dokładności druku)' },
        { service: 'Wymiana pasków i napinaczy\n(zużyte lub uszkodzone elementy napędu osi)' },
        { service: 'Wymiana łożysk i rolek prowadzących\n(luzy, hałas, nierówny ruch osi)' },
        { service: 'Serwis / regulacja osi Z\n(zacinanie osi, nierówne warstwy, problemy z ruchem Z)' },
        { service: 'Wymiana śruby lub prowadnicy osi Z\n(wygięta śruba, luz na nakrętce, zużyta lub krzywa prowadnica osi Z)' },
        { service: 'Wymiana silnika krokowego\n(brak ruchu osi, przeskakiwanie lub głośna praca)' },
      ],
    },
    {
      id: '3d-extruder',
      title: 'Ekstruder, hotend i podawanie filamentu',
      items: [
        { service: 'Czyszczenie układu podawania filamentu\n(ślizganie filamentu, nieregularne podawanie)' },
        { service: 'Usuwanie zatoru hotendu\n(zatkana dysza, brak lub słaby wypływ filamentu)' },
        { service: 'Wymiana dyszy\n(zużyta lub uszkodzona dysza, pogorszenie jakości druku)' },
        { service: 'Naprawa ekstrudera\n(filament nie jest prawidłowo podawany lub przeskakuje)' },
        { service: 'Naprawa systemu AMS / podajnika wielomateriałowego\n(filament blokuje się, nie jest wykrywany lub nie przełącza się prawidłowo)' },
        { service: 'Wymiana ekstrudera\n(uszkodzony mechanizm podawania filamentu)' },
        { service: 'Naprawa hotendu\n(wycieki filamentu, problemy z nagrzewaniem lub ekstruzją)' },
        { service: 'Wymiana hotendu\n(uszkodzony lub zużyty zespół hotendu)' },
      ],
    },
    {
      id: '3d-heating',
      title: 'Stół, grzanie i chłodzenie',
      items: [
        { service: 'Naprawa układu grzania stołu\n(stół nie nagrzewa się lub nie utrzymuje temperatury)' },
        { service: 'Wymiana grzałki hotendu\n(hotend nie nagrzewa się lub zgłasza błąd temperatury)' },
        { service: 'Wymiana termistora / czujnika temperatury\n(błędny odczyt temperatury, przerwanie wydruku)' },
        { service: 'Wymiana wentylatora\n(brak chłodzenia, hałas lub przegrzewanie)' },
        { service: 'Naprawa układu chłodzenia wydruku\n(deformacje, słaba jakość mostów lub przegrzewanie modelu)' },
      ],
    },
    {
      id: '3d-electronics',
      title: 'Elektronika, zasilanie i czujniki',
      items: [
        { service: 'Naprawa płyty głównej\n(brak reakcji, resetowanie lub błędy sterowania)' },
        { service: 'Wymiana płyty głównej\n(uszkodzona elektronika sterująca)' },
        { service: 'Naprawa zasilacza\n(brak zasilania lub wyłączanie się drukarki)' },
        { service: 'Wymiana zasilacza\n(uszkodzony zasilacz — naprawa nieopłacalna lub niemożliwa)' },
        { service: 'Wymiana czujników i krańcówek\n(błędy osi, bazowania lub poziomowania)' },
        { service: 'Naprawa okablowania i złączy\n(przerywanie pracy, zaniki sygnału lub niestabilność)' },
        { service: 'Naprawa panelu sterowania\n(brak obrazu, dotyku lub reakcji panelu)' },
        { service: 'Wymiana ekranu / panelu sterowania\n(pęknięty ekran, martwy dotyk lub uszkodzony moduł panelu)' },
      ],
    },
    {
      id: '3d-calibration',
      title: 'Kalibracja i jakość druku',
      items: [
        { service: 'Kalibracja i poziomowanie stołu\n(problemy z pierwszą warstwą, słaba przyczepność)' },
        { service: 'Kalibracja ekstrudera i przepływu\n(niedolewanie, przelewanie lub nierówna ekstruzja)' },
        { service: 'Kalibracja retrakcji\n(nitkowanie, wycieki filamentu podczas ruchów jałowych)' },
        { service: 'Kalibracja osi i geometrii drukarki\n(przekoszenia, błędy wymiarów lub przesunięcia warstw)' },
        { service: 'Kalibracja PID temperatury\n(wahania temperatury hotendu lub stołu)' },
        { service: 'Kalibracja profilu materiału\n(problemy z drukiem PLA, PETG, ABS, ASA, TPU lub innych materiałów)' },
      ],
    },
    {
      id: '3d-software',
      title: 'Oprogramowanie i konfiguracja',
      items: [
        { service: 'Aktualizacja firmware\n(błędy oprogramowania lub problemy po aktualizacji)' },
        { service: 'Instalacja / konfiguracja Marlin lub Klipper\n(konfiguracja sterowania lub zmiana firmware)' },
        { service: 'Konfiguracja slicera\n(nieprawidłowe parametry lub problemy z przygotowaniem wydruku)' },
        { service: 'Konfiguracja sieci i zdalnego sterowania\n(OctoPrint, Klipper UI lub dostęp przez sieć)' },
        { service: 'Backup / przywracanie konfiguracji\n(po awarii, aktualizacji lub wymianie elektroniki)' },
      ],
    },
    {
      id: '3d-resin',
      title: 'Drukarki żywiczne SLA / MSLA / DLP',
      items: [
        { service: 'Czyszczenie i konserwacja wanny żywicy\n(pozostałości żywicy, zabrudzenia lub problemy z wydrukiem)' },
        { service: 'Wymiana folii FEP / nFEP\n(uszkodzona, porysowana lub nieszczelna folia)' },
        { service: 'Kalibracja platformy roboczej\n(wydruk nie przykleja się lub odkleja się podczas pracy)' },
        { service: 'Wymiana matrycy LCD\n(martwe piksele, brak utwardzania lub uszkodzony ekran)' },
        { service: 'Naprawa układu UV\n(żywica nie utwardza się lub wydruk jest niepełny)' },
        { service: 'Wymiana modułu UV\n(zużyte lub uszkodzone diody / matryca LED UV)' },
        { service: 'Naprawa mechanizmu osi Z\n(problemy z ruchem platformy lub nierówne warstwy)' },
      ],
    },
    {
      id: '3d-additional',
      title: 'Modyfikacje i ulepszenia',
      items: [
        { service: 'Montaż i konfiguracja auto-levelingu\n(BL-Touch, CR-Touch lub podobny system)' },
        { service: 'Upgrade ekstrudera\n(direct drive lub wydajniejszy układ podawania)' },
        { service: 'Upgrade hotendu\n(all-metal lub hotend do wyższych temperatur)' },
        { service: 'Modyfikacja pod materiały techniczne\n(ABS, ASA, nylon, PC, materiały z włóknem CF/GF)' },
        { service: 'Montaż dodatkowych czujników i modułów\n(czujnik filamentu, kamera, ADXL, dodatkowe moduły sterujące)' },
      ],
    },
  ]
}

const apply3DPrinterFaqSection = (sections: PricingSection[]) => {
  const faq = sections.find(section => section.id === 'faq')
  if (!faq) return
  faq.subcategories = [
    { id: 'faq-1', title: 'Jak wygląda proces naprawy drukarki 3D?', items: [], answer: 'Najpierw wykonujemy wstępną diagnozę, następnie pełną diagnostykę urządzenia i podajemy dokładny koszt oraz termin naprawy. Prace rozpoczynamy dopiero po akceptacji Klienta.' },
    { id: 'faq-2', title: 'Ile kosztuje diagnoza drukarki 3D?', items: [], answer: 'Wstępna diagnoza online oraz przy dostarczeniu urządzenia jest bezpłatna. Pełna diagnoza również jest bezpłatna przy realizacji naprawy. W przypadku rezygnacji koszt pełnej diagnozy wynosi 150 zł netto.' },
    { id: 'faq-3', title: 'Ile trwa naprawa?', items: [], answer: 'Większość standardowych napraw wykonujemy w ciągu 1–3 dni roboczych. Czas może się wydłużyć przy złożonych usterkach elektroniki lub konieczności zamówienia części.' },
    { id: 'faq-4', title: 'Jakie technologie drukarek 3D serwisujecie?', items: [], answer: 'Serwisujemy drukarki filamentowe FDM oraz żywiczne SLA / MSLA / DLP. Zakres napraw zależy od technologii i konstrukcji konkretnego urządzenia.' },
    { id: 'faq-5', title: 'Jakie marki serwisujecie?', items: [], answer: 'Serwisujemy m.in. Bambu Lab, Prusa, Creality, Anycubic, Elegoo, Zortrax, FlashForge oraz inne popularne marki. Przed przyjęciem możemy potwierdzić możliwość naprawy konkretnego modelu.' },
    { id: 'faq-6', title: 'Czy warto naprawiać tanią lub starszą drukarkę 3D?', items: [], answer: 'To zależy od rodzaju awarii, ceny części i wartości urządzenia. Po diagnozie informujemy, czy naprawa jest ekonomicznie uzasadniona.' },
    { id: 'faq-7', title: 'Czy części są wliczone w cenę?', items: [], answer: 'Jeżeli przy usłudze widnieje „+ części”, podana cena obejmuje robociznę, a części są rozliczane osobno. Ich koszt podajemy przed naprawą.' },
    { id: 'faq-8', title: 'Czy udzielacie gwarancji na naprawę?', items: [], answer: 'Tak. Na wykonane naprawy udzielamy gwarancji od 3 do 12 miesięcy, zależnie od rodzaju pracy i zastosowanych części.' },
    { id: 'faq-9', title: 'Czy muszę dostarczyć drukarkę do serwisu?', items: [], answer: 'Nie musisz. Jeśli możesz bezpiecznie przewieźć urządzenie, możesz dostarczyć je samodzielnie. Jeśli transport jest utrudniony, możesz zamówić odbiór zgodnie z cennikiem.' },
    { id: 'faq-10', title: 'Dlaczego drukarka nie podaje filamentu?', items: [], answer: 'Przyczyną może być zatkana dysza, zabrudzony lub uszkodzony ekstruder, niewłaściwy docisk filamentu, problem z hotendem albo silnikiem podawania.' },
    { id: 'faq-25', title: 'Drukarka Bambu Lab ma problem z AMS — czy to naprawiacie?', items: [], answer: 'Tak. Serwisujemy systemy AMS i AMS lite, w tym mechanizmy podawania, czujniki filamentu, prowadnice oraz problemy z ładowaniem i przełączaniem materiału.' },
    { id: 'faq-11', title: 'Dlaczego filament przeskakuje w ekstruderze?', items: [], answer: 'Najczęściej powoduje to zator hotendu, zbyt niska temperatura, nadmierny opór filamentu albo problem z mechanizmem ekstrudera.' },
    { id: 'faq-12', title: 'Dlaczego pierwsza warstwa nie przykleja się do stołu?', items: [], answer: 'Przyczyną może być nieprawidłowe poziomowanie, zła wysokość dyszy, zabrudzona powierzchnia stołu, niewłaściwa temperatura lub błędne ustawienia pierwszej warstwy.' },
    { id: 'faq-13', title: 'Dlaczego warstwy przesuwają się podczas druku?', items: [], answer: 'Najczęstsze przyczyny to niewłaściwe napięcie pasków, luzy mechaniczne, problem z prowadnicami, silnikiem krokowym albo zbyt duża prędkość lub przyspieszenie.' },
    { id: 'faq-14', title: 'Dlaczego na wydruku pojawia się stringing?', items: [], answer: 'Stringing może wynikać z niewłaściwej retrakcji, temperatury, wilgotnego filamentu lub ustawień slicera. Sprawdzamy zarówno mechanikę, jak i parametry druku.' },
    { id: 'faq-15', title: 'Dlaczego hotend nie nagrzewa się albo pokazuje błędną temperaturę?', items: [], answer: 'Problem może dotyczyć grzałki, termistora, przewodów, płyty sterującej albo konfiguracji firmware.' },
    { id: 'faq-16', title: 'Dlaczego stół grzewczy nie osiąga temperatury?', items: [], answer: 'Przyczyną może być grzałka stołu, czujnik temperatury, zasilacz, okablowanie albo elektronika sterująca.' },
    { id: 'faq-17', title: 'Drukarka wydaje nietypowe dźwięki podczas ruchu — co sprawdzacie?', items: [], answer: 'Kontrolujemy paski, napinacze, rolki, łożyska, prowadnice, śruby osi Z oraz silniki krokowe.' },
    { id: 'faq-18', title: 'Czy problem może wynikać tylko z ustawień slicera lub firmware?', items: [], answer: 'Tak. Nie wszystkie problemy oznaczają awarię mechaniczną. Błędny profil materiału, slicer, firmware lub kalibracja mogą powodować objawy podobne do uszkodzenia drukarki.' },
    { id: 'faq-19', title: 'Czy konfigurujecie Klipper, Marlin i slicery?', items: [], answer: 'Tak. Wykonujemy instalację i konfigurację firmware, Klipper / Marlin, slicerów, profili materiałów oraz zdalnego sterowania.' },
    { id: 'faq-20', title: 'Czy wykonujecie modyfikacje i ulepszenia?', items: [], answer: 'Tak. Montujemy m.in. auto-leveling, ulepszone ekstrudery, hotendy, czujniki oraz dodatkowe moduły.' },
    { id: 'faq-21', title: 'Dlaczego wydruk żywiczny nie trzyma się platformy?', items: [], answer: 'Najczęstsze przyczyny to niewłaściwe poziomowanie platformy, błędny czas ekspozycji, problem z folią FEP/nFEP albo stan żywicy.' },
    { id: 'faq-22', title: 'Kiedy trzeba wymienić folię FEP / nFEP?', items: [], answer: 'Gdy jest uszkodzona, przebita, mocno porysowana, zmętniała albo powoduje problemy z odrywaniem kolejnych warstw.' },
    { id: 'faq-23', title: 'Jak rozpoznać uszkodzoną matrycę LCD w drukarce żywicznej?', items: [], answer: 'Typowe objawy to brak utwardzania w części pola roboczego, martwe obszary, pasy lub powtarzające się braki w modelach. Matrycę sprawdzamy przed decyzją o wymianie.' },
    { id: 'faq-24', title: 'Jak przygotować drukarkę 3D do transportu?', items: [], answer: 'Przed transportem skontaktuj się z nami. W drukarce FDM należy zabezpieczyć ruchome elementy, stół i głowicę. W urządzeniu żywicznym należy opróżnić zbiornik z żywicy i zabezpieczyć wannę, platformę oraz oś Z.' },
    { id: 'faq-26', title: 'Ile kosztuje odbiór lub dostawa drukarki 3D?', items: [], answer: 'Odbiór lub dostawa do 2,5 km od serwisu kosztuje 20 zł netto. Przy dłuższej trasie doliczamy 1,5 zł netto za każdy kilometr powyżej 5 km łącznej trasy w obie strony.' },
    { id: 'faq-27', title: 'Jak często wykonywać konserwację drukarki 3D?', items: [], answer: 'Przy codziennym druku zalecamy konserwację co 3–6 miesięcy, a wcześniej, gdy pojawiają się stuki, przesunięcia warstw, problemy z pierwszą warstwą lub nierówna ekstruzja.' },
  ]
}

export const create3DPrinterPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()

  apply3DPrinterCleaningSection(sections)

  apply3DPrinterRepairsSection(sections)
  apply3DPrinterFaqSection(sections)

  return sections
}

// Cennik dla 'druk-3d-na-zamowienie': te same sekcje co serwis-drukarek-3d,
// ale pierwsza sekcja ("Diagnoza i wycena") zastąpiona cennikiem druku 3D
// z gotowego projektu. Zmiana dotyczy WYŁĄCZNIE tej usługi — serwis-drukarek-3d
// nadal korzysta z create3DPrinterPricingSections() bez zmian.

export const createDruk3DZamowieniePricingSections = (): PricingSection[] => {
  const sections = create3DPrinterPricingSections()

  const diagnosisIndex = sections.findIndex(section => section.id === 'diagnoza')
  if (diagnosisIndex !== -1) {
    sections[diagnosisIndex] = {
      id: 'diagnoza',
      title: 'Drukowanie 3D z gotowego projektu',
      items: [
        { service: 'Przygotowanie wydruku', },
        { service: 'PLA\nstandardowy materiał do prototypów, modeli i elementów dekoracyjnych', },
        { service: 'PETG\nwytrzymały i odporny na wilgoć, do części użytkowych i technicznych', },
        { service: 'ABS / ASA\nwytrzymałe materiały do części technicznych i odpornych na temperaturę', },
        { service: 'TPU\nelastyczny materiał do uszczelek, osłon i elementów giętkich', },
        { service: 'Realizacja ekspresowa\nrealizacja tego samego dnia, jeśli pozwala na to czas druku', },
        { service: 'Wysyłka\nwysyłka kurierem lub do paczkomatu', },
      ],
      priceFormula: 'Cena końcowa = przygotowanie wydruku + materiał + czas druku',
      example: 'Przykład: Wydruk z PLA 100 g materiału przy 5 godzinach druku — 25 zł (przygotowanie wydruku) + 100 g materiału × 0,30 zł/gram + 5 godz. druku × 8 zł/h = 95 zł',
    }

    // Cennik projektowania modeli 3D — używa dokładnie tego samego
    // układu/komponentu co "Druk 3D z gotowego projektu", dlatego id jest
    // dodany do DRUK3D_CUSTOM_SECTION_IDS w service-accordion.tsx.
    sections.splice(diagnosisIndex + 1, 0, {
      id: 'projektowanie-modeli',
      title: 'Projektowanie i modelowanie 3D CAD',
      mobileTitle: 'Projektowanie 3D CAD',
      items: [
        { service: 'Wstępna ocena projektu\nsprawdzenie możliwości wykonania i zakresu prac', },
        { service: 'Mała modyfikacja pliku STL\nzmiana wymiaru, otworu, naprawa lub drobna korekta modelu', },
        { service: 'Prosty model techniczny\nna podstawie wymiarów, szkicu lub rysunku technicznego', },
        { service: 'Odtworzenie prostej części\nna podstawie wzoru, zdjęć i dokładnych wymiarów', },
        { service: 'Projekt techniczny średniej złożoności\nnp. obudowa, uchwyt, adapter lub bardziej złożony element', },
        { service: 'Dodatkowa praca projektowa\npo przekroczeniu czasu zawartego w wybranej usłudze', },
        { service: 'Dodatkowy pakiet poprawek\nzmiany w gotowym projekcie po jego akceptacji', },
      ],
    })
  }

  // Osobny FAQ tylko dla tej strony (dotyczący druku 3D na zamówienie,
  // projektowania modeli, modyfikacji plików, materiałów, terminów, wysyłki
  // i odtwarzania części) — nie nadpisuje wspólnej listy pytań, bo `faq`
  // w `sections` jest już osobnym klonem (patrz createFaqSection/cloneSections).
  const faqIndex = sections.findIndex(section => section.id === 'faq')
  if (faqIndex !== -1) {
    sections[faqIndex] = {
      ...sections[faqIndex],
      subcategories: [
        {
          id: 'faq-13',
          title: 'Usługi drukowania 3D na zlecenie – jak wygląda realizacja zamówienia?',
          items: [],
          answer: 'Po otrzymaniu modelu sprawdzamy możliwość wykonania, przygotowujemy wycenę i po jej akceptacji rozpoczynamy realizację. Wykonujemy zarówno pojedyncze elementy, jak i krótkie serie.',
        },
        {
          id: 'faq-16',
          title: 'Drukowanie 3D online – jak zamówić wydruk 3D online?',
          items: [],
          answer: 'Wyślij nam plik z modelem, a sprawdzimy możliwość wykonania i przygotujemy wycenę. Po jej akceptacji wykonamy wydruk, który możesz odebrać osobiście lub zamówić z wysyłką.',
        },
        {
          id: 'faq-1',
          title: 'Czy mogę zamówić druk 3D bez gotowego modelu?',
          items: [],
          answer: 'Tak. Możesz przesłać zdjęcia, szkic, dokładne wymiary lub dostarczyć istniejący element. Najpierw bezpłatnie ocenimy możliwość wykonania projektu, a następnie podamy koszt jego przygotowania.',
        },
        {
          id: 'faq-2',
          title: 'Jakie pliki mogę przesłać do druku 3D?',
          items: [],
          answer: 'Najlepiej przesłać gotowy model w formacie STL, STEP lub 3MF. Jeśli masz plik w innym formacie, prześlij go do wstępnej oceny — sprawdzimy, czy możemy go wykorzystać lub odpowiednio przygotować.',
        },
        {
          id: 'faq-8',
          title: 'Czy możecie poprawić lub zmodyfikować mój plik STL?',
          items: [],
          answer: 'Tak. Możemy wykonać drobne zmiany, takie jak korekta wymiarów, otworów, dopasowania lub innych prostych elementów modelu. Większe modyfikacje wyceniamy jako pracę projektową.',
        },
        {
          id: 'faq-3',
          title: 'Cennik druku 3D – koszt i wycena wydruku 3D',
          items: [],
          answer: 'Cena wydruku 3D zależy od materiału, jego zużycia oraz czasu pracy drukarki. Dokładną cenę podajemy przed rozpoczęciem realizacji, zgodnie z cennikiem znajdującym się na stronie.',
        },
        {
          id: 'faq-4',
          title: 'Ile kosztuje zaprojektowanie modelu 3D?',
          items: [],
          answer: 'Zależy to od zakresu projektu. Wstępna ocena projektu jest bezpłatna, a ceny prostych modyfikacji, modeli technicznych oraz odtwarzania części są podane w cenniku. Jeżeli projekt wymaga więcej pracy, dodatkowy czas rozliczamy zgodnie z podaną stawką.',
        },
        {
          id: 'faq-15',
          title: 'Czy podane ceny są netto czy brutto?',
          items: [],
          answer: 'Ceny w cenniku są cenami netto.',
        },
        {
          id: 'faq-6',
          title: 'Prototypowanie 3D i drukowanie modeli, części i elementów 3D – czy można zamówić jedną sztukę?',
          items: [],
          answer: 'Tak. Wykonujemy zarówno pojedyncze sztuki, jak i krótkie serie – zależnie od potrzeb klienta i rodzaju projektu.',
        },
        {
          id: 'faq-12',
          title: 'Czy mogę zamówić kilka lub kilkadziesiąt takich samych elementów?',
          items: [],
          answer: 'Tak. Druk 3D dobrze sprawdza się przy prototypach oraz krótkich seriach produkcyjnych. Przy większej liczbie sztuk możemy wcześniej sprawdzić ustawienie produkcji i sposób wykonania, aby uzyskać powtarzalne elementy.',
        },
        {
          id: 'faq-7',
          title: 'Czy możecie odtworzyć uszkodzoną lub niedostępną część?',
          items: [],
          answer: 'Tak. Proste części możemy odtworzyć na podstawie dostarczonego wzoru, zdjęć i dokładnych wymiarów. Przy bardziej skomplikowanej geometrii możemy poprosić o dostarczenie oryginalnego elementu, aby dokładniej odwzorować jego kształt.',
        },
        {
          id: 'faq-17',
          title: 'Drukowanie figurek 3D i drukowanie części samochodowych – czy wykonujemy też uszczelki 3D?',
          items: [],
          answer: 'Tak. W zależności od projektu wykonujemy figurki, części samochodowe oraz drukowanie uszczelek 3D z odpowiednio dobranego materiału. Przed realizacją sprawdzamy model i dobieramy materiał do zastosowania elementu.',
        },
        {
          id: 'faq-5',
          title: 'Jaki materiał wybrać: PLA, PETG, ABS/ASA czy TPU?',
          items: [],
          answer: 'Drukowanie FDM wykonujemy z PLA, PETG, ASA i TPU. Materiał dobieramy przede wszystkim do zastosowania elementu. PLA dobrze sprawdza się przy modelach i prototypach, PETG przy częściach użytkowych, ABS/ASA przy elementach technicznych i narażonych na temperaturę, a TPU przy częściach elastycznych. Jeśli nie wiesz, który materiał wybrać, doradzimy przed realizacją.',
        },
        {
          id: 'faq-9',
          title: 'Jak dokładny jest wydruk 3D?',
          items: [],
          answer: 'Dokładność zależy od geometrii modelu, materiału, orientacji wydruku i wymaganych pasowań. Jeżeli konkretny wymiar jest szczególnie ważny — na przykład otwór, średnica, zatrzask lub miejsce montażowe — zaznacz to przy składaniu zamówienia.',
        },
        {
          id: 'faq-10',
          title: 'Czy wydrukowana część będzie tak samo wytrzymała jak oryginał?',
          items: [],
          answer: 'Nie zawsze. Wytrzymałość zależy od materiału, konstrukcji elementu, kierunku warstw i warunków, w których część będzie pracowała. Jeśli uznamy, że druk 3D nie będzie odpowiednim rozwiązaniem do danego zastosowania, poinformujemy o tym przed realizacją.',
        },
        {
          id: 'faq-11',
          title: 'Ile trwa realizacja zamówienia?',
          items: [],
          answer: 'Standardowy czas realizacji wydruków wynosi zwykle 1–2 dni. Czas wykonania projektu zależy od jego złożoności. Dostępna jest również realizacja ekspresowa do 24 godzin, jeśli pozwala na to czas potrzebny na wykonanie wydruku.',
        },
        {
          id: 'faq-14',
          title: 'Czy wysyłacie gotowe wydruki?',
          items: [],
          answer: 'Tak. Gotowe zamówienie możemy wysłać kurierem lub do Paczkomatu. Koszt wysyłki naliczany jest według cennika przewoźnika.',
        },
      ],
    }
  }

  // Na tej stronie nie pokazujemy sekcji Dojazd / Czyszczenie i konserwacja /
  // Naprawy i usługi serwisowe — FAQ ma iść zaraz po "Projektowanie modeli 3D".
  return sections.filter(section => !['dojazd', 'konserwacja', 'naprawy'].includes(section.id))
}
