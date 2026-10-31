/**
 * サイト全体の基本情報。
 */
export const profile = {
  name: { ja: '四宮 依歩稀', en: 'Ibuki Shinomiya' },
  /** 読みにくい漢字なので、日本語ページでは名前の下に読みを出します */
  nameReading: 'しのみや いぶき',

  /**
   * About セクション本文。
   * 配列の1要素が1段落になります。
   * 段落を分けたいときは要素を増やしてください（末尾のカンマを忘れずに）:
   *   ja: ['1段落目の文章。', '2段落目の文章。'],
   */
  about: {
    ja: [
      '研究と開発を中心に、ゲーム・esports関係の活動に取り組んでいます。',
      '研究では、FPSゲームプレイヤーのエイムパフォーマンスと脳活動の関係を分析し、卒業研究と学会発表を行いました。現在も同テーマで研究を継続しています。',
      '開発では、チームや個人でのVRゲーム制作に取り組み、コンテストへの参加や学会でのデモ展示を経験しました。',
    ],
    en: [
      'I work on games and esports, mainly through research and development.',
      'In research, I analyze the relationship between aiming performance and brain activity in FPS players. I wrote this up as my graduation thesis and presented it at an academic conference, and I am continuing to research the same topic.',
      'In development, I build VR games both in teams and on my own. This work has won a contest award and been shown as a demo at an academic conference.',
    ],
  },

  affiliation: {
    ja: '慶應義塾大学 理工学研究科 人間・社会システム情報科学専攻 [杉本研究室](https://im-lab.net/) 修士1年',
    en: 'First-year master’s student, [InteractiveMediaLab](https://im-lab.net/), School of Informatics, Management, and Human Sciences, Graduate School of Science and Technology, Keio University',
  },

  email: 'shinomiya403812@gmail.com',
  githubUser: 'kakinotane12',
} as const;

export const githubUrl = `https://github.com/${profile.githubUser}`;
