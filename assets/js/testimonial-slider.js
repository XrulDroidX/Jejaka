
(function(){
  const slides=document.querySelectorAll('#testimonial-slider .slide');
  let i=0;
  function show(n){
    slides.forEach((s,idx)=>{
      s.classList.remove('active','fade-in');
      if(idx===n){s.classList.add('active','fade-in');}
    });
  }
  document.getElementById('nextTesti')?.addEventListener('click',()=>{i=(i+1)%slides.length;show(i);});
  document.getElementById('prevTesti')?.addEventListener('click',()=>{i=(i-1+slides.length)%slides.length;show(i);});
  show(i);
  setInterval(()=>{i=(i+1)%slides.length;show(i);},5000);
})();
