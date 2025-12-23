# Инструкция по оптимизации видео для веба

## ⚠️ ВАЖНО: Текущее видео весит 180 МБ - это слишком много!

Для быстрой загрузки сайта видео нужно оптимизировать до **5-10 МБ максимум**.

## Вариант 1: Через FFmpeg (рекомендуется)

### Установка FFmpeg:
```bash
brew install ffmpeg
```

### Оптимизация:
```bash
cd /Users/maksimizrailev/Documents/hexlet_studying/ski-guide-Italy
./optimize-video.sh
```

Или вручную:
```bash
ffmpeg -i public/videos/hero-video.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -vf "scale=1920:-2" \
  public/videos/hero-video-optimized.mp4
```

После оптимизации замени файл:
```bash
mv public/videos/hero-video-optimized.mp4 public/videos/hero-video.mp4
```

## Вариант 2: Онлайн-сервисы

1. **CloudConvert** (https://cloudconvert.com/mp4-converter)
   - Загрузи видео
   - Выбери формат MP4
   - Установи качество: Medium или High
   - Скачай и замени файл

2. **HandBrake** (https://handbrake.fr/)
   - Установи программу
   - Открой видео
   - Preset: Web/General
   - Quality: RF 23
   - Конвертируй

## Рекомендуемые параметры:

- **Разрешение**: 1920x1080 (Full HD) или меньше
- **Битрейт видео**: 2-5 Мбит/с
- **Битрейт аудио**: 128 кбит/с (или удалить звук)
- **Формат**: MP4 (H.264)
- **Размер файла**: 5-10 МБ максимум

## После оптимизации:

1. Замени файл `public/videos/hero-video.mp4`
2. Пересобери проект: `npm run build`
3. Обнови `site.zip`: `./update-site-zip.sh` (если есть скрипт)

