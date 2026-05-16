# 画像差し込みプロンプト集 — 株式会社オリト

各ページの placeholder に差し込むイラストを生成するためのプロンプトです。
**スタイルの統一**が最重要なので、全プロンプトに共通のスタイル句を入れています。

---

## 共通スタイルガイド（必ず先頭にコピーする句）

すべての画像で同じ作家性に揃えるため、以下を**全プロンプトの先頭**に置いてください。

### 英語版（Midjourney / DALL·E / Firefly 推奨）

```
Flat vector illustration, minimal Japanese editorial style,
muted industrial palette: off-white #FAFAFA background,
charcoal #111111 line and fill, single accent color orange #F97316,
no gradients, no textures, no shadows, geometric simplified shapes,
1.5pt clean outlines, isometric or front-elevation viewpoint,
B2B industrial subject (high-pressure hydraulic hoses, fittings, factory),
professional and disciplined, no text, no logo, no people faces in detail,
1:1 composition with generous negative space.
```

### 日本語版（国産生成AI / 説明用）

```
ミニマルなフラットベクターイラスト、日本のエディトリアル風、
背景はオフホワイト（#FAFAFA）、線と塗りはチャコール（#111111）、
アクセントは1色オレンジ（#F97316）のみ、グラデーション/テクスチャ/影なし、
幾何学的に簡略化、1.5pt のクリーンな輪郭線、
アイソメトリックまたは正面視点、B2B 産業機械（高圧ホース・継手・工場）、
プロフェッショナルで規律ある印象、文字なし・ロゴなし、
顔の細部描写なし、ネガティブスペースを多めに。
```

### Negative prompt（共通）

```
photorealistic, photograph, 3D render, gradient background,
drop shadow, glossy reflection, cartoon, anime, kawaii style,
text, letters, watermark, logo, signature, multiple accent colors,
red color, blue color, green color, busy composition.
```

---

## index.html（トップページ）

### IMG.01 — Hero Visual（4:5 縦長 / 1200 × 1500px）

差し込み先: `.hero__visual .placeholder` (FIG.01 / HERO)
ラベル: 「工場で高圧ホースを取り回す作業員のフラットイラスト」

```
[共通スタイル句]

Subject: A worker in a navy-blue uniform and helmet, viewed from a 3/4 back angle,
holding a coiled high-pressure hydraulic hose over the shoulder, walking through
a factory aisle. Simplified pipe rack and machinery silhouettes in the background,
charcoal line work. The hose itself is the orange accent color #F97316.
Vertical composition, the worker occupies the lower-right third,
generous negative space top-left for headline overlay.
```

---

### IMG.02 — Service card 01 / HOSE（4:3 / 1200 × 900px）

差し込み先: `.service-card__visual` SVC.01
ラベル: 「高圧ホース・口金・カプラのカットアウェイ図」

```
[共通スタイル句]

Subject: An exploded technical cutaway diagram of a high-pressure hydraulic hose
assembly, side view. Layers visible: outer rubber sheath, steel braid mesh,
inner tube. A crimped fitting and coupler attached at one end, separated slightly
to show construction. The braid layer rendered in orange #F97316 cross-hatching;
all other parts in charcoal lines on off-white. Centered horizontal composition.
```

---

### IMG.03 — Service card 02 / MACHINE（4:3 / orange placeholder）

差し込み先: `.service-card__visual.placeholder--accent` SVC.02
ラベル: 「アッセンブリーマシーンの正面イラスト」

```
[共通スタイル句]
*** OVERRIDE BACKGROUND: solid orange #F97316 ***
*** All linework should be charcoal #111111 only, no orange in subject ***

Subject: A front-elevation simplified drawing of an industrial hose crimping
(assembly) machine — vertical cylinder body, control panel with simple dials,
clamping head, cable to floor. Geometric, almost blueprint-like.
Centered, the machine occupies 70% of the frame height.
```

---

### IMG.04 — Service card 03 / FITTING（4:3 / dark placeholder）

差し込み先: `.service-card__visual.placeholder--dark` SVC.03
ラベル: 「継手・フィッティング類のパーツ並べ図」

```
[共通スタイル句]
*** OVERRIDE BACKGROUND: solid charcoal #111111 ***
*** Linework: off-white #FAFAFA, accent: orange #F97316 (one fitting only) ***

Subject: A flat-lay top-down arrangement of 9 different hydraulic fittings —
straight, 45°, 90° elbows, T-pieces, swivels, reducers, hex nuts.
Aligned on an invisible 3×3 grid with even spacing. One central fitting
highlighted in orange. Engineering catalog aesthetic.
```

---

## service.html（事業内容）

各カードは正方形プレースホルダー（200×200 / 1:1）。同じスタイルで 6 点。

### IMG.05 — SVC.01 HOSE（再利用 or リファイン版）

→ IMG.02 を 1:1 トリミングで再利用、または以下で新規生成：

```
[共通スタイル句]

Subject: Square 1:1 composition. A coiled high-pressure hose loop with
a single visible fitting, centered. The hose body in orange #F97316,
the fitting in charcoal. Minimal, iconic, almost like a logo mark.
```

### IMG.06 — SVC.02 MACHINE / orange BG（1:1）

```
[共通スタイル句]
*** OVERRIDE BACKGROUND: solid orange #F97316 ***
*** Linework: charcoal #111111 only ***

Subject: Square front view of a hose crimping machine, simplified to
3-4 essential geometric shapes (cylinder, control box, base). Centered.
```

### IMG.07 — SVC.03 FITTING / dark BG（1:1）

```
[共通スタイル句]
*** OVERRIDE BACKGROUND: solid charcoal #111111 ***
*** Linework: off-white, no orange ***

Subject: Square composition of 4 fittings (straight, elbow 90°, T,
swivel) arranged in a 2×2 grid, isometric perspective, off-white lines
on charcoal background.
```

### IMG.08 — SVC.04 ON-SITE FIELD ASSEMBLY（1:1 / 通常BG）

```
[共通スタイル句]

Subject: Square. A small van/light truck with rear doors open, revealing
a portable crimping machine and racks of hoses inside. Side view, simplified.
The van body in orange #F97316, the equipment in charcoal lines.
```

### IMG.09 — SVC.05 CLEANING LINE / dark BG（1:1）

```
[共通スタイル句]
*** OVERRIDE BACKGROUND: solid charcoal #111111 ***
*** Linework: off-white, accent: orange spray pattern ***

Subject: Square. A high-pressure cleaning nozzle in profile, with stylized
spray pattern emanating diagonally — the spray dots/droplets in orange #F97316,
the nozzle in off-white lines on charcoal.
```

### IMG.10 — SVC.06 VALVE & GAUGE / orange BG（1:1）

```
[共通スタイル句]
*** OVERRIDE BACKGROUND: solid orange #F97316 ***
*** Linework: charcoal only ***

Subject: Square front view of a ball valve with a circular pressure gauge
mounted on top. The gauge dial visible with simplified tick marks.
Charcoal lines on orange background.
```

---

## company.html（会社概要）

### IMG.11 — Page Header Visual（任意 / 推奨追加）

現在 `.page-header__inner` の右カラムにはテキストのみ。
イラストを追加する場合：

```
[共通スタイル句]

Subject: An isometric simplified building exterior — a small-to-mid-size
Japanese industrial warehouse / company HQ. Flat roof, signage area
(blank, no text), loading dock, a delivery van parked. The van and
signage in orange #F97316, building structure in charcoal lines on
off-white. 4:3 horizontal composition.
```

---

## contact.html（お問い合わせ）

### IMG.12 — 任意装飾画像（推奨追加 / Hero 横）

```
[共通スタイル句]

Subject: Isometric view of a desk with a phone receiver lifted off the cradle,
a notepad with abstract sketch lines, a pen. The phone cord spirals out in
orange #F97316. Charcoal linework. 4:5 vertical composition.
```

---

## 命名規則 & 配置先

ダウンロードした画像は次の規則で `images/` フォルダに保存してください：

```
images/
├── hero-worker.svg            ← IMG.01
├── svc-01-hose.svg            ← IMG.02 / IMG.05
├── svc-02-machine.svg         ← IMG.03 / IMG.06
├── svc-03-fitting.svg         ← IMG.04 / IMG.07
├── svc-04-field.svg           ← IMG.08
├── svc-05-cleaning.svg        ← IMG.09
├── svc-06-valve.svg           ← IMG.10
├── company-hq.svg             ← IMG.11
└── contact-desk.svg           ← IMG.12
```

差し替え方法は、各 `.placeholder` 要素を以下のように置換するだけです：

```html
<!-- BEFORE -->
<div class="placeholder">
  <span class="placeholder__corner placeholder__corner--tl">SVC.01</span>
  <span class="placeholder__label">高圧ホース類のカットアウェイ</span>
</div>

<!-- AFTER -->
<img src="images/svc-01-hose.svg" alt="高圧ホース類のカットアウェイ図"
     style="width:100%;height:100%;object-fit:cover;" />
```

---

## 生成ツール別のヒント

| ツール | コツ |
|---|---|
| **Midjourney** | プロンプト末尾に `--ar 4:5 --style raw --stylize 100 --no text` を追加。`--v 6` 推奨。 |
| **DALL·E 3** | 「flat vector」「no text」を強調。`square`/`vertical`/`horizontal` を文中で明示。 |
| **Stable Diffusion** | LoRA でフラットベクター系（例: `FlatVectorXL`）を当てると安定。CFG 6–8。 |
| **Adobe Firefly** | 「Vector look」「Flat graphic」を Style に選択。商用利用◎。 |
| **Recraft** | フラットベクター生成が最も得意。SVG 直接出力可で、後で色も置換できる。**最推奨。** |

**Recraft で SVG 出力 → Illustrator で色を `--c-accent`/`--c-black` に統一する**ワークフローが、デザイントークンとの整合性を最大化します。

---

## チェックリスト（差し替え後）

- [ ] 全 9–12 点で背景色がトークンと一致（`#FAFAFA` / `#F97316` / `#111111` のみ）
- [ ] アクセントオレンジは画像内で 1 箇所のみ
- [ ] 文字・ロゴ・人物の顔細部が含まれていない
- [ ] 影・グラデーションがない
- [ ] アイソメトリックか正面視点で統一されている
- [ ] サイズ感（線の太さ）が画像間で揃っている
