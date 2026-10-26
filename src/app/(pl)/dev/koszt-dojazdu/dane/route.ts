import { randomUUID } from 'node:crypto'
import { notFound } from 'next/navigation'
import { obliczTrase, TrasaError, type TrasaWynik } from '@/lib/koszt-dojazdu-google'
import { kosztStore } from '../store'

// GET /dev/koszt-dojazdu/dane?adres=...&lang=pl → { id } of the calculated route (dev only).
// Google is asked here, not in the page: a Google request inside the page render breaks the dev stream.
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  if (process.env.NODE_ENV === 'production') notFound()
  const sp = new URL(req.url).searchParams
  const adres = (sp.get('adres') ?? '').trim()
  const lang = sp.get('lang') === 'uk' || sp.get('lang') === 'ru' || sp.get('lang') === 'en' ? (sp.get('lang') as 'uk' | 'ru' | 'en') : 'pl'
  if (adres.length < 3) return Response.json({ error: 'bad_request' }, { status: 400 })
  try {
    const w = await obliczTrase({ adres }, lang)
    const store = kosztStore()
    const id = randomUUID()
    store.set(id, w)
    if (store.size > 20) store.delete(store.keys().next().value!)
    return Response.json({ id })
  } catch (e) {
    return Response.json({ error: e instanceof TrasaError ? e.code : 'google' }, { status: 404 })
  }
}

// POST /dev/koszt-dojazdu/dane { klientAdres, metry, czasMin, png } → { id } (dev only).
// Route already read from the ordinary Google Maps page by karta-trasy.mjs — no Google API request here,
// so the API limit stays for clients using the calculator on the site.
export async function POST(req: Request) {
  if (process.env.NODE_ENV === 'production') notFound()
  const b = await req.json().catch(() => ({})) as { klientAdres?: unknown; metry?: unknown; czasMin?: unknown; png?: unknown; width?: unknown; height?: unknown }
  const metry = Number(b.metry), czasMin = Number(b.czasMin), width = Number(b.width), height = Number(b.height)
  if (typeof b.klientAdres !== 'string' || typeof b.png !== 'string' || !(metry > 0) || !(width > 0) || !(height > 0)) {
    return Response.json({ error: 'bad_request' }, { status: 400 })
  }
  const w = {
    klientAdres: b.klientAdres,
    metry,
    czasMin: czasMin > 0 ? czasMin : undefined,
    map: { src: `data:image/png;base64,${b.png}`, width, height },
  } as unknown as TrasaWynik
  const store = kosztStore()
  const id = randomUUID()
  store.set(id, w)
  if (store.size > 20) store.delete(store.keys().next().value!)
  return Response.json({ id })
}
