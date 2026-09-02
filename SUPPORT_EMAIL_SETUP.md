# Пошаговая настройка mail@vacanzabianca.ru и EmailJS

## Часть 1. Создать почтовый ящик mail@

1. **Выберите сервис** (один из):
   - **Timeweb** (если домен там): панель → Почта → Создать ящик → адрес `support`, домен `vacanzabianca.ru`.
   - **Яндекс 360**: https://360.yandex.ru → Подключить домен vacanzabianca.ru → Создать почту `mail@vacanzabianca.ru` (адрес «mail»).
   - **Другой хостинг почты** (Google, Mail.ru и т.п.): создать ящик support на домене vacanzabianca.ru.

2. **Настройте DNS домена** (у регистратора vacanzabianca.ru):
   - Удалите старые MX-записи (если были для info@).
   - Добавьте MX-записи, которые даёт выбранный почтовый сервис (из инструкции при создании ящика).
   - Сохраните и подождите 15–60 минут.

3. **Проверьте приём писем**: отправьте тестовое письмо на mail@vacanzabianca.ru с другого ящика — оно должно прийти.

---

## Часть 2. Подключить EmailJS к mail@

### Шаг 1: Регистрация / вход в EmailJS

1. Зайдите на https://dashboard.emailjs.com/
2. Войдите или зарегистрируйтесь.

### Шаг 2: Добавить Email Service (если ещё нет)

1. В меню: **Email Services** → **Add New Service**.
2. Выберите тип **Email** (Gmail, Outlook или **Other SMTP** — если ваш хостинг даёт SMTP).
3. **Для Gmail/Google (если почта на Google):**
   - Подключите Google, укажите ящик mail@vacanzabianca.ru (или связанный с ним аккаунт).
4. **Для Other SMTP** (Timeweb, Яндекс и др.):
   - Service ID: например `service_support` (любое имя).
   - SMTP Server, Port, Secure — возьмите из инструкции вашего почтового сервиса (например, для Timeweb: smtp.timeweb.ru, порт 465, SSL).
   - Логин: `mail@vacanzabianca.ru`, пароль — пароль от этого ящика.
5. Сохраните и запишите **Service ID** (например `service_xxxxx`).

### Шаг 3: Шаблон письма «Заявка с сайта» (на mail@)

1. **Email Templates** → **Create New Template**.
2. **Template Name:** например `Contact Form to Support`.
3. **Subject:** `{{subject}}` или фиксированный: `Новая заявка с сайта`.
4. **Content (Body):** используйте переменные, которые уже отправляет сайт:
   - `{{from_name}}` — имя
   - `{{from_email}}` — email
   - `{{phone}}` — телефон
   - `{{program}}` — программа
   - `{{message}}` — сообщение
   - Пример:
   ```
   Имя: {{from_name}}
   Email: {{from_email}}
   Телефон: {{phone}}
   Программа: {{program}}
   Сообщение: {{message}}
   ```
5. **Email Settings (справа):**
   - **To Email:** `mail@vacanzabianca.ru` (или `{{to_email}}` — в коде передаётся mail@vacanzabianca.ru).
   - **From Name:** `La Vacanza Bianca` или `vacanzabianca.ru`.
   - **From Email:** тот адрес, с которого разрешено отправлять в вашем сервисе (часто тот же mail@ или no-reply@).
6. **Save** и скопируйте **Template ID** (например `template_xxxxx`).

### Шаг 4: Шаблон автоответа клиенту (опционально)

1. **Email Templates** → **Create New Template**.
2. Настройте как в файле `AUTO_REPLY_SETUP.md`, но везде укажите **mail@vacanzabianca.ru**.
3. Сохраните и скопируйте **Template ID** автоответа.

### Шаг 5: Переменные окружения

В корне проекта в файле `.env` должны быть:

```env
VITE_EMAILJS_SERVICE_ID=ваш_service_id
VITE_EMAILJS_TEMPLATE_ID=id_шаблона_заявки_на_support
VITE_EMAILJS_PUBLIC_KEY=ваш_public_key
VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID=id_шаблона_автоответа
```

- **Public Key** берётся в EmailJS: **Account** → **API Keys** (или в настройках сервиса).

### Шаг 6: Деплой (Vercel)

1. Vercel → проект → **Settings** → **Environment Variables**.
2. Добавьте или обновите те же переменные:  
   `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID`.
3. **Redeploy** проекта.

---

## Краткий чеклист

| Шаг | Действие |
|-----|-----------|
| 1 | Создать ящик mail@ у хостера (Timeweb / Яндекс / др.). |
| 2 | Прописать MX-записи для домена, проверить приём писем. |
| 3 | В EmailJS добавить Email Service (SMTP или Gmail) для отправки с/на mail@. |
| 4 | В EmailJS создать шаблон заявки с To Email = mail@vacanzabianca.ru. |
| 5 | В .env и в Vercel прописать Service ID, Template ID, Public Key (и при необходимости Auto Reply Template ID). |
| 6 | Сделать redeploy и отправить тестовую заявку с сайта. |

В коде сайта заявки отправляются на **mail@vacanzabianca.ru** (файл `ContactModal.jsx`).
