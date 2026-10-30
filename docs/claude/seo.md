# SEO: Title, Description, заголовки, языки

## SEO-панель и стандарт Title

**Все SEO-правила лежат в `docs/seo/` (видны в панели по кнопке «Правила»):** `title-standard.md`, `description-standard.md`, `heading-standard.md` (H1–H4). Правила не дублировать в других местах — только ссылаться.

**Языки и переводы:** правила — `docs/languages-standard.md` (в панели: раздел «Языки» → «Правила»).

Правила Title, утверждённые решения и порядок повторной проверки — `docs/seo/title-standard.md` (решения — `docs/seo/title-decisions.json`, история проверок — `docs/seo/audit-history.json`). Проверка: `node scripts/seo-audit/title-audit.mjs`, панель — новый Omobonus Workspace `http://localhost:5180/seo` (если не запущена — `C:/Users/Andrii/omobonus-workspace/app/start-workspace.vbs`; решения панели — `C:/Users/Andrii/omobonus-workspace/seo/decisions.json`). Утверждённые Title и исключения не пересматривать без новой причины.

Правила Description, исключения, методика исследования и порядок проверки — `docs/seo/description-standard.md` (решения и исключения — `docs/seo/description-decisions.json`, исследования — `docs/seo/description-research/`). Проверка: `node scripts/seo-audit/description-audit.mjs`, панель — `http://localhost:5180/seo?tab=description`. Description на сайте меняются только после утверждения пользователем в панели; утверждённые тексты и исключения не пересматривать без новой причины.

Общее для SEO-текстов: Meta Description, Open Graph Description (`og:description`) и Twitter Description (`twitter:description`) — отдельные тексты, проверяются и согласуются отдельно; утверждение одного не переносится на другие. Утверждённые SEO-тексты (Title, Description, социальные описания) Claude не меняет самостоятельно ради дополнительной оптимизации — только по задаче пользователя или новой причине из стандарта.
