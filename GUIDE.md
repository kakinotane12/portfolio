# このサイトの仕組みと編集ガイド

初めてウェブページを作る人向けに、**「何がどうなって画面になっているのか」** と
**「やりたいことごとに、どのファイルを開けばいいのか」** をまとめた資料です。

- 使っている道具：[Astro](https://astro.build/)（静的サイトジェネレーター）
- 公開先：GitHub Pages → https://kakinotane12.github.io/portfolio/
- 構成：1ページ完結・日英2言語・制作物はモーダル（ポップアップ）で表示

---

## 0. まず動かす

```bash
npm install     # 最初の1回だけ（必要な部品をダウンロードする）
npm run dev     # 開発サーバーを起動
```

起動したら http://localhost:4321/portfolio/ を開きます。
**`npm run dev` は起動したままにしてください。** ファイルを保存するとブラウザが自動で更新されます。

| コマンド | 何をするか | いつ使うか |
| --- | --- | --- |
| `npm run dev` | 手元で確認用サーバーを起動 | 編集中はずっと |
| `npm run build` | 公開用のHTMLを `dist/` に書き出す | 公開前の確認 |
| `npm run preview` | `build` の結果を表示 | 本番と同じ状態を見たいとき |
| `npm run check` | 書き間違い・型の不整合を検査 | エラーが出たとき |

終了はターミナルで `Ctrl + C` です。

---

## 1. 全体像：なぜ「ビルド」が必要なのか

ブラウザが理解できるのは HTML・CSS・JavaScript の3つだけです。
一方このサイトのソースコードは、人間が編集しやすい形（`.astro` / `.ts` / `.md`）で書かれています。
その差を埋めるのが **ビルド** です。

```
【あなたが編集するもの】            【Astro が変換】        【ブラウザが読むもの】

  src/data/profile.ts   ─┐
  src/data/awards.ts     │
  src/data/skills.ts     ├──→   npm run build   ──→   dist/index.html
  src/content/works/*.md │                             dist/en/index.html
  src/components/*.astro ─┘                            dist/works/.../index.html
                                                       dist/_astro/*.css, *.js
```

重要な性質が2つあります。

1. **完成品は「ただのHTMLファイル」** です。公開後にサーバー側でプログラムは動きません
   （だから GitHub Pages で無料公開でき、表示も速い）。
2. **データと見た目が分離しています。** 文章や実績は `src/data/` と `src/content/` に、
   見た目は `src/components/` と `src/styles/` にあります。
   **普段の更新でデータ側だけ触れば済むのは、この分離のおかげです。**

---

## 2. 画面のどこが、どのファイルなのか

```
┌──────────────────────────────────────────────┐
│ ヘッダー（名前・ナビ・JA/EN・ライト/ダーク）  │ components/Header.astro
├──────────────────────────────────────────────┤
│ Portfolio                                    │
│ 四宮 依歩稀            ← Hero                │ data/profile.ts
│ しのみや いぶき / Ibuki Shinomiya            │  （見た目は HomePage.astro）
│ ──────────────────────────                   │
│ AFFILIATION  慶應義塾大学 … 杉本研究室 修士1年│
├──────────────────────────────────────────────┤
│ About / 自己紹介                             │ data/profile.ts の about
│   本文3段落                                  │
├──────────────────────────────────────────────┤
│ Awards / 表彰・活動                          │ data/awards.ts
│  2026年9月 │ IVRC 2026 メタバース部門        │
│            │ 作品名：Entrust(X)              │
│            │ 最優秀賞                        │
├──────────────────────────────────────────────┤
│ Works / 制作物                               │ content/works/ja/*.md
│  ┌────────┐ ┌────────┐ ┌────────┐           │  （カードの見た目は
│  │ 画像   │ │ 画像   │ │ 画像   │           │   components/WorkCard.astro）
│  │タイトル│ │        │ │        │           │
│  │ 説明   │ │        │ │        │           │
│  │ 受賞   │ │        │ │        │           │
│  │ タグ   │ │        │ │        │           │
│  └────────┘ └────────┘ └────────┘           │
│        ↓ クリック                            │
│    ポップアップ（画像・タイトル・説明文）    │ components/WorkModal.astro
├──────────────────────────────────────────────┤
│ Skills / 技術スタック                        │ data/skills.ts
├──────────────────────────────────────────────┤
│ Contact / お問い合わせ                       │ data/profile.ts
├──────────────────────────────────────────────┤
│ フッター                                     │ components/Footer.astro
└──────────────────────────────────────────────┘
```

---

## 3. 編集する場所（この表が本体です）

**普段の更新で触るのは、ここに挙げたファイルだけです。**

| やりたいこと | 開くファイル |
| --- | --- |
| 氏名・所属・自己紹介・メール・GitHub | [src/data/profile.ts](src/data/profile.ts) |
| 受賞・学会発表・展示の追加／修正 | [src/data/awards.ts](src/data/awards.ts) |
| 使える言語・ツールの一覧 | [src/data/skills.ts](src/data/skills.ts) |
| 制作物の内容（1作品＝日英2ファイル） | [src/content/works/](src/content/works/) |
| 画像・動画のサムネイル | [public/images/](public/images/) |
| 色・文字サイズ・余白 | [src/styles/global.css](src/styles/global.css) の冒頭60行 |
| ボタンや見出しの固定文言（「詳細を見る」など） | [src/i18n/ui.ts](src/i18n/ui.ts) |

それ以外は「表示の仕組み」側なので、**見た目を変えたいとき以外は触りません。**

### 共通ルール

- `{ ja: '...', en: '...' }` という形の項目は **日英どちらも書いてください。**
  `ja` だけ直すと英語ページが古い内容のまま残ります。
- 配列（`[ ]` の中）に項目を足すときは、**行末のカンマ `,` を忘れないこと。**
- 文章の中にリンクを入れたいときは `[表示する文字](URL)` と書きます
  （`profile.ts` の `about` と `affiliation`、制作物の `description` で使えます）。

---

## 4. 各ファイルの詳細

### 4-1. `src/data/profile.ts` — 名前・所属・連絡先

| 項目 | 画面に出る場所 |
| --- | --- |
| `name` | 最上部の大きな氏名／ヘッダー左上／ページタイトル |
| `nameReading` | 氏名の下の読みがな（日本語ページのみ） |
| `about` | About セクション。**配列の1要素＝1段落** |
| `affiliation` | 氏名の下の AFFILIATION 欄 |
| `email` | Contact セクション |
| `githubUser` | Contact セクションと GitHub へのリンク |

段落を増やすときはこう書きます。

```ts
about: {
  ja: [
    '1段落目の文章。',
    '2段落目の文章。',   // ← 要素を足すと段落が増える
  ],
  // en も同じように
}
```

### 4-2. `src/data/awards.ts` — 表彰・活動

`awards` 配列に **新しいものから順に** 並べます。1件の形はこうです。

```ts
{
  date:  { ja: '2026年9月', en: 'Sep 2026' },          // 左に出る年月
  org:   { ja: 'IVRC 2026 メタバース部門', en: '...' }, // 大会名・学会名
  title: { ja: '作品名：Entrust(X)', en: '...' },       // 作品名・論文題目（一段大きく出る）
  results: [
    { label: { ja: '最優秀賞', en: 'Grand Prize' }, award: true },
    { label: { ja: '第31回 日本バーチャルリアリティ学会大会でデモ展示', en: '...' } },
  ],
},
```

- `results` の1要素が1行として並びます。
- 文字の体裁はすべて同じです。**受賞であることは絵文字（トロフィー）で示す** 方針なので、
  色や太さでは差をつけていません。
- `award: true` は並び順の区別に使っています（受賞が先、活動が後）。

### 4-3. `src/data/skills.ts` — 技術スタック

「◯年」「5段階で4」といった自己申告は書かない設計です（学生の自己評価は読み手が判断しにくい）。
代わりに `usedIn` で **どの活動で使ったか** を示します。

```ts
{ name: 'Unity', usedIn: { ja: 'チーム制作 / 学会展示', en: 'Team projects / Exhibition' } },
{ name: 'C / C++' },   // usedIn は省略できる
```

### 4-4. `src/content/works/` — 制作物

**1作品につき、日本語版と英語版の2ファイル** を作ります。

```
src/content/works/ja/contest-game.md   ← 日本語版
src/content/works/en/contest-game.md   ← 英語版
```

**ファイル名を日英で揃えてください。** 揃っていると、JA/EN を切り替えたときに
同じ作品の対訳に飛べます。

ファイルの中身は `---` で挟まれた項目リストだけで、**その下に本文は書きません。**

```yaml
---
lang: ja                    # 置いたフォルダ名（ja / en）と揃える
key: contest-game           # 日英で同じ値。URLになる（/works/contest-game/）
title: "Entrust(X)"
summary: "ステガノグラフィを使った写真共有型の謎解きゲーム"   # カードの1行説明
award: |                    # 任意。summary の下に出る。改行すると1行ずつ並ぶ
  🏆IVRC 2026 メタバース部門 最優秀賞
  🏆長谷川晶一賞（特別審査員賞）
  第31回日本バーチャルリアリティ学会大会でデモ展示
description: |              # ポップアップに出る説明文。概要と自分の役割をここに書く
  1段落目の文章。

  2段落目の文章。リンクは [表示文字](URL) と書ける。
category: ゲーム             # カード左上に青字で出る
period: 2026年5月 – 現在     # カード右上に出る
tech:                       # 下部のタグ（最大4件まで表示）
  - Unity
  - C#
youtube: "https://youtu.be/_8B_9jyyw9g"   # 貼るだけでOK。IDは自動で抜き出す
order: 10                   # 小さいほど左・上に並ぶ
draft: false                # true にすると一覧から消える
---
```

#### 各項目

| 項目 | 必須 | 説明 |
| --- | --- | --- |
| `lang` `key` | ○ | 入れ物としての識別情報。上の説明どおりに |
| `title` | ○ | 作品名 |
| `summary` | ○ | カードの1行説明。`description` がないときはポップアップにも使われる |
| `award` | | 受賞内容・関連する活動。カードの `summary` の下に同じ体裁で出る。**複数あるときは `award: \|` と書いて改行で区切る**（1行＝1項目） |
| `description` | | ポップアップの本文。空行で段落が分かれる |
| `period` | ○ | 期間 |
| `category` | | カテゴリ |
| `tech` | | 技術タグ |
| `cover` | | 表紙画像。`/images/xxx.jpg` の形で書く |
| `coverAlt` | | 画像の説明文（読み上げ・画像が出ないとき用） |
| `youtube` | | YouTube のURL。設定すると表紙も動画サムネイルになる |
| `video` `poster` | | 自前の動画ファイルを使うとき |
| `order` | | 並び順 |
| `draft` | | 下書き扱いにする |
| `role` | | **現在は表示していません。** 役割は `description` の文章の中に書く方針 |

**表紙画像の優先順位**：`cover` があればそれ、なければ `youtube` のサムネイル。
**ポップアップの中身の優先順位**：`youtube` → `video` → `cover`。

#### 注意1：`description` の書き方

```yaml
description: |        # ← この縦棒が「以下は複数行の文章です」の合図
  行頭を2スペース下げる。

  空行を入れると段落が分かれる。
```

**行頭のスペースを揃えるのが必須です。** 揃っていないとビルドが失敗します。

#### 注意2：コロン＋半角スペースを含む値

```yaml
role: プログラマ: 4名チーム      # ✕ ビルドが失敗する
role: "プログラマ: 4名チーム"    # ○ ダブルクォートで囲む
```

迷ったら囲っておけば安全です。

### 4-5. `public/images/` — 画像・動画

ここにファイルを置き、`/images/ファイル名` の形で参照します。
**`/portfolio` は付けません**（公開時に自動で付きます）。

- `og.png` … SNSでシェアされたときに出る画像。**1200×630 の氏名入り画像** への差し替え推奨
- `favicon.svg` … ブラウザのタブに出る小さなアイコン（`public/` 直下）

画像は **表示サイズの2倍程度まで** に縮めてから置いてください。
数MBの写真をそのまま置くと表示が遅くなります（カードは横800px程度で十分）。

### 4-6. `src/styles/global.css` — 色・文字サイズ・余白

**冒頭60行（`:root { ... }` の中）だけ触れば全体に反映されます。**
ここで定義した値を、他の全ファイルが `var(--名前)` で参照しているためです。

```css
--accent: #2563eb;       /* アクセントカラー */
--text-base: 1.125rem;   /* 本文18px。全体の基準 */
--text-lg: 1.25rem;      /* 20px。作品タイトル */
--space-4: 2rem;         /* 余白は8pxの倍数で揃えている */
--width-content: 68rem;  /* 中身の最大幅 */
```

文字サイズの段階（このサイトの使い分け）：

| 変数 | 大きさ | 使っている場所 |
| --- | --- | --- |
| `--text-xs` | 13px | ラベル（AFFILIATION など） |
| `--text-sm` | 15px | カテゴリ・期間・技術タグ・補足 |
| `--text-base` | 18px | 本文・カードの説明・受賞行 |
| `--text-lg` | 20px | 作品タイトル |
| `--text-2xl` | 31px | セクション見出し |
| `--text-3xl` | 36〜48px | 氏名 |

**ダークモードの色は3箇所に同じ変数を書く必要があります。**

```css
:root { ... }                                /* ライトモード */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) { ... }    /* OS設定がダーク */
}
:root[data-theme='dark'] { ... }             /* 手動でダークを選んだ */
```

片方だけ直すと、OS設定と手動切り替えで見た目がずれます。

### 4-7. `src/i18n/ui.ts` — 固定文言

「詳細を見る」「閉じる」「お問い合わせ」などのボタン・見出しの文字です。
`ja` と `en` の両方に同じキーを書きます。

---

## 5. 触らなくてよいファイル（仕組み側）

編集の必要はありませんが、**何が何をしているか** が分かると安心なので載せておきます。

```
astro.config.mjs              サイトURL・base・多言語・サイトマップの設定
package.json                  依存パッケージとコマンドの定義
tsconfig.json                 TypeScript の設定
.github/workflows/deploy.yml  push したら自動で公開する手順書

src/
  content.config.ts     制作物の項目定義。書き間違いをビルド時に検出する
  pages/                URLを決める場所。ファイルの位置＝URL
    index.astro           /              日本語トップ
    en/index.astro        /en/           英語トップ
    works/[key].astro     /works/xxx/    作品の単独ページ（日本語）
    en/works/[key].astro  /en/works/xxx/ 同（英語）
    404.astro             存在しないURL
  layouts/
    Base.astro          全ページ共通の外枠。head・OGP・テーマ・フェードイン
  components/           画面の部品
    Header.astro          上部のナビ
    Footer.astro          下部
    LangSwitch.astro      JA / EN 切り替え
    ThemeToggle.astro     ライト / ダーク切り替え
    HomePage.astro        トップページの組み立て（全セクションの並び順と見た目）
    Section.astro         セクション見出しの共通枠
    WorkCard.astro        制作物の一覧カード
    WorkModal.astro       カードを押すと開くポップアップ ＋ その制御スクリプト
    WorkDetail.astro      作品の単独ページの中身
    YouTubeEmbed.astro    YouTube 埋め込み
    LocalVideo.astro      自前の動画ファイル埋め込み
    RichText.astro        改行で段落に分ける
    LinkedText.astro      文章中の [文字](URL) をリンクにする
    ArrowIcon.astro       矢印アイコン
  i18n/
    config.ts           言語一覧とURLの組み立て（localizePath / asset）
    ui.ts               固定文言（日英）
  styles/
    global.css          デザイントークンと全体の見た目
```

---

## 6. `.astro` ファイルの読み方

見た目を調整したくなったとき用の説明です。1ファイルが3〜4のブロックに分かれています。

```astro
---
// (1) フロントマター：JavaScript / TypeScript
// データを読む・加工する。ビルド時に1回だけ実行される（ブラウザでは動かない）
import { profile } from '../data/profile';
const { title } = Astro.props;      // 親から受け取った値
---

<!-- (2) マークアップ：ほぼHTML。波かっこの中にJSの値を書ける -->
<h3 class="card__title">{title}</h3>
{award && <p>{award}</p>}           <!-- award があるときだけ出す -->
{items.map((i) => <li>{i}</li>)}    <!-- 配列を繰り返す -->

<style>
  /* (3) CSS：このファイル内の要素にだけ効く（他のファイルに漏れない） */
  .card__title { font-size: var(--text-lg); }
</style>

<script>
  // (4) ブラウザで動くJavaScript（必要なファイルにだけある）
</script>
```

覚えておくと役に立つ点：

- **`<style>` はそのファイル専用** です。同じ `.card__title` を別ファイルで書いても衝突しません。
  逆に、他のファイルの要素に効かせたいときは `:global(...)` が必要です
  （`WorkCard.astro` のタグの文字サイズ指定がこれです）。
- `interface Props { ... }` は「この部品が受け取る値の一覧」です。
  ここに書いていない値を渡すとエラーで気づけます。
- **クラス名は `ブロック__要素` の形** で揃えています（`card__title`, `modal__body`）。
  どの部品の一部なのかが名前だけで分かるようにするためです。

---

## 7. 動きの仕組み（なぜそう作ったか）

### 7-1. 1ページ完結とURLの両立

「ページ遷移させたくない」一方で、「作品のURLを人に送りたい」「検索に載せたい」も満たす必要があります。
そこで **両方** 用意しています。

```
カードは本物のリンク   <a href="/works/contest-game/">
        ↓
JavaScript がクリックを横取りして、ポップアップを開く
        ↓
同時に history.pushState() でURLだけ /works/contest-game/ に書き換える
        ↓
ブラウザの「戻る」でポップアップが閉じる
```

この作りの利点：

- Ctrl+クリック（別タブで開く）は横取りせず、**本物のページ** が開く
- 検索エンジンとJavaScript無効環境も、`src/pages/works/[key].astro` が生成した
  単独ページを読める
- ポップアップ表示中のURLをコピーして人に送れる

制御スクリプトは **`WorkModal.astro` の `<script>` に全部入っています。**

### 7-2. 動画

- **YouTube は最初はサムネイル画像だけ** を表示し、クリックされてから本物の埋め込みを差し込みます。
  最初から埋め込むと、見られていない動画のために数百KBを読み込むことになるためです。
- **ポップアップを閉じたら動画を止めます。** 閉じたのに音が鳴り続けるのを防ぐため、
  `video:stop` という合図を送って埋め込み自体を削除しています
  （`WorkModal.astro` が送り、`YouTubeEmbed.astro` と `LocalVideo.astro` が受け取る）。

### 7-3. ダークモード

`Base.astro` の先頭に小さなスクリプトがあり、**ページが描かれる前に** 保存済みのテーマを適用します。
これがないと、ダークモードの人に一瞬だけ白い画面が見えてしまいます。

状態は3つあります：OS設定に従う（既定）／手動でライト／手動でダーク。

### 7-4. 多言語

`astro.config.mjs` の設定で、日本語は `/`、英語は `/en/` になります。
URLの組み立ては `i18n/config.ts` の `localizePath()` に集約してあるので、
リンクを書くときは自分で `/portfolio/en/...` と打たず、この関数を使います。

---

## 8. よくあるエラーと対処

| 症状 | 原因と対処 |
| --- | --- |
| `bad indentation of a mapping entry` | `.md` の値にコロン＋半角スペースが入っている。`"..."` で囲む |
| `Cannot read properties of undefined` | `profile.ts` などから項目を消したのに、使っている側が残っている。エラーに出るファイル名と行を見て、その参照も消す |
| 変更が画面に出ない | (1) 保存したか (2) `npm run dev` が動いているか (3) 強制再読み込み（`Ctrl + Shift + R`） |
| 英語ページだけ古い | `{ ja, en }` の `en` 側を書き忘れている |
| 画像が出ない | パスの先頭に `/portfolio` を付けていないか確認（付けない）。ファイル名の大文字小文字も一致させる |
| 作品がカードに出ない | `draft: true` になっている／`lang` とフォルダ名が食い違っている |
| 原因不明 | `npm run check` で検査。0 errors なら書き方の問題ではなく見た目の問題 |

`npm run check` の結果に出る `2 hints`（`'Props' is declared but never used`）は
**正常です。** Astro が型定義を規約で読むため、使われていないように見えるだけです。

---

## 9. 公開する

`main` ブランチに push すると、GitHub Actions が自動でビルドして公開します。

```bash
git add -A
git commit -m "内容を更新"
git push
```

**初回だけ GitHub 側の設定が必要です。**
リポジトリの Settings → Pages → *Build and deployment* → **Source を「GitHub Actions」に変更。**

公開の進行状況はリポジトリの **Actions** タブで見られます（緑のチェックが付けば完了、1〜2分）。

### URLを変えたいとき

`https://kakinotane12.github.io/portfolio/` の `/portfolio` を外したい場合は、
リポジトリ名を `kakinotane12.github.io` に変更し、
`astro.config.mjs` の `base: '/portfolio'` を `base: '/'` に直します。**この1行だけです。**

---

## 10. 参照リンク

| 内容 | URL |
| --- | --- |
| Astro 公式ドキュメント（日本語） | https://docs.astro.build/ja/getting-started/ |
| `.astro` の書き方 | https://docs.astro.build/ja/basics/astro-components/ |
| 制作物の項目定義の仕組み | https://docs.astro.build/ja/guides/content-collections/ |
| 多言語 | https://docs.astro.build/ja/guides/internationalization/ |
| CSS の各プロパティ（辞書として） | https://developer.mozilla.org/ja/docs/Web/CSS/Reference |
| CSS 変数（`var(--x)`） | https://developer.mozilla.org/ja/docs/Web/CSS/Using_CSS_custom_properties |
| Flexbox の使い方 | https://developer.mozilla.org/ja/docs/Learn/CSS/CSS_layout/Flexbox |
| Grid の使い方 | https://developer.mozilla.org/ja/docs/Learn/CSS/CSS_layout/Grids |
| ポップアップに使っている `<dialog>` | https://developer.mozilla.org/ja/docs/Web/HTML/Element/dialog |
| YAML（`.md` の `---` の中の書式） | https://learnxinyminutes.com/docs/ja-jp/yaml-jp/ |

---

## 11. 残っているTODO

- [x] `profile.ts` のメールアドレス
- [x] `src/content/works/en/*.md` 3件の英訳（現在プレースホルダ）
- [x] `profile.ts` の `affiliation.en` の誤記（`M1 Student,Interactive` にスペースがない）と研究室リンク
- [ ] `src/content/works/ja/research-project.md` の中身
- [ ] `public/images/og.png` を氏名入り 1200×630 の画像に差し替え
- [x] 未使用画像（`vr-clay-shooting-title.jpg`・`placeholder-*.svg`）の削除
- [x] `contest-game.md` の `description` 最終段落の受賞記述が `award` 項目と重複
- [ ] アクセントカラーの最終決定（現在は暫定の青 `#2563eb`）
- [ ] GitHub の Settings → Pages → Source を「GitHub Actions」に設定
