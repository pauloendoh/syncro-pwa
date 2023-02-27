import { useQuery } from '@tanstack/react-query'

import { urls } from '../../../utils/urls'
import { InterestDto } from './InterestDto'

export const useSavedItemsQuery = () => {
  return useQuery<InterestDto[], Error>([urls.api.findSavedItems])
}
