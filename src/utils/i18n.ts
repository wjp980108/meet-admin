import type { App } from 'vue';
import en from '@/locales/en';
import zhCN from '@/locales/zh-CN';
import { createI18n, useI18n } from 'vue-i18n';

const messages = {
  en,
  'zh-CN': zhCN,
};

export function installI18n(app: App) {
  // 设置默认语言
  const locale = localStorage.getItem('app-store') ? JSON.parse(localStorage.getItem('app-store')!).locale : 'zh-CN';

  const i18n = createI18n({
    locale,
    messages,
    legacy: false,
    fallbackLocale: 'en',
  });

  app.use(i18n);
}

// 国际化转换工具函数（自动读取根目录locales文件夹下文件进行国际化匹配）
export function $t(key: string) {
  const { t } = useI18n();
  return t(key);
}
