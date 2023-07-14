import { Text, Tooltip, useMantineTheme } from '@mantine/core'
import { useCallback, useMemo } from 'react'
import { MdStarBorder } from 'react-icons/md'
import { useMyRatingQU } from '../../../../../hooks/react-query/rating/useMyRatingsQuery'
import useSaveRatingModalStore from '../../../../../hooks/zustand/modals/useSaveRatingModalStore'
import { buildRatingDto } from '../../../../../types/domain/rating/RatingDto'
import { ratingStatusArrayMap } from '../../../../../types/domain/rating/ratingStatusMap'
import FlexVCenter from '../../../../_common/flex/FlexVCenter'

interface Props {
  itemId: string
}

// PE 1/3 - change name?
const PressableMyRating = (props: Props) => {
  const { openModal: openRatingModal } = useSaveRatingModalStore()
  const myRating = useMyRatingQU(props.itemId)

  const theme = useMantineTheme()

  const color = myRating ? theme.colors.secondary[9] : theme.colors.dark[0]

  const tooltipLabel = useMemo(() => {
    if (!myRating || myRating.ratingValue === null) return 'Rate this item'
    if (myRating.ratingValue > 0) {
      return `You rated ${myRating.ratingValue} out of 10`
    }
  }, [myRating])

  const Icon = useCallback(() => {
    if (!myRating) return <MdStarBorder color={color} size={24} />

    if (myRating.status) {
      const IconWithProps = ratingStatusArrayMap.find(
        (r) => r.value === myRating.status
      )?.IconWithProps
      if (IconWithProps) return <IconWithProps color={color} size={24} />
    }

    return <MdStarBorder color={color} size={24} />
  }, [myRating?.ratingValue, myRating?.status])

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
        <Icon />
        <Text color={myRating && 'secondary'}>{myRating?.ratingValue}</Text>
      </FlexVCenter>
    </Tooltip>
  )
}

export default PressableMyRating
