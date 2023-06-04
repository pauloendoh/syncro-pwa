import { Box, Skeleton, Text } from '@mantine/core'
import { useMemo } from 'react'
import { useItemRatedByQuery } from '../../../hooks/react-query/rating/useItemRatedByQuery'
import useItemRatedByModalStore from '../../../hooks/zustand/modals/useItemRatedByModalStore'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import UserImage from '../../_common/image/SyncroItemImage/UserImage/UserImage'

type Props = {
  itemId: string
}

const ItemRatedBy = (props: Props) => {
  const { data, isLoading } = useItemRatedByQuery(props.itemId)

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

  if (!data || data.length === 0) {
    return null
  }

  if (isLoading) {
    return <Skeleton height={24} />
  }

  return (
    <FlexVCenter
      onClick={() => {
        openModal(props.itemId)
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
