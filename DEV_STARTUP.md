# Инструкция по безопасному запуску dev-сервера

## Проблема

Next.js dev-сервер может зависать или вылетать с ошибками типа:
- `Error: Cannot find module './vendor-chunks/@radix-ui.js'`
- `Error: Cannot find module './948.js'`
- Зависание при "Restarting the server to apply changes"

## Решение

### Вариант 1: Автоматический безопасный запуск (рекомендуется)

Используйте скрипт `dev:safe`, который автоматически:
1. Останавливает все процессы Node.js
2. Освобождает порт 3000
3. Очищает кеш (.next, .turbo)
4. Запускает dev-сервер

```bash
npm run dev:safe
```

### Вариант 2: Ручная очистка и запуск

Если нужно запустить вручную:

```powershell
# 1. Остановить все процессы Node.js
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# 2. Освободить порт 3000 (если занят)
$port = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($port) {
    Stop-Process -Id $port.OwningProcess -Force
}

# 3. Очистить кеш
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .turbo -ErrorAction SilentlyContinue

# 4. Запустить сервер
npm run dev
```

### Вариант 3: Использовать скрипт напрямую

```powershell
powershell -ExecutionPolicy Bypass -File ./start-dev.ps1
```

## Что делать при зависании

1. Остановите все процессы Node.js (Ctrl+C в терминале, или через диспетчер задач)
2. Используйте `npm run dev:safe` для безопасного перезапуска
3. Если проблема сохраняется, удалите `node_modules` и переустановите зависимости:
   ```bash
   Remove-Item -Recurse -Force node_modules
   Remove-Item -Force package-lock.json
   npm install
   npm run dev:safe
   ```

## Рекомендации

- **Всегда используйте `npm run dev:safe`** вместо обычного `npm run dev` для предотвращения зависаний
- Если Cursor автоматически запускает `npm run dev`, остановите процесс вручную перед новым запуском
- При изменении `next.config.js` всегда перезапускайте сервер безопасным способом















