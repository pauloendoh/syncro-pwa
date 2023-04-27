import { Title } from '@mantine/core'
import { useMemo } from 'react'
import { FavoriteItemDto } from '../../../hooks/react-query/favorite-item/types/FavoriteItemDto'
import { useFavoriteItemsQuery } from '../../../hooks/react-query/favorite-item/useFavoriteItemsQuery'
import { syncroItemTypes } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../../_common/flex/FlexCol'
import FavoritesByType from './FavoritesByType/FavoritesByType'

type Props = {
  userId: string
}

const FavoritesSection = ({ userId }: Props) => {
  const { data: favorites } = useFavoriteItemsQuery(userId)

  const groupedAndSortedFavorites = useMemo(() => {
    if (!favorites) return []

    // grouped by type, sorted by position asc
    return syncroItemTypes.map((type) => ({
      type,
      items: favorites
        .filter((item: FavoriteItemDto) => item.syncroItem.type === type)
        .sort((a, b) => a.position - b.position),
    }))
  }, [favorites])

  if (!favorites || favorites.length === 0) return null

  return (
    <FlexCol gap={8}>
      <Title order={4}>Favorites</Title>

      <FlexCol gap={16}>
        {groupedAndSortedFavorites.map((group) => (
          <FavoritesByType
            key={group.type}
            type={group.type}
            favorites={group.items}
          />
        ))}
      </FlexCol>
    </FlexCol>
  )
}

export default FavoritesSection
