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
        'PEŁNA KONSERWACJA [[kompleksowe ]]czyszczenie, kontrola i kalibracja drukarki DTG\n• czyszczenie stacji serwisowej: nasadek (kapping), wycieraczki głowicy i ich otoczenia;\n• czyszczenie wózka głowicy, prowadnicy i okolic głowicy z zaschniętego atramentu i włókien tkaniny;\n• kontrola tłumików (damperów) i przewodów atramentowych pod kątem zapowietrzenia i wycieków;\n• kontrola cyrkulacji / mieszania białego atramentu, jeśli występuje w danym modelu;\n• kontrola i opróżnienie pojemnika na zużyty atrament;\n• czyszczenie enkodera (taśmy i dysku) oraz smarowanie prowadnic;\n• kontrola stołu (płyty) i mechanizmu jego przesuwu, regulacja wysokości;\n• test dysz, wyrównanie głowicy i wydruk testowy na tkaninie.',
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
        { service: 'Diagnostyka i udrażnianie zapchanej głowicy\n(w teście dysz brakuje linii, na nadruku widać pasy lub brakuje fragmentów obrazu)' },
        { service: 'Płukanie głowicy i układu atramentowego\n(drukarka długo stała nieużywana, a atrament zasechł w głowicy lub przewodach)' },
        { service: 'Wymiana głowicy drukującej\n(dysze nie wracają po czyszczeniu i płukaniu, kolor stale nie drukuje się w części obrazu)' },
        { service: 'Wyrównanie i kalibracja głowicy\n(nadruk jest rozmyty, krawędzie się dublują, a kolory lub podkład biały są przesunięte)' },
        { service: 'Regulacja wysokości głowicy\n(głowica ociera o koszulkę, brudzi nadruk lub zostawia smugi na tkaninie)' },
      ],
    },
    {
      id: 'naprawy-atrament',
      title: 'Układ atramentowy i biały atrament',
      items: [
        { service: 'Wymiana tłumików (damperów)\n(atrament nie dochodzi do głowicy, w układzie jest powietrze lub atrament kapie)' },
        { service: 'Wymiana przewodów atramentowych\n(widoczne wycieki, pęcherze powietrza lub nierównomierne podawanie atramentu)' },
        { service: 'Naprawa cyrkulacji / mieszania białego atramentu\n(biały słabo kryje, osadza się w układzie lub szybko zatyka głowicę)' },
        { service: 'Naprawa układu ładowania atramentu\n(drukarka nie napełnia układu, zgłasza błąd ładowania lub zużywa dużo atramentu)' },
        { service: 'Diagnostyka zbiorników, wkładów i chipów\n(drukarka nie rozpoznaje wkładów lub zbiorników albo zgłasza ich brak)' },
        { service: 'Przygotowanie drukarki do przestoju lub ponowne uruchomienie\n(drukarka ma stać dłużej bez pracy albo ma wrócić do druku po przerwie)' },
      ],
    },
    {
      id: 'naprawy-stacja-serwisowa',
      title: 'Stacja serwisowa i zużyty atrament',
      items: [
        { service: 'Naprawa / wymiana stacji serwisowej\n(drukarka zgłasza błąd stacji serwisowej, a głowica zasycha mimo czyszczenia)' },
        { service: 'Wymiana nasadek i wycieraczki głowicy\n(nasadki nie domykają głowicy, wycieraczka zostawia atrament na dyszach)' },
        { service: 'Naprawa pompy stacji serwisowej\n(czyszczenie głowicy nie daje efektu, atrament nie jest odsysany)' },
        { service: 'Wymiana pojemnika / pochłaniacza zużytego atramentu i reset licznika\n(drukarka zgłasza pełny pojemnik na zużyty atrament i blokuje druk)' },
      ],
    },
    {
      id: 'naprawy-mechanika',
      title: 'Stół, wózek głowicy i mechanika',
      items: [
        { service: 'Naprawa mechanizmu przesuwu stołu\n(stół nie wjeżdża, zatrzymuje się w połowie lub nadruk jest przesunięty na koszulce)' },
        { service: 'Regulacja wysokości stołu i czujnika wysokości\n(drukarka zgłasza błąd wysokości materiału albo głowica dotyka tkaniny)' },
        { service: 'Naprawa napędu wózka głowicy\n(wózek zacina się, słychać stuki, a w poprzek nadruku pojawiają się pasy)' },
        { service: 'Czyszczenie / wymiana enkodera\n(obraz jest przesunięty, pojawiają się pasy lub błędy pozycjonowania wózka)' },
        { service: 'Smarowanie i regulacja prowadnic\n(wózek lub stół pracuje głośno albo porusza się nierówno)' },
      ],
    },
    {
      id: 'naprawy-elektronika-zasilanie',
      title: 'Elektronika, zasilanie i komunikacja',
      items: [
        { service: 'Wymiana / naprawa zasilacza\n(drukarka nie włącza się, wyłącza podczas pracy lub reaguje niestabilnie na zasilanie)' },
        { service: 'Naprawa płyty głównej\n(drukarka nie uruchamia się prawidłowo, zawiesza się lub zgłasza nietypowe błędy sprzętowe)' },
        { service: 'Naprawa / wymiana czujników\n(drukarka błędnie wykrywa pokrywę, stół, wkłady lub zgłasza błąd czujnika)' },
        { service: 'Naprawa portu USB / modułu sieciowego\n(komputer nie widzi drukarki przez USB lub sieć mimo prawidłowego przewodu i sterownika)' },
        { service: 'Naprawa panelu sterowania / wyświetlacza\n(wyświetlacz nie działa, przyciski nie reagują albo panel pokazuje nieprawidłowe informacje)' },
      ],
    },
    {
      id: 'naprawy-oprogramowanie',
      title: 'Oprogramowanie, RIP i konfiguracja',
      items: [
        { service: 'Instalacja / konfiguracja sterowników\n(komputer nie wykrywa drukarki, druk nie startuje lub sterownik działa nieprawidłowo)' },
        { service: 'Aktualizacja firmware\n(drukarka zawiesza się, zgłasza błędy lub wymaga aktualizacji oprogramowania urządzenia)' },
        { service: 'Konfiguracja oprogramowania RIP\n(kolory na koszulce różnią się od projektu, podkład biały jest za słaby lub za mocny)' },
        { service: 'Konfiguracja sieci LAN / Wi-Fi\n(drukarka nie jest widoczna w sieci albo nie można drukować z innych komputerów)' },
      ],
    },
  ]
}

const applyDtgFaqSection = (sections: PricingSection[]) => {
  const faq = sections.find(section => section.id === 'faq')
  if (!faq) return
  faq.subcategories = [
    { id: 'faq-1', title: 'Jakie drukarki DTG serwisujecie?', items: [], answer: 'Serwisujemy drukarki DTG do bezpośredniego nadruku na koszulkach i innych tekstyliach. Pracujemy z urządzeniami marek: Epson, Brother, Kornit Digital, Ricoh, Polyprint, aeoon Technologies, M&R, ROQ, OmniPrint, ColDesi, DTG Digital / Pigment.inc, AnaJet, Roland DG, Mimaki, Azonprinter, Resolute DTG, Lawson Screen & Digital, Durst. Jeśli nie wiesz, czy obsługujemy Twój model, skontaktuj się z nami — sprawdzimy możliwość naprawy.' },
    { id: 'faq-2', title: 'Czy naprawiacie drukarki kupione w innej firmie?', items: [], answer: 'Tak. Serwisujemy urządzenia niezależnie od miejsca ich zakupu.' },
    { id: 'faq-3', title: 'Jakie usterki naprawiacie?', items: [], answer: 'Naprawiamy m.in.: zapchane i uszkodzone głowice, problemy z jakością nadruku, układ atramentowy (tłumiki, przewody, ładowanie atramentu), cyrkulację białego atramentu, stację serwisową i pojemnik na zużyty atrament, mechanizm stołu i wózka głowicy, enkoder, elektronikę (zasilacze, płyty główne, czujniki, panele, porty) oraz sterowniki, firmware i konfigurację oprogramowania RIP.' },
    { id: 'faq-4', title: 'Czy wykonujecie diagnostykę przed naprawą?', items: [], answer: 'Tak. Najpierw diagnozujemy urządzenie, określamy zakres prac i przygotowujemy wycenę.' },
    { id: 'faq-5', title: 'Czy diagnostyka jest bezpłatna?', items: [], answer: 'Przy realizacji naprawy diagnostyka jest bezpłatna. W przypadku rezygnacji z naprawy obowiązuje opłata zgodna z cennikiem.' },
    { id: 'faq-6', title: 'Czy przed rozpoczęciem naprawy otrzymam wycenę?', items: [], answer: 'Tak. Przed rozpoczęciem naprawy przedstawiamy zakres prac i koszt do akceptacji.' },
    { id: 'faq-7', title: 'Co jeśli nie zaakceptuję wyceny?', items: [], answer: 'Nie wykonujemy naprawy bez Twojej akceptacji. Jeśli po diagnozie zrezygnujesz z naprawy, obowiązuje jedynie opłata za diagnostykę zgodna z cennikiem, a drukarkę oddajemy bez wykonywania naprawy.' },
    { id: 'faq-8', title: 'Od czego zależy cena naprawy?', items: [], answer: 'Od modelu drukarki, rodzaju usterki i tego, czy potrzebna jest wymiana części. Koszt części, atramentu i płynów serwisowych — jeśli są potrzebne — zawsze ustalamy z Tobą przed naprawą. Najdroższą częścią zwykle jest głowica drukująca.' },
    { id: 'faq-9', title: 'Ile trwa naprawa drukarki DTG?', items: [], answer: '[DO POTWIERDZENIA: typowe terminy napraw.] Dokładny termin podajemy po diagnozie — zależy od rodzaju usterki i dostępności części.' },
    { id: 'faq-10', title: 'Czy można przywieźć lub wysłać drukarkę do serwisu?', items: [], answer: 'Możesz dostarczyć drukarkę osobiście do serwisu. [DO POTWIERDZENIA: wysyłka kurierem oraz serwis u klienta dla większych drukarek DTG.] Dojazd do klienta we Wrocławiu — zgodnie z cennikiem dojazdu.' },
    { id: 'faq-11', title: 'Jak przygotować drukarkę DTG do transportu?', items: [], answer: 'Skontaktuj się z nami przed transportem. Wiele drukarek DTG wymaga przygotowania zgodnie z instrukcją producenta — m.in. zabezpieczenia głowicy i układu atramentowego oraz unieruchomienia wózka i stołu. Podpowiemy, jak zrobić to dla Twojego modelu.' },
    { id: 'faq-12', title: 'W teście dysz brakuje linii, a na nadruku są pasy — co robić?', items: [], answer: 'Najczęściej to zaschnięty atrament w dyszach, zabrudzone nasadki lub wycieraczka albo powietrze w układzie atramentowym. Najpierw wykonaj czyszczenie zgodnie z instrukcją producenta; jeśli po kilku próbach dysze nie wracają, nie powtarzaj czyszczenia w nieskończoność — zużywa to atrament i obciąża głowicę. Zdiagnozujemy przyczynę i w razie potrzeby udrożnimy, przepłuczemy lub wymienimy głowicę.' },
    { id: 'faq-13', title: 'Biały atrament słabo kryje lub zatyka głowicę — dlaczego?', items: [], answer: 'Biały atrament zawiera ciężki pigment, który osadza się, gdy atrament stoi bez ruchu. Pomaga regularne mieszanie lub cyrkulacja białego zgodnie z zaleceniami producenta i codzienna praca drukarki. Jeśli problem wraca, sprawdzamy układ cyrkulacji, tłumiki, przewody i stację serwisową.' },
    { id: 'faq-14', title: 'Drukarka zgłasza błąd stacji serwisowej lub pełnego pojemnika — co robić?', items: [], answer: 'Taki komunikat może oznaczać zabrudzoną lub uszkodzoną stację serwisową, niesprawną pompę albo zapełniony pojemnik / pochłaniacz zużytego atramentu. Nie ignoruj go — zużyty atrament może wylać się do wnętrza drukarki. Naprawiamy stację serwisową, wymieniamy pochłaniacze i resetujemy licznik.' },
    { id: 'faq-15', title: 'Jak dbać o drukarkę DTG na co dzień?', items: [], answer: 'Producenci zalecają m.in. regularny test dysz przed pracą, czyszczenie nasadek i wycieraczki płynem serwisowym, mieszanie białego atramentu i utrzymanie właściwej wilgotności w pomieszczeniu. Najważniejsza jest regularna praca — drukarka DTG źle znosi długie przestoje. Dokładny harmonogram zależy od modelu i instrukcji producenta.' },
    { id: 'faq-16', title: 'Co zrobić, gdy drukarka ma stać dłużej bez pracy?', items: [], answer: 'Przed dłuższą przerwą drukarkę DTG warto odpowiednio przygotować — w wielu modelach przewiduje to procedura producenta (np. płukanie układu płynem czyszczącym). Bez tego atrament, zwłaszcza biały, może zaschnąć w głowicy i przewodach. Możemy przygotować drukarkę do przestoju i ponownie ją uruchomić.' },
    { id: 'faq-17', title: 'Jaka jest gwarancja na naprawę?', items: [], answer: 'Na wykonaną usługę udzielamy gwarancji [DO POTWIERDZENIA: okres gwarancji]. Na zamontowane części obowiązuje gwarancja producenta lub dostawcy.' },
    { id: 'faq-18', title: 'Czy wykonujecie czyszczenie i konserwację drukarki DTG?', items: [], answer: 'Tak. Czyścimy stację serwisową, wózek głowicy, enkoder i mechanizmy, sprawdzamy układ atramentowy i cyrkulację białego oraz wykonujemy kalibrację. Możesz też oddać sprawną drukarkę tylko na przegląd okresowy, bez zgłaszania konkretnej awarii.' },
    { id: 'faq-19', title: 'Czy pomagacie z oprogramowaniem RIP i ustawieniami druku?', items: [], answer: 'Tak. Instalujemy sterowniki, aktualizujemy firmware i konfigurujemy ustawienia druku, w tym podkład biały i odwzorowanie kolorów. [DO POTWIERDZENIA: obsługiwane programy RIP.]' },
    { id: 'faq-20', title: 'Czy stosujecie oryginalne części zamienne?', items: [], answer: 'Dobór części zależy od modelu, dostępności i rodzaju naprawy. Przed realizacją informujemy o zakresie prac i kosztach.' },
    { id: 'faq-21', title: 'Czy naprawa drukarki DTG zawsze się opłaca?', items: [], answer: 'Nie zawsze. Jeśli koszt naprawy jest wysoki w stosunku do wartości urządzenia, informujemy o tym po diagnostyce przed rozpoczęciem prac.' },
    { id: 'faq-22', title: 'Czy serwisujecie prasy termiczne i urządzenia do pretreatu?', items: [], answer: '[DO POTWIERDZENIA: czy serwis obejmuje prasy termiczne, maszyny do nanoszenia pretreatu i suszarki.]' },
  ]
}

export const createDtgPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applyDtgCleaningSection(sections)
  applyDtgRepairsSection(sections)
  applyDtgFaqSection(sections)
  return sections
}
