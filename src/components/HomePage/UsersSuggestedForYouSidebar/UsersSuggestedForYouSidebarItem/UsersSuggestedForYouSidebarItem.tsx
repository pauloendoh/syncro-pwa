import { UserSimpleDto } from '../../../../types/domain/user/UserSimpleDto'
import { urls } from '../../../../utils/urls/urls'
import FollowUnfollowButton from '../../../UserProfilePage/ProfileScreenButtons/FollowUnfollowButton/FollowUnfollowButton'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import UserImage from '../../../_common/image/SyncroItemImage/UserImage/UserImage'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import Span from '../../../_common/text/Span'

type Props = {
  user: UserSimpleDto
}

const UsersSuggestedForYouSidebarItem = ({ ...props }: Props) => {
  return (
    <FlexVCenter justify={'space-between'} maw={400}>
      <FlexVCenter className="UsersSuggestedForYouSidebarItem" gap={16}>
        <UserImage
          pictureUrl={props.user.profile.pictureUrl}
          userIdForLink={props.user.id}
        />
        <FlexCol>
          <MyNextLink href={urls.pages.userProfile(props.user.id)}>
            <Span align="center" weight={600} lineClamp={2}>
              {props.user.username}
            </Span>
          </MyNextLink>
        </FlexCol>
      </FlexVCenter>
      <FollowUnfollowButton profileUserId={props.user.id} />
    </FlexVCenter>
  )
}

export default UsersSuggestedForYouSidebarItem
