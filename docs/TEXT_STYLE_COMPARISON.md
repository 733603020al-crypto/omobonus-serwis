# Сравнение стилей текста

## 1. Длинные описания (SEO-текст)
**Пример:** "Serwis drukarek laserowych i urządzeń wielofunkcyjnych (MFU) we Wrocławiu – naprawa drukarek laserowych..."

**Местоположение:** `src/app/uslugi/[slug]/page.tsx` (строка 214)

**Стили:**
```tsx
<p className="text-[12px] text-[#cbb27c] leading-relaxed text-justify max-w-4xl mx-auto">
```

**Характеристики:**
- **Размер:** `12px` (text-[12px])
- **Цвет:** `#cbb27c` (золотой)
- **Line-height:** `1.625` (leading-relaxed)
- **Выравнивание:** `text-justify` (по ширине)
- **Ширина:** `max-w-4xl` (максимальная ширина)
- **Центрирование:** `mx-auto`
- **Изоляция стилей:** НЕТ (нет CSS класса с !important)

---

## 2. Текст в скобках
**Пример:** "(Wrocław do 10 km, w tym diagnoza)"

**Местоположение:** Рендерится через `renderParenthesesText()` в `src/app/uslugi/service-accordion.tsx`

**Стили:**
```tsx
<div className="parentheses-text-isolated text-[14px] text-[#cbb27c] leading-relaxed">
```

**CSS класс `.parentheses-text-isolated`:**
```css
.parentheses-text-isolated {
  color: #cbb27c !important;
  line-height: 1.625 !important;
  font-style: normal !important;
  font-weight: normal !important;
  letter-spacing: normal !important;
  font-family: inherit !important;
}
```

**Характеристики:**
- **Размер:** `14px` (для описаний в услугах) или `12px` (для subtitle подкатегорий)
- **Цвет:** `#cbb27c` (золотой) - через CSS `!important`
- **Line-height:** `1.625` (leading-relaxed) - через CSS `!important`
- **Выравнивание:** НЕТ (по умолчанию, слева)
- **Ширина:** НЕТ ограничения
- **Центрирование:** НЕТ
- **Изоляция стилей:** ДА (через CSS класс с `!important`)

---

## Основные различия:

| Характеристика | Длинные описания | Текст в скобках |
|----------------|------------------|-----------------|
| **Размер шрифта** | 12px | 14px (или 12px для subtitle) |
| **Цвет** | #cbb27c | #cbb27c (одинаково) |
| **Line-height** | 1.625 | 1.625 (одинаково) |
| **Выравнивание** | text-justify (по ширине) | НЕТ (слева) |
| **Ширина** | max-w-4xl | НЕТ ограничения |
| **Центрирование** | mx-auto | НЕТ |
| **Изоляция стилей** | НЕТ | ДА (через CSS !important) |
| **Font-weight** | Наследуется | normal !important |
| **Letter-spacing** | Наследуется | normal !important |
| **Font-family** | Наследуется | inherit !important |

---

## Выводы:

1. **Размер:** Длинные описания меньше (12px), текст в скобках больше (14px)
2. **Выравнивание:** Длинные описания выровнены по ширине, текст в скобках - слева
3. **Изоляция:** Текст в скобках имеет защиту от наследования стилей родительских элементов через CSS `!important`
4. **Ширина:** Длинные описания ограничены по ширине и центрированы, текст в скобках - нет



