import Router from 'next/router'
import { create } from 'zustand'
import { QueryParams } from '../../../utils/queryParams'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'
import useModalZIndexStore from './useModalZIndexStore'

interface IStore {
  openModal: () => void
  closeModal: () => void
}

const useOnboardingModalStore = create<IStore>((set, get) => ({
  initialValue: null,
  openModal: () => {
    Router.query[QueryParams.onboardingModal] = 'true'
    Router.push(Router, undefined, { scroll: false })

    useModalZIndexStore.getState().incrementZIndex()
  },
  closeModal: () => {
    routerBackIfSameDomainOrClearQueryParam(QueryParams.onboardingModal)
  },
}))

export default useOnboardingModalStore
