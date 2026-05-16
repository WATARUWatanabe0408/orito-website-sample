// Footer copyright year (JST)
document.getElementById('footer-year').textContent =
  new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })).getFullYear();

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

// Count-up animation
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

function startCountUp(el) {
  const target = el.dataset.since
    ? new Date().getFullYear() - +el.dataset.since
    : +el.dataset.target;
  const duration = 1400;
  const large = target >= 1000;
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const val = Math.round(easeOut(t) * target);
    el.textContent = large ? val.toLocaleString() : val;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const countUpObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = parseFloat(entry.target.closest('[class*="delay"]')?.style.animationDelay || 0) * 1000;
      setTimeout(() => startCountUp(entry.target), delay);
      countUpObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.countup').forEach((el) => countUpObserver.observe(el));

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

// Contact form (Formspree)
const form = document.querySelector('form.form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const success = document.getElementById('form-success');
    const error = document.getElementById('form-error');
    success.classList.remove('is-shown');
    error.classList.remove('is-shown');

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.reset();
        success.classList.add('is-shown');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        error.classList.add('is-shown');
      }
    } catch (err) {
      error.classList.add('is-shown');
    }
  });
}
