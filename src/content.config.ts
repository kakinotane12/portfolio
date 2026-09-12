import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 制作物コレクション。
 * ファイルは src/content/works/{ja,en}/<key>.md に置きます。
 * 同じ key のファイルを ja と en に両方用意すると、言語切り替えで同じ作品に飛べます。
 */
const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    /** 言語。ディレクトリ名と揃えてください */
    lang: z.enum(['ja', 'en']),
    /** URL に使う識別子。ja と en で同じ値にします */
    key: z.string(),

    title: z.string(),
    /** 一覧とカードに出る一言説明 */
    summary: z.string(),

    period: z.string(),
    role: z.string(),
    teamSize: z.string().optional(),
    tech: z.array(z.string()).default([]),
    /** カテゴリ表示用（例: ゲーム開発 / 研究） */
    category: z.string().optional(),

    /** public/images/ からの相対パス */
    cover: z.string().optional(),
    coverAlt: z.string().default(''),

    /** YouTube の動画ID（URL ではなく ID のみ） */
    youtube: z.string().optional(),

    screenshots: z
      .array(z.object({ src: z.string(), alt: z.string().default('') }))
      .default([]),

    links: z
      .array(z.object({ label: z.string(), url: z.string() }))
      .default([]),

    /** 並び順。小さいほど先頭 */
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

export const collections = { works };
