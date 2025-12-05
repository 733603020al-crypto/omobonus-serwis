# Автоматический скрипт запуска проекта Omobonus Serwis
# Полностью управляет установкой, сборкой и запуском проекта
# Защита от дублирования процессов и стабильный фоновый запуск

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Автоматический запуск Omobonus Serwis  " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Функция для проверки выполнения команды
function Test-Command {
    param($Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

# Функция для проверки, запущен ли сервер на порту 3000
function Test-ServerRunning {
    $port = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
    if ($port) {
        $processId = $port.OwningProcess
        $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
        if ($process) {
            return @{
                IsRunning = $true
                ProcessId = $processId
                ProcessName = $process.ProcessName
            }
        }
    }
    return @{ IsRunning = $false }
}

# Шаг 1: Проверка Node.js
Write-Host "[1/8] Проверяю Node.js..." -ForegroundColor Yellow
if (-not (Test-Command "node")) {
    Write-Host "  ✗ Node.js не установлен!" -ForegroundColor Red
    Write-Host "  Пожалуйста, установите Node.js с https://nodejs.org/" -ForegroundColor Red
    exit 1
}

$nodeVersion = node --version
$npmVersion = npm --version
Write-Host "  ✓ Node.js $nodeVersion установлен" -ForegroundColor Green
Write-Host "  ✓ npm $npmVersion установлен" -ForegroundColor Green
Write-Host ""

# Шаг 2: Проверка, не запущен ли уже сервер
Write-Host "[2/8] Проверяю, не запущен ли уже сервер..." -ForegroundColor Yellow
$serverStatus = Test-ServerRunning

if ($serverStatus.IsRunning) {
    Write-Host "  ⚠ Сервер Omobonus Serwis уже запущен!" -ForegroundColor Yellow
    Write-Host "  → PID: $($serverStatus.ProcessId)" -ForegroundColor Gray
    Write-Host "  → Процесс: $($serverStatus.ProcessName)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  Сайт должен быть доступен по адресу:" -ForegroundColor Cyan
    Write-Host "  http://localhost:3000" -ForegroundColor White -BackgroundColor DarkBlue
    Write-Host ""
    Write-Host "  Для перезапуска сначала остановите сервер:" -ForegroundColor Gray
    Write-Host "    Stop-Process -Id $($serverStatus.ProcessId) -Force" -ForegroundColor Yellow
    Write-Host ""
    
    # Предлагаем открыть браузер, если сервер уже запущен
    $openBrowser = Read-Host "Открыть сайт в браузере? (y/n)"
    if ($openBrowser -eq "y" -or $openBrowser -eq "Y") {
        Start-Process "http://localhost:3000"
    }
    
    exit 0
}

Write-Host "  ✓ Сервер не запущен, можно продолжить" -ForegroundColor Green
Write-Host ""

# Шаг 3: Остановка старых процессов Node.js (на всякий случай)
Write-Host "[3/8] Очищаю старые процессы Node.js..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -eq "" } | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 500
Write-Host "  ✓ Старые процессы очищены" -ForegroundColor Green
Write-Host ""

# Шаг 4: Проверка и установка зависимостей
Write-Host "[4/8] Проверяю зависимости..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "  → Устанавливаю зависимости..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  ✗ Ошибка установки зависимостей!" -ForegroundColor Red
        exit 1
    }
    Write-Host "  ✓ Зависимости установлены" -ForegroundColor Green
} else {
    Write-Host "  ✓ Зависимости найдены" -ForegroundColor Green
}
Write-Host ""

# Шаг 5: Очистка кеша
Write-Host "[5/8] Очищаю кеш сборки..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .turbo -ErrorAction SilentlyContinue
Write-Host "  ✓ Кеш очищен" -ForegroundColor Green
Write-Host ""

# Шаг 6: Сборка проекта
Write-Host "[6/8] Собираю проект Next.js..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ✗ Ошибка сборки проекта!" -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ Проект успешно собран" -ForegroundColor Green
Write-Host ""

# Шаг 7: Запуск dev-сервера в фоновом режиме
Write-Host "[7/8] Запускаю dev-сервер в фоновом режиме..." -ForegroundColor Yellow

# Сохраняем текущую директорию
$currentDir = (Get-Location).Path

# Создаём скрипт для фонового запуска
$tempScript = Join-Path $env:TEMP "omobonus-dev-start.ps1"
$scriptContent = @"
Set-Location '$currentDir'
npm run dev
"@
Set-Content -Path $tempScript -Value $scriptContent -Encoding UTF8

# Запускаем dev-сервер в отдельном окне PowerShell (полностью фоновый режим)
$processInfo = New-Object System.Diagnostics.ProcessStartInfo
$processInfo.FileName = "powershell.exe"
$processInfo.Arguments = "-NoExit -WindowStyle Minimized -ExecutionPolicy Bypass -File `"$tempScript`""
$processInfo.UseShellExecute = $true
$processInfo.CreateNoWindow = $false

$devProcess = [System.Diagnostics.Process]::Start($processInfo)

if ($devProcess) {
    Write-Host "  ✓ Dev-сервер запущен в фоне (PID: $($devProcess.Id))" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "  ✗ Не удалось запустить dev-сервер!" -ForegroundColor Red
    exit 1
}

# Шаг 8: Ожидание запуска сервера и открытие браузера
Write-Host "[8/8] Ожидаю запуск сервера..." -ForegroundColor Yellow

# Ждем пока сервер запустится (проверяем порт)
$maxAttempts = 30
$attempt = 0
$serverReady = $false

while ($attempt -lt $maxAttempts) {
    Start-Sleep -Seconds 1
    $attempt++
    
    $portCheck = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
    if ($portCheck) {
        $serverReady = $true
        break
    }
    
    if ($attempt % 5 -eq 0) {
        Write-Host "  → Ожидание... ($attempt/$maxAttempts)" -ForegroundColor Gray
    }
}

if ($serverReady) {
    Write-Host "  ✓ Сервер успешно запущен на порту 3000" -ForegroundColor Green
    Write-Host ""
    
    # Пауза перед открытием браузера
    Write-Host "  → Пауза 2 секунды перед открытием браузера..." -ForegroundColor Gray
    Start-Sleep -Seconds 2
    
    # Открываем браузер
    Write-Host "Открываю браузер..." -ForegroundColor Yellow
    Start-Process "http://localhost:3000"
    
    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host "  ✓ Проект Omobonus Serwis запущен!      " -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Сайт доступен по адресу:" -ForegroundColor Cyan
    Write-Host "  http://localhost:3000" -ForegroundColor White -BackgroundColor DarkBlue
    Write-Host ""
    Write-Host "  Dev-сервер работает в фоновом режиме." -ForegroundColor Gray
    Write-Host "  Окно PowerShell минимизировано в панели задач." -ForegroundColor Gray
    Write-Host ""
    Write-Host "  Для остановки сервера используйте:" -ForegroundColor Gray
    Write-Host "    Get-Process -Name node | Stop-Process -Force" -ForegroundColor Yellow
    Write-Host "  или закройте минимизированное окно PowerShell" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host "  ⚠ Сервер не ответил в течение $maxAttempts секунд" -ForegroundColor Yellow
    Write-Host "  Процесс запущен, но сервер еще не готов." -ForegroundColor Yellow
    Write-Host "  Проверьте минимизированное окно PowerShell для деталей." -ForegroundColor Yellow
    Write-Host "  PID процесса: $($devProcess.Id)" -ForegroundColor Gray
    Write-Host ""
}
