# Скрипт для проверки изменений в проекте
Write-Host "=== Проверка изменений в проекте ===" -ForegroundColor Cyan

Write-Host "`n1. Git status:" -ForegroundColor Yellow
git status

Write-Host "`n2. Измененные файлы (git diff --name-only):" -ForegroundColor Yellow
$modified = git diff --name-only
if ($modified) {
    $modified | ForEach-Object { Write-Host "  M $_" -ForegroundColor Green }
} else {
    Write-Host "  Нет измененных файлов" -ForegroundColor Gray
}

Write-Host "`n3. Файлы в staging (git diff --cached --name-only):" -ForegroundColor Yellow
$staged = git diff --cached --name-only
if ($staged) {
    $staged | ForEach-Object { Write-Host "  A $_" -ForegroundColor Cyan }
} else {
    Write-Host "  Нет файлов в staging" -ForegroundColor Gray
}

Write-Host "`n4. Неотслеживаемые файлы (исключая .md, .txt, .log, .ps1, .py):" -ForegroundColor Yellow
$untracked = git ls-files --others --exclude-standard | Where-Object { $_ -notmatch '\.md$|\.txt$|\.log$|\.ps1$|\.py$|\.json$' }
if ($untracked) {
    $untracked | ForEach-Object { Write-Host "  ? $_" -ForegroundColor Yellow }
} else {
    Write-Host "  Нет неотслеживаемых файлов" -ForegroundColor Gray
}

Write-Host "`n5. Разница с origin/master:" -ForegroundColor Yellow
git fetch origin master 2>&1 | Out-Null
$diff = git diff origin/master --name-status
if ($diff) {
    $diff | ForEach-Object { Write-Host "  $_" -ForegroundColor Magenta }
} else {
    Write-Host "  Локальная ветка синхронизирована с origin/master" -ForegroundColor Gray
}

Write-Host "`n6. Последние 5 коммитов:" -ForegroundColor Yellow
git log --oneline -5

Write-Host "`n=== Проверка завершена ===" -ForegroundColor Cyan
