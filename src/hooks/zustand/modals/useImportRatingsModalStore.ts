import Router from 'next/router'
import { create } from 'zustand'
import { QueryParams } from '../../../utils/queryParams'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'

export type ImportRatingsType = 'MAL-Anime'

interface IStore {
  initialValue: ImportRatingsType
  isOpen: boolean
  openModal: (initialValue: ImportRatingsType) => void
  closeModal: () => void
}

const useImportRatingsModalStore = create<IStore>((set, get) => ({
  initialValue: 'MAL-Anime',
  isOpen: false,
  openModal: (initialValue) => {
    set({ initialValue })
    Router.query[QueryParams.importRatings] = initialValue
    Router.push(Router, undefined, { scroll: false })
  },
  closeModal: () => {
    routerBackIfSameDomainOrClearQueryParam(QueryParams.importRatings)
  },
}))

export default useImportRatingsModalStore
