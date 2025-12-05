# Скрипт для безопасного запуска dev-сервера
# Оптимизирован для работы с Cursor - не создает фоновых процессов
# Всегда останавливает старые процессы перед запуском

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Безопасный запуск Next.js dev-сервера" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/4] Останавливаю все процессы Node.js..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 500
Write-Host "  ✓ Процессы Node.js остановлены" -ForegroundColor Green

Write-Host "[2/4] Проверяю порт 3000..." -ForegroundColor Yellow
$port = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($port) {
    $pid = $port.OwningProcess
    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    Write-Host "  ✓ Порт 3000 освобожден (PID: $pid)" -ForegroundColor Green
    Start-Sleep -Milliseconds 500
} else {
    Write-Host "  ✓ Порт 3000 свободен" -ForegroundColor Green
}

Write-Host "[3/4] Очищаю кеш..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .turbo -ErrorAction SilentlyContinue
Write-Host "  ✓ Кеш очищен" -ForegroundColor Green

Write-Host "[4/4] Запускаю dev-сервер..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Сервер будет доступен на http://localhost:3000" -ForegroundColor Cyan
Write-Host "Для остановки нажмите Ctrl+C" -ForegroundColor Gray
Write-Host ""

# Запускаем напрямую, без фоновых процессов - это важно для Cursor
npm run dev
