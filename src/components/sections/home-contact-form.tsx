'use client'

import dynamic from 'next/dynamic'

const Contact = dynamic(() => import('./contact').then(m => m.Contact))

const ukT = {
  formTitle: 'Форма заявки',
  nameLabel: "Ім'я та прізвище",
  namePlaceholder: "Ім'я та прізвище",
  phoneLabel: 'Номер телефону',
  emailLabel: 'E-mail',
  addressLabel: 'Адреса (якщо потрібен виїзд)',
  addressPlaceholder: 'вул. Прикладна 1, Вроцлав',
  problemLabel: 'Опис проблеми',
  problemPlaceholder: 'Опишіть проблему з вашим пристроєм...',
  attachLabel: 'Прикріпити файли',
  attachAdd: 'Додати',
  attachHint: 'Прикріплені файли допоможуть нам швидше і точніше визначити проблему та підготувати вартість ремонту.',
  agreementConfirm: 'Підтверджую, що ознайомився/лась з',
  privacyLink: 'Політикою конфіденційності',
  privacyHref: '/uk/polityka-prywatnosci',
  termsLink: 'Умовами та положеннями',
  termsHref: '/uk/regulamin',
  agreementEnd: 'і приймаю їх умови.',
  agreementConnector: 'та',
  submitButton: 'Надіслати заявку',
  submitting: 'Надсилання...',
  phoneError: 'Номер телефону занадто короткий',
  agreementError: 'Необхідно прийняти умови',
  fileTypeError: 'Непідтримуваний тип файлу.',
  fileSizeError: (name: string, max: number) => `Файл ${name} занадто великий (макс. ${max} МБ).`,
  successTitle: 'Дякуємо!',
  successText: 'Заявку надіслано.',
  successModal: {
    title: 'Дякуємо за заявку!',
    line1: 'Ваше повідомлення успішно надіслано.',
    line2: "Ми зв'яжемося з вами найближчим часом для підтвердження деталей.",
    line3: 'Ваша заявка вже в надійних руках.',
  },
}

interface HomeContactFormProps {
  locale?: 'pl' | 'uk'
  bare?: boolean
}

export function HomeContactForm({ locale = 'pl', bare = false }: HomeContactFormProps = {}) {
  if (locale === 'uk') {
    return <Contact t={ukT} bare={bare} />
  }

  return <Contact bare={bare} />
}
