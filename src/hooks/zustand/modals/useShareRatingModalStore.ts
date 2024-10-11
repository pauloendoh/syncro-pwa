import Router from 'next/router'
import { create } from 'zustand'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { QueryParams } from '../../../utils/queryParams'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'

interface IStore {
  initialValue: RatingDto | null
  isAfterRating: boolean
  openModal: (
    ratingDto: RatingDto,
    options?: {
      isAfterRating?: boolean
    }
  ) => void
  closeModal: () => void
}

const useShareRatingModalStore = create<IStore>((set, get) => ({
  initialValue: null,
  isAfterRating: false,
  openModal: (initialValue, options) => {
    set({ initialValue, isAfterRating: options?.isAfterRating ?? false })
    Router.query[QueryParams.shareRatingModal] = 'true'
    Router.push(Router, undefined, { scroll: false })
  },
  closeModal: () => {
    routerBackIfSameDomainOrClearQueryParam(QueryParams.shareRatingModal)
    setTimeout(() => {
      set({ isAfterRating: false })
    }, 1000)
  },
}))

export default useShareRatingModalStore
