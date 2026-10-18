// Menu pictogram of a projector, based on lucide "projector" (24×24 grid):
// the body is filled, the lens and the button stay as in lucide — the lens a
// ring in a gap cut out of the body, the button a slot cut out of the body.
export function ProjectorFilled({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <defs>
        <mask id="omb-projector-body">
          <rect width="24" height="24" fill="#fff" />
          <circle cx="9" cy="13" r="5" fill="#000" />
          <rect x="15" y="15" width="4" height="2" rx="1" fill="#000" />
        </mask>
      </defs>
      <rect x="1" y="11" width="22" height="10" rx="3" mask="url(#omb-projector-body)" />
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="9" cy="13" r="3" />
        <path d="M5 7 3 5M9 6V3m4 4 2-2" />
      </g>
    </svg>
  )
}
