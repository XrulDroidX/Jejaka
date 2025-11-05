// assets/js/app.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Inisialisasi Ikon Lucide
    // Ini akan memindai semua tag <i> dan menggantinya dengan SVG ikon
    try {
        lucide.createIcons();
    } catch (e) {
        console.error("Gagal memuat Lucide icons:", e);
    }
    
    // Tidak ada kode lain yang diperlukan,
    // Pico.css menangani dark mode & menu mobile dropdown.
});
