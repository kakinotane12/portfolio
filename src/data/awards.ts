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
  /** 大会名・学会名・所属など。[表示する文字](URL) と書くとリンクになります */
  org: { ja: string; en: string };
  /** 作品名・論文タイトル。補足的な活動では省略できます */
  title?: { ja: string; en: string };
  results: AwardResult[];
  links?: { label: string; url: string }[];
};

export const awards: AwardEntry[] = [
  {
    date: { ja: '2026年10月', en: 'Oct 2026' },
    org: {
      ja: '[全国学生VRサークル活動報告大会 & XR制作物プレゼン 2026](https://www.youtube.com/watch?v=nz3gcGCO-Fg&t=12074s)',
      en: '[National Student VR Circle Activity Report & XR Work Presentations 2026](https://www.youtube.com/watch?v=nz3gcGCO-Fg&t=12074s)',
    },
    results: [{ label: { ja: 'XR制作物としてEntrust(X)を紹介', en: 'Presented Entrust(X) as an XR work' } }],
  },
  {
    date: { ja: '2026年9月', en: 'Sep 2026' },
    org: {
      ja: '[IVRC 2026 メタバース部門](https://ivrc.net/2026_metaverse/leap-stage/)',
      en: '[IVRC 2026 Metaverse Division](https://ivrc.net/2026_metaverse/leap-stage/)',
    },
    title: { ja: '作品名：Entrust(X)', en: 'Title: Entrust(X)' },
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
          en: 'Demo exhibition at the 31st Annual Conference of the Virtual Reality Society of Japan',
        },
      },
    ],
  },
  {
    date: { ja: '2026年9月', en: 'Sep 2026' },
    org: { ja: '日本心理学会 第90回大会', en: 'The 90th Annual Convention of the Japanese Psychological Association' },
    title: {
      ja: '「シューティングゲーム中の脳活動に対する熟練度の影響」',
      en: '“Effects of Skill Level on Brain Activity during Shooting Game Play”',
    },
    results: [{ label: { ja: 'ポスター発表', en: 'Poster presentation' } }],
  },
  {
    date: { ja: '2026年3月', en: 'Mar 2026' },
    org: {
      ja: '慶應義塾大学 理工学部 情報工学科 卒業論文',
      en: 'Undergraduate Thesis, Department of Information and Computer Science, Faculty of Science and Technology, Keio University',
    },
    title: {
      ja: '「First Person Shooterゲームプレイヤーのエイムパフォーマンスと脳活動の評価」',
      en: '“Evaluation of Aiming Performance and Brain Activity in First-Person Shooter Game Players”',
    },
    results: [{ label: { ja: '🏆優秀卒業論文賞', en: '🏆Outstanding Graduation Thesis Award' }, award: true }],
  },
];
