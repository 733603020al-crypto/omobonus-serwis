# Omobonus Serwis - Сайт сервисной компании

Веб-сайт для сервисной компании Omobonus, специализирующейся на ремонте компьютеров, ноутбуков и принтеров во Вроцлаве.

## 🚀 Технологии

- **Next.js 15** - React фреймворк с App Router (PL / UK / RU)
- **TypeScript** - Типизированный JavaScript
- **Tailwind CSS** - Utility-first CSS фреймворк
- **Radix UI** - Компоненты UI
- **Nodemailer** - отправка email через SMTP (Zenbox)
- **React Hook Form** - Управление формами
- **Zod** - Валидация схем

## 📋 Требования

- Node.js 18.18+ 
- npm или yarn

## 🛠️ Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd omobonus-serwis
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env.local` на основе `.env.example` (подробности — в `docs/ENV_SETUP.md`):
```bash
cp .env.example .env.local
```

4. Заполните переменные окружения в `.env.local`:
```env
SMTP_HOST=smtp.zenbox.pl
SMTP_PORT=587
SMTP_USER=serwis@omobonus.com.pl
SMTP_PASS=your_smtp_password_here
# опционально: SMTP_FROM, SMTP_TO (можно несколько адресов через запятую)
```

## 🏃 Запуск проекта

### Режим разработки:
```bash
npm run dev
```

Быстрый режим на Turbopack:
```bash
npm run dev:turbo
```

Или используйте безопасный скрипт для Windows:
```bash
npm run dev:safe
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Сборка для продакшена:
```bash
npm run build
npm start
```

## 📁 Структура проекта

```
omobonus-serwis/
├── src/
│   ├── app/              # Next.js App Router страницы
│   │   ├── api/          # API маршруты
│   │   ├── (pl)/         # Польская версия (основная)
│   │   ├── uk/           # Украинская версия
│   │   └── ru/           # Русская версия
│   ├── components/        # React компоненты
│   │   ├── sections/     # Секции страницы
│   │   └── ui/           # UI компоненты
│   ├── lib/              # Утилиты и данные
│   └── config/           # Конфигурационные файлы
├── public/               # Статические файлы
│   └── images/           # Изображения
└── scripts/              # Вспомогательные скрипты
```

## 🔧 Доступные команды

- `npm run dev` - Запуск dev сервера
- `npm run dev:turbo` - Dev сервер на Turbopack
- `npm run build` - Сборка проекта
- `npm run start` - Запуск production сервера
- `npm run lint` - Проверка кода линтером
- `npm run check:i18n-sync` - Проверка синхронизации данных услуг между PL/UK/RU
- `npm run clean` - Очистка кеша сборки
- `npm run export-services` - Экспорт данных услуг

## 📧 Настройка отправки email

Формы (`/api/send-email`, `/api/callback-request`) отправляют письма через SMTP с помощью Nodemailer.

1. Задайте `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` в `.env.local`
2. При необходимости — `SMTP_FROM` и `SMTP_TO`
3. Проверить конфигурацию на деплое: `GET /api/health`

## 🌐 Деплой на Vercel

Проект готов к деплою на Vercel:

1. Подключите репозиторий к Vercel
2. Убедитесь, что **Root Directory** пуст (не `src/`)
3. Установите **Framework Preset** на **Next.js**
4. Добавьте переменные окружения в настройках Vercel:
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (и при необходимости `SMTP_FROM`, `SMTP_TO`)
5. Деплой произойдет автоматически при push в основную ветку

## 📝 Основные функции

- ✅ Адаптивный дизайн (мобильные устройства и десктоп)
- ✅ Многоязычная поддержка (флаги стран)
- ✅ Форма обратной связи с отправкой email
- ✅ Динамические страницы услуг
- ✅ SEO оптимизация
- ✅ Современный UI/UX

## 📄 Лицензия

Приватный проект

## 👥 Контакты

- Email: omobonus.pl@gmail.com
- Сайт: https://www.omobonus.com.pl
