import { useMantineTheme } from '@mantine/core'

export const useMyColors = () => {
  const theme = useMantineTheme()

  return {
    lightBackground: theme.colors.dark[0],

    ratingYellow: '#FFB600',
  }
}
