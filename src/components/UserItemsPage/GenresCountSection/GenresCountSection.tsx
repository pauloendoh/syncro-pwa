import { Table, useMantineTheme } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useGenresCountQuery } from '../../../hooks/react-query/user-item/useGenresCountQuery'
import { useQueryParams } from '../../../hooks/useQueryParams'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../../_common/flex/FlexCol'
import Span from '../../_common/text/Span'

type Props = {
  itemType: SyncroItemType
  userId: string
}

const GenresCountSection = ({ itemType, userId }: Props) => {
  const { data: genresCount } = useGenresCountQuery(itemType, userId)

  const theme = useMantineTheme()

  const [showMore, setShowMore] = useState(false)

  const showGenresCount = useMemo(() => {
    if (!genresCount) return []
    if (showMore) return genresCount
    return genresCount.slice(0, 5)
  }, [showMore, genresCount])

  const [selectedGenre, setSelectedGenre] = useQueryParams().genre

  if (!genresCount || genresCount.length === 0) return null

  return (
    <FlexCol gap={16}>
      <FlexCol>
        <Table
          w={240}
          sx={{
            // second and third column td and th
            '& td:nth-of-type(2), & th:nth-of-type(2), & td:nth-of-type(3), & th:nth-of-type(3)':
              {
                width: 80,
                textAlign: 'center',
              },
          }}
        >
          <thead>
            <tr>
              <th>Genre</th>
              <th>Items</th>
              <th>Avg</th>
            </tr>
          </thead>
          <tbody>
            {showGenresCount.map((g, index) => (
              <tr
                key={g.genre}
                onClick={() => {
                  if (selectedGenre === g.genre) {
                    setSelectedGenre(null)
                    return
                  }
                  setSelectedGenre(g.genre)
                }}
                style={{
                  backgroundColor:
                    selectedGenre === g.genre
                      ? theme.colors.dark[4]
                      : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <td>{g.genre}</td>
                <td>{g.count}</td>
                <td>{g.avgRating}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </FlexCol>

      {genresCount.length > 5 && (
        <Span
          onClick={() => setShowMore((prev) => !prev)}
          variant="link"
          sx={{
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          {showMore ? 'Show less' : 'Show more'}
        </Span>
      )}
    </FlexCol>
  )
}

export default GenresCountSection
