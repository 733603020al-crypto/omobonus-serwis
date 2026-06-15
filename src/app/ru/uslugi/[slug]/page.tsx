import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { servicesRu } from '@/lib/services-data-ru'
import { serviceHeroLabelsRu } from '@/lib/service-hero-labels-ru'
import { ru } from '@/lib/i18n/ru'
import { ServicePageTemplate, type RelatedService } from '@/components/service-page-template'
import { headingsRu, seoBlocksRu, imageAltRu, subServiceTitlesRu, seoMetadataRu, labelsRu } from '@/lib/services-meta-ru'
import { serviceImageSrc, serviceIconSrc, slugBrands, relatedServiceSlugs } from '@/lib/services-meta-shared'

export async function generateStaticParams() {
  return servicesRu.map(service => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = servicesRu.find(s => s.slug === slug)
  const seo = seoMetadataRu[slug]

  if (!service || !seo) {
    return { title: 'Услуга не найдена' }
  }

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `https://serwis.omobonus.com.pl/ru/uslugi/${slug}`,
      languages: {
        'pl': `https://serwis.omobonus.com.pl/uslugi/${slug}`,
        'uk': `https://serwis.omobonus.com.pl/uk/uslugi/${slug}`,
        'ru': `https://serwis.omobonus.com.pl/ru/uslugi/${slug}`,
        'x-default': `https://serwis.omobonus.com.pl/uslugi/${slug}`,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://serwis.omobonus.com.pl/ru/uslugi/${slug}`,
      images: [
        {
          url: slug === 'naprawa-drukarek' ? 'https://serwis.omobonus.com.pl/images/Serwis_Drukarek.webp' : service.icon,
          width: 400,
          height: 400,
          alt: service.title,
        },
      ],
    },
  }
}

export default async function RuServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = servicesRu.find(s => s.slug === slug)
  const heroLabels = serviceHeroLabelsRu[slug] || []

  if (!service) {
    notFound()
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: seoMetadataRu[slug]?.description || service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Omobonus Serwis',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Marcina Bukowskiego 174',
        addressLocality: 'Wrocław',
        postalCode: '52-418',
        addressCountry: 'PL',
      },
      telephone: '+48793759262',
    },
    areaServed: {
      '@type': 'City',
      name: 'Wrocław',
    },
    url: `https://serwis.omobonus.com.pl/ru/uslugi/${slug}`,
  }

  const relatedServices: RelatedService[] = servicesRu
    .filter(s => relatedServiceSlugs.includes(s.slug))
    .map(s => ({
      slug: s.slug,
      title: s.title,
      displayTitle: subServiceTitlesRu[s.slug] || s.title,
      iconSrc: serviceIconSrc[s.slug] || s.icon,
    }))

  return (
    <ServicePageTemplate
      locale="ru"
      slug={slug}
      service={service}
      heroLabels={heroLabels}
      headings={headingsRu[slug] ?? { h1: service.title }}
      seoBlocks={seoBlocksRu[slug]}
      slugBrands={slugBrands[slug]}
      imageSrc={serviceImageSrc[slug] || service.icon}
      imageAlt={imageAltRu[slug] || service.title}
      basePath="/ru/uslugi"
      labels={labelsRu}
      relatedServices={relatedServices}
      jsonLd={serviceJsonLd}
      footerT={ru.footer}
    />
  )
}
