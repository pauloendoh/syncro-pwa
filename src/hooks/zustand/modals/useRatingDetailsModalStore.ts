import Router from 'next/router'
import { create } from 'zustand'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { QueryParams } from '../../../utils/queryParams'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'

interface IStore {
  isOpen: () => boolean
  initialValue: RatingDto | null
  openModal: (ratingDto: RatingDto) => void
  closeModal: () => void
}

const useRatingDetailsModalStore = create<IStore>((set, get) => ({
  isOpen: () => {
    return !!Router.query[QueryParams.ratingDetailsId]
  },
  initialValue: null,
  openModal: (initialValue) => {
    set({ initialValue })
    Router.query[QueryParams.ratingDetailsId] = initialValue.id
    Router.push(Router, undefined, { scroll: false })
  },
  closeModal: () => {
    routerBackIfSameDomainOrClearQueryParam(QueryParams.ratingDetailsId)
  },
}))

export default useRatingDetailsModalStore
