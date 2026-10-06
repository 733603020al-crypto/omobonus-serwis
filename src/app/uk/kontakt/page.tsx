import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { preload } from 'react-dom'
import { Header } from '@/components/header'
import { ContactActionsSection } from '@/components/sections/contact-actions'
import { uk } from '@/lib/i18n/uk'
import { withSocialMeta } from '@/lib/social-meta'

const Contact = dynamic(() =>
  import('@/components/sections/contact').then(mod => mod.Contact)
)
const Footer = dynamic(() => import('@/components/footer').then(m => m.Footer))

export const metadata: Metadata = withSocialMeta('uk', {
  title: 'Контакт | Сервіс комп\'ютерів, ноутбуків і принтерів',
  description: '✔ Сервіс комп\'ютерів, ноутбуків, принтерів, плотерів у Вроцлаві ✔ Діагностика за 15 хв ✔ Повний прайс на сайті ✔ Запишіться вже сьогодні! ☎ 793 759 262',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/uk/kontakt',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/kontakt',
      'uk': 'https://serwis.omobonus.com.pl/uk/kontakt',
      'ru': 'https://serwis.omobonus.com.pl/ru/kontakt',
      'x-default': 'https://serwis.omobonus.com.pl/kontakt',
    },
  },
})

export default function UkKontaktPage() {
  // Page background (LCP). preload() puts these hints at the top of <head>,
  // ahead of the inlined CSS, so the browser starts the download right away;
  // a <link> rendered here would land after ~200 KB of inline styles.
  preload('/images/Background_1.webp', { as: 'image', fetchPriority: 'high', media: '(min-width: 768px)' })
  preload('/images/Background_1-mobile.webp', { as: 'image', fetchPriority: 'high', media: '(max-width: 767px)' })
  return (
    <>
      <Header locale="uk" />
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
          <h1 className="sr-only">Контакт із сервісом комп&apos;ютерів, ноутбуків і принтерів у Вроцлаві</h1>
          <ContactActionsSection t={uk.contactActions} locale="uk" />
          <Contact locale="uk" bare={true} />
          <Footer t={uk.footer} bare />
        </div>
      </main>
    </>
  )
}
