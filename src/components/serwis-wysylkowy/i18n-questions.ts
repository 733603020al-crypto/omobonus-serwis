// Texts of the "Serwis wysyłkowy" FAQ block (BasicQuestions) per language.
// Pictures and their sizes stay in basic-questions.tsx; here is only what is read.
// Polish is the source; UK/RU/EN follow its meaning (docs/languages/languages-standard.md).

type Locale = 'pl' | 'uk' | 'ru' | 'en'
type Card = { title: string; imageAlt: string; rows: ([string] | [string, string])[]; note?: string }

export type QuestionsText = {
  faqTitle: string
  viewDetails: string
  priceTitle: string
  priceColumns: [string, string, string]
  devices: Record<string, string>
  shipping: { title: string; noteBanner: string; cards: [Card, Card] }
  packing: { title: string; cards: [Card, Card] }
  duration: { title: string; noteBanner: string; intro: string }
  data: { title: string; noteBanner: string; intro: string }
  label: { title: string; intro: string }
  parcel: { title: string; noteBanner: string; intro: string; card: Card }
  warranty: { title: string; intro: string }
  reject: { title: string; intro: string }
  accept: { title: string; intro: string }
}

const PL: QuestionsText = {
  faqTitle: 'Najczęściej zadawane pytania (FAQ)',
  viewDetails: 'Zobacz szczegóły',
  priceTitle: 'Ile kosztuje diagnoza i wycena naprawy?',
  priceColumns: ['Pełna diagnoza i wycena naprawy', 'Cena, zł', 'Czas realizacji'],
  devices: {
    'serwis-laptopow': 'Laptop',
    'serwis-komputerow-stacjonarnych': 'Komputer stacjonarny',
    'serwis-drukarek-laserowych': 'Drukarka laserowa / kserokopiarka',
    'serwis-drukarek-atramentowych': 'Drukarka atramentowa',
    'serwis-plotterow': 'Ploter',
    'serwis-drukarek-termicznych': 'Drukarka termiczna / etykiet',
    'serwis-drukarek-iglowych': 'Drukarka igłowa',
    'serwis-drukarek-3d': 'Drukarka 3D',
    'serwis-niszczarek': 'Niszczarka',
    'naprawa-zasilaczy-ups': 'Zasilacz awaryjny UPS',
    'naprawa-projektorow': 'Projektor',
    'serwis-drukarek-do-kart-plastikowych': 'Drukarka do kart plastikowych',
    'serwis-drukarek-dtg': 'Drukarka DTG',
    'serwis-drukarek-dtf': 'Drukarka DTF',
    'serwis-drukarek-sublimacyjnych': 'Drukarka sublimacyjna',
    'serwis-drukarek-spozywczych': 'Drukarka spożywcza',
    'serwis-ekspresow-do-kawy': 'Ekspres do kawy',
  },
  shipping: {
    title: 'Ile kosztuje wysyłka?',
    noteBanner: 'Ceny orientacyjne za wysyłkę w jedną stronę, według oficjalnych cenników przewoźników. Dokładna cena zależy od adresu, wymiarów i wagi paczki.',
    cards: [
      { title: 'Paczkomat', imageAlt: 'Paczkomat i paczki do wysyłki', rows: [['Gabaryt A — 8 × 38 × 64 cm, do 25 kg', '16,49 zł'], ['Gabaryt B — 19 × 38 × 64 cm, do 25 kg', '18,49 zł'], ['Gabaryt C — 41 × 38 × 64 cm, do 25 kg', '20,49 zł']] },
      { title: 'Kurier', imageAlt: 'Samochód kurierski i paczki do wysyłki', rows: [['8 × 38 × 64 cm, do 25 kg', '19,49 zł'], ['41 × 38 × 64 cm, do 25 kg', '25,49 zł'], ['40 × 60 × 80 cm, do 31,5 kg', '41,00 zł'], ['60 × 60 × 120 cm, do 31,5 kg', '57,00 zł']] },
    ],
  },
  packing: {
    title: 'Jak prawidłowo zapakować sprzęt?',
    cards: [
      { title: 'Oryginalne opakowanie', imageAlt: 'Laptop w oryginalnym kartonie z wkładkami producenta', rows: [['Najlepiej wyślij sprzęt w oryginalnym kartonie, razem z wkładkami producenta.']] },
      { title: 'Nie masz oryginalnego?', imageAlt: 'Laptop w kartonie z wypełniaczem', rows: [['– Wyłącz urządzenie i owiń je folią bąbelkową.'], ['– Wybierz sztywny, nieuszkodzony karton, w którym zostanie min. 5 cm wolnego miejsca z każdej strony, i wypełnij je wypełniaczem — nic nie może się przesuwać.'], ['– Zaklej karton taśmą.']], note: 'Uwaga:\nNie owijaj kartonu folią stretch — kurier może doliczyć opłatę.\nZa duży karton może podnieść cenę wysyłki — kurierzy liczą wagę także z wymiarów kartonu.' },
    ],
  },
  duration: {
    title: 'Ile to wszystko potrwa?',
    noteBanner: 'Pilne? Zadzwoń przed wysyłką: 793 759 262 — jeśli to możliwe, przyspieszymy naprawę bez dodatkowej opłaty.',
    intro: '– **Dostawa do serwisu:** zwykle 1–2 dni robocze.\n– **Diagnoza i wycena:** zwykle 1–3 dni robocze od otrzymania paczki.\n– **Naprawa:** według cennika danej usługi (kolumna „Czas realizacji”).\n– **Odesłanie sprzętu:** zwykle 1–2 dni robocze.',
  },
  data: {
    title: 'Czy moje dane są bezpieczne?',
    noteBanner: 'Dla Twojego spokoju: przed wysyłką zmień hasło na tymczasowe, a gdy laptop do Ciebie wróci — przywróć swoje.',
    intro: '**Twoje pliki:** nie przeglądamy, nie kopiujemy i nie usuwamy Twoich danych. Jeśli naprawa może na nie wpłynąć (np. wymiana dysku), najpierw to z Tobą uzgodnimy.\n**Umowa o poufności:** na Twoją prośbę podpiszemy umowę o zachowaniu poufności.\n**Hasło:** jest potrzebne, by sprawdzić laptopa po naprawie (np. test pod obciążeniem).\n**Kopia zapasowa:** przed wysyłką zrób kopię ważnych plików — na wszelki wypadek.',
  },
  label: {
    title: 'Nie wiem jak nadać paczkę ani gdzie wydrukować etykietę',
    intro: '**Nie musisz niczego drukować ani zakładać kont u przewoźników – wysyłkę przygotowujemy za Ciebie.**\n\n• **Paczkomat InPost** – wysyłamy Ci SMS-em lub e-mailem kod nadania. Wpisujesz go na ekranie Paczkomatu (albo skanujesz kod QR w aplikacji InPost), skrytka się otwiera i wkładasz paczkę. Bez etykiety.\n\n• **Kurier** – zamawiamy odbiór pod Twój adres. Jeśli przewoźnik wymaga etykiety, kurier przywiezie ją ze sobą lub wystarczy czytelnie napisać na kartonie numer, który od nas dostaniesz.\n\nTy tylko pakujesz urządzenie – a jeśli nie wiesz jak, podpowiemy krok po kroku.',
  },
  parcel: {
    title: 'Co włożyć do paczki?',
    noteBanner: 'Nie wiesz, co dołączyć? Zapytaj nas przed wysyłką.',
    intro: '**Co dołączyć do urządzenia:**\n– ładowarkę do laptopa lub zewnętrzny zasilacz,\n– nietypowe kable,\n– wszystkie tace i kasety na papier — bez nich niektóre drukarki nie działają,\n– specjalny papier: składankę do drukarek igłowych, etykiety lub rolki do drukarek termicznych (zapakowane osobno).\n\nTusze i tonery zostaw w urządzeniu. UPS wyślij w komplecie — niczego nie wyjmuj.\n\nNie wysyłaj standardowego kabla zasilającego ani kabla USB (mamy własne), myszek, pendrive’ów, kart pamięci, toreb ani etui.',
    card: { title: 'Kartka z Twoimi danymi — obowiązkowo', imageAlt: 'Kartka z imieniem, telefonem i opisem usterki', rows: [['Włóż do paczki kartkę z imieniem i nazwiskiem, numerem telefonu i krótkim opisem usterki.'], ['Na etykiecie kurierskiej Twoje dane są ukryte — bez kartki nie będziemy wiedzieć, od kogo jest paczka.']] },
  },
  warranty: {
    title: 'Czy dostanę gwarancję na naprawę?',
    intro: '**Okres gwarancji:** zależy od usługi — podajemy go w opisie usługi na stronie oraz w dokumencie naprawy (np. na fakturze).\n**Co obejmuje:** wykonaną przez nas pracę i zamontowane przez nas części, nie całe urządzenie.\n**Jeśli usterka wróci:** gdy jej przyczyną jest nasza praca lub część, usuniemy ją bezpłatnie — przez ponowną naprawę albo wymianę części.\n**Jak zgłosić:** e-mailem, telefonicznie lub osobiście — podaj numer zlecenia lub faktury i opis usterki.\n**Wysyłka:** w takim przypadku koszt wysyłki do serwisu i z powrotem na terenie Polski pokrywamy my.\n**Czego nie obejmuje:** uszkodzenia mechanicznego, zalania, przepięcia, używania niezgodnie z instrukcją, ingerencji osób trzecich i naturalnego zużycia części eksploatacyjnych.',
  },
  reject: {
    title: 'Co jeśli nie zaakceptuję wyceny i zrezygnuję z naprawy?',
    intro: '**Nic nie naprawiamy bez Twojej zgody.**\n\nJeśli zrezygnujesz, odeślemy urządzenie, a Ty zapłacisz **tylko za pełną diagnozę i wycenę** (cena zależy od urządzenia — patrz pierwsze pytanie) + wysyłkę w obie strony według cennika kuriera.\n\nZa etykietę, zapakowanie i nadanie paczki nic nie doliczamy.',
  },
  accept: {
    title: 'Jeśli zaakceptuję naprawę, czy diagnoza będzie „za darmo”?',
    intro: 'Rozebranie urządzenia, pomiary i znalezienie usterki wymagają czasu i pracy — nie mogą być „za darmo”.\n\nZlecasz naprawę? **Wtedy nie liczymy diagnozy osobno**, bo urządzenie jest już rozebrane i wiemy, co wymienić, więc połowa pracy przy naprawie jest już zrobiona.\n\nPłacisz tylko za samą naprawę (według cennika) i ewentualne części — diagnoza jest już w tej cenie. Do tego dochodzi wysyłka w obie strony według cennika kuriera.',
  },
}

const UK: QuestionsText = {
  faqTitle: 'Найчастіші запитання (FAQ)',
  viewDetails: 'Переглянути деталі',
  priceTitle: 'Скільки коштує діагностика та оцінка ремонту?',
  priceColumns: ['Повна діагностика та оцінка ремонту', 'Ціна, зл', 'Термін виконання'],
  devices: {
    'serwis-laptopow': 'Ноутбук',
    'serwis-komputerow-stacjonarnych': 'Стаціонарний комп\'ютер',
    'serwis-drukarek-laserowych': 'Лазерний принтер / копір',
    'serwis-drukarek-atramentowych': 'Струменевий принтер',
    'serwis-plotterow': 'Плотер',
    'serwis-drukarek-termicznych': 'Термопринтер / принтер етикеток',
    'serwis-drukarek-iglowych': 'Матричний принтер',
    'serwis-drukarek-3d': '3D-принтер',
    'serwis-niszczarek': 'Шредер',
    'naprawa-zasilaczy-ups': 'Джерело безперебійного живлення UPS',
    'naprawa-projektorow': 'Проєктор',
    'serwis-drukarek-do-kart-plastikowych': 'Принтер пластикових карток',
    'serwis-drukarek-dtg': 'DTG-принтер',
    'serwis-drukarek-dtf': 'DTF-принтер',
    'serwis-drukarek-sublimacyjnych': 'Сублімаційний принтер',
    'serwis-drukarek-spozywczych': 'Харчовий принтер',
    'serwis-ekspresow-do-kawy': 'Кавомашина',
  },
  shipping: {
    title: 'Скільки коштує відправка?',
    noteBanner: 'Орієнтовні ціни за відправку в один бік за офіційними тарифами перевізників. Точна ціна залежить від адреси, розмірів і ваги посилки.',
    cards: [
      { title: 'Поштомат', imageAlt: 'Поштомат і посилки для відправки', rows: [['Габарит A — 8 × 38 × 64 см, до 25 кг', '16,49 зл'], ['Габарит B — 19 × 38 × 64 см, до 25 кг', '18,49 зл'], ['Габарит C — 41 × 38 × 64 см, до 25 кг', '20,49 зл']] },
      { title: 'Кур\'єр', imageAlt: 'Кур\'єрський автомобіль і посилки для відправки', rows: [['8 × 38 × 64 см, до 25 кг', '19,49 зл'], ['41 × 38 × 64 см, до 25 кг', '25,49 зл'], ['40 × 60 × 80 см, до 31,5 кг', '41,00 зл'], ['60 × 60 × 120 см, до 31,5 кг', '57,00 зл']] },
    ],
  },
  packing: {
    title: 'Як правильно запакувати техніку?',
    cards: [
      { title: 'Оригінальна упаковка', imageAlt: 'Ноутбук в оригінальній коробці з вкладками виробника', rows: [['Найкраще відправте техніку в оригінальній коробці разом із вкладками виробника.']] },
      { title: 'Немає оригінальної?', imageAlt: 'Ноутбук у коробці з наповнювачем', rows: [['– Вимкніть пристрій і обмотайте його бульбашковою плівкою.'], ['– Виберіть міцну, непошкоджену коробку, у якій з кожного боку залишиться щонайменше 5 см вільного місця, і заповніть його наповнювачем — ніщо не повинно зсуватися.'], ['– Заклейте коробку скотчем.']], note: 'Увага:\nНе обмотуйте коробку стретч-плівкою — кур\'єр може додати плату.\nЗанадто велика коробка може підвищити ціну відправки — кур\'єри рахують вагу ще й за розмірами коробки.' },
    ],
  },
  duration: {
    title: 'Скільки все це триватиме?',
    noteBanner: 'Терміново? Зателефонуйте перед відправкою: 793 759 262 — якщо це можливо, ми прискоримо ремонт без додаткової плати.',
    intro: '– **Доставка до сервісу:** зазвичай 1–2 робочі дні.\n– **Діагностика та оцінка:** зазвичай 1–3 робочі дні від отримання посилки.\n– **Ремонт:** за прайсом відповідної послуги (колонка «Термін виконання»).\n– **Відправка техніки назад:** зазвичай 1–2 робочі дні.',
  },
  data: {
    title: 'Чи в безпеці мої дані?',
    noteBanner: 'Для вашого спокою: перед відправкою змініть пароль на тимчасовий, а коли ноутбук повернеться до вас — відновіть свій.',
    intro: '**Ваші файли:** ми не переглядаємо, не копіюємо й не видаляємо ваші дані. Якщо ремонт може на них вплинути (наприклад, заміна диска), ми спершу узгодимо це з вами.\n**Угода про конфіденційність:** на ваше прохання ми підпишемо угоду про нерозголошення.\n**Пароль:** потрібен, щоб перевірити ноутбук після ремонту (наприклад, тест під навантаженням).\n**Резервна копія:** перед відправкою зробіть копію важливих файлів — про всяк випадок.',
  },
  label: {
    title: 'Я не знаю, як відправити посилку і де надрукувати етикетку',
    intro: '**Вам не потрібно нічого друкувати чи створювати акаунти в перевізників – відправку ми готуємо за вас.**\n\n• **Поштомат InPost** – ми надсилаємо вам SMS або електронною поштою код відправлення. Ви вводите його на екрані поштомата (або скануєте QR-код у застосунку InPost), комірка відкривається, і ви кладете посилку. Без етикетки.\n\n• **Кур\'єр** – ми замовляємо забір за вашою адресою. Якщо перевізник вимагає етикетку, кур\'єр привезе її з собою, або достатньо чітко написати на коробці номер, який ви від нас отримаєте.\n\nВи лише пакуєте пристрій – а якщо не знаєте як, ми підкажемо крок за кроком.',
  },
  parcel: {
    title: 'Що покласти в посилку?',
    noteBanner: 'Не знаєте, що додати? Запитайте нас перед відправкою.',
    intro: '**Що додати до пристрою:**\n– зарядний пристрій до ноутбука або зовнішній блок живлення,\n– нестандартні кабелі,\n– усі лотки й касети для паперу — без них деякі принтери не працюють,\n– спеціальний папір: фальцьований папір для матричних принтерів, етикетки або рулони для термопринтерів (запаковані окремо).\n\nЧорнило й тонер залиште в пристрої. UPS відправляйте в комплекті — нічого не виймайте.\n\nНе відправляйте стандартний кабель живлення та USB-кабель (у нас є свої), мишки, флешки, карти пам\'яті, сумки й чохли.',
    card: { title: 'Аркуш із вашими даними — обов\'язково', imageAlt: 'Аркуш з іменем, телефоном і описом несправності', rows: [['Покладіть у посилку аркуш з іменем і прізвищем, номером телефону та коротким описом несправності.'], ['На кур\'єрській етикетці ваші дані приховані — без аркуша ми не знатимемо, від кого посилка.']] },
  },
  warranty: {
    title: 'Чи отримаю я гарантію на ремонт?',
    intro: '**Строк гарантії:** залежить від послуги — ми вказуємо його в описі послуги на сайті та в документі про ремонт (наприклад, у рахунку-фактурі).\n**Що охоплює:** виконану нами роботу та встановлені нами запчастини, а не весь пристрій.\n**Якщо несправність повернеться:** коли її причиною є наша робота чи запчастина, ми усунемо її безкоштовно — повторним ремонтом або заміною запчастини.\n**Як повідомити:** електронною поштою, по телефону або особисто — вкажіть номер замовлення чи рахунку-фактури й опис несправності.\n**Відправка:** у такому разі вартість відправки до сервісу й назад на території Польщі ми беремо на себе.\n**Чого не охоплює:** механічних пошкоджень, залиття, перенапруги, використання всупереч інструкції, втручання третіх осіб і природного зносу витратних частин.',
  },
  reject: {
    title: 'Що, якщо я не погоджу оцінку й відмовлюся від ремонту?',
    intro: '**Ми нічого не ремонтуємо без вашої згоди.**\n\nЯкщо ви відмовитеся, ми відправимо пристрій назад, а ви заплатите **лише за повну діагностику та оцінку** (ціна залежить від пристрою — див. перше запитання) + відправку в обидва боки за тарифом кур\'єра.\n\nЗа етикетку, пакування й відправку посилки ми нічого не додаємо.',
  },
  accept: {
    title: 'Якщо я погоджу ремонт, чи буде діагностика «безкоштовною»?',
    intro: 'Розбирання пристрою, вимірювання та пошук несправності потребують часу й праці — вони не можуть бути «безкоштовними».\n\nЗамовляєте ремонт? **Тоді ми не рахуємо діагностику окремо**, адже пристрій уже розібраний і ми знаємо, що міняти, тож половина роботи з ремонту вже зроблена.\n\nВи платите лише за сам ремонт (за прайсом) і можливі запчастини — діагностика вже входить у цю ціну. До цього додається відправка в обидва боки за тарифом кур\'єра.',
  },
}

const RU: QuestionsText = {
  faqTitle: 'Часто задаваемые вопросы (FAQ)',
  viewDetails: 'Посмотреть подробности',
  priceTitle: 'Сколько стоит диагностика и оценка ремонта?',
  priceColumns: ['Полная диагностика и оценка ремонта', 'Цена, зл', 'Срок выполнения'],
  devices: {
    'serwis-laptopow': 'Ноутбук',
    'serwis-komputerow-stacjonarnych': 'Стационарный компьютер',
    'serwis-drukarek-laserowych': 'Лазерный принтер / копир',
    'serwis-drukarek-atramentowych': 'Струйный принтер',
    'serwis-plotterow': 'Плоттер',
    'serwis-drukarek-termicznych': 'Термопринтер / принтер этикеток',
    'serwis-drukarek-iglowych': 'Матричный принтер',
    'serwis-drukarek-3d': '3D-принтер',
    'serwis-niszczarek': 'Шредер',
    'naprawa-zasilaczy-ups': 'Источник бесперебойного питания UPS',
    'naprawa-projektorow': 'Проектор',
    'serwis-drukarek-do-kart-plastikowych': 'Принтер пластиковых карт',
    'serwis-drukarek-dtg': 'DTG-принтер',
    'serwis-drukarek-dtf': 'DTF-принтер',
    'serwis-drukarek-sublimacyjnych': 'Сублимационный принтер',
    'serwis-drukarek-spozywczych': 'Пищевой принтер',
    'serwis-ekspresow-do-kawy': 'Кофемашина',
  },
  shipping: {
    title: 'Сколько стоит отправка?',
    noteBanner: 'Ориентировочные цены за отправку в одну сторону по официальным тарифам перевозчиков. Точная цена зависит от адреса, размеров и веса посылки.',
    cards: [
      { title: 'Постамат', imageAlt: 'Постамат и посылки для отправки', rows: [['Габарит A — 8 × 38 × 64 см, до 25 кг', '16,49 зл'], ['Габарит B — 19 × 38 × 64 см, до 25 кг', '18,49 зл'], ['Габарит C — 41 × 38 × 64 см, до 25 кг', '20,49 зл']] },
      { title: 'Курьер', imageAlt: 'Курьерский автомобиль и посылки для отправки', rows: [['8 × 38 × 64 см, до 25 кг', '19,49 зл'], ['41 × 38 × 64 см, до 25 кг', '25,49 зл'], ['40 × 60 × 80 см, до 31,5 кг', '41,00 зл'], ['60 × 60 × 120 см, до 31,5 кг', '57,00 зл']] },
    ],
  },
  packing: {
    title: 'Как правильно упаковать технику?',
    cards: [
      { title: 'Оригинальная упаковка', imageAlt: 'Ноутбук в оригинальной коробке со вкладышами производителя', rows: [['Лучше всего отправьте технику в оригинальной коробке вместе со вкладышами производителя.']] },
      { title: 'Нет оригинальной?', imageAlt: 'Ноутбук в коробке с наполнителем', rows: [['– Выключите устройство и оберните его пузырчатой плёнкой.'], ['– Выберите жёсткую, неповреждённую коробку, в которой с каждой стороны останется не менее 5 см свободного места, и заполните его наполнителем — ничего не должно смещаться.'], ['– Заклейте коробку скотчем.']], note: 'Внимание:\nНе оборачивайте коробку стрейч-плёнкой — курьер может взять доплату.\nСлишком большая коробка может повысить цену отправки — курьеры считают вес ещё и по размерам коробки.' },
    ],
  },
  duration: {
    title: 'Сколько всё это займёт?',
    noteBanner: 'Срочно? Позвоните перед отправкой: 793 759 262 — если это возможно, мы ускорим ремонт без дополнительной платы.',
    intro: '– **Доставка в сервис:** обычно 1–2 рабочих дня.\n– **Диагностика и оценка:** обычно 1–3 рабочих дня с момента получения посылки.\n– **Ремонт:** по прайсу соответствующей услуги (колонка «Срок выполнения»).\n– **Отправка техники обратно:** обычно 1–2 рабочих дня.',
  },
  data: {
    title: 'В безопасности ли мои данные?',
    noteBanner: 'Для вашего спокойствия: перед отправкой смените пароль на временный, а когда ноутбук вернётся к вам — восстановите свой.',
    intro: '**Ваши файлы:** мы не просматриваем, не копируем и не удаляем ваши данные. Если ремонт может на них повлиять (например, замена диска), мы сначала согласуем это с вами.\n**Соглашение о конфиденциальности:** по вашей просьбе мы подпишем соглашение о неразглашении.\n**Пароль:** нужен, чтобы проверить ноутбук после ремонта (например, тест под нагрузкой).\n**Резервная копия:** перед отправкой сделайте копию важных файлов — на всякий случай.',
  },
  label: {
    title: 'Я не знаю, как отправить посылку и где распечатать этикетку',
    intro: '**Вам не нужно ничего печатать или заводить аккаунты у перевозчиков – отправку мы готовим за вас.**\n\n• **Постамат InPost** – мы присылаем вам по SMS или e-mail код отправки. Вы вводите его на экране постамата (или сканируете QR-код в приложении InPost), ячейка открывается, и вы кладёте посылку. Без этикетки.\n\n• **Курьер** – мы заказываем забор по вашему адресу. Если перевозчик требует этикетку, курьер привезёт её с собой, либо достаточно разборчиво написать на коробке номер, который вы получите от нас.\n\nВы только упаковываете устройство – а если не знаете как, мы подскажем шаг за шагом.',
  },
  parcel: {
    title: 'Что положить в посылку?',
    noteBanner: 'Не знаете, что приложить? Спросите нас перед отправкой.',
    intro: '**Что приложить к устройству:**\n– зарядное устройство для ноутбука или внешний блок питания,\n– нестандартные кабели,\n– все лотки и кассеты для бумаги — без них некоторые принтеры не работают,\n– специальную бумагу: фальцованную бумагу для матричных принтеров, этикетки или рулоны для термопринтеров (упакованные отдельно).\n\nЧернила и тонеры оставьте в устройстве. UPS отправляйте в комплекте — ничего не вынимайте.\n\nНе отправляйте стандартный кабель питания и USB-кабель (у нас есть свои), мыши, флешки, карты памяти, сумки и чехлы.',
    card: { title: 'Листок с вашими данными — обязательно', imageAlt: 'Листок с именем, телефоном и описанием неисправности', rows: [['Положите в посылку листок с именем и фамилией, номером телефона и кратким описанием неисправности.'], ['На курьерской этикетке ваши данные скрыты — без листка мы не будем знать, от кого посылка.']] },
  },
  warranty: {
    title: 'Получу ли я гарантию на ремонт?',
    intro: '**Срок гарантии:** зависит от услуги — мы указываем его в описании услуги на сайте и в документе о ремонте (например, в счёте-фактуре).\n**Что охватывает:** выполненную нами работу и установленные нами запчасти, а не всё устройство.\n**Если неисправность вернётся:** когда её причиной является наша работа или запчасть, мы устраним её бесплатно — повторным ремонтом или заменой запчасти.\n**Как сообщить:** по e-mail, по телефону или лично — укажите номер заказа или счёта-фактуры и описание неисправности.\n**Отправка:** в таком случае стоимость отправки в сервис и обратно на территории Польши мы берём на себя.\n**Чего не охватывает:** механических повреждений, залива, перенапряжения, использования вопреки инструкции, вмешательства третьих лиц и естественного износа расходных частей.',
  },
  reject: {
    title: 'Что, если я не соглашусь с оценкой и откажусь от ремонта?',
    intro: '**Мы ничего не ремонтируем без вашего согласия.**\n\nЕсли вы откажетесь, мы отправим устройство обратно, а вы заплатите **только за полную диагностику и оценку** (цена зависит от устройства — см. первый вопрос) + отправку в обе стороны по тарифу курьера.\n\nЗа этикетку, упаковку и отправку посылки мы ничего не добавляем.',
  },
  accept: {
    title: 'Если я соглашусь на ремонт, будет ли диагностика «бесплатной»?',
    intro: 'Разборка устройства, измерения и поиск неисправности требуют времени и труда — они не могут быть «бесплатными».\n\nЗаказываете ремонт? **Тогда мы не считаем диагностику отдельно**, ведь устройство уже разобрано и мы знаем, что менять, так что половина работы по ремонту уже сделана.\n\nВы платите только за сам ремонт (по прайсу) и возможные запчасти — диагностика уже входит в эту цену. К этому добавляется отправка в обе стороны по тарифу курьера.',
  },
}

const EN: QuestionsText = {
  faqTitle: 'Frequently asked questions (FAQ)',
  viewDetails: 'See details',
  priceTitle: 'How much do the diagnosis and the repair quote cost?',
  priceColumns: ['Full diagnosis and repair quote', 'Price, PLN', 'Turnaround time'],
  devices: {
    'serwis-laptopow': 'Laptop',
    'serwis-komputerow-stacjonarnych': 'Desktop computer',
    'serwis-drukarek-laserowych': 'Laser printer / copier',
    'serwis-drukarek-atramentowych': 'Inkjet printer',
    'serwis-plotterow': 'Plotter',
    'serwis-drukarek-termicznych': 'Thermal / label printer',
    'serwis-drukarek-iglowych': 'Dot matrix printer',
    'serwis-drukarek-3d': '3D printer',
    'serwis-niszczarek': 'Paper shredder',
    'naprawa-zasilaczy-ups': 'UPS (uninterruptible power supply)',
    'naprawa-projektorow': 'Projector',
    'serwis-drukarek-do-kart-plastikowych': 'Plastic card printer',
    'serwis-drukarek-dtg': 'DTG printer',
    'serwis-drukarek-dtf': 'DTF printer',
    'serwis-drukarek-sublimacyjnych': 'Sublimation printer',
    'serwis-drukarek-spozywczych': 'Edible (food) printer',
    'serwis-ekspresow-do-kawy': 'Coffee machine',
  },
  shipping: {
    title: 'How much does shipping cost?',
    noteBanner: 'Approximate prices for one-way shipping, based on the carriers\' official price lists. The exact price depends on the address and on the size and weight of the parcel.',
    cards: [
      { title: 'Parcel locker', imageAlt: 'Parcel locker and parcels for shipping', rows: [['Size A — 8 × 38 × 64 cm, up to 25 kg', '16.49 zł'], ['Size B — 19 × 38 × 64 cm, up to 25 kg', '18.49 zł'], ['Size C — 41 × 38 × 64 cm, up to 25 kg', '20.49 zł']] },
      { title: 'Courier', imageAlt: 'Courier van and parcels for shipping', rows: [['8 × 38 × 64 cm, up to 25 kg', '19.49 zł'], ['41 × 38 × 64 cm, up to 25 kg', '25.49 zł'], ['40 × 60 × 80 cm, up to 31.5 kg', '41.00 zł'], ['60 × 60 × 120 cm, up to 31.5 kg', '57.00 zł']] },
    ],
  },
  packing: {
    title: 'How do I pack the equipment properly?',
    cards: [
      { title: 'Original packaging', imageAlt: 'Laptop in its original box with the manufacturer\'s inserts', rows: [['It is best to send the equipment in its original box, together with the manufacturer\'s inserts.']] },
      { title: 'No original box?', imageAlt: 'Laptop in a box with filling', rows: [['– Switch the device off and wrap it in bubble wrap.'], ['– Choose a rigid, undamaged box that leaves at least 5 cm of free space on every side, and fill that space with packing material — nothing may move.'], ['– Seal the box with tape.']], note: 'Note:\nDon\'t wrap the box in stretch film — the courier may charge extra.\nA box that is too big can raise the shipping price — couriers also calculate the weight from the dimensions of the box.' },
    ],
  },
  duration: {
    title: 'How long will it all take?',
    noteBanner: 'Urgent? Call before shipping: 793 759 262 — if possible, we\'ll speed up the repair at no extra charge.',
    intro: '– **Delivery to the service centre:** usually 1–2 working days.\n– **Diagnosis and quote:** usually 1–3 working days from receiving the parcel.\n– **Repair:** according to the price list of the given service (the "Turnaround time" column).\n– **Sending the equipment back:** usually 1–2 working days.',
  },
  data: {
    title: 'Is my data safe?',
    noteBanner: 'For your peace of mind: before shipping, change your password to a temporary one, and restore your own when the laptop comes back to you.',
    intro: '**Your files:** we don\'t browse, copy or delete your data. If the repair could affect it (e.g. replacing a drive), we\'ll agree that with you first.\n**Confidentiality agreement:** at your request we will sign a non-disclosure agreement.\n**Password:** it is needed to check the laptop after the repair (e.g. a load test).\n**Backup:** before shipping, make a copy of your important files — just in case.',
  },
  label: {
    title: 'I don\'t know how to send the parcel or where to print the label',
    intro: '**You don\'t need to print anything or create accounts with carriers – we prepare the shipping for you.**\n\n• **InPost parcel locker** – we send you a dispatch code by text message or email. You enter it on the locker screen (or scan the QR code in the InPost app), the compartment opens and you put the parcel in. No label needed.\n\n• **Courier** – we book a pickup from your address. If the carrier requires a label, the courier brings it with them, or it is enough to write the number you get from us clearly on the box.\n\nAll you do is pack the device – and if you don\'t know how, we\'ll guide you step by step.',
  },
  parcel: {
    title: 'What should I put in the parcel?',
    noteBanner: 'Not sure what to include? Ask us before shipping.',
    intro: '**What to include with the device:**\n– the laptop charger or external power supply,\n– unusual cables,\n– all paper trays and cassettes — some printers don\'t work without them,\n– special paper: fan-fold paper for dot matrix printers, labels or rolls for thermal printers (packed separately).\n\nLeave ink and toner in the device. Send a UPS complete — don\'t remove anything.\n\nDon\'t send a standard power cable or USB cable (we have our own), mice, USB flash drives, memory cards, bags or cases.',
    card: { title: 'A note with your details — required', imageAlt: 'A note with a name, phone number and description of the fault', rows: [['Put a note in the parcel with your first and last name, phone number and a short description of the fault.'], ['Your details are hidden on the courier label — without a note we won\'t know who the parcel is from.']] },
  },
  warranty: {
    title: 'Will I get a warranty on the repair?',
    intro: '**Warranty period:** depends on the service — we state it in the service description on the website and in the repair document (e.g. on the invoice).\n**What it covers:** the work we carried out and the parts we fitted, not the whole device.\n**If the fault comes back:** when its cause is our work or a part, we fix it free of charge — by repairing it again or replacing the part.\n**How to report it:** by email, phone or in person — give the order or invoice number and a description of the fault.\n**Shipping:** in that case we cover the cost of shipping to the service centre and back within Poland.\n**What it does not cover:** mechanical damage, liquid damage, power surges, use contrary to the instructions, third-party interference and normal wear of consumable parts.',
  },
  reject: {
    title: 'What if I don\'t accept the quote and decide against the repair?',
    intro: '**We don\'t repair anything without your consent.**\n\nIf you decline, we\'ll send the device back and you pay **only for the full diagnosis and quote** (the price depends on the device — see the first question) + shipping both ways according to the courier\'s price list.\n\nWe add nothing for the label, packing and sending the parcel.',
  },
  accept: {
    title: 'If I accept the repair, will the diagnosis be "free"?',
    intro: 'Taking the device apart, taking measurements and finding the fault take time and work — they can\'t be "free".\n\nOrdering the repair? **Then we don\'t charge for the diagnosis separately**, because the device is already taken apart and we know what to replace, so half of the repair work is already done.\n\nYou pay only for the repair itself (according to the price list) and any parts — the diagnosis is already included in that price. Shipping both ways according to the courier\'s price list is added to this.',
  },
}

export const QUESTIONS_TEXT: Record<Locale, QuestionsText> = { pl: PL, uk: UK, ru: RU, en: EN }
