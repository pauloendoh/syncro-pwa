import { Flex, ScrollArea, Title } from '@mantine/core'
import { useMemo } from 'react'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import useIgnoreItemRecommendationMutation from '../../../../hooks/react-query/item-recommendation/useIgnoreItemRecommendationMutation'
import { useItemRecommendationsForMeQuery } from '../../../../hooks/react-query/item-recommendation/useItemRecommendationsForMeQuery'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import ItemSavedByPreloaded from '../../../SyncroItemPage/ItemSavedBy/ItemSavedByPreloaded/ItemSavedByPreloaded'
import FavoriteItem from '../../../UserProfilePage/FavoritesSection/FavoritesByType/FavoritesByType/FavoriteItem/FavoriteItem'
import FlexCol from '../../../_common/flex/FlexCol'
import CenterLoader from '../../../_common/overrides/CenterLoader/CenterLoader'
import Span from '../../../_common/text/Span'

type Props = {
  type: SyncroItemType
}

const RecommendedForYouByType = ({ ...props }: Props) => {
  const typeMap = useSyncroItemTypeMap({
    itemType: props.type,
  })

  const { data, isLoading } = useItemRecommendationsForMeQuery(props.type)
  const { mutate: submitIgnore } = useIgnoreItemRecommendationMutation()

  const hasAnyRatingsByFollowingUsers = useMemo(
    () =>
      data?.some(
        ({ ratingsByFollowingUsers }) => ratingsByFollowingUsers.length > 0
      ),
    [data]
  )

  return (
    <FlexCol className="RecommendedForYouByType" gap={16}>
      <Title order={5}>{typeMap.getTypeLabel(true)}</Title>
      <ScrollArea pb={16} h={hasAnyRatingsByFollowingUsers ? 240 : undefined}>
        <Flex gap={8}>
          {isLoading && <CenterLoader height={133} width="100%" />}
          {data?.map(({ item, ratingsByFollowingUsers }) => (
            <FlexCol key={item.id}>
              <FavoriteItem
                item={item}
                width={133}
                alwaysShowTitle
                showAvgRating
                onClose={() =>
                  submitIgnore({
                    itemId: item.id,
                    itemType: props.type,
                  })
                }
                onCloseTooltip="Not interested"
              />
              <ItemSavedByPreloaded
                itemId={item.id}
                ratings={ratingsByFollowingUsers}
              />
            </FlexCol>
          ))}
          {data?.length === 0 && <Span>No recommendations for you yet</Span>}
        </Flex>
      </ScrollArea>
    </FlexCol>
  )
}

export default RecommendedForYouByType
