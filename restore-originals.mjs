import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images');
const backupDir = path.join(__dirname, 'public', 'images', '_backup_original');

// Файлы, которые увеличились и нужно восстановить
const filesToRestore = [
  'omobonus-hero.png',
  'services-background.png'
];

console.log('🔄 Восстановление оригиналов для файлов, которые увеличились...\n');

filesToRestore.forEach(file => {
  const backupPath = path.join(backupDir, file);
  const currentPath = path.join(imagesDir, file);
  
  if (fs.existsSync(backupPath)) {
    const backupSize = fs.statSync(backupPath).size;
    const currentSize = fs.existsSync(currentPath) ? fs.statSync(currentPath).size : 0;
    
    if (backupSize < currentSize) {
      fs.copyFileSync(backupPath, currentPath);
      console.log(`✅ Восстановлен: ${file}`);
      console.log(`   Было: ${(currentSize / 1024).toFixed(2)} KB → Стало: ${(backupSize / 1024).toFixed(2)} KB`);
    } else {
      console.log(`⏭️  Пропущен: ${file} (уже оптимален)`);
    }
  } else {
    console.log(`⚠️  Backup не найден: ${file}`);
  }
});

console.log('\n✨ Восстановление завершено!');

