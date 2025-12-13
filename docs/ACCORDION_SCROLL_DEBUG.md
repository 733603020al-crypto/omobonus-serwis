# Диагностика прокрутки аккордеона при закрытии подкатегорий

## 1️⃣ Актуальный код

### Refs для отслеживания состояния

```typescript
// Расположение: строка ~1468-1475
const prevOpenSubcategoryRef = useRef<string | null>(null)
const scrollPositionOnCloseRef = useRef<{ pageScroll: number; containerScroll: number } | null>(null)
const scrollLockIntervalRef = useRef<number | null>(null)
```

**Назначение:**
- `prevOpenSubcategoryRef` - отслеживает предыдущее значение для определения изменений (НО не используется в текущей реализации)
- `scrollPositionOnCloseRef` - сохраняет позиции прокрутки при закрытии
- `scrollLockIntervalRef` - хранит ID интервала для поддержания позиции

---

### Функция `handleSubcategoryChange`

```typescript
// Расположение: строка ~1594-1626
const handleSubcategoryChange = (sectionId: string, value: string | null) => {
  if (sectionId !== 'naprawy') return
  
  const prevValue = openSubcategory
  const isClosing = prevValue !== null && value === null
  
  // Если закрывается подкатегория, сохраняем позицию прокрутки ДО изменения состояния
  if (isClosing && openSection === 'naprawy') {
    const sectionRef = sectionRefs.current['naprawy']
    if (sectionRef) {
      // Сохраняем текущую позицию прокрутки страницы СРАЗУ, до любого изменения DOM
      const pageScroll = window.scrollY
      
      // Сохраняем позицию прокрутки контейнера (если есть)
      const accordionContentElement = sectionRef.querySelector<HTMLElement>(
        '[data-slot="accordion-content"]'
      )
      
      let containerScroll = 0
      if (accordionContentElement) {
        const scrollableContainer = findScrollableContainer(accordionContentElement)
        if (scrollableContainer) {
          containerScroll = scrollableContainer.scrollTop
        }
      }
      
      // Сохраняем позиции в ref ДО изменения состояния
      scrollPositionOnCloseRef.current = { pageScroll, containerScroll }
    }
  }
  
  // Теперь изменяем состояние (это запустит анимацию закрытия)
  setOpenSubcategory(prev => (prev === value ? null : value))
}
```

**Когда срабатывает:**
- При ЛЮБОМ изменении значения подкатегории (открытие или закрытие)
- Срабатывает ДО изменения состояния (до `setOpenSubcategory`)
- При закрытии: сохраняет позицию прокрутки ДО того, как React обновит DOM

---

### useEffect для секций (openSection)

```typescript
// Расположение: строка ~1652-1655
useEffect(() => {
  if (!openSection) return
  scrollIntoViewIfNeeded(sectionRefs.current[openSection], SECTION_SCROLL_OFFSET)
}, [openSection])
```

**Когда срабатывает:**
- При открытии/закрытии секций (например, "naprawy")
- Прокручивает страницу так, чтобы заголовок секции был виден
- Использует `behavior: 'smooth'` (может конфликтовать с логикой закрытия!)

---

### useEffect для подкатегорий (openSubcategory)

```typescript
// Расположение: строка ~1663-1779
useEffect(() => {
  // Обновляем предыдущее значение для отслеживания изменений
  prevOpenSubcategoryRef.current = openSubcategory

  // Если закрывается подкатегория (стала null) и у нас есть сохраненная позиция
  if (openSubcategory === null && openSection === 'naprawy' && scrollPositionOnCloseRef.current) {
    const sectionRef = sectionRefs.current['naprawy']
    if (!sectionRef) {
      scrollPositionOnCloseRef.current = null
      return
    }

    const savedPositions = scrollPositionOnCloseRef.current

    // Агрессивно поддерживаем позицию прокрутки во время анимации закрытия
    const lockScrollPosition = () => {
      if (!scrollPositionOnCloseRef.current) return
      
      // Поддерживаем позицию прокрутки страницы
      const currentPageScroll = window.scrollY
      if (Math.abs(currentPageScroll - savedPositions.pageScroll) > 1) {
        window.scrollTo({ top: savedPositions.pageScroll, behavior: 'auto' })
      }
      
      // Поддерживаем позицию прокрутки контейнера
      const accordionContentElement = sectionRef.querySelector<HTMLElement>(
        '[data-slot="accordion-content"]'
      )
      
      if (accordionContentElement && savedPositions.containerScroll >= 0) {
        const scrollableContainer = findScrollableContainer(accordionContentElement)
        if (scrollableContainer && Math.abs(scrollableContainer.scrollTop - savedPositions.containerScroll) > 1) {
          scrollableContainer.scrollTop = savedPositions.containerScroll
        }
      }
    }

    // Запускаем активное поддержание позиции каждые 16ms (60 FPS) во время анимации
    if (scrollLockIntervalRef.current) {
      clearInterval(scrollLockIntervalRef.current)
    }
    
    scrollLockIntervalRef.current = window.setInterval(lockScrollPosition, 16)

    // Останавливаем поддержание позиции и финально восстанавливаем после завершения анимации
    setTimeout(() => {
      // Останавливаем интервал поддержания позиции
      if (scrollLockIntervalRef.current) {
        clearInterval(scrollLockIntervalRef.current)
        scrollLockIntervalRef.current = null
      }

      if (!scrollPositionOnCloseRef.current) return

      const finalPositions = scrollPositionOnCloseRef.current
      
      // Финально восстанавливаем позицию прокрутки страницы мгновенно
      window.scrollTo({ top: finalPositions.pageScroll, behavior: 'auto' })
      
      // Финально восстанавливаем позицию прокрутки контейнера
      const accordionContentElement = sectionRef.querySelector<HTMLElement>(
        '[data-slot="accordion-content"]'
      )
      
      if (accordionContentElement && finalPositions.containerScroll >= 0) {
        const scrollableContainer = findScrollableContainer(accordionContentElement)
        if (scrollableContainer) {
          scrollableContainer.scrollTop = finalPositions.containerScroll
        }
      }
      
      // Очищаем сохраненную позицию
      scrollPositionOnCloseRef.current = null
    }, 350)

    return
  }

  // Если открывается подкатегория или секция закрывается, очищаем все состояния
  if (!openSubcategory || openSection !== 'naprawy') {
    // Останавливаем интервал поддержания позиции, если он активен
    if (scrollLockIntervalRef.current) {
      clearInterval(scrollLockIntervalRef.current)
      scrollLockIntervalRef.current = null
    }
    scrollPositionOnCloseRef.current = null
    return
  }
  
  const sectionRef = sectionRefs.current['naprawy']
  const subcategoryRef = subcategoryRefs.current[openSubcategory]
  
  if (!sectionRef || !subcategoryRef) return

  // Останавливаем интервал поддержания позиции, если он активен
  if (scrollLockIntervalRef.current) {
    clearInterval(scrollLockIntervalRef.current)
    scrollLockIntervalRef.current = null
  }
  
  scrollPositionOnCloseRef.current = null

  // Прокручиваем подкатегорию к верху внутри контейнера
  scrollSubcategoryToTop(sectionRef, subcategoryRef, SECTION_SCROLL_OFFSET)
  
  // Cleanup
  return () => {
    if (scrollLockIntervalRef.current) {
      clearInterval(scrollLockIntervalRef.current)
      scrollLockIntervalRef.current = null
    }
  }
}, [openSubcategory, openSection])
```

**Когда срабатывает:**
- При ЛЮБОМ изменении `openSubcategory` или `openSection`
- При закрытии (openSubcategory === null): проверяет наличие сохраненной позиции и запускает поддержание
- При открытии: выполняет прокрутку к подкатегории

**ПРОБЛЕМА:** Использует `prevOpenSubcategoryRef.current = openSubcategory` в начале, но это обновление происходит ПОСЛЕ рендера, поэтому не помогает определить момент закрытия. Вместо этого используется проверка `scrollPositionOnCloseRef.current`, которая должна была быть установлена в `handleSubcategoryChange`.

---

### Функция `scrollIntoViewIfNeeded`

```typescript
// Расположение: строка ~1185-1208
const scrollIntoViewIfNeeded = (
  target?: HTMLDivElement | null,
  offset = SECTION_SCROLL_OFFSET,
  force = false,
) => {
  if (!target) return

  const measureAndScroll = () => {
    const rect = target.getBoundingClientRect()
    const topVisible = rect.top >= offset
    const bottomVisible = rect.bottom <= window.innerHeight - 20

    if (!force && topVisible && bottomVisible) {
      return
    }

    const top = rect.top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })  // ⚠️ ИСПОЛЬЗУЕТ 'smooth'!
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(measureAndScroll)
  })
}
```

**Когда срабатывает:**
- При открытии секции (через useEffect для openSection)
- Использует `behavior: 'smooth'` - может конфликтовать с логикой закрытия!

---

### Функция `findScrollableContainer`

```typescript
// Расположение: строка ~1211-1231
const findScrollableContainer = (accordionContentElement: HTMLElement): HTMLElement | null => {
  const children = Array.from(accordionContentElement.children) as HTMLElement[]
  
  // Проверяем дочерние элементы
  for (const child of children) {
    const styles = window.getComputedStyle(child)
    if (styles.overflowY === 'auto' || styles.overflowY === 'scroll' || 
        (styles.maxHeight !== 'none' && styles.maxHeight !== '0px')) {
      return child
    }
  }
  
  // Проверяем сам AccordionContent
  const styles = window.getComputedStyle(accordionContentElement)
  if (styles.overflowY === 'auto' || styles.overflowY === 'scroll') {
    return accordionContentElement
  }
  
  // Fallback: первый дочерний div или сам AccordionContent
  return children.find(el => el.tagName === 'DIV') || accordionContentElement
}
```

**Назначение:** Находит элемент с `overflow-y: auto` внутри AccordionContent.

---

## 2️⃣ Временное логирование для отладки

**Добавлены console.log в следующие места:**

### В `handleSubcategoryChange`:

```typescript
console.log('[handleSubcategoryChange]', {
  sectionId,
  prevValue,
  newValue: value,
  action: isClosing ? 'CLOSING' : isOpening ? 'OPENING' : 'TOGGLE',
  currentScrollY: window.scrollY,
  openSection,
})

// После сохранения позиции:
console.log('[handleSubcategoryChange] SAVED POSITION', {
  pageScroll,
  containerScroll,
  savedToRef: scrollPositionOnCloseRef.current,
})
```

**Что логируется:**
- sectionId, prevValue, newValue
- Действие: "CLOSING", "OPENING" или "TOGGLE"
- Текущий window.scrollY в момент вызова
- Сохраненные позиции (pageScroll, containerScroll)

---

### В useEffect для openSubcategory (начало):

```typescript
console.log('[useEffect openSubcategory]', {
  openSubcategory,
  openSection,
  hasSavedPosition: !!scrollPositionOnCloseRef.current,
  savedPosition: scrollPositionOnCloseRef.current,
  hasActiveInterval: !!scrollLockIntervalRef.current,
})
```

**Что логируется:**
- Текущее значение openSubcategory
- Наличие сохраненной позиции
- Активность интервала

---

### При обнаружении закрытия:

```typescript
console.log('[useEffect openSubcategory] DETECTED CLOSING - starting scroll lock')
console.log('[useEffect openSubcategory] Starting setInterval for scroll lock')
```

---

### В lockScrollPosition (функция внутри setInterval):

```typescript
// При восстановлении прокрутки страницы:
console.log('[lockScrollPosition] RESTORING page scroll', {
  current: currentPageScroll,
  saved: savedPageScroll,
  diff,
})

// При восстановлении прокрутки контейнера:
console.log('[lockScrollPosition] RESTORING container scroll', {
  current: currentContainerScroll,
  saved: savedContainerScroll,
  diff: containerDiff,
})
```

**Что логируется:**
- Каждое восстановление позиции (только если отклонение > 1px)
- Текущее и сохраненное значение
- Разница между ними

---

### В финальном восстановлении (setTimeout 350ms):

```typescript
console.log('[useEffect openSubcategory] FINAL RESTORE SCROLL - stopping interval and restoring position')
console.log('[useEffect openSubcategory] Interval cleared')

// После восстановления прокрутки страницы:
console.log('[useEffect openSubcategory] FINAL RESTORE page scroll', {
  before: beforeFinalScrollY,
  after: afterFinalScrollY,
  target: finalPositions.pageScroll,
  restored: Math.abs(afterFinalScrollY - finalPositions.pageScroll) < 5,
})

// После восстановления прокрутки контейнера:
console.log('[useEffect openSubcategory] FINAL RESTORE container scroll', {
  before: beforeContainerScroll,
  after: afterContainerScroll,
  target: finalPositions.containerScroll,
  restored: Math.abs(afterContainerScroll - finalPositions.containerScroll) < 5,
})

console.log('[useEffect openSubcategory] Cleaned up saved position')
```

**Что логируется:**
- Маркер начала финального восстановления
- Значения ДО и ПОСЛЕ восстановления
- Целевое значение
- Успешность восстановления (порог 5px)

---

### При открытии подкатегории:

```typescript
console.log('[useEffect openSubcategory] OPENING subcategory - scrolling to top')
console.log('[useEffect openSubcategory] Interval cleared (opening new subcategory)')
```

---

## 3️⃣ Сценарий теста

### Шаги для воспроизведения:

1. Открыть страницу с аккордеоном "Naprawy i usługi serwisowe (opcjonalne)"
2. Пролистать страницу так, чтобы:
   - Заголовок секции был виден вверху (или немного ниже)
   - Под ним были видны несколько подкатегорий
3. Нажать на подкатегорию (например, "Oprogramowanie i konfiguracja")
   - Ожидаемое: подкатегория поднимается под заголовок секции ✅ (работает)
4. Ещё раз нажать на эту же подкатегорию, чтобы её закрыть
   - Ожидаемое: контент сворачивается, но страница НЕ двигается ❌ (не работает)

### Измерения:

**ДО клика по подкатегории для закрытия:**
- `window.scrollY` = ?
- `scrollTop` контейнера с overflow-y-auto = ?

**СРАЗУ после клика (в handleSubcategoryChange):**
- `window.scrollY` = ?
- `scrollPositionOnCloseRef.current.pageScroll` = ?
- `scrollPositionOnCloseRef.current.containerScroll` = ?

**Через 100ms после закрытия:**
- `window.scrollY` = ?
- Работает ли setInterval? (по логам)

**Через 350ms после закрытия (финальное восстановление):**
- `window.scrollY` = ?
- `scrollTop` контейнера = ?
- Остановлен ли setInterval?

---

## 4️⃣ Прямые вопросы и ответы

### 1. Вызывается ли сейчас логика сохранения позиции ДО смены состояния, или фактически после?

**Ответ:** ДА, вызывается ДО. В `handleSubcategoryChange` сохранение происходит до вызова `setOpenSubcategory(prev => ...)`. Однако `setOpenSubcategory` - это асинхронная операция React, и реальное изменение DOM происходит позже, в следующем цикле рендеринга.

### 2. Вызывается ли логика восстановления позиции при закрытии подкатегории (по логам "RESTORE SCROLL")?

**Ответ:** Должна вызываться, но нужно проверить по логам. Условие: `openSubcategory === null && openSection === 'naprawy' && scrollPositionOnCloseRef.current`. Если `scrollPositionOnCloseRef.current` не установлен или очищен, восстановление не произойдет.

### 3. Меняется ли реально window.scrollY / scrollTop контейнера в момент закрытия, несмотря на восстановление?

**Ответ:** Нужно проверить по логам. Возможные причины изменения:
- Браузер автоматически корректирует прокрутку при изменении высоты контента (может происходить быстрее, чем наш setInterval)
- Другие эффекты или обработчики событий прокручивают страницу
- Конфликт с `scrollIntoViewIfNeeded` который использует `behavior: 'smooth'`

### 4. Какой именно элемент в итоге прокручивается браузером при закрытии: window, контейнер с overflow-y-auto, или оба?

**Ответ:** Нужно проверить по логам. Вероятно, прокручивается `window`, так как при изменении высоты контента браузер пытается сохранить видимую позицию, прокручивая окно вниз.

---

## 5️⃣ Потенциальные проблемы

### Проблема 1: Порядок выполнения эффектов

`useEffect` для `openSection` срабатывает при открытии секции и использует `behavior: 'smooth'`. Если секция уже открыта и мы закрываем подкатегорию, этот эффект не должен срабатывать, но нужно проверить.

### Проблема 2: Асинхронность React

`setOpenSubcategory` - асинхронная операция. Между сохранением позиции в `handleSubcategoryChange` и фактическим обновлением DOM может пройти время, в течение которого браузер уже может начать корректировать прокрутку.

### Проблема 3: Скорость восстановления

`setInterval` с интервалом 16ms может быть недостаточно быстрым, если браузер корректирует прокрутку в каждом кадре. Возможно, нужно использовать `requestAnimationFrame` вместо `setInterval`.

### Проблема 4: Прокрутка контейнера vs прокрутка window

Возможно, проблема не в прокрутке window, а в прокрутке контейнера с `overflow-y-auto`. Нужно проверить, меняется ли `scrollTop` контейнера при закрытии.

---

## Следующие шаги

После добавления логов и тестирования нужно проверить:

1. Записывается ли `scrollPositionOnCloseRef.current` в `handleSubcategoryChange`?
2. Запускается ли `setInterval` в useEffect?
3. Срабатывает ли `lockScrollPosition` каждые 16ms?
4. Меняется ли `window.scrollY` несмотря на восстановление?
5. Останавливается ли интервал через 350ms?
6. Выполняется ли финальное восстановление?

