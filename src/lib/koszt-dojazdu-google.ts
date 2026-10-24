// Route from the service to the client by Google (Geocoding + Routes + Static Maps) for the "Koszt dojazdu" window.
// The map has no Google markers: start/end points and the route label are drawn by the window itself,
// so the map is requested with an explicit center/zoom and the points are returned in % of the image.

export type Lang = 'pl' | 'uk' | 'ru' | 'en'
export type TrasaWynik = {
  klientAdres: string
  metry: number
  czasMin: number
  map: { src: string; width: number; height: number }
  mapLabel: { left: number; top: number; side: 'left' | 'right' }
  mapPins: { start: { left: number; top: number }; end: { left: number; top: number } }
}
export class TrasaError extends Error {
  constructor(public code: 'not_found' | 'no_route' | 'google' | 'config') { super(code) }
}

export type Zapytanie = { adres?: string; placeId?: string; lat?: number; lng?: number }

export const SERWIS_ADRES = 'Marcina Bukowskiego 174, 52-418 Wrocław'
const W = 560, H = 620, SCALE = 2
const COUNTRY = /, (Polska|Poland|Польща|Польша)$/i

function key() {
  const k = process.env.GOOGLE_MAPS_API_KEY
  if (!k) throw new TrasaError('config')
  return k
}

// "Saperów 45, …" → "ul. Saperów 45, …". Google writes ordinary streets without "ul.", while squares,
// avenues, estates etc. come with their own word ("plac", "aleja", "osiedle", "Rynek") — those stay as they are.
const BEZ_UL = /^(rynek|plac|pl\.|aleja|aleje|al\.|osiedle|os\.|bulwar|rondo|skwer|wybrzeże|park|ul\.|ulica)(\s|$)/i
function zUlica(adres: string, comps: { long_name: string; types?: string[] }[] = []) {
  const route = comps.find(c => c.types?.includes('route'))?.long_name
  if (!route || !adres.startsWith(route)) return adres
  if (!/^\p{Lu}/u.test(route) || BEZ_UL.test(route)) return adres
  return `ul. ${adres}`
}

export async function geocode(q: Zapytanie, lang: Lang) {
  const where = q.placeId
    ? `place_id=${encodeURIComponent(q.placeId)}`
    : q.adres
    ? `address=${encodeURIComponent(q.adres)}&components=country:PL`
    : `latlng=${q.lat},${q.lng}`
  const r = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${where}&region=pl&language=${lang}&key=${key()}`).then(x => x.json())
  if (r.status === 'ZERO_RESULTS') throw new TrasaError('not_found')
  if (r.status !== 'OK') throw new TrasaError('google')
  const g = r.results[0]
  // an unknown street falls back to the whole city, county, voivodeship or country — the route would go
  // to the city centre, so treat it as not found
  const types: string[] = g.types ?? []
  const OGOLNE = ['country', 'administrative_area_level_1', 'administrative_area_level_2', 'administrative_area_level_3', 'locality']
  if (types.some(t => OGOLNE.includes(t))) throw new TrasaError('not_found')
  return { adres: zUlica(String(g.formatted_address).replace(COUNTRY, ''), g.address_components), lat: g.geometry.location.lat as number, lng: g.geometry.location.lng as number }
}

function decode(s: string) {
  const pts: [number, number][] = []
  let i = 0, lat = 0, lng = 0
  while (i < s.length) {
    for (let k = 0; k < 2; k++) {
      let b, sh = 0, res = 0
      do { b = s.charCodeAt(i++) - 63; res |= (b & 31) << sh; sh += 5 } while (b >= 32)
      const d = res & 1 ? ~(res >> 1) : res >> 1
      if (k === 0) lat += d; else lng += d
    }
    pts.push([lat / 1e5, lng / 1e5])
  }
  return pts
}

const wx = (lng: number, z: number) => (lng + 180) / 360 * 256 * 2 ** z
const wy = (lat: number, z: number) => { const s = Math.sin(lat * Math.PI / 180); return (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * 256 * 2 ** z }
const r2 = (n: number) => Math.round(n * 100) / 100

export async function obliczTrase(q: Zapytanie, lang: Lang): Promise<TrasaWynik> {
  const klient = await geocode(q, lang)

  const route = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': key(), 'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline' },
    body: JSON.stringify({
      origin: { address: SERWIS_ADRES },
      destination: { location: { latLng: { latitude: klient.lat, longitude: klient.lng } } },
      travelMode: 'DRIVE', languageCode: lang, regionCode: 'PL',
    }),
  }).then(x => x.json())
  const rt = route.routes?.[0]
  if (!rt?.polyline?.encodedPolyline) throw new TrasaError('no_route')
  const enc: string = rt.polyline.encodedPolyline
  const pts = decode(enc)

  // the largest zoom at which the whole route fits (room above for the end pin)
  const lats = pts.map(p => p[0]), lngs = pts.map(p => p[1])
  const PAD = 50, PADTOP = 70
  let z = 18
  for (; z > 3; z--) {
    const w = wx(Math.max(...lngs), z) - wx(Math.min(...lngs), z)
    const h = wy(Math.min(...lats), z) - wy(Math.max(...lats), z)
    if (w <= W - 2 * PAD && h <= H - PAD - PADTOP) break
  }
  const cx = (wx(Math.max(...lngs), z) + wx(Math.min(...lngs), z)) / 2
  const cy = (wy(Math.min(...lats), z) + wy(Math.max(...lats), z)) / 2 - (PADTOP - PAD) / 2
  const lngC = cx / (256 * 2 ** z) * 360 - 180
  const latC = 180 / Math.PI * Math.atan(Math.sinh(Math.PI - 2 * Math.PI * cy / (256 * 2 ** z)))
  const pct = ([la, ln]: [number, number]) => ({ left: r2(((wx(ln, z) - cx) / W + 0.5) * 100), top: r2(((wy(la, z) - cy) / H + 0.5) * 100) })

  // label at half of the route length, as Google does
  const dist = (a: [number, number], b: [number, number]) => Math.hypot(a[0] - b[0], (a[1] - b[1]) * Math.cos(a[0] * Math.PI / 180))
  let total = 0
  for (let i = 1; i < pts.length; i++) total += dist(pts[i - 1], pts[i])
  let acc = 0, mid = pts[0]
  for (let i = 1; i < pts.length; i++) { acc += dist(pts[i - 1], pts[i]); if (acc >= total / 2) { mid = pts[i]; break } }
  const mp = pct(mid)

  const url = `https://maps.googleapis.com/maps/api/staticmap?size=${W}x${H}&scale=${SCALE}&maptype=roadmap&language=${lang}&region=PL`
    + `&center=${latC.toFixed(6)},${lngC.toFixed(6)}&zoom=${z}`
    + `&path=${encodeURIComponent(`weight:9|color:0x1967D2FF|enc:${enc}`)}`
    + `&path=${encodeURIComponent(`weight:6|color:0x4285F4FF|enc:${enc}`)}`
    + `&key=${key()}`
  const img = await fetch(url)
  if (!img.ok) throw new TrasaError('google')
  const b64 = Buffer.from(await img.arrayBuffer()).toString('base64')

  return {
    klientAdres: klient.adres,
    metry: rt.distanceMeters ?? 0,
    czasMin: Math.max(1, Math.round(parseInt(rt.duration) / 60)),
    map: { src: `data:image/png;base64,${b64}`, width: W * SCALE, height: H * SCALE },
    mapLabel: { ...mp, side: mp.left < 50 ? 'right' : 'left' },
    mapPins: { start: pct(pts[0]), end: pct(pts[pts.length - 1]) },
  }
}

// Address suggestions while typing (Places API New, Poland, closer to Wrocław first).
export type Podpowiedz = { placeId: string; tekst: string; glowny: string; dodatkowy: string }
export async function podpowiedzi(input: string, session: string, lang: Lang): Promise<Podpowiedz[]> {
  const r = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': key() },
    body: JSON.stringify({
      input, sessionToken: session, languageCode: lang, regionCode: 'pl', includedRegionCodes: ['pl'],
      locationBias: { circle: { center: { latitude: 51.0775534, longitude: 16.9784082 }, radius: 50000 } },
    }),
  }).then(x => x.json())
  if (r.error) { console.error('koszt-dojazdu autocomplete:', r.error.status); throw new TrasaError('google') }
  return (r.suggestions ?? [])
    .map((s: { placePrediction?: { placeId: string; text?: { text: string }; structuredFormat?: { mainText?: { text: string }; secondaryText?: { text: string } } } }) => s.placePrediction)
    .filter(Boolean)
    .slice(0, 5)
    .map((p: { placeId: string; text?: { text: string }; structuredFormat?: { mainText?: { text: string }; secondaryText?: { text: string } } }) => ({
      placeId: p.placeId,
      tekst: String(p.text?.text ?? '').replace(COUNTRY, ''),
      glowny: p.structuredFormat?.mainText?.text ?? p.text?.text ?? '',
      dodatkowy: String(p.structuredFormat?.secondaryText?.text ?? '').replace(COUNTRY, '').replace(/^(Polska|Poland|Польща|Польша)$/i, ''),
    }))
}

