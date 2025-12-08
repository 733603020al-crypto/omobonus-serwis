# Скрипт для очистки кэша Vercel и повторного деплоя
# Использование: .\vercel-cache-clear.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Очистка кэша Vercel и повторный деплой" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Проверка наличия Vercel CLI
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "⚠️  Vercel CLI не установлен" -ForegroundColor Yellow
    Write-Host "Установка Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    Write-Host ""
}

# Проверка авторизации
Write-Host "Проверка авторизации в Vercel..." -ForegroundColor Cyan
$vercelWhoami = vercel whoami 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Не авторизован в Vercel CLI" -ForegroundColor Red
    Write-Host "Выполните: vercel login" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Альтернативный способ:" -ForegroundColor Yellow
    Write-Host "1. Откройте https://vercel.com/dashboard" -ForegroundColor White
    Write-Host "2. Перейдите в проект omobonus-serwis-v3" -ForegroundColor White
    Write-Host "3. Deployments → последний деплой → три точки → Redeploy" -ForegroundColor White
    Write-Host "4. Включите опцию 'Clear Build Cache' и нажмите Redeploy" -ForegroundColor White
    exit 1
}

Write-Host "✅ Авторизован: $vercelWhoami" -ForegroundColor Green
Write-Host ""

# Получение информации о проекте
Write-Host "Получение информации о проекте..." -ForegroundColor Cyan
$projectInfo = vercel ls 2>&1 | Select-String "omobonus"

if (-not $projectInfo) {
    Write-Host "⚠️  Проект не найден через CLI" -ForegroundColor Yellow
    Write-Host "Используйте Dashboard для очистки кэша" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Инструкции по очистке кэша через Dashboard:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Откройте: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "2. Найдите проект: omobonus-serwis-v3" -ForegroundColor White
Write-Host "3. Перейдите: Deployments" -ForegroundColor White
Write-Host "4. Откройте последний деплой (самый верхний)" -ForegroundColor White
Write-Host "5. Нажмите три точки (⋮) справа от деплоя" -ForegroundColor White
Write-Host "6. Выберите 'Redeploy'" -ForegroundColor White
Write-Host "7. ВАЖНО: Включите опцию 'Clear Build Cache' (Clear cache and redeploy)" -ForegroundColor Yellow
Write-Host "8. Нажмите 'Redeploy'" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Проверка после деплоя:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "После завершения сборки проверьте:" -ForegroundColor White
Write-Host "1. Логи сборки не содержат ошибку 'No Next.js version detected'" -ForegroundColor White
Write-Host "2. Сайт доступен: https://omobonus-serwis.vercel.app" -ForegroundColor White
Write-Host "3. В логах видно использование ветки master" -ForegroundColor White
Write-Host "4. Next.js определён верно в логах" -ForegroundColor White
Write-Host ""
