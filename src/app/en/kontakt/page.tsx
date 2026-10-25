import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { preload } from 'react-dom'
import { Header } from '@/components/header'
import { ContactActionsSection } from '@/components/sections/contact-actions'
import { en } from '@/lib/i18n/en'
import { withSocialMeta } from '@/lib/social-meta'

const Contact = dynamic(() =>
  import('@/components/sections/contact').then(mod => mod.Contact)
)
const Footer = dynamic(() => import('@/components/footer').then(m => m.Footer))

export const metadata: Metadata = withSocialMeta('en', {
  title: { absolute: 'Contact | Computer, Laptop and Printer Service' },
  description: '✔ Computer, laptop and printer repair in Wrocław ✔ Call, message us or submit a service request ✔ Full price list on our website ☎ 793 759 262',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/en/kontakt',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/kontakt',
      'uk': 'https://serwis.omobonus.com.pl/uk/kontakt',
      'ru': 'https://serwis.omobonus.com.pl/ru/kontakt',
      'en': 'https://serwis.omobonus.com.pl/en/kontakt',
      'x-default': 'https://serwis.omobonus.com.pl/kontakt',
    },
  },
})

export default function EnKontaktPage() {
  // Page background (LCP). preload() puts these hints at the top of <head>,
  // ahead of the inlined CSS, so the browser starts the download right away;
  // a <link> rendered here would land after ~200 KB of inline styles.
  preload('/images/Background_1.webp', { as: 'image', fetchPriority: 'high', media: '(min-width: 768px)' })
  preload('/images/Background_1-mobile.webp', { as: 'image', fetchPriority: 'high', media: '(max-width: 767px)' })
  return (
    <>
      <Header locale="en" />
      <main
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), var(--bg-parchment)`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10">
          <h1 className="sr-only">Contact a computer, laptop and printer repair service in Wrocław</h1>
          <ContactActionsSection t={en.contactActions} locale="en" />
          <Contact locale="en" bare={true} />
          <Footer t={en.footer} bare />
        </div>
      </main>
    </>
  )
}
