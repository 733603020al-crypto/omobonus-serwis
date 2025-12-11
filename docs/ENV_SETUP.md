# Настройка переменных окружения

## Обязательные переменные для работы формы обратной связи

Создайте файл `.env.local` в корне проекта и добавьте следующие переменные:

```env
# SMTP Configuration для отправки писем через Zenbox
SMTP_HOST=smtp.zenbox.pl
SMTP_PORT=587
SMTP_USER=serwis@omobonus.com.pl
SMTP_PASS=your_smtp_password_here
```

## Опциональные переменные

```env
# Адрес отправителя (по умолчанию: serwis@omobonus.com.pl)
SMTP_FROM=serwis@omobonus.com.pl

# Адрес получателя, можно указать несколько через запятую (по умолчанию: serwis@omobonus.com.pl)
SMTP_TO=serwis@omobonus.com.pl
```

## Настройка на Vercel

1. Перейдите в **Settings → Environment Variables**
2. Добавьте все обязательные переменные
3. **Важно**: Убедитесь, что переменные добавлены для **Production** окружения
4. После добавления переменных пересоберите проект (Redeploy)

## Проверка конфигурации

После деплоя на Vercel проверьте конфигурацию через health-check эндпоинт:

```
GET https://your-domain.com/api/health
```

Ответ покажет:
- Статус конфигурации (ok/error)
- Какие переменные отсутствуют
- Текущее окружение (development/production)

## Безопасность

⚠️ **Важно**: Никогда не коммитьте файл `.env.local` в git!
- Файл `.env.local` уже добавлен в `.gitignore`
- Пароли и секретные ключи должны храниться только в переменных окружения

