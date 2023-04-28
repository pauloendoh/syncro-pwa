import Router from 'next/router'
import { create } from 'zustand'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { QueryParams } from '../../../utils/queryParams'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'

interface IStore {
  initialValue: RatingDto | null
  openModal: (ratingDto: RatingDto) => void
  closeModal: () => void
}

const useSaveRatingModalStore = create<IStore>((set, get) => ({
  initialValue: null,
  openModal: (initialValue) => {
    set({ initialValue })
    Router.query[QueryParams.saveRatingModal] = 'open'
    Router.push(Router, undefined, { scroll: false })
  },
  closeModal: () => {
    routerBackIfSameDomainOrClearQueryParam(QueryParams.saveRatingModal)
  },
}))

export default useSaveRatingModalStore
