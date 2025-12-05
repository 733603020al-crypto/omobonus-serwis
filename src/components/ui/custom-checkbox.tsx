'use client'

const TICK_PATH =
  'M0.9 21.6c2.8 7.4 6.6 13.4 10.6 14.9 3.1 1 5.7-0.9 8.5-5.3 2.5-4 5.4-9.9 9.2-18.5 3.5-7.9 7.4-17.8 11-27.7 1.1-3 2-5.6 2.9-7.9'

interface CustomCheckboxProps {
  id: string
  name: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string | React.ReactNode
}

export function CustomCheckbox({ id, name, checked, onChange, label }: CustomCheckboxProps) {
  const frameBase =
    'relative w-7 h-7 rounded-sm border-[2.5px] transition-all duration-300 flex items-center justify-center overflow-visible bg-transparent'
  const frameState = checked
    ? 'border-black shadow-[0_4px_10px_rgba(0,0,0,0.2)]'
    : 'border-black/60 group-hover:border-black/80 group-hover:bg-[rgba(0,0,0,0.04)] group-hover:shadow-[0_0_6px_rgba(0,0,0,0.25)]'

  return (
    <label htmlFor={id} className="flex items-start gap-4 cursor-pointer group">
      <div
        className="flex-shrink-0 relative mt-0.5 overflow-visible"
        style={{ width: 40, height: 40, padding: 4, margin: -4 }}
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className="relative w-full h-full overflow-visible flex items-end justify-center">
          <div className={`${frameBase} ${frameState}`}>
            {checked && (
              <div className="checkbox-tick-wrapper">
                <span className="checkbox-ink-effect" aria-hidden="true" />
                <svg
                  className="checkbox-tick"
                  viewBox="-2 -14 42 52"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d={TICK_PATH} />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
      <span className="text-black font-sans font-medium text-base leading-tight flex-1">
        {label}
      </span>
    </label>
  )
}
