import type { Metadata } from 'next'
import { AboutPageTemplate } from '@/components/about-page-template'
import { en } from '@/lib/i18n/en'
import { withSocialMeta } from '@/lib/social-meta'

export const metadata: Metadata = withSocialMeta('en', {
  title: 'About Us | Honest Computer and Printer Service',
  description: "✔ 10+ years of computer, laptop and printer repair in Wrocław ✔ Honest pricing, no hidden costs ✔ We tell you when a repair isn't worth it ☎ 793 759 262",
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/en/o-nas',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/o-nas',
      'uk': 'https://serwis.omobonus.com.pl/uk/o-nas',
      'ru': 'https://serwis.omobonus.com.pl/ru/o-nas',
      'en': 'https://serwis.omobonus.com.pl/en/o-nas',
      'x-default': 'https://serwis.omobonus.com.pl/o-nas',
    },
  },
})

export default function EnONasPage() {
  return (
    <AboutPageTemplate
      brandCaptionText="We repair equipment from popular brands"
      onasHeroT={en.onasHero}
      heroT={en.hero}
      advantagesT={en.advantages}
      aboutT={en.aboutOnas}
      teamT={en.team}
      footerT={en.footer}
      locale="en"
    />
  )
}
