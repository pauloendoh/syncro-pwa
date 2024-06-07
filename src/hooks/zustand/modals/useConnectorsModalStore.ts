import Router from 'next/router'
import { create } from 'zustand'
import { ConnectorSource } from '../../../components/SettingsPage/ImportRatingsPage/ConnectorsSection/connectorOptions/connectorOptions'
import { QueryParams } from '../../../utils/queryParams'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'
import useModalZIndexStore from './useModalZIndexStore'

interface IStore {
  initialValue: ConnectorSource
  isOpen: boolean
  openModal: (initialValue: ConnectorSource) => void
  closeModal: () => void
}

const useConnectorsModalStore = create<IStore>((set, get) => ({
  initialValue: 'Anilist',
  isOpen: false,
  openModal: (initialValue) => {
    set({ initialValue, isOpen: true })
    Router.query[QueryParams.connectorsModal] = 'open'
    Router.push(Router, undefined, { scroll: false, shallow: true })

    useModalZIndexStore.getState().incrementZIndex()
  },
  closeModal: () => {
    set({ isOpen: false })
    routerBackIfSameDomainOrClearQueryParam(QueryParams.connectorsModal)
  },
}))

export default useConnectorsModalStore
