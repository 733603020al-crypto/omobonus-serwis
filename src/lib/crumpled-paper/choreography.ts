// Presentation only: the original paper mesh and its lighting stay in engine.js.
export type Drift = { x: number; y: number; angle: number }
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
