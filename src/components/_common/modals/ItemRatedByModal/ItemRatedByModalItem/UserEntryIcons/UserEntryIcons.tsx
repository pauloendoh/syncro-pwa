import { useRatingDetailsModalStore } from '../../../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import { RatingDto } from '../../../../../../types/domain/rating/RatingDto'
import { useRatingStatusIcon } from '../../../../../../types/domain/rating/useRatingStatusIcon/useRatingStatusIcon'
import MyIcons from '../../../../MyIcons/MyIcons'
import FlexVCenter from '../../../../flex/FlexVCenter'

type Props = {
  rating: RatingDto
  color: string
}

const UserEntryIcons = ({ rating, ...props }: Props) => {
  const { openModal } = useRatingDetailsModalStore()
  const Icon = useRatingStatusIcon(rating.status)

  return (
    <FlexVCenter gap={2}>
      {!!rating.review && (
        <MyIcons.Review
          color={props.color}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => {
            openModal(rating)
          }}
        />
      )}

      <Icon
        color={props.color}
        style={{
          position: 'relative',
        }}
      />
      <b
        style={{
          color: props.color,
          marginLeft: 2,
        }}
      >
        {rating.ratingValue || null}
      </b>
    </FlexVCenter>
  )
}

export default UserEntryIcons
