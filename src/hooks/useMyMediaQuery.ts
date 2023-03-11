import { useMemo } from 'react'
import useScreenSizeStore from './zustand/useScreenSizeStore'

export const useMyMediaQuery = () => {
  const screenWidth = useScreenSizeStore((s) => s.screenWidth)
  const isSmallScreen = useMemo(() => screenWidth < 768, [screenWidth])

  return {
    isSmallScreen,
  }
}
