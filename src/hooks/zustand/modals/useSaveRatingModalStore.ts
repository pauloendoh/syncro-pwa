import Router from 'next/router'
import { create } from 'zustand'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { QueryParams } from '../../../utils/queryParams'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'
import { buildShallowStoreHookV2 } from '../utils/useShallowStore'

interface IStore {
  initialValue: RatingDto | null
  isOpen: boolean
  openModal: (ratingDto: RatingDto) => void
  closeModal: () => void
}

// PE 1/3 - standardize names SaveRatingModal | EditRatingModal
const useSaveRatingModalStore = create<IStore>((set, get) => ({
  initialValue: null,
  isOpen: false,
  openModal: (initialValue) => {
    set({ initialValue, isOpen: true })
    Router.query[QueryParams.saveRatingModal] = 'open'
    Router.push(Router, undefined, { scroll: false, shallow: true })
  },
  closeModal: () => {
    set({ isOpen: false })
    routerBackIfSameDomainOrClearQueryParam(QueryParams.saveRatingModal)
  },
}))

export const useSaveRatingModalStoreV2 = buildShallowStoreHookV2(
  useSaveRatingModalStore
)

export default useSaveRatingModalStore
