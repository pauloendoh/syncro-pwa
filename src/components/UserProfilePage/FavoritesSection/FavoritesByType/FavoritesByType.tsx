import { Flex, ScrollArea } from '@mantine/core'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { FavoriteItemDto } from '../../../../hooks/react-query/favorite-item/types/FavoriteItemDto'
import { useUserItemsQuery } from '../../../../hooks/react-query/user-item/useUserItemsQuery'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../../../utils/urls'
import FlexCol from '../../../_common/flex/FlexCol'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import Span from '../../../_common/text/Span'
import FavoriteItem from './FavoritesByType/FavoriteItem/FavoriteItem'

type Props = {
  type: SyncroItemType
  favorites: FavoriteItemDto[]
  userId: string
}

const FavoritesByType = (props: Props) => {
  const typeMap = useSyncroItemTypeMap({
    itemType: props.type,
  })

  const { data: typeItems } = useUserItemsQuery(props.userId, props.type)

  if (props.favorites.length === 0) return null

  return (
    <FlexCol gap={4}>
      <MyNextLink
        href={urls.pages.userItems(props.userId, props.type)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Span>
          {typeMap?.getTypeLabel(true)}
          {' · '}
        </Span>

        {typeItems && (
          <Span ml={2} size="sm">
            {' '}
            {typeItems?.length} items
          </Span>
        )}
      </MyNextLink>
      <ScrollArea>
        <Flex pb={16} gap={8}>
          {props.favorites.map(
            (fav, index) =>
              fav.syncroItem && (
                <FavoriteItem
                  key={fav.id}
                  item={fav.syncroItem}
                  previewPosition={
                    index === 0 || index === 1 ? 'bottom-end' : 'bottom'
                  }
                />
              )
          )}
        </Flex>
      </ScrollArea>
    </FlexCol>
  )
}

export default FavoritesByType
