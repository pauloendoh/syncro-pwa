import { Box, Text } from '@mantine/core'
import { useRatingDetailsModalStore } from '../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import MyReactLinkify from '../../../_common/text/MyReactLinkify'
import MySeeMore from '../../../_common/text/MySeeMore/MySeeMore'

type Props = {
  rating: RatingDto
}

const HomeRatingItemReview = (props: Props) => {
  const { openModal } = useRatingDetailsModalStore()

  return (
    <Box mt={8}>
      <MySeeMore preventDefaultOnClick onClick={() => openModal(props.rating)}>
        <Text>
          <MyReactLinkify truncateWidth={200}>
            {props.rating.review}
          </MyReactLinkify>
        </Text>
      </MySeeMore>
    </Box>
  )
}

export default HomeRatingItemReview
