<script setup lang="ts">
import { languageList } from '@/constants';
import { useAppStore } from '@/stores';

defineOptions({ name: 'Locale' });

const appStore = useAppStore();
const language = computed(() => appStore.locale);
</script>

<template>
  <el-dropdown trigger="click" @command="appStore.setLanguage">
    <span>
      <el-tooltip content="国际化" placement="left">
        <div class="wrapper">
          <app-icon icon="ion:language" size="16" />
        </div>
      </el-tooltip>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in languageList"
          :key="item.value"
          :command="item.value"
          :disabled="language === item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
