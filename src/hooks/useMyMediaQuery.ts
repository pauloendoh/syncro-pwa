import { useMediaQuery } from '@mantine/hooks'

export const useMyMediaQuery = () => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)')

  return {
    isSmallScreen,
  }
}
