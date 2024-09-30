export type LocaleType = 'zh-CN' | 'en';

interface Locale {
  label: string
  value: LocaleType
}

export const languageList: Locale[] = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en' },
];
