import { NextRequest, NextResponse } from 'next/server'

/**
 * Простое ограничение частоты запросов по IP для API-роутов (фиксированное окно, in-memory).
 *
 * Ограничение: состояние живёт в памяти одного экземпляра serverless-функции, поэтому это
 * защита «по мере возможности» от всплесков с одного IP, а не жёсткий глобальный лимит.
 * Жёсткий лимит на уровне платформы — Vercel Firewall (Rate Limiting) в настройках проекта.
 */

type Bucket = { count: number; resetAt: number }

const WINDOW_MS = 60_000
const CLEANUP_THRESHOLD = 1_000
const MAX_BUCKETS = 10_000

const buckets = new Map<string, Bucket>()

function getClientIp(request: NextRequest): string | null {
  // На Vercel эти заголовки выставляет платформа (клиентские значения перезаписываются)
  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp

  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || null
}

function purgeExpired(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key)
  }
}

/**
 * Возвращает готовый ответ 429, если лимит для (роут, IP) превышен, иначе null.
 * Если IP определить не удалось — запрос пропускается (не блокируем всех сразу).
 *
 * @param name  уникальное имя роута — у каждого роута свой счётчик
 * @param limit максимум запросов с одного IP за минуту
 */
export function rateLimit(request: NextRequest, name: string, limit: number): NextResponse | null {
  const ip = getClientIp(request)
  if (!ip) return null

  const now = Date.now()
  if (buckets.size > CLEANUP_THRESHOLD) purgeExpired(now)
  if (buckets.size > MAX_BUCKETS) buckets.clear()

  const key = `${name}:${ip}`
  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return null
  }

  bucket.count += 1
  if (bucket.count <= limit) return null

  const retryAfter = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))
  return NextResponse.json(
    { success: false, error: 'Too many requests', errorType: 'RATE_LIMITED' },
    { status: 429, headers: { 'Retry-After': String(retryAfter) } },
  )
}
