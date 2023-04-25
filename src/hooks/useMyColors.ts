import { useMantineTheme } from '@mantine/core'

export const useMyColors = () => {
  const theme = useMantineTheme()

  return {
    lightBackground: theme.colors.dark[0],
    ratingYellow: '#FFB600',
    getVariantRatingYellow: (rating: number) => {
      const options = {
        1: '#929292',
        2: '#929292',
        3: '#968864',
        4: '#968864',
        5: '#AA8833',
        6: '#AA8833',
        7: '#D1A024',
        8: '#D1A024',
        9: '#FFB600',
        10: '#FFB600',
      }

      return options[rating as keyof typeof options]
    },
  }
}
