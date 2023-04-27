import { Flex, ScrollArea, Text } from '@mantine/core'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { FavoriteItemDto } from '../../../../hooks/react-query/favorite-item/types/FavoriteItemDto'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../../../_common/flex/FlexCol'
import FavoriteItem from './FavoriteItem/FavoriteItem'

type Props = {
  type: SyncroItemType
  favorites: FavoriteItemDto[]
}

const FavoritesByType = (props: Props) => {
  const typeMap = useSyncroItemTypeMap({
    itemType: props.type,
  })

  if (props.favorites.length === 0) return null

  return (
    <FlexCol gap={4}>
      <Text>{typeMap?.getTypeLabel(props.favorites.length > 1)}</Text>
      <ScrollArea>
        <Flex pb={16} gap={8}>
          {props.favorites.map((fav) => (
            <FavoriteItem key={fav.id} item={fav.syncroItem} />
          ))}
        </Flex>
      </ScrollArea>
    </FlexCol>
  )
}

export default FavoritesByType
