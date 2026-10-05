import { notFound } from "next/navigation"
import { Metadata } from "next"
import { services } from "@/lib/services-data"
import { serviceHeroLabels } from "@/lib/service-hero-labels"
import { ServicePageTemplate, type RelatedService } from "@/components/service-page-template"
import { headings, seoBlocks, imageAlt, subServiceTitles, seoMetadata, labels } from "@/lib/services-meta-pl"
import { serviceImageSrc, serviceIconSrc, slugBrands, relatedServiceSlugs, noindexSlugs } from "@/lib/services-meta-shared"
import { withSocialMeta } from "@/lib/social-meta"

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

  const meta = withSocialMeta('pl', {
    title: seo.title,
    description: seo.description,
    ...(noindexSlugs.includes(slug) ? { robots: { index: false, follow: true } } : {}),

    alternates: {
      canonical: `https://serwis.omobonus.com.pl/uslugi/${slug}`,
      languages: noindexSlugs.includes(slug) ? {
        // Tymczasowa strona bez odpowiedników /uk i /ru — nie dodawać hreflang na nieistniejące adresy
        'pl': `https://serwis.omobonus.com.pl/uslugi/${slug}`,
        'x-default': `https://serwis.omobonus.com.pl/uslugi/${slug}`,
      } : {
        'pl': `https://serwis.omobonus.com.pl/uslugi/${slug}`,
        'uk': `https://serwis.omobonus.com.pl/uk/uslugi/${slug}`,
        'ru': `https://serwis.omobonus.com.pl/ru/uslugi/${slug}`,
        'x-default': `https://serwis.omobonus.com.pl/uslugi/${slug}`,
      },
    },
  })

  // withSocialMeta przywraca og:type/locale/siteName i twitter; obraz zostaje własny dla usługi
  const ogImage = {
    url: slug === 'naprawa-drukarek' ? 'https://serwis.omobonus.com.pl/images/Serwis_Drukarek.webp' : service.icon,
    alt: service.title,
  }
  return {
    ...meta,
    openGraph: { ...meta.openGraph, images: [ogImage] },
    twitter: { ...meta.twitter, images: [ogImage.url] },
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
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://serwis.omobonus.com.pl/' },
      { '@type': 'ListItem', position: 2, name: 'Usługi', item: 'https://serwis.omobonus.com.pl/#uslugi' },
      { '@type': 'ListItem', position: 3, name: service.title, item: `https://serwis.omobonus.com.pl/uslugi/${slug}` },
    ],
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
      jsonLd={faqJsonLd ? [serviceJsonLd, breadcrumbJsonLd, faqJsonLd] : [serviceJsonLd, breadcrumbJsonLd]}
    />
  )
}
