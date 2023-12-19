import { ActionIcon, Center } from '@mantine/core'
import { useMemo } from 'react'
import { MdRateReview, MdStar } from 'react-icons/md'
import { useRatingDetailsModalStore } from '../../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import useSaveRatingModalStore from '../../../../../hooks/zustand/modals/useSaveRatingModalStore'
import {
  RatingDto,
  buildRatingDto,
} from '../../../../../types/domain/rating/RatingDto'
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
              if (!props.rating) return
              openRatingDetailsModal(props.rating)
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
          disabled={!props.thisIsYourRating}
          sx={{
            background: 'transparent !important',
            border: 'none !important',
          }}
          onClick={() => {
            if (props.rating) {
              openSaveRatingModal(props.rating)
              return
            }
            openSaveRatingModal(buildRatingDto({ syncroItemId: props.itemId }))
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
        <Span align="center" miw={finalRatingSpanWidth} mb={2}>
          {props.rating?.ratingValue}
        </Span>
      )}
    </FlexVCenter>
  )
}
