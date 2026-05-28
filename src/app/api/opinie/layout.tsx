import type { ReactNode } from 'react'

export default function ApiOpiniéLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}
