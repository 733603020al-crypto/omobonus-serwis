'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'


const LABELS = {
    pl: { write: 'Napisz', map: 'Mapa', call: 'Zadzwoń' },
    uk: { write: 'Написати', map: 'Карта', call: 'Зателефонувати' },
    ru: { write: 'Написать', map: 'Карта', call: 'Позвонить' },
    en: { write: 'Write', map: 'Map', call: 'Call' },
}

const MAPS_HREF = 'https://www.google.com/maps/dir/?api=1&destination=Marcina%20Bukowskiego%20174%2C%2052-418%20Wroc%C5%82aw%2C%20Poland&travelmode=driving'

const CAPTION_CLASS = 'whitespace-nowrap font-cormorant font-semibold text-[17px] leading-none text-[#F0D27A]'
const CAPTION_STYLE = { textShadow: '0 1px 2px rgba(0,0,0,0.75), 0 0 6px rgba(214,174,82,0.2)' } as const
// Fixed, identical width for all 3 buttons so each is a same-sized block centered
// in its own grid third — not just auto-sized to its own (different-length) caption.
const BUTTON_CONTAINER_CLASS = 'flex w-[116px] items-center justify-center gap-[10px] active:opacity-80'
const BUTTON_WIDTH = 116
const ICON_WIDTH = 44
const ICON_GAP = 10
const CAPTION_FONT = 17
const MIN_CAPTION_FONT = 14
const MIN_ICON_GAP = 6
// Minimum space between a button's content and a column divider / screen edge.
const EDGE_PAD = 4
// Scroll distance (px) after which the bar slides up on pages that hold the first screen.
const SHOW_AFTER_SCROLL = 40

type ColumnFit = { widths: number[]; contents: number[]; fonts: (number | undefined)[]; gap: number }

// `texts` are caption widths at the normal font size. Columns stay equal unless some
// icon + gap + caption doesn't fit its equal share with EDGE_PAD on both sides. Then:
// 1) the overflowing columns take what they lack from the others' spare room;
// 2) if the row still can't fit, the widest caption alone gets a smaller font
//    (not below MIN_CAPTION_FONT), just enough to fit;
// 3) if that's not enough either, the icon–caption gap of every button shrinks evenly
//    (not below MIN_ICON_GAP);
// 4) still short: the EDGE_PAD margins shrink evenly (not below 0), so a button never
//    spills past its column / the screen edge. Returns null for "keep equal".
function fitColumns(total: number, texts: number[]): ColumnFit | null {
    const n = texts.length
    const base = total / n
    const contents = texts.map(t => ICON_WIDTH + ICON_GAP + t)
    const needs = contents.map(c => c + 2 * EDGE_PAD)
    if (needs.every(w => w <= base)) return null
    const fonts: (number | undefined)[] = texts.map(() => undefined)
    const shortage = () => needs.reduce((a, b) => a + b, 0) - total
    if (shortage() > 0) {
        const i = texts.indexOf(Math.max(...texts))
        const size = Math.max(MIN_CAPTION_FONT, Math.floor((CAPTION_FONT * (texts[i] - shortage()) / texts[i]) * 10) / 10)
        const saved = texts[i] * (1 - size / CAPTION_FONT)
        fonts[i] = size
        contents[i] -= saved
        needs[i] -= saved
    }
    let gap = ICON_GAP
    if (shortage() > 0) {
        gap = Math.max(MIN_ICON_GAP, Math.floor((ICON_GAP - shortage() / n) * 10) / 10)
        for (let i = 0; i < n; i++) {
            contents[i] -= ICON_GAP - gap
            needs[i] -= ICON_GAP - gap
        }
    }
    if (shortage() > 0) {
        const pad = Math.max(0, Math.floor((EDGE_PAD - shortage() / (2 * n)) * 10) / 10)
        for (let i = 0; i < n; i++) needs[i] -= 2 * (EDGE_PAD - pad)
    }
    const deficit = needs.reduce((s, w) => s + Math.max(0, w - base), 0)
    const slack = needs.reduce((s, w) => s + Math.max(0, base - w), 0)
    if (slack <= 0) return null
    const give = Math.min(1, slack / deficit)
    const take = Math.min(1, deficit / slack)
    const widths = needs.map(w => (w > base ? base + (w - base) * give : base - (base - w) * take))
    return { widths, contents, fonts, gap }
}

// Same visual language as the top Header: parchment texture (var(--bg-parchment),
// swapped to the mobile-optimized image by the same CSS media query) + a flat
// black/60 overlay, no blur — plus a top border matching the header's bottom one.
export function MobileActionBar() {
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const locale = pathname?.startsWith('/uk') ? 'uk' : pathname?.startsWith('/ru') ? 'ru' : pathname?.startsWith('/en') ? 'en' : 'pl'
    const contactHref = locale === 'uk' ? '/uk/kontakt' : locale === 'ru' ? '/ru/kontakt' : locale === 'en' ? '/en/kontakt' : '/kontakt'
    const labels = LABELS[locale]
    const isKontakt = pathname?.endsWith('/kontakt') ?? false
    const gridRef = useRef<HTMLDivElement>(null)
    const captionRefs = useRef<(HTMLSpanElement | null)[]>([])
    const [columns, setColumns] = useState<ColumnFit | null>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Home and the PL service pages carry the "Serwis wysyłkowy" CTA above the logo strip,
    // where this bar would cover it: there the bar stays down until the first scroll
    // (past SHOW_AFTER_SCROLL px) and then stays for good, also when scrolling back up.
    const holdsFirstScreen = pathname === '/' || (pathname?.startsWith('/uslugi/') ?? false)
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        if (!holdsFirstScreen) return
        const onScroll = () => { if (window.scrollY > SHOW_AFTER_SCROLL) setScrolled(true) }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [holdsFirstScreen, pathname])
    const hidden = holdsFirstScreen && !scrolled

    useLayoutEffect(() => {
        if (!mounted) return
        const measure = () => {
            const grid = gridRef.current
            if (!grid) return
            // Normalised to the normal font size, since a caption may currently be shrunk.
            const texts = captionRefs.current
                .filter((el): el is HTMLSpanElement => !!el)
                .map(el => Math.ceil(el.getBoundingClientRect().width * CAPTION_FONT / parseFloat(getComputedStyle(el).fontSize)))
            setColumns(fitColumns(grid.clientWidth, texts))
        }
        measure()
        document.fonts?.ready.then(measure)
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [mounted, locale, isKontakt])

    if (!mounted) return null

    const colCount = isKontakt ? 1 : 3
    const colTotal = columns?.widths.reduce((a, b) => a + b, 0) ?? 0
    const colPercents = columns?.widths.map(w => (w / colTotal) * 100)
    const dividerLeft = (i: number) => colPercents ? `${colPercents.slice(0, i + 1).reduce((a, b) => a + b, 0)}%` : undefined
    // Redistributed columns: a button may need to be wider than 116px (long caption) or
    // narrower (to free room), so its box follows its column; equal mode keeps 116px.
    const buttonStyle = (i: number) => columns
        ? { width: Math.max(columns.contents[i], Math.min(BUTTON_WIDTH, columns.widths[i])), gap: columns.gap }
        : undefined
    const captionStyle = (i: number) => columns?.fonts[i] ? { ...CAPTION_STYLE, fontSize: columns.fonts[i] } : CAPTION_STYLE
    const captionRef = (i: number) => (el: HTMLSpanElement | null) => { captionRefs.current[i] = el }
    captionRefs.current.length = colCount

    return createPortal(
        <>
            <div
                className={`fixed bottom-0 left-0 right-0 z-40 md:hidden min-h-[65px] flex flex-col justify-center border-t border-[#bfa76a] bg-cover bg-center transition-transform duration-300 ease-out${hidden ? ' translate-y-full pointer-events-none' : ''}`}
                style={{ backgroundImage: 'var(--bg-parchment)' }}
                aria-hidden={hidden || undefined}
                inert={hidden || undefined}
            >
                <div className="absolute inset-0 bg-black/60" />

                <div className="pt-2" style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}>
                <div
                    ref={gridRef}
                    className={`relative grid w-full ${isKontakt ? 'grid-cols-1' : 'grid-cols-3'}`}
                    style={colPercents ? { gridTemplateColumns: colPercents.map(p => `${p}%`).join(' ') } : undefined}
                >
                    {!isKontakt && (
                        <span className="pointer-events-none absolute left-1/3 top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-[#bfa76a]/45" style={{ left: dividerLeft(0) }} aria-hidden="true" />
                    )}
                    {!isKontakt && (
                    <span
                        className={`pointer-events-none absolute top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-[#bfa76a]/45 left-2/3`}
                        style={{ left: dividerLeft(1) }}
                        aria-hidden="true"
                    />
                    )}

                    {!isKontakt && (
                        <>
                            <div className="flex items-center justify-center">
                                <Link
                                    href={contactHref}
                                    prefetch={false}
                                    className={BUTTON_CONTAINER_CLASS}
                                    style={buttonStyle(0)}
                                >
                                    <span className="relative flex w-[44px] h-[44px] shrink-0 items-center justify-center">
                                        <Image src="/images/bar-email-glossy-v1.webp" alt="" width={44} height={44} sizes="44px" className="w-[44px] h-[44px]" />
                                    </span>
                                    <span ref={captionRef(0)} className={CAPTION_CLASS} style={captionStyle(0)}>{labels.write}</span>
                                </Link>
                            </div>
                        </>
                    )}

                    {!isKontakt && (
                    <div className="flex items-center justify-center">
                        <a
                            href={MAPS_HREF}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={BUTTON_CONTAINER_CLASS}
                            style={buttonStyle(1)}
                        >
                            <span className="relative flex w-[44px] h-[44px] shrink-0 items-center justify-center">
                                <Image src="/images/bar-mapa-glossy-v1.webp" alt="Google Maps" width={44} height={44} sizes="44px" className="w-[44px] h-[44px]" />
                            </span>
                            <span ref={captionRef(1)} className={CAPTION_CLASS} style={captionStyle(1)}>{labels.map}</span>
                        </a>
                    </div>
                    )}

                    <div className={`flex items-center justify-center${isKontakt ? " w-1/2 ml-auto" : ""}`}>
                        <a
                            href="tel:+48793759262"
                            className={BUTTON_CONTAINER_CLASS}
                            style={buttonStyle(isKontakt ? 0 : 2)}
                        >
                            <span className="relative flex w-[44px] h-[44px] shrink-0 items-center justify-center overflow-visible">
                                <span className="bar-ripple pointer-events-none"></span>
                                <span className="bar-ripple delay pointer-events-none"></span>
                                <span className="relative flex w-[44px] h-[44px] items-center justify-center rounded-full shadow-[0_4px_14px_rgba(28,110,67,0.45)]">
                                    <Image src="/images/call-round-glossy-v1.webp" alt="" width={44} height={44} sizes="44px" className="w-[44px] h-[44px] bar-call-icon" />
                                </span>
                            </span>
                            <span ref={captionRef(isKontakt ? 0 : 2)} className={CAPTION_CLASS} style={captionStyle(isKontakt ? 0 : 2)}>{labels.call}</span>
                        </a>
                    </div>
                </div>
                </div>
            </div>
        </>,
        document.body
    )
}
