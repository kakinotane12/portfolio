# Portfolio

四宮依歩稀のポートフォリオサイトです。研究活動とゲーム開発の制作物をまとめています。

**https://kakinotane12.github.io/portfolio/**

## 特徴

- **日英2言語**：日本語は `/`、英語は `/en/`。各ページに `hreflang` を出力
- **1ページ完結＋作品ごとのURL**：制作物はカードからモーダルで開き、URL も `/works/<作品>/` に切り替わる。ブラウザの「戻る」で閉じられ、URL を共有すれば単独ページとして開ける
- **JavaScript なしでも閲覧可能**：カードは通常のリンクで、作品ごとの単独ページも静的に生成。検索エンジンからも読める
- **動画の遅延読み込み**：YouTube は最初サムネイルだけを表示し、クリック時に埋め込む。モーダルを閉じると再生を止める
- **ダークモード**：OS の設定に従うほか、手動切り替えも可能。描画前にテーマを適用し、ちらつきを防止
- **データと見た目の分離**：プロフィール・受賞歴・技術スタックは `src/data/`、制作物は Markdown（Content Collections）で管理

## 技術

- [Astro](https://astro.build/) 5（静的サイト生成）／TypeScript
- GitHub Actions で GitHub Pages にデプロイ

## 構成

```
src/
  pages/        ルーティング（トップ・作品の単独ページ・404。英語版は en/ 以下）
  layouts/      全ページ共通の head・OGP・テーマ適用
  components/   ヘッダー、作品カード、モーダル、動画埋め込みなどの部品
  content/      制作物（Markdown、日英）
  data/         プロフィール・受賞歴・技術スタック
  i18n/         言語設定と固定文言
  styles/       デザイントークンと全体のスタイル
```

## ローカルで動かす

```bash
npm install
npm run dev     # http://localhost:4321/portfolio/
```
