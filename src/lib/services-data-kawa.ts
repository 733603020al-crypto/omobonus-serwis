import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'
import { kawaRepairSubcategories } from './services-data-kawa-repairs'

// serwis-ekspresow-do-kawy — własne dane strony (PL = źródło prawdy dla UK/RU).
// Wszystkie ikony (sekcje i grupy Naprawy) — właściwe zdjęcia od właściciela.
export const KAWA_PRICE_TOOLTIP =
  'Ceny netto za robociznę, bez części i atramentu. Przy pełnej konserwacji standardowe płyny czyszczące i drobne materiały serwisowe są wliczone w cenę. Czas realizacji nie obejmuje oczekiwania na części.'

const applyKawaCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PEŁNA KONSERWACJA\u2028Czyszczenie, konserwacja i wymiana standardowych uszczelek\n• odkamienianie układu wodnego;\n• czyszczenie układu kawowego;\n• czyszczenie i konserwacja zaparzacza;\n• czyszczenie młynka, regulacja w razie potrzeby;\n• czyszczenie układu mlecznego;\n• czyszczenie wylewek, dysz i odpływów;\n• czyszczenie wnętrza ekspresu;\n• kontrola uszczelek, zaworów i szczelności;\n• smarowanie mechanizmów i wymiana standardowych uszczelek oraz O-ringów;\n• kontrola parametrów parzenia i test działania.\nZakres prac zależy od konstrukcji urządzenia.',
      price: '250 / 350 / 550',
    },
  ]
  cleaningSection.notes = [
    'W cenie: profesjonalne środki czyszczące i odkamieniające, smary dopuszczone do kontaktu z żywnością, standardowe uszczelki i O-ringi oraz drobne materiały serwisowe.',
    'Dodatkowo płatne: filtry wody, specjalistyczne zestawy uszczelek, uszkodzone części zamienne i naprawy — po wcześniejszej akceptacji Klienta.',
  ]
}

const applyKawaRepairsSection = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection) return
  repairsSection.subcategories = kawaRepairSubcategories('pl')
}

// Dojazd tej strony: 1,50 zł/km liczone od całej trasy tam i z powrotem ponad pierwsze 5 km
const applyKawaDojazdSection = (sections: PricingSection[]) => {
  const dojazd = sections.find(section => section.id === 'dojazd')
  if (!dojazd?.items[2]) return
  dojazd.items[2] = {
    ...dojazd.items[2],
    service: 'Odbiór lub dostawa powyżej 2,5 km od serwisu (1,50 zł za każdy dodatkowy km całej trasy tam i z powrotem ponad pierwsze 5 km)',
  }
}

const applyKawaFaqSection = (sections: PricingSection[]) => {
  const faq = sections.find(section => section.id === 'faq')
  if (!faq) return
  faq.subcategories = [
    { id: 'faq-1', title: "Ile kosztuje naprawa ekspresu do kawy?", items: [], answer: "Ceny poszczególnych napraw znajdziesz w naszym cenniku. Koszt zależy od rodzaju usterki i klasy ekspresu: domowego, biurowego lub profesjonalnego. Podane ceny są kwotami netto, a potrzebne części zamienne rozliczamy osobno." },
    { id: 'faq-2', title: "Czy diagnostyka ekspresu jest bezpłatna?", items: [], answer: "Tak, diagnostyka jest bezpłatna, jeśli zdecydujesz się na naprawę. W przypadku rezygnacji koszt wynosi 80 zł netto dla ekspresów domowych, 120 zł netto dla biurowych i premium oraz 180 zł netto dla profesjonalnych i gastronomicznych." },
    { id: 'faq-3', title: "Czy poznam koszt naprawy przed rozpoczęciem prac?", items: [], answer: "Tak. Po diagnostyce przedstawiamy zakres naprawy oraz koszt robocizny i potrzebnych części. Dodatkowe płatne prace wykonujemy wyłącznie po Twojej akceptacji." },
    { id: 'faq-4', title: "Ile trwa naprawa ekspresu do kawy?", items: [], answer: "Orientacyjny czas realizacji podajemy przy każdej usłudze w cenniku, zwykle w dniach roboczych. Termin oznacza przewidywany czas do odbioru sprawnego ekspresu, a nie czas samej pracy technika. Dostępność części może go wydłużyć." },
    { id: 'faq-5', title: "Czy naprawiacie ekspresy domowe, biurowe i gastronomiczne?", items: [], answer: "Tak, nasza oferta obejmuje ekspresy domowe, biurowe i premium oraz profesjonalne i gastronomiczne. Możliwość naprawy konkretnego urządzenia zależy od jego marki, modelu i rodzaju usterki." },
    { id: 'faq-6', title: "Czy naprawiacie ekspresy kolbowe?", items: [], answer: "Tak, również ekspresy kolbowe, zarówno domowe, jak i profesjonalne. Wykonujemy między innymi naprawy pomp, zaworów, bojlerów i grup zaparzających." },
    { id: 'faq-7', title: "Czy warto naprawiać stary lub tani ekspres?", items: [], answer: "Zależy to od wartości urządzenia, rodzaju usterki i kosztu części. Jeżeli naprawa jest nieopłacalna, informujemy o tym przed rozpoczęciem prac. Ostateczna decyzja należy do Ciebie." },
    { id: 'faq-8', title: "Dlaczego ekspres nie pobiera wody?", items: [], answer: "Przyczyną może być zapowietrzony obieg, niedrożny przewód, uszkodzona pompa, przepływomierz lub zawór. Najpierw ustalamy źródło problemu, a następnie dobieramy odpowiednią naprawę." },
    { id: 'faq-9', title: "Dlaczego kawa wypływa bardzo wolno lub ekspres ma słabe ciśnienie?", items: [], answer: "Problem może wynikać z zatkanego układu wodnego, zużytej pompy, uszkodzonego zaworu lub nieprawidłowego mielenia kawy. Dokładną przyczynę ustalamy podczas diagnostyki." },
    { id: 'faq-10', title: "Dlaczego pod ekspresem zbiera się woda?", items: [], answer: "Najczęściej winne są nieszczelne przewody, zużyte uszczelki, uszkodzone złączki lub zawory. Jeśli woda wydostaje się z obudowy, najlepiej odłączyć urządzenie od zasilania i nie używać go do czasu sprawdzenia." },
    { id: 'faq-11', title: "Dlaczego ekspres nie podgrzewa wody lub robi zimną kawę?", items: [], answer: "Może to oznaczać awarię termobloku, grzałki, termostatu, czujnika temperatury lub układu sterowania. Sprawdzamy elementy odpowiedzialne za nagrzewanie i wymieniamy uszkodzone części." },
    { id: 'faq-12', title: "Co zrobić, gdy młynek nie mieli kawy?", items: [], answer: "Sprawdź, czy w pojemniku są ziarna i czy mechanizm nie został zablokowany. Jeśli młynek buczy, zatrzymuje się lub pracuje nienaturalnie głośno, może wymagać naprawy silnika, żaren albo całego zespołu." },
    { id: 'faq-13', title: "Dlaczego ekspres nie spienia mleka?", items: [], answer: "Przyczyną bywa zatkana dysza, zabrudzony układ mleczny, nieszczelność przewodu lub uszkodzony zawór. Jeśli zwykłe czyszczenie nie pomaga, sprawdzamy elementy odpowiedzialne za pobieranie i spienianie mleka." },
    { id: 'faq-14', title: "Co zrobić, gdy ekspres wyświetla błąd?", items: [], answer: "Zapisz treść komunikatu lub jego kod oraz model urządzenia. Różne błędy mogą wskazywać na problemy z zaparzaczem, czujnikami, przepływem wody lub elektroniką. Nie zalecamy wielokrotnego uruchamiania urządzenia, jeśli mechanizm jest zablokowany." },
    { id: 'faq-15', title: "Dlaczego blok zaparzający się zacina?", items: [], answer: "Powodem może być uszkodzony napęd, zużyte koła zębate, nieszczelny tłok lub mechaniczne zablokowanie zaparzacza. Nie wyciągaj bloku na siłę — może to spowodować dalsze uszkodzenia." },
    { id: 'faq-16', title: "Czy naprawiacie elektronikę i panele sterowania?", items: [], answer: "Tak, oferta obejmuje diagnostykę i naprawy układów elektronicznych, zasilania, wyświetlaczy oraz paneli sterowania. Możliwość naprawy lub wymiany zależy od rodzaju uszkodzenia i dostępności podzespołów." },
    { id: 'faq-17', title: "Czy usuwacie kamień i osady z wnętrza ekspresu?", items: [], answer: "Tak. Czyszczenie, odkamienianie i konserwacja są odrębnymi usługami od napraw. Jeśli kamień spowodował awaryjne zatkanie przewodu lub uszkodzenie podzespołu, konieczne może być dodatkowe udrożnienie albo naprawa." },
    { id: 'faq-18', title: "Czym różni się konserwacja od naprawy ekspresu?", items: [], answer: "Konserwacja obejmuje czynności zapobiegające awariom, takie jak czyszczenie, odkamienianie, kontrola uszczelnień i obsługa mechanizmów. Naprawa polega na usunięciu konkretnej usterki lub wymianie uszkodzonego elementu." },
    { id: 'faq-19', title: "Czy za testy po naprawie trzeba dodatkowo zapłacić?", items: [], answer: "Nie pobieramy osobnej opłaty za standardowe testy niezbędne do sprawdzenia prawidłowego działania naprawionego podzespołu. Są one częścią wykonanej naprawy." },
    { id: 'faq-20', title: "Czy części zamienne są wliczone w cenę naprawy?", items: [], answer: "Nie. Ceny napraw w cenniku dotyczą wykonanej pracy i są podawane netto. Koszt wymaganych części zamiennych przedstawiamy osobno, przed rozpoczęciem naprawy." },
    { id: 'faq-21', title: "Czy stosujecie oryginalne części zamienne?", items: [], answer: "Dobieramy części odpowiednie do marki i modelu urządzenia. Jeśli dostępne są różne warianty części, przedstawiamy możliwości i uwzględniamy je w wycenie przed naprawą." },
    { id: 'faq-22', title: "Czy mogę wysłać ekspres do naprawy kurierem z innego miasta?", items: [], answer: "Tak, przyjmujemy ekspresy do kawy z całej Polski. Możesz zamówić kuriera i wysłać urządzenie do naszego serwisu we Wrocławiu. Przed wysyłką opróżnij ekspres z wody, mleka i ziaren kawy oraz starannie zabezpiecz go na czas transportu." },
    { id: 'faq-23', title: "Czy naprawiacie ekspresy w biurach, kawiarniach i restauracjach?", items: [], answer: "Tak, obsługujemy również urządzenia używane w firmach i gastronomii. W przypadku większych ekspresów zakres naprawy i możliwość pracy na miejscu ustalamy indywidualnie." },
    { id: 'faq-24', title: "Czy udzielacie gwarancji na wykonaną naprawę?", items: [], answer: "Na wykonaną naprawę udzielamy 6 miesięcy gwarancji serwisowej. Gwarancja dotyczy wykonanej pracy i naprawionej usterki. Nie obejmuje innych, niezwiązanych z naprawą awarii." },
    { id: 'faq-25', title: "Czy mogę oddać do naprawy ekspres, który nie był wcześniej serwisowany?", items: [], answer: "Tak. Przyjmujemy również ekspresy, które nie przechodziły regularnej konserwacji. Najpierw sprawdzamy stan urządzenia i przyczynę usterki, a następnie przedstawiamy zakres potrzebnych prac oraz ich koszt." },
    { id: 'faq-26', title: "Czy mogę otrzymać wymienione części po naprawie ekspresu?", items: [], answer: "Tak. Po naprawie zwracamy Klientowi wymienione części, aby mógł zobaczyć, które elementy zostały wymienione. Zależy nam na przejrzystości i uczciwości — dokładnie informujemy o wykonanych pracach i zastosowanych częściach zamiennych." },
  ]
}

export const createKawaPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applyKawaCleaningSection(sections)
  applyKawaRepairsSection(sections)
  applyKawaDojazdSection(sections)
  applyKawaFaqSection(sections)
  return sections
}
