import { useEffect, useState } from 'react'
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

export const useModalZIndex = (params: { isOpen: boolean }) => {
  const { isOpen } = params
  const [zIndex, setZIndex] = useState(0)

  const { currentZIndex, incrementZIndex } = useModalZIndexStore()
  useEffect(() => {
    if (isOpen) {
      incrementZIndex()
      setZIndex(currentZIndex + 1)
    }
  }, [isOpen])

  return zIndex
}
