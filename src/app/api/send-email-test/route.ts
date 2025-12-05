import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Путь к фоновому изображению
    const backgroundImagePath = path.join(process.cwd(), 'public', 'images', 'zmiety arkusz papieru 2.png')
    // Путь к логотипу
    const logoImagePath = path.join(process.cwd(), 'public', 'images', 'Logo_Omobonus.png')
    
    // Чтение и конвертация фонового изображения в base64
    if (fs.existsSync(backgroundImagePath)) {
      const backgroundBuffer = fs.readFileSync(backgroundImagePath)
      const backgroundBase64 = backgroundBuffer.toString('base64')
      const backgroundDataUrl = `data:image/png;base64,${backgroundBase64}`
      
      console.log('✅ Фон успешно конвертирован в base64 формат')
      console.log('📸 Background base64 (первые 100 символов):', backgroundDataUrl.substring(0, 100))
    } else {
      console.warn('⚠️ Фоновое изображение не найдено:', backgroundImagePath)
    }
    
    // Чтение и конвертация логотипа в base64
    if (fs.existsSync(logoImagePath)) {
      const logoBuffer = fs.readFileSync(logoImagePath)
      const logoBase64 = logoBuffer.toString('base64')
      const logoDataUrl = `data:image/png;base64,${logoBase64}`
      
      console.log('✅ Логотип успешно конвертирован в base64 формат')
      console.log('📸 Logo base64 (первые 100 символов):', logoDataUrl.substring(0, 100))
    } else {
      console.warn('⚠️ Логотип не найден:', logoImagePath)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Ошибка при чтении изображений:', error)
    return NextResponse.json({ error: 'Ошибка при чтении изображений', details: error }, { status: 500 })
  }
}
