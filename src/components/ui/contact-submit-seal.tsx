import { Loader2 } from 'lucide-react'

// The original /kontakt seal, shared without changing its design or interaction classes.
export function ContactSubmitSeal({ locale, label, text, isSubmitting = false, id, type = 'submit', assetBase = '' }: {
  locale: string
  label: string
  text: string
  isSubmitting?: boolean
  id?: string
  type?: 'button' | 'submit' | 'reset'
  assetBase?: string
}) {
  return (
<div className="!mt-[7px] flex justify-center">
              <div className="translate-x-1/4 flex">
                <button
                  id={id}
                  type={type}
                  disabled={isSubmitting}
                  aria-label={label}
                  className="group relative flex-shrink-0 cursor-pointer ml-[18px] md:ml-[24px] mb-[-71px] md:mb-[-92px] rounded-full disabled:opacity-60 transition-transform duration-250 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C69556]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <picture>
                    <source media="(max-width: 767px)" srcSet={assetBase + "/images/contact-form-seal-mobile.webp"} width={168} height={278} />
                    <img
                      src={assetBase + "/images/contact-form-seal.webp"}
                      width={220}
                      height={364}
                      alt={label}
                      draggable={false}
                      className="w-[108px] md:w-[140px] h-auto select-none drop-shadow-[5px_11px_9px_rgba(35,18,8,0.42)] group-hover:drop-shadow-[6px_13px_11px_rgba(35,18,8,0.5)] transition-[filter] duration-250"
                    />
                  </picture>
                    <span
                      data-paper-seal=""
                      className={`absolute left-1/2 top-[29%] -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none whitespace-nowrap font-cormorant font-bold tracking-[-0.02em] text-[#b68d60] ${locale === 'pl' || locale === 'en' ? 'text-[28px] md:text-[36px]' : 'text-[16px] md:text-[22px]'}`}
                      style={{ visibility: isSubmitting ? 'hidden' : 'visible', textShadow: '0px 1px 1px rgba(40,15,5,0.7), 0px -1px 0px rgba(255,220,150,0.3)' }}
                    >
                      {text}
                    </span>
                  {isSubmitting && (
                    <span data-paper-capture-skip="" className="absolute inset-x-0 top-[30%] flex items-center justify-center">
                      <Loader2 className="animate-spin h-6 w-6 text-[#F6E5C3] drop-shadow" />
                    </span>
                  )}
                </button>
              </div>
            </div>
  )
}
