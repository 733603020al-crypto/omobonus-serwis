'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Ban, Calculator, Loader2, MapPin, ShieldCheck } from 'lucide-react'
import { KosztDojazduCard, KosztOkno, P, Row, SerwisRow, klientLabel } from './KosztDojazduCard'
import { IkonaKlient } from './ikony'
import { TARYFA_STANDARD } from './koszt-dojazdu'
import { lora } from '@/components/sections/contact-font'

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
    adresLabel: 'Adres',
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
    adresLabel: 'Адреса',
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
    adresLabel: 'Адрес',
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


  const mapa = (
    <>
      {/* the service on the map — before the calculation there is nothing else on it */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/koszt-dojazdu/mapa-${lang}.webp`}
        alt={t.mapAlt}
        className="block w-full h-[240px] md:absolute md:inset-0 md:h-full object-cover"
        style={{ objectPosition: `${PIN.left}% ${PIN.top}%` }}
      />
      <div className="absolute" style={{ left: `${PIN.left}%`, top: `${PIN.top}%` }}>
        <svg viewBox="0 0 24 34" aria-hidden="true" className="absolute w-[32px] h-[45px] md:w-[40px] md:h-[56px] -translate-x-1/2 -translate-y-full drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
          <path d="M12 0C5.4 0 0 5.3 0 11.9 0 20.8 12 34 12 34s12-13.2 12-22.1C24 5.3 18.6 0 12 0z" fill="#EA4335" stroke="#B31412" strokeWidth="1" />
          <circle cx="12" cy="12" r="4.2" fill="#B31412" />
        </svg>
        <div className="absolute left-[18px] md:left-[28px] -top-[58px] md:-top-[78px] whitespace-nowrap rounded-[8px] bg-white px-2.5 py-1.5 md:px-4 md:py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.22)] font-inter">
          <p className="text-[12px] md:text-[17px] font-semibold leading-[1.3] text-[#202124]">Omobonus</p>
          <p className="text-[11px] md:text-[15.5px] leading-[1.35] text-[#202124]">Marcina Bukowskiego 174<br />52-418 Wrocław</p>
        </div>
      </div>
    </>
  )

  return createPortal(
    <div
      role="dialog" aria-modal="true" aria-label={t.title}
      className={`${lora.variable} fixed inset-0 z-[200] overflow-y-auto p-3 md:p-6 flex items-start md:items-center justify-center`}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-[900px] lg:max-w-[1300px] my-auto md:[zoom:0.8] lg:[zoom:0.88]">
        {/* one window, two states: the address → the result in the same frame and size */}
        {wynik ? (
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
        ) : (
          <KosztOkno lang={lang} onClose={onClose} mapa={mapa} przypisy={false}>
            <form
              className="mt-2 flex flex-col"
              onSubmit={(e) => { e.preventDefault(); if (wybor) licz(); else zatwierdz() }}
            >
              <SerwisRow lang={lang} adres={SERWIS} />
              <Row icon={<IkonaKlient size={24} />} last>
                <div className="font-cormorant font-semibold text-[18px] md:text-[20px] leading-[1.15] text-[#3A2817]">{klientLabel(lang)}</div>
              </Row>

              {/* 1. location — the main action (the browser asks only after this click) */}
              <button
                type="button"
                onClick={lokalizacja}
                disabled={lokalizuje || busy}
                className="mt-2 w-full md:w-auto md:min-w-[280px] md:mx-auto min-h-[40px] flex items-center justify-center gap-2 rounded-[9px] bg-[#1c6e43] px-3 md:px-6 py-2 font-inter text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#155d36] disabled:opacity-80 cursor-pointer"
              >
                {lokalizuje
                  ? <Loader2 className="w-[18px] h-[18px] flex-shrink-0 animate-spin" />
                  : <MapPin className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />}
                {lokalizuje ? t.locating : t.locate}
              </button>

              <div className="mt-2.5 flex items-start gap-2.5">
                <ShieldCheck className="mt-0 w-[21px] h-[21px] flex-shrink-0 text-[#3a2e24]" strokeWidth={1.6} />
                <p className={`font-lora text-[14px] md:text-[15px] font-medium leading-[1.35] text-[#3a2e24]`}>{t.privacy}</p>
              </div>
              <div className="mt-2.5 flex items-start gap-2.5">
                <Ban className="mt-0 w-[21px] h-[21px] flex-shrink-0 text-[#3a2e24]" strokeWidth={1.6} />
                <p className={`font-lora text-[14px] md:text-[15px] font-medium leading-[1.35] text-[#3a2e24]`}>{t.ask}</p>
              </div>

              {/* 2. address typed by hand */}
              <label htmlFor="koszt-adres" className={`block mt-3 mb-[5px] font-cormorant font-bold text-[18px] md:text-[19px] leading-[1.3] tracking-[0.01em] ${P.text}`}>{t.adresLabel}</label>
              <div className="relative">
                <input
                  id="koszt-adres"
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
                  aria-autocomplete="list"
                  aria-expanded={podp.length > 0}
                  className={`w-full h-[44px] !bg-transparent border border-[rgba(70,45,25,0.75)] rounded-sm px-4 ${P.text} text-[16px] md:text-[17px] font-lora font-normal placeholder:text-[#6b5940] placeholder:![-webkit-text-fill-color:#6b5940] focus:outline-none hover:border-[rgba(70,45,25,0.95)] hover:bg-[rgba(70,45,25,0.05)] focus:border-[rgba(70,45,25,0.95)] focus:bg-[rgba(70,45,25,0.05)] focus:shadow-[0_0_4px_rgba(70,45,25,0.3)] transition-all duration-250`}
                />

                {podp.length > 0 && (
                  <ul role="listbox" className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-[12px] border border-[#d5dbe2] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] font-inter">
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
                ? <p className="mt-1.5 font-lora text-[13px] md:text-[14px] text-red-600">{error}</p>
                : (lokalizuje || note !== 'hint') && <p className={`mt-1.5 font-lora text-[13px] md:text-[14px] ${P.note}`}>{lokalizuje ? t.locating : t[note as 'confirm' | 'geo']}</p>}

              {/* 3. calculation — after the address is set */}
              <button
                type="button"
                onClick={licz}
                disabled={!gotowe}
                className="mt-3 w-full md:w-auto md:min-w-[280px] md:mx-auto min-h-[40px] flex items-center justify-center gap-2 rounded-[9px] px-3 md:px-6 py-2 font-inter text-[14px] font-semibold text-white transition-colors duration-200 bg-[#1c6e43] hover:bg-[#155d36] cursor-pointer disabled:cursor-not-allowed disabled:bg-[#a6d2bb] disabled:hover:bg-[#a6d2bb]"
              >
                <Calculator className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.8} />
                {busy ? t.counting : t.count}
              </button>
            </form>
          </KosztOkno>
        )}
      </div>
    </div>,
    document.body,
  )
}
