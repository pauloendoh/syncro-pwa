import { Box } from '@mantine/core'
import { useRatingDetailsModalStore } from '../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import MySeeMore from '../../../_common/text/MySeeMore/MySeeMore'

type Props = {
  rating: RatingDto
}

const HomeRatingItemReview = (props: Props) => {
  const { openModal } = useRatingDetailsModalStore()

  return (
    <Box mt={8}>
      <MySeeMore preventDefaultOnClick onClick={() => openModal(props.rating)}>
        {props.rating.review}
      </MySeeMore>
    </Box>
  )
}

export default HomeRatingItemReview
