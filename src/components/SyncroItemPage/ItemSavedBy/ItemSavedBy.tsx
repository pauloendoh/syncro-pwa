import { Skeleton, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { useItemRatedByQuery } from '../../../hooks/react-query/rating/useItemRatedByQuery'
import { useMyColors } from '../../../hooks/useMyColors'
import useItemRatedByModalStore from '../../../hooks/zustand/modals/useItemRatedByModalStore'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import UserImage from '../../_common/image/SyncroItemImage/UserImage/UserImage'
import StatusIcon from './StatusIcon/StatusIcon'

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

  const theme = useMantineTheme()
  const myColors = useMyColors()

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
          display: 'flex',
          gap: 4,
        }}
      >
        {sliced?.map((rating, index) => (
          <div
            key={rating.id}
            style={{
              position: 'relative',
            }}
          >
            <UserImage
              pictureUrl={rating.user?.profile?.pictureUrl}
              username={rating.user?.username}
              widthHeight={24}
            />
            <div
              style={{
                position: 'absolute',
                bottom: -8,
                right: -4,
                fontSize: 10,
                color: myColors.ratingYellow,
                fontWeight: 700,
                background: theme.colors.dark[7],
                borderRadius: '100%',
                textAlign: 'center',
                width: 16,
                height: 16,
              }}
            >
              {rating.ratingValue ? (
                rating.ratingValue
              ) : (
                <StatusIcon status={rating.status} />
              )}
            </div>
          </div>
        ))}
      </div>
    </FlexVCenter>
  )
}

export default ItemSavedBy
