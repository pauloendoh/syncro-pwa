import { useEffect, useState } from 'react'
import useModalZIndexStore from '../zustand/modals/useModalZIndexStore'

export const useModalZIndex = (params: { isOpen: boolean }) => {
  const { isOpen } = params
  const [zIndex, setZIndex] = useState(0)

  const { currentZIndex } = useModalZIndexStore()
  useEffect(() => {
    if (isOpen) {
      setZIndex(currentZIndex)
    }
  }, [isOpen])

  return zIndex
}
