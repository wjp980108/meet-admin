import { setupGlobalDirectives } from '@/directives';
import { installRouter } from '@/router';
import { installPinia } from '@/stores';
import { installI18n } from '@/utils';
import { createApp } from 'vue';
import App from './App.vue';
import '@/styles/index';

async function setupApp() {
  // 创建vue实例
  const app = createApp(App);
  // 注册模块 Pinia
  installPinia(app);
  // 注册模块 Vue-router
  await installRouter(app);
  // 注册全局自定义指令
  setupGlobalDirectives(app);
  // 注册国际化
  installI18n(app);

  app.mount('#app');
}

setupApp().then();
