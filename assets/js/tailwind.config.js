// assets/js/tailwind.config.js
tailwind.config = {
  darkMode: 'class', // Mengaktifkan dark mode manual (via class)
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'primary': {
          '50': '#F0F9FF', '100': '#E0F2FE', '200': '#BAE6FD', '300': '#7DD3FC',
          '400': '#38BDF8', '500': '#0EA5E9', '600': '#0284C7', '700': '#0369A1',
          '800': '#075985', '900': '#0C4A6E',
        },
        'accent': {
          '50': '#FFF1F2', '100': '#FFE4E6', '200': '#FECDD3', '300': '#FDA4AF',
          '400': '#FB7185', '500': '#F43F5E', '600': '#E11D48',
        },
      },
      animation: {
        // Animasi untuk hamburger menu - DIBUAT LEBIH SOFT
        'slide-in': 'slideIn 0.4s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards',
        'slide-out': 'slideOut 0.4s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards',
        'fade-in': 'fadeIn 0.4s ease-in-out forwards',
        'fade-out': 'fadeOut 0.4s ease-in-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeOut: { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
      },
    },
  },
  plugins: [],
};
