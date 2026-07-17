'use client'

import { Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'

const CALL_LABELS = {
    pl: 'Zadzwoń',
    uk: 'Зателефонувати',
    ru: 'Позвонить',
}

export function FloatingCallButton() {
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const locale = pathname?.startsWith('/uk') ? 'uk' : pathname?.startsWith('/ru') ? 'ru' : 'pl'
    const isKontakt = pathname?.endsWith('/kontakt') ?? false
    const captionClass = isKontakt
        ? '-mt-1 whitespace-nowrap font-cormorant text-[13px] text-white/85'
        : 'mt-0.5 whitespace-nowrap font-cormorant text-[13px] text-white'
    const bottomStyle = { bottom: `calc(${isKontakt ? '1.25rem' : '0.5rem'} + env(safe-area-inset-bottom))` }

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return createPortal(
        <>
            <style>{`
                @keyframes ripple {
                    0% {
                        transform: scale(1);
                        opacity: 0.6;
                    }
                    100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }

                @keyframes shake-periodic {
                    0%     { transform: rotate(0deg); }
                    2.14%  { transform: rotate(-12deg); }
                    4.29%  { transform: rotate(12deg); }
                    6.43%  { transform: rotate(-12deg); }
                    8.57%  { transform: rotate(12deg); }
                    10.71% { transform: rotate(0deg); }
                    100%   { transform: rotate(0deg); }
                }

                .ripple {
                    position: absolute;
                    width: 60px;
                    height: 60px;
                    border-radius: 9999px;
                    background: rgba(28,110,67,0.4);
                    animation: ripple 2s infinite;
                }

                .ripple.delay {
                    animation-delay: 1s;
                }

                .call-icon {
                    animation: shake-periodic 5.6s ease-in-out infinite;
                }
            `}</style>

            <div
                className="
                    fixed
                    right-5
                    z-[9999]
                    md:hidden
                    flex
                    flex-col
                    items-center
                "
                style={bottomStyle}
            >
                <div className="relative flex items-center justify-center overflow-visible">

                    <span className="ripple pointer-events-none"></span>
                    <span className="ripple delay pointer-events-none"></span>

                    <a
                        href="tel:+48793759262"
                        aria-label="Zadzwoń"
                        className="
                            relative
                            flex
                            items-center
                            justify-center
                            w-14
                            h-14
                            rounded-full
                            bg-[#1c6e43]
                            text-white
                            shadow-[0_8px_24px_rgba(28,110,67,0.45)]
                            transition-transform duration-300 ease-out
                            hover:scale-105
                            active:scale-95
                            pointer-events-auto
                        "
                    >
                        <Phone className="w-6 h-6 call-icon" />
                    </a>

                </div>
                <span
                    className={captionClass}
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.55)' }}
                >
                    {CALL_LABELS[locale]}
                </span>
            </div>
        </>,
        document.body
    )
}