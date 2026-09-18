import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

import { CONTACT_INFO } from '@/config/contacts'

// ????????? ??? ?????????
const MAX_FILE_SIZE_MB = 25
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024 // 25 MB
const MAX_TOTAL_SIZE_BYTES = 50 * 1024 * 1024 // 50 MB ????? ?????? ???? ??????

const DEFAULT_TO = 'serwis@omobonus.com.pl'
const DEFAULT_FROM = 'serwis@omobonus.com.pl'

// ???? ?????? ??? ????????????????? ?????????
type ErrorType =
  | 'MISSING_CONFIG'
  | 'SMTP_ERROR'
  | 'FILE_TOO_LARGE'
  | 'INVALID_REQUEST'
  | 'INTERNAL_ERROR'

interface ApiError {
  type: ErrorType
  message: string
  details?: string
  code?: string
}

// ???????? ???????????? SMTP
const validateSmtpConfig = (): { valid: boolean; missing: string[] } => {
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS']
  const missing: string[] = []

  for (const key of required) {
    if (!process.env[key] || process.env[key]?.trim() === '') {
      missing.push(key)
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  }
}

// ???????? transporter SMTP
const createTransporter = (): nodemailer.Transporter | null => {
  const config = validateSmtpConfig()

  if (!config.valid) {
    console.error('? SMTP ???????????? ????????. ???????????:', config.missing.join(', '))
    return null
  }

  const smtpHost = process.env.SMTP_HOST!
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10)
  const smtpUser = process.env.SMTP_USER!
  const smtpPass = process.env.SMTP_PASS!

  if (isNaN(smtpPort) || smtpPort <= 0) {
    console.error('? ???????? SMTP_PORT:', process.env.SMTP_PORT)
    return null
  }

  try {
    return nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true ??? ????? 465, false ??? ?????? (?????????? STARTTLS)
      requireTLS: smtpPort !== 465, // ???????? STARTTLS ??? ?????? ????? 465
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        // ?? ??????? ???????? ??????????? ??? Zenbox
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000, // 10 ?????? ??????? ???????????
      greetingTimeout: 10000, // 10 ?????? ??????? ???????????
    })
  } catch (error) {
    console.error('? ?????? ???????? SMTP transporter:', error)
    return null
  }
}

const mapDeviceType = (value: string, locale: EmailLocale = 'pl') => {
  const maps: Record<EmailLocale, { printer: string; computer: string; other: string; fallback: string }> = {
    pl: { printer: 'Drukarka', computer: 'Komputer / Laptop', other: 'Inne urządzenie', fallback: 'Nie podano' },
    ru: { printer: 'Принтер', computer: 'Компьютер / Ноутбук', other: 'Другое устройство', fallback: 'Не указано' },
    uk: { printer: 'Принтер', computer: "Комп'ютер / Ноутбук", other: 'Інший пристрій', fallback: 'Не вказано' },
  }
  const m = maps[locale]
  if (value === 'printer') return m.printer
  if (value === 'computer') return m.computer
  if (value === 'other') return m.other
  return m.fallback
}

type EmailLocale = 'pl' | 'ru' | 'uk'

const resolveEmailLocale = (value: string | null): EmailLocale =>
  value === 'ru' || value === 'uk' ? value : 'pl'

interface ClientEmailI18n {
  subject: (ticket: string) => string
  htmlTitle: string
  greeting: string
  confirmText: string
  ticketPrefix: string
  followUp: string
  textKeepTicketNote: string
  correctionNote: string
  dataHeader: string
  fieldName: string
  fieldPhone: string
  fieldEmail: string
  fieldAddress: string
  fieldDeviceType: string
  fieldDeviceModel: string
  fieldProblem: string
  signOff: string
  teamName: string
  footerNote: (year: number) => string
  na: string
}

const CLIENT_EMAIL_I18N: Record<EmailLocale, ClientEmailI18n> = {
  pl: {
    subject: ticket => `Dziękujemy za zgłoszenie serwisowe [${ticket}]`,
    htmlTitle: 'Dziękujemy za zgłoszenie serwisowe i za zaufanie!',
    greeting: 'Szanowny Kliencie,',
    confirmText: 'potwierdzamy otrzymanie Twojego zgłoszenia serwisowego w',
    ticketPrefix: 'Zgłoszenie zostało zarejestrowane pod numerem:',
    followUp: 'Nasz zespół wkrótce się z Tobą skontaktuje, aby ustalić dalsze kroki.',
    textKeepTicketNote: 'Prosimy o zachowanie numeru zgłoszenia do przyszłej korespondencji.',
    correctionNote: 'Jeśli zauważyłeś błąd w danych, odpowiedz na ten e-mail — poprawimy zgłoszenie.',
    dataHeader: 'Dane przesłane w formularzu:',
    fieldName: 'Imię i nazwisko:',
    fieldPhone: 'Numer telefonu:',
    fieldEmail: 'Adres e-mail:',
    fieldAddress: 'Adres:',
    fieldDeviceType: 'Typ urządzenia:',
    fieldDeviceModel: 'Model urządzenia:',
    fieldProblem: 'Opis problemu:',
    signOff: 'Pozdrawiamy serdecznie,',
    teamName: 'Zespół Omobonus Serwis',
    footerNote: year => `Wiadomość wysłana automatycznie z formularza Omobonus Serwis © ${year} Omobonus Serwis`,
    na: 'Nie podano',
  },
  ru: {
    subject: ticket => `Спасибо за заявку в сервис [${ticket}]`,
    htmlTitle: 'Спасибо за заявку в сервис и за доверие!',
    greeting: 'Уважаемый клиент,',
    confirmText: 'подтверждаем получение вашей заявки в сервисный центр',
    ticketPrefix: 'Заявка зарегистрирована под номером:',
    followUp: 'Наша команда свяжется с вами в ближайшее время, чтобы обсудить дальнейшие шаги.',
    textKeepTicketNote: 'Пожалуйста, сохраните номер заявки для дальнейшей переписки.',
    correctionNote: 'Если вы заметили ошибку в данных, ответьте на это письмо — мы исправим заявку.',
    dataHeader: 'Данные, отправленные в форме:',
    fieldName: 'Имя и фамилия:',
    fieldPhone: 'Номер телефона:',
    fieldEmail: 'Адрес e-mail:',
    fieldAddress: 'Адрес:',
    fieldDeviceType: 'Тип устройства:',
    fieldDeviceModel: 'Модель устройства:',
    fieldProblem: 'Описание проблемы:',
    signOff: 'С уважением,',
    teamName: 'Команда Omobonus Serwis',
    footerNote: year => `Сообщение отправлено автоматически с формы Omobonus Serwis © ${year} Omobonus Serwis`,
    na: 'Не указано',
  },
  uk: {
    subject: ticket => `Дякуємо за заявку в сервіс [${ticket}]`,
    htmlTitle: 'Дякуємо за заявку в сервіс і за довіру!',
    greeting: 'Шановний клієнте,',
    confirmText: 'підтверджуємо отримання вашої заявки до сервісного центру',
    ticketPrefix: 'Заявку зареєстровано під номером:',
    followUp: "Наша команда незабаром зв'яжеться з вами, щоб узгодити подальші кроки.",
    textKeepTicketNote: 'Будь ласка, збережіть номер заявки для подальшого листування.',
    correctionNote: 'Якщо ви помітили помилку в даних, відповідайте на цей лист — ми виправимо заявку.',
    dataHeader: 'Дані, надіслані у формі:',
    fieldName: "Ім'я та прізвище:",
    fieldPhone: 'Номер телефону:',
    fieldEmail: 'Адреса e-mail:',
    fieldAddress: 'Адреса:',
    fieldDeviceType: 'Тип пристрою:',
    fieldDeviceModel: 'Модель пристрою:',
    fieldProblem: 'Опис проблеми:',
    signOff: 'З повагою,',
    teamName: 'Команда Omobonus Serwis',
    footerNote: year => `Повідомлення надіслано автоматично з форми Omobonus Serwis © ${year} Omobonus Serwis`,
    na: 'Не вказано',
  },
}

// ??????? ??? ??????????? ????????????? HTML
const escapeHtml = (text: string | null | undefined): string => {
  if (!text) return ''
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// ??????? ??? ?????????????? ???????? (+48 778 786 796)
const formatPhone = (phone: string | null | undefined): string => {
  if (!phone) return 'Nie podano'
  // ??????? ??? ?????????? ??????? ????? +
  let cleaned = phone.replace(/[^\d+]/g, '')

  // ???? ?????????? ? +48, ??????????? ??? +48 XXX XXX XXX
  if (cleaned.startsWith('+48')) {
    const digits = cleaned.substring(3).replace(/\D/g, '')
    if (digits.length === 9) {
      return `+48 ${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6)}`
    }
    return phone
  }

  // ???? ?????????? ? 48, ????????? +
  if (cleaned.startsWith('48')) {
    const digits = cleaned.substring(2).replace(/\D/g, '')
    if (digits.length === 9) {
      return `+48 ${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6)}`
    }
  }

  return phone
}

// ????????? ?????? ?????? DDMMYY-XXX
const generateTicketNumber = (): string => {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = String(now.getFullYear()).slice(-2)

  // ?????????? ????????? 3 ????? timestamp ??? ????????????
  const timestamp = Date.now()
  const sequence = String(timestamp).slice(-3)

  return `${day}${month}${year}-${sequence}`
}



// ????????? ??????? ??????
const validateAttachments = (files: File[]): { valid: boolean; error?: ApiError } => {
  let totalSize = 0

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return {
        valid: false,
        error: {
          type: 'FILE_TOO_LARGE',
          message: `???? "${file.name}" ??????? ???????. ???????????? ??????: ${MAX_FILE_SIZE_MB} MB`,
          details: `?????? ?????: ${(file.size / 1024 / 1024).toFixed(2)} MB`,
        },
      }
    }
    totalSize += file.size
  }

  if (totalSize > MAX_TOTAL_SIZE_BYTES) {
    return {
      valid: false,
      error: {
        type: 'FILE_TOO_LARGE',
        message: '????? ?????? ???? ?????? ????????? ?????',
        details: `????? ??????: ${(totalSize / 1024 / 1024).toFixed(2)} MB, ?????: ${MAX_TOTAL_SIZE_BYTES / 1024 / 1024} MB`,
      },
    }
  }

  return { valid: true }
}

export async function POST(request: NextRequest) {
  console.log('?? ????? ??????? /api/send-email')

  try {
    // ???????? ???????????? SMTP ? ??????
    const configCheck = validateSmtpConfig()
    if (!configCheck.valid) {
      const error: ApiError = {
        type: 'MISSING_CONFIG',
        message: 'SMTP ???????????? ????????',
        details: `??????????? ?????????? ?????????: ${configCheck.missing.join(', ')}`,
      }

      console.error('?', error.message, error.details)

      return NextResponse.json(
        {
          success: false,
          error: error.message,
          errorType: error.type,
          details: process.env.NODE_ENV === 'development' ? error.details : '????????? ????????? ???????',
        },
        { status: 500 },
      )
    }

    const formData = await request.formData()

    // Honeypot anti-spam: pole niewidoczne dla ludzi, wypełniane tylko przez boty
    const honeypot = (formData.get('company') as string) ?? ''
    if (honeypot.trim() !== '') {
      console.warn('⚠️ Honeypot triggered — traktujemy zgłoszenie jako spam')
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const name = (formData.get('name') as string) ?? ''
    const phone = (formData.get('phone') as string) ?? ''
    const email = (formData.get('email') as string) ?? ''
    const address = (formData.get('address') as string) ?? ''
    const deviceTypeRaw = (formData.get('deviceType') as string) ?? ''
    const deviceType = mapDeviceType(deviceTypeRaw)
    const deviceModelRaw = (formData.get('deviceModel') as string) ?? ''
    const deviceModel = deviceModelRaw || 'Nie podano'
    const problemDescription = (formData.get('problemDescription') as string) ?? ''
    const emailLocale = resolveEmailLocale((formData.get('locale') as string) ?? null)

    // Podstawowa walidacja serwerowa (niezależna od walidacji po stronie klienta)
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const invalidFields: string[] = []
    if (email && (email.length > 254 || !EMAIL_REGEX.test(email))) invalidFields.push('email')
    if (name.length > 200) invalidFields.push('name')
    if (address.length > 300) invalidFields.push('address')
    if (problemDescription.length > 5000) invalidFields.push('problemDescription')

    if (invalidFields.length > 0) {
      const error: ApiError = {
        type: 'INVALID_REQUEST',
        message: 'Nieprawidłowe dane w formularzu',
        details: `Pola: ${invalidFields.join(', ')}`,
      }

      console.error('❌ Błąd walidacji:', error.message, error.details)

      return NextResponse.json(
        {
          success: false,
          error: error.message,
          errorType: error.type,
          details: process.env.NODE_ENV === 'development' ? error.details : undefined,
        },
        { status: 400 },
      )
    }

    // ????????? ? ????????? ??????
    const attachmentFiles = formData
      .getAll('attachments')
      .filter(item => item instanceof File) as File[]

    // ????????? ??????? ??????
    if (attachmentFiles.length > 0) {
      const validation = validateAttachments(attachmentFiles)
      if (!validation.valid && validation.error) {
        console.error('? ?????? ????????? ??????:', validation.error)
        return NextResponse.json(
          {
            success: false,
            error: validation.error.message,
            errorType: validation.error.type,
            details: validation.error.details,
          },
          { status: 400 },
        )
      }
    }

    // ??????????? ?????? ? ??????
    const attachments =
      attachmentFiles.length > 0
        ? await Promise.all(
          attachmentFiles.map(async file => ({
            filename: file.name || 'attachment',
            content: Buffer.from(await file.arrayBuffer()),
          })),
        )
        : undefined

    const currentYear = new Date().getFullYear()
    const ticketNumber = generateTicketNumber()
    const formattedPhone = formatPhone(phone)



    // HTML-?????? ?????? ??? ???????
    const emailHtml = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Nowe zgłoszenie serwisowe ${ticketNumber}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; background-color: #f8f5f0;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="#f8f5f0" style="background-color: #f8f5f0; padding: 40px 20px;">
    <tr>
      <td align="center" style="padding: 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="640" bgcolor="#ffffff" style="max-width: 640px; width: 100%; background-color: #ffffff; border: 1px solid #bfa76a; border-radius: 6px; box-shadow: 0 0 10px rgba(0,0,0,0.15);">
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <img src="https://serwis.omobonus.com.pl/images/Logo_Omobonus_email.jpg" alt="Omobonus Serwis" width="120" style="display: block; margin: 0 auto 15px; border: 0; outline: none; text-decoration: none; max-width: 120px; height: auto;" />
              <h1 style="margin: 0; color: #3a2e24; font-size: 26px; font-weight: bold; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; text-align: center;">Zgłoszenie nr: ${ticketNumber}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">Imię i nazwisko:</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${escapeHtml(name) || 'Nie podano'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">Numer telefonu:</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;"><a href="tel:${escapeHtml(phone)}" style="color: #3a2e24; text-decoration: none;">${escapeHtml(formattedPhone)}</a></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">Adres e-mail:</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;"><a href="mailto:${escapeHtml(email)}" style="color: #3a2e24; text-decoration: none;">${escapeHtml(email) || 'Nie podano'}</a></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">Adres:</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${escapeHtml(address) || 'Nie podano'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">Typ urządzenia:</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${escapeHtml(deviceType) || 'Nie podano'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">Model urządzenia:</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${escapeHtml(deviceModel) || 'Nie podano'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">Opis problemu:</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; white-space: pre-wrap;">${escapeHtml(problemDescription || 'Nie podano').replace(/\n/g, '<br>')}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="border-top: 1px solid #bfa76a; padding-top: 20px;">
                    <p style="margin: 0; color: #7a6a50; font-size: 12px; text-align: center; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">
                      Wiadomość wysłana automatycznie z formularza Omobonus Serwis © ${currentYear} Omobonus Serwis
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
</body>
</html>
    `.trim()

    // ????????? ?????? ??? ?????????????
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
    `.trim()

    // ???????? transporter SMTP
    const transporter = createTransporter()

    if (!transporter) {
      const error: ApiError = {
        type: 'MISSING_CONFIG',
        message: '❌ Nie można utworzyć SMTP transportera',
        details: 'Sprawdź konfigurację SMTP',
      }

      console.error('?', error.message)

      return NextResponse.json(
        {
          success: false,
          error: error.message,
          errorType: error.type,
          details: process.env.NODE_ENV === 'development' ? error.details : 'Błąd konfiguracji',
        },
        { status: 500 },
      )
    }

    const fromEmail = process.env.SMTP_FROM || DEFAULT_FROM
    const toEmail = (process.env.SMTP_TO || DEFAULT_TO).split(',').map(value => value.trim())

    console.log('?? ???????? ?????? ????? SMTP Zenbox...')
    console.log('?? From:', fromEmail)
    console.log('?? To:', toEmail)
    console.log('?? Subject ticket:', ticketNumber)

    // ?????????? ???????? ??? nodemailer
    const nodemailerAttachments = attachments
      ? attachments.map(att => ({
        filename: att.filename,
        content: att.content,
      }))
      : []

    // ???????? ?????? ???????
    const info = await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: `[${ticketNumber}] Nowe zgłoszenie serwisowe od ${escapeHtml(name) || 'anonim'}`,
      html: emailHtml,
      text: emailContent,
      attachments: nodemailerAttachments,
    })

    console.log('? ?????? ??????? ?????????? ???????!')
    console.log('?? Message ID:', info.messageId)
    console.log('?? Response:', info.response)

    // ???????? ?????? ??????? (???? email ??????)
    if (email && email.trim()) {
      try {
        const i18n = CLIENT_EMAIL_I18N[emailLocale]
        const clientDeviceType = mapDeviceType(deviceTypeRaw, emailLocale)
        const clientEmailHtml = `
<!DOCTYPE html>
<html lang="${emailLocale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${i18n.subject(ticketNumber)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; background-color: #f8f5f0;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="#f8f5f0" style="background-color: #f8f5f0; padding: 40px 20px;">
    <tr>
      <td align="center" style="padding: 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="640" bgcolor="#ffffff" style="max-width: 640px; width: 100%; background-color: #ffffff; border: 1px solid #bfa76a; border-radius: 6px; box-shadow: 0 0 10px rgba(0,0,0,0.15);">
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <img src="https://serwis.omobonus.com.pl/images/Logo_Omobonus_email.jpg" alt="Omobonus Serwis" width="120" style="display: block; margin: 0 auto 15px; border: 0; outline: none; text-decoration: none; max-width: 120px; height: auto;" />
              <h1 style="margin: 0 0 20px 0; color: #bfa76a; font-size: 24px; font-weight: bold; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; text-align: center;">${i18n.htmlTitle}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 20px;">
              <div style="font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; font-size: 15px; color: #3b2a1a; line-height: 1.2; max-width: 600px; margin: 0 auto;">
                <p style="margin: 0 0 18px 0; color: #3b2a1a; font-size: 18px; line-height: 1.2; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; font-weight: bold;">
                  ${i18n.greeting}
                </p>
                <p style="margin: 0 0 5px 0; color: #3b2a1a; font-size: 15px; line-height: 1.2; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">
                  ${i18n.confirmText} <strong>Omobonus Serwis</strong>.
                </p>
                <p style="margin: 0 0 5px 0; color: #3b2a1a; font-size: 15px; line-height: 1.3; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">
                  ${i18n.ticketPrefix} <span style="color: #bfa76a; font-size: 24px; font-weight: bold; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${ticketNumber}</span>.
                </p>
                <p style="margin: 0 0 0 0; color: #3b2a1a; font-size: 15px; line-height: 1.2; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; font-style: italic;">
                  ${i18n.followUp}
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px;">
              <p style="margin: 0 0 15px 0; color: #3a2e24; font-size: 16px; font-weight: bold; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${i18n.dataHeader}</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">${i18n.fieldName}</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${escapeHtml(name) || i18n.na}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">${i18n.fieldPhone}</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;"><a href="tel:${escapeHtml(phone)}" style="color: #3a2e24; text-decoration: none;">${phone ? escapeHtml(formattedPhone) : i18n.na}</a></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">${i18n.fieldEmail}</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;"><a href="mailto:${escapeHtml(email)}" style="color: #3a2e24; text-decoration: none;">${escapeHtml(email) || i18n.na}</a></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">${i18n.fieldAddress}</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${escapeHtml(address) || i18n.na}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">${i18n.fieldDeviceType}</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${escapeHtml(clientDeviceType) || i18n.na}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">${i18n.fieldDeviceModel}</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${escapeHtml(deviceModelRaw) || i18n.na}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">${i18n.fieldProblem}</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; white-space: pre-wrap;">${escapeHtml(problemDescription || i18n.na).replace(/\n/g, '<br>')}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 12px 0 0;">
                    <p style="margin: 0; color: #7a6a50; font-size: 13px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; font-style: italic; text-align: left;">
                      ${i18n.correctionNote}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #3a2e24; font-size: 16px; line-height: 1.6; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">
                ${i18n.signOff}<br />
                <strong>${i18n.teamName}</strong>
              </p>
              <p style="margin: 0; color: #3a2e24; font-size: 14px; line-height: 1.6; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">
                📞 <a href="${CONTACT_INFO.phoneHref}" style="color: #3a2e24; text-decoration: none;">${CONTACT_INFO.phone}</a><br />
                🌐 <a href="https://serwis.omobonus.com.pl/" style="color: #3a2e24; text-decoration: none;">serwis.omobonus.com.pl</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="border-top: 1px solid #bfa76a; padding-top: 20px;">
                    <p style="margin: 0; color: #7a6a50; font-size: 12px; text-align: center; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">
                      ${i18n.footerNote(currentYear)}
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
</body>
</html>
        `.trim()

        const clientEmailContent = `
${i18n.htmlTitle}

${i18n.greeting}

${i18n.confirmText} Omobonus Serwis.

${i18n.ticketPrefix.replace(/:$/, '')} ${ticketNumber}.

${i18n.followUp}

${i18n.textKeepTicketNote}

${i18n.dataHeader}

${i18n.fieldName} ${name}
${i18n.fieldPhone} ${phone ? formattedPhone : i18n.na}
${i18n.fieldEmail} ${email}
${i18n.fieldAddress} ${address}
${i18n.fieldDeviceType} ${clientDeviceType}
${i18n.fieldDeviceModel} ${deviceModelRaw || i18n.na}
${i18n.fieldProblem} ${problemDescription}

${i18n.signOff}
${i18n.teamName}
📞 ${CONTACT_INFO.phone}
🌐 https://serwis.omobonus.com.pl/

${i18n.footerNote(currentYear)}
        `.trim()

        await transporter.sendMail({
          from: fromEmail,
          to: email.trim(),
          subject: i18n.subject(ticketNumber),
          html: clientEmailHtml,
          text: clientEmailContent,
        })

        console.log('? ?????? ??????? ?????????? ???????!')
      } catch (clientError: any) {
        // ?? ????????? ???????? ???????? ??? ?????? ???????? ???????
        console.error('?? ?????? ??? ???????? ?????? ??????? (?? ????????? ???????? ????????):', clientError)
        console.error('?? ?????? ?????? ???????:', {
          message: clientError?.message,
          code: clientError?.code,
        })
      }
    } else {
      console.log('?? Email ??????? ?? ??????, ?????????? ???????? ?????????????')
    }

    return NextResponse.json(
      {
        success: true,
        messageId: info.messageId,
        response: info.response,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error('? ?????? ??? ???????? ?????? ????? SMTP Zenbox:', error)

    const errorDetails: ApiError = {
      type: 'SMTP_ERROR',
      message: '?? ??????? ????????? ??????',
      code: error?.code,
      details: error?.message,
    }

    // ?????????????? ??????????? ??? SMTP ??????
    if (error?.response) {
      console.error('? SMTP Response:', error.response)
      errorDetails.details = error.response
    }
    if (error?.command) {
      console.error('? SMTP Command:', error.command)
    }

    // ??????????? ???? ??????
    if (error?.code === 'ETIMEDOUT' || error?.code === 'ECONNREFUSED') {
      errorDetails.type = 'SMTP_ERROR'
      errorDetails.message = '?? ??????? ???????????? ? SMTP ???????'
    } else if (error?.code === 'EAUTH') {
      errorDetails.type = 'SMTP_ERROR'
      errorDetails.message = '?????? ?????????????? SMTP'
    }

    return NextResponse.json(
      {
        success: false,
        error: errorDetails.message,
        errorType: errorDetails.type,
        details: process.env.NODE_ENV === 'development' ? errorDetails.details : undefined,
        code: errorDetails.code,
      },
      { status: 500 },
    )
  }
}
