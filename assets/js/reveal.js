
(function(){
  var els = document.querySelectorAll('.reveal, [data-reveal]');
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) {
        e.target.classList.add('reveal-in');
        obs.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});
  els.forEach(function(el){
    el.classList.add('will-reveal');
    obs.observe(el);
  });
})();
