import { Title, useMantineTheme } from '@mantine/core'
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
        {showGenresCount.map((g, index) => (
          <Span key={g.genre}>
            {g.genre}: {g.count} ratings | {g.avgRating} average
          </Span>
        ))}
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
