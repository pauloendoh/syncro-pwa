import { Text, Tooltip, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { MdStar, MdStarBorder } from 'react-icons/md'
import { useMyRatingQU } from '../../../../../hooks/react-query/rating/useMyRatingsQuery'
import useSaveRatingModalStore from '../../../../../hooks/zustand/modals/useSaveRatingModalStore'
import { buildRatingDto } from '../../../../../types/domain/rating/RatingDto'
import FlexVCenter from '../../../../_common/flex/FlexVCenter'

interface Props {
  itemId: string
}

const PressableMyRating = (props: Props) => {
  const { openModal: openRatingModal } = useSaveRatingModalStore()
  const myRating = useMyRatingQU(props.itemId)

  const theme = useMantineTheme()

  const color =
    myRating && myRating.ratingValue && myRating.ratingValue > 0
      ? theme.colors.secondary[9]
      : theme.colors.dark[0]

  const tooltipLabel = useMemo(() => {
    if (!myRating || myRating.ratingValue === null) return 'Rate this item'
    if (myRating.ratingValue > 0) {
      return `You rated ${myRating.ratingValue} out of 10`
    }
  }, [myRating])

  return (
    <Tooltip label={tooltipLabel}>
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
        {myRating ? (
          <MdStar color={color} size={24} />
        ) : (
          <MdStarBorder color={color} size={24} />
        )}

        <Text color={myRating && 'secondary'} w={36}>
          {myRating?.ratingValue}
        </Text>
      </FlexVCenter>
    </Tooltip>
  )
}

export default PressableMyRating
