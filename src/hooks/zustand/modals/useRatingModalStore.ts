import { create } from 'zustand'
import { RatingDto } from '../../../types/domain/rating/RatingDto'

interface IRatingModalStore {
  initialValue: RatingDto | null
  isOpen: boolean
  openModal: (ratingDto: RatingDto) => void
  closeModal: () => void
}

const useRatingModalStore = create<IRatingModalStore>((set, get) => ({
  initialValue: null,
  isOpen: false,
  openModal: (initialValue) => {
    set({ initialValue, isOpen: true })
  },
  closeModal: () => set({ isOpen: false }),
}))

export default useRatingModalStore
