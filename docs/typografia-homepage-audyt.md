# Audyt typografii strony głównej (PL)

Kod aplikacji nie był modyfikowany — wyłącznie audyt.

## 1. Hero

Plik: `src/components/sections/hero.tsx`, `src/components/ui/google-rating-badge.tsx`

| Tekst | Rola po rosyjsku | Font / klasa | Rozmiar desktop | Rozmiar mobile | Weight | Line-height | Kolor po rosyjsku | Klasa / wartość koloru | Italic | Letter-spacing / uppercase |
|---|---|---|---|---|---|---|---|---|---|---|
| Profesjonalny serwis komputerów, laptopów i drukarek we Wrocławiu | Главный заголовок H1 (desktop) | font-cormorant | 60px | — (на мобильных другой текст, см. ниже) | bold | 1.1 | белый | #ffffff | нет | — |
| Serwis komputerów, laptopów i drukarek we Wrocławiu | Главный заголовок H1 (mobile) | font-cormorant | — (скрыт на десктопе) | 38px | bold | 1.15 | белый | #ffffff | нет | — |
| "Uczciwość i szacunek do klienta" – to nasze podstawowe zasady pracy | Подзаголовок-девиз | font-cormorant | 22px | 22px | semibold | leading-tight | золотой фирменный | #bfa76a | да | — |
| Google Rating | Подпись бейджа рейтинга | font-sans | 12px | 11px | normal | leading-none (от родителя) | золотой фирменный | #bfa76a | нет | tracking-normal |
| 4.9 | Значение рейтинга Google | font-sans | 24px | 20px | bold | leading-none (от родителя) | золотой фирменный | #bfa76a | нет | — |
| Zaufanie klientów | Подпись доверия под рейтингом | font-sans | 12px | 11px | normal | — | белый 75% | text-white/75 | нет | tracking-wide |
| 10+ | Цифра статистики "лет опыта" | font-cormorant | число 32px / юнит "+" 17px | — (скрыто на мобильных) | bold | leading-none | светло-золотой | #e6cc82 | нет | — |
| lat doświadczenia | Подпись к статистике "10+" | font-inter | 11px | — (скрыто) | normal | leading-tight | светлый кремовый | hsl(45 18% 82%) | нет | — |
| do 2h | Цифра статистики "время приезда" | font-cormorant | приставка "do" 11px, число "2" 32px, юнит "h" 17px | — (скрыто) | приставка normal, число/юнит bold | leading-none | приставка — золотисто-бежевый; число/юнит — светло-золотой | приставка hsl(45 50% 70%); число/юнит #e6cc82 | нет | — |
| przyjazd | Подпись к статистике "do 2h" | font-inter | 11px | — (скрыто) | normal | leading-tight | светлый кремовый | hsl(45 18% 82%) | нет | — |
| 15 min | Цифра статистики "первичная диагностика" | font-cormorant | число "15" 32px, юнит "min" 17px | — (скрыто) | bold | leading-none | светло-золотой | #e6cc82 | нет | — |
| wstępna diagnoza | Подпись к статистике "15 min" | font-inter | 11px | — (скрыто) | normal | leading-tight | светлый кремовый | hsl(45 18% 82%) | нет | — |
| do 12 mies. | Цифра статистики "гарантия" | font-cormorant | приставка "do" 11px, число "12" 32px, юнит " mies." 17px | — (скрыто) | приставка normal, число/юнит bold | leading-none | приставка — золотисто-бежевый; число/юнит — светло-золотой | приставка hsl(45 50% 70%); число/юнит #e6cc82 | нет | — |
| gwarancja | Подпись к статистике "do 12 mies." | font-inter | 11px | — (скрыто) | normal | leading-tight | светлый кремовый | hsl(45 18% 82%) | нет | — |

Uwaga: `BrandTicker` (logotypy marek) renderowany w Hero nie zawiera widocznego tekstu — same obrazy/ikony.

## 2. Usługi

Plik: `src/components/sections/services.tsx`

| Tekst | Rola po rosyjsku | Font / klasa | Rozmiar desktop | Rozmiar mobile | Weight | Line-height | Kolor po rosyjsku | Klasa / wartość koloru | Italic | Letter-spacing / uppercase |
|---|---|---|---|---|---|---|---|---|---|---|
| Oferujemy serwis komputerów, laptopów i drukarek oraz wsparcie techniczne dla domu i biura we Wrocławiu | Подзаголовок секции услуг | font-cormorant | 18px | — (hidden, скрыт на мобильных) | semibold | leading-tight | золотой фирменный | #bfa76a | да | — |
| Serwis i naprawa drukarek etykiet (przykład; pozostałe tytuły usług pochodzą z `services-data` i mają ten sam styl) | Заголовок карточки услуги | font-cormorant | text-xl (20px) | text-lg (18px) | semibold | leading-tight | белый (при hover — светло-золотой) | #ffffff (hover #f3df9a) | нет | — |

## 3. Skąd nazwa / O nas

Plik: `src/components/sections/about.tsx`

| Tekst | Rola po rosyjsku | Font / klasa | Rozmiar desktop | Rozmiar mobile | Weight | Line-height | Kolor po rosyjsku | Klasa / wartość koloru | Italic | Letter-spacing / uppercase |
|---|---|---|---|---|---|---|---|---|---|---|
| SKĄD NAZWA | Надпись-метка (eyebrow) над заголовком | font-inter | text-sm (14px) | text-sm (14px) | semibold | — | золотой фирменный | #bfa76a | нет | tracking-widest, uppercase |
| Święty Omobonus XII wieku | Заголовок блока (H2) | font-cormorant | text-4xl (36px) | text-3xl (30px) | bold | leading-tight | золотой фирменный | #bfa76a | да | — |
| (łac. „Homobonus" — Dobry człowiek). Patron biznesmenów i przemysłowców... | Описание под заголовком | font-cormorant | text-lg (18px) | text-base (16px) | normal | leading-relaxed | тёплый белый (полупрозрачный) | rgba(255,255,245,0.85) | да | — |
| O nas: | Подзаголовок (H3) блока "о компании" | font-serif | text-3xl (30px) | text-2xl (24px) | semibold | — | белый | text-white | нет | — |
| Jesteśmy zespołem, który wierzy, że praca może być również pomocą... | Основной текст описания компании | font-serif | text-lg (18px) | text-base (16px) | normal | leading-relaxed | тёплый белый (полупрозрачный) | rgba(255,255,245,0.85) | нет | — |
| "Brak oszustwa i szacunek do klienta" | Цитата — главный девиз | font-serif | text-2xl (24px) | text-xl (20px) | semibold | — | белый | text-white | нет | — |
| to nasze podstawowe zasady pracy. | Продолжение цитаты | font-serif | text-lg (18px) | text-lg (18px) | normal | — | золотой фирменный | #bfa76a | нет | — |
| Więcej o nas | Текст кнопки-ссылки | font-cormorant | 20px | 20px | semibold | — | золотой фирменный | #bfa76a | нет | — |

## 4. Opinie Google

Plik: `src/components/google-reviews.tsx`

| Tekst | Rola po rosyjsku | Font / klasa | Rozmiar desktop | Rozmiar mobile | Weight | Line-height | Kolor po rosyjsku | Klasa / wartość koloru | Italic | Letter-spacing / uppercase |
|---|---|---|---|---|---|---|---|---|---|---|
| Opinie klientów z Google | Заголовок блока отзывов | font-cormorant | text-3xl (30px) | text-2xl (24px) | bold | leading-tight | белый | text-white | нет | — |
| Zobacz wszystkie opinie w Google → | Ссылка "посмотреть все отзывы" | без явного font- (по умолчанию) | text-xs (12px) | text-xs (12px) | normal | — | золотой фирменный, подчёркнутый | #bfa76a, underline | нет | — |
| Google Rating | Подпись внутри белой карточки рейтинга | без явного font- | text-xs (12px) | text-xs (12px) | normal | — | серый | text-gray-600 | нет | — |
| 4.9 (przykładowa wartość) | Значение рейтинга в белой карточке | без явного font- | text-xl (20px) | text-xl (20px) | bold | — | тёмно-серый, почти чёрный | text-gray-900 | нет | — |
| Na podstawie {totalReviews} opinii | Подпись количества отзывов | без явного font- | text-xs (12px) | text-xs (12px) | normal | — | серый | text-gray-600 | нет | — |
| (imię autora opinii, dynamiczne) | Имя автора отзыва | без явного font- | text-sm (14px) | text-sm (14px) | semibold | leading-tight | белый | text-white | нет | — |
| (relative_time_description, np. "miesiąc temu") | Время публикации отзыва | без явного font- | 12px | 12px | normal | — | белый 50% | text-white/50 | нет | — |
| (treść opinii klienta, dynamiczna) | Текст отзыва клиента | без явного font- | 12px | 12px | normal | 1.6 | светлый кремовый | #f1ead6 | нет | tracking-[0.015em] |
| Ładowanie opinii klientów… | Текст состояния загрузки (временный) | без явного font- | text-sm (14px) | text-sm (14px) | normal | — | серый | text-gray-400 | нет | — |
| Brak opinii (API nie zwróciło danych) | Текст ошибки/нет данных | без явного font- | базовый | базовый | normal | — | красный | text-red-500 | нет | — |

## 5. CTA kontaktowe

Plik: `src/app/(pl)/page.tsx`

| Tekst | Rola po rosyjsku | Font / klasa | Rozmiar desktop | Rozmiar mobile | Weight | Line-height | Kolor po rosyjsku | Klasa / wartość koloru | Italic | Letter-spacing / uppercase |
|---|---|---|---|---|---|---|---|---|---|---|
| Masz problem z komputerem lub drukarką? | Заголовок CTA-блока (H2) | font-cormorant | text-3xl (30px) | text-2xl (24px) | bold | leading-tight | белый | text-white | нет | — |
| Napisz lub zadzwoń — podpowiemy, od czego zacząć. | Подзаголовок CTA-блока | без явного font- | text-xs (12px) | text-xs (12px) | normal | — | золотой фирменный | #bfa76a | нет | — |
| Szybki kontakt | Текст кнопки CTA | font-cormorant | 20px | 20px | semibold | — | золотой фирменный | #bfa76a | нет | — |

## 6. Kontakt / Footer

Plik: `src/components/footer.tsx`

| Tekst | Rola po rosyjsku | Font / klasa | Rozmiar desktop | Rozmiar mobile | Weight | Line-height | Kolor po rosyjsku | Klasa / wartość koloru | Italic | Letter-spacing / uppercase |
|---|---|---|---|---|---|---|---|---|---|---|
| Kontakt | Заголовок блока контактов | font-cormorant | text-2xl (24px) | text-2xl (24px) | normal | — | золотой фирменный | #bfa76a | нет | tracking-wide |
| Adres | Лейбл "Адрес" | font-inter | text-sm (14px) | text-sm (14px) | semibold | leading-snug (от родителя) | золотой фирменный | #bfa76a | нет | — |
| Marcina Bukowskiego 174 / 52-418 Wrocław | Текст адреса (ссылка на карту) | font-inter | text-sm (14px) | text-sm (14px) | normal | leading-snug | белый | text-white | нет | — |
| Telefon | Лейбл "Телефон" | font-inter | text-sm (14px) | text-sm (14px) | semibold | leading-snug | золотой фирменный | #bfa76a | нет | — |
| +48 793 759 262 | Номер телефона (ссылка tel:) | font-inter | text-sm (14px) | text-sm (14px) | normal | leading-snug | белый | text-white | нет | — |
| E-mail | Лейбл "E-mail" | font-inter | text-sm (14px) | text-sm (14px) | semibold | leading-snug | золотой фирменный | #bfa76a | нет | — |
| serwis@omobonus.com.pl | Адрес электронной почты (ссылка) | font-inter | text-sm (14px) | text-sm (14px) | normal | leading-snug | белый | text-white | нет | — |
| Godziny pracy serwisu | Лейбл "Часы работы сервиса" | font-inter | text-sm (14px) | text-sm (14px) | normal | leading-snug | золотой фирменный | #bfa76a | нет | — |
| poniedziałek–piątek: 8:00–18:00 | Значение часов работы сервиса | font-inter | text-sm (14px) | text-sm (14px) | normal | leading-snug | белый | text-white | нет | — |
| Kontakt z serwisem | Лейбл "Связь с сервисом" | font-inter | text-sm (14px) | text-sm (14px) | normal | leading-snug | золотой фирменный | #bfa76a | нет | — |
| poniedziałek–sobota: 7:00–21:00 | Значение времени связи с сервисом | font-inter | text-sm (14px) | text-sm (14px) | normal | leading-snug | белый | text-white | нет | — |
| Komunikatory | Лейбл "Мессенджеры" | font-inter | text-sm (14px) | text-sm (14px) | semibold | leading-snug | золотой фирменный | #bfa76a | нет | — |
| WhatsApp | Название мессенджера (ссылка) | font-inter (наследуемый) | text-sm (14px) | text-sm (14px) | normal | leading-snug | белый | text-white | нет | — |
| Telegram | Название мессенджера (ссылка) | font-inter (наследуемый) | text-sm (14px) | text-sm (14px) | normal | leading-snug | белый | text-white | нет | — |
| Viber | Название мессенджера (ссылка) | font-inter (наследуемый) | text-sm (14px) | text-sm (14px) | normal | leading-snug | белый | text-white | нет | — |
| Polityka Prywatności | Ссылка "Политика конфиденциальности" | font-inter | text-sm (14px) | text-sm (14px) | normal | — | светлый бежево-серый | #b8a894 | нет | — |
| Regulamin | Ссылка "Регламент" | font-inter | text-sm (14px) | text-sm (14px) | normal | — | светлый бежево-серый | #b8a894 | нет | — |
| © {rok} Omobonus Sp. z o.o. Wszelkie prawa zastrzeżone. | Копирайт | font-inter | text-xs (12px) | text-xs (12px) | normal | — | золотой фирменный | #bfa76a | нет | — |
