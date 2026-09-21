import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/[^\d+]/g, '')
  if (cleaned.startsWith('+48')) {
    const digits = cleaned.substring(3).replace(/\D/g, '')
    if (digits.length === 9) {
      return `+48 ${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6)}`
    }
  }
  return phone
}

const escapeHtml = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export async function POST(request: NextRequest) {
  try {
    const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS']
    const missing = required.filter(k => !process.env[k]?.trim())
    if (missing.length > 0) {
      return NextResponse.json({ success: false, error: 'SMTP nie skonfigurowany' }, { status: 500 })
    }

    const formData = await request.formData()

    // Honeypot anti-spam: pole niewidoczne dla ludzi, wypełniane tylko przez boty
    const honeypot = (formData.get('company') as string) ?? ''
    if (honeypot.trim() !== '') {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const phone = (formData.get('phone') as string) ?? ''
    const country = (formData.get('country') as string) || 'Nie podano'

    if (phone.length > 50 || country.length > 100) {
      return NextResponse.json({ success: false, error: 'Nieprawidłowe dane' }, { status: 400 })
    }

    if (!phone || phone.replace(/\D/g, '').length < 7) {
      return NextResponse.json({ success: false, error: 'Nieprawidłowy numer telefonu' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: parseInt(process.env.SMTP_PORT || '587', 10) === 465,
      requireTLS: parseInt(process.env.SMTP_PORT || '587', 10) !== 465,
      auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
    })

    const fromEmail = process.env.SMTP_FROM || 'serwis@omobonus.com.pl'
    const toEmail = (process.env.SMTP_TO || 'serwis@omobonus.com.pl').split(',').map(v => v.trim())
    const formattedPhone = formatPhone(phone)

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: 'Prośba o telefon',
      text: `Nowa prośba o telefon ze strony Kontakt.\nTelefon: ${formattedPhone}\nKraj: ${country}`,
      html: `<p>Nowa prośba o telefon ze strony Kontakt.</p><p><strong>Telefon:</strong> ${escapeHtml(formattedPhone)}<br><strong>Kraj:</strong> ${escapeHtml(country)}</p>`,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('callback-request error:', error?.message)
    return NextResponse.json({ success: false, error: 'Błąd wysyłania' }, { status: 500 })
  }
}
