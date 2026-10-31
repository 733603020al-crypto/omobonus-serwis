// Выбор страны в поле телефона переключает язык сайта (правило — поле lang в countries.ts).
// Смена языка = другой корневой layout, то есть полная перезагрузка страницы, поэтому
// введённое во всех формах страницы сохраняется в sessionStorage и возвращается после неё.

const DRAFT_KEY = 'omobonus-lang-switch-draft'
const PREFIXES: Record<string, string> = { uk: '/uk', ru: '/ru', en: '/en' }

export type SiteLang = 'pl' | 'uk' | 'ru' | 'en'

const sources = new Map<string, () => unknown>()
const beforeLeave = new Map<string, () => Promise<void>>()

/** Асинхронное действие перед уходом (например, сохранить файлы); отказ — приведёт к флагу «файлы потеряны». */
export function registerBeforeLeave(ns: string, run: () => Promise<void>): () => void {
  beforeLeave.set(ns, run)
  return () => { beforeLeave.delete(ns) }
}

export const FILES_LOST_TEXT: Record<SiteLang, string> = {
  pl: 'Pliki trzeba załączyć ponownie.',
  uk: 'Файли потрібно прикріпити знову.',
  ru: 'Файлы нужно прикрепить заново.',
  en: 'Please attach the files again.',
}

/** true, если при смене языка файлы сохранить не удалось. */
export function langSwitchFilesLost(): boolean {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY)
    return !!raw && JSON.parse(raw).filesLost === true
  } catch {
    return false
  }
}

/** Форма сообщает, что отдавать при смене языка; возвращает функцию отмены. */
export function registerDraftSource(ns: string, get: () => unknown): () => void {
  sources.set(ns, get)
  return () => { sources.delete(ns) }
}

function stripPrefix(pathname: string): string {
  for (const prefix of Object.values(PREFIXES)) {
    if (pathname === prefix) return '/'
    if (pathname.startsWith(prefix + '/')) return pathname.slice(prefix.length)
  }
  return pathname
}

/** Сохраняет введённое и уходит на нужную языковую версию; false — язык тот же, ничего не делали. */
export function switchLocaleForCountry(target: SiteLang, current: SiteLang): boolean {
  if (typeof window === 'undefined' || target === current) return false
  const draft: Record<string, unknown> = { scrollY: window.scrollY }
  sources.forEach((get, ns) => { draft[ns] = get() })
  const base = stripPrefix(window.location.pathname)
  const prefix = PREFIXES[target] ?? ''
  const path = prefix ? (base === '/' ? prefix : prefix + base) : base
  const href = path + window.location.search + window.location.hash
  // Файлы пишутся в IndexedDB асинхронно; ждём не дольше 3 с, при отказе язык всё равно переключается.
  const timeout = new Promise<'timeout'>(resolve => setTimeout(() => resolve('timeout'), 3000))
  const saves = Promise.all(Array.from(beforeLeave.values()).map(run => run().then(() => true, () => false)))
  Promise.race([saves, timeout]).then(result => {
    if (result === 'timeout' || result.includes(false)) draft.filesLost = true
    try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft)) } catch {}
    window.location.assign(href)
  })
  return true
}

let scrollRestored = false

/** Сохранённое при смене языка для формы ns (null — смены не было); прокрутку возвращает на место. */
export function readLangSwitchDraft<T = Record<string, any>>(ns: string): T | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY)
    if (!raw) return null
    const draft = JSON.parse(raw)
    if (!scrollRestored && typeof draft.scrollY === 'number') {
      scrollRestored = true
      requestAnimationFrame(() => window.scrollTo(0, draft.scrollY))
      setTimeout(() => { try { sessionStorage.removeItem(DRAFT_KEY) } catch {} }, 3000)
    }
    return (draft[ns] as T) ?? null
  } catch {
    return null
  }
}
