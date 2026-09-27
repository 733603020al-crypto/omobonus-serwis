'use client'

import { Phone } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const NAVY = '#0B1F3A'

const LABELS = {
    pl: { write: 'Napisz', map: 'Mapa', call: 'Zadzwoń' },
    uk: { write: 'Написати', map: 'Карта', call: 'Зателефонувати' },
    ru: { write: 'Написать', map: 'Карта', call: 'Позвонить' },
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

type ColumnFit = { widths: number[]; contents: number[]; fonts: (number | undefined)[]; gap: number }

// `texts` are caption widths at the normal font size. Columns stay equal unless some
// icon + gap + caption doesn't fit its equal share with EDGE_PAD on both sides. Then:
// 1) the overflowing columns take what they lack from the others' spare room;
// 2) if the row still can't fit, the widest caption alone gets a smaller font
//    (not below MIN_CAPTION_FONT), just enough to fit;
// 3) if that's not enough either, the icon–caption gap of every button shrinks evenly
//    (not below MIN_ICON_GAP). Returns null for "keep equal".
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
    const locale = pathname?.startsWith('/uk') ? 'uk' : pathname?.startsWith('/ru') ? 'ru' : 'pl'
    const contactHref = locale === 'uk' ? '/uk/kontakt' : locale === 'ru' ? '/ru/kontakt' : '/kontakt'
    const labels = LABELS[locale]
    const isKontakt = pathname?.endsWith('/kontakt') ?? false
    const gridRef = useRef<HTMLDivElement>(null)
    const captionRefs = useRef<(HTMLSpanElement | null)[]>([])
    const [columns, setColumns] = useState<ColumnFit | null>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

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

    const colCount = isKontakt ? 2 : 3
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
            <style>{`
                @keyframes dot1-appear {
                    0%, 6%    { opacity: 0; transform: scale(0.4); }
                    9%        { opacity: 1; transform: scale(1); }
                    78%       { opacity: 1; transform: scale(1); }
                    85%       { opacity: 0; transform: scale(0.4); }
                    100%      { opacity: 0; transform: scale(0.4); }
                }
                @keyframes dot2-appear {
                    0%, 25%   { opacity: 0; transform: scale(0.4); }
                    28%       { opacity: 1; transform: scale(1); }
                    78%       { opacity: 1; transform: scale(1); }
                    85%       { opacity: 0; transform: scale(0.4); }
                    100%      { opacity: 0; transform: scale(0.4); }
                }
                @keyframes dot3-appear {
                    0%, 44%   { opacity: 0; transform: scale(0.4); }
                    47%       { opacity: 1; transform: scale(1); }
                    78%       { opacity: 1; transform: scale(1); }
                    85%       { opacity: 0; transform: scale(0.4); }
                    100%      { opacity: 0; transform: scale(0.4); }
                }

                .bar-dot-1 { animation: dot1-appear 7.5s ease-in-out infinite; }
                .bar-dot-2 { animation: dot2-appear 7.5s ease-in-out infinite; }
                .bar-dot-3 { animation: dot3-appear 7.5s ease-in-out infinite; }

                .bar-pen { animation: pen-write 7.5s ease-in-out infinite; }

                @keyframes pen-write {
                    0%        { transform: translate(-2px, 11px) rotate(3deg); animation-timing-function: ease-in; }
                    3%        { transform: translate(1px, 7px) rotate(-4deg); animation-timing-function: ease-out; }
                    6%, 19%   { transform: translate(0px, 9px) rotate(-1deg); animation-timing-function: ease-in; }
                    22%       { transform: translate(9px, 7px) rotate(4deg); animation-timing-function: ease-out; }
                    25%, 38%  { transform: translate(6px, 9px) rotate(-1deg); animation-timing-function: ease-in; }
                    41%       { transform: translate(15px, 7px) rotate(4deg); animation-timing-function: ease-out; }
                    44%, 85%  { transform: translate(12px, 9px) rotate(-1deg); }
                    100%      { transform: translate(-2px, 11px) rotate(3deg); }
                }

                @keyframes bar-ripple {
                    0%   { transform: scale(1); opacity: 0.6; }
                    100% { transform: scale(2); opacity: 0; }
                }
                @keyframes bar-shake-periodic {
                    0%     { transform: rotate(0deg); }
                    2.14%  { transform: rotate(-12deg); }
                    4.29%  { transform: rotate(12deg); }
                    6.43%  { transform: rotate(-12deg); }
                    8.57%  { transform: rotate(12deg); }
                    10.71% { transform: rotate(0deg); }
                    100%   { transform: rotate(0deg); }
                }
                .bar-ripple {
                    position: absolute;
                    width: 46px;
                    height: 46px;
                    border-radius: 9999px;
                    background: rgba(28,110,67,0.4);
                    animation: bar-ripple 2s infinite;
                }
                .bar-ripple.delay { animation-delay: 1s; }
                .bar-call-icon { animation: bar-shake-periodic 5.6s ease-in-out infinite; }
            `}</style>

            <div
                className="fixed bottom-0 left-0 right-0 z-40 md:hidden min-h-[65px] flex flex-col justify-center border-t border-[#bfa76a] bg-cover bg-center"
                style={{ backgroundImage: 'var(--bg-parchment)' }}
            >
                <div className="absolute inset-0 bg-black/60" />

                <div className="pt-2" style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}>
                <div
                    ref={gridRef}
                    className={`relative grid w-full ${isKontakt ? 'grid-cols-2' : 'grid-cols-3'}`}
                    style={colPercents ? { gridTemplateColumns: colPercents.map(p => `${p}%`).join(' ') } : undefined}
                >
                    {!isKontakt && (
                        <span className="pointer-events-none absolute left-1/3 top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-[#bfa76a]/45" style={{ left: dividerLeft(0) }} aria-hidden="true" />
                    )}
                    <span
                        className={`pointer-events-none absolute top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-[#bfa76a]/45 ${isKontakt ? 'left-1/2' : 'left-2/3'}`}
                        style={{ left: dividerLeft(isKontakt ? 0 : 1) }}
                        aria-hidden="true"
                    />

                    {!isKontakt && (
                        <>
                            <div className="flex items-center justify-center">
                                <Link
                                    href={contactHref}
                                    prefetch={false}
                                    className={BUTTON_CONTAINER_CLASS}
                                    style={buttonStyle(0)}
                                >
                                    <span className="relative flex w-[44px] h-[44px] shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                                        <svg
                                            className="absolute left-0 -top-[8px] w-[44px] h-[51px] pointer-events-none overflow-visible"
                                            viewBox="0 0 56 66"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{ overflow: 'visible' }}
                                        >
                                            <path
                                                d="M22,25 H34 A8,8 0 0 1 42,33 V43 A8,8 0 0 1 34,51 H24 L17,55 L20,51 H22 A8,8 0 0 1 14,43 V33 A8,8 0 0 1 22,25 Z"
                                                stroke={NAVY}
                                                strokeWidth="2.5"
                                                strokeLinejoin="round"
                                                fill="none"
                                            />
                                            <circle className="bar-dot-1" cx="22" cy="39" r="2.2" fill="#000000" />
                                            <circle className="bar-dot-2" cx="28" cy="39" r="2.2" fill="#000000" />
                                            <circle className="bar-dot-3" cx="34" cy="39" r="2.2" fill="#000000" />
                                            {/* Quill temporarily disabled for the mobile bottom bar — dot animation stays.
                                                Uncomment to restore the writing-pen effect.
                                            <g className="bar-pen" style={{ transform: 'translate(0px,0px)', transformOrigin: '22px 39px', overflow: 'visible' }}>
                                                <g transform="rotate(16,22,27) translate(76.08,0) scale(-1,1)" style={{ overflow: 'visible' }}>
                                                    <image
                                                        href="/icons/quill.webp"
                                                        x="22.82" y="-33" width="30.45" height="56"
                                                        preserveAspectRatio="xMidYMid meet"
                                                    />
                                                </g>
                                            </g>
                                            */}
                                        </svg>
                                    </span>
                                    <span ref={captionRef(0)} className={CAPTION_CLASS} style={captionStyle(0)}>{labels.write}</span>
                                </Link>
                            </div>
                        </>
                    )}

                    <div className="flex items-center justify-center">
                        <a
                            href={MAPS_HREF}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={BUTTON_CONTAINER_CLASS}
                            style={buttonStyle(isKontakt ? 0 : 1)}
                        >
                            <span className="relative flex w-[44px] h-[44px] shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                                <Image src="/images/google-maps.png" alt="Google Maps" fill className="object-cover scale-[1.45]" />
                            </span>
                            <span ref={captionRef(isKontakt ? 0 : 1)} className={CAPTION_CLASS} style={captionStyle(isKontakt ? 0 : 1)}>{labels.map}</span>
                        </a>
                    </div>

                    <div className="flex items-center justify-center">
                        <a
                            href="tel:+48793759262"
                            className={BUTTON_CONTAINER_CLASS}
                            style={buttonStyle(isKontakt ? 1 : 2)}
                        >
                            <span className="relative flex w-[44px] h-[44px] shrink-0 items-center justify-center overflow-visible">
                                <span className="bar-ripple pointer-events-none"></span>
                                <span className="bar-ripple delay pointer-events-none"></span>
                                <span className="relative flex w-[44px] h-[44px] items-center justify-center rounded-full bg-[#1c6e43] text-white shadow-[0_4px_14px_rgba(28,110,67,0.45)]">
                                    <Phone className="w-[22px] h-[22px] bar-call-icon" />
                                </span>
                            </span>
                            <span ref={captionRef(isKontakt ? 1 : 2)} className={CAPTION_CLASS} style={captionStyle(isKontakt ? 1 : 2)}>{labels.call}</span>
                        </a>
                    </div>
                </div>
                </div>
            </div>
        </>,
        document.body
    )
}
