# Ver.2 3バリアント トップページ 実装計画（Phase 1）

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 株式会社オリトのコーポレートサイト Ver.2 として、デザイン方向性の異なる3バリアント（dark / pop / scroll）のトップページ（index.html）を `v2/` 以下に作成し、ユーザーが確認できる状態にする。

**Architecture:** 各バリアントは `v2/dark/` `v2/pop/` `v2/scroll/` に完全独立した静的サイトとして配置。共通コードなし。dark のみ GSAP（CDN）を使用し、pop・scroll は Vanilla JS + CSS アニメーションのみ。

**Tech Stack:** HTML5, CSS3（カスタムプロパティ）, Vanilla JavaScript, GSAP 3.12.5（dark のみ）, Google Fonts

---

## Task 1: ディレクトリ構造のセットアップ

**Files:**
- Create: `v2/dark/css/style.css`（空ファイル）
- Create: `v2/dark/js/main.js`（空ファイル）
- Create: `v2/pop/css/style.css`（空ファイル）
- Create: `v2/pop/js/main.js`（空ファイル）
- Create: `v2/scroll/css/style.css`（空ファイル）
- Create: `v2/scroll/js/main.js`（空ファイル）

- [ ] **Step 1: ディレクトリと空ファイルを作成**

```bash
cd /Users/watanabewataru/code/株式会社オリト
mkdir -p v2/dark/css v2/dark/js
mkdir -p v2/pop/css v2/pop/js
mkdir -p v2/scroll/css v2/scroll/js
touch v2/dark/css/style.css v2/dark/js/main.js
touch v2/pop/css/style.css v2/pop/js/main.js
touch v2/scroll/css/style.css v2/scroll/js/main.js
```

- [ ] **Step 2: コミット**

```bash
git add v2/
git commit -m "feat: v2 ディレクトリ構造を作成"
```

---

## Task 2: 🌑 dark バリアント — CSS

**Files:**
- Modify: `v2/dark/css/style.css`

- [ ] **Step 1: `v2/dark/css/style.css` を作成**

```css
@charset "utf-8";

@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&family=Noto+Sans+JP:wght@400;500;700&display=swap');

/* ================================================
   CSS カスタムプロパティ
================================================ */
:root {
  --bg: #0f172a;
  --bg-card: #1e293b;
  --bg-section: #0d1526;
  --primary: #6366f1;
  --primary-glow: rgba(99, 102, 241, 0.3);
  --secondary: #10b981;
  --text: #f1f5f9;
  --muted: rgba(241, 245, 249, 0.5);
  --border: rgba(99, 102, 241, 0.2);
  --font-heading: 'Space Grotesk', 'Noto Sans JP', sans-serif;
  --font-body: 'Noto Sans JP', sans-serif;
  --max-width: 1100px;
}

/* ================================================
   リセット・ベース
================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

body {
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.8;
  color: var(--text);
  background: var(--bg);
  overflow-x: hidden;
}

h1, h2, h3 { font-family: var(--font-heading); line-height: 1.3; }

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

body.noscroll { overflow: hidden; }

/* ================================================
   ヘッダー
================================================ */
.header {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  z-index: 100;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}

.header-logo {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 900;
  color: var(--primary);
  letter-spacing: 0.1em;
}

.header-nav ul {
  display: flex;
  gap: 32px;
  align-items: center;
}

.header-nav a {
  font-size: 0.9rem;
  color: var(--muted);
  transition: color 0.2s;
}

.header-nav a:hover { color: var(--text); }

.nav-cta {
  background: var(--primary);
  color: var(--text) !important;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 700;
  transition: opacity 0.2s !important;
}

.nav-cta:hover { opacity: 0.85; }

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 26px;
  height: 2px;
  background: var(--text);
  transition: transform 0.3s, opacity 0.3s;
}

.hamburger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.is-open span:nth-child(2) { opacity: 0; }
.hamburger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ================================================
   ボタン
================================================ */
.btn-primary {
  display: inline-block;
  background: linear-gradient(135deg, var(--primary), #8b5cf6);
  color: var(--text);
  padding: 14px 32px;
  border-radius: 50px;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  border: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 32px var(--primary-glow);
}

.btn-outline {
  display: inline-block;
  background: transparent;
  color: var(--primary);
  padding: 12px 28px;
  border-radius: 50px;
  border: 2px solid var(--primary);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.95rem;
  transition: background 0.2s, color 0.2s;
}

.btn-outline:hover {
  background: var(--primary);
  color: var(--text);
}

/* ================================================
   HERO
================================================ */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.hero-bg-glow--1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%);
  top: -100px; right: -100px;
}

.hero-bg-glow--2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%);
  bottom: -50px; left: -50px;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  padding-top: 68px;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-block;
  background: rgba(99,102,241,0.15);
  border: 1px solid var(--primary);
  color: var(--primary);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  padding: 4px 16px;
  border-radius: 50px;
  margin-bottom: 24px;
}

.hero-title {
  font-size: 3.2rem;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 20px;
  color: var(--text);
}

.hero-desc {
  font-size: 0.95rem;
  color: var(--muted);
  margin-bottom: 36px;
  line-height: 1.9;
}

.hero-illust-placeholder {
  width: 100%;
  aspect-ratio: 1;
  max-width: 480px;
  background: linear-gradient(135deg, var(--bg-card), #1a2744);
  border-radius: 32px;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
}

.illust-glow {
  position: absolute;
  width: 200px; height: 200px;
  background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
  border-radius: 50%;
}

.illust-emoji {
  position: absolute;
  font-size: 4rem;
}

.illust-emoji { top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 6rem; }
.illust-emoji--2 { top: 20%; left: 20%; font-size: 2.5rem; opacity: 0.6; }
.illust-emoji--3 { bottom: 20%; right: 20%; font-size: 2rem; opacity: 0.5; }

/* ================================================
   数字セクション
================================================ */
.numbers-section {
  padding: 100px 0;
  background: var(--bg-section);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.section-title {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--text);
  text-align: center;
  margin-bottom: 8px;
}

.section-sub {
  text-align: center;
  color: var(--muted);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 56px;
}

.numbers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  text-align: center;
}

.number-item { padding: 40px 20px; }

.number-value {
  font-family: var(--font-heading);
  font-size: 4rem;
  font-weight: 900;
  color: var(--secondary);
  line-height: 1;
  margin-bottom: 12px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.number-unit { font-size: 2rem; }

.number-label {
  font-size: 0.9rem;
  color: var(--muted);
}

/* ================================================
   事業内容
================================================ */
.services-section { padding: 100px 0; }

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

.service-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 36px 28px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, transform 0.3s;
  cursor: default;
}

.service-card:hover {
  border-color: var(--primary);
  transform: translateY(-4px);
}

.service-card:hover .card-glow {
  opacity: 1;
}

.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, var(--primary-glow) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.service-card-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.service-card h3 {
  font-size: 1rem;
  color: var(--text);
  margin-bottom: 12px;
}

.service-card p {
  font-size: 0.875rem;
  color: var(--muted);
  line-height: 1.8;
}

.services-more { text-align: center; }

/* ================================================
   CTA セクション
================================================ */
.cta-section {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

#particles-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.cta-inner {
  position: relative;
  z-index: 1;
  text-align: center;
}

.cta-inner h2 {
  font-size: 2.2rem;
  font-weight: 900;
  margin-bottom: 16px;
}

.cta-inner p {
  color: var(--muted);
  margin-bottom: 36px;
  font-size: 0.95rem;
}

/* ================================================
   フッター
================================================ */
.footer {
  background: var(--bg-section);
  border-top: 1px solid var(--border);
  padding: 40px 0 0;
}

.footer-inner {
  padding-bottom: 32px;
}

.footer-name {
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--text);
  margin-bottom: 6px;
}

.footer-info {
  font-size: 0.85rem;
  color: var(--muted);
}

.footer-copy {
  border-top: 1px solid var(--border);
  text-align: center;
  padding: 16px 24px;
  font-size: 0.75rem;
  color: var(--muted);
}

/* ================================================
   レスポンシブ
================================================ */
@media (max-width: 767px) {
  .hamburger { display: flex; }

  .header-nav {
    display: none;
    position: fixed;
    top: 68px; left: 0;
    width: 100%;
    height: calc(100vh - 68px);
    background: var(--bg);
    padding: 32px 24px;
  }

  .header-nav.is-open { display: block; }

  .header-nav ul {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }

  .header-nav a { font-size: 1.1rem; }

  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: 100px;
    padding-bottom: 40px;
  }

  .hero-title { font-size: 2rem; }
  .hero-illust { order: -1; }

  .numbers-grid,
  .services-grid { grid-template-columns: 1fr; }

  .number-value { font-size: 3rem; }
  .cta-inner h2 { font-size: 1.6rem; }
}
```

- [ ] **Step 2: コミット**

```bash
git add v2/dark/css/style.css
git commit -m "feat: dark バリアント CSS を作成"
```

---

## Task 3: 🌑 dark バリアント — HTML + JS

**Files:**
- Create: `v2/dark/index.html`
- Modify: `v2/dark/js/main.js`

- [ ] **Step 1: `v2/dark/index.html` を作成**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>株式会社オリト｜高圧ホース・油圧機器の卸販売</title>
  <meta name="description" content="株式会社オリトは高圧ホース・口金・カプラ・油圧機器の卸販売および高圧ホース出張製作を行っています。">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="header">
  <div class="container header-inner">
    <a href="index.html" class="header-logo">ORITO</a>
    <button class="hamburger" aria-label="メニューを開く" aria-expanded="false" aria-controls="header-nav">
      <span></span><span></span><span></span>
    </button>
    <nav class="header-nav" id="header-nav">
      <ul>
        <li><a href="company.html">会社概要</a></li>
        <li><a href="service.html">事業内容</a></li>
        <li><a href="contact.html" class="nav-cta">お問い合わせ</a></li>
      </ul>
    </nav>
  </div>
</header>

<main>

<!-- ① HERO -->
<section class="hero">
  <div class="hero-bg-glow hero-bg-glow--1"></div>
  <div class="hero-bg-glow hero-bg-glow--2"></div>
  <div class="container hero-inner">
    <div class="hero-text" id="hero-text">
      <p class="hero-badge">HIGH PRESSURE HOSE SPECIALIST</p>
      <h1 class="hero-title">現場を支える<br>確かな製品を。</h1>
      <p class="hero-desc">高圧ホース・口金・カプラ・継手類・油圧機器の卸販売から<br>出張製作まで、オリトにお任せください。</p>
      <a href="contact.html" class="btn-primary">お問い合わせはこちら →</a>
    </div>
    <div class="hero-illust" id="hero-illust">
      <div class="hero-illust-placeholder">
        <div class="illust-glow"></div>
        <div class="illust-emoji">⚙️</div>
        <div class="illust-emoji illust-emoji--2">🔩</div>
        <div class="illust-emoji illust-emoji--3">🏭</div>
      </div>
    </div>
  </div>
</section>

<!-- ② 数字で見るオリト -->
<section class="numbers-section">
  <div class="container">
    <h2 class="section-title">数字で見るオリト</h2>
    <p class="section-sub">Numbers</p>
    <div class="numbers-grid">
      <div class="number-item">
        <div class="number-value">
          <span class="count" data-target="500">0</span><span class="number-unit">+</span>
        </div>
        <div class="number-label">取扱製品数</div>
      </div>
      <div class="number-item">
        <div class="number-value">
          <span class="count" data-target="30">0</span><span class="number-unit">年</span>
        </div>
        <div class="number-label">の実績</div>
      </div>
      <div class="number-item">
        <div class="number-value">
          <span class="count" data-target="100">0</span><span class="number-unit">%</span>
        </div>
        <div class="number-label">出張製作対応率</div>
      </div>
    </div>
  </div>
</section>

<!-- ③ 事業内容 -->
<section class="services-section">
  <div class="container">
    <h2 class="section-title">事業内容</h2>
    <p class="section-sub">Services</p>
    <div class="services-grid">
      <div class="service-card">
        <div class="service-card-icon">🔩</div>
        <h3>高圧ホース・各種部材の卸販売</h3>
        <p>口金・カプラ・スイベル・継手類など幅広い製品を取り扱っています。</p>
        <div class="card-glow"></div>
      </div>
      <div class="service-card">
        <div class="service-card-icon">⚙️</div>
        <h3>アッセンブリーマシーン販売</h3>
        <p>高圧ホースアッセンブリーマシーンの販売を行っています。</p>
        <div class="card-glow"></div>
      </div>
      <div class="service-card">
        <div class="service-card-icon">🚗</div>
        <h3>高圧ホース出張製作</h3>
        <p>現地でのホース製作に対応。現場のニーズに合わせて柔軟に対応します。</p>
        <div class="card-glow"></div>
      </div>
    </div>
    <div class="services-more">
      <a href="service.html" class="btn-outline">事業内容をすべて見る →</a>
    </div>
  </div>
</section>

<!-- ④ CTA -->
<section class="cta-section">
  <canvas id="particles-canvas"></canvas>
  <div class="container cta-inner">
    <h2>まずはお気軽にご相談ください</h2>
    <p>高圧ホース・油圧機器に関するご質問・お見積もりはお気軽にどうぞ。</p>
    <a href="contact.html" class="btn-primary">お問い合わせはこちら →</a>
  </div>
</section>

</main>

<footer class="footer">
  <div class="container footer-inner">
    <p class="footer-name">株式会社オリト</p>
    <p class="footer-info">〒000-0000 住所をここに入力 ｜ TEL: 000-0000-0000</p>
  </div>
  <div class="footer-copy">
    <p>Copyright &copy; 株式会社オリト All Rights Reserved.</p>
  </div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: `v2/dark/js/main.js` を作成**

```javascript
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
```

- [ ] **Step 3: ブラウザで確認**

```bash
cd /Users/watanabewataru/code/株式会社オリト
python3 -m http.server 8080
```

`http://localhost:8080/v2/dark/` を開いて確認:
- ダークな背景に白テキストが表示される
- ページロード時にヒーローテキストとイラストがアニメーションする
- スクロールで数字が 0 からカウントアップする
- サービスカードが下からフェードアップする
- CTA セクションにパーティクルが漂う
- ハンバーガーメニューが開閉する（767px以下）

- [ ] **Step 4: コミット**

```bash
git add v2/dark/index.html v2/dark/js/main.js
git commit -m "feat: dark バリアント トップページを実装"
```

---

## Task 4: 🌈 pop バリアント — CSS

**Files:**
- Modify: `v2/pop/css/style.css`

- [ ] **Step 1: `v2/pop/css/style.css` を作成**

```css
@charset "utf-8";

@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700;800;900&family=Noto+Sans+JP:wght@400;500;700&display=swap');

:root {
  --bg: #fef9c3;
  --bg-hero: #fef9c3;
  --bg-section: #ffffff;
  --primary: #f59e0b;
  --primary-dark: #d97706;
  --secondary: #10b981;
  --accent2: #6366f1;
  --accent3: #ef4444;
  --text: #92400e;
  --text-dark: #1c1917;
  --muted: #a16207;
  --card-bg: #ffffff;
  --font-heading: 'M PLUS Rounded 1c', 'Noto Sans JP', sans-serif;
  --font-body: 'Noto Sans JP', sans-serif;
  --max-width: 1100px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

body {
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.8;
  color: var(--text);
  background: var(--bg);
  overflow-x: hidden;
}

h1, h2, h3 { font-family: var(--font-heading); line-height: 1.3; }

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

body.noscroll { overflow: hidden; }

/* ================================================
   ヘッダー
================================================ */
.header {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  z-index: 100;
  background: #fff;
  border-bottom: 3px solid var(--primary);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}

.header-logo {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 900;
  color: var(--text-dark);
}

.header-nav ul {
  display: flex;
  gap: 28px;
  align-items: center;
}

.header-nav a {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text);
  transition: color 0.2s;
}

.header-nav a:hover { color: var(--primary); }

.nav-cta {
  background: var(--primary);
  color: #fff !important;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 900 !important;
  box-shadow: 3px 3px 0 var(--primary-dark);
  transition: transform 0.15s, box-shadow 0.15s !important;
}

.nav-cta:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 var(--primary-dark) !important;
  color: #fff !important;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 26px;
  height: 3px;
  background: var(--text-dark);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}

.hamburger.is-open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.hamburger.is-open span:nth-child(2) { opacity: 0; }
.hamburger.is-open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

/* ================================================
   ボタン
================================================ */
.btn-primary {
  display: inline-block;
  background: var(--primary);
  color: #fff;
  padding: 14px 32px;
  border-radius: 50px;
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  box-shadow: 4px 4px 0 var(--primary-dark);
  transition: transform 0.15s, box-shadow 0.15s;
}

.btn-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--primary-dark);
}

.btn-outline {
  display: inline-block;
  background: transparent;
  color: var(--text-dark);
  padding: 12px 28px;
  border-radius: 50px;
  border: 3px solid var(--text-dark);
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 0.95rem;
  box-shadow: 3px 3px 0 var(--text-dark);
  transition: transform 0.15s, box-shadow 0.15s;
}

.btn-outline:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 var(--text-dark);
}

/* ================================================
   HERO
================================================ */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: var(--bg-hero);
  position: relative;
  overflow: hidden;
}

.hero-circle {
  position: absolute;
  border-radius: 50%;
  background: #fde68a;
  pointer-events: none;
}

.hero-circle--1 { width: 300px; height: 300px; top: -80px; right: -60px; }
.hero-circle--2 { width: 200px; height: 200px; bottom: -50px; left: -40px; }
.hero-circle--3 { width: 120px; height: 120px; top: 60%; right: 15%; }

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  padding-top: 68px;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-block;
  background: var(--primary);
  color: #fff;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 900;
  padding: 4px 16px;
  border-radius: 50px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 0 var(--primary-dark);
}

.hero-title {
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.2;
  color: var(--text-dark);
  margin-bottom: 20px;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
}

.hero-tag {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 0.8rem;
  padding: 6px 16px;
  border-radius: 50px;
  color: #fff;
}

.hero-tag--1 { background: var(--primary); box-shadow: 2px 2px 0 var(--primary-dark); }
.hero-tag--2 { background: var(--secondary); box-shadow: 2px 2px 0 #059669; }
.hero-tag--3 { background: var(--accent2); box-shadow: 2px 2px 0 #4f46e5; }

/* イラストエリア */
.hero-illust {
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-illust-placeholder {
  width: 280px;
  height: 280px;
  background: #fff;
  border-radius: 50%;
  border: 4px solid var(--primary);
  box-shadow: 6px 6px 0 var(--primary-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  position: relative;
  z-index: 1;
}

/* 浮遊絵文字 */
.float-emoji {
  position: absolute;
  font-size: 2.5rem;
  animation: floatY 3s ease-in-out infinite;
  z-index: 2;
}

.float-emoji--1 { top: 10%; right: 10%; animation-delay: 0s; }
.float-emoji--2 { top: 60%; right: 0%; animation-delay: 0.8s; font-size: 2rem; }
.float-emoji--3 { bottom: 5%; left: 10%; animation-delay: 1.5s; font-size: 1.8rem; }
.float-emoji--4 { top: 20%; left: 5%; animation-delay: 0.4s; font-size: 2.2rem; }
.float-emoji--5 { bottom: 20%; right: 15%; animation-delay: 1.2s; font-size: 1.6rem; }

@keyframes floatY {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

/* ================================================
   強みセクション
================================================ */
.points-section {
  padding: 80px 0;
  background: var(--bg-section);
  border-top: 4px solid var(--primary);
  border-bottom: 4px solid var(--primary);
}

.section-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 900;
  color: var(--text-dark);
  text-align: center;
  margin-bottom: 8px;
}

.section-sub {
  text-align: center;
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 48px;
}

.points-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.point-card {
  background: var(--bg);
  border: 3px solid var(--text-dark);
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 5px 5px 0 var(--text-dark);
  transition: transform 0.15s, box-shadow 0.15s;
  opacity: 0;
  transform: translateY(40px);
}

.point-card.is-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.15s, -webkit-transform 0.15s;
}

.point-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 8px 8px 0 var(--text-dark);
}

.point-icon { font-size: 3rem; margin-bottom: 16px; }

.point-card h3 {
  font-size: 1.1rem;
  color: var(--text-dark);
  margin-bottom: 12px;
}

.point-card p { font-size: 0.875rem; color: var(--muted); }

/* ================================================
   横スクロールカルーセル
================================================ */
.carousel-section { padding: 80px 0; }

.carousel-wrap {
  overflow: hidden;
  margin-top: 32px;
  cursor: grab;
}

.carousel-wrap:active { cursor: grabbing; }

.carousel-track {
  display: flex;
  gap: 20px;
  user-select: none;
  padding: 8px 24px 16px;
}

.carousel-card {
  flex-shrink: 0;
  width: 260px;
  background: var(--card-bg);
  border: 3px solid var(--text-dark);
  border-radius: 20px;
  padding: 28px 20px;
  box-shadow: 4px 4px 0 var(--text-dark);
  transition: transform 0.15s, box-shadow 0.15s;
}

.carousel-card:hover {
  transform: translate(-2px, -2px) translateY(-4px);
  box-shadow: 6px 6px 0 var(--text-dark);
}

.carousel-card-icon { font-size: 2.5rem; margin-bottom: 12px; }

.carousel-card h3 {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.carousel-card p { font-size: 0.8rem; color: var(--muted); }

/* ================================================
   CTA
================================================ */
.cta-section {
  background: var(--primary);
  padding: 80px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-bg-emoji {
  position: absolute;
  font-size: 3rem;
  opacity: 0.12;
  pointer-events: none;
}

.cta-section h2 {
  font-size: 2rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 16px;
}

.cta-section p {
  color: rgba(255,255,255,0.85);
  margin-bottom: 32px;
}

.btn-cta-white {
  display: inline-block;
  background: #fff;
  color: var(--primary);
  padding: 14px 36px;
  border-radius: 50px;
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 1rem;
  box-shadow: 4px 4px 0 var(--primary-dark);
  transition: transform 0.15s, box-shadow 0.15s;
}

.btn-cta-white:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--primary-dark);
}

/* ================================================
   フッター
================================================ */
.footer {
  background: var(--text-dark);
  color: #fff;
  padding: 40px 0 0;
}

.footer-inner { padding-bottom: 32px; }

.footer-name {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 1.1rem;
  margin-bottom: 6px;
}

.footer-info { font-size: 0.85rem; opacity: 0.75; }

.footer-copy {
  border-top: 1px solid rgba(255,255,255,0.2);
  text-align: center;
  padding: 16px 24px;
  font-size: 0.75rem;
  opacity: 0.6;
}

/* ================================================
   レスポンシブ
================================================ */
@media (max-width: 767px) {
  .hamburger { display: flex; }

  .header-nav {
    display: none;
    position: fixed;
    top: 68px; left: 0;
    width: 100%;
    height: calc(100vh - 68px);
    background: #fff;
    padding: 32px 24px;
  }

  .header-nav.is-open { display: block; }

  .header-nav ul {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }

  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: 100px;
    padding-bottom: 40px;
  }

  .hero-title { font-size: 2.2rem; }
  .hero-illust { order: -1; min-height: 280px; }
  .hero-tags { justify-content: center; }
  .points-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: コミット**

```bash
git add v2/pop/css/style.css
git commit -m "feat: pop バリアント CSS を作成"
```

---

## Task 5: 🌈 pop バリアント — HTML + JS

**Files:**
- Create: `v2/pop/index.html`
- Modify: `v2/pop/js/main.js`

- [ ] **Step 1: `v2/pop/index.html` を作成**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>株式会社オリト｜高圧ホース・油圧機器の卸販売</title>
  <meta name="description" content="株式会社オリトは高圧ホース・口金・カプラ・油圧機器の卸販売および高圧ホース出張製作を行っています。">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="header">
  <div class="container header-inner">
    <a href="index.html" class="header-logo">株式会社オリト</a>
    <button class="hamburger" aria-label="メニューを開く" aria-expanded="false" aria-controls="header-nav">
      <span></span><span></span><span></span>
    </button>
    <nav class="header-nav" id="header-nav">
      <ul>
        <li><a href="company.html">会社概要</a></li>
        <li><a href="service.html">事業内容</a></li>
        <li><a href="contact.html" class="nav-cta">お問い合わせ</a></li>
      </ul>
    </nav>
  </div>
</header>

<main>

<!-- ① HERO -->
<section class="hero">
  <div class="hero-circle hero-circle--1"></div>
  <div class="hero-circle hero-circle--2"></div>
  <div class="hero-circle hero-circle--3"></div>
  <div class="container hero-inner">
    <div class="hero-text">
      <p class="hero-badge">⚡ 高圧ホース・油圧機器の専門商社</p>
      <h1 class="hero-title">ホースのこと、<br>オリトに任せて！</h1>
      <div class="hero-tags">
        <span class="hero-tag hero-tag--1">🔩 卸販売</span>
        <span class="hero-tag hero-tag--2">🚗 出張製作</span>
        <span class="hero-tag hero-tag--3">⚙️ 油圧機器</span>
      </div>
      <a href="contact.html" class="btn-primary">まずは相談してみる！</a>
    </div>
    <div class="hero-illust">
      <div class="hero-illust-placeholder">🏭</div>
      <div class="float-emoji float-emoji--1">🔧</div>
      <div class="float-emoji float-emoji--2">💧</div>
      <div class="float-emoji float-emoji--3">🔩</div>
      <div class="float-emoji float-emoji--4">⚙️</div>
      <div class="float-emoji float-emoji--5">🏗️</div>
    </div>
  </div>
</section>

<!-- ② 強み -->
<section class="points-section">
  <div class="container">
    <h2 class="section-title">オリトの強み</h2>
    <p class="section-sub">Our Strengths</p>
    <div class="points-grid">
      <div class="point-card">
        <div class="point-icon">📦</div>
        <h3>豊富な在庫</h3>
        <p>高圧ホース・口金・カプラ・継手類を幅広く在庫。急ぎのご注文にも対応します。</p>
      </div>
      <div class="point-card">
        <div class="point-icon">🚗</div>
        <h3>出張製作サービス</h3>
        <p>現地での高圧ホース製作に対応。設備を止めずにその場でホースを製作します。</p>
      </div>
      <div class="point-card">
        <div class="point-icon">⚡</div>
        <h3>迅速な納品</h3>
        <p>お客様のお急ぎに迅速に対応。安定供給で生産ラインをサポートします。</p>
      </div>
    </div>
  </div>
</section>

<!-- ③ 事業内容カルーセル -->
<section class="carousel-section">
  <div class="container">
    <h2 class="section-title">事業内容</h2>
    <p class="section-sub">Services</p>
  </div>
  <div class="carousel-wrap" id="carousel-wrap">
    <div class="carousel-track" id="carousel-track">
      <div class="carousel-card">
        <div class="carousel-card-icon">🔩</div>
        <h3>高圧ホース・各種部材の卸販売</h3>
        <p>口金・カプラ・スイベル・継手類など幅広い製品を取り扱っています。</p>
      </div>
      <div class="carousel-card">
        <div class="carousel-card-icon">⚙️</div>
        <h3>アッセンブリーマシーン販売</h3>
        <p>高圧ホースアッセンブリーマシーンの販売を行っています。</p>
      </div>
      <div class="carousel-card">
        <div class="carousel-card-icon">🔗</div>
        <h3>各種継手類の卸販売</h3>
        <p>配管・油圧システムに必要な各種継手類を幅広く取り扱っています。</p>
      </div>
      <div class="carousel-card">
        <div class="carousel-card-icon">🚗</div>
        <h3>高圧ホースの出張製作</h3>
        <p>お客様の現場へ出向き、高圧ホースをその場で製作します。</p>
      </div>
      <div class="carousel-card">
        <div class="carousel-card-icon">💧</div>
        <h3>洗浄用ホース・ノズルの卸販売</h3>
        <p>工場内の洗浄作業に使用するホース・ノズル等の関連資材を取り扱っています。</p>
      </div>
      <div class="carousel-card">
        <div class="carousel-card-icon">🔧</div>
        <h3>油圧機器の販売</h3>
        <p>バルブ類・圧力計などの油圧機器を取り揃えております。</p>
      </div>
    </div>
  </div>
</section>

<!-- ④ CTA -->
<section class="cta-section">
  <div class="cta-bg-emoji" style="top:10%;left:5%">🔩</div>
  <div class="cta-bg-emoji" style="top:30%;right:8%">⚙️</div>
  <div class="cta-bg-emoji" style="bottom:15%;left:20%">🏭</div>
  <div class="cta-bg-emoji" style="bottom:20%;right:15%">💧</div>
  <h2>まずはお気軽にご相談ください！</h2>
  <p>高圧ホース・油圧機器に関するご質問・お見積もりはお気軽にどうぞ。</p>
  <a href="contact.html" class="btn-cta-white">お問い合わせはこちら →</a>
</section>

</main>

<footer class="footer">
  <div class="container footer-inner">
    <p class="footer-name">株式会社オリト</p>
    <p class="footer-info">〒000-0000 住所をここに入力 ｜ TEL: 000-0000-0000</p>
  </div>
  <div class="footer-copy">
    <p>Copyright &copy; 株式会社オリト All Rights Reserved.</p>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: `v2/pop/js/main.js` を作成**

```javascript
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
```

- [ ] **Step 3: ブラウザで確認**

`http://localhost:8080/v2/pop/` を開いて確認:
- クリーム背景に黄色いアクセントが表示される
- ヒーローに絵文字が上下浮遊している
- スクロールで強みカードが下からポップに登場する
- 事業カルーセルがマウスドラッグで左右スクロールできる
- CTA帯がアンバーカラーで表示される

- [ ] **Step 4: コミット**

```bash
git add v2/pop/index.html v2/pop/js/main.js
git commit -m "feat: pop バリアント トップページを実装"
```

---

## Task 6: 📖 scroll バリアント — CSS

**Files:**
- Modify: `v2/scroll/css/style.css`

- [ ] **Step 1: `v2/scroll/css/style.css` を作成**

```css
@charset "utf-8";

@import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700;900&family=Noto+Sans+JP:wght@400;500;700&display=swap');

:root {
  --bg: #f0f9ff;
  --bg-white: #ffffff;
  --primary: #0ea5e9;
  --primary-dark: #0284c7;
  --text: #0c4a6e;
  --muted: #64748b;
  --border: #bae6fd;
  --font-heading: 'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif;
  --font-body: 'Noto Sans JP', sans-serif;
  --max-width: 1100px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

body {
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.8;
  color: var(--text);
  background: var(--bg);
  overflow-x: hidden;
}

h1, h2, h3, h4 { font-family: var(--font-heading); line-height: 1.3; }

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

body.noscroll { overflow: hidden; }

/* ================================================
   ヘッダー
================================================ */
.header {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  z-index: 100;
  background: rgba(240, 249, 255, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 2px solid var(--border);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}

.header-logo {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 900;
  color: var(--text);
  letter-spacing: 0.02em;
}

.header-nav ul {
  display: flex;
  gap: 32px;
  align-items: center;
}

.header-nav a {
  font-size: 0.9rem;
  color: var(--muted);
  transition: color 0.2s;
  font-weight: 500;
}

.header-nav a:hover { color: var(--primary); }

.nav-cta {
  background: var(--primary);
  color: #fff !important;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 700 !important;
  transition: background 0.2s !important;
}

.nav-cta:hover { background: var(--primary-dark) !important; }

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 26px;
  height: 2px;
  background: var(--text);
  transition: transform 0.3s, opacity 0.3s;
}

.hamburger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.is-open span:nth-child(2) { opacity: 0; }
.hamburger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ================================================
   ボタン
================================================ */
.btn-primary {
  display: inline-block;
  background: var(--primary);
  color: #fff;
  padding: 14px 32px;
  border-radius: 8px;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  border: none;
  transition: background 0.2s, transform 0.2s;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.btn-outline {
  display: inline-block;
  background: transparent;
  color: var(--primary);
  padding: 12px 28px;
  border-radius: 8px;
  border: 2px solid var(--primary);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.95rem;
  transition: background 0.2s, color 0.2s;
}

.btn-outline:hover {
  background: var(--primary);
  color: #fff;
}

/* ================================================
   スクロール進行ライン（左端の装飾）
================================================ */
.scroll-line {
  position: fixed;
  left: 0; top: 0;
  width: 4px;
  height: 0%;
  background: linear-gradient(180deg, var(--primary), #38bdf8);
  z-index: 200;
  transition: height 0.1s linear;
}

/* ================================================
   HERO
================================================ */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: var(--bg);
  position: relative;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  padding-top: 68px;
}

.hero-label {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.hero-label-line {
  width: 32px;
  height: 2px;
  background: var(--primary);
}

.hero-label-text {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-title {
  font-size: 2.8rem;
  font-weight: 900;
  line-height: 1.25;
  color: var(--text);
  margin-bottom: 24px;
  overflow: hidden;
}

/* 文字ごとアニメーション用 */
.char {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.char.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-desc {
  font-size: 0.95rem;
  color: var(--muted);
  margin-bottom: 36px;
  line-height: 2;
}

/* イラストエリア */
.hero-illust {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s;
}

.hero-illust.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-illust-placeholder {
  width: 100%;
  aspect-ratio: 1;
  max-width: 460px;
  background: var(--bg-white);
  border-radius: 24px;
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  margin: 0 auto;
  box-shadow: 0 20px 60px rgba(14, 165, 233, 0.1);
}

/* ================================================
   交互レイアウト（強みストーリー）
================================================ */
.story-section { padding: 100px 0; }

.story-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  margin-bottom: 80px;
}

.story-item:last-child { margin-bottom: 0; }

.story-item--reverse .story-text { order: 2; }
.story-item--reverse .story-illust { order: 1; }

/* スライドイン */
.slide-left {
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.slide-right {
  opacity: 0;
  transform: translateX(50px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.slide-left.is-visible,
.slide-right.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.story-step {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 0.15em;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.story-step::before {
  content: '';
  display: block;
  width: 20px;
  height: 2px;
  background: var(--primary);
}

.story-text h3 {
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--text);
  margin-bottom: 16px;
}

.story-text p {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 2;
}

.story-illust-box {
  background: var(--bg-white);
  border-radius: 20px;
  border: 2px solid var(--border);
  padding: 40px;
  text-align: center;
  font-size: 6rem;
  box-shadow: 0 10px 40px rgba(14,165,233,0.08);
}

/* SVG連結ライン */
.story-connector {
  text-align: center;
  margin: -40px 0;
  position: relative;
  z-index: 1;
}

.story-connector svg {
  width: 100%;
  max-width: 300px;
  height: 80px;
  stroke: var(--border);
  stroke-width: 2;
  fill: none;
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  transition: stroke-dashoffset 1s ease;
}

.story-connector svg.is-visible {
  stroke-dashoffset: 0;
}

/* ================================================
   タイムライン
================================================ */
.timeline-section {
  padding: 100px 0;
  background: var(--bg-white);
  border-top: 2px solid var(--border);
  border-bottom: 2px solid var(--border);
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
}

/* 縦線 */
.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  width: 3px;
  height: 0%;
  background: var(--primary);
  transform: translateX(-50%);
  transition: height 1.5s ease;
}

.timeline.is-active::before { height: 100%; }

.timeline-item {
  display: grid;
  grid-template-columns: 1fr 60px 1fr;
  gap: 0;
  margin-bottom: 48px;
  align-items: center;
}

.timeline-item:last-child { margin-bottom: 0; }

.timeline-content {
  background: var(--bg);
  border: 2px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.timeline-content.is-visible { opacity: 1; }

.timeline-item:nth-child(odd) .timeline-content { margin-right: 20px; }
.timeline-item:nth-child(even) .timeline-content { margin-left: 20px; grid-column: 3; }
.timeline-item:nth-child(even) .timeline-dot { grid-column: 2; }
.timeline-item:nth-child(even) .timeline-empty { grid-column: 1; grid-row: 1; }

.timeline-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--primary);
  border-radius: 50%;
  margin: 0 auto;
  font-size: 1.2rem;
  box-shadow: 0 0 0 6px rgba(14,165,233,0.15);
  position: relative;
  z-index: 1;
}

.timeline-content h4 {
  font-size: 0.75rem;
  color: var(--primary);
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 6px;
}

.timeline-content h3 {
  font-size: 1rem;
  color: var(--text);
  margin-bottom: 8px;
}

.timeline-content p {
  font-size: 0.85rem;
  color: var(--muted);
}

/* ================================================
   CTA
================================================ */
.cta-section {
  padding: 100px 24px;
  text-align: center;
  background: var(--bg);
}

.cta-section h2 {
  font-size: 2rem;
  font-weight: 900;
  color: var(--text);
  margin-bottom: 16px;
}

.cta-section p {
  color: var(--muted);
  margin-bottom: 36px;
  font-size: 0.95rem;
}

/* ================================================
   フッター
================================================ */
.footer {
  background: var(--text);
  color: #fff;
  padding: 40px 0 0;
}

.footer-inner { padding-bottom: 32px; }
.footer-name { font-weight: 700; margin-bottom: 6px; }
.footer-info { font-size: 0.85rem; opacity: 0.7; }

.footer-copy {
  border-top: 1px solid rgba(255,255,255,0.15);
  text-align: center;
  padding: 16px 24px;
  font-size: 0.75rem;
  opacity: 0.5;
}

/* ================================================
   レスポンシブ
================================================ */
@media (max-width: 767px) {
  .hamburger { display: flex; }

  .header-nav {
    display: none;
    position: fixed;
    top: 68px; left: 0;
    width: 100%;
    height: calc(100vh - 68px);
    background: var(--bg);
    padding: 32px 24px;
  }

  .header-nav.is-open { display: block; }
  .header-nav ul { flex-direction: column; align-items: flex-start; gap: 24px; }
  .header-nav a { font-size: 1.1rem; }

  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: 100px;
    padding-bottom: 40px;
  }

  .hero-title { font-size: 1.9rem; }
  .hero-illust { order: -1; }
  .hero-label { justify-content: center; }

  .story-item,
  .story-item--reverse .story-text,
  .story-item--reverse .story-illust {
    grid-template-columns: 1fr;
    order: unset;
  }

  .story-item { display: flex; flex-direction: column; gap: 24px; }

  .timeline-item {
    grid-template-columns: 40px 1fr;
  }

  .timeline::before { left: 20px; }
  .timeline-dot { grid-column: 1; }
  .timeline-content { grid-column: 2; margin: 0 0 0 16px !important; }
  .timeline-item:nth-child(even) .timeline-content { grid-column: 2; }
  .timeline-item:nth-child(even) .timeline-empty { display: none; }
  .timeline-item:nth-child(even) .timeline-dot { grid-column: 1; }
}
```

- [ ] **Step 2: コミット**

```bash
git add v2/scroll/css/style.css
git commit -m "feat: scroll バリアント CSS を作成"
```

---

## Task 7: 📖 scroll バリアント — HTML + JS

**Files:**
- Create: `v2/scroll/index.html`
- Modify: `v2/scroll/js/main.js`

- [ ] **Step 1: `v2/scroll/index.html` を作成**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>株式会社オリト｜高圧ホース・油圧機器の卸販売</title>
  <meta name="description" content="株式会社オリトは高圧ホース・口金・カプラ・油圧機器の卸販売および高圧ホース出張製作を行っています。">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

<!-- スクロール進行ライン -->
<div class="scroll-line" id="scroll-line"></div>

<header class="header">
  <div class="container header-inner">
    <a href="index.html" class="header-logo">株式会社オリト</a>
    <button class="hamburger" aria-label="メニューを開く" aria-expanded="false" aria-controls="header-nav">
      <span></span><span></span><span></span>
    </button>
    <nav class="header-nav" id="header-nav">
      <ul>
        <li><a href="company.html">会社概要</a></li>
        <li><a href="service.html">事業内容</a></li>
        <li><a href="contact.html" class="nav-cta">お問い合わせ</a></li>
      </ul>
    </nav>
  </div>
</header>

<main>

<!-- ① HERO -->
<section class="hero">
  <div class="container hero-inner">
    <div class="hero-text">
      <div class="hero-label">
        <div class="hero-label-line"></div>
        <span class="hero-label-text">High Pressure Hose Specialist</span>
      </div>
      <h1 class="hero-title" id="hero-title">現場を支える<br>確かな製品を。</h1>
      <p class="hero-desc">高圧ホース・口金・カプラ・継手類・油圧機器の卸販売から<br>出張製作まで、オリトにお任せください。</p>
      <a href="contact.html" class="btn-primary">お問い合わせはこちら</a>
    </div>
    <div class="hero-illust" id="hero-illust">
      <div class="hero-illust-placeholder">🔧</div>
    </div>
  </div>
</section>

<!-- ② 強みストーリー（交互） -->
<section class="story-section">
  <div class="container">

    <div class="story-item">
      <div class="story-text slide-left">
        <p class="story-step">STRENGTH 01</p>
        <h3>豊富な在庫で<br>急ぎにも対応</h3>
        <p>高圧ホース・口金・カプラ・継手類を幅広く在庫。急ぎのご注文にも迅速に対応します。</p>
      </div>
      <div class="story-illust slide-right">
        <div class="story-illust-box">📦</div>
      </div>
    </div>

    <div class="story-connector">
      <svg viewBox="0 0 300 80" class="connector-svg">
        <path d="M150 0 C150 40 50 40 50 80" />
      </svg>
    </div>

    <div class="story-item story-item--reverse">
      <div class="story-illust slide-left">
        <div class="story-illust-box">🚗</div>
      </div>
      <div class="story-text slide-right">
        <p class="story-step">STRENGTH 02</p>
        <h3>現地で作る<br>出張製作サービス</h3>
        <p>お客様の現場へ出向き、高圧ホースをその場で製作します。ラインを止めずに対応できます。</p>
      </div>
    </div>

    <div class="story-connector">
      <svg viewBox="0 0 300 80" class="connector-svg">
        <path d="M150 0 C150 40 250 40 250 80" />
      </svg>
    </div>

    <div class="story-item">
      <div class="story-text slide-left">
        <p class="story-step">STRENGTH 03</p>
        <h3>幅広い製品で<br>ワンストップ対応</h3>
        <p>高圧ホースから油圧機器まで、工場に必要な製品を一社でまとめてご提供します。</p>
      </div>
      <div class="story-illust slide-right">
        <div class="story-illust-box">⚙️</div>
      </div>
    </div>

  </div>
</section>

<!-- ③ 事業タイムライン -->
<section class="timeline-section">
  <div class="container">
    <h2 style="font-size:1.8rem;font-weight:900;text-align:center;margin-bottom:8px;color:var(--text)">事業内容</h2>
    <p style="text-align:center;color:var(--muted);font-size:0.8rem;letter-spacing:0.1em;margin-bottom:56px">Services</p>
    <div class="timeline" id="timeline">

      <div class="timeline-item">
        <div class="timeline-content">
          <h4>SERVICE 01</h4>
          <h3>高圧ホース・各種部材の卸販売</h3>
          <p>口金・カプラ・スイベル・継手類など幅広い製品を取り扱っています。</p>
        </div>
        <div class="timeline-dot">🔩</div>
        <div class="timeline-empty"></div>
      </div>

      <div class="timeline-item">
        <div class="timeline-empty"></div>
        <div class="timeline-dot">⚙️</div>
        <div class="timeline-content">
          <h4>SERVICE 02</h4>
          <h3>アッセンブリーマシーン販売</h3>
          <p>高圧ホースの製作に必要なアッセンブリーマシーンの販売を行っています。</p>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-content">
          <h4>SERVICE 03</h4>
          <h3>各種継手類の卸販売</h3>
          <p>配管・油圧システムに必要な各種継手類を幅広く取り扱っています。</p>
        </div>
        <div class="timeline-dot">🔗</div>
        <div class="timeline-empty"></div>
      </div>

      <div class="timeline-item">
        <div class="timeline-empty"></div>
        <div class="timeline-dot">🚗</div>
        <div class="timeline-content">
          <h4>SERVICE 04</h4>
          <h3>高圧ホース出張製作業務</h3>
          <p>お客様の現場へ出向き、その場でホースを製作します。</p>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-content">
          <h4>SERVICE 05</h4>
          <h3>洗浄用ホース・ノズルの卸販売</h3>
          <p>工場内の洗浄作業に使用するホース・ノズル等の関連資材を取り扱っています。</p>
        </div>
        <div class="timeline-dot">💧</div>
        <div class="timeline-empty"></div>
      </div>

      <div class="timeline-item">
        <div class="timeline-empty"></div>
        <div class="timeline-dot">🔧</div>
        <div class="timeline-content">
          <h4>SERVICE 06</h4>
          <h3>油圧機器の販売</h3>
          <p>バルブ類・圧力計などの油圧機器を取り揃えております。</p>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ④ CTA -->
<section class="cta-section">
  <h2>まずはお気軽にご相談ください</h2>
  <p>高圧ホース・油圧機器に関するご質問・お見積もりはお気軽にどうぞ。</p>
  <a href="contact.html" class="btn-primary">お問い合わせはこちら</a>
</section>

</main>

<footer class="footer">
  <div class="container footer-inner">
    <p class="footer-name">株式会社オリト</p>
    <p class="footer-info">〒000-0000 住所をここに入力 ｜ TEL: 000-0000-0000</p>
  </div>
  <div class="footer-copy">
    <p>Copyright &copy; 株式会社オリト All Rights Reserved.</p>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: `v2/scroll/js/main.js` を作成**

```javascript
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
```

- [ ] **Step 3: ブラウザで確認**

`http://localhost:8080/v2/scroll/` を開いて確認:
- 左端に青い進行ラインが表示され、スクロールに応じて伸びる
- ヒーロータイトルの文字が1文字ずつフェードイン
- 右のイラストが下から上昇
- 交互レイアウトセクションが左右からスライドイン
- SVGコネクターラインが描かれる
- タイムライン縦線が伸び、各カードが順番に表示される

- [ ] **Step 4: コミット**

```bash
git add v2/scroll/index.html v2/scroll/js/main.js
git commit -m "feat: scroll バリアント トップページを実装"
```

---

## 最終確認

- [ ] `http://localhost:8080/v2/dark/` — dark バリアント確認
- [ ] `http://localhost:8080/v2/pop/` — pop バリアント確認
- [ ] `http://localhost:8080/v2/scroll/` — scroll バリアント確認
- [ ] ユーザーに3バリアントを確認してもらい、承認後に Phase 2（内ページ）の計画を作成する
