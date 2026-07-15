'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NAVY = '#0B1F3A'
const GOLD = '#bfa76a'
const LIGHT_GOLD = '#eee0b4'

export function FloatingContactButton() {
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const isUk = pathname?.startsWith('/uk') ?? false
    const contactHref = isUk ? '/uk/kontakt' : '/kontakt'

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return createPortal(
        <>
            <style>{`
                @keyframes dot-typing {
                    0%   { opacity: 0; transform: scale(0.4); }
                    9%   { opacity: 0; transform: scale(0.4); }
                    18%  { opacity: 1; transform: scale(1); }
                    28%  { opacity: 1; transform: scale(1); }
                    38%  { opacity: 0; transform: scale(0.4); }
                    100% { opacity: 0; transform: scale(0.4); }
                }

                .contact-dot-1 { animation: dot-typing 11s ease-in-out infinite; animation-delay: 0s; }
                .contact-dot-2 { animation: dot-typing 11s ease-in-out infinite; animation-delay: 0.35s; }
                .contact-dot-3 { animation: dot-typing 11s ease-in-out infinite; animation-delay: 0.7s; }

                .contact-pen { animation: pen-write 11s ease-in-out infinite; }

                @keyframes pen-write {
                    0%, 8%    { transform: translate(42.61px, -1.12px); }
                    18%, 24%  { transform: translate(46.80px, -13.90px); }
                    26%, 30%  { transform: translate(52.80px, -13.90px); }
                    33%, 38%  { transform: translate(58.80px, -13.90px); }
                    46%, 100% { transform: translate(42.61px, -1.12px); }
                }
            `}</style>

            <div
                className="
                    fixed
                    left-5
                    bottom-[calc(1.25rem+env(safe-area-inset-bottom))]
                    z-[9999]
                    md:hidden
                "
            >
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
                        {/* Chat cloud outline */}
                        <rect
                            x="14" y="25" width="28" height="28" rx="8"
                            stroke={NAVY}
                            strokeWidth="2.5"
                            fill="none"
                        />

                        {/* Three typing dots */}
                        <circle className="contact-dot-1" cx="22" cy="39" r="2.2" fill={GOLD} />
                        <circle className="contact-dot-2" cx="28" cy="39" r="2.2" fill={GOLD} />
                        <circle className="contact-dot-3" cx="34" cy="39" r="2.2" fill={GOLD} />

                        {/* Vintage quill — single feather; animated group moves the tip to each dot, plume pokes above the button edge */}
                        <g className="contact-pen" style={{ transform: 'translate(42.61px,-1.12px)', overflow: 'visible' }}>
                            <g transform="rotate(32)" style={{ overflow: 'visible' }}>
                                {/* Vane */}
                                <path
                                    d="M7,58 C2,45 1,30 3,16 C4,8 6,3 9,1 C12,0 15,2 15,6 C15,12 13,20 12,28 C11,38 9,50 7,58 Z"
                                    fill={LIGHT_GOLD}
                                    stroke={NAVY}
                                    strokeWidth="1.1"
                                />

                                {/* Shaft */}
                                <path
                                    d="M7,58 C6,45 6,30 7,16 C7,10 8,5 9,3"
                                    fill="none"
                                    stroke={NAVY}
                                    strokeWidth="0.7"
                                    strokeLinecap="round"
                                />

                                {/* Golden nib accent */}
                                <line x1="5.8" y1="51.5" x2="8.2" y2="51.5" stroke={GOLD} strokeWidth="1.1" strokeLinecap="round" />
                            </g>
                        </g>
                    </svg>
                </Link>
            </div>
        </>,
        document.body
    )
}
