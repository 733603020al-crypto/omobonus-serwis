import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

const applyLaserCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PEŁNA KONSERWACJA\u2028[[kompleksowe ]]czyszczenie, kontrola i kalibracja drukarki\n• dokładne czyszczenie wnętrza drukarki z kurzu, pyłu papierowego i pozostałości tonera,\n• czyszczenie toru papieru, rolek poboru i transportu, separatorów oraz czujników,\n• czyszczenie optyki i układu laserowego,\n• kontrola stanu bębna, pasa transferowego, fusera i pojemnika na zużyty toner,\n• kontrola i konserwacja głównych elementów mechanicznych; smarowanie, jeśli przewiduje je producent,\n• kalibracja druku / kolorów (jeśli dotyczy) oraz końcowy test jakości wydruku i podawania papieru.',
    },
  ]
}

const applyLaserRepairsSection = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection) return
  repairsSection.subcategories = [
    {
      id: 'naprawy-mechanizm',
      title: 'Transport papieru, rolki i podajniki',
      items: [
        { service: 'Usuwanie zacięć i ciał obcych z toru papieru\n(papier zatrzymuje się, gniecie lub regularnie zacina)' },
        { service: 'Czyszczenie i regeneracja rolek pobierających / separatorów\n(drukarka nie pobiera papieru, ślizga się lub pobiera kilka kartek)' },
        { service: 'Wymiana rolek pobierających / separatorów\n(zużyte rolki powodują powtarzające się problemy z pobieraniem papieru)' },
        { service: 'Czyszczenie i regulacja toru papieru\n(papier przesuwa się krzywo, marszczy lub zatrzymuje w urządzeniu)' },
        { service: 'Naprawa czujników papieru\n(fałszywy komunikat o zacięciu, braku papieru lub błędnym położeniu arkusza)' },
        { service: 'Naprawa mechanizmu podawania papieru / sprzęgła / solenoidu\n(papier jest pobierany za wcześnie, za późno albo wcale)' },
        { service: 'Naprawa podajnika / kasety papieru\n(szuflada nie podaje papieru lub mechanizm podajnika pracuje nieprawidłowo)' },
        { service: 'Naprawa modułu druku dwustronnego (duplex)\n(papier zacina się lub nie jest prawidłowo obracany przy druku dwustronnym)' },
      ],
    },
    {
      id: 'naprawy-modul-obrazu',
      title: 'Bęben, developer i układ obrazowania',
      items: [
        { service: 'Czyszczenie układu obrazowania\n(szare tło, zabrudzenia, plamy lub powtarzające się ślady na wydruku)' },
        { service: 'Wymiana bębna / zespołu bębna\n(pasy, plamy, powtarzalne zabrudzenia lub zużyty moduł bębna)' },
        { service: 'Wymiana listwy czyszczącej bębna\n(toner pozostaje na bębnie i brudzi kolejne wydruki)' },
        { service: 'Serwis układu ładowania bębna / rolki ładującej\n(szare tło, nierówny wydruk lub problemy z prawidłowym ładowaniem bębna)' },
        { service: 'Serwis zespołu wywołującego / developera\n(nierównomierne krycie, blade pola lub problemy z nanoszeniem tonera)' },
        { service: 'Wymiana developera / zespołu wywołującego\n(trwałe problemy z jakością obrazu mimo prawidłowego tonera i bębna)' },
        { service: 'Kalibracja jakości obrazu i kolorów\n(kolory są przesunięte, nierówne lub wydruk nie ma prawidłowego krycia)' },
        { service: 'Obsługa / wymiana pojemnika na zużyty toner\n(komunikat o pełnym pojemniku lub zabrudzenie wnętrza urządzenia tonerem)' },
      ],
    },
    {
      id: 'naprawy-transfer',
      title: 'Pas transferowy i układ transferu',
      items: [
        { service: 'Czyszczenie pasa transferowego i rolek transferowych\n(smugi, zabrudzenia lub toner przenosi się na kolejne strony)' },
        { service: 'Wymiana pasa transferowego\n(kolorowe pasy, plamy, przesunięcia kolorów lub uszkodzona powierzchnia pasa)' },
        { service: 'Wymiana rolki transferowej\n(blade wydruki, nierówne przenoszenie tonera lub zabrudzenia)' },
        { service: 'Wymiana listwy czyszczącej pasa transferowego\n(pas nie jest prawidłowo oczyszczany i brudzi wydruki)' },
        { service: 'Naprawa mechanizmu napędu pasa transferowego\n(błąd transferu, zatrzymanie pasa lub nietypowe dźwięki podczas drukowania)' },
      ],
    },
    {
      id: 'naprawy-fuser',
      title: 'Zespół utrwalający (fuser)',
      items: [
        { service: 'Czyszczenie i kontrola zespołu utrwalającego\n(toner brudzi, papier wychodzi zabrudzony lub pojawiają się ślady na wydruku)' },
        { service: 'Regeneracja zespołu utrwalającego (fusera)\n(toner się rozmazuje, papier się marszczy lub fuser pracuje nieprawidłowo)' },
        { service: 'Wymiana folii grzewczej / wałka grzejnego\n(powtarzające się ślady, uszkodzona powierzchnia lub toner nie jest prawidłowo utrwalany)' },
        { service: 'Wymiana wałka dociskowego\n(papier marszczy się, ślizga lub toner jest nierówno utrwalany)' },
        { service: 'Naprawa układu grzania / termistora / czujnika temperatury\n(błąd temperatury, brak nagrzewania lub przegrzewanie fusera)' },
        { service: 'Wymiana kompletnego zespołu utrwalającego (fusera)\n(fuser jest trwale uszkodzony lub regeneracja nie jest opłacalna)' },
      ],
    },
    {
      id: 'naprawy-optyka-laser',
      title: 'Laser, LSU i optyka',
      items: [
        { service: 'Czyszczenie modułu lasera / optyki LSU\n(blade wydruki, białe pasy lub nierówny kontrast)' },
        { service: 'Naprawa modułu lasera / LSU\n(błąd lasera, brak obrazu lub nieprawidłowe naświetlanie bębna)' },
        { service: 'Wymiana modułu lasera / LSU\n(trwale uszkodzony moduł optyczny)' },
      ],
    },
    {
      id: 'naprawy-skaner',
      title: 'Skaner dokumentów i podajnik ADF',
      items: [
        { service: 'Czyszczenie i kalibracja skanera dokumentów\n(pasy, zabrudzenia lub zniekształcenia na skanach i kopiach)' },
        { service: 'Naprawa mechanizmu skanera\n(moduł skanera zatrzymuje się, hałasuje lub nie wykonuje skanu)' },
        { service: 'Naprawa podajnika dokumentów ADF\n(dokumenty nie są pobierane, zacinają się lub przesuwają krzywo)' },
        { service: 'Czyszczenie i regeneracja rolek / separatora ADF\n(ADF nie pobiera dokumentów lub pobiera kilka arkuszy jednocześnie)' },
        { service: 'Wymiana rolek / separatora ADF\n(zużyte elementy powodują powtarzające się problemy z podawaniem dokumentów)' },
        { service: 'Naprawa czujników ADF / skanera\n(urządzenie błędnie wykrywa dokument lub zgłasza zacięcie)' },
      ],
    },
    {
      id: 'naprawy-elektronika',
      title: 'Elektronika, zasilanie i panel sterowania',
      items: [
        { service: 'Naprawa zasilacza / układu zasilania\n(drukarka nie włącza się, wyłącza lub pracuje niestabilnie)' },
        { service: 'Wymiana zasilacza / modułu zasilania\n(trwale uszkodzony moduł zasilający)' },
        { service: 'Naprawa płyty głównej / formatera\n(drukarka zawiesza się, resetuje lub nie uruchamia prawidłowo)' },
        { service: 'Wymiana płyty głównej / formatera\n(trwale uszkodzona elektronika sterująca)' },
        { service: 'Naprawa układu wysokiego napięcia (HVPS)\n(problemy z ładowaniem bębna, transferem tonera lub jakością obrazu)' },
        { service: 'Naprawa portów USB / LAN\n(komputer lub sieć nie wykrywa drukarki)' },
        { service: 'Naprawa okablowania i taśm sygnałowych\n(losowe błędy, zaniki sygnału lub niestabilna praca urządzenia)' },
        { service: 'Naprawa panelu sterowania\n(przyciski, panel dotykowy lub ekran nie reagują prawidłowo)' },
        { service: 'Wymiana panelu sterowania / wyświetlacza\n(uszkodzony ekran lub moduł panelu)' },
        { service: 'Naprawa wentylatora / układu chłodzenia\n(hałas, przegrzewanie lub błąd wentylatora)' },
      ],
    },
    {
      id: 'naprawy-software',
      title: 'Oprogramowanie i konfiguracja',
      items: [
        { service: 'Instalacja i konfiguracja sterowników\n(komputer nie widzi drukarki lub drukowanie działa nieprawidłowo)' },
        { service: 'Konfiguracja sieci Wi-Fi / LAN\n(drukarka nie łączy się z siecią lub komputerami)' },
        { service: 'Konfiguracja AirPrint / Mopria / aplikacji producenta\n(brak możliwości drukowania z telefonu lub tabletu)' },
        { service: 'Aktualizacja firmware\n(problemy z oprogramowaniem urządzenia lub wymagane uaktualnienie producenta)' },
        { service: 'Przywrócenie ustawień i ponowna konfiguracja drukarki\n(problemy po błędnej zmianie ustawień lub resecie urządzenia)' },
        { service: 'Konfiguracja skanowania do komputera / folderu\n(skany nie trafiają do komputera lub udziału sieciowego)' },
        { service: 'Konfiguracja skanowania do e-mail / chmury\n(problemy z wysyłaniem skanów przez SMTP lub do usługi chmurowej)' },
        { service: 'Konfiguracja panelu webowego / ustawień sieciowych\n(problemy z IP, DHCP, DNS lub administracją urządzenia)' },
      ],
    },
  ]
}

const applyLaserFaqSection = (sections: PricingSection[]) => {
  const faq = sections.find(section => section.id === 'faq')
  if (!faq) return
  faq.subcategories = [
    { id: 'faq-1', title: 'Jak wygląda proces naprawy drukarki laserowej?', items: [], answer: 'Najpierw przeprowadzamy wstępną diagnozę i określamy możliwą przyczynę usterki. Następnie wykonujemy pełną diagnozę, podajemy dokładny koszt naprawy oraz termin realizacji. Naprawę rozpoczynamy dopiero po akceptacji Klienta.' },
    { id: 'faq-2', title: 'Ile kosztuje diagnoza drukarki laserowej?', items: [], answer: 'Wstępna diagnoza online oraz przy dostarczeniu urządzenia do serwisu jest bezpłatna. Pełna diagnoza również jest bezpłatna, jeśli realizujemy naprawę. W przypadku rezygnacji z naprawy obowiązuje cena wskazana w aktualnym cenniku dla odpowiedniej kategorii urządzenia.' },
    { id: 'faq-3', title: 'Ile trwa naprawa drukarki laserowej?', items: [], answer: 'Większość standardowych napraw wykonujemy w ciągu 1–3 dni roboczych. Bardziej złożone naprawy elektroniki, fusera lub oczekiwanie na części mogą wydłużyć ten czas. Dokładny termin podajemy po diagnozie.' },
    { id: 'faq-4', title: 'Jakie marki drukarek laserowych serwisujecie?', items: [], answer: 'Serwisujemy urządzenia wielu producentów, m.in. HP, Brother, Canon, Samsung, OKI, Kyocera, Xerox, Lexmark, Konica Minolta, Ricoh oraz inne popularne drukarki laserowe i urządzenia wielofunkcyjne.' },
    { id: 'faq-5', title: 'Czy warto naprawiać starszą drukarkę laserową?', items: [], answer: 'To zależy od rodzaju usterki, stanu urządzenia, dostępności części i kosztu naprawy. Po diagnozie informujemy, czy naprawa jest ekonomicznie uzasadniona.' },
    { id: 'faq-6', title: 'Dlaczego drukarka laserowa zacina papier?', items: [], answer: 'Najczęstsze przyczyny to zużyte lub zabrudzone rolki pobierające, separator, czujniki papieru, elementy toru papieru albo problem z zespołem utrwalającym.' },
    { id: 'faq-7', title: 'Dlaczego drukarka nie pobiera papieru?', items: [], answer: 'Najczęściej odpowiadają za to zabrudzone lub zużyte rolki pobierające, separator, sprzęgło, solenoid albo mechanizm podajnika.' },
    { id: 'faq-8', title: 'Dlaczego drukarka pobiera kilka kartek jednocześnie?', items: [], answer: 'Typową przyczyną jest zużyty separator papieru, rolki pobierające albo nieprawidłowa praca mechanizmu podajnika.' },
    { id: 'faq-9', title: 'Dlaczego pojawia się komunikat o zacięciu, mimo że w drukarce nie ma papieru?', items: [], answer: 'Możliwą przyczyną jest uszkodzony lub zabrudzony czujnik papieru, zablokowana flaga czujnika albo niewielki fragment papieru pozostawiony w torze.' },
    { id: 'faq-10', title: 'Dlaczego papier zacina się tylko przy druku dwustronnym?', items: [], answer: 'Jeżeli problem występuje tylko przy duplexie, przyczyną może być mechanizm odwracania arkusza, rolki, prowadnice lub czujniki modułu druku dwustronnego.' },
    { id: 'faq-11', title: 'Jak odróżnić problem z tonerem od zużytego bębna?', items: [], answer: 'Kończący się toner częściej powoduje ogólne i nierównomierne blaknięcie wydruku. Zużyty bęben częściej daje powtarzające się plamy, pasy, szare tło lub cień obrazu w regularnych odstępach. Dokładną przyczynę potwierdzamy podczas diagnozy.' },
    { id: 'faq-26', title: 'Dlaczego drukarka laserowa drukuje puste strony?', items: [], answer: 'Przyczyną może być nieprawidłowo zamontowany lub uszkodzony toner, problem z bębnem, układem obrazowania, transferem albo elektroniką sterującą. Jeżeli problem pojawił się bezpośrednio po wymianie tonera, najpierw sprawdzamy również sam wkład i jego montaż.' },
    { id: 'faq-12', title: 'Dlaczego na wydruku pojawiają się pasy, smugi albo plamy?', items: [], answer: 'Takie objawy mogą powodować zużyty bęben, listwa czyszcząca, pas transferowy, toner, developer albo zabrudzony układ optyczny.' },
    { id: 'faq-13', title: 'Dlaczego na kartce pojawiają się powtarzające się ślady lub „duszek” obrazu?', items: [], answer: 'Powtarzające się zabrudzenia lub tzw. ghosting najczęściej wskazują na problem z bębnem, listwą czyszczącą, fuserem albo innym obracającym się elementem układu obrazowania.' },
    { id: 'faq-14', title: 'Dlaczego toner ściera się z kartki lub wydruk się rozmazuje?', items: [], answer: 'Najczęściej problem dotyczy zespołu utrwalającego (fusera), który nie osiąga prawidłowej temperatury albo nie zapewnia odpowiedniego docisku.' },
    { id: 'faq-15', title: 'Jak rozpoznać uszkodzenie fusera?', items: [], answer: 'Typowe objawy to rozmazujący się toner, pomarszczony papier, zabrudzenia, zacięcia przy wyjściu papieru, błędy temperatury albo nietypowe dźwięki.' },
    { id: 'faq-17', title: 'Co oznacza komunikat „Wymień bęben” / „Replace Drum”?', items: [], answer: 'Komunikat może oznaczać osiągnięcie przewidzianego przebiegu bębna albo jego rzeczywiste zużycie. Po wymianie w niektórych urządzeniach konieczny jest również reset odpowiedniego licznika.' },
    { id: 'faq-18', title: 'Po wymianie tonera drukarka nadal nie drukuje albo nie rozpoznaje wkładu — dlaczego?', items: [], answer: 'Przyczyną może być nieprawidłowo zamontowany lub niekompatybilny toner, uszkodzony chip, zabrudzone styki, problem z komunikacją wkładu albo błąd urządzenia. Jeżeli ponowne zamontowanie tonera nie pomaga, sprawdzamy również bęben i elektronikę drukarki.' },
    { id: 'faq-19', title: 'Dlaczego drukarka sypie tonerem do środka?', items: [], answer: 'Najczęściej przyczyną jest uszkodzony lub nieszczelny wkład tonerowy, zużyty bęben, listwa czyszcząca albo problem z pojemnikiem na zużyty toner.' },
    { id: 'faq-20', title: 'Co oznacza pełny pojemnik na zużyty toner?', items: [], answer: 'Pojemnik gromadzi toner usuwany podczas pracy urządzenia. Po jego napełnieniu drukarka może wyświetlić komunikat lub zablokować dalszą pracę. W zależności od modelu pojemnik należy opróżnić lub wymienić.' },
    { id: 'faq-21', title: 'Dlaczego drukarka pracuje bardzo głośno?', items: [], answer: 'Nietypowe dźwięki mogą pochodzić z rolek, przekładni, fusera, układu napędu, modułu transferowego albo innych zużytych elementów mechanicznych.' },
    { id: 'faq-22', title: 'Drukarka nie włącza się albo samoczynnie się restartuje — co może być przyczyną?', items: [], answer: 'Najczęściej sprawdzamy zasilacz, płytę główną, okablowanie oraz inne elementy elektroniki. Przyczyną może być również uszkodzenie po przepięciu.' },
    { id: 'faq-23', title: 'Dlaczego ADF nie pobiera dokumentów albo pobiera kilka kartek?', items: [], answer: 'Najczęściej przyczyną są zabrudzone lub zużyte rolki i separator ADF, czujniki albo mechanizm podawania dokumentów.' },
    { id: 'faq-24', title: 'Drukarka nie skanuje albo skany mają pasy — czy to naprawiacie?', items: [], answer: 'Tak. W urządzeniach wielofunkcyjnych naprawiamy skanery dokumentów, mechanizmy przesuwu, czujniki i ADF. Pasy lub zabrudzenia na skanach mogą również wynikać z zabrudzonego szkła lub elementów optycznych.' },
    { id: 'faq-25', title: 'Drukarka jest offline, nie łączy się przez Wi-Fi / LAN albo komputer jej nie widzi — czy to naprawiacie?', items: [], answer: 'Tak. Sprawdzamy sterowniki, konfigurację sieci, porty USB/LAN, firmware oraz ustawienia drukarki i komputera. Konfigurujemy również skanowanie sieciowe, SMB, e-mail i inne funkcje urządzeń wielofunkcyjnych.' },
    { id: 'faq-27', title: 'Czy udzielacie gwarancji na naprawę?', items: [], answer: 'Tak. Na wykonane naprawy udzielamy gwarancji od 3 do 12 miesięcy, zależnie od rodzaju pracy i zastosowanych części.' },
    { id: 'faq-28', title: 'Czy części są wliczone w cenę?', items: [], answer: 'Nie. Jeżeli przy usłudze widnieje „+ części”, podana cena obejmuje robociznę, a potrzebne części są rozliczane osobno.' },
    { id: 'faq-29', title: 'Ile kosztuje odbiór lub dostawa drukarki?', items: [], answer: 'Odbiór lub dostawa do 2,5 km od serwisu kosztuje 20 zł netto. Przy dłuższej trasie doliczamy 1,5 zł netto za każdy kilometr powyżej 5 km łącznej trasy w obie strony.' },
  ]
}

export const createLaserPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applyLaserCleaningSection(sections)
  applyLaserRepairsSection(sections)
  applyLaserFaqSection(sections)
  return sections
}
