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

                /* Pen leads: descends to dot 1, shifts to dot 2, shifts to dot 3, then lifts back to rest */
                @keyframes pen-write {
                    0%, 8%    { transform: translate(0px, 0px); }
                    16%, 20%  { transform: translate(0px, 12px); }
                    26%, 30%  { transform: translate(6px, 12px); }
                    36%, 40%  { transform: translate(12px, 12px); }
                    48%, 100% { transform: translate(0px, 0px); }
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

                        {/* Vintage quill — same /icons/quill.webp asset, mirrored via transform (file untouched), animated as one element; tip points at the dots */}
                        <g className="contact-pen" style={{ transform: 'translate(0px,0px)', overflow: 'visible' }}>
                            <g transform="translate(76.08,0) scale(-1,1)" style={{ overflow: 'visible' }}>
                                <image
                                    href="/icons/quill.webp"
                                    x="20.64" y="-37" width="34.8" height="64"
                                    preserveAspectRatio="xMidYMid meet"
                                />
                            </g>
                        </g>
                    </svg>
                </Link>
            </div>
        </>,
        document.body
    )
}
