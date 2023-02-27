import { create } from 'zustand'

interface IStore {
  searchText: string
  setSearchText: (text: string) => void

  submittedText: string
  onSubmit: (text: string) => void
}

const useSearchStore = create<IStore>((set, get) => ({
  searchText: '',
  setSearchText: (text) => set({ searchText: text }),

  submittedText: '',
  onSubmit: (text) => set({ submittedText: text }),
}))

export default useSearchStore
