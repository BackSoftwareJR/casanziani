/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDFBF8',
          100: '#FAF7F0',
          200: '#F5EFE3',
          300: '#EDE4D1',
          400: '#E0D4BC',
          500: '#D4C4A8',
          600: '#C4B095',
          700: '#A8957A',
          800: '#8A7A62',
          900: '#6B5D4A',
        },
        secondary: {
          50: '#FEFCF9',
          100: '#FCF9F3',
          200: '#F8F3EA',
          300: '#F2EAD9',
          400: '#E8DCC4',
          500: '#D4C4A8',
        },
        accent: {
          light: '#FDFBF8',
          DEFAULT: '#D4C4A8',
          dark: '#C4B095',
        },
        warm: {
          50: '#FFFBF5',
          100: '#FFF8ED',
          200: '#FEF0D9',
          300: '#FCE8C5',
          400: '#F9DCB0',
          500: '#F5CF9B',
        },
        brand: {
          gold: '#C4B095',
          'gold-light': '#E0D4BC',
          'gold-dark': '#A8957A',
        },
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-merriweather)', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.7' }],
        'lg': ['1.125rem', { lineHeight: '1.7' }],
        'xl': ['1.25rem', { lineHeight: '1.7' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
