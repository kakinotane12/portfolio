export const languages = {
  ja: { label: '日本語', htmlLang: 'ja', short: 'JA' },
  en: { label: 'English', htmlLang: 'en', short: 'EN' },
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'ja';
export const langCodes = Object.keys(languages) as Lang[];

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** base と言語プレフィックスを付けた絶対パスを返す。localizePath('/', 'en') -> '/portfolio/en/' */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  return `${BASE}${prefix}/${clean ? clean + '/' : ''}`;
}

/**
 * 言語プレフィックスを付けない静的アセット用パス。
 * http(s) で始まる外部URLはそのまま返します（YouTubeのサムネイルなど）。
 */
export function asset(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE}/${path.replace(/^\/+/, '')}`;
}
