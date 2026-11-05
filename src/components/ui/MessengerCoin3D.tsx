'use client'

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import {
  BackSide,
  BufferGeometry,
  CanvasTexture,
  LinearFilter,
  DoubleSide,
  Float32BufferAttribute,
  FrontSide,
  NeutralToneMapping,
  SRGBColorSpace,
  type Group,
} from 'three'

// 3D-монета из плоской иконки: контур монеты повторяет силуэт иконки,
// лицо и оборот — сама иконка, бока — металлический ободок.
// Общий компонент для иконок мессенджеров. Принцип взят из hasuwini77/3d-logo-skill (MIT), парение и оборот по hover дописаны.

const PLANE = 1
const THICKNESS = 0.13
const VIEW_HALF = 0.58 // холст чуть больше иконки: запас под парение
const SPIN_MS = 900

type Assets = { map: CanvasTexture; rim: BufferGeometry; rimColor: string }

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// Moore-обход границы по альфа-каналу (первый связный контур)
function traceOutline(alpha: Uint8Array, w: number, h: number) {
  const solid = (x: number, y: number) => x >= 0 && y >= 0 && x < w && y < h && alpha[y * w + x] > 128
  let sx = -1
  let sy = -1
  outer: for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (solid(x, y)) { sx = x; sy = y; break outer }
  if (sx < 0) return []
  const dirs = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]
  const pts: [number, number][] = [[sx, sy]]
  let cx = sx
  let cy = sy
  let d = 6
  for (let guard = 0; guard < w * h * 4; guard++) {
    let found = false
    for (let i = 0; i < 8; i++) {
      const nd = (d + 6 + i) % 8
      const nx = cx + dirs[nd][0]
      const ny = cy + dirs[nd][1]
      if (solid(nx, ny)) { cx = nx; cy = ny; d = nd; found = true; break }
    }
    if (!found) break
    if (cx === sx && cy === sy) break
    pts.push([cx, cy])
  }
  return pts
}

function resampleAndSmooth(pts: [number, number][], count: number) {
  const n = pts.length
  const len: number[] = [0]
  for (let i = 1; i <= n; i++) {
    const a = pts[i - 1]
    const b = pts[i % n]
    len.push(len[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1]))
  }
  const total = len[n]
  const out: [number, number][] = []
  let seg = 0
  for (let k = 0; k < count; k++) {
    const t = (k / count) * total
    while (len[seg + 1] < t) seg++
    const a = pts[seg]
    const b = pts[(seg + 1) % n]
    const f = (t - len[seg]) / Math.max(len[seg + 1] - len[seg], 1e-6)
    out.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f])
  }
  for (let it = 0; it < 6; it++) {
    const prev = out.map((p) => [...p] as [number, number])
    for (let i = 0; i < count; i++) {
      const p = prev[(i + count - 1) % count]
      const q = prev[(i + 1) % count]
      out[i][0] = prev[i][0] * 0.5 + (p[0] + q[0]) * 0.25
      out[i][1] = prev[i][1] * 0.5 + (p[1] + q[1]) * 0.25
    }
  }
  return out
}

function buildRim(outline: [number, number][], half: number) {
  const n = outline.length
  let area = 0
  for (let i = 0; i < n; i++) {
    const a = outline[i]
    const b = outline[(i + 1) % n]
    area += a[0] * b[1] - b[0] * a[1]
  }
  const sign = area > 0 ? 1 : -1
  const pos: number[] = []
  const nor: number[] = []
  const idx: number[] = []
  for (let i = 0; i < n; i++) {
    const p = outline[(i + n - 1) % n]
    const q = outline[(i + 1) % n]
    let tx = q[0] - p[0]
    let ty = q[1] - p[1]
    const l = Math.hypot(tx, ty) || 1
    tx /= l
    ty /= l
    const nx = ty * sign
    const ny = -tx * sign
    const [x, y] = outline[i]
    pos.push(x, y, half, x, y, -half)
    nor.push(nx, ny, 0, nx, ny, 0)
    const f1 = i * 2
    const b1 = f1 + 1
    const f2 = ((i + 1) % n) * 2
    const b2 = f2 + 1
    idx.push(f1, b1, f2, b1, b2, f2)
  }
  const g = new BufferGeometry()
  g.setAttribute('position', new Float32BufferAttribute(pos, 3))
  g.setAttribute('normal', new Float32BufferAttribute(nor, 3))
  g.setIndex(idx)
  return g
}

async function prepareAssets(src: string, displayPx: number): Promise<Assets> {
  const img = await loadImage(src)
  const w = img.naturalWidth
  const h = img.naturalHeight
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!
  ctx.drawImage(img, 0, 0)
  const data = ctx.getImageData(0, 0, w, h).data
  const alpha = new Uint8Array(w * h)
  for (let i = 0; i < w * h; i++) alpha[i] = data[i * 4 + 3]
  const raw = traceOutline(alpha, w, h)
  const outline = resampleAndSmooth(raw, 360).map(([px, py]): [number, number] => [
    (px / w - 0.5) * PLANE,
    (0.5 - py / h) * PLANE,
  ])
  // цвет ободка — средний цвет иконки у самого края, чуть темнее
  let r = 0, g = 0, b = 0, c = 0
  for (const [px, py] of raw) {
    const x = Math.round(px + (w / 2 - px) * 0.04)
    const y = Math.round(py + (h / 2 - py) * 0.04)
    const o = (y * w + x) * 4
    if (data[o + 3] > 200) { r += data[o]; g += data[o + 1]; b += data[o + 2]; c++ }
  }
  const k = 0.78 / Math.max(c, 1)
  const rimColor = `rgb(${Math.round(r * k)},${Math.round(g * k)},${Math.round(b * k)})`
  // текстура лица заранее уменьшается до реального размера показа (с учётом DPR) браузерным фильтром — как у обычной картинки
  const texPx = Math.min(w, Math.max(32, Math.round(displayPx * Math.min(window.devicePixelRatio || 1, 2))))
  const face = document.createElement('canvas')
  face.width = texPx
  face.height = texPx
  const fctx = face.getContext('2d')!
  fctx.imageSmoothingQuality = 'high'
  fctx.drawImage(img, 0, 0, texPx, texPx)
  const map = new CanvasTexture(face)
  map.colorSpace = SRGBColorSpace
  map.generateMipmaps = false
  map.minFilter = LinearFilter
  return { map, rim: buildRim(outline, THICKNESS / 2), rimColor }
}

function FitCamera() {
  const camera = useThree((s) => s.camera)
  const height = useThree((s) => s.size.height)
  useLayoutEffect(() => {
    camera.zoom = height / 2 / VIEW_HALF
    camera.updateProjectionMatrix()
  }, [camera, height])
  return null
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

function Coin({ assets, spinTick, onReady }: { assets: Assets; spinTick: number; onReady: () => void }) {
  const group = useRef<Group>(null)
  const spinStart = useRef<number | null>(null)
  const readyRef = useRef(false)
  const handledTick = useRef(0)
  const invalidate = useThree((st) => st.invalidate)

  const startSpin = useMemo(
    () => () => {
      if (spinStart.current !== null || handledTick.current === 0) return
      spinStart.current = performance.now()
      invalidate()
    },
    [invalidate],
  )

  // Отрисовка по требованию: пара кадров, чтобы прогрузились текстуры и окружение, затем сообщаем «готово» и начинаем оборот
  useEffect(() => {
    let n = 0
    let raf = 0
    const tick = () => {
      invalidate()
      if (++n < 4) raf = requestAnimationFrame(tick)
      else {
        readyRef.current = true
        onReady()
        handledTick.current = spinTick
        startSpin()
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // следующие наведения: ещё один оборот, если прошлый закончился
  useEffect(() => {
    if (!readyRef.current || spinTick === handledTick.current) return
    handledTick.current = spinTick
    startSpin()
  }, [spinTick, startSpin])

  // Парение в покое делает CSS; здесь кадры рисуются только пока идёт оборот
  useFrame((state) => {
    const g = group.current
    if (!g) return
    let yaw = 0
    if (spinStart.current !== null) {
      const p = (performance.now() - spinStart.current) / SPIN_MS
      if (p >= 1) spinStart.current = null
      else {
        yaw = easeInOut(p) * Math.PI * 2
        state.invalidate()
      }
    }
    g.rotation.y = yaw
  })

  const half = THICKNESS / 2
  const face = (side: typeof FrontSide | typeof BackSide) => (
    // без освещения и тонмаппинга: лицо монеты в покое пиксель в пиксель совпадает с исходной иконкой
    <meshBasicMaterial map={assets.map} toneMapped={false} side={side} transparent depthWrite={false} />
  )
  return (
    <group ref={group}>
      <mesh position={[0, 0, half]}>
        <planeGeometry args={[PLANE, PLANE]} />
        {face(FrontSide)}
      </mesh>
      {/* та же плоскость, видимая сзади; отражена по X, чтобы логотип читался не зеркально (силуэт иконки симметричен, ободок совпадает) */}
      <mesh position={[0, 0, -half]} scale={[-1, 1, 1]}>
        <planeGeometry args={[PLANE, PLANE]} />
        {face(BackSide)}
      </mesh>
      <mesh geometry={assets.rim}>
        <meshStandardMaterial color={assets.rimColor} metalness={0.85} roughness={0.3} envMapIntensity={1.4} side={DoubleSide} />
      </mesh>
    </group>
  )
}

export default function MessengerCoin3D({ src, size, spinTick, onReady }: { src: string; size: number; spinTick: number; onReady: () => void }) {
  const [assets, setAssets] = useState<Assets | null>(null)

  useEffect(() => {
    let alive = true
    prepareAssets(src, size).then((a) => {
      if (alive) setAssets(a)
    })
    return () => {
      alive = false
    }
  }, [src, size])

  // освобождаем текстуру и геометрию ободка при уходе со страницы
  useEffect(() => {
    if (!assets) return
    return () => {
      assets.map.dispose()
      assets.rim.dispose()
    }
  }, [assets])

  if (!assets) return null
  return (
    <Canvas
      orthographic
      frameloop="demand"
      camera={{ position: [0, 0, 6], near: 0.1, far: 20 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power', toneMapping: NeutralToneMapping }}
      dpr={[1, 2]}
      style={{ position: 'absolute', inset: '-8%', width: '116%', height: '116%', pointerEvents: 'none' }}
    >
      <FitCamera />
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 4]} intensity={1.6} />
      <directionalLight position={[-2, -1, 3]} intensity={0.5} color="#bfffd0" />
      <Environment resolution={64}>
        <Lightformer form="rect" intensity={2} position={[0, 3, 3]} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[-4, 0, 2]} scale={[2, 4, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[4, 0, -2]} scale={[2, 4, 1]} />
      </Environment>
      <Suspense fallback={null}>
        <Coin assets={assets} spinTick={spinTick} onReady={onReady} />
      </Suspense>
    </Canvas>
  )
}
