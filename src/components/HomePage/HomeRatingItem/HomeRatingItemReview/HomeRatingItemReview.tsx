import { Text } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import useRatingDetailsModalStore from '../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import Span from '../../../_common/text/Span'

type Props = {
  rating: RatingDto
}

const HomeRatingItemReview = (props: Props) => {
  const { ref: reviewRef, height: reviewHeight } = useElementSize()

  const { openModal } = useRatingDetailsModalStore()

  return (
    <Text
      sx={{
        marginBottom: 16,
        marginTop: 8,
        fontSize: 14,
        fontStyle: 'italic',
        a: {
          textDecoration: 'none',
        },
        whiteSpace: 'pre-line',
      }}
    >
      <Text lineClamp={3} ref={reviewRef}>
        {props.rating.review}
      </Text>

      <Span
        sx={{
          visibility: reviewHeight > 64 ? 'visible' : 'hidden',
          cursor: 'pointer',
          fontWeight: 600,
        }}
        onClick={() => openModal(props.rating)}
      >
        See more
      </Span>
    </Text>
  )
}

export default HomeRatingItemReview
