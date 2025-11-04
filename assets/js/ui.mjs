export function initThemeToggles() {
  const toggles = [
    { btn: document.getElementById('themeToggleDesktop'), sun: document.getElementById('sunIconDesktop'), moon: document.getElementById('moonIconDesktop') },
    { btn: document.getElementById('themeToggleMobile'),  sun: document.getElementById('sunIconMobile'),   moon: document.getElementById('moonIconMobile') }
  ];

  const setTheme = (isDark) => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggles.forEach(t => {
      if (!t.sun || !t.moon) return;
      t.sun.classList.toggle('hidden', isDark);
      t.moon.classList.toggle('hidden', !isDark);
    });
  };

  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved ? saved === 'dark' : prefersDark);

  toggles.forEach(t => t.btn?.addEventListener('click', () => setTheme(!document.documentElement.classList.contains('dark'))));
}

export function initHamburger() {
  const btn = document.getElementById('hamburgerButton');
  const menu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  const closeIcon = document.getElementById('closeIcon');
  btn?.addEventListener('click', () => {
    const nowHidden = menu.classList.toggle('hidden');
    menuIcon?.classList.toggle('hidden', !nowHidden);
    closeIcon?.classList.toggle('hidden', nowHidden);
    btn.setAttribute('aria-expanded', String(!nowHidden));
  });
}

export function initModal() {
  const modal = document.getElementById('donationModal');
  const openers = document.querySelectorAll('[data-action="open-donation"]');
  const closer = document.querySelector('[data-action="close-donation"]');

  let escHandler;

  function open() {
    modal?.classList.remove('hidden');
    requestAnimationFrame(() => modal?.classList.add('modal-open'));
    document.body.style.overflow = 'hidden';
    const m = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    if (m && !m.classList.contains('hidden')) {
      m.classList.add('hidden');
      menuIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
    }
    escHandler = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', escHandler);
  }
  function close() {
    if (!modal) return;
    modal.classList.remove('modal-open');
    setTimeout(() => { modal.classList.add('hidden'); document.body.style.overflow = ''; }, 200);
    if (escHandler) window.removeEventListener('keydown', escHandler);
  }

  openers.forEach(b => b.addEventListener('click', open));
  closer?.addEventListener('click', close);
  modal?.addEventListener('click', (e) => { if (e.target === modal) close(); });
}

export function initClipboard() {
  document.querySelectorAll('[data-action="copy"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy') || '';
      const targetSel = btn.getAttribute('data-copy-target');
      navigator.clipboard.writeText(text).then(() => {
        if (targetSel) {
          const node = document.querySelector(targetSel);
          node?.classList.remove('hidden');
          setTimeout(() => node?.classList.add('hidden'), 2000);
        }
      });
    });
  });
}

export function initContactForm() {
  const form = document.querySelector('#page-kontak form');
  const success = document.getElementById('contactSuccess');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    success?.classList.add('hidden');
    setTimeout(() => { success?.classList.remove('hidden'); form.reset(); }, 500);
  });
}
