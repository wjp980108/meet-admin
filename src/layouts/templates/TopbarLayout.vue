<script setup lang="ts">
import logo from '@/assets/images/logo.png';
import HeaderActions from '@/layouts/header/Actions.vue';
import BaseMenu from '@/layouts/menu/BaseMenu.vue';
import Content from '@/layouts/shared/Content.vue';
import Tabs from '@/layouts/shared/Tabs.vue';

defineOptions({ name: 'TopbarLayout' });

const router = useRouter();
const name = import.meta.env.VITE_APP_NAME;
const homePage = import.meta.env.VITE_HOME_PATH;

const headerRef = useTemplateRef<HTMLElement>('headerRef');
const { width } = useElementSize(headerRef, { width: window.innerWidth, height: 0 });
const isCompact = computed(() => width.value <= 405);
</script>

<template>
  <el-container direction="vertical">
    <el-header>
      <div ref="headerRef" class="topbar p-[8px_12px] border-b">
        <div class="top-logo flex-center shrink-0 cursor-pointer" @click="router.push(homePage)">
          <el-image class="w-36" :src="logo" alt="Logo" />
          <span class="ml-[var(--spacing-sm)] whitespace-nowrap text-20px font-bold">{{ name }}</span>
        </div>
        <div class="top-menu-wrap">
          <BaseMenu class="top-menu" mode="horizontal" />
        </div>
        <HeaderActions :compact="isCompact" />
      </div>
      <!-- 页签 -->
      <Tabs />
    </el-header>
    <Content />
  </el-container>
</template>

<style scoped lang="scss">
.top-logo {
  height: 38px;
  margin-right: var(--spacing-base);
}

.top-menu-wrap {
  flex: 1;
  height: 38px;
  min-width: 0;
  display: flex;
  justify-content: center;
}

.topbar {
  display: flex;
  align-items: center;
}

.top-menu {
  width: fit-content;
  max-width: 100%;
  border-bottom: 0;
  --el-menu-bg-color: transparent;
  --el-menu-item-height: 38px;
  --el-menu-item-font-size: var(--el-font-size-medium);
  --el-menu-text-color: var(--el-text-color-primary);
  --el-menu-hover-text-color: var(--el-color-primary);
  --el-menu-active-color: var(--el-color-primary);
  --el-menu-hover-bg-color: transparent;

  :deep(.el-sub-menu__title),
  :deep(.el-menu-item) {
    padding: 0 var(--spacing-base);
  }
}
</style>
