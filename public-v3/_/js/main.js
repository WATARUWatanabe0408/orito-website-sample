// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Hamburger / mobile menu
(() => {
  const trigger = document.querySelector('.nav__hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!trigger || !menu) return;

  const close = () => {
    document.body.classList.remove('menu-open');
    trigger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  };
  const open = () => {
    document.body.classList.add('menu-open');
    trigger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
  };

  trigger.addEventListener('click', () => {
    if (document.body.classList.contains('menu-open')) close();
    else open();
  });

  // Close on link click
  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', close);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Reset on resize back to desktop
  const mq = window.matchMedia('(min-width: 961px)');
  mq.addEventListener('change', (e) => { if (e.matches) close(); });
})();
