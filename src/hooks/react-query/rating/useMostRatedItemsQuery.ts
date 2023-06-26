import { useQuery } from '@tanstack/react-query'

import { Period } from '../../../components/ExplorePageContent/MostRatedExploreSection/MostRatedExploreSection'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../../utils/urls'

export function useMostRatedItemsQuery(params: {
  period: Period
  itemType: SyncroItemType
}) {
  let createdAtGte: string
  switch (params.period) {
    case 'year':
      createdAtGte = new Date(new Date().getFullYear() - 1, 0, 1).toISOString()
      break
    case 'month':
      createdAtGte = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        1
      ).toISOString()
      break
    case 'week':
      createdAtGte = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 7
      ).toISOString()
      break
    case 'all-time':
      createdAtGte = new Date(0).toISOString()
      break
  }

  return useQuery<SyncroItemDto[], Error>(
    [
      urls.api.mostRatedItems({
        createdAtGte,
        type: params.itemType,
      }),
    ],
    {}
  )
}
