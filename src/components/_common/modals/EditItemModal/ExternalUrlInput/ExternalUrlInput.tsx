import { useMemo } from 'react'
import { SyncroItemDto } from '../../../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import MyTextInput from '../../../inputs/MyTextInput'

type Props = {
  syncroItem: SyncroItemDto
  onChange: (newSyncroItem: SyncroItemDto) => void
}

const ExternalUrlInput = ({ ...props }: Props) => {
  const value = useMemo(() => {
    const mapped: {
      [key in SyncroItemType]: string | null
    } = {
      book: props.syncroItem.openLibraryUrl,
      movie: props.syncroItem.imdbUrl,
      game: props.syncroItem.igdbUrl,
      manga: props.syncroItem.mangaMalUrl,
      music: props.syncroItem.youtubeMusicUrl,
      tvSeries: props.syncroItem.imdbUrl,
      goodreadsBook: props.syncroItem.goodreadsUrl,
    }

    return mapped[props.syncroItem.type]
  }, [props.syncroItem.type, props.syncroItem])

  const onChangeText = (newText: string) => {
    const options: {
      [key in SyncroItemType]: () => void
    } = {
      book: () => {
        props.onChange({
          ...props.syncroItem,
          openLibraryUrl: newText,
        })
      },
      movie: () => {
        props.onChange({
          ...props.syncroItem,
          imdbUrl: newText,
        })
      },
      game: () => {
        props.onChange({
          ...props.syncroItem,
          igdbUrl: newText,
        })
      },
      manga: () => {
        props.onChange({
          ...props.syncroItem,
          mangaMalUrl: newText,
        })
      },
      music: () => {
        props.onChange({
          ...props.syncroItem,
          youtubeMusicUrl: newText,
        })
      },
      tvSeries: () => {
        props.onChange({
          ...props.syncroItem,
          imdbUrl: newText,
        })
      },
      goodreadsBook: () => {
        props.onChange({
          ...props.syncroItem,
          goodreadsUrl: newText,
        })
      },
    }

    options[props.syncroItem.type]()
  }

  const label = useMemo(() => {
    const options: {
      [key in SyncroItemType]: string
    } = {
      book: 'Open library url',
      movie: 'Imdb url',
      game: 'Igdb url',
      manga: 'Manga mal url',
      music: 'Youtube music url',
      tvSeries: 'Imdb url',
      goodreadsBook: 'Goodreads url',
    }

    return options[props.syncroItem.type]
  }, [props.syncroItem.type])

  return (
    <MyTextInput
      styles={{
        root: {
          flexGrow: 1,
        },
      }}
      className="ExternalUrlInput"
      value={value || ''}
      onChange={(e) => {
        onChangeText(e.currentTarget.value)
      }}
      label={label}
      required
    />
  )
}

export default ExternalUrlInput
