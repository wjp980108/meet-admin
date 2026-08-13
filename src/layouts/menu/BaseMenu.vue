<script setup lang="ts">
import MenuTree from '@/layouts/menu/MenuTree.vue';
import { useRouteStore } from '@/stores/route';

defineOptions({ name: 'BaseMenu' });

const props = withDefaults(defineProps<{
  mode?: 'vertical' | 'horizontal';
  collapse?: boolean;
  uniqueOpened?: boolean;
  ellipsis?: boolean;
}>(), {
  mode: 'vertical',
  collapse: false,
  uniqueOpened: false,
  ellipsis: true,
});

const route = useRoute();
const routeStore = useRouteStore();
const { menus } = storeToRefs(routeStore);

const defaultActive = computed<string>(() =>
  route.meta?.activeMenu ? route.meta.activeMenu : route.path,
);

const menuTreeMode = computed(() => props.mode === 'horizontal' ? 'top' : 'aside');
</script>

<template>
  <el-menu
    :mode="mode"
    :collapse="collapse"
    :default-active="defaultActive"
    :collapse-transition="false"
    :unique-opened="uniqueOpened"
    :ellipsis="mode === 'horizontal' ? ellipsis : undefined"
  >
    <MenuTree :menu-list="menus" :mode="menuTreeMode" />
  </el-menu>
</template>
