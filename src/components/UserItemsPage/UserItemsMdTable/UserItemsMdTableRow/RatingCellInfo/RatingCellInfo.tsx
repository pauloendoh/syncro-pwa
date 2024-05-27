import { ActionIcon, Center } from '@mantine/core'
import { useCallback, useMemo } from 'react'
import { MdRateReview, MdStar } from 'react-icons/md'
import { useRatingDetailsModalStore } from '../../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import useSaveRatingModalStore from '../../../../../hooks/zustand/modals/useSaveRatingModalStore'
import { RatingDto } from '../../../../../types/domain/rating/RatingDto'
import {
  RatingStatusType,
  ratingStatusArray,
} from '../../../../../types/domain/rating/ratingStatusArray'
import FlexVCenter from '../../../../_common/flex/FlexVCenter'
import Span from '../../../../_common/text/Span'

export const RatingCellInfo = (props: {
  rating?: RatingDto
  iconColor: string
  ratingStatus: RatingStatusType
  thisIsYourRating?: boolean
  itemId: string
  fixedIconsWidth?: boolean
  ratingSpanWidth?: number
}) => {
  const StatusIcon = ratingStatusArray.find(
    (r) => r.value === props.ratingStatus
  )?.IconWithProps

  const review = props.rating?.review

  const { openModal: openSaveRatingModal } = useSaveRatingModalStore()
  const { openModal: openRatingDetailsModal } = useRatingDetailsModalStore()

  const finalRatingSpanWidth = useMemo(() => {
    if (props.ratingSpanWidth) return props.ratingSpanWidth
    if (props.fixedIconsWidth) return 16

    return undefined
  }, [props.fixedIconsWidth, props.ratingSpanWidth])

  const handleClick = useCallback(() => {
    if (!props.rating) return

    if (props.thisIsYourRating) {
      openSaveRatingModal(props.rating)
      return
    }

    openRatingDetailsModal(props.rating)
  }, [props.rating, props.thisIsYourRating])

  return (
    <FlexVCenter gap={2}>
      <Center w={props.fixedIconsWidth ? 16 : undefined}>
        {review && (
          <ActionIcon
            sx={{
              background: 'transparent !important',
              border: 'none !important',
            }}
            onClick={() => {
              handleClick()
            }}
          >
            <MdRateReview
              style={{
                color: props.iconColor,
                fontSize: 16,
              }}
            />
          </ActionIcon>
        )}
      </Center>

      <Center w={props.fixedIconsWidth ? 16 : undefined}>
        <ActionIcon
          sx={{
            background: 'transparent !important',
            border: 'none !important',
          }}
          onClick={() => {
            handleClick()
          }}
        >
          <div>
            {StatusIcon && (
              <StatusIcon
                style={{
                  color: props.iconColor,
                  fontSize: 16,
                }}
              />
            )}
            {props.thisIsYourRating && !props.rating && <MdStar />}
          </div>
        </ActionIcon>
      </Center>

      {props.rating?.ratingValue && (
        <ActionIcon
          sx={{
            background: 'transparent !important',
            border: 'none !important',
          }}
          onClick={() => {
            handleClick()
          }}
        >
          <Span align="center" miw={finalRatingSpanWidth} mb={2}>
            {props.rating?.ratingValue}
          </Span>
        </ActionIcon>
      )}
    </FlexVCenter>
  )
}
