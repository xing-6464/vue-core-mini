import { ShapeFlags } from 'packages/shared/src/shapeFlags'
import { Text, createVNode } from './vnode'

export function normalizeVNode(child) {
  if (typeof child === 'object') {
    return cloneIfMounted(child)
  } else {
    return createVNode(Text, null, String(child))
  }
}

export function cloneIfMounted(child) {
  return child
}

export function renderComponentRoot(instance) {
  const { vnode, render, data } = instance

  let result

  try {
    if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
      result = normalizeVNode(render!.call(data))
    }
  } catch (e) {
    console.error(e)
  }

  return result
}
