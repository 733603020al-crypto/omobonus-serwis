// Small standalone module for the couple of constants service-accordion.tsx
// (a Client Component) needs at runtime. Kept separate from services-data.ts
// so importing them doesn't pull that file's full service/FAQ data content
// into the client bundle — see services-data.ts, which re-exports these for
// server-side callers that already import from there.

export const DEFAULT_PRICE_TOOLTIP = 'Ceny netto'

// Slugs sharing the "repair accordion" layout: warm-parchment card look,
// open laptop-repair card treatment (icon-overflow scale-compensation,
// centered/nowrap Naprawy header, curl/ragged-edge parchment geometry).
// Add a slug here — not scattered `service.slug === '...'` checks — to
// extend this shared layout to another /uslugi/[slug] page. Drives both
// service-accordion.tsx (isRepairAccordionLayout) and the shared
// `.page-repair-accordion` CSS scope in globals.css.
export const REPAIR_ACCORDION_LAYOUT_SLUGS = ['serwis-laptopow', 'serwis-komputerow-stacjonarnych', 'outsourcing-it', 'serwis-drukarek-laserowych', 'serwis-drukarek-atramentowych', 'serwis-drukarek-iglowych', 'serwis-drukarek-termicznych', 'serwis-drukarek-3d', 'druk-3d-na-zamowienie', 'serwis-plotterow', 'wynajem-drukarek', 'drukarka-zastepcza']
