import { useMemo } from 'react'
import useScreenSizeStore from './zustand/useScreenSizeStore'

export const useMyMediaQuery = () => {
  const screenWidth = useScreenSizeStore((s) => s.screenWidth)
  const isSmallScreen = useMemo(() => screenWidth < 768, [screenWidth])
  const isXsScreen = useMemo(() => screenWidth < 576, [screenWidth])
  const isLoading = useMemo(() => screenWidth === 0, [screenWidth])

  return {
    isSmallScreen,
    isXsScreen,
    isLoading,
  }
}
