# Анализ проблемы: неотображающиеся цены в заголовке подкатегорий на мобильной версии

**Дата анализа:** 2025-01-26  
**Страница:** `/uslugi/wynajem-drukarek`  
**Элемент:** Цены в заголовке подкатегорий (30, 50, 100), видимые на десктопе в свернутом аккордеоне

---

## 1. Расположение HTML-блока с ценами

### Файл: `src/app/uslugi/service-accordion.tsx`

**Компонент:** `ServiceAccordion` → `AccordionTrigger` для подкатегорий wynajem-drukarek

**Условие рендеринга:** Строка 1431
```tsx
{service.slug === 'wynajem-drukarek' && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && subcategory.price ? (
```

**Две версии рендеринга:**

### Десктопная версия (строки 1442-1548):
```tsx
<div className="hidden md:flex items-center" style={{ width: 'calc(100% - 40px)' }}>
  {/* Иконка */}
  <div ref={headerRefs.icon}>...</div>
  {/* Текст заголовка */}
  <div ref={headerRefs.text}>...</div>
  {/* ЦЕНЫ - РЕНДЕРЯТСЯ ЗДЕСЬ */}
  {subcategory.price.split(' / ').map((price, idx) => (
    <div ref={headerRefs.prices[idx]}>
      <div className="text-lg font-normal text-[#ffffff]">
        <span>{price}</span>
        {isSubcategoryOpen(...) && <span>zł</span>}
      </div>
    </div>
  ))}
</div>
```

### Мобильная версия (строки 1549-1607):
```tsx
<div className="md:hidden flex flex-col w-full gap-2">
  <div className="flex items-center gap-2.5">
    {/* Иконка */}
    <div>...</div>
    {/* Текст заголовка */}
    <div className="flex-1 min-w-0">
      <h4>...</h4>
    </div>
  </div>
  <div className="pl-[52px] -mt-0.5">
    {/* Только ссылка "Zobacz szczegóły" */}
    <div>Zobacz szczegóły</div>
  </div>
  {/* ⚠️ ЦЕНЫ НЕ РЕНДЕРЯТСЯ ЗДЕСЬ! */}
</div>
```

---

## 2. CSS-правила для мобильной версии

### Применяемые классы:

**Строка 1549:** `className="md:hidden flex flex-col w-full gap-2"`
- `md:hidden` — скрывает на экранах >= 768px (показывает только на мобильных)
- `flex flex-col` — вертикальная компоновка
- `w-full` — полная ширина
- `gap-2` — отступ между элементами

**Строка 1550:** `className="flex items-center gap-2.5"`
- Горизонтальная компоновка для иконки и заголовка

**Строка 1561:** `className="flex-1 min-w-0"`
- Заголовок занимает оставшееся пространство

**Строка 1598:** `className="pl-[52px] -mt-0.5"`
- Отступ слева для ссылки "Zobacz szczegóły"

### Проблемные CSS-свойства:

**НЕТ проблемных CSS-свойств** — проблема не в стилях, а в **отсутствии рендеринга цен** в мобильной версии!

---

## 3. Media Queries

### Применяемые media queries:

1. **Строка 1442:** `className="hidden md:flex"`
   - **Десктоп:** `hidden` на мобильных, `md:flex` на экранах >= 768px
   - **Результат:** Десктопная версия с ценами показывается только на больших экранах

2. **Строка 1549:** `className="md:hidden flex flex-col"`
   - **Мобильная:** `md:hidden` скрывает на экранах >= 768px
   - **Результат:** Мобильная версия показывается только на маленьких экранах

3. **Строка 1680:** `className="hidden md:flex"`
   - **Альтернативный блок с ценами:** Также скрыт на мобильных
   - **Результат:** Этот блок тоже не показывается на мобильных

### Вывод:

**Media queries работают корректно**, но в мобильной версии (строки 1549-1607) **вообще нет кода для рендеринга цен**.

---

## 4. Проверка конфликтов слоёв

### Проверенные свойства:

**z-index:** Не используется в этом блоке  
**position:** Не используется (элементы в нормальном потоке)  
**clip:** Не используется  
**transform:** Используется только для hover-эффектов (`group-hover:translate-x-1`)

### Вывод:

**Нет конфликтов слоёв** — проблема не в позиционировании или наложении элементов.

---

## 5. Точные строки кода

### Десктопная версия с ценами:

**Строка 1442:** Контейнер десктопной версии
```tsx
<div className="hidden md:flex items-center" style={{ width: 'calc(100% - 40px)' }}>
```

**Строки 1523-1544:** Рендеринг цен (только для десктопа)
```tsx
{subcategory.price.split(' / ').map((price, idx) => (
  <div 
    key={idx}
    ref={headerRefs.prices[idx]}
    className="flex items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
    style={{ width: `calc((100% - 40px - 8px) * 0.2)`, marginLeft: idx === 0 ? '8px' : '0' }}
  >
    <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3]">
      <span className="inline-flex items-start">
        <span>{price}</span>
        {isSubcategoryOpen(section.id, subcategory.id) && (
          <span className="font-table-sub text-[16px] text-[#ede0c4] leading-[1.3] ml-0.5 inline-flex" 
            style={{ textShadow: supplementTextShadow, marginTop: '-3px' }}>
            zł
          </span>
        )}
      </span>
    </div>
  </div>
))}
```

### Мобильная версия БЕЗ цен:

**Строка 1549:** Контейнер мобильной версии
```tsx
<div className="md:hidden flex flex-col w-full gap-2">
```

**Строки 1550-1597:** Иконка и заголовок
```tsx
<div className="flex items-center gap-2.5">
  <div className="w-[40px] h-[40px]">...</div> {/* Иконка */}
  <div className="flex-1 min-w-0">
    <h4>...</h4> {/* Заголовок */}
  </div>
</div>
```

**Строки 1598-1606:** Только ссылка "Zobacz szczegóły"
```tsx
<div className="pl-[52px] -mt-0.5">
  <div className="flex items-center gap-2 text-[#bfa76a] text-xs font-serif">
    <span>Zobacz szczegóły</span>
    <ArrowRight className="w-3 h-3" />
  </div>
</div>
```

**⚠️ ЦЕНЫ ОТСУТСТВУЮТ В МОБИЛЬНОЙ ВЕРСИИ!**

### Альтернативный блок с ценами (тоже скрыт на мобильных):

**Строка 1679-1689:** Блок с ценами в другом месте (для подкатегорий без специального рендеринга)
```tsx
{service.slug === 'wynajem-drukarek' && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && subcategory.price && (
  <div className="hidden md:flex items-center justify-end flex-shrink-0 min-w-[200px]">
    <div className="font-inter text-[14px] text-[rgba(255,255,255,0.9)] leading-[1.3] text-right whitespace-nowrap">
      {subcategory.price.split(' / ').map((price, idx, arr) => (
        <span key={idx}>
          {price}
          {idx < arr.length - 1 && ' / '}
        </span>
      ))}
    </div>
  </div>
)}
```

**⚠️ Этот блок тоже имеет `hidden md:flex` — скрыт на мобильных!**

---

## 6. Краткое резюме

### Причина проблемы:

**Цены не отображаются на мобильной версии, потому что они вообще не рендерятся в мобильном блоке.**

### Детали:

1. **Десктопная версия (строки 1442-1548):**
   - Имеет класс `hidden md:flex` — показывается только на экранах >= 768px
   - **Содержит рендеринг цен** в строках 1523-1544
   - Цены отображаются в трёх колонках с границами

2. **Мобильная версия (строки 1549-1607):**
   - Имеет класс `md:hidden` — показывается только на экранах < 768px
   - **НЕ содержит рендеринга цен**
   - Содержит только:
     - Иконку (строки 1551-1560)
     - Заголовок подкатегории (строки 1562-1595)
     - Ссылку "Zobacz szczegóły" (строки 1598-1606)

3. **Альтернативный блок (строки 1679-1689):**
   - Также имеет класс `hidden md:flex` — скрыт на мобильных
   - Содержит рендеринг цен, но не используется для подкатегорий wynajem-drukarek с `subcategory.price`

### Вывод:

**Проблема не в CSS (display:none, visibility:hidden, overflow:hidden) и не в конфликтах слоёв (z-index, position).**

**Проблема в том, что в мобильной версии (строки 1549-1607) отсутствует код для рендеринга цен.**

**Решение:** Добавить рендеринг цен в мобильный блок (строки 1549-1607), аналогично десктопной версии, но с адаптивным layout для мобильных устройств.

---

**Статус:** ✅ Проблема идентифицирована — цены не рендерятся в мобильной версии компонента.



