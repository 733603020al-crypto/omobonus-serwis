'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { Ban, Calculator, MapPin, ShieldCheck, X } from 'lucide-react'
import { KosztDojazduCard } from './KosztDojazduCard'
import { TARYFA_STANDARD } from './koszt-dojazdu'

// Popup on /kontakt. Order: 1) "use my location" (the browser asks only after this click) — the found address
// is shown in the field to confirm; 2) or type an address and pick one of Google's suggestions;
// 3) "Oblicz koszt" becomes active once the address is set → the server asks Google for the route.
type Lang = 'pl' | 'uk' | 'ru'
type Wynik = {
  klientAdres: string; metry: number; czasMin: number
  map: { src: string; width: number; height: number }
  mapLabel: { left: number; top: number; side: 'left' | 'right' }
  mapPins: { start: { left: number; top: number }; end: { left: number; top: number } }
}
type Podpowiedz = { placeId: string; tekst: string; glowny: string; dodatkowy: string }
type Wybor = { placeId?: string; lat?: number; lng?: number; adres?: string }

const SERWIS = 'ul. Marcina Bukowskiego 174, 52-418 Wrocław'
// where the service sits on the map pictures public/images/koszt-dojazdu/mapa-*.webp (Static Maps, zoom 12, 600×420@2)
const PIN = { left: 38, top: 60 }
const T = {
  pl: {
    title: 'Koszt dojazdu', close: 'Zamknij',
    intro: 'Sprawdź koszt odbioru lub dostawy urządzenia.',
    locate: 'Użyj mojej lokalizacji', locating: 'Ustalamy lokalizację…',
    privacy: 'Lokalizacja służy wyłącznie do obliczenia kosztu dojazdu — nie daje dostępu do Twojego urządzenia.',
    ask: 'Nie chcesz udostępniać lokalizacji? Wpisz adres ręcznie poniżej:',
    placeholder: 'Wpisz adres, np. Wrocław, ul. Legnicka 12',
    confirm: 'Sprawdź adres i kliknij „Oblicz koszt”.',
    geo: 'Nie mamy dostępu do lokalizacji — wpisz adres powyżej.',
    count: 'Oblicz koszt', counting: 'Liczymy…',
    change: 'Zmień adres', alt: 'Trasa z serwisu Omobonus do Klienta według Google Maps',
    mapAlt: 'Mapa Wrocławia z lokalizacją serwisu Omobonus',
    err: {
      not_found: 'Nie znaleźliśmy tego adresu. Sprawdź ulicę, numer i miasto.',
      no_route: 'Google nie wyznaczył trasy do tego adresu. Zadzwoń, a policzymy koszt.',
      busy: 'Za dużo zapytań. Spróbuj za chwilę.',
      other: 'Nie udało się policzyć trasy. Spróbuj ponownie lub zadzwoń.',
    },
  },
  uk: {
    title: 'Вартість доїзду', close: 'Закрити',
    intro: 'Перевірте вартість забору або доставки пристрою.',
    locate: 'Використати моє місцезнаходження', locating: 'Визначаємо місцезнаходження…',
    privacy: 'Місцезнаходження використовується виключно для розрахунку вартості доїзду — воно не дає доступу до вашого пристрою.',
    ask: 'Не хочете ділитися місцезнаходженням? Введіть адресу вручну нижче:',
    placeholder: 'Введіть адресу, напр. Wrocław, ul. Legnicka 12',
    confirm: 'Перевірте адресу і натисніть «Розрахувати вартість».',
    geo: 'Немає доступу до місцезнаходження — введіть адресу вище.',
    count: 'Розрахувати вартість', counting: 'Рахуємо…',
    change: 'Змінити адресу', alt: 'Маршрут від сервісу Omobonus до Клієнта за Google Maps',
    mapAlt: 'Карта Вроцлава з розташуванням сервісу Omobonus',
    err: {
      not_found: 'Не знайшли цю адресу. Перевірте вулицю, номер і місто.',
      no_route: 'Google не проклав маршрут до цієї адреси. Зателефонуйте, і ми порахуємо вартість.',
      busy: 'Забагато запитів. Спробуйте за хвилину.',
      other: 'Не вдалося порахувати маршрут. Спробуйте ще раз або зателефонуйте.',
    },
  },
  ru: {
    title: 'Стоимость выезда', close: 'Закрыть',
    intro: 'Проверьте стоимость забора или доставки устройства.',
    locate: 'Использовать моё местоположение', locating: 'Определяем местоположение…',
    privacy: 'Местоположение используется только для расчёта стоимости выезда — оно не даёт доступа к вашему устройству.',
    ask: 'Не хотите делиться местоположением? Введите адрес вручную ниже:',
    placeholder: 'Введите адрес, напр. Wrocław, ul. Legnicka 12',
    confirm: 'Проверьте адрес и нажмите «Рассчитать стоимость».',
    geo: 'Нет доступа к местоположению — введите адрес выше.',
    count: 'Рассчитать стоимость', counting: 'Считаем…',
    change: 'Изменить адрес', alt: 'Маршрут от сервиса Omobonus к Клиенту по Google Maps',
    mapAlt: 'Карта Вроцлава с расположением сервиса Omobonus',
    err: {
      not_found: 'Не нашли этот адрес. Проверьте улицу, номер и город.',
      no_route: 'Google не построил маршрут к этому адресу. Позвоните, и мы посчитаем стоимость.',
      busy: 'Слишком много запросов. Попробуйте через минуту.',
      other: 'Не удалось посчитать маршрут. Попробуйте ещё раз или позвоните.',
    },
  },
}

const newSession = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Math.random()).slice(2))

export default function KosztDojazduModal({ lang = 'pl', onClose }: { lang?: Lang; onClose: () => void }) {
  const t = T[lang]
  const [adres, setAdres] = useState('')
  const [wybor, setWybor] = useState<Wybor | null>(null)
  const [podp, setPodp] = useState<Podpowiedz[]>([])
  const [aktywna, setAktywna] = useState(-1)
  const [lokalizuje, setLokalizuje] = useState(false)
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState<'hint' | 'confirm' | 'geo'>('hint')
  // suggestions are unavailable (daily limit, Google or network error) — then the typed address is calculated as it is
  const [reczny, setReczny] = useState(false)
  const [error, setError] = useState('')
  const [wynik, setWynik] = useState<Wynik | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const session = useRef(newSession())

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  // suggestions while typing (not for an already chosen address)
  useEffect(() => {
    const q = adres.trim()
    // from 4 letters and after a short pause in typing — fewer paid requests per visitor
    if (wybor || q.length < 4) { setPodp([]); return }
    const ctrl = new AbortController()
    const id = setTimeout(async () => {
      try {
        const res = await fetch('/api/koszt-dojazdu/adres', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ctrl.signal,
          body: JSON.stringify({ q, session: session.current, lang }),
        })
        const data = await res.json().catch(() => ({}))
        const list: Podpowiedz[] = Array.isArray(data.podpowiedzi) ? data.podpowiedzi : []
        setPodp(list)
        setAktywna(-1)
        if (list.length) return
        // Google found nothing — a typo, the calculation stays locked until a real address is chosen
        if (res.ok && !data.reczny) { setError(t.err.not_found); return }
        setReczny(true); setWybor({ adres: q })
      } catch {
        // offline — the typed address still works
        if (!ctrl.signal.aborted) { setReczny(true); setWybor({ adres: q }) }
      }
    }, 600)
    return () => { clearTimeout(id); ctrl.abort() }
  }, [adres, wybor, lang, t])

  function wybierz(p: Podpowiedz) {
    setAdres(p.tekst); setWybor({ placeId: p.placeId, adres: p.tekst }); setPodp([]); setError(''); setNote('hint')
    session.current = newSession()
  }

  // search icon / Enter: the highlighted or first suggestion, otherwise the typed text as it is
  function zatwierdz() {
    if (podp.length) return wybierz(podp[Math.max(0, aktywna)])
    if (reczny && adres.trim().length >= 3) { setWybor({ adres: adres.trim() }); setError('') }
  }

  async function licz() {
    if (!wybor || busy) return
    setBusy(true); setError('')
    const q = wybor.placeId ? { placeId: wybor.placeId } : wybor.lat != null ? { lat: wybor.lat, lng: wybor.lng } : { adres: wybor.adres }
    try {
      const res = await fetch('/api/koszt-dojazdu', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...q, lang }) })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const code = data.error === 'not_found' || data.error === 'no_route' ? data.error : res.status === 429 ? 'busy' : 'other'
        setError(t.err[code as keyof typeof t.err]); return
      }
      setWynik(data)
    } catch {
      setError(t.err.other)
    } finally {
      setBusy(false)
    }
  }

  // location: a refusal or failure just suggests typing the address, without an error
  function lokalizacja() {
    const nieMa = () => { setLokalizuje(false); setNote('geo'); inputRef.current?.focus() }
    if (!navigator.geolocation) return nieMa()
    setLokalizuje(true); setError('')
    navigator.geolocation.getCurrentPosition(
      async (p) => {
        const lat = p.coords.latitude, lng = p.coords.longitude
        try {
          const res = await fetch('/api/koszt-dojazdu/adres', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lat, lng, lang }) })
          const data = await res.json().catch(() => ({}))
          if (!res.ok || !data.adres) return nieMa()
          setAdres(data.adres); setWybor({ lat, lng, adres: data.adres }); setPodp([]); setNote('confirm'); setLokalizuje(false)
        } catch { nieMa() }
      },
      nieMa,
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 300000 },
    )
  }

  const gotowe = !!wybor && !busy

  return createPortal(
    <div
      role="dialog" aria-modal="true" aria-label={t.title}
      className="fixed inset-0 z-[200] overflow-y-auto p-3 md:p-6 flex items-start md:items-center justify-center"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {wynik ? (
        <div className="w-full max-w-[900px] my-auto">
          <KosztDojazduCard
            serwisAdres={SERWIS}
            klientAdres={wynik.klientAdres}
            metryJednaStrona={wynik.metry}
            czasMin={wynik.czasMin}
            taryfa={TARYFA_STANDARD}
            map={{ ...wynik.map, alt: t.alt }}
            mapLabel={wynik.mapLabel}
            mapPins={wynik.mapPins}
            lang={lang}
            onClose={onClose}
          />
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={() => { setWynik(null); setWybor(null); setNote('hint'); setError('') }}
              className="rounded-full bg-black/75 px-4 py-1.5 font-cormorant text-[16px] font-semibold text-[#f3df9a] underline underline-offset-4 decoration-[rgba(243,223,154,0.5)] hover:decoration-[#f3df9a] cursor-pointer"
            >
              {t.change}
            </button>
          </div>
        </div>
      ) : (
        <div className="relative my-auto w-full max-w-[860px] rounded-[18px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.25),0_20px_60px_rgba(0,0,0,0.55)] font-inter">
          <button
            type="button"
            aria-label={t.close}
            onClick={onClose}
            className="absolute top-4 right-4 md:top-5 md:right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full text-[#5b6b80] hover:text-[#2d3a4a] transition-colors cursor-pointer touch-manipulation"
          >
            <X className="w-7 h-7" strokeWidth={1.6} />
          </button>
          <form
            className="p-4 md:p-6"
            onSubmit={(e) => { e.preventDefault(); if (wybor) licz(); else zatwierdz() }}
          >
            <div className="flex items-center gap-3 md:gap-4 pr-10">
              <Image src="/icons/app-icon-192.png" alt="Omobonus" width={192} height={192} unoptimized className="w-[60px] h-[60px] md:w-[68px] md:h-[68px] flex-shrink-0 rounded-[12px] md:rounded-[14px]" />
              <div>
                <h2 className="font-cormorant text-[28px] md:text-[32px] font-bold leading-[1.05] text-[#3a2414]">{t.title}</h2>
                <p className="mt-1 text-[15px] md:text-[16px] leading-[1.3] text-[#5b6b80]">{t.intro}</p>
              </div>
            </div>

            <div className="mt-5 md:mt-6 grid gap-5 lg:gap-6 lg:grid-cols-[478px_minmax(0,1fr)]">
              {/* the service on the map — before the calculation there is nothing else on it */}
              <div className="relative h-[200px] md:h-[260px] lg:h-auto lg:min-h-[330px] overflow-hidden rounded-[12px] bg-[#eef1ec]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/koszt-dojazdu/mapa-${lang}.webp`}
                  alt={t.mapAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: `${PIN.left}% ${PIN.top}%` }}
                />
                <div className="absolute" style={{ left: `${PIN.left}%`, top: `${PIN.top}%` }}>
                  <svg viewBox="0 0 24 34" aria-hidden="true" className="absolute w-[32px] h-[45px] -translate-x-1/2 -translate-y-full drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                    <path d="M12 0C5.4 0 0 5.3 0 11.9 0 20.8 12 34 12 34s12-13.2 12-22.1C24 5.3 18.6 0 12 0z" fill="#EA4335" stroke="#B31412" strokeWidth="1" />
                    <circle cx="12" cy="12" r="4.2" fill="#B31412" />
                  </svg>
                  <div className="absolute left-[18px] md:left-[22px] -top-[58px] md:-top-[68px] whitespace-nowrap rounded-[8px] bg-white px-2.5 py-1.5 md:px-3.5 md:py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.22)]">
                    <p className="text-[12px] md:text-[14px] font-semibold leading-[1.3] text-[#202124]">Omobonus</p>
                    <p className="text-[11px] md:text-[13px] leading-[1.35] text-[#202124]">Marcina Bukowskiego 174<br />52-418 Wrocław</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:justify-center">
                {/* 1. location — the main action */}
                <button
                  type="button"
                  onClick={lokalizacja}
                  disabled={lokalizuje || busy}
                  className="w-full min-h-[40px] inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#1c6e43] px-3 py-2 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#155d36] disabled:opacity-80 cursor-pointer"
                >
                  <MapPin className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
                  {lokalizuje ? t.locating : t.locate}
                </button>

                <div className="mt-2.5 flex items-start gap-2.5 px-0.5">
                  <ShieldCheck className="mt-0.5 w-[18px] h-[18px] flex-shrink-0 text-[#5b6b80]" strokeWidth={1.6} />
                  <p className="text-[12px] md:text-[12.5px] leading-[1.4] text-[#5b6b80]">{t.privacy}</p>
                </div>
                <div className="mt-3 flex items-start gap-2.5 px-0.5">
                  <Ban className="mt-0.5 w-[18px] h-[18px] flex-shrink-0 text-[#5b6b80]" strokeWidth={1.6} />
                  <p className="text-[12px] md:text-[12.5px] leading-[1.4] text-[#5b6b80]">{t.ask}</p>
                </div>

                <div className="relative mt-3">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2d3a4a]" strokeWidth={1.8} />
                  <input
                    ref={inputRef}
                    value={adres}
                    onChange={(e) => { setAdres(e.target.value); setWybor(null); setNote('hint'); if (error) setError('') }}
                    onKeyDown={(e) => {
                      if (!podp.length) return
                      if (e.key === 'ArrowDown') { e.preventDefault(); setAktywna(i => (i + 1) % podp.length) }
                      else if (e.key === 'ArrowUp') { e.preventDefault(); setAktywna(i => (i <= 0 ? podp.length - 1 : i - 1)) }
                    }}
                    placeholder={t.placeholder}
                    autoComplete="off"
                    maxLength={200}
                    aria-label={t.placeholder}
                    aria-autocomplete="list"
                    aria-expanded={podp.length > 0}
                    className="w-full h-[40px] rounded-[9px] border border-[#cfd6de] bg-white pl-9 pr-3 text-[13px] text-[#1f2933] ![-webkit-text-fill-color:#1f2933] caret-[#1f2933] placeholder:![-webkit-text-fill-color:#8592a3] placeholder:!text-[#8592a3] outline-none focus:border-[#1c6e43] focus:ring-2 focus:ring-[#1c6e43]/15"
                  />

                  {podp.length > 0 && (
                    <ul role="listbox" className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-[12px] border border-[#d5dbe2] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                      {podp.map((p, i) => (
                        <li key={p.placeId} role="option" aria-selected={i === aktywna}>
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => wybierz(p)}
                            className={`w-full flex items-start gap-3 px-4 py-2.5 text-left cursor-pointer ${i === aktywna ? 'bg-[#eef3f0]' : 'hover:bg-[#f4f6f8]'}`}
                          >
                            <MapPin className="mt-0.5 w-4 h-4 flex-shrink-0 text-[#5b6b80]" />
                            <span className="min-w-0">
                              <span className="block text-[14px] md:text-[15px] text-[#1f2933]">{p.glowny}</span>
                              {p.dodatkowy && <span className="block text-[12px] md:text-[13px] text-[#5b6b80]">{p.dodatkowy}</span>}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {error
                  ? <p className="mt-2 text-[13px] md:text-[14px] text-[#c0392b]">{error}</p>
                  : note !== 'hint' && <p className="mt-2 text-[13px] md:text-[14px] text-[#5b6b80]">{t[note]}</p>}

                {/* 3. calculation — after the address is set */}
                <button
                  type="button"
                  onClick={licz}
                  disabled={!gotowe}
                  className="mt-2.5 w-full min-h-[40px] inline-flex items-center justify-center gap-2 rounded-[9px] px-3 py-2 text-[14px] font-semibold text-white transition-colors duration-200 bg-[#1c6e43] hover:bg-[#155d36] cursor-pointer disabled:cursor-not-allowed disabled:bg-[#a6d2bb] disabled:hover:bg-[#a6d2bb]"
                >
                  <Calculator className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.8} />
                  {busy ? t.counting : t.count}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>,
    document.body,
  )
}
