import {
  ActionIcon,
  Center,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core'
import { useMemo } from 'react'
import { MdLock, MdRateReview, MdStar } from 'react-icons/md'
import { useMyRatingsQuery } from '../../../../hooks/react-query/rating/useMyRatingsQuery'
import { useMyColors } from '../../../../hooks/useMyColors'
import { useRatingDetailsModalStore } from '../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import useSaveRatingModalStore from '../../../../hooks/zustand/modals/useSaveRatingModalStore'
import {
  RatingDto,
  buildRatingDto,
} from '../../../../types/domain/rating/RatingDto'
import {
  RatingStatusType,
  ratingStatusArray,
} from '../../../../types/domain/rating/ratingStatusArray'
import { UserItemDto } from '../../../../types/domain/syncro-item/UserItemDto'
import SyncroItemLink from '../../../_common/SyncroItemLink/SyncroItemLink'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import SyncroItemImage from '../../../_common/image/SyncroItemImage/SyncroItemImage'
import Span from '../../../_common/text/Span'

type Props = {
  item: UserItemDto
  thisIsYourList: boolean
}

const UserItemsMdTableRow = ({ item, ...props }: Props) => {
  const theirRating = useMemo(() => {
    return item.ratings?.[0]
  }, [])

  const { data: myRatings } = useMyRatingsQuery()

  const myRating = useMemo(() => {
    return myRatings?.find((rating) => rating.syncroItemId === item.id)
  }, [myRatings, item.id])

  const { ratingYellow } = useMyColors()
  const theme = useMantineTheme()

  return (
    <>
      <td>
        <SyncroItemLink item={item}>
          <SyncroItemImage item={item} width={48} forceHeight={48} />
        </SyncroItemLink>
      </td>

      <td>
        <SyncroItemLink item={item}>
          <Text size="sm">
            {item.title}
            {item.ratings?.[0]?.isPrivate && (
              <Tooltip label="This rating is private" withArrow>
                <span
                  style={{
                    position: 'relative',
                    top: 2,
                  }}
                >
                  <MdLock style={{ fontSize: 16 }} />
                </span>
              </Tooltip>
            )}
          </Text>
        </SyncroItemLink>
      </td>

      {!props.thisIsYourList && (
        <RatingCell
          rating={theirRating}
          iconColor={ratingYellow}
          ratingStatus={item.ratings?.[0]?.status as RatingStatusType}
          itemId={item.id}
        />
      )}
      <RatingCell
        rating={myRating}
        iconColor={theme.colors.secondary[9]}
        ratingStatus={myRating?.status as RatingStatusType}
        thisIsYourRating
        itemId={item.id}
      />
    </>
  )
}

const RatingCell = (props: {
  rating?: RatingDto
  iconColor: string
  ratingStatus: RatingStatusType
  thisIsYourRating?: boolean
  itemId: string
}) => {
  const StatusIcon = ratingStatusArray.find(
    (r) => r.value === props.ratingStatus
  )?.IconWithProps

  const review = props.rating?.review

  const { openModal: openSaveRatingModal } = useSaveRatingModalStore()
  const { openModal: openRatingDetailsModal } = useRatingDetailsModalStore()

  return (
    <td>
      <FlexVCenter gap={2}>
        <Center w={16}>
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

        <Center w={16}>
          <ActionIcon
            disabled={!props.thisIsYourRating}
            sx={{
              background: 'transparent !important',
              border: 'none !important',
            }}
            onClick={() => {
              if (props.rating) {
                openSaveRatingModal(props.rating)
              }
              openSaveRatingModal(
                buildRatingDto({ syncroItemId: props.itemId })
              )
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

        <Span align="center" w={16} mb={2}>
          {props.rating?.ratingValue}
        </Span>
      </FlexVCenter>
    </td>
  )
}

export default UserItemsMdTableRow
