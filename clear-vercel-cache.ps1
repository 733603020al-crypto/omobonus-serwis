# Скрипт для очистки кэша Vercel и редеплоя проекта
# Использование: .\clear-vercel-cache.ps1

Write-Host "=== Очистка кэша Vercel и редеплой ===" -ForegroundColor Cyan

# Проверка наличия Vercel CLI
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "Vercel CLI не найден. Устанавливаю..." -ForegroundColor Yellow
    npm install -g vercel@latest
}

# Проверка авторизации
Write-Host "`nПроверка авторизации в Vercel..." -ForegroundColor Cyan
$vercelWhoami = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Требуется авторизация в Vercel. Выполните: vercel login" -ForegroundColor Yellow
    Write-Host "Или используйте инструкции в VERCEL_CACHE_CLEAR_INSTRUCTIONS.md" -ForegroundColor Yellow
    exit 1
}

Write-Host "Авторизован как: $vercelWhoami" -ForegroundColor Green

# Получение информации о проекте
Write-Host "`nПолучение информации о проекте..." -ForegroundColor Cyan
$projectInfo = vercel ls --json 2>&1 | ConvertFrom-Json
if ($projectInfo) {
    Write-Host "Найден проект: $($projectInfo.name)" -ForegroundColor Green
}

# Очистка кэша через удаление последнего деплоя и создание нового
Write-Host "`nЗапуск редеплоя с очисткой кэша..." -ForegroundColor Cyan
Write-Host "Это создаст новый деплой с полной переустановкой зависимостей" -ForegroundColor Yellow

# Деплой с флагом --force (принудительный деплой)
Write-Host "`nВыполнение деплоя..." -ForegroundColor Cyan
vercel --prod --force

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n=== Деплой успешно завершен! ===" -ForegroundColor Green
    Write-Host "Проверьте статус на https://vercel.com/dashboard" -ForegroundColor Cyan
} else {
    Write-Host "`n=== Ошибка при деплое ===" -ForegroundColor Red
    Write-Host "Проверьте логи выше для диагностики" -ForegroundColor Yellow
    Write-Host "`nАльтернативный способ:" -ForegroundColor Yellow
    Write-Host "1. Откройте https://vercel.com/dashboard" -ForegroundColor Cyan
    Write-Host "2. Перейдите в проект omobonus-serwis" -ForegroundColor Cyan
    Write-Host "3. Откройте последний деплой" -ForegroundColor Cyan
    Write-Host "4. Нажмите 'Redeploy' с опцией 'Use existing Build Cache' = OFF" -ForegroundColor Cyan
}




