
(function(){
  const els=document.querySelectorAll('.reveal,[data-reveal]');
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('reveal-in'); obs.unobserve(e.target);} });
  },{threshold:0.15});
  els.forEach(el=>{ el.classList.add('will-reveal'); obs.observe(el); });
})();
