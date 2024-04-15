import { Skeleton, useMantineTheme } from '@mantine/core'
import { useItemRatedByQuery } from '../../../hooks/react-query/rating/useItemRatedByQuery'
import { useMyColors } from '../../../hooks/useMyColors'
import useItemRatedByModalStore from '../../../hooks/zustand/modals/useItemRatedByModalStore'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import ItemSavedByPreloaded from './ItemSavedByPreloaded/ItemSavedByPreloaded'

type Props = {
  itemId: string
}

// PE 1/3 - rename
const ItemSavedBy = (props: Props) => {
  const { data, isLoading } = useItemRatedByQuery(props.itemId, 'you-follow')

  const { authUser } = useAuthStore()

  // const label = useMemo(() => {
  //   if (!data || data.length === 0) {
  //     return <></>
  //   }

  //   const firstUsername = data?.[0]?.user?.username
  //   if (data.length === 1) {
  //     return <Text size="sm">Saved by {firstUsername}</Text>
  //   }

  //   return (
  //     <Text size="sm">
  //       Saved by {firstUsername} and {data.length - 1}{' '}
  //       {data.length - 1 === 1 ? 'other' : 'others'}
  //     </Text>
  //   )
  // }, [data])

  const { openModal } = useItemRatedByModalStore()

  const theme = useMantineTheme()
  const myColors = useMyColors()

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
