import Router from 'next/router'
import { create } from 'zustand'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { QueryParams } from '../../../utils/queryParams'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'
import useModalZIndexStore from './useModalZIndexStore'

interface IStore {
  initialValue: RatingDto | null
  openModal: (ratingDto: RatingDto) => void
  closeModal: () => void
}

const useShareRatingModalStore = create<IStore>((set, get) => ({
  initialValue: null,
  openModal: (initialValue) => {
    set({ initialValue })
    Router.query[QueryParams.shareRatingModal] = 'true'
    Router.push(Router, undefined, { scroll: false })

    useModalZIndexStore.getState().incrementZIndex()
  },
  closeModal: () => {
    routerBackIfSameDomainOrClearQueryParam(QueryParams.shareRatingModal)
  },
}))

export default useShareRatingModalStore
