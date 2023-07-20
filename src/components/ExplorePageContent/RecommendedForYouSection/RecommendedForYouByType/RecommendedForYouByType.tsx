import { Flex, ScrollArea, Title } from '@mantine/core'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useItemRecommendationsForMeQuery } from '../../../../hooks/react-query/item-recommendation/useItemRecommendationsForMeQuery'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
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

  return (
    <FlexCol className="RecommendedForYouByType" gap={16}>
      <Title order={5}>{typeMap.getTypeLabel(true)}</Title>
      <ScrollArea pb={16}>
        <Flex gap={8}>
          {isLoading && <CenterLoader height={133} width="100%" />}
          {data?.map((item) => (
            <FavoriteItem
              key={item.id}
              item={item}
              alwaysShowTitle
              showAvgRating
            />
          ))}
          {data?.length === 0 && <Span>No recommendations for you yet</Span>}
        </Flex>
      </ScrollArea>
    </FlexCol>
  )
}

export default RecommendedForYouByType
