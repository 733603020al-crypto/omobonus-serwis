'use client'

import { useEffect, useRef, useState } from 'react'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

const ANIMATION_DURATION = 220

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const okButtonRef = useRef<HTMLButtonElement>(null)
  const openRafRef = useRef<number | null>(null)
  const [shouldRender, setShouldRender] = useState(isOpen)
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined
    if (isOpen) {
      setShouldRender(true)
      if (openRafRef.current) {
        cancelAnimationFrame(openRafRef.current)
        openRafRef.current = null
      }
      openRafRef.current = requestAnimationFrame(() => {
        openRafRef.current = requestAnimationFrame(() => {
          setIsVisible(true)
          openRafRef.current = null
        })
      })
    } else {
      setIsVisible(false)
      timeout = setTimeout(() => setShouldRender(false), ANIMATION_DURATION)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
      if (openRafRef.current) {
        cancelAnimationFrame(openRafRef.current)
        openRafRef.current = null
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (!shouldRender) return
    const focusFrame = requestAnimationFrame(() => {
      okButtonRef.current?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(focusFrame)
  }, [shouldRender])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 10000) // Auto-close after 10 seconds

      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!shouldRender) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Background overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-[220ms] ease-out ${
          isVisible ? 'opacity-40' : 'opacity-0'
        }`}
      />

      {/* Modal content */}
      <div
        className={`relative z-10 w-full max-w-5xl sm:max-w-[600px] md:max-w-[740px] lg:max-w-[720px] xl:max-w-[680px] px-2 transition-[opacity,transform] duration-[220ms] ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.96]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-lg border-2 border-[rgba(200,169,107,0.5)] overflow-hidden modal-card-outer">
          <div className="relative px-4 py-6 md:px-8 md:py-8 text-center space-y-3">
            <div className="border-b border-white/10 pb-1.5">
              <div className="py-0.5">
                <h3 className="text-white text-[32px] md:text-[36px] font-cormorant font-bold leading-tight drop-shadow-[0_0_8px_rgba(0,0,0,0.45)]">
                  Dziękujemy za zgłoszenie!
                </h3>
              </div>
            </div>

            <div className="rounded-lg border border-[#bfa76a]/10 px-5 pt-4 pb-3.5 md:px-7 md:pt-6 md:pb-4 space-y-4 modal-card-inner">
              <div className="space-y-2 font-table-main text-[rgba(255,255,245,0.9)] text-[15px] md:text-[16px] leading-relaxed max-w-2xl mx-auto">
                <p>Twoja wiadomość została pomyślnie wysłana.</p>
                <p>Skontaktujemy się z Tobą w najbliższym czasie, aby potwierdzić szczegóły.</p>
                <p>Prosimy o cierpliwość — Twoje zgłoszenie jest już w dobrych rękach.</p>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  ref={okButtonRef}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === 'NumpadEnter') {
                      event.preventDefault()
                      onClose()
                    }
                  }}
                  className="relative group px-6 py-[0.45rem] border border-white/75 text-white rounded-full transition-all duration-300 bg-transparent hover:bg-white/15 hover:border-white focus:ring-2 focus:ring-white/40 focus:outline-none"
                >
                  <span className="font-cormorant font-bold text-[24px] tracking-wide">
                    OK
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

