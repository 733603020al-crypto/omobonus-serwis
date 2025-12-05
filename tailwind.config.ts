import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(45 25% 15%)',      // #1e1b16 - ciemny brąz
        foreground: 'hsl(45 25% 95%)',      // Jasny tekst
        card: 'hsl(45 25% 20%)',            // Tło kart
        cardForeground: 'hsl(45 25% 95%)',  // Tekst na kartach
        border: 'hsl(45 20% 35%)',          // Obramowania
        primary: 'hsl(45 50% 70%)',         // #bfa76a - złoty
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-lora)', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config



