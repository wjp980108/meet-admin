import en from 'element-plus/es/locale/lang/en';
import zhCN from 'element-plus/es/locale/lang/zh-cn';

export type LocaleType = 'zh-CN' | 'en-US';

interface Locale {
  label: string
  value: LocaleType
}

// locale list
export const localeList: Locale[] = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
];

// element-plus locale
export const elLocale = {
  'zh-CN': zhCN,
  'en-US': en,
};
