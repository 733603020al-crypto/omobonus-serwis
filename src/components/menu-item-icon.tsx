import Image from 'next/image'
import type { MenuIconComponent } from '@/config/service-categories'

// Icon of one "Usługi" menu item: the 84×66 gold webp of most services, or an
// svg pictogram in the menu gold (#bfa76a). The svg drawing fills ~5/6 of
// its box, so the svg is as wide as the slot and overflows it vertically
// (negative margins) — the visible drawing matches the webp icons, row height unchanged.
export function MenuItemIcon({ icon, tall, mobile }: { icon: string | MenuIconComponent; tall?: boolean; mobile?: boolean }) {
  const w = mobile ? 26 : 28
  if (typeof icon !== 'string') {
    const Icon = icon
    return <Icon size={w} className="-my-[3px] flex-shrink-0 text-[#bfa76a] opacity-90" />
  }
  return (
    <Image
      src={icon}
      alt=""
      width={w}
      height={tall ? w : mobile ? 20 : 22}
      sizes={`${w}px`}
      // A tall icon (cake candle) rises above the slot without changing the row height.
      className={`flex-shrink-0 object-contain opacity-90 ${tall ? '-mt-1.5' : ''}`}
      unoptimized
    />
  )
}
