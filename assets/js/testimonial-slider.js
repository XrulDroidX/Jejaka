
(async function(){
  const root=document.getElementById('testimonial-slider');
  if(!root) return;
  async function loadData(){
    try{
      const res=await fetch('data/testimoni.json',{cache:'no-store'});
      if(!res.ok) throw new Error('HTTP '+res.status);
      return await res.json();
    }catch(e){
      return [
        {"quote":"Kegiatan mereka beneran terasa di masyarakat.","author":"Nur","role":"Warga"},
        {"quote":"Kolaborasi yang rapi dan akuntabel.","author":"Arif","role":"Komunitas A"},
        {"quote":"Programnya relevan buat anak muda.","author":"Dina","role":"Relawan"}
      ];
    }
  }
  const data=await loadData();
  // Build slides
  root.innerHTML = `<div class="slide active"></div><button id="prevTesti" aria-label="Sebelumnya">‹</button><button id="nextTesti" aria-label="Berikutnya">›</button>`;
  const first = root.querySelector('.slide');
  function slideHTML(item){
    return `<blockquote class="text-xl italic mb-4">“${item.quote}”</blockquote>
            <p class="">— ${item.author}${item.role?`, ${item.role}`:''}</p>`;
  }
  first.innerHTML = slideHTML(data[0]||{});
  let i=0, t=null;
  function show(n){
    i=n;
    const active = root.querySelector('.slide.active');
    if(active){
      active.classList.remove('active');
      // replace active node to keep single slide in DOM
      const next = document.createElement('div');
      next.className='slide active';
      next.innerHTML = slideHTML(data[i]);
      root.insertBefore(next, root.querySelector('#prevTesti'));
      active.remove();
    }
  }
  function play(){ stop(); t=setInterval(()=>{ show((i+1)%data.length); },5000); }
  function stop(){ if(t){ clearInterval(t); t=null; } }
  root.querySelector('#prevTesti').addEventListener('click', ()=>{ show((i-1+data.length)%data.length); play(); });
  root.querySelector('#nextTesti').addEventListener('click', ()=>{ show((i+1)%data.length); play(); });
  play();
})();
