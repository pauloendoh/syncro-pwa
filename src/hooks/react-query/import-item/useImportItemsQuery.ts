import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { RatingImportItemDto } from '../../../types/domain/rating-import-request/RatingImportItemDto'
import { urls } from '../../../utils/urls/urls'

export const useImportItemsQuery = (
  importRequestId: string,
  enabled: boolean
) => {
  return useQuery<RatingImportItemDto[], AxiosError>(
    [urls.api.importItemsByRequestId(importRequestId)],
    {
      enabled,
    }
  )
}
