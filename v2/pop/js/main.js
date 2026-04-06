// =============================================
// ハンバーガーメニュー
// =============================================
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.header-nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-open');
    nav.classList.toggle('is-open');
    document.body.classList.toggle('noscroll');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-open');
      nav.classList.remove('is-open');
      document.body.classList.remove('noscroll');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// =============================================
// 強みカード スクロールアニメーション（Intersection Observer）
// =============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, i * 120);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.point-card').forEach(card => observer.observe(card));

// =============================================
// 横スクロールカルーセル（ドラッグ対応）
// =============================================
const wrap = document.getElementById('carousel-wrap');
const track = document.getElementById('carousel-track');

if (wrap && track) {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  wrap.addEventListener('mousedown', (e) => {
    isDown = true;
    wrap.style.cursor = 'grabbing';
    startX = e.pageX - wrap.offsetLeft;
    scrollLeft = wrap.scrollLeft;
  });

  wrap.addEventListener('mouseleave', () => {
    isDown = false;
    wrap.style.cursor = 'grab';
  });

  wrap.addEventListener('mouseup', () => {
    isDown = false;
    wrap.style.cursor = 'grab';
  });

  wrap.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrap.offsetLeft;
    const walk = (x - startX) * 1.2;
    wrap.scrollLeft = scrollLeft - walk;
  });

  // タッチ対応
  let touchStartX = 0;
  let touchScrollLeft = 0;

  wrap.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = wrap.scrollLeft;
  }, { passive: true });

  wrap.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX;
    const walk = (touchStartX - x) * 1.2;
    wrap.scrollLeft = touchScrollLeft + walk;
  }, { passive: true });
}
