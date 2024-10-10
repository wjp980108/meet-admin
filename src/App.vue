<script setup lang="ts">
import { Constant, elLocale } from '@/constants';
import { useEventBus, useTheme } from '@/hooks';
import { useAppStore, useRouteStore, useTabStore } from '@/stores';
import { $t, setDocumentTitle } from '@/utils';

const appStore = useAppStore();

const locale = computed(() => {
  return elLocale[appStore.locale];
});

const { initTheme } = useTheme();
onMounted(initTheme);

const tabStore = useTabStore();
const routeStore = useRouteStore();
const router = useRouter();
const route = useRoute();

// 监听语言变化
const { on } = useEventBus();
on(Constant.LOCALE_EVENT, async () => {
  if (route.path === '/login') {
    setDocumentTitle($t('page.login.title'));
  }
  else {
    await routeStore.initAuthRoute();
    await router.replace(route.fullPath);
    tabStore.tabLocale();
  }
});
</script>

<template>
  <el-config-provider :locale :size="appStore.size" :message="{ max: 1 }">
    <router-view />
  </el-config-provider>
</template>
