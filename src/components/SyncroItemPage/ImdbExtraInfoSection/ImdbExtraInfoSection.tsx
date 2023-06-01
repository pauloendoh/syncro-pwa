import { Text } from '@mantine/core'
import { useMemo } from 'react'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'

type Props = {
  item: SyncroItemDto
}

const ImdbExtraInfoSection = ({ item }: Props) => {
  const text = useMemo(() => {
    if (!item.imdbExtraInfo) return null

    if (item.type === 'movie' && item.imdbExtraInfo?.runningTimeInMinutes)
      return `${item.imdbExtraInfo?.runningTimeInMinutes} min`

    if (item.type === 'tvSeries') {
      if (
        item.imdbExtraInfo?.episodesCount &&
        item.imdbExtraInfo?.runningTimeInMinutes
      ) {
        return `${item.imdbExtraInfo?.episodesCount} episodes · ${item.imdbExtraInfo?.runningTimeInMinutes} min`
      }

      if (item.imdbExtraInfo?.episodesCount) {
        return `${item.imdbExtraInfo?.episodesCount} episodes`
      }
    }

    return ''
  }, [item])
  if (!item.imdbExtraInfo) return null

  return <Text>{text}</Text>
}

export default ImdbExtraInfoSection
