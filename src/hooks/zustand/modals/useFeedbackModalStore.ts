import Router from 'next/router'
import { create } from 'zustand'
import { QueryParams } from '../../../utils/queryParams'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'
import { UserFeedbackDto } from '../../react-query/feedback/types/UserFeedbackDto'
import useModalZIndexStore from './useModalZIndexStore'

interface IStore {
  initialValue: UserFeedbackDto | null
  openModal: (userFeedbackDto: UserFeedbackDto) => void
  closeModal: () => void
}

const useFeedbackModalStore = create<IStore>((set, get) => ({
  initialValue: null,
  openModal: (initialValue) => {
    set({ initialValue })
    Router.query[QueryParams.feedbackModal] = initialValue.id || 'new'
    Router.push(Router, undefined, { scroll: false })

    useModalZIndexStore.getState().incrementZIndex()
  },
  closeModal: () => {
    routerBackIfSameDomainOrClearQueryParam(QueryParams.feedbackModal)
  },
}))

export default useFeedbackModalStore
