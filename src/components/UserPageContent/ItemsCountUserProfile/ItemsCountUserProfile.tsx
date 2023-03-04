import { Text } from '@mantine/core'
import { shortNumberFormatter } from 'endoh-utils'
import { useFollowersQuery } from '../../../hooks/react-query/follow/useFollowersQuery'
import { useFollowingUsersQuery } from '../../../hooks/react-query/follow/useFollowingUsersQuery'
import { useUserRatingsQuery } from '../../../hooks/react-query/rating/useUserRatingsQuery'
import { useUserItemsCountQuery } from '../../../hooks/react-query/syncro-item/useUserItemsCountQuery'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'

type Props = {
  userId: string
}

const ItemsCountUserProfile = (props: Props) => {
  const { data: userRatings } = useUserRatingsQuery(props.userId)

  const {
    data: followersFollows,

    refetch: refetchFollowers,
  } = useFollowersQuery(props.userId)
  const { data: followingUsersFollows, refetch: refetchFollowing } =
    useFollowingUsersQuery(props.userId)

  const authUser = useAuthStore((s) => s.authUser)

  const { data: itemsCount } = useUserItemsCountQuery(props.userId)

  return (
    <FlexVCenter gap={32}>
      <FlexCol
        align={'center'}
        onClick={() => {
          // navigation.push("FollowersScreen", {
          //   type: "followers",
          //   userId: props.userId,
          // })
        }}
      >
        <Text weight={500}>
          {shortNumberFormatter(followersFollows?.length || 0)}
        </Text>
        <Text>Followers</Text>
      </FlexCol>

      <FlexCol
        align={'center'}
        onClick={() => {
          // navigation.push("FollowersScreen", {
          //   type: "following-users",
          //   userId: props.userId,
          // })
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

export default ItemsCountUserProfile
