/**
 * 技術スタック。
 * 年数や5段階評価はあえて書きません（学生の自己申告は評価されにくいため）。
 * 代わりに usedIn でどの制作物・研究で使ったかを示し、実績と紐づけます。
 */
export type SkillGroup = {
  category: { ja: string; en: string };
  items: {
    name: string;
    /** 使用した制作物の slug（src/content/works のファイル名）または研究 */
    usedIn?: { ja: string; en: string };
  }[];
};

export const skills: SkillGroup[] = [
  {
    category: { ja: '言語', en: 'Languages' },
    items: [
      { name: 'MATLAB',usedIn: { ja: '研究・データ分析', en: 'Research & analysis' }  },
      { name: 'Python', usedIn: { ja: '研究・データ分析', en: 'Research & analysis' } },
      { name: 'C#', usedIn: { ja: 'ゲーム開発', en: 'Game development' } },
      { name: 'C / C++' },
    ],
  },
  {
    category: { ja: 'エンジン・フレームワーク', en: 'Engines & Frameworks' },
    items: [
      { name: 'Unity', usedIn: { ja: 'ゲーム開発', en: 'Game development' } },
    ],
  },
  {
    category: { ja: 'ツール・環境', en: 'Tools & Environment' },
    items: [
      { name: 'Git / GitHub',usedIn: { ja: 'チーム開発・スクリプト管理', en: 'Team Development' } },
    ],
  },
];
