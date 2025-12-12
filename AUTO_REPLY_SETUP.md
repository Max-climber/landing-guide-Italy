# Настройка автоматического ответного письма клиенту

## Шаг 1: Создание шаблона для ответного письма в EmailJS

1. Войдите в EmailJS Dashboard: https://dashboard.emailjs.com/
2. Перейдите в раздел **"Email Templates"**
3. Нажмите **"Create New Template"**

## Шаг 2: Настройка шаблона

### Template Name:
```
Auto Reply to Customer
```

### Subject:
```
Ваша заявка получена - La Vacanza Bianca
```

### Content (HTML):
```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; line-height: 1.6; color: #333;">
  <p>Здравствуйте. Мы получили Вашу заявку и в ближайшее время свяжемся с Вами.</p>
  
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
    <p>Hello. We have received your request and will contact you shortly.</p>
  </div>
  
  <p style="margin-top: 20px;">La Vacanza Bianca</p>
  
  <div style="margin-top: 20px; padding-top: 15px; border-top: 1px dashed #ccc; color: #999; font-size: 12px;">
    <p style="margin: 0;">info@vacanzabianca.com</p>
    <p style="margin: 5px 0 0 0;">vacanzabianca.com</p>
  </div>
</div>
```

### Email Settings (справа):

- **To Email:** `{{to_email}}`
- **From Name:** `La Vacanza Bianca`
- **From Email:** `info@vacanzabianca.com` (снимите галочку "Use Default Email Address")
- **Reply To:** `info@vacanzabianca.com`
- **Bcc:** (оставьте пустым)
- **Cc:** (оставьте пустым)

## Шаг 3: Сохранение и получение Template ID

1. Нажмите **"Save"**
2. Запишите **Template ID** (например: `template_xxxxxxx`)

## Шаг 4: Добавление переменной окружения

Добавьте в файл `.env`:
```env
VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID=ваш_template_id_для_ответа
```

## Шаг 5: Обновление переменных в Vercel

1. Зайдите в Vercel Dashboard → ваш проект → Settings → Environment Variables
2. Добавьте новую переменную:
   - **Key:** `VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID`
   - **Value:** ваш Template ID для ответного письма
   - **Environments:** All Environments
3. Сохраните и сделайте Redeploy

## Шаг 6: Пересборка проекта

```bash
npm run build
```

После этого при отправке заявки клиент будет автоматически получать ответное письмо с подтверждением.

