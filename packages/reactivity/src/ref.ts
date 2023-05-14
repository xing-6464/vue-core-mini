import { createDep, type Dep } from "./dep"
import { trackEffects } from "./effect"
import { activeEffect } from "./effect"
import { toReactive } from "./reactive"

export interface Ref<T = any> {
  value: T
}

export function ref(value?: unknown) {
  return createRef(value, false)
}

function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) return rawValue

  return new RefImpl(rawValue, shallow)
}

class RefImpl<T> {
  private _value: T
  public dep?: Dep = undefined

  constructor(value: T, public __v_isShallow: boolean) {
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newValue: T) {

  }
}

export function trackRefValue(ref) {
  if (activeEffect) {
    trackEffects(ref.dep || (ref.dep = createDep()))
  }
}

/**
 * 是否为ref
 * @param r 
 * @returns 
 */
export function isRef(r: any): r is Ref {
  return !!(r && r.__v_isRef === true)
}
