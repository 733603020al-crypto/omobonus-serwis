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

export const createNeedlePricingSections = (): PricingSection[] => {
  const sections = createPricingSections()

  applyNeedleCleaningSection(sections)

  const naprawySection = sections.find(section => section.id === 'naprawy')

  const mechanizmSub = naprawySection?.subcategories?.find(sub => sub.id === 'naprawy-mechanizm')
  if (mechanizmSub) {
    mechanizmSub.title = 'Mechanizm transportu papieru'
    mechanizmSub.closedSuffix = ': traktor, wałek, rolki prowadzące'
  }

  const dodatkoweSub = naprawySection?.subcategories?.find(sub => sub.id === 'naprawy-dodatkowe')
  if (dodatkoweSub) {
    dodatkoweSub.items = dodatkoweSub.items.filter(
      item => !item.service.includes('zalaniu tonerem') && !item.service.includes('Ocena stanu urządzenia przed zakupem')
    )
  }

  const karetkaSub = naprawySection?.subcategories?.find(sub => sub.id === 'naprawy-karetka')
  if (karetkaSub) karetkaSub.id = 'naprawy-glowica-matrycowa'

  const glowicaSub = naprawySection?.subcategories?.find(sub => sub.id === 'naprawy-glowica')
  if (glowicaSub) glowicaSub.id = 'naprawy-naped-kartridza'

  return sections
}
