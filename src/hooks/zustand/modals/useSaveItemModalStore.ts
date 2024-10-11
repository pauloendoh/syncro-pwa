import { create } from 'zustand'
import { InterestDto } from '../../../types/domain/interest/InterestDto'

interface IStore {
  initialValue: InterestDto | null
  isOpen: boolean
  openModal: (tag: InterestDto) => void
  closeModal: () => void
}

const useSaveItemModalStore = create<IStore>((set, get) => ({
  initialValue: null,
  isOpen: false,
  openModal: (initialValue) => {
    set({ initialValue, isOpen: true })
  },
  closeModal: () => set({ isOpen: false }),
}))

export default useSaveItemModalStore
