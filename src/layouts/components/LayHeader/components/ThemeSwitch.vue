<script setup lang="ts">
import { useTheme } from '@/hooks';
import { useAppStore } from '@/stores';
import { renderIcon } from '@/utils';

defineOptions({ name: 'ThemeSwitch' });

const appStore = useAppStore();

// 设置提示文本
function setTooltipText() {
  const themeInfo = {
    light: '浅色主题',
    dark: '深色主题',
    auto: '跟随系统',
  };
  return themeInfo[appStore.storeColorMode];
}

const theme = computed(() => appStore.storeColorMode);

const { setColorMode } = useTheme();

const themeList = [
  { label: '浅色', value: 'light', icon: 'icon-park-outline:sun-one' },
  { label: '深色', value: 'dark', icon: 'icon-park-outline:moon' },
  { label: '跟随系统', value: 'auto', icon: 'icon-park-outline:laptop-computer' },
];
</script>

<template>
  <el-dropdown class="theme-switch" trigger="click" @command="setColorMode">
    <span>
      <el-tooltip :content="setTooltipText()" placement="left">
        <div class="wrapper">
          <app-icon v-if="appStore.storeColorMode === 'light'" icon="icon-park-outline:sun-one" size="16" />
          <app-icon v-if="appStore.storeColorMode === 'dark'" icon="icon-park-outline:moon" />
          <app-icon v-if="appStore.storeColorMode === 'auto'" icon="icon-park-outline:laptop-computer" />
        </div>
      </el-tooltip>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in themeList"
          :key="item.value"
          :command="item.value"
          :icon="renderIcon(item.icon)"
          :disabled="theme === item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
