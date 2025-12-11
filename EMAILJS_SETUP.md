# Инструкция по настройке EmailJS для отправки заявок

## Шаг 1: Регистрация на EmailJS

1. Перейдите на сайт: https://www.emailjs.com/
2. Зарегистрируйтесь (можно через Google аккаунт)
3. После регистрации вы попадете в Dashboard

## Шаг 2: Создание Email Service

1. В Dashboard перейдите в раздел **"Email Services"**
2. Нажмите **"Add New Service"**
3. Выберите **"Gmail"** (или другой почтовый сервис)
4. Войдите в свой Gmail аккаунт и разрешите доступ
5. Запишите **Service ID** (например: `service_xxxxxxx`)

## Шаг 3: Создание Email Template

1. Перейдите в раздел **"Email Templates"**
2. Нажмите **"Create New Template"**
3. Заполните шаблон:

**To Email:** `info@vacanzabianca.com`

**Subject:** `{{subject}}`

**Content:**
```
Новая заявка!

Имя: {{from_name}}
Email: {{from_email}}
Телефон: {{phone}}
Интересующая программа: {{program}}
Сообщение: {{message}}

---
Отправлено с сайта vacanzabianca.com
```

4. Сохраните шаблон
5. Запишите **Template ID** (например: `template_xxxxxxx`)

## Шаг 4: Получение Public Key

1. Перейдите в раздел **"Account"** → **"General"**
2. Найдите **"Public Key"**
3. Запишите Public Key (например: `xxxxxxxxxxxxxxxx`)

## Шаг 5: Настройка переменных окружения

1. Создайте файл `.env` в корне проекта (рядом с `package.json`)
2. Добавьте следующие переменные:

```env
VITE_EMAILJS_SERVICE_ID=ваш_service_id
VITE_EMAILJS_TEMPLATE_ID=ваш_template_id
VITE_EMAILJS_PUBLIC_KEY=ваш_public_key
```

**Пример:**
```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
```

3. Сохраните файл `.env`

## Шаг 6: Пересборка проекта

После настройки переменных окружения:

```bash
npm run build
```

## Важно:

- Файл `.env` НЕ должен попадать в git (убедитесь, что он в `.gitignore`)
- После изменения `.env` нужно пересобрать проект
- Для продакшена настройте переменные окружения в Vercel (Settings → Environment Variables)

## Альтернатива: Прямая настройка в коде

Если не хотите использовать переменные окружения, можно напрямую указать значения в файле `src/components/Contact.jsx`:

Найдите строки:
```javascript
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
```

И замените на:
```javascript
const serviceId = 'ваш_service_id'
const templateId = 'ваш_template_id'
const publicKey = 'ваш_public_key'
```

