/**
 * サイト全体の基本情報。
 * TODO: と書かれた箇所を実データに差し替えてください。
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
      '研究では、FPSゲームプレイヤーのエイムパフォーマンスと脳活動の関係を分析し、卒業研究と学会発表を行いました。現在も同テーマで研究活動を行っています。',
      '開発では、チームや個人でのVRゲーム制作に取り組み、コンテストでの受賞や学会でのデモ展示を経験しました。',
    ],
    en: [
      'My work centres on games and esports, mainly through academic research and game development.',
      'My research analyses the relationship between aiming performance and brain activity in FPS players, written up as my graduation thesis and presented at an academic conference.',
      'On the development side, I build VR games with a team — work that has won a contest award and been exhibited as a demo at an academic conference.',
    ],
  },

  affiliation: {
    ja: '慶應義塾大学 理工学研究科 人間・社会システム情報科学専攻 [杉本研究室](https://im-lab.net/) 修士1年',
    en: 'M1 Student,Interactive Media Lab, School of Informatics, Management, and Human Sciences, Graduate School of Science and Technology, Keio University',
  },

  /** TODO: 公開してよい連絡用メールアドレスに差し替えてください */
  email: 'TODO@example.com',
  githubUser: 'kakinotane12',
} as const;

export const githubUrl = `https://github.com/${profile.githubUser}`;
