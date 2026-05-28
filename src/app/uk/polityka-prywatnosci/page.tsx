import manifest from '@/config/manifest'
import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { uk } from '@/lib/i18n/uk'

export const metadata: Metadata = {
  title: 'Політика конфіденційності | Omobonus Serwis',
  description: 'Політика конфіденційності сервісу Omobonus Вроцлав. Принципи обробки персональних даних, захист GDPR.',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/uk/polityka-prywatnosci',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/polityka-prywatnosci',
      'uk': 'https://serwis.omobonus.com.pl/uk/polityka-prywatnosci',
      'x-default': 'https://serwis.omobonus.com.pl/polityka-prywatnosci',
    },
  },
}

export const dynamic = 'force-static'

export default function UkPolitykaPrywatnosci() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[65px] relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${manifest.services_background}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <section className="relative pb-0 pt-0 z-10">
          <p className="text-white/90 text-lg md:text-xl text-center mb-2 md:mb-3 drop-shadow-md font-serif italic pt-1">
            &ldquo;Хочете ознайомитися з нашою Політикою конфіденційності? Читайте нижче.&rdquo;
          </p>

          <div className="container mx-auto px-2 md:px-4 flex flex-col items-center">
            <div className="w-full max-w-6xl bg-paper-texture shadow-2xl rounded-sm p-3 md:p-5 border border-[#3a2e24]/20 scale-[0.95] md:scale-[0.8] origin-top -mb-[15%]">

              <h2 className="text-[#3a2e24] text-2xl md:text-3xl font-cormorant font-bold text-center mb-3 md:mb-4">
                Політика конфіденційності
              </h2>

              <div className="space-y-2 md:space-y-3 text-[#3a2e24]">

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    1. Вступ
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    Ця Політика конфіденційності визначає принципи обробки та захисту персональних даних,
                    наданих Користувачами у зв&apos;язку з використанням послуг сервісу
                    Omobonus Serwis за адресою <a href="https://serwis.omobonus.com.pl" className="underline hover:text-[#3a2e24]/70">https://serwis.omobonus.com.pl</a>.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    2. Адміністратор даних
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    Адміністратором персональних даних є Omobonus Sp. z o.o. з місцезнаходженням у Вроцлаві,
                    вул. Marcina Bukowskiego 174, 52-418 Wrocław.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    3. Категорії оброблюваних даних
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    Ми обробляємо такі категорії персональних даних:
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                    <li>Ім&apos;я та прізвище</li>
                    <li>Адреса електронної пошти</li>
                    <li>Номер телефону</li>
                    <li>Адреса проживання / доставки</li>
                    <li>Дані щодо пристрою, що надається на сервіс</li>
                    <li><strong>Дані, зібрані за допомогою файлів cookies</strong>, такі як IP-адреса, налаштування користувача, дані браузера (якщо застосовується).</li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    4. Мета обробки даних
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    Персональні дані обробляються в таких цілях:
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                    <li>Надання сервісних послуг</li>
                    <li>Зв&apos;язок із клієнтом щодо заявки</li>
                    <li>Підготовка кошторису ремонту</li>
                    <li>Ведення сервісної документації</li>
                    <li>Виконання правових зобов&apos;язань</li>
                    <li><strong>Аналіз статистики сайту та покращення якості послуг</strong> (якщо використовуються аналітичні інструменти, такі як Google Analytics).</li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    5. Правова підстава обробки
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    Правовою підставою обробки персональних даних є:
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                    <li>Згода особи, дані якої обробляються (ст. 6 п. 1 літ. a GDPR)</li>
                    <li>Виконання договору або вжиття заходів до його укладення (ст. 6 п. 1 літ. b GDPR)</li>
                    <li>Виконання правового зобов&apos;язання (ст. 6 п. 1 літ. c GDPR)</li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    6. Строк зберігання даних
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    Персональні дані зберігатимуться протягом строку, необхідного для досягнення цілей,
                    з якими їх було зібрано, а також протягом строку, що вимагається законодавством,
                    включаючи податкове та бухгалтерське.
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4 mt-1.5">
                    <li>Після закінчення цього строку дані будуть <strong>видалені або анонімізовані</strong>.</li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    7. Права користувача
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    Кожна особа, дані якої обробляються, має право на:
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                    <li>Доступ до своїх персональних даних</li>
                    <li>Виправлення (коректування) даних</li>
                    <li>Видалення даних</li>
                    <li>Обмеження обробки</li>
                    <li>Перенесення даних</li>
                    <li>Заперечення проти обробки</li>
                    <li>Відкликання згоди в будь-який момент</li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    8. Передача даних до третіх країн
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    Персональні дані можуть передаватися до третіх країн у разі використання зовнішніх послуг,
                    таких як хмарне зберігання даних, аналітичні послуги або інтернет-реклама.
                    Передача даних здійснюється відповідно до чинного законодавства, зокрема за допомогою
                    відповідних механізмів захисту даних, таких як <strong>стандартні договірні положення</strong>.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    9. Безпека даних
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    Ми вживаємо відповідних технічних та організаційних заходів для забезпечення безпеки персональних даних.
                    Ми застосовуємо шифрування даних, захист від несанкціонованого доступу та регулярно оновлюємо
                    наші системи безпеки.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    10. Контакт
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    З питань, пов&apos;язаних із захистом персональних даних, можна звертатися до Адміністратора
                    через форму зворотного зв&apos;язку на сайті
                    або безпосередньо за адресою електронної пошти: <a href="mailto:serwis@omobonus.com.pl" className="underline hover:text-[#3a2e24]/70">serwis@omobonus.com.pl</a>.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    11. Оновлення політики
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    Ця Політика конфіденційності може бути змінена. Всі зміни будуть опубліковані
                    на цій сторінці. Рекомендуємо регулярно переглядати зміст політики конфіденційності.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    12. Файли cookies
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    На нашому сайті ми використовуємо файли cookies для збору інформації про вподобання користувачів,
                    покращення якості послуг, а також в аналітичних та маркетингових цілях. Користувач може керувати
                    налаштуваннями cookies через свій веб-браузер.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#3a2e24]/20 mt-4">
                  <p className="text-sm md:text-base font-sans text-[#3a2e24]/70 italic">
                    {`Останнє оновлення: ${new Date().toLocaleDateString('uk-UA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}`}
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer t={uk.footer} />
    </>
  )
}
