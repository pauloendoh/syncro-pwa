import { useEffect, useState } from 'react'
import useModalZIndexStore from '../zustand/modals/useModalZIndexStore'

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
