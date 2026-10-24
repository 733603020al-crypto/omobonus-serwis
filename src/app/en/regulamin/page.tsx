import { Metadata } from 'next'
import { LegalPageTemplate } from '@/components/legal-page-template'
import { regulaminContentEn } from '@/lib/legal/legal-pages'
import { en } from '@/lib/i18n/en'
import { withSocialMeta } from '@/lib/social-meta'

export const metadata: Metadata = withSocialMeta('en', {
  title: 'Terms and Conditions',
  description: 'Terms and conditions of the Omobonus repair service in Wrocław: rules for computer, laptop and printer repair, warranty and complaints.',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/en/regulamin',
    languages: {
      pl: 'https://serwis.omobonus.com.pl/regulamin',
      uk: 'https://serwis.omobonus.com.pl/uk/regulamin',
      ru: 'https://serwis.omobonus.com.pl/ru/regulamin',
      en: 'https://serwis.omobonus.com.pl/en/regulamin',
      'x-default': 'https://serwis.omobonus.com.pl/regulamin',
    },
  },
})

export const dynamic = 'force-static'

export default function EnRegulamin() {
  return <LegalPageTemplate content={regulaminContentEn} footerT={en.footer} cardMarginBottomClass="-mb-[25%]" minHeightZero locale="en" />
}
