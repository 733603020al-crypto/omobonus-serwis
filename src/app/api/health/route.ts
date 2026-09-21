import { NextResponse } from 'next/server'

/**
 * Health check endpoint для мониторинга.
 *
 * Доступ: GET /api/health
 *
 * Возвращает только базовый статус: 'ok' (200) или 'error' (503, если SMTP не настроен).
 * Имена переменных окружения, хосты и прочие детали конфигурации наружу не отдаются;
 * что именно не настроено, видно в логах сервера (send-email пишет их при обращении формы).
 */
export async function GET() {
  const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS']
  const isHealthy = requiredEnvVars.every(key => !!process.env[key]?.trim())

  return NextResponse.json(
    {
      status: isHealthy ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
    },
    {
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    },
  )
}
