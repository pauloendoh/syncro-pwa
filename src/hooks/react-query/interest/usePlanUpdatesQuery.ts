import { useQuery } from '@tanstack/react-query'
import { InterestDto } from '../../../types/domain/interest/InterestDto'

import { urls } from '../../../utils/urls'

export const usePlanUpdatesQuery = (userId?: string) => {
  return useQuery<InterestDto[], Error>([urls.api.planUpdates], {
    enabled: !!userId,
  })
}
