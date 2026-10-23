import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { KosztDojazduCard } from '@/components/koszt-dojazdu/KosztDojazduCard'
import { TARYFA_STANDARD, obliczKosztDojazdu } from '@/components/koszt-dojazdu/koszt-dojazdu'
import { kosztStore } from './store'

// Local page for client e-mails (dev only, 404 in production): the same "Koszt dojazdu" card as on /kontakt.
// The skill script odpowiedzi-klientom/karta-trasy.mjs first calculates the route via ./dane, then screenshots
// /dev/koszt-dojazdu?id=<id>&lang=pl&baza=25&stawka=2
export const metadata: Metadata = { title: 'Koszt dojazdu — karta do maila', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

type SP = Promise<Record<string, string | undefined>>
const ALT = {
  pl: 'Trasa z serwisu Omobonus do Klienta według Google Maps',
  uk: 'Маршрут від сервісу Omobonus до Клієнта за Google Maps',
  ru: 'Маршрут от сервиса Omobonus к Клиенту по Google Maps',
}

export default async function Page({ searchParams }: { searchParams: SP }) {
  if (process.env.NODE_ENV === 'production') notFound()
  const sp = await searchParams
  const w = sp.id ? kosztStore().get(sp.id) : undefined
  if (!w) return <main className="p-10 text-white">Brak trasy — najpierw /dev/koszt-dojazdu/dane?adres=…</main>
  const lang = sp.lang === 'uk' || sp.lang === 'ru' ? sp.lang : 'pl'
  const num = (v: string | undefined, d: number) => { const n = Number(String(v ?? '').replace(',', '.')); return Number.isFinite(n) && n > 0 ? n : d }
  const taryfa = { ...TARYFA_STANDARD, baza: num(sp.baza, TARYFA_STANDARD.baza), stawka: num(sp.stawka, TARYFA_STANDARD.stawka) }
  const k = obliczKosztDojazdu(w.metry, taryfa)

  return (
    <main
      id="wynik"
      data-wynik={JSON.stringify({ adresZnaleziony: w.klientAdres, czasMin: w.czasMin, ...taryfa, ...k })}
      className="min-h-screen p-5"
      style={{ backgroundImage: 'var(--bg-parchment)', backgroundSize: 'cover' }}
    >
      <KosztDojazduCard
        serwisAdres="ul. Marcina Bukowskiego 174, 52-418 Wrocław"
        klientAdres={w.klientAdres}
        metryJednaStrona={w.metry}
        czasMin={w.czasMin}
        taryfa={taryfa}
        map={{ ...w.map, src: `/dev/koszt-dojazdu/mapa/${sp.id}`, alt: ALT[lang] }}
        mapLabel={w.mapLabel}
        mapPins={w.mapPins}
        lang={lang}
      />
    </main>
  )
}
