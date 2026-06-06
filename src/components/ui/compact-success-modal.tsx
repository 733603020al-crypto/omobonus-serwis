'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import manifest from '@/config/manifest'

interface CompactSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  text?: string
}

export function CompactSuccessModal({
  isOpen,
  onClose,
  title = 'Dziękujemy!',
  text = 'Zgłoszenie zostało wysłane.',
}: CompactSuccessModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(onClose, 8000)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { clearTimeout(timer); window.removeEventListener('keydown', onKey) }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/15" />
      <div
        className="relative z-10 w-full max-w-[360px] overflow-hidden rounded-lg border-2 border-[rgba(200,169,107,0.5)] shadow-[0_0_80px_40px_rgba(0,0,0,0.55),0_8px_32px_rgba(0,0,0,0.7)]"
        onClick={e => e.stopPropagation()}
      >
        <Image src={manifest.Background_1} alt="" fill sizes="360px" className="object-cover object-center" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex items-center gap-3 px-4 py-4 pr-10">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#1c6e43]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10l4.5 4.5L16 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-cormorant text-[20px] font-semibold text-white leading-tight">{title}</p>
            <p className="font-cormorant text-[15px] text-white/75 leading-snug">{text}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij"
            className="absolute top-2.5 right-3 text-white/50 hover:text-white transition-colors duration-150 text-[20px] leading-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}
