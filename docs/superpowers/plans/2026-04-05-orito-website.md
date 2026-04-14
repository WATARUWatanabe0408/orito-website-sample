# 株式会社オリト コーポレートサイト 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 株式会社オリト（高圧ホース・油圧機器卸販売）のコーポレートサイトを4ページ構成で構築する。

**Architecture:** バニラHTML/CSS/JSによる静的サイト。共通ヘッダー・フッターは各HTMLに直接記述。CSSカスタムプロパティでテーマカラーを一元管理。アニメーションはIntersection Observer APIで実装。

**Tech Stack:** HTML5, CSS3（カスタムプロパティ）, Vanilla JavaScript（ES6+）, Google Fonts, Formspree（フォーム送信）

---

## Task 1: プロジェクト基盤の構築

**Files:**
- Create: `css/style.css`
- Create: `js/main.js`
- Create: `index.html`（シェルのみ）

- [ ] **Step 1: ディレクトリを作成**

```bash
mkdir -p css js images
```

- [ ] **Step 2: `css/style.css` を作成（リセット・変数・基本スタイル）**

```css
@charset "utf-8";

/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap');

/* CSS カスタムプロパティ */
:root {
  --color-primary: #3B7DD8;
  --color-accent: #F97316;
  --color-bg: #F5F7FA;
  --color-text: #333333;
  --color-white: #ffffff;
  --color-border: #e2e8f0;
  --font-heading: 'M PLUS Rounded 1c', sans-serif;
  --font-body: 'Noto Sans JP', sans-serif;
  --max-width: 1100px;
  --space-section: 80px;
}

/* リセット */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

/* ベース */
body {
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.8;
  color: var(--color-text);
  background: var(--color-bg);
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  line-height: 1.4;
}

/* コンテナ */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

/* セクション共通 */
.section {
  padding: var(--space-section) 0;
}

/* セクション見出し */
.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-primary);
  text-align: center;
  margin-bottom: 8px;
}

.section-subtitle {
  text-align: center;
  color: #888;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 48px;
}

/* ボタン */
.btn {
  display: inline-block;
  padding: 14px 36px;
  border-radius: 50px;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: none;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.btn-primary {
  background: var(--color-accent);
  color: var(--color-white);
}

.btn-outline {
  background: transparent;
  color: var(--color-white);
  border: 2px solid var(--color-white);
}

/* スクロールアニメーション用 */
.fade-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ページヘッダー（内ページ共通） */
.page-header {
  background: var(--color-primary);
  color: var(--color-white);
  text-align: center;
  padding: 60px 24px;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 800;
}

.page-header p {
  margin-top: 8px;
  opacity: 0.85;
  font-size: 0.9rem;
}

/* レスポンシブ */
@media (max-width: 767px) {
  :root {
    --space-section: 48px;
  }
  .section-title { font-size: 1.5rem; }
}
```

- [ ] **Step 3: `js/main.js` を作成（スケルトン）**

```javascript
// =============================================
// Intersection Observer でスクロールアニメーション
// =============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// =============================================
// ハンバーガーメニュー
// =============================================
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.header-nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-open');
    nav.classList.toggle('is-open');
    document.body.classList.toggle('noscroll');
  });

  // ナビリンクをクリックしたらメニューを閉じる
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-open');
      nav.classList.remove('is-open');
      document.body.classList.remove('noscroll');
    });
  });
}
```

- [ ] **Step 4: Gitリポジトリを初期化してコミット**

```bash
git init
git add css/style.css js/main.js
git commit -m "feat: プロジェクト基盤（CSS・JS）を作成"
```

---

## Task 2: ヘッダー・フッター共通HTML

**Files:**
- Create: `index.html`（ヘッダー・フッターのみ）
- Modify: `css/style.css`（ヘッダー・フッタースタイル追記）

- [ ] **Step 1: `index.html` を作成（ヘッダー・フッター込みシェル）**

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

<!-- ヘッダー -->
<header class="header" id="header">
  <div class="container header-inner">
    <a href="index.html" class="header-logo">
      <span class="logo-text">株式会社オリト</span>
    </a>
    <button class="hamburger" aria-label="メニューを開く">
      <span></span><span></span><span></span>
    </button>
    <nav class="header-nav">
      <ul>
        <li><a href="company.html">会社概要</a></li>
        <li><a href="service.html">事業内容</a></li>
        <li><a href="contact.html" class="nav-contact">お問い合わせ</a></li>
      </ul>
    </nav>
  </div>
</header>

<!-- メインコンテンツ（後のタスクで追加） -->
<main>
</main>

<!-- フッター -->
<footer class="footer">
  <div class="container footer-inner">
    <p class="footer-name">株式会社オリト</p>
    <p class="footer-address">〒000-0000 住所をここに入れる</p>
    <p class="footer-tel">TEL: 000-0000-0000</p>
  </div>
  <div class="footer-copy">
    <p>Copyright &copy; 株式会社オリト All Rights Reserved.</p>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: `css/style.css` にヘッダー・フッタースタイルを追記**

```css
/* ================================================
   ヘッダー
================================================ */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--color-white);
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  z-index: 100;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}

.header-logo .logo-text {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--color-primary);
}

.header-nav ul {
  display: flex;
  gap: 32px;
  align-items: center;
}

.header-nav a {
  font-weight: 500;
  font-size: 0.95rem;
  color: var(--color-text);
  transition: color 0.2s;
}

.header-nav a:hover { color: var(--color-primary); }

.nav-contact {
  background: var(--color-primary);
  color: var(--color-white) !important;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 700 !important;
  transition: background 0.2s !important;
}

.nav-contact:hover {
  background: var(--color-accent) !important;
  color: var(--color-white) !important;
}

/* ハンバーガー */
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
  background: var(--color-text);
  transition: transform 0.3s, opacity 0.3s;
}

.hamburger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.is-open span:nth-child(2) { opacity: 0; }
.hamburger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

body.noscroll { overflow: hidden; }

/* ================================================
   フッター
================================================ */
.footer {
  background: var(--color-primary);
  color: var(--color-white);
  padding: 40px 0 0;
  margin-top: 80px;
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 32px;
  padding-bottom: 32px;
}

.footer-name {
  width: 100%;
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
}

.footer-address,
.footer-tel {
  font-size: 0.875rem;
  opacity: 0.85;
}

.footer-copy {
  border-top: 1px solid rgba(255,255,255,0.2);
  text-align: center;
  padding: 16px 24px;
  font-size: 0.75rem;
  opacity: 0.7;
}

/* ================================================
   レスポンシブ（ヘッダー）
================================================ */
@media (max-width: 767px) {
  .hamburger { display: flex; }

  .header-nav {
    display: none;
    position: fixed;
    top: 68px;
    left: 0;
    width: 100%;
    height: calc(100vh - 68px);
    background: var(--color-white);
    padding: 32px 24px;
  }

  .header-nav.is-open { display: block; }

  .header-nav ul {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }

  .header-nav a { font-size: 1.1rem; }

  .footer-inner { flex-direction: column; gap: 6px; }
}
```

- [ ] **Step 3: ブラウザで確認**

```bash
python3 -m http.server 8080
```

`http://localhost:8080` を開き以下を確認:
- ヘッダーが画面上部に固定表示されている
- ナビリンクが右側に並んでいる
- 「お問い合わせ」ボタンが青色の丸ボタンになっている
- スマホ幅（767px以下）でハンバーガーアイコンが表示される
- ハンバーガーをクリックするとメニューが開閉する
- フッターが青背景で表示されている

- [ ] **Step 4: コミット**

```bash
git add index.html css/style.css
git commit -m "feat: ヘッダー・フッター共通コンポーネントを実装"
```

---

## Task 3: トップページ ヒーローセクション

**Files:**
- Modify: `index.html`（`<main>` 内にヒーローHTML追加）
- Modify: `css/style.css`（ヒーロースタイル追記）

- [ ] **Step 1: `index.html` の `<main>` 内にヒーローHTMLを追加**

`<main>` タグの内側を以下に置き換える:

```html
<main>

<!-- ヒーロー -->
<section class="hero">
  <div class="container hero-inner">
    <div class="hero-text">
      <p class="hero-tag">高圧ホース・油圧機器の専門商社</p>
      <h1 class="hero-title">現場を支える<br>確かな製品を、<br>迅速にお届けします。</h1>
      <p class="hero-desc">高圧ホース・口金・カプラ・継手類・油圧機器の卸販売から<br>出張製作まで、オリトにお任せください。</p>
      <a href="contact.html" class="btn btn-primary">お問い合わせはこちら</a>
    </div>
    <div class="hero-illust">
      <!-- イラスト素材入手後に <img> タグで差し替え -->
      <div class="hero-illust-placeholder"></div>
    </div>
  </div>
</section>

</main>
```

- [ ] **Step 2: `css/style.css` にヒーロースタイルを追記**

```css
/* ================================================
   ヒーロー
================================================ */
.hero {
  padding-top: 68px; /* ヘッダー分のオフセット */
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: var(--color-white);
  overflow: hidden;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

.hero-tag {
  display: inline-block;
  background: #EBF2FF;
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 700;
  padding: 4px 14px;
  border-radius: 50px;
  margin-bottom: 20px;
  letter-spacing: 0.05em;
}

.hero-title {
  font-size: 2.6rem;
  font-weight: 800;
  line-height: 1.3;
  color: var(--color-text);
  margin-bottom: 20px;
}

.hero-desc {
  font-size: 0.95rem;
  line-height: 1.9;
  color: #666;
  margin-bottom: 32px;
}

.hero-illust {
  animation: heroFadeIn 0.9s ease forwards;
}

.hero-illust-placeholder {
  width: 100%;
  aspect-ratio: 1;
  max-width: 460px;
  background: #EBF2FF;
  border-radius: 24px;
  margin: 0 auto;
}

@keyframes heroFadeIn {
  from { opacity: 0; transform: translateX(30px); }
  to   { opacity: 1; transform: translateX(0); }
}

@media (max-width: 767px) {
  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .hero-title { font-size: 1.8rem; }
  .hero-illust { order: -1; }
  .hero-illust-placeholder { max-width: 260px; }
}
```

- [ ] **Step 3: ブラウザで確認**

- ヒーローが画面いっぱいに表示されている
- 左にテキスト・右に青いプレースホルダーが並んでいる
- スマホ幅でイラストが上・テキストが下の縦積みになる
- イラストがフェードインアニメーションする

- [ ] **Step 4: コミット**

```bash
git add index.html css/style.css
git commit -m "feat: トップページ ヒーローセクションを実装"
```

---

## Task 4: トップページ 3ポイント・事業カード・CTAセクション

**Files:**
- Modify: `index.html`（ヒーロー下のセクション追加）
- Modify: `css/style.css`（スタイル追記）

- [ ] **Step 1: `index.html` のヒーロー `</section>` の直後に追加**

```html
<!-- 3つのポイント -->
<section class="section points">
  <div class="container">
    <h2 class="section-title fade-up">オリトの強み</h2>
    <p class="section-subtitle fade-up">Our Strengths</p>
    <div class="points-grid">
      <div class="point-item fade-up">
        <div class="point-icon">🔧</div>
        <h3>豊富な在庫</h3>
        <p>高圧ホース・口金・カプラ・継手類を幅広く在庫。急ぎのご注文にも対応します。</p>
      </div>
      <div class="point-item fade-up">
        <div class="point-icon">🚗</div>
        <h3>出張製作サービス</h3>
        <p>現地での高圧ホース製作に対応。設備を止めずにその場でホースを製作します。</p>
      </div>
      <div class="point-item fade-up">
        <div class="point-icon">📦</div>
        <h3>迅速な納品</h3>
        <p>お客様のお急ぎに迅速に対応。安定供給で生産ラインをサポートします。</p>
      </div>
    </div>
  </div>
</section>

<!-- 事業内容ひとこと紹介 -->
<section class="section services-top" style="background: var(--color-white);">
  <div class="container">
    <h2 class="section-title fade-up">事業内容</h2>
    <p class="section-subtitle fade-up">Services</p>
    <div class="services-grid">
      <div class="service-card fade-up">
        <div class="service-card-icon">🔩</div>
        <h3>高圧ホース・各種部材の卸販売</h3>
        <p>口金・カプラ・スイベル・継手類など幅広い製品を取り扱っています。</p>
      </div>
      <div class="service-card fade-up">
        <div class="service-card-icon">⚙️</div>
        <h3>アッセンブリーマシーン販売</h3>
        <p>高圧ホースアッセンブリーマシーンの販売を行っています。</p>
      </div>
      <div class="service-card fade-up">
        <div class="service-card-icon">🛠️</div>
        <h3>高圧ホース出張製作</h3>
        <p>現地でのホース製作に対応。現場のニーズに合わせて柔軟に対応します。</p>
      </div>
    </div>
    <div style="text-align:center; margin-top: 40px;">
      <a href="service.html" class="btn btn-primary fade-up">事業内容をもっと見る</a>
    </div>
  </div>
</section>

<!-- CTA帯 -->
<section class="cta-band">
  <div class="container">
    <h2 class="fade-up">まずはお気軽にご相談ください</h2>
    <p class="fade-up">高圧ホース・油圧機器に関するご質問・お見積もりはお気軽にどうぞ。</p>
    <a href="contact.html" class="btn btn-outline fade-up">お問い合わせはこちら</a>
  </div>
</section>
```

- [ ] **Step 2: `css/style.css` にスタイルを追記**

```css
/* ================================================
   3ポイント
================================================ */
.points { background: var(--color-bg); }

.points-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.point-item {
  background: var(--color-white);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.point-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.point-item h3 {
  font-size: 1.1rem;
  color: var(--color-primary);
  margin-bottom: 12px;
}

.point-item p { font-size: 0.9rem; color: #555; }

/* ================================================
   事業カード（トップ）
================================================ */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.service-card {
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.service-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 8px 24px rgba(59,125,216,0.12);
}

.service-card-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.service-card h3 {
  font-size: 1rem;
  color: var(--color-text);
  margin-bottom: 12px;
}

.service-card p { font-size: 0.875rem; color: #666; }

/* ================================================
   CTA帯
================================================ */
.cta-band {
  background: var(--color-primary);
  color: var(--color-white);
  text-align: center;
  padding: 64px 24px;
}

.cta-band h2 {
  font-size: 1.8rem;
  margin-bottom: 16px;
}

.cta-band p {
  opacity: 0.85;
  margin-bottom: 32px;
  font-size: 0.95rem;
}

/* レスポンシブ */
@media (max-width: 767px) {
  .points-grid,
  .services-grid { grid-template-columns: 1fr; }
  .cta-band h2 { font-size: 1.4rem; }
}
```

- [ ] **Step 3: ブラウザで確認**

- 3ポイントセクションがカード3列で表示される
- 事業カード3列が表示される
- CTA帯が青背景で表示される
- スクロールするとカードがフェードアップする
- スマホ幅で各グリッドが1列になる

- [ ] **Step 4: コミット**

```bash
git add index.html css/style.css
git commit -m "feat: トップページ 3ポイント・事業カード・CTAセクションを実装"
```

---

## Task 5: 会社概要ページ（company.html）

**Files:**
- Create: `company.html`
- Modify: `css/style.css`（会社概要スタイル追記）

- [ ] **Step 1: `company.html` を作成**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>会社概要｜株式会社オリト</title>
  <meta name="description" content="株式会社オリトの会社概要ページです。">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="header" id="header">
  <div class="container header-inner">
    <a href="index.html" class="header-logo">
      <span class="logo-text">株式会社オリト</span>
    </a>
    <button class="hamburger" aria-label="メニューを開く">
      <span></span><span></span><span></span>
    </button>
    <nav class="header-nav">
      <ul>
        <li><a href="company.html">会社概要</a></li>
        <li><a href="service.html">事業内容</a></li>
        <li><a href="contact.html" class="nav-contact">お問い合わせ</a></li>
      </ul>
    </nav>
  </div>
</header>

<main style="padding-top: 68px;">

  <div class="page-header">
    <h1>会社概要</h1>
    <p>Company Profile</p>
  </div>

  <section class="section">
    <div class="container">

      <table class="company-table fade-up">
        <tbody>
          <tr>
            <th>会社名</th>
            <td>株式会社オリト</td>
          </tr>
          <tr>
            <th>所在地</th>
            <td>〒000-0000<br>住所をここに入力</td>
          </tr>
          <tr>
            <th>代表者</th>
            <td>代表者名をここに入力</td>
          </tr>
          <tr>
            <th>設立</th>
            <td>設立年月をここに入力</td>
          </tr>
          <tr>
            <th>電話番号</th>
            <td>000-0000-0000</td>
          </tr>
          <tr>
            <th>FAX</th>
            <td>000-0000-0000</td>
          </tr>
          <tr>
            <th>営業時間</th>
            <td>営業時間をここに入力</td>
          </tr>
          <tr>
            <th>事業内容</th>
            <td>
              高圧ホース・口金・カプラ・スイベル・各種ホースの卸販売<br>
              高圧ホースアッセンブリーマシーンの販売<br>
              各種継手類の卸販売<br>
              高圧ホースの出張製作業務<br>
              洗浄用ホース・ノズル他の卸販売<br>
              油圧ボールバルブ・チェックバルブ・圧力計他油圧機器の販売
            </td>
          </tr>
        </tbody>
      </table>

      <div class="map-area fade-up">
        <h2 class="section-title" style="margin-bottom: 24px;">アクセス</h2>
        <div class="map-wrap">
          <!-- Google Maps埋め込みコード：住所確定後にiframeに差し替える -->
          <div class="map-placeholder">Google Maps をここに埋め込む</div>
        </div>
      </div>

    </div>
  </section>

</main>

<footer class="footer">
  <div class="container footer-inner">
    <p class="footer-name">株式会社オリト</p>
    <p class="footer-address">〒000-0000 住所をここに入れる</p>
    <p class="footer-tel">TEL: 000-0000-0000</p>
  </div>
  <div class="footer-copy">
    <p>Copyright &copy; 株式会社オリト All Rights Reserved.</p>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: `css/style.css` に会社概要スタイルを追記**

```css
/* ================================================
   会社概要テーブル
================================================ */
.company-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 64px;
}

.company-table th,
.company-table td {
  padding: 18px 20px;
  border-bottom: 1px solid var(--color-border);
  vertical-align: top;
  font-size: 0.95rem;
  line-height: 1.8;
}

.company-table th {
  width: 160px;
  font-weight: 700;
  color: var(--color-primary);
  white-space: nowrap;
}

/* アクセス・地図 */
.map-area { margin-top: 40px; }

.map-wrap {
  border-radius: 16px;
  overflow: hidden;
  margin-top: 24px;
}

.map-wrap iframe {
  width: 100%;
  height: 400px;
  border: none;
  display: block;
}

.map-placeholder {
  width: 100%;
  height: 400px;
  background: #E2E8F0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  border-radius: 16px;
}

@media (max-width: 767px) {
  .company-table th { width: 100px; }
  .company-table th,
  .company-table td { padding: 14px 12px; }
}
```

- [ ] **Step 3: ブラウザで確認**

`http://localhost:8080/company.html` を開き確認:
- ページヘッダーが青背景で「会社概要」と表示される
- 会社情報テーブルが表示される
- 地図プレースホルダーが表示される
- スクロールでフェードアップする

- [ ] **Step 4: コミット**

```bash
git add company.html css/style.css
git commit -m "feat: 会社概要ページを実装"
```

---

## Task 6: 事業内容ページ（service.html）

**Files:**
- Create: `service.html`
- Modify: `css/style.css`（事業カードスタイル追記）

- [ ] **Step 1: `service.html` を作成**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>事業内容｜株式会社オリト</title>
  <meta name="description" content="株式会社オリトの事業内容。高圧ホース・油圧機器の卸販売から出張製作まで。">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="header" id="header">
  <div class="container header-inner">
    <a href="index.html" class="header-logo">
      <span class="logo-text">株式会社オリト</span>
    </a>
    <button class="hamburger" aria-label="メニューを開く">
      <span></span><span></span><span></span>
    </button>
    <nav class="header-nav">
      <ul>
        <li><a href="company.html">会社概要</a></li>
        <li><a href="service.html">事業内容</a></li>
        <li><a href="contact.html" class="nav-contact">お問い合わせ</a></li>
      </ul>
    </nav>
  </div>
</header>

<main style="padding-top: 68px;">

  <div class="page-header">
    <h1>事業内容</h1>
    <p>Services</p>
  </div>

  <section class="section">
    <div class="container">
      <div class="service-detail-grid">

        <article class="service-detail-card fade-up">
          <div class="sdc-icon">🔩</div>
          <div class="sdc-body">
            <h2>高圧ホース・口金・カプラ・スイベル・各種ホースの卸販売</h2>
            <p>高圧ホースをはじめ、口金・カプラ・スイベルなど各種部材を幅広く取り揃えております。工場・製造業のお客様のニーズに応じた製品をご提供します。</p>
          </div>
        </article>

        <article class="service-detail-card fade-up">
          <div class="sdc-icon">⚙️</div>
          <div class="sdc-body">
            <h2>高圧ホースアッセンブリーマシーンの販売</h2>
            <p>高圧ホースの製作に必要なアッセンブリーマシーンの販売を行っております。導入に関するご相談もお気軽にどうぞ。</p>
          </div>
        </article>

        <article class="service-detail-card fade-up">
          <div class="sdc-icon">🔗</div>
          <div class="sdc-body">
            <h2>各種継手類の卸販売</h2>
            <p>配管・油圧システムに必要な各種継手類を幅広く取り扱っております。規格・サイズに関するご相談もお受けします。</p>
          </div>
        </article>

        <article class="service-detail-card fade-up">
          <div class="sdc-icon">🚗</div>
          <div class="sdc-body">
            <h2>高圧ホースの出張製作業務</h2>
            <p>お客様の現場へ出向き、高圧ホースをその場で製作するサービスです。ラインを止めずに対応できるため、緊急時にも安心です。</p>
          </div>
        </article>

        <article class="service-detail-card fade-up">
          <div class="sdc-icon">💧</div>
          <div class="sdc-body">
            <h2>洗浄用ホース・ノズル他の卸販売</h2>
            <p>工場内の洗浄作業に使用するホース・ノズル等の関連資材を取り扱っております。</p>
          </div>
        </article>

        <article class="service-detail-card fade-up">
          <div class="sdc-icon">🔧</div>
          <div class="sdc-body">
            <h2>油圧ボールバルブ・チェックバルブ・圧力計他油圧機器の販売</h2>
            <p>油圧システムに必要なバルブ類・圧力計などの油圧機器を取り揃えております。</p>
          </div>
        </article>

      </div>
    </div>
  </section>

  <section class="cta-band">
    <div class="container">
      <h2 class="fade-up">ご不明な点はお気軽にご相談ください</h2>
      <p class="fade-up">製品の在庫・規格・価格など、何でもお問い合わせください。</p>
      <a href="contact.html" class="btn btn-outline fade-up">お問い合わせはこちら</a>
    </div>
  </section>

</main>

<footer class="footer">
  <div class="container footer-inner">
    <p class="footer-name">株式会社オリト</p>
    <p class="footer-address">〒000-0000 住所をここに入れる</p>
    <p class="footer-tel">TEL: 000-0000-0000</p>
  </div>
  <div class="footer-copy">
    <p>Copyright &copy; 株式会社オリト All Rights Reserved.</p>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: `css/style.css` に事業カード詳細スタイルを追記**

```css
/* ================================================
   事業カード詳細（service.html）
================================================ */
.service-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.service-detail-card {
  display: flex;
  gap: 20px;
  background: var(--color-white);
  border-radius: 16px;
  padding: 28px 24px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  transition: box-shadow 0.2s;
}

.service-detail-card:hover {
  box-shadow: 0 8px 28px rgba(59,125,216,0.12);
}

.sdc-icon {
  font-size: 2.2rem;
  flex-shrink: 0;
  line-height: 1;
  margin-top: 4px;
}

.sdc-body h2 {
  font-size: 1rem;
  color: var(--color-primary);
  margin-bottom: 10px;
}

.sdc-body p {
  font-size: 0.875rem;
  color: #555;
  line-height: 1.8;
}

@media (max-width: 767px) {
  .service-detail-grid { grid-template-columns: 1fr; }
  .service-detail-card { flex-direction: column; gap: 12px; }
}
```

- [ ] **Step 3: ブラウザで確認**

`http://localhost:8080/service.html` を開き確認:
- 事業カードが2列6枚表示される
- スクロールでカードがフェードアップする
- ページ下部にCTA帯が表示される
- スマホ幅で1列に切り替わる

- [ ] **Step 4: コミット**

```bash
git add service.html css/style.css
git commit -m "feat: 事業内容ページを実装"
```

---

## Task 7: お問い合わせページ（contact.html）

**Files:**
- Create: `contact.html`
- Modify: `css/style.css`（フォームスタイル追記）

> **事前作業:** Formspree（https://formspree.io）でアカウントを作成し、フォームを新規作成してエンドポイントURL（`https://formspree.io/f/xxxxxxxx`）を取得しておく。

- [ ] **Step 1: `contact.html` を作成**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>お問い合わせ｜株式会社オリト</title>
  <meta name="description" content="株式会社オリトへのお問い合わせはこちらから。">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="header" id="header">
  <div class="container header-inner">
    <a href="index.html" class="header-logo">
      <span class="logo-text">株式会社オリト</span>
    </a>
    <button class="hamburger" aria-label="メニューを開く">
      <span></span><span></span><span></span>
    </button>
    <nav class="header-nav">
      <ul>
        <li><a href="company.html">会社概要</a></li>
        <li><a href="service.html">事業内容</a></li>
        <li><a href="contact.html" class="nav-contact">お問い合わせ</a></li>
      </ul>
    </nav>
  </div>
</header>

<main style="padding-top: 68px;">

  <div class="page-header">
    <h1>お問い合わせ</h1>
    <p>Contact</p>
  </div>

  <section class="section">
    <div class="container">
      <div class="contact-wrap">
        <p class="contact-lead fade-up">製品のお見積もり・在庫確認・出張製作のご依頼など、お気軽にお問い合わせください。</p>

        <!-- action の URL を Formspree のエンドポイントに差し替える -->
        <form class="contact-form fade-up" action="https://formspree.io/f/xxxxxxxx" method="POST">

          <div class="form-group">
            <label for="company">会社名</label>
            <input type="text" id="company" name="company" placeholder="例：株式会社〇〇">
          </div>

          <div class="form-group">
            <label for="name">お名前 <span class="required">必須</span></label>
            <input type="text" id="name" name="name" required placeholder="例：山田 太郎">
          </div>

          <div class="form-group">
            <label for="email">メールアドレス <span class="required">必須</span></label>
            <input type="email" id="email" name="email" required placeholder="例：example@email.com">
          </div>

          <div class="form-group">
            <label for="message">お問い合わせ内容 <span class="required">必須</span></label>
            <textarea id="message" name="message" required rows="7" placeholder="お問い合わせ内容をご記入ください"></textarea>
          </div>

          <div class="form-submit">
            <button type="submit" class="btn btn-primary">送信する</button>
          </div>

        </form>
      </div>
    </div>
  </section>

</main>

<footer class="footer">
  <div class="container footer-inner">
    <p class="footer-name">株式会社オリト</p>
    <p class="footer-address">〒000-0000 住所をここに入れる</p>
    <p class="footer-tel">TEL: 000-0000-0000</p>
  </div>
  <div class="footer-copy">
    <p>Copyright &copy; 株式会社オリト All Rights Reserved.</p>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: `css/style.css` にフォームスタイルを追記**

```css
/* ================================================
   お問い合わせフォーム
================================================ */
.contact-wrap {
  max-width: 680px;
  margin: 0 auto;
}

.contact-lead {
  text-align: center;
  margin-bottom: 40px;
  color: #555;
  line-height: 1.8;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-weight: 700;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.required {
  background: var(--color-accent);
  color: var(--color-white);
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 8px;
  font-weight: 700;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid var(--color-border);
  border-radius: 10px;
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-text);
  background: var(--color-white);
  transition: border-color 0.2s;
  outline: none;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--color-primary);
}

.form-group textarea { resize: vertical; }

.form-submit {
  text-align: center;
  margin-top: 32px;
}
```

- [ ] **Step 3: ブラウザで確認**

`http://localhost:8080/contact.html` を開き確認:
- フォームが中央揃えで表示される
- 必須ラベルがオレンジで表示される
- 入力欄にフォーカスすると青いボーダーになる
- 送信ボタンが表示される

- [ ] **Step 4: コミット**

```bash
git add contact.html css/style.css
git commit -m "feat: お問い合わせページを実装"
```

---

## Task 8: 全ページ最終調整

**Files:**
- Modify: `index.html`, `company.html`, `service.html`, `contact.html`（meta情報・住所等を実際の情報に差し替え）
- Modify: `contact.html`（FormspreeエンドポイントURLを実際のものに差し替え）
- Modify: `company.html`（Google Maps iframeを実際のものに差し替え）

- [ ] **Step 1: 実際の会社情報を各ファイルに入力**

以下を全ページの該当箇所に反映:
- 住所（`〒000-0000 住所をここに入れる`）
- 電話番号（`000-0000-0000`）
- 代表者名
- 設立年月
- FAX番号
- 営業時間

- [ ] **Step 2: Formspree URLを差し替え**

`contact.html` の `action="https://formspree.io/f/xxxxxxxx"` を実際のエンドポイントに変更。

- [ ] **Step 3: Google Maps iframeを差し替え**

`company.html` の `.map-placeholder` を実際のiframeコードに置き換え:

```html
<div class="map-wrap">
  <iframe
    src="（Google MapsのiframeソースURL）"
    allowfullscreen
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade">
  </iframe>
</div>
```

- [ ] **Step 4: イラスト素材を配置**

`images/` フォルダに素材を配置し、各ページの `<img>` タグを差し替え:
- ヒーローのプレースホルダー（`.hero-illust-placeholder`）を `<img src="images/hero.png" alt="...">` に変更
- 各事業カードのアイコン絵文字をイラスト画像に差し替え（任意）

- [ ] **Step 5: ブラウザで全ページ動作確認**

- 全4ページのリンクが正常に動作する
- ハンバーガーメニューが開閉する
- スクロールアニメーションが動作する
- フォームを送信してメールが届く（Formspree確認）
- スマホ幅（375px）でレイアウトが崩れない

- [ ] **Step 6: 最終コミット**

```bash
git add .
git commit -m "feat: 会社情報・Google Maps・イラスト素材を差し替えて完成"
```
