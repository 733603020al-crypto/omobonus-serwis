'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NAVY = '#0B1F3A'
const GOLD = '#bfa76a'

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
                    18%, 24%  { transform: translate(53.05px, -18.24px); }
                    26%, 30%  { transform: translate(59.05px, -18.24px); }
                    33%, 38%  { transform: translate(65.05px, -18.24px); }
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
                        className="absolute left-0 -top-[10px] w-14 h-[66px] pointer-events-none"
                        viewBox="0 0 56 66"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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

                        {/* Fountain pen — single pen; animated group moves the nib to each dot, cap pokes above the button edge */}
                        <g className="contact-pen" style={{ transform: 'translate(42.61px,-1.12px)' }}>
                            <g transform="rotate(32)">
                                {/* Finial */}
                                <circle cx="4" cy="3" r="2.3" fill={GOLD} />

                                {/* Cap */}
                                <rect x="1" y="0" width="6" height="8" rx="3" fill={NAVY} />

                                {/* Barrel */}
                                <rect x="1.2" y="8" width="5.6" height="44" rx="2.8" fill={NAVY} />

                                {/* Grip band */}
                                <rect x="0.8" y="24.4" width="6.4" height="2.6" rx="1" fill={GOLD} />

                                {/* Collar */}
                                <rect x="0" y="52" width="8" height="3" rx="1" fill={GOLD} />

                                {/* Nib */}
                                <path d="M4,65 L7,55 Q4,52 1,55 Z" fill={GOLD} />
                                <line x1="4" y1="62" x2="4" y2="55" stroke={NAVY} strokeWidth="0.6" strokeLinecap="round" />
                            </g>
                        </g>
                    </svg>
                </Link>
            </div>
        </>,
        document.body
    )
}
