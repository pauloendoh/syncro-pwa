import { Anchor, Center, Flex } from '@mantine/core'
import { MdStar } from 'react-icons/md'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useUpdateInterestMutationV2 } from '../../../hooks/react-query/interest/useUpdateInterestMutationV2'
import { useMyColors } from '../../../hooks/useMyColors'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { useRatingStatusMapV2 } from '../../../types/domain/rating/ratingStatusArray'
import { capitalize } from '../../../utils/text/capitalize'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import SyncroItemLink from '../../_common/SyncroItemLink/SyncroItemLink'
import Span from '../../_common/text/Span'
import SyncroItemIcon from '../../HomePage/HomeRatingItem/SyncroItemIcon/SyncroItemIcon'

type Props = {
  rating: RatingDto
  index: number
}

export const MyInterestTableRow = ({ rating, ...props }: Props) => {
  const typeMap = useSyncroItemTypeMap({
    itemType: rating.syncroItem?.type,
  })

  const { mutate: submitUpdateInterest } = useUpdateInterestMutationV2()
  const myColors = useMyColors()
  const statusMap = useRatingStatusMapV2(rating.status)

  return (
    <tr key={rating.id}>
      <td>{props.index + 1}</td>
      <td>
        <Flex gap={8}>
          <SyncroItemLink item={rating.syncroItem!}>
            <SyncroItemImage width={40} item={rating.syncroItem} />
          </SyncroItemLink>

          <FlexCol>
            <SyncroItemLink item={rating.syncroItem!}>
              <Anchor color="unset">{rating.syncroItem?.title}</Anchor>
            </SyncroItemLink>
            <Span
              size="xs"
              sx={{
                marginTop: 2,
                display: 'block',
                width: 'fit-content',

                background: typeMap.interestBgColor,
                borderRadius: 4,
                paddingInline: 4,
                paddingBlock: 1,
              }}
            >
              <FlexVCenter gap={4}>
                <SyncroItemIcon
                  type={rating.syncroItem?.type ?? 'movie'}
                  size={12}
                />
                <span>{typeMap.getTypeLabel()}</span>
              </FlexVCenter>
            </Span>
          </FlexCol>
        </Flex>
      </td>
      <td
        className="clickable"
        onClick={() => {
          const text = prompt('Enter interest level')?.trim()
          if (text === '') {
            submitUpdateInterest({
              ratingId: rating.id,
              interestLevel: null,
            })
            return
          }
          const num = parseFloat(text ?? '')
          if (isNaN(num)) {
            return
          }

          submitUpdateInterest({
            ratingId: rating.id,
            interestLevel: num,
          })
        }}
        style={{
          textAlign: 'center',
        }}
      >
        {rating.interestLevel}
      </td>
      <td
        className="clickable"
        onClick={() => {
          const text = prompt('Enter hours left')?.trim()
          if (text === '') {
            submitUpdateInterest({
              ratingId: rating.id,
              myHoursLeft: null,
            })
            return
          }
          const num = parseFloat(text ?? '')
          if (isNaN(num)) {
            return
          }

          submitUpdateInterest({
            ratingId: rating.id,
            myHoursLeft: num,
          })
        }}
        style={{
          textAlign: 'center',
        }}
      >
        {rating.myHoursLeft !== null &&
          rating.myHoursLeft > 0 &&
          `${rating.myHoursLeft} hours`}
      </td>
      <td
        style={{
          textAlign: 'center',
        }}
      >
        <Center>
          <FlexVCenter gap={2}>
            <MdStar color={myColors.ratingYellow} />

            <span>{rating.syncroItem?.avgRating}</span>
          </FlexVCenter>
        </Center>
      </td>
      <td>{capitalize(statusMap?.simpleLabel ?? '')}</td>
    </tr>
  )
}
