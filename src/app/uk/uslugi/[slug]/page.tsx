import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { servicesUk } from '@/lib/services-data-uk'
import { serviceHeroLabelsUk } from '@/lib/service-hero-labels-uk'
import { uk } from '@/lib/i18n/uk'
import { ServicePageTemplate, type RelatedService } from '@/components/service-page-template'
import { headingsUk, seoBlocksUk, imageAltUk, subServiceTitlesUk, seoMetadataUk, labelsUk } from '@/lib/services-meta-uk'
import { serviceImageSrc, serviceIconSrc, slugBrands, relatedServiceSlugs, noindexSlugs } from '@/lib/services-meta-shared'

export async function generateStaticParams() {
  return servicesUk.map(service => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = servicesUk.find(s => s.slug === slug)
  const seo = seoMetadataUk[slug]

  if (!service || !seo) {
    return { title: 'Послугу не знайдено' }
  }

  return {
    title: seo.title,
    description: seo.description,
    ...(noindexSlugs.includes(slug) ? { robots: { index: false, follow: true } } : {}),

    alternates: {
      canonical: `https://serwis.omobonus.com.pl/uk/uslugi/${slug}`,
      languages: noindexSlugs.includes(slug) ? {
        // Tymczasowa strona bez odpowiedników — nie dodawać hreflang na noindexowaną PL i ewentualne RU
        'uk': `https://serwis.omobonus.com.pl/uk/uslugi/${slug}`,
        'x-default': `https://serwis.omobonus.com.pl/uk/uslugi/${slug}`,
      } : {
        'pl': `https://serwis.omobonus.com.pl/uslugi/${slug}`,
        'uk': `https://serwis.omobonus.com.pl/uk/uslugi/${slug}`,
        'ru': `https://serwis.omobonus.com.pl/ru/uslugi/${slug}`,
        'x-default': `https://serwis.omobonus.com.pl/uslugi/${slug}`,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://serwis.omobonus.com.pl/uk/uslugi/${slug}`,
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

export default async function UkServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = servicesUk.find(s => s.slug === slug)
  const heroLabels = serviceHeroLabelsUk[slug] || []

  if (!service) {
    notFound()
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: seoMetadataUk[slug]?.description || service.description,
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
    url: `https://serwis.omobonus.com.pl/uk/uslugi/${slug}`,
  }

  // FAQPage structured data — z tej samej sekcji "faq", która zasila akordeon FAQ na stronie
  const faqSubcategories = service.pricingSections.find(s => s.id === 'faq')?.subcategories
  const faqJsonLd = faqSubcategories?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqSubcategories
      .filter(sub => sub.answer)
      .map(sub => ({
        '@type': 'Question',
        name: sub.title.replace(/\*\*/g, ''),
        acceptedAnswer: {
          '@type': 'Answer',
          text: sub.answer!.replace(/\*\*/g, ''),
        },
      })),
  } : null

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Головна', item: 'https://serwis.omobonus.com.pl/uk' },
      { '@type': 'ListItem', position: 2, name: 'Послуги', item: 'https://serwis.omobonus.com.pl/uk/#uslugi' },
      { '@type': 'ListItem', position: 3, name: service.title, item: `https://serwis.omobonus.com.pl/uk/uslugi/${slug}` },
    ],
  }

  const relatedServices: RelatedService[] = servicesUk
    .filter(s => relatedServiceSlugs.includes(s.slug))
    .map(s => ({
      slug: s.slug,
      title: s.title,
      displayTitle: subServiceTitlesUk[s.slug] || s.title,
      iconSrc: serviceIconSrc[s.slug] || s.icon,
    }))

  return (
    <ServicePageTemplate
      locale="uk"
      slug={slug}
      service={service}
      heroLabels={heroLabels}
      headings={headingsUk[slug] ?? { h1: service.title }}
      seoBlocks={seoBlocksUk[slug]}
      slugBrands={slugBrands[slug]}
      imageSrc={serviceImageSrc[slug] || service.icon}
      imageAlt={imageAltUk[slug] || service.title}
      basePath="/uk/uslugi"
      labels={labelsUk}
      relatedServices={relatedServices}
      jsonLd={faqJsonLd ? [serviceJsonLd, breadcrumbJsonLd, faqJsonLd] : [serviceJsonLd, breadcrumbJsonLd]}
      footerT={uk.footer}
    />
  )
}
