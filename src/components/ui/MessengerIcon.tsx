'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// 3D-библиотеки грузятся только при первом наведении мыши на иконку (до этого — обычная картинка и CSS-парение)
const MessengerCoin3D = dynamic(() => import('@/components/ui/MessengerCoin3D'), { ssr: false })

const IMG_CLASS = 'w-[clamp(64px,18.5vw,72px)] h-[clamp(64px,18.5vw,72px)] md:w-[84px] md:h-[84px]'

// Иконка раздела контактов: на устройствах с мышью — CSS-парение и 3D-оборот при hover,
// на остальных — обычная картинка, 3D-код не загружается вообще.
export function MessengerIcon({ src, alt = '' }: { src: string; alt?: string }) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [canHover, setCanHover] = useState(false)
  const [activated, setActivated] = useState(false)
  const [ready, setReady] = useState(false)
  const [tick, setTick] = useState(0)
  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setCanHover(true)
    const host = imgRef.current?.closest('a, button')
    if (!host) return
    const onEnter = () => {
      setActivated(true)
      setTick((t) => t + 1)
      setSpinning(true)
    }
    host.addEventListener('pointerenter', onEnter)
    return () => host.removeEventListener('pointerenter', onEnter)
  }, [])

  // Плоская тень под иконкой не вращается вместе с ней — на время оборота её прячет CSS ([data-spin])
  useEffect(() => {
    if (!spinning || (activated && !ready)) return
    const id = window.setTimeout(() => setSpinning(false), 1600)
    return () => window.clearTimeout(id)
  }, [spinning, activated, ready, tick])

  return (
    <span data-spin={spinning ? '' : undefined} className={canHover ? 'msg-float' : undefined} style={{ position: 'relative', display: 'block' }}>
      <Image ref={imgRef} src={src} alt={alt} width={96} height={96} className={IMG_CLASS} style={ready ? { opacity: 0 } : undefined} />
      {activated && <MessengerCoin3D src={src} size={imgRef.current?.clientWidth || 84} spinTick={tick} onReady={() => setReady(true)} />}
    </span>
  )
}
