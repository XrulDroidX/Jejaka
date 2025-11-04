// assets/js/imageLoader.mjs
// Gunakan <img data-src="nama-file.jpg"> untuk semua gambar konten.
// Modul ini akan mencoba memuat dari ./assets/<nama-file>. Jika gagal, fallback ke ./assets/favicon.ico

export function resolveImagePath(filename) {
  if (!filename) return './assets/favicon.ico';
  const path = `./assets/${filename}`;
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(path);
    img.onerror = () => resolve('./assets/favicon.ico');
    img.src = path;
  });
}

export async function applyImageFallbacks() {
  const images = document.querySelectorAll('img[data-src]');
  for (const img of images) {
    const src = img.getAttribute('data-src');
    const resolved = await resolveImagePath(src);
    img.setAttribute('src', resolved);
  }
}
