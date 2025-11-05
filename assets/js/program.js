
(async function(){
  const list=document.getElementById('agenda-list');
  const search=document.getElementById('agenda-search');
  const scopeBtns=document.querySelectorAll('[data-scope]');
  if(!list) return;
  async function load(){
    try{
      const res=await fetch('data/agenda.json',{cache:'no-store'});
      if(!res.ok) throw new Error('HTTP '+res.status);
      return await res.json();
    }catch(e){
      return [];
    }
  }
  const AGENDA = await load();
  let scope='upcoming';
  function badge(s){
    if(s==='upcoming') return '<span class="brand-chip ml-2">Akan Datang</span>';
    if(s==='ongoing') return '<span class="brand-chip ml-2">Berlangsung</span>';
    return '<span class="brand-chip ml-2">Selesai</span>';
  }
  function render(){
    const q=(search?.value||'').toLowerCase();
    list.innerHTML='';
    AGENDA.filter(a=>scope==='all'||a.status===scope)
          .filter(a=>!q||a.title.toLowerCase().includes(q)||a.place.toLowerCase().includes(q))
          .forEach(a=>{
            const li=document.createElement('li');
            li.className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3";
            li.innerHTML=`<div><h3 class="text-lg font-semibold">${a.title}${badge(a.status)}</h3>
              <p class="text-sm text-slate-600">${a.place} • ${a.date.replace('T',' ')}</p>
              <p class="text-sm text-slate-600">${a.desc||''}</p></div>`;
            list.appendChild(li);
          });
  }
  scopeBtns.forEach(btn=>btn.addEventListener('click',()=>{scope=btn.getAttribute('data-scope');render();}));
  search?.addEventListener('input',render);
  render();
})();
