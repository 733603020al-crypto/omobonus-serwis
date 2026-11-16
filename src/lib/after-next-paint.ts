// Runs `fn` right after the browser has painted the next frame. A tap handler that
// starts heavy synchronous work through it lets the frame for the tap itself be
// presented first (INP); the work then runs unchanged, at most one frame later.
// The timeout is a fallback for a tab that is not being painted (no animation frames).
export function afterNextPaint(fn: () => void) {
  let done = false
  const run = () => {
    if (done) return
    done = true
    fn()
  }
  requestAnimationFrame(() => setTimeout(run, 0))
  setTimeout(run, 200)
}
