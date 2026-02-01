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
        background: 'hsl(45 25% 15%)',      // ciemny brąz
        foreground: 'hsl(45 25% 95%)',      // jasny tekst
        card: 'hsl(45 25% 20%)',            // tło kart
        cardForeground: 'hsl(45 25% 95%)',  // tekst na kartach
        border: 'hsl(45 20% 35%)',          // obramowania
        primary: 'hsl(45 50% 70%)',         // złoty
      },

      fontFamily: {
        /* GŁÓWNE FONTY PROJEKTU */
        serif: ['var(--font-cormorant)', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],

        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },

  plugins: [],
}

export default config
