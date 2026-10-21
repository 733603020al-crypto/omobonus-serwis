import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'
import { obliczTrase, TrasaError, type Lang, type TrasaWynik } from '@/lib/koszt-dojazdu-google'

// "Koszt dojazdu" window on /kontakt: address (or the visitor's location) → route, map and points.
// Every new address costs Google requests, so: per-IP limit, a daily cap per instance and a cache of answers.
const PER_MINUTE = 5
const DAILY_CAP = 400
const CACHE_MAX = 300
const CACHE_MS = 24 * 3600_000

const cache = new Map<string, { at: number; data: TrasaWynik }>()
let day = '', dayCount = 0

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, 'koszt-dojazdu', PER_MINUTE)
  if (limited) return limited

  let body: { adres?: unknown; lat?: unknown; lng?: unknown; lang?: unknown }
  try { body = await request.json() } catch { return err('bad_request', 400) }

  const lang: Lang = body.lang === 'uk' || body.lang === 'ru' ? body.lang : 'pl'
  const adres = typeof body.adres === 'string' ? body.adres.trim().replace(/\s+/g, ' ') : ''
  const lat = Number(body.lat), lng = Number(body.lng)
  const hasPoint = body.lat != null && body.lng != null && Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180
  if (!hasPoint && (adres.length < 3 || adres.length > 200)) return err('bad_request', 400)

  const q = hasPoint ? { lat: Math.round(lat * 1e4) / 1e4, lng: Math.round(lng * 1e4) / 1e4 } : { adres }
  const cacheKey = `${lang}|${hasPoint ? `${q.lat},${q.lng}` : adres.toLowerCase()}`
  const hit = cache.get(cacheKey)
  if (hit && Date.now() - hit.at < CACHE_MS) return NextResponse.json(hit.data)

  const today = new Date().toISOString().slice(0, 10)
  if (today !== day) { day = today; dayCount = 0 }
  if (++dayCount > DAILY_CAP) return err('busy', 429)

  try {
    const data = await obliczTrase(q, lang)
    if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value!)
    cache.set(cacheKey, { at: Date.now(), data })
    return NextResponse.json(data)
  } catch (e) {
    const code = e instanceof TrasaError ? e.code : 'google'
    if (code === 'config') console.error('koszt-dojazdu: GOOGLE_MAPS_API_KEY is not set')
    return err(code, code === 'not_found' || code === 'no_route' ? 404 : 502)
  }
}

function err(error: string, status: number) {
  return NextResponse.json({ error }, { status })
}
