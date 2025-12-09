# Получаем путь к текущей директории скрипта
$repoPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Всегда работаем в папке проекта
Set-Location $repoPath

Write-Host "=== Git backup (commit + push) ===" -ForegroundColor Cyan
Write-Host "Working directory: $repoPath" -ForegroundColor Gray

# Получаем текущую ветку
$currentBranch = git branch --show-current
if (-not $currentBranch) {
    Write-Host "Error: Not a git repository or no branch found!" -ForegroundColor Red
    exit 1
}

Write-Host "Current branch: $currentBranch" -ForegroundColor Gray

# Добавляем ВСЕ изменения: новые файлы, измененные, удаленные
Write-Host "Adding all changes (new, modified, deleted files)..." -ForegroundColor Yellow
git add -A

# Проверяем, есть ли что коммитить
$changes = git status --porcelain

if (-not $changes) {
    Write-Host "No changes in project - nothing to commit." -ForegroundColor Green
}
else {
    Write-Host "Changes detected:" -ForegroundColor Yellow
    git status --short
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $message   = "Auto backup: $timestamp"

    Write-Host "Creating commit: $message" -ForegroundColor Yellow
    git commit -m $message
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Commit failed!" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "Pushing to origin/$currentBranch..." -ForegroundColor Yellow
    git push origin $currentBranch
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Push failed!" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
}

Write-Host "Git backup finished." -ForegroundColor Cyan

