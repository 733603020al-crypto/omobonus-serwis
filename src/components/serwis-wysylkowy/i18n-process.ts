// Texts of the "Serwis wysyłkowy" process cards and their windows (steps 1–5.2), per language.
// Polish is the source; UK/RU/EN follow its meaning (docs/languages/languages-standard.md).

export type StepKey = '01' | '02' | '03' | '04' | '05.1' | '05.2'
type Locale = 'pl' | 'uk' | 'ru' | 'en'

export type StepInfo = {
  sections: { title: string; text: string; list?: [string, string][] }[]
  button: string
}
export type StepWindowText = { title: string; info: StepInfo; faq: [string, string][] }
export type ProcessText = {
  heading: string
  lead: string
  more: string
  or: string
  close: string
  contactHref: string
  steps: Record<StepKey, { title: string; description?: string }>
  windows: Record<StepKey, StepWindowText>
}

const PL: ProcessText = {
  heading: 'Serwis i naprawa bez wychodzenia z domu',
  lead: 'Przekaż nam laptop, drukarkę lub inne urządzenie — my zajmiemy się resztą.',
  more: 'Zobacz więcej',
  or: '— lub —',
  close: 'Zamknij',
  contactHref: '/kontakt',
  steps: {
    '01': { title: 'Zgłoszenie' },
    '02': { title: 'Wysyłka' },
    '03': { title: 'Diagnostyka i wycena' },
    '04': { title: 'Akceptacja wyceny', description: 'Bez Twojej zgody nie rozpoczynamy naprawy' },
    '05.1': { title: 'Naprawa i zwrot' },
    '05.2': { title: 'Zwrot bez naprawy' },
  },
  windows: {
    '01': {
      title: '1. Zgłoszenie',
      faq: [
        ['Czy zgłoszenie zobowiązuje mnie do naprawy?', 'Nie. Decyzję podejmiesz po otrzymaniu wyceny.'],
        ['Ile zapłacę, jeśli zrezygnuję z naprawy?', 'Jeśli zrezygnujesz po ustaleniu przyczyny usterki i otrzymaniu wyceny, zapłacisz za diagnozę według ceny dla Twojej kategorii urządzenia oraz za transport. Obie kwoty podamy przed wysyłką.'],
        ['Nie znam przyczyny awarii. Co napisać?', 'Opisz, co nie działa, od kiedy i w jakich sytuacjach. Nie musisz znać technicznej przyczyny.'],
        ['Czy muszę dołączyć zdjęcia lub film?', 'Nie, ale mogą pomóc nam lepiej zrozumieć problem.'],
        ['Czy mogę od razu wysłać urządzenie?', 'Najpierw skontaktuj się z nami, aby ustalić warunki przyjęcia i sposób wysyłki.'],
      ],
      info: {
        sections: [
          {
            title: 'Skontaktuj się z nami przed wysyłką — ustalimy, od czego zacząć',
            text: 'Opisz problem w formularzu, napisz na czacie, zadzwoń lub zostaw numer — oddzwonimy i ustalimy dalsze kroki.\nPodaj markę i model urządzenia, opisz objawy oraz zostaw dane do kontaktu. Jeśli możesz, dołącz zdjęcie tabliczki z modelem, komunikatu błędu lub krótki film pokazujący problem.',
          },
          {
            title: 'Co dalej?',
            text: 'Sprawdzimy zgłoszenie i ustalimy z Tobą dalsze kroki oraz warunki przyjęcia sprzętu. Przed wysyłką poznasz obowiązujący Cię koszt diagnozy w razie rezygnacji z naprawy oraz koszt transportu: odesłania urządzenia do Ciebie, a jeśli przygotujemy etykietę — także wysyłki do serwisu.',
          },
          {
            title: 'Konsultacja przed wysyłką jest bezpłatna. Przyczynę usterki, możliwość i koszt naprawy ustalamy dopiero po diagnostyce urządzenia w serwisie.',
            text: '',
          },
        ],
        button: 'Szybki kontakt',
      },
    },
    '02': {
      title: '2. Wysyłka',
      faq: [
        ['Czy mogę wysłać urządzenie dowolnym przewoźnikiem?', 'Tak. Nadaj paczkę na adres podany w potwierdzeniu zgłoszenia. Możesz też poprosić nas o przygotowanie etykiety.'],
        ['Ile kosztuje wysyłka?', 'Jeśli wysyłasz samodzielnie — według cennika Twojego przewoźnika. Jeśli przygotujemy etykietę — jej koszt podamy, zanim ją przygotujemy. Koszt odesłania urządzenia również podamy wcześniej.'],
        ['Czy mogę wysłać drukarkę w oryginalnym opakowaniu?', 'Tak, to najlepsze rozwiązanie. Jeśli go nie masz, użyj sztywnego kartonu z wypełnieniem.'],
        ['Co, jeśli paczka dotrze uszkodzona?', 'Przy odbiorze sprawdzamy stan opakowania, a każdą paczkę otwieramy, dokumentując jej zawartość zdjęciami i filmem. Jeśli zauważymy uszkodzenie, od razu Cię poinformujemy, zanim rozpoczniemy prace, i przekażemy dokumentację potrzebną do zgłoszenia reklamacji u przewoźnika.'],
      ],
      info: {
        sections: [
          {
            title: 'Wyślij urządzenie samodzielnie albo poproś nas o etykietę',
            text: 'Możesz nadać paczkę dowolnym przewoźnikiem na adres podany w potwierdzeniu zgłoszenia. Jeśli wolisz, przygotujemy dla Ciebie etykietę dla kuriera lub do Paczkomatu. Jej koszt podamy, zanim ją przygotujemy — opłacimy ją, a Ty zwrócisz nam ten koszt.\nZapakuj urządzenie w sztywny karton z wypełnieniem, tak aby nie przesuwało się w środku. Drukarkę zabezpiecz zgodnie z instrukcją producenta: zablokuj głowicę, wyjmij lub zabezpiecz wkłady i opróżnij podajniki papieru. Nie dołączaj kart pamięci ani akcesoriów, których nie potrzebujemy do naprawy. Przed zapakowaniem zrób kilka zdjęć urządzenia, a numer zgłoszenia umieść na paczce lub w środku.',
          },
          {
            title: 'Co dalej?',
            text: 'Gdy paczka do nas dotrze, otworzymy ją, nagrywając film, i wyślemy Ci e-mailem potwierdzenie przyjęcia z opisem stanu urządzenia. Jeśli zauważymy uszkodzenie, poinformujemy Cię o tym, zanim rozpoczniemy prace.',
          },
          {
            title: 'Transport do serwisu i z powrotem opłacasz niezależnie od wyniku diagnozy i naprawy. Nie jest wliczony w cenę diagnozy ani naprawy.',
            text: '',
          },
        ],
        button: 'Szybki kontakt',
      },
    },
    '03': {
      title: '3. Diagnostyka i wycena',
      faq: [
        ['Ile trwa diagnoza?', 'Diagnoza trwa zwykle 1–3 dni robocze od przyjęcia urządzenia.'],
        ['Ile kosztuje diagnoza?', 'Cenę diagnozy dla Twojej kategorii urządzenia podajemy przed wysyłką. Płacisz ją tylko wtedy, gdy po ustaleniu przyczyny usterki i otrzymaniu wyceny zrezygnujesz z naprawy. Jeśli zlecisz naprawę, diagnoza jest wliczona w jej cenę.'],
        ['Co, jeśli nie znajdziecie przyczyny usterki?', 'Powiemy Ci o tym i odeślemy urządzenie. Za diagnozę nie płacisz — pokrywasz tylko transport.'],
        ['Jakie części stosujecie?', 'Rodzaj części podajemy w wycenie. Części innych niż nowe używamy wyłącznie za Twoją zgodą.'],
      ],
      info: {
        sections: [
          {
            title: 'Sprawdzimy urządzenie i przedstawimy wycenę',
            text: 'Diagnoza trwa zwykle 1–3 dni robocze od przyjęcia urządzenia. Otrzymujesz wycenę ze zdjęciami usterek, zakres napraw, rodzaj części (oryginalne, zamienniki lub odnowione), cenę i przewidywany termin. Konsumentom podajemy cenę brutto.\nJeśli zlecisz naprawę, diagnoza jest wliczona w jej cenę — nie płacisz za nią osobno. Jeśli po otrzymaniu wyceny zrezygnujesz z naprawy — także uznając ją za nieopłacalną — płacisz za diagnozę według ceny uzgodnionej przed wysyłką. Jeśli nie uda nam się ustalić przyczyny usterki, za diagnozę nie płacisz.',
          },
          { title: 'Co dalej?', text: 'Wycenę otrzymasz e-mailem. Naprawy nie rozpoczniemy bez Twojej akceptacji.' },
          {
            title: 'Jeśli naprawa okaże się nieopłacalna albo potrzebna część będzie niedostępna, powiemy Ci o tym od razu i podamy powód.',
            text: '',
          },
        ],
        button: 'Szybki kontakt',
      },
    },
    '04': {
      title: '4. Akceptacja wyceny',
      faq: [
        ['Ile mam czasu na decyzję?', 'Jeśli nie odpowiesz w ciągu 14 dni od otrzymania wyceny, spróbujemy skontaktować się ponownie. Dalszy brak odpowiedzi traktujemy jako rezygnację z naprawy, a nie jako zgodę.'],
        ['Ile zapłacę, jeśli zrezygnuję?', 'Za diagnozę według ceny uzgodnionej przed wysyłką oraz za transport.'],
        ['Czy mogę wybrać tańsze części?', 'Zapytaj nas — jeśli dostępny jest tańszy wariant (zamienniki lub części odnowione), przedstawimy go. Części innych niż nowe używamy wyłącznie za Twoją zgodą.'],
      ],
      info: {
        sections: [
          {
            title: 'Ty decydujesz, czy naprawiamy',
            text: 'Wycenę możesz zaakceptować osobiście, telefonicznie, e-mailem, SMS-em lub przez komunikator. Akceptację telefoniczną potwierdzamy e-mailem lub SMS-em.\nJeśli w trakcie naprawy okaże się, że potrzebne są dodatkowe prace lub części albo cena miałaby wzrosnąć, przerwiemy prace i zapytamy Cię o zgodę. Bez niej nie wykonujemy dodatkowych prac i nie pobieramy za nie opłat.',
          },
          { title: 'Co dalej?', text: 'Akceptujesz wycenę — naprawiamy urządzenie. Rezygnujesz — odsyłamy je bez naprawy.' },
          { title: 'Bez Twojej zgody nie rozpoczynamy naprawy. Brak odpowiedzi nie oznacza akceptacji.', text: '' },
        ],
        button: 'Szybki kontakt',
      },
    },
    '05.1': {
      title: '5.1. Naprawa i zwrot',
      faq: [
        ['Kiedy płacę za naprawę?', 'Płatność przyjmujemy przelewem. Konsumenci płacą przed wysłaniem urządzenia, firmy — w terminie wskazanym na fakturze.'],
        ['Ile trwa gwarancja?', 'Okres gwarancji zależy od usługi. Podajemy go w opisie usługi na stronie oraz w dokumencie naprawy, np. na fakturze.'],
        ['Co, jeśli usterka powróci?', 'Zgłoś to e-mailem, telefonicznie lub osobiście, podając numer zlecenia lub faktury i opis usterki. W ramach gwarancji, jeśli przyczyną usterki jest nasza praca lub zamontowana przez nas część, koszt wysyłki urządzenia do serwisu i z powrotem na terenie Polski pokrywamy my.'],
        ['Co, jeśli paczka dotrze do mnie uszkodzona?', 'Sprawdź przesyłkę przy kurierze i poproś o protokół szkody, a następnie skontaktuj się z nami. Pakowanie każdej przesyłki dokumentujemy zdjęciami i filmem, co pomaga wyjaśnić sprawę z przewoźnikiem. Brak protokołu nie pozbawia konsumenta jego praw.'],
      ],
      info: {
        sections: [
          {
            title: 'Naprawiamy, testujemy i odsyłamy',
            text: 'Po akceptacji wyceny naprawiamy urządzenie i sprawdzamy jego działanie. Gdy naprawa będzie gotowa, poinformujemy Cię o tym i prześlemy dane do płatności.\nPłatność przyjmujemy przelewem. Konsumenci płacą przed wysłaniem urządzenia, firmy — w terminie wskazanym na fakturze. Urządzenie starannie pakujemy, dokumentując pakowanie zdjęciami i filmem, i wysyłamy ubezpieczoną przesyłką. Wartość do ubezpieczenia i koszt wysyłki ustalimy z Tobą przed nadaniem.\nWymienione części proponujemy zwrócić Ci razem z urządzeniem. Wyjątkiem są części, które musimy oddać dostawcy, oraz części niebezpieczne, np. spuchnięte akumulatory — o takim wyjątku informujemy przed naprawą.',
          },
          { title: 'Co dalej?', text: 'Po nadaniu prześlemy Ci numer przesyłki. Przy odbiorze sprawdź stan paczki w obecności kuriera, a jeśli jest uszkodzona — poproś o protokół szkody.' },
          {
            title: 'Na naprawę udzielamy gwarancji. Jeśli w okresie gwarancji usterka powróci, a jej przyczyną jest nasza praca lub zamontowana przez nas część, koszt wysyłki urządzenia do serwisu i z powrotem na terenie Polski pokrywamy my.',
            text: '',
          },
        ],
        button: 'Szybki kontakt',
      },
    },
    '05.2': {
      title: '5.2. Zwrot bez naprawy',
      faq: [
        ['Ile zapłacę, jeśli nie ustalicie przyczyny usterki?', 'Za diagnozę nie płacisz — pokrywasz tylko transport.'],
        ['Co, jeśli nie odpowiem na wycenę?', 'Jeśli nie odpowiesz w ciągu 14 dni, spróbujemy skontaktować się ponownie. Dalszy brak odpowiedzi traktujemy jako rezygnację z naprawy i informujemy Cię o możliwości odbioru urządzenia.'],
        ['Jak długo przechowujecie urządzenie?', 'Przez 30 dni od zawiadomienia o możliwości odbioru — bezpłatnie. Później naliczamy opłatę za przechowywanie zgodnie z regulaminem. Przypomnimy Ci o tym przed końcem bezpłatnego okresu.'],
      ],
      info: {
        sections: [
          {
            title: 'Odsyłamy urządzenie bez naprawy',
            text: 'Jeśli zrezygnujesz z naprawy albo nie ustalimy przyczyny usterki, odeślemy Ci urządzenie. Należności rozliczamy przed wysyłką: konsumenci płacą przelewem przed wysłaniem urządzenia, firmy — w terminie wskazanym na fakturze.',
          },
          {
            title: 'Ile zapłacisz?',
            text: '',
            list: [
              ['Rezygnujesz po otrzymaniu wyceny', ' (także gdy uznasz naprawę za nieopłacalną) — płacisz za diagnozę według ceny uzgodnionej przed wysyłką oraz za transport.'],
              ['Nie ustalimy przyczyny usterki', ' — za diagnozę nie płacisz, pokrywasz tylko transport.'],
            ],
          },
          { title: 'Co dalej?', text: 'Po nadaniu prześlemy Ci numer przesyłki. Przy odbiorze sprawdź stan paczki w obecności kuriera, a jeśli jest uszkodzona — poproś o protokół szkody.' },
          { title: 'Jeśli nie możesz od razu odebrać przesyłki lub rozliczyć należności, przechowamy urządzenie bezpłatnie przez 30 dni od zawiadomienia.', text: '' },
        ],
        button: 'Szybki kontakt',
      },
    },
  },
}

const UK: ProcessText = {
  heading: "Сервіс і ремонт, не виходячи з дому",
  lead: "Передайте нам ноутбук, принтер чи інший пристрій — решту ми беремо на себе.",
  more: "Дізнатися більше",
  or: "— або —",
  close: "Закрити",
  contactHref: "/uk/kontakt",
  steps: {
    '01': { title: "Заявка" },
    '02': { title: "Відправка" },
    '03': { title: "Діагностика та оцінка" },
    '04': { title: "Погодження оцінки", description: "Без вашої згоди ремонт не починаємо" },
    '05.1': { title: "Ремонт і повернення" },
    '05.2': { title: "Повернення без ремонту" },
  },
  windows: {
    '01': {
      title: "1. Заявка",
      faq: [
        ["Чи зобов'язує мене заявка до ремонту?", "Ні. Рішення ви ухвалите після отримання оцінки вартості."],
        ["Скільки я заплачу, якщо відмовлюся від ремонту?", "Якщо ви відмовитеся після визначення причини несправності та отримання оцінки, ви заплатите за діагностику за ціною для вашої категорії пристрою та за транспорт. Обидві суми ми повідомимо до відправки."],
        ["Я не знаю причини поломки. Що написати?", "Опишіть, що не працює, відколи і за яких обставин. Знати технічну причину не потрібно."],
        ["Чи потрібно додавати фото або відео?", "Ні, але вони можуть допомогти нам краще зрозуміти проблему."],
        ["Чи можу я одразу відправити пристрій?", "Спершу зв'яжіться з нами, щоб узгодити умови приймання та спосіб відправки."],
      ],
      info: {
        sections: [
          {
            title: "Зв'яжіться з нами до відправки — разом визначимо, з чого почати",
            text: "Опишіть проблему у формі, напишіть у чаті, зателефонуйте або залиште номер — ми передзвонимо й узгодимо подальші кроки.\nВкажіть марку та модель пристрою, опишіть ознаки несправності й залиште контактні дані. Якщо можете, додайте фото таблички з моделлю, повідомлення про помилку або коротке відео, що показує проблему.",
          },
          {
            title: "Що далі?",
            text: "Ми перевіримо заявку та узгодимо з вами подальші кроки й умови приймання техніки. До відправки ви дізнаєтеся, скільки коштуватиме діагностика, якщо відмовитеся від ремонту, та вартість транспорту: повернення пристрою вам, а якщо ми підготуємо етикетку — також відправки до сервісу.",
          },
          {
            title: "Консультація перед відправкою безкоштовна. Причину несправності, можливість і вартість ремонту визначаємо лише після діагностики пристрою в сервісі.",
            text: "",
          },
        ],
        button: "Швидкий контакт",
      },
    },
    '02': {
      title: "2. Відправка",
      faq: [
        ["Чи можу я відправити пристрій будь-яким перевізником?", "Так. Відправте посилку на адресу, вказану в підтвердженні заявки. Ви також можете попросити нас підготувати етикетку."],
        ["Скільки коштує відправка?", "Якщо ви відправляєте самостійно — за тарифом вашого перевізника. Якщо етикетку готуємо ми — її вартість повідомимо до того, як підготуємо. Вартість повернення пристрою також повідомимо заздалегідь."],
        ["Чи можу я відправити принтер в оригінальній упаковці?", "Так, це найкраще рішення. Якщо її немає, використайте міцну картонну коробку з наповнювачем."],
        ["Що, якщо посилка прибуде пошкодженою?", "Під час отримання ми перевіряємо стан упаковки, а кожну посилку відкриваємо, фіксуючи вміст фото та відео. Якщо помітимо пошкодження, одразу повідомимо вас ще до початку робіт і передамо документацію, потрібну для подання рекламації перевізнику."],
      ],
      info: {
        sections: [
          {
            title: "Відправте пристрій самостійно або попросіть нас про етикетку",
            text: "Ви можете відправити посилку будь-яким перевізником на адресу, вказану в підтвердженні заявки. Якщо вам так зручніше, ми підготуємо для вас етикетку для кур'єра або для поштомату. Її вартість повідомимо до того, як підготуємо — ми сплатимо її, а ви відшкодуєте нам цю суму.\nЗапакуйте пристрій у міцну коробку з наповнювачем так, щоб він не зсувався всередині. Принтер захистіть згідно з інструкцією виробника: заблокуйте головку, вийміть або захистіть картриджі та спорожніть лотки для паперу. Не додавайте карти пам'яті й аксесуари, які не потрібні нам для ремонту. Перед пакуванням зробіть кілька фото пристрою, а номер заявки вкажіть на посилці або покладіть усередину.",
          },
          {
            title: "Що далі?",
            text: "Коли посилка до нас надійде, ми відкриємо її, знімаючи відео, і надішлемо вам електронною поштою підтвердження приймання з описом стану пристрою. Якщо помітимо пошкодження, повідомимо вас про це ще до початку робіт.",
          },
          {
            title: "Транспорт до сервісу та назад ви оплачуєте незалежно від результату діагностики й ремонту. Він не входить у ціну діагностики чи ремонту.",
            text: "",
          },
        ],
        button: "Швидкий контакт",
      },
    },
    '03': {
      title: "3. Діагностика та оцінка",
      faq: [
        ["Скільки триває діагностика?", "Діагностика зазвичай триває 1–3 робочі дні від приймання пристрою."],
        ["Скільки коштує діагностика?", "Ціну діагностики для вашої категорії пристрою ми повідомляємо до відправки. Ви платите її лише тоді, коли після визначення причини несправності та отримання оцінки відмовитеся від ремонту. Якщо замовите ремонт, діагностика входить у його ціну."],
        ["Що, якщо ви не знайдете причину несправності?", "Ми повідомимо вам про це й відправимо пристрій назад. За діагностику ви не платите — покриваєте лише транспорт."],
        ["Які запчастини ви використовуєте?", "Тип запчастин ми вказуємо в оцінці. Запчастини, які не є новими, використовуємо лише за вашою згодою."],
      ],
      info: {
        sections: [
          {
            title: "Ми перевіримо пристрій і надамо оцінку вартості",
            text: "Діагностика зазвичай триває 1–3 робочі дні від приймання пристрою. Ви отримуєте оцінку з фото несправностей, обсяг ремонту, тип запчастин (оригінальні, аналоги або відновлені), ціну та орієнтовний термін. Споживачам ми вказуємо ціну брутто.\nЯкщо замовите ремонт, діагностика входить у його ціну — окремо за неї ви не платите. Якщо після отримання оцінки ви відмовитеся від ремонту — зокрема вважаючи його невигідним — ви платите за діагностику за ціною, узгодженою до відправки. Якщо нам не вдасться визначити причину несправності, за діагностику ви не платите.",
          },
          { title: "Що далі?", text: "Оцінку ви отримаєте електронною поштою. Ремонт ми не розпочнемо без вашого погодження." },
          {
            title: "Якщо ремонт виявиться невигідним або потрібна запчастина буде недоступна, ми одразу повідомимо вам про це та вкажемо причину.",
            text: "",
          },
        ],
        button: "Швидкий контакт",
      },
    },
    '04': {
      title: "4. Погодження оцінки",
      faq: [
        ["Скільки в мене часу на рішення?", "Якщо ви не відповісте протягом 14 днів після отримання оцінки, ми спробуємо зв'язатися з вами ще раз. Подальшу відсутність відповіді ми вважаємо відмовою від ремонту, а не згодою."],
        ["Скільки я заплачу, якщо відмовлюся?", "За діагностику за ціною, узгодженою до відправки, та за транспорт."],
        ["Чи можу я вибрати дешевші запчастини?", "Запитайте нас — якщо є дешевший варіант (аналоги або відновлені запчастини), ми його запропонуємо. Запчастини, які не є новими, використовуємо лише за вашою згодою."],
      ],
      info: {
        sections: [
          {
            title: "Ви вирішуєте, чи ремонтуємо",
            text: "Оцінку ви можете погодити особисто, по телефону, електронною поштою, SMS або через месенджер. Погодження по телефону ми підтверджуємо електронною поштою або SMS.\nЯкщо під час ремонту виявиться, що потрібні додаткові роботи чи запчастини або ціна мала б зрости, ми зупинимо роботи й запитаємо вашої згоди. Без неї ми не виконуємо додаткових робіт і не беремо за них плату.",
          },
          { title: "Що далі?", text: "Погоджуєте оцінку — ми ремонтуємо пристрій. Відмовляєтеся — відправляємо його назад без ремонту." },
          { title: "Без вашої згоди ремонт не починаємо. Відсутність відповіді не означає згоди.", text: "" },
        ],
        button: "Швидкий контакт",
      },
    },
    '05.1': {
      title: "5.1. Ремонт і повернення",
      faq: [
        ["Коли я плачу за ремонт?", "Оплату приймаємо переказом. Споживачі платять до відправки пристрою, фірми — у строк, указаний у рахунку-фактурі."],
        ["Скільки діє гарантія?", "Строк гарантії залежить від послуги. Ми вказуємо його в описі послуги на сайті та в документі про ремонт, наприклад у рахунку-фактурі."],
        ["Що, якщо несправність повернеться?", "Повідомте про це електронною поштою, по телефону або особисто, вказавши номер замовлення чи рахунку-фактури та опис несправності. У межах гарантії, якщо причиною несправності є наша робота або встановлена нами запчастина, вартість відправки пристрою до сервісу й назад на території Польщі ми беремо на себе."],
        ["Що, якщо посилка прибуде до мене пошкодженою?", "Перевірте посилку при кур'єрі й попросіть скласти акт про пошкодження, а потім зв'яжіться з нами. Пакування кожної посилки ми фіксуємо фото та відео, що допомагає з'ясувати ситуацію з перевізником. Відсутність акта не позбавляє споживача його прав."],
      ],
      info: {
        sections: [
          {
            title: "Ремонтуємо, тестуємо й відправляємо назад",
            text: "Після погодження оцінки ми ремонтуємо пристрій і перевіряємо його роботу. Коли ремонт буде готовий, повідомимо вас і надішлемо дані для оплати.\nОплату приймаємо переказом. Споживачі платять до відправки пристрою, фірми — у строк, указаний у рахунку-фактурі. Пристрій ретельно пакуємо, фіксуючи пакування фото та відео, і відправляємо застрахованою посилкою. Вартість для страхування та вартість відправки узгодимо з вами до відправки.\nЗамінені запчастини ми пропонуємо повернути вам разом із пристроєм. Винятки — запчастини, які ми повинні віддати постачальнику, та небезпечні запчастини, наприклад здуті акумулятори; про такий виняток ми повідомляємо до ремонту.",
          },
          { title: "Що далі?", text: "Після відправки ми надішлемо вам номер посилки. Під час отримання перевірте стан посилки в присутності кур'єра, а якщо вона пошкоджена — попросіть скласти акт про пошкодження." },
          {
            title: "На ремонт ми надаємо гарантію. Якщо протягом гарантійного строку несправність повернеться, а її причиною є наша робота або встановлена нами запчастина, вартість відправки пристрою до сервісу й назад на території Польщі ми беремо на себе.",
            text: "",
          },
        ],
        button: "Швидкий контакт",
      },
    },
    '05.2': {
      title: "5.2. Повернення без ремонту",
      faq: [
        ["Скільки я заплачу, якщо ви не визначите причину несправності?", "За діагностику ви не платите — покриваєте лише транспорт."],
        ["Що, якщо я не відповім на оцінку?", "Якщо ви не відповісте протягом 14 днів, ми спробуємо зв'язатися з вами ще раз. Подальшу відсутність відповіді ми вважаємо відмовою від ремонту й повідомляємо вас про можливість забрати пристрій."],
        ["Як довго ви зберігаєте пристрій?", "Протягом 30 днів від повідомлення про можливість забрати його — безкоштовно. Пізніше ми нараховуємо плату за зберігання згідно з регламентом. Ми нагадаємо вам про це до закінчення безкоштовного періоду."],
      ],
      info: {
        sections: [
          {
            title: "Відправляємо пристрій назад без ремонту",
            text: "Якщо ви відмовитеся від ремонту або ми не визначимо причину несправності, ми відправимо вам пристрій назад. Розрахунки проводимо до відправки: споживачі платять переказом до відправки пристрою, фірми — у строк, указаний у рахунку-фактурі.",
          },
          {
            title: "Скільки ви заплатите?",
            text: "",
            list: [
              ["Ви відмовляєтеся після отримання оцінки", " (зокрема й коли вважаєте ремонт невигідним) — ви платите за діагностику за ціною, узгодженою до відправки, та за транспорт."],
              ["Ми не визначимо причину несправності", " — за діагностику ви не платите, покриваєте лише транспорт."],
            ],
          },
          { title: "Що далі?", text: "Після відправки ми надішлемо вам номер посилки. Під час отримання перевірте стан посилки в присутності кур'єра, а якщо вона пошкоджена — попросіть скласти акт про пошкодження." },
          { title: "Якщо ви не можете одразу забрати посилку або розрахуватися, ми безкоштовно збережемо пристрій протягом 30 днів від повідомлення.", text: "" },
        ],
        button: "Швидкий контакт",
      },
    },
  },
}

const RU: ProcessText = {
  heading: "Сервис и ремонт, не выходя из дома",
  lead: "Передайте нам ноутбук, принтер или другое устройство — остальное мы берём на себя.",
  more: "Узнать больше",
  or: "— или —",
  close: "Закрыть",
  contactHref: "/ru/kontakt",
  steps: {
    '01': { title: "Заявка" },
    '02': { title: "Отправка" },
    '03': { title: "Диагностика и оценка" },
    '04': { title: "Согласование оценки", description: "Без вашего согласия ремонт не начинаем" },
    '05.1': { title: "Ремонт и возврат" },
    '05.2': { title: "Возврат без ремонта" },
  },
  windows: {
    '01': {
      title: "1. Заявка",
      faq: [
        ["Обязывает ли меня заявка к ремонту?", "Нет. Решение вы примете после получения оценки стоимости."],
        ["Сколько я заплачу, если откажусь от ремонта?", "Если вы откажетесь после установления причины неисправности и получения оценки, вы заплатите за диагностику по цене для вашей категории устройства и за транспорт. Обе суммы мы назовём до отправки."],
        ["Я не знаю причину поломки. Что написать?", "Опишите, что не работает, с какого времени и в каких ситуациях. Знать техническую причину не нужно."],
        ["Нужно ли прикладывать фото или видео?", "Нет, но они могут помочь нам лучше понять проблему."],
        ["Могу ли я сразу отправить устройство?", "Сначала свяжитесь с нами, чтобы согласовать условия приёма и способ отправки."],
      ],
      info: {
        sections: [
          {
            title: "Свяжитесь с нами до отправки — вместе определим, с чего начать",
            text: "Опишите проблему в форме, напишите в чате, позвоните или оставьте номер — мы перезвоним и согласуем дальнейшие шаги.\nУкажите марку и модель устройства, опишите признаки неисправности и оставьте контактные данные. Если можете, приложите фото таблички с моделью, сообщения об ошибке или короткое видео, показывающее проблему.",
          },
          {
            title: "Что дальше?",
            text: "Мы проверим заявку и согласуем с вами дальнейшие шаги и условия приёма техники. До отправки вы узнаете, сколько будет стоить диагностика в случае отказа от ремонта, а также стоимость транспорта: возврата устройства вам, а если мы подготовим этикетку — и отправки в сервис.",
          },
          {
            title: "Консультация перед отправкой бесплатна. Причину неисправности, возможность и стоимость ремонта мы определяем только после диагностики устройства в сервисе.",
            text: "",
          },
        ],
        button: "Быстрый контакт",
      },
    },
    '02': {
      title: "2. Отправка",
      faq: [
        ["Могу ли я отправить устройство любым перевозчиком?", "Да. Отправьте посылку на адрес, указанный в подтверждении заявки. Вы также можете попросить нас подготовить этикетку."],
        ["Сколько стоит отправка?", "Если вы отправляете самостоятельно — по тарифу вашего перевозчика. Если этикетку готовим мы — её стоимость назовём до того, как подготовим. Стоимость возврата устройства тоже назовём заранее."],
        ["Могу ли я отправить принтер в оригинальной упаковке?", "Да, это лучшее решение. Если её нет, используйте жёсткую картонную коробку с наполнителем."],
        ["Что, если посылка придёт повреждённой?", "При получении мы проверяем состояние упаковки, а каждую посылку вскрываем, фиксируя содержимое на фото и видео. Если заметим повреждение, сразу сообщим вам ещё до начала работ и передадим документацию, необходимую для подачи рекламации перевозчику."],
      ],
      info: {
        sections: [
          {
            title: "Отправьте устройство самостоятельно или попросите нас об этикетке",
            text: "Вы можете отправить посылку любым перевозчиком на адрес, указанный в подтверждении заявки. Если вам так удобнее, мы подготовим для вас этикетку для курьера или для постамата. Её стоимость назовём до того, как подготовим — мы оплатим её, а вы возместите нам эту сумму.\nУпакуйте устройство в жёсткую коробку с наполнителем так, чтобы оно не смещалось внутри. Принтер подготовьте согласно инструкции производителя: заблокируйте головку, выньте или защитите картриджи и опорожните лотки для бумаги. Не прикладывайте карты памяти и аксессуары, которые не нужны нам для ремонта. Перед упаковкой сделайте несколько фото устройства, а номер заявки укажите на посылке или положите внутрь.",
          },
          {
            title: "Что дальше?",
            text: "Когда посылка дойдёт до нас, мы вскроем её, снимая видео, и пришлём вам по e-mail подтверждение приёма с описанием состояния устройства. Если заметим повреждение, сообщим вам об этом до начала работ.",
          },
          {
            title: "Транспорт в сервис и обратно вы оплачиваете независимо от результата диагностики и ремонта. Он не включён в цену диагностики или ремонта.",
            text: "",
          },
        ],
        button: "Быстрый контакт",
      },
    },
    '03': {
      title: "3. Диагностика и оценка",
      faq: [
        ["Сколько длится диагностика?", "Диагностика обычно занимает 1–3 рабочих дня с момента приёма устройства."],
        ["Сколько стоит диагностика?", "Цену диагностики для вашей категории устройства мы называем до отправки. Вы платите её только в том случае, если после установления причины неисправности и получения оценки откажетесь от ремонта. Если закажете ремонт, диагностика включена в его цену."],
        ["Что, если вы не найдёте причину неисправности?", "Мы сообщим вам об этом и отправим устройство обратно. За диагностику вы не платите — покрываете только транспорт."],
        ["Какие запчасти вы используете?", "Вид запчастей мы указываем в оценке. Запчасти, не являющиеся новыми, используем только с вашего согласия."],
      ],
      info: {
        sections: [
          {
            title: "Мы проверим устройство и представим оценку стоимости",
            text: "Диагностика обычно занимает 1–3 рабочих дня с момента приёма устройства. Вы получаете оценку с фото неисправностей, объём ремонта, вид запчастей (оригинальные, аналоги или восстановленные), цену и ориентировочный срок. Потребителям мы указываем цену брутто.\nЕсли закажете ремонт, диагностика включена в его цену — отдельно за неё вы не платите. Если после получения оценки вы откажетесь от ремонта — в том числе сочтя его невыгодным — вы платите за диагностику по цене, согласованной до отправки. Если нам не удастся установить причину неисправности, за диагностику вы не платите.",
          },
          { title: "Что дальше?", text: "Оценку вы получите по e-mail. Ремонт мы не начнём без вашего согласия." },
          {
            title: "Если ремонт окажется невыгодным или нужная запчасть будет недоступна, мы сразу скажем вам об этом и укажем причину.",
            text: "",
          },
        ],
        button: "Быстрый контакт",
      },
    },
    '04': {
      title: "4. Согласование оценки",
      faq: [
        ["Сколько у меня времени на решение?", "Если вы не ответите в течение 14 дней после получения оценки, мы попробуем связаться с вами ещё раз. Дальнейшее отсутствие ответа мы считаем отказом от ремонта, а не согласием."],
        ["Сколько я заплачу, если откажусь?", "За диагностику по цене, согласованной до отправки, и за транспорт."],
        ["Могу ли я выбрать более дешёвые запчасти?", "Спросите нас — если есть более дешёвый вариант (аналоги или восстановленные запчасти), мы его предложим. Запчасти, не являющиеся новыми, используем только с вашего согласия."],
      ],
      info: {
        sections: [
          {
            title: "Вы решаете, ремонтируем ли мы",
            text: "Оценку вы можете согласовать лично, по телефону, по e-mail, по SMS или через мессенджер. Согласование по телефону мы подтверждаем по e-mail или по SMS.\nЕсли в ходе ремонта выяснится, что нужны дополнительные работы или запчасти либо цена должна была бы вырасти, мы приостановим работы и спросим вашего согласия. Без него мы не выполняем дополнительных работ и не берём за них плату.",
          },
          { title: "Что дальше?", text: "Согласовываете оценку — мы ремонтируем устройство. Отказываетесь — отправляем его обратно без ремонта." },
          { title: "Без вашего согласия ремонт не начинаем. Отсутствие ответа не означает согласия.", text: "" },
        ],
        button: "Быстрый контакт",
      },
    },
    '05.1': {
      title: "5.1. Ремонт и возврат",
      faq: [
        ["Когда я плачу за ремонт?", "Оплату принимаем переводом. Потребители платят до отправки устройства, фирмы — в срок, указанный в счёте-фактуре."],
        ["Сколько действует гарантия?", "Срок гарантии зависит от услуги. Мы указываем его в описании услуги на сайте и в документе о ремонте, например в счёте-фактуре."],
        ["Что, если неисправность вернётся?", "Сообщите об этом по e-mail, по телефону или лично, указав номер заказа или счёта-фактуры и описание неисправности. В рамках гарантии, если причиной неисправности является наша работа или установленная нами запчасть, стоимость отправки устройства в сервис и обратно на территории Польши мы берём на себя."],
        ["Что, если посылка придёт ко мне повреждённой?", "Проверьте посылку при курьере и попросите составить акт о повреждении, а затем свяжитесь с нами. Упаковку каждой посылки мы фиксируем на фото и видео, что помогает разобраться с перевозчиком. Отсутствие акта не лишает потребителя его прав."],
      ],
      info: {
        sections: [
          {
            title: "Ремонтируем, тестируем и отправляем обратно",
            text: "После согласования оценки мы ремонтируем устройство и проверяем его работу. Когда ремонт будет готов, мы сообщим вам об этом и пришлём данные для оплаты.\nОплату принимаем переводом. Потребители платят до отправки устройства, фирмы — в срок, указанный в счёте-фактуре. Устройство мы тщательно упаковываем, фиксируя упаковку на фото и видео, и отправляем застрахованной посылкой. Стоимость для страховки и стоимость отправки согласуем с вами до отправки.\nЗамененные запчасти мы предлагаем вернуть вам вместе с устройством. Исключение — запчасти, которые мы обязаны вернуть поставщику, и опасные запчасти, например вздувшиеся аккумуляторы; о таком исключении мы сообщаем до ремонта.",
          },
          { title: "Что дальше?", text: "После отправки мы пришлём вам номер посылки. При получении проверьте состояние посылки в присутствии курьера, а если она повреждена — попросите составить акт о повреждении." },
          {
            title: "На ремонт мы даём гарантию. Если в течение гарантийного срока неисправность вернётся, а её причиной является наша работа или установленная нами запчасть, стоимость отправки устройства в сервис и обратно на территории Польши мы берём на себя.",
            text: "",
          },
        ],
        button: "Быстрый контакт",
      },
    },
    '05.2': {
      title: "5.2. Возврат без ремонта",
      faq: [
        ["Сколько я заплачу, если вы не установите причину неисправности?", "За диагностику вы не платите — покрываете только транспорт."],
        ["Что, если я не отвечу на оценку?", "Если вы не ответите в течение 14 дней, мы попробуем связаться с вами ещё раз. Дальнейшее отсутствие ответа мы считаем отказом от ремонта и сообщаем вам о возможности забрать устройство."],
        ["Как долго вы храните устройство?", "В течение 30 дней с момента уведомления о возможности забрать его — бесплатно. Позже мы начисляем плату за хранение согласно регламенту. Мы напомним вам об этом до окончания бесплатного периода."],
      ],
      info: {
        sections: [
          {
            title: "Отправляем устройство обратно без ремонта",
            text: "Если вы откажетесь от ремонта или мы не установим причину неисправности, мы отправим вам устройство обратно. Расчёты проводим до отправки: потребители платят переводом до отправки устройства, фирмы — в срок, указанный в счёте-фактуре.",
          },
          {
            title: "Сколько вы заплатите?",
            text: "",
            list: [
              ["Вы отказываетесь после получения оценки", " (в том числе когда считаете ремонт невыгодным) — вы платите за диагностику по цене, согласованной до отправки, и за транспорт."],
              ["Мы не установим причину неисправности", " — за диагностику вы не платите, покрываете только транспорт."],
            ],
          },
          { title: "Что дальше?", text: "После отправки мы пришлём вам номер посылки. При получении проверьте состояние посылки в присутствии курьера, а если она повреждена — попросите составить акт о повреждении." },
          { title: "Если вы не можете сразу забрать посылку или рассчитаться, мы бесплатно сохраним устройство в течение 30 дней с момента уведомления.", text: "" },
        ],
        button: "Быстрый контакт",
      },
    },
  },
}

const EN: ProcessText = {
  heading: "Service and repair without leaving home",
  lead: "Hand us your laptop, printer or other device — we'll take care of the rest.",
  more: "Learn more",
  or: "— or —",
  close: "Close",
  contactHref: "/en/kontakt",
  steps: {
    '01': { title: "Request" },
    '02': { title: "Shipping" },
    '03': { title: "Diagnosis and quote" },
    '04': { title: "Quote approval", description: "We never start a repair without your approval" },
    '05.1': { title: "Repair and return" },
    '05.2': { title: "Return without repair" },
  },
  windows: {
    '01': {
      title: "1. Request",
      faq: [
        ["Does submitting a request oblige me to have the repair done?", "No. You decide after you receive the quote."],
        ["How much will I pay if I decide against the repair?", "If you decline after the cause of the fault has been found and you have received the quote, you pay for the diagnosis at the price for your device category, plus transport. We give you both amounts before you ship."],
        ["I don't know what is wrong. What should I write?", "Describe what doesn't work, since when and in what situations. You don't need to know the technical cause."],
        ["Do I have to attach photos or a video?", "No, but they can help us understand the problem better."],
        ["Can I ship the device right away?", "Please contact us first so we can agree on the conditions of acceptance and how to ship."],
      ],
      info: {
        sections: [
          {
            title: "Contact us before shipping — we'll work out where to start",
            text: "Describe the problem in the form, write in the chat, call us or leave your number — we'll call you back and agree the next steps.\nGive the brand and model of the device, describe the symptoms and leave your contact details. If you can, attach a photo of the model plate, of the error message, or a short video showing the problem.",
          },
          {
            title: "What happens next?",
            text: "We'll check your request and agree the next steps and the conditions for accepting the equipment with you. Before shipping you will know the diagnosis cost that applies to you if you decide against the repair, and the transport cost: sending the device back to you and, if we prepare the label, shipping it to the service centre as well.",
          },
          {
            title: "A consultation before shipping is free. We establish the cause of the fault and the possibility and cost of repair only after diagnosing the device at the service centre.",
            text: "",
          },
        ],
        button: "Quick contact",
      },
    },
    '02': {
      title: "2. Shipping",
      faq: [
        ["Can I send the device with any carrier?", "Yes. Send the parcel to the address given in the request confirmation. You can also ask us to prepare the label."],
        ["How much does shipping cost?", "If you ship it yourself — according to your carrier's price list. If we prepare the label, we'll tell you its cost before we prepare it. We'll also tell you the cost of sending the device back in advance."],
        ["Can I send a printer in its original packaging?", "Yes, that is the best option. If you don't have it, use a rigid cardboard box with filling."],
        ["What if the parcel arrives damaged?", "On receipt we check the condition of the packaging and open every parcel, documenting its contents with photos and video. If we notice damage, we'll tell you right away, before we start any work, and give you the documentation needed to file a claim with the carrier."],
      ],
      info: {
        sections: [
          {
            title: "Ship the device yourself or ask us for a label",
            text: "You can send the parcel with any carrier to the address given in the request confirmation. If you prefer, we'll prepare a label for you, for a courier or for a parcel locker. We'll tell you its cost before we prepare it — we pay for it and you reimburse us.\nPack the device in a rigid cardboard box with filling so that it can't move inside. Prepare a printer according to the manufacturer's instructions: lock the print head, remove or secure the cartridges and empty the paper trays. Don't include memory cards or accessories we don't need for the repair. Take a few photos of the device before packing it, and put the request number on the parcel or inside it.",
          },
          {
            title: "What happens next?",
            text: "When the parcel reaches us, we'll open it while recording a video and email you a confirmation of receipt with a description of the device's condition. If we notice damage, we'll tell you before we start any work.",
          },
          {
            title: "You pay for transport to the service centre and back regardless of the result of the diagnosis and repair. It is not included in the price of the diagnosis or the repair.",
            text: "",
          },
        ],
        button: "Quick contact",
      },
    },
    '03': {
      title: "3. Diagnosis and quote",
      faq: [
        ["How long does the diagnosis take?", "The diagnosis usually takes 1–3 working days from receiving the device."],
        ["How much does the diagnosis cost?", "We give you the diagnosis price for your device category before you ship. You pay it only if, after the cause of the fault has been found and you have received the quote, you decide against the repair. If you order the repair, the diagnosis is included in its price."],
        ["What if you can't find the cause of the fault?", "We'll tell you and send the device back. You don't pay for the diagnosis — you only cover transport."],
        ["What parts do you use?", "We state the type of parts in the quote. We use parts other than new ones only with your consent."],
      ],
      info: {
        sections: [
          {
            title: "We'll check the device and present a quote",
            text: "The diagnosis usually takes 1–3 working days from receiving the device. You receive a quote with photos of the faults, the scope of repairs, the type of parts (original, replacements or refurbished), the price and the expected time. We give consumers the gross price.\nIf you order the repair, the diagnosis is included in its price — you don't pay for it separately. If you decide against the repair after receiving the quote — including because you find it uneconomical — you pay for the diagnosis at the price agreed before shipping. If we can't establish the cause of the fault, you don't pay for the diagnosis.",
          },
          { title: "What happens next?", text: "You'll receive the quote by email. We won't start the repair without your approval." },
          {
            title: "If the repair turns out to be uneconomical or a needed part is unavailable, we'll tell you straight away and give the reason.",
            text: "",
          },
        ],
        button: "Quick contact",
      },
    },
    '04': {
      title: "4. Quote approval",
      faq: [
        ["How long do I have to decide?", "If you don't reply within 14 days of receiving the quote, we'll try to contact you again. If there is still no reply, we treat it as a decision not to repair, not as consent."],
        ["How much will I pay if I decline?", "For the diagnosis at the price agreed before shipping, plus transport."],
        ["Can I choose cheaper parts?", "Ask us — if a cheaper option is available (replacements or refurbished parts), we'll present it. We use parts other than new ones only with your consent."],
      ],
      info: {
        sections: [
          {
            title: "You decide whether we repair",
            text: "You can approve the quote in person, by phone, by email, by text message or through a messenger. We confirm approval given by phone by email or text message.\nIf during the repair it turns out that additional work or parts are needed, or that the price would go up, we'll stop work and ask for your consent. Without it we don't carry out additional work or charge for it.",
          },
          { title: "What happens next?", text: "You approve the quote — we repair the device. You decline — we send it back without repair." },
          { title: "We don't start a repair without your approval. No reply does not mean approval.", text: "" },
        ],
        button: "Quick contact",
      },
    },
    '05.1': {
      title: "5.1. Repair and return",
      faq: [
        ["When do I pay for the repair?", "We accept payment by bank transfer. Consumers pay before the device is sent back; businesses — by the due date stated on the invoice."],
        ["How long does the warranty last?", "The warranty period depends on the service. We state it in the service description on the website and in the repair document, e.g. on the invoice."],
        ["What if the fault comes back?", "Report it by email, phone or in person, giving the order or invoice number and a description of the fault. Under the warranty, if the cause of the fault is our work or a part we fitted, we cover the cost of shipping the device to the service centre and back within Poland."],
        ["What if the parcel arrives damaged?", "Check the parcel with the courier present and ask for a damage report, then contact us. We document the packing of every parcel with photos and video, which helps settle the matter with the carrier. Not having a report does not take away the consumer's rights."],
      ],
      info: {
        sections: [
          {
            title: "We repair, test and send it back",
            text: "Once you approve the quote, we repair the device and check that it works. When the repair is ready, we'll let you know and send you the payment details.\nWe accept payment by bank transfer. Consumers pay before the device is sent back; businesses — by the due date stated on the invoice. We pack the device carefully, documenting the packing with photos and video, and send it as an insured parcel. We'll agree the insured value and the shipping cost with you before dispatch.\nWe offer to return the replaced parts to you together with the device. The exceptions are parts that we have to give back to the supplier and hazardous parts, e.g. swollen batteries — we tell you about such an exception before the repair.",
          },
          { title: "What happens next?", text: "Once it is dispatched, we'll send you the tracking number. On delivery, check the condition of the parcel with the courier present, and if it is damaged, ask for a damage report." },
          {
            title: "We give a warranty on the repair. If the fault comes back during the warranty period and its cause is our work or a part we fitted, we cover the cost of shipping the device to the service centre and back within Poland.",
            text: "",
          },
        ],
        button: "Quick contact",
      },
    },
    '05.2': {
      title: "5.2. Return without repair",
      faq: [
        ["How much will I pay if you can't find the cause of the fault?", "You don't pay for the diagnosis — you only cover transport."],
        ["What if I don't reply to the quote?", "If you don't reply within 14 days, we'll try to contact you again. If there is still no reply, we treat it as a decision not to repair and let you know that you can collect the device."],
        ["How long do you keep the device?", "For 30 days from the notice that it is ready for collection — free of charge. After that we charge a storage fee in accordance with the terms and conditions. We'll remind you before the free period ends."],
      ],
      info: {
        sections: [
          {
            title: "We send the device back without repair",
            text: "If you decide against the repair, or we can't establish the cause of the fault, we'll send the device back to you. We settle the charges before dispatch: consumers pay by bank transfer before the device is sent, businesses — by the due date stated on the invoice.",
          },
          {
            title: "How much will you pay?",
            text: "",
            list: [
              ["You decline after receiving the quote", " (including when you find the repair uneconomical) — you pay for the diagnosis at the price agreed before shipping, plus transport."],
              ["We can't establish the cause of the fault", " — you don't pay for the diagnosis, you only cover transport."],
            ],
          },
          { title: "What happens next?", text: "Once it is dispatched, we'll send you the tracking number. On delivery, check the condition of the parcel with the courier present, and if it is damaged, ask for a damage report." },
          { title: "If you can't collect the parcel or settle the charges straight away, we'll keep the device free of charge for 30 days from the notice.", text: "" },
        ],
        button: "Quick contact",
      },
    },
  },
}

export const PROCESS_TEXT: Record<Locale, ProcessText> = { pl: PL, uk: UK, ru: RU, en: EN }

// Stamp pictures with a word on them (TAK/NIE/ZWROT, warranty) per language.
// Ukrainian "ТАК" is spelled like the Polish "TAK", so that picture is shared.
export const STAMPS: Record<Locale, { tak: string; nie: string; zwrot: string; gwarancja: string }> = {
  pl: { tak: '/images/serwis-wysylkowy/stempel-tak-v2.webp', nie: '/images/serwis-wysylkowy/stempel-nie.webp', zwrot: '/images/serwis-wysylkowy/stempel-zwrot-v4.avif', gwarancja: '/images/serwis-wysylkowy/gwarancja-v1.avif' },
  uk: { tak: '/images/serwis-wysylkowy/stempel-tak-v2.webp', nie: '/images/serwis-wysylkowy/stempel-nie-uk.webp', zwrot: '/images/serwis-wysylkowy/stempel-zwrot-uk-v1.avif', gwarancja: '/images/serwis-wysylkowy/gwarancja-uk-v1.avif' },
  ru: { tak: '/images/serwis-wysylkowy/stempel-tak-ru.webp', nie: '/images/serwis-wysylkowy/stempel-nie-ru.webp', zwrot: '/images/serwis-wysylkowy/stempel-zwrot-ru-v1.avif', gwarancja: '/images/serwis-wysylkowy/gwarancja-ru-v1.avif' },
  en: { tak: '/images/serwis-wysylkowy/stempel-tak-en.webp', nie: '/images/serwis-wysylkowy/stempel-nie-en.webp', zwrot: '/images/serwis-wysylkowy/stempel-zwrot-en-v1.avif', gwarancja: '/images/serwis-wysylkowy/gwarancja-en-v1.avif' },
}
