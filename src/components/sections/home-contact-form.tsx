'use client'

import dynamic from 'next/dynamic'
import { uk } from '@/lib/i18n/uk'
import type { ContactT, Locale } from './contact'

const Contact = dynamic(() => import('./contact').then(m => m.Contact))

const CONTACT_T_OVERRIDES: Partial<Record<Locale, ContactT>> = {
  uk: uk.homeContactForm,
}

interface HomeContactFormProps {
  locale?: Locale
  bare?: boolean
}

export function HomeContactForm({ locale = 'pl', bare = false }: HomeContactFormProps = {}) {
  return <Contact t={CONTACT_T_OVERRIDES[locale]} bare={bare} locale={locale} />
}
