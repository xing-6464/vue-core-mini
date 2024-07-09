import { reactive } from '@vue/reactivity'
import { isObject } from '@vue/shared'

let uid = 0

export function createComponentInstance(vnode) {
  const { type } = vnode

  const instance = {
    uid: uid++,
    vnode,
    type,
    subTree: null,
    effect: null,
    update: null,
    render: null
  }

  return instance
}

export function setupComponent(instance) {
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance) {
  finishComponentSetup(instance)
}

export function finishComponentSetup(instance) {
  const Component = instance.type

  instance.render = Component.render

  applyOptions(instance)
}

function applyOptions(instance) {
  const { data: dataOptions } = instance.type

  if (dataOptions) {
    const data = dataOptions()
    if (isObject(data)) {
      instance.data = reactive(data)
    }
  }
}
