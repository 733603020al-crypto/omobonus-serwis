import { Metadata } from 'next'
import { LegalPageTemplate } from '@/components/legal-page-template'
import { politykaPrywatnosciContentEn } from '@/lib/legal/legal-pages'
import { en } from '@/lib/i18n/en'
import { withSocialMeta } from '@/lib/social-meta'

export const metadata: Metadata = withSocialMeta('en', {
  title: 'Privacy Policy',
  description: 'Privacy policy of the Omobonus repair service in Wrocław: what personal data we process and why, cookies, and your rights under the GDPR.',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/en/polityka-prywatnosci',
    languages: {
      pl: 'https://serwis.omobonus.com.pl/polityka-prywatnosci',
      uk: 'https://serwis.omobonus.com.pl/uk/polityka-prywatnosci',
      ru: 'https://serwis.omobonus.com.pl/ru/polityka-prywatnosci',
      en: 'https://serwis.omobonus.com.pl/en/polityka-prywatnosci',
      'x-default': 'https://serwis.omobonus.com.pl/polityka-prywatnosci',
    },
  },
})

export const dynamic = 'force-static'

export default function EnPolitykaPrywatnosci() {
  return <LegalPageTemplate content={politykaPrywatnosciContentEn} footerT={en.footer} cardMarginBottomClass="-mb-[15%]" locale="en" />
}
