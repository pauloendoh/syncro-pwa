import { Alert } from '@mantine/core'
import { useMemo } from 'react'
import { MdInfo } from 'react-icons/md'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'

type Props = {
  item: SyncroItemDto
}

const ItemPageTopBanner = ({ ...props }: Props) => {
  const message = useMemo(() => {
    if (props.item.type === 'book') {
      return 'Books (old) type is not supported anymore. Please move to Goodreads Book type instead.'
    }
    if (props.item.type === 'music') {
      return 'Music type is not supported anymore.'
    }

    return ''
  }, [props.item.type])

  if (message === '') {
    return null
  }

  return (
    <Alert color="red" icon={<MdInfo />}>
      {message}
    </Alert>
  )
}

export default ItemPageTopBanner
