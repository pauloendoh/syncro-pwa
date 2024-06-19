import { Skeleton } from '@mantine/core'
import { useItemRatedByQuery } from '../../../hooks/react-query/rating/useItemRatedByQuery'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import ItemSavedByPreloaded from './ItemSavedByPreloaded/ItemSavedByPreloaded'

type Props = {
  itemId: string
}

const ItemSavedBy = (props: Props) => {
  const { data, isLoading } = useItemRatedByQuery(props.itemId, 'you-follow')

  const { authUser } = useAuthStore()

  if (!authUser) return null

  if (!data || isLoading) {
    return <Skeleton height={40} />
  }

  if (data.length === 0) {
    return <></>
  }

  return <ItemSavedByPreloaded itemId={props.itemId} ratings={data} />
}

export default ItemSavedBy
