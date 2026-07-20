const header = document.querySelector('#siteHeader');
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobileMenu');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mobileMenu.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});

mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  document.body.classList.remove('menu-open');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const visual = document.querySelector('.hero-visual');
if (visual && window.matchMedia('(pointer: fine)').matches) {
  visual.addEventListener('pointermove', event => {
    const box = visual.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    visual.style.setProperty('--rx', `${-y * 2.2}deg`);
    visual.style.setProperty('--ry', `${x * 2.2}deg`);
  });
  visual.addEventListener('pointerleave', () => {
    visual.style.setProperty('--rx', '0deg');
    visual.style.setProperty('--ry', '0deg');
  });
}
