import type { ReactNode } from 'react'

// Legal texts are kept as plain data (one file per language) and rendered here,
// so all language versions share one structure and stay in sync with PL.

export type LegalItem = string | { t: string; sub: string[] }

export type LegalBlock =
  | { p: string }
  | { ol: LegalItem[] }
  | { ul: string[] }
  | { rows: { title: string; lines: [string, string][] }[] }
  | { cookieButton: string }

export interface LegalDoc {
  intro: string
  title: string
  lastUpdatedLabel: string
  dateLocale: string
  lastUpdated: string
  notice?: string
  sections: { heading: string; blocks: LegalBlock[] }[]
}

export interface LegalSection {
  heading: string
  body: ReactNode
}

export interface LegalPageContent {
  intro: string
  title: string
  sections: LegalSection[]
  lastUpdatedLabel: string
  dateLocale: string
  lastUpdated?: string
}

const p = 'text-sm md:text-base font-sans leading-normal'
const plainList = 'space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4 md:ml-6'
const ul = 'list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4'
const link = 'underline hover:text-[#3a2e24]/70'
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'

// Inline markup: **bold**, [text](href), bare e-mail addresses.
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g

function rich(text: string): ReactNode {
  const parts = text.split(TOKEN)
  return parts.map((part, i) => {
    if (i % 2 === 0) return part
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.startsWith('[')) {
      const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (!m) return part
      const external = /^https?:/.test(m[2])
      return (
        <a key={i} href={m[2]} className={link} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {m[1]}
        </a>
      )
    }
    return <a key={i} href={`mailto:${part}`} className={link}>{part}</a>
  })
}

function renderBlock(block: LegalBlock, key: number): ReactNode {
  if ('p' in block) return <p key={key} className={p}>{rich(block.p)}</p>
  if ('ul' in block) {
    return (
      <ul key={key} className={ul}>
        {block.ul.map((li, i) => <li key={i}>{rich(li)}</li>)}
      </ul>
    )
  }
  if ('ol' in block) {
    return (
      <div key={key} className="space-y-1">
        {block.ol.map((item, i) => {
          const text = typeof item === 'string' ? item : item.t
          return (
            <div key={i} className="space-y-0.5">
              <p className={p}><strong>{i + 1}.</strong> {rich(text)}</p>
              {typeof item !== 'string' && (
                <ul className={plainList}>
                  {item.sub.map((s, j) => <li key={j}>{LETTERS[j]}) {rich(s)}</li>)}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    )
  }
  if ('rows' in block) {
    return (
      <div key={key} className="space-y-1.5">
        {block.rows.map((row, i) => (
          <div key={i} className="border-l-2 border-[#3a2e24]/25 pl-2 md:pl-3">
            <p className={p}><strong>{rich(row.title)}</strong></p>
            {row.lines.map(([label, value], j) => (
              <p key={j} className={p}><em>{label}:</em> {rich(value)}</p>
            ))}
          </div>
        ))}
      </div>
    )
  }
  // CookieYes opens its preference centre on click of any element with this class.
  return (
    <p key={key} className={p}>
      <button type="button" className={`cky-banner-element ${link} font-semibold`}>
        {block.cookieButton}
      </button>
    </p>
  )
}

export function toPageContent(doc: LegalDoc): LegalPageContent {
  return {
    intro: doc.intro,
    title: doc.title,
    lastUpdatedLabel: doc.lastUpdatedLabel,
    dateLocale: doc.dateLocale,
    lastUpdated: doc.lastUpdated,
    sections: doc.sections.map((s, idx) => ({
      heading: s.heading,
      body: (
        <>
          {idx === 0 && doc.notice && <p className={`${p} italic`}>{rich(doc.notice)}</p>}
          {s.blocks.map(renderBlock)}
        </>
      ),
    })),
  }
}
