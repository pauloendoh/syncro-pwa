import { Skeleton } from '@mantine/core'
import { useMemo } from 'react'
import { useItemRatedByQuery } from '../../../hooks/react-query/rating/useItemRatedByQuery'
import useItemRatedByModalStore from '../../../hooks/zustand/modals/useItemRatedByModalStore'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import UserImage from '../../_common/image/SyncroItemImage/UserImage/UserImage'
import Span from '../../_common/text/Span'

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

  const sliced = useMemo(() => data?.slice(0, 3) || [], [data])

  const { openModal } = useItemRatedByModalStore()

  if (!authUser) return null

  if (!data || isLoading) {
    return <Skeleton height={40} />
  }

  if (data.length === 0) {
    return <></>
  }

  return (
    <FlexVCenter
      h={40}
      onClick={() => {
        openModal(props.itemId, 'you-follow')
      }}
      sx={{
        cursor: 'pointer',
      }}
    >
      <Span>Saved by</Span>
      <div
        style={{
          display: 'inline-flex',
          marginLeft: 8,
        }}
      >
        {sliced?.map((rating, index) => (
          <div
            key={rating.id}
            style={{
              position: 'relative',
              left: index * -8,
            }}
          >
            <UserImage
              pictureUrl={rating.user?.profile?.pictureUrl}
              username={rating.user?.username}
              widthHeight={24}
            />
          </div>
        ))}
      </div>
    </FlexVCenter>
  )
}

export default ItemSavedBy
