import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

import { urls } from '../../../utils/urls'
import { GenreCountDto } from './types/GenreCountDto'

export const useGenresCountQuery = (
  itemType: SyncroItemType,
  userId?: string
) => {
  return useQuery<GenreCountDto[], AxiosError>(
    [urls.api.genresCount(userId!, itemType)],

    {
      enabled: !!userId,
    }
  )
}
