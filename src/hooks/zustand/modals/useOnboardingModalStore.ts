import Router from 'next/router'
import { create } from 'zustand'
import { QueryParams } from '../../../utils/queryParams'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'

interface IStore {
  getQueryValue: () => string | string[] | undefined
  openModal: () => void
  closeModal: () => void
}

const useOnboardingModalStore = create<IStore>((set, get) => ({
  getQueryValue: () => Router.query[QueryParams.onboardingModal],
  initialValue: null,
  openModal: () => {
    Router.query[QueryParams.onboardingModal] = 'true'
    Router.push(Router, undefined, { scroll: false })
  },
  closeModal: () => {
    routerBackIfSameDomainOrClearQueryParam(QueryParams.onboardingModal)
  },
}))

export default useOnboardingModalStore
