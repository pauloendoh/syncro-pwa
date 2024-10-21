import { StateSnapshot } from 'react-virtuoso'
import { create } from 'zustand'
import { buildShallowStoreHookV2 } from './zustand/utils/useShallowStore'

interface IStore {
  virtuosoStates: {
    [url: string]: StateSnapshot
  }
  setVirtuosoState: (url: string, state: StateSnapshot) => void
  clearVirtuosoState: (url: string) => void
}

const useVirtuosoStore = create<IStore>((set, get) => ({
  virtuosoStates: {},
  setVirtuosoState: (url, state) => {
    set((prev) => {
      return {
        virtuosoStates: {
          ...prev.virtuosoStates,
          [url]: state,
        },
      }
    })
  },
  clearVirtuosoState: (url) => {
    set((prev) => {
      const virtuosoStates = { ...prev.virtuosoStates }
      delete virtuosoStates[url]
      return {
        virtuosoStates,
      }
    })
  },
}))

export const useVirtuosoStoreV2 = buildShallowStoreHookV2(useVirtuosoStore)
