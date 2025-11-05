
(async function(){
  const root=document.getElementById('testimonial-slider');
  if(!root) return;
  async function loadData(){
    try{
      const r=await fetch('data/testimoni.json',{cache:'no-store'});
      if(!r.ok) throw new Error();
      return await r.json();
    }catch(e){
      return [
        {"quote":"Kegiatan mereka beneran terasa di masyarakat.","author":"Nur","role":"Warga"},
        {"quote":"Kolaborasi yang rapi dan akuntabel.","author":"Arif","role":"Komunitas A"},
        {"quote":"Programnya relevan buat anak muda.","author":"Dina","role":"Relawan"}
      ];
    }
  }
  const data=await loadData();
  root.innerHTML = `<div class="slide active"></div>
    <button id="prevTesti" aria-label="Sebelumnya">‹</button>
    <button id="nextTesti" aria-label="Berikutnya">›</button>`;
  const slide=root.querySelector('.slide');
  function tpl(i){ const d=data[i]; return `<blockquote class="text-xl italic mb-4">“${d.quote}”</blockquote><p>— ${d.author}${d.role?', '+d.role:''}</p>`; }
  let i=0, t=null; slide.innerHTML = tpl(i);
  function show(n){ i=n; slide.innerHTML = tpl(i); }
  function play(){ stop(); t=setInterval(()=>{ show((i+1)%data.length); }, 5000); }
  function stop(){ if(t){ clearInterval(t); t=null; } }
  root.querySelector('#prevTesti').addEventListener('click', ()=>{ show((i-1+data.length)%data.length); play(); });
  root.querySelector('#nextTesti').addEventListener('click', ()=>{ show((i+1)%data.length); play(); });
  play();
})();
