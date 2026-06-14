import type { ReactNode } from 'react'

export interface LegalSection {
  heading: string
  body: ReactNode
}

export interface LegalPageContent {
  intro: string
  title: string
  sections: LegalSection[]
  lastUpdatedLabel: string
  dateLocale: string
}

const p = 'text-sm md:text-base font-sans leading-normal'
const ul = 'list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4'
const link = 'underline hover:text-[#3a2e24]/70'

export const regulaminContent: LegalPageContent = {
  intro: '“Chcesz zapoznać się z naszym Regulaminem? Przeczytaj poniżej.”',
  title: 'Regulamin świadczenia usług serwisowych przez Omobonus',
  lastUpdatedLabel: 'Ostatnia aktualizacja',
  dateLocale: 'pl-PL',
  sections: [
    {
      heading: '1. Postanowienia ogólne',
      body: (
        <>
          <p className={p}>
            <strong>1.1.</strong> Niniejszy Regulamin (dalej &ldquo;Regulamin&rdquo;) określa zasady i warunki świadczenia usług naprawy, diagnostyki, konserwacji, oraz innych usług związanych z komputerami, drukarkami, peryferiami i innym sprzętem IT przez firmę Omobonus Sp. z o.o. (dalej &ldquo;Serwis&rdquo;).
          </p>
          <p className={p}>
            <strong>1.2.</strong> Usługi świadczone są przez Omobonus Sp. z o.o., z siedzibą pod adresem: ul. Marcina Bukowskiego 174, 52-418 Wrocław, NIP: 8943160773, KRS: 0000869086, REGON: 387509703, kontakt e-mail: <a href="mailto:serwis@omobonus.com.pl" className={link}>serwis@omobonus.com.pl</a>, telefon: <span className={link}>+48 793 759 262</span>.
          </p>
          <p className={p}>
            <strong>1.3.</strong> Każdy Klient, który korzysta z usług Serwisu, zobowiązany jest do zapoznania się z niniejszym Regulaminem i jego zaakceptowania przed rozpoczęciem świadczenia usług.
          </p>
        </>
      ),
    },
    {
      heading: '2. Definicje',
      body: (
        <ul className={ul}>
          <li><strong>Klient</strong> &mdash; osoba fizyczna lub prawna, która korzysta z usług Serwisu.</li>
          <li><strong>Sprzęt</strong> &mdash; urządzenia przekazane do Serwisu w celu diagnostyki, naprawy lub konserwacji.</li>
          <li><strong>Zlecenie naprawy</strong> &mdash; formularz wypełniany przez Klienta, który zawiera dane o sprzęcie oraz opis usterki.</li>
          <li><strong>Usługa</strong> &mdash; wszelkie prace wykonywane przez Serwis, w tym naprawa, diagnostyka, instalacja oprogramowania, konserwacja itp.</li>
        </ul>
      ),
    },
    {
      heading: '3. Zasady przyjęcia sprzętu do naprawy',
      body: (
        <>
          <p className={p}>
            <strong>3.1.</strong> Serwis przyjmuje sprzęt do naprawy wyłącznie po wypełnieniu formularza Zlecenia naprawy lub zgłoszenia przez system online.
          </p>
          <p className={p}>
            <strong>3.2.</strong> W Zleceniu naprawy Klient zobowiązany jest do podania:
          </p>
          <ul className={ul}>
            <li>pełnych danych kontaktowych;</li>
            <li>opisu problemu/usterki;</li>
            <li>numeru seryjnego sprzętu;</li>
            <li>danych dotyczących sprzętu (marka, model, konfiguracja, stan techniczny);</li>
            <li>oświadczenia o stanie gwarancji (jeśli dotyczy).</li>
          </ul>
          <p className={p}>
            <strong>3.3.</strong> Serwis ma prawo odmówić przyjęcia sprzętu do naprawy, jeśli:
          </p>
          <ul className={ul}>
            <li>Klient nie dostarczył wymaganych danych;</li>
            <li>Sprzęt był naprawiany przez inne osoby lub poddany samodzielnej modyfikacji, co uniemożliwia naprawę.</li>
          </ul>
        </>
      ),
    },
    {
      heading: '4. Czas realizacji usług',
      body: (
        <>
          <p className={p}>
            <strong>4.1.</strong> Standardowy czas realizacji naprawy wynosi do 30 dni roboczych od momentu przyjęcia sprzętu do Serwisu, chyba że ustalono inaczej w Zleceniu naprawy lub z Klientem.
          </p>
          <p className={p}>
            <strong>4.2.</strong> W przypadku konieczności zamówienia części zamiennych lub opóźnień związanych z dostawą, Serwis zobowiązuje się do poinformowania Klienta o przedłużeniu terminu wykonania usługi.
          </p>
          <p className={p}>
            <strong>4.3.</strong> Serwis nie ponosi odpowiedzialności za opóźnienia wynikłe z powodu działania siły wyższej, np. opóźnienia w dostawach części, awarie systemów, działanie producenta sprzętu.
          </p>
        </>
      ),
    },
    {
      heading: '5. Gwarancja na usługi',
      body: (
        <>
          <p className={p}>
            <strong>5.1.</strong> Serwis udziela gwarancji na wykonaną usługę naprawy lub wymienione części. Okres gwarancji wynosi zazwyczaj 6-12 miesięcy, chyba że uzgodniono inaczej.
          </p>
          <p className={p}>
            <strong>5.2.</strong> Gwarancja obejmuje wyłącznie wykonane prace naprawcze oraz wymienione części. W przypadku uszkodzeń wynikających z niewłaściwego użytkowania sprzętu lub ingerencji osób trzecich, Serwis nie ponosi odpowiedzialności.
          </p>
          <p className={p}>
            <strong>5.3.</strong> Gwarancja nie obejmuje uszkodzeń wynikających z naturalnego zużycia części, działań w ramach aktualizacji oprogramowania, a także problemów wynikających z błędów użytkownika.
          </p>
        </>
      ),
    },
    {
      heading: '6. Odpowiedzialność Serwisu',
      body: (
        <>
          <p className={p}>
            <strong>6.1.</strong> Serwis zobowiązuje się do świadczenia usług zgodnie z najwyższymi standardami oraz do zachowania staranności w procesie naprawy i obsługi sprzętu.
          </p>
          <p className={p}>
            <strong>6.2.</strong> Serwis nie ponosi odpowiedzialności za:
          </p>
          <ul className={ul}>
            <li>utratę danych, plików, programów na naprawianym sprzęcie (Klient powinien wykonać kopię zapasową przed oddaniem sprzętu do naprawy);</li>
            <li>szkody pośrednie, takie jak utrata zysków, wynikające z opóźnień w naprawie.</li>
          </ul>
          <p className={p}>
            <strong>6.3.</strong> Serwis ma prawo odmówić wykonania usługi, jeśli zlecone prace są niemożliwe do wykonania z powodu uszkodzeń sprzętu, które uniemożliwiają jego naprawę.
          </p>
        </>
      ),
    },
    {
      heading: '7. Prawa i obowiązki Klienta',
      body: (
        <>
          <p className={p}>
            <strong>7.1.</strong> Klient zobowiązuje się do:
          </p>
          <ul className={ul}>
            <li>dostarczenia sprzętu w odpowiednim stanie do naprawy;</li>
            <li>udzielania Serwisowi niezbędnych informacji dotyczących problemów z urządzeniem;</li>
            <li>poinformowania Serwisu o jakichkolwiek zmianach dotyczących danych kontaktowych.</li>
          </ul>
          <p className={p}>
            <strong>7.2.</strong> Klient ponosi odpowiedzialność za bezpieczeństwo danych na urządzeniu. Serwis nie odpowiada za ewentualną utratę danych.
          </p>
          <p className={p}>
            <strong>7.3.</strong> Klient zobowiązuje się do odbioru naprawionego sprzętu w uzgodnionym terminie. W przeciwnym razie Serwis ma prawo naliczyć dodatkową opłatę za przechowywanie sprzętu.
          </p>
        </>
      ),
    },
    {
      heading: '8. Ochrona danych osobowych',
      body: (
        <>
          <p className={p}>
            <strong>8.1.</strong> Klient wyraża zgodę na przetwarzanie jego danych osobowych w celu realizacji usług naprawy, kontaktu oraz w celach marketingowych, jeśli wyraził zgodę.
          </p>
          <p className={p}>
            <strong>8.2.</strong> Serwis zobowiązuje się do przestrzegania obowiązujących przepisów dotyczących ochrony danych osobowych, w tym RODO, i zapewnia bezpieczeństwo przechowywania danych.
          </p>
          <p className={p}>
            <strong>8.3.</strong> Klient ma prawo do wglądu, korekty, usunięcia danych osobowych oraz przenoszenia danych, zgodnie z obowiązującymi przepisami prawa.
          </p>
        </>
      ),
    },
    {
      heading: '9. Cennik i płatności',
      body: (
        <>
          <p className={p}>
            <strong>9.1.</strong> Ceny usług naprawy są ustalane na podstawie rodzaju usługi i zakresu naprawy. Cennik dostępny jest na stronie internetowej Serwisu lub w siedzibie firmy.
          </p>
          <p className={p}>
            <strong>9.2.</strong> Płatność za usługi następuje po zakończeniu naprawy lub świadczenia usługi. Klient może dokonać płatności gotówką, przelewem bankowym lub kartą kredytową.
          </p>
          <p className={p}>
            <strong>9.3.</strong> W przypadku niewykonania usługi z winy Klienta (np. brak odbioru sprzętu w terminie) Serwis ma prawo do obciążenia Klienta kosztami związanymi z przechowywaniem sprzętu.
          </p>
        </>
      ),
    },
    {
      heading: '10. Reklamacje',
      body: (
        <>
          <p className={p}>
            <strong>10.1.</strong> Klient ma prawo zgłosić reklamację dotyczącą wykonanej usługi w ciągu 14 dni roboczych od daty odbioru sprzętu.
          </p>
          <p className={p}>
            <strong>10.2.</strong> Reklamacja powinna zostać złożona na piśmie lub drogą elektroniczną. Serwis rozpatrzy reklamację w terminie 14 dni roboczych.
          </p>
          <p className={p}>
            <strong>10.3.</strong> W przypadku uznania reklamacji Serwis zobowiązuje się do bezpłatnej naprawy lub wymiany części, bądź zwrotu kosztów za usługę.
          </p>
        </>
      ),
    },
    {
      heading: '11. Zmiany Regulaminu',
      body: (
        <>
          <p className={p}>
            <strong>11.1.</strong> Serwis ma prawo do wprowadzania zmian w Regulaminie. Zmiany wchodzą w życie po opublikowaniu nowej wersji Regulaminu na stronie internetowej Serwisu.
          </p>
          <p className={p}>
            <strong>11.2.</strong> Klient zostanie poinformowany o zmianach w Regulaminie, a kontynuowanie korzystania z usług po wprowadzeniu zmian będzie traktowane jako akceptacja nowych warunków.
          </p>
        </>
      ),
    },
    {
      heading: '12. Postanowienia końcowe',
      body: (
        <>
          <p className={p}>
            <strong>12.1.</strong> Regulamin dostępny jest na stronie internetowej Serwisu i może być wydrukowany lub zapisany przez Klienta.
          </p>
          <p className={p}>
            <strong>12.2.</strong> Wszystkie spory wynikłe z realizacji usług będą rozstrzygane przez sąd właściwy dla siedziby Serwisu.
          </p>
          <p className={p}>
            <strong>12.3.</strong> W przypadku niezgodności postanowień Regulaminu z obowiązującymi przepisami prawa, zastosowanie mają przepisy prawa polskiego.
          </p>
        </>
      ),
    },
  ],
}

export const politykaPrywatnosciContent: LegalPageContent = {
  intro: '“Chcesz zapoznać się z naszą Polityką Prywatności? Przeczytaj poniżej.”',
  title: 'Polityka Prywatności',
  lastUpdatedLabel: 'Ostatnia aktualizacja',
  dateLocale: 'pl-PL',
  sections: [
    {
      heading: '1. Wprowadzenie',
      body: (
        <p className={p}>
          Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych
          przekazanych przez Użytkowników w związku z korzystaniem przez nich z usług serwisu
          Omobonus Serwis dostępnego pod adresem internetowym <a href="https://serwis.omobonus.com.pl" className={link}>https://serwis.omobonus.com.pl</a>.
        </p>
      ),
    },
    {
      heading: '2. Administrator danych',
      body: (
        <p className={p}>
          Administratorem danych osobowych jest Omobonus Sp. z o.o. z siedzibą we Wrocławiu,
          ul. Marcina Bukowskiego 174, 52-418 Wrocław.
        </p>
      ),
    },
    {
      heading: '3. Rodzaje przetwarzanych danych',
      body: (
        <>
          <p className={p}>
            Przetwarzamy następujące kategorie danych osobowych:
          </p>
          <ul className={ul}>
            <li>Imię i nazwisko</li>
            <li>Adres e-mail</li>
            <li>Numer telefonu</li>
            <li>Adres zamieszkania/dostawy</li>
            <li>Dane dotyczące urządzenia poddanego serwisowi</li>
            <li><strong>Dane zbierane za pomocą plików cookies</strong>, takie jak adres IP, preferencje użytkownika, dane przeglądarki (jeśli stosowane).</li>
          </ul>
        </>
      ),
    },
    {
      heading: '4. Cel przetwarzania danych',
      body: (
        <>
          <p className={p}>
            Dane osobowe są przetwarzane w następujących celach:
          </p>
          <ul className={ul}>
            <li>Realizacja usług serwisowych</li>
            <li>Kontakt z klientem w sprawie zgłoszenia</li>
            <li>Przygotowanie wyceny naprawy</li>
            <li>Prowadzenie dokumentacji serwisowej</li>
            <li>Wypełnienie obowiązków prawnych</li>
            <li><strong>Analiza statystyk strony i poprawa jakości usług</strong> (jeśli używane narzędzia analityczne, takie jak Google Analytics).</li>
          </ul>
        </>
      ),
    },
    {
      heading: '5. Podstawa prawna przetwarzania',
      body: (
        <>
          <p className={p}>
            Podstawą prawną przetwarzania danych osobowych jest:
          </p>
          <ul className={ul}>
            <li>Zgoda osoby, której dane dotyczą (art. 6 ust. 1 lit. a RODO)</li>
            <li>Wykonanie umowy lub podjęcie działań przed zawarciem umowy (art. 6 ust. 1 lit. b RODO)</li>
            <li>Wypełnienie obowiązku prawnego (art. 6 ust. 1 lit. c RODO)</li>
          </ul>
        </>
      ),
    },
    {
      heading: '6. Okres przechowywania danych',
      body: (
        <>
          <p className={p}>
            Dane osobowe będą przechowywane przez okres niezbędny do realizacji celów,
            dla których zostały zebrane, oraz przez okres wymagany przepisami prawa,
            w tym przepisami podatkowymi i rachunkowymi.
          </p>
          <ul className={`${ul} mt-1.5`}>
            <li>Po upływie tego okresu dane będą <strong>usunięte lub zanonimizowane</strong>.</li>
          </ul>
        </>
      ),
    },
    {
      heading: '7. Prawa użytkownika',
      body: (
        <>
          <p className={p}>
            Każda osoba, której dane dotyczą, ma prawo do:
          </p>
          <ul className={ul}>
            <li>Dostępu do swoich danych osobowych</li>
            <li>Sprostowania (poprawiania) danych</li>
            <li>Usunięcia danych</li>
            <li>Ograniczenia przetwarzania</li>
            <li>Przenoszenia danych</li>
            <li>Wniesienia sprzeciwu wobec przetwarzania</li>
            <li>Cofnięcia zgody w dowolnym momencie</li>
          </ul>
        </>
      ),
    },
    {
      heading: '8. Przekazywanie danych do krajów trzecich',
      body: (
        <p className={p}>
          Dane osobowe mogą być przekazywane do krajów trzecich w przypadku korzystania z zewnętrznych usług,
          takich jak przechowywanie danych w chmurze, usługi analityczne lub reklama internetowa.
          Przekazywanie danych odbywa się zgodnie z obowiązującymi przepisami prawa, w tym za pomocą
          odpowiednich mechanizmów ochrony danych, takich jak <strong>standardowe klauzule umowne</strong>.
        </p>
      ),
    },
    {
      heading: '9. Bezpieczeństwo danych',
      body: (
        <p className={p}>
          Podejmujemy odpowiednie środki techniczne i organizacyjne w celu zapewnienia bezpieczeństwa danych osobowych.
          Stosujemy szyfrowanie danych, zabezpieczenia przed dostępem nieautoryzowanym oraz regularnie aktualizujemy
          nasze systemy zabezpieczeń.
        </p>
      ),
    },
    {
      heading: '10. Kontakt',
      body: (
        <p className={p}>
          W sprawach związanych z ochroną danych osobowych można kontaktować się z Administratorem
          danych osobowych poprzez formularz kontaktowy dostępny na stronie internetowej
          lub bezpośrednio pod adresem e-mail: <a href="mailto:serwis@omobonus.com.pl" className={link}>serwis@omobonus.com.pl</a>.
        </p>
      ),
    },
    {
      heading: '11. Aktualizacje polityki',
      body: (
        <p className={p}>
          Niniejsza Polityka Prywatności może ulec zmianom. Wszelkie zmiany będą publikowane
          na tej stronie. Zalecamy regularne przeglądanie treści polityki prywatności.
        </p>
      ),
    },
    {
      heading: '12. Pliki cookies',
      body: (
        <p className={p}>
          Na naszej stronie używamy plików cookies w celu zbierania informacji o preferencjach użytkowników,
          poprawy jakości usług oraz w celach analitycznych i marketingowych. Użytkownik może zarządzać
          ustawieniami cookies poprzez swoją przeglądarkę internetową.
        </p>
      ),
    },
  ],
}

export const regulaminContentUk: LegalPageContent = {
  intro: '“Хочете ознайомитися з нашими Умовами та положеннями? Читайте нижче.”',
  title: 'Умови та положення надання сервісних послуг Omobonus',
  lastUpdatedLabel: 'Останнє оновлення',
  dateLocale: 'uk-UA',
  sections: [
    {
      heading: '1. Загальні положення',
      body: (
        <>
          <p className={p}>
            <strong>1.1.</strong> Ці Умови та положення (далі &ldquo;Умови&rdquo;) визначають правила і порядок надання послуг з ремонту, діагностики, технічного обслуговування та інших послуг, пов&apos;язаних із комп&apos;ютерами, принтерами, периферійними пристроями та іншим IT-обладнанням, компанією Omobonus Sp. z o.o. (далі &ldquo;Сервіс&rdquo;).
          </p>
          <p className={p}>
            <strong>1.2.</strong> Послуги надаються компанією Omobonus Sp. z o.o., з місцезнаходженням за адресою: ul. Marcina Bukowskiego 174, 52-418 Wrocław, NIP: 8943160773, KRS: 0000869086, REGON: 387509703, e-mail: <a href="mailto:serwis@omobonus.com.pl" className={link}>serwis@omobonus.com.pl</a>, телефон: <span className={link}>+48 793 759 262</span>.
          </p>
          <p className={p}>
            <strong>1.3.</strong> Кожен Клієнт, який користується послугами Сервісу, зобов&apos;язаний ознайомитися з цими Умовами та прийняти їх до початку надання послуг.
          </p>
        </>
      ),
    },
    {
      heading: '2. Визначення',
      body: (
        <ul className={ul}>
          <li><strong>Клієнт</strong> — фізична або юридична особа, яка користується послугами Сервісу.</li>
          <li><strong>Обладнання</strong> — пристрої, передані до Сервісу для діагностики, ремонту або технічного обслуговування.</li>
          <li><strong>Замовлення на ремонт</strong> — форма, яку заповнює Клієнт, що містить дані про обладнання та опис несправності.</li>
          <li><strong>Послуга</strong> — всі роботи, що виконуються Сервісом, включаючи ремонт, діагностику, встановлення програмного забезпечення, технічне обслуговування тощо.</li>
        </ul>
      ),
    },
    {
      heading: '3. Правила приймання обладнання до ремонту',
      body: (
        <>
          <p className={p}>
            <strong>3.1.</strong> Сервіс приймає обладнання до ремонту виключно після заповнення форми Замовлення на ремонт або подання онлайн-заявки.
          </p>
          <p className={p}>
            <strong>3.2.</strong> У Замовленні на ремонт Клієнт зобов&apos;язаний вказати:
          </p>
          <ul className={ul}>
            <li>повні контактні дані;</li>
            <li>опис проблеми / несправності;</li>
            <li>серійний номер обладнання;</li>
            <li>дані про обладнання (марка, модель, конфігурація, технічний стан);</li>
            <li>відомості про гарантійний статус (якщо застосовується).</li>
          </ul>
          <p className={p}>
            <strong>3.3.</strong> Сервіс має право відмовити у прийманні обладнання до ремонту, якщо:
          </p>
          <ul className={ul}>
            <li>Клієнт не надав необхідних даних;</li>
            <li>Обладнання ремонтувалося іншими особами або піддавалося самостійній модифікації, що унеможливлює ремонт.</li>
          </ul>
        </>
      ),
    },
    {
      heading: '4. Строки виконання послуг',
      body: (
        <>
          <p className={p}>
            <strong>4.1.</strong> Стандартний строк виконання ремонту становить до 30 робочих днів з моменту приймання обладнання до Сервісу, якщо інше не погоджено в Замовленні на ремонт або з Клієнтом.
          </p>
          <p className={p}>
            <strong>4.2.</strong> У разі необхідності замовлення запасних частин або затримок, пов&apos;язаних із постачанням, Сервіс зобов&apos;язується повідомити Клієнта про продовження строку виконання послуги.
          </p>
          <p className={p}>
            <strong>4.3.</strong> Сервіс не несе відповідальності за затримки, що виникли внаслідок дії обставин непереборної сили, наприклад, затримок у постачанні частин, збоїв систем, дій виробника обладнання.
          </p>
        </>
      ),
    },
    {
      heading: '5. Гарантія на послуги',
      body: (
        <>
          <p className={p}>
            <strong>5.1.</strong> Сервіс надає гарантію на виконану послугу з ремонту або замінені запчастини. Гарантійний строк, як правило, становить 6–12 місяців, якщо не погоджено інше.
          </p>
          <p className={p}>
            <strong>5.2.</strong> Гарантія поширюється виключно на виконані ремонтні роботи та замінені запчастини. У разі пошкоджень, що виникли внаслідок неправильної експлуатації обладнання або втручання третіх осіб, Сервіс не несе відповідальності.
          </p>
          <p className={p}>
            <strong>5.3.</strong> Гарантія не поширюється на пошкодження, що виникли внаслідок природного зносу деталей, дій у рамках оновлень програмного забезпечення, а також проблем, що виникли через помилки користувача.
          </p>
        </>
      ),
    },
    {
      heading: '6. Відповідальність Сервісу',
      body: (
        <>
          <p className={p}>
            <strong>6.1.</strong> Сервіс зобов&apos;язується надавати послуги відповідно до найвищих стандартів та дотримуватися належної сумлінності в процесі ремонту і обслуговування обладнання.
          </p>
          <p className={p}>
            <strong>6.2.</strong> Сервіс не несе відповідальності за:
          </p>
          <ul className={ul}>
            <li>втрату даних, файлів, програм на обладнанні, що ремонтується (Клієнт повинен зробити резервну копію перед здачею обладнання до ремонту);</li>
            <li>непрямі збитки, такі як втрата прибутку, що виникли через затримки в ремонті.</li>
          </ul>
          <p className={p}>
            <strong>6.3.</strong> Сервіс має право відмовити у виконанні послуги, якщо замовлені роботи неможливо виконати через пошкодження обладнання, що унеможливлюють його ремонт.
          </p>
        </>
      ),
    },
    {
      heading: "7. Права та обов'язки Клієнта",
      body: (
        <>
          <p className={p}>
            <strong>7.1.</strong> Клієнт зобов&apos;язується:
          </p>
          <ul className={ul}>
            <li>здати обладнання в належному стані для ремонту;</li>
            <li>надавати Сервісу необхідну інформацію щодо проблем із пристроєм;</li>
            <li>повідомляти Сервіс про будь-які зміни контактних даних.</li>
          </ul>
          <p className={p}>
            <strong>7.2.</strong> Клієнт несе відповідальність за безпеку даних на пристрої. Сервіс не несе відповідальності за можливу втрату даних.
          </p>
          <p className={p}>
            <strong>7.3.</strong> Клієнт зобов&apos;язується забрати відремонтоване обладнання в погоджений строк. В іншому випадку Сервіс має право нарахувати додаткову плату за зберігання обладнання.
          </p>
        </>
      ),
    },
    {
      heading: '8. Захист персональних даних',
      body: (
        <>
          <p className={p}>
            <strong>8.1.</strong> Клієнт надає згоду на обробку його персональних даних з метою надання послуг з ремонту, зв&apos;язку та в маркетингових цілях, якщо таку згоду було надано.
          </p>
          <p className={p}>
            <strong>8.2.</strong> Сервіс зобов&apos;язується дотримуватися чинних норм щодо захисту персональних даних, зокрема GDPR, та забезпечує безпеку зберігання даних.
          </p>
          <p className={p}>
            <strong>8.3.</strong> Клієнт має право на доступ, виправлення, видалення персональних даних та їх перенесення відповідно до чинного законодавства.
          </p>
        </>
      ),
    },
    {
      heading: '9. Прайс-лист і оплата',
      body: (
        <>
          <p className={p}>
            <strong>9.1.</strong> Ціни на послуги з ремонту визначаються на основі виду послуги та обсягу ремонту. Прайс-лист доступний на сайті Сервісу або в офісі компанії.
          </p>
          <p className={p}>
            <strong>9.2.</strong> Оплата за послуги здійснюється після завершення ремонту або надання послуги. Клієнт може здійснити оплату готівкою, банківським переказом або кредитною карткою.
          </p>
          <p className={p}>
            <strong>9.3.</strong> У разі невиконання послуги з вини Клієнта (наприклад, неповернення обладнання в строк) Сервіс має право стягнути з Клієнта витрати, пов&apos;язані із зберіганням обладнання.
          </p>
        </>
      ),
    },
    {
      heading: '10. Рекламації',
      body: (
        <>
          <p className={p}>
            <strong>10.1.</strong> Клієнт має право подати рекламацію щодо виконаної послуги протягом 14 робочих днів з дати отримання обладнання.
          </p>
          <p className={p}>
            <strong>10.2.</strong> Рекламація повинна бути подана в письмовій формі або електронною поштою. Сервіс розгляне рекламацію протягом 14 робочих днів.
          </p>
          <p className={p}>
            <strong>10.3.</strong> У разі визнання рекламації Сервіс зобов&apos;язується безкоштовно відремонтувати або замінити запчастини, або повернути кошти за послугу.
          </p>
        </>
      ),
    },
    {
      heading: '11. Зміни Умов',
      body: (
        <>
          <p className={p}>
            <strong>11.1.</strong> Сервіс має право вносити зміни до Умов. Зміни набирають чинності після публікації нової версії Умов на сайті Сервісу.
          </p>
          <p className={p}>
            <strong>11.2.</strong> Клієнт буде повідомлений про зміни в Умовах, а продовження користування послугами після внесення змін вважатиметься прийняттям нових умов.
          </p>
        </>
      ),
    },
    {
      heading: '12. Прикінцеві положення',
      body: (
        <>
          <p className={p}>
            <strong>12.1.</strong> Умови доступні на сайті Сервісу і можуть бути роздруковані або збережені Клієнтом.
          </p>
          <p className={p}>
            <strong>12.2.</strong> Всі спори, що виникають у зв&apos;язку з наданням послуг, вирішуються судом за місцезнаходженням Сервісу.
          </p>
          <p className={p}>
            <strong>12.3.</strong> У разі невідповідності положень Умов чинному законодавству застосовуються норми польського права.
          </p>
        </>
      ),
    },
  ],
}

export const politykaPrywatnosciContentUk: LegalPageContent = {
  intro: '“Хочете ознайомитися з нашою Політикою конфіденційності? Читайте нижче.”',
  title: 'Політика конфіденційності',
  lastUpdatedLabel: 'Останнє оновлення',
  dateLocale: 'uk-UA',
  sections: [
    {
      heading: '1. Вступ',
      body: (
        <p className={p}>
          Ця Політика конфіденційності визначає принципи обробки та захисту персональних даних,
          наданих Користувачами у зв&apos;язку з використанням послуг сервісу
          Omobonus Serwis за адресою <a href="https://serwis.omobonus.com.pl" className={link}>https://serwis.omobonus.com.pl</a>.
        </p>
      ),
    },
    {
      heading: '2. Адміністратор даних',
      body: (
        <p className={p}>
          Адміністратором персональних даних є Omobonus Sp. z o.o. з місцезнаходженням у Вроцлаві,
          вул. Marcina Bukowskiego 174, 52-418 Wrocław.
        </p>
      ),
    },
    {
      heading: '3. Категорії оброблюваних даних',
      body: (
        <>
          <p className={p}>
            Ми обробляємо такі категорії персональних даних:
          </p>
          <ul className={ul}>
            <li>Ім&apos;я та прізвище</li>
            <li>Адреса електронної пошти</li>
            <li>Номер телефону</li>
            <li>Адреса проживання / доставки</li>
            <li>Дані щодо пристрою, що надається на сервіс</li>
            <li><strong>Дані, зібрані за допомогою файлів cookies</strong>, такі як IP-адреса, налаштування користувача, дані браузера (якщо застосовується).</li>
          </ul>
        </>
      ),
    },
    {
      heading: '4. Мета обробки даних',
      body: (
        <>
          <p className={p}>
            Персональні дані обробляються в таких цілях:
          </p>
          <ul className={ul}>
            <li>Надання сервісних послуг</li>
            <li>Зв&apos;язок із клієнтом щодо заявки</li>
            <li>Підготовка кошторису ремонту</li>
            <li>Ведення сервісної документації</li>
            <li>Виконання правових зобов&apos;язань</li>
            <li><strong>Аналіз статистики сайту та покращення якості послуг</strong> (якщо використовуються аналітичні інструменти, такі як Google Analytics).</li>
          </ul>
        </>
      ),
    },
    {
      heading: '5. Правова підстава обробки',
      body: (
        <>
          <p className={p}>
            Правовою підставою обробки персональних даних є:
          </p>
          <ul className={ul}>
            <li>Згода особи, дані якої обробляються (ст. 6 п. 1 літ. a GDPR)</li>
            <li>Виконання договору або вжиття заходів до його укладення (ст. 6 п. 1 літ. b GDPR)</li>
            <li>Виконання правового зобов&apos;язання (ст. 6 п. 1 літ. c GDPR)</li>
          </ul>
        </>
      ),
    },
    {
      heading: '6. Строк зберігання даних',
      body: (
        <>
          <p className={p}>
            Персональні дані зберігатимуться протягом строку, необхідного для досягнення цілей,
            з якими їх було зібрано, а також протягом строку, що вимагається законодавством,
            включаючи податкове та бухгалтерське.
          </p>
          <ul className={`${ul} mt-1.5`}>
            <li>Після закінчення цього строку дані будуть <strong>видалені або анонімізовані</strong>.</li>
          </ul>
        </>
      ),
    },
    {
      heading: '7. Права користувача',
      body: (
        <>
          <p className={p}>
            Кожна особа, дані якої обробляються, має право на:
          </p>
          <ul className={ul}>
            <li>Доступ до своїх персональних даних</li>
            <li>Виправлення (коректування) даних</li>
            <li>Видалення даних</li>
            <li>Обмеження обробки</li>
            <li>Перенесення даних</li>
            <li>Заперечення проти обробки</li>
            <li>Відкликання згоди в будь-який момент</li>
          </ul>
        </>
      ),
    },
    {
      heading: '8. Передача даних до третіх країн',
      body: (
        <p className={p}>
          Персональні дані можуть передаватися до третіх країн у разі використання зовнішніх послуг,
          таких як хмарне зберігання даних, аналітичні послуги або інтернет-реклама.
          Передача даних здійснюється відповідно до чинного законодавства, зокрема за допомогою
          відповідних механізмів захисту даних, таких як <strong>стандартні договірні положення</strong>.
        </p>
      ),
    },
    {
      heading: '9. Безпека даних',
      body: (
        <p className={p}>
          Ми вживаємо відповідних технічних та організаційних заходів для забезпечення безпеки персональних даних.
          Ми застосовуємо шифрування даних, захист від несанкціонованого доступу та регулярно оновлюємо
          наші системи безпеки.
        </p>
      ),
    },
    {
      heading: '10. Контакт',
      body: (
        <p className={p}>
          З питань, пов&apos;язаних із захистом персональних даних, можна звертатися до Адміністратора
          через форму зворотного зв&apos;язку на сайті
          або безпосередньо за адресою електронної пошти: <a href="mailto:serwis@omobonus.com.pl" className={link}>serwis@omobonus.com.pl</a>.
        </p>
      ),
    },
    {
      heading: '11. Оновлення політики',
      body: (
        <p className={p}>
          Ця Політика конфіденційності може бути змінена. Всі зміни будуть опубліковані
          на цій сторінці. Рекомендуємо регулярно переглядати зміст політики конфіденційності.
        </p>
      ),
    },
    {
      heading: '12. Файли cookies',
      body: (
        <p className={p}>
          На нашому сайті ми використовуємо файли cookies для збору інформації про вподобання користувачів,
          покращення якості послуг, а також в аналітичних та маркетингових цілях. Користувач може керувати
          налаштуваннями cookies через свій веб-браузер.
        </p>
      ),
    },
  ],
}
