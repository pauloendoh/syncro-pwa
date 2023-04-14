import { Flex, useMantineTheme } from '@mantine/core'
import Span from '../../_common/text/Span'

type Props = {
  genres: string[]
}

const GenreChips = (props: Props) => {
  const theme = useMantineTheme()
  if (!props.genres || props.genres.length === 0) return null
  return (
    <Flex
      gap={8}
      sx={{
        flexWrap: 'wrap',
      }}
    >
      {props.genres.map((genre, index) => (
        <Flex
          key={index}
          style={{
            borderRadius: 4,
            padding: '4px 16px',

            backgroundColor: theme.colors.dark[8],
          }}
        >
          <Span size="sm">{genre}</Span>
        </Flex>
      ))}
    </Flex>
  )
}

export default GenreChips
