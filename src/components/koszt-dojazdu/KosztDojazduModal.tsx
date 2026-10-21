'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { LocateFixed } from 'lucide-react'
import { KosztDojazduCard } from './KosztDojazduCard'
import { KosztClose } from './KosztClose'
import { TARYFA_STANDARD, fmtZlShort } from './koszt-dojazdu'

// Popup on /kontakt: the visitor types an address (or shares the location after pressing the button —
// the browser asks only then), the server asks Google for the route, and the "Koszt dojazdu" window is shown.
type Lang = 'pl' | 'uk' | 'ru'
type Wynik = {
  klientAdres: string; metry: number; czasMin: number
  map: { src: string; width: number; height: number }
  mapLabel: { left: number; top: number; side: 'left' | 'right' }
  mapPins: { start: { left: number; top: number }; end: { left: number; top: number } }
}

const SERWIS = 'ul. Marcina Bukowskiego 174, 52-418 Wrocław'
const t0 = TARYFA_STANDARD
const T = {
  pl: {
    title: 'Koszt dojazdu', close: 'Zamknij',
    intro: 'Wpisz adres, a policzymy koszt odbioru lub dostawy urządzenia według trasy Google Maps.',
    placeholder: 'Ulica, numer, miasto', count: 'Oblicz koszt', counting: 'Liczymy…', locate: 'Użyj mojej lokalizacji',
    rule: `Stawka: ${fmtZlShort(t0.baza)} netto za pierwsze ${t0.limitKm} km trasy (tam i z powrotem), potem ${fmtZlShort(t0.stawka)} netto za każdy km.`,
    privacy: 'Lokalizacja służy tylko do tego wyliczenia i nie jest zapisywana.',
    change: 'Zmień adres', alt: 'Trasa z serwisu Omobonus do Klienta według Google Maps',
    err: {
      not_found: 'Nie znaleźliśmy tego adresu. Sprawdź ulicę, numer i miasto.',
      no_route: 'Google nie wyznaczył trasy do tego adresu. Zadzwoń, a policzymy koszt.',
      geo: 'Nie udało się ustalić lokalizacji. Wpisz adres ręcznie.',
      busy: 'Za dużo zapytań. Spróbuj za chwilę.',
      other: 'Nie udało się policzyć trasy. Spróbuj ponownie lub zadzwoń.',
    },
  },
  uk: {
    title: 'Вартість доїзду', close: 'Закрити',
    intro: 'Введіть адресу, і ми порахуємо вартість забору або доставки пристрою за маршрутом Google Maps.',
    placeholder: 'Вулиця, номер, місто', count: 'Розрахувати', counting: 'Рахуємо…', locate: 'Використати моє місцезнаходження',
    rule: `Тариф: ${fmtZlShort(t0.baza)} нетто за перші ${t0.limitKm} км маршруту (туди й назад), далі ${fmtZlShort(t0.stawka)} нетто за кожен км.`,
    privacy: 'Місцезнаходження використовується лише для цього розрахунку і не зберігається.',
    change: 'Змінити адресу', alt: 'Маршрут від сервісу Omobonus до Клієнта за Google Maps',
    err: {
      not_found: 'Не знайшли цю адресу. Перевірте вулицю, номер і місто.',
      no_route: 'Google не проклав маршрут до цієї адреси. Зателефонуйте, і ми порахуємо вартість.',
      geo: 'Не вдалося визначити місцезнаходження. Введіть адресу вручну.',
      busy: 'Забагато запитів. Спробуйте за хвилину.',
      other: 'Не вдалося порахувати маршрут. Спробуйте ще раз або зателефонуйте.',
    },
  },
  ru: {
    title: 'Стоимость выезда', close: 'Закрыть',
    intro: 'Введите адрес, и мы посчитаем стоимость забора или доставки устройства по маршруту Google Maps.',
    placeholder: 'Улица, номер, город', count: 'Рассчитать', counting: 'Считаем…', locate: 'Использовать моё местоположение',
    rule: `Тариф: ${fmtZlShort(t0.baza)} нетто за первые ${t0.limitKm} км маршрута (туда и обратно), дальше ${fmtZlShort(t0.stawka)} нетто за каждый км.`,
    privacy: 'Местоположение используется только для этого расчёта и не сохраняется.',
    change: 'Изменить адрес', alt: 'Маршрут от сервиса Omobonus к Клиенту по Google Maps',
    err: {
      not_found: 'Не нашли этот адрес. Проверьте улицу, номер и город.',
      no_route: 'Google не построил маршрут к этому адресу. Позвоните, и мы посчитаем стоимость.',
      geo: 'Не удалось определить местоположение. Введите адрес вручную.',
      busy: 'Слишком много запросов. Попробуйте через минуту.',
      other: 'Не удалось посчитать маршрут. Попробуйте ещё раз или позвоните.',
    },
  },
}

const GOLD = 'text-[#cbb27c]'
const TEXT = 'text-[rgba(255,255,245,0.85)]'

export default function KosztDojazduModal({ lang = 'pl', onClose }: { lang?: Lang; onClose: () => void }) {
  const t = T[lang]
  const [adres, setAdres] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [wynik, setWynik] = useState<Wynik | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  useEffect(() => { if (!wynik) inputRef.current?.focus() }, [wynik])

  async function licz(q: { adres?: string; lat?: number; lng?: number }) {
    setBusy(true); setError('')
    try {
      const res = await fetch('/api/koszt-dojazdu', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...q, lang }) })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const code = data.error === 'not_found' || data.error === 'no_route' ? data.error : res.status === 429 ? 'busy' : 'other'
        setError(t.err[code as keyof typeof t.err]); return
      }
      setAdres(data.klientAdres)
      setWynik(data)
    } catch {
      setError(t.err.other)
    } finally {
      setBusy(false)
    }
  }

  function lokalizacja() {
    if (!navigator.geolocation) { setError(t.err.geo); return }
    setBusy(true); setError('')
    navigator.geolocation.getCurrentPosition(
      (p) => licz({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => { setBusy(false); setError(t.err.geo); inputRef.current?.focus() },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 300000 },
    )
  }

  return createPortal(
    <div
      role="dialog" aria-modal="true" aria-label={t.title}
      className="fixed inset-0 z-[200] overflow-y-auto bg-black/70 backdrop-blur-[2px] p-3 md:p-6 flex items-start md:items-center justify-center"
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
              onClick={() => { setWynik(null); setError('') }}
              className="font-cormorant text-[16px] font-semibold text-[#f3df9a] underline underline-offset-4 decoration-[rgba(243,223,154,0.5)] hover:decoration-[#f3df9a] cursor-pointer"
            >
              {t.change}
            </button>
          </div>
        </div>
      ) : (
        <div
          className="relative my-auto w-full max-w-[520px] border-2 border-[rgba(200,169,107,0.5)] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          style={{ backgroundImage: 'var(--bg-parchment)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 rounded-lg bg-black/55" />
          <KosztClose label={t.close} onClose={onClose} />
          <form
            className="relative p-5 md:p-6 font-cormorant"
            onSubmit={(e) => { e.preventDefault(); if (adres.trim().length >= 3 && !busy) licz({ adres }) }}
          >
            <div className="flex items-center gap-3 pr-6">
              <Image src="/images/Logo_Omobonus.webp" alt="Omobonus" width={128} height={128} unoptimized className="w-[40px] h-[40px] md:w-[42px] md:h-[42px]" />
              <h2 className={`text-[22px] md:text-[26px] font-semibold tracking-wide ${TEXT}`}>{t.title}</h2>
            </div>
            <p className={`mt-2 text-[16px] md:text-[17px] leading-[1.3] ${TEXT}`}>{t.intro}</p>

            <input
              ref={inputRef}
              value={adres}
              onChange={(e) => { setAdres(e.target.value); if (error) setError('') }}
              placeholder={t.placeholder}
              autoComplete="street-address"
              maxLength={200}
              aria-label={t.placeholder}
              className="mt-4 w-full rounded-lg border border-[rgba(191,167,106,0.45)] bg-black/40 px-3.5 py-3 font-inter text-[15px] text-white ![-webkit-text-fill-color:#fff] caret-white placeholder:![-webkit-text-fill-color:rgba(255,255,245,0.45)] placeholder:!text-[rgba(255,255,245,0.5)] focus:placeholder:!text-[rgba(255,255,245,0.35)] outline-none focus:border-[rgba(230,204,130,0.9)]"
            />
            {error && <p className="mt-1.5 font-inter text-[13px] text-red-400">{error}</p>}

            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <button
                type="submit"
                disabled={busy || adres.trim().length < 3}
                className="flex-1 rounded-full bg-[#1c6e43] px-5 py-3 font-sans text-[15px] font-semibold text-white transition-all duration-300 hover:bg-[#155d36] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {busy ? t.counting : t.count}
              </button>
              <button
                type="button"
                onClick={lokalizacja}
                disabled={busy}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(191,167,106,0.6)] px-4 py-3 font-sans text-[14px] font-semibold text-[#f3df9a] transition-colors hover:bg-white/5 disabled:opacity-50 cursor-pointer"
              >
                <LocateFixed className="w-4 h-4 flex-shrink-0" />
                {t.locate}
              </button>
            </div>

            <p className={`mt-4 text-[14px] md:text-[15px] leading-[1.3] ${GOLD}`}>{t.rule}</p>
            <p className="mt-1 font-inter text-[12px] text-white/45">{t.privacy}</p>
          </form>
        </div>
      )}
    </div>,
    document.body,
  )
}
