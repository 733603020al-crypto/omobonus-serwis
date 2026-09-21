# HANDOFF: wynajem-drukarek — repair-accordion стиль тарифов

## 1. Цель и страницы
Целевая страница: `/uslugi/wynajem-drukarek` (редактируется напрямую, без `-new` slug).
Связанная страница, которую нельзя трогать: `/uslugi/drukarka-zastepcza` (использует общие компоненты с wynajem-drukarek).

Задача: перенести общий визуальный стиль repair-accordion (`serwis-laptopow`, ветка `test`) на закрытые/открытые подкатегории wynajem-drukarek, с данными тарифов из `master`, без переноса pixel-perfect curl-геометрии секции Naprawy.

## 2. Что сделано
**wynajem-drukarek** — реализовано полностью:
- 2 блока: Laserowe (A4) и Laserowe (A3/A4), те же названия/подкатегории.
- 8 подкатегорий (`drukarki-mono`, `drukarki-kolor`, `mfu-mono`, `mfu-kolor`, `a3-drukarki-mono`, `a3-drukarki-kolor`, `a3-mfu-mono`, `a3-mfu-kolor`) переведены на новую модель данных `priceTiers` (3 тарифа × 5 строк: czynsz, limit stron A4, cena powyżej limitu, duplex, prędkość druku).
- Раскрытая подкатегория показывает иконку, название и таблицу тарифов в стиле repair-accordion; цена аренды перенесена из закрытой шапки в таблицу.
- FAQ-блок не менялся.
- Hero, заголовок, бренды, польский язык — без изменений.

**drukarka-zastepcza** — не менялась, проверена как незатронутая (использует старый `WynajemTable`/`WynajemSubcategoryHeader`, которые остались нетронутыми и работают только через путь, требующий `subcategory.price`, отсутствующий теперь у wynajem-drukarek).

## 3. Изменённые файлы
- `src/lib/services-data.ts` — новые интерфейсы `PriceTier`/`PriceTierRow`, поле `priceTiers?` на `PricingSubcategory`, `'wynajem-drukarek'` добавлен в `REPAIR_ACCORDION_LAYOUT_SLUGS`, полностью переписана `createWynajemPricingSections()` (8 подкатегорий с `icon`+`priceTiers`).
- `src/components/service-accordion.tsx` — добавлена новая первая ветка в тернарнике открытого контента подкатегории, рендерящая таблицу по `subcategory.priceTiers` (мобильная версия — стек карточек, десктоп — единая таблица с колонкой на тариф). Флаг `isRepairSection` (`section.id === 'naprawy'`) и curl-геометрия Naprawy **не изменены и не обобщены** — намеренное архитектурное решение.

Коммит `7647a01` уже содержит оба файла (см. п.6).

## 4. Обязательные требования (сохранить)
- Не создавать `-new` страницу, редактировать `/uslugi/wynajem-drukarek` напрямую.
- Ровно 5 строк в каждом тарифе, фиксированный порядок и текст лейблов (см. `createWynajemPricingSections()`).
- Не обобщать curl-геометрию Naprawy на общий компонент — она должна остаться завязана только на `section.id === 'naprawy'`.
- Не трогать `drukarka-zastepcza` и остальные страницы.
- Не пушить и не мёржить без явного подтверждения пользователя.
- PL — язык хедера/бренда/hero без изменений.

## 5. Что осталось
- Финальный визуальный desktop-скриншот `/uslugi/wynajem-drukarek` через Chrome не сделан — расширение claude-in-chrome было отключено на момент проверки (`Browser extension is not connected`). Нужно переподключить расширение и сделать один финальный скриншот (открыто/закрыто для обоих блоков).
- Явного `git push origin test` не выполнялось — ждёт подтверждения пользователя.

## 6. Git-состояние
- Ветка: `test`.
- Последний коммит: `7647a01 feat(wynajem-drukarek): repair-accordion стиль для тарифных таблиц аренды принтеров`.
- Незакоммиченных изменений нет (`git status --short` — пусто).
- `npx tsc --noEmit` и `npm run build` пройдены до коммита.

## 7. Следующий шаг
Переподключить Chrome-расширение и сделать один финальный desktop-скриншот `/uslugi/wynajem-drukarek` (открытое и закрытое состояние подкатегорий обоих блоков) для визуальной проверки перед `git push origin test`.
