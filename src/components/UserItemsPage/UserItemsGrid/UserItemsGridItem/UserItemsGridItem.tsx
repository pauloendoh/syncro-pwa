import { useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { useMyRatingsQuery } from '../../../../hooks/react-query/rating/useMyRatingsQuery'
import { useMyColors } from '../../../../hooks/useMyColors'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { RatingStatusType } from '../../../../types/domain/rating/ratingStatusArray'
import { UserItemDto } from '../../../../types/domain/syncro-item/UserItemDto'
import FavoriteItem from '../../../UserProfilePage/FavoritesSection/FavoritesByType/FavoritesByType/FavoriteItem/FavoriteItem'
import FlexCol from '../../../_common/flex/FlexCol'
import { RatingCellInfo } from '../../UserItemsMdTable/UserItemsMdTableRow/RatingCellInfo/RatingCellInfo'

type Props = {
  item: UserItemDto
  thisIsYourList: boolean
}

const UserItemsGridItem = ({ ...props }: Props) => {
  const { data: myRatings } = useMyRatingsQuery()

  const theirRating = useMemo(() => {
    return props.item.ratings?.[0]
  }, [])

  const myRating = useMemo(() => {
    return myRatings?.find((rating) => rating.syncroItemId === props.item.id)
  }, [myRatings, props.item.id])

  const { ratingYellow } = useMyColors()
  const { isMobile } = useMyMediaQuery()
  const theme = useMantineTheme()

  return (
    <FlexCol className="UserItemsGridItem" align="center">
      <FavoriteItem
        item={props.item}
        showMyRating={!props.thisIsYourList}
        width={isMobile ? 90 : 150}
        alwaysShowTitle
      />
      <RatingCellInfo
        iconColor={
          props.thisIsYourList ? theme.colors.secondary[9] : ratingYellow
        }
        itemId={props.item.id}
        ratingStatus={
          props.thisIsYourList
            ? (myRating?.status as RatingStatusType)
            : (theirRating?.status as RatingStatusType)
        }
        rating={props.thisIsYourList ? myRating : theirRating}
        thisIsYourRating={props.thisIsYourList}
        ratingSpanWidth={28}
      />
    </FlexCol>
  )
}

export default UserItemsGridItem
