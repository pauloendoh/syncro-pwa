import { Text, Tooltip, useMantineTheme } from '@mantine/core'
import { useCallback, useMemo } from 'react'
import { MdStarBorder } from 'react-icons/md'
import { useMyItemRatingQueryUtils } from '../../../../../hooks/react-query/rating/useMyItemRatingQueryUtils'
import useSaveRatingModalStore from '../../../../../hooks/zustand/modals/useSaveRatingModalStore'
import { buildRatingDto } from '../../../../../types/domain/rating/RatingDto'
import { ratingStatusArray } from '../../../../../types/domain/rating/ratingStatusArray'
import FlexVCenter from '../../../../_common/flex/FlexVCenter'

interface Props {
  itemId: string
}

const MyRatingButton = (props: Props) => {
  const { openModal: openRatingModal } = useSaveRatingModalStore()
  const myRating = useMyItemRatingQueryUtils(props.itemId)

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
      const IconWithProps = ratingStatusArray.find(
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
        <Text color={myRating ? 'secondary' : undefined}>
          {myRating?.ratingValue}
        </Text>
      </FlexVCenter>
    </Tooltip>
  )
}

export default MyRatingButton
