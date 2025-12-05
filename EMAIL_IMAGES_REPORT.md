# Полный отчет: Изображения в письмах Resend для Outlook

## 1. Параметры изображений в HTML-шаблоне

### 1.1 Фон письма

**Текущая реализация:**
```css
background-image: url('https://www.omobonus.com.pl/images/zmiety%20arkusz%20papieru%202.png');
background-size: cover;
background-position: center;
background-repeat: no-repeat;
```

**Параметры:**
- **Путь к файлу (src):** `https://www.omobonus.com.pl/images/zmiety%20arkusz%20papieru%202.png`
- **Абсолютный или относительный URL:** Абсолютный внешний URL (HTTPS)
- **MIME-тип:** Не указан явно, определяется автоматически как `image/png`
- **Base64 или внешняя ссылка:** Внешняя ссылка (HTTP/HTTPS)
- **Локальный путь в проекте:** `public/images/zmiety arkusz papieru 2.png`

**В VML для Outlook:**
```xml
<v:fill type="frame" src="https://www.omobonus.com.pl/images/zmiety%20arkusz%20papieru%202.png" color="transparent"/>
```

### 1.2 Логотип

**Текущая реализация:**
```html
<img src="https://www.omobonus.com.pl/images/Logo_Omobonus.png" 
     alt="Omobonus Serwis" 
     width="200" 
     height="auto" 
     style="max-width: 200px; height: auto; display: block; margin: 0 auto; border: 0; outline: none; text-decoration: none;" />
```

**Параметры:**
- **Путь к файлу (src):** `https://www.omobonus.com.pl/images/Logo_Omobonus.png`
- **Абсолютный или относительный URL:** Абсолютный внешний URL (HTTPS)
- **MIME-тип:** Не указан явно, определяется автоматически как `image/png`
- **Base64 или внешняя ссылка:** Внешняя ссылка (HTTP/HTTPS)
- **CID (Content-ID):** НЕТ
- **Локальный путь в проекте:** `public/images/Logo_Omobonus.png`

## 2. Где берутся изображения

### 2.1 Фон
- **Локальный путь:** `public/images/zmiety arkusz papieru 2.png`
- **Текущий URL в коде:** `https://www.omobonus.com.pl/images/zmiety%20arkusz%20papieru%202.png`
- **Откуда используется:** Встроен в HTML как внешняя ссылка

### 2.2 Логотип
- **Локальный путь:** `public/images/Logo_Omobonus.png`
- **Текущий URL в коде:** `https://www.omobonus.com.pl/images/Logo_Omobonus.png`
- **Откуда используется:** Встроен в HTML как внешняя ссылка

## 3. Проблема: Почему Outlook не отображает изображения

### 3.1 Проблемы с внешними URL

1. **Блокировка внешних изображений:**
   - Outlook по умолчанию блокирует загрузку внешних изображений
   - Пользователь должен вручную разрешить загрузку
   - Даже после разрешения изображения могут не загружаться

2. **VML не работает с внешними URL:**
   - VML в Outlook может не загружать изображения с внешних источников
   - Фоновые изображения требуют, чтобы изображение было доступно в момент рендеринга

3. **Проблемы с доступностью:**
   - Если URL недоступен, Outlook показывает запасной цвет
   - Могут быть проблемы с CORS или SSL сертификатами

### 3.2 Resend не встраивает изображения автоматически

- Resend отправляет HTML как есть
- Изображения остаются внешними ссылками
- Resend НЕ преобразует их в base64 автоматически
- Resend НЕ добавляет изображения как CID attachments автоматически

## 4. Как Resend обрабатывает изображения

### 4.1 Текущий способ (внешние URL)

**HTML, который отправляется:**
```html
<table style="background-image: url('https://www.omobonus.com.pl/images/zmiety%20arkusz%20papieru%202.png');">
  ...
  <img src="https://www.omobonus.com.pl/images/Logo_Omobonus.png" />
</table>
```

**Что происходит:**
- Resend отправляет HTML с внешними URL
- Почтовые клиенты загружают изображения самостоятельно
- Outlook блокирует такие изображения по умолчанию

### 4.2 Альтернативные способы встраивания

#### Вариант 1: Base64 inline (рекомендуется)

**HTML:**
```html
<table style="background-image: url('data:image/png;base64,iVBORw0KGgoAAAANS...');">
  ...
  <img src="data:image/png;base64,iVBORw0KGgoAAAANS..." />
</table>
```

**Преимущества:**
- ✅ Работает в Outlook без блокировок
- ✅ Не требует внешних запросов
- ✅ Всегда доступно
- ✅ Работает в VML

**Недостатки:**
- ❌ Увеличивает размер письма (~30-50%)
- ❌ Увеличивает размер HTML

#### Вариант 2: CID attachments

**HTML:**
```html
<img src="cid:logo" />
```

**Resend API:**
```typescript
resend.emails.send({
  html: emailHtml,
  attachments: [
    {
      filename: 'logo.png',
      content: Buffer.from(logoFile),
      contentId: 'logo',
    }
  ]
})
```

**Преимущества:**
- ✅ Не увеличивает размер HTML
- ✅ Работает в Outlook

**Недостатки:**
- ❌ Сложнее для фоновых изображений
- ❌ Требует дополнительной настройки

## 5. Решение: Base64 встроенные изображения

### 5.1 Реализация

Читать файлы из `public/images/` во время генерации письма и конвертировать в base64:

```typescript
import fs from 'fs'
import path from 'path'

// Пути к изображениям
const backgroundImagePath = path.join(process.cwd(), 'public', 'images', 'zmiety arkusz papieru 2.png')
const logoImagePath = path.join(process.cwd(), 'public', 'images', 'Logo_Omobonus.png')

// Чтение и конвертация в base64
const backgroundBase64 = fs.readFileSync(backgroundImagePath).toString('base64')
const logoBase64 = fs.readFileSync(logoImagePath).toString('base64')

// Data URLs для использования в HTML
const backgroundDataUrl = `data:image/png;base64,${backgroundBase64}`
const logoDataUrl = `data:image/png;base64,${logoBase64}`
```

### 5.2 Использование в HTML

**Фон:**
```css
background-image: url('data:image/png;base64,iVBORw0KGgoAAAANS...');
```

**VML для Outlook:**
```xml
<v:fill type="frame" src="data:image/png;base64,iVBORw0KGgoAAAANS..." color="transparent"/>
```

**Логотип:**
```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANS..." alt="Logo" />
```

## 6. Примеры реального HTML, который будет отправлен

### 6.1 Текущий (внешние URL) - НЕ работает в Outlook:

```html
<table style="background-image: url('https://www.omobonus.com.pl/images/zmiety%20arkusz%20papieru%202.png');">
  <img src="https://www.omobonus.com.pl/images/Logo_Omobonus.png" />
</table>
```

### 6.2 С base64 - РАБОТАЕТ в Outlook:

```html
<table style="background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...');">
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..." />
</table>
```

## 7. Рекомендации

1. **Использовать base64 для встроенных изображений:**
   - Фон письма → base64
   - Логотип → base64

2. **Оставить внешние URL только если:**
   - Изображения очень большие (>500KB)
   - Нужна кэшируемость
   - Готовы к проблемам в Outlook

3. **Тестирование:**
   - Тестировать в Outlook (desktop и web)
   - Проверять размер письма
   - Проверять скорость загрузки

## Выводы

1. **Текущая проблема:** Использование внешних URL, которые Outlook блокирует
2. **Решение:** Встроить изображения как base64 в HTML
3. **Реализация:** Читать файлы из `public/images/` и конвертировать в base64
4. **Результат:** Изображения будут работать в Outlook без блокировок

















