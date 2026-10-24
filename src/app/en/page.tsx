import type { Metadata } from 'next'
import { HomePageTemplate } from '@/components/home-page-template'
import { servicesEn } from '@/lib/services-data-en'
import { en } from '@/lib/i18n/en'

// Meta, og:description i twitter:description — jeden zatwierdzony tekst (docs/seo/description-standard.md)
const DESCRIPTION =
  "✔ Computer, laptop and printer service and repair in Wrocław ✔ Repair cost agreed before work starts ✔ Full price list, no hidden costs ☎ 793 759 262"

export const metadata: Metadata = {
  title: "Computer, laptop and printer repair | Omobonus Wrocław",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://serwis.omobonus.com.pl/en",
    languages: {
      pl: "https://serwis.omobonus.com.pl",
      uk: "https://serwis.omobonus.com.pl/uk",
      ru: "https://serwis.omobonus.com.pl/ru",
      en: "https://serwis.omobonus.com.pl/en",
      "x-default": "https://serwis.omobonus.com.pl",
    },
  },
  openGraph: {
    title: "Computer, laptop and printer repair Wrocław | Omobonus",
    description: DESCRIPTION,
    url: "https://serwis.omobonus.com.pl/en",
    locale: "en_GB",
    siteName: "Omobonus Serwis",
    images: [
      {
        url: "/images/omobonus-hero.webp",
        width: 1200,
        height: 630,
        alt: "Omobonus - professional computer, laptop and printer repair in Wrocław",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Computer, laptop and printer repair Wrocław | Omobonus",
    description: DESCRIPTION,
    images: ["/images/omobonus-hero.webp"],
  },
}

export default function EnHome() {
  return (
    <HomePageTemplate
      heroT={en.hero}
      servicesData={servicesEn}
      servicesBasePath="/en/uslugi"
      servicesT={en.services}
      aboutT={en.about}
      footerT={en.footer}
      cta={{
        heading: en.homeCta.heading,
        text: en.homeCta.text,
        headingMobile: en.homeCta.headingMobile,
        textMobile: en.homeCta.textMobile,
        button: en.homeCta.button,
        href: '/en/kontakt',
      }}
      locale="en"
    />
  )
}
