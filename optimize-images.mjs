import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Проверяем, установлен ли sharp
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (e) {
  console.error('❌ Ошибка: sharp не установлен!');
  console.log('\n📦 Установите sharp командой:');
  console.log('   npm install --save-dev sharp');
  console.log('\nИли запустите: npm install --save-dev sharp');
  process.exit(1);
}

const imagesDir = path.join(__dirname, 'public', 'images');
const backupDir = path.join(__dirname, 'public', 'images', '_backup_original');

// Создаем backup директорию
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log('✅ Создана папка для backup: _backup_original\n');
}

// Функция для оптимизации PNG
async function optimizePNG(inputPath, outputPath, backupPath) {
  try {
    const originalSize = fs.statSync(inputPath).size;
    
    // Создаем backup
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
    }

    // Создаем временный файл для оптимизации
    const tempPath = outputPath + '.tmp';
    
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Оптимизируем PNG во временный файл
    await image
      .png({
        quality: 85,
        compressionLevel: 9,
        adaptiveFiltering: true,
        palette: metadata.hasAlpha ? false : true, // Используем палитру если нет прозрачности
      })
      .toFile(tempPath);

    // Заменяем оригинал оптимизированной версией
    fs.renameSync(tempPath, outputPath);

    const optimizedSize = fs.statSync(outputPath).size;
    const saved = originalSize - optimizedSize;
    const savedPercent = ((saved / originalSize) * 100).toFixed(1);

    return {
      success: true,
      originalSize,
      optimizedSize,
      saved,
      savedPercent
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Основная функция
async function optimizeImages() {
  console.log('🚀 Начинаем оптимизацию изображений...\n');

  const files = fs.readdirSync(imagesDir)
    .filter(file => /\.(png|jpg|jpeg)$/i.test(file) && !file.startsWith('_'))
    .map(file => ({
      name: file,
      path: path.join(imagesDir, file),
      ext: path.extname(file).toLowerCase()
    }));

  console.log(`📁 Найдено ${files.length} изображений для оптимизации\n`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let optimizedCount = 0;

  for (const file of files) {
    const fileName = path.basename(file.name, file.ext);
    const backupPath = path.join(backupDir, file.name);
    
    console.log(`📸 Обрабатываю: ${file.name}...`);

    // Оптимизируем оригинал
    const result = await optimizePNG(file.path, file.path, backupPath);
    
    if (result.success) {
      totalOriginalSize += result.originalSize;
      totalOptimizedSize += result.optimizedSize;
      optimizedCount++;
      
      if (result.saved > 0) {
        console.log(`   ✅ Оптимизировано: ${(result.originalSize / 1024).toFixed(2)} KB → ${(result.optimizedSize / 1024).toFixed(2)} KB (экономия: ${result.savedPercent}%)`);
      } else {
        console.log(`   ⚠️  Размер увеличился: ${(result.originalSize / 1024).toFixed(2)} KB → ${(result.optimizedSize / 1024).toFixed(2)} KB (+${Math.abs(result.savedPercent)}%)`);
        // Восстанавливаем оригинал, если размер увеличился
        const backupPath = path.join(backupDir, file.name);
        if (fs.existsSync(backupPath)) {
          fs.copyFileSync(backupPath, file.path);
          console.log(`   🔄 Восстановлен оригинал`);
          continue;
        }
      }
      
      // НЕ создаем WebP - Next.js Image автоматически конвертирует при запросе
    } else {
      console.log(`   ❌ Ошибка: ${result.error}`);
    }
    
    console.log('');
  }

  // Итоговая статистика
  const totalSaved = totalOriginalSize - totalOptimizedSize;
  const totalSavedPercent = ((totalSaved / totalOriginalSize) * 100).toFixed(1);
  const totalSavedMB = (totalSaved / (1024 * 1024)).toFixed(2);

  // Итоговая статистика
  const totalSaved = totalOriginalSize - totalOptimizedSize;
  const totalSavedPercent = totalOriginalSize > 0 ? ((totalSaved / totalOriginalSize) * 100).toFixed(1) : '0';
  const totalSavedMB = (totalSaved / (1024 * 1024)).toFixed(2);

  console.log('📊 Итоговая статистика:');
  console.log(`   ✅ Оптимизировано изображений: ${optimizedCount}`);
  console.log(`   💾 Экономия места: ${totalSavedMB} MB (${totalSavedPercent}%)`);
  console.log(`   📦 Оригиналы сохранены в: ${backupDir}`);
  console.log('\n💡 WebP версии не создаются - Next.js Image автоматически конвертирует при запросе');
  console.log('✨ Оптимизация завершена!');
}

// Запускаем
optimizeImages().catch(console.error);

