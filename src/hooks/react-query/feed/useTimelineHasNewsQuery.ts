import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { queryKeys } from '../../../utils/queryKeys'

import { urls } from '../../../utils/urls'

export const useTimelineHasNewsQuery = (
  userId?: string,
  lastRatingCreatedAt?: string
) => {
  const queryClient = useQueryClient()

  return useQuery<boolean, AxiosError>(
    [urls.api.timelineHasNews(userId, lastRatingCreatedAt)],
    {
      onSuccess: (hasNews) => {
        if (hasNews) {
          queryClient.invalidateQueries(queryKeys.timelineItems(userId))
        }
      },
      refetchInterval: 30000, // 30 seconds
    }
  )
}
