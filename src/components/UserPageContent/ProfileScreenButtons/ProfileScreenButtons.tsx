import FlexVCenter from '../../_common/flex/FlexVCenter'
import FollowUnfollowButton from './FollowUnfollowButton/FollowUnfollowButton'

interface Props {
  userId: string
}

const ProfileScreenButtons = (props: Props) => {
  return (
    <FlexVCenter gap={16}>
      <FollowUnfollowButton profileUserId={props.userId} />
      {/* <RecommendUserButton userId={props.userId} /> */}
    </FlexVCenter>
  )
}

export default ProfileScreenButtons