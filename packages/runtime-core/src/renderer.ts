import { ShapeFlags } from 'packages/shared/src/shapeFlags'
import { Fragment, Text, Comment, isSomeVNodeType } from './vnode'
import { EMPTY_OBJ } from '@vue/shared'

export interface RendererOptions {
  /**
   * 为指定的 element 的 props 打补丁
   */
  patchProp(el: Element, key: string, preValue: any, nextValue: any): void
  /**
   * 为指定的 Element 设置 text
   */
  setElementText(node: Element, txet: string): void
  /**
   * 插入到指定 el 的 parent 中， anchor 表示插入的位置，即：锚点
   */
  insert(el, parent: Element, anchor?): void
  /**
   * 创建 element
   */
  createElement(type: string)
  remove(el: Element)
}

export function createRenderer(options: RendererOptions) {
  return baseCreateRenderer(options)
}

function baseCreateRenderer(options: RendererOptions): any {
  const {
    insert: hostInsert,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    setElementText: hostSetElementText,
    remove: hostRemove
  } = options

  const processElement = (oldVNode, newVNode, container, anchor) => {
    if (oldVNode == null) {
      // 挂
      mountElement(newVNode, container, anchor)
    } else {
      // 更新
      patchElement(oldVNode, newVNode)
    }
  }

  // 挂载 element
  const mountElement = (VNode, container, anchor) => {
    const { type, props, shapeFlag } = VNode
    const el = (VNode.el = hostCreateElement(type))

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // 设置文本
      hostSetElementText(el, VNode.children)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    }

    // 设置 props
    if (props) {
      for (const key in props) {
        hostPatchProp(el, key, null, props[key])
      }
    }

    // 插入
    hostInsert(el, container, anchor)
  }

  // 更新 element
  const patchElement = (oldVNode, newVNode) => {
    const el = (newVNode.el = oldVNode.el)

    const oldProps = oldVNode.props || EMPTY_OBJ
    const newProps = newVNode.props || EMPTY_OBJ

    patchChildren(oldVNode, newVNode, el, null)

    patchProps(el, newVNode, oldProps, newProps)
  }

  // 比较子节点
  const patchChildren = (oldVNode, newVNode, container, anchor) => {
    const c1 = oldVNode?.children
    const prevShapeFlag = oldVNode ? oldVNode.shapeFlag : 0
    const c2 = newVNode?.children
    const { shapeFlag } = newVNode

    // 节点操作
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 更新
      }

      if (c2 !== c1) {
        // 挂新子节点文本
        hostSetElementText(container, c2)
      }
    } else {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          // TODO: diff
        } else {
          // TODO: 卸载
        }
      } else {
        if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
          // 删除旧节点 text
          hostSetElementText(container, '')
        }
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          // TODO: 单独 子节点的挂载
        }
      }
    }
  }

  // 比较 props
  const patchProps = (el: Element, VNode, oldProps, newPops) => {
    if (oldProps !== newPops) {
      for (const key in newPops) {
        const next = newPops[key]
        const prev = oldProps[key]

        if (next !== prev) {
          hostPatchProp(el, key, prev, next)
        }
      }

      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!(key in newPops)) {
            hostPatchProp(el, key, oldProps[key], null)
          }
        }
      }
    }
  }

  const patch = (oldVNode, newVNode, container, anchor = null) => {
    if (oldVNode === newVNode) return

    if (oldVNode && !isSomeVNodeType(oldVNode, newVNode)) {
      unmount(oldVNode)
      oldVNode = null
    }

    const { type, shapeFlag } = newVNode

    switch (type) {
      case Text:
        break
      case Comment:
        break
      case Fragment:
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(oldVNode, newVNode, container, anchor)
        } else if (shapeFlag & ShapeFlags.COMPONENT) {
        }
    }
  }

  const unmount = VNode => {
    hostRemove(VNode.el)
  }

  const render = (VNode, container) => {
    if (VNode === null) {
      if (container._VNode) {
        unmount(container._VNode)
      }
    } else {
      patch(container._VNode || null, VNode, container)
    }

    container._VNode = VNode
  }

  return {
    render
  }
}
