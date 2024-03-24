export const isArray = Array.isArray

export const isObject = (val: unknown): val is Object =>
  val !== null && typeof val === 'object'

/**
 * 对比两个数据是否发生改变
 * @param value
 * @param oldValue
 * @returns boolean
 */
export const hasChanged = (value: any, oldValue: any): boolean =>
  !Object.is(value, oldValue)

export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'

export const extend = Object.assign

export const EMPTY_OBJ: { readonly [key: string]: any } = {}

const onRE = /^on[^a-z]/
export const isOn = (key: string) => onRE.test(key)
