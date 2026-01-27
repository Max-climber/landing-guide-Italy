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
<<<<<<< HEAD
        // Цвета из нового дизайна
        'text-main': '#2f3035',
        'text-light': '#666666',
        'bg-warm': '#F9F8F6',
        'bg-card': '#FFFFFF',
        'border-soft': '#E0E0E0',
        'btn-graphite': '#2f3035',
        'bg-base': '#f1eceb',
        // Старые цвета для совместимости
        color1: '#cfd1a8',
        color2: '#5c5969',
        'color2-light': '#9d9ab8',
        color3: '#2f3035',
=======
        // Новые цвета из дизайна
        color1: '#cfd1a8', // Светлый оливково-зеленый - для кнопки Contact Us на темном фоне
        color2: '#5c5969', // Темный фиолетово-серый - для темного фона вставок
        'color2-light': '#9d9ab8', // Светлый фиолетовый - для текста на темном фоне
        color3: '#3e394d', // Темный фиолетово-серый - для кнопок на светлом фоне
>>>>>>> 033120d62b2d23478db4a5acc4631cdf9622de9f
      },
      fontFamily: {
        elegant: ['Cormorant Garamond', 'serif'],
        modern: ['Montserrat', 'sans-serif'],
        oswald: ['Montserrat', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
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

