import { Box, Skeleton, Text } from '@mantine/core'
import { useMemo } from 'react'
import { useItemRatedByQuery } from '../../../hooks/react-query/rating/useItemRatedByQuery'
import useItemRatedByModalStore from '../../../hooks/zustand/modals/useItemRatedByModalStore'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import UserImage from '../../_common/image/SyncroItemImage/UserImage/UserImage'

type Props = {
  itemId: string
}

// PE 1/3 - rename
const ItemRatedBy = (props: Props) => {
  const { data, isLoading } = useItemRatedByQuery(props.itemId, 'you-follow')

  const { authUser } = useAuthStore()

  const label = useMemo(() => {
    if (!data || data.length === 0) {
      return <></>
    }

    const firstUsername = data?.[0]?.user?.username
    if (data.length === 1) {
      return <Text size="sm">Rated by {firstUsername}</Text>
    }

    return (
      <Text size="sm">
        Rated by {firstUsername} and {data.length - 1}{' '}
        {data.length - 1 === 1 ? 'other' : 'others'}
      </Text>
    )
  }, [data])

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
      <div
        style={{
          display: 'inline-flex',
        }}
      >
        {sliced?.map((rating, index) => (
          <div
            key={rating.id}
            style={{
              position: 'relative',
              right: index * 12,
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

      <Box
        sx={{
          position: 'relative',
          left: 20 - sliced.length * 12,
        }}
      >
        {label}
      </Box>
    </FlexVCenter>
  )
}

export default ItemRatedBy
