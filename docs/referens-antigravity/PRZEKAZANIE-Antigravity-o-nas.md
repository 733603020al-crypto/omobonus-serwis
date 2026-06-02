# ПАКЕТ ПЕРЕДАЧИ v2 → Claude (Antigravity)
## Задача: пересобрать страницу "O nas" (PL + UK) по дизайну

---

## 1. Цель
Привести живые страницы `/o-nas` (PL) и `/uk/o-nas` (UK) к виду дизайна-эталона **`O nas v2.html`** (лежит в Designer-проекте).
Страница = **5 контентных секций + существующий футер**. Данные — только реальные из проекта, ничего не выдумывать.

**Визуальный референс (не для вставки, только как образец вида/стилей):**
- `O nas v2.html` — разметка и порядок секций;
- `assets/omobonus.css` — классы и стили карточек/типографики (`.hero`, `.stat`, `.adv-grid`, `.h-section`, `.eyebrow`, `.lead-italic`, `.team-grid`, `.member`, `.avatar`, `.quote-block`).
Реализовать средствами проекта (React + Tailwind + токены проекта), НЕ копировать HTML напрямую.

## 2. Секции страницы (порядок строго такой)
| # | Секция | Источник реализации |
|---|--------|---------------------|
| 1 | **Hero** + 4 плитки-статистики | НОВЫЙ компонент |
| 2 | **Dlaczego my** — 6 карточек-преимуществ | НОВЫЙ компонент |
| 3 | **Historia nazwy** — Святой + «O nas:» + цитата | адаптировать существующий `About` ИЛИ новый компонент |
| 4 | **Zespół** — 3 человека | НОВЫЙ компонент |
| 5 | **Opinie Google** — отзывы | ПЕРЕИСПОЛЬЗОВАТЬ существующий `<GoogleReviews/>` |
| — | **Stopka** | ПЕРЕИСПОЛЬЗОВАТЬ существующий `<Footer/>` |
| — | **Header** | ПЕРЕИСПОЛЬЗОВАТЬ существующий `<Header/>` (не менять) |

Удалено по решению владельца: секция «Zniżka −10%» и «Formularz zgłoszeniowy» — НЕ добавлять.

## 3. Подтверждённые данные (владелец подтвердил — реальные)
- Плитки Hero: **10+ lat doświadczenia**, **do 2h przyjazd we Wrocławiu**, **15 min wstępna diagnoza**, **do 48h większość napraw**.
- Команда (реальные люди): **Maksym** — Diagnostyka i naprawa sprzętu; **Paweł** — Serwis drukarek i ploterów; **Andrzej** — Kontakt z klientem i wyceny.
- Отзывы: НЕ хардкодить — выводить существующим компонентом `<GoogleReviews/>` (тянет реальные Google-отзывы, уже используется на других страницах).

---

## 4. КОНТЕНТ — POLSKI (точные тексты из дизайна)

### Секция 1 — Hero
- H1: `Nie bogacimy się na Twoim problemie`
- Подзаголовок: `Od ponad 10 lat naprawiamy komputery, laptopy i drukarki we Wrocławiu`
- Плитки (число + подпись):
  - `10+` / `lat doświadczenia`
  - `do 2h` / `przyjazd we Wrocławiu`
  - `15 min` / `wstępna diagnoza`
  - `do 48h` / `większość napraw`

### Секция 2 — Dlaczego my
- Eyebrow: `Dlaczego Omobonus`
- H2: `Uczciwość i szacunek do klienta`
- Lead: `To nie hasło reklamowe, tylko sposób, w jaki naprawdę pracujemy każdego dnia.`
- 6 карточек (заголовок / текст):
  1. `Uczciwe ceny` / `Podajemy prawdziwe ceny — nie „naprawa od 50 zł" ani „cena do uzgodnienia". Pełny koszt usługi znasz od razu.`
  2. `Zdjęcia uszkodzeń` / `Podczas diagnozy otrzymujesz nie suchą tabelkę z wyceną, ale też zdjęcia rzeczywistych uszkodzeń sprzętu.`
  3. `Uczciwa ocena` / `Jeśli naprawa się nie opłaca — powiemy to otwarcie. Nie wymieniamy części bez potrzeby, a wymienione zawsze oddajemy.`
  4. `Drukarka zastępcza` / `Na czas naprawy zapewniamy usługę „Drukarka zastępcza" — Twoja praca w domu i biurze nie staje w miejscu.`
  5. `Diagnoza w 15 minut` / `Wstępną diagnozę usterki wykonujemy zwykle w kwadrans. Szybko wiesz, co się dzieje i ile to potrwa.`
  6. `−10% zniżka` / `Honorujemy Kartę Dużej Rodziny i Kartę Seniora, oferując 10% zniżki na naprawę.` (иконки: `kdr.jpg` + `senior.png`)

### Секция 3 — Historia nazwy
- Eyebrow: `Skąd nazwa`
- H2 (золотой, курсив): `Święty Omobonus XII wieku`
- Lead: `(łac. „Homobonus" — Dobry człowiek). Patron biznesmenów i przemysłowców. Był uczciwym rzemieślnikiem, który część swoich dochodów przekazywał potrzebującym.`
- H2: `O nas:`
- Текст: `Jesteśmy zespołem, który wierzy, że praca może być również pomocą i służbą innym ludziom. Zysk jest potrzebny, ale nie jest naszym idolem ani bożkiem. Nie chcemy się bogacić za wszelką cenę.`
- Цитата: `„Brak oszustwa i szacunek do klienta"` / `to nasze podstawowe zasady pracy.`
- Картинка: портрет Святого = `manifest.omobonus_hero` (или `/images/omobonus-hero.webp`).

### Секция 4 — Zespół
- Eyebrow: `Zespół`
- H2: `Poznaj ludzi, nie infolinię`
- 3 карточки (инициал-аватар / имя / роль):
  - `M` / `Maksym` / `Diagnostyka i naprawa sprzętu`
  - `P` / `Paweł` / `Serwis drukarek i ploterów`
  - `A` / `Andrzej` / `Kontakt z klientem i wyceny`
- Подпись: `„Nas jest trzech. Znasz nas z imienia. Odbieramy telefon osobiście."`

---

## 5. КОНТЕНТ — УКРАЇНСЬКА (перевод, добавить в `src/lib/i18n/uk.ts`)
> Перевод живой, не машинный. Имена команды в UK — на украинский лад (решение владельца): **Максим, Павло, Андрій**.

### Hero (UK)
- H1: `Ми не наживаємось на вашій проблемі`
- Підзаголовок: `Понад 10 років ремонтуємо комп'ютери, ноутбуки та принтери у Вроцлаві`
- Плитки: `10+` / `років досвіду` · `до 2 год` / `приїзд у Вроцлаві` · `15 хв` / `попередня діагностика` · `до 48 год` / `більшість ремонтів`

### Dlaczego my (UK) → "Чому ми"
- Eyebrow: `Чому Omobonus`
- H2: `Чесність і повага до клієнта`
- Lead: `Це не рекламне гасло, а спосіб, у який ми справді працюємо щодня.`
- Картки:
  1. `Чесні ціни` / `Ми вказуємо реальні ціни — без «ремонт від 50 zł» чи «ціна за домовленістю». Повну вартість послуги ви знаєте одразу.`
  2. `Фото пошкоджень` / `Під час діагностики ви отримуєте не лише кошторис, а й фотографії реальних пошкоджень техніки.`
  3. `Чесна оцінка` / `Якщо ремонт невигідний — скажемо про це відверто. Не замінюємо деталі без потреби, а замінені завжди повертаємо.`
  4. `Принтер на заміну` / `На час ремонту надаємо послугу «Принтер на заміну» — ваша робота вдома й в офісі не зупиняється.`
  5. `Діагностика за 15 хвилин` / `Попередню діагностику несправності зазвичай робимо за чверть години. Ви швидко дізнаєтесь, що сталося і скільки це триватиме.`
  6. `−10% знижка` / `Приймаємо Карту великої родини та Карту сеньйора, надаючи 10% знижки на ремонт.`

### Historia nazwy (UK) → "Звідки назва"
- Eyebrow: `Звідки назва`
- H2: `Святий Омобонус XII століття`
- Lead: `(лат. «Homobonus» — Добра людина). Покровитель підприємців і промисловців. Був чесним ремісником, який частину своїх доходів віддавав нужденним.`
- H2: `Про нас:`
- Текст: `Ми — команда, яка вірить, що праця може бути також допомогою і служінням іншим людям. Прибуток потрібен, але він не є нашим ідолом. Ми не хочемо збагачуватися за будь-яку ціну.`
- Цитата: `«Без обману та з повагою до клієнта»` / `— це наші основні принципи роботи.`
> Прим.: ключи частично уже есть в `uk.about` — переиспользовать/дополнить, не дублировать.

### Zespół (UK) → "Команда"
- Eyebrow: `Команда`
- H2: `Знайомтесь — люди, а не call-центр`
- Імена (за рішенням власника — на український лад): `Максим` · `Павло` · `Андрій`
- Аватар-ініціали: `М` · `П` · `А`
- Ролі: `Діагностика та ремонт техніки` · `Сервіс принтерів і плотерів` · `Зв'язок з клієнтом і кошториси`
- Підпис: `«Нас троє. Ви знаєте нас на ім'я. Ми особисто відповідаємо на дзвінки.»`

---

## 6. Файлы (вероятно)
**Создать (новые секции):**
- `src/components/sections/onas-hero.tsx`
- `src/components/sections/advantages.tsx`
- `src/components/sections/team.tsx`
(каждый принимает проп `t` для PL/UK, по образцу существующего `About`)

**Изменить:**
- `src/app/(pl)/o-nas/page.tsx` — собрать: `Header → OnasHero → Advantages → NameHistory(About) → Team → GoogleReviews → Footer`.
- `src/app/uk/o-nas/page.tsx` — то же с `t={uk...}`.
- `src/lib/i18n/uk.ts` — добавить ключи `onasHero`, `advantages`, `team` (+ при необходимости дополнить `about`).

**Переиспользовать как есть (НЕ менять):** `Header`, `Footer`, `GoogleReviews`, `manifest.ts`, `globals.css`.

**Изображения:** уже в `public/images/` — `omobonus-hero.webp` (Святой), `KDR_*` ; карты `kdr.jpg`/`senior.png` при необходимости добавить в `public/images/`.

## 7. Стиль / визуал
- Фон: **один сквозной общий фон** на всю контентную часть (`Background_1.webp` + затемнение `black/60`), секции прозрачные; Header сохраняет свой фон. (Это заменяет прежнюю задачу про "шов".)
- Цвета/шрифты — токены проекта: золото `#bfa76a` / `#e6cc82`, зелёный `#1c6e43`, шрифты Cormorant Garamond (заголовки) + Inter (текст). Новых цветов/шрифтов не вводить.
- Карточки (stat / adv / member) — стиль из `assets/omobonus.css` как образец: тёмная карточка, золотой акцент, мягкая тень, скругл'ение.

## 8. Ограничения
- Ветка: **только `test`**.
- Менять только: страницы `/o-nas` (PL+UK), новые секц-компоненты, `uk.ts`. 
- **НЕ трогать:** главную, kontakt, uslugi, regulamin, polityka, Header, Footer, GoogleReviews (кроме переиспользования).
- ⚠️ Существующий `About` используется на ГЛАВНОЙ. Если адаптируешь его под секцию 3 — делай обратносовместимо (проп с дефолтом), чтобы главная не изменилась. Безопаснее — отдельный компонент для o-nas.
- SEO/`metadata` в обоих `page.tsx` — сохранить как есть.
- PL и UK — идентичная вёрстка, отличается только текст (Правило 9 владельца).
- Без выдуманных данных. Отзывы — только через `<GoogleReviews/>`.

## 9. Проверка после применения
- [ ] `/o-nas` и `/uk/o-nas`: 5 секций в порядке Hero→Dlaczego my→Historia→Zespół→Opinie + Footer.
- [ ] Нет секций «Zniżka» и «Formularz».
- [ ] Один сквозной фон, без "шва"; Header со своим фоном.
- [ ] Отзывы рендерятся реальным компонентом.
- [ ] Главная и др. страницы не изменились.
- [ ] UK = точный перевод PL, та же вёрстка.
- [ ] Сборка/lint/tsc без ошибок.
