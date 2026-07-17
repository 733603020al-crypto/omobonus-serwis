'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const NAVY = '#0B1F3A'
const GOLD = '#bfa76a'

const LABELS = {
    pl: { write: 'Napisz', map: 'Mapa' },
    uk: { write: 'Написати', map: 'Карта' },
    ru: { write: 'Написать', map: 'Карта' },
}

const MAPS_HREF = 'https://www.google.com/maps/dir/?api=1&destination=Marcina%20Bukowskiego%20174%2C%2052-418%20Wroc%C5%82aw%2C%20Poland&travelmode=driving'

const CAPTION_CLASS = 'mt-0.5 whitespace-nowrap font-cormorant text-[13px] text-white'
const CAPTION_STYLE = { textShadow: '0 1px 2px rgba(0,0,0,0.55)' } as const
const BOTTOM_STYLE = { bottom: 'calc(0.5rem + env(safe-area-inset-bottom))' } as const

export function FloatingContactButton() {
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const locale = pathname?.startsWith('/uk') ? 'uk' : pathname?.startsWith('/ru') ? 'ru' : 'pl'
    const contactHref = locale === 'uk' ? '/uk/kontakt' : locale === 'ru' ? '/ru/kontakt' : '/kontakt'
    const labels = LABELS[locale]

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return createPortal(
        <>
            <style>{`
                /* Dots stay hidden until the pen touches their spot, then hold together and reset only after the pen has left */
                @keyframes dot1-appear {
                    0%, 14%   { opacity: 0; transform: scale(0.4); }
                    16%       { opacity: 1; transform: scale(1); }
                    50%       { opacity: 1; transform: scale(1); }
                    58%       { opacity: 0; transform: scale(0.4); }
                    100%      { opacity: 0; transform: scale(0.4); }
                }
                @keyframes dot2-appear {
                    0%, 24%   { opacity: 0; transform: scale(0.4); }
                    26%       { opacity: 1; transform: scale(1); }
                    50%       { opacity: 1; transform: scale(1); }
                    58%       { opacity: 0; transform: scale(0.4); }
                    100%      { opacity: 0; transform: scale(0.4); }
                }
                @keyframes dot3-appear {
                    0%, 34%   { opacity: 0; transform: scale(0.4); }
                    36%       { opacity: 1; transform: scale(1); }
                    50%       { opacity: 1; transform: scale(1); }
                    58%       { opacity: 0; transform: scale(0.4); }
                    100%      { opacity: 0; transform: scale(0.4); }
                }

                .contact-dot-1 { animation: dot1-appear 11s ease-in-out infinite; }
                .contact-dot-2 { animation: dot2-appear 11s ease-in-out infinite; }
                .contact-dot-3 { animation: dot3-appear 11s ease-in-out infinite; }

                .contact-pen { animation: pen-write 11s ease-in-out infinite; }

                /* Pen leads: rests at dot 1's level, settles onto dot 1, shifts to dot 2, shifts to dot 3, then returns to rest at dot 1 (no top-down descent) */
                @keyframes pen-write {
                    0%, 8%    { transform: translate(0px, 10px); }
                    16%, 20%  { transform: translate(0px, 12px); }
                    26%, 30%  { transform: translate(6px, 12px); }
                    36%, 40%  { transform: translate(12px, 12px); }
                    48%, 100% { transform: translate(0px, 10px); }
                }
            `}</style>

            <div
                className="
                    fixed
                    left-5
                    z-[9999]
                    md:hidden
                    flex
                    items-end
                    gap-3
                "
                style={BOTTOM_STYLE}
            >
                <div className="flex flex-col items-center">
                    <Link
                        href={contactHref}
                        aria-label="Przejdź do kontaktu"
                        className="
                            relative
                            flex
                            items-center
                            justify-center
                            w-14
                            h-14
                            rounded-2xl
                            bg-white
                            shadow-[0_4px_16px_rgba(0,0,0,0.25)]
                            transition-all duration-300 ease-out
                            hover:-translate-y-1
                            hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]
                        "
                    >
                        <svg
                            className="absolute left-0 -top-[10px] w-14 h-[66px] pointer-events-none overflow-visible"
                            viewBox="0 0 56 66"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ overflow: 'visible' }}
                        >
                            {/* Chat bubble outline: rounded rect + small tail bottom-left */}
                            <path
                                d="M22,25 H34 A8,8 0 0 1 42,33 V43 A8,8 0 0 1 34,51 H24 L17,55 L20,51 H22 A8,8 0 0 1 14,43 V33 A8,8 0 0 1 22,25 Z"
                                stroke={NAVY}
                                strokeWidth="2.5"
                                strokeLinejoin="round"
                                fill="none"
                            />

                            {/* Three typing dots */}
                            <circle className="contact-dot-1" cx="22" cy="39" r="2.2" fill={GOLD} />
                            <circle className="contact-dot-2" cx="28" cy="39" r="2.2" fill={GOLD} />
                            <circle className="contact-dot-3" cx="34" cy="39" r="2.2" fill={GOLD} />

                            {/* Vintage quill — same /icons/quill.webp asset, mirrored via transform (file untouched), animated as one element; tip points at the dots */}
                            <g className="contact-pen" style={{ transform: 'translate(0px,0px)', overflow: 'visible' }}>
                                <g transform="rotate(16,22,27) translate(76.08,0) scale(-1,1)" style={{ overflow: 'visible' }}>
                                    <image
                                        href="/icons/quill.webp"
                                        x="20.64" y="-37" width="34.8" height="64"
                                        preserveAspectRatio="xMidYMid meet"
                                    />
                                </g>
                            </g>
                        </svg>
                    </Link>
                    <span className={CAPTION_CLASS} style={CAPTION_STYLE}>{labels.write}</span>
                </div>

                <div className="flex flex-col items-center">
                    <a
                        href={MAPS_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Mapa"
                        className="
                            relative
                            flex
                            items-center
                            justify-center
                            w-14
                            h-14
                            rounded-2xl
                            overflow-hidden
                            transition-transform duration-300 ease-out
                            hover:-translate-y-1
                        "
                    >
                        <Image src="/images/google-maps.png" alt="Google Maps" fill className="object-cover scale-[1.45]" />
                    </a>
                    <span className={CAPTION_CLASS} style={CAPTION_STYLE}>{labels.map}</span>
                </div>
            </div>
        </>,
        document.body
    )
}
