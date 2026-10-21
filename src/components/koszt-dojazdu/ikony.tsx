// The 6 approved icons of the "Koszt dojazdu" block: gold 3D pictures with transparency (84×84 WebP, shown at ~24 px).
type P = { size?: number; className?: string }

function Ikona({ name, size = 24, className = '' }: P & { name: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/images/koszt-dojazdu/${name}.webp`} alt="" aria-hidden="true" width={size} height={size} loading="lazy" decoding="async" className={`flex-shrink-0 ${className}`} />
  )
}

export const IkonaSerwis = (p: P) => <Ikona name="serwis" {...p} />
export const IkonaKlient = (p: P) => <Ikona name="klient" {...p} />
export const IkonaOdleglosc = (p: P) => <Ikona name="odleglosc" {...p} />
export const IkonaTrasa = (p: P) => <Ikona name="trasa" {...p} />
export const IkonaZasady = (p: P) => <Ikona name="zasady" {...p} />
export const IkonaKoszt = (p: P) => <Ikona name="koszt" {...p} />
