export type LanguageType = 'zh-CN' | 'en';

interface Language {
  label: string
  value: LanguageType
}

export const languageList: Language[] = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en' },
];
