#!/bin/bash

# Скрипт установки Git hooks для автоматического запуска npm run dev
# Запустите этот скрипт после клонирования репозитория

echo "🔧 Установка Git hooks..."

HOOKS_DIR=".git/hooks"
SCRIPTS_DIR="scripts/hooks"

if [ ! -d "$HOOKS_DIR" ]; then
    echo "❌ Папка .git/hooks не найдена. Убедитесь, что вы в корне Git репозитория."
    exit 1
fi

if [ ! -d "$SCRIPTS_DIR" ]; then
    echo "❌ Папка scripts/hooks не найдена."
    exit 1
fi

# Копируем hooks
cp "$SCRIPTS_DIR/post-commit" "$HOOKS_DIR/post-commit"
cp "$SCRIPTS_DIR/post-merge" "$HOOKS_DIR/post-merge"

# Делаем исполняемыми
chmod +x "$HOOKS_DIR/post-commit"
chmod +x "$HOOKS_DIR/post-merge"

echo "✅ Git hooks установлены:"
echo "   - post-commit (запуск после коммита)"
echo "   - post-merge (запуск после pull)"
echo ""
echo "📝 Hooks будут автоматически запускать npm run dev после коммита или pull"
echo ""



