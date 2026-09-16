import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

const applyNeedleCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service: 'PREMIUM (pełna konserwacja)\n\nzakres usługi obejmuje:\n• konserwacja całego mechanizmu uderzeniowego (smarowanie i regulacja igieł oraz prowadnic),\n• pełne czyszczenie i regeneracja toru papieru,\n• kontrola i kalibracja mechanizmu podawania,\n• czyszczenie elektroniki z pyłu,\n• test końcowy wydruku i reset liczników serwisowych.',
    },
  ]
}

export const createNeedlePricingSections = (): PricingSection[] => {
  const sections = createPricingSections()

  applyNeedleCleaningSection(sections)

  const naprawySection = sections.find(section => section.id === 'naprawy')
  const subcategoryIcons: Record<string, string> = {
    'naprawy-mechanizm': '/images/accordion-icon-iglowe-mechanizm-podawania.webp',
    'naprawy-karetka': '/images/accordion-icon-iglowe-glowica.webp',
    'naprawy-glowica': '/images/accordion-icon-iglowe-naped-karetki.webp',
    'naprawy-tasma': '/images/accordion-icon-iglowe-tasma.webp',
    'naprawy-elektronika': '/images/accordion-icon-iglowe-elektronika.webp',
    'naprawy-software': '/images/naprawy-oprogramowanie-iglowe-v1.webp',
    'naprawy-dodatkowe': '/images/accordion-icon-iglowe-uslugi-dodatkowe.webp',
  }
  naprawySection?.subcategories?.forEach(sub => {
    const icon = subcategoryIcons[sub.id]
    if (icon) sub.icon = icon
  })

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

  return sections
}
