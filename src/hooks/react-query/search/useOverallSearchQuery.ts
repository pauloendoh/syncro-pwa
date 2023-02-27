import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { IImdbResultItem } from "../../../types/domain/movie/MovieResultResponseDto"
import { SyncroItemDto } from "../../../types/domain/syncro-item/SyncroItemDto"
import { SyncroItemType } from "../../../types/domain/syncro-item/SyncroItemType/SyncroItemType"

import { urls } from "../../../utils/urls"

export const useOverallSearchQuery = (query: string, type: SyncroItemType) => {
  return useQuery<IImdbResultItem[] | SyncroItemDto[], AxiosError>(
    [urls.api.search({ q: query, type })],
    {
      retry: false,
      enabled: !!type && query.length > 0,
    }
  )
}
