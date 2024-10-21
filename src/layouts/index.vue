<script setup lang="ts">
import LayFooter from '@/layouts/components/LayFooter.vue';
import LayHeader from '@/layouts/components/LayHeader/index.vue';
import LayMenu from '@/layouts/components/LayMenu/index.vue';
import LayTabs from '@/layouts/components/LayTabs/index.vue';
import { useAppStore, useRouteStore } from '@/stores';

defineOptions({ name: 'Layout' });

const appStore = useAppStore();
const routeStore = useRouteStore();

const {
  transitionAnimation,
  loadFlag,
  watermark,
  isDark,
  footer,
} = storeToRefs(appStore);

const watermarkConfig = reactive({
  content: 'Meet you',
  font: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, .15)',
  },
});

watchEffect(() => {
  watermarkConfig.font.color = isDark.value ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)';
});
</script>

<template>
  <el-watermark class="wh-full" :content="watermark ? watermarkConfig.content : ''" :font="watermarkConfig.font">
    <el-container>
      <LayMenu />
      <el-container>
        <el-header>
          <LayHeader />
          <LayTabs />
        </el-header>
        <el-main class="bg-[var(--el-bg-color-page)]" style="--el-main-padding: 0">
          <el-scrollbar
            :wrap-style="{
              'display': 'flex',
              'flex-wrap': 'wrap',
            }"
            :view-style="{
              'display': 'flex',
              'flex': 'auto',
              'overflow': 'hidden',
              'flex-direction': 'column',
            }"
          >
            <router-view v-slot="{ Component, route }">
              <transition :name="transitionAnimation" mode="out-in" appear>
                <keep-alive :include="routeStore.cacheRoutes">
                  <component :is="Component" v-if="loadFlag" :key="route.fullPath" class="main-content" />
                </keep-alive>
              </transition>
            </router-view>
          </el-scrollbar>
        </el-main>
        <LayFooter v-if="footer" />
        <el-tooltip content="返回顶部" placement="top">
          <el-backtop target=".el-scrollbar .el-scrollbar__view" :bottom="120" />
        </el-tooltip>
      </el-container>
    </el-container>
  </el-watermark>
</template>
