<script setup lang="ts">
import Avatar from '@/layouts/components/LayHeader/components/Avatar.vue';
import Breadcrumb from '@/layouts/components/LayHeader/components/Breadcrumb.vue';
import Locale from '@/layouts/components/LayHeader/components/Locale.vue';
import SearchMenu from '@/layouts/components/LayHeader/components/SearchMenu.vue';
import ThemeSwitch from '@/layouts/components/LayHeader/components/ThemeSwitch.vue';
import LaySettings from '@/layouts/components/LaySettings/index.vue';
import { useAppStore } from '@/stores';

defineOptions({ name: 'LayHeader' });

const appStore = useAppStore();
const { loadFlag, breadcrumbShow, fullscreen } = storeToRefs(appStore);

// 搜索菜单
const showSearchMenu = ref(false);
function handleSearchMenu() {
  showSearchMenu.value = true;
}
</script>

<template>
  <app-flex class="p-[5px_10px] border-b" justify="space-between" align="center">
    <!-- 左侧 -->
    <app-flex class="overflow-hidden" :size="5" align="center">
      <el-tooltip content="刷新页面">
        <div class="wrapper" @click="appStore.reloadPage()">
          <app-icon :class="loadFlag ? '' : 'is-loading'" icon="icon-park-outline:refresh" />
        </div>
      </el-tooltip>
      <Breadcrumb v-if="breadcrumbShow" />
    </app-flex>
    <!-- 右侧 -->
    <app-flex :size="5" align="center">
      <el-tooltip content="搜索">
        <div class="wrapper" @click="handleSearchMenu">
          <app-icon icon="icon-park-outline:search" />
        </div>
      </el-tooltip>
      <Locale />
      <el-tooltip content="切换全屏">
        <div class="wrapper" @click="appStore.toggleFullScreen">
          <app-icon v-if="fullscreen" icon="icon-park-outline:off-screen-one" />
          <app-icon v-else icon="icon-park-outline:full-screen-one" />
        </div>
      </el-tooltip>
      <ThemeSwitch />
      <LaySettings />
      <Avatar />
    </app-flex>
  </app-flex>
  <!-- 搜索菜单弹窗 -->
  <SearchMenu v-model="showSearchMenu" />
</template>
