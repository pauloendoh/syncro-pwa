import Router from 'next/router'
import { create } from 'zustand'
import { RatingDto } from '../../../types/domain/rating/RatingDto'

export const saveRatingModal = 'saveRatingModal'

interface IStore {
  initialValue: RatingDto | null
  openModal: (ratingDto: RatingDto) => void
  closeModal: () => void
}

const useSaveRatingModalStore = create<IStore>((set, get) => ({
  initialValue: null,
  openModal: (initialValue) => {
    set({ initialValue })
    Router.query[saveRatingModal] = 'open'
    Router.push(Router, undefined, { scroll: false })
  },
  closeModal: () => {
    // PE 1/3 - this will be reused
    const previousUrl = document.referrer

    if (previousUrl) {
      const previousDomain = new URL(previousUrl).origin
      const currentDomain = new URL(window.location.href).origin

      if (previousDomain === currentDomain) Router.back()
      return
    }
    Router.query[saveRatingModal] = undefined
    Router.push(Router, undefined, { scroll: false })
  },
}))

export default useSaveRatingModalStore
