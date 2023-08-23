import { Box } from '@mantine/core'
import { useMyColors } from '../../../../hooks/useMyColors'
import { RatingSimilarityByTypeDto } from '../../../../types/domain/rating/RatingSimilarityByTypeDto'
import FollowUnfollowButton from '../../../UserProfilePage/ProfileScreenButtons/FollowUnfollowButton/FollowUnfollowButton'
import FlexCol from '../../../_common/flex/FlexCol'
import UserImage from '../../../_common/image/SyncroItemImage/UserImage/UserImage'
import Span from '../../../_common/text/Span'

type Props = {
  item: RatingSimilarityByTypeDto
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
      <FlexCol align={'center'} justify={'space-between'}>
        <UserImage pictureUrl={props.item.userB.profile.pictureUrl} />
        <Span align="center" size="sm" weight={500} lineClamp={2}>
          Paulo Ricardo Endoh
        </Span>
        {/* <span>{props.item.userB.profile.fullName}</span> */}
        <Span color="dimmed" align="center" size="sm">
          @{props.item.userB.username}
        </Span>

        <Box mt={16}>
          <FollowUnfollowButton profileUserId={props.item.userB.id} />
        </Box>
      </FlexCol>
    </Box>
  )
}

export default UserRecommendationCard
