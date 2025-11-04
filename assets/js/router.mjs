const pageIds = [
  'page-home', 'page-tentang-kami', 'page-kegiatan', 'page-berita',
  'page-galeri', 'page-organisasi', 'page-kontak', 'page-kebijakan'
];

function showPage(pageId) {
  document.querySelectorAll('.page-content').forEach(p => p.classList.remove('page-active'));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('page-active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    document.getElementById('page-home')?.classList.add('page-active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // umumkan rute berubah
  window.dispatchEvent(new CustomEvent('route:change', { detail: { pageId } }));
}

function handleNavigation(hash) {
  let pageId = hash.substring(1);
  if (!pageId || pageId === 'hero' || pageId === 'home') pageId = 'home';
  const finalPageId = pageIds.includes(`page-${pageId}`) ? `page-${pageId}` : pageId;
  if (pageIds.includes(finalPageId)) {
    showPage(finalPageId);
    // tutup menu mobile jika terbuka
    const m = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    if (m && !m.classList.contains('hidden')) {
      m.classList.add('hidden');
      menuIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
    }
  } else {
    const target = document.getElementById(pageId);
    target?.scrollIntoView({ behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('route:change', { detail: { pageId } }));
  }
}

export function mountRouter() {
  document.querySelectorAll('a.spa-link').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        window.history.pushState(null, '', href);
        handleNavigation(href);
      }
    });
  });
  window.addEventListener('popstate', () => handleNavigation(window.location.hash || '#home'));
  window.addEventListener('load', () => handleNavigation(window.location.hash || '#home'));
}
