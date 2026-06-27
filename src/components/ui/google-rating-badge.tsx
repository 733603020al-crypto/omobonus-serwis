import fs from 'fs'
import path from 'path'

function getRating(): number | null {
  try {
    const filePath = path.join(process.cwd(), 'data', 'reviews.json')
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    return typeof data.rating === 'number' ? data.rating : null
  } catch {
    return null
  }
}

export function GoogleRatingBadge({
  className = '',
  ratingLabel = 'Google Rating',
  trustLabel = 'Zaufanie klientów',
  ariaLabel = 'Zobacz wszystkie opinie Omobonus w Google',
}: {
  className?: string
  ratingLabel?: string
  trustLabel?: string
  ariaLabel?: string
} = {}) {
  const rating = getRating()
  if (rating === null) return null

  const shell =
    `relative group flex items-center gap-2 md:gap-3 rounded-lg border-2 border-[#bfa76a]/80 hover:border-[#bfa76a] bg-[#bfa76a]/10 shadow-[0_0_20px_rgba(191,167,106,0.35)] px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-[2px] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#bfa76a]/20 hover:shadow-[0_0_28px_rgba(191,167,106,0.45)] cursor-pointer ${className}`

  return (
    <a
      href="https://g.page/omobonus-serwis/review"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={shell}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute top-2 right-2 text-[#bfa76a] opacity-70 group-hover:opacity-100 transition-opacity"
        aria-hidden="true"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>

      <svg viewBox="0 0 48 48" className="w-[32px] h-[32px] md:w-[37px] md:h-[37px] shrink-0">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.36 1.46 8.28 3.27l6.15-6.15C34.66 3.07 29.7 1 24 1 14.61 1 6.51 6.62 2.56 14.8l7.32 5.68C11.5 14.17 17.27 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.21-.43-4.73H24v9.02h12.7c-.55 2.97-2.19 5.49-4.66 7.18l7.21 5.6c4.22-3.89 6.65-9.61 6.65-17.07z" />
        <path fill="#FBBC05" d="M9.88 28.48c-.5-1.48-.78-3.06-.78-4.68s.28-3.2.78-4.68l-7.32-5.68C.92 16.54 0 20.13 0 23.8c0 3.67.92 7.26 2.56 10.36l7.32-5.68z" />
        <path fill="#34A853" d="M24 46c5.7 0 10.66-1.88 14.21-5.11l-7.21-5.6c-2 1.35-4.56 2.15-7 2.15-6.73 0-12.5-4.67-14.12-10.98l-7.32 5.68C6.51 41.38 14.61 46 24 46z" />
      </svg>

      <div className="flex flex-col leading-none text-left">
        <span className="text-[11px] md:text-[12px] text-[#bfa76a] font-sans font-normal tracking-normal">
          {ratingLabel}
        </span>
        <div className="flex items-center gap-1 mt-1 md:mt-1.5">
          <span className="font-sans text-[20px] md:text-[24px] font-bold text-[#bfa76a]">
            {rating.toFixed(1)}
          </span>
          <span className="text-[#f3df9a] text-[15px] md:text-[18px] leading-none tracking-tight">
            {'★★★★★'}
          </span>
        </div>
        <span className="mt-1 md:mt-1.5 text-[11px] md:text-[12px] text-white/75 font-sans tracking-wide">
          {trustLabel}
        </span>
      </div>
    </a>
  )
}
