/**
 * 表彰・活動。
 * 受賞、学会発表、展示などをまとめて時系列（新しい順）で並べます。
 *
 * results には「最優秀賞」「ポスター発表」などを並べます。
 * award: true を付けたものはアクセント色のバッジになり、それ以外は補足行として出ます。
 */
export type AwardResult = {
  label: { ja: string; en: string };
  /** 受賞として強調するか */
  award?: boolean;
};

export type AwardEntry = {
  /** 表示する年月 */
  date: { ja: string; en: string };
  /** 大会名・学会名・所属など */
  org: { ja: string; en: string };
  /** 作品名・論文タイトル */
  title: { ja: string; en: string };
  results: AwardResult[];
  links?: { label: string; url: string }[];
};

export const awards: AwardEntry[] = [
  {
    date: { ja: '2026年9月', en: 'Sep 2026' },
    org: { ja: 'IVRC 2026 メタバース部門', en: 'IVRC 2026 Metaverse Division' },
    title: { ja: '作品名：Entrust(X)', en: 'Game Title：Entrust(X)' },
    results: [
      { label: { ja: '🏆最優秀賞', en: '🏆Grand Prize' }, award: true },
      {
        label: {
          ja: '🏆長谷川晶一賞（特別審査員賞）',
          en: '🏆Shoichi Hasegawa Award (Special Jury Prize)',
        },
        award: true,
      },
      {
        label: {
          ja: '第31回日本バーチャルリアリティ学会大会でデモ展示',
          en: 'Demo exhibition at the Virtual Reality Society of Japan',
        },
      },
    ],
  },
  {
    date: { ja: '2026年9月', en: 'Sep 2026' },
    org: { ja: '日本心理学会 第90回大会', en: 'The Japanese Psychological Association' },
    title: {
      ja: '「シューティングゲーム中の脳活動に対する熟練度の影響」',
      en: 'Title: Effects of skill level on brain activity during shooting game play',
    },
    results: [{ label: { ja: 'ポスター発表', en: 'Poster presentation' } }],
  },
  {
    date: { ja: '2026年3月', en: 'Mar 2026' },
    org: {
      ja: '慶應義塾大学 理工学部 情報工学科 卒業論文',
      en: 'Department of Information and Computer Science, Keio University',
    },
    title: {
      ja: '「First Person Shooterゲームプレイヤーのエイムパフォーマンスと脳活動の評価」',
      en: 'Title: Evaluation of aiming performance and brain activity in first-person shooter game players',
    },
    results: [{ label: { ja: '🏆優秀卒業論文賞', en: '🏆Outstanding Graduation Thesis Award' }, award: true }],
  },
];
