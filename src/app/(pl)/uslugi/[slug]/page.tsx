import { notFound } from "next/navigation"
import { Metadata } from "next"
import { services } from "@/lib/services-data"
import { serviceHeroLabels } from "@/lib/service-hero-labels"
import { ServicePageTemplate, type RelatedService } from "@/components/service-page-template"
import { headings, seoBlocks, imageAlt, subServiceTitles, seoMetadata, labels } from "@/lib/services-meta-pl"
import { serviceImageSrc, serviceIconSrc, slugBrands, relatedServiceSlugs } from "@/lib/services-meta-shared"

export async function generateStaticParams() {
  return services.map(service => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)

  const seo = seoMetadata[slug]

  if (!service || !seo) {
    return {
      title: 'Usługa nie znaleziona',
    }
  }

  return {
    title: seo.title,
    description: seo.description,

    alternates: {
      canonical: `https://serwis.omobonus.com.pl/uslugi/${slug}`,
      languages: {
        'pl': `https://serwis.omobonus.com.pl/uslugi/${slug}`,
        'uk': `https://serwis.omobonus.com.pl/uk/uslugi/${slug}`,
        'x-default': `https://serwis.omobonus.com.pl/uslugi/${slug}`,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://serwis.omobonus.com.pl/uslugi/${slug}`,
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

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)
  const heroLabels = serviceHeroLabels[slug] || []

  if (!service) {
    notFound()
  }

  // Schema.org Service structured data
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: seoMetadata[slug]?.description || service.description,
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
    url: `https://serwis.omobonus.com.pl/uslugi/${slug}`,
  }

  const relatedServices: RelatedService[] = services
    .filter(s => relatedServiceSlugs.includes(s.slug))
    .map(s => ({
      slug: s.slug,
      title: s.title,
      displayTitle: subServiceTitles[s.slug] || s.title,
      iconSrc: serviceIconSrc[s.slug] || s.icon,
    }))

  return (
    <ServicePageTemplate
      locale="pl"
      slug={slug}
      service={service}
      heroLabels={heroLabels}
      headings={headings[slug] ?? { h1: service.title }}
      seoBlocks={seoBlocks[slug]}
      slugBrands={slugBrands[slug]}
      imageSrc={serviceImageSrc[slug] || service.icon}
      imageAlt={imageAlt[slug] || service.title}
      basePath="/uslugi"
      labels={labels}
      relatedServices={relatedServices}
      jsonLd={serviceJsonLd}
    />
  )
}
