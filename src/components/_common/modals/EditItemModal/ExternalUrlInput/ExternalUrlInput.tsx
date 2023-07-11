import { useMemo } from 'react'
import { SyncroItemDto } from '../../../../../types/domain/syncro-item/SyncroItemDto'
import MyTextInput from '../../../inputs/MyTextInput'

type Props = {
  syncroItem: SyncroItemDto
  onChange: (newSyncroItem: SyncroItemDto) => void
}

const ExternalUrlInput = ({ ...props }: Props) => {
  const value = useMemo(() => {
    switch (props.syncroItem.type) {
      case 'book':
        return props.syncroItem.openLibraryUrl
      case 'movie':
        return props.syncroItem.imdbUrl
      case 'game':
        return props.syncroItem.igdbUrl
      case 'manga':
        return props.syncroItem.mangaMalUrl
      case 'music':
        return props.syncroItem.youtubeMusicUrl
      case 'tvSeries':
        return props.syncroItem.imdbUrl
    }
  }, [props.syncroItem.type, props.syncroItem])

  const onChangeText = (newText: string) => {
    switch (props.syncroItem.type) {
      case 'book':
        props.onChange({
          ...props.syncroItem,
          openLibraryUrl: newText,
        })
        break
      case 'movie':
        props.onChange({
          ...props.syncroItem,
          imdbUrl: newText,
        })
        break
      case 'game':
        props.onChange({
          ...props.syncroItem,
          igdbUrl: newText,
        })
        break
      case 'manga':
        props.onChange({
          ...props.syncroItem,
          mangaMalUrl: newText,
        })
        break
      case 'music':
        props.onChange({
          ...props.syncroItem,
          youtubeMusicUrl: newText,
        })
        break
      case 'tvSeries':
        props.onChange({
          ...props.syncroItem,
          imdbUrl: newText,
        })
        break
    }
  }

  const label = useMemo(() => {
    switch (props.syncroItem.type) {
      case 'book':
        return 'Open library url'
      case 'movie':
        return 'Imdb url'
      case 'game':
        return 'Igdb url'
      case 'manga':
        return 'Manga mal url'
      case 'music':
        return 'Youtube music url'
      case 'tvSeries':
        return 'Imdb url'
    }
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
