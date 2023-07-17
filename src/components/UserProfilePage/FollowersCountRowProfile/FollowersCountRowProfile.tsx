import { Text } from '@mantine/core'
import { shortNumberFormatter } from 'endoh-utils'
import { useMemo } from 'react'
import { useFollowersQuery } from '../../../hooks/react-query/follow/useFollowersQuery'
import { useFollowingUsersQuery } from '../../../hooks/react-query/follow/useFollowingUsersQuery'
import { useUserItemsCountQuery } from '../../../hooks/react-query/syncro-item/useUserItemsCountQuery'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import useFollowersModalStore from '../../../hooks/zustand/modals/useFollowersModalStore'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'

type Props = {
  userId: string
}

const FollowersCountRowProfile = (props: Props) => {
  const { data: followersFollows, isLoading: isLoadingFollowers } =
    useFollowersQuery(props.userId)
  const { data: followingUsersFollows, isLoading: isLoadingFollowingUsers } =
    useFollowingUsersQuery(props.userId)

  const { data: itemsCount, isLoading: isLoadingItemsCount } =
    useUserItemsCountQuery(props.userId)

  const { isSmallScreen } = useMyMediaQuery()
  const { openModal } = useFollowersModalStore()

  const isLoading = useMemo(() => {
    return isLoadingFollowers || isLoadingFollowingUsers || isLoadingItemsCount
  }, [isLoadingFollowers, isLoadingFollowingUsers, isLoadingItemsCount])

  if (isLoading) {
    return <CenterLoader height={46.5} />
  }

  return (
    <FlexVCenter gap={isSmallScreen ? 16 : 32}>
      <FlexCol
        align={'center'}
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => {
          openModal({
            type: 'followers',
            userId: props.userId,
          })
        }}
      >
        <Text weight={500}>
          {shortNumberFormatter(followersFollows?.length || 0)}
        </Text>
        <Text>Followers</Text>
      </FlexCol>

      <FlexCol
        align={'center'}
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => {
          openModal({
            type: 'following',
            userId: props.userId,
          })
        }}
      >
        <Text weight={500}>
          {shortNumberFormatter(followingUsersFollows?.length || 0)}
        </Text>
        <Text>Following</Text>
      </FlexCol>

      <FlexCol align={'center'}>
        <Text weight={500}>{shortNumberFormatter(itemsCount || 0)}</Text>
        <Text>Items</Text>
      </FlexCol>
    </FlexVCenter>
  )
}

export default FollowersCountRowProfile
