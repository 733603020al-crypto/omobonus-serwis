// Cost of pickup or delivery: one service = the trip to the client and back.
// The tariff always comes from the service's price list (it differs between devices).
export type TaryfaDojazdu = {
  baza: number // zł netto for the first `limitKm` km of the whole trip
  stawka: number // zł netto per km of the whole trip above `limitKm`
  limitKm: number // km of the whole trip (there and back) included in `baza`
}

export const TARYFA_STANDARD: TaryfaDojazdu = { baza: 25, stawka: 2, limitKm: 5 }

export type KosztDojazdu = {
  kmJednaStrona: number
  kmObieStrony: number
  kmPonadLimit: number
  doplata: number
  koszt: number
}

const round1 = (n: number) => Math.round(n * 10) / 10

// Distance in metres from the route (Google Routes). Kilometres are rounded to 0.1,
// money is counted in grosze so 14.8 × 2 is exactly 29.60.
export function obliczKosztDojazdu(metryJednaStrona: number, t: TaryfaDojazdu): KosztDojazdu {
  const kmJednaStrona = round1(metryJednaStrona / 1000)
  const kmObieStrony = round1(kmJednaStrona * 2)
  const kmPonadLimit = Math.max(0, round1(kmObieStrony - t.limitKm))
  const doplataGr = Math.round(kmPonadLimit * 10 * t.stawka * 10)
  const kosztGr = Math.round(t.baza * 100) + doplataGr
  return { kmJednaStrona, kmObieStrony, kmPonadLimit, doplata: doplataGr / 100, koszt: kosztGr / 100 }
}

export const fmtKm = (n: number) => n.toLocaleString('pl-PL', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' km'
export const fmtKmShort = (n: number) => n.toLocaleString('pl-PL', { maximumFractionDigits: 1 }) + ' km'
export const fmtZl = (n: number) => n.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' zł'
export const fmtZlShort = (n: number) => n.toLocaleString('pl-PL', { maximumFractionDigits: 2 }) + ' zł'
