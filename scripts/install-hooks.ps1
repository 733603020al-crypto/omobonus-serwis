# Скрипт установки Git hooks (БЕЗОПАСНАЯ ВЕРСИЯ)
# Устанавливает hooks, которые не блокируют Cursor
# Запустите этот скрипт после клонирования репозитория

Write-Host "🔧 Установка Git hooks (безопасная версия)..." -ForegroundColor Yellow

$hooksDir = ".git\hooks"
$scriptsDir = "scripts\hooks"

if (-not (Test-Path $hooksDir)) {
    Write-Host "❌ Папка .git\hooks не найдена. Убедитесь, что вы в корне Git репозитория." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $scriptsDir)) {
    Write-Host "❌ Папка scripts\hooks не найдена." -ForegroundColor Red
    exit 1
}

# Копируем безопасные hooks (не запускают процессы в фоне)
Copy-Item "$scriptsDir\post-commit" "$hooksDir\post-commit" -Force
Copy-Item "$scriptsDir\post-merge" "$hooksDir\post-merge" -Force

# Делаем hooks исполняемыми (для Unix-подобных систем)
if (Get-Command chmod -ErrorAction SilentlyContinue) {
    chmod +x "$hooksDir\post-commit"
    chmod +x "$hooksDir\post-merge"
}

Write-Host "✅ Git hooks установлены (безопасная версия):" -ForegroundColor Green
Write-Host "   - post-commit (информационный, не блокирует)" -ForegroundColor Green
Write-Host "   - post-merge (информационный, не блокирует)" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Hooks теперь только выводят информацию и не запускают процессы" -ForegroundColor Cyan
Write-Host "💡 Это предотвращает зависания Cursor после git команд" -ForegroundColor Cyan
Write-Host ""

