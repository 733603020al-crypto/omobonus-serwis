import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ContactActionsSection } from '@/components/sections/contact-actions'
import { ru } from '@/lib/i18n/ru'
import manifest from '@/config/manifest'

const Contact = dynamic(() =>
  import('@/components/sections/contact').then(mod => mod.Contact)
)

export const metadata: Metadata = {
  title: 'Контакт | Сервис компьютеров, ноутбуков и принтеров',
  description: '✔ Сервис компьютеров, ноутбуков, принтеров и плоттеров во Вроцлаве ✔ Диагностика за 15 мин ✔ Полный прайс на сайте ✔ Запишитесь уже сегодня! ☎ 793 759 262',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/ru/kontakt',
    languages: {
      pl: 'https://serwis.omobonus.com.pl/kontakt',
      uk: 'https://serwis.omobonus.com.pl/uk/kontakt',
      ru: 'https://serwis.omobonus.com.pl/ru/kontakt',
      'x-default': 'https://serwis.omobonus.com.pl/kontakt',
    },
  },
}

export default function RuKontaktPage() {
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
          <h1 className="sr-only">Контакт с сервисом компьютеров, ноутбуков и принтеров во Вроцлаве</h1>
          <ContactActionsSection t={ru.contactActions} locale="ru" />
          <Contact locale="ru" bare={true} />
          <Footer t={ru.footer} bare />
        </div>
      </main>
    </>
  )
}
