/* Transcendent Enterprise — Refined NYC · interactions */
(function () {
  'use strict';

  /* --- sticky nav state --- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- mobile slide-in menu --- */
  var navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open');
      navToggle.textContent = open ? '✕' : '☰';
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close when a menu item (link or CTA) is chosen
    document.querySelectorAll('.nav-links a, .nav-links .btn').forEach(function (el) {
      el.addEventListener('click', function () {
        nav.classList.remove('nav-open');
        navToggle.textContent = '☰';
      });
    });
  }

  /* --- reveal on scroll --- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el, i) {
      // slight stagger for siblings sharing a parent
      el.style.transitionDelay = (Math.min(i % 6, 5) * 0.06) + 's';
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* --- seamless marquee: duplicate the track content once --- */
  var track = document.getElementById('mtrack');
  if (track) { track.innerHTML += track.innerHTML; }

  /* --- launch modal --- */
  var modal = document.getElementById('modal');
  function openModal() { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeModal() { modal.classList.remove('open'); document.body.style.overflow = ''; }
  document.querySelectorAll('[data-open-modal]').forEach(function (b) { b.addEventListener('click', openModal); });
  document.querySelectorAll('[data-close-modal]').forEach(function (b) { b.addEventListener('click', closeModal); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  var form = document.getElementById('launch-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.innerHTML = '<h3 style="font-weight:900;font-size:24px">Your project has launched. 🚀</h3>' +
        '<p style="color:var(--dim);margin-top:12px">Thanks for reaching out — our team will follow up shortly. ' +
        'Need a faster response? Call <a href="tel:+18002691173" style="color:var(--blue-lt)">800 269 1173</a>.</p>';
    });
  }

  /* --- YouTube lightbox: load iframe only on click (facade), clear on close --- */
  var yt = document.getElementById('yt-modal');
  var ytSlot = document.getElementById('yt-slot');
  function openYt(id) {
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1';
    f.title = 'Transcendent Enterprise video';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    f.allowFullscreen = true;
    ytSlot.textContent = '';
    ytSlot.appendChild(f);
    yt.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeYt() {
    yt.classList.remove('open');
    ytSlot.textContent = '';           // removes iframe -> stops playback
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-yt]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();              // links keep their href as a no-JS fallback
      openYt(el.getAttribute('data-yt'));
    });
  });
  document.querySelectorAll('[data-yt-close]').forEach(function (b) { b.addEventListener('click', closeYt); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && yt.classList.contains('open')) closeYt(); });

  /* --- pause offscreen videos to spare CPU/bandwidth --- */
  var vids = document.querySelectorAll('video.bgv');
  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else { v.pause(); }
      });
    }, { threshold: 0.01, rootMargin: '400px 0px' });
    vids.forEach(function (v) { vio.observe(v); });
  }
})();
