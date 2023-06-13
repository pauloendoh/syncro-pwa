import { create } from 'zustand'
import { SearchType } from '../../types/domain/search/SearchParams'

interface IStore {
  selectedType: SearchType
  setSelectedType: (type: SearchType) => void
}

const useSearchStore = create<IStore>((set, get) => ({
  selectedType: 'all',
  setSelectedType: (type) => set({ selectedType: type }),
}))

export default useSearchStore
