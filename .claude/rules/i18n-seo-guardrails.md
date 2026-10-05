---
paths:
  - "src/app/**/page.tsx"
  - "src/app/**/layout.tsx"
  - "src/lib/i18n/**"
  - "src/lib/services-data*.ts"
  - "src/lib/services-meta*.ts"
  - "src/app/sitemap.ts"
  - "public/robots.txt"
---

# i18n / SEO guardrails (loads for routes, locale data, and SEO-adjacent files, with or without the seo-content/pages agents)

Polish (`/`, `/uslugi/...`, `/kontakt`, `/regulamin`, `/polityka-prywatnosci`) is the source of truth. Other locales (`/uk`, `/ru`, `/en`) are localizations of it — a locale only "exists" if its routes/pages/data genuinely exist in the project; never assume EN exists just because it's mentioned in docs.

When the Polish version changes (text, H1/H2, CTA, section order, a block added/removed, a component's text), check the corresponding existing UK/RU pages and sync them to the *current* PL, not to their own old translation. Compare current-PL → target-locale, never old-locale → new-locale.

Translations must stay faithful to PL meaning, tone, and structure — even for a small tweak. Don't turn a translation into SEO-rewritten marketing copy, don't add facts/services/promises absent from the PL original, don't drop images or meaning present in it.

Changing the URL/slug/canonical/hreflang/sitemap/robots.txt mechanism itself always requires stopping and asking first (this is already a global stop-condition in the root `CLAUDE.md` — restated here only because it applies directly to files in this path scope).

A shared component with hardcoded visible text used across locales (hero captions, badges, card text, CTA labels, short UI labels) must not have that text hardcoded to one language — move it to props/data/i18n, keeping the PL version and existing design/layout unchanged, while adding the other locale's text.
