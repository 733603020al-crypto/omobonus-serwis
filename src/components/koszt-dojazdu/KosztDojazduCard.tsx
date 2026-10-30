import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import { IkonaSerwis, IkonaKlient, IkonaOdleglosc, IkonaTrasa, IkonaZasady, IkonaKoszt } from './ikony'
import { fmtKm, fmtKmShort, fmtZl, fmtZlShort, obliczKosztDojazdu, type TaryfaDojazdu } from './koszt-dojazdu'
import { KosztClose } from './KosztClose'
import { WinkEmoji } from '@/components/wink-emoji'
import { serviceAccordionI18n } from '@/lib/i18n/service-accordion'

// "Koszt dojazdu" window: one frame for both states of the popup on /kontakt (address → result)
// and for the result picture in e-mails. Frame and texture = the "Kategorie urządzeń" window
// (docs/kategorie-urzadzen-standard.md); on the right — the paper of the "Formularz zgłoszeniowy" form.
// No hooks: works as a server component and inside the client popup.
// md+ (≥768): map and paper side by side with a fixed height, the same before and after the calculation;
// below md — map above the paper, height by content.

export type Lang = 'pl' | 'uk' | 'ru' | 'en'
export type KosztDojazduProps = {
  serwisAdres: string
  klientAdres: string
  metryJednaStrona: number
  // travel time one way from Google Routes, minutes (shown on the map label as in Google Maps)
  czasMin?: number
  taryfa: TaryfaDojazdu
  map: { src: string; alt: string; width: number; height: number }
  // points in % of the map IMAGE: route label (side = where the box goes), start and end of the route
  mapLabel?: { left: number; top: number; side?: 'left' | 'right' }
  mapPins?: { start: { left: number; top: number }; end: { left: number; top: number } }
  lang?: Lang
  // inside a popup: the close button calls this; without it the button just hides the window
  onClose?: () => void
}

// Muted gold of the price-list notes (service-accordion) instead of the bright #f3df9a.
const GOLD = 'text-[#cbb27c]'
// Device card of the "Kategorie urządzeń" window — frame of the map.
const CARD = 'bg-[rgba(255,255,255,0.08)] border border-[rgba(191,167,106,0.35)] rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]'

// Text on the paper — colours of the "Formularz zgłoszeniowy" form (gold is not readable on the paper).
// Standard: one dark brown for headings, labels and numbers (as on the home page paper cards),
// notes in brackets a little lighter but still well readable on the paper.
export const P = {
  title: 'text-[#3A2817]',
  label: 'text-[#3A2817]',
  text: 'text-[#3A2817]',
  note: 'text-[#4d3a26]',
  line: 'border-[rgba(70,45,25,0.45)]',
}
// Numbers — Inter, as prices in the price list.
const NUM = `font-inter ${P.text} whitespace-nowrap`

// "25,00 zł" → digits in Inter (as prices), the unit (zł, km, netto) in Cormorant as "Cena, zł" in the price list.
function Val({ text, className = '', unitClassName = '' }: { text: string; className?: string; unitClassName?: string }) {
  const i = text.indexOf(' ')
  return (
    <span className={`${NUM} ${className}`}>
      {text.slice(0, i)}
      <span className={`font-cormorant font-semibold ml-[0.3em] ${unitClassName}`}>{text.slice(i + 1)}</span>
    </span>
  )
}
// Route label drawn like the Google Maps one: white box with a corner tail pointing at the route,
// filled car (Material "directions_car"), travel time in bold and the distance in grey below.
const CAR_PATH =
  'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z'

function MapLabel({ left, top, side = 'right', km, czas }: { left: number; top: number; side?: 'left' | 'right'; km: string; czas?: string }) {
  const r = side === 'right'
  return (
    <div
      className="absolute w-0 h-0 [filter:drop-shadow(0_0_1px_rgba(60,64,67,0.45))_drop-shadow(0_1px_3px_rgba(60,64,67,0.25))]"
      style={{ left: `${left}%`, top: `${top}%` }}
    >
      {/* tail: from the route point to the box corner */}
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className={`absolute top-0 ${r ? 'left-0' : 'right-0 -scale-x-100'}`}>
        <path d="M0 0 12 6 6 12Z" fill="#fff" />
      </svg>
      {/* as in Google Maps: car + travel time in bold, the distance below in grey */}
      <div
        className={`absolute top-[8px] ${r ? 'left-[8px]' : 'right-[8px]'} rounded-[3px] bg-white px-2 py-[5px] whitespace-nowrap`}
        style={{ fontFamily: 'Roboto, Arial, sans-serif' }}
      >
        <div className="flex items-center gap-1 text-[15px] font-bold leading-[18px] text-[#202124]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#3c4043" aria-hidden="true">
            <path d={CAR_PATH} />
          </svg>
          {czas ?? km}
        </div>
        {czas && <div className="text-[12px] leading-[14px] text-[#70757a]">{km}</div>}
      </div>
    </div>
  )
}

type Pt = { left: number; top: number }
// Start and end of the route as Google Maps draws them: white dot with a dark ring, red pin.
function MapPins({ start, end }: { start: Pt; end: Pt }) {
  return (
    <>
      <span
        className="absolute h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#202124] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
        style={{ left: `${start.left}%`, top: `${start.top}%` }}
      />
      <svg
        width="26" height="37" viewBox="0 0 26 37" aria-hidden="true"
        className="absolute -translate-x-1/2 -translate-y-full [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.3))]"
        style={{ left: `${end.left}%`, top: `${end.top}%` }}
      >
        <path d="M13 .5C6.1.5.5 6 .5 12.8.5 22.1 13 36.5 13 36.5s12.5-14.4 12.5-23.7C25.5 6 19.9.5 13 .5Z" fill="#EA4335" stroke="#B31412" />
        <circle cx="13" cy="13" r="4.6" fill="#B31412" />
      </svg>
    </>
  )
}

export function Row({ icon, children, last }: { icon: ReactNode; children: ReactNode; last?: boolean }) {
  return (
    <div className={`flex items-center gap-3 py-[3px] ${last ? '' : `border-b ${P.line}`}`}>
      <span className="w-6 flex justify-center">{icon}</span>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}

function CalcRow({ name, note, value }: { name: ReactNode; note: string; value: string }) {
  return (
    <div className={`flex items-center justify-between gap-3 py-0.5 border-b ${P.line}`}>
      <div className="min-w-0">
        <div className={`font-semibold text-[15px] md:text-[16px] leading-[1.15] ${P.text}`}>{name}</div>
        <div className={`font-semibold text-[12px] md:text-[13px] leading-[1.2] ${P.note}`}>{note}</div>
      </div>
      <Val text={value} className="text-[13px] md:text-[14px]" unitClassName="text-[15px] md:text-[16px]" />
    </div>
  )
}

// Texts of the window. PL is the source; UK/RU follow it.
const T = {
  pl: {
    title: 'Koszt dojazdu', naglowek: 'Koszt odbioru (lub dostawy) urządzenia',
    serwis: 'Serwis', klient: 'Klient', km: 'km', min: 'min', close: 'Zamknij',
    odleglosc: 'Odległość w jedną stronę', trasa: 'Łączna trasa w obie strony', zasady: 'Zasady rozliczenia',
    podstawowa: 'Opłata podstawowa', podstawowaNote: (pol: string, lim: string) => `(do ${pol} od serwisu; ${lim} łącznie w obie strony)`,
    trasaNote: '(według Google Maps)', powyzej: (lim: string) => `Kilometry powyżej ${lim}`, doplata: 'Dopłata za kilometry',
    laczny: 'Łączny koszt odbioru lub dostawy', netto: 'netto',
    foot1: '*Koszt liczymy dla trasy w obie strony, ponieważ przy odbiorze lub dostawie serwisant musi dojechać do Klienta i wrócić do serwisu.',
    foot2: '**Dotyczy większości urządzeń do 30 kg, które przewiezie jeden kurier; cena w cenniku usługi, cięższe — wycena indywidualna.',
  },
  uk: {
    title: 'Вартість доїзду', naglowek: 'Вартість забору (або доставки) пристрою',
    serwis: 'Сервіс', klient: 'Клієнт', km: 'км', min: 'хв', close: 'Закрити',
    odleglosc: 'Відстань в один бік', trasa: 'Загальний маршрут в обидва боки', zasady: 'Правила розрахунку',
    podstawowa: 'Базова оплата', podstawowaNote: (pol: string, lim: string) => `(до ${pol} від сервісу; ${lim} загалом в обидва боки)`,
    trasaNote: '(за Google Maps)', powyzej: (lim: string) => `Кілометри понад ${lim}`, doplata: 'Доплата за кілометри',
    laczny: 'Загальна вартість забору або доставки', netto: 'нетто',
    foot1: '*Вартість рахуємо для маршруту в обидва боки, бо під час забору або доставки сервісант має доїхати до Клієнта і повернутися до сервісу.',
    foot2: '**Стосується більшості пристроїв до 30 кг, які перевезе один кур’єр; ціна — у прайсі послуги, важчі — індивідуальна оцінка.',
  },
  ru: {
    title: 'Стоимость выезда', naglowek: 'Стоимость забора (или доставки) устройства',
    serwis: 'Сервис', klient: 'Клиент', km: 'км', min: 'мин', close: 'Закрыть',
    odleglosc: 'Расстояние в одну сторону', trasa: 'Общий маршрут в обе стороны', zasady: 'Правила расчёта',
    podstawowa: 'Базовая оплата', podstawowaNote: (pol: string, lim: string) => `(до ${pol} от сервиса; ${lim} всего в обе стороны)`,
    trasaNote: '(по Google Maps)', powyzej: (lim: string) => `Километры сверх ${lim}`, doplata: 'Доплата за километры',
    laczny: 'Общая стоимость забора или доставки', netto: 'нетто',
    foot1: '*Стоимость считаем для маршрута в обе стороны, так как при заборе или доставке сервисант должен доехать до Клиента и вернуться в сервис.',
    foot2: '**Касается большинства устройств до 30 кг, которые перевезёт один курьер; цена — в прайсе услуги, более тяжёлые — индивидуальная оценка.',
  },
  en: {
    title: 'Travel cost', naglowek: 'Device pickup (or delivery) cost',
    serwis: 'Service', klient: 'Customer', km: 'km', min: 'min', close: 'Close',
    odleglosc: 'One-way distance', trasa: 'Total round trip', zasady: 'How it is charged',
    podstawowa: 'Base fee', podstawowaNote: (pol: string, lim: string) => `(up to ${pol} from the service; ${lim} round trip in total)`,
    trasaNote: '(according to Google Maps)', powyzej: (lim: string) => `Kilometres above ${lim}`, doplata: 'Mileage surcharge',
    laczny: 'Total pickup or delivery cost', netto: 'net',
    foot1: '*The cost is calculated for the round trip, because for a pickup or delivery the technician has to drive to the customer and back to the service.',
    foot2: '**Applies to most devices up to 30 kg that one courier can carry; the price is in the service price list, heavier ones are quoted individually.',
  },
}
export const kosztDojazduTitle = (lang: Lang) => T[lang].title

// Height of the map + paper row on md+ — the same in both states (fits the longest UK/RU result).
const ROW_H = 'md:h-[660px] lg:h-[495px]'

// Common window: frame, close button, "DARMOWY DOJAZD" banner, map on the left, paper with the logo
// and the heading on the right, footnotes under them. The footnotes are shown only with the result;
// before it they keep their place invisibly on md+, so the window does not change its size.
export function KosztOkno({ lang = 'pl', onClose, mapa, children, przypisy }: {
  lang?: Lang; onClose?: () => void; mapa: ReactNode; children: ReactNode; przypisy: boolean
}) {
  const t = T[lang]
  const promo = serviceAccordionI18n[lang]
  return (
    <div data-koszt-dojazdu className="mx-auto w-full max-w-[900px] lg:max-w-[1300px]">
      {/* Window frame of "Kategorie urządzeń" */}
      <div
        className="relative border-2 border-[#bfa76a]/80 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_16px_rgba(191,167,106,0.42),0_0_32px_rgba(191,167,106,0.25)] text-[#f8eacd]"
        style={{ backgroundImage: 'var(--bg-parchment)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 rounded-lg bg-black/55" />
        <KosztClose label={t.close} onClose={onClose} />
        <div className="relative p-4 md:px-6 lg:px-3 md:py-4 lg:pb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_540px] gap-3">
          {/* "DARMOWY DOJAZD" banner — the same text and animated emoji as in the price list's Dojazd section */}
          <div className="md:col-span-2 -mt-1 px-7 text-center font-cormorant font-semibold">
            <div className="text-[18px] md:text-[20px] leading-[1.3] text-[rgba(255,255,245,0.97)] [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
              {promo.dojazdPromoTitle} <WinkEmoji variant="thinking" />
            </div>
            <p className="mt-0.5 text-[15px] md:text-[16px] leading-[1.3] text-[#dcc48f] [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">{promo.dojazdNote.join(' ')}</p>
          </div>

          <div className={`${CARD} !shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_24px_22px_rgba(0,0,0,0.5),0_8px_10px_rgba(0,0,0,0.35)] relative overflow-hidden ${ROW_H}`}>{mapa}</div>

          {/* Paper of the "Formularz zgłoszeniowy" form, inner padding keeps the text off the torn edges and the bent corners */}
          <div className={`relative ${ROW_H}`}>
            <picture>
              <source media="(max-width: 767px)" srcSet="/images/contact-form-parchment-mobile.webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/contact-form-parchment.webp"
                alt=""
                aria-hidden="true"
                draggable={false}
                className="absolute inset-x-0 top-0 w-full h-full lg:h-[calc(100%+20px)] object-fill contact-form-parchment-shadow pointer-events-none select-none"
              />
            </picture>
            <div className="relative h-full flex flex-col pl-5 pr-7 pt-5 pb-7 md:pl-6 md:pr-9 md:pt-6 md:pb-12 font-cormorant font-medium">
              <div className="flex items-center gap-3">
                <Image src="/icons/app-icon-192.png" alt="Omobonus" width={192} height={192} unoptimized className="w-[48px] h-[48px] md:w-[54px] md:h-[54px] flex-shrink-0 rounded-[10px] md:rounded-[12px]" />
                <h3 className={`text-[22px] ${lang === 'pl' ? 'md:text-[25px]' : 'md:text-[22px]'} font-semibold leading-[1.15] tracking-wide ${P.title}`}>{t.naglowek}</h3>
              </div>
              {children}
            </div>
          </div>

          {/* Footnotes inside the window, full width */}
          <p
            aria-hidden={!przypisy}
            className={`relative z-[1] md:col-span-2 -mt-1.5 text-center text-[12px] md:text-[13px] font-cormorant leading-[1.3] ${GOLD} ${przypisy ? '' : 'invisible max-md:hidden lg:hidden'}`}
          >
            {t.foot1}
            <br />
            {t.foot2}
          </p>
        </div>
      </div>
    </div>
  )
}

// SERWIS row — the same in both states.
export function SerwisRow({ lang = 'pl', adres }: { lang?: Lang; adres: string }) {
  const t = T[lang]
  return (
    <Row icon={<IkonaSerwis size={24} />}>
      <div className="font-cormorant font-semibold text-[18px] md:text-[20px] leading-[1.15] text-[#3A2817]">
        Omobonus {t.serwis.toLowerCase()}
      </div>
      <div className="font-cormorant font-medium text-[15px] md:text-[16px] leading-[1.3] text-[#3A2817]">{adres}</div>
    </Row>
  )
}
export const klientLabel = (lang: Lang) => T[lang].klient

export function KosztDojazduCard({ serwisAdres, klientAdres, metryJednaStrona, taryfa, map, mapLabel, mapPins, czasMin, lang = 'pl', onClose }: KosztDojazduProps) {
  const t = T[lang]
  const k = obliczKosztDojazdu(metryJednaStrona, taryfa)
  // "9,9 km" → "9,9 км" for UK/RU
  const km = (n: number) => fmtKm(n).replace(/km$/, t.km)
  const kmS = (n: number) => fmtKmShort(n).replace(/km$/, t.km)
  const limit = kmS(taryfa.limitKm)

  const mapa = (
    <>
      {/* Map: real Google Static Maps image with its attribution, not redrawn */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={map.src} alt={map.alt} width={map.width} height={map.height} className="block w-full h-auto md:absolute md:inset-0 md:h-full object-cover" />
      {/* Layer with exactly the image's area (also when it is cropped by object-cover), so % points hit the route */}
      <div className="absolute inset-0 md:[container-type:size]">
        <div
          className="absolute inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[max(100cqw,calc(100cqh*var(--ar)))] md:aspect-[var(--ar)]"
          style={{ '--ar': `${map.width} / ${map.height}` } as CSSProperties}
        >
          {mapPins && <MapPins {...mapPins} />}
          {mapLabel && <MapLabel {...mapLabel} km={km(k.kmJednaStrona)} czas={czasMin ? `${czasMin} ${t.min}` : undefined} />}
        </div>
      </div>
    </>
  )

  return (
    <KosztOkno lang={lang} onClose={onClose} mapa={mapa} przypisy>
      <div className="mt-2">
        <SerwisRow lang={lang} adres={serwisAdres} />
        {/* one line: "Klient (ul. Saperów 45, 53-151 Wrocław)" */}
        <Row icon={<IkonaKlient size={24} />}>
          <div className="font-cormorant leading-[1.2] text-[#3A2817]">
            <span className="font-semibold text-[18px] md:text-[20px]">{t.klient}</span>{' '}
            <span className="font-medium text-[15px] md:text-[16px]">({klientAdres})</span>
          </div>
        </Row>
        <Row icon={<IkonaOdleglosc size={24} />}>
          <div className="flex items-center justify-between gap-3">
            <span className={`font-semibold text-[15px] md:text-[16px] ${P.label}`}>{t.odleglosc}</span>
            <Val text={km(k.kmJednaStrona)} className="text-[13px] md:text-[14px] font-medium" unitClassName="text-[15px] md:text-[16px]" />
          </div>
        </Row>
        <Row icon={<IkonaTrasa size={24} />}>
          <div className="flex items-center justify-between gap-3">
            <span className={`font-semibold text-[15px] md:text-[16px] ${P.label}`}>{t.trasa}<sup className="ml-0.5 text-[0.75em]">*</sup></span>
            <Val text={km(k.kmObieStrony)} className="text-[13px] md:text-[14px] font-medium" unitClassName="text-[15px] md:text-[16px]" />
          </div>
        </Row>

        <Row icon={<IkonaZasady size={24} />} last>
          <span className={`font-semibold text-[17px] md:text-[18px] ${P.label}`}>{t.zasady}</span>
        </Row>
        {/* calculation rows start under the "Zasady rozliczenia" text (icon 24px + gap 12px) */}
        <div className={`ml-9 border-t ${P.line}`}>
          <CalcRow
            name={<>{t.podstawowa}<sup className="ml-0.5 text-[0.75em]">**</sup></>}
            note={t.podstawowaNote(kmS(taryfa.limitKm / 2), limit)}
            value={fmtZl(taryfa.baza)}
          />
          <CalcRow name={t.trasa} note={t.trasaNote} value={km(k.kmObieStrony)} />
          <CalcRow name={t.powyzej(limit)} note={`(${km(k.kmObieStrony)} − ${limit})`} value={km(k.kmPonadLimit)} />
          <CalcRow name={t.doplata} note={`(${km(k.kmPonadLimit)} × ${fmtZlShort(taryfa.stawka)})`} value={fmtZl(k.doplata)} />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-x-3 gap-y-0 py-1 lg:pr-6">
          <span className="flex items-center gap-3 min-w-0">
            <span className="w-6 flex justify-center"><IkonaKoszt size={24} /></span>
            <span className={`font-semibold text-[17px] md:text-[18px] leading-[1.2] ${P.title}`}>{t.laczny}</span>
          </span>
          <Val text={`${fmtZl(k.koszt)} ${t.netto}`} className="ml-auto text-[16px] md:text-[17px] font-medium" unitClassName="text-[17px] md:text-[18px]" />
        </div>
      </div>
    </KosztOkno>
  )
}
