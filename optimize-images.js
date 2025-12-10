const fs = require('fs');
const path = require('path');

// Проверяем размеры файлов
const imagesDir = path.join(__dirname, 'public', 'images');

console.log('📊 Анализ размеров изображений:\n');

const files = fs.readdirSync(imagesDir)
  .filter(file => /\.(png|jpg|jpeg|webp)$/i.test(file))
  .map(file => {
    const filePath = path.join(imagesDir, file);
    const stats = fs.statSync(filePath);
    return {
      name: file,
      size: stats.size,
      sizeKB: Math.round(stats.size / 1024 * 100) / 100,
      sizeMB: Math.round(stats.size / (1024 * 1024) * 100) / 100
    };
  })
  .sort((a, b) => b.size - a.size);

console.log('Топ-10 самых больших изображений:');
files.slice(0, 10).forEach((file, index) => {
  console.log(`${index + 1}. ${file.name.padEnd(50)} ${file.sizeKB.toFixed(2).padStart(10)} KB (${file.sizeMB.toFixed(2)} MB)`);
});

const totalSize = files.reduce((sum, file) => sum + file.size, 0);
const totalSizeKB = Math.round(totalSize / 1024 * 100) / 100;
const totalSizeMB = Math.round(totalSize / (1024 * 1024) * 100) / 100;

console.log(`\n📦 Общий размер всех изображений: ${totalSizeKB.toFixed(2)} KB (${totalSizeMB.toFixed(2)} MB)`);
console.log(`\n💡 Рекомендация: Оптимизировать изображения больше 100 KB`);

