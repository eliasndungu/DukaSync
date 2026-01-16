import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#e8edff',
          200: '#d6dcff',
          300: '#b5beff',
          400: '#8d94ff',
          500: '#6c6af7',
          600: '#524edf',
          700: '#3f3ab3',
          800: '#33308f',
          900: '#2d2b72',
        },
        charcoal: '#1f2937',
      },
      boxShadow: {
        card: '0 20px 50px -25px rgba(15, 23, 42, 0.2)',
      },
    },
  },
  plugins: [],
}

export default config
