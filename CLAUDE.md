# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

株式会社オリトのコーポレートウェブサイト。高圧ホース・油圧機器の卸・販売を行うB2B企業向けサイト。

**目的:** 会社ブランディング（A）＋問い合わせ獲得（B）

## サイト構成

```
index.html        トップページ
company.html      会社概要
service.html      事業内容
careers.html      採用情報
contact.html      お問い合わせ
privacy.html      プライバシーポリシー
css/
  style.css       共通スタイル
js/
  main.js         共通スクリプト
images/           イラスト・画像素材（img-01.png〜img-12.png, logo.png, logo-white.png）
design_handoff_orito_corporate/   デザインハンドオフ資料（参考用）
legacy/           旧テンプレート（参考用、公開対象外）
```

## 技術スタック

- **実装:** バニラHTML/CSS/JavaScript（ビルドツール不要）
- **フォーム送信:** Formspree（サーバー不要でメール受信）
- **フォント:** Google Fonts（Bowlby One SC・M PLUS Rounded 1c・Noto Sans JP・JetBrains Mono）
- **アニメーション:** CSS + Intersection Observer（`.reveal` クラスでスクロール登場）
- **更新方式:** 静的HTML、更新は制作者が行う（CMS不要）

## デザインシステム：Industrial-Heritage（ロゴ合わせ, 2026年5月）

### カラーパレット

| 変数名 | カラーコード | 用途 |
|---|---|---|
| `--c-navy` | `#10215E` | プライマリブランド・ナビ・見出し・本文テキスト |
| `--c-navy-deep` | `#0A1742` | ホバー等の深め紺 |
| `--c-navy-soft` | `#2A3D85` | 中間トーン |
| `--c-accent` | `#E8B53A` | マスタードイエロー・CTAボタン・強調箇所 |
| `--c-accent-deep` | `#C99820` | アクセントホバー |
| `--c-cream` | `#FAF6EC` | ページ背景（温かみのある白） |
| `--c-cream-deep` | `#F2EBD7` | セクション背景 |
| `--c-text-2` | `#5B6280` | サブテキスト |
| `--c-orange` | `#F97316` | レガシー用途のみ（ごく少量） |
| `--c-error` | `#B82A2A` | エラー |
| `--c-success` | `#2F7A4F` | 成功 |

### フォント

| 変数名 | フォント | 用途 |
|---|---|---|
| `--f-display` | **Bowlby One SC** | 英語ディスプレイ見出し（ロゴと同系統） |
| `--f-display-jp` | **M PLUS Rounded 1c** | 日本語見出し |
| `--f-body` | **Noto Sans JP** | 本文 |
| `--f-mono` | **JetBrains Mono** | 数字・英字の装飾（SINCE / TEL等） |

### ビジュアル

- **写真は使わない**。イラスト中心で構成
- イラスト素材: `images/img-01.png` 〜 `images/img-12.png`（提供済みファイルを使用）
- ロゴ: `images/logo.png`（紺背景用は `images/logo-white.png`）
- 工場・機械・ホース・作業員などの題材で統一感を出す

### デザイン方針

- 英語大文字（Bowlby One SC）をセクションタイトルに積極使用（"FLUID UNDER PRESSURE." 等）
- 日本語サブコピーと英語見出しを組み合わせる Industrial スタイル
- 背景はクリーム (`#FAF6EC`) ベース。ネイビー帯・クリーム帯を交互に使う

### アニメーション

- 各セクション要素: `.reveal` クラス + Intersection Observer でスクロール登場
- 遅延: `.reveal--delay-1` / `.reveal--delay-2` / `.reveal--delay-3`
- CTAボタン: ホバーで軽く浮き上がる

## 各ページの設計

### 共通要素

- **プロモバナー** (`.nav-banner`): 最上部の固定帯「高圧ホースの出張製作対応 / お見積もり・技術相談無料」
- **ヘッダー** (`.nav`): ロゴ左・ナビ中央・CTAボタン右、スティッキー
- **モバイルメニュー** (`.menu`): ハンバーガー展開、電話番号とCTAを含む
- **パンくずリスト** (`.crumbs`): 内ページに表示

### トップページ（index.html）

1. プロモバナー
2. ヘッダー
3. ヒーロー（英語キャッチコピー "FLUID UNDER PRESSURE." + 日本語サブ + 問い合わせボタン）
4. マーキーストリップ（横スクロールする事業キーワード帯）
5. THREE PILLARS（3つの強み：SPEED / DEPTH / PROOF）
6. WHAT WE SUPPLY（事業内容カード × 3）
7. STATS（数値カウントアップ：創業年数 / 在庫点数 / 緊急対応 / 取引先数）
8. CTA帯（"LET'S TALK."）
9. フッター（4カラム：ブランド・SITEMAP・BUSINESS・CONTACT）

### 会社概要（company.html）

- ページヘッダー（パンくず・英語タイトル "COMPANY." + 日本語リード）
- 会社情報テーブル（会社名・設立・代表者・所在地・電話・FAX・営業時間・事業内容・主要取引先）
- Google Maps 埋め込み
- CTA帯（"WORK WITH US."）
- フッター

### 事業内容（service.html）

- ページヘッダー（"WHAT WE SUPPLY."）
- 事業カード × 6（`.svc-grid`）
  1. 高圧ホース・口金・カプラ・スイベル・各種ホースの卸販売
  2. 高圧ホースアッセンブリーマシーンの販売
  3. 各種継手類の卸販売
  4. 高圧ホースの出張製作業務
  5. 洗浄用ホース・ノズル他の卸販売
  6. 油圧ボールバルブ・チェックバルブ・圧力計他油圧機器の販売
- CTA帯
- フッター

### 採用情報（careers.html）

- ページヘッダー（"CAREERS."）
- 求人内容（技術・製造職）
- CTA帯
- フッター

### お問い合わせ（contact.html）

- ページヘッダー
- フォーム（会社名・氏名・メールアドレス・お問い合わせ内容）
- Formspreeで送信処理

### プライバシーポリシー（privacy.html）

- ページヘッダー
- プライバシーポリシー本文

## 確認方法

`master` ブランチに push すると GitHub Actions が自動デプロイ。

**確認URL:** https://wataruwatanabe0408.github.io/orito-website-sample/v3/

編集対象ディレクトリ: `public-v3/site/`

```bash
git add public-v3/site/
git commit -m "..."
git push
```
