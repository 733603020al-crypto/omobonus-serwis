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
      'x-default': 'https://serwis.omobonus.com.pl/kontakt',
    },
  },
}

const ukActions = {
  quickContactTitle: 'Швидкий контакт',
  callbackTitle: 'Залиште номер — ми передзвонимо',
  navigateLabel: 'Прокласти маршрут',
  callbackButton: 'Прошу зателефонувати',
  callbackSubmitting: 'Надсилання...',
  callbackHint: 'Передзвонюємо: пн.–сб. 7:00–21:00',
  phoneError: 'Номер телефону занадто короткий',
  callbackError: 'Не вдалося надіслати запит. Спробуйте ще раз або зателефонуйте.',
  successTitle: 'Дякуємо!',
  successText: 'Ми зв\'яжемося з вами якнайшвидше',
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
          <ContactActionsSection t={ukActions} />
          <Contact locale="uk" bare={true} />
          <Footer t={uk.footer} bare />
        </div>
      </main>
    </>
  )
}
