$repoPath = "C:\Users\Andrii\omobonus-serwis-v3"

# Всегда работаем в папке проекта
Set-Location $repoPath

Write-Host "=== Git backup (commit + push) ==="

# Добавляем все изменения
git add .

# Проверяем, есть ли что коммитить
$changes = git status --porcelain

if (-not $changes) {
    Write-Host "No changes in project - nothing to commit."
}
else {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    $message   = "Auto backup: $timestamp"

    Write-Host "Creating commit: $message"
    git commit -m $message

    Write-Host "Pushing to origin/main..."
    git push origin main
}

Write-Host "Git backup finished."

