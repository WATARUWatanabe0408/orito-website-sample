# ボタンシステム統一 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `参考/` 内4ページのボタンクラスを、4バリアント統一システム（Default Primary / Default Secondary / Large Primary / Large Inverse）に置き換える。

**Architecture:** 各ページのボタン要素の `class` 属性を直接書き換える。ビルドツールなし・CSSクラスの追加なし。変更はHTMLファイルの編集のみ。1ページ1コミット。

**Tech Stack:** バニラ HTML、Tailwind CSS CDN（`参考/css/tailwind-config.js` で色定義済み）

---

## バリアント早見表

| バリアント | クラス文字列 |
|---|---|
| Default Primary | `inline-flex items-center gap-2 rounded-xl px-10 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-black tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all` |
| Default Secondary | `inline-flex items-center gap-2 rounded-xl px-10 py-4 bg-white/80 backdrop-blur-sm border border-surface-container-highest text-on-surface font-black tracking-widest hover:bg-white transition-colors shadow-lg` |
| Large Primary | `inline-flex items-center justify-center gap-2 rounded-xl px-12 py-5 text-lg bg-gradient-to-br from-primary to-primary-container text-on-primary font-black tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all` |
| Large Inverse | `inline-flex items-center justify-center gap-2 rounded-xl px-12 py-5 text-lg bg-white text-primary font-black tracking-widest shadow-lg hover:opacity-90 transition-all` |

---

## Task 1: 参考/index.html（ボタン3つ）

**Files:**
- Modify: `参考/index.html:49` — ヒーロー「選ばれる理由」
- Modify: `参考/index.html:53` — ヒーロー「サービス一覧」
- Modify: `参考/index.html:179` — CTA「お問い合わせフォーム」

### Step 1-1: ヒーロー「選ばれる理由」を Default Primary に変更

`参考/index.html` L49 の `<a>` タグの `class` を書き換える。

変更前:
```html
<a href="#strength" class="bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-4 rounded-xl font-black flex items-center gap-2 shadow-[0_20px_40px_rgba(15,103,101,0.25)] hover:opacity-90 transition-all tracking-widest">
```

変更後:
```html
<a href="#strength" class="inline-flex items-center gap-2 rounded-xl px-10 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-black tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
```

- [ ] 上記の通り `参考/index.html` L49 を編集する

### Step 1-2: ヒーロー「サービス一覧」を Default Secondary に変更

`参考/index.html` L53 の `<a>` タグの `class` を書き換える。

変更前:
```html
<a href="service.html" class="px-10 py-4 rounded-xl font-black text-on-surface bg-white/80 backdrop-blur-sm border border-surface-container-highest hover:bg-white transition-colors tracking-widest shadow-lg">
```

変更後:
```html
<a href="service.html" class="inline-flex items-center gap-2 rounded-xl px-10 py-4 bg-white/80 backdrop-blur-sm border border-surface-container-highest text-on-surface font-black tracking-widest hover:bg-white transition-colors shadow-lg">
```

- [ ] 上記の通り `参考/index.html` L53 を編集する

### Step 1-3: CTA「お問い合わせフォーム」を Large Primary に変更

`参考/index.html` L179 の `<a>` タグの `class` を書き換える。

変更前:
```html
<a class="bg-primary text-white px-12 py-5 rounded-2xl font-black text-lg hover:shadow-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 tracking-[0.15em] shadow-lg shadow-primary/20" href="contact.html">
```

変更後:
```html
<a class="inline-flex items-center justify-center gap-2 rounded-xl px-12 py-5 text-lg bg-gradient-to-br from-primary to-primary-container text-on-primary font-black tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all" href="contact.html">
```

- [ ] 上記の通り `参考/index.html` L179 を編集する

### Step 1-4: ブラウザで目視確認

```bash
cd 参考 && python3 -m http.server 8081
```

`http://localhost:8081/index.html` を開いて以下を確認する:
- ヒーローの2ボタンが横並びで同じ高さ・同じ角丸になっている
- CTAセクションのボタンが `rounded-xl`（以前の `rounded-2xl` より角丸が小さくなっている）
- ボタンにホバーしても scale しない（opacity のみ変化）

- [ ] 上記3点を確認する

### Step 1-5: コミット

```bash
git add 参考/index.html
git commit -m "style: index.html ボタンをシステム統一（Default Primary/Secondary/Large Primary）"
```

- [ ] 上記コマンドを実行する

---

## Task 2: 参考/service.html（ボタン1つ）

**Files:**
- Modify: `参考/service.html:99` — CTA「お問い合わせ」

### Step 2-1: CTA「お問い合わせ」を Large Inverse に変更

`参考/service.html` L99 の `<button>` タグの `class` を書き換える。

変更前:
```html
<button class="bg-white text-primary px-12 py-6 rounded-full font-bold text-xl hover:bg-on-primary-container transition-all shadow-2xl tracking-widest">
```

変更後:
```html
<button class="inline-flex items-center justify-center gap-2 rounded-xl px-12 py-5 text-lg bg-white text-primary font-black tracking-widest shadow-lg hover:opacity-90 transition-all">
```

- [ ] 上記の通り `参考/service.html` L99 を編集する

### Step 2-2: ブラウザで目視確認

`http://localhost:8081/service.html` を開いて以下を確認する:
- CTA セクション（緑のグラデーション背景）上のボタンが `rounded-xl`（角丸が小さくなり `rounded-full` の丸型でなくなっている）
- `text-xl` → `text-lg` でサイズが微妙に小さくなっている
- ホバーで背景色が変わらず、opacity のみ変化する

- [ ] 上記3点を確認する

### Step 2-3: コミット

```bash
git add 参考/service.html
git commit -m "style: service.html ボタンをシステム統一（Large Inverse）"
```

- [ ] 上記コマンドを実行する

---

## Task 3: 参考/company.html（ボタン1つ）

**Files:**
- Modify: `参考/company.html:102` — 「Google マップで開く」

### Step 3-1: 「Google マップで開く」を Default Primary に変更

`参考/company.html` L102 の `<a>` タグの `class` を書き換える。

変更前:
```html
<a class="inline-flex items-center justify-center gap-3 bg-[#428D8B] text-white px-10 py-5 rounded-xl font-bold hover:opacity-90 transition-all w-fit shadow-lg shadow-primary/20" href="https://maps.google.com" target="_blank">
```

変更後:
```html
<a class="inline-flex items-center gap-2 rounded-xl px-10 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-black tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all" href="https://maps.google.com" target="_blank">
```

- [ ] 上記の通り `参考/company.html` L102 を編集する

### Step 3-2: ブラウザで目視確認

`http://localhost:8081/company.html` を開いて以下を確認する:
- Google マップボタンの背景がグラデーション（index.html のヒーローボタンと同じ見た目）になっている
- `py-5` → `py-4` で高さが若干低くなっている
- ハードコードカラー `#428D8B` が消え、`bg-primary` 相当（グラデーション）になっている

- [ ] 上記3点を確認する

### Step 3-3: コミット

```bash
git add 参考/company.html
git commit -m "style: company.html ボタンをシステム統一（Default Primary）"
```

- [ ] 上記コマンドを実行する

---

## Task 4: 参考/contact.html（ボタン1つ）

**Files:**
- Modify: `参考/contact.html:106` — 「送信する」

### Step 4-1: 「送信する」を Large Primary（幅指定あり）に変更

`参考/contact.html` L106 の `<button>` タグの `class` を書き換える。

変更前:
```html
<button class="w-full md:w-[61.8%] h-16 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-lg shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-4 tracking-widest uppercase" type="submit">
```

変更後:
```html
<button class="w-full md:w-[61.8%] inline-flex items-center justify-center gap-2 rounded-xl px-12 py-5 text-lg bg-gradient-to-br from-primary to-primary-container text-on-primary font-black tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all" type="submit">
```

- [ ] 上記の通り `参考/contact.html` L106 を編集する

### Step 4-2: ブラウザで目視確認

`http://localhost:8081/contact.html` を開いて以下を確認する:
- 送信ボタンの「送信する」テキストが uppercase でなくなっている（日本語なので変化はないが class から `uppercase` が消えている）
- `h-16`（固定高さ）でなく `py-5` ベースになっている（外見上の高さはほぼ同じ）
- `active:scale-95` が消え、クリック時に縮まなくなっている
- `font-bold` → `font-black` になっている（太さが若干増している）

- [ ] 上記4点を確認する

### Step 4-3: コミット

```bash
git add 参考/contact.html
git commit -m "style: contact.html ボタンをシステム統一（Large Primary）"
```

- [ ] 上記コマンドを実行する

---

## Task 5: 動作確認・ローカルサーバー終了

### Step 5-1: 全ページを通しで確認

`http://localhost:8081/` から全4ページを開き、以下を横断的に確認する:

- 同じ用途のボタン（プライマリ CTA）がどのページでも同じ見た目になっている
- Default Primary（ヒーロー・Google マップ）と Large Primary（CTA・送信）でサイズが明確に異なる
- Large Inverse（service.html）が白背景・プライマリ文字色で統一されている
- どのボタンもホバー時に `opacity-90` のみ変化し、scale・shadow 変化がない

- [ ] 上記4点を確認する

### Step 5-2: ローカルサーバー終了

```bash
# Ctrl+C で python3 の http.server を停止する
```

- [ ] サーバーを停止する
