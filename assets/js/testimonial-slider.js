
(function(){
  const root=document.getElementById('testimonial-slider');
  if(!root) return;
  const slides=[...root.querySelectorAll('.slide')];
  if(!slides.length) return;
  let i=0, t=null;
  const prev=root.querySelector('#prevTesti');
  const next=root.querySelector('#nextTesti');
  function show(n){
    slides.forEach((s,idx)=>{
      s.classList.toggle('active', idx===n);
    });
  }
  function play(){
    stop();
    t=setInterval(()=>{ i=(i+1)%slides.length; show(i); }, 5000);
  }
  function stop(){ if(t){ clearInterval(t); t=null; } }
  prev && prev.addEventListener('click', ()=>{ i=(i-1+slides.length)%slides.length; show(i); play(); });
  next && next.addEventListener('click', ()=>{ i=(i+1)%slides.length; show(i); play(); });
  show(i); play();
})();
