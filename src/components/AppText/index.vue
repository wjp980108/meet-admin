<script setup lang="ts">
import type { Placement, TextProps } from 'element-plus';
import { ref } from 'vue';

defineOptions({ name: 'AppText' });

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom',
  offset: 5,
});

interface Props extends Partial<TextProps> {
  placement?: Placement
  offset?: number
}

// 是否需要显示 tooltip
const disabled = ref(true);

// 判断是否需要显示 tooltip
function handleHover(event: MouseEvent) {
  const el = event.target as HTMLElement;

  if (!props.lineClamp) {
    // 单行省略
    disabled.value = el.scrollWidth <= el.clientWidth;
  }
  else {
    // 多行省略
    disabled.value = el.scrollHeight <= el.clientHeight;
  }

  // 提取插槽中的文本内容
  extractSlotText();
}

const slots = useSlots();

// 提取插槽中的文本内容
const slotText = ref('');

// 获取插槽中的文本内容
function extractSlotText() {
  if (slots.default) {
    // 获取默认插槽的虚拟节点数组
    const vNodes = slots.default();
    // 遍历虚拟节点，提取文本节点内容
    vNodes.forEach((node) => {
      slotText.value = node.children as string;
    });
  }
}
</script>

<template>
  <el-tooltip :content="slotText" :disabled="disabled" :placement :offset>
    <el-text v-bind="$props" @mouseover.self="handleHover">
      <slot />
    </el-text>
  </el-tooltip>
</template>
