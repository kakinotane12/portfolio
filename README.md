# Portfolio

四宮依歩稀のポートフォリオサイト。

- 公開URL: https://kakinotane12.github.io/portfolio/
- 日本語 `/` ・ 英語 `/en/` の2言語
- 1ページ完結。制作物はカードをクリックするとポップアップで開く
- Astro（静的サイトジェネレーター）で構築し、GitHub Pages に自動公開

## 動かす

```bash
npm install     # 最初の1回だけ
npm run dev     # http://localhost:4321/portfolio/ で確認（保存すると自動反映）
```

## 編集する

**→ [GUIDE.md](GUIDE.md) に、仕組みの説明と編集手順をまとめています。**

急ぎのときはこの表だけで足ります。

| やりたいこと | 開くファイル |
| --- | --- |
| 氏名・所属・自己紹介・連絡先 | [src/data/profile.ts](src/data/profile.ts) |
| 受賞・学会発表・展示 | [src/data/awards.ts](src/data/awards.ts) |
| 技術スタック | [src/data/skills.ts](src/data/skills.ts) |
| 制作物（1作品＝日英2ファイル） | [src/content/works/](src/content/works/) |
| 画像 | [public/images/](public/images/) |
| 色・文字サイズ・余白 | [src/styles/global.css](src/styles/global.css) の冒頭60行 |
| 固定文言（「詳細を見る」など） | [src/i18n/ui.ts](src/i18n/ui.ts) |

## 公開する

`main` に push すると GitHub Actions が自動でビルド・公開します。
初回のみ Settings → Pages → Source を GitHub Actions に設定してください。

```bash
git add -A
git commit -m "内容を更新"
git push
```
