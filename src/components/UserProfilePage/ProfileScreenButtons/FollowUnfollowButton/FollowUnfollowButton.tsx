import { useMemo } from 'react'
import { useMyFollowingUsersQuery } from '../../../../hooks/react-query/follow/useMyFollowingUsersQuery'
import useToggleFollowMutation from '../../../../hooks/react-query/follow/useToggleFollowMutation'
import useConfirmationModalStore from '../../../../hooks/zustand/modals/useConfirmationModalStore'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import MyLoadingButton from '../../../_common/overrides/MyLoadingButton'

interface Props {
  profileUserId: string
  width?: number
}

const FollowUnfollowButton = (props: Props) => {
  const { authUser } = useAuthStore()
  const { data: myFollowingUsers, isLoading } = useMyFollowingUsersQuery()

  const alreadyFollowing = useMemo(() => {
    if (!myFollowingUsers) return false

    return myFollowingUsers.find(
      (f) => f.followingUserId === props.profileUserId
    )
  }, [myFollowingUsers])

  const { mutate: submitToggleFollow } = useToggleFollowMutation()

  const label = useMemo(() => {
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

  if (!authUser) return null

  return (
    <MyLoadingButton
      loading={isLoading}
      color={alreadyFollowing ? 'gray' : 'secondary'}
      onClick={handleClick}
      width={props.width || 100}
    >
      {label}
    </MyLoadingButton>
  )
}

export default FollowUnfollowButton
