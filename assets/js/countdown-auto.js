
(async function(){
  const el=document.getElementById('countdown');
  const title=document.getElementById('agenda-title');
  const meta=document.getElementById('agenda-meta');
  if(!el || !window.__startCountdown) return;
  try{
    const res=await fetch('data/agenda.json',{cache:'no-store'});
    const list=await res.json();
    const now=Date.now();
    const upcoming=list.filter(x=>x.status==='upcoming');
    if(!upcoming.length){ el.textContent='Tidak ada agenda mendatang'; return; }
    const nearest=upcoming.map(x=>({e:x,t:new Date(x.date).getTime()}))
                          .filter(x=>!isNaN(x.t) && x.t>now)
                          .sort((a,b)=>a.t-b.t)[0]?.e || upcoming[0];
    if(title) title.textContent = nearest.title;
    if(meta)  meta.textContent  = `${nearest.place} — ${nearest.date.replace('T',' ')}`;
    el.dataset.target = nearest.date;
    window.__startCountdown(nearest.date);
  }catch(e){
    el.textContent='Gagal memuat agenda.';
  }
})();
