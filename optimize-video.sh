#!/bin/bash
# Скрипт для оптимизации видео для веба
# Требуется: brew install ffmpeg

INPUT="public/videos/hero-video.mp4"
OUTPUT="public/videos/hero-video-optimized.mp4"

echo "Оптимизация видео для веба..."
ffmpeg -i "$INPUT" \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -vf "scale=1920:-2" \
  "$OUTPUT"

echo "Готово! Оптимизированное видео: $OUTPUT"
echo "Размер оригинала: $(du -h "$INPUT" | cut -f1)"
echo "Размер оптимизированного: $(du -h "$OUTPUT" | cut -f1)"
