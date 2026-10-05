// export-services.ts
// Регистрируем пути из tsconfig.json для поддержки алиасов
import 'tsconfig-paths/register'

import { services } from './src/lib/services-data'
import { getDisplayPrice, getDisplayDuration } from './src/lib/services-pricing'
import fs from 'fs'
import path from 'path'

// Централизованные цена/срок (services-pricing-data.ts) больше не дублируются
// как литералы в item.price/item.duration — тянем актуальное значение отсюда,
// чтобы экспорт не расходился с тем, что реально показано на сайте.
function safeDisplay(fn: () => string): string {
  try {
    return fn()
  } catch {
    return ''
  }
}

// Функция для экранирования CSV значений
function escapeCSV(value: string | null | undefined): string {
  if (value === null || value === undefined) return ''
  const stringValue = String(value).trim()
  
  // Если пустая строка - возвращаем пустоту
  if (!stringValue) return ''
  
  // Заменяем переносы строк на пробелы для читаемости в Excel
  const cleaned = stringValue.replace(/\n/g, ' ').replace(/\r/g, '')
  
  // Если содержит точку с запятой, кавычки или перенос - обрамляем в кавычки
  if (cleaned.includes(';') || cleaned.includes('"') || cleaned.includes('\n')) {
    return `"${cleaned.replace(/"/g, '""')}"`
  }
  
  return cleaned
}

// Функция для экранирования HTML для CSV
function escapeHTMLForCSV(html: string | null | undefined): string {
  if (html === null || html === undefined) return ''
  const htmlValue = String(html).trim()
  
  if (!htmlValue) return ''
  
  // Если содержит точку с запятой, кавычки или перенос - обрамляем в кавычки
  if (htmlValue.includes(';') || htmlValue.includes('"') || htmlValue.includes('\n')) {
    return `"${htmlValue.replace(/"/g, '""')}"`
  }
  
  return htmlValue
}

// Функция для преобразования текста в HTML с поддержкой форматирования
function convertTextToHTML(text: string | null | undefined): string {
  if (!text) return ''
  
  let html = String(text)
  
  // Проверяем, содержит ли текст уже HTML-теги
  const htmlTagPattern = /<[^>]+>/g
  if (htmlTagPattern.test(html)) {
    // Если есть HTML-теги, возвращаем как есть
    return html
  }
  
  // Нормализуем переносы строк
  html = html.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  
  // Конвертируем Markdown жирный текст (**текст** -> <strong>текст</strong>)
  html = html.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>')
  
  // Обрабатываем маркеры списков (•)
  // Разбиваем на строки
  const lines = html.split('\n')
  const result: string[] = []
  let inList = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()
    
    // Проверяем, является ли строка элементом списка
    const isListItem = trimmedLine.startsWith('•') || 
                       (trimmedLine.startsWith('*') && trimmedLine.length > 1 && trimmedLine[1] !== '*') ||
                       /^\d+[\.\)]\s/.test(trimmedLine)
    
    if (isListItem) {
      if (!inList) {
        result.push('<ul>')
        inList = true
      }
      // Убираем маркер и добавляем как элемент списка
      let listContent = trimmedLine
      if (listContent.startsWith('•')) {
        listContent = listContent.substring(1).trim()
      } else if (listContent.startsWith('*') && listContent[1] !== '*') {
        listContent = listContent.substring(1).trim()
      } else {
        listContent = listContent.replace(/^\d+[\.\)]\s*/, '')
      }
      result.push(`<li>${listContent}</li>`)
    } else {
      if (inList) {
        result.push('</ul>')
        inList = false
      }
      
      if (trimmedLine) {
        // Обычная строка - добавляем как параграф
        result.push(`<p>${trimmedLine}</p>`)
      } else if (i < lines.length - 1) {
        // Пустая строка между абзацами - добавляем <br>
        result.push('<br>')
      }
    }
  }
  
  // Закрываем список, если он остался открытым
  if (inList) {
    result.push('</ul>')
  }
  
  html = result.join('')
  
  // Если результат пустой или не содержит тегов, возвращаем исходный текст с базовой обработкой
  if (!html || (!html.includes('<ul>') && !html.includes('<p>'))) {
    html = html.replace(/\n/g, '<br>')
    if (html.trim() && !html.startsWith('<')) {
      html = `<p>${html}</p>`
    }
  }
  
  return html
}

// Функция для проверки и извлечения существующего HTML из текста
function extractHTML(text: string | null | undefined): string {
  if (!text) return ''
  
  const textValue = String(text)
  
  // Проверяем, содержит ли текст уже HTML-теги
  const htmlTagPattern = /<[^>]+>/g
  if (htmlTagPattern.test(textValue)) {
    // Если есть HTML-теги, возвращаем как есть (но экранируем, если нужно)
    // В данном случае сохраняем исходный HTML
    return textValue
  }
  
  // Если HTML нет, конвертируем текст в HTML
  return convertTextToHTML(text)
}

// Интерфейс для строки CSV
interface CSVRow {
  category: string        // Категория
  section: string        // Секция
  subcategory: string    // Подкатегория
  service: string        // Услуга
  description: string    // Описание (исходный текст)
  htmlDescription: string // HTML_Opis (HTML-версия описания)
  price: string          // Цена
  duration: string       // Срок выполнения
  notes: string          // Примечания
  link: string           // Ссылка
}

// Функция для преобразования данных в плоскую структуру
function flattenServices(servicesData: typeof services): CSVRow[] {
  const rows: CSVRow[] = []
  
  servicesData.forEach(service => {
    const category = service.title || service.slug
    const categoryDescription = service.description || service.subtitle || ''
    const globalNotes = service.priceTooltip || ''
    
    service.pricingSections.forEach(section => {
      const sectionTitle = section.title || ''
      const sectionStatus = section.status || ''
      
      // Обработка обычных элементов секции (items)
      if (section.items && section.items.length > 0) {
        section.items.forEach((item, idx) => {
          const itemPath = `${section.id}.items.${idx}`
          const serviceText = item.service || ''
          const descriptionText = categoryDescription
          // Объединяем service и description для HTML_Opis
          // Service может содержать форматированный текст (списки, переносы строк)
          const fullTextForHTML = serviceText
            ? (descriptionText ? `${serviceText}\n\n${descriptionText}` : serviceText)
            : descriptionText

          rows.push({
            category: category,
            section: sectionTitle,
            subcategory: '',
            service: serviceText,
            description: descriptionText,
            htmlDescription: extractHTML(fullTextForHTML),
            price: item.price || safeDisplay(() => getDisplayPrice(service.slug, itemPath, 'pl')),
            duration: safeDisplay(() => getDisplayDuration(service.slug, itemPath, 'pl')),
            notes: sectionStatus || globalNotes,
            link: item.link || ''
          })
        })
      }
      
      // Обработка подкатегорий
      if (section.subcategories && section.subcategories.length > 0) {
        section.subcategories.forEach(subcat => {
          const subcatTitle = subcat.title || ''
          const subcatDescription = subcat.subtitle || categoryDescription
          
          // Если есть элементы в подкатегории
          if (subcat.items && subcat.items.length > 0) {
            subcat.items.forEach((item, idx) => {
              const itemPath = `${section.id}.${subcat.id}.${idx}`
              const serviceText = item.service || ''
              const descriptionText = subcatDescription
              // Объединяем service и description для HTML_Opis
              const fullTextForHTML = serviceText
                ? (descriptionText ? `${serviceText}\n\n${descriptionText}` : serviceText)
                : descriptionText

              rows.push({
                category: category,
                section: sectionTitle,
                subcategory: subcatTitle,
                service: serviceText,
                description: descriptionText,
                htmlDescription: extractHTML(fullTextForHTML),
                price: item.price || subcat.price || safeDisplay(() => getDisplayPrice(service.slug, itemPath, 'pl')),
                duration: safeDisplay(() => getDisplayDuration(service.slug, itemPath, 'pl')),
                notes: sectionStatus || globalNotes,
                link: item.link || ''
              })
            })
          }
          // Если есть ответ (FAQ)
          else if (subcat.answer) {
            const answerText = subcat.answer
            rows.push({
              category: category,
              section: sectionTitle,
              subcategory: subcatTitle,
              service: subcatTitle,
              description: answerText.replace(/\n/g, ' '),
              htmlDescription: extractHTML(answerText),
              price: '',
              duration: '',
              notes: '',
              link: ''
            })
          }
          // Если есть только цена в заголовке подкатегории (аренда)
          else if (subcat.price) {
            const descriptionText = subcatDescription
            rows.push({
              category: category,
              section: sectionTitle,
              subcategory: subcatTitle,
              service: subcatTitle,
              description: descriptionText,
              htmlDescription: extractHTML(descriptionText),
              price: subcat.price,
              duration: '',
              notes: sectionStatus || globalNotes,
              link: ''
            })
          }
        })
      }
      
      // Если секция не имеет ни items, ни subcategories
      if ((!section.items || section.items.length === 0) && 
          (!section.subcategories || section.subcategories.length === 0)) {
        const descriptionText = categoryDescription
        rows.push({
          category: category,
          section: sectionTitle,
          subcategory: '',
          service: sectionTitle,
          description: descriptionText,
          htmlDescription: extractHTML(descriptionText),
          price: sectionStatus || '',
          duration: '',
          notes: globalNotes,
          link: ''
        })
      }
    })
  })
  
  return rows
}

// Функция для преобразования строк в CSV формат
function rowsToCSV(rows: CSVRow[]): string {
  // Заголовки CSV (на русском)
  const headers = [
    'Категория',
    'Секция',
    'Подкатегория',
    'Услуга',
    'Описание',
    'HTML_Opis',
    'Цена',
    'Срок выполнения',
    'Примечания',
    'Ссылка'
  ]
  
  // Создаём заголовок
  let csvContent = headers.map(h => escapeCSV(h)).join(';') + '\n'
  
  // Добавляем строки данных
  rows.forEach(row => {
    const rowData = [
      row.category,
      row.section,
      row.subcategory,
      row.service,
      row.description,
      row.htmlDescription,
      row.price,
      row.duration,
      row.notes,
      row.link
    ]
    
    csvContent += rowData.map((field, index) => {
      // Для HTML_Opis используем специальную функцию экранирования
      if (index === 5) {
        return escapeHTMLForCSV(field)
      }
      return escapeCSV(field)
    }).join(';') + '\n'
  })
  
  return csvContent
}

// Основная функция
async function exportServices() {
  try {
    console.log('📊 Начинаю экспорт услуг...')
    
    // Преобразуем данные в плоскую структуру
    const flatRows = flattenServices(services)
    
    console.log(`✅ Обработано ${flatRows.length} строк данных`)
    
    // Преобразуем в CSV
    const csvContent = rowsToCSV(flatRows)
    
    // Сохраняем файл
    const outputPath = path.join(process.cwd(), 'services_export_with_html.csv')
    
    // Сохраняем с кодировкой UTF-8 (добавляем BOM для корректного отображения в Excel)
    fs.writeFileSync(outputPath, '\ufeff' + csvContent, 'utf-8')
    
    console.log(`✅ Файл сохранён: ${outputPath}`)
    console.log(`📋 Всего строк: ${flatRows.length}`)
    console.log(`📁 Полный путь: ${path.resolve(outputPath)}`)
    console.log(`🎨 HTML-форматирование включено в колонку HTML_Opis`)
    
  } catch (error) {
    console.error('❌ Ошибка при экспорте:', error)
    if (error instanceof Error) {
      console.error('Детали:', error.message)
      console.error('Стек:', error.stack)
    }
    process.exit(1)
  }
}

// Запускаем экспорт
exportServices()

