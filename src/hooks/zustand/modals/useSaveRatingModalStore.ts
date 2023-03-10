import { create } from 'zustand'
import { RatingDto } from '../../../types/domain/rating/RatingDto'

interface IStore {
  initialValue: RatingDto | null
  isOpen: boolean
  openModal: (ratingDto: RatingDto) => void
  closeModal: () => void
}

const useSaveRatingModalStore = create<IStore>((set, get) => ({
  initialValue: null,
  isOpen: false,
  openModal: (initialValue) => {
    set({ initialValue, isOpen: true })
  },
  closeModal: () => set({ isOpen: false }),
}))

export default useSaveRatingModalStore
