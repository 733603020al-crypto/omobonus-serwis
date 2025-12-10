import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images');
const backupDir = path.join(__dirname, 'public', 'images', '_backup_original');

console.log('🧹 Удаление статических WebP файлов...\n');
console.log('💡 Next.js Image автоматически конвертирует в WebP, статические файлы не нужны\n');

// Находим все WebP файлы
const webpFiles = fs.readdirSync(imagesDir)
  .filter(file => file.endsWith('.webp'));

console.log(`Найдено ${webpFiles.length} WebP файлов для удаления\n`);

let totalSize = 0;
webpFiles.forEach(file => {
  const filePath = path.join(imagesDir, file);
  const stats = fs.statSync(filePath);
  totalSize += stats.size;
  fs.unlinkSync(filePath);
  console.log(`✅ Удален: ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
});

console.log(`\n💾 Освобождено места: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
console.log('\n✨ Очистка завершена!');

