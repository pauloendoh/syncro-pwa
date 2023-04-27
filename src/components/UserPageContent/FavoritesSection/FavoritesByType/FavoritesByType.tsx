import { Flex, ScrollArea, Title } from '@mantine/core'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { FavoriteItemDto } from '../../../../hooks/react-query/favorite-item/types/FavoriteItemDto'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../../../utils/urls'
import FlexCol from '../../../_common/flex/FlexCol'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import FavoriteItem from './FavoriteItem/FavoriteItem'

type Props = {
  type: SyncroItemType
  favorites: FavoriteItemDto[]
  userId: string
}

const FavoritesByType = (props: Props) => {
  const typeMap = useSyncroItemTypeMap({
    itemType: props.type,
  })

  if (props.favorites.length === 0) return null

  return (
    <FlexCol gap={4}>
      <MyNextLink href={urls.pages.userItems(props.userId, props.type)}>
        <Title order={5}>
          Favorite {typeMap?.getTypeLabelLowerCase(props.favorites.length > 1)}
        </Title>
      </MyNextLink>
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
