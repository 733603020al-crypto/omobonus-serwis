# ПАКЕТ ПЕРЕДАЧИ → Claude (Antigravity)
## Задача: страница "O nas" — единый сквозной фон

---

## 1. Цель изменения
Страница "O nas" (PL + UK) должна использовать **одно общее сквозное фоновое изображение** под всем контентом (About + Footer), а не отдельный фон у каждой секции. Сейчас `About` и `Footer` рисуют фон каждый сам по себе → на стыке виден "шов". Нужно: один фон-обёртка, секции прозрачные. Header не трогать (у него свой фон — так и оставить).

Визуальный референс: режим "PO ZMIANIE" в `podglad-o-nas.html` (только как картинка-эталон, НЕ вставлять).

## 2. Секции страницы "O nas" (порядок сохранить)
1. `<Header />` — без изменений.
2. `<About />` — Święty Omobonus, "O nas:", цитата, чеклист, KDR, Google-отзывы.
3. `<Footer />` — Kontakt: адрес, телефon, e-mail, godziny, komunikatory, mapa.

## 3. Данные — только из проекта (НЕ выдумывать, НЕ менять смысл)
- Тексты PL: дефолты в `src/components/sections/about.tsx` (объект `PL`) и `src/components/footer.tsx` (объект `PL`).
- Тексты UK: `src/lib/i18n/uk.ts` (`uk.about`, `uk.footer`).
- Телефон/адрес/e-mail/godziny/mapa: уже зашиты в `src/components/footer.tsx`.
- Отзывы: `src/components/google-reviews.tsx`.
- Фон/портрет: `src/config/manifest.ts` → `Background_1`, `omobonus_hero`.
- SEO/meta: `export const metadata` в обоих `page.tsx` — оставить как есть.
- Шрифты/цвета/типографика: Tailwind + `src/app/globals.css` — не менять.

## 4. Файлы к изменению (4 шт.)
1. `src/app/(pl)/o-nas/page.tsx`
2. `src/app/uk/o-nas/page.tsx`
3. `src/components/sections/about.tsx`
4. `src/components/footer.tsx`

## 5. Что сделать
Добавить в `About` и `Footer` необязательный проп `bare?: boolean` (default `false`), который **отключает их собственный фон**. По умолчанию поведение не меняется → другие страницы (главная, и т.д.) остаются идентичны. На страницах "O nas" обернуть `<About bare/>` + `<Footer bare/>` в один общий фон-контейнер.

## 6. Ограничения
- Ветка: **только `test`**.
- Только страница "O nas" (PL + UK) и общие компоненты `About`/`Footer` — но изменения в компонентах **обратно совместимы** (`bare` по умолчанию выключен).
- Главную, kontakt, uslugi, regulamin, polityka и пр. — **не трогать**. Проверить, что без пропа `bare` они рендерятся как раньше.
- Header — не менять.
- Метаданные/SEO — не менять.

---

## 7. ТОЧНЫЙ DIFF

### Файл: `src/components/sections/about.tsx`
```diff
- export function About({ t }: { t?: AboutT } = {}) {
+ export function About({ t, bare = false }: { t?: AboutT; bare?: boolean } = {}) {
    const d = t ?? PL
```
```diff
-      {/* Tło */}
-      <div
-        className="absolute inset-0 bg-cover bg-center"
-        style={{
-          backgroundImage: `url('${manifest.Background_1}')`,
-        }}
-      >
-        <div className="absolute inset-0 bg-black/60" />
-      </div>
+      {/* Tło — pomijane, gdy stroną zarządza wspólne tło (prop `bare`) */}
+      {!bare && (
+        <div
+          className="absolute inset-0 bg-cover bg-center"
+          style={{
+            backgroundImage: `url('${manifest.Background_1}')`,
+          }}
+        >
+          <div className="absolute inset-0 bg-black/60" />
+        </div>
+      )}
```

### Файл: `src/components/footer.tsx`
```diff
- export function Footer({ t }: { t?: FooterT } = {}) {
+ export function Footer({ t, bare = false }: { t?: FooterT; bare?: boolean } = {}) {
    const d = t ?? PL
```
```diff
-      {/* Tło */}
-      <div
-        className="absolute inset-0 bg-cover bg-center"
-        style={{ backgroundImage: `url('${manifest.Background_1}')` }}
-      >
-        <div className="absolute inset-0 bg-black/60" />
-      </div>
+      {/* Tło — pomijane, gdy stroną zarządza wspólne tło (prop `bare`) */}
+      {!bare && (
+        <div
+          className="absolute inset-0 bg-cover bg-center"
+          style={{ backgroundImage: `url('${manifest.Background_1}')` }}
+        >
+          <div className="absolute inset-0 bg-black/60" />
+        </div>
+      )}
```

### Файл: `src/app/(pl)/o-nas/page.tsx`
```diff
  import { Footer } from '@/components/footer'
+ import manifest from '@/config/manifest'
```
```diff
      <>
        <Header />
-       <About />
-       <Footer />
+       {/* Jedno ciągłe, wspólne tło dla całej strony „O nas" */}
+       <div className="relative">
+         <div
+           className="absolute inset-0 bg-cover bg-center"
+           style={{ backgroundImage: `url('${manifest.Background_1}')` }}
+         >
+           <div className="absolute inset-0 bg-black/60" />
+         </div>
+         <div className="relative z-10">
+           <About bare />
+           <Footer bare />
+         </div>
+       </div>
      </>
```

### Файл: `src/app/uk/o-nas/page.tsx`
```diff
  import { Footer } from '@/components/footer'
+ import manifest from '@/config/manifest'
  import { uk } from '@/lib/i18n/uk'
```
```diff
      <>
        <Header />
-       <About t={uk.about} />
-       <Footer t={uk.footer} />
+       {/* Одне суцільне, спільне тло для всієї сторінки «Про нас» */}
+       <div className="relative">
+         <div
+           className="absolute inset-0 bg-cover bg-center"
+           style={{ backgroundImage: `url('${manifest.Background_1}')` }}
+         >
+           <div className="absolute inset-0 bg-black/60" />
+         </div>
+         <div className="relative z-10">
+           <About t={uk.about} bare />
+           <Footer t={uk.footer} bare />
+         </div>
+       </div>
      </>
```

---

## 8. Проверка после применения
- [ ] `/o-nas` и `/uk/o-nas`: один сквозной фон, нет "шва" между About и Footer.
- [ ] Header сохранил свой фон.
- [ ] `/` (главная) и др. страницы — визуально без изменений.
- [ ] Тексты/телефон/адрес/e-mail/отзывы/meta — не изменены.
- [ ] Сборка проходит (lint/tsc без ошибок: `bare?: boolean` типизирован).
