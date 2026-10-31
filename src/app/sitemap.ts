import { MetadataRoute } from 'next'
import { services } from '@/lib/services-data'
import { servicesUk } from '@/lib/services-data-uk'
import { servicesRu } from '@/lib/services-data-ru'
import { servicesEn } from '@/lib/services-data-en'
import { noindexSlugs } from '@/lib/services-meta-shared'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://serwis.omobonus.com.pl'

  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/o-nas`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/regulamin`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  const servicePages = services.filter((service) => !noindexSlugs.includes(service.slug)).map((service) => ({
    url: `${baseUrl}/uslugi/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const ukMainPages = [
    {
      url: `${baseUrl}/uk`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/uk/o-nas`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/uk/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/uk/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/uk/regulamin`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  const ukServicePages = servicesUk.filter((service) => !noindexSlugs.includes(service.slug)).map((service) => ({
    url: `${baseUrl}/uk/uslugi/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const ruMainPages = [
    {
      url: `${baseUrl}/ru`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ru/o-nas`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/ru/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/ru/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/ru/regulamin`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  const ruServicePages = servicesRu.filter((service) => !noindexSlugs.includes(service.slug)).map((service) => ({
    url: `${baseUrl}/ru/uslugi/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const enMainPages = [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/o-nas`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/en/regulamin`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  const enServicePages = servicesEn.filter((service) => !noindexSlugs.includes(service.slug)).map((service) => ({
    url: `${baseUrl}/en/uslugi/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const wysylkowyPages = ['', '/uk', '/ru', '/en'].map((prefix) => ({
    url: `${baseUrl}${prefix}/serwis-wysylkowy`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...mainPages, ...wysylkowyPages, ...servicePages, ...ukMainPages, ...ukServicePages, ...ruMainPages, ...ruServicePages, ...enMainPages, ...enServicePages]
}
