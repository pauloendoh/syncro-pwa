import { Title, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
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

  const data = useMemo(() => {
    if (!genresCount) return []
    return genresCount.map((g) => ({
      name: g.genre.includes('RPG') ? 'RPG' : g.genre,
      value: g.count,
    }))
  }, [genresCount])

  const theme = useMantineTheme()

  if (!genresCount || genresCount.length === 0) return null

  return (
    <FlexCol gap={16}>
      <Title order={4}>Top 10 genres</Title>
      <FlexCol>
        {genresCount?.slice(0, 10).map((g, index) => (
          <Span key={g.genre}>
            - {g.genre} ({g.count})
          </Span>
        ))}
      </FlexCol>
    </FlexCol>
  )
}

export default GenresCountSection
