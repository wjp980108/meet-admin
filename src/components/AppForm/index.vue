<script setup lang="ts">
import type { Props as AppGridProps } from '@/components/AppGrid/index.vue';
import { $t } from '@/utils';

defineOptions({ name: 'AppForm' });

withDefaults(defineProps<Props>(), {
  labelWidth: 'auto',
  cols: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
  collapsedRows: 1,
  rowGap: 0,
  colGap: 15,
});

interface Props extends AppGridProps {
  labelWidth?: string | number
  search: () => void
  reset: () => void
}

const collapsed = ref(true);

const gridRef = ref();

// const showCollapse = computed(() => {
//   return gridRef.value?.gridContext.overflow;
// });
</script>

<template>
  <el-form :label-width="labelWidth">
    <app-grid ref="gridRef" :cols :collapsed :row-gap="rowGap" :col-gap="colGap" :collapsed-rows="collapsedRows">
      <slot />
      <app-form-item suffix>
        <app-flex>
          <el-button type="primary" @click="search">
            {{ $t('common.query') }}
          </el-button>
          <el-button class="!m-0" @click="reset">
            {{ $t('common.reset') }}
          </el-button>
          <el-button type="primary" link class="!m-0" @click="collapsed = !collapsed">
            {{ collapsed ? $t('common.expand') : $t('common.merge') }}
            <app-icon :icon="collapsed ? 'ArrowDown' : 'ArrowUp'" />
          </el-button>
        </app-flex>
      </app-form-item>
    </app-grid>
  </el-form>
</template>
