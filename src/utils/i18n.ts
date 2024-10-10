import type { App } from 'vue';
import messages from '@intlify/unplugin-vue-i18n/messages';
import { createI18n } from 'vue-i18n';

// 设置默认语言
const locale = localStorage.getItem('app-store') ? JSON.parse(localStorage.getItem('app-store')!).locale : 'zh-CN';

export const i18n = createI18n({
  locale,
  messages,
  legacy: false,
  fallbackLocale: 'en-US',
});

export function installI18n(app: App) {
  app.use(i18n);
}

// 国际化转换工具函数（自动读取根目录locales文件夹下文件进行国际化匹配）
export function $t(key: string) {
  return i18n.global.t(key);
}
