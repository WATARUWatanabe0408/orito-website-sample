# Ver.2 3バリアント 内ページ 実装計画（Phase 2）

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 株式会社オリト Ver.2 の3バリアント（dark / pop / scroll）に内ページ（company.html / service.html / contact.html）を追加し、各バリアントのデザインテーマを踏襲した完全なサイトを構成する。

**Architecture:** 各バリアントの既存 CSS（v2/*/css/style.css）に内ページ用スタイルを追記し、company / service / contact の HTML を作成する。Formspree エンドポイントは `https://formspree.io/f/xpwzgvqd` を使用（プレースホルダー、実際のエンドポイントに差し替え可）。

**Tech Stack:** HTML5, CSS3（既存カスタムプロパティを継承）, Vanilla JavaScript（既存 main.js を流用）, Formspree

---

## ファイル構成

```
v2/
├── dark/
│   ├── css/style.css     ← 内ページ用 CSS を末尾に追記
│   ├── company.html      ← 新規作成
│   ├── service.html      ← 新規作成
│   └── contact.html      ← 新規作成
├── pop/
│   ├── css/style.css     ← 内ページ用 CSS を末尾に追記
│   ├── company.html      ← 新規作成
│   ├── service.html      ← 新規作成
│   └── contact.html      ← 新規作成
└── scroll/
    ├── css/style.css     ← 内ページ用 CSS を末尾に追記
    ├── company.html      ← 新規作成
    ├── service.html      ← 新規作成
    └── contact.html      ← 新規作成
```

---

## Task 1: 🌑 dark バリアント — 内ページ

**Files:**
- Modify: `v2/dark/css/style.css`（末尾に追記）
- Create: `v2/dark/company.html`
- Create: `v2/dark/service.html`
- Create: `v2/dark/contact.html`

- [ ] **Step 1: `v2/dark/css/style.css` の末尾に内ページ用 CSS を追記**

```css

/* ================================================
   内ページ共通：ページヘッダー
================================================ */
.page-header {
  padding: 140px 0 64px;
  text-align: center;
  background: var(--bg-section);
  border-bottom: 1px solid var(--border);
}

.page-header h1 {
  font-size: 2.4rem;
  font-weight: 900;
  color: var(--primary);
  margin-bottom: 10px;
}

.page-header .page-en {
  font-size: 0.75rem;
  color: var(--muted);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

/* ================================================
   会社概要
================================================ */
.company-section { padding: 80px 0 100px; }

.company-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 64px;
}

.company-table tr { border-bottom: 1px solid var(--border); }

.company-table th {
  width: 180px;
  padding: 20px 24px;
  color: var(--primary);
  font-weight: 700;
  font-size: 0.875rem;
  vertical-align: top;
  white-space: nowrap;
}

.company-table td {
  padding: 20px 24px;
  color: var(--muted);
  font-size: 0.875rem;
  line-height: 1.9;
}

.maps-placeholder {
  width: 100%;
  height: 400px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  color: var(--muted);
  font-size: 0.875rem;
}

.maps-placeholder span { font-size: 2.5rem; }

/* ================================================
   事業内容（内ページ）
================================================ */
.service-page-section { padding: 80px 0 100px; }

.service-grid-2col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

/* ================================================
   お問い合わせ
================================================ */
.contact-section { padding: 80px 0 100px; }

.contact-form {
  max-width: 640px;
  margin: 0 auto;
}

.form-group { margin-bottom: 24px; }

.form-group label {
  display: block;
  font-size: 0.8rem;
  color: var(--muted);
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 0.05em;
}

.form-group input,
.form-group textarea {
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 14px 18px;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.form-group textarea {
  min-height: 160px;
  resize: vertical;
}

.form-note {
  font-size: 0.8rem;
  color: var(--muted);
  margin-bottom: 32px;
  line-height: 1.8;
}

.form-submit { text-align: center; }

@media (max-width: 767px) {
  .service-grid-2col { grid-template-columns: 1fr; }
  .company-table th { width: 100px; padding: 14px 12px; }
  .company-table td { padding: 14px 12px; }
}
```

- [ ] **Step 2: `v2/dark/company.html` を作成**

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

<section class="page-header">
  <h1>会社概要</h1>
  <p class="page-en">Company</p>
</section>

<section class="company-section">
  <div class="container">
    <table class="company-table">
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
          <td>代表取締役 氏名をここに入力</td>
        </tr>
        <tr>
          <th>設立</th>
          <td>設立年月をここに入力</td>
        </tr>
        <tr>
          <th>事業内容</th>
          <td>高圧ホース・口金・カプラ・継手類・油圧機器の卸販売<br>高圧ホース出張製作業務</td>
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
          <td>平日 9:00〜18:00（土日祝休み）</td>
        </tr>
      </tbody>
    </table>

    <div class="maps-placeholder">
      <span>🗺️</span>
      <p>Google Maps を埋め込む場所</p>
    </div>
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

- [ ] **Step 3: `v2/dark/service.html` を作成**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>事業内容｜株式会社オリト</title>
  <meta name="description" content="株式会社オリトの事業内容ページです。高圧ホース・油圧機器の卸販売から出張製作まで。">
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

<section class="page-header">
  <h1>事業内容</h1>
  <p class="page-en">Services</p>
</section>

<section class="service-page-section">
  <div class="container">
    <div class="service-grid-2col">
      <div class="service-card">
        <div class="service-card-icon">🔩</div>
        <h3>高圧ホース・口金・カプラ・スイベル・各種ホースの卸販売</h3>
        <p>高圧ホースおよびその接続部品（口金・カプラ・スイベル）など、幅広い製品を在庫しております。お客様のニーズに合わせた製品をご提供します。</p>
        <div class="card-glow"></div>
      </div>
      <div class="service-card">
        <div class="service-card-icon">⚙️</div>
        <h3>高圧ホースアッセンブリーマシーンの販売</h3>
        <p>高圧ホースを製作するためのアッセンブリーマシーン（ホース加工機）の販売を行っております。製作設備の導入をご検討の方はお気軽にご相談ください。</p>
        <div class="card-glow"></div>
      </div>
      <div class="service-card">
        <div class="service-card-icon">🔗</div>
        <h3>各種継手類の卸販売</h3>
        <p>配管・油圧システムに必要な各種継手類を幅広く取り扱っています。規格品から特殊品まで対応しますのでご相談ください。</p>
        <div class="card-glow"></div>
      </div>
      <div class="service-card">
        <div class="service-card-icon">🚗</div>
        <h3>高圧ホースの出張製作業務</h3>
        <p>お客様の現場へ直接出向き、高圧ホースをその場で製作するサービスです。ラインを止めることなく、迅速にホースの交換・製作が可能です。</p>
        <div class="card-glow"></div>
      </div>
      <div class="service-card">
        <div class="service-card-icon">💧</div>
        <h3>洗浄用ホース・ノズル他の卸販売</h3>
        <p>工場内の洗浄作業に使用するホース・ノズル等の関連資材を取り扱っています。用途に応じた適切な製品をご提案します。</p>
        <div class="card-glow"></div>
      </div>
      <div class="service-card">
        <div class="service-card-icon">🔧</div>
        <h3>油圧ボールバルブ・チェックバルブ・圧力計他油圧機器の販売</h3>
        <p>油圧システムに必要なバルブ類・圧力計などの油圧機器を幅広く取り揃えております。</p>
        <div class="card-glow"></div>
      </div>
    </div>
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

- [ ] **Step 4: `v2/dark/contact.html` を作成**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>お問い合わせ｜株式会社オリト</title>
  <meta name="description" content="株式会社オリトへのお問い合わせはこちらから。高圧ホース・油圧機器に関するご質問・お見積もりをお気軽にどうぞ。">
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

<section class="page-header">
  <h1>お問い合わせ</h1>
  <p class="page-en">Contact</p>
</section>

<section class="contact-section">
  <div class="container">
    <form class="contact-form" action="https://formspree.io/f/xpwzgvqd" method="POST">
      <p class="form-note">高圧ホース・油圧機器に関するご質問・お見積もりなど、お気軽にお問い合わせください。<br>お問い合わせ内容を確認後、担当者よりご連絡いたします。</p>
      <div class="form-group">
        <label for="company">会社名</label>
        <input type="text" id="company" name="company" placeholder="株式会社〇〇">
      </div>
      <div class="form-group">
        <label for="name">お名前 <span style="color:var(--accent3)">*</span></label>
        <input type="text" id="name" name="name" required placeholder="山田 太郎">
      </div>
      <div class="form-group">
        <label for="email">メールアドレス <span style="color:var(--accent3)">*</span></label>
        <input type="email" id="email" name="email" required placeholder="example@email.com">
      </div>
      <div class="form-group">
        <label for="message">お問い合わせ内容 <span style="color:var(--accent3)">*</span></label>
        <textarea id="message" name="message" required placeholder="お問い合わせ内容をご記入ください"></textarea>
      </div>
      <div class="form-submit">
        <button type="submit" class="btn-primary">送信する →</button>
      </div>
    </form>
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

**注意:** `--accent3` は dark CSS に定義されていないため、contact.html の必須マーク `*` のインラインスタイルは `color:#ef4444` に変更してください。

---

## Task 2: 🌈 pop バリアント — 内ページ

**Files:**
- Modify: `v2/pop/css/style.css`（末尾に追記）
- Create: `v2/pop/company.html`
- Create: `v2/pop/service.html`
- Create: `v2/pop/contact.html`

- [ ] **Step 1: `v2/pop/css/style.css` の末尾に内ページ用 CSS を追記**

```css

/* ================================================
   内ページ共通：ページヘッダー
================================================ */
.page-header {
  padding: 140px 0 64px;
  text-align: center;
  background: var(--primary);
  position: relative;
  overflow: hidden;
}

.page-header h1 {
  font-size: 2.4rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 8px;
  position: relative;
  z-index: 1;
}

.page-header .page-en {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.75);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 700;
  position: relative;
  z-index: 1;
}

.page-header-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
}

.page-header-circle--1 { width: 200px; height: 200px; top: -60px; right: -40px; }
.page-header-circle--2 { width: 120px; height: 120px; bottom: -30px; left: -20px; }

/* ================================================
   会社概要
================================================ */
.company-section { padding: 80px 0 100px; }

.company-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 64px;
}

.company-table tr {
  border-bottom: 3px solid var(--bg);
}

.company-table th {
  width: 180px;
  padding: 20px 24px;
  color: var(--primary);
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 0.875rem;
  background: var(--bg-section);
  vertical-align: top;
  white-space: nowrap;
}

.company-table td {
  padding: 20px 24px;
  color: var(--muted);
  font-size: 0.875rem;
  line-height: 1.9;
  background: var(--card-bg);
}

.maps-placeholder {
  width: 100%;
  height: 400px;
  background: var(--card-bg);
  border: 3px solid var(--text-dark);
  border-radius: 20px;
  box-shadow: 5px 5px 0 var(--text-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  color: var(--muted);
  font-size: 0.875rem;
}

.maps-placeholder span { font-size: 2.5rem; }

/* ================================================
   事業内容（内ページ）
================================================ */
.service-page-section { padding: 80px 0 100px; }

.service-grid-2col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.service-card-pop {
  background: var(--card-bg);
  border: 3px solid var(--text-dark);
  border-radius: 20px;
  padding: 32px 24px;
  box-shadow: 4px 4px 0 var(--text-dark);
  transition: transform 0.15s, box-shadow 0.15s;
}

.service-card-pop:hover {
  transform: translate(-3px, -3px);
  box-shadow: 7px 7px 0 var(--text-dark);
}

.service-card-pop .icon { font-size: 2.5rem; margin-bottom: 14px; }

.service-card-pop h3 {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 900;
  color: var(--text-dark);
  margin-bottom: 10px;
}

.service-card-pop p {
  font-size: 0.85rem;
  color: var(--muted);
  line-height: 1.85;
}

/* ================================================
   お問い合わせ
================================================ */
.contact-section { padding: 80px 0 100px; }

.contact-form {
  max-width: 640px;
  margin: 0 auto;
}

.form-group { margin-bottom: 24px; }

.form-group label {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  color: var(--text-dark);
  font-weight: 900;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  background: var(--card-bg);
  border: 3px solid var(--text-dark);
  border-radius: 12px;
  padding: 14px 18px;
  color: var(--text-dark);
  font-family: var(--font-body);
  font-size: 0.9rem;
  box-shadow: 3px 3px 0 var(--text-dark);
  transition: box-shadow 0.15s, transform 0.15s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  box-shadow: 5px 5px 0 var(--primary);
  border-color: var(--primary);
  transform: translate(-1px, -1px);
}

.form-group textarea {
  min-height: 160px;
  resize: vertical;
}

.form-note {
  font-size: 0.8rem;
  color: var(--muted);
  margin-bottom: 32px;
  line-height: 1.8;
}

.form-submit { text-align: center; }

@media (max-width: 767px) {
  .service-grid-2col { grid-template-columns: 1fr; }
  .company-table th { width: 100px; padding: 12px 10px; font-size: 0.8rem; }
  .company-table td { padding: 12px 10px; }
}
```

- [ ] **Step 2: `v2/pop/company.html` を作成**

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

<section class="page-header">
  <div class="page-header-circle page-header-circle--1"></div>
  <div class="page-header-circle page-header-circle--2"></div>
  <h1>会社概要</h1>
  <p class="page-en">Company</p>
</section>

<section class="company-section">
  <div class="container">
    <table class="company-table">
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
          <td>代表取締役 氏名をここに入力</td>
        </tr>
        <tr>
          <th>設立</th>
          <td>設立年月をここに入力</td>
        </tr>
        <tr>
          <th>事業内容</th>
          <td>高圧ホース・口金・カプラ・継手類・油圧機器の卸販売<br>高圧ホース出張製作業務</td>
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
          <td>平日 9:00〜18:00（土日祝休み）</td>
        </tr>
      </tbody>
    </table>

    <div class="maps-placeholder">
      <span>🗺️</span>
      <p>Google Maps を埋め込む場所</p>
    </div>
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

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: `v2/pop/service.html` を作成**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>事業内容｜株式会社オリト</title>
  <meta name="description" content="株式会社オリトの事業内容ページです。高圧ホース・油圧機器の卸販売から出張製作まで。">
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

<section class="page-header">
  <div class="page-header-circle page-header-circle--1"></div>
  <div class="page-header-circle page-header-circle--2"></div>
  <h1>事業内容</h1>
  <p class="page-en">Services</p>
</section>

<section class="service-page-section">
  <div class="container">
    <div class="service-grid-2col">
      <div class="service-card-pop">
        <div class="icon">🔩</div>
        <h3>高圧ホース・口金・カプラ・スイベル・各種ホースの卸販売</h3>
        <p>高圧ホースおよびその接続部品（口金・カプラ・スイベル）など、幅広い製品を在庫しております。お客様のニーズに合わせた製品をご提供します。</p>
      </div>
      <div class="service-card-pop">
        <div class="icon">⚙️</div>
        <h3>高圧ホースアッセンブリーマシーンの販売</h3>
        <p>高圧ホースを製作するためのアッセンブリーマシーン（ホース加工機）の販売を行っております。製作設備の導入をご検討の方はお気軽にご相談ください。</p>
      </div>
      <div class="service-card-pop">
        <div class="icon">🔗</div>
        <h3>各種継手類の卸販売</h3>
        <p>配管・油圧システムに必要な各種継手類を幅広く取り扱っています。規格品から特殊品まで対応しますのでご相談ください。</p>
      </div>
      <div class="service-card-pop">
        <div class="icon">🚗</div>
        <h3>高圧ホースの出張製作業務</h3>
        <p>お客様の現場へ直接出向き、高圧ホースをその場で製作するサービスです。ラインを止めることなく、迅速にホースの交換・製作が可能です。</p>
      </div>
      <div class="service-card-pop">
        <div class="icon">💧</div>
        <h3>洗浄用ホース・ノズル他の卸販売</h3>
        <p>工場内の洗浄作業に使用するホース・ノズル等の関連資材を取り扱っています。用途に応じた適切な製品をご提案します。</p>
      </div>
      <div class="service-card-pop">
        <div class="icon">🔧</div>
        <h3>油圧ボールバルブ・チェックバルブ・圧力計他油圧機器の販売</h3>
        <p>油圧システムに必要なバルブ類・圧力計などの油圧機器を幅広く取り揃えております。</p>
      </div>
    </div>
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

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 4: `v2/pop/contact.html` を作成**

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

<section class="page-header">
  <div class="page-header-circle page-header-circle--1"></div>
  <div class="page-header-circle page-header-circle--2"></div>
  <h1>お問い合わせ</h1>
  <p class="page-en">Contact</p>
</section>

<section class="contact-section">
  <div class="container">
    <form class="contact-form" action="https://formspree.io/f/xpwzgvqd" method="POST">
      <p class="form-note">高圧ホース・油圧機器に関するご質問・お見積もりなど、お気軽にお問い合わせください！<br>お問い合わせ内容を確認後、担当者よりご連絡いたします。</p>
      <div class="form-group">
        <label for="company">会社名</label>
        <input type="text" id="company" name="company" placeholder="株式会社〇〇">
      </div>
      <div class="form-group">
        <label for="name">お名前 <span style="color:#ef4444">*</span></label>
        <input type="text" id="name" name="name" required placeholder="山田 太郎">
      </div>
      <div class="form-group">
        <label for="email">メールアドレス <span style="color:#ef4444">*</span></label>
        <input type="email" id="email" name="email" required placeholder="example@email.com">
      </div>
      <div class="form-group">
        <label for="message">お問い合わせ内容 <span style="color:#ef4444">*</span></label>
        <textarea id="message" name="message" required placeholder="お問い合わせ内容をご記入ください"></textarea>
      </div>
      <div class="form-submit">
        <button type="submit" class="btn-primary">送信する！</button>
      </div>
    </form>
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

<script src="js/main.js"></script>
</body>
</html>
```

---

## Task 3: 📖 scroll バリアント — 内ページ

**Files:**
- Modify: `v2/scroll/css/style.css`（末尾に追記）
- Create: `v2/scroll/company.html`
- Create: `v2/scroll/service.html`
- Create: `v2/scroll/contact.html`

- [ ] **Step 1: `v2/scroll/css/style.css` の末尾に内ページ用 CSS を追記**

```css

/* ================================================
   内ページ共通：ページヘッダー
================================================ */
.page-header {
  padding: 140px 0 64px;
  text-align: center;
  background: var(--bg-white);
  border-bottom: 2px solid var(--border);
  position: relative;
}

.page-header h1 {
  font-size: 2.4rem;
  font-weight: 900;
  color: var(--text);
  margin-bottom: 10px;
}

.page-header .page-en {
  font-size: 0.75rem;
  color: var(--primary);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 700;
}

.page-header-line {
  width: 40px;
  height: 3px;
  background: var(--primary);
  margin: 16px auto 0;
}

/* ================================================
   会社概要
================================================ */
.company-section { padding: 80px 0 100px; }

.company-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 64px;
}

.company-table tr { border-bottom: 2px solid var(--border); }

.company-table th {
  width: 180px;
  padding: 20px 24px;
  color: var(--primary);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.875rem;
  vertical-align: top;
  white-space: nowrap;
}

.company-table td {
  padding: 20px 24px;
  color: var(--muted);
  font-size: 0.875rem;
  line-height: 1.9;
}

.maps-placeholder {
  width: 100%;
  height: 400px;
  background: var(--bg-white);
  border: 2px solid var(--border);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  color: var(--muted);
  font-size: 0.875rem;
  box-shadow: 0 10px 40px rgba(14,165,233,0.06);
}

.maps-placeholder span { font-size: 2.5rem; }

/* ================================================
   事業内容（内ページ）
================================================ */
.service-page-section { padding: 80px 0 100px; }

.service-grid-2col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.service-card-scroll {
  background: var(--bg-white);
  border: 2px solid var(--border);
  border-radius: 16px;
  padding: 32px 24px;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(14,165,233,0.05);
}

.service-card-scroll:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(14,165,233,0.12);
  border-color: var(--primary);
}

.service-card-scroll .icon { font-size: 2.5rem; margin-bottom: 14px; }

.service-card-scroll h3 {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 10px;
}

.service-card-scroll p {
  font-size: 0.85rem;
  color: var(--muted);
  line-height: 1.85;
}

/* ================================================
   お問い合わせ
================================================ */
.contact-section { padding: 80px 0 100px; }

.contact-form {
  max-width: 640px;
  margin: 0 auto;
}

.form-group { margin-bottom: 24px; }

.form-group label {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: var(--text);
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 0.03em;
}

.form-group input,
.form-group textarea {
  width: 100%;
  background: var(--bg-white);
  border: 2px solid var(--border);
  border-radius: 8px;
  padding: 14px 18px;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.9rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(14,165,233,0.12);
}

.form-group textarea {
  min-height: 160px;
  resize: vertical;
}

.form-note {
  font-size: 0.8rem;
  color: var(--muted);
  margin-bottom: 32px;
  line-height: 1.8;
}

.form-submit { text-align: center; }

@media (max-width: 767px) {
  .service-grid-2col { grid-template-columns: 1fr; }
  .company-table th { width: 100px; padding: 12px 10px; font-size: 0.8rem; }
  .company-table td { padding: 12px 10px; }
}
```

- [ ] **Step 2: `v2/scroll/company.html` を作成**

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

<section class="page-header">
  <h1>会社概要</h1>
  <p class="page-en">Company</p>
  <div class="page-header-line"></div>
</section>

<section class="company-section">
  <div class="container">
    <table class="company-table">
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
          <td>代表取締役 氏名をここに入力</td>
        </tr>
        <tr>
          <th>設立</th>
          <td>設立年月をここに入力</td>
        </tr>
        <tr>
          <th>事業内容</th>
          <td>高圧ホース・口金・カプラ・継手類・油圧機器の卸販売<br>高圧ホース出張製作業務</td>
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
          <td>平日 9:00〜18:00（土日祝休み）</td>
        </tr>
      </tbody>
    </table>

    <div class="maps-placeholder">
      <span>🗺️</span>
      <p>Google Maps を埋め込む場所</p>
    </div>
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

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: `v2/scroll/service.html` を作成**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>事業内容｜株式会社オリト</title>
  <meta name="description" content="株式会社オリトの事業内容ページです。高圧ホース・油圧機器の卸販売から出張製作まで。">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

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

<section class="page-header">
  <h1>事業内容</h1>
  <p class="page-en">Services</p>
  <div class="page-header-line"></div>
</section>

<section class="service-page-section">
  <div class="container">
    <div class="service-grid-2col">
      <div class="service-card-scroll">
        <div class="icon">🔩</div>
        <h3>高圧ホース・口金・カプラ・スイベル・各種ホースの卸販売</h3>
        <p>高圧ホースおよびその接続部品（口金・カプラ・スイベル）など、幅広い製品を在庫しております。お客様のニーズに合わせた製品をご提供します。</p>
      </div>
      <div class="service-card-scroll">
        <div class="icon">⚙️</div>
        <h3>高圧ホースアッセンブリーマシーンの販売</h3>
        <p>高圧ホースを製作するためのアッセンブリーマシーン（ホース加工機）の販売を行っております。製作設備の導入をご検討の方はお気軽にご相談ください。</p>
      </div>
      <div class="service-card-scroll">
        <div class="icon">🔗</div>
        <h3>各種継手類の卸販売</h3>
        <p>配管・油圧システムに必要な各種継手類を幅広く取り扱っています。規格品から特殊品まで対応しますのでご相談ください。</p>
      </div>
      <div class="service-card-scroll">
        <div class="icon">🚗</div>
        <h3>高圧ホースの出張製作業務</h3>
        <p>お客様の現場へ直接出向き、高圧ホースをその場で製作するサービスです。ラインを止めることなく、迅速にホースの交換・製作が可能です。</p>
      </div>
      <div class="service-card-scroll">
        <div class="icon">💧</div>
        <h3>洗浄用ホース・ノズル他の卸販売</h3>
        <p>工場内の洗浄作業に使用するホース・ノズル等の関連資材を取り扱っています。用途に応じた適切な製品をご提案します。</p>
      </div>
      <div class="service-card-scroll">
        <div class="icon">🔧</div>
        <h3>油圧ボールバルブ・チェックバルブ・圧力計他油圧機器の販売</h3>
        <p>油圧システムに必要なバルブ類・圧力計などの油圧機器を幅広く取り揃えております。</p>
      </div>
    </div>
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

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 4: `v2/scroll/contact.html` を作成**

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

<section class="page-header">
  <h1>お問い合わせ</h1>
  <p class="page-en">Contact</p>
  <div class="page-header-line"></div>
</section>

<section class="contact-section">
  <div class="container">
    <form class="contact-form" action="https://formspree.io/f/xpwzgvqd" method="POST">
      <p class="form-note">高圧ホース・油圧機器に関するご質問・お見積もりなど、お気軽にお問い合わせください。<br>お問い合わせ内容を確認後、担当者よりご連絡いたします。</p>
      <div class="form-group">
        <label for="company">会社名</label>
        <input type="text" id="company" name="company" placeholder="株式会社〇〇">
      </div>
      <div class="form-group">
        <label for="name">お名前 <span style="color:var(--primary)">*</span></label>
        <input type="text" id="name" name="name" required placeholder="山田 太郎">
      </div>
      <div class="form-group">
        <label for="email">メールアドレス <span style="color:var(--primary)">*</span></label>
        <input type="email" id="email" name="email" required placeholder="example@email.com">
      </div>
      <div class="form-group">
        <label for="message">お問い合わせ内容 <span style="color:var(--primary)">*</span></label>
        <textarea id="message" name="message" required placeholder="お問い合わせ内容をご記入ください"></textarea>
      </div>
      <div class="form-submit">
        <button type="submit" class="btn-primary">送信する</button>
      </div>
    </form>
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

<script src="js/main.js"></script>
</body>
</html>
```

---

## 最終確認

- [ ] `http://localhost:8080/v2/dark/company.html` — dark 会社概要
- [ ] `http://localhost:8080/v2/dark/service.html` — dark 事業内容
- [ ] `http://localhost:8080/v2/dark/contact.html` — dark お問い合わせ
- [ ] `http://localhost:8080/v2/pop/company.html` — pop 会社概要
- [ ] `http://localhost:8080/v2/pop/service.html` — pop 事業内容
- [ ] `http://localhost:8080/v2/pop/contact.html` — pop お問い合わせ
- [ ] `http://localhost:8080/v2/scroll/company.html` — scroll 会社概要
- [ ] `http://localhost:8080/v2/scroll/service.html` — scroll 事業内容
- [ ] `http://localhost:8080/v2/scroll/contact.html` — scroll お問い合わせ
