import type { PaperOptions, PaperScene, PaperState } from './engine'
import { checkCancelled, idleTask } from './idle'

export type Envelope = { left: number; right: number; top: number; bottom: number }

// Reuse the original mesh builder, without changing it or drawing 96 GPU frames.
// Include interpolated poses, not just the stored keys (which can overshoot).
export async function measureEnvelope(scene: PaperScene, options: PaperOptions, state: PaperState, signal: AbortSignal): Promise<Envelope> {
  const mesh = scene as PaperScene & { item(key: string): unknown; build(item: unknown, state: PaperState, options: PaperOptions): void }
  const item = mesh.item(state.key), sample = { ...state }
  const envelope = { left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity }
  const distance = Math.max(state.w, state.h) * 2.6
  // build() computes the vertex positions first and only then the face normals, ambient occlusion and
  // GPU uploads for every triangle. The measurement reads only scene.pos, so the face count is set to 0
  // for its duration (the position loops run over the vertices, not the faces) and restored afterwards.
  const data = (scene as unknown as { d: { F: number } }).d
  const faces = data.F
  data.F = 0
  try {
  let slice = performance.now()
  for (let step = 0; step <= 96; step++) {
    checkCancelled(signal)
    sample.progress = step / 96
    mesh.build(item, sample, options)
    for (let i = 0; i < scene.pos.length; i += 3) {
      const k = distance / (distance - scene.pos[i + 2])
      const x = scene.pos[i] * k, y = -scene.pos[i + 1] * k
      envelope.left = Math.min(envelope.left, x); envelope.right = Math.max(envelope.right, x)
      envelope.top = Math.min(envelope.top, y); envelope.bottom = Math.max(envelope.bottom, y)
    }
    if (performance.now() - slice > 12) { await idleTask(signal); slice = performance.now() }
  }
  } finally { data.F = faces }
  // A live scene may measure its next print while retaining the last ball frame.
  // The prepass changes vertex buffers, so force the next render to rebuild it.
  ;(item as { built: string }).built = ''
  return envelope
}
