// Menu pictogram of a desktop system unit (tower): a tall rounded body with two
// drive slots, two buttons and a bottom slot cut out. Drawn on a 447-unit grid
// and scaled into the 24×24 box (the tower is narrower than the box).
export function DesktopFilled({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <defs>
        <mask id="omb-desktop-unit" maskUnits="userSpaceOnUse" x="0" y="0" width="447" height="447">
          <rect width="447" height="447" fill="#fff" />
          <rect x="130" y="33" width="187" height="40" fill="#000" />
          <rect x="130" y="105" width="187" height="42" fill="#000" />
          <circle cx="228" cy="203" r="22" fill="#000" />
          <circle cx="293" cy="203" r="22" fill="#000" />
          <rect x="130" y="350" width="187" height="42" fill="#000" />
        </mask>
      </defs>
      <g transform="translate(12 1) scale(0.04922) translate(-223.5 0)">
        <rect x="90" y="0" width="267" height="447" rx="38" mask="url(#omb-desktop-unit)" />
      </g>
    </svg>
  )
}
