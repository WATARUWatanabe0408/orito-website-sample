# Handoff: 株式会社オリト コーポレートサイト

## 概要

株式会社オリト（高圧ホース・油圧機器の卸売販売・B2B商社）のコーポレートサイト 5ページ分のデザインリファレンス。

- 目的: 会社ブランディング + 問い合わせ獲得（B2B）
- 対象ユーザー: 製鉄／建機／造船／プラント現場の購買・技術ご担当者

## このデザインファイルについて

このバンドルに含まれる HTML/CSS/JS は **デザインリファレンス**（意図する見た目と挙動を示すプロトタイプ）です。**そのまま本番に投入するためのコードではありません**。

タスクは、対象コードベースの既存環境（バニラ HTML/CSS でも、React/Vue 等の SPA でも）にこの HTML デザインを再構築することです。CLAUDE.md のとおりバニラ HTML/CSS/JS で進める前提ですが、新しい環境に移植する場合も、既存パターン・ライブラリを使ってこのデザインを忠実に再現してください。

## フィデリティ

**ハイフィデリティ（hifi）** — 色・タイポ・余白・インタラクションすべて確定済み。ピクセル単位で再現してください。

## サイト構成

```
index.html       トップ        ヒーロー・3 Pillars・事業 3 カード・Stats・CTA
company.html     会社概要      会社情報テーブル・沿革タイムライン・アクセス
service.html     事業内容      6 事業カード（2 カラム）・4 ステップ業務フロー
contact.html     お問い合わせ  連絡情報パネル・問い合わせフォーム（Formspree）
privacy.html     プライバシー  TOC + 9 セクション本文
```

共通パーツ: 上部バナー / グローバルナビ / ハンバーガーメニュー（≤960px）/ CTA 帯 / フッター。

---

## デザイントークン

### Color

| 役割 | 値 | 使用 |
|---|---|---|
| `--c-black` | `#111111` | プライマリテキスト・ボタン・ダーク面 |
| `--c-white` | `#FFFFFF` | ページ背景 |
| `--c-snow` | `#FAFAFA` | サブ背景（淡） |
| `--c-surface` | `#F5F5F5` | カード/入力背景 |
| `--c-hover` | `#E5E5E5` | ホバー / divider |
| `--c-border` | `#CACACB` | ボーダー |
| `--c-text` | `#111111` | 本文 |
| `--c-text-2` | `#707072` | 補助テキスト |
| `--c-text-3` | `#9E9EA0` | 無効テキスト |
| `--c-accent` | `#F97316` | CTA / 強調（オレンジ） |
| `--c-accent-deep` | `#E25C00` | アクセントホバー |
| `--c-link` | `#1151FF` | テキストリンク |
| `--c-error` | `#D30005` | エラー |
| `--c-success` | `#007D48` | 成功 |

**運用ルール**: UI はモノクロ（黒/白/グレー）+ オレンジアクセントのみ。青はリンクテキスト専用。グラデーション・シャドウは使わない（フラットエレベーション）。

### Typography

Google Fonts から `Anton` / `M PLUS Rounded 1c` (500/700/800) / `Noto Sans JP` (400/500/700) / `JetBrains Mono` (400/500) を読み込み。

| トークン | フォント |
|---|---|
| `--f-display` | Anton, "M PLUS Rounded 1c", Helvetica, Arial — 巨大英字 uppercase 専用 |
| `--f-display-jp` | M PLUS Rounded 1c, Hiragino Kaku Gothic ProN — 日本語見出し |
| `--f-body` | Noto Sans JP, Hiragino Kaku Gothic ProN — 本文 |
| `--f-mono` | JetBrains Mono — eyebrow / メタ情報 / 番号 |

| クラス | サイズ | 行高 | 用途 |
|---|---|---|---|
| `.hero__title` | clamp(64, 9vw, 140) px | 0.88 | ヒーロー巨大ヘッドライン |
| `.page-header__title` | clamp(56, 8vw, 120) px | 0.88 | サブページタイトル |
| `.h1` | 32px | 1.3 | 見出し H1 |
| `.h2` | 24px | 1.3 | 見出し H2 |
| `.h3` | 18px | 1.4 | 見出し H3 |
| body | 16px | 1.75 | 本文 |
| `.eyebrow` | 12px / mono / `.12em` letter-spacing / uppercase | — | セクション小見出し |

### Spacing (4px グリッド、主に 8px 倍数)

`--s-1` 4 / `--s-2` 8 / `--s-3` 12 / `--s-4` 16 / `--s-5` 20 / `--s-6` 24 / `--s-7` 32 / `--s-8` 48 / `--s-9` 64 / `--s-10` 80 / `--s-11` 120

### Radius

| 値 | 用途 |
|---|---|
| 0px | 画像・ヒーロー写真 |
| 8px | フォーム入力 |
| 30px (`--r-pill`) | ボタン・タグ・フィルタ |
| 50% | 円形アイコンボタン |

### Elevation

シャドウ・カードリフト・hover lift は **すべて禁止**。深さは色変化（grey shifts）と 1px inset divider のみで表現。

---

## レイアウト原則

- 最大コンテナ幅 `1440px`、横パディング 48px (≥769) / 24px (≤768)
- ヒーロー / ページヘッダーは 2 カラム（テキスト + ビジュアル）、768px で 1 カラムに
- プロダクト/サービス系グリッドは 1px gap + grey 背景で divider を表現（カード自体は白）
- ピル型ボタンの hover はホバー色に背景遷移（200ms ease）

## ブレークポイント

| 名称 | 幅 | 主な変化 |
|---|---|---|
| Mobile | <640 | 1 カラム、ハンバーガー、padding 24px |
| Tablet | 640–960 | 2 カラム product grid、ハンバーガー継続 |
| Desktop | ≥960 | フル横ナビ、3 カラムグリッド |

ハンバーガーは `max-width: 960px` で出現。

---

## 各画面詳細

### 1. index.html — トップ

1. **トッププロモバナー** (`.nav-banner`) — 黒背景・白文字 11px monospace。
2. **グローバルナビ** (`.nav`) — sticky、白背景、`O` ロゴマーク + ORITO テキストロゴ、4 リンク、CTA `お問い合わせ`、ハンバーガー。
3. **ヒーロー** — 左: eyebrow / 巨大「FLUID UNDER PRESSURE.」(PRESSURE のみオレンジ) / 日本語サブ「産業の血流を、止めない。」/ リード文 / 2 ボタン。右: 4:5 のストライプ placeholder（実イラスト差し替え予定）。
4. **マーキー帯** (`.strip`) — 黒背景、白英字 22px、各単語の後ろにオレンジ●、横スクロール 36s linear infinite。`prefers-reduced-motion` で停止。
5. **3 Pillars** — 「THREE PILLARS.」 + 右に日本語イントロ / 3 カラム grid（1px hover divider）/ 各カード: 番号 (mono) + EN タイトル (Anton) + 日本語タイトル (Rounded) + ボディ。
6. **Services 3 カード** — `WHAT WE SUPPLY.` + 「すべての事業を見る」CTA / 各カード: 4:3 ビジュアル + 番号 + 日本語タイトル + 説明 + 「DETAIL →」。
7. **Stats 帯** — 黒背景、4 数値（47YRS / 12,000+ / 24H / 600+）、各値はオレンジ単位。
8. **CTA 帯** — オレンジ全面、巨大「LET'S TALK.」+ 黒ボタン 2 つ。
9. **フッター** — 黒背景、4 カラム（Brand / Sitemap / Business / Contact）、底辺に著作権 + タグライン。

### 2. company.html

- ページヘッダー: `COMPANY.`
- セクション 1: 会社情報テーブル（11 行、左 200px の monospace ラベル + 右コンテンツ）
- セクション 2: 沿革タイムライン（7 件、左 120px Anton 年号 + 右 strong + 説明）
- セクション 3: アクセス（住所 dl + iframe map ※ 公開時 Google Maps 差し替え）
- CTA 帯 + フッター

### 3. service.html

- ページヘッダー: `WHAT WE SUPPLY.`
- 6 事業カード (`.svc-grid`、2 カラム、200px 正方形 placeholder + 右コンテンツ)
  1. HIGH-PRESSURE HOSE / 2. ASSEMBLY MACHINE / 3. FITTINGS / 4. FIELD ASSEMBLY / 5. CLEANING LINE / 6. VALVE & GAUGE
- 各カード末尾に `.tag` ピル（mono 10px・border 1px）
- 4 ステップ業務フロー（snow 背景、黒線 1px gap、Anton 56px 数字 + タイトル + 説明）
- CTA 帯 + フッター

### 4. contact.html

- ページヘッダー: `LET'S TALK.`
- 2 カラム: 左に連絡情報パネル（電話 Anton 32px / メール / FAX / オレンジ強調の緊急枠）。右にフォーム。
- フォーム項目: 会社名* / ご担当者名* / メール* / 電話 / お問い合わせ種別 select* / お問い合わせ内容 textarea* / プライバシーポリシー同意 checkbox*
- ラベルは monospace uppercase + 必須マーク `REQ`（オレンジ 10px）
- フォーカス: `.input:focus` で背景 white、`border-color: #111`、3px alpha shadow
- 送信は Formspree (`https://formspree.io/f/yourFormID` を実 ID に差し替え) — fetch + 成功/エラーメッセージのトグルを `<script>` で実装

### 5. privacy.html

- ページヘッダー: `PRIVACY POLICY.`
- 2 カラム: 左 240px sticky TOC（mono、9 リンク、番号 + 項目名）/ 右 prose 760px 最大
- 各 H2 にオレンジ 14px Anton 番号プレフィックス + border-top 1px

---

## インタラクション

| 対象 | 挙動 |
|---|---|
| `.btn:hover .arrow` | `translateX(4px)` |
| `.btn--accent:hover` | `bg: var(--c-accent-deep)` |
| `.service-card:hover .service-card__more` | color: orange |
| `.reveal` | IntersectionObserver で `is-in` 付与、opacity 0→1 / translateY 24→0、700ms ease。delay-1/2/3 で stagger |
| `.strip__track` | 36s linear infinite 横スクロール、`-50%` translate（duplicate して seamless） |
| ハンバーガー | クリック → `body.menu-open`、3 本線が X になる、メニューが右からスライドイン (320ms cubic-bezier(.65,0,.35,1))、リンククリック / Esc / desktop 復帰で close、scroll lock |
| フォーム | submit → fetch Formspree → 成功 `.form__success.is-shown` / エラー `.form__error.is-shown` |

`@media (prefers-reduced-motion: reduce)` ですべての reveal とマーキーアニメを無効化。

---

## アセット

このリリースでは画像なし。プレースホルダーで構成しています。

`.placeholder` (default / `--dark` / `--accent`) — 135deg ストライプ + 中央のラベル枠 + コーナーの「FIG.01 / 1200 × 1500」モノスペース注釈。実イラストへの差し替えを前提としています。

CLAUDE.md の指針に従い、差し替え時は `tech-pic.com` / `loosedrawing.com` / `tyoudoii-illust.com` 等のフラットイラスト系で統一すること。題材は工場・機械・ホース・作業員。

---

## 実装メモ・差し替え必要箇所

公開前に必ず差し替えてください：

- **連絡先**: `06-XXXX-XXXX`、`info@orito.example`、`privacy@orito.example`
- **住所**: `〒XXX-XXXX 大阪府〇〇市〇〇 1-2-3 ORITOビル`
- **代表者名**: `折戸 ◯◯`
- **設立年・資本金・取引銀行**等の数値（沿革年表を含む）
- **Formspree ID**: `contact.html` の `action="https://formspree.io/f/yourFormID"`
- **Google Maps**: `company.html` の OSM iframe を本社位置の Google Maps embed に
- **プライバシーポリシー本文**: 法務確認後に正式版へ
- **ヒーロー / 各カード placeholder**: 実イラスト

---

## ファイル構成

```
design_handoff_orito_corporate/
├── README.md         （このファイル）
├── index.html
├── company.html
├── service.html
├── contact.html
├── privacy.html
├── css/
│   └── style.css     （全ページ共通・トークン・コンポーネント定義）
└── js/
    └── main.js       （IntersectionObserver reveal + ハンバーガー制御）
```

ビルドツール不要。`npx serve .` または `python3 -m http.server 8080` で確認できます。
