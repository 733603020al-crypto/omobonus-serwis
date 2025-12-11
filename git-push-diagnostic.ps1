# Диагностика и выполнение push на GitHub
Write-Host "=== Диагностика Git и Push на GitHub ===" -ForegroundColor Cyan

# Проверка текущей директории
$currentDir = Get-Location
Write-Host "`nТекущая директория: $currentDir" -ForegroundColor Yellow

# Проверка remote
Write-Host "`n1. Проверка remote..." -ForegroundColor Cyan
$remoteUrl = git config --get remote.origin.url
if ($remoteUrl) {
    Write-Host "   Remote URL: $remoteUrl" -ForegroundColor Green
} else {
    Write-Host "   Remote не настроен!" -ForegroundColor Red
    git remote add origin https://github.com/733603020al-crypto/omobonus-serwis.git
    Write-Host "   Remote добавлен" -ForegroundColor Green
}

# Проверка ветки
Write-Host "`n2. Проверка ветки..." -ForegroundColor Cyan
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "   Текущая ветка: $currentBranch" -ForegroundColor $(if ($currentBranch -eq "master") { "Green" } else { "Yellow" })

# Проверка статуса
Write-Host "`n3. Проверка статуса..." -ForegroundColor Cyan
$status = git status --short
if ($status) {
    Write-Host "   Есть незакоммиченные изменения:" -ForegroundColor Yellow
    Write-Host $status
} else {
    Write-Host "   Нет незакоммиченных изменений" -ForegroundColor Green
}

# Проверка локальных коммитов
Write-Host "`n4. Проверка локальных коммитов..." -ForegroundColor Cyan
$unpushed = git log origin/master..HEAD --oneline
if ($unpushed) {
    Write-Host "   Есть неотправленные коммиты:" -ForegroundColor Yellow
    Write-Host $unpushed
} else {
    Write-Host "   Нет неотправленных коммитов" -ForegroundColor Green
}

# Проверка последних коммитов
Write-Host "`n5. Последние 5 коммитов:" -ForegroundColor Cyan
git log --oneline -5

# Добавление всех изменений
Write-Host "`n6. Добавление изменений в staging..." -ForegroundColor Cyan
git add -A
$staged = git diff --cached --name-only
if ($staged) {
    Write-Host "   Добавлены файлы:" -ForegroundColor Yellow
    Write-Host $staged
} else {
    Write-Host "   Нет файлов для добавления" -ForegroundColor Green
}

# Создание коммита
Write-Host "`n7. Создание коммита..." -ForegroundColor Cyan
$commitOutput = git commit -m "fix: clear cache and update Vercel config for clean deployment" 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "   Коммит создан успешно" -ForegroundColor Green
    Write-Host $commitOutput
} else {
    Write-Host "   Коммит не создан (возможно, нет изменений)" -ForegroundColor Yellow
    Write-Host $commitOutput
}

# Fetch для обновления информации о remote
Write-Host "`n8. Обновление информации о remote..." -ForegroundColor Cyan
git fetch origin master 2>&1 | Out-Null
Write-Host "   Fetch выполнен" -ForegroundColor Green

# Push
Write-Host "`n9. Выполнение push на GitHub..." -ForegroundColor Cyan
$pushOutput = git push origin master 2>&1
$pushExitCode = $LASTEXITCODE

if ($pushExitCode -eq 0) {
    Write-Host "   ✅ PUSH УСПЕШЕН!" -ForegroundColor Green
    Write-Host $pushOutput
} else {
    Write-Host "   ❌ PUSH НЕ УДАЛСЯ!" -ForegroundColor Red
    Write-Host "   Exit code: $pushExitCode" -ForegroundColor Red
    Write-Host $pushOutput
    Write-Host "`n   Возможные причины:" -ForegroundColor Yellow
    Write-Host "   - Проблемы с авторизацией (нужен токен или SSH ключ)" -ForegroundColor Yellow
    Write-Host "   - Нет прав на запись в репозиторий" -ForegroundColor Yellow
    Write-Host "   - Проблемы с сетью" -ForegroundColor Yellow
}

# Финальная проверка
Write-Host "`n10. Финальная проверка..." -ForegroundColor Cyan
$unpushedAfter = git log origin/master..HEAD --oneline
if ($unpushedAfter) {
    Write-Host "   ⚠️ Все еще есть неотправленные коммиты:" -ForegroundColor Red
    Write-Host $unpushedAfter
} else {
    Write-Host "   ✅ Все коммиты отправлены!" -ForegroundColor Green
}

Write-Host "`n=== Диагностика завершена ===" -ForegroundColor Cyan


