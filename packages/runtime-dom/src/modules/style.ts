import { isString } from '@vue/shared'

export function patchStyle(el: Element, prevVal: any, nextVal: any) {
  const style = (el as HTMLElement).style
  const isCssString = isString(nextVal)

  if (nextVal && !isCssString) {
    for (const key in nextVal) {
      setStyle(style, key, nextVal[key])
    }

    if (prevVal && !isString(prevVal)) {
      for (const key in prevVal) {
        if (nextVal[key] == null) {
          setStyle(style, key, '')
        }
      }
    }
  }
}

function setStyle(style: CSSStyleDeclaration, key: string, value: string) {
  style[key] = value
}
