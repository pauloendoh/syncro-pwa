import { StoreApi, UseBoundStore } from 'zustand'
import { useShallow } from 'zustand/shallow'
import { PartialRecord } from '../../../types/utils/PartialRecord'

export function useShallowStore<S extends object, K extends keyof S>(
  useZustandStore: UseBoundStore<StoreApi<S>>,
  keys: K[]
): Pick<S, K> {
  const values = useZustandStore(
    useShallow((s) => {
      const obj = {} as Pick<S, K>
      keys.forEach((key) => {
        obj[key] = s[key]
      })
      return obj
    })
  )

  return values
}

export function buildShallowStoreHookV2<S extends object>(
  useZustandStore: UseBoundStore<StoreApi<S>>
) {
  return function <
    HR extends PartialRecord<keyof S, true>,
    HK extends keyof HR & keyof S
  >(storeKeysSelector: HR): Pick<S, HK> {
    const values = useZustandStore(
      useShallow((s) => {
        const obj = {} as Pick<S, HK>
        Object.keys(storeKeysSelector).forEach((key) => {
          obj[key as HK] = s[key as HK]
        })

        return obj
      })
    )

    return values
  }
}
