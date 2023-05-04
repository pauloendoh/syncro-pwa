import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import FollowUnfollowButton from './FollowUnfollowButton/FollowUnfollowButton'
import MessageButton from './MessageButton/MessageButton'
import RecommendUserButton from './RecommendUserButton/RecommendUserButton'

interface Props {
  userId: string
}

const ProfileScreenButtons = (props: Props) => {
  const { authUser } = useAuthStore()
  const { isMobile } = useMyMediaQuery()

  if (!authUser) return null
  return (
    <FlexVCenter gap={isMobile ? 8 : 16}>
      <FollowUnfollowButton profileUserId={props.userId} />
      <RecommendUserButton userId={props.userId} />
      <MessageButton userId={props.userId} />
    </FlexVCenter>
  )
}

export default ProfileScreenButtons
