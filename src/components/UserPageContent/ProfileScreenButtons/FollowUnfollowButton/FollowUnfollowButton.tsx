import { Button } from '@mantine/core'
import { useMemo } from 'react'
import { useMyFollowingUsersQuery } from '../../../../hooks/react-query/follow/useMyFollowingUsersQuery'
import useToggleFollowMutation from '../../../../hooks/react-query/follow/useToggleFollowMutation'
import useConfirmationModalStore from '../../../../hooks/zustand/modals/useConfirmationModalStore'

interface Props {
  profileUserId: string
  width?: number
}

const FollowUnfollowButton = (props: Props) => {
  const { data: myFollowingUsers, isLoading } = useMyFollowingUsersQuery()

  const alreadyFollowing = useMemo(() => {
    if (!myFollowingUsers) return false

    return myFollowingUsers.find(
      (f) => f.followingUserId === props.profileUserId
    )
  }, [myFollowingUsers])

  const { mutate: submitToggleFollow } = useToggleFollowMutation()

  const label = useMemo(() => {
    if (isLoading) return 'Loading...'

    if (alreadyFollowing) return 'Following'
    return 'Follow'
  }, [isLoading, alreadyFollowing])

  const { openConfirmDialog } = useConfirmationModalStore()
  const handleClick = () => {
    if (alreadyFollowing) {
      openConfirmDialog({
        title: 'Unfollow?',
        onConfirm: () => submitToggleFollow(props.profileUserId),
        confirmText: 'Yes',
      })
      return
    }
    submitToggleFollow(props.profileUserId)
  }

  return (
    <Button
      loading={isLoading}
      color={alreadyFollowing ? 'gray' : 'secondary'}
      onClick={handleClick}
      styles={{
        root: {
          width: props.width,
        },
      }}
    >
      {label}
    </Button>
  )
}

export default FollowUnfollowButton
