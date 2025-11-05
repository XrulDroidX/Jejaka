
(function(){
  const el=document.getElementById('countdown');
  if(!el) return;
  function startCountdown(targetIso){
    const target=new Date(targetIso).getTime();
    function update(){
      const now=Date.now(), diff=target-now;
      if(diff<=0){ el.innerHTML='<span class="text-green-500 font-semibold">Sedang Berlangsung</span>'; return; }
      const d=Math.floor(diff/86400000);
      const h=Math.floor((diff%86400000)/3600000);
      const m=Math.floor((diff%3600000)/60000);
      const s=Math.floor((diff%60000)/1000);
      el.textContent = `${d} hari ${h} jam ${m} menit ${s} detik`;
    }
    update(); setInterval(update,1000);
  }
  if(el.dataset.target){ startCountdown(el.dataset.target); }
  window.__startCountdown = startCountdown;
})();
