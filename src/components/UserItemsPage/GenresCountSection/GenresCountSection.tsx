import { Table, Title, useMantineTheme } from '@mantine/core'
import { useMemo, useState } from 'react'
import { useGenresCountQuery } from '../../../hooks/react-query/user-item/useGenresCountQuery'
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

  if (!genresCount || genresCount.length === 0) return null

  return (
    <FlexCol gap={16}>
      <Title order={4}>Most rated genres</Title>
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
              <tr key={g.genre}>
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
