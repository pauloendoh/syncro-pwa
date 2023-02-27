import { create } from 'zustand'

interface Store {
  itemId: string | null
  isOpen: boolean
  openActionSheet: (itemId: string) => void
  closeActionSheet: () => void
}

const useRecommendItemActionSheetStore = create<Store>((set, get) => ({
  itemId: null,
  isOpen: false,
  openActionSheet: (itemId) => {
    set({ itemId, isOpen: true })
  },
  closeActionSheet: () => set({ isOpen: false }),
}))

export default useRecommendItemActionSheetStore
