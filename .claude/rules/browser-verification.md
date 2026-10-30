---
paths:
  - "src/**"
  - "public/**"
---

# Проверка в браузере

## Что это
Когда Claude проверяет результат в браузере (скриншоты, инструменты Chrome), после проверки он закрывает все вкладки, которые сам открыл.

## Важно
Вкладки, которые открыли вы, не трогаем. Свои временные вкладки не оставляем.

## Для Claude (техническое)
Всё ниже — для Claude: исходный текст правил, как он был. Читать не обязательно.

## Browser verification workflow (loads whenever site code/assets are touched — covers ui-design, pages, seo-content, performance work alike)

After finishing any browser-based verification (screenshots, DevTools/Chrome MCP checks), close every tab/window Claude itself opened for that verification. Never close tabs the user had open; don't leave your own temporary tabs open once the task is done.
