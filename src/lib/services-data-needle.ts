import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

const applyNeedleCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service: 'PREMIUM (pełna konserwacja)\n\nzakres usługi obejmuje:\n• konserwacja całego mechanizmu uderzeniowego (smarowanie i regulacja igieł oraz prowadnic),\n• pełne czyszczenie i regeneracja toru papieru,\n• kontrola i kalibracja mechanizmu podawania,\n• czyszczenie elektroniki z pyłu,\n• test końcowy wydruku i reset liczników serwisowych.',
      price: '150 / 200 / 250',
      duration: '1–3 dni',
    },
  ]
}

export const createNeedlePricingSections = (): PricingSection[] => {
  const sections = createPricingSections()

  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  const diagnosisItem = diagnosisSection?.items[3]
  if (diagnosisItem) {
    diagnosisItem.price = '80 / 100 / 150'
  }

  applyNeedleCleaningSection(sections)

  const naprawySection = sections.find(section => section.id === 'naprawy')
  const softwareSubcategory = naprawySection?.subcategories?.find(sub => sub.id === 'naprawy-software')
  if (softwareSubcategory) {
    softwareSubcategory.icon = '/images/naprawy-oprogramowanie-v3.webp'
  }

  return sections
}
