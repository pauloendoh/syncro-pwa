import Router from 'next/router'
import { create } from 'zustand'
import { QueryParams } from '../../../utils/queryParams'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'
import useModalZIndexStore from './useModalZIndexStore'

interface IStore {
  isOpen: () => boolean
  openModal: () => void
  closeModal: () => void
}

const useFeedSettingsModal = create<IStore>((set, get) => ({
  isOpen: () => {
    return !!Router.query[QueryParams.feedSettingsModal]
  },
  openModal: () => {
    Router.query[QueryParams.feedSettingsModal] = 'open'
    Router.push(Router, undefined, { scroll: false })

    useModalZIndexStore.getState().incrementZIndex()
  },
  closeModal: () => {
    routerBackIfSameDomainOrClearQueryParam(QueryParams.feedSettingsModal)
  },
}))

export default useFeedSettingsModal
