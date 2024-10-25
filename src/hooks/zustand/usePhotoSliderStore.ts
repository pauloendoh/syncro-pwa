import { DataType } from 'react-photo-view/dist/types'
import { create } from 'zustand'
import { buildShallowStoreHookV2 } from './utils/useShallowStore'

type InitialValues = {
  images: DataType[]
  queryParams: {
    key: string
    value: string
  }
  disableDoubleBackOnClose?: boolean
}

interface IStore {
  isOpen: number
  initialValues: InitialValues
  openPhotosSlider: (initialValues: InitialValues) => void
  closePhotosSlider: () => void
}

export const usePhotoSliderStore = create<IStore>((set, get) => ({
  isOpen: 0,
  initialValues: {
    images: [],
    queryParams: {
      key: '',
      value: '',
    },
  },

  openPhotosSlider: (initialValues) => {
    set((state) => ({
      isOpen: state.isOpen + 1,
      initialValues,
    }))
  },
  closePhotosSlider: () => set({ isOpen: 0 }),
}))

export const usePhotoSliderStoreV2 =
  buildShallowStoreHookV2(usePhotoSliderStore)
