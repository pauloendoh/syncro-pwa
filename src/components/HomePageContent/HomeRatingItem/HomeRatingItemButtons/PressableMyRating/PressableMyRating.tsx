import { Text, useMantineTheme } from '@mantine/core'
import { MdStar } from 'react-icons/md'
import { useMyRatingQueryUtils } from '../../../../../hooks/react-query/rating/useMyRatingsQuery'
import useRatingModalStore from '../../../../../hooks/zustand/domains/modals/useRatingModalStore'
import { buildRatingDto } from '../../../../../types/domains/rating/RatingDto'
import FlexVCenter from '../../../../_common/flex/FlexVCenter'

interface Props {
  itemId: string
}

const PressableMyRating = (props: Props) => {
  const { openModal: openRatingModal } = useRatingModalStore()
  const myRating = useMyRatingQueryUtils(props.itemId)

  const theme = useMantineTheme()

  return (
    <FlexVCenter
      sx={{
        cursor: 'pointer',
      }}
      gap={4}
      onClick={() => {
        openRatingModal(
          myRating || buildRatingDto({ syncroItemId: props.itemId })
        )
      }}
    >
      <MdStar
        color={
          myRating && myRating.ratingValue && myRating.ratingValue > 0
            ? theme.colors.secondary[9]
            : theme.colors.dark[0]
        }
        size={24}
      />

      <Text color={myRating && 'secondary'}>
        {myRating?.ratingValue || <Text>Rate</Text>}
      </Text>
    </FlexVCenter>
  )
}

export default PressableMyRating
