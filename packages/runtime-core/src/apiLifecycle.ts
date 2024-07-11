import { LifecycleHooks } from './component'

function injectHook(type: LifecycleHooks, hook: Function, target: any) {
  if (target) {
    target[type] = hook
    return hook
  }
}

function createHook(lifecycle: LifecycleHooks) {
  return (hook, target) => injectHook(lifecycle, hook, target)
}

export const onBeforeMount = createHook(LifecycleHooks.BEFORE_MOUNT)
export const onMounted = createHook(LifecycleHooks.MOUNTED)
