import { Flex, ScrollArea, Title } from '@mantine/core'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useItemRecommendationsForMeQuery } from '../../../../hooks/react-query/item-recommendation/useItemRecommendationsForMeQuery'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FavoriteItem from '../../../UserProfilePage/FavoritesSection/FavoritesByType/FavoritesByType/FavoriteItem/FavoriteItem'
import FlexCol from '../../../_common/flex/FlexCol'

type Props = {
  type: SyncroItemType
}

const RecommendedForYouByType = ({ ...props }: Props) => {
  const typeMap = useSyncroItemTypeMap({
    itemType: props.type,
  })

  const { data } = useItemRecommendationsForMeQuery(props.type)

  return (
    <FlexCol className="RecommendedForYouByType" gap={16}>
      <Title order={5}>{typeMap.getTypeLabel()}</Title>
      <ScrollArea pb={8}>
        <Flex gap={8}>
          {data?.map((item) => (
            <FavoriteItem key={item.id} item={item} alwaysShowTitle />
          ))}
        </Flex>
      </ScrollArea>
    </FlexCol>
  )
}

export default RecommendedForYouByType
