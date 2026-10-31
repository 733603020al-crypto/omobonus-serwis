# SEO

SEO-задачи передаю помощнику `seo-content` (`.claude/agents/seo-content.md`): Title, Description, заголовки, canonical, hreflang, sitemap, точность перевода.

- **Title** (название страницы в Google: схема, длина, исключения, проверка) → `docs/seo/title-standard.md`
- **Description** (описание под названием: три части ✔, телефон, проверка) → `docs/seo/description-standard.md`
- **Заголовки H1–H4** → `docs/seo/heading-standard.md`
- Решения и история проверок: `docs/seo/*-decisions.json`, `docs/seo/audit-history.json`.

## Новая страница или смена Title/Description — сразу в панель
Сделал или поменял Title/Description страницы (например, `/serwis-wysylkowy`) — в той же задаче, не дожидаясь просьбы, внести её в SEO-панель (`localhost:5180/seo`): страница должна быть в `sitemap.ts`, её slug — в `EXTRA_PAGES` (`scripts/seo-audit/build-panel.mjs`, если это не услуга `/uslugi/*`), имя — в `names` файла `title-decisions.json`; затем запустить `node scripts/seo-audit/title-audit.mjs`, `description-audit.mjs`, `heading-audit.mjs` (нужен dev-сервер :3000). Страница появится в разделе «Новые страницы». В `approved` текст переносится только после «Утвердить» пользователя. Облачную копию (`publish-seo.mjs`) обновлять только с разрешения.
