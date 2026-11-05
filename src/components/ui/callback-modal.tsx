'use client'

import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { KosztClose } from '@/components/koszt-dojazdu/KosztClose'

// Compact window for the callback form: same frame as the "Koszt dojazdu" window
// (parchment, gold border, dimmed page, close button, Esc / click outside to close).
export function CallbackModal({
  open,
  onClose,
  title,
  closeLabel,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  closeLabel: string
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); html.style.overflow = prev }
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/60 p-4"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-[520px] rounded-lg border-2 border-[#bfa76a]/80 text-[#f8eacd] shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_16px_rgba(191,167,106,0.42),0_0_32px_rgba(191,167,106,0.25)]"
        style={{ backgroundImage: 'var(--bg-parchment)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 rounded-lg bg-black/55" />
        <KosztClose label={closeLabel} onClose={onClose} />
        <div className="relative px-5 pb-5 pt-9 md:px-7 md:pb-6">
          <h2 className="mb-4 pr-6 text-center font-cormorant text-[15px] font-semibold uppercase tracking-[0.15em] text-[#f5e6bf] [text-wrap:balance] [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  )
}
