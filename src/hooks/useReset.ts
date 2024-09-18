import type { Ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { ref } from 'vue';

/**
 * 一个自定义 hook，返回一个响应式引用（`ref`）和一个重置函数，
 * 用于将引用恢复到其初始的深拷贝状态。
 *
 * @template T
 * @param {T} val - 需要深拷贝并存储的初始值。
 * @returns {[Ref<T>, () => void]} - 返回一个包含响应式引用和重置函数的元组。
 * 响应式引用包含当前值，重置函数可以将引用恢复到最初的深拷贝状态。
 *
 * @example
 * const [value, resetValue] = useReset({ foo: 'bar' });
 * value.value.foo = 'baz'; // 修改值
 * resetValue(); // 将值重置为 { foo: 'bar' }
 */
export function useReset<T>(val: T): [Ref<T>, () => void] {
  const _val = cloneDeep(val); // 保持深拷贝的初始状态
  const res = ref<T>(val); // 使用深拷贝初始化 ref

  function reset() {
    res.value = cloneDeep(_val); // 重置为深拷贝的初始状态
  }

  return [res as Ref<T>, reset];
}
