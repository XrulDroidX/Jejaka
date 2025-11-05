// tailwind.config.js
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./pages/**/*.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // INI YANG KITA UBAH:
        // 'blue' diganti 'violet' untuk nuansa ungu pastel yang modern
        primary: colors.violet,
        
        // 'green' diganti 'teal' untuk aksen yang lebih lembut
        accent: colors.teal,
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      // INI YANG KITA TAMBAHKAN:
      // Menambahkan "gradasi lembut" yang Anda minta
      backgroundImage: {
        'gradasi-lembut': 'linear-gradient(120deg, #c4b5fd 0%, #99f6e4 100%)', // Gradasi dari Violet-300 ke Teal-200
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
