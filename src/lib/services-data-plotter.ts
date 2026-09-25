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

const applyPlotterMechanicsSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const mechanicsSubcategory = serviceSection?.subcategories?.find(sub => sub.id === 'plotter-mechanics')
  if (!mechanicsSubcategory) return
  mechanicsSubcategory.title = 'Mechanika i transport mediów'
  mechanicsSubcategory.items = [
    {
      service: 'Regulacja toru przesuwu papieru\n(krzywe prowadzenie, przekosy wydruku)',
    },
    {
      service: 'Czyszczenie i regulacja rolek transportowych\n(ślizganie się papieru, zatrzymywanie wydruku)',
    },
    {
      service: 'Wymiana rolek transportowych (bez części)\n(zużyte rolki, błędy podawania)',
    },
    {
      service: 'Naprawa mechanizmu podajnika roli\n(brak pobierania materiału)',
    },
    {
      service: 'Usuwanie zacięć w torze papieru\n(blokady wewnątrz urządzenia)',
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
    },
    {
      service: 'Ręczne czyszczenie głowicy\n(brakujące linie, pasy)',
    },
    {
      service: 'Płukanie układu atramentowego\n(zasychający atrament)',
    },
    {
      service: 'Wymiana głowicy (bez części)\n(uszkodzona głowica)',
    },
    {
      service: 'Odpowietrzanie układu atramentu\n(przerywany wydruk)',
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
    },
    {
      service: 'Wymiana czujników i enkoderów (bez części)\n(błędy pozycji)',
    },
    {
      service: 'Naprawa okablowania\n(losowe błędy)',
    },
    {
      service: 'Naprawa płyty sterującej\n(brak komunikacji)',
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
    },
    {
      service: 'Kalibracja kolorów i profili\n(różnice kolorów)',
    },
    {
      service: 'Usuwanie pasów i artefaktów\n(smugi, nierówności)',
    },
    {
      service: 'Test wydruku z korektą ustawień\n(kontrola jakości)',
    },
  ]
}

const applyPlotterSoftwareSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const softwareSubcategory = serviceSection?.subcategories?.find(sub => sub.id === 'plotter-software')
  if (!softwareSubcategory) return
  softwareSubcategory.title = 'Oprogramowanie i konfiguracja'
  softwareSubcategory.items = [
    {
      service: 'Aktualizacja firmware\n(błędy systemowe)',
    },
    {
      service: 'Konfiguracja sterowników / RIP\n(problemy z formatem)',
    },
    {
      service: 'Konfiguracja sieciowa\n(brak połączenia)',
    },
    {
      service: 'Pełna rekonfiguracja po awarii\n(reset + kalibracja)',
    },
  ]
}

export const createPlotterPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
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
