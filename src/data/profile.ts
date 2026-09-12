/**
 * サイト全体の基本情報。
 * TODO: と書かれた箇所を実データに差し替えてください。
 */
export const profile = {
  name: { ja: '四宮 依歩稀', en: 'Ibuki Shinomiya' },
  /** 読みにくい漢字なので、日本語ページでは名前の下に読みを出します */
  nameReading: 'しのみや いぶき',

  /** About セクション本文 */
  about: {
    ja: [
      'TODO: 大学での研究テーマと、そこで何に興味を持っているかを2〜3文で書きます。',
      'TODO: ゲーム開発を始めたきっかけと、チーム制作で担ってきた役割を2〜3文で書きます。',
      'TODO: これから伸ばしたい方向や、どんな仕事に関わりたいかを1〜2文で書きます。',
    ],
    en: [
      'TODO: Two or three sentences about your research theme and what draws you to it.',
      'TODO: Two or three sentences about how you got into game development and the roles you have taken on in team projects.',
      'TODO: One or two sentences about where you want to grow and the kind of work you want to do.',
    ],
  },

  affiliation: {
    ja: 'ダミー大学 ダミー学部 ダミー学科',
    en: 'Dummy University, Faculty of Dummy Studies',
  },
  graduation: {
    ja: '2027年3月 卒業予定',
    en: 'Expected graduation: March 2027',
  },
  location: { ja: '日本', en: 'Japan' },

  /** TODO: 公開してよい連絡用メールアドレスに差し替えてください */
  email: 'TODO@example.com',
  githubUser: 'kakinotane12',
} as const;

export const githubUrl = `https://github.com/${profile.githubUser}`;
