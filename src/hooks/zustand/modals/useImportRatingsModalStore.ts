import { create } from 'zustand'

export type ImportRatingsType = 'MyAnimeList'

interface IStore {
  initialValue: ImportRatingsType
  isOpen: boolean
  openModal: (initialValue: ImportRatingsType) => void
  closeModal: () => void
}

const useImportRatingsModalStore = create<IStore>((set, get) => ({
  initialValue: 'MyAnimeList',
  isOpen: false,
  openModal: (initialValue) => {
    set({ initialValue, isOpen: true })
  },
  closeModal: () => set({ isOpen: false }),
}))

export default useImportRatingsModalStore
