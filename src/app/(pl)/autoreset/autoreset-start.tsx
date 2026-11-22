'use client'

import { useRef, useState } from 'react'

const EXE_URL = '/autoreset/AutoReset.exe'
const PROTOCOL_URL = 'autoreset://start'
const STORAGE_KEY = 'autoreset-installed'
const p = 'text-sm md:text-base font-sans leading-normal'

type Phase = 'idle' | 'launching' | 'downloaded' | 'not-started'

function readInstalled(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function markInstalled() {
  try {
    window.localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // brak localStorage: przycisk po prostu pobierze program ponownie
  }
}

export function AutoResetStart() {
  const [phase, setPhase] = useState<Phase>('idle')
  const timer = useRef<number | undefined>(undefined)
  const downloadLink = useRef<HTMLAnchorElement>(null)

  const download = () => {
    downloadLink.current?.click()
    markInstalled()
    setPhase('downloaded')
  }

  const start = () => {
    if (!readInstalled()) {
      download()
      return
    }
    // Program już był pobrany: uruchamiamy zainstalowany (adres autoreset://), bez ponownego pobierania.
    setPhase('launching')
    window.clearTimeout(timer.current)
    const onBlur = () => window.clearTimeout(timer.current) // przeglądarka pokazała okno „Otworzyć AutoReset?” — czekamy na decyzję
    window.addEventListener('blur', onBlur, { once: true })
    window.location.href = PROTOCOL_URL
    timer.current = window.setTimeout(() => {
      window.removeEventListener('blur', onBlur)
      setPhase('not-started')
    }, 4000)
  }

  return (
    <div className="space-y-1.5">
      <button
        type="button"
        onClick={start}
        className="inline-block rounded-sm bg-[#3a2e24] px-5 py-2 font-sans text-sm md:text-base font-semibold text-[#f5ecd7] hover:bg-[#3a2e24]/85"
      >
        Rozpocznij diagnostykę
      </button>
      <a ref={downloadLink} href={EXE_URL} download className="hidden" aria-hidden="true" tabIndex={-1}>
        AutoReset.exe
      </a>
      {phase === 'launching' && <p className={p} role="status">Uruchamiam program. Jeśli przeglądarka zapyta, czy otworzyć AutoReset, potwierdź.</p>}
      {phase === 'downloaded' && (
        <div className={`${p} space-y-0.5`} role="status">
          <p>Pobieranie rozpoczęte (jeden plik, ok. 33 MB). Otwórz pobrany plik <strong>AutoReset.exe</strong> — okno diagnostyki pojawi się samo.</p>
          <p>Następnym razem wystarczy kliknąć ten sam przycisk: zainstalowany program uruchomi się bez ponownego pobierania.</p>
        </div>
      )}
      {phase === 'not-started' && (
        <div className={`${p} space-y-1`} role="status">
          <p>Program nie odpowiedział — możliwe, że nie jest jeszcze zainstalowany na tym komputerze.</p>
          <button type="button" onClick={download} className="underline hover:text-[#3a2e24]/70">
            Pobierz AutoReset.exe (ok. 33 MB)
          </button>
        </div>
      )}
    </div>
  )
}
