import { create } from 'zustand'

interface IStore {
  title: string
  setTitle: (title: string) => void
}

const useUserItemsFilterStore = create<IStore>((set, get) => ({
  title: '',
  setTitle: (title) => set({ title }),
}))

export default useUserItemsFilterStore
