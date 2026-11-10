#!/bin/sh
# Установка защитных хуков в этот репозиторий (хуки в .git не версионируются): sh omobonus-serwis/scripts/git-hooks/install.sh
src=$(cd "$(dirname "$0")" && pwd)
root=$(cd "$src" && git rev-parse --git-common-dir) || exit 1
case "$root" in /*|?:*) ;; *) root="$src/$root" ;; esac
for h in pre-commit pre-push; do cp "$src/$h" "$root/hooks/$h" && chmod +x "$root/hooks/$h" || exit 1; done
echo "Хуки установлены: $root/hooks"
