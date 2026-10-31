// Menu pictogram of a parcel, based on lucide "package" (24×24 grid): the box
// is filled, its edges stay as slots cut out of the body.
export function ParcelFilled({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <defs>
        <mask id="omb-parcel-body">
          <rect width="24" height="24" fill="#fff" />
          <g fill="none" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
            <path d="m7.5 4.27 9 5.15" />
          </g>
        </mask>
      </defs>
      <path
        mask="url(#omb-parcel-body)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
      />
    </svg>
  )
}
