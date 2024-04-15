import { useQuery } from '@tanstack/react-query'

import { Period } from '../../../components/ExplorePageContent/BrowseItemsExploreSection/BrowseItemsExploreSection'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../../utils/urls/urls'

export function useMostRatedItemsQuery(params: {
  period: Period
  itemType: SyncroItemType
}) {
  const mapped: {
    [key in Period]: string
  } = {
    year: new Date(new Date().getFullYear() - 1, 0, 1).toISOString(),
    month: new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      1
    ).toISOString(),
    week: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 7
    ).toISOString(),
    'all-time': new Date(0).toISOString(),
  }

  const createdAtGte = mapped[params.period]

  return useQuery<SyncroItemDto[], Error>(
    [
      urls.api.mostRatedItems({
        createdAtGte,
        type: params.itemType,
      }),
    ],
    {
      enabled: !!params.itemType && !!params.period,
    }
  )
}
