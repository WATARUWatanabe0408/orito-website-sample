# ボタンシステム統一 — 設計書

**対象:** `参考/` ディレクトリ内の全4ページ（index.html / service.html / company.html / contact.html）  
**目的:** 6パターン混在していたボタンスタイルを4バリアントの統一システムに整理する

---

## 現状の問題

| 要素 | 状態 |
|---|---|
| 角丸 | `rounded-xl` / `rounded-2xl` / `rounded-full` の3種混在 |
| padding | `px-10 py-4` / `px-12 py-5` / `px-12 py-6` / `h-16`（高さ固定）の4種混在 |
| font-weight | `font-black` / `font-bold` の2種混在 |
| hover | `hover:opacity-90` / `hover:scale + hover:shadow-2xl` / `hover:bg-on-primary-container` の3種混在 |
| 背景色指定 | `bg-primary` / `bg-gradient-to-br from-primary to-primary-container` / `bg-[#428D8B]`（ハードコード）の3種混在 |

---

## 決定事項

- **グラデーション:** `bg-gradient-to-br from-primary to-primary-container`（単色ではなくグラデーションを採用）
- **font-weight:** `font-black`（900）に統一
- **ホバー:** `hover:opacity-90 transition-all` に統一（scale・shadow 変化は廃止）
- **サイズ構成:** 2サイズ制（デフォルト + ラージ）

---

## バリアント定義

### Default Primary
**使いどころ:** ヒーローボタン・ページ内アクション・Google マップボタンなど

```html
<a class="inline-flex items-center gap-2 rounded-xl px-10 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-black tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all" href="...">
  ラベル
</a>
```

### Default Secondary
**使いどころ:** Default Primary の隣に並ぶサブアクション

```html
<a class="inline-flex items-center gap-2 rounded-xl px-10 py-4 bg-white/80 backdrop-blur-sm border border-surface-container-highest text-on-surface font-black tracking-widest hover:bg-white transition-colors shadow-lg" href="...">
  ラベル
</a>
```

### Large Primary
**使いどころ:** 専用 CTA セクション・フォーム送信ボタン（ライト背景上）

```html
<a class="inline-flex items-center justify-center gap-2 rounded-xl px-12 py-5 text-lg bg-gradient-to-br from-primary to-primary-container text-on-primary font-black tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all" href="...">
  ラベル
</a>
```

フォーム送信など幅指定が必要な場合は `w-full md:w-[61.8%]` を追加し、`<button type="submit">` で使用する。

### Large Inverse
**使いどころ:** 専用 CTA セクション（ダーク・カラー背景上）

```html
<button class="inline-flex items-center justify-center gap-2 rounded-xl px-12 py-5 text-lg bg-white text-primary font-black tracking-widest shadow-lg hover:opacity-90 transition-all">
  ラベル
</button>
```

---

## 各ページへの適用マッピング

| ページ / ボタン | バリアント | 変更点 |
|---|---|---|
| index.html — ヒーロー「選ばれる理由」 | Default Primary | `shadow-[0_20px_40px...]` → `shadow-lg shadow-primary/20` |
| index.html — ヒーロー「サービス一覧」 | Default Secondary | 変更なし（既に合致） |
| index.html — CTA「お問い合わせフォーム」 | Large Primary | `rounded-2xl` → `rounded-xl`、`hover:scale+shadow` → `hover:opacity-90` |
| service.html — CTA「お問い合わせ」 | Large Inverse | `rounded-full px-12 py-6 text-xl` → `rounded-xl px-12 py-5 text-lg` |
| company.html — 「Google マップで開く」 | Default Primary | `bg-[#428D8B] py-5` → グラデーション `py-4` |
| contact.html — 「送信する」 | Large Primary | `h-16 uppercase active:scale-95` 廃止 → `px-12 py-5 text-lg`（`w-full md:w-[61.8%]` は維持） |

---

## 対象外

- テキストリンク（`inline-flex items-center gap-2 font-black text-primary` スタイルのアロー付きリンク）はボタンとは別カテゴリのため変更しない
- カード内アイコンコンテナ（`rounded-2xl`）はボタンではないため変更しない
- `参考/` 外のファイルは対象外
