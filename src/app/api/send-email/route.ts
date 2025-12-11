import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Upewnij się, że w pliku .env.local ustawisz:
// SMTP_HOST=smtp.zenbox.pl
// SMTP_PORT=587
// SMTP_USER=serwis@omobonus.com.pl
// SMTP_PASS=Ecoprint12345!
// SMTP_FROM=serwis@omobonus.com.pl
// SMTP_TO=serwis@omobonus.com.pl

const mapDeviceType = (value: string) => {
  if (value === 'printer') return 'Drukarka'
  if (value === 'computer') return 'Komputer / Laptop'
  return 'Inne urządzenie'
}

const boolToText = (value: string | null) =>
  value === 'true' || value === 'on' ? 'Tak' : 'Nie'

// Функция для безопасного экранирования HTML
const escapeHtml = (text: string | null | undefined): string => {
  if (!text) return ''
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Функция для форматирования телефона (+48 778 786 796)
const formatPhone = (phone: string | null | undefined): string => {
  if (!phone) return 'Nie podano'
  // Убираем все нецифровые символы кроме +
  let cleaned = phone.replace(/[^\d+]/g, '')
  
  // Если начинается с +48, форматируем как +48 XXX XXX XXX
  if (cleaned.startsWith('+48')) {
    const digits = cleaned.substring(3).replace(/\D/g, '')
    if (digits.length === 9) {
      return `+48 ${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6)}`
    }
    return phone
  }
  
  // Если начинается с 48, добавляем +
  if (cleaned.startsWith('48')) {
    const digits = cleaned.substring(2).replace(/\D/g, '')
    if (digits.length === 9) {
      return `+48 ${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6)}`
    }
  }
  
  return phone
}

// Генерация номера заявки DDMMYY-XXX
// Для простоты используем timestamp и последние 3 цифры
const generateTicketNumber = (): string => {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = String(now.getFullYear()).slice(-2)
  
  // Используем последние 3 цифры timestamp для уникальности
  const timestamp = Date.now()
  const sequence = String(timestamp).slice(-3)
  
  return `${day}${month}${year}-${sequence}`
}

export async function POST(request: NextRequest) {
  console.log('📩 Форма wywołała /api/send-email')
  try {
    const formData = await request.formData()
    
    // Log всех данных формы
    const formEntries: Record<string, any> = {}
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        formEntries[key] = { name: value.name, size: value.size, type: value.type }
      } else {
        formEntries[key] = value
      }
    }
    console.log('📋 Dane z formularza:', formEntries)

    const name = (formData.get('name') as string) ?? ''
    const phone = (formData.get('phone') as string) ?? ''
    const email = (formData.get('email') as string) ?? ''
    const address = (formData.get('address') as string) ?? ''
    const deviceType = mapDeviceType((formData.get('deviceType') as string) ?? '')
    const deviceModel = (formData.get('deviceModel') as string) || 'Nie podano'
    const problemDescription = (formData.get('problemDescription') as string) ?? ''
    const replacementPrinter = boolToText(formData.get('replacementPrinter') as string | null)

    const attachmentFiles = formData
      .getAll('attachments')
      .filter(item => item instanceof File) as File[]

    const attachments =
      attachmentFiles.length > 0
        ? await Promise.all(
            attachmentFiles.map(async file => ({
              filename: file.name || 'attachment',
              content: Buffer.from(await file.arrayBuffer()),
            })),
          )
        : []

    const currentYear = new Date().getFullYear()
    const ticketNumber = generateTicketNumber()
    const formattedPhone = formatPhone(phone)
    
    // Используем только внешние URL для изображений (безопасно для Vercel)
    // Это предотвращает проблемы со сборкой из-за чтения файлов через fs
    const finalBackgroundUrl = 'https://serwis.omobonus.com.pl/images/zmiety%20arkusz%20papieru%202.png'
    const finalLogoUrl = 'https://serwis.omobonus.com.pl/images/Logo_Omobonus.png'
    
    // HTML-шаблон письма
    const emailHtml = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Nowe zgłoszenie serwisowe ${ticketNumber}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Times New Roman', serif;">
  <!--[if mso]>
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="padding: 30px 20px;">
    <tr>
      <td>
        <v:rect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" stroked="false" style="width:100%;">
          <v:fill type="frame" src="${finalBackgroundUrl}" color="transparent"/>
          <v:textbox inset="0,0,0,0">
  <![endif]-->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-image: url('${finalBackgroundUrl}'); background-size: cover; background-position: center; background-repeat: no-repeat; padding: 30px 20px;">
    <tr>
      <td style="background-color: rgba(0, 0, 0, 0.5); padding: 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td align="center" style="padding: 30px 20px;">
              <!-- Основной контент -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: rgba(248, 240, 220, 0.95); border-radius: 4px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); border: 2px solid #bfa76a;">
                <!-- Header z логотипом -->
                <tr>
                  <td style="background-color: rgba(58, 46, 36, 0.9); padding: 30px 40px 25px; text-align: center; border-bottom: 2px solid #bfa76a;">
                    <img src="${finalLogoUrl}" alt="Omobonus Serwis" width="200" height="auto" style="max-width: 200px; height: auto; display: block; margin: 0 auto; border: 0; outline: none; text-decoration: none;" />
                  </td>
                </tr>
                
                <!-- Заголовок с номером заявки -->
                <tr>
                  <td style="padding: 25px 40px 15px; text-align: center;">
                    <h1 style="margin: 0 0 5px 0; color: #3a2e24; font-size: 26px; font-weight: 700; font-family: 'Times New Roman', serif; letter-spacing: 0.5px;">Nowe zgłoszenie serwisowe</h1>
                    <p style="margin: 0; color: #bfa76a; font-size: 16px; font-weight: 600; font-family: 'Times New Roman', serif;">Numer zgłoszenia: <span style="color: #3a2e24;">${ticketNumber}</span></p>
                  </td>
                </tr>
                
                <!-- Содержимое письма -->
                <tr>
                  <td style="padding: 0 40px 25px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <!-- Имя и фамилия -->
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid rgba(58, 46, 36, 0.2);">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="180" style="color: #3a2e24; font-weight: 600; font-size: 14px; vertical-align: top; font-family: 'Times New Roman', serif;">Imię i nazwisko:</td>
                              <td style="color: #3a2e24; font-size: 14px; line-height: 1.2; font-family: 'Times New Roman', serif;">${escapeHtml(name) || 'Nie podano'}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Телефон -->
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid rgba(58, 46, 36, 0.2);">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="180" style="color: #3a2e24; font-weight: 600; font-size: 14px; vertical-align: top; font-family: 'Times New Roman', serif;">Numer telefonu:</td>
                              <td style="color: #3a2e24; font-size: 14px; line-height: 1.2; font-family: 'Times New Roman', serif;"><a href="tel:${escapeHtml(phone)}" style="color: #3a2e24; text-decoration: none; font-weight: 500;">${escapeHtml(formattedPhone)}</a></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Email -->
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid rgba(58, 46, 36, 0.2);">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="180" style="color: #3a2e24; font-weight: 600; font-size: 14px; vertical-align: top; font-family: 'Times New Roman', serif;">Adres e-mail:</td>
                              <td style="color: #3a2e24; font-size: 14px; line-height: 1.2; font-family: 'Times New Roman', serif;"><a href="mailto:${escapeHtml(email)}" style="color: #3a2e24; text-decoration: none; font-weight: 500;">${escapeHtml(email) || 'Nie podano'}</a></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Адрес -->
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid rgba(58, 46, 36, 0.2);">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="180" style="color: #3a2e24; font-weight: 600; font-size: 14px; vertical-align: top; font-family: 'Times New Roman', serif;">Adres:</td>
                              <td style="color: #3a2e24; font-size: 14px; line-height: 1.2; font-family: 'Times New Roman', serif;">${escapeHtml(address) || 'Nie podano'}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Тип устройства -->
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid rgba(58, 46, 36, 0.2);">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="180" style="color: #3a2e24; font-weight: 600; font-size: 14px; vertical-align: top; font-family: 'Times New Roman', serif;">Typ urządzenia:</td>
                              <td style="color: #3a2e24; font-size: 14px; line-height: 1.2; font-family: 'Times New Roman', serif;">${escapeHtml(deviceType) || 'Nie podano'}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Модель устройства -->
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid rgba(58, 46, 36, 0.2);">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="180" style="color: #3a2e24; font-weight: 600; font-size: 14px; vertical-align: top; font-family: 'Times New Roman', serif;">Model urządzenia:</td>
                              <td style="color: #3a2e24; font-size: 14px; line-height: 1.2; font-family: 'Times New Roman', serif;">${escapeHtml(deviceModel) || 'Nie podano'}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Описание проблемы -->
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid rgba(58, 46, 36, 0.2);">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="180" style="color: #3a2e24; font-weight: 600; font-size: 14px; vertical-align: top; font-family: 'Times New Roman', serif;">Opis problemu:</td>
                              <td style="color: #3a2e24; font-size: 14px; line-height: 1.2; font-family: 'Times New Roman', serif; white-space: pre-wrap;">${escapeHtml(problemDescription || 'Nie podano').replace(/\n/g, '<br>')}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Замена принтера -->
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid rgba(58, 46, 36, 0.2);">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="180" style="color: #3a2e24; font-weight: 600; font-size: 14px; vertical-align: top; font-family: 'Times New Roman', serif;">Potrzebuję drukarki zastępczej:</td>
                              <td style="color: #3a2e24; font-size: 14px; line-height: 1.2; font-family: 'Times New Roman', serif;">${escapeHtml(replacementPrinter) || 'Nie'}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: rgba(58, 46, 36, 0.8); padding: 15px 40px; border-top: 1px solid rgba(191, 167, 106, 0.3);">
                    <p style="margin: 0; color: #bfa76a; font-size: 11px; text-align: center; line-height: 1.3; font-family: 'Times New Roman', serif;">
                      Wiadomość wysłana automatycznie z formularza Omobonus Serwis<br>
                      © ${currentYear} Omobonus Serwis
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <!--[if mso]>
          </v:textbox>
        </v:rect>
      </td>
    </tr>
  </table>
  <![endif]-->
</body>
</html>
    `.trim()

    // Текстовую версию для совместимости
    const emailContent = `
Nowe zgłoszenie serwisowe
Numer zgłoszenia: ${ticketNumber}

Imię i nazwisko: ${name}
Numer telefonu: ${formattedPhone}
Adres e-mail: ${email}
Adres: ${address}
Typ urządzenia: ${deviceType}
Model urządzenia: ${deviceModel}
Opis problemu: ${problemDescription}
Potrzebuję drukarki zastępczej: ${replacementPrinter}
    `.trim()

    // Проверка наличия SMTP переменных
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const smtpFrom = process.env.SMTP_FROM || smtpUser
    const smtpTo = process.env.SMTP_TO || smtpUser

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.error('❌ SMTP переменные не настроены:', {
        SMTP_HOST: !!smtpHost,
        SMTP_PORT: !!smtpPort,
        SMTP_USER: !!smtpUser,
        SMTP_PASS: !!smtpPass,
      })
      return NextResponse.json(
        { error: 'SMTP конфигурация не настроена' },
        { status: 500 },
      )
    }

    console.log('📤 Wysyłanie e-maila przez SMTP Zenbox...')
    console.log('📧 From:', smtpFrom)
    console.log('📧 To:', smtpTo)

    // Создание транспорта nodemailer
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: false, // true для 465, false для других портов
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    // Отправка письма
    const mailOptions = {
      from: smtpFrom,
      to: smtpTo,
      subject: `[${ticketNumber}] Nowe zgłoszenie serwisowe od ${escapeHtml(name) || 'anonim'}`,
      html: emailHtml,
      text: emailContent,
      attachments: attachments.length > 0 ? attachments : undefined,
    }

    const info = await transporter.sendMail(mailOptions)

    console.log('✅ Email отправлен успешно:', info.messageId)
    console.log('📧 Response:', info.response)

    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId,
      response: info.response,
    })
  } catch (error) {
    console.error('❌ Error sending email:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas wysyłania wiadomości' },
      { status: 500 },
    )
  }
}
