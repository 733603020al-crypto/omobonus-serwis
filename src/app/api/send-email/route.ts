import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import { CONTACT_INFO } from '@/config/contacts'

// Konfiguracja SMTP Zenbox
// Upewnij się, że w pliku .env.local ustawisz:
// SMTP_HOST=smtp.zenbox.pl
// SMTP_PORT=587
// SMTP_USER=serwis@omobonus.com.pl
// SMTP_PASS=Ecoprint12345!
// SMTP_FROM=serwis@omobonus.com.pl
// SMTP_TO=serwis@omobonus.com.pl
// 
// đčđżđ┤ĐÇđżđ▒đŻđ░ĐĆ đŞđŻĐüĐéĐÇĐâđ║ĐćđŞĐĆ: docs/email-config.md

const DEFAULT_TO = 'serwis@omobonus.com.pl'
const DEFAULT_FROM = 'serwis@omobonus.com.pl'

// Tworzenie transporter SMTP
const createTransporter = () => {
  const smtpHost = process.env.SMTP_HOST || 'smtp.zenbox.pl'
  const smtpPort = parseInt(process.env.SMTP_PORT || '587')
  const smtpUser = process.env.SMTP_USER || 'serwis@omobonus.com.pl'
  const smtpPass = process.env.SMTP_PASS

  if (!smtpPass) {
    console.warn('ÔÜá´ŞĆ SMTP_PASS nie jest ustawiony w zmiennych ┼Ťrodowiskowych')
    return null
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false, // true dla portu 465, false dla innych port├│w (u┼╝ywamy STARTTLS)
    requireTLS: true, // Wymusza u┼╝ycie STARTTLS
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      // đŁđÁ ĐéĐÇđÁđ▒ĐâđÁđ╝ đ┐ĐÇđżđ▓đÁĐÇđ║Đâ ĐüđÁĐÇĐéđŞĐäđŞđ║đ░Đéđ░ đ┤đ╗ĐĆ Zenbox
      rejectUnauthorized: false,
    },
  })
}

const mapDeviceType = (value: string) => {
  if (value === 'printer') return 'Drukarka'
  if (value === 'computer') return 'Komputer / Laptop'
  return 'Inne urz─ůdzenie'
}

const boolToText = (value: string | null) =>
  value === 'true' || value === 'on' ? 'Tak' : 'Nie'

// đĄĐâđŻđ║ĐćđŞĐĆ đ┤đ╗ĐĆ đ▒đÁđĚđżđ┐đ░ĐüđŻđżđ│đż ĐŹđ║ĐÇđ░đŻđŞĐÇđżđ▓đ░đŻđŞĐĆ HTML
const escapeHtml = (text: string | null | undefined): string => {
  if (!text) return ''
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// đĄĐâđŻđ║ĐćđŞĐĆ đ┤đ╗ĐĆ ĐäđżĐÇđ╝đ░ĐéđŞĐÇđżđ▓đ░đŻđŞĐĆ ĐéđÁđ╗đÁĐäđżđŻđ░ (+48 778 786 796)
const formatPhone = (phone: string | null | undefined): string => {
  if (!phone) return 'Nie podano'
  // đúđ▒đŞĐÇđ░đÁđ╝ đ▓ĐüđÁ đŻđÁĐćđŞĐäĐÇđżđ▓ĐőđÁ ĐüđŞđ╝đ▓đżđ╗Đő đ║ĐÇđżđ╝đÁ +
  let cleaned = phone.replace(/[^\d+]/g, '')
  
  // đĽĐüđ╗đŞ đŻđ░ĐçđŞđŻđ░đÁĐéĐüĐĆ Đü +48, ĐäđżĐÇđ╝đ░ĐéđŞĐÇĐâđÁđ╝ đ║đ░đ║ +48 XXX XXX XXX
  if (cleaned.startsWith('+48')) {
    const digits = cleaned.substring(3).replace(/\D/g, '')
    if (digits.length === 9) {
      return `+48 ${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6)}`
    }
    return phone
  }
  
  // đĽĐüđ╗đŞ đŻđ░ĐçđŞđŻđ░đÁĐéĐüĐĆ Đü 48, đ┤đżđ▒đ░đ▓đ╗ĐĆđÁđ╝ +
  if (cleaned.startsWith('48')) {
    const digits = cleaned.substring(2).replace(/\D/g, '')
    if (digits.length === 9) {
      return `+48 ${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6)}`
    }
  }
  
  return phone
}

// đôđÁđŻđÁĐÇđ░ĐćđŞĐĆ đŻđżđ╝đÁĐÇđ░ đĚđ░ĐĆđ▓đ║đŞ DDMMYY-XXX
// đöđ╗ĐĆ đ┐ĐÇđżĐüĐéđżĐéĐő đŞĐüđ┐đżđ╗ĐîđĚĐâđÁđ╝ timestamp đŞ đ┐đżĐüđ╗đÁđ┤đŻđŞđÁ 3 ĐćđŞĐäĐÇĐő
const generateTicketNumber = (): string => {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = String(now.getFullYear()).slice(-2)
  
  // đśĐüđ┐đżđ╗ĐîđĚĐâđÁđ╝ đ┐đżĐüđ╗đÁđ┤đŻđŞđÁ 3 ĐćđŞĐäĐÇĐő timestamp đ┤đ╗ĐĆ ĐâđŻđŞđ║đ░đ╗ĐîđŻđżĐüĐéđŞ
  const timestamp = Date.now()
  const sequence = String(timestamp).slice(-3)
  
  return `${day}${month}${year}-${sequence}`
}

export async function POST(request: NextRequest) {
  console.log('­čôę đĄđżĐÇđ╝đ░ wywo┼éa┼éa /api/send-email')
  try {
    const formData = await request.formData()
    
    // Log đ▓ĐüđÁĐů đ┤đ░đŻđŻĐőĐů ĐäđżĐÇđ╝Đő
    const formEntries: Record<string, any> = {}
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        formEntries[key] = { name: value.name, size: value.size, type: value.type }
      } else {
        formEntries[key] = value
      }
    }
    console.log('­čôő Dane z formularza:', formEntries)

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
        : undefined

    const currentYear = new Date().getFullYear()
    const ticketNumber = generateTicketNumber()
    const formattedPhone = formatPhone(phone)
    
    // đžĐéđÁđŻđŞđÁ đŞ đ║đżđŻđ▓đÁĐÇĐéđ░ĐćđŞĐĆ đ╗đżđ│đżĐéđŞđ┐đ░ đ▓ base64 đ┤đ╗ĐĆ đ▓ĐüĐéĐÇđ░đŞđ▓đ░đŻđŞĐĆ đ▓ đ┐đŞĐüĐîđ╝đż
    let logoBase64 = ''
    try {
      const logoPath = path.join(process.cwd(), 'public', 'images', 'Logo_Omobonus_favicon.png')
      if (fs.existsSync(logoPath)) {
        const logoBuffer = fs.readFileSync(logoPath)
        const base64 = logoBuffer.toString('base64')
        logoBase64 = `data:image/png;base64,${base64}`
        console.log('Ôťů đŤđżđ│đżĐéđŞđ┐ đ║đżđŻđ▓đÁĐÇĐéđŞĐÇđżđ▓đ░đŻ đ▓ base64')
      } else {
        console.warn('ÔÜá´ŞĆ đŤđżđ│đżĐéđŞđ┐ đŻđÁ đŻđ░đ╣đ┤đÁđŻ, đŞĐüđ┐đżđ╗ĐîđĚĐâđÁđ╝ ĐÇđÁđĚđÁĐÇđ▓đŻĐőđ╣ đ▓đ░ĐÇđŞđ░đŻĐé')
        logoBase64 = ''
      }
    } catch (error) {
      console.error('ÔŁî đ×ĐłđŞđ▒đ║đ░ đ┐ĐÇđŞ ĐçĐéđÁđŻđŞđŞ đ╗đżđ│đżĐéđŞđ┐đ░:', error)
      logoBase64 = ''
    }
    
    // HTML-Đłđ░đ▒đ╗đżđŻ đ┐đŞĐüĐîđ╝đ░ (đ╝đŞđŻđŞđ╝đ░đ╗đŞĐüĐéđŞĐçđŻĐőđ╣, đ▒đÁđĚ ĐäđżđŻđżđ▓ĐőĐů đŞđĚđżđ▒ĐÇđ░đÂđÁđŻđŞđ╣)
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
  <!-- đĺđŻđÁĐłđŻĐĆĐĆ Đéđ░đ▒đ╗đŞĐćđ░ Đü ĐäđżđŻđżđ╝ -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="#f8f5f0" style="background-color: #f8f5f0; padding: 40px 20px;">
    <tr>
      <td align="center" style="padding: 0;">
        <!-- đ×ĐüđŻđżđ▓đŻđżđ╣ đ║đżđŻĐéđÁđ╣đŻđÁĐÇ -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="640" bgcolor="#ffffff" style="max-width: 640px; width: 100%; background-color: #ffffff; border: 1px solid #bfa76a; border-radius: 6px; box-shadow: 0 0 10px rgba(0,0,0,0.15);">
          <!-- đŤđżđ│đżĐéđŞđ┐ đŞ đĚđ░đ│đżđ╗đżđ▓đżđ║ -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              ${logoBase64 ? `<img src="${logoBase64}" alt="Omobonus Serwis" width="120" style="display: block; margin: 0 auto 15px; border: 0; outline: none; text-decoration: none; max-width: 120px; height: auto;" />` : ''}
              <h1 style="margin: 0; color: #3a2e24; font-size: 26px; font-weight: bold; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; text-align: center;">Zgłoszenie №: ${ticketNumber}</h1>
                  </td>
                </tr>
                
          <!-- đóđ░đ▒đ╗đŞĐćđ░ đ┤đ░đŻđŻĐőĐů -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <!-- đśđ╝ĐĆ đŞ Đäđ░đ╝đŞđ╗đŞĐĆ -->
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
                      
                      <!-- đóđÁđ╗đÁĐäđżđŻ -->
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
                      
                      <!-- Email -->
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
                      
                      <!-- đÉđ┤ĐÇđÁĐü -->
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
                      
                      <!-- đóđŞđ┐ ĐâĐüĐéĐÇđżđ╣ĐüĐéđ▓đ░ -->
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
                      
                      <!-- đťđżđ┤đÁđ╗Đî ĐâĐüĐéĐÇđżđ╣ĐüĐéđ▓đ░ -->
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
                      
                      <!-- đ×đ┐đŞĐüđ░đŻđŞđÁ đ┐ĐÇđżđ▒đ╗đÁđ╝Đő -->
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
                      
                      <!-- đŚđ░đ╝đÁđŻđ░ đ┐ĐÇđŞđŻĐéđÁĐÇđ░ -->
                      <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">Potrzebuję drukarki zastępczej:</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${escapeHtml(replacementPrinter) || 'Nie'}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
          <!-- đĄĐâĐéđÁĐÇ -->
          <tr>
            <td style="padding: 20px 40px 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="border-top: 1px solid #bfa76a; padding-top: 20px;">
                    <p style="margin: 0; color: #7a6a50; font-size: 12px; text-align: center; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">
                      Wiadomość wysłana automatycznie z formularza Omobonus Serwis © 2025 Omobonus Serwis
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

    // đóđÁđ║ĐüĐéđżđ▓ĐâĐÄ đ▓đÁĐÇĐüđŞĐÄ đ┤đ╗ĐĆ Đüđżđ▓đ╝đÁĐüĐéđŞđ╝đżĐüĐéđŞ
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

    // Tworzenie transporter SMTP
    const transporter = createTransporter()
    
    if (!transporter) {
      console.log('ÔÜá´ŞĆ SMTP_PASS nie jest ustawiony. Dane formularza:', {
        name,
        phone,
        email,
        address,
        deviceType,
        deviceModel,
        problemDescription,
        replacementPrinter,
        attachments: attachmentFiles.map(file => ({ name: file.name, size: file.size })),
      })
      
      // W trybie development zwracamy sukces dla test├│w UI
      if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({
        success: true,
          message: 'Form data logged locally because SMTP_PASS is missing',
          testMode: true,
        })
      }
      
      return NextResponse.json(
        { error: 'SMTP nie jest skonfigurowany. Skontaktuj się z administratorem.' },
        { status: 500 },
      )
    }

    const fromEmail = process.env.SMTP_FROM || DEFAULT_FROM
    const toEmail = (process.env.SMTP_TO || DEFAULT_TO).split(',').map(value => value.trim())

    console.log('­čôĄ Wysy┼éanie e-maila przez SMTP Zenbox...')
    console.log('­čôž From:', fromEmail)
    console.log('­čôž To:', toEmail)
    console.log('📧 Subject:', `[${ticketNumber}] Nowe zgłoszenie serwisowe od ${escapeHtml(name) || 'anonim'}`)
    
    // Przygotowanie za┼é─ůcznik├│w dla nodemailer
    const nodemailerAttachments = attachments
      ? attachments.map(att => ({
          filename: att.filename,
          content: att.content,
        }))
      : []

    // Wysy┼éanie e-maila przez SMTP (pierwsze - do serwisu)
    const info = await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: `[${ticketNumber}] Nowe zgłoszenie serwisowe od ${escapeHtml(name) || 'anonim'}`,
      html: emailHtml,
      text: emailContent,
      attachments: nodemailerAttachments,
    })

    console.log('Ôťů E-mail do serwisu wys┼éany pomy┼Ťlnie!')
    console.log('­čôž Message ID:', info.messageId)
    console.log('­čôž Response:', info.response)

    // Wysy┼éanie drugiego e-maila do klienta (je┼Ťli email podany)
    if (email && email.trim()) {
      try {
        // HTML-Đłđ░đ▒đ╗đżđŻ đ┐đŞĐüĐîđ╝đ░ dla đ║đ╗đŞđÁđŻĐéđ░
        const clientEmailHtml = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Dziękujemy za zgłoszenie serwisowe ${ticketNumber}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; background-color: #f8f5f0;">
  <!-- đĺđŻđÁĐłđŻĐĆĐĆ Đéđ░đ▒đ╗đŞĐćđ░ Đü ĐäđżđŻđżđ╝ -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="#f8f5f0" style="background-color: #f8f5f0; padding: 40px 20px;">
    <tr>
      <td align="center" style="padding: 0;">
        <!-- đ×ĐüđŻđżđ▓đŻđżđ╣ đ║đżđŻĐéđÁđ╣đŻđÁĐÇ -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="640" bgcolor="#ffffff" style="max-width: 640px; width: 100%; background-color: #ffffff; border: 1px solid #bfa76a; border-radius: 6px; box-shadow: 0 0 10px rgba(0,0,0,0.15);">
          <!-- đŤđżđ│đżĐéđŞđ┐ đŞ đĚđ░đ│đżđ╗đżđ▓đżđ║ -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              ${logoBase64 ? `<img src="${logoBase64}" alt="Omobonus Serwis" width="120" style="display: block; margin: 0 auto 15px; border: 0; outline: none; text-decoration: none; max-width: 120px; height: auto;" />` : ''}
              <h1 style="margin: 0 0 20px 0; color: #bfa76a; font-size: 24px; font-weight: bold; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; text-align: center;">Dziękujemy za zgłoszenie serwisowe i za zaufanie!</h1>
            </td>
          </tr>
          
          <!-- đóđÁđ║ĐüĐé đ▒đ╗đ░đ│đżđ┤đ░ĐÇđŻđżĐüĐéđŞ -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <div style="font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; font-size: 15px; color: #3b2a1a; line-height: 1.2; max-width: 600px; margin: 0 auto;">
                <p style="margin: 0 0 18px 0; color: #3b2a1a; font-size: 18px; line-height: 1.2; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; font-weight: bold;">
                  Szanowny Kliencie,
                </p>
                <p style="margin: 0 0 5px 0; color: #3b2a1a; font-size: 15px; line-height: 1.2; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">
                  potwierdzamy otrzymanie Twojego zgłoszenia serwisowego w <strong>Omobonus Serwis</strong>.
                </p>
                <p style="margin: 0 0 5px 0; color: #3b2a1a; font-size: 15px; line-height: 1.3; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">
                  Zgłoszenie zostało zarejestrowane pod numerem: <span style="color: #bfa76a; font-size: 24px; font-weight: bold; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${ticketNumber}</span>.
                </p>
                <p style="margin: 0 0 0 0; color: #3b2a1a; font-size: 15px; line-height: 1.2; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; font-style: italic;">
                  Nasz zespół wkrótce się z Tobą skontaktuje, aby ustalić dalsze kroki.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- đóđ░đ▒đ╗đŞĐćđ░ đ┤đ░đŻđŻĐőĐů -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <p style="margin: 0 0 15px 0; color: #3a2e24; font-size: 16px; font-weight: bold; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">Dane przesłane w formularzu:</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <!-- đśđ╝ĐĆ đŞ Đäđ░đ╝đŞđ╗đŞĐĆ -->
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
                
                <!-- đóđÁđ╗đÁĐäđżđŻ -->
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
                
                <!-- Email -->
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
                
                <!-- đÉđ┤ĐÇđÁĐü -->
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
                
                <!-- đóđŞđ┐ ĐâĐüĐéĐÇđżđ╣ĐüĐéđ▓đ░ -->
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
                
                <!-- đťđżđ┤đÁđ╗Đî ĐâĐüĐéĐÇđżđ╣ĐüĐéđ▓đ░ -->
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
                
                <!-- đ×đ┐đŞĐüđ░đŻđŞđÁ đ┐ĐÇđżđ▒đ╗đÁđ╝Đő -->
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
                
                <!-- đŚđ░đ╝đÁđŻđ░ đ┐ĐÇđŞđŻĐéđÁĐÇđ░ -->
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e0d6b5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="180" style="color: #3a2e24; font-weight: bold; font-size: 14px; vertical-align: top; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; padding-left: 10px;">Drukarka zastępcza:</td>
                        <td style="color: #3a2e24; font-size: 14px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">${escapeHtml(replacementPrinter) || 'Nie'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- đčĐÇđŞđ╝đÁĐçđ░đŻđŞđÁ -->
                <tr>
                  <td style="padding: 12px 0 0;">
                    <p style="margin: 0; color: #7a6a50; font-size: 13px; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif; font-style: italic; text-align: left;">
                      Jeśli zauważyłeś błąd w danych, odpowiedz na ten e-mail – poprawimy zgłoszenie.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- đŚđ░đ║đ╗ĐÄĐçđŞĐéđÁđ╗ĐîđŻĐőđ╣ ĐéđÁđ║ĐüĐé -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #3a2e24; font-size: 16px; line-height: 1.6; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">
                Pozdrawiamy serdecznie,<br />
                <strong>Zespół Omobonus Serwis</strong>
              </p>
              <p style="margin: 0; color: #3a2e24; font-size: 14px; line-height: 1.6; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">
                📞 <a href="${CONTACT_INFO.phoneHref}" style="color: #3a2e24; text-decoration: none;">${CONTACT_INFO.phone}</a><br />
                🌐 <a href="https://serwis.omobonus.com.pl/" style="color: #3a2e24; text-decoration: none;">serwis.omobonus.com.pl</a>
              </p>
            </td>
          </tr>
          
          <!-- đĄĐâĐéđÁĐÇ -->
          <tr>
            <td style="padding: 20px 40px 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="border-top: 1px solid #bfa76a; padding-top: 20px;">
                    <p style="margin: 0; color: #7a6a50; font-size: 12px; text-align: center; line-height: 1.5; font-family: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;">
                      Wiadomość wysłana automatycznie z formularza Omobonus Serwis © 2025 Omobonus Serwis
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

        // đóđÁđ║ĐüĐéđżđ▓đ░ĐĆ đ▓đÁĐÇĐüđŞĐĆ đ┤đ╗ĐĆ đ║đ╗đŞđÁđŻĐéđ░
        const clientEmailContent = `
Dziękujemy za zgłoszenie serwisowe i za zaufanie!

Szanowny Kliencie,

potwierdzamy otrzymanie Twojego zgłoszenia serwisowego w Omobonus Serwis.

Zgłoszenie zostało zarejestrowane pod numerem ${ticketNumber}.

Nasz zespół wkrótce się z Tobą skontaktuje, aby ustalić dalsze kroki.

Prosimy o zachowanie numeru zgłoszenia do przyszłej korespondencji.

Dane przesłane w formularzu:

Imię i nazwisko: ${name}
Numer telefonu: ${formattedPhone}
Adres e-mail: ${email}
Adres: ${address}
Typ urządzenia: ${deviceType}
Model urządzenia: ${deviceModel}
Opis problemu: ${problemDescription}
Drukarka zastępcza: ${replacementPrinter}

Pozdrawiamy serdecznie,
Zespół Omobonus Serwis
📞 ${CONTACT_INFO.phone}
🌐 https://serwis.omobonus.com.pl/

Wiadomość wysłana automatycznie z formularza Omobonus Serwis © 2025 Omobonus Serwis
        `.trim()

        // đ×Đéđ┐ĐÇđ░đ▓đ║đ░ đ┐đŞĐüĐîđ╝đ░ đ║đ╗đŞđÁđŻĐéĐâ
        await transporter.sendMail({
          from: fromEmail,
          to: email.trim(),
          subject: `Dziękujemy za zgłoszenie serwisowe [${ticketNumber}]`,
          html: clientEmailHtml,
          text: clientEmailContent,
        })

        console.log('Ôťů E-mail do klienta wys┼éany pomy┼Ťlnie!')
        console.log('­čôž Klient email:', email.trim())
      } catch (clientError: any) {
        // đŁđÁ đ┐ĐÇđÁĐÇĐőđ▓đ░đÁđ╝ đżĐüđŻđżđ▓đŻĐâĐÄ đżĐéđ┐ĐÇđ░đ▓đ║Đâ đ┐ĐÇđŞ đżĐłđŞđ▒đ║đÁ đżĐéđ┐ĐÇđ░đ▓đ║đŞ đ║đ╗đŞđÁđŻĐéĐâ
        console.error('ÔÜá´ŞĆ B┼é─ůd podczas wysy┼éania e-maila do klienta (nie przerywamy g┼é├│wnej wysy┼éki):', clientError)
        console.error('ÔÜá´ŞĆ Szczeg├│┼éy b┼é─Ödu klienta:', {
          message: clientError?.message,
          code: clientError?.code,
        })
      }
    } else {
      console.log('Ôä╣´ŞĆ Email klienta nie zosta┼é podany, pomijamy wysy┼ék─Ö potwierdzenia')
    }
    
    // đŤđżđ│đŞĐÇĐâđÁđ╝ đ┐ĐÇđŞđ╝đÁĐÇ HTML-ĐäĐÇđ░đ│đ╝đÁđŻĐéđ░ Đü base64 đŞđĚđżđ▒ĐÇđ░đÂđÁđŻđŞĐĆđ╝đŞ
    console.log('\n­čôä đčĐÇđŞđ╝đÁĐÇ HTML-ĐäĐÇđ░đ│đ╝đÁđŻĐéđ░ Đü đ▓ĐüĐéĐÇđżđÁđŻđŻĐőđ╝đŞ đŞđĚđżđ▒ĐÇđ░đÂđÁđŻđŞĐĆđ╝đŞ:')
    console.log('---')
    console.log('đĄđżđŻ (đ┐đÁĐÇđ▓ĐőđÁ 150 ĐüđŞđ╝đ▓đżđ╗đżđ▓):')
    const backgroundSnippet = emailHtml.match(/background-image:\s*url\('([^']+)'\)/)?.[1] || ''
    console.log(`background-image: url('${backgroundSnippet.substring(0, 150)}...')`)
    console.log('\nđŤđżđ│đżĐéđŞđ┐ (đ┐đÁĐÇđ▓ĐőđÁ 150 ĐüđŞđ╝đ▓đżđ╗đżđ▓):')
    const logoSnippet = emailHtml.match(/<img[^>]+src="([^"]+)"[^>]*>/)?.[1] || ''
    console.log(`<img src="${logoSnippet.substring(0, 150)}..." />`)
    console.log('\nVML đ┤đ╗ĐĆ Outlook (đ┐đÁĐÇđ▓ĐőđÁ 150 ĐüđŞđ╝đ▓đżđ╗đżđ▓):')
    const vmlSnippet = emailHtml.match(/<v:fill[^>]+src="([^"]+)"[^>]*>/)?.[1] || ''
    console.log(`<v:fill type="frame" src="${vmlSnippet.substring(0, 150)}..." color="transparent"/>`)
    console.log('---\n')

    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId,
      response: info.response,
    }, { status: 200 })
  } catch (error: any) {
    console.error('ÔŁî B┼é─ůd podczas wysy┼éania e-maila przez SMTP Zenbox:', error)
    console.error('ÔŁî Szczeg├│┼éy b┼é─Ödu:', {
      message: error?.message,
      code: error?.code,
      command: error?.command,
      response: error?.response,
      responseCode: error?.responseCode,
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
    })
    
    // đöđżđ┐đżđ╗đŻđŞĐéđÁđ╗ĐîđŻđżđÁ đ╗đżđ│đŞĐÇđżđ▓đ░đŻđŞđÁ đ┤đ╗ĐĆ đ┤đŞđ░đ│đŻđżĐüĐéđŞđ║đŞ SMTP
    if (error?.response) {
      console.error('ÔŁî SMTP Response:', error.response)
    }
    if (error?.command) {
      console.error('ÔŁî SMTP Command:', error.command)
    }
    
    return NextResponse.json(
      { 
        error: 'Nie udało się wysłać wiadomości',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined,
      },
      { status: 500 },
    )
  }
}
