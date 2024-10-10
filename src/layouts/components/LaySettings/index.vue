<script setup lang="ts">
import { localeList } from '@/constants';
import { useTheme } from '@/hooks';
import ColorSettings from '@/layouts/components/LaySettings/components/Color.vue';
import { useAppStore } from '@/stores';
import { $t } from '@/utils';

defineOptions({ name: 'LaySettings' });

const appStore = useAppStore();

const {
  storeColorMode,
  size,
  asideInverted,
  breadcrumbShow,
  breadcrumbIconShow,
  transitionAnimation,
  tabStyle,
  watermark,
  locale,
} = storeToRefs(appStore);

const showSetting = ref(false);

const colorModeOptions = [
  { label: 'light', value: 'light', icon: 'icon-park-outline:sun-one' },
  { label: 'dark', value: 'dark', icon: 'icon-park-outline:moon' },
  { label: 'auto', value: 'auto', icon: 'icon-park-outline:laptop-computer' },
];

const layoutOptions = ['default', 'large', 'small'];

const { setColorMode, setMenuTheme } = useTheme();
</script>

<template>
  <div class="app-setting">
    <el-tooltip :content="$t('systemSettings.title')">
      <div class="wrapper" @click="showSetting = true">
        <app-icon icon="icon-park-outline:setting" />
      </div>
    </el-tooltip>
    <el-drawer v-model="showSetting" class="text-14" :title="$t('systemSettings.title')" :size="350">
      <!-- 布局样式 -->
      <el-divider>{{ $t('systemSettings.layout.title') }}</el-divider>
      <el-segmented v-model="size" :options="layoutOptions" block>
        <template #default="{ item }">
          {{ $t(`systemSettings.layout.${item}`) }}
        </template>
      </el-segmented>
      <!-- 主题模式 -->
      <el-divider>{{ $t('systemSettings.themeMode.title') }}</el-divider>
      <app-flex vertical>
        <el-segmented :model-value="storeColorMode" :options="colorModeOptions" block @change="setColorMode">
          <template #default="{ item }">
            <app-flex justify="center">
              <app-icon :icon="item.icon" />
            </app-flex>
          </template>
        </el-segmented>
        <app-flex align="center">
          <app-flex :size="0" align="center">
            {{ $t('systemSettings.themeMode.sidebar') }}
            <app-help-info :message="$t('systemSettings.themeMode.sidebarHelpInfo')" />
          </app-flex>
          <el-switch v-model="asideInverted" @change="setMenuTheme" />
        </app-flex>
      </app-flex>
      <!-- 主题颜色 -->
      <el-divider>{{ $t('systemSettings.themeColor.title') }}</el-divider>
      <ColorSettings />
      <!-- 页面设置 -->
      <el-divider>{{ $t('systemSettings.pageConfig.title') }}</el-divider>
      <app-flex vertical>
        <app-flex justify="space-between" align="center">
          {{ $t('systemSettings.pageConfig.locale') }}
          <el-select v-model="locale" class="!w-155" @change="appStore.setLocale">
            <el-option v-for="item of localeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </app-flex>
        <app-flex justify="space-between" align="center">
          {{ $t('systemSettings.pageConfig.pageSwitching') }}
          <el-select v-model="transitionAnimation" class="!w-155">
            <el-option :label="$t('systemSettings.pageConfig.effect.fade')" value="fade" />
            <el-option :label="$t('systemSettings.pageConfig.effect.fade-slide')" value="fade-slide" />
            <el-option :label="$t('systemSettings.pageConfig.effect.fade-bottom')" value="fade-bottom" />
            <el-option :label="$t('systemSettings.pageConfig.effect.fade-scale')" value="fade-scale" />
            <el-option :label="$t('systemSettings.pageConfig.effect.zoom-fade')" value="zoom-fade" />
            <el-option :label="$t('systemSettings.pageConfig.effect.zoom-out')" value="zoom-out" />
            <el-option :label="$t('systemSettings.pageConfig.effect.no')" value=" " />
          </el-select>
        </app-flex>
        <app-flex justify="space-between" align="center">
          {{ $t('systemSettings.breadcrumbs.title') }}
          <el-switch v-model="breadcrumbShow" :active-text="$t('common.show')" :inactive-text="$t('common.hide')" inline-prompt />
        </app-flex>
        <app-flex justify="space-between" align="center">
          {{ $t('systemSettings.breadcrumbs.icon') }}
          <el-switch v-model="breadcrumbIconShow" :active-text="$t('common.show')" :inactive-text="$t('common.hide')" inline-prompt />
        </app-flex>
        <app-flex justify="space-between" align="center">
          {{ $t('systemSettings.tabStyle.title') }}
          <el-select v-model="tabStyle" class="!w-155">
            <el-option :label="$t('systemSettings.tabStyle.dynamic')" value="dynamic" />
            <el-option :label="$t('systemSettings.tabStyle.card')" value="card" />
            <el-option :label="$t('systemSettings.tabStyle.simple')" value="simple" />
          </el-select>
        </app-flex>
        <app-flex justify="space-between" align="center">
          {{ $t('systemSettings.watermark') }}
          <el-switch v-model="watermark" :active-text="$t('common.show')" :inactive-text="$t('common.hide')" inline-prompt />
        </app-flex>
      </app-flex>
      <template #footer>
        <el-button type="danger" @click="appStore.handleAppReset">
          {{ $t('common.reset') }}
        </el-button>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.app-setting {
  :deep(.el-overlay) {
    .el-drawer {
      --el-drawer-padding-primary: 15px;

      .el-drawer__header {
        margin: 0;
        padding-bottom: var(--el-drawer-padding-primary);
        border-bottom: 1px solid var(--el-border-color);
        color: var(--el-text-color-primary);
      }

      .el-drawer__footer {
        border-top: 1px solid var(--el-border-color);
      }
    }
  }
}
</style>
