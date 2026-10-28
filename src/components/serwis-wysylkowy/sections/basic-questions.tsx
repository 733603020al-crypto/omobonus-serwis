import '@/app/styles/accordion.css'
import ServiceAccordion from '@/components/service-accordion'
import { serviceAccordionI18n } from '@/lib/i18n/service-accordion'
import { getServiceDisplayPricing } from '@/lib/services-pricing'
import { services } from '@/lib/services-data'

// "Najważniejsze pytania": the "Naprawy i usługi serwisowe" block of a service page,
// open from the start. The questions inside are temporary until their texts are ready.
export function BasicQuestions() {
  const source = services.find((service) => service.slug === 'serwis-drukarek-atramentowych')
  if (!source) return null
  const service = {
    ...source,
    pricingSections: source.pricingSections
      .filter((section) => section.id === 'naprawy')
      .map((section) => ({ ...section, title: 'Najważniejsze pytania', mobileTitle: undefined, mobileOpenTitle: undefined })),
  }
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
      <ServiceAccordion
        service={service}
        locale="pl"
        t={serviceAccordionI18n.pl}
        pricing={getServiceDisplayPricing(source.slug, source.pricingSections, 'pl')}
        defaultOpenSection="naprawy"
      />
    </section>
  )
}
