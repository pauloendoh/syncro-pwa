import Router from 'next/router'
import { create } from 'zustand'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { QueryParams } from '../../../utils/queryParams'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'
import useModalZIndexStore from './useModalZIndexStore'

interface IStore {
  initialValue: RatingDto | null

  isOpen: boolean
  openModal: (ratingDto: RatingDto) => void
  closeModal: () => void
}

export const useRatingDetailsModalStore = create<IStore>((set, get) => ({
  initialValue: null,
  isOpen: false,
  openModal: (initialValue) => {
    set({ isOpen: true, initialValue })
    Router.query[QueryParams.ratingDetailsId] = initialValue.id
    Router.push({ query: Router.query }, undefined, {
      scroll: false,
      shallow: true,
    })

    useModalZIndexStore.getState().incrementZIndex()
  },
  closeModal: () => {
    set({ isOpen: false })
    routerBackIfSameDomainOrClearQueryParam(QueryParams.ratingDetailsId)
  },
}))
