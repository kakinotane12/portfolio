/**
 * tech 名 → アイコンと分類の対応表。
 *
 * frontmatter の `tech:` は ja/en それぞれに自由記述のフラットな配列で書かれる。
 * 「言語かツールか」はここで解決するので、md 側にグループ構造を持たせる必要はない。
 * 未登録の名前は 'code' / 'tool' にフォールバックするため、どんな文字列が来ても
 * 行の左端は必ず揃うし、表示が落ちることもない。
 *
 * いまは src/icons/ の中立グリフを指している。各ブランドの公式ロゴに差し替える
 * ときは、src/icons/ に SVG を足して icon の値を変えるだけでよい。
 */
export type TechIconName =
  | 'code'
  | 'cube'
  | 'network'
  | 'shading'
  | 'file-text'
  | 'git-branch'
  | 'headset'
  | 'cloud'
  | 'server';

/** 詳細表示で行を分ける単位。表示順もこの並び */
export const TECH_GROUPS = ['language', 'tool'] as const;
export type TechGroup = (typeof TECH_GROUPS)[number];

export const FALLBACK_ICON: TechIconName = 'code';
const FALLBACK_GROUP: TechGroup = 'tool';

type TechMeta = { icon: TechIconName; group: TechGroup };

/** キーは normalize() を通した形（小文字・空白なし）で書くこと */
const TECH: Record<string, TechMeta> = {
  // 言語
  'c#': { icon: 'code', group: 'language' },
  'c/c++': { icon: 'code', group: 'language' },
  python: { icon: 'code', group: 'language' },
  typescript: { icon: 'code', group: 'language' },
  javascript: { icon: 'code', group: 'language' },
  matlab: { icon: 'code', group: 'language' },
  udonsharp: { icon: 'code', group: 'language' },
  'udon#': { icon: 'code', group: 'language' },
  'u#': { icon: 'code', group: 'language' },
  hlsl: { icon: 'shading', group: 'language' },
  shader: { icon: 'shading', group: 'language' },

  // ツール・環境
  unity: { icon: 'cube', group: 'tool' },
  blender: { icon: 'cube', group: 'tool' },
  vrchat: { icon: 'headset', group: 'tool' },
  pytorch: { icon: 'network', group: 'tool' },
  'git/github': { icon: 'git-branch', group: 'tool' },
  git: { icon: 'git-branch', group: 'tool' },
  github: { icon: 'git-branch', group: 'tool' },
  googleappsscript: { icon: 'cloud', group: 'tool' },
  gas: { icon: 'cloud', group: 'tool' },
  render: { icon: 'server', group: 'tool' },
  latex: { icon: 'file-text', group: 'tool' },
  figma: { icon: 'file-text', group: 'tool' },
};

const normalize = (name: string) => name.toLowerCase().replace(/\s+/g, '');

export function techIcon(name: string): TechIconName {
  return TECH[normalize(name)]?.icon ?? FALLBACK_ICON;
}

export function techGroup(name: string): TechGroup {
  return TECH[normalize(name)]?.group ?? FALLBACK_GROUP;
}

/**
 * tech をグループごとにまとめる。
 * 空のグループは返さないので、言語しか無い作品でも空行は出ない。
 * グループ内の並びは frontmatter の記述順をそのまま保つ。
 */
export function groupTech(tech: string[]): { group: TechGroup; items: string[] }[] {
  return TECH_GROUPS.map((group) => ({
    group,
    items: tech.filter((item) => techGroup(item) === group),
  })).filter(({ items }) => items.length > 0);
}
