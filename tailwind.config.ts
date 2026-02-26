import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-inter)'],
        display: ['var(--font-handlee)'],
      },
      colors: {
        notebook: {
          paper: '#FAFAF8',
          ink: '#0C0C0C',
          yellow: '#FFE68C',
          'yellow-dark': '#E8B800',
          blue: '#9DDCFF',
          'blue-dark': '#5AB5E8',
          pink: '#FFC9F0',
          'pink-dark': '#F384D4',
        },
      },
      boxShadow: {
        notebook: '4px 4px 0px 0px rgba(0,0,0,0.12)',
        'notebook-lg': '6px 6px 0px 0px rgba(0,0,0,0.14)',
        'notebook-hover': '8px 8px 0px 0px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out both',
        'slide-up': 'slideUp 0.6s ease-out both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
