import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

// serwis-drukarek-dtg — własne dane strony (PL = źródło prawdy dla UK/RU).
// Strona w przygotowaniu: fragmenty "[DO POTWIERDZENIA: …]" to tymczasowe miejsca na dane
// od właściciela (marki, ceny, terminy, zakres usług) — usunąć przed publikacją.
export const DTG_PRICE_TOOLTIP =
  'Ceny netto za robociznę, bez części, atramentu i płynów serwisowych [DO POTWIERDZENIA: cennik drukarek DTG]'

const applyDtgCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PEŁNA KONSERWACJA [[kompleksowe ]]czyszczenie, kontrola i kalibracja drukarki DTG\n• czyszczenie głowic i ich otoczenia;\n• czyszczenie capów / stacji serwisowej i wiperów;\n• kontrola i czyszczenie układu atramentowego;\n• kontrola przewodów, damperów i filtrów;\n• kontrola cyrkulacji / mieszania białego atramentu;\n• kontrola i opróżnienie układu zużytego atramentu;\n• czyszczenie enkodera;\n• czyszczenie i kontrola prowadnic oraz mechanizmu karetki;\n• czyszczenie i kontrola stołu / platenu;\n• kontrola filtrów powietrza / wentylacji;\n• test dysz, wyrównanie głowicy i wydruk testowy.',
    },
  ]
}

const applyDtgRepairsSection = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection) return
  repairsSection.subcategories = [
    {
      id: 'naprawy-glowica',
      title: 'Głowica drukująca i jakość nadruku',
      items: [
        { service: 'Czyszczenie / udrażnianie głowicy\n(brakujące dysze, przerwy w nadruku lub zaschnięty atrament)' },
        { service: 'Regeneracja głowicy drukującej\n(czyszczenie nie przywraca prawidłowego druku lub część dysz nadal nie pracuje)' },
        { service: 'Wymiana głowicy drukującej\n(głowica jest uszkodzona i nie można przywrócić prawidłowego druku)' },
        { service: 'Kalibracja / wyrównanie głowicy\n(przesunięte kolory, podwójne kontury lub nieprawidłowe położenie nadruku)' },
      ],
    },
    {
      id: 'naprawy-atrament',
      title: 'Układ atramentowy i biały atrament',
      items: [
        { service: 'Płukanie / udrażnianie układu atramentowego\n(atrament nie dopływa prawidłowo, układ jest zapowietrzony lub zatkany)' },
        { service: 'Wymiana przewodów / damperów / filtrów\n(niestabilny przepływ atramentu, pęcherzyki powietrza lub problemy z podawaniem)' },
        { service: 'Naprawa / wymiana pompy atramentu\n(pompa nie podaje atramentu lub nie utrzymuje prawidłowego przepływu)' },
        { service: 'Naprawa układu cyrkulacji białego atramentu\n(biały atrament nie krąży, osadza się lub jest podawany nierównomiernie)' },
        { service: 'Naprawa / wymiana modułu podawania atramentu\n(drukarka nie pobiera atramentu lub zgłasza błąd układu zasilania atramentem)' },
      ],
    },
    {
      id: 'naprawy-stacja-serwisowa',
      title: 'Stacja serwisowa i zużyty atrament',
      items: [
        { service: 'Naprawa / wymiana capów i wiperów\n(głowica nie jest prawidłowo uszczelniana lub czyszczona)' },
        { service: 'Naprawa / wymiana pompy stacji serwisowej\n(czyszczenie głowicy nie działa lub atrament nie jest prawidłowo odsysany)' },
        { service: 'Wymiana maintenance unit / stacji serwisowej\n(stacja nie wykonuje prawidłowo czyszczenia lub parkowania głowicy)' },
        { service: 'Naprawa układu odprowadzania zużytego atramentu\n(zużyty atrament nie jest odprowadzany lub pojawia się wyciek)' },
        { service: 'Wymiana flushing box / receiver / absorber\n(element osiągnął limit zużycia lub drukarka zgłasza konieczność wymiany)' },
      ],
    },
    {
      id: 'naprawy-karetka',
      title: 'Karetka, napęd i pozycjonowanie głowicy',
      items: [
        { service: 'Naprawa mechanizmu karetki\n(karetka zacina się, porusza nierówno lub zatrzymuje podczas pracy)' },
        { service: 'Wymiana silnika karetki\n(karetka nie porusza się lub drukarka zgłasza błąd napędu)' },
        { service: 'Wymiana paska napędowego\n(karetka ślizga się, przeskakuje lub traci prawidłową pozycję)' },
        { service: 'Wymiana / naprawa enkodera\n(drukarka błędnie określa położenie głowicy lub zgłasza błąd enkodera)' },
        { service: 'Wymiana czujników położenia karetki\n(drukarka nie wykrywa prawidłowo pozycji karetki)' },
      ],
    },
    {
      id: 'naprawy-stol',
      title: 'Stół, platen i mechanizm pozycjonowania odzieży',
      items: [
        { service: 'Naprawa mechanizmu przesuwu platenu\n(stół nie przesuwa się, zatrzymuje lub porusza nierówno)' },
        { service: 'Naprawa / wymiana silnika stołu\n(platen nie porusza się lub pojawia się błąd napędu)' },
        { service: 'Naprawa mechanizmu podnoszenia\n(nie można prawidłowo ustawić wysokości stołu)' },
        { service: 'Naprawa czujnika wysokości / przeszkody\n(drukarka błędnie wykrywa materiał lub zatrzymuje druk z powodu przeszkody)' },
        { service: 'Kalibracja wysokości / położenia platenu\n(nadruk jest źle ustawiony lub głowica znajduje się za blisko materiału)' },
      ],
    },
    {
      id: 'naprawy-elektronika-zasilanie',
      title: 'Elektronika, zasilanie i czujniki',
      items: [
        { service: 'Naprawa płyty głównej / sterującej\n(drukarka nie uruchamia się, zawiesza się lub zgłasza błędy elektroniki)' },
        { service: 'Wymiana płyty głównej / sterującej\n(płyta jest uszkodzona i nie nadaje się do naprawy)' },
        { service: 'Naprawa / wymiana zasilacza\n(drukarka nie włącza się, wyłącza się lub ma niestabilne zasilanie)' },
        { service: 'Naprawa przewodów, taśm i złączy\n(zanikają sygnały lub występują błędy połączeń między podzespołami)' },
        { service: 'Wymiana czujników\n(drukarka błędnie wykrywa położenie, poziom lub stan podzespołów)' },
        { service: 'Naprawa / wymiana panelu sterowania / wyświetlacza\n(panel nie reaguje, ekran nie działa lub błędnie wyświetla informacje)' },
      ],
    },
    {
      id: 'naprawy-oprogramowanie',
      title: 'Oprogramowanie, firmware i komunikacja',
      items: [
        { service: 'Aktualizacja / przywracanie firmware\n(błędy po aktualizacji, problemy z uruchomieniem lub nieprawidłowa praca systemu)' },
        { service: 'Instalacja i konfiguracja sterowników / RIP\n(drukarka nie jest widoczna w programie lub zadania nie są prawidłowo wysyłane)' },
        { service: 'Naprawa komunikacji USB / LAN\n(komputer nie wykrywa drukarki lub połączenie jest niestabilne)' },
        { service: 'Konfiguracja / kalibracja urządzenia po naprawie\n(po wymianie podzespołów wymagane jest ponowne ustawienie urządzenia)' },
      ],
    },
    {
      id: 'naprawy-pretreatment',
      title: 'Zintegrowany system pretreatmentu',
      subtitle: 'Ten blok dotyczy tylko drukarek z wbudowanym systemem pretreatmentu.',
      items: [
        { service: 'Naprawa układu podawania pretreatmentu\n(preparat nie jest podawany lub nanoszony jest nierównomiernie)' },
        { service: 'Czyszczenie / wymiana dysz\n(dysze są zatkane lub nanoszą preparat nierównomiernie)' },
        { service: 'Naprawa / wymiana pompy\n(pompa nie podaje preparatu lub nie utrzymuje prawidłowego przepływu)' },
        { service: 'Wymiana przewodów i filtrów\n(przepływ preparatu jest ograniczony lub układ jest zatkany)' },
        { service: 'Naprawa zbiorników / czujników\n(błędny odczyt poziomu lub problem z podawaniem preparatu)' },
        { service: 'Kalibracja dozowania pretreatmentu\n(preparat jest nanoszony w niewłaściwej ilości lub nierównomiernie)' },
      ],
    },
  ]
}

const applyDtgFaqSection = (sections: PricingSection[]) => {
  const faq = sections.find(section => section.id === 'faq')
  if (!faq) return
  faq.subcategories = [
    { id: 'faq-1', title: 'Czy naprawiacie drukarki DTG wszystkich marek?', items: [], answer: 'Serwisujemy drukarki DTG różnych producentów, m.in. Epson, Brother, Ricoh, Kornit, Polyprint, aeoon, M&R, ROQ, OmniPrint, DTG Digital, ColDesi, Roland, AnaJet, Mimaki i inne.' },
    { id: 'faq-2', title: 'Czy serwisujecie przemysłowe drukarki DTG?', items: [], answer: 'Tak. Zakres i koszt naprawy zależą od modelu, konstrukcji urządzenia i rodzaju usterki.' },
    { id: 'faq-3', title: 'Czy naprawiacie starsze modele drukarek DTG?', items: [], answer: 'Tak, jeśli dostępne są części lub możliwa jest naprawa istniejącego podzespołu.' },
    { id: 'faq-4', title: 'Co zrobić, gdy drukarka DTG nie drukuje części dysz?', items: [], answer: 'Najpierw sprawdzamy głowicę, stację serwisową i układ atramentowy. Przyczyną może być zaschnięty atrament, problem z cappingiem, pompą lub przepływem atramentu.' },
    { id: 'faq-5', title: 'Czy można udrożnić zaschniętą głowicę DTG?', items: [], answer: 'Często tak. Skuteczność zależy od stopnia zaschnięcia i stanu głowicy. Nie każdą głowicę da się jednak odzyskać.' },
    { id: 'faq-6', title: 'Czy regenerujecie głowice drukujące?', items: [], answer: 'Tak, jeśli konstrukcja i stan głowicy pozwalają na wykonanie takiej usługi.' },
    { id: 'faq-7', title: 'Czy wymieniacie głowice drukujące?', items: [], answer: 'Tak. Po wymianie wykonujemy wymagane ustawienia i kalibrację urządzenia.' },
    { id: 'faq-8', title: 'Dlaczego biały atrament przestaje prawidłowo drukować?', items: [], answer: 'Biały pigment łatwo się osadza. Problem może dotyczyć cyrkulacji, przewodów, filtrów, damperów, pompy lub samej głowicy.' },
    { id: 'faq-9', title: 'Czy naprawiacie układ cyrkulacji białego atramentu?', items: [], answer: 'Tak. Sprawdzamy pompę, przewody, filtry, moduły podawania oraz elementy odpowiedzialne za cyrkulację.' },
    { id: 'faq-10', title: 'Czy płuczecie zatkany układ atramentowy?', items: [], answer: 'Tak. W zależności od usterki możliwe jest płukanie przewodów i układu podawania atramentu.' },
    { id: 'faq-11', title: 'Czy naprawiacie capping station i wipery?', items: [], answer: 'Tak. Naprawiamy lub wymieniamy elementy stacji serwisowej odpowiedzialne za czyszczenie i zabezpieczanie głowicy.' },
    { id: 'faq-12', title: 'Czy wymieniacie maintenance unit?', items: [], answer: 'Tak, jeśli urządzenie posiada wymienny kompletny moduł stacji serwisowej.' },
    { id: 'faq-13', title: 'Dlaczego drukarka pozostawia pasy lub przesunięte kolory?', items: [], answer: 'Przyczyną mogą być niedrożne dysze, niewłaściwa wysokość platenu, kalibracja głowicy, encoder lub mechanizm karetki.' },
    { id: 'faq-14', title: 'Czy wykonujecie kalibrację głowicy i platenu?', items: [], answer: 'Tak. Wykonujemy kalibrację położenia głowicy oraz wysokości i pozycji platenu.' },
    { id: 'faq-15', title: 'Czy naprawiacie mechanizm karetki?', items: [], answer: 'Tak. Naprawiamy m.in. napęd, pasek, silnik, encoder oraz czujniki położenia.' },
    { id: 'faq-16', title: 'Czy naprawiacie stół / platen drukarki DTG?', items: [], answer: 'Tak. Naprawiamy mechanizm przesuwu, podnoszenia, napęd i czujniki platenu.' },
    { id: 'faq-17', title: 'Czy naprawiacie elektronikę drukarek DTG?', items: [], answer: 'Tak. Diagnozujemy płyty sterujące, zasilacze, czujniki, przewody, złącza i panele sterowania.' },
    { id: 'faq-18', title: 'Czy naprawiacie problemy z firmware lub oprogramowaniem?', items: [], answer: 'Tak. Możemy pomóc przy firmware, sterownikach, komunikacji USB/LAN oraz konfiguracji RIP.' },
    { id: 'faq-19', title: 'Czy konfigurujecie RIP?', items: [], answer: 'Tak, w zakresie konfiguracji współpracy programu z obsługiwaną drukarką DTG.' },
    { id: 'faq-20', title: 'Czy serwisujecie zintegrowane systemy pretreatmentu?', items: [], answer: 'Tak, w urządzeniach posiadających fabrycznie zintegrowany system nanoszenia pretreatmentu.' },
    { id: 'faq-21', title: 'Czy drukarkę DTG można wyłączać na kilka dni?', items: [], answer: 'To zależy od modelu. Wiele urządzeń wykonuje automatyczne procedury konserwacji i powinno pozostawać w stanie wymaganym przez producenta. Dłuższy przestój może wymagać przygotowania układu atramentowego.' },
    { id: 'faq-22', title: 'Czy brak regularnej konserwacji może uszkodzić drukarkę?', items: [], answer: 'Tak. Szczególnie w układzie białego atramentu zaniedbanie konserwacji może prowadzić do zatkania przewodów, stacji serwisowej lub głowicy.' },
    { id: 'faq-23', title: 'Czy wykonujecie samo czyszczenie i konserwację bez naprawy?', items: [], answer: 'Tak. Pełna konserwacja jest dostępna jako osobna usługa.' },
    { id: 'faq-24', title: 'Jak długo trwa naprawa drukarki DTG?', items: [], answer: 'Typowe naprawy zajmują około 1–5 dni. Przy skomplikowanych usterkach lub oczekiwaniu na części termin może być dłuższy.' },
    { id: 'faq-25', title: 'Czy przed naprawą poznam koszt?', items: [], answer: 'Tak. Po diagnozie przedstawiamy zakres i koszt naprawy przed rozpoczęciem prac wymagających akceptacji.' },
    { id: 'faq-26', title: 'Czy części są wliczone w cenę naprawy?', items: [], answer: 'Nie, jeśli przy danej usłudze wskazano „+ części”. Cena w cenniku dotyczy wtedy robocizny.' },
    { id: 'faq-27', title: 'Czy można wysłać drukarkę DTG kurierem?', items: [], answer: 'Tak. Przyjmujemy urządzenia wysyłane z całej Polski. Drukarka powinna być zabezpieczona zgodnie z wymaganiami transportowymi danego modelu.' },
    { id: 'faq-28', title: 'Czy opłaca się naprawiać starszą drukarkę DTG?', items: [], answer: 'Zależy od wartości urządzenia, zakresu uszkodzenia i dostępności części. Po diagnozie można ocenić opłacalność naprawy.' },
    { id: 'faq-29', title: 'Czy po naprawie sprawdzacie jakość druku?', items: [], answer: 'Tak. Jeśli charakter naprawy tego wymaga, sprawdzamy działanie urządzenia i wykonujemy test druku.' },
    { id: 'faq-30', title: 'Czy udzielacie gwarancji na naprawę?', items: [], answer: 'Tak. Na wykonaną usługę serwisową udzielamy 3 miesięcy gwarancji. Części podlegają gwarancji producenta lub dostawcy.' },
  ]
}

export const createDtgPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applyDtgCleaningSection(sections)
  applyDtgRepairsSection(sections)
  applyDtgFaqSection(sections)
  return sections
}
