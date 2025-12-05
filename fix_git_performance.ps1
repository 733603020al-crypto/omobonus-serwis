# Скрипт для устранения зависаний Git
Write-Host "Очистка блокировок Git..." -ForegroundColor Yellow

# Удаляем блокировки
if (Test-Path ".git\index.lock") {
    Remove-Item ".git\index.lock" -Force
    Write-Host "  ✓ index.lock удален" -ForegroundColor Green
}

# Очищаем все lock файлы
Get-ChildItem -Path ".git" -Filter "*.lock" -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
    Remove-Item $_.FullName -Force -ErrorAction SilentlyContinue
}

# Очищаем кеш Git
Write-Host "Очистка кеша Git..." -ForegroundColor Yellow
git gc --prune=now --quiet 2>$null

# Оптимизируем конфигурацию Git
Write-Host "Оптимизация конфигурации Git..." -ForegroundColor Yellow
git config --local core.preloadindex true
git config --local core.fscache true
git config --local gc.auto 256
git config --local status.submodulesummary false
git config --local diff.ignoreSubmodules all

Write-Host "  ✓ Git оптимизирован" -ForegroundColor Green
Write-Host ""
Write-Host "Готово! Git должен работать быстрее." -ForegroundColor Green




