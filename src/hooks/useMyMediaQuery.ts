import { useMemo } from 'react'
import useScreenSizeStore from './zustand/useScreenSizeStore'

export const useMyMediaQuery = () => {
  const screenWidth = useScreenSizeStore((s) => s.screenWidth)
  const isSmallScreen = useMemo(() => screenWidth < 768, [screenWidth])
  const isMobile = useMemo(() => screenWidth < 576, [screenWidth])
  const isLoading = useMemo(() => screenWidth === 0, [screenWidth])

  return {
    isSmallScreen,
    isMobile,
    isLoading,
  }
}
