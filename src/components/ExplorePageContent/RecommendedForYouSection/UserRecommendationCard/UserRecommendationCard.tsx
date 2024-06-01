import { Box } from '@mantine/core'
import { useMyColors } from '../../../../hooks/useMyColors'
import { UserSimpleDto } from '../../../../types/domain/user/UserSimpleDto'
import { urls } from '../../../../utils/urls/urls'
import FollowUnfollowButton from '../../../UserProfilePage/ProfileScreenButtons/FollowUnfollowButton/FollowUnfollowButton'
import FlexCol from '../../../_common/flex/FlexCol'
import UserImage from '../../../_common/image/SyncroItemImage/UserImage/UserImage'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import Span from '../../../_common/text/Span'

type Props = {
  user: UserSimpleDto
}

const UserRecommendationCard = ({ ...props }: Props) => {
  const { border } = useMyColors()
  return (
    <Box
      className="UserRecommendationCard"
      sx={{
        paddingInline: 8,
        paddingBlock: 16,
        border: '1px solid ' + border,
        borderRadius: 4,
        width: 133,
      }}
    >
      <FlexCol
        align={'center'}
        justify={'space-between'}
        sx={{
          height: '100%',
        }}
      >
        <FlexCol align={'center'}>
          <UserImage
            pictureUrl={props.user.profile.pictureUrl}
            userIdForLink={props.user.id}
          />
          <MyNextLink
            href={urls.pages.userProfile(props.user.id)}
            style={{
              marginTop: 4,
            }}
          >
            <Span color="dimmed" align="center" size="sm">
              @{props.user.username}
            </Span>
          </MyNextLink>

          <MyNextLink href={urls.pages.userProfile(props.user.id)}>
            <Span align="center" size="sm" weight={500} lineClamp={2} mih={20}>
              {props.user.profile.fullName}
            </Span>
          </MyNextLink>
        </FlexCol>

        <Box mt={16}>
          <FollowUnfollowButton profileUserId={props.user.id} />
        </Box>
      </FlexCol>
    </Box>
  )
}

export default UserRecommendationCard
