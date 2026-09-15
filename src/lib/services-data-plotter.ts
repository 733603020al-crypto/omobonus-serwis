import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

const applyPlotterCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PODSTAWOWY (przegląd i profilaktyka)\n\nzakres usługi obejmuje:\n• czyszczenie wszystkich prowadnic, rolek i elementów mechanicznych — usuwanie kurzu, zanieczyszczeń i resztek materiałów drukujących\n• kontrola i czyszczenie układu podawania papieru / mediów drukujących\n• sprawdzenie i usunięcie zatorów w kanałach transportu materiału\n• kontrola i czyszczenie układu atramentowego / głowicy drukującej od strony użytkownika\n• czyszczenie powierzchni roboczej i obszarów kontaktu z materiałem\n• szybki przegląd układu elektronicznego i złączy\n• test podstawowej kalibracji osi i pozycji elementów',
      price: '349 zł',
      duration: '1–3 dni',
    },
    {
      service:
        'STANDARD (rozszerzona konserwacja)\n\nzakres PODSTAWOWY +\n• czyszczenie i regulacja napinaczy, pasów napędowych i prowadnic\n• smarowanie prowadnic liniowych, rolek i elementów ruchomych\n• kontrola i czyszczenie sensorów oraz krańcówek\n• sprawdzenie systemów odsysania / wspomagających (jeśli występują)\n• kontrola i czyszczenie elementów chłodzenia (jeśli występują)',
      price: '499 zł',
      duration: '1–3 dni',
    },
    {
      service:
        'PREMIUM (pełna konserwacja techniczna)\n\nzakres STANDARD +\n• precyzyjna kalibracja osi X/Y oraz toru transportu mediów\n• zaawansowane czyszczenie głowicy (manualne + chemiczne) i kanałów atramentu\n• pełny przegląd wszystkich podzespołów ruchomych i sensorów\n• kontrola i optymalizacja chłodzenia\n• reset i aktualizacja firmware (jeśli możliwe)\n• test wydruku i korekta parametrów po testach',
      price: '699 zł',
      duration: '2–4 dni',
    },
  ]
}

const applyPlotterMechanicsSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const mechanicsSubcategory = serviceSection?.subcategories?.find(sub => sub.id === 'plotter-mechanics')
  if (!mechanicsSubcategory) return
  mechanicsSubcategory.title = 'Mechanika i transport mediów'
  mechanicsSubcategory.items = [
    {
      service: 'Regulacja toru przesuwu papieru\n(krzywe prowadzenie, przekosy wydruku)',
      price: '180 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Czyszczenie i regulacja rolek transportowych\n(ślizganie się papieru, zatrzymywanie wydruku)',
      price: '180 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Wymiana rolek transportowych (bez części)\n(zużyte rolki, błędy podawania)',
      price: '220 zł + części',
      duration: '1–3 dni',
    },
    {
      service: 'Naprawa mechanizmu podajnika roli\n(brak pobierania materiału)',
      price: '250 zł + części',
      duration: '1–3 dni',
    },
    {
      service: 'Usuwanie zacięć w torze papieru\n(blokady wewnątrz urządzenia)',
      price: '150 zł',
      duration: 'do 1 dnia',
    },
  ]
}

const applyPlotterInkSystemSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const inkSubcategory = serviceSection?.subcategories?.find(sub => sub.id === 'plotter-ink')
  if (!inkSubcategory) return
  inkSubcategory.title = 'Układ atramentowy i głowice'
  inkSubcategory.items = [
    {
      service: 'Serwis stacji serwisowej (capping, wiper)\n(zasychanie głowic, smugi)',
      price: '200 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Ręczne czyszczenie głowicy\n(brakujące linie, pasy)',
      price: '200 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Płukanie układu atramentowego\n(zasychający atrament)',
      price: '250 zł',
      duration: '1–3 dni',
    },
    {
      service: 'Wymiana głowicy (bez części)\n(uszkodzona głowica)',
      price: '200 zł + części',
      duration: '1–2 dni',
    },
    {
      service: 'Odpowietrzanie układu atramentu\n(przerywany wydruk)',
      price: '180 zł',
      duration: '1–2 dni',
    },
  ]
}

const applyPlotterElectronicsSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const electronicsSubcategory = serviceSection?.subcategories?.find(sub => sub.id === 'plotter-electronics')
  if (!electronicsSubcategory) return
  electronicsSubcategory.title = 'Elektronika i czujniki'
  electronicsSubcategory.items = [
    {
      service: 'Diagnostyka elektroniki\n(błędy systemowe, brak startu)',
      price: '150 zł',
      duration: 'do 1 dnia',
    },
    {
      service: 'Wymiana czujników i enkoderów (bez części)\n(błędy pozycji)',
      price: '180 zł + części',
      duration: '1–2 dni',
    },
    {
      service: 'Naprawa okablowania\n(losowe błędy)',
      price: '180 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Naprawa płyty sterującej\n(brak komunikacji)',
      price: 'od 250 zł',
      duration: '2–4 dni',
    },
  ]
}

const applyPlotterCalibrationSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const calibrationSubcategory = serviceSection?.subcategories?.find(sub => sub.id === 'plotter-calibration')
  if (!calibrationSubcategory) return
  calibrationSubcategory.title = 'Kalibracja i jakość wydruku'
  calibrationSubcategory.items = [
    {
      service: 'Kalibracja przesuwu i osi\n(rozjechane linie)',
      price: '180 zł',
      duration: 'do 1 dnia',
    },
    {
      service: 'Kalibracja kolorów i profili\n(różnice kolorów)',
      price: '250 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Usuwanie pasów i artefaktów\n(smugi, nierówności)',
      price: '200 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Test wydruku z korektą ustawień\n(kontrola jakości)',
      price: '150 zł',
      duration: 'do 1 dnia',
    },
  ]
}

const applyPlotterSoftwareSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const softwareSubcategory = serviceSection?.subcategories?.find(sub => sub.id === 'plotter-software')
  if (!softwareSubcategory) return
  softwareSubcategory.title = 'Oprogramowanie i konfiguracja'
  softwareSubcategory.icon = '/images/naprawy-oprogramowanie-v3.webp'
  softwareSubcategory.items = [
    {
      service: 'Aktualizacja firmware\n(błędy systemowe)',
      price: '120 zł',
      duration: 'do 1 dnia',
    },
    {
      service: 'Konfiguracja sterowników / RIP\n(problemy z formatem)',
      price: '180 zł',
      duration: 'do 1 dnia',
    },
    {
      service: 'Konfiguracja sieciowa\n(brak połączenia)',
      price: '150 zł',
      duration: 'do 1 dnia',
    },
    {
      service: 'Pełna rekonfiguracja po awarii\n(reset + kalibracja)',
      price: '220 zł',
      duration: '1–2 dni',
    },
  ]
}

export const createPlotterPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  const diagnosisItem = diagnosisSection?.items[3]
  if (diagnosisItem) {
    diagnosisItem.price = '150'
  }


  applyPlotterCleaningSection(sections)

  const repairsSection = sections.find(s => s.id === 'naprawy')
  if (repairsSection) {
    // Resetuj podkategorie, aby nie pokazywały się te od laserówek
    repairsSection.subcategories = [
      { id: 'plotter-mechanics', title: '', items: [] },
      { id: 'plotter-ink', title: '', items: [] },
      { id: 'plotter-electronics', title: '', items: [] },
      { id: 'plotter-calibration', title: '', items: [] },
      { id: 'plotter-software', title: '', items: [] },
    ]
  }

  applyPlotterMechanicsSubcategory(sections)
  applyPlotterInkSystemSubcategory(sections)
  applyPlotterElectronicsSubcategory(sections)
  applyPlotterCalibrationSubcategory(sections)
  applyPlotterSoftwareSubcategory(sections)

  return sections
}
