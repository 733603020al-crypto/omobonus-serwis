import type { TrasaWynik } from '@/lib/koszt-dojazdu-google'

// Routes calculated for client e-mails (dev only), kept in memory of the dev server by id.
export const kosztStore = () => ((globalThis as { __kosztKarty?: Map<string, TrasaWynik> }).__kosztKarty ??= new Map())
