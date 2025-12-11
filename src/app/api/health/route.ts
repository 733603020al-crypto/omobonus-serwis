import { NextResponse } from 'next/server'

/**
 * Health check endpoint для проверки конфигурации SMTP
 * Используется для диагностики проблем с переменными окружения
 * 
 * Доступ: GET /api/health
 * 
 * Возвращает:
 * - status: 'ok' | 'error'
 * - smtp: информация о конфигурации SMTP (без паролей)
 * - environment: текущее окружение
 */
export async function GET() {
  const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS']
  const envStatus: Record<string, { exists: boolean; value?: string }> = {}
  const missing: string[] = []

  // Проверка наличия переменных окружения
  for (const key of requiredEnvVars) {
    const value = process.env[key]
    const exists = !!value && value.trim() !== ''
    
    envStatus[key] = {
      exists,
      // Показываем значение только для несекретных переменных
      value: key === 'SMTP_PASS' ? (exists ? '***' : undefined) : value,
    }

    if (!exists) {
      missing.push(key)
    }
  }

  // Проверка опциональных переменных
  const optionalEnvVars = ['SMTP_FROM', 'SMTP_TO']
  for (const key of optionalEnvVars) {
    const value = process.env[key]
    envStatus[key] = {
      exists: !!value && value.trim() !== '',
      value: value,
    }
  }

  const isHealthy = missing.length === 0
  const nodeEnv = process.env.NODE_ENV || 'unknown'

  return NextResponse.json(
    {
      status: isHealthy ? 'ok' : 'error',
      environment: nodeEnv,
      smtp: {
        configured: isHealthy,
        missing: missing.length > 0 ? missing : undefined,
        variables: envStatus,
      },
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

