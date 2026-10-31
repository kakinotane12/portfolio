import type { Lang } from './config';

/** サイト内の固定文言。ここを埋めれば日英が揃う */
export const ui = {
  ja: {
    'nav.works': 'Works',
    'nav.awards': 'Awards',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.skipToContent': '本文へスキップ',
    'nav.menu': 'メニュー',

    'section.about': 'About',
    'section.about.lead': '自己紹介',
    'section.works': 'Works',
    'section.works.lead': '制作物・活動成果',
    'section.awards': 'Awards',
    'section.awards.lead': '表彰・活動',
    'section.skills': 'Skills',
    'section.skills.lead': '技術スタック',
    'section.contact': 'Contact',
    'section.contact.lead': 'お問い合わせ',

    'works.detail': '詳細を見る',
    'works.back': '制作物一覧へ戻る',
    'works.videoLoad': '動画を再生（YouTube を読み込みます）',
    'tech.language': '言語',
    'tech.tool': 'ツール',

    'contact.email': 'メール',
    'contact.github': 'GitHub',

    'modal.close': '閉じる',

    'theme.toggle': 'テーマを切り替える',
    'lang.switch': '言語を切り替える',

    'footer.builtWith': 'Built with Astro',
    'meta.description':
      '四宮依歩稀のポートフォリオ。研究活動とゲーム開発の制作物をまとめています。',
  },
  en: {
    'nav.works': 'Works',
    'nav.awards': 'Awards',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.skipToContent': 'Skip to content',
    'nav.menu': 'Menu',

    'section.about': 'About',
    'section.about.lead': 'About me',
    'section.works': 'Works',
    'section.works.lead': 'Selected projects',
    'section.awards': 'Awards',
    'section.awards.lead': 'Awards & activities',
    'section.skills': 'Skills',
    'section.skills.lead': 'Tools & technologies',
    'section.contact': 'Contact',
    'section.contact.lead': 'Get in touch',

    'works.detail': 'View details',
    'works.back': 'Back to all projects',
    'works.videoLoad': 'Play video (loads YouTube)',
    'tech.language': 'Languages',
    'tech.tool': 'Tools',

    'contact.email': 'Email',
    'contact.github': 'GitHub',

    'modal.close': 'Close',

    'theme.toggle': 'Toggle color theme',
    'lang.switch': 'Switch language',

    'footer.builtWith': 'Built with Astro',
    'meta.description':
      'Portfolio of Ibuki Shinomiya — research activity and game development projects.',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)['ja'];

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui.ja[key];
  };
}
