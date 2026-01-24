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

const mapDeviceType = (value: string) => {
  if (value === 'printer') return 'Drukarka'
  if (value === 'computer') return 'Komputer / Laptop'
  if (value === 'other') return 'Inne urz�dzenie'
  return 'Nie podano'
}

const boolToText = (value: string | null) =>
  value === 'true' || value === 'on' ? 'Tak' : 'Nie'

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

    // ??????????? ?????? ????? (??? ?????????????? ??????)
    const formEntries: Record<string, any> = {}
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        formEntries[key] = { name: value.name, size: value.size, type: value.type }
      } else {
        formEntries[key] = value
      }
    }
    console.log('?? ?????? ?????:', formEntries)

    const name = (formData.get('name') as string) ?? ''
    const phone = (formData.get('phone') as string) ?? ''
    const email = (formData.get('email') as string) ?? ''
    const address = (formData.get('address') as string) ?? ''
    const deviceType = mapDeviceType((formData.get('deviceType') as string) ?? '')
    const deviceModel = (formData.get('deviceModel') as string) || 'Nie podano'
    const problemDescription = (formData.get('problemDescription') as string) ?? ''
    const replacementPrinter = boolToText(formData.get('replacementPrinter') as string | null)

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
  <title>Nowe zg�oszenie serwisowe ${ticketNumber}</title>
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
              <h1 style="margin: 0; color: #3a2e24; font-size: 26px; font-weight: bold; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; text-align: center;">Zg�oszenie ?: ${ticketNumber}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">Imi� i nazwisko:</td>
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
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">Typ urz�dzenia:</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${escapeHtml(deviceType) || 'Nie podano'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">Model urz�dzenia:</td>
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
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">Potrzebuj� drukarki zast�pczej:</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${escapeHtml(replacementPrinter) || 'Nie'}</td>
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
                      Wiadomo�� wys�ana automatycznie z formularza Omobonus Serwis � 2025 Omobonus Serwis
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
Nowe zg�oszenie serwisowe
Numer zg�oszenia: ${ticketNumber}

Imi� i nazwisko: ${name}
Numer telefonu: ${formattedPhone}
Adres e-mail: ${email}
Adres: ${address}
Typ urz�dzenia: ${deviceType}
Model urz�dzenia: ${deviceModel}
Opis problemu: ${problemDescription}
Potrzebuj� drukarki zast�pczej: ${replacementPrinter}
    `.trim()

    // ???????? transporter SMTP
    const transporter = createTransporter()

    if (!transporter) {
      const error: ApiError = {
        type: 'MISSING_CONFIG',
        message: '?? ??????? ??????? SMTP transporter',
        details: '????????? ???????????? SMTP',
      }

      console.error('?', error.message)

      return NextResponse.json(
        {
          success: false,
          error: error.message,
          errorType: error.type,
          details: process.env.NODE_ENV === 'development' ? error.details : '?????????? ? ??????????????',
        },
        { status: 500 },
      )
    }

    const fromEmail = process.env.SMTP_FROM || DEFAULT_FROM
    const toEmail = (process.env.SMTP_TO || DEFAULT_TO).split(',').map(value => value.trim())

    console.log('?? ???????? ?????? ????? SMTP Zenbox...')
    console.log('?? From:', fromEmail)
    console.log('?? To:', toEmail)
    console.log('?? Subject:', `[${ticketNumber}] Nowe zg�oszenie serwisowe od ${escapeHtml(name) || 'anonim'}`)

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
      subject: `[${ticketNumber}] Nowe zg�oszenie serwisowe od ${escapeHtml(name) || 'anonim'}`,
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
        const clientEmailHtml = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Dzi�kujemy za zg�oszenie serwisowe ${ticketNumber}</title>
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
              <h1 style="margin: 0 0 20px 0; color: #bfa76a; font-size: 24px; font-weight: bold; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; text-align: center;">Dzi�kujemy za zg�oszenie serwisowe i za zaufanie!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 20px;">
              <div style="font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; font-size: 15px; color: #3b2a1a; line-height: 1.2; max-width: 600px; margin: 0 auto;">
                <p style="margin: 0 0 18px 0; color: #3b2a1a; font-size: 18px; line-height: 1.2; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; font-weight: bold;">
                  Szanowny Kliencie,
                </p>
                <p style="margin: 0 0 5px 0; color: #3b2a1a; font-size: 15px; line-height: 1.2; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">
                  potwierdzamy otrzymanie Twojego zg�oszenia serwisowego w <strong>Omobonus Serwis</strong>.
                </p>
                <p style="margin: 0 0 5px 0; color: #3b2a1a; font-size: 15px; line-height: 1.3; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">
                  Zg�oszenie zosta�o zarejestrowane pod numerem: <span style="color: #bfa76a; font-size: 24px; font-weight: bold; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${ticketNumber}</span>.
                </p>
                <p style="margin: 0 0 0 0; color: #3b2a1a; font-size: 15px; line-height: 1.2; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; font-style: italic;">
                  Nasz zesp� wkr�tce si� z Tob� skontaktuje, aby ustali� dalsze kroki.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px;">
              <p style="margin: 0 0 15px 0; color: #3a2e24; font-size: 16px; font-weight: bold; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">Dane przes�ane w formularzu:</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">Imi� i nazwisko:</td>
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
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">Typ urz�dzenia:</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${escapeHtml(deviceType) || 'Nie podano'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">Model urz�dzenia:</td>
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
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">Drukarka zast�pcza:</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${escapeHtml(replacementPrinter) || 'Nie'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0 0;">
                    <p style="margin: 0; color: #7a6a50; font-size: 13px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; font-style: italic; text-align: left;">
                      Je�li zauwa�y�e� b��d w danych, odpowiedz na ten e-mail � poprawimy zg�oszenie.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #3a2e24; font-size: 16px; line-height: 1.6; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">
                Pozdrawiamy serdecznie,<br />
                <strong>Zesp� Omobonus Serwis</strong>
              </p>
              <p style="margin: 0; color: #3a2e24; font-size: 14px; line-height: 1.6; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">
                ?? <a href="${CONTACT_INFO.phoneHref}" style="color: #3a2e24; text-decoration: none;">${CONTACT_INFO.phone}</a><br />
                ?? <a href="https://serwis.omobonus.com.pl/" style="color: #3a2e24; text-decoration: none;">serwis.omobonus.com.pl</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="border-top: 1px solid #bfa76a; padding-top: 20px;">
                    <p style="margin: 0; color: #7a6a50; font-size: 12px; text-align: center; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">
                      Wiadomo�� wys�ana automatycznie z formularza Omobonus Serwis � 2025 Omobonus Serwis
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
Dzi�kujemy za zg�oszenie serwisowe i za zaufanie!

Szanowny Kliencie,

potwierdzamy otrzymanie Twojego zg�oszenia serwisowego w Omobonus Serwis.

Zg�oszenie zosta�o zarejestrowane pod numerem ${ticketNumber}.

Nasz zesp� wkr�tce si� z Tob� skontaktuje, aby ustali� dalsze kroki.

Prosimy o zachowanie numeru zg�oszenia do przysz�ej korespondencji.

Dane przes�ane w formularzu:

Imi� i nazwisko: ${name}
Numer telefonu: ${formattedPhone}
Adres e-mail: ${email}
Adres: ${address}
Typ urz�dzenia: ${deviceType}
Model urz�dzenia: ${deviceModel}
Opis problemu: ${problemDescription}
Drukarka zast�pcza: ${replacementPrinter}

Pozdrawiamy serdecznie,
Zesp� Omobonus Serwis
?? ${CONTACT_INFO.phone}
?? https://serwis.omobonus.com.pl/

Wiadomo�� wys�ana automatycznie z formularza Omobonus Serwis � 2025 Omobonus Serwis
        `.trim()

        await transporter.sendMail({
          from: fromEmail,
          to: email.trim(),
          subject: `Dzi�kujemy za zg�oszenie serwisowe [${ticketNumber}]`,
          html: clientEmailHtml,
          text: clientEmailContent,
        })

        console.log('? ?????? ??????? ?????????? ???????!')
        console.log('?? ?????? email:', email.trim())
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
