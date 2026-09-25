import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

const apply3DPrinterCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PEŁNA KONSERWACJA\u2028[[kompleksowe ]]czyszczenie, kontrola i kalibracja drukarki 3D\n• dokładne czyszczenie wnętrza drukarki, prowadnic, śrub, osi i stołu roboczego,\n• **czyszczenie hotendu, dyszy i ekstrudera oraz kontrola układu podawania filamentu,**\n• kontrola i regulacja pasków, prowadnic, łożysk i mechanizmów napędowych,\n• smarowanie wymagających tego elementów mechanicznych,\n• kontrola czujników, krańcówek, chłodzenia i podstawowych połączeń,\n• kalibracja stołu i osi oraz końcowy test wydruku i korekta parametrów.\ndla dużych przemysłowych drukarek 3D – **wycena indywidualna**',
    },
  ]
}

const apply3DPrinterMechanicsSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const mechanicsSubcategory = serviceSection?.subcategories?.[0]
  if (!mechanicsSubcategory) return
  mechanicsSubcategory.title = 'Mechanika i układ ruchu (osie, paski, ekstruder)'
  mechanicsSubcategory.items = [
    {
      service: 'Regulacja i kalibracja osi X / Y / Z\n(nierówne warstwy, przesunięcia, stuki podczas ruchu)',
    },
    {
      service: 'Regulacja lub wymiana pasków i napinaczy\n(luzy, przeskakiwanie, utrata dokładności druku)',
    },
    {
      service: 'Serwis ekstrudera i hotendu\n(zatykanie, brak podawania filamentu, wycieki)',
    },
    {
      service: 'Czyszczenie i naprawa układu podawania filamentu\n(ślizganie filamentu, nieregularne podawanie)',
    },
    {
      service: 'Naprawa systemu chłodzenia (wentylatory, kanały)\n(przegrzewanie, deformacje wydruku)',
    },
  ]
}

const apply3DPrinterElectronicsSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const electronicsSubcategory = serviceSection?.subcategories?.[1]
  if (!electronicsSubcategory) return
  electronicsSubcategory.title = 'Elektronika i sterowanie (płyta główna, czujniki, okablowanie)'
  electronicsSubcategory.items = [
    {
      service: 'Diagnostyka i naprawa płyty głównej\n(błędy systemowe, brak reakcji, resetowanie się drukarki)',
    },
    {
      service: 'Wymiana lub naprawa czujników (endstop, BL-Touch, termistory)\n(błędy osi, problemy z poziomowaniem, błędy temperatury)',
    },
    {
      service: 'Naprawa lub wymiana okablowania i złączy\n(przerywanie pracy, zaniki sygnału, niestabilność)',
    },
    {
      service: 'Naprawa układów zasilania (zasilacz, przewody)\n(brak zasilania, wyłączanie się drukarki)',
    },
    {
      service: 'Wgrywanie, reset i konfiguracja firmware\n(błędy oprogramowania, nieprawidłowe działanie po aktualizacji)',
    },
  ]
}

const apply3DPrinterCalibrationSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const calibrationSubcategory = serviceSection?.subcategories?.[2]
  if (!calibrationSubcategory) return
  calibrationSubcategory.title = 'Kalibracja i jakość druku'
  calibrationSubcategory.items = [
    {
      service: 'Precyzyjna kalibracja poziomowania stołu (manual / auto-bed leveling)\n(problemy z pierwszą warstwą, słaba przyczepność)',
    },
    {
      service: 'Kalibracja ekstrudera (E-steps, flow, retrakcja)\n(nitkowanie, niedolewanie, przelewanie filamentu)',
    },
    {
      service: 'Kalibracja osi i geometrii drukarki\n(przekoszenia, nierówne ściany, przesunięcia warstw)',
    },
    {
      service: 'Testy jakości wydruku i korekta profilu materiału\n(PLA, PETG, ABS, TPU)',
    },
    {
      service: 'Optymalizacja parametrów pod konkretny model / detal\n(druk techniczny, dokładność wymiarowa)',
    },
  ]
}

const apply3DPrinterSoftwareSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const softwareSubcategory = serviceSection?.subcategories?.[3]
  if (!softwareSubcategory) return
  softwareSubcategory.title = 'Oprogramowanie i konfiguracja'
  softwareSubcategory.items = [
    {
      service: 'Instalacja i konfiguracja firmware (Marlin, Klipper, itp.)\n(błędy systemowe, potrzeba aktualizacji lub zmiany funkcji)',
    },
    {
      service: 'Konfiguracja slicera i profili materiałów\n(Cura, PrusaSlicer, Bambu Studio itp.)',
    },
    {
      service: 'Integracja z siecią i zdalne sterowanie (OctoPrint, Klipper UI)\n(zdalny monitoring, sterowanie z telefonu/PC)',
    },
    {
      service: 'Backup i przywracanie ustawień drukarki\n(po awarii, aktualizacji, wymianie elektroniki)',
    },
    {
      service: 'Szkolenie z obsługi i konfiguracji drukarki\n(dla nowych użytkowników lub firm)',
    },
  ]
}

const apply3DPrinterAdditionalSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const additionalSubcategory = serviceSection?.subcategories?.[4]
  if (!additionalSubcategory) return
  additionalSubcategory.title = 'Dodatkowe usługi (tuning i modyfikacje)'
  additionalSubcategory.items = [
    {
      service: 'Montaż i konfiguracja auto-levelingu (BL-Touch, CR-Touch itp.)',
    },
    {
      service: 'Upgrade ekstrudera (direct drive, all-metal hotend)',
    },
    {
      service: 'Modyfikacje pod materiały techniczne (ABS, nylon, CF)\n(komora, chłodzenie, ustawienia)',
    },
    {
      service: 'Usuwanie poważnych zatorów i regeneracja hotendu\n(cold pull, czyszczenie chemiczne, wymiana elementów)',
    },
    {
      service: 'Indywidualne modyfikacje na zamówienie\nwycena indywidualna wg ustaleń',
    },
  ]
}

export const create3DPrinterPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()

  apply3DPrinterCleaningSection(sections)

  const repairsSection = sections.find(s => s.id === 'naprawy')
  if (repairsSection) {
    // Resetuj podkategorie, aby nie pokazywały się te od laserówek
    repairsSection.subcategories = [
      { id: '3d-mechanics', title: '', items: [] },
      { id: '3d-electronics', title: '', items: [] },
      { id: '3d-calibration', title: '', items: [] },
      { id: '3d-software', title: '', items: [] },
      { id: '3d-additional', title: '', items: [] },
    ]
  }

  apply3DPrinterMechanicsSubcategory(sections)
  apply3DPrinterElectronicsSubcategory(sections)
  apply3DPrinterCalibrationSubcategory(sections)
  apply3DPrinterSoftwareSubcategory(sections)
  apply3DPrinterAdditionalSubcategory(sections)

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
