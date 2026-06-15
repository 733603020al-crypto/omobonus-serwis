import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ContactActionsSection } from '@/components/sections/contact-actions'
import { uk } from '@/lib/i18n/uk'
import manifest from '@/config/manifest'

const Contact = dynamic(() =>
  import('@/components/sections/contact').then(mod => mod.Contact)
)

export const metadata: Metadata = {
  title: 'Контакт | Сервіс комп\'ютерів, ноутбуків і принтерів',
  description: '✔ Сервіс комп\'ютерів, ноутбуків, принтерів у Вроцлаві ✔ Діагностика за 15 хв ✔ Повний прайс на сайті ✔ Запишіться вже сьогодні! ☎ 793 759 262',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/uk/kontakt',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/kontakt',
      'uk': 'https://serwis.omobonus.com.pl/uk/kontakt',
      'ru': 'https://serwis.omobonus.com.pl/ru/kontakt',
      'x-default': 'https://serwis.omobonus.com.pl/kontakt',
    },
  },
}

export default function UkKontaktPage() {
  return (
    <>
      <Header />
      <main
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${manifest.Background_1}')`,
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
