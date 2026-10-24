import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'
import { geocode, podpowiedzi, TrasaError, type Lang } from '@/lib/koszt-dojazdu-google'

// "Koszt dojazdu" window, before the calculation:
//   { q, session } → address suggestions while typing;  { lat, lng } → address of the visitor's location to confirm.
// Google gives 10 000 free suggestions a month: 300 a day (≈ 9 000 a month) keeps them free.
// When the cap is reached the suggestions stop for the day and the typed address is calculated as it is (reczny).
const PER_MINUTE = 40
const DAILY_CAP_PODPOWIEDZI = 300
const DAILY_CAP_ADRES = 300
let day = '', countPodp = 0, countAdres = 0

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, 'koszt-dojazdu-adres', PER_MINUTE)
  if (limited) return limited

  let body: { q?: unknown; session?: unknown; lat?: unknown; lng?: unknown; lang?: unknown }
  try { body = await request.json() } catch { return err('bad_request', 400) }
  const lang: Lang = body.lang === 'uk' || body.lang === 'ru' || body.lang === 'en' ? body.lang : 'pl'

  const today = new Date().toISOString().slice(0, 10)
  if (today !== day) { day = today; countPodp = 0; countAdres = 0 }

  try {
    if (typeof body.q === 'string') {
      const q = body.q.trim().replace(/\s+/g, ' ')
      if (q.length < 4 || q.length > 200) return NextResponse.json({ podpowiedzi: [] })
      if (++countPodp > DAILY_CAP_PODPOWIEDZI) return NextResponse.json({ podpowiedzi: [], reczny: true })
      const session = typeof body.session === 'string' ? body.session.slice(0, 64) : ''
      return NextResponse.json({ podpowiedzi: await podpowiedzi(q, session, lang) })
    }
    const lat = Number(body.lat), lng = Number(body.lng)
    if (body.lat == null || body.lng == null || !Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) return err('bad_request', 400)
    if (++countAdres > DAILY_CAP_ADRES) return err('busy', 429)
    const g = await geocode({ lat: Math.round(lat * 1e4) / 1e4, lng: Math.round(lng * 1e4) / 1e4 }, lang)
    return NextResponse.json({ adres: g.adres })
  } catch (e) {
    const code = e instanceof TrasaError ? e.code : 'google'
    if (code === 'config') console.error('koszt-dojazdu: GOOGLE_MAPS_API_KEY is not set')
    return err(code, code === 'not_found' ? 404 : 502)
  }
}

function err(error: string, status: number) {
  return NextResponse.json({ error }, { status })
}
