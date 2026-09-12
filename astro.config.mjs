// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 公開先: https://kakinotane12.github.io/portfolio/
// リポジトリ名を kakinotane12.github.io に変更した場合は base を '/' にするだけでよい
export default defineConfig({
  site: 'https://kakinotane12.github.io',
  base: '/portfolio',
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  build: { format: 'directory' },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ja',
        locales: { ja: 'ja-JP', en: 'en-US' },
      },
    }),
  ],
});
