# Анализ: мультиязычность сайта и план добавления UK/RU для `druk-3d-na-zamowienie`

Дата анализа: 2026-08-05
Статус: **только анализ, изменений в коде не вносилось**
Референс: PL-версия `http://localhost:3001/uslugi/druk-3d-na-zamowienie`

---

## 1–2. Как устроена мультиязычность и что отвечает за структуру

Для страниц услуг архитектура уже ровно такая, какая нужна: **один общий шаблон + отдельные данные на язык**. Это не гипотеза — так уже реализовано для всех 12 остальных услуг сайта.

**Общий "скелет" страницы (единый для PL/UK/RU):**
- `src/components/service-page-template.tsx` — вся структура страницы: hero, блоки, кнопки, расположение, анимации.
- `src/components/service-accordion.tsx` — цены, аккордеон, FAQ.
- `src/app/styles/service-hero.css`, `accordion.css` — стили, привязаны к классу `page-{slug}` на `<main>`.
- `src/lib/services-meta-shared.ts` — картинки/иконки, список брендов, related-услуги, флаг `noindexSlugs`.

**Route-файлы** уже тонкие и универсальные (общий `[slug]`, правок под конкретную услугу не требуется):
- `src/app/(pl)/uslugi/[slug]/page.tsx`
- `src/app/uk/uslugi/[slug]/page.tsx`
- `src/app/ru/uslugi/[slug]/page.tsx`

Каждый route-файл берёт услугу из своего массива данных по `slug`, собирает `generateMetadata` (title/description/canonical/hreflang) и передаёт всё в один и тот же `<ServicePageTemplate locale="pl|uk|ru" ... />`.

---

## 3. Где хранятся переводы

| Данные | PL | UK | RU |
|---|---|---|---|
| Услуга (title/subtitle/description/цены) | `services-data.ts` | `services-data-uk.ts` | `services-data-ru.ts` |
| H1/H2, SEO-блоки, alt, SEO title/desc | `services-meta-pl.tsx` | `services-meta-uk.tsx` | `services-meta-ru.tsx` |
| Бейджи в hero | `service-hero-labels.ts` | `service-hero-labels-uk.ts` | `service-hero-labels-ru.ts` |
| Футер и общие фразы | — | `i18n/uk.ts` | `i18n/ru.ts` |

Все эти файлы — словари вида `Record<slug, ...>`, ключ — `slug`, значение — переводимый контент. Структуру страницы они не описывают вообще.

---

## 4. Текущее состояние `druk-3d-na-zamowienie`

- В PL (`services-data.ts`) услуга **есть**, слаг присутствует во всех shared-словарях (`services-meta-shared.ts`, `service-page-template.tsx`, `service-accordion.tsx`).
- В `services-data-uk.ts` и `services-data-ru.ts` слага **нет** — это единственная услуга из 13, отсутствующая в UK/RU (в UK/RU сейчас по 12 услуг, в PL — 13).
- В `services-meta-uk.tsx` / `services-meta-ru.tsx` записей для неё тоже нет.
- В меню (`HeaderInteractive.tsx`) пункт "Druk 3D na zamówienie" имеет `locales: ['pl']` — в UK/RU меню сейчас **скрыт**, а `label.uk` / `label.ru` — просто копия польского текста (не переведено).
- В `services-meta-shared.ts` слаг числится в `noindexSlugs` → страница сейчас **noindex** и **не в sitemap**, а PL-версия не отдаёт hreflang на uk/ru.
- В `services-data.ts` есть явный комментарий разработчика: title/subtitle/description — "временная копия serwis-drukarek-3d, контент будет переписан позже". При этом `pricingSections` (цены, материалы PLA/PETG/ABS/TPU) — уже реальный, самостоятельный контент, не копия.
- В шаблоне и аккордеоне есть ~15 точек вида `slug === 'druk-3d-na-zamowienie'` — кастомные мелочи вёрстки именно этой страницы (другой тег для подзаголовка, особый отступ, forceMount FAQ, свой формат цены). Это не отдельная копия страницы — это исключения внутри общих компонентов, завязанные на `slug`, а не на `locale`.

---

## 5–6. Что общее, а что — только на языке

**Общий фундамент** (правка применяется к PL/UK/RU одновременно):
структура (`service-page-template.tsx`), аккордеон/FAQ-механика (`service-accordion.tsx`), стили/анимации, картинки и иконки, список брендов, related-услуги, логика кнопок и форм, кастомные правила именно для этого слага внутри шаблона.

**Отдельно на каждый язык:**
title/subtitle/description услуги, тексты пунктов цен (`item.service`, `priceFormula`, `example` внутри `pricingSections` — там есть польский текст, его нужно переводить, а не только цифры), H1/H2, SEO-блоки, alt картинки, SEO title/description, текст пункта меню.

---

## 7. Какие файлы создать/изменить

Ничего в структуре создавать не нужно (route-файлы `[slug]` уже универсальны). Нужно добавить по одной записи с ключом `'druk-3d-na-zamowienie'` в уже существующие языковые словари:

1. `src/lib/services-data-uk.ts` — новый объект услуги (по образцу соседних), `pricingSections` — перевод, не копирование PL-цифр вслепую.
2. `src/lib/services-data-ru.ts` — то же для RU.
3. `src/lib/services-meta-uk.tsx` — добавить ключ в `headings`, `seoBlocks`, `imageAlt`, `seoMetadata`.
4. `src/lib/services-meta-ru.tsx` — то же для RU.
5. `src/components/HeaderInteractive.tsx` — перевести `label.uk` / `label.ru` пункта меню и убрать/расширить `locales: ['pl']`.
6. `src/lib/services-meta-shared.ts` — убрать `'druk-3d-na-zamowienie'` из `noindexSlugs`, когда контент готов публиковаться на всех языках.

Опционально (не обязательно, есть fallback `|| []`): `service-hero-labels-uk.ts` / `service-hero-labels-ru.ts`.

---

## 8. Как работает автосинхронизация структуры

PL/UK/RU route-файлы рендерят один и тот же `<ServicePageTemplate>` / `<ServiceAccordion>`, различаются только пропсами-данными. Если в будущем поменять структуру внутри `service-page-template.tsx` (добавить/убрать блок, поменять порядок, заменить компонент) — это одна правка в одном файле, которая применится сразу ко всем трём языкам, потому что это буквально один и тот же JSX для всех локалей. Строить это не нужно — так уже работает для всех остальных 12 услуг и заработает для этой сразу после добавления данных.

---

## 9. URL трёх версий

- PL: `/uslugi/druk-3d-na-zamowienie`
- UK: `/uk/uslugi/druk-3d-na-zamowienie`
- RU: `/ru/uslugi/druk-3d-na-zamowienie`

Формируются автоматически из `nav.prefix + basePath + slug`, вручную менять нигде не нужно.

---

## 10. Пункт меню на PL/UK/RU

Технически уже готов (пункт с иконкой существует), не хватает:
- перевода `label.uk` / `label.ru`;
- снятия ограничения `locales: ['pl']`.

Ссылка уже правильно собирается с префиксом локали (`${nav.prefix}${item.href}`).

---

## 11. SEO title/description/canonical/hreflang

Уже запрограммировано в трёх `generateMetadata`: title/description берутся из `seoMetadataUk[slug]` / `seoMetadataRu[slug]`, canonical и hreflang (pl/uk/ru/x-default) собираются по шаблону URL — вручную прописывать не нужно, только добавить записи в `seoMetadataUk` / `seoMetadataRu`.

Важно: пока слаг в `noindexSlugs`, PL-версия отдаёт `robots: noindex` и **не** отдаёт hreflang на uk/ru — это единственное место, которое реально блокирует полноценное SEO для всех трёх языков сразу, и убирается одной строкой (удаление из массива).

---

## 12. Что может помешать

Блокеров архитектурного уровня нет. Три нюанса на заметку:

- **`noindexSlugs`** — сейчас страница не индексируется и не в sitemap ни на одном языке. Снимать флаг нужно осознанно, когда контент готов.
- **PL-текст сам ещё "временная копия"** (title/subtitle/description дословно как у `serwis-drukarek-3d`, отмечено комментарием в коде). Переводить на UK/RU можно уже сейчас, но если PL потом переписать — благодаря архитектуре придётся переписать только 3 объекта данных, а не 3 страницы.
- Пункт меню сейчас содержит **непереведённую заглушку** (`uk`/`ru` = польский текст) — легко пропустить при поверхностном осмотре, это тоже нужно перевести.

`src/app/sitemap.ts` уже читает `servicesUk` / `servicesRu` напрямую — после добавления данных страницы появятся в sitemap сами, без правок sitemap.ts.

---

## Итог

Это не переработка архитектуры, а точечное заполнение данных в уже существующем шаблоне: добавить объекты в 4 языковых словаря (`services-data-uk/ru.ts`, `services-meta-uk/ru.tsx`), перевести пункт меню, снять `noindex` — без создания копий разметки.
