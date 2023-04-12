import Router from 'next/router'
import { create } from 'zustand'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'

export const ratingDetailsId = 'ratingDetailsId'

interface IStore {
  isOpen: () => boolean
  initialValue: RatingDto | null
  openModal: (ratingDto: RatingDto) => void
  closeModal: () => void
}

const useRatingDetailsModalStore = create<IStore>((set, get) => ({
  isOpen: () => {
    return !!Router.query[ratingDetailsId]
  },
  initialValue: null,
  openModal: (initialValue) => {
    set({ initialValue })
    Router.query[ratingDetailsId] = initialValue.id
    Router.push(Router, undefined, { scroll: false })
  },
  closeModal: () => {
    routerBackIfSameDomainOrClearQueryParam(ratingDetailsId)
  },
}))

export default useRatingDetailsModalStore
