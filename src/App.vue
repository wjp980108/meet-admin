<script setup lang="ts">
import { useTheme } from '@/hooks';
import { useAppStore } from '@/stores';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

const appStore = useAppStore();

const locale = computed(() => {
  return appStore.locale === 'zh-CN' ? zhCn : en;
});

const { initTheme } = useTheme();
onMounted(initTheme);
</script>

<template>
  <el-config-provider :locale :size="appStore.size" :message="{ max: 1 }">
    <router-view />
  </el-config-provider>
</template>
