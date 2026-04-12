/* ── Character Animation ─────────────────────────── */
function initCharAnimation() {
  var root = document.querySelector('[data-char-animate]');
  if (!root) return;

  var INITIAL_DELAY = 200;
  var CHAR_DELAY    = 30;

  root.querySelectorAll('[data-line]').forEach(function(lineEl, lineIndex) {
    var text  = lineEl.getAttribute('data-line');
    var chars = Array.from(text);
    lineEl.innerHTML = '';

    chars.forEach(function(char, charIndex) {
      var span = document.createElement('span');
      span.style.cssText = [
        'display:inline-block',
        'opacity:0',
        'transform:translateX(-18px)',
        'transition:opacity 500ms ease,transform 500ms ease',
        'white-space:pre',
      ].join(';');
      span.textContent = char === ' ' ? '\u00A0' : char;

      var delay = INITIAL_DELAY
        + lineIndex * chars.length * CHAR_DELAY
        + charIndex * CHAR_DELAY;

      setTimeout(function() {
        span.style.opacity   = '1';
        span.style.transform = 'translateX(0)';
      }, delay);

      lineEl.appendChild(span);
    });
  });
}

/* ── Timed FadeIn (data-fade-delay) ──────────────── */
function initFadeIns() {
  document.querySelectorAll('[data-fade-delay]').forEach(function(el) {
    var delay = parseInt(el.getAttribute('data-fade-delay'), 10);
    el.style.opacity    = '0';
    el.style.transition = 'opacity 1s ease';
    setTimeout(function() { el.style.opacity = '1'; }, delay);
  });
}

/* ── IntersectionObserver Reveal ─────────────────── */
function initReveal() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });
}

/* ── Hamburger Menu ──────────────────────────────── */
function initHamburger() {
  var btn = document.querySelector('[data-hamburger]');
  var nav = document.querySelector('.mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function() {
    var open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
  });
}

/* ── Init ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  initCharAnimation();
  initFadeIns();
  initReveal();
  initHamburger();
});
