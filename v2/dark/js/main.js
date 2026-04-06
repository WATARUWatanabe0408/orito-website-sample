// =============================================
// GSAP + ScrollTrigger 登録
// =============================================
gsap.registerPlugin(ScrollTrigger);

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
// HERO アニメーション（ページロード時）
// =============================================
const heroTl = gsap.timeline({ delay: 0.2 });

heroTl
  .from('.hero-badge', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
  .from('.hero-title', { opacity: 0, y: 30, duration: 0.7, ease: 'power2.out' }, '-=0.3')
  .from('.hero-desc', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
  .from('.hero-text .btn-primary', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.3')
  .from('#hero-illust', { opacity: 0, x: 40, duration: 0.9, ease: 'power2.out' }, '-=0.7');

// =============================================
// 数字カウントアップ（スクロールイン時）
// =============================================
const counts = document.querySelectorAll('.count');

counts.forEach(el => {
  const target = parseInt(el.dataset.target, 10);
  ScrollTrigger.create({
    trigger: el,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to({ val: 0 }, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: function () {
          el.textContent = Math.round(this.targets()[0].val);
        }
      });
    }
  });
});

// =============================================
// サービスカード スクロールアニメーション
// =============================================
gsap.from('.service-card', {
  scrollTrigger: {
    trigger: '.services-grid',
    start: 'top 75%',
  },
  opacity: 0,
  y: 40,
  duration: 0.7,
  stagger: 0.15,
  ease: 'power2.out'
});

// =============================================
// CTA パーティクル（Canvas）
// =============================================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1
    };
  }

  function initParticles() {
    particles = Array.from({ length: 80 }, createParticle);
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    animFrame = requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  initParticles();
  drawParticles();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
}
