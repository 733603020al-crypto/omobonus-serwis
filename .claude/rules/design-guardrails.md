---
paths:
  - "src/components/**"
  - "src/app/**/*.tsx"
  - "src/app/globals.css"
  - "public/images/**"
---

# Design guardrails (loads for any component/page/CSS file, with or without the ui-design agent)

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
