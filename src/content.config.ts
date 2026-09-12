import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 制作物コレクション。
 * ファイルは src/content/works/{ja,en}/<key>.md に置きます。
 * 同じ key のファイルを ja と en に両方用意すると、言語切り替えで同じ作品に飛べます。
 *
 * 本文は使わず、この定義の項目だけで表示しています。
 */
const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    /** 言語。ディレクトリ名と揃えてください */
    lang: z.enum(['ja', 'en']),
    /** URL に使う識別子。ja と en で同じ値にします */
    key: z.string(),

    title: z.string(),
    /** 一覧カードに出る一言。1〜2行が目安 */
    summary: z.string(),
    /**
     * 受賞内容・関連する活動。一覧カードの summary の下に、同じ体裁で並びます。
     * 強調は「表彰・活動」セクションが担うので、ここでは目立たせません。
     *
     * 複数あるときは award: | と書いて改行で区切ると、1行につき1項目として並びます。
     */
    award: z.string().optional(),
    /**
     * 詳細（モーダル・個別ページ）に出る説明文。
     * 概要と自分の役割をここにまとめて書きます。
     * 改行を入れると段落が分かれます。
     * 未設定のときは summary が使われます。
     */
    description: z.string().optional(),

    period: z.string(),
    /**
     * 担当した役割。
     * 現在どこにも表示していません（役割は description の文章の中に書く方針）。
     * 書いても書かなくてもエラーにはなりません。
     */
    role: z.string().optional(),
    tech: z.array(z.string()).default([]),
    /** カテゴリ表示用（例: ゲーム開発 / 研究） */
    category: z.string().optional(),

    /** public/images/ からの相対パス */
    cover: z.string().optional(),
    coverAlt: z.string().default(''),

    /**
     * 自前の動画ファイル。public/images/ に置いて /images/xxx.mp4 のように指定します。
     * YouTube より優先度は下、写真より上です。
     */
    video: z.string().optional(),
    /** 動画の再生前に表示する画像。未指定なら cover が使われます */
    poster: z.string().optional(),

    /**
     * YouTube の動画。共有URLをそのまま貼っても、IDだけを書いてもかまいません。
     * 設定すると、詳細では写真より動画が優先されます。
     */
    youtube: z
      .string()
      .optional()
      .transform((value) => {
        const input = value?.trim();
        if (!input) return undefined;
        // https://youtu.be/XXXX / watch?v=XXXX / embed/XXXX / shorts/XXXX に対応
        const fromUrl = input.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
        if (fromUrl) return fromUrl[1];
        // ID だけが書かれている場合
        return /^[A-Za-z0-9_-]{11}$/.test(input) ? input : undefined;
      }),

    /** 並び順。小さいほど先頭 */
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

export const collections = { works };
