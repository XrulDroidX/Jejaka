import { collection, addDoc, onSnapshot, Timestamp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

function newsCollection(db, appId) {
  if (!db) return null;
  return collection(db, `artifacts/${appId}/public/data/news`);
}

function renderNewsItem(data) {
  const date = data.timestamp ? new Date(data.timestamp.seconds * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Tanggal Tidak Diketahui';
  const meta = {
    Berita: { icon: '&#x1F4F0;', color: 'text-indigo-600 dark:text-indigo-400' },
    Laporan:{ icon: '&#128196;', color: 'text-yellow-600 dark:text-yellow-400' }
  }[data.category] || { icon: '✨', color: 'text-gray-600 dark:text-gray-400' };

  return `
    <div class="news-card p-6 rounded-xl bg-white shadow-lg dark:bg-gray-800 card-hover border-t-4 border-indigo-500 dark:border-indigo-400" data-category="${data.category}">
      <div class="flex items-center mb-3">
        <span class="text-2xl mr-3">${meta.icon}</span>
        <span class="text-xs font-semibold ${meta.color} uppercase">${data.category}</span>
      </div>
      <h4 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">${data.title}</h4>
      <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">${data.description}</p>
      <div class="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <span>${date}</span>
        <a href="#" class="${meta.color} font-semibold hover:underline">Baca Selengkapnya →</a>
      </div>
    </div>`;
}

export function mountNewsFilter() {
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.getAttribute('data-filter')));
  });
  applyFilter('Berita');
}

export function applyFilter(filter) {
  const container = document.getElementById('news-container');
  const cards = container?.querySelectorAll('.news-card') || [];
  const tabs = document.querySelectorAll('.filter-tab');
  const emptyId = 'empty-message';
  document.getElementById(emptyId)?.remove();

  if (container) container.classList.add('is-filtering');

  tabs.forEach(t => {
    const active = t.getAttribute('data-filter') === filter;
    t.classList.toggle('tab-active', active);
    t.classList.toggle('border-gray-300', !active);
    t.classList.toggle('text-gray-600', !active);
  });

  let visible = 0;
  cards.forEach(card => {
    const show = card.getAttribute('data-category') === filter;
    card.style.display = show ? 'block' : 'none';
    if (show) visible++;
  });

  if (visible === 0 && container) {
    container.insertAdjacentHTML('beforeend', `<div id="${emptyId}" class="md:col-span-3 text-center p-12 text-gray-500 dark:text-gray-400">Tidak ada item ${filter.toLowerCase()} saat ini.</div>`);
  }

  setTimeout(() => container?.classList.remove('is-filtering'), 180);
}

export function listenNews({ db, appId }) {
  const container = document.getElementById('news-container');
  const loading = document.getElementById('loading-message');
  const ref = newsCollection(db, appId);

  if (!ref) {
    loading?.remove();
    container && (container.innerHTML = `<div class="md:col-span-3 text-center p-12 text-red-500 dark:text-red-400">Gagal memuat berita: konfigurasi database belum siap.</div>`);
    return;
  }

  onSnapshot(ref, (snapshot) => {
    const data = [];
    snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
    data.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));

    loading?.remove();
    if (container) {
      container.innerHTML = data.map(renderNewsItem).join('');
      applyFilter(document.querySelector('.filter-tab.tab-active')?.getAttribute('data-filter') || 'Berita');
    }
  }, (error) => {
    console.error('Error listening to news collection:', error);
    loading?.remove();
    container && (container.innerHTML = `<div class="md:col-span-3 text-center p-12 text-red-500 dark:text-red-400">Gagal memuat berita: ${error.message}</div>`);
  });
}

// Optional admin helper
export function bindAdminForm({ db, appId }) {
  const form = document.getElementById('addNewsForm');
  const msg = document.getElementById('adminMessage');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!db) return;

    const title = document.getElementById('newsTitle').value;
    const category = document.getElementById('newsCategory').value;
    const description = document.getElementById('newsDescription').value;

    msg?.classList.add('hidden');
    msg?.classList.remove('text-red-600', 'dark:text-red-400');
    msg?.classList.add('text-green-600', 'dark:text-green-400');
    if (msg) { msg.textContent = 'Menambahkan...'; msg.classList.remove('hidden'); }

    try {
      await addDoc(newsCollection(db, appId), { title, category, description, timestamp: Timestamp.now(), authorId: 'public' });
      if (msg) msg.textContent = 'Berita/Laporan berhasil ditambahkan!';
      form.reset();
      setTimeout(() => msg?.classList.add('hidden'), 3000);
    } catch (err) {
      console.error(err);
      msg?.classList.add('text-red-600', 'dark:text-red-400');
      if (msg) msg.textContent = 'Gagal menambahkan data: ' + err.message;
      setTimeout(() => msg?.classList.add('hidden'), 5000);
    }
  });
}
