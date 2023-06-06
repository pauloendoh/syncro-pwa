import { Text } from '@mantine/core'
import { useMemo } from 'react'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'

type Props = {
  item: SyncroItemDto
}

const ImdbExtraInfoSection = ({ item }: Props) => {
  const text = useMemo(() => {
    if (!item.imdbExtraInfo) return null

    // if runningTimeInMinutes 96 -> 1h 36min
    const duration = item.imdbExtraInfo?.runningTimeInMinutes
      ? `${Math.floor(item.imdbExtraInfo?.runningTimeInMinutes / 60)}h ${
          item.imdbExtraInfo?.runningTimeInMinutes % 60
        }min`
      : ''

    if (item.type === 'movie' && duration) return duration

    if (item.type === 'tvSeries') {
      if (item.imdbExtraInfo?.episodesCount && duration) {
        return `${item.imdbExtraInfo?.episodesCount} episodes · ${duration}`
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
