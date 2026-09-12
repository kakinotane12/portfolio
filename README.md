# Portfolio

四宮依歩稀のポートフォリオサイト。Astro による静的サイトで、GitHub Pages に自動デプロイされます。

- 公開URL: https://kakinotane12.github.io/portfolio/
- 日本語 `/` ・ 英語 `/en/` の2言語構成
- **1ページ完結**。作品はカードをクリックするとモーダルで開きます

## 作品モーダルの仕組み

作品の中身はトップページに閉じた `<dialog>` として最初から埋め込まれており、クリックで開きます。ページ遷移は起きません。

同時に、作品ごとの単独ページ（`/works/<key>/`）も生成しています。理由は3つあります。

1. モーダルを開くと URL が `/works/<key>/` に変わるので、**特定の作品だけを直リンクで送れる**
2. ブラウザの戻るボタンでモーダルが閉じる
3. Ctrl+クリック・検索エンジン・JS が動かない環境では、通常のページとして中身が読める

いずれも [src/components/WorkModal.astro](src/components/WorkModal.astro) が制御しています。単独ページとモーダルは [src/components/WorkBody.astro](src/components/WorkBody.astro) という同じ部品を共有しているので、**中身の編集は Markdown 1箇所で両方に反映されます。**

## 開発

```bash
npm install
npm run dev      # http://localhost:4321/portfolio/
npm run build    # dist/ に静的ファイルを出力
npm run preview  # ビルド結果を確認
npm run check    # 型チェック
```

## デプロイ

`main` ブランチへの push で [.github/workflows/deploy.yml](.github/workflows/deploy.yml) が動き、自動で公開されます。

**初回のみ GitHub 側の設定が必要です。**
リポジトリの Settings → Pages → *Build and deployment* → **Source を「GitHub Actions」に変更**してください。
（デフォルトの「Deploy from a branch」のままだとワークフローが反映されません）

## 内容を編集する

### 基本情報・自己紹介

[src/data/profile.ts](src/data/profile.ts)
氏名・所属・卒業予定年・連絡先・トップの一文・About 本文。`TODO:` を実データに差し替えてください。

### 研究業績

[src/data/research.ts](src/data/research.ts)
学会発表・卒論などを「著者 / タイトル / 発表先 / 年」の業績リスト形式で並べます。新しいものほど上に。

### 技術スタック

[src/data/skills.ts](src/data/skills.ts)
年数や5段階評価はあえて載せていません（学生の自己申告は評価されにくいため）。代わりに `usedIn` で「どの制作物で使ったか」を示します。

### 制作物

[src/content/works/](src/content/works/) に Markdown を追加します。

```
src/content/works/ja/<key>.md   日本語版
src/content/works/en/<key>.md   英語版
```

`key` は URL になる識別子です。**日本語版と英語版で同じ `key` にしてください。**
そうすると言語切り替えボタンが同じ作品の対訳ページに飛びます。

フロントマターの項目は [src/content.config.ts](src/content.config.ts) に定義されています。

> **YAML の注意**
> `role:` などの値に `: `（コロン＋空白）を含める場合は `"..."` で囲ってください。囲まないとビルドが失敗します。

本文には次の見出しを置く前提で書いています。

| 見出し | 書く内容 |
| --- | --- |
| 概要 | 何を作ったか |
| 課題と解決 | **最重要。** 何が難しく、どう考えて解決したか |
| 担当範囲 | **チーム制作では必須。** どこまでが自分の仕事か |
| 学び | 次に活かせること |

「課題と解決」と「担当範囲」が無いと、採用側は貢献度を判断できません。完成物の見た目より、ここが読まれます。

### 画像

`public/images/` に置き、Markdown からは `/images/xxx.png` の形で参照します（`/portfolio` は付けません。ビルド時に自動で付与されます）。

現在入っているのは [scripts/gen-placeholders.mjs](scripts/gen-placeholders.mjs) が生成したダミー画像です。実物ができたら同名で上書きするか、参照パスを書き換えてください。

### プレイ映像

フロントマターの `youtube:` に **動画ID のみ**（URL 全体ではなく `dQw4w9WgXcQ` のような部分）を入れると埋め込まれます。
サムネイルだけを先に表示し、クリックされてから YouTube を読み込む方式にしています。通常の埋め込みは再生していなくても 1MB 近く読み込むため、最初の表示速度を守るためです。

## デザインを変える

配色・字間・余白はすべて [src/styles/global.css](src/styles/global.css) 冒頭のカスタムプロパティに集約しています。

アクセントカラーを変えるときは `--accent` / `--accent-hover` / `--accent-soft` の3つ（ライト・ダークそれぞれ）を差し替えてください。現在は暫定で落ち着いた青です。

## 残っている TODO

- [ ] `src/data/profile.ts` の連絡用メールアドレス（現在 `TODO@example.com`）
- [ ] 大学名・学部・卒業予定年（現在ダミー）
- [ ] About 本文
- [ ] 制作物3件の中身と画像・プレイ映像
- [ ] 研究業績の実データ
- [ ] `public/images/og.png` を氏名入りの 1200×630 画像に差し替え（現在は単色の暫定PNG）
- [ ] アクセントカラーの最終決定
