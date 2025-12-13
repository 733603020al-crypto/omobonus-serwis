# Сравнительная таблица стилей для надписей в скобках

## Сравнение двух элементов:

1. **Subtitle подкатегории**: `(zacina etykiety, nie pobiera, wciąga krzywo lub „gubi" odstępy)`
2. **Описание в услуге**: `(resztki etykiet, oderwany liner, kurz, drobne elementy – typowa przyczyna powtarzających się zacięć)`

---

## 📊 Детальное сравнение по всем компонентам

| Компонент | Subtitle подкатегории | Описание в услуге | Различие |
|-----------|----------------------|-------------------|----------|
| **Функция рендеринга** | `renderParenthesesText(subcategory.subtitle)` | `renderParenthesesText(parsed.parentheses)` | ✅ Одинаково |
| **CSS классы (renderParenthesesText)** | `text-[14px] text-[#cbb27c] leading-relaxed` | `text-[14px] text-[#cbb27c] leading-relaxed` | ✅ Одинаково |
| **Inline стили (renderParenthesesText)** | `opacity: 1, fontSize: '14px', color: '#cbb27c', lineHeight: '1.625', fontStyle: 'normal', fontWeight: 'normal'` | `opacity: 1, fontSize: '14px', color: '#cbb27c', lineHeight: '1.625', fontStyle: 'normal', fontWeight: 'normal'` | ✅ Одинаково |
| **Родительский контейнер (1 уровень)** | `<div>` (без классов, строка 2883) | `<div className="service-description-text">` (строка 2988) | ⚠️ **РАЗЛИЧИЕ** |
| **Родительский контейнер (2 уровень)** | Внутри `<div>` рядом с `<h4>` (строка 2850) | Внутри `<TableCell>` (строка 2984) | ⚠️ **РАЗЛИЧИЕ** |
| **Родительский контейнер (TableCell)** | ❌ Нет | `className="font-table-main text-[rgba(255,255,245,0.85)] py-1 pl-2 pr-2 !whitespace-normal w-auto max-w-[67%] leading-[1.3] tracking-normal overflow-hidden"` | ⚠️ **РАЗЛИЧИЕ** |
| **Наследование font-family** | ❌ Нет `font-table-main` | ✅ Есть `font-table-main` от TableCell | ⚠️ **РАЗЛИЧИЕ** |
| **Наследование font-weight** | ❌ Нет | `font-weight: 500` (от `font-table-main`) | ⚠️ **РАЗЛИЧИЕ** |
| **Наследование color** | ❌ Нет | `text-[rgba(255,255,245,0.85)]` (от TableCell) | ⚠️ **РАЗЛИЧИЕ** |
| **Наследование line-height** | ❌ Нет | `leading-[1.3]` (от TableCell) | ⚠️ **РАЗЛИЧИЕ** |
| **Наследование letter-spacing** | ❌ Нет | `tracking-normal` (от TableCell) | ⚠️ **РАЗЛИЧИЕ** |
| **CSS класс .service-description-text** | ❌ Не применяется | ✅ Применяется: `word-break: break-word; overflow-wrap: anywhere;` | ⚠️ **РАЗЛИЧИЕ** |
| **Контекст рендеринга** | После заголовка `<h4>` в разделе подкатегории | Внутри строки таблицы (`TableRow` → `TableCell`) | ⚠️ **РАЗЛИЧИЕ** |

---

## 🔍 Детальный анализ различий

### 1. Родительские контейнеры

#### Subtitle подкатегории:
```tsx
<div>  {/* строка 2850, без классов */}
  <h4 className="font-table-main ... text-lg font-semibold text-[#ffffff]">
    {subcategory.title}
  </h4>
  {subcategory.subtitle && section.id !== 'faq' && (
    renderParenthesesText(subcategory.subtitle)  {/* строка 2881 */}
  )}
</div>
```

#### Описание в услуге:
```tsx
<TableCell className="font-table-main text-[rgba(255,255,245,0.85)] py-1 pl-2 pr-2 !whitespace-normal w-auto max-w-[67%] leading-[1.3] tracking-normal overflow-hidden">
  <div className="service-description-text">  {/* строка 2988 */}
    <div className="text-[16px] text-white service-description-text leading-[1.3]">
      {parsed.main}
    </div>
    {parsed.parentheses && renderParenthesesText(parsed.parentheses)}  {/* строка 2992 */}
  </div>
</TableCell>
```

### 2. CSS классы и их влияние

#### `.font-table-main` (из `globals.css`):
```css
.font-table-main {
  font-family: var(--font-cormorant), serif;
  font-weight: 500;  /* ⚠️ Это может переопределять fontWeight: 'normal' */
}
```

#### `.service-description-text` (из `globals.css`):
```css
.service-description-text {
  word-break: break-word;
  overflow-wrap: anywhere;
}
```

### 3. Наследование стилей от TableCell

TableCell имеет классы:
- `font-table-main` → `font-family: Cormorant, serif` + `font-weight: 500`
- `text-[rgba(255,255,245,0.85)]` → цвет текста
- `leading-[1.3]` → line-height (может конфликтовать с `leading-relaxed` = `1.625`)
- `tracking-normal` → letter-spacing

---

## ⚠️ Потенциальные проблемы

1. **Font-weight**: `font-table-main` устанавливает `font-weight: 500`, но inline стиль устанавливает `fontWeight: 'normal'`. Приоритет inline выше, но может быть конфликт.

2. **Font-family**: `font-table-main` устанавливает шрифт `Cormorant`, который наследуется дочерними элементами. Subtitle не имеет этого контекста.

3. **Line-height**: TableCell имеет `leading-[1.3]`, а `renderParenthesesText` использует `leading-relaxed` (1.625). Может быть конфликт.

4. **Color**: TableCell имеет `text-[rgba(255,255,245,0.85)]`, но inline стиль устанавливает `color: '#cbb27c'`. Inline имеет приоритет, но наследование может влиять.

5. **Контейнер `.service-description-text`**: Добавляет `word-break: break-word` и `overflow-wrap: anywhere`, которые могут влиять на перенос текста.

---

## ✅ Решение

Чтобы гарантировать **полностью одинаковое** отображение, нужно:

1. **Добавить `!important` к inline стилям** или
2. **Добавить `font-table-main` к родительскому контейнеру subtitle** или
3. **Обернуть результат `renderParenthesesText` в контейнер с явными стилями**, который блокирует наследование

### Рекомендуемое решение:
Добавить в `renderParenthesesText` inline стили с `!important` или обернуть в контейнер, который полностью изолирует стили от родительских элементов.

