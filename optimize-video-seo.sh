#!/bin/bash

# Скрипт для оптимизации видео для SEO
# Требует установки ffmpeg: brew install ffmpeg (macOS) или apt-get install ffmpeg (Linux)

INPUT_VIDEO="public/videos/hero-video.mp4"
OUTPUT_DIR="public/videos/optimized"

# Создаем директорию для оптимизированных видео
mkdir -p "$OUTPUT_DIR"

echo "🎬 Начинаем оптимизацию видео..."

# 1. Создаем WebM версию (лучшее сжатие)
echo "📦 Создаю WebM версию..."
ffmpeg -i "$INPUT_VIDEO" \
  -c:v libvpx-vp9 -b:v 2M -minrate 1M -maxrate 3M \
  -c:a libopus -b:a 128k \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease" \
  -movflags +faststart \
  -y "$OUTPUT_DIR/hero-video.webm" 2>/dev/null

# 2. Оптимизируем MP4 версию (H.264, быстрая загрузка)
echo "📦 Оптимизирую MP4 версию..."
ffmpeg -i "$INPUT_VIDEO" \
  -c:v libx264 -preset slow -crf 23 \
  -c:a aac -b:a 128k \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease" \
  -movflags +faststart \
  -y "$OUTPUT_DIR/hero-video.mp4" 2>/dev/null

# 3. Создаем постер (первый кадр видео)
echo "🖼️ Создаю постер изображение..."
ffmpeg -i "$INPUT_VIDEO" \
  -vf "select=eq(n\,0)" \
  -q:v 3 \
  -y "public/images/hero-video-poster.jpg" 2>/dev/null

# 4. Создаем уменьшенную версию для мобильных (опционально)
echo "📱 Создаю мобильную версию..."
ffmpeg -i "$INPUT_VIDEO" \
  -c:v libx264 -preset slow -crf 25 \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease" \
  -movflags +faststart \
  -y "$OUTPUT_DIR/hero-video-mobile.mp4" 2>/dev/null

echo "✅ Оптимизация завершена!"
echo ""
echo "📊 Размеры файлов:"
ls -lh "$OUTPUT_DIR"/*.mp4 "$OUTPUT_DIR"/*.webm 2>/dev/null | awk '{print $5, $9}'
ls -lh "public/images/hero-video-poster.jpg" 2>/dev/null | awk '{print $5, $9}'
echo ""
echo "⚠️  Не забудьте заменить оригинальные файлы оптимизированными!"






