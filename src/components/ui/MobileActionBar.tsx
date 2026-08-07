'use client'

import { Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
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

const CAPTION_CLASS = 'whitespace-nowrap font-cormorant text-[14px] leading-none text-[#f3df9a]'
const CAPTION_STYLE = { textShadow: '0 1px 2px rgba(0,0,0,0.6)' } as const
const DIVIDER_CLASS = 'h-8 w-px shrink-0 bg-[#bfa76a]/45'

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

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

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
                    width: 42px;
                    height: 42px;
                    border-radius: 9999px;
                    background: rgba(28,110,67,0.4);
                    animation: bar-ripple 2s infinite;
                }
                .bar-ripple.delay { animation-delay: 1s; }
                .bar-call-icon { animation: bar-shake-periodic 5.6s ease-in-out infinite; }
            `}</style>

            <div
                className="fixed bottom-0 left-0 right-0 z-[9999] md:hidden border-t border-[#bfa76a] bg-cover bg-center"
                style={{ backgroundImage: 'var(--bg-parchment)' }}
            >
                <div className="absolute inset-0 bg-black/60" />

                <div
                    className="relative flex items-center justify-center gap-3 px-4 pt-2"
                    style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}
                >
                    {!isKontakt && (
                        <>
                            <Link
                                href={contactHref}
                                prefetch={false}
                                aria-label="Przejdź do kontaktu"
                                className="flex items-center gap-1.5 active:opacity-80"
                            >
                                <span className="relative flex w-[34px] h-[34px] shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                                    <svg
                                        className="absolute left-0 -top-[6px] w-[34px] h-[40px] pointer-events-none overflow-visible"
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
                                        <g className="bar-pen" style={{ transform: 'translate(0px,0px)', transformOrigin: '22px 39px', overflow: 'visible' }}>
                                            <g transform="rotate(16,22,27) translate(76.08,0) scale(-1,1)" style={{ overflow: 'visible' }}>
                                                <image
                                                    href="/icons/quill.webp"
                                                    x="20.64" y="-37" width="34.8" height="64"
                                                    preserveAspectRatio="xMidYMid meet"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                                <span className={CAPTION_CLASS} style={CAPTION_STYLE}>{labels.write}</span>
                            </Link>
                            <span className={DIVIDER_CLASS} aria-hidden="true" />
                        </>
                    )}

                    <a
                        href={MAPS_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Mapa"
                        className="flex items-center gap-1.5 active:opacity-80"
                    >
                        <span className="relative flex w-[34px] h-[34px] shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                            <Image src="/images/google-maps.png" alt="Google Maps" fill className="object-cover scale-[1.45]" />
                        </span>
                        <span className={CAPTION_CLASS} style={CAPTION_STYLE}>{labels.map}</span>
                    </a>

                    <span className={DIVIDER_CLASS} aria-hidden="true" />

                    <a
                        href="tel:+48793759262"
                        aria-label="Zadzwoń"
                        className="flex items-center gap-1.5 active:opacity-80"
                    >
                        <span className="relative flex w-10 h-10 shrink-0 items-center justify-center overflow-visible">
                            <span className="bar-ripple pointer-events-none"></span>
                            <span className="bar-ripple delay pointer-events-none"></span>
                            <span className="relative flex w-10 h-10 items-center justify-center rounded-full bg-[#1c6e43] text-white shadow-[0_4px_14px_rgba(28,110,67,0.45)]">
                                <Phone className="w-5 h-5 bar-call-icon" />
                            </span>
                        </span>
                        <span className={CAPTION_CLASS} style={CAPTION_STYLE}>{labels.call}</span>
                    </a>
                </div>
            </div>
        </>,
        document.body
    )
}
