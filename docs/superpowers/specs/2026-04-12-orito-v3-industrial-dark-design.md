# 設計書：株式会社オリト v3 "Industrial Dark"

**作成日:** 2026-04-12
**ステータス:** 承認済み
**ベーステキスト:** `参考/` 配下のHTML（テキスト内容を完全遵守）
**旧バージョン:** ルート（v1）・`v2/`（dark/pop/scroll）は変更なし

---

## 概要

VEX Hero プロジェクトのデザイン言語（Liquid Glass ナビ・ビューポート下部ヒーロー・文字単位アニメーション）を、オリトの産業B2B文脈に適合させたフルダークテーマの新バージョン。写真・動画素材は使用せず、CSS グラデーション＋SVG 六角形グリッドで背景を構成する。

---

## ディレクトリ構成

```
v3/
  index.html
  company.html
  service.html
  contact.html
  css/
    tailwind-config.js   # ダーク用カラートークン定義
    common.css           # Liquid Glass・reveal・共通スタイル
    top.css
    company.css
    service.css
    contact.css
  js/
    main.js              # 文字アニメーション・IntersectionObserver
```

旧バージョン（ルート・`v2/`）は一切変更しない。

---

## 技術スタック

- **HTML/CSS/JS:** バニラ（ビルドツール不要）
- **CSS フレームワーク:** Tailwind CSS CDN（`参考/` と同方式）
- **フォント:** Inter（見出し英字）+ Noto Sans JP（日本語） — Google Fonts
- **アイコン:** Material Symbols Outlined（`参考/` と同じ）
- **設定ファイル:** `css/tailwind-config.js`（`window.tailwind.config` で CDN に注入）

---

## カラーシステム

| CSS 変数 | 値 | 用途 |
|---|---|---|
| `--bg-base` | `#080d0c` | ページ全体の背景 |
| `--bg-surface` | `#0e1614` | カード・セクション背景 |
| `--bg-card` | `#162220` | カード内部 |
| `--primary` | `#2dd4bf` | メインアクセント（ティール・高輝度） |
| `--primary-dim` | `#0f6765` | サブアクセント |
| `--text-primary` | `#f0fffe` | メインテキスト |
| `--text-secondary` | `#8ba8a5` | サブテキスト |
| `--border` | `rgba(255,255,255,0.08)` | カードボーダー |

`参考/` の `#0f6765` をベースに、ダーク背景での視認性のためメインアクセントを `#2dd4bf` に引き上げる。

---

## タイポグラフィ

| 用途 | フォント | ウェイト | 特記 |
|---|---|---|---|
| 英字見出し・ロゴ | Inter | 600 | `letter-spacing: -0.04em` |
| 日本語見出し | Noto Sans JP | 800 | `letter-spacing: 0.08em` |
| 本文 | Noto Sans JP | 400 | `letter-spacing: 0.05em` |
| ラベル・バッジ | Noto Sans JP | 700 | `letter-spacing: 0.15em` |

---

## 共通コンポーネント

### Liquid Glass ナビゲーション

```css
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
  background: linear-gradient(180deg,
    rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 20%,
    rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.1) 80%, rgba(255,255,255,0.3) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

ナビ構成：
- 左：ロゴ「ORITO」（Inter、text-2xl）
- 中央（md以上）：トップ / サービス / 会社概要 / お問い合わせ
- 右：「お問い合わせ」ボタン（白背景・黒文字）

### 六角形グリッド背景

インライン SVG の `<pattern>` で六角形を定義、Hero 全面に敷き詰め。
`opacity: 0.04`（ティール色・控えめ）。産業・精密機器のイメージ。

---

## ページ別設計

### トップページ（index.html）

**Hero セクション（`100vh`）**
- 背景：`#080d0c → #0f6765` 放射グラデーション＋SVG 六角形グリッド
- コンテンツはビューポート下部（`flex flex-col justify-end pb-12`）に固定
- 2カラムレイアウト（lg以上）：
  - 左：文字アニメーション見出し「油圧と高圧ホースの／スペシャリスト」+ サブテキスト + ボタン2つ（「選ばれる理由」/ 「サービス一覧」）
  - 右：Liquid Glass タグ「即納・即製。現場の課題を迅速に解決します。」
- テキスト：`参考/index.html` Hero セクションのものをそのまま使用

**事業内容セクション**
- 背景 `#0e1614`、3カラムカード
  1. ホース受託加工
  2. 油圧機器販売
  3. 技術サポート
- カード：`#162220`、ティールアイコン、ホバーでボーダーがティールに光る

**選ばれる理由セクション（`id="strength"`）**
- 左：3つの強み（圧倒的なスピード / 豊富な在庫力 / 専門特化の知識）
- 右：CSS のみの装飾（ティールグラデーション円・blur）

**会社案内セクション**
- ダークカード内にテキスト + 「会社概要を見る」リンク
- 写真エリアはティールグラデーション＋パターン装飾（画像なし）

**CTA 帯**
- `#0f6765 → #2dd4bf` グラデーション背景、「まずはお気軽にご相談ください」

---

### 会社概要（company.html）

**Hero（`60vh`）**
- 同じ六角形グリッド背景、コンテンツ下部固定
- 見出し「会社概要」フェードイン、サブテキスト

**会社データ**
- `#162220` カード内、罫線区切りテーブル（社名 / 代表者 / 設立 / 資本金）

**アクセス**
- 左：住所 + 「Google マップで開く」ボタン
- 右：地図プレースホルダー（ダーク）

---

### 事業紹介（service.html）

**Hero（`60vh`）**
- 英字大見出し「Service」（Inter、文字アニメーション）
- ラベル「事業紹介 / プロフェッショナル・ソリューション」
- サブテキスト

**サービスカード 3枚**
- ホース受託加工 / 油圧機器販売 / 技術サポート

**CTA**
- 「システムの最適化をお手伝いします」+ お問い合わせボタン

---

### お問い合わせ（contact.html）

**Hero（`40vh`）**
- 「お問い合わせ」見出し + ラベル + サブテキスト

**フォーム**
- ダーク `#162220` カード内
- フィールド：お名前 / 貴社名 / メールアドレス / 電話番号 / お問い合わせ件名（セレクト）/ お問い合わせ内容 / プライバシーポリシー同意チェック
- 入力フィールド：`#0e1614` 背景、フォーカスでティールリング
- 送信ボタン：ティールグラデーション

---

## アニメーション仕様

### Hero 文字アニメーション（バニラ JS）

```
初期状態: opacity: 0, translateX(-18px)
開始遅延: 200ms（ページロード後）
文字間遅延: charDelay = 30ms
遅延計算: lineIndex × lineLength × charDelay + charIndex × charDelay
トランジション: 500ms ease
スペース: \u00A0（ノーブレークスペース）に変換
```

### FadeIn（サブテキスト・ボタン・タグ）

```
opacity: 0 → 1
遅延: 800ms（サブテキスト）/ 1200ms（ボタン）/ 1400ms（右タグ）
duration: 1000ms
実装: setTimeout + classList.add でクラス切り替え
```

### スクロールアニメーション（`.reveal`）

```
初期: opacity: 0, translateY(32px)
発火: IntersectionObserver（threshold: 0.1）
トランジション: opacity 0.8s ease, transform 0.8s ease
```

### カードホバー

```
border-color → #2dd4bf（0.3s）
アイコン: scale(1.1)（0.5s）
```

### ボタン

- プライマリ（白）：`hover:bg-gray-100`
- セカンダリ（Liquid Glass）：`hover:bg-white hover:text-black`（0.2s）

---

## テキスト遵守ルール

`参考/` 配下の各 HTML ファイルに記載されているすべてのテキスト（見出し・本文・ラベル・フッターコピーライト等）を**一字一句変更しない**。変更可能なのはマークアップ構造・クラス・スタイルのみ。
