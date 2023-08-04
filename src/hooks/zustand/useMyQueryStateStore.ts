import { create } from 'zustand'

interface IStore {
  values: Record<string, string>
  setValue: (key: string, value: string) => void
  deleteValue: (key: string) => void
}

const useMyQueryStateStore = create<IStore>((set, get) => ({
  values: {},
  setValue: (key, value) => set({ values: { ...get().values, [key]: value } }),
  deleteValue: (key) => {
    const values = get().values
    delete values[key]
    set({ values })
  },
}))

export default useMyQueryStateStore
