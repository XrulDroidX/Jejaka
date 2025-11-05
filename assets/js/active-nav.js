
(function(){
  var path = location.pathname.replace(/\/index\.html$/, '/').toLowerCase();
  document.querySelectorAll('nav a[href]').forEach(function(a){
    var href = a.getAttribute('href'); if(!href) return;
    var normalized = href.toLowerCase();
    if (normalized === '#' || normalized.startsWith('http')) return;
    if (normalized.endsWith('/index.html')) normalized = normalized.replace(/\/index\.html$/, '/');
    if (path.endsWith(normalized) || (normalized !== '/' && path.indexOf(normalized) !== -1)) {
      a.setAttribute('aria-current', 'page');
      a.classList.add('active','nav-link');
    }
  });
})();
