import mitt from 'mitt';

const emitter = mitt();

interface EventBus {
  event: string
  handler: () => void
}

/**
 * 用于使用事件总线。
 * 提供注册、注销和触发事件的方法。
 *
 * @returns 包含 `on`、`off` 和 `emit` 方法的对象。
 */
export function useEventBus() {
  const listeners: EventBus[] = [];
  const isFirstActivation = ref(true); // 用于跟踪是否是第一次激活

  /**
   * 注册一个事件监听器，并将其存储在内部列表中
   * @param event - 事件名称
   * @param handler - 事件触发时的回调函数
   */
  function on(event: string, handler: () => void) {
    emitter.on(event, handler);
    listeners.push({ event, handler }); // 将监听器添加到列表中
  }

  /**
   * 手动移除一个事件监听器
   * @param event - 事件名称
   * @param handler - 要移除的回调函数
   */
  function off(event: string, handler: () => void) {
    emitter.off(event, handler);
  }

  /**
   * 触发一个事件
   * @param event - 事件名称
   * @param payload - 传递给回调函数的数据
   */
  function emit(event: string, payload?: () => void) {
    emitter.emit(event, payload);
  }

  // 注册所有事件监听器
  const registerListeners = () => {
    // 如果不是第一次激活，则重新注册所有事件监听器
    if (!isFirstActivation.value) {
      listeners.forEach(({ event, handler }) => {
        emitter.on(event, handler);
      });
    }
    else {
      isFirstActivation.value = false; // 标记为已经激活过
    }
  };

  // 移除所有事件监听器
  const unregisterListeners = () => {
    listeners.forEach(({ event, handler }) => {
      emitter.off(event, handler);
    });
  };

  // 在组件卸载时移除所有事件监听器
  onUnmounted(unregisterListeners);
  // 在组件激活时注册所有事件监听器
  onActivated(registerListeners);
  // 在组件停用时移除所有事件监听器
  onDeactivated(unregisterListeners);

  return { on, off, emit };
}
