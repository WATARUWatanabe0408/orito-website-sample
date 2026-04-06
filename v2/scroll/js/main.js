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
// スクロール進行ライン
// =============================================
const scrollLine = document.getElementById('scroll-line');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollLine) scrollLine.style.height = pct + '%';
});

// =============================================
// ヒーロー タイトル 文字ごとアニメーション
// =============================================
function animateHeroTitle() {
  const titleEl = document.getElementById('hero-title');
  if (!titleEl) return;

  const text = titleEl.innerHTML;
  // <br>タグを保持しつつ文字を分割
  const parts = text.split(/(<br\s*\/?>)/gi);
  let html = '';
  let charIndex = 0;

  parts.forEach(part => {
    if (/^<br/i.test(part)) {
      html += part;
    } else {
      [...part].forEach(char => {
        const delay = charIndex * 0.05;
        html += `<span class="char" style="transition-delay:${delay}s">${char}</span>`;
        charIndex++;
      });
    }
  });

  titleEl.innerHTML = html;

  // 少し遅らせてからアニメーション開始
  setTimeout(() => {
    titleEl.querySelectorAll('.char').forEach(el => el.classList.add('is-visible'));
  }, 300);
}

animateHeroTitle();

// =============================================
// ヒーロー イラスト フェードアップ
// =============================================
setTimeout(() => {
  const heroIllust = document.getElementById('hero-illust');
  if (heroIllust) heroIllust.classList.add('is-visible');
}, 600);

// =============================================
// Intersection Observer 汎用
// =============================================
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.15 });

// 交互レイアウト（左右スライド）
document.querySelectorAll('.slide-left, .slide-right').forEach(el => io.observe(el));

// SVG コネクター
document.querySelectorAll('.connector-svg').forEach(el => io.observe(el));

// =============================================
// タイムライン：縦線を伸ばしてカードを表示
// =============================================
const timelineEl = document.getElementById('timeline');

if (timelineEl) {
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timelineEl.classList.add('is-active');

        // 縦線の伸長に合わせてカードを順番に表示
        const contents = timelineEl.querySelectorAll('.timeline-content');
        contents.forEach((content, i) => {
          setTimeout(() => {
            content.classList.add('is-visible');
          }, 300 + i * 250);
        });

        timelineObserver.disconnect();
      }
    });
  }, { threshold: 0.1 });

  timelineObserver.observe(timelineEl);
}
