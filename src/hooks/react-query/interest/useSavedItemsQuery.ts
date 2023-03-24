import { useQuery } from '@tanstack/react-query'
import { InterestDto } from '../../../types/domain/interest/InterestDto'

import { urls } from '../../../utils/urls'
import useAuthStore from '../../zustand/useAuthStore'

export const useSavedItemsQuery = () => {
  const { authUser } = useAuthStore()
  return useQuery<InterestDto[], Error>([urls.api.findSavedItems], {
    enabled: !!authUser,
  })
}
