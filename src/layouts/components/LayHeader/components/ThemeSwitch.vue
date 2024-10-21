<script setup lang="ts">
import { useTheme } from '@/hooks';
import { useAppStore } from '@/stores';
import { $t, renderIcon } from '@/utils';

defineOptions({ name: 'ThemeSwitch' });

const appStore = useAppStore();
const { buttonTip } = storeToRefs(appStore);

const theme = computed(() => appStore.storeColorMode);

const { setColorMode } = useTheme();

const themeList = [
  { key: 'light', icon: 'icon-park-outline:sun-one' },
  { key: 'dark', icon: 'icon-park-outline:moon' },
  { key: 'auto', icon: 'icon-park-outline:laptop-computer' },
];
</script>

<template>
  <el-dropdown class="theme-switch" trigger="click" @command="setColorMode">
    <span>
      <el-tooltip :content="$t(`theme.${appStore.storeColorMode}`)" placement="left" :disabled="!buttonTip">
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
          :key="item.key"
          :command="item.key"
          :icon="renderIcon(item.icon)"
          :disabled="theme === item.key"
        >
          {{ $t(`theme.${item.key}`) }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
