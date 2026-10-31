import '@/app/styles/accordion.css'
import ServiceAccordion from '@/components/service-accordion'
import { serviceAccordionI18n } from '@/lib/i18n/service-accordion'
import { getDisplayDuration, getDisplayPrice, getServiceDisplayPricing } from '@/lib/services-pricing'
import { services, type PricingSubcategory } from '@/lib/services-data'
import { servicesUk } from '@/lib/services-data-uk'
import { servicesRu } from '@/lib/services-data-ru'
import { servicesEn } from '@/lib/services-data-en'
import { SERVICE_CATEGORIES } from '@/config/service-categories'
import { QUESTIONS_TEXT } from '../i18n-questions'
import { STAMPS } from '../i18n-process'

type Locale = 'pl' | 'uk' | 'ru' | 'en'
const LOCALIZED = { pl: services, uk: servicesUk, ru: servicesRu, en: servicesEn }

const PRICE_SUB_ID = 'koszt-diagnozy'
// Ikona-zaślepka wszystkich pytań (do wymiany na własne grafiki).
const QUESTION_ICON = '/images/accordion-icon-diagnoza.webp'
// Zdjęcia kart w pytaniach (teksty — w i18n-questions.ts).
const SHIPPING_IMAGES: [string, [number, number]][] = [['/images/serwis-wysylkowy/wysylka-paczkomat-v1.avif', [720, 478]], ['/images/serwis-wysylkowy/wysylka-kurier-v1.avif', [720, 389]]]
const PACKING_IMAGES: [string, [number, number]][] = [['/images/serwis-wysylkowy/pakowanie-oryginalne-v1.avif', [720, 458]], ['/images/serwis-wysylkowy/pakowanie-karton-v2.avif', [720, 490]]]
const KARTKA_IMG = '/images/serwis-wysylkowy/kartka-dane-v1.avif'

// Cena i czas pełnej diagnozy przy rezygnacji — ten sam wiersz i to samo źródło cen co na stronach usług.
// Wiersz „rezygnacja” znajdujemy w polskich danych, a w innych językach bierzemy ten sam numer (dane są równoległe).
function rejectedQuoteRows(locale: Locale, devices: Record<string, string>) {
  // Kolejność jak w górnym menu „Usługi”.
  const menuOrder = SERVICE_CATEGORIES.flatMap((c) => [...c.items, ...(c.subgroup?.items ?? [])]).map((i) => i.href.split('/').pop() ?? '')
  const rank = (slug: string) => { const i = menuOrder.indexOf(slug); return i < 0 ? menuOrder.length : i }
  const localized = LOCALIZED[locale]
  return services.flatMap((s) => {
    const diagnoza = s.pricingSections.find((sec) => sec.id === 'diagnoza')
    const idx = diagnoza?.items.findIndex((it) => /rezygn/i.test(it.service)) ?? -1
    if (idx < 0) return []
    const local = localized.find((l) => l.slug === s.slug)
    const localDiagnoza = local?.pricingSections.find((sec) => sec.id === 'diagnoza')
    if (!local || localDiagnoza?.items.length !== diagnoza?.items.length) return []
    const path = `diagnoza.items.${idx}`
    return [{ slug: s.slug, name: devices[s.slug] ?? local.title, price: getDisplayPrice(s.slug, path, locale), duration: getDisplayDuration(s.slug, path, locale) }]
  }).sort((a, b) => rank(a.slug) - rank(b.slug))
}

export function BasicQuestions({ locale = 'pl' }: { locale?: Locale } = {}) {
  const q = QUESTIONS_TEXT[locale]
  const stamps = STAMPS[locale]
  const source = LOCALIZED[locale].find((s) => s.slug === 'serwis-drukarek-atramentowych'); if (!source) return null
  const rows = rejectedQuoteRows(locale, q.devices)
  const priceSub: PricingSubcategory = {
    id: PRICE_SUB_ID,
    title: q.priceTitle,
    icon: '/images/serwis-wysylkowy/diagnoza-wycena-v1.avif',
    diagnozaBanner: true,
    columns: q.priceColumns,
    items: rows.map((r) => ({ service: r.name, tooltipSlug: r.slug })),
  }
  const rejectSub: PricingSubcategory = { id: 'nie-akceptuje-wyceny', title: q.reject.title, icon: stamps.nie, intro: q.reject.intro, items: [] }
  const acceptSub: PricingSubcategory = { id: 'akceptuje-naprawe', title: q.accept.title, icon: stamps.tak, intro: q.accept.intro, items: [] }
  // Nowe pytanie — wstawiane zaraz po „Jak prawidłowo zapakować sprzęt?” (naprawy-skaner).
  const paczkaSub: PricingSubcategory = {
    id: 'co-wlozyc-do-paczki',
    title: q.parcel.title,
    icon: KARTKA_IMG,
    items: [],
    infoCards: [{ ...q.parcel.card, image: KARTKA_IMG, imageSize: [720, 510] }],
    noteBanner: q.parcel.noteBanner,
    intro: q.parcel.intro,
  }
  // Nowe pytanie — zaraz po „Czy moje dane są bezpieczne?” (naprawy-software).
  const gwarancjaSub: PricingSubcategory = { id: 'gwarancja-po-naprawie', title: q.warranty.title, icon: stamps.gwarancja, items: [], intro: q.warranty.intro }
  // Pytania już ustalone przez właściciela (tytuł/ikona) — reszta treści na razie z szablonu.
  const overrides: Record<string, Partial<PricingSubcategory>> = {
    'naprawy-glowica': {
      title: q.shipping.title, icon: '/images/serwis-wysylkowy/modal-naprawa-v2.avif', items: [], noteBanner: q.shipping.noteBanner,
      infoCards: q.shipping.cards.map((c, i) => ({ ...c, image: SHIPPING_IMAGES[i][0], imageSize: SHIPPING_IMAGES[i][1] })),
    },
    'naprawy-skaner': {
      title: q.packing.title, icon: '/images/serwis-wysylkowy/modal-wysylka-v1.avif', items: [],
      infoCards: q.packing.cards.map((c, i) => ({ ...c, image: PACKING_IMAGES[i][0], imageSize: PACKING_IMAGES[i][1] })),
    },
    'naprawy-elektronika': { title: q.duration.title, icon: '/images/serwis-wysylkowy/ile-to-wszystko-potrwa-v1.avif', items: [], noteBanner: q.duration.noteBanner, intro: q.duration.intro },
    'naprawy-software': { title: q.data.title, icon: '/images/serwis-wysylkowy/czy-dane-bezpieczne-v1.avif', items: [], noteBanner: q.data.noteBanner, intro: q.data.intro },
    'naprawy-uklad-tuszu': { title: q.label.title, icon: '/images/serwis-wysylkowy/etykieta-v2.avif', intro: q.label.intro, items: [] },
  }
  const pricing = getServiceDisplayPricing(source.slug, source.pricingSections, locale)
  // Pozostałe pytania (na razie treść z drukarek): nowe id, żeby wszędzie była ikona-zaślepka (lupa); ceny przepisane pod nowe id.
  const placeholderSubs = (source.pricingSections.find((s) => s.id === 'naprawy')?.subcategories ?? []).slice(2).flatMap((sub) => {
    const id = `pytanie-${sub.id}`
    sub.items.forEach((_, i) => { pricing.price[`naprawy.${id}.${i}`] = pricing.price[`naprawy.${sub.id}.${i}`]; pricing.duration[`naprawy.${id}.${i}`] = pricing.duration[`naprawy.${sub.id}.${i}`] })
    const item = { ...sub, id, icon: QUESTION_ICON, ...overrides[sub.id] }
    return sub.id === 'naprawy-skaner' ? [item, paczkaSub] : sub.id === 'naprawy-software' ? [item, gwarancjaSub] : [item]
  })
  const service = { ...source, pricingSections: source.pricingSections.filter((s) => s.id === 'naprawy').map((s) => ({ ...s, title: q.faqTitle, icon: '/images/accordion-icon-faq.webp', mobileTitle: undefined, mobileOpenTitle: undefined, subcategories: [priceSub, acceptSub, rejectSub, ...placeholderSubs] })) }
  rows.forEach((r, i) => { pricing.price[`naprawy.${PRICE_SUB_ID}.${i}`] = r.price; pricing.duration[`naprawy.${PRICE_SUB_ID}.${i}`] = r.duration })
  return (<section className="questions-accordion relative z-10 mx-auto max-w-7xl px-4 md:px-6"><ServiceAccordion service={service} locale={locale} t={{ ...serviceAccordionI18n[locale], viewPriceList: q.viewDetails }} pricing={pricing} defaultOpenSection="naprawy" /></section>)
}
