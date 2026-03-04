// ─── Navigation ───
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// No scrolled class needed for invisible nav, but keep for sub-pages
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 80);
});

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ─── Custom Magnetic Cursor ───
const cursor = document.getElementById('custom-cursor');
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

if (!isTouchDevice && cursor) {
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' });
  });

  // Expand cursor on work cards
  document.querySelectorAll('.work__card').forEach(card => {
    card.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
    card.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
  });

  // Subtle grow on interactive elements
  document.querySelectorAll('a, button, .qual__card, .live-indicator, .rental-card, .blog-card, .feature-card, .trigger, .hero__trap-word').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (!cursor.classList.contains('expanded')) {
        gsap.to(cursor, { scale: 2, duration: 0.2 });
      }
    });
    el.addEventListener('mouseleave', () => {
      if (!cursor.classList.contains('expanded')) {
        gsap.to(cursor, { scale: 1, duration: 0.2 });
      }
    });
  });
}

// ─── Live Overlay ───
function toggleLiveOverlay() {
  const overlay = document.getElementById('liveOverlay');
  if (!overlay) return;
  if (overlay.classList.contains('open')) {
    gsap.to(overlay, {
      opacity: 0, duration: 0.3, onComplete: () => {
        overlay.classList.remove('open');
        gsap.set(overlay, { opacity: 1 });
      }
    });
  } else {
    overlay.classList.add('open');
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4 });
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('liveOverlay');
    if (overlay && overlay.classList.contains('open')) toggleLiveOverlay();
  }
});

// ─── GSAP Animations ───
gsap.registerPlugin(ScrollTrigger);

// Hero entrance
const heroTl = gsap.timeline({ delay: 0.3 });
gsap.set(['.hero__overtitle', '.hero__title', '.hero__tagline', '.hero__cta-group'], { y: 30 });
heroTl
  .to('.hero__overtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
  .to('.hero__title', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
  .to('.hero__tagline', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
  .to('.hero__cta-group', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
  .to('.hero__scroll', { opacity: 0.6, duration: 1 }, '-=0.3');

// Scroll reveals
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.to(el, {
    opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
  });
});

// Work cards scale into viewport
gsap.utils.toArray('.work__card').forEach(card => {
  gsap.fromTo(card, { scale: 0.9 }, {
    scale: 1, ease: 'none',
    scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 30%', scrub: 1 },
  });
});

// Mobile: auto-reveal work card overlays
if (isTouchDevice) {
  gsap.utils.toArray('.work__card-overlay').forEach(overlay => {
    gsap.to(overlay, {
      opacity: 1, duration: 0.5,
      scrollTrigger: { trigger: overlay.parentElement, start: 'top 60%', end: 'top 30%', scrub: 1 },
    });
  });
}

// Rental cards stagger
ScrollTrigger.batch('.rental-card', {
  onEnter: batch => {
    gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' });
  },
  start: 'top 85%',
  once: true,
});

// Client logos stagger
gsap.utils.toArray('.clients__logo').forEach((logo, i) => {
  gsap.fromTo(logo, { opacity: 0, y: 15 }, {
    opacity: 1, y: 0, duration: 0.5, delay: i * 0.08,
    scrollTrigger: { trigger: '.clients__grid', start: 'top 85%', once: true },
  });
});

// Parallax on hero content (replaced by bottom-fold on homepage, kept for sub-pages)
if (!document.getElementById('heroTrap')) {
  gsap.to('.hero__content', {
    y: 100, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
  });
}

// Founder stats
gsap.utils.toArray('.founder__stat-number').forEach(stat => {
  gsap.from(stat, {
    opacity: 0, y: 20, duration: 0.6,
    scrollTrigger: { trigger: stat, start: 'top 85%', once: true },
  });
});

// Feature cards stagger
ScrollTrigger.batch('.feature-card', {
  onEnter: batch => {
    gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' });
  },
  start: 'top 85%',
  once: true,
});

// Stats bar counter animation
gsap.utils.toArray('.stats-bar__number').forEach(stat => {
  gsap.from(stat, {
    opacity: 0, y: 20, duration: 0.6,
    scrollTrigger: { trigger: stat, start: 'top 85%', once: true },
  });
});

// Blog cards stagger
ScrollTrigger.batch('.blog-card', {
  onEnter: batch => {
    gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' });
  },
  start: 'top 85%',
  once: true,
});

// ═══════════════════════════════════════════
// BOTTOM-FOLD TRAP — hero words expand on scroll
// ═══════════════════════════════════════════
if (document.getElementById('heroTrap')) {
  const heroContent = document.getElementById('heroContent');
  const trapWords = gsap.utils.toArray('.hero__trap-word');
  const heroScroll = document.querySelector('.hero__scroll');

  // Hero content fades out as user scrolls
  gsap.to(heroContent, {
    opacity: 0, y: -60, ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '80% top',
      scrub: 1.5,
    }
  });

  // Scroll indicator fades out
  if (heroScroll) {
    gsap.to(heroScroll, {
      opacity: 0, ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: '10% top',
        end: '30% top',
        scrub: 1,
      }
    });
  }

  // Trap words expand with power2.out velocity feel
  trapWords.forEach(word => {
    gsap.to(word, {
      fontSize: '15vw',
      y: '-40vh',
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '80% top',
        scrub: 1.5,
      }
    });
  });

  // Nav fades out during trap morph scroll, fades back in after hero
  const navEl = document.getElementById('nav');
  if (navEl) {
    gsap.to(navEl, {
      opacity: 0, ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '80% top',
        scrub: 1,
      }
    });
    gsap.to(navEl, {
      opacity: 1, ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: '80% top',
        end: '100% top',
        scrub: 1,
      }
    });
  }

  // Wire trap words to open drawers
  trapWords.forEach(word => {
    word.addEventListener('click', () => {
      const drawerId = word.dataset.drawer;
      if (drawerId && typeof openDrawer === 'function') {
        openDrawer(drawerId);
      }
    });
  });
}

// ═══════════════════════════════════════════
// STORY BLOCKS — stagger reveal
// ═══════════════════════════════════════════
gsap.utils.toArray('.story__block').forEach((block, i) => {
  gsap.to(block, {
    opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: block, start: 'top 85%', once: true },
  });
});

// ═══════════════════════════════════════════
// SECTION VIDEO BACKGROUNDS — fade in on scroll
// ═══════════════════════════════════════════
gsap.utils.toArray('.section--video-bg').forEach(section => {
  const video = section.querySelector('.section__video-bg video');
  if (!video) return;
  // Read target opacity from CSS, then start hidden
  const targetOpacity = parseFloat(getComputedStyle(video).opacity) || 0.15;
  gsap.set(video, { opacity: 0 });
  gsap.to(video, {
    opacity: targetOpacity,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      once: true,
    }
  });
});

// Story video bg fade
const storyVideoBg = document.querySelector('.story__video-bg video');
if (storyVideoBg) {
  gsap.set(storyVideoBg, { opacity: 0 });
  gsap.to(storyVideoBg, {
    opacity: 0.15,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.story--magazine',
      start: 'top 80%',
      once: true,
    }
  });
}

// ═══════════════════════════════════════════
// DRAWER ENGINE — open/close with GSAP + pushState
// ═══════════════════════════════════════════
function openDrawer(id) {
  const drawer = document.getElementById('drawer-' + id);
  if (!drawer) return;

  // Close any open drawer first
  document.querySelectorAll('.drawer').forEach(d => {
    d.style.display = 'none';
    gsap.set(d, { clearProps: 'all' });
  });

  drawer.style.display = 'block';
  document.body.style.overflow = 'hidden';

  gsap.fromTo(drawer,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
  );

  // pushState for SEO
  history.pushState({ drawer: id }, '', '#drawer-' + id);
}

function closeDrawer(id, skipHistory) {
  const drawer = document.getElementById('drawer-' + id);
  if (!drawer) return;

  gsap.to(drawer, {
    opacity: 0, y: 40, duration: 0.35, ease: 'power2.in',
    onComplete: () => {
      drawer.style.display = 'none';
      gsap.set(drawer, { clearProps: 'all' });
      document.body.style.overflow = '';
    }
  });

  if (!skipHistory && window.location.hash.includes('drawer-')) {
    history.pushState(null, '', window.location.pathname);
  }
}

// Wire all [data-drawer] elements (trigger words in story + trap words)
document.querySelectorAll('[data-drawer]').forEach(el => {
  // Skip trap words (already wired above)
  if (el.classList.contains('hero__trap-word')) return;
  el.addEventListener('click', () => {
    const drawerId = el.dataset.drawer;
    if (drawerId) openDrawer(drawerId);
  });
});

// ═══════════════════════════════════════════
// COMMAND CENTER — open/close with depth effect
// ═══════════════════════════════════════════
function openCommandCenter() {
  const cmdCenter = document.getElementById('cmdCenter');
  const pageWrap = document.getElementById('pageWrap');
  if (!cmdCenter) return;

  // Close any open drawer first
  document.querySelectorAll('.drawer').forEach(d => {
    d.style.display = 'none';
    gsap.set(d, { clearProps: 'all' });
  });
  document.body.style.overflow = 'hidden';

  cmdCenter.style.display = 'block';
  cmdCenter.classList.add('open');

  gsap.fromTo(cmdCenter,
    { y: '100%' },
    { y: '0%', duration: 0.6, ease: 'power2.out' }
  );

  // Depth effect on page
  if (pageWrap) {
    pageWrap.classList.add('page-wrap--dimmed');
    gsap.to(pageWrap, {
      scale: 0.95, duration: 0.6, ease: 'power2.out'
    });
  }
}

function closeCommandCenter() {
  const cmdCenter = document.getElementById('cmdCenter');
  const pageWrap = document.getElementById('pageWrap');
  if (!cmdCenter) return;

  gsap.to(cmdCenter, {
    y: '100%', duration: 0.5, ease: 'power2.in',
    onComplete: () => {
      cmdCenter.classList.remove('open');
      cmdCenter.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  if (pageWrap) {
    pageWrap.classList.remove('page-wrap--dimmed');
    gsap.to(pageWrap, {
      scale: 1, duration: 0.5, ease: 'power2.in'
    });
  }
}

// Open drawer from URL hash on load
(function() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#drawer-')) {
    const id = hash.replace('#drawer-', '');
    setTimeout(() => openDrawer(id), 500);
  }
})();
