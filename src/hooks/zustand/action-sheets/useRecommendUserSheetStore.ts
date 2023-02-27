import { create } from 'zustand'

interface Store {
  userId: string | null
  isOpen: boolean
  openActionSheet: (itemId: string) => void
  closeActionSheet: () => void
}

const useRecommendUserSheetStore = create<Store>((set, get) => ({
  userId: null,
  isOpen: false,
  openActionSheet: (userId) => {
    set({ userId, isOpen: true })
  },
  closeActionSheet: () => set({ isOpen: false }),
}))

export default useRecommendUserSheetStore
