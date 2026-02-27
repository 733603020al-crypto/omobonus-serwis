'use client'

import { Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function FloatingCallButton() {
    const [root, setRoot] = useState<HTMLElement | null>(null)
    const [shake, setShake] = useState(false)

    useEffect(() => {
        const el = document.getElementById('portals-root')
        setRoot(el)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setShake(true)
            setTimeout(() => setShake(false), 600)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    if (!root) return null

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

                @keyframes shake {
                    0% { transform: rotate(0deg); }
                    20% { transform: rotate(-12deg); }
                    40% { transform: rotate(12deg); }
                    60% { transform: rotate(-12deg); }
                    80% { transform: rotate(12deg); }
                    100% { transform: rotate(0deg); }
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

                .call-icon.shake {
                    animation: shake 0.6s ease-in-out;
                }
            `}</style>

            <div
                className="
                    fixed
                    right-5
                    bottom-[calc(1.25rem+env(safe-area-inset-bottom))]
                    z-[9999]
                    md:hidden
                "
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
                            transition-transform
                            hover:scale-105
                            active:scale-95
                        "
                    >
                        <Phone className={`w-6 h-6 call-icon ${shake ? 'shake' : ''}`} />
                    </a>

                </div>
            </div>
        </>,
        root
    )
}