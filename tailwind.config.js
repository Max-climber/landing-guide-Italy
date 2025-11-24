/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          navy: '#0A1929',
          darkBlue: '#1E3A5F',
          gold: '#D4AF37',
          lightGold: '#F4E4BC',
          white: '#FFFFFF',
          gray: '#F5F5F5',
          darkGray: '#2C3E50',
        },
        // Новые цвета из дизайна
        color1: '#cfd1a8', // Светлый оливково-зеленый - для кнопки Contact Us на темном фоне
        color2: '#5c5969', // Темный фиолетово-серый - для темного фона вставок
        color3: '#3e394d', // Темный фиолетово-серый - для кнопок на светлом фоне
      },
      fontFamily: {
        elegant: ['Cormorant', 'serif'],
        modern: ['Stack Sans Headline', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        sans: ['Stack Sans Headline', 'sans-serif'],
        serif: ['Cormorant', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.8s ease-out',
        'parallax': 'parallax 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        parallax: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

