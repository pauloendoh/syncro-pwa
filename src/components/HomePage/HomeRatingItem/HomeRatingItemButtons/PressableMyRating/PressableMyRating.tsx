import { Text, Tooltip, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { CgRadioCheck } from 'react-icons/cg'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import {
  MdAccessTime,
  MdCheckCircleOutline,
  MdStarBorder,
} from 'react-icons/md'
import { useMyRatingQU } from '../../../../../hooks/react-query/rating/useMyRatingsQuery'
import useSaveRatingModalStore from '../../../../../hooks/zustand/modals/useSaveRatingModalStore'
import { buildRatingDto } from '../../../../../types/domain/rating/RatingDto'
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

  const icon = useMemo(() => {
    if (!myRating) return <MdStarBorder color={color} size={24} />

    if (myRating.status === 'IN_PROGRESS')
      return <CgRadioCheck color={color} size={24} />

    if (myRating.status === 'ON_HOLD')
      return <MdAccessTime color={color} size={24} />

    if (myRating.status === 'DROPPED')
      return <IoMdCloseCircleOutline color={color} size={24} />

    if (myRating.status === 'COMPLETED')
      return <MdCheckCircleOutline color={color} size={24} />

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
        {icon}
        <Text color={myRating && 'secondary'}>{myRating?.ratingValue}</Text>
      </FlexVCenter>
    </Tooltip>
  )
}

export default PressableMyRating
