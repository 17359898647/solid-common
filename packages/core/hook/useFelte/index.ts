import type {
  AssignableErrors,
  Errors,
  ExtenderHandler,
  FieldValue,
  Keyed,
  KeyedWritable,
  MountedCurrentForm,
  ObjectSetter,
  SetupCurrentForm,
  Touched,
  TransWritable,
  Writable,
} from '@felte/common'
import { _get, _set, createId } from '@felte/common'
import type { Obj, PartialErrorsSetter, PrimitiveSetter } from '@felte/core'
import type { Setter } from 'solid-js'

function isUpdater<T>(value: unknown): value is (value: T) => T {
  return typeof value === 'function'
}

function createSetHelper<Data extends Obj, Path extends string>(
  storeSetter: (updater: (value: Errors<Data>) => AssignableErrors<Data>) => void
): PartialErrorsSetter<Data, Path>
function createSetHelper<Data extends Obj, Path extends string>(
  storeSetter: (updater: (value: Data) => Data) => void
): ObjectSetter<Data, Path>
function createSetHelper<Data extends boolean | null | string>(
  storeSetter: (updater: (value: Data) => Data) => void
): PrimitiveSetter<Data>
function createSetHelper<Data extends Obj>(storeSetter: (updater: (value: Data) => Data) => void) {
  return ((
    pathOrValue: ((value: Data) => Data) | Data | string,
    valueOrUpdater?: ((value: unknown) => unknown) | unknown,
  ) => {
    if (typeof pathOrValue === 'string') {
      const path = pathOrValue
      storeSetter((oldValue) => {
        const newValue = isUpdater(valueOrUpdater)
          ? (valueOrUpdater(_get(oldValue as Obj, path)) as Data)
          : valueOrUpdater
        return _set(oldValue as Obj, path, newValue as FieldValue | FieldValue[]) as Data
      })
    }
    else {
      storeSetter(oldValue => (isUpdater<Data>(pathOrValue) ? pathOrValue(oldValue) : pathOrValue))
    }
  }) as Setter<Data>
}
type StoreExt = Record<string, any>
interface IStoreHelper {
  data: (KeyedWritable<any> | TransWritable<any>) & StoreExt
  isDirty: StoreExt & Writable<boolean>
  touched: StoreExt & Writable<Touched<any>>
}

export const storeHelper: Record<string, IStoreHelper> = {}
export function noop() {}
export interface ICreateStoreHelperReturn {
  setData: ObjectSetter<any>
  setIsDirty: (isDirty: boolean) => void
  setTouched: ObjectSetter<Touched<any>>
  subscribe: (subscriber: (values: Keyed<any>) => any) => () => void
}

export const createStoreHelperDefaultReturn: ICreateStoreHelperReturn = {
  setData: noop,
  setTouched: noop,
  setIsDirty: noop,
  subscribe: () => noop,
}

export function createStoreHelper(key?: string): ICreateStoreHelperReturn {
  const store = storeHelper[key || '']
  console.log(store)
  if (!store) {
    return createStoreHelperDefaultReturn
  }
  return {
    setData: createSetHelper(store.data.update) as ObjectSetter<any>,
    setTouched: createSetHelper(store.touched.update) as ObjectSetter<any>,
    setIsDirty: createSetHelper(store.isDirty.update),
    subscribe: store.data.subscribe,
  }
}

export const FelteHelpKey = 'CustomHelperKey'

/**
 * @example
 * ``` ts
 *
 * createForm({extend:[useFelteHelp]})
 *
 * ```
 */
export function useFelteHelp(currentForm: MountedCurrentForm<any> | SetupCurrentForm<any>): ExtenderHandler<any> {
  const config = currentForm.config
  const key = config[FelteHelpKey]
  if (currentForm.stage === 'SETUP') {
    if (!key) {
      config[FelteHelpKey] = createId(12)
      storeHelper[config[FelteHelpKey] as string] = {
        data: currentForm.data,
        touched: currentForm.touched,
        isDirty: currentForm.isDirty,
      }
    }
    return {}
  }
  if (currentForm.form)
    currentForm.form.dataset[FelteHelpKey] = key as string
  return {}
}
