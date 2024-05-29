import { isOn } from '@vue/shared'
import { patchClass } from './modules/class'
import { patchDOMProp } from './modules/props'
import { patchAttr } from './modules/attrs'
import { patchStyle } from './modules/style'

export const patchProp = (
  el: Element,
  key: string,
  prevValue: any,
  nextValue: any
) => {
  if (key === 'class') {
    patchClass(el, nextValue)
  } else if (key === 'style') {
    patchStyle(el, prevValue, nextValue)
  } else if (isOn(key)) {
  } else if (shouldSetAsProp(el, key)) {
    patchDOMProp(el, key, nextValue)
  } else {
    patchAttr(el, key, nextValue)
  }
}

// 判断是否为 dom 元素上的属性，如 id、class、style、type、href、src 等
function shouldSetAsProp(el: Element, key: string): boolean {
  if (key === 'form') {
    return false
  }

  if (key === 'list' && el.tagName === 'INPUT') {
    return false
  }

  if (key === 'type' && el.tagName === 'TEXTAREA') {
    return false
  }

  return key in el
}
