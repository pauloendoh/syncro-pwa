import { StateSnapshot } from 'react-virtuoso'
import { create } from 'zustand'

interface IStore {
  virtuosoStates: {
    [url: string]: StateSnapshot
  }
  setVirtuosoState: (url: string, state: StateSnapshot) => void
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
}))

export default useVirtuosoStore
