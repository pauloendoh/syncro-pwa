import { Button } from '@mantine/core'
import { useMemo } from 'react'
import { useFollowersQuery } from '../../../../hooks/react-query/follow/useFollowersQuery'
import useRecommendUserSheetStore from '../../../../hooks/zustand/action-sheets/useRecommendUserSheetStore'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'

interface Props {
  userId: string
}

const RecommendUserButton = (props: Props) => {
  const { openActionSheet } = useRecommendUserSheetStore()

  const { authUser } = useAuthStore()
  const { data: myFollowers } = useFollowersQuery(authUser?.id)

  const followsMe = useMemo(
    () => myFollowers?.some((follower) => follower.followerId === props.userId),
    [myFollowers, props.userId]
  )

  return (
    <Button
      color={'gray'}
      onClick={() => {
        openActionSheet(props.userId)

        // if (followsMe) {

        //   return
        // }

        // alert('You can only recommend items to users that follow you.')
      }}
    >
      Recommend
    </Button>
  )
}

export default RecommendUserButton
