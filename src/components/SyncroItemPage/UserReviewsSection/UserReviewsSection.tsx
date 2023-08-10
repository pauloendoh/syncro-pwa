import { Flex, Title } from '@mantine/core'
import { useMyColors } from '../../../hooks/useMyColors'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { urls } from '../../../utils/urls'
import FavoriteScenesSection from '../../HomePage/HomeRatingItem/FavoriteScenesSection/FavoriteScenesSection'
import HomeRatingItemReview from '../../HomePage/HomeRatingItem/HomeRatingItemReview/HomeRatingItemReview'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import UserImage from '../../_common/image/SyncroItemImage/UserImage/UserImage'
import { getShortLabelByRatingValue } from '../../_common/modals/EditRatingModal/getLabelByRatingValue/getLabelByRatingValue'
import MyNextLink from '../../_common/overrides/MyNextLink'
import SemiBold from '../../_common/text/SemiBold'

type Props = {
  reviews: RatingDto[]
}

const UserReviewsSection = (props: Props) => {
  const { ratingYellow } = useMyColors()
  return (
    <FlexCol gap={16}>
      <FlexVCenter>
        <Title order={4}>User reviews · {props.reviews.length}</Title>
      </FlexVCenter>
      <FlexCol gap={16}>
        {props.reviews.map((rating) => (
          <Flex key={rating.id} gap={16}>
            {rating.user?.profile?.pictureUrl && (
              <UserImage
                pictureUrl={rating.user?.profile?.pictureUrl}
                username={rating.user?.username}
                widthHeight={40}
                userIdAndLink={rating.userId}
              />
            )}

            <FlexCol>
              <MyNextLink href={urls.pages.user(rating.userId)}>
                <SemiBold sx={{ fontWeight: 'bold' }}>
                  {rating.user?.username}
                </SemiBold>
              </MyNextLink>

              <SemiBold
                sx={{
                  color: ratingYellow,
                }}
              >
                {rating.ratingValue} -{' '}
                {getShortLabelByRatingValue(rating.ratingValue)}
              </SemiBold>

              <HomeRatingItemReview rating={rating} />

              {rating.scenes && (
                <FavoriteScenesSection scenes={rating.scenes} />
              )}
            </FlexCol>
          </Flex>
        ))}
      </FlexCol>
    </FlexCol>
  )
}

export default UserReviewsSection
