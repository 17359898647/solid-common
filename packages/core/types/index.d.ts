import type { Accessor } from 'solid-js'

export type MaybeAccessor<T> = T | Accessor<T>

/**
 * Accessed value of a MaybeAccessor
 * @example
 * ```ts
 * MaybeAccessorValue<MaybeAccessor<string>>
 * // => string
 * MaybeAccessorValue<MaybeAccessor<() => string>>
 * // => string | (() => string)
 * MaybeAccessorValue<MaybeAccessor<string> | Function>
 * // => string | void
 * ```
 */
export type MaybeAccessorValue<T extends MaybeAccessor<any>> = T extends () => any
  ? ReturnType<T>
  : T

export type AnyObject = Record<PropertyKey, any>
export type AnyStatic = [] | any[] | AnyObject
export type AnyFunction = (...args: any[]) => any
