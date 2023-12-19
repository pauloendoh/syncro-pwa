import { Text, Tooltip, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { MdLock } from 'react-icons/md'
import { useMyRatingsQuery } from '../../../../hooks/react-query/rating/useMyRatingsQuery'
import { useMyColors } from '../../../../hooks/useMyColors'
import { RatingStatusType } from '../../../../types/domain/rating/ratingStatusArray'
import { UserItemDto } from '../../../../types/domain/syncro-item/UserItemDto'
import SyncroItemLink from '../../../_common/SyncroItemLink/SyncroItemLink'
import SyncroItemImage from '../../../_common/image/SyncroItemImage/SyncroItemImage'
import { RatingCellInfo } from './RatingCellInfo/RatingCellInfo'

type Props = {
  item: UserItemDto
  thisIsYourList: boolean
  isLoggedIn: boolean
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

      <td
        style={{
          width: '100%',
        }}
      >
        <SyncroItemLink item={item}>
          <Text size="sm">
            {item.title}
            {item.ratings?.[0]?.isPrivate && (
              <Tooltip label="This rating is private">
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
        <td>
          <RatingCellInfo
            rating={theirRating}
            iconColor={ratingYellow}
            ratingStatus={item.ratings?.[0]?.status as RatingStatusType}
            itemId={item.id}
            fixedIconsWidth
          />
        </td>
      )}

      {props.isLoggedIn && (
        <td>
          <RatingCellInfo
            rating={myRating}
            iconColor={theme.colors.secondary[9]}
            ratingStatus={myRating?.status as RatingStatusType}
            thisIsYourRating
            itemId={item.id}
            fixedIconsWidth
          />
        </td>
      )}
    </>
  )
}

export default UserItemsMdTableRow
