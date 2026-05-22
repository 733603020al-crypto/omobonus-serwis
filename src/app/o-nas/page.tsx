import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { About } from '@/components/sections/about'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'O nas | Omobonus Wrocław',
  description: 'Poznaj Omobonus — uczciwy serwis komputerów, laptopów i drukarek we Wrocławiu.',
}

export default function ONasPage() {
  return (
    <>
      <Header />
      <About />
      <Footer />
    </>
  )
}
