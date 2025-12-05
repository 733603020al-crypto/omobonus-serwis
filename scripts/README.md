# Git Hooks для автоматического запуска сервера разработки

## Описание

Этот набор Git hooks автоматически запускает сервер разработки (`npm run dev`) после выполнения коммита или pull.

## Установка

### Windows (PowerShell)
```powershell
.\scripts\install-hooks.ps1
```

### Linux/Mac (Bash)
```bash
bash scripts/install-hooks.sh
```

## Как это работает

- **post-commit**: Автоматически запускается после каждого `git commit`
- **post-merge**: Автоматически запускается после каждого `git pull` или `git merge`

Оба hook:
1. Проверяют, не запущен ли уже процесс `npm run dev`
2. Если сервер не запущен — запускают его автоматически
3. Выводят информацию о статусе запуска

## Отключение

Если нужно временно отключить автоматический запуск:

```bash
# Переименуйте hook (добавьте .disabled)
mv .git/hooks/post-commit .git/hooks/post-commit.disabled
mv .git/hooks/post-merge .git/hooks/post-merge.disabled
```

Для повторного включения:
```bash
mv .git/hooks/post-commit.disabled .git/hooks/post-commit
mv .git/hooks/post-merge.disabled .git/hooks/post-merge
```

## Примечания

- Hooks работают только локально (не на удаленном сервере)
- Сервер запускается в фоновом режиме
- Если сервер уже запущен, hook не будет пытаться запустить его снова



