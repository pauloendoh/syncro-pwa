import { useMediaQuery } from '@mantine/hooks'
import { useMemo } from 'react'
import { useScreenSizeStoreV2 } from './zustand/useScreenSizeStore'

export const useMyMediaQuery = () => {
  const { screenWidth } = useScreenSizeStoreV2({
    screenWidth: true,
  })
  const isSmallScreen = useMemo(() => screenWidth < 768, [screenWidth])
  const isMobile = useMemo(() => screenWidth < 576, [screenWidth])
  const isLoading = useMemo(() => screenWidth === 0, [screenWidth])

  const isTouchScreen = useMediaQuery('pointer:coarce')

  return {
    screenWidth,
    isSmallScreen,
    isMobile,
    isLoading,
    isTouchScreen,
  }
}
