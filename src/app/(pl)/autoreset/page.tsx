// Gotowa strona AutoReset skopiowana bez zmian z Workspace (service-maket/autoreset.html): pliki w public/service-maket.
// Strona działa w ramce, aby jej adresy względne (form.html, obrazy) działały tak samo jak w oryginale. Poza menu, zablokowana dla wyszukiwarek.
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reset licznika absorbera',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-static'

export default function AutoResetPage() {
  return <iframe src="/service-maket/autoreset.html" title="Reset licznika absorbera" style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', border: 0 }} />
}
