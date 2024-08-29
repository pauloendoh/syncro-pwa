import { Anchor, Text } from '@mantine/core'
import { useMemo } from 'react'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { pluralize } from '../../../utils/text/pluralize'

type Props = {
  item: SyncroItemDto
}

const ImdbExtraInfoSection = ({ item }: Props) => {
  const text = useMemo(() => {
    if (!item.imdbExtraInfo) return null

    // if runningTimeInMinutes 96 -> 1h 36min
    // if runningTimeInMinutes 60 -> 1h
    // if runningTimeInMinutes 30 -> 30min
    const hours = Math.floor(item.imdbExtraInfo?.runningTimeInMinutes / 60)
    const minutes = item.imdbExtraInfo?.runningTimeInMinutes % 60

    const duration = `${hours ? `${hours}h` : ''} ${
      minutes ? `${minutes}min` : ''
    }`.trim()

    if (item.imdbExtraInfo?.episodesCount) {
      if (duration) {
        return `${item.imdbExtraInfo?.episodesCount} ${pluralize(
          item.imdbExtraInfo?.episodesCount,
          'episode'
        )} · ${duration}`
      }

      return `${item.imdbExtraInfo?.episodesCount} ${pluralize(
        item.imdbExtraInfo?.episodesCount,
        'episode'
      )}`
    }

    if (duration) {
      return duration
    }

    return ''
  }, [item])

  if (!item.imdbExtraInfo) return null

  if (item.imdbExtraInfo?.episodesCount) {
    return (
      <Anchor
        href={item.imdbUrl + 'episodes'}
        target="_blank"
        rel="noreferrer"
        color="white"
      >
        {text}
      </Anchor>
    )
  }

  return <Text>{text}</Text>
}

export default ImdbExtraInfoSection
