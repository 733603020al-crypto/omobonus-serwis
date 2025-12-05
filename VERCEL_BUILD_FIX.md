# Исправление ошибки сборки на Vercel

## Проверка текущего состояния

### package.json - Скрипты:
- ✅ "dev": "next dev" - корректно
- ✅ "build": "next build" - стандартный скрипт сборки
- ✅ "start": "next start" - корректно
- ✅ "lint": "eslint" - корректно
- ✅ Нет скрипта "vercel-build" - это правильно

### vercel.json:
- ✅ "framework": "nextjs" - корректно

## Проблема

Vercel выдает ошибку: "Command npm run vercel-build exited with 1"

Это означает, что Vercel пытается запустить `npm run vercel-build`, которого нет в package.json.

## Решение

Vercel для Next.js проектов должен автоматически использовать `npm run build`. 
Если Vercel все равно ищет `vercel-build`, возможны два варианта:

1. **Проблема в настройках Vercel** - в Dashboard проекта указан неправильный Build Command
2. **Можно добавить алиас** - добавить "vercel-build": "next build" в package.json для совместимости

Рекомендуется добавить алиас для гарантированной совместимости.

















