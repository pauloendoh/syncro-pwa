import { create } from 'zustand'
import { InterestDto } from '../../../types/domain/interest/InterestDto'

interface IStore {
  initialValue: InterestDto | null
  isOpen: boolean
  openSheet: (initialValue: InterestDto) => void
  closeSheet: () => void
}

const useSavedPositionSheetStore = create<IStore>((set, get) => ({
  initialValue: null,
  isOpen: false,
  openSheet: (initialValue) => {
    set({
      initialValue,
      isOpen: true,
    })
  },
  closeSheet: () => set({ isOpen: false }),
}))

export default useSavedPositionSheetStore
