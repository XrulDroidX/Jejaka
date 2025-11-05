// assets/js/app.js
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INISIALISASI ANIMASI SCROLL (AOS)
    try {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
        });
    } catch (e) { console.error("AOS Init Error: ", e); }

    // 2. INISIALISASI IKON LUCIDE
    try {
        lucide.createIcons();
    } catch (e) { console.error("Lucide Init Error: ", e); }

    // 3. LOGIKA DARK MODE TOGGLE
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    const htmlEl = document.documentElement;

    const setTheme = (theme) => {
        if (theme === 'dark') {
            htmlEl.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlEl.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        try { lucide.createIcons(); } catch (e) {}
    };

    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = htmlEl.classList.contains('dark') ? 'dark' : 'light';
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    });

    // 4. LOGIKA HAMBURGER MENU
    const menuButton = document.getElementById('menu-open-btn');
    const menuCloseButton = document.getElementById('menu-close-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    const openMenu = () => {
        if (mobileMenu && menuOverlay) {
            mobileMenu.classList.remove('hidden', 'animate-slide-out');
            mobileMenu.classList.add('animate-slide-in');
            menuOverlay.classList.remove('hidden', 'animate-fade-out');
            menuOverlay.classList.add('animate-fade-in');
        }
    };

    const closeMenu = () => {
        if (mobileMenu && menuOverlay) {
            mobileMenu.classList.add('animate-slide-out');
            menuOverlay.classList.add('animate-fade-out');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                menuOverlay.classList.add('hidden');
            }, 400); 
        }
    };

    if (menuButton) menuButton.addEventListener('click', openMenu);
    if (menuCloseButton) menuCloseButton.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

    
    // 5. LOGIKA DROPDOWN DESKTOP (BARU)
    const dropdownParent = document.getElementById('dropdown-parent');
    const dropdownToggle = document.getElementById('dropdown-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah "click outside" listener
            dropdownMenu.classList.toggle('hidden');
        });
    }

    // Menutup dropdown jika klik di luar
    document.addEventListener('click', (e) => {
        if (dropdownMenu && !dropdownMenu.classList.contains('hidden')) {
            if (dropdownParent && !dropdownParent.contains(e.target)) {
                dropdownMenu.classList.add('hidden');
            }
        }
    });

    // Menutup dropdown jika link di dalamnya diklik (untuk anchor link)
    if (dropdownMenu) {
        dropdownMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                dropdownMenu.classList.add('hidden');
            });
        });
    }

});
        
