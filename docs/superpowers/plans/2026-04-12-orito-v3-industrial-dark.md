# Orito v3 "Industrial Dark" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `v3/` ディレクトリに、参考/ のテキストを完全遵守しつつ VEX Hero デザイン（Liquid Glass ナビ・ビューポート下部ヒーロー・文字アニメーション）を適用したフルダークテーマの4ページサイトを構築する。

**Architecture:** バニラ HTML + Tailwind CDN（ビルドツール不要）。共通スタイルを `css/common.css` に、JS アニメーションを `js/main.js` に集約。各ページのダークカラーは `css/tailwind-config.js` で Tailwind に注入する。

**Tech Stack:** HTML5, Tailwind CSS CDN, Vanilla JS, Google Fonts（Inter + Noto Sans JP）, Material Symbols Outlined

---

## ファイル構成

```
v3/
  css/
    tailwind-config.js   # Tailwind ダークカラートークン定義
    common.css           # Liquid Glass・hero-bg・reveal・dark-card
    top.css              # トップページ固有（golden spacing）
    company.css          # 会社概要固有
    service.css          # 事業紹介固有
    contact.css          # お問い合わせ固有（フォームスタイル）
  js/
    main.js              # 文字アニメ・FadeIn・reveal・ハンバーガー
  index.html
  company.html
  service.html
  contact.html
```

**旧バージョン（ルート・v2/）は一切変更しない。**

---

## Task 1: Foundation（config + common.css + main.js）

**Files:**
- Create: `v3/css/tailwind-config.js`
- Create: `v3/css/common.css`
- Create: `v3/css/top.css`
- Create: `v3/css/company.css`
- Create: `v3/css/service.css`
- Create: `v3/css/contact.css`
- Create: `v3/js/main.js`

- [ ] **Step 1: ディレクトリ作成**

```bash
mkdir -p /Users/watanabewataru/code/株式会社オリト/v3/css
mkdir -p /Users/watanabewataru/code/株式会社オリト/v3/js
```

- [ ] **Step 2: tailwind-config.js を作成**

`v3/css/tailwind-config.js`:
```javascript
window.tailwind = window.tailwind || {};
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'primary':     '#2dd4bf',
        'primary-dim': '#0f6765',
        'bg-base':     '#080d0c',
        'bg-surface':  '#0e1614',
        'bg-card':     '#162220',
        'text-main':   '#f0fffe',
        'text-sub':    '#8ba8a5',
      },
      fontFamily: {
        'headline': ['Inter', 'sans-serif'],
      },
    }
  }
};
```

- [ ] **Step 3: common.css を作成**

`v3/css/common.css`:
```css
/* ── Base ─────────────────────────────────────────── */
html { scroll-behavior: smooth; }

body {
  font-family: 'Noto Sans JP', sans-serif;
  background-color: #080d0c;
  color: #f0fffe;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: 0.03em;
}

/* ── Liquid Glass ─────────────────────────────────── */
.liquid-glass {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.3)  0%,  rgba(255,255,255,0.1) 20%,
    rgba(255,255,255,0)   40%, rgba(255,255,255,0)   60%,
    rgba(255,255,255,0.1) 80%, rgba(255,255,255,0.3) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* ── Hero Background ──────────────────────────────── */
.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 65%, rgba(15,103,101,0.55) 0%, transparent 50%),
    radial-gradient(ellipse at 78% 25%, rgba(15,103,101,0.25) 0%, transparent 42%),
    #080d0c;
  z-index: 0;
}
.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(45,212,191,0.12) 1px, transparent 1px);
  background-size: 32px 32px;
}

/* ── Sub-page Hero Background ─────────────────────── */
.page-hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 15% 80%, rgba(15,103,101,0.4) 0%, transparent 50%),
    #080d0c;
  z-index: 0;
}
.page-hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(45,212,191,0.08) 1px, transparent 1px);
  background-size: 32px 32px;
}

/* ── Mobile Nav ───────────────────────────────────── */
.mobile-nav { display: none; }
.mobile-nav.is-open { display: block; }

/* ── Scroll Reveal ────────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.reveal[data-delay="100"] { transition-delay: 0.1s; }
.reveal[data-delay="200"] { transition-delay: 0.2s; }
.reveal[data-delay="300"] { transition-delay: 0.3s; }

/* ── Dark Card ────────────────────────────────────── */
.dark-card {
  background: #162220;
  border: 1px solid rgba(255,255,255,0.06);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.dark-card:hover {
  border-color: rgba(45,212,191,0.4);
  box-shadow: 0 20px 40px rgba(45,212,191,0.06);
}
.dark-card .card-icon { transition: transform 0.5s ease; }
.dark-card:hover .card-icon { transform: scale(1.1); }

/* ── Material Symbols ─────────────────────────────── */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* ── Divider ──────────────────────────────────────── */
.teal-divider {
  width: 4rem;
  height: 3px;
  background: #2dd4bf;
  border-radius: 9999px;
  margin: 0 auto;
}

/* ── Section Base ─────────────────────────────────── */
.section-dark   { background: #080d0c; }
.section-surface { background: #0e1614; }
```

- [ ] **Step 4: top.css を作成**

`v3/css/top.css`:
```css
.py-golden-xl  { padding-top: 10.6rem; padding-bottom: 10.6rem; }
.py-golden-lg  { padding-top:  6.5rem; padding-bottom:  6.5rem; }
.mb-golden-md  { margin-bottom: 4rem; }
.mb-golden-sm  { margin-bottom: 2.5rem; }
.gap-golden    { gap: 4rem; }

/* 選ばれる理由 — 右側 CSS 装飾 */
.strength-deco {
  background:
    radial-gradient(circle at 35% 40%, rgba(45,212,191,0.12) 0%, transparent 55%),
    radial-gradient(circle at 70% 70%, rgba(15,103,101,0.3)  0%, transparent 50%),
    #0e1614;
  border-radius: 4rem;
  position: relative;
  overflow: hidden;
  min-height: 380px;
}
.strength-deco::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(45,212,191,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* 会社案内 — 右側 CSS 装飾 */
.company-brief-deco {
  background: linear-gradient(135deg, #0f6765 0%, #080d0c 100%);
  position: relative;
  overflow: hidden;
  min-height: 300px;
}
.company-brief-deco::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(45,212,191,0.15) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

- [ ] **Step 5: company.css / service.css を作成（最小限）**

`v3/css/company.css`:
```css
.py-golden-lg { padding-top: 6.5rem; padding-bottom: 6.5rem; }
.map-placeholder {
  background: #162220;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #3f5754;
  font-weight: 700;
  letter-spacing: 0.2em;
  min-height: 400px;
}
```

`v3/css/service.css`:
```css
.py-golden-xl { padding-top: 10.6rem; padding-bottom: 10.6rem; }
.service-cta-bg {
  background: linear-gradient(135deg, #0f6765 0%, #0a4f4e 100%);
  position: relative;
  overflow: hidden;
}
.service-cta-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 28px 28px;
}
```

- [ ] **Step 6: contact.css を作成**

`v3/css/contact.css`:
```css
.golden-pt  { padding-top: 6.5rem; }
.golden-pb  { padding-bottom: 10.6rem; }

.contact-input {
  width: 100%;
  height: 3.5rem;
  padding: 0 1.5rem;
  background: #0e1614;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 0.75rem;
  color: #f0fffe;
  font-family: 'Noto Sans JP', sans-serif;
  letter-spacing: 0.05em;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}
.contact-input::placeholder { color: rgba(139,168,165,0.4); }
.contact-input:focus {
  border-color: rgba(45,212,191,0.5);
  box-shadow: 0 0 0 3px rgba(45,212,191,0.1);
}

.contact-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #8ba8a5;
  margin-bottom: 0.5rem;
  margin-left: 0.25rem;
}

.custom-checkbox {
  width: 1.5rem;
  height: 1.5rem;
  background: #0e1614;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 0.375rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
input[type="checkbox"]:checked + .custom-checkbox {
  background: #2dd4bf;
  border-color: #2dd4bf;
}
input[type="checkbox"] { position: absolute; opacity: 0; width: 0; height: 0; }
```

- [ ] **Step 7: main.js を作成**

`v3/js/main.js`:
```javascript
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
```

- [ ] **Step 8: ブラウザ確認（ファイルが揃っているか）**

```bash
ls /Users/watanabewataru/code/株式会社オリト/v3/css/
ls /Users/watanabewataru/code/株式会社オリト/v3/js/
```

Expected:
```
css/: tailwind-config.js  common.css  top.css  company.css  service.css  contact.css
js/:  main.js
```

- [ ] **Step 9: コミット**

```bash
cd /Users/watanabewataru/code/株式会社オリト
git add v3/
git commit -m "feat: v3 foundation — tailwind-config, common.css, main.js を追加"
```

---

## Task 2: index.html（トップページ）

**Files:**
- Create: `v3/index.html`

**参考/index.html から流用するテキスト（変更禁止）:**
- Hero heading: `油圧と高圧ホースの` / `スペシャリスト` / `株式会社オリト`
- Hero sub: `創業より培った確かな技術と、豊富な在庫ラインナップで、あらゆる産業の「流れ」を支えます。即納・即製。現場の課題を迅速に解決します。`
- Hero buttons: `選ばれる理由` / `サービス一覧`
- 事業内容: 3カード（ホース受託加工・油圧機器販売・技術サポート）
- 選ばれる理由: 3項目（圧倒的なスピード・豊富な在庫力・専門特化の知識）
- 会社案内: `信頼を繋ぐ、一本のホースから` + 本文
- CTA: `まずはお気軽にご相談ください`
- Footer copyright: `© 株式会社オリト ALL RIGHTS RESERVED.`

- [ ] **Step 1: index.html を作成**

`v3/index.html`:
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>株式会社オリト | 油圧と高圧ホースのスペシャリスト</title>
  <meta name="description" content="株式会社オリトは高圧ホース・口金・カプラ・油圧機器の卸販売および高圧ホース出張製作を行っています。">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Sans+JP:wght@400;500;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet">
  <script src="css/tailwind-config.js"></script>
  <script src="https://cdn.tailwindcss.com?plugins=forms"></script>
  <link rel="stylesheet" href="css/common.css">
  <link rel="stylesheet" href="css/top.css">
</head>
<body class="bg-bg-base text-text-main">

<!-- ════════════════════════════════════════
     HERO（100vh）
════════════════════════════════════════ -->
<section class="relative flex flex-col" style="height:100vh;overflow:hidden;">
  <!-- 背景 -->
  <div class="hero-bg" aria-hidden="true"></div>

  <!-- Navbar -->
  <div class="relative z-20 px-6 md:px-12 lg:px-16 pt-6">
    <nav class="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
      <!-- ロゴ -->
      <a href="index.html" class="text-2xl font-semibold tracking-tight text-white" style="font-family:'Inter',sans-serif;">ORITO</a>
      <!-- デスクトップリンク -->
      <div class="hidden md:flex items-center gap-8">
        <a href="index.html"   class="text-sm text-white border-b border-white/40 pb-0.5">トップ</a>
        <a href="service.html" class="text-sm text-white/70 hover:text-white transition-colors">サービス</a>
        <a href="company.html" class="text-sm text-white/70 hover:text-white transition-colors">会社概要</a>
        <a href="contact.html" class="text-sm text-white/70 hover:text-white transition-colors">お問い合わせ</a>
      </div>
      <!-- CTA & ハンバーガー -->
      <div class="flex items-center gap-3">
        <a href="contact.html" class="hidden md:inline-block bg-white text-black px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors" style="font-family:'Inter',sans-serif;">お問い合わせ</a>
        <button data-hamburger class="md:hidden flex flex-col gap-1.5 p-2" aria-label="メニューを開く" aria-expanded="false">
          <span class="w-5 h-0.5 bg-white block"></span>
          <span class="w-5 h-0.5 bg-white block"></span>
          <span class="w-5 h-0.5 bg-white block"></span>
        </button>
      </div>
    </nav>
    <!-- モバイルメニュー -->
    <div class="mobile-nav liquid-glass mt-2 rounded-xl px-4 py-4">
      <ul class="space-y-3">
        <li><a href="index.html"   class="text-sm text-white">トップ</a></li>
        <li><a href="service.html" class="text-sm text-white/70">サービス</a></li>
        <li><a href="company.html" class="text-sm text-white/70">会社概要</a></li>
        <li><a href="contact.html" class="text-sm text-white/70">お問い合わせ</a></li>
      </ul>
    </div>
  </div>

  <!-- Hero コンテンツ（ビューポート下部） -->
  <div class="relative z-10 flex-1 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 lg:pb-16">
    <div class="lg:grid lg:grid-cols-2 lg:items-end gap-8">

      <!-- 左列：メインコンテンツ -->
      <div>
        <p class="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4" data-fade-delay="100" style="font-family:'Inter',sans-serif;">HIGH PRESSURE HOSE SPECIALIST</p>

        <h1 data-char-animate class="font-black mb-5 leading-tight" style="font-family:'Inter','Noto Sans JP',sans-serif;font-size:clamp(2.2rem,6vw,5rem);letter-spacing:-0.03em;">
          <span data-line="油圧と高圧ホースの" class="block"></span>
          <span data-line="スペシャリスト" class="block text-primary"></span>
          <span data-line="株式会社オリト" class="block"></span>
        </h1>

        <p class="text-base md:text-lg leading-relaxed mb-6 text-text-sub" data-fade-delay="800">
          創業より培った確かな技術と、豊富な在庫ラインナップで、あらゆる産業の「流れ」を支えます。即納・即製。現場の課題を迅速に解決します。
        </p>

        <div class="flex flex-wrap gap-4" data-fade-delay="1200">
          <a href="#strength" class="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm" style="font-family:'Inter',sans-serif;">選ばれる理由</a>
          <a href="service.html" class="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium text-sm hover:bg-white hover:text-black transition-colors" style="font-family:'Inter',sans-serif;">サービス一覧</a>
        </div>
      </div>

      <!-- 右列：タグ -->
      <div class="flex items-end justify-start lg:justify-end mt-8 lg:mt-0" data-fade-delay="1400">
        <div class="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
          <span class="text-base md:text-lg lg:text-xl font-light">ホース加工。油圧販売。技術サポート。</span>
        </div>
      </div>

    </div>
  </div>
</section>

<main>

<!-- ════════════════════════════════════════
     事業内容
════════════════════════════════════════ -->
<section class="section-surface py-golden-xl">
  <div class="max-w-7xl mx-auto px-8">
    <div class="text-center mb-golden-md">
      <h2 class="text-3xl lg:text-4xl font-black tracking-wide reveal">事業内容</h2>
      <div class="teal-divider mt-6 reveal" data-delay="100"></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">

      <div class="dark-card p-10 rounded-[2.5rem] reveal">
        <div class="card-icon w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
          <span class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings:'FILL' 1;">settings_input_component</span>
        </div>
        <h3 class="text-xl font-black mb-4 tracking-wide">ホース受託加工</h3>
        <p class="text-text-sub leading-relaxed text-sm font-medium tracking-wide">高圧ホースのアッセンブリ。特殊な口金や長尺ホースにも、熟練の技術者が一本一本丁寧に対応します。</p>
      </div>

      <div class="dark-card p-10 rounded-[2.5rem] reveal" data-delay="100">
        <div class="card-icon w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
          <span class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings:'FILL' 1;">shopping_cart</span>
        </div>
        <h3 class="text-xl font-black mb-4 tracking-wide">油圧機器販売</h3>
        <p class="text-text-sub leading-relaxed text-sm font-medium tracking-wide">油圧ポンプ、バルブ、継手など、国内外の主要メーカー製品を豊富にラインナップ。迅速な供給を実現します。</p>
      </div>

      <div class="dark-card p-10 rounded-[2.5rem] reveal" data-delay="200">
        <div class="card-icon w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
          <span class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings:'FILL' 1;">engineering</span>
        </div>
        <h3 class="text-xl font-black mb-4 tracking-wide">技術サポート</h3>
        <p class="text-text-sub leading-relaxed text-sm font-medium tracking-wide">機器の選定からトラブルシューティングまで。技術的な知見から、お客様の課題解決を全面的にバックアップ。</p>
      </div>

    </div>
  </div>
</section>

<!-- ════════════════════════════════════════
     選ばれる理由
════════════════════════════════════════ -->
<section id="strength" class="section-dark py-golden-xl">
  <div class="max-w-7xl mx-auto px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-golden items-center">

      <!-- 右側CSS装飾（lgでは右になる） -->
      <div class="strength-deco reveal order-last lg:order-last"></div>

      <!-- 左側テキスト -->
      <div class="space-y-10 order-first">
        <div class="reveal">
          <h2 class="text-3xl lg:text-4xl font-black tracking-wide mb-6">選ばれる理由</h2>
          <p class="text-text-sub leading-relaxed font-medium tracking-wide">私たちは、単なる卸売業者ではありません。現場の状況を理解し、最適なソリューションを提案するパートナーです。</p>
        </div>

        <div class="space-y-8">

          <div class="flex gap-6 items-start reveal" data-delay="100">
            <div class="bg-bg-card p-4 rounded-2xl flex-shrink-0">
              <span class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings:'FILL' 1;">speed</span>
            </div>
            <div>
              <h4 class="text-lg font-black mb-2 tracking-wide">圧倒的なスピード</h4>
              <p class="text-sm text-text-sub leading-relaxed font-medium tracking-wide">即日加工・即日出荷を基本とし、ダウンタイムを最小限に抑えます。緊急のトラブルにも柔軟に対応可能です。</p>
            </div>
          </div>

          <div class="flex gap-6 items-start reveal" data-delay="200">
            <div class="bg-bg-card p-4 rounded-2xl flex-shrink-0">
              <span class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings:'FILL' 1;">inventory_2</span>
            </div>
            <div>
              <h4 class="text-lg font-black mb-2 tracking-wide">豊富な在庫力</h4>
              <p class="text-sm text-text-sub leading-relaxed font-medium tracking-wide">多種多様な口金、アダプター、ホースを常時ストック。特殊な要求にも応えられる「オリト」の底力です。</p>
            </div>
          </div>

          <div class="flex gap-6 items-start reveal" data-delay="300">
            <div class="bg-bg-card p-4 rounded-2xl flex-shrink-0">
              <span class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings:'FILL' 1;">psychology</span>
            </div>
            <div>
              <h4 class="text-lg font-black mb-2 tracking-wide">専門特化の知識</h4>
              <p class="text-sm text-text-sub leading-relaxed font-medium tracking-wide">油圧のプロフェッショナルが、技術的な観点から最適な製品を選定。安全で効率的なシステム運用を提案します。</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════
     会社案内
════════════════════════════════════════ -->
<section class="section-surface py-golden-xl">
  <div class="max-w-7xl mx-auto px-8">
    <div class="dark-card rounded-[4rem] overflow-hidden flex flex-col md:flex-row reveal">
      <div class="p-16 md:p-20 flex-1 space-y-6">
        <div class="text-primary font-black text-xs tracking-[0.3em] uppercase" style="font-family:'Inter',sans-serif;">会社案内</div>
        <h2 class="text-3xl font-black tracking-tight leading-snug">信頼を繋ぐ、一本のホースから</h2>
        <p class="text-text-sub leading-[1.8] font-medium tracking-wide">
          株式会社オリトは、広島を拠点に西日本エリアの産業を支えてきました。私たちの使命は、高度な専門性と迅速な対応力で、お客様の現場を止めないことです。常に進化する技術をキャッチアップし、次世代の油圧ソリューションを提供し続けます。
        </p>
        <a href="company.html" class="inline-flex items-center gap-2 font-black text-primary group tracking-widest text-sm" style="font-family:'Inter',sans-serif;">
          会社概要を見る
          <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
        </a>
      </div>
      <div class="company-brief-deco flex-1"></div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════
     CTA 帯
════════════════════════════════════════ -->
<section class="section-dark py-golden-xl px-8">
  <div class="max-w-7xl mx-auto">
    <div class="service-cta-bg rounded-[4rem] relative z-0 text-center px-8 py-24 md:py-32 reveal">
      <h2 class="text-4xl lg:text-6xl font-black tracking-wide leading-tight text-white mb-8">
        まずはお気軽に<br>ご相談ください
      </h2>
      <p class="text-white/80 text-lg max-w-2xl mx-auto mb-12 tracking-wider leading-relaxed font-medium">
        製品のお見積り、技術的な相談、納期のご確認など、<br class="hidden md:block">専門のスタッフが丁寧にお答えします。
      </p>
      <a href="contact.html" class="inline-flex items-center justify-center gap-3 bg-white text-black px-12 py-5 rounded-2xl font-black text-lg hover:bg-gray-100 transition-colors tracking-widest shadow-xl" style="font-family:'Inter',sans-serif;">
        <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">mail</span>
        お問い合わせフォーム
      </a>
    </div>
  </div>
</section>

</main>

<!-- フッター -->
<footer class="section-surface border-t border-white/5 py-16">
  <div class="max-w-7xl mx-auto px-8">
    <div class="flex flex-col items-center">
      <div class="text-2xl font-semibold tracking-[0.2em] text-primary mb-10" style="font-family:'Inter',sans-serif;">ORITO</div>
      <nav>
        <ul class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-xl mx-auto">
          <li><a href="index.html"   class="text-sm text-white font-bold tracking-wide hover:text-primary transition-colors">トップ</a></li>
          <li><a href="service.html" class="text-sm text-text-sub hover:text-primary transition-colors font-bold tracking-wide">サービス</a></li>
          <li><a href="company.html" class="text-sm text-text-sub hover:text-primary transition-colors font-bold tracking-wide">会社概要</a></li>
          <li><a href="contact.html" class="text-sm text-text-sub hover:text-primary transition-colors font-bold tracking-wide">お問い合わせ</a></li>
        </ul>
      </nav>
      <div class="mt-12 text-text-sub text-[10px] tracking-[0.3em] uppercase font-bold">
        <p>© 株式会社オリト ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: ブラウザ確認**

```bash
cd /Users/watanabewataru/code/株式会社オリト
npx serve v3 -p 3001
```

確認項目：
- Hero が 100vh でビューポートを埋める
- ドットグリッドが薄く見える
- Liquid Glass ナビが背景を透過している
- 見出し文字が1文字ずつスライドインする
- スクロールで `.reveal` 要素が出現する
- モバイル（幅375px）でハンバーガーメニューが動作する

- [ ] **Step 3: コミット**

```bash
cd /Users/watanabewataru/code/株式会社オリト
git add v3/index.html
git commit -m "feat: v3 index.html — Industrial Dark トップページを実装"
```

---

## Task 3: company.html（会社概要）

**Files:**
- Create: `v3/company.html`

**参考/company.html から流用するテキスト（変更禁止）:**
- Hero: `会社概要` / `こだわりを通じて、油圧分野の卓越性を追求し続けています。`
- テーブル: 社名 `株式会社オリト` / 代表者 `折戸　尭` / 設立 `yyyy年mm月dd日` / 資本金 `万円`
- 住所: `〒123-4567 東京都千代田区大手町 1-2-3 オリトビル 4F`
- ボタン: `Google マップで開く`
- Section: `会社データ` / `アクセス` / `オリト 本社`

- [ ] **Step 1: company.html を作成**

`v3/company.html`:
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>会社概要 - 株式会社オリト</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Sans+JP:wght@400;500;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet">
  <script src="css/tailwind-config.js"></script>
  <script src="https://cdn.tailwindcss.com?plugins=forms"></script>
  <link rel="stylesheet" href="css/common.css">
  <link rel="stylesheet" href="css/company.css">
</head>
<body class="bg-bg-base text-text-main">

<!-- Navbar（index.html と同一構造・active リンクのみ変更） -->
<div class="sticky top-0 z-50 px-6 md:px-12 lg:px-16 pt-4 pb-2 bg-bg-base/80" style="backdrop-filter:blur(8px);">
  <nav class="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
    <a href="index.html" class="text-2xl font-semibold tracking-tight text-white" style="font-family:'Inter',sans-serif;">ORITO</a>
    <div class="hidden md:flex items-center gap-8">
      <a href="index.html"   class="text-sm text-white/70 hover:text-white transition-colors">トップ</a>
      <a href="service.html" class="text-sm text-white/70 hover:text-white transition-colors">サービス</a>
      <a href="company.html" class="text-sm text-white border-b border-white/40 pb-0.5">会社概要</a>
      <a href="contact.html" class="text-sm text-white/70 hover:text-white transition-colors">お問い合わせ</a>
    </div>
    <div class="flex items-center gap-3">
      <a href="contact.html" class="hidden md:inline-block bg-white text-black px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors" style="font-family:'Inter',sans-serif;">お問い合わせ</a>
      <button data-hamburger class="md:hidden flex flex-col gap-1.5 p-2" aria-label="メニューを開く" aria-expanded="false">
        <span class="w-5 h-0.5 bg-white block"></span>
        <span class="w-5 h-0.5 bg-white block"></span>
        <span class="w-5 h-0.5 bg-white block"></span>
      </button>
    </div>
  </nav>
  <div class="mobile-nav liquid-glass mt-2 rounded-xl px-4 py-4">
    <ul class="space-y-3">
      <li><a href="index.html"   class="text-sm text-white/70">トップ</a></li>
      <li><a href="service.html" class="text-sm text-white/70">サービス</a></li>
      <li><a href="company.html" class="text-sm text-white">会社概要</a></li>
      <li><a href="contact.html" class="text-sm text-white/70">お問い合わせ</a></li>
    </ul>
  </div>
</div>

<main>

<!-- ページ Hero（60vh） -->
<section class="relative flex items-end overflow-hidden" style="min-height:60vh;">
  <div class="page-hero-bg" aria-hidden="true"></div>
  <div class="relative z-10 max-w-7xl mx-auto px-8 w-full pb-16 md:pb-20">
    <span class="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4 block" style="font-family:'Inter',sans-serif;">私たちについて</span>
    <h1 data-char-animate class="font-black mb-6 leading-tight" style="font-family:'Inter','Noto Sans JP',sans-serif;font-size:clamp(3rem,8vw,6rem);letter-spacing:-0.04em;">
      <span data-line="会社概要" class="block"></span>
    </h1>
    <p class="text-xl text-text-sub max-w-2xl leading-loose font-medium" data-fade-delay="600">
      こだわりを通じて、油圧分野の卓越性を追求し続けています。
    </p>
  </div>
</section>

<!-- 会社データ -->
<section class="section-surface py-golden-lg">
  <div class="max-w-7xl mx-auto px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-black tracking-wide mb-6 reveal">会社データ</h2>
      <div class="teal-divider reveal" data-delay="100"></div>
    </div>
    <div class="dark-card rounded-[3rem] max-w-4xl mx-auto overflow-hidden reveal">
      <div class="divide-y" style="border-color:rgba(255,255,255,0.06);">
        <div class="py-8 px-12 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <span class="text-xs font-bold text-text-sub tracking-[0.2em] uppercase" style="font-family:'Inter',sans-serif;">社名</span>
          <span class="md:col-span-2 text-xl font-bold">株式会社オリト</span>
        </div>
        <div class="py-8 px-12 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <span class="text-xs font-bold text-text-sub tracking-[0.2em] uppercase" style="font-family:'Inter',sans-serif;">代表者</span>
          <span class="md:col-span-2 text-xl">折戸　尭</span>
        </div>
        <div class="py-8 px-12 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <span class="text-xs font-bold text-text-sub tracking-[0.2em] uppercase" style="font-family:'Inter',sans-serif;">設立</span>
          <span class="md:col-span-2 text-xl">yyyy年mm月dd日</span>
        </div>
        <div class="py-8 px-12 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <span class="text-xs font-bold text-text-sub tracking-[0.2em] uppercase" style="font-family:'Inter',sans-serif;">資本金</span>
          <span class="md:col-span-2 text-xl">万円</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- アクセス -->
<section class="section-dark py-golden-lg">
  <div class="max-w-7xl mx-auto px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-black tracking-wide mb-6 reveal">アクセス</h2>
      <div class="teal-divider reveal" data-delay="100"></div>
    </div>
    <div class="dark-card rounded-[3rem] overflow-hidden max-w-5xl mx-auto reveal">
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="p-14 flex flex-col justify-center">
          <div class="flex items-center gap-5 mb-8">
            <div class="bg-primary/10 p-4 rounded-2xl">
              <span class="material-symbols-outlined text-primary scale-125">location_on</span>
            </div>
            <h3 class="text-2xl font-bold">オリト 本社</h3>
          </div>
          <p class="text-text-sub text-lg mb-10 leading-loose">
            〒123-4567 東京都千代田区大手町 1-2-3<br>
            オリトビル 4F
          </p>
          <a href="https://maps.google.com" target="_blank" rel="noopener"
             class="inline-flex items-center justify-center gap-3 bg-primary text-black px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all w-fit shadow-lg" style="font-family:'Inter',sans-serif;">
            <span class="material-symbols-outlined">map</span>
            Google マップで開く
          </a>
        </div>
        <div class="map-placeholder" style="min-height:400px;">
          <span class="material-symbols-outlined text-5xl mb-4">map</span>
          Map Area
        </div>
      </div>
    </div>
  </div>
</section>

</main>

<footer class="section-surface border-t border-white/5 py-16">
  <div class="max-w-7xl mx-auto px-8">
    <div class="flex flex-col items-center">
      <div class="text-2xl font-semibold tracking-[0.2em] text-primary mb-10" style="font-family:'Inter',sans-serif;">ORITO</div>
      <nav>
        <ul class="flex flex-wrap justify-center gap-10 text-center max-w-xl mx-auto">
          <li><a href="index.html"   class="text-sm text-text-sub hover:text-primary transition-colors font-bold tracking-wide">トップ</a></li>
          <li><a href="service.html" class="text-sm text-text-sub hover:text-primary transition-colors font-bold tracking-wide">サービス</a></li>
          <li><a href="company.html" class="text-sm text-white font-bold tracking-wide">会社概要</a></li>
          <li><a href="contact.html" class="text-sm text-text-sub hover:text-primary transition-colors font-bold tracking-wide">お問い合わせ</a></li>
        </ul>
      </nav>
      <div class="mt-12 text-text-sub text-[10px] tracking-[0.3em] uppercase font-bold">
        <p>© 株式会社オリト ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: ブラウザ確認**

```bash
open http://localhost:3001/company.html
```

確認項目：
- ページヒーローが 60vh で表示
- 「会社概要」が文字アニメーションする
- 会社データテーブルのボーダーが見える
- Google マップボタンのティールカラーが正しい

- [ ] **Step 3: コミット**

```bash
cd /Users/watanabewataru/code/株式会社オリト
git add v3/company.html
git commit -m "feat: v3 company.html — 会社概要ページを実装"
```

---

## Task 4: service.html（事業紹介）

**Files:**
- Create: `v3/service.html`

**参考/service.html から流用するテキスト（変更禁止）:**
- Hero ラベル: `事業紹介 / プロフェッショナル・ソリューション`
- Hero 見出し: `Service`
- Hero sub: `精密設計された油圧ソリューションを提供します。高圧ホースのアセンブリからカスタム機械加工まで、卓越した技術力で産業の基盤を支えます。`
- 3カード: ホース受託加工・油圧機器販売・技術サポート（index.html と同一テキスト）
- CTA: `システムの最適化をお手伝いします` / `技術相談やプロジェクトの個別見積りについては、当社のエンジニアリングスペシャリストまでお気軽にお問い合わせください。` / `お問い合わせ`

- [ ] **Step 1: service.html を作成**

`v3/service.html`:
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>事業紹介 - 株式会社オリト</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Sans+JP:wght@400;500;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet">
  <script src="css/tailwind-config.js"></script>
  <script src="https://cdn.tailwindcss.com?plugins=forms"></script>
  <link rel="stylesheet" href="css/common.css">
  <link rel="stylesheet" href="css/service.css">
</head>
<body class="bg-bg-base text-text-main">

<!-- Navbar -->
<div class="sticky top-0 z-50 px-6 md:px-12 lg:px-16 pt-4 pb-2 bg-bg-base/80" style="backdrop-filter:blur(8px);">
  <nav class="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
    <a href="index.html" class="text-2xl font-semibold tracking-tight text-white" style="font-family:'Inter',sans-serif;">ORITO</a>
    <div class="hidden md:flex items-center gap-8">
      <a href="index.html"   class="text-sm text-white/70 hover:text-white transition-colors">トップ</a>
      <a href="service.html" class="text-sm text-white border-b border-white/40 pb-0.5">サービス</a>
      <a href="company.html" class="text-sm text-white/70 hover:text-white transition-colors">会社概要</a>
      <a href="contact.html" class="text-sm text-white/70 hover:text-white transition-colors">お問い合わせ</a>
    </div>
    <div class="flex items-center gap-3">
      <a href="contact.html" class="hidden md:inline-block bg-white text-black px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors" style="font-family:'Inter',sans-serif;">お問い合わせ</a>
      <button data-hamburger class="md:hidden flex flex-col gap-1.5 p-2" aria-label="メニューを開く" aria-expanded="false">
        <span class="w-5 h-0.5 bg-white block"></span>
        <span class="w-5 h-0.5 bg-white block"></span>
        <span class="w-5 h-0.5 bg-white block"></span>
      </button>
    </div>
  </nav>
  <div class="mobile-nav liquid-glass mt-2 rounded-xl px-4 py-4">
    <ul class="space-y-3">
      <li><a href="index.html"   class="text-sm text-white/70">トップ</a></li>
      <li><a href="service.html" class="text-sm text-white">サービス</a></li>
      <li><a href="company.html" class="text-sm text-white/70">会社概要</a></li>
      <li><a href="contact.html" class="text-sm text-white/70">お問い合わせ</a></li>
    </ul>
  </div>
</div>

<main>

<!-- ページ Hero -->
<section class="relative flex items-end overflow-hidden" style="min-height:65vh;">
  <div class="page-hero-bg" aria-hidden="true"></div>
  <div class="relative z-10 max-w-7xl mx-auto px-8 w-full pb-16 md:pb-20">
    <span class="font-bold tracking-[0.4em] text-primary text-xs mb-6 block uppercase" style="font-family:'Inter',sans-serif;">事業紹介 / プロフェッショナル・ソリューション</span>
    <h1 data-char-animate class="font-black mb-8 leading-none" style="font-family:'Inter',sans-serif;font-size:clamp(4rem,12vw,9rem);letter-spacing:-0.04em;">
      <span data-line="Service" class="block"></span>
    </h1>
    <p class="text-xl text-text-sub leading-relaxed mb-10 tracking-wider font-medium max-w-2xl" data-fade-delay="400">
      精密設計された油圧ソリューションを提供します。高圧ホースのアセンブリからカスタム機械加工まで、卓越した技術力で産業の基盤を支えます。
    </p>
    <div class="flex items-center gap-6" data-fade-delay="700">
      <div class="h-px w-16 bg-primary"></div>
      <p class="text-xs text-text-sub font-bold uppercase tracking-[0.3em]" style="font-family:'Inter',sans-serif;">1978年創業、エンジニアリングの信頼性</p>
    </div>
  </div>
</section>

<!-- サービスカード -->
<section class="section-surface py-golden-xl">
  <div class="max-w-7xl mx-auto px-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">

      <div class="dark-card p-10 rounded-[2.5rem] reveal">
        <div class="card-icon w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
          <span class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings:'FILL' 1;">settings_input_component</span>
        </div>
        <h3 class="text-xl font-black mb-4 tracking-wide">ホース受託加工</h3>
        <p class="text-text-sub leading-relaxed text-sm font-medium tracking-wide">高圧ホースのアッセンブリ。特殊な口金や長尺ホースにも、熟練の技術者が一本一本丁寧に対応します。</p>
      </div>

      <div class="dark-card p-10 rounded-[2.5rem] reveal" data-delay="100">
        <div class="card-icon w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
          <span class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings:'FILL' 1;">shopping_cart</span>
        </div>
        <h3 class="text-xl font-black mb-4 tracking-wide">油圧機器販売</h3>
        <p class="text-text-sub leading-relaxed text-sm font-medium tracking-wide">油圧ポンプ、バルブ、継手など、国内外の主要メーカー製品を豊富にラインナップ。迅速な供給を実現します。</p>
      </div>

      <div class="dark-card p-10 rounded-[2.5rem] reveal" data-delay="200">
        <div class="card-icon w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
          <span class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings:'FILL' 1;">engineering</span>
        </div>
        <h3 class="text-xl font-black mb-4 tracking-wide">技術サポート</h3>
        <p class="text-text-sub leading-relaxed text-sm font-medium tracking-wide">機器の選定からトラブルシューティングまで。技術的な知見から、お客様の課題解決を全面的にバックアップ。</p>
      </div>

    </div>
  </div>
</section>

<!-- CTA -->
<section class="section-dark py-golden-xl px-8">
  <div class="max-w-7xl mx-auto">
    <div class="service-cta-bg rounded-[4rem] relative z-0 text-center px-8 py-20 md:py-28 reveal">
      <h2 class="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
        システムの最適化を<br class="hidden md:block">お手伝いします
      </h2>
      <p class="text-white/80 text-xl max-w-2xl mx-auto mb-14 tracking-wider leading-relaxed">
        技術相談やプロジェクトの個別見積りについては、当社のエンジニアリングスペシャリストまでお気軽にお問い合わせください。
      </p>
      <a href="contact.html" class="inline-block bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl tracking-widest" style="font-family:'Inter',sans-serif;">
        お問い合わせ
      </a>
    </div>
  </div>
</section>

</main>

<footer class="section-surface border-t border-white/5 py-16">
  <div class="max-w-7xl mx-auto px-8">
    <div class="flex flex-col items-center">
      <div class="text-2xl font-semibold tracking-[0.2em] text-primary mb-10" style="font-family:'Inter',sans-serif;">ORITO</div>
      <nav>
        <ul class="flex flex-wrap justify-center gap-10 text-center max-w-xl mx-auto">
          <li><a href="index.html"   class="text-sm text-text-sub hover:text-primary transition-colors font-bold tracking-wide">トップ</a></li>
          <li><a href="service.html" class="text-sm text-white font-bold tracking-wide">サービス</a></li>
          <li><a href="company.html" class="text-sm text-text-sub hover:text-primary transition-colors font-bold tracking-wide">会社概要</a></li>
          <li><a href="contact.html" class="text-sm text-text-sub hover:text-primary transition-colors font-bold tracking-wide">お問い合わせ</a></li>
        </ul>
      </nav>
      <div class="mt-12 text-text-sub text-[10px] tracking-[0.3em] uppercase font-bold">
        <p>© 株式会社オリト ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: ブラウザ確認**

```bash
open http://localhost:3001/service.html
```

確認項目：
- 「Service」英字見出しが大きく、文字アニメーションする
- 3カードがホバーでティールボーダーに光る
- CTA セクションのグラデーションが表示される

- [ ] **Step 3: コミット**

```bash
cd /Users/watanabewataru/code/株式会社オリト
git add v3/service.html
git commit -m "feat: v3 service.html — 事業紹介ページを実装"
```

---

## Task 5: contact.html（お問い合わせ）

**Files:**
- Create: `v3/contact.html`

**参考/contact.html から流用するテキスト（変更禁止）:**
- Hero ラベル: `お気軽にご連絡ください`
- Hero 見出し: `お問い合わせ`
- Hero sub: `高圧システムの技術仕様やカスタム油圧ソリューションについてのご相談など、当社のエンジニアリングチームがサポートいたします。`
- フィールドラベル: `お名前` / `貴社名` / `メールアドレス` / `電話番号` / `お問い合わせ件名` / `お問い合わせ内容`
- プレースホルダー: `山田 太郎` / `株式会社〇〇` / `contact@company.com` / `03-0000-0000` / `ご要望の詳細をご記入ください...`
- セレクト選択肢: `技術的なお問い合わせ` / `製品のお見積もり` / `メンテナンス・サポート` / `パートナーシップのご提案` / `その他`
- チェックボックス: `個人情報の取り扱いに関するプライバシーポリシーに同意します。`
- ボタン: `送信する`

- [ ] **Step 1: contact.html を作成**

`v3/contact.html`:
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>お問い合わせ - 株式会社オリト</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Sans+JP:wght@400;500;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet">
  <script src="css/tailwind-config.js"></script>
  <script src="https://cdn.tailwindcss.com?plugins=forms"></script>
  <link rel="stylesheet" href="css/common.css">
  <link rel="stylesheet" href="css/contact.css">
</head>
<body class="bg-bg-base text-text-main">

<!-- Navbar -->
<div class="sticky top-0 z-50 px-6 md:px-12 lg:px-16 pt-4 pb-2 bg-bg-base/80" style="backdrop-filter:blur(8px);">
  <nav class="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
    <a href="index.html" class="text-2xl font-semibold tracking-tight text-white" style="font-family:'Inter',sans-serif;">ORITO</a>
    <div class="hidden md:flex items-center gap-8">
      <a href="index.html"   class="text-sm text-white/70 hover:text-white transition-colors">トップ</a>
      <a href="service.html" class="text-sm text-white/70 hover:text-white transition-colors">サービス</a>
      <a href="company.html" class="text-sm text-white/70 hover:text-white transition-colors">会社概要</a>
      <a href="contact.html" class="text-sm text-white border-b border-white/40 pb-0.5">お問い合わせ</a>
    </div>
    <div class="flex items-center gap-3">
      <a href="contact.html" class="hidden md:inline-block bg-white text-black px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors" style="font-family:'Inter',sans-serif;">お問い合わせ</a>
      <button data-hamburger class="md:hidden flex flex-col gap-1.5 p-2" aria-label="メニューを開く" aria-expanded="false">
        <span class="w-5 h-0.5 bg-white block"></span>
        <span class="w-5 h-0.5 bg-white block"></span>
        <span class="w-5 h-0.5 bg-white block"></span>
      </button>
    </div>
  </nav>
  <div class="mobile-nav liquid-glass mt-2 rounded-xl px-4 py-4">
    <ul class="space-y-3">
      <li><a href="index.html"   class="text-sm text-white/70">トップ</a></li>
      <li><a href="service.html" class="text-sm text-white/70">サービス</a></li>
      <li><a href="company.html" class="text-sm text-white/70">会社概要</a></li>
      <li><a href="contact.html" class="text-sm text-white">お問い合わせ</a></li>
    </ul>
  </div>
</div>

<main class="min-h-screen">

<!-- ページ Hero -->
<section class="golden-pt pb-16 text-center relative overflow-hidden">
  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-80 bg-primary/5 rounded-full blur-3xl -z-10 opacity-60"></div>
  <div class="max-w-7xl mx-auto px-8">
    <span class="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4 block" style="font-family:'Inter',sans-serif;" data-fade-delay="0">お気軽にご連絡ください</span>
    <h1 data-char-animate class="font-black mb-6 leading-tight" style="font-family:'Inter','Noto Sans JP',sans-serif;font-size:clamp(2.5rem,7vw,5rem);letter-spacing:-0.04em;">
      <span data-line="お問い合わせ" class="block"></span>
    </h1>
    <p class="text-lg text-text-sub max-w-2xl mx-auto leading-[1.8] tracking-wider" data-fade-delay="600">
      高圧システムの技術仕様やカスタム油圧ソリューションについてのご相談など、当社のエンジニアリングチームがサポートいたします。
    </p>
  </div>
</section>

<!-- フォーム -->
<section class="golden-pb section-surface">
  <div class="max-w-7xl mx-auto px-8 flex justify-center">
    <div class="w-full max-w-4xl dark-card p-10 md:p-16 rounded-[3rem] -translate-y-10 reveal">
      <form class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">

        <!-- お名前 -->
        <div>
          <label class="contact-label">お名前</label>
          <input type="text" placeholder="山田 太郎" class="contact-input">
        </div>

        <!-- 貴社名 -->
        <div>
          <label class="contact-label">貴社名</label>
          <input type="text" placeholder="株式会社〇〇" class="contact-input">
        </div>

        <!-- メールアドレス -->
        <div>
          <label class="contact-label">メールアドレス</label>
          <input type="email" placeholder="contact@company.com" class="contact-input">
        </div>

        <!-- 電話番号 -->
        <div>
          <label class="contact-label">電話番号</label>
          <input type="tel" placeholder="03-0000-0000" class="contact-input">
        </div>

        <!-- お問い合わせ件名 -->
        <div class="md:col-span-2">
          <label class="contact-label">お問い合わせ件名</label>
          <select class="contact-input" style="cursor:pointer;">
            <option>技術的なお問い合わせ</option>
            <option>製品のお見積もり</option>
            <option>メンテナンス・サポート</option>
            <option>パートナーシップのご提案</option>
            <option>その他</option>
          </select>
        </div>

        <!-- お問い合わせ内容 -->
        <div class="md:col-span-2">
          <label class="contact-label">お問い合わせ内容</label>
          <textarea rows="6" placeholder="ご要望の詳細をご記入ください..." class="contact-input" style="height:auto;padding-top:1rem;padding-bottom:1rem;resize:none;"></textarea>
        </div>

        <!-- プライバシーポリシー -->
        <div class="md:col-span-2 py-4">
          <label class="flex items-start gap-4 cursor-pointer">
            <span class="relative flex-shrink-0 mt-0.5">
              <input type="checkbox" class="sr-only peer">
              <span class="custom-checkbox peer-checked:bg-primary peer-checked:border-primary">
                <span class="material-symbols-outlined text-black text-sm" style="font-size:1rem;line-height:1.5rem;display:none;">check</span>
              </span>
            </span>
            <span class="text-sm text-text-sub leading-[1.7] tracking-wider select-none">
              個人情報の取り扱いに関するプライバシーポリシーに同意します。
            </span>
          </label>
        </div>

        <!-- 送信ボタン -->
        <div class="md:col-span-2 flex justify-center pt-2">
          <button type="submit"
            class="w-full md:w-3/5 h-16 rounded-xl font-black text-lg tracking-widest uppercase flex items-center justify-center gap-3 transition-all hover:opacity-90 active:scale-95 shadow-xl"
            style="background:linear-gradient(135deg,#0f6765,#2dd4bf);color:#000;font-family:'Inter',sans-serif;">
            送信する
            <span class="material-symbols-outlined">send</span>
          </button>
        </div>

      </form>
    </div>
  </div>
</section>

</main>

<footer class="section-surface border-t border-white/5 py-16">
  <div class="max-w-7xl mx-auto px-8">
    <div class="flex flex-col items-center">
      <div class="text-2xl font-semibold tracking-[0.2em] text-primary mb-10" style="font-family:'Inter',sans-serif;">ORITO</div>
      <nav>
        <ul class="flex flex-wrap justify-center gap-10 text-center max-w-xl mx-auto">
          <li><a href="index.html"   class="text-sm text-text-sub hover:text-primary transition-colors font-bold tracking-wide">トップ</a></li>
          <li><a href="service.html" class="text-sm text-text-sub hover:text-primary transition-colors font-bold tracking-wide">サービス</a></li>
          <li><a href="company.html" class="text-sm text-text-sub hover:text-primary transition-colors font-bold tracking-wide">会社概要</a></li>
          <li><a href="contact.html" class="text-sm text-white font-bold tracking-wide">お問い合わせ</a></li>
        </ul>
      </nav>
      <div class="mt-12 text-text-sub text-[10px] tracking-[0.3em] uppercase font-bold">
        <p>© 株式会社オリト All Rights Reserved.</p>
      </div>
    </div>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: ブラウザ確認**

```bash
open http://localhost:3001/contact.html
```

確認項目：
- フォームフィールドがダーク背景で表示される
- フォーカス時にティールのリングが出る
- 送信ボタンがティールグラデーション

- [ ] **Step 3: コミット**

```bash
cd /Users/watanabewataru/code/株式会社オリト
git add v3/contact.html
git commit -m "feat: v3 contact.html — お問い合わせページを実装"
```

---

## Task 6: Final Verification & Integration Commit

**Files:** なし（確認のみ）

- [ ] **Step 1: 全ページリンク確認**

```bash
npx serve /Users/watanabewataru/code/株式会社オリト/v3 -p 3001
```

チェックリスト：
- `index.html` → 「サービス一覧」クリック → `service.html` に遷移
- `index.html` → 「会社概要を見る」クリック → `company.html` に遷移
- 全ページの「お問い合わせ」ナビリンク → `contact.html` に遷移
- 全ページフッターリンクが正しく動作する
- モバイル幅（375px）でナビが崩れない
- 旧バージョン（ルート `index.html`）が変わっていない

- [ ] **Step 2: 旧バージョン不変確認**

```bash
cd /Users/watanabewataru/code/株式会社オリト
git diff HEAD -- index.html company.html service.html contact.html
# 差分がゼロであることを確認
git diff HEAD -- v2/
# 差分がゼロであることを確認
```

Expected: 出力なし（差分ゼロ）

- [ ] **Step 3: 最終コミット**

```bash
cd /Users/watanabewataru/code/株式会社オリト
git add v3/
git status
git commit -m "feat: v3 完成 — Industrial Dark 全4ページ実装完了"
```

---

## Self-Review

**Spec coverage チェック:**
- [x] Liquid Glass ナビ → 全ページ共通ナビに実装
- [x] ヒーロー下部固定 → index.html の `flex flex-col justify-end`
- [x] 文字アニメーション → `data-char-animate` + `main.js`
- [x] ドットグリッド背景 → `common.css .hero-bg::after`
- [x] フルダークテーマ → `#080d0c` ベース全ページ
- [x] 参考/ テキスト遵守 → 各タスクに「変更禁止テキスト」明記
- [x] 旧バージョン不変 → Task 6 Step 2 で確認
- [x] カードホバー → `.dark-card` CSS
- [x] FadeIn → `data-fade-delay` + `main.js`
- [x] スクロール reveal → `.reveal` + IntersectionObserver

**Placeholder scan:** なし。全コードブロックは実装済み。

**Type consistency:** `data-char-animate` / `data-line` / `data-fade-delay` / `data-hamburger` / `.liquid-glass` / `.dark-card` / `.reveal` — 全タスクで一貫して使用。
