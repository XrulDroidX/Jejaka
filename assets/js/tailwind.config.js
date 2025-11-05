// tailwind.config.mjs
import { defineConfig } from 'tailwindcss';

export default defineConfig({
  theme: {
    extend: {
      // Definisikan warna pastel Anda di sini
      colors: {
        'brand-putih': '#FFFFFF',
        'brand-bg': '#f9f8fd', // Latar belakang yang sangat sedikit off-white, lebih lembut dari putih murni
        'brand-pastel-blue': '#e0f2fe', // Biru langit pastel
        'brand-pastel-purple': '#f3e8ff', // Ungu lavender pastel
        'brand-teks': '#1f2937', // Teks utama (abu-abu gelap, bukan hitam pekat)
        'brand-teks-subtle': '#6b7280', // Teks sekunder (abu-abu lebih muda)
      },
      // Definisikan gradasi lembut Anda
      backgroundImage: {
        'gradasi-lembut': 'linear-gradient(to right, #e0f2fe, #f3e8ff)', // Gradasi dari biru ke ungu pastel
        'gradasi-header': 'linear-gradient(90deg, #f3e8ff 0%, #e0f2fe 100%)',
      },
      // Definisikan bayangan (shadow) yang soft dan elegan
      boxShadow: {
        'soft-sm': '0 2px 4px 0 rgba(0, 0, 0, 0.03)',
        'soft-md': '0 4px 8px 0 rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 20px 0 rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
});
