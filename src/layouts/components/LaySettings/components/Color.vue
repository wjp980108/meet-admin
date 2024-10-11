<script setup lang="ts">
import { useTheme } from '@/hooks';
import { useAppStore } from '@/stores';
import { $t } from '@/utils';

defineOptions({ name: 'ColorSettings' });

const appStore = useAppStore();
const { themeColor } = storeToRefs(appStore);

const { predefineColors, changeTheme } = useTheme();
</script>

<template>
  <app-flex vertical>
    <app-flex justify="space-between" align="center">
      {{ $t('theme.color.primary') }}
      <el-color-picker :model-value="themeColor.primary.color" :predefine="predefineColors" @change="changeTheme($event, 'primary')" />
    </app-flex>
    <app-flex justify="space-between" align="center">
      {{ $t('theme.color.success') }}
      <el-color-picker :model-value="themeColor.success.color" :predefine="predefineColors" @change="changeTheme($event, 'success')" />
    </app-flex>
    <app-flex justify="space-between" align="center">
      {{ $t('theme.color.warning') }}
      <el-color-picker :model-value="themeColor.warning.color" :predefine="predefineColors" @change="changeTheme($event, 'warning')" />
    </app-flex>
    <app-flex justify="space-between" align="center">
      {{ $t('theme.color.danger') }}
      <el-color-picker :model-value="themeColor.danger.color" :predefine="predefineColors" @change="changeTheme($event, 'danger')" />
    </app-flex>
    <app-flex justify="space-between" align="center">
      {{ $t('theme.color.info') }}
      <el-color-picker :model-value="themeColor.info.color" :predefine="predefineColors" @change="changeTheme($event, 'info')" />
    </app-flex>
  </app-flex>
</template>
