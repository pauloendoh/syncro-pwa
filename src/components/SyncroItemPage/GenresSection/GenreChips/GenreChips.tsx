import { Flex, useMantineTheme } from '@mantine/core'
import { useMemo, useState } from 'react'
import Span from '../../../_common/text/Span'

type Props = {
  genres: string[]
}

const GenreChips = (props: Props) => {
  const theme = useMantineTheme()
  const [isExpanded, setIsExpanded] = useState(false)

  const visibleGenres = useMemo(() => {
    if (!isExpanded) return props.genres.slice(0, 3)
    return props.genres
  }, [isExpanded, props.genres])

  const hasMoreCount = useMemo(() => {
    return props.genres.length - visibleGenres.length
  }, [visibleGenres, props.genres])

  if (visibleGenres.length === 0) return null

  return (
    <Flex
      gap={4}
      sx={{
        flexWrap: 'wrap',
      }}
    >
      {visibleGenres.map((genre, index) => (
        <Flex
          key={genre}
          style={{
            borderRadius: 4,
            padding: '4px 8px',

            backgroundColor: theme.colors.dark[8],
          }}
        >
          <Span size="sm">{genre}</Span>
        </Flex>
      ))}
      {props.genres.length > 3 && (
        <Flex
          style={{
            borderRadius: 4,
            padding: '4px 8px',

            cursor: 'pointer',
            backgroundColor: isExpanded
              ? theme.colors.secondary[9]
              : theme.colors.dark[8],
          }}
        >
          <Span
            size="sm"
            sx={{
              ':hover': {
                textDecoration: 'underline',
              },
            }}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? 'Show less' : `+${hasMoreCount}`}
          </Span>
        </Flex>
      )}
    </Flex>
  )
}

export default GenreChips
