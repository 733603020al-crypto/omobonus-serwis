import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

// Serwis drukarek igłowych: jeden pakiet PEŁNA KONSERWACJA (standard jak termiczne / laserowe)
const applyNeedleCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PEŁNA KONSERWACJA\u2028[[kompleksowe ]]czyszczenie, kontrola i regulacja drukarki\n• dokładne czyszczenie wnętrza drukarki i mechanizmu drukującego,\n• czyszczenie i konserwacja toru papieru, wałków, rolek, pasków i prowadnic,\n• czyszczenie i konserwacja prowadnicy karetki oraz mechanizmu przesuwu głowicy,\n• kontrola głowicy, napędu, mechanizmu taśmy barwiącej i głównych elementów mechanicznych; smarowanie zgodnie z zaleceniami producenta,\n• regulacja mechanizmu podawania papieru i przesuwu taśmy barwiącej,\n• końcowy test jakości wydruku i prawidłowego podawania papieru.',
    },
  ]
}

// Serwis drukarek igłowych: własna struktura sekcji "Naprawy i usługi serwisowe" (tylko /uslugi/serwis-drukarek-iglowych)
const applyIgloweRepairsSection = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection) return
  repairsSection.subcategories = [
    {
      id: 'naprawy-mechanizm',
      title: 'Transport papieru i mechanizm traktora',
      items: [
        { service: 'Usuwanie zacięć w torze papieru\n(papier blokuje się, zatrzymuje lub nie przechodzi prawidłowo przez drukarkę)' },
        { service: 'Czyszczenie i regulacja toru papieru\n(krzywe prowadzenie, nierówny przesuw lub problemy z pobieraniem papieru)' },
        { service: 'Regulacja mechanizmu traktora papieru\n(papier ciągły przesuwa się krzywo, przeskakuje lub wypada z perforacji)' },
        { service: 'Naprawa mechanizmu traktora papieru\n(traktor nie przesuwa papieru lub pracuje nierówno)' },
        { service: 'Wymiana elementów traktora papieru\n(zużyte zębatki, uchwyty lub elementy prowadzące papier ciągły)' },
        { service: 'Naprawa mechanizmu poboru pojedynczych arkuszy\n(drukarka nie pobiera kartek lub pobiera je nierówno)' },
        { service: 'Czyszczenie i regulacja wałka prowadzącego papier (platen)\n(papier ślizga się, przesuwa nierówno lub jest prowadzony niestabilnie)' },
      { service: 'Wymiana wałka prowadzącego papier (platen)\n(zużyty lub uszkodzony wałek powoduje poślizg, nierówny przesuw lub problemy z wydrukiem)' },
      ],
    },
    {
      id: 'naprawy-glowica-matrycowa',
      title: 'Głowica igłowa i mechanizm uderzeniowy',
      items: [
        { service: 'Czyszczenie i regulacja głowicy igłowej\n(blady lub nierówny wydruk, zacinanie mechanizmu igieł)' },
        { service: 'Naprawa głowicy igłowej\n(niedziałające igły, brak części znaków lub przerywane linie)' },
        { service: 'Wymiana głowicy igłowej\n(trwale uszkodzona lub zużyta głowica drukująca)' },
        { service: 'Regulacja szczeliny głowicy (head gap)\n(słaby wydruk, problemy z formularzami wielowarstwowymi lub nierówny docisk)' },
        { service: 'Regulacja mechanizmu uderzeniowego\n(nierówna intensywność znaków lub nieprawidłowa praca igieł)' },
      ],
    },
    {
      id: 'naprawy-naped-kartridza',
      title: 'Karetka, prowadnice i napęd',
      items: [
        { service: 'Czyszczenie i smarowanie prowadnicy karetki\n(głośna praca, opór lub nierówny ruch głowicy)' },
        { service: 'Regulacja napięcia paska napędu karetki\n(drgania, przeskakiwanie lub nierówny ruch podczas drukowania)' },
        { service: 'Wymiana paska napędu karetki\n(zużyty lub uszkodzony pasek, brak prawidłowego ruchu głowicy)' },
        { service: 'Naprawa mechanizmu napędu karetki\n(karetka zatrzymuje się, przeskakuje lub porusza nieprawidłowo)' },
        { service: 'Wymiana silnika napędu karetki\n(brak ruchu głowicy lub błędy napędu)' },
        { service: 'Wymiana elementów prowadzenia karetki\n(zużyte elementy powodują luzy, hałas lub nierówny ruch głowicy)' },
      ],
    },
    {
      id: 'naprawy-tasma',
      title: 'Taśma barwiąca i mechanizm ribbonu',
      items: [
        { service: 'Czyszczenie toru prowadzenia taśmy barwiącej\n(taśma przesuwa się nierówno, zacina lub pozostawia zabrudzenia)' },
        { service: 'Regulacja mechanizmu przesuwu taśmy\n(ribbon nie przesuwa się prawidłowo lub nawija nierówno)' },
        { service: 'Naprawa mechanizmu napędu taśmy barwiącej\n(taśma zatrzymuje się, zacina lub nie przesuwa podczas drukowania)' },
        { service: 'Wymiana elementów mechanizmu ribbonu\n(zużyte zębatki, uchwyty lub elementy napędu taśmy)' },
      ],
    },
    {
      id: 'naprawy-elektronika',
      title: 'Elektronika, zasilanie i panel sterowania',
      items: [
        { service: 'Naprawa zasilacza\n(drukarka nie uruchamia się, wyłącza lub pracuje niestabilnie)' },
        { service: 'Wymiana zasilacza\n(uszkodzony moduł zasilania)' },
        { service: 'Naprawa płyty głównej / elektroniki sterującej\n(resetowanie, zawieszanie lub błędy sterowania drukarką)' },
        { service: 'Wymiana płyty głównej / modułu sterującego\n(trwale uszkodzona elektronika drukarki)' },
        { service: 'Naprawa okablowania i taśm sygnałowych\n(zaniki sygnału, losowe błędy lub przerywanie pracy)' },
        { service: 'Naprawa panelu sterowania\n(przyciski lub wyświetlacz nie działają prawidłowo)' },
        { service: 'Wymiana panelu sterowania / wyświetlacza\n(uszkodzony panel, ekran lub moduł sterowania)' },
        { service: 'Naprawa portów i interfejsów komunikacyjnych\n(brak komunikacji przez USB, LPT, RS232 lub Ethernet)' },
      ],
    },
    {
      id: 'naprawy-software',
      title: 'Sterowniki i konfiguracja',
      items: [
        { service: 'Instalacja i konfiguracja sterowników\n(komputer nie widzi drukarki lub drukowanie działa nieprawidłowo)' },
        { service: 'Konfiguracja portu i komunikacji\n(problemy z USB, LPT, RS232, Ethernet lub serwerem wydruku)' },
        { service: 'Konfiguracja formatu papieru ciągłego i formularzy\n(nieprawidłowa długość strony, przesunięty wydruk lub błędne przejście między formularzami)' },
        { service: 'Ustawienie pozycji początku wydruku / Top of Form\n(wydruk rozpoczyna się zbyt wysoko, nisko lub przesuwa się między stronami)' },
        { service: 'Konfiguracja funkcji Tear-Off / wysuwu papieru\n(papier zatrzymuje się w niewłaściwej pozycji po wydruku)' },
        { service: 'Przywrócenie ustawień i ponowna konfiguracja drukarki\n(nieprawidłowe działanie po zmianie ustawień lub konfiguracji urządzenia)' },
      ],
    },
  ]
}

export const createIglowePricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applyNeedleCleaningSection(sections)
  applyIgloweRepairsSection(sections)

  const faq = sections.find(section => section.id === 'faq')
  if (faq?.subcategories) {
    // Wspólne FAQ bez pytań o dane i zalanie; własne odpowiedzi dla opłacalności, dojazdu i marek
    const overrides: Record<string, { title?: string; answer: string }> = {
      'faq-1': { answer: 'Zwykle tak. Drukarki igłowe są bardzo trwałe, a części i taśmy tanie. Naprawa jest szczególnie opłacalna, gdy drukarka drukuje na papierze ciągłym, formularzach wielowarstwowych albo współpracuje ze starszym systemem LPT / RS232, pod który trudno dobrać nowe urządzenie. Po diagnozie mówimy wprost, czy naprawa ma sens.' },
      'faq-4': { title: 'Czy mogę dostarczyć drukarkę sam albo zamówić odbiór?', answer: 'Tak. Możesz dostarczyć drukarkę do serwisu we Wrocławiu albo zamówić odbiór: do 2,5 km od serwisu 20 zł netto, dalej +1,5 zł netto za każdy kilometr powyżej 5 km łącznej trasy.' },
      'faq-8': { title: 'Jakie marki drukarek igłowych serwisujecie?', answer: 'Serwisujemy m.in. Epson LX, FX, LQ i DFX, OKI Microline, Tally Dascom, Citizen, Star i Panasonic. Przed przyjęciem potwierdzamy możliwość naprawy konkretnego modelu.' },
    }
    const subs = faq.subcategories
      .filter(sub => !['faq-9', 'faq-10', 'faq-11', 'faq-12'].includes(sub.id))
      .map(sub => overrides[sub.id] ? { ...sub, ...overrides[sub.id] } : sub)
    const afterIdx = subs.findIndex(sub => sub.id === 'faq-3') + 1
    faq.subcategories = [
      ...subs.slice(0, afterIdx),
      { id: 'faq-14', title: 'Drukarka nie jest widoczna przez komputer — co sprawdzić?', items: [], answer: 'Przyczyną może być sterownik, kabel, konfiguracja portu albo interfejs drukarki. W starszych modelach szczególnie często sprawdzamy połączenia LPT i RS232 oraz ustawienia komunikacji.' },
      { id: 'faq-15', title: 'Drukarka włącza się, ale nie rozpoczyna drukowania — co może być przyczyną?', items: [], answer: 'Przyczyną może być problem z mechanizmem papieru, czujnikiem, karetką, elektroniką albo konfiguracją portu. Usterkę ustalamy podczas diagnozy.' },
      { id: 'faq-16', title: 'Dlaczego wydruk jest blady lub brakuje fragmentów znaków?', items: [], answer: 'Najczęściej przyczyną jest zużyta taśma barwiąca, zbyt duża szczelina głowicy, zabrudzona głowica albo niedziałające igły.' },
      { id: 'faq-17', title: 'Dlaczego w każdym wierszu brakuje jednej poziomej linii?', items: [], answer: 'To typowy objaw niedziałającej igły: złamanej, zablokowanej albo z uszkodzonym obwodem sterującym.' },
      { id: 'faq-18', title: 'Dlaczego papier ciągły przesuwa się krzywo lub wypada z perforacji?', items: [], answer: 'Najczęściej przyczyną jest złe ustawienie traktorów, zużyte elementy traktora, zabrudzony tor papieru albo nieprawidłowe ułożenie papieru za drukarką.' },
      { id: 'faq-19', title: 'Dlaczego kopie na formularzach wielowarstwowych są nieczytelne?', items: [], answer: 'Przy formularzach z kopiami szczelinę głowicy i siłę uderzenia trzeba dopasować do liczby warstw. Problem może również powodować zużyta taśma lub mechanizm uderzeniowy.' },
      { id: 'faq-20', title: 'Dlaczego wydruk zaczyna się za wysoko lub przesuwa między stronami?', items: [], answer: 'Najczęściej odpowiada za to ustawienie Top of Form, długości strony lub funkcji Tear-Off.' },
      { id: 'faq-21', title: 'Jak często wymieniać taśmę barwiącą?', items: [], answer: 'Gdy wydruk wyraźnie blednie albo taśma jest postrzępiona. Zużyta taśma może zaczepiać o igły i uszkodzić głowicę.' },
      { id: 'faq-22', title: 'Czy drukarka zadziała ze starym programem lub systemem DOS / ERP / LPT / RS232?', items: [], answer: 'Zwykle tak. Konfigurujemy porty LPT, RS232, USB i Ethernet, tryby emulacji oraz serwery wydruku.' },
      { id: 'faq-23', title: 'Dlaczego drukarka głośno pracuje albo karetka się zacina?', items: [], answer: 'Przyczyną może być zabrudzona lub sucha prowadnica, zużyty pasek, silnik albo ciało obce w mechanizmie.' },
      { id: 'faq-24', title: 'Czy części są wliczone w cenę?', items: [], answer: 'Nie. Jeżeli przy usłudze widnieje „+ części”, podana cena obejmuje robociznę, a części są rozliczane osobno.' },
      { id: 'faq-25', title: 'Jak często konserwować drukarkę igłową?', items: [], answer: 'Przy codziennej pracy zalecamy konserwację co 6–12 miesięcy.' },
      ...subs.slice(afterIdx),
    ]
  }
  return sections
}
