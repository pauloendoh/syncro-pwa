import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { SyncroItemDto } from "../../../types/domain/syncro-item/SyncroItemDto"
import { SyncroItemType } from "../../../types/domain/syncro-item/SyncroItemType/SyncroItemType"

import { urls } from "../../../utils/urls"

export const useItemsToRecommendQuery = (
  recommendToUserId: string | null,
  itemType: SyncroItemType
) => {
  return useQuery<ItemToRecommendDto[], AxiosError>(
    [urls.api.itemsToRecommendToUser(recommendToUserId!, itemType)],
    {
      enabled: !!recommendToUserId,
    }
  )
}

export interface ItemToRecommendDto {
  item: SyncroItemDto
  myRating: number
  theySaved: boolean
}
