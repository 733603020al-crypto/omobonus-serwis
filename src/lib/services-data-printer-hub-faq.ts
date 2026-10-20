import type { PricingSection } from './services-data-types'

// FAQ card on /uslugi/naprawa-drukarek (the printer hub). Answers 3, 6, 7 and 8
// keep the owner's search-query wording word for word (formerly the small gold
// lines under the cards) — do not "fix" their grammar.

export const printerHubFaqPl = (): PricingSection => ({
  id: 'faq',
  title: 'Najczęściej zadawane pytania (FAQ)',
  items: [],
  subcategories: [
    { id: 'faq-1', title: 'Jak wygląda proces naprawy drukarki?', items: [], answer: 'Najpierw przeprowadzamy wstępną diagnozę i określamy możliwą przyczynę usterki. Następnie wykonujemy pełną diagnozę, podajemy dokładny koszt naprawy oraz termin realizacji. Naprawę rozpoczynamy dopiero po akceptacji Klienta.' },
    { id: 'faq-2', title: 'Ile kosztuje diagnoza drukarki?', items: [], answer: 'Wstępna diagnoza online oraz przy dostarczeniu urządzenia do serwisu jest bezpłatna. Pełna diagnoza również jest bezpłatna, jeśli realizujemy naprawę. W przypadku rezygnacji z naprawy obowiązuje cena wskazana w aktualnym cenniku dla odpowiedniej kategorii urządzenia.' },
    { id: 'faq-3', title: 'Jak szybko poznam koszt naprawy?', items: [], answer: 'Twoja drukarka lub ksero - podamy koszt naprawy w 15 min, oraz wykonamy serwis drukarki (kserokopiarki).' },
    { id: 'faq-4', title: 'Ile trwa naprawa drukarki?', items: [], answer: 'Większość standardowych napraw drukarek biurowych wykonujemy w ciągu 1–3 dni roboczych. Naprawy drukarek specjalistycznych, bardziej złożone usterki lub oczekiwanie na części mogą wydłużyć ten czas. Dokładny termin podajemy po diagnozie.' },
    { id: 'faq-5', title: 'Jakie marki drukarek serwisujecie?', items: [], answer: 'Serwisujemy drukarki wielu producentów, m.in. HP, Epson, Brother, Canon, Samsung, Xerox, Kyocera, OKI, Lexmark, Dell, Konica Minolta, Ricoh, Sharp, Toshiba.' },
    { id: 'faq-6', title: 'Czy naprawiacie kserokopiarki?', items: [], answer: 'Tak. Też kopiarek (drukarek z kopiarką) Lexmark, Oki, Dell, Konica Minolta, Ricoh, Sharp, Toshiba.' },
    { id: 'faq-7', title: 'Czy czyścicie i regenerujecie głowice?', items: [], answer: 'Tak. Świadczymy również usługi czyszczenie, konserwacja, regeneracja, naprawa głowicy.' },
    { id: 'faq-8', title: 'Na jakim terenie działacie?', items: [], answer: 'Zapewniamy serwis pogwarancyjny we Wrocławiu (Krzyki, Fabryczna, Grabiszyńska, Psie Pole) i okolice.' },
  ],
})

export const printerHubFaqUk = (): PricingSection => ({
  id: 'faq',
  title: 'Часті питання (FAQ)',
  items: [],
  subcategories: [
    { id: 'faq-1', title: 'Як відбувається процес ремонту принтера?', items: [], answer: 'Спочатку проводимо попередню діагностику та визначаємо можливу причину несправності. Потім виконуємо повну діагностику, називаємо точну вартість ремонту та термін виконання. Ремонт розпочинаємо лише після погодження Клієнта.' },
    { id: 'faq-2', title: 'Скільки коштує діагностика принтера?', items: [], answer: 'Попередня діагностика онлайн, а також під час доставки пристрою до сервісу — безкоштовна. Повна діагностика також безкоштовна, якщо ми виконуємо ремонт. У разі відмови від ремонту діє ціна, вказана в актуальному прайсі для відповідної категорії пристрою.' },
    { id: 'faq-3', title: 'Як швидко я дізнаюся вартість ремонту?', items: [], answer: 'Ваш принтер або ксерокс — повідомимо вартість ремонту за 15 хв і виконаємо сервіс принтера (ксерокса).' },
    { id: 'faq-4', title: 'Скільки триває ремонт принтера?', items: [], answer: 'Більшість стандартних ремонтів офісних принтерів виконуємо протягом 1–3 робочих днів. Ремонт спеціалізованих принтерів, складніші несправності або очікування запчастин можуть подовжити цей час. Точний термін повідомляємо після діагностики.' },
    { id: 'faq-5', title: 'Які марки принтерів ви обслуговуєте?', items: [], answer: 'Обслуговуємо принтери багатьох виробників, зокрема HP, Epson, Brother, Canon, Samsung, Xerox, Kyocera, OKI, Lexmark, Dell, Konica Minolta, Ricoh, Sharp, Toshiba.' },
    { id: 'faq-6', title: 'Чи ремонтуєте ви копіювальні апарати?', items: [], answer: 'Так. Також копіювальних апаратів Lexmark, Oki, Dell, Konica Minolta, Ricoh, Sharp, Toshiba.' },
    { id: 'faq-7', title: 'Чи чистите й відновлюєте ви друкуючі головки?', items: [], answer: 'Так. Також надаємо послуги очищення, технічного обслуговування, регенерації, ремонту головки.' },
    { id: 'faq-8', title: 'На якій території ви працюєте?', items: [], answer: 'Забезпечуємо післягарантійний сервіс у Вроцлаві (Кшики, Фабрична, Грабишинська, Псе-Поле) і околицях.' },
  ],
})

export const printerHubFaqRu = (): PricingSection => ({
  id: 'faq',
  title: 'Часто задаваемые вопросы (FAQ)',
  items: [],
  subcategories: [
    { id: 'faq-1', title: 'Как проходит процесс ремонта принтера?', items: [], answer: 'Сначала проводим предварительную диагностику и определяем возможную причину неисправности. Затем выполняем полную диагностику, называем точную стоимость ремонта и срок выполнения. Ремонт начинаем только после согласия Клиента.' },
    { id: 'faq-2', title: 'Сколько стоит диагностика принтера?', items: [], answer: 'Предварительная диагностика онлайн, а также при доставке устройства в сервис — бесплатная. Полная диагностика также бесплатна, если мы выполняем ремонт. В случае отказа от ремонта действует цена, указанная в актуальном прайсе для соответствующей категории устройства.' },
    { id: 'faq-3', title: 'Как быстро я узнаю стоимость ремонта?', items: [], answer: 'Ваш принтер или копир — сообщим стоимость ремонта за 15 мин и выполним сервис принтера (копира).' },
    { id: 'faq-4', title: 'Сколько длится ремонт принтера?', items: [], answer: 'Большинство стандартных ремонтов офисных принтеров выполняем в течение 1–3 рабочих дней. Ремонт специализированных принтеров, более сложные неисправности или ожидание запчастей могут увеличить этот срок. Точный срок сообщаем после диагностики.' },
    { id: 'faq-5', title: 'Какие марки принтеров вы обслуживаете?', items: [], answer: 'Обслуживаем принтеры многих производителей, в том числе HP, Epson, Brother, Canon, Samsung, Xerox, Kyocera, OKI, Lexmark, Dell, Konica Minolta, Ricoh, Sharp, Toshiba.' },
    { id: 'faq-6', title: 'Ремонтируете ли вы копиры?', items: [], answer: 'Да. А также копиров (МФУ) Lexmark, Oki, Dell, Konica Minolta, Ricoh, Sharp, Toshiba.' },
    { id: 'faq-7', title: 'Чистите и восстанавливаете ли вы печатающие головки?', items: [], answer: 'Да. Также оказываем услуги по чистке, обслуживанию, регенерации, ремонту головки.' },
    { id: 'faq-8', title: 'На какой территории вы работаете?', items: [], answer: 'Оказываем послегарантийный сервис во Вроцлаве (Кшики, Фабрична, Грабишинска, Псе-Поле) и окрестностях.' },
  ],
})
