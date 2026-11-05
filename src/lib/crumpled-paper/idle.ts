// A small scheduling helper; this module never imports the WebGL engine.
export function checkCancelled(signal: AbortSignal) {
  if (signal.aborted) throw new DOMException('Paper preparation cancelled', 'AbortError')
}

export function pause(ms: number, signal: AbortSignal): Promise<void> {
  checkCancelled(signal)
  return new Promise((resolve, reject) => {
    const cancel = () => { clearTimeout(timer); reject(signal.reason) }
    const timer = window.setTimeout(() => {
      signal.removeEventListener('abort', cancel)
      resolve()
    }, ms)
    signal.addEventListener('abort', cancel, { once: true })
  })
}

export function idleTask(signal: AbortSignal): Promise<void> {
  checkCancelled(signal)
  return new Promise((resolve, reject) => {
    let timer = 0, idle = 0
    const cancel = () => {
      clearTimeout(timer)
      if (idle) window.cancelIdleCallback(idle)
      reject(signal.reason)
    }
    const done = () => { signal.removeEventListener('abort', cancel); resolve() }
    signal.addEventListener('abort', cancel, { once: true })
    if (typeof window.requestIdleCallback === 'function') {
      idle = window.requestIdleCallback(done, { timeout: 1500 })
    } else timer = window.setTimeout(done, 64)
  })
}

export async function afterPageLoad(signal: AbortSignal): Promise<void> {
  checkCancelled(signal)
  if (document.readyState !== 'complete') {
    await new Promise<void>((resolve, reject) => {
      const cancel = () => { window.removeEventListener('load', loaded); reject(signal.reason) }
      const loaded = () => { signal.removeEventListener('abort', cancel); resolve() }
      window.addEventListener('load', loaded, { once: true })
      signal.addEventListener('abort', cancel, { once: true })
    })
  }
  await document.fonts.ready
  checkCancelled(signal)
  // Protect the page's first paint/initial interactions, then use browser idle time.
  await pause(1000, signal)
  await idleTask(signal)
}
