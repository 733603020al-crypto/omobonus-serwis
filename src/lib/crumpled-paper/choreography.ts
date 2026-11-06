// Presentation only: the original paper mesh and its lighting stay in engine.js.
export type Drift = { x: number; y: number; angle: number; sx?: number; sy?: number }
export const rest: Drift = { x: 0, y: 0, angle: 0 }
export const entranceTiming = (width: number) => ({ flight: width < 768 ? 840 : 960, settle: 400 })
export const smooth = (t: number) => {
  const u = Math.max(0, Math.min(1, t))
  return u * u * u * (10 + u * (-15 + 6 * u))
}

export function floatAt(elapsed: number): Drift {
  const t = Math.max(0, Math.min(1, elapsed / 3600))
  const envelope = Math.sin(Math.PI * t) ** 2
  return {
    x: 5 * Math.sin(2 * Math.PI * t) * envelope,
    y: -10 * envelope,
    angle: 1.6 * Math.sin(2 * Math.PI * t - .3) * envelope,
  }
}

// Analytic, lightly underdamped spring: mass 1.5, stiffness 65, damping 18.
// Retargeting carries position AND velocity; no reset to the start of a gesture.
export function springAt(position: Drift, velocity: Drift, elapsed: number) {
  const t = Math.max(0, elapsed / 1000), a = 6, w = Math.sqrt(65 / 1.5 - a * a)
  const decay = Math.exp(-a * t), c = Math.cos(w * t), s = Math.sin(w * t)
  const value = { ...rest }, speed = { ...rest }
  for (const key of ['x', 'y', 'angle'] as const) {
    const p = position[key], b = (velocity[key] + a * p) / w
    value[key] = decay * (p * c + b * s)
    speed[key] = decay * ((-a * p + w * b) * c + (-a * b - w * p) * s)
  }
  return { value, speed }
}

// A banked flight followed by a weighted landing. Hermite tangents at touchdown
// match the spring's initial velocity, so translation and rotation don't stop.
export function entranceAt(elapsed: number, distance: number, lift: number, flightMs: number, settleMs: number): Drift {
  const landing = { x: 5, y: 1.5, angle: 1.1 }
  const velocity = { x: -14, y: 9, angle: -3 }
  if (elapsed >= flightMs) {
    const value = springAt(landing, velocity, elapsed - flightMs).value
    const tail = 1 - smooth((elapsed - flightMs - settleMs * .35) / (settleMs * .65))
    return { x: value.x * tail, y: value.y * tail, angle: value.angle * tail }
  }
  const t = Math.max(0, elapsed / flightMs), h0 = 2 * t ** 3 - 3 * t * t + 1
  const h1 = -2 * t ** 3 + 3 * t * t, tangent = t ** 3 - t * t
  return {
    x: -distance * h0 + landing.x * h1 + velocity.x * flightMs / 1000 * tangent,
    y: -lift * h0 + landing.y * h1 + velocity.y * flightMs / 1000 * tangent - Math.min(60, lift * .5) * Math.sin(Math.PI * t) ** 2,
    angle: -22 * h0 + landing.angle * h1 + velocity.angle * flightMs / 1000 * tangent,
  }
}

// Symmetric C2 timing leaves enough travel for the final creases to release.
export const unfold = (t: number) => {
  return smooth(t)
}

// Follow the material's release, not wall time: either timing curve keeps the
// same framing. A gentle bank clears the widest diagonal fold on narrow screens;
// the weighted dip clears the lifted top corner without a camera zoom.
export function revealDrift(released: number, mobile: boolean, lateral = mobile ? 1 : 0, shortness = 0): Drift {
  const gesture = (start: number, peak: number, end: number) => released <= peak
    ? smooth((released - start) / (peak - start))
    : 1 - smooth((released - peak) / (end - peak))
  const bank = gesture(.20, .54, .88)
  // The maximal desktop sheet needs a longer, weighted arc as its top crease
  // lifts. Finish the dip before the flat hold; the camera scale never changes.
  const tail = 1 - smooth((released - .735) / (.982 - .735))
  const tailWeight = 1.25 - .55 * smooth((released - .80) / (.92 - .80)) + .10 * smooth((released - .92) / .04)
  const weight = mobile ? gesture(.38, .735, .943 + .037 * shortness) : released <= .735
    ? smooth((released - .38) / (.735 - .38))
    : tail ** tailWeight
  // Translation is relative to the projected document size, so short windows
  // retain the same gesture instead of receiving an oversized fixed-pixel dip.
  return { x: .038 * bank * lateral, y: .13 * weight, angle: mobile ? 4 * bank : 0 }
}

// Intro scene: a thrown ball hits the table, squashes, hops and is handed to the
// opening while still rising. One continuous curve: fast arrival, a short squash,
// a parabolic (gravity) hop with stretch, then a small second hop for the tail
// (played only when the opening does not take over).
const IMPACT_MS = 110, HOP_MS = 520, HOP2_MS = 260, HOP_PEAK = 34
export const arrivalTiming = (width: number) => {
  const flight = width < 768 ? 840 : 960
  return { flight, handoff: flight + IMPACT_MS + HOP_MS * .3, total: flight + IMPACT_MS + HOP_MS + HOP2_MS }
}
export function arrivalAt(elapsed: number, distance: number, lift: number, flightMs: number, size: number): Drift {
  const land = { x: 5, y: 1.5, angle: 1.1 }
  // sy < 1 flattens against the table: keep the bottom edge in contact
  const finish = (x: number, y: number, angle: number, sy: number): Drift =>
    ({ x, y: y + (1 - sy) * size / 2, angle, sx: 1 + (1 - sy) * .9, sy })
  if (elapsed < flightMs) {
    const t = Math.max(0, elapsed / flightMs), h0 = 2 * t ** 3 - 3 * t * t + 1, h1 = 1 - h0, tangent = t ** 3 - t * t
    return finish(
      -distance * h0 + land.x * h1 + distance * 1.5 * tangent,
      -lift * h0 + land.y * h1 + lift * 1.6 * tangent - Math.min(60, lift * .5) * Math.sin(Math.PI * t) ** 2,
      -22 * h0 + land.angle * h1 - 3 * flightMs / 1000 * tangent,
      1 - .06 * smooth((t - .75) / .25),
    )
  }
  const e = elapsed - flightMs
  if (e < IMPACT_MS) return finish(land.x, land.y, land.angle, .94 - .16 * (1 - (1 - e / IMPACT_MS) ** 2))
  const u = Math.min(1, (e - IMPACT_MS) / HOP_MS)
  if (u < 1) {
    const sy = u < .15 ? .78 + .32 * smooth(u / .15) : u < .3 ? 1.1 - .1 * smooth((u - .15) / .15) : 1 - .06 * smooth((u - .75) / .25)
    return finish(land.x + 14 * (1 - (1 - u) ** 2), land.y - HOP_PEAK * 4 * u * (1 - u), land.angle + 5 * Math.sin(Math.PI * u) * (1 - u), sy)
  }
  const v = Math.min(1, (e - IMPACT_MS - HOP_MS) / HOP2_MS)
  return finish(land.x + 14, land.y - 8 * 4 * v * (1 - v), land.angle * (1 - smooth(v)), 1 - .06 * (1 - smooth(Math.min(1, v * 2))))
}
