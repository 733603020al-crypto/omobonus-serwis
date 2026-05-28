import manifest from '@/config/manifest'
import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { uk } from '@/lib/i18n/uk'

export const metadata: Metadata = {
  title: 'Умови та положення | Omobonus Serwis',
  description: 'Умови та положення сервісу Omobonus Вроцлав. Правила ремонту комп\'ютерів і принтерів, гарантія, рекламації.',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/uk/regulamin',
    languages: {
      'pl': 'https://serwis.omobonus.com.pl/regulamin',
      'uk': 'https://serwis.omobonus.com.pl/uk/regulamin',
      'x-default': 'https://serwis.omobonus.com.pl/regulamin',
    },
  },
}

export const dynamic = 'force-static'

export default function UkRegulamin() {
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

        <section className="relative pb-0 pt-0 min-h-0 z-10">
          <p className="text-white/90 text-lg md:text-xl text-center mb-2 md:mb-3 drop-shadow-md font-serif italic pt-1">
            &ldquo;Хочете ознайомитися з нашими Умовами та положеннями? Читайте нижче.&rdquo;
          </p>

          <div className="container mx-auto px-2 md:px-4 flex flex-col items-center">
            <div className="w-full max-w-6xl bg-paper-texture shadow-2xl rounded-sm p-3 md:p-5 border border-[#3a2e24]/20 scale-[0.95] md:scale-[0.8] origin-top -mb-[25%]">

              <h2 className="text-[#3a2e24] text-2xl md:text-3xl font-cormorant font-bold text-center mb-3 md:mb-4">
                Умови та положення надання сервісних послуг Omobonus
              </h2>

              <div className="space-y-2 md:space-y-3 text-[#3a2e24]">

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    1. Загальні положення
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>1.1.</strong> Ці Умови та положення (далі &ldquo;Умови&rdquo;) визначають правила і порядок надання послуг з ремонту, діагностики, технічного обслуговування та інших послуг, пов&apos;язаних із комп&apos;ютерами, принтерами, периферійними пристроями та іншим IT-обладнанням, компанією Omobonus Sp. z o.o. (далі &ldquo;Сервіс&rdquo;).
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>1.2.</strong> Послуги надаються компанією Omobonus Sp. z o.o., з місцезнаходженням за адресою: ul. Marcina Bukowskiego 174, 52-418 Wrocław, NIP: 8943160773, KRS: 0000869086, REGON: 387509703, e-mail: <a href="mailto:serwis@omobonus.com.pl" className="underline hover:text-[#3a2e24]/70">serwis@omobonus.com.pl</a>, телефон: <span className="underline hover:text-[#3a2e24]/70">+48 793 759 262</span>.
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>1.3.</strong> Кожен Клієнт, який користується послугами Сервісу, зобов&apos;язаний ознайомитися з цими Умовами та прийняти їх до початку надання послуг.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    2. Визначення
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                    <li><strong>Клієнт</strong> — фізична або юридична особа, яка користується послугами Сервісу.</li>
                    <li><strong>Обладнання</strong> — пристрої, передані до Сервісу для діагностики, ремонту або технічного обслуговування.</li>
                    <li><strong>Замовлення на ремонт</strong> — форма, яку заповнює Клієнт, що містить дані про обладнання та опис несправності.</li>
                    <li><strong>Послуга</strong> — всі роботи, що виконуються Сервісом, включаючи ремонт, діагностику, встановлення програмного забезпечення, технічне обслуговування тощо.</li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    3. Правила приймання обладнання до ремонту
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>3.1.</strong> Сервіс приймає обладнання до ремонту виключно після заповнення форми Замовлення на ремонт або подання онлайн-заявки.
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>3.2.</strong> У Замовленні на ремонт Клієнт зобов&apos;язаний вказати:
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                    <li>повні контактні дані;</li>
                    <li>опис проблеми / несправності;</li>
                    <li>серійний номер обладнання;</li>
                    <li>дані про обладнання (марка, модель, конфігурація, технічний стан);</li>
                    <li>відомості про гарантійний статус (якщо застосовується).</li>
                  </ul>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>3.3.</strong> Сервіс має право відмовити у прийманні обладнання до ремонту, якщо:
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                    <li>Клієнт не надав необхідних даних;</li>
                    <li>Обладнання ремонтувалося іншими особами або піддавалося самостійній модифікації, що унеможливлює ремонт.</li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    4. Строки виконання послуг
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>4.1.</strong> Стандартний строк виконання ремонту становить до 30 робочих днів з моменту приймання обладнання до Сервісу, якщо інше не погоджено в Замовленні на ремонт або з Клієнтом.
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>4.2.</strong> У разі необхідності замовлення запасних частин або затримок, пов&apos;язаних із постачанням, Сервіс зобов&apos;язується повідомити Клієнта про продовження строку виконання послуги.
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>4.3.</strong> Сервіс не несе відповідальності за затримки, що виникли внаслідок дії обставин непереборної сили, наприклад, затримок у постачанні частин, збоїв систем, дій виробника обладнання.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    5. Гарантія на послуги
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>5.1.</strong> Сервіс надає гарантію на виконану послугу з ремонту або замінені запчастини. Гарантійний строк, як правило, становить 6–12 місяців, якщо не погоджено інше.
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>5.2.</strong> Гарантія поширюється виключно на виконані ремонтні роботи та замінені запчастини. У разі пошкоджень, що виникли внаслідок неправильної експлуатації обладнання або втручання третіх осіб, Сервіс не несе відповідальності.
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>5.3.</strong> Гарантія не поширюється на пошкодження, що виникли внаслідок природного зносу деталей, дій у рамках оновлень програмного забезпечення, а також проблем, що виникли через помилки користувача.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    6. Відповідальність Сервісу
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>6.1.</strong> Сервіс зобов&apos;язується надавати послуги відповідно до найвищих стандартів та дотримуватися належної сумлінності в процесі ремонту і обслуговування обладнання.
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>6.2.</strong> Сервіс не несе відповідальності за:
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                    <li>втрату даних, файлів, програм на обладнанні, що ремонтується (Клієнт повинен зробити резервну копію перед здачею обладнання до ремонту);</li>
                    <li>непрямі збитки, такі як втрата прибутку, що виникли через затримки в ремонті.</li>
                  </ul>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>6.3.</strong> Сервіс має право відмовити у виконанні послуги, якщо замовлені роботи неможливо виконати через пошкодження обладнання, що унеможливлюють його ремонт.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    7. Права та обов&apos;язки Клієнта
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>7.1.</strong> Клієнт зобов&apos;язується:
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                    <li>здати обладнання в належному стані для ремонту;</li>
                    <li>надавати Сервісу необхідну інформацію щодо проблем із пристроєм;</li>
                    <li>повідомляти Сервіс про будь-які зміни контактних даних.</li>
                  </ul>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>7.2.</strong> Клієнт несе відповідальність за безпеку даних на пристрої. Сервіс не несе відповідальності за можливу втрату даних.
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>7.3.</strong> Клієнт зобов&apos;язується забрати відремонтоване обладнання в погоджений строк. В іншому випадку Сервіс має право нарахувати додаткову плату за зберігання обладнання.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    8. Захист персональних даних
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>8.1.</strong> Клієнт надає згоду на обробку його персональних даних з метою надання послуг з ремонту, зв&apos;язку та в маркетингових цілях, якщо таку згоду було надано.
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>8.2.</strong> Сервіс зобов&apos;язується дотримуватися чинних норм щодо захисту персональних даних, зокрема GDPR, та забезпечує безпеку зберігання даних.
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>8.3.</strong> Клієнт має право на доступ, виправлення, видалення персональних даних та їх перенесення відповідно до чинного законодавства.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    9. Прайс-лист і оплата
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>9.1.</strong> Ціни на послуги з ремонту визначаються на основі виду послуги та обсягу ремонту. Прайс-лист доступний на сайті Сервісу або в офісі компанії.
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>9.2.</strong> Оплата за послуги здійснюється після завершення ремонту або надання послуги. Клієнт може здійснити оплату готівкою, банківським переказом або кредитною карткою.
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>9.3.</strong> У разі невиконання послуги з вини Клієнта (наприклад, неповернення обладнання в строк) Сервіс має право стягнути з Клієнта витрати, пов&apos;язані із зберіганням обладнання.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    10. Рекламації
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>10.1.</strong> Клієнт має право подати рекламацію щодо виконаної послуги протягом 14 робочих днів з дати отримання обладнання.
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>10.2.</strong> Рекламація повинна бути подана в письмовій формі або електронною поштою. Сервіс розгляне рекламацію протягом 14 робочих днів.
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>10.3.</strong> У разі визнання рекламації Сервіс зобов&apos;язується безкоштовно відремонтувати або замінити запчастини, або повернути кошти за послугу.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    11. Зміни Умов
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>11.1.</strong> Сервіс має право вносити зміни до Умов. Зміни набирають чинності після публікації нової версії Умов на сайті Сервісу.
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>11.2.</strong> Клієнт буде повідомлений про зміни в Умовах, а продовження користування послугами після внесення змін вважатиметься прийняттям нових умов.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-lg md:text-xl font-cormorant font-bold">
                    12. Прикінцеві положення
                  </div>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>12.1.</strong> Умови доступні на сайті Сервісу і можуть бути роздруковані або збережені Клієнтом.
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>12.2.</strong> Всі спори, що виникають у зв&apos;язку з наданням послуг, вирішуються судом за місцезнаходженням Сервісу.
                  </p>
                  <p className="text-sm md:text-base font-sans leading-normal">
                    <strong>12.3.</strong> У разі невідповідності положень Умов чинному законодавству застосовуються норми польського права.
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
