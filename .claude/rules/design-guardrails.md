---
paths:
  - "src/components/**"
  - "src/app/**/*.tsx"
  - "src/app/globals.css"
  - "public/images/**"
---

# Дизайн: что не ломать

## Что это
Дизайн сайта уже готов. Задача — аккуратно дополнять его, а не переделывать. Главный источник правды — файлы проекта, а не скриншоты.

## Без вашего разрешения не меняем
- общий стиль, цвета и шрифты;
- шапку, подвал и меню;
- общие стили и настройки проекта;
- общую раскладку страницы и не делаем полную переделку страницы.

## Какой вид сохраняем
Тёмный фон, состаренный пергамент, золотые акценты, шрифты с засечками, спокойный дорогой тон. Не «современный минимализм», не яркий и не шаблонный вид.

## Как работаем
- Шрифты, цвета, размеры, отступы, пропорции, анимации и эффекты сами не придумываем и не меняем: только готовые утверждённые стили и компоненты. Если дан точный CSS — применяем именно его. Если решение не согласовано и по коду его не определить — останавливаемся и спрашиваем. Разрешили подобрать один параметр — меняем только его.
- Меняем только то, что названо в задании; отклонения от задания сначала согласуем.
- Сначала берём готовые элементы сайта; новый вид кнопки или карточки — только после вопроса вам.
- Если вы просите «покажи, как будет выглядеть» или «что предлагаешь» — сначала показываю вариант и жду вашего «да, внедряй».
- Если правка затрагивает общий элемент, который есть на других страницах, сначала называю эти страницы.
- Картинка в верхней части страниц услуг: рамка всегда одного размера (400 px на компьютере, 300 px на телефоне), длина текста её не меняет; картинка вписывается без растягивания; текст всегда поверх картинки.
- Страницы с раскрывающимся прайсом переносим по образцу «Serwis laptopów»: свои тексты и цены страницы не трогаем; у каждой подкатегории есть место под картинку — готовая из проекта, иначе нейтральная заглушка, и я прямо говорю, что нужна картинка.

## Сводная таблица стилей сайта (аудит)
Чтобы находить расхождения (на одной странице текст 500, на другой такой же на том же месте 600; другой размер или шрифт), по запросу «сделай таблицу стилей» Claude строит таблицу: каждый тип элемента (заголовок, подпись, цена, кнопка, линия, подсказка) — шрифт, размер, толщина, цвет, отступы — для каждой страницы и языка, на компьютере и телефоне. Одинаковые по смыслу элементы сравниваются между собой; всё, что отличается, попадает в список «расхождения» с пометкой, где и чем отличается. Таблица показывается вам как отчёт вне проекта; исправляется только то, что вы одобрили. Образец готовой таблицы — прайс (`price-card-standard.md`).

## Для Claude (техническое)
Всё ниже — для Claude: исходный текст правил, как он был. Читать не обязательно.

## Design guardrails (loads for any component/page/CSS file, with or without the ui-design agent)

Omobonus already has a finished design and working structure. The job is to carefully extend the existing site, not redesign it. Real project files are the source of truth, not screenshots — if a screenshot and the code disagree, ask which is correct rather than guessing.

Even for a small, direct edit (no subagent needed), never change without explicit permission:
* the overall site style, colors, or fonts;
* `header`, `footer`, or the nav menu;
* global styles or project config files;
* the general layout/structure of a page, or do a full page redesign.

Preserve the established aesthetic on every touch: dark background, aged/parchment texture, gold accents, serif fonts, calm premium tone — not modern-from-scratch, minimalist, bright, corporate, or template-like, unless the user explicitly asked for that.

Reuse existing components before creating new ones. Don't invent a new button/card/section variant if a similar one already exists in the project — ask first if truly none fits.

If the user asks "how would this look" / "what do you suggest" / "show me options" rather than giving a direct instruction, propose a visual option first (short text mockup or layout description) and wait for explicit confirmation ("да, внедряй" / "применяй" / etc.) before touching code.

If a change would affect a shared component used by other pages, say which pages before changing it.

After replacing a static asset under the same filename (icon, image), always hard-reload / bypass cache and confirm the browser is actually rendering the new file (byte size, `Last-Modified`, or a visible detail) before concluding it's stale and reprocessing the asset again.

Service-page hero images/animations (the hero slot in `src/components/service-page-template.tsx`, files under `public/images/`):
* The left image-zone has a fixed height, independent of the H1/H2 text in the right column: **400px desktop, 300px mobile**. Never let text length change the zone's size.
* Never change the 50/50 width split or the zone's width.
* Before inserting, reduce file weight as much as possible without visible quality loss.
* Crop PNG/WebP to the real alpha bounding box — remove excess transparent padding — while preserving transparency and aspect ratio.
* Animated WebP: preserve every frame, duration, loop count, and disposal/blend mode.
* Downscale resolution to match the actual display size, not the original export size.
* Object fit: `object-contain` inside the fixed zone, capped at 100% width or 100% height (whichever limit is hit first), aspect ratio preserved, centered, never stretched/distorted.

Goal: identical hero-zone box on every service page, independent of content; only the object's own aspect ratio determines how much of that box it fills.

Per-page hero scale overrides (`HERO_SCALE` map in `service-page-template.tsx`) intentionally let a specific slug's image overflow past the fixed zone box. When using this:
* Text always has priority over the image — on any intersection, the image goes under the text, never over it.
* The text wrapper (`.text-center` column with H1/H2) must keep `position: relative` with a `z-index` higher than the image wrapper.
* `.service-hero-image-wrap` and all its effects (shine sweep, glow, hover scale) must stay below that text z-index — keep the wrap's own `z-index` lower, never override it per-page.
* Flexbox note: a scaled-up wrap also needs `shrink-0`, or the flex container silently clamps its width back to 100% while height still grows, breaking the aspect ratio.

### Repair-accordion design transfer (Naprawy-style pages)

Reference/source of truth for this design: `/uslugi/serwis-laptopow`. When bringing this design to another repair-accordion page:

* Transfer structure, fonts, sizes, spacing, and the new top-level section images (Diagnoza/Dojazd/Czyszczenie/Naprawy/FAQ) — same as `serwis-laptopow`.
* Never change the target page's own texts, prices, or content.
* Always read section/subcategory titles from that page's own data — never hardcode a title by `section.id` in the component.
* Every Naprawy subcategory always gets a fixed image slot (same size/position/behavior, open+closed) — never conditionally omit it.
* If a suitable existing image for that specific subcategory already exists in the project, use it via `subcategory.icon` (data-driven — never by title-matching or a hardcoded per-title condition in the component).
* If no suitable image exists yet, use one neutral temporary placeholder icon, keeping the correct slot size/position.
* Never substitute an image whose subject/theme doesn't fit the subcategory (e.g. a different device type) just to avoid a placeholder.
* Visual check: one final check after all changes — desktop 1440px, plus mobile 390px if the task concerns mobile; check open/closed section states only when the task needs it (see CLAUDE.md «Визуальная проверка»).

See also [[feedback_naprawy_icon_slot_rule]] (session memory with the same rule and its rationale).

## Алгоритм сводной таблицы стилей (аудит)
1. Охват: страницы по запросу (по умолчанию — страницы услуг из `REPAIR_ACCORDION_LAYOUT_SLUGS` + главная, о нас, контакт), языки PL/UK/RU/EN, окна 1440 и 390 (при необходимости 768).
2. Замер: Playwright, `getComputedStyle` + `getBoundingClientRect` (не скриншоты на глаз). За основу — `tests/accordion-baseline/accordion-baseline.mjs` (запуск на копии/порту, сайт не менять). Для каждого видимого текстового элемента: font-family (первое имя), font-size, line-height, font-weight, color, letter-spacing, text-transform; для кнопок/карточек — padding, border (толщина/цвет), border-radius, box-shadow, размеры; для линий — толщина и цвет.
3. Роль элемента определять по общему компоненту/классу/data-атрибуту, а не по тексту; роли: заголовок раздела, название услуги, подпись, цена, приписка, срок, кнопка, ссылка, вопрос/ответ FAQ, подсказка, линия.
4. Сгруппировать по роли и окну; в группе отметить «основное» значение (самое частое) и все отклонения: страница/язык/окно/селектор/значение/сколько элементов.
5. Результат — таблица: роль | окно | значение по эталону | где отличается. Отдельно — «одинаковый текст в одинаковом месте, но разные параметры» (первый приоритет), затем остальные отличия.
6. Сравнить с утверждёнными стандартами (`price-card-standard.md`, `docs/standards/kategorie-urzadzen-standard.md`, `faq-answer-standard.md`); расхождения со стандартом помечать отдельно. Сознательные исключения (см. «Оставлено сознательно» в `price-card-standard.md`; Inter на телефоне; эффект наведения) — не ошибки.
7. Отчёт: резюме в чате, полная таблица — HTML вне проекта (`long-answers.md`). В проект ничего не писать; сайт не менять без одобрения вами списка исправлений.
