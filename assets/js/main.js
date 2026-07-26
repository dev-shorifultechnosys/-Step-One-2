(() => {
  'use strict';

  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const track = document.querySelector('[data-slider]');
  const prev = document.querySelector('.review-arrow.prev');
  const next = document.querySelector('.review-arrow.next');

  const slide = (direction) => {
    if (!track) return;
    const card = track.querySelector('.review-card');
    if (!card) return;
    const gap = 20;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: 'smooth' });
  };

  prev?.addEventListener('click', () => slide(-1));
  next?.addEventListener('click', () => slide(1));

  const sections = [...document.querySelectorAll('main section[id]')];
  const menuLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
  const setActiveNav = () => {
    const y = window.scrollY + 120;
    let current = '#top';
    sections.forEach((section) => {
      if (section.offsetTop <= y) current = `#${section.id}`;
    });
    menuLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === current));
  };

  setActiveNav();
  window.addEventListener('scroll', setActiveNav, { passive: true });
})();
