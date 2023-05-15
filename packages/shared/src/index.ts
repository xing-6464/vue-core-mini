export const isArray = Array.isArray

export const isObject = (val: unknown) =>
  val !== null && typeof val === 'object'

/**
 * 对比两个数据是否发生改变
 * @param value
 * @param oldValue
 * @returns boolean
 */
export const hasChanged = (value: any, oldValue: any): boolean =>
  !Object.is(value, oldValue)
