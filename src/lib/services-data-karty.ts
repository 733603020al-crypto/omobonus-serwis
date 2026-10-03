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
        { service: 'Usuwanie zacięć kart\n(karta blokuje się w podajniku lub wewnątrz drukarki)' },
        { service: 'Naprawa podajnika kart\n(drukarka nie pobiera kart, pobiera kilka naraz lub podaje je krzywo)' },
        { service: 'Wymiana rolek podających i transportowych\n(karty ślizgają się, przesuwają nierówno lub zatrzymują w torze)' },
        { service: 'Naprawa napędu i przekładni\n(hałas, przeskakiwanie lub brak ruchu mechanizmu transportu kart)' },
      ],
    },
    {
      id: 'naprawy-glowica-platen',
      title: 'Głowica drukująca i jakość nadruku',
      items: [
        { service: 'Czyszczenie i regulacja głowicy\n(pasy, smugi, brakujące linie lub blady nadruk)' },
        { service: 'Wymiana głowicy drukującej\n(uszkodzone punkty grzejne, stałe linie na każdej karcie)' },
        { service: 'Regulacja docisku głowicy i wałka\n(nierówny nadruk, przesunięte kolory lub marszczenie taśmy)' },
      ],
    },
    {
      id: 'naprawy-tasma-ribbon',
      title: 'Taśma barwiąca (ribbon) i retransfer',
      items: [
        { service: 'Naprawa mechanizmu przewijania taśmy\n(taśma się zrywa, marszczy lub nie przewija)' },
        { service: 'Naprawa rozpoznawania taśmy\n(drukarka nie rozpoznaje ribbonu lub zgłasza błąd taśmy)' },
        { service: 'Naprawa modułu retransferu\n(folia retransferowa nie przenosi obrazu lub przykleja się do karty)' },
      ],
    },
    {
      id: 'naprawy-moduly-dodatkowe',
      title: 'Druk dwustronny, laminacja i kodowanie',
      items: [
        { service: 'Naprawa modułu obracania kart\n(druk dwustronny nie działa, karta zacina się przy obracaniu)' },
        { service: 'Naprawa modułu laminacji\n(laminat nie przykleja się, tworzą się pęcherze lub karta się wygina)' },
        { service: 'Naprawa kodera paska magnetycznego\n(błąd zapisu lub odczytu paska magnetycznego)' },
        { service: 'Naprawa kodera kart zbliżeniowych / chipowych\n(karty RFID, MIFARE lub stykowe nie są kodowane)' },
      ],
    },
    {
      id: 'naprawy-elektronika-zasilanie',
      title: 'Elektronika, zasilanie i komunikacja',
      items: [
        { service: 'Naprawa układu zasilania\n(drukarka nie włącza się lub wyłącza podczas pracy)' },
        { service: 'Naprawa płyty głównej / sterującej\n(błędy systemowe, drukarka nie reaguje lub zawiesza się)' },
        { service: 'Naprawa portu USB / Ethernet\n(komputer nie wykrywa drukarki lub połączenie się zrywa)' },
      ],
    },
    {
      id: 'naprawy-oprogramowanie',
      title: 'Oprogramowanie i konfiguracja',
      items: [
        { service: 'Instalacja i konfiguracja sterowników\n(drukarka nie drukuje z komputera lub programu do projektowania kart)' },
        { service: 'Aktualizacja firmware\n(błędy oprogramowania, brak obsługi nowych taśm)' },
        { service: 'Konfiguracja druku i kodowania\n(nieprawidłowe kolory, położenie nadruku lub ustawienia kodera)' },
      ],
    },
  ]
}

const applyKartyFaqSection = (sections: PricingSection[]) => {
  const faq = sections.find(section => section.id === 'faq')
  if (!faq) return
  faq.subcategories = [
    { id: 'faq-1', title: 'Jak wygląda proces naprawy drukarki do kart?', items: [], answer: 'Najpierw wykonujemy wstępną diagnozę, następnie pełną diagnostykę i podajemy dokładny koszt oraz termin. Naprawę rozpoczynamy dopiero po akceptacji Klienta.' },
    { id: 'faq-2', title: 'Ile kosztuje diagnoza drukarki do kart?', items: [], answer: 'Wstępna diagnoza online oraz przy dostarczeniu urządzenia jest bezpłatna. Przy realizacji naprawy pełna diagnoza również jest bezpłatna. W przypadku rezygnacji z naprawy koszt pełnej diagnozy wynosi 100 / 150 / 200 zł netto, zależnie od klasy drukarki.' },
    { id: 'faq-3', title: 'Ile trwa naprawa drukarki do kart?', items: [], answer: 'Większość standardowych napraw wykonujemy w ciągu 1–3 dni roboczych. Naprawa elektroniki lub oczekiwanie na części może wydłużyć termin.' },
    { id: 'faq-4', title: 'Jakie marki drukarek do kart serwisujecie?', items: [], answer: 'Serwisujemy m.in. Zebra, Evolis, HID Fargo, Magicard, Entrust Datacard, Matica, IDP Smart, DNP i HiTi oraz inne marki.' },
    { id: 'faq-5', title: 'Jakie drukarki do kart naprawiacie?', items: [], answer: 'Naprawiamy jednostronne i dwustronne drukarki termosublimacyjne (direct-to-card), drukarki retransferowe oraz urządzenia z modułem laminacji i koderami kart.' },
    { id: 'faq-6', title: 'Czy naprawiacie drukarki do kart u Klienta?', items: [], answer: 'Naprawy wykonujemy w serwisie, ponieważ prawidłowa diagnoza może wymagać rozebrania urządzenia, testów na kartach i zamówienia części. Możemy odebrać drukarkę i dostarczyć ją po naprawie.' },
    { id: 'faq-7', title: 'Czy można zamówić odbiór i dostawę drukarki?', items: [], answer: 'Tak. Odbiór do 2,5 km od serwisu kosztuje 20 zł netto, a dostarczenie urządzenia do 2,5 km również 20 zł netto. Powyżej 2,5 km obowiązuje 20 zł + 1,5 zł/km.' },
    { id: 'faq-8', title: 'Dlaczego na kartach pojawiają się linie lub pasy?', items: [], answer: 'Najczęściej przyczyną jest zabrudzona lub uszkodzona głowica drukująca, kurz na kartach albo zużyta rolka czyszcząca. Stała linia w tym samym miejscu zwykle oznacza uszkodzone punkty grzejne głowicy.' },
    { id: 'faq-9', title: 'Dlaczego drukarka nie rozpoznaje taśmy barwiącej?', items: [], answer: 'Przyczyną może być niezgodna z modelem taśma, źle założony ribbon, uszkodzony czujnik lub czytnik chipu taśmy albo błąd oprogramowania drukarki.' },
    { id: 'faq-10', title: 'Dlaczego drukarka pobiera kilka kart naraz albo się zacina?', items: [], answer: 'Może to wynikać z niewłaściwie ustawionej grubości kart, sklejonych lub naelektryzowanych kart, zużytych rolek podających albo zabrudzonego toru transportu.' },
    { id: 'faq-11', title: 'Dlaczego kolory na karcie są blade lub przesunięte?', items: [], answer: 'Możliwe przyczyny to ustawienia sterownika i profilu kolorów, zabrudzona głowica, zużyta lub niewłaściwa taśma albo brak kalibracji drukarki.' },
    { id: 'faq-12', title: 'Dlaczego kodowanie paska magnetycznego nie działa?', items: [], answer: 'Często przyczyną jest niezgodny typ paska (HiCo / LoCo), błędne ustawienia kodera w sterowniku albo zabrudzona lub uszkodzona głowica kodera.' },
    { id: 'faq-13', title: 'Jak często czyścić drukarkę do kart?', items: [], answer: 'Zgodnie z zaleceniami producenta — zwykle przy każdej wymianie taśmy kartą lub zestawem czyszczącym. Pełną konserwację warto wykonać, gdy pogarsza się jakość nadruku lub karty zaczynają się zacinać.' },
    { id: 'faq-14', title: 'Czy części są wliczone w cenę naprawy?', items: [], answer: 'Jeśli przy pozycji w cenniku znajduje się „+ części”, podana cena dotyczy robocizny. Potrzebne części są rozliczane oddzielnie.' },
    { id: 'faq-15', title: 'Jak przygotować drukarkę do kart do serwisu?', items: [], answer: 'Odłącz drukarkę od zasilania i przygotuj krótki opis usterki. Jeśli problem dotyczy jakości nadruku lub kodowania, dołącz przykładowe karty oraz używaną taśmę.' },
  ]
}

export const createKartyPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applyKartyCleaningSection(sections)
  applyKartyRepairsSection(sections)
  applyKartyFaqSection(sections)
  return sections
}
