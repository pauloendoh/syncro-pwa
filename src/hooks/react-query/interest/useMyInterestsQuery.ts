import { useQuery } from '@tanstack/react-query'
import { InterestDto } from '../../../types/domain/interest/InterestDto'

import { urls } from '../../../utils/urls'
import useAuthStore from '../../zustand/useAuthStore'

export const useMyInterestsQuery = () => {
  const { authUser } = useAuthStore()
  return useQuery<InterestDto[], Error>([urls.api.myInterests], {
    enabled: !!authUser,
  })
}

export const useMyInterestQU = (itemId?: string | null) => {
  const { data } = useMyInterestsQuery()

  return data?.find((rating) => rating.syncroItemId === itemId)
}
