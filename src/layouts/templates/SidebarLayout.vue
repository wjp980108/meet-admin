<script setup lang="ts">
import logo from '@/assets/images/logo.png';
import HeaderActions from '@/layouts/header/Actions.vue';
import Breadcrumb from '@/layouts/header/Breadcrumb.vue';
import BaseMenu from '@/layouts/menu/BaseMenu.vue';
import Content from '@/layouts/shared/Content.vue';
import Tabs from '@/layouts/shared/Tabs.vue';
import { useAppStore } from '@/stores/app';

defineOptions({ name: 'SidebarLayout' });

const appStore = useAppStore();
const { loadFlag, breadcrumbShow, collapse } = storeToRefs(appStore);

const router = useRouter();
const name = import.meta.env.VITE_APP_NAME;
const homePage = import.meta.env.VITE_HOME_PATH;

const headerRef = useTemplateRef<HTMLElement>('headerRef');
const { width } = useElementSize(headerRef, { width: window.innerWidth, height: 0 });
const isShowBreadcrumb = ref(true);
const isCompact = ref(false);

const updateHeader = useDebounceFn((width: number) => {
  isShowBreadcrumb.value = width > 768;
  isCompact.value = width <= 405;
}, 100);

watchEffect(() => {
  updateHeader(width.value);
});
</script>

<template>
  <el-container>
    <el-aside :width="collapse ? '65px' : '210px'">
      <div class="logo flex-center cursor-pointer" @click="router.push(homePage)">
        <el-image class="w-50" :src="logo" alt="Logo" />
        <span v-show="!collapse" class="logo-text">{{ name }}</span>
      </div>
      <el-scrollbar>
        <BaseMenu class="!b-r-0" :collapse unique-opened />
      </el-scrollbar>
      <div class="aside-toggle-bar" @click="collapse = !collapse">
        <div class="aside-toggle-bar-top" />
        <div class="aside-toggle-bar-bottom" />
      </div>
    </el-aside>
    <el-container direction="vertical">
      <el-header>
        <app-flex ref="headerRef" class="p-[8px_12px] border-b" justify="space-between" align="center">
          <app-flex class="overflow-hidden" :size="8" align="center">
            <div class="wrapper" @click="appStore.reloadPage()">
              <app-icon :class="loadFlag ? '' : 'is-loading'" icon="icon-park-outline:refresh" />
            </div>
            <Breadcrumb v-if="isShowBreadcrumb && breadcrumbShow" />
          </app-flex>
          <HeaderActions :compact="isCompact" />
        </app-flex>
        <!-- 页签 -->
        <Tabs />
      </el-header>
      <Content />
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.el-aside {
  position: relative;
  z-index: 1;
  overflow: unset;
  color: var(--el-menu-text-color);
  background-color: var(--el-menu-bg-color);
  border-right: 1px solid var(--el-border-color);
  transition: width 0.3s ease;

  .logo {
    height: 55px;

    .logo-text {
      margin-left: var(--spacing-sm);
      font-size: 22px;
      font-weight: bold;
      white-space: nowrap;
    }
  }

  .el-scrollbar {
    height: calc(100vh - 55px);

    :deep(.el-menu) {
      width: 100%;
      --el-menu-item-height: 50px;
      --el-menu-item-font-size: var(--el-font-size-medium);

      .el-text {
        --el-text-font-size: var(--el-font-size-medium);
      }
    }
  }

  .aside-toggle-bar {
    cursor: pointer;
    height: 72px;
    width: 32px;
    position: absolute;
    top: calc(50% - 36px);
    right: -28px;

    &:hover {
      .aside-toggle-bar-top,
      .aside-toggle-bar-bottom {
        background-color: var(--app-toggle-bar-color-hover);
      }

      .aside-toggle-bar-top {
        transform: rotate(12deg) scale(1.15) translateY(-2px);
      }

      .aside-toggle-bar-bottom {
        transform: rotate(-12deg) scale(1.15) translateY(2px);
      }
    }

    &-top,
    &-bottom {
      position: absolute;
      width: 4px;
      border-radius: 2px;
      height: 38px;
      left: 14px;
      transition:
        background-color 0.3s var(--app-bezier),
        transform 0.3s var(--app-bezier);
      background-color: var(--app-toggle-bar-color);
    }

    &-bottom {
      top: 34px;
    }
  }

  &:has(.el-menu--collapse) {
    :deep(.is-active) {
      .el-sub-menu__title {
        color: var(--el-color-white) !important;
        background-color: var(--el-color-primary-light-2) !important;
      }
    }

    .aside-toggle-bar:hover {
      .aside-toggle-bar-top {
        transform: rotate(-12deg) scale(1.15) translateY(-2px);
      }

      .aside-toggle-bar-bottom {
        transform: rotate(12deg) scale(1.15) translateY(2px);
      }
    }
  }
}
</style>
