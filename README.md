# Portfolio

四宮依歩稀のポートフォリオサイト。

- 公開URL: https://kakinotane12.github.io/portfolio/
- 日本語 `/` ・ 英語 `/en/` の2言語
- 1ページ完結。制作物はカードをクリックするとモーダルで開く

## 動かす

```bash
npm install     # 最初の1回だけ
npm run dev     # http://localhost:4321/portfolio/ で確認（保存すると自動反映）
```

`npm run dev` を起動したまま編集してください。ファイルを保存するとブラウザが勝手に更新されます。

---

# 編集する場所

**この表だけ見れば足ります。** 触るファイルは全部で6つです。

| やりたいこと | 開くファイル |
| --- | --- |
| 氏名・所属・メールアドレス・自己紹介文 | [src/data/profile.ts](src/data/profile.ts) |
| 受賞・学会発表・展示を追加／編集 | [src/data/awards.ts](src/data/awards.ts) |
| 技術スタック（使える言語・ツール） | [src/data/skills.ts](src/data/skills.ts) |
| 制作物の中身（1作品＝2ファイル） | [src/content/works/](src/content/works/) |
| 画像・プレイ映像のサムネイル | [public/images/](public/images/) |
| 色・文字サイズ・余白 | [src/styles/global.css](src/styles/global.css) の冒頭60行 |

これ以外のファイルは、**表示の仕組みを作っている部分なので触る必要はありません。**

---

## 1. 氏名・所属・連絡先 — `src/data/profile.ts`

Hero（ページ最上部）と About セクション、Contact セクションの内容です。

| 項目 | 出る場所 |
| --- | --- |
| `name` | ページ最上部の大きな氏名・ヘッダー左上 |
| `nameReading` | 氏名の下の読みがな（日本語ページのみ） |
| `about` | About セクション。配列の1要素が1段落 |
| `affiliation` | 氏名の下の Affiliation 欄 |
| `email` | Contact セクション・フッター |
| `githubUser` | Contact セクション・フッター |

`{ ja: '...', en: '...' }` の形になっているものは**両方書いてください**。`ja` だけ直すと英語ページが古いままになります。

## 2. 受賞・学会発表 — `src/data/awards.ts`

`awards` 配列に**新しいものから順に**並べます。1件はこの形です。

```ts
{
  date:  { ja: '2026年9月', en: 'Sep 2026' },        // 左に出る年月
  org:   { ja: 'IVRC メタバース部門', en: '...' },    // 大会名・学会名
  title: { ja: '作品名：Entrust(X)', en: '...' },     // 作品名・論文タイトル
  results: [
    { label: { ja: '最優秀賞', en: 'Grand Prize' }, award: true },  // ← 青いバッジ
    { label: { ja: 'ポスター発表', en: 'Poster presentation' } },    // ← 控えめな補足行
  ],
},
```

**`award: true` を付けると青いバッジで強調されます。** 受賞に付け、発表形態（ポスター発表・デモ展示）には付けない、という使い分けです。

## 3. 技術スタック — `src/data/skills.ts`

カテゴリごとに項目を並べます。年数や5段階評価はあえて書かない設計です（学生の自己申告は評価されにくいため）。代わりに `usedIn` で「どの制作物で使ったか」を示します。

```ts
{ name: 'Unity', usedIn: { ja: 'チーム制作 / 学会展示', en: '...' } },
{ name: 'C++' },   // usedIn は省略できます
```

## 4. 制作物 — `src/content/works/`

**1つの作品につき、日本語版と英語版の2ファイル**を作ります。

```
src/content/works/ja/entrust-x.md   ← 日本語版
src/content/works/en/entrust-x.md   ← 英語版
```

ファイル名（＝`key`）を日英で揃えてください。揃っていると言語切り替えボタンで同じ作品の対訳に飛べます。

### ファイルの上半分（`---` で挟まれた部分）

```yaml
---
lang: ja                    # ファイルを置いたフォルダ名と揃える
key: entrust-x              # 日英で同じ値にする。URL になります
title: "Entrust(X)"
summary: "一覧カードに出る1行の説明"
category: ゲーム開発
period: 2025年4月 – 2025年9月
role: "プログラマ"
teamSize: 4名
tech: [Unity, C#, Blender]
cover: /images/entrust-x.jpg     # public/images/ に置いた画像
youtube: "dQw4w9WgXcQ"           # YouTubeの動画ID（URL全体ではない）
screenshots:
  - src: /images/entrust-x-1.jpg
    alt: ゲームプレイ中の画面
links:
  - label: "コンテスト結果"
    url: "https://example.com"
order: 10                   # 小さいほど一覧の先頭に出る
---
```

> **注意**：値に `: `（コロン＋半角スペース）が入る場合は `"..."` で囲ってください。囲わないとビルドが失敗します。

### ファイルの下半分（本文）

次の4つの見出しで書く前提です。

| 見出し | 書く内容 |
| --- | --- |
| `## 概要` | 何を作ったか |
| `## 課題と解決` | **最重要。** 何が難しく、どう考えて解決したか |
| `## 担当範囲` | **チーム制作では必須。** どこまでが自分の仕事か |
| `## 学び` | 次に活かせること |

「課題と解決」と「担当範囲」がないと、採用側は貢献度を判断できません。完成物の見た目より、ここが読まれます。

### 作品を減らしたいとき

ファイルを削除するか、`draft: true` を書き加えると一覧から消えます（日英ペアで消してください）。

## 5. 画像 — `public/images/`

ここにファイルを置き、Markdown からは `/images/ファイル名` で参照します。**`/portfolio` は付けません**（ビルド時に自動で付きます）。

現在入っている `placeholder-*.svg` は仮画像なので、実物ができたら差し替えてください。

`og.png` は SNS でシェアされたときに出る画像です。今は単色の仮置きなので、**氏名入りの 1200×630 の画像**に差し替えることをお勧めします。

## 6. 色・文字サイズ・余白 — `src/styles/global.css`

**冒頭60行（`:root { ... }` の中）だけ触れば全体に反映されます。** それより下は各パーツの細かい指定なので、基本的に触りません。

```css
--accent: #2563eb;        /* アクセントカラー。ライトモード用 */
--text-base: 1.125rem;    /* 本文の文字サイズ。全体の基準 */
--section-gap: clamp(...); /* セクション間の余白 */
```

ダークモード用の色は、同じファイルの `@media (prefers-color-scheme: dark)` と `:root[data-theme='dark']` の**2箇所に同じ値**を書く必要があります。片方だけ変えると、OS設定と手動切り替えで見た目がずれます。

---

# 触らなくてよいファイル

参考までに、何をしているかだけ書いておきます。**編集の必要はありません。**

```
src/
  pages/          URLとページの対応（/、/en/、/works/xxx/、404）
  layouts/
    Base.astro    <head>・テーマ切替・OGP・共通の枠組み
  components/     画面の部品
    Header/Footer/LangSwitch/ThemeToggle
    HomePage.astro   トップページの組み立てと見た目
    Section.astro    セクション見出しの共通枠
    WorkCard.astro   制作物の一覧カード
    WorkModal.astro  カードを押したときに開くモーダル
    WorkBody.astro   モーダルと単独ページで共有する中身
    WorkDetail.astro 作品の単独ページ
    YouTubeEmbed/ArrowIcon
  i18n/
    config.ts     言語とURLの組み立て
    ui.ts         ボタン・見出しなどの固定文言（日英）
  content.config.ts  制作物の項目定義とチェック
astro.config.mjs   サイトのURL・base・多言語設定
.github/workflows/deploy.yml  push時の自動公開
```

見た目を調整したくなったときだけ、`components/` の該当ファイルの `<style>` 部分を触ります。

---

# 公開する

`main` ブランチに push すると自動で公開されます。

**初回のみ GitHub 側の設定が必要です。**
Settings → Pages → *Build and deployment* → **Source を「GitHub Actions」に変更**してください。

```bash
git add -A
git commit -m "内容を更新"
git push
```

---

# 残っている TODO

- [ ] `profile.ts` のメールアドレス（現在 `TODO@example.com`）
- [ ] `profile.ts` の About 本文
- [ ] 制作物3件の中身・画像・プレイ映像
- [ ] `awards.ts` の英語表記を公式表記に確認
- [ ] `public/images/og.png` を氏名入りの画像に差し替え
- [ ] アクセントカラーの最終決定（現在は暫定の青）
