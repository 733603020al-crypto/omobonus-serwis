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

// Intro scene as real ballistics (viewport px, y down): a ball thrown in from the
// side falls diagonally onto the bottom edge, squashes for ~100 ms, bounces on a
// new parabola up to the screen centre and comes to rest there. Every phase starts
// with the position, direction and spin the previous one ended with.
export type ArrivalPlan = { total: number; at: (elapsed: number) => Drift }
export function planArrival(o: { W: number; H: number; r: number; cx: number; cy: number; mobile: boolean; floorInset: number; returnToRest?: boolean; target?: { x: number; y: number }; endScale?: number }): ArrivalPlan {
  const { W, H, r, cx, cy, mobile } = o
  const g = Math.max(1800, Math.min(2600, 2200 * H / 900))
  const floorY = H - o.floorInset - r // ball centre at the moment of touch
  const x0 = -r - 8, y0 = Math.max(.1 * H, r + 8)
  const xi = W * (mobile ? .26 : .3)
  // 1. flight: x = x0 + vx*t, y = y0 + vy*t + g*t^2/2, entering diagonally downward
  const T1 = .92 * Math.sqrt(2 * (floorY - y0) / g)
  const vx1 = (xi - x0) / T1, vy1 = (floorY - y0 - .5 * g * T1 * T1) / T1
  // 2. contact: the bottom stays on the floor, the vertical radius shrinks to 82%
  const D = .1, vxc = .85 * vx1, xe = xi + vxc * D
  // 3. bounce: one arc whose apex is the target itself (vertical speed 0 there), so the
  // unfolding starts right at the top with no extra settling moves
  const tx = o.target?.x ?? W / 2, ty = Math.min(o.target?.y ?? H / 2, floorY - 40)
  const Tu = Math.sqrt(2 * (floorY - ty) / g), Tb = Tu
  // spin follows the direction of travel and fades out quadratically over the bounce
  const w1 = mobile ? 480 : 540, spin = w1 * (T1 + D) + w1 * Tb / 3
  const rest = o.returnToRest ? .55 : 0, total = (T1 + D + Tb + rest) * 1000
  // volume is kept roughly constant: sx = 1 / sqrt(sy)
  // endScale: the ball grows during the bounce to the size it has when the unfolding starts
  const E = o.endScale ?? 1
  const body = (sy: number, x: number, y: number, a: number, grow = 0): Drift => {
    const gk = 1 + (E - 1) * smooth(grow)
    return { x: x - cx, y: y - cy, angle: a, sx: gk / Math.sqrt(sy), sy: gk * sy }
  }
  return {
    total,
    at(elapsed) {
      const t = Math.max(0, Math.min(total, elapsed)) / 1000
      if (t < T1) {
        const k = t / T1
        const sy = k > .8 ? 1 + .08 * Math.sin(Math.PI * (k - .8) / .2) : 1
        return body(sy, x0 + vx1 * t, y0 + vy1 * t + .5 * g * t * t, w1 * t - spin)
      }
      if (t < T1 + D) {
        const k = (t - T1) / D, sy = 1 - .18 * Math.sin(Math.PI * k)
        return body(sy, xi + vxc * D * k, floorY + r * (1 - sy), w1 * t - spin)
      }
      const s = Math.min(Tb, t - T1 - D), a = w1 * (T1 + D) + w1 * Tb * (1 - (1 - s / Tb) ** 3) / 3 - spin
      const sy = 1 + .1 * Math.sin(Math.PI * Math.min(1, s / (.18 * Tb)))
      const u = s / Tu
      const out = body(s < Tu ? sy : 1, xe + (tx - xe) * (1 - (1 - u) ** 2), floorY - g * Tu * s + .5 * g * s * s, a, u)
      if (!rest || t <= T1 + D + Tb) return out
      const k = smooth((t - T1 - D - Tb) / rest)
      return { ...out, x: out.x * (1 - k), y: out.y * (1 - k) }
    },
  }
}
