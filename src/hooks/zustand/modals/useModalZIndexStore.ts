import { create } from 'zustand'

interface IStore {
  currentZIndex: number
  incrementZIndex: (byValue?: number) => void
}

const useModalZIndexStore = create<IStore>((set, get) => ({
  currentZIndex: 1000,
  incrementZIndex: (byValue = 1) =>
    set((state) => ({ currentZIndex: state.currentZIndex + byValue })),
}))

export default useModalZIndexStore
