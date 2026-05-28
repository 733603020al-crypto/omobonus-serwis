'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import manifest from '@/config/manifest'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isUk = pathname?.startsWith('/uk') ?? false

  const plHref = isUk ? pathname.replace(/^\/uk/, '') || '/' : pathname
  const ukHref = isUk ? pathname : '/uk' + (pathname === '/' ? '' : pathname)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const dropdownItemClass = (active: boolean) =>
    `flex items-center gap-2 rounded-sm border border-transparent px-2 py-1.5 font-cormorant text-[15px] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#bfa76a]/80 hover:bg-gradient-to-r hover:from-[#bfa76a]/40 hover:via-[#bfa76a]/20 hover:to-transparent hover:text-[#f3df9a] hover:shadow-[0_0_30px_rgba(191,167,106,0.45)] hover:[text-shadow:0_0_12px_rgba(191,167,106,0.65)] [&:hover_img]:opacity-100 ${
      active ? 'text-[#f3df9a] [text-shadow:0_0_8px_rgba(191,167,106,0.5)]' : 'text-white'
    }`

  return (
    <div
      ref={ref}
      className="relative h-full flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen(o => !o)}
        className="flex items-center gap-1 font-cormorant text-[15px] text-[#bfa76a] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-[#f3df9a] hover:[text-shadow:0_0_10px_rgba(191,167,106,0.55)] select-none"
        style={isOpen ? { textShadow: '0 0 8px rgba(191,167,106,0.7), 0 0 18px rgba(191,167,106,0.35)' } : undefined}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Wybierz język / Вибрати мову"
      >
        <Image
          src={isUk ? '/images/ua.webp' : '/images/pl.webp'}
          alt=""
          width={18}
          height={13}
          className="rounded-[2px] object-cover flex-shrink-0"
          unoptimized
        />
        {isUk ? 'Ukr' : 'PL'}
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 z-50 w-[155px] rounded-b-lg border-2 border-[rgba(200,169,107,0.5)] overflow-hidden opacity-95 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <Image src={manifest.Background_1} alt="" fill sizes="155px" className="object-cover object-center" />
          <div className="absolute inset-0 bg-black/75" />
          <div className="relative z-10 p-2 flex flex-col divide-y divide-[#bfa76a]/25">
            <Link href={plHref} onClick={() => setIsOpen(false)} className={dropdownItemClass(!isUk)}>
              <Image src="/images/pl.webp" alt="" width={20} height={15} className="rounded-[2px] object-cover flex-shrink-0 opacity-90" unoptimized />
              Polski
            </Link>
            <Link href={ukHref} onClick={() => setIsOpen(false)} className={dropdownItemClass(isUk)}>
              <Image src="/images/ua.webp" alt="" width={20} height={15} className="rounded-[2px] object-cover flex-shrink-0 opacity-90" unoptimized />
              Українська
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
