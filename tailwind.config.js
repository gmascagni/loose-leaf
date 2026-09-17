/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tea: {
          950: '#060E09',
          900: '#0B1710',
          800: '#14291D',
          700: '#1E3D2B',
          600: '#2A523A',
          500: '#386A4C',
          400: '#4B8862',
          300: '#67A87F',
          200: '#8ECAA4',
          100: '#C1E6D0',
          leaf: '#437D57',
        },
        espresso: {
          950: '#0C0908',
          900: '#120E0C',
          800: '#1C1613',
          700: '#2A211D',
        },
        amber: {
          gold: '#D48C46',
          bright: '#E29D56',
          muted: '#A36D48',
        },
        cream: {
          light: '#F8F5F1',
          soft: '#F4EFEA',
          dark: '#E2DDD7',
        },
        slate: {
          950: '#0F1216',
          900: '#161A20',
          800: '#1E2228',
          700: '#2C3036',
        },
        sage: {
          900: '#26382E',
          700: '#435C4C',
          500: '#5E7E6A',
          300: '#8FA899',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
