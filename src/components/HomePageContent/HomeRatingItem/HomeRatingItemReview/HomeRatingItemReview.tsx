import { Text } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import useRatingDetailsModalStore from '../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'

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
      {reviewHeight > 64 && (
        <Text
          sx={{
            cursor: 'pointer',
            fontWeight: 600,
          }}
          onClick={() => openModal(props.rating)}
        >
          See more
        </Text>
      )}
    </Text>
  )
}

export default HomeRatingItemReview
