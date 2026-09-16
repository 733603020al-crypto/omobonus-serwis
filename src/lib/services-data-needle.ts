import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

const applyNeedleCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service: 'PREMIUM (pełna konserwacja)\n\nzakres usługi obejmuje:\n• konserwacja całego mechanizmu uderzeniowego (smarowanie i regulacja igieł oraz prowadnic),\n• pełne czyszczenie i regeneracja toru papieru,\n• kontrola i kalibracja mechanizmu podawania,\n• czyszczenie elektroniki z pyłu,\n• test końcowy wydruku i reset liczników serwisowych.',
      duration: '1–3 dni',
    },
  ]
}

export const createNeedlePricingSections = (): PricingSection[] => {
  const sections = createPricingSections()

  applyNeedleCleaningSection(sections)

  const naprawySection = sections.find(section => section.id === 'naprawy')
  const softwareSubcategory = naprawySection?.subcategories?.find(sub => sub.id === 'naprawy-software')
  if (softwareSubcategory) {
    softwareSubcategory.icon = '/images/naprawy-oprogramowanie-v3.webp'
  }

  return sections
}
